import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Bookmark } from 'lucide-react';

import { Thumb } from '@/components/Thumb';
import { Tag } from '@/components/ui';
import { ratioClass } from '@/lib/thumbs';
import { cn, formatMonth, hashString } from '@/lib/utils';
import type { Inspiration } from '@/types';

export interface InspirationCardProps {
  entry: Inspiration;
  saved: boolean;
  saveCount: number;
  onToggleSave: (id: string) => void;
  onOpen: (id: string) => void;
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function InspirationCard({
  entry,
  saved,
  saveCount,
  onToggleSave,
  onOpen,
}: InspirationCardProps) {
  const reduced = useReducedMotion();
  const seed = hashString(entry.id);

  return (
    <motion.article
      layout={false}
      variants={cardVariants}
      whileHover={reduced ? undefined : { y: -6 }}
      className="group relative mb-5 break-inside-avoid overflow-hidden rounded-card border border-hairline bg-white/[0.02] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04]"
    >
      {/* Generated thumbnail */}
      <div className="relative">
        <Thumb
          spec={entry.thumb}
          seed={seed}
          letter={entry.title.charAt(0).toUpperCase()}
          className={cn(
            ratioClass(entry.thumb.ratio),
            'w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.025]',
          )}
        >
          <div className="absolute inset-0" />
        </Thumb>

        {/* Metadata revealed on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] translate-y-2 bg-gradient-to-t from-ink/95 via-ink/75 to-transparent px-3.5 pb-3 pt-10 opacity-0 transition-all duration-300 ease-out-expo group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Save toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(entry.id);
          }}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${entry.title} from saved` : `Save ${entry.title}`}
          className={cn(
            'absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-xl border backdrop-blur-md transition-all duration-200',
            'border-hairline bg-ink/70 text-fog-bright hover:border-white/30 hover:text-bone',
            'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 focus-visible:opacity-100',
            saved && 'opacity-100',
          )}
        >
          <Bookmark
            className={cn('h-4 w-4', saved && 'fill-acid text-acid')}
            aria-hidden
          />
        </button>
      </div>

      {/* Meta */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[17px] font-medium leading-snug text-bone">
            {entry.title}
          </h3>
          <span className="shrink-0 rounded-lg border border-hairline px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-fog-bright">
            {entry.category}
          </span>
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
          <span className="truncate">{entry.source.credit}</span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Bookmark className="h-3 w-3" aria-hidden />
            {saveCount}
            <span className="text-fog-faint">·</span>
            {formatMonth(entry.createdAt)}
          </span>
        </div>
      </div>

      {/* Stretched open trigger — the card's single tab stop for opening */}
      <button
        type="button"
        onClick={() => onOpen(entry.id)}
        className="absolute inset-0 z-10 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid"
        aria-label={`Open reference: ${entry.title}`}
      />
    </motion.article>
  );
}
