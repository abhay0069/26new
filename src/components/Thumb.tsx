import { memo, type CSSProperties, type ReactNode } from 'react';

import type { ThumbSpec } from '@/types';
import { cn, parseHexColor, seededRandom } from '@/lib/utils';

/**
 * Thumb — the original artwork generator.
 * Every gallery visual is drawn here with CSS gradients, blurs, clipped
 * shapes, and slow keyframe animation. No external imagery exists in the
 * entire application. All decorative layers are aria-hidden.
 */

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = parseHexColor(hex) ?? [255, 255, 255];
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

interface VariantProps {
  palette: ThumbSpec['palette'];
  seed: number;
}

function vars(style: CSSProperties, values: Record<string, string | number>): CSSProperties {
  return { ...style, ...values } as CSSProperties;
}

const anim = (durationS: number, delayS = 0) =>
  ({
    '--atmos-duration': `${durationS}s`,
    animationDelay: `${delayS}s`,
    animationDirection: 'alternate',
  }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

function Strata({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const bands = Array.from({ length: 6 }, (_, i) => ({
    top: 4 + i * 15 + seededRandom(seed, i) * 7,
    height: 9 + seededRandom(seed, i + 10) * 17,
    isAccent: i === 2 + Math.floor(seededRandom(seed, 41) * 2),
    blur: 2 + seededRandom(seed, i + 20) * 11,
    opacity: 0.22 + seededRandom(seed, i + 30) * 0.5,
    duration: 9 + i * 2.5,
  }));
  return (
    <>
      {bands.map((b, i) => (
        <div
          key={i}
          className={cn(
            'atmos-anim absolute -left-[10%] w-[120%]',
            i % 2 === 0 ? 'atmos-anim-drift' : 'atmos-anim-drift-x',
          )}
          style={{
            top: `${b.top}%`,
            height: `${b.height}%`,
            background: `linear-gradient(90deg, ${hexToRgba(b.isAccent ? accent : mid, b.opacity)}, transparent 82%)`,
            filter: `blur(${b.blur}px)`,
            ...anim(b.duration, -i * 1.7),
          }}
        />
      ))}
      <div
        className="absolute left-[10%] top-[36%] h-px w-[38%]"
        style={{ background: hexToRgba(accent, 0.85) }}
      />
      <div
        className="absolute right-[14%] top-[36%] h-[5px] w-[5px] rounded-full"
        style={{ background: accent, marginTop: '-2px' }}
      />
    </>
  );
}

function Orbit({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const rings = [
    { size: '44%', opacity: 0.5, duration: 22 },
    { size: '70%', opacity: 0.32, duration: 36 },
    { size: '96%', opacity: 0.2, duration: 54 },
  ];
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${seededRandom(seed, 5) * 24 - 12}deg)` }}
    >
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute inset-0 m-auto rounded-full border"
          style={{
            width: r.size,
            height: r.size,
            borderColor: hexToRgba(mid, r.opacity + 0.25),
          }}
        >
          <div className="atmos-anim atmos-anim-orbit absolute inset-0" style={anim(r.duration)}>
            <span
              className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: i === 1 ? accent : hexToRgba(mid, 0.9),
                boxShadow: i === 1 ? `0 0 10px ${hexToRgba(accent, 0.8)}` : 'none',
              }}
            />
          </div>
        </div>
      ))}
      <span
        className="atmos-anim atmos-anim-breathe absolute inset-0 m-auto h-2 w-2 rounded-full"
        style={{ background: accent, ...anim(6) }}
      />
    </div>
  );
}

function Glyph({ palette, seed, letter }: VariantProps & { letter: string }) {
  const [, mid, accent] = palette;
  return (
    <>
      <div className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: hexToRgba(mid, 0.9) }}>
        fig. {String(1 + (seed % 9)).padStart(2, '0')}
      </div>
      <span
        aria-hidden
        className="atmos-anim atmos-anim-drift absolute -bottom-[0.14em] -right-[0.03em] select-none font-display font-bold leading-[0.78]"
        style={{
          fontSize: '1.32em',
          color: 'transparent',
          WebkitTextStroke: `1.5px ${hexToRgba(mid, 0.85)}`,
          ...anim(16),
        }}
      >
        {letter}
      </span>
      <span
        aria-hidden
        className="absolute -bottom-[0.1em] -right-[0.09em] select-none font-display font-bold leading-[0.78]"
        style={{ fontSize: '1.32em', color: hexToRgba(accent, 0.16), ...anim(16, -0.4) }}
      >
        {letter}
      </span>
      <div className="absolute bottom-4 left-4 h-px w-10" style={{ background: hexToRgba(accent, 0.9) }} />
    </>
  );
}

function Flow({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const paths = Array.from({ length: 4 }, (_, i) => {
    const y = 20 + i * 18 + seededRandom(seed, i) * 8;
    return {
      d: `M -20 ${y} C ${90 + seededRandom(seed, i + 5) * 60} ${y - 34}, ${200 - seededRandom(seed, i + 9) * 60} ${y + 30}, 420 ${y - 8}`,
      color: i === 2 ? accent : mid,
      opacity: i === 2 ? 0.85 : 0.35,
      duration: 8 + i * 3,
      dash: i === 2,
    };
  });
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={hexToRgba(p.color, p.opacity)}
          strokeWidth={p.dash ? 1.8 : 1.1}
          strokeDasharray={p.dash ? '160 46' : undefined}
          className={p.dash ? 'atmos-anim atmos-anim-dash' : undefined}
          style={p.dash ? { '--atmos-duration': `${p.duration}s` } as CSSProperties : undefined}
        />
      ))}
    </svg>
  );
}

function Field({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const dots = Array.from({ length: 44 }, (_, i) => ({
    x: 4 + seededRandom(seed, i) * 92,
    y: 4 + seededRandom(seed, i + 50) * 92,
    size: 2 + Math.round(seededRandom(seed, i + 100) * 2),
    opacity: 0.15 + seededRandom(seed, i + 150) * 0.5,
  }));
  const sparks = Array.from({ length: 5 }, (_, i) => ({
    x: 8 + seededRandom(seed, i + 200) * 84,
    y: 8 + seededRandom(seed, i + 250) * 84,
    duration: 3.5 + seededRandom(seed, i + 300) * 4,
    delay: -seededRandom(seed, i + 350) * 5,
  }));
  return (
    <>
      <div className="atmos-anim atmos-anim-drift absolute inset-[-6%]" style={anim(18)}>
        {dots.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              background: hexToRgba(mid, d.opacity),
            }}
          />
        ))}
      </div>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="atmos-anim atmos-anim-pulse absolute h-[7px] w-[7px] rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            background: accent,
            boxShadow: `0 0 12px ${hexToRgba(accent, 0.7)}`,
            ...vars(anim(s.duration, s.delay), {}),
            animationDirection: 'normal',
          }}
        />
      ))}
    </>
  );
}

function Grid({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const horizon = 58 + seededRandom(seed, 1) * 8;
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '520px' }} aria-hidden>
      {/*
        NB: the plane's transform (rotateX) must not live on the same element
        as a transform-based keyframe animation — the animation would win and
        flatten the plane. So the plane drifts via background-position (pan).
      */}
      <div
        className="atmos-anim atmos-anim-pan absolute left-1/2 w-[260%]"
        style={{
          top: `${horizon}%`,
          height: '170%',
          transform: 'translateX(-50%) rotateX(58deg)',
          transformOrigin: 'top center',
          backgroundImage: `repeating-linear-gradient(0deg, ${hexToRgba(mid, 0.4)} 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, ${hexToRgba(mid, 0.4)} 0 1px, transparent 1px 30px)`,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 78%)',
          backgroundSize: '100% 100%',
          ['--atmos-pan' as string]: '0px 30px',
          ...anim(26),
        }}
      />
      <div
        className="absolute left-[8%] right-[8%] h-px"
        style={{
          top: `${horizon}%`,
          background: hexToRgba(accent, 0.75),
          boxShadow: `0 0 14px ${hexToRgba(accent, 0.4)}`,
        }}
      />
      <span
        className="atmos-anim atmos-anim-pulse absolute h-2 w-2"
        style={{
          left: `${28 + seededRandom(seed, 9) * 40}%`,
          top: `${horizon + 7}%`,
          background: accent,
          ...vars(anim(5, -1), {}),
          animationDirection: 'normal',
        }}
      />
    </div>
  );
}

function Wave({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const layers = [
    { angle: 10 + seededRandom(seed, 1) * 14, gap: 12, color: mid, alpha: 0.3, pan: '240px 60px', duration: 30 },
    { angle: -16 + seededRandom(seed, 2) * 10, gap: 18, color: mid, alpha: 0.2, pan: '-180px 80px', duration: 44 },
    { angle: 26 + seededRandom(seed, 3) * 8, gap: 26, color: accent, alpha: 0.4, pan: '160px -40px', duration: 24 },
  ];
  return (
    <>
      {layers.map((l, i) => (
        <div
          key={i}
          className="atmos-anim atmos-anim-pan absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(${l.angle}deg, transparent 0 ${l.gap - 1}px, ${hexToRgba(l.color, l.alpha)} ${l.gap - 1}px ${l.gap}px)`,
            backgroundSize: '300% 300%',
            ['--atmos-pan' as string]: l.pan,
            ...anim(l.duration),
          }}
        />
      ))}
      <div className="absolute inset-x-[10%] bottom-[16%] h-px" style={{ background: hexToRgba(accent, 0.5) }} />
    </>
  );
}

function Shard({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const shards = [
    {
      clip: 'polygon(12% 0%, 88% 18%, 70% 100%, 0% 78%)',
      background: hexToRgba(mid, 0.28),
      inset: '-6% 30% 22% -4%',
      duration: 20,
    },
    {
      clip: 'polygon(0% 22%, 100% 0%, 74% 88%, 8% 100%)',
      background: hexToRgba(accent, 0.14),
      inset: '18% -8% -10% 34%',
      duration: 26,
    },
    {
      clip: 'polygon(8% 12%, 92% 0%, 100% 82%, 0% 100%)',
      background: hexToRgba(mid, 0.18),
      inset: '34% 12% -14% 8%',
      duration: 32,
    },
  ];
  return (
    <>
      {shards.map((s, i) => (
        <div
          key={i}
          className="atmos-anim atmos-anim-drift absolute"
          style={{
            clipPath: s.clip,
            background: s.background,
            inset: s.inset,
            ...anim(s.duration, -i * 3),
          }}
        />
      ))}
      <div
        className="absolute left-[18%] top-[20%] h-[120%] w-px rotate-[24deg]"
        style={{ background: hexToRgba(accent, 0.55) }}
      />
      <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.25em]" style={{ color: hexToRgba(mid, 1) }}>
        {String(seed % 89).padStart(2, '0')} / PLATE
      </div>
    </>
  );
}

function Beam({ palette, seed }: VariantProps) {
  const [, mid, accent] = palette;
  const left = 24 + seededRandom(seed, 2) * 22;
  const dust = Array.from({ length: 6 }, (_, i) => ({
    x: left - 4 + seededRandom(seed, i + 60) * 24,
    y: 14 + seededRandom(seed, i + 70) * 60,
    duration: 4 + seededRandom(seed, i + 80) * 5,
    delay: -seededRandom(seed, i + 90) * 6,
  }));
  return (
    <>
      <div
        className="atmos-anim atmos-anim-breathe absolute"
        style={{
          left: `${left}%`,
          top: '-12%',
          bottom: '-12%',
          width: '17%',
          background: `linear-gradient(180deg, ${hexToRgba(accent, 0.5)}, ${hexToRgba(accent, 0.03)} 88%)`,
          filter: 'blur(16px)',
          ...anim(9),
        }}
      />
      <div
        className="absolute"
        style={{
          left: `${left + 6}%`,
          top: '-12%',
          bottom: '-12%',
          width: '3.5%',
          background: `linear-gradient(180deg, ${hexToRgba(accent, 0.8)}, ${hexToRgba(accent, 0.05)} 90%)`,
          filter: 'blur(3px)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(90deg, transparent 0 20px, ${hexToRgba(palette[0], 0.92)} 20px 27px)`,
        }}
      />
      {dust.map((d, i) => (
        <span
          key={i}
          className="atmos-anim atmos-anim-pulse absolute h-[3px] w-[3px] rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            background: hexToRgba(accent, 0.9),
            ...vars(anim(d.duration, d.delay), {}),
            animationDirection: 'normal',
          }}
        />
      ))}
      <div className="absolute inset-x-[6%] bottom-[14%] h-px" style={{ background: hexToRgba(mid, 0.8) }} />
    </>
  );
}

/* ------------------------------------------------------------------ */

const VARIANTS = {
  strata: Strata,
  orbit: Orbit,
  glyph: Glyph,
  flow: Flow,
  field: Field,
  grid: Grid,
  wave: Wave,
  shard: Shard,
  beam: Beam,
} as const;

export interface ThumbProps {
  spec: ThumbSpec;
  /** Deterministic variation seed (defaults from the spec hash elsewhere). */
  seed?: number;
  /** Letter for the glyph variant. */
  letter?: string;
  className?: string;
  children?: ReactNode;
}

function ThumbImpl({ spec, seed = 7, letter = 'A', className, children }: ThumbProps) {
  const [base] = spec.palette;
  const Variant = VARIANTS[spec.variant] ?? Strata;
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundColor: base }}
      aria-hidden="true"
    >
      <Variant palette={spec.palette} seed={seed} letter={letter} />
      {/* soft vignette keeps every composition photographic */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 0%, transparent 55%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      {children}
    </div>
  );
}

export const Thumb = memo(ThumbImpl);
