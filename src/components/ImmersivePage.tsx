import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import type { Route } from '@/types';
import './immersive.css';

const LAYERS = [
  { at: 0.0, name: 'EXOSPHERE' },
  { at: 0.18, name: 'THERMOSPHERE' },
  { at: 0.36, name: 'MESOSPHERE' },
  { at: 0.55, name: 'STRATOSPHERE' },
  { at: 0.74, name: 'TROPOSPHERE' },
  { at: 0.92, name: 'SURFACE' },
];

interface WorldHandle {
  setProgress(p: number): void;
  setPointer(x: number, y: number): void;
  start(): void;
  stop(): void;
  resize(): void;
  dispose(): void;
}

interface ImmersivePageProps {
  navigate: (route: Route) => void;
}

export default function ImmersivePage({ navigate }: ImmersivePageProps) {
  useDocumentTitle('Atmos — the descent');
  const reduced = useReducedMotion();
  const worldRef = useRef<WorldHandle | null>(null);
  const altRef = useRef<HTMLSpanElement>(null);
  const layerRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);
  const [pct, setPct] = useState(0);

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  /* ── preloader ────────────────────────────────────────────────────── */
  useEffect(() => {
    let v = 0;
    const t = window.setInterval(() => {
      v = Math.min(100, v + 4 + Math.random() * 9);
      setPct(Math.floor(v));
      if (v >= 100) {
        window.clearInterval(t);
        window.setTimeout(() => setBooted(true), 340);
      }
    }, 46);
    return () => window.clearInterval(t);
  }, []);

  const syncScroll = useCallback(() => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    worldRef.current?.setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
  }, []);

  /* ── reveal stops as they enter the viewport ──────────────────────── */
  useEffect(() => {
    const stops = Array.from(document.querySelectorAll<HTMLElement>('[data-stop]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('in');
        }
      },
      { threshold: 0.32 },
    );
    stops.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* ── global listeners (resize / visibility) ───────────────────────── */
  useEffect(() => {
    const onResize = () => worldRef.current?.resize();
    const onVis = () => (document.hidden ? worldRef.current?.stop() : worldRef.current?.start());
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      worldRef.current?.stop();
    };
  }, []);

  /* ── pointer parallax + custom cursor (desktop, motion allowed) ───── */
  useEffect(() => {
    if (isTouch || reduced) return;
    let raf = 0;
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      worldRef.current?.setPointer(target.x, target.y);
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const el = e.target as HTMLElement | null;
      cursorRing.current?.classList.toggle('is-hot', Boolean(el?.closest('a, button, [data-hot]')));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ringPos.x += (target.x * window.innerWidth - ringPos.x) * 0.16;
      ringPos.y += (target.y * window.innerHeight - ringPos.y) * 0.16;
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      }
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [isTouch, reduced]);

  /* ── HUD altitude readout — written straight to the DOM ───────────── */
  const handleProgress = useCallback((p: number) => {
    let layer = LAYERS[0];
    for (const l of LAYERS) if (p >= l.at) layer = l;
    const alt = (1 - p) * 80;
    if (altRef.current) altRef.current.textContent = `${alt.toFixed(1)} KM`;
    if (layerRef.current) {
      layerRef.current.textContent = `LAYER ${String(LAYERS.indexOf(layer) + 1).padStart(2, '0')} — ${layer.name}`;
    }
    if (markerRef.current) markerRef.current.style.top = `${8 + p * 84}%`;
  }, []);

  const scrollToStop = (i: number) => {
    const stops = document.querySelectorAll<HTMLElement>('[data-stop]');
    stops[i]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className={`atmos-immersive${booted ? ' is-booted' : ''}${reduced ? ' is-reduced' : ''}${isTouch ? ' is-touch' : ''}`}>
      {/* ── the world ───────────────────────────────────────────────── */}
      <div className="ai-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <WorldHost
            worldRef={worldRef}
            reduced={Boolean(reduced)}
            lowPower={isTouch}
            onProgress={handleProgress}
            onScroll={syncScroll}
          />
        </Suspense>
      </div>

      <div className="ai-vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── HUD frame ───────────────────────────────────────────────── */}
      <header className="ai-hud-top">
        <a
          className="ai-brand"
          href="#atmos-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }}
        >
          <b>ATMOS</b>
          <i>LIBRARY — DESCENT</i>
        </a>
        <nav className="ai-menu" aria-label="Immersive shortcuts">
          <button type="button" onClick={() => navigate({ name: 'discover' })}>Archive</button>
          <button type="button" onClick={() => navigate({ name: 'collections' })}>Collections</button>
          <button type="button" onClick={() => navigate({ name: 'saved' })}>Saved</button>
          <button type="button" onClick={() => navigate({ name: 'kage' })}>Kage</button>
        </nav>
      </header>

      {/* right altitude rail */}
      <div className="ai-rail" aria-hidden="true">
        <div className="ai-rail-line" />
        <div className="ai-rail-marker" ref={markerRef} />
        <div className="ai-rail-alt">
          <span ref={altRef}>80.0 KM</span>
        </div>
      </div>

      {/* bottom-left layer label */}
      <p className="ai-layer mono-label" aria-hidden="true">
        <span ref={layerRef}>LAYER 01 — EXOSPHERE</span>
      </p>

      {/* corner brackets */}
      <span className="ai-corner ai-corner--tl" aria-hidden="true" />
      <span className="ai-corner ai-corner--tr" aria-hidden="true" />
      <span className="ai-corner ai-corner--bl" aria-hidden="true" />
      <span className="ai-corner ai-corner--br" aria-hidden="true" />

      {/* ── content stops along the descent ─────────────────────────── */}
      <main className="ai-content">
        <section className="ai-stop is-left" data-stop id="atmos-top">
          <p className="mono-label ai-reveal">ATMOS LIBRARY — IMMERSIVE INDEX</p>
          <h1 className="ai-hero ai-reveal">
            Collect the feeling.
            <em>Build something original.</em>
          </h1>
          <p className="ai-sub ai-reveal">
            A descent through sixteen engineered worlds. Your scrollbar is now
            an altimeter — take it down.
          </p>
          <div className="ai-cta ai-reveal">
            <button type="button" className="ai-btn ai-btn--solid" onClick={() => scrollToStop(1)}>
              Begin the descent ↓
            </button>
            <button type="button" className="ai-btn" onClick={() => navigate({ name: 'discover' })}>
              Skip to the archive
            </button>
          </div>
        </section>

        <section className="ai-stop is-right" data-stop>
          <p className="mono-label ai-reveal">LAYER 01 — EXOSPHERE / 80 KM</p>
          <h2 className="ai-h2 ai-reveal">
            Sixteen worlds.
            <br />Zero screenshots.
          </h2>
          <p className="ai-body ai-reveal">
            Every reference in the library is an original, analysed direction —
            drawn in code, never scraped from another site. What you borrow is
            the thinking, never the thing.
          </p>
          <button type="button" className="ai-link ai-reveal" onClick={() => navigate({ name: 'discover' })}>
            Browse the index →
          </button>
        </section>

        <section className="ai-stop is-left" data-stop>
          <p className="mono-label ai-reveal">LAYER 02 — THERMOSPHERE / 52 KM</p>
          <h2 className="ai-h2 ai-reveal">
            Design DNA,
            <br />decoded.
          </h2>
          <p className="ai-body ai-reveal">
            Typography, color, layout, motion, interaction — five decisions
            dissected for every world, written down like flight notes.
          </p>
          <button type="button" className="ai-link ai-reveal" onClick={() => navigate({ name: 'detail', id: 'monolith-protocol' })}>
            Read the DNA →
          </button>
        </section>

        <section className="ai-stop is-right" data-stop>
          <p className="mono-label ai-reveal">LAYER 03 — MESOSPHERE / 31 KM</p>
          <h2 className="ai-h2 ai-reveal">
            Prompts,
            <br />not screenshots.
          </h2>
          <p className="ai-body ai-reveal">
            Each direction ships as an original build prompt — ready for your
            AI tool, engineered so nothing proprietary ever comes with it.
          </p>
          <button type="button" className="ai-link ai-reveal" onClick={() => navigate({ name: 'detail', id: 'tidal-type' })}>
            Open a prompt →
          </button>
        </section>

        <section className="ai-stop is-left" data-stop>
          <p className="mono-label ai-reveal">LAYER 04 — STRATOSPHERE / 12 KM</p>
          <h2 className="ai-h2 ai-reveal">Curated currents.</h2>
          <ul className="ai-chips ai-reveal">
            <li>Dark &amp; Dimensional</li>
            <li>Type as Image</li>
            <li>Quiet Luxury</li>
            <li>Living Systems</li>
          </ul>
          <button type="button" className="ai-link ai-reveal" onClick={() => navigate({ name: 'collections' })}>
            Enter collections →
          </button>
        </section>

        <section className="ai-stop is-center" data-stop>
          <p className="mono-label ai-reveal">SURFACE — 0 KM / THE ARCHIVE</p>
          <h2 className="ai-final ai-reveal">Enter the archive.</h2>
          <p className="ai-body ai-reveal">
            Sixteen worlds · five collections · a thousand prompts between
            them — all kept on your machine.
          </p>
          <div className="ai-cta ai-reveal">
            <button type="button" className="ai-btn ai-btn--solid" onClick={() => navigate({ name: 'discover' })}>
              Open the library
            </button>
          </div>
        </section>
      </main>

      {/* custom cursor */}
      {!isTouch && !reduced && (
        <>
          <div className="ai-cursor-dot" ref={cursorDot} aria-hidden="true" />
          <div className="ai-cursor-ring" ref={cursorRing} aria-hidden="true" />
        </>
      )}

      {/* ── preloader ───────────────────────────────────────────────── */}
      <div className={`ai-pre${booted ? ' done' : ''}`} aria-hidden="true">
        <div className="ai-pre-in">
          <p className="ai-pre-mark">◎</p>
          <p className="ai-pre-word">INITIATING DESCENT</p>
          <div className="ai-pre-bar"><i style={{ right: `${100 - pct}%` }} /></div>
          <p className="ai-pre-meta"><span>ATMOS LIBRARY</span><b>{String(pct).padStart(3, '0')}%</b></p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Mounts the imperative Three world and wires page scroll to it.        */
/* -------------------------------------------------------------------- */
function WorldHost({
  worldRef,
  reduced,
  lowPower,
  onProgress,
  onScroll,
}: {
  worldRef: React.MutableRefObject<WorldHandle | null>;
  reduced: boolean;
  lowPower: boolean;
  onProgress: (p: number) => void;
  onScroll: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let world: import('@/scene/AtmosWorld').AtmosWorld | null = null;
    let cancelled = false;

    import('@/scene/AtmosWorld')
      .then(({ AtmosWorld }) => {
        if (cancelled || !canvasRef.current) return;
        world = new AtmosWorld({
          canvas: canvasRef.current,
          reducedMotion: reduced,
          lowPower,
          onProgress,
        });
        worldRef.current = world;
        world.start();
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      })
      .catch(() => {
        /* no WebGL / no chunk — the CSS backdrop still carries the page */
        document.documentElement.classList.add('no-webgl');
      });

    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      world?.dispose();
      worldRef.current = null;
    };
  }, [worldRef, reduced, lowPower, onProgress, onScroll]);

  return <canvas ref={canvasRef} className="ai-world" />;
}
