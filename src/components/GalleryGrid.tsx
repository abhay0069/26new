import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { InspirationCard } from '@/components/InspirationCard';
import { useLibrary } from '@/state/LibraryContext';
import { useToast } from '@/components/Toast';
import type { Inspiration } from '@/types';

interface GalleryGridProps {
  entries: Inspiration[];
  loading?: boolean;
  /** Changing this signature replays the stagger entrance (filter changes). */
  signature: string;
  empty?: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.05 },
  },
};

const reducedContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

function SkeletonCard({ tall }: { tall: boolean }) {
  return (
    <div className="mb-5 break-inside-avoid overflow-hidden rounded-card border border-hairline">
      <div className={tall ? 'skeleton aspect-[4/5] w-full' : 'skeleton aspect-[4/3] w-full'} />
      <div className="space-y-2.5 p-4">
        <div className="skeleton h-4 w-3/4 rounded-md" />
        <div className="skeleton h-3 w-1/2 rounded-md" />
      </div>
    </div>
  );
}

export function GalleryGrid({ entries, loading = false, signature, empty }: GalleryGridProps) {
  const reduced = useReducedMotion();
  const { isSaved, saveCount, toggleSave } = useLibrary();
  const toast = useToast();

  if (loading) {
    return (
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3" aria-label="Loading references" role="status">
        <span className="sr-only">Loading references…</span>
        {[true, false, true, false, true, false].map((tall, i) => (
          <SkeletonCard key={i} tall={tall} />
        ))}
      </div>
    );
  }

  if (entries.length === 0 && empty) {
    return <>{empty}</>;
  }

  const handleToggleSave = (id: string) => {
    const wasSaved = isSaved(id);
    toggleSave(id);
    toast.push(wasSaved ? 'Removed from saved' : 'Saved to your list', wasSaved ? 'remove' : 'save');
  };

  return (
    <motion.div
      key={signature}
      variants={reduced ? reducedContainer : containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-1 gap-5 sm:columns-2 xl:columns-3"
    >
      {entries.map((entry) => (
        <InspirationCard
          key={entry.id}
          entry={entry}
          saved={isSaved(entry.id)}
          saveCount={saveCount(entry)}
          onToggleSave={handleToggleSave}
          onOpen={(id) => {
            window.location.hash = `#/reference/${id}`;
          }}
        />
      ))}
    </motion.div>
  );
}
