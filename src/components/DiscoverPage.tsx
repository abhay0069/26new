import { useEffect, useMemo, useRef, useState } from 'react';

import { EmptyResults } from '@/components/EmptyStates';
import { FilterBar, type CategoryFilter } from '@/components/FilterBar';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Hero } from '@/components/Hero';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useSimulatedLoad } from '@/hooks/useSimulatedLoad';
import { useLibrary } from '@/state/LibraryContext';
import { CATEGORIES, type SortKey } from '@/types';
import { useReducedMotion } from 'framer-motion';

/** Module-level flag so the skeleton only plays on the very first visit. */
let hasBootedOnce = false;

interface DiscoverPageProps {
  onBrowseCollections: () => void;
}

export function DiscoverPage({ onBrowseCollections }: DiscoverPageProps) {
  useDocumentTitle('Discover');
  const { allEntries } = useLibrary();
  const reduced = useReducedMotion();

  const [category, setCategory] = useState<CategoryFilter>('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');
  const searchRef = useRef<HTMLInputElement>(null);

  const loading = useSimulatedLoad(hasBootedOnce ? 0 : 620);
  useEffect(() => {
    hasBootedOnce = true;
  }, []);

  // The nav's search icon focuses this input.
  useEffect(() => {
    const focusSearch = () => {
      searchRef.current?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      searchRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener('atmos:focus-search', focusSearch);
    return () => window.removeEventListener('atmos:focus-search', focusSearch);
  }, [reduced]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { __all: allEntries.length };
    for (const cat of CATEGORIES) {
      c[cat] = allEntries.filter((e) => e.category === cat).length;
    }
    return c;
  }, [allEntries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allEntries;
    if (category !== 'All') list = list.filter((e) => e.category === category);
    if (q) {
      list = list.filter((e) =>
        [e.title, e.summary, e.analysis, e.category, e.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(q),
      );
    }
    const sorted = [...list];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'saved':
        sorted.sort((a, b) => b.baseSaves - a.baseSaves);
        break;
      case 'alpha':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return sorted;
  }, [allEntries, category, query, sort]);

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  const resetFilters = () => {
    setCategory('All');
    setQuery('');
  };

  return (
    <>
      <Hero onExplore={scrollToGallery} onBrowseCollections={onBrowseCollections} />

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <FilterBar
          activeCategory={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          sort={sort}
          onSort={setSort}
          counts={counts}
          resultCount={filtered.length}
          searchRef={searchRef}
        />
      </div>

      <main id="gallery" aria-label="Reference gallery" className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-8 sm:px-6 lg:px-10">
        <GalleryGrid
          entries={filtered}
          loading={loading}
          signature={`${category}|${query}|${sort}|${allEntries.length}`}
          empty={<EmptyResults query={query.trim()} onReset={resetFilters} />}
        />
      </main>
    </>
  );
}
