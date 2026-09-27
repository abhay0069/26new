import { BookmarkPlus, Compass, SearchX } from 'lucide-react';

import { Button } from '@/components/ui';
import { useLibrary } from '@/state/LibraryContext';
import { useToast } from '@/components/Toast';

/** No search/filter results in the gallery. */
export function EmptyResults({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="panel mx-auto flex max-w-lg flex-col items-center px-8 py-14 text-center">
      <SearchX className="h-8 w-8 text-fog" aria-hidden />
      <h3 className="mt-5 font-display text-xl text-bone">No references match</h3>
      <p className="mt-2 text-sm leading-relaxed text-fog-bright">
        {query
          ? `Nothing in the library matches “${query}”. Try a broader term, or clear the filters.`
          : 'Nothing matches this combination of filters. Try clearing them.'}
      </p>
      <Button variant="ghost" className="mt-6" onClick={onReset}>
        Clear filters
      </Button>
    </div>
  );
}

/** Empty saved list, with suggested starting points. */
export function EmptySaved() {
  const { allEntries, toggleSave, saveCount } = useLibrary();
  const toast = useToast();

  const suggestions = [...allEntries].sort((a, b) => b.baseSaves - a.baseSaves).slice(0, 3);

  return (
    <div className="panel mx-auto max-w-2xl px-8 py-14 text-center">
      <BookmarkPlus className="mx-auto h-9 w-9 text-fog" aria-hidden />
      <h3 className="mt-5 font-display text-2xl text-bone">Nothing saved yet</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fog-bright">
        Tap the bookmark on any reference to keep it here. Your list lives in this browser
        only — no account, no cloud.
      </p>

      <div className="mt-8 text-left">
        <p className="kicker mb-3 flex items-center gap-2 justify-center">
          <Compass className="h-3.5 w-3.5 text-acid" aria-hidden />
          Start with the most saved
        </p>
        <ul className="divide-y divide-hairline rounded-xl border border-hairline">
          {suggestions.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-display text-sm text-bone">{entry.title}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                  {entry.category} · {saveCount(entry)} saves
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  toggleSave(entry.id);
                  toast.push(`Saved ${entry.title}`, 'save');
                }}
              >
                Save
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
