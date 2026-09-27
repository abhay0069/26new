import { Search, X } from 'lucide-react';

import { CATEGORIES, type Category, type SortKey } from '@/types';
import { cn } from '@/lib/utils';

export type CategoryFilter = 'All' | Category;

interface FilterBarProps {
  activeCategory: CategoryFilter;
  onCategory: (c: CategoryFilter) => void;
  query: string;
  onQuery: (q: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  counts: Record<string, number>;
  resultCount: number;
  searchRef?: React.RefObject<HTMLInputElement>;
}

const FILTERS: CategoryFilter[] = ['All', ...CATEGORIES];

export function FilterBar({
  activeCategory,
  onCategory,
  query,
  onQuery,
  sort,
  onSort,
  counts,
  resultCount,
  searchRef,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-hairline bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-3.5 sm:px-6 lg:px-10">
        {/* Category chips */}
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((filter) => {
            const active = filter === activeCategory;
            const count = filter === 'All' ? counts.__all ?? 0 : counts[filter] ?? 0;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => onCategory(filter)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 font-display text-xs tracking-wide transition-all duration-200',
                  active
                    ? 'border-acid bg-acid font-semibold text-ink'
                    : 'border-hairline bg-white/[0.02] text-fog-bright hover:border-white/25 hover:text-bone',
                )}
              >
                {filter}
                <span className={cn('font-mono text-[10px]', active ? 'text-ink/60' : 'text-fog-faint')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + sort */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1 sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fog"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search titles, tags, analysis…"
              aria-label="Search references"
              className="input-base h-10 pl-9 pr-9 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-fog hover:text-bone"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
              Sort
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => onSort(e.target.value as SortKey)}
              className="input-base h-10 w-[150px]"
            >
              <option value="newest">Newest</option>
              <option value="saved">Most saved</option>
              <option value="alpha">A–Z</option>
            </select>
          </div>

          <p className="ml-auto hidden font-mono text-[11px] tracking-wide text-fog sm:block" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'reference' : 'references'}
          </p>
        </div>
      </div>
    </div>
  );
}
