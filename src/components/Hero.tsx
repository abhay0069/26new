import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Asterisk } from 'lucide-react';

import { Thumb } from '@/components/Thumb';
import { Button } from '@/components/ui';
import { useLibrary } from '@/state/LibraryContext';
import { COLLECTIONS } from '@/data/collections';

const MARQUEE_WORDS = [
  'Immersive',
  'Editorial',
  'Cinematic',
  'Typographic',
  'Spatial',
  'Kinetic',
  'Minimal',
  'Considered',
];

interface HeroProps {
  onExplore: () => void;
  onBrowseCollections: () => void;
}

export function Hero({ onExplore, onBrowseCollections }: HeroProps) {
  const reduced = useReducedMotion();
  const { allEntries } = useLibrary();

  const headline = (
    <h1 className="mega font-display text-bone">
      <motion.span
        className="block"
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        Collect the feeling.
      </motion.span>
      <motion.span
        className="block font-serif italic tracking-[-0.01em] text-bone-dim"
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
      >
        Build something original.
      </motion.span>
    </h1>
  );

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* faint architectural column lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1600px] px-10 lg:block"
      >
        <div className="relative h-full">
          <span className="absolute left-1/3 top-0 h-full w-px bg-white/[0.04]" />
          <span className="absolute left-2/3 top-0 h-full w-px bg-white/[0.04]" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-40">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="kicker mb-6 flex items-center gap-2">
            <Asterisk className="h-4 w-4 text-acid" aria-hidden />
            A private reference library — est. 2026
          </p>
          {headline}
          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-fog-bright sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Atmos Library is a curated, local-first collection of immersive website
            references — each one analysed and distilled into an original build prompt you
            can adapt for your own work. Borrow the feeling. Never the site.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <Button onClick={onExplore} className="px-6 py-3 text-sm">
              Explore ideas
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Button>
            <Button variant="ghost" onClick={onBrowseCollections} className="px-6 py-3 text-sm">
              Browse collections
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
          <motion.p
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-fog"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {allEntries.length} references · {COLLECTIONS.length} curated collections · 100% local
          </motion.p>
        </div>

        {/* Decorative generated visual */}
        <motion.div
          className="relative lg:col-span-5"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="panel relative overflow-hidden shadow-lift">
            <Thumb
              spec={{ variant: 'orbit', palette: ['#0b0b0a', '#3a3d2a', '#c7ff35'], ratio: 'square' }}
              seed={42}
              className="aspect-[4/3] w-full sm:aspect-[5/4]"
            />
          </div>

          {/* floating annotation chips */}
          <motion.div
            className="absolute -left-3 top-8 rounded-lg border border-hairline bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog-bright backdrop-blur-md sm:-left-6"
            animate={reduced ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Motion — scroll-driven
          </motion.div>
          <motion.div
            className="absolute -right-2 bottom-12 rounded-lg border border-hairline bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog-bright backdrop-blur-md sm:-right-5"
            animate={reduced ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            Palette — acid on carbon
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute -bottom-3 left-10 h-9 w-9 rounded-lg border border-acid/40 bg-acid/10 backdrop-blur-md"
            animate={reduced ? undefined : { rotate: [0, 90, 90, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* discipline marquee */}
      <div className="overflow-hidden border-y border-hairline py-3.5" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-[13px] uppercase tracking-[0.34em] text-fog">
                {word}
              </span>
              <Asterisk className="h-3.5 w-3.5 text-acid/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
