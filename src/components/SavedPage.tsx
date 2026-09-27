import { useEffect, useState } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';

import { EmptySaved } from '@/components/EmptyStates';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Button } from '@/components/ui';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLibrary } from '@/state/LibraryContext';
import { useToast } from '@/components/Toast';

export function SavedPage() {
  useDocumentTitle('Saved');
  const { savedIds, allEntries, clearSaved } = useLibrary();
  const toast = useToast();
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    if (!confirmingClear) return;
    const t = window.setTimeout(() => setConfirmingClear(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmingClear]);

  const entries = savedIds
    .map((id) => allEntries.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const handleClear = () => {
    if (!confirmingClear) {
      setConfirmingClear(true);
      return;
    }
    clearSaved();
    setConfirmingClear(false);
    toast.push('Saved list cleared', 'remove');
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-28 sm:px-6 lg:px-10 lg:pt-36">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker mb-4 flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-acid" aria-hidden />
            Your shortlist
          </p>
          <h1 className="display font-display text-bone">Saved</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog-bright">
            {entries.length === 0
              ? 'Ideas you bookmark land here — stored in this browser via localStorage.'
              : `${entries.length} ${entries.length === 1 ? 'reference' : 'references'} kept locally in this browser.`}
          </p>
        </div>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className={confirmingClear ? 'border-[#ff8f6b]/60 text-[#ff8f6b]' : undefined}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {confirmingClear ? 'Click again to confirm' : 'Clear all'}
          </Button>
        )}
      </header>

      <div className="mt-12">
        <GalleryGrid
          entries={entries}
          signature={`saved:${savedIds.join(',')}`}
          empty={<EmptySaved />}
        />
      </div>
    </main>
  );
}
