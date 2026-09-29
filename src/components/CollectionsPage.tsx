import { ArrowLeft, ArrowUpRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

import { GalleryGrid } from '@/components/GalleryGrid';
import { Thumb } from '@/components/Thumb';
import { Button } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { COLLECTIONS, collectionById } from '@/data/collections';
import { hashString } from '@/lib/utils';
import { useLibrary } from '@/state/LibraryContext';
import type { Collection } from '@/types';

export function CollectionsPage({ onOpenCollection }: { onOpenCollection: (id: string) => void }) {
  useDocumentTitle('Collections');
  const { allEntries } = useLibrary();

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-28 sm:px-6 lg:px-10 lg:pt-36">
      <header className="max-w-2xl">
        <p className="kicker mb-4 flex items-center gap-2">
          <Layers className="h-4 w-4 text-acid" aria-hidden />
          Curated groupings
        </p>
        <h1 className="display font-display text-bone">Collections</h1>
        <p className="mt-5 text-base leading-relaxed text-fog-bright">
          The editorial desk groups references into working sets — start from a mood, then
          raid the prompts inside.
        </p>
      </header>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {COLLECTIONS.map((collection, i) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={i}
            onOpen={() => onOpenCollection(collection.id)}
            resolveEntries={allEntries}
          />
        ))}
      </div>
    </main>
  );
}

function CollectionCard({
  collection,
  index,
  onOpen,
  resolveEntries,
}: {
  collection: Collection;
  index: number;
  onOpen: () => void;
  resolveEntries: ReturnType<typeof useLibrary>['allEntries'];
}) {
  const entries = collection.entryIds
    .map((id) => resolveEntries.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const stack = entries.slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="panel panel-hover group relative overflow-hidden"
    >
      {/* stacked thumbnails */}
      <div className="relative h-44 overflow-hidden border-b border-hairline bg-ink-soft">
        {stack.map((entry, i) => (
          <div
            key={entry.id}
            className="absolute top-1/2 w-[46%] -translate-y-1/2 overflow-hidden rounded-lg border border-hairline shadow-lift transition-transform duration-500 ease-out-expo"
            style={{
              left: `${8 + i * 16}%`,
              zIndex: i,
              transform: `translateY(-50%) rotate(${(i - 1) * 4}deg)`,
            }}
          >
            <Thumb
              spec={entry.thumb}
              seed={hashString(entry.id)}
              letter={entry.title.charAt(0).toUpperCase()}
              className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
        <span
          className="absolute right-4 top-4 z-10 rounded-lg border border-hairline bg-ink/80 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-fog-bright backdrop-blur-md"
        >
          {entries.length} references
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h2 className="font-display text-xl font-medium text-bone">{collection.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-fog-bright">{collection.description}</p>
        <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fog transition-colors group-hover:text-acid">
          Explore collection
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-10 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-acid"
        aria-label={`Open collection: ${collection.title}`}
      />
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */

export function CollectionPage({ id, onBack }: { id: string; onBack: () => void }) {
  const collection = collectionById(id);
  useDocumentTitle(collection?.title ?? 'Collection');
  const { allEntries } = useLibrary();

  if (!collection) {
    return (
      <main className="mx-auto max-w-xl px-4 pb-28 pt-36 text-center">
        <h1 className="display font-display text-bone">Collection not found</h1>
        <p className="mt-4 text-sm text-fog-bright">
          This collection may have been renamed or removed.
        </p>
        <Button variant="ghost" className="mt-8" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All collections
        </Button>
      </main>
    );
  }

  const entries = collection.entryIds
    .map((eid) => allEntries.find((e) => e.id === eid))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-28 sm:px-6 lg:px-10 lg:pt-36">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-8">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All collections
      </Button>
      <header className="max-w-2xl">
        <p className="kicker mb-4" style={{ color: collection.accent }}>
          Collection · {entries.length} references
        </p>
        <h1 className="display font-display text-bone">{collection.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-fog-bright">{collection.description}</p>
      </header>

      <div className="mt-12">
        <GalleryGrid entries={entries} signature={`collection:${entries.map((e) => e.id).join(',')}`} />
      </div>
    </main>
  );
}
