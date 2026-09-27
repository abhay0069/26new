import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Inspiration } from '@/types';
import { SEED_ENTRIES } from '@/data/inspirations';
import {
  loadSavedIds,
  loadUserReferences,
  persistSavedIds,
  persistUserReferences,
} from '@/lib/storage';

interface LibraryState {
  allEntries: Inspiration[];
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
  saveCount: (entry: Inspiration) => number;
  userReferences: Inspiration[];
  addReference: (entry: Inspiration) => void;
  deleteReference: (id: string) => void;
  storageError: string | null;
  dismissStorageError: () => void;
}

const LibraryContext = createContext<LibraryState | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [userReferences, setUserReferences] = useState<Inspiration[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Hydrate once on mount, defensively.
  useEffect(() => {
    const saved = loadSavedIds();
    setSavedIds(saved.value);
    const refs = loadUserReferences();
    setUserReferences(refs.value);
    setStorageError(saved.error ?? refs.error);
  }, []);

  const flashIf = useCallback((error: string | null) => {
    if (error) setStorageError(error);
  }, []);

  const toggleSave = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
        flashIf(persistSavedIds(next));
        return next;
      });
    },
    [flashIf],
  );

  const removeSaved = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const next = prev.filter((x) => x !== id);
        flashIf(persistSavedIds(next));
        return next;
      });
    },
    [flashIf],
  );

  const clearSaved = useCallback(() => {
    setSavedIds(() => {
      flashIf(persistSavedIds([]));
      return [];
    });
  }, [flashIf]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const saveCount = useCallback(
    (entry: Inspiration) => entry.baseSaves + (savedIds.includes(entry.id) ? 1 : 0),
    [savedIds],
  );

  const addReference = useCallback(
    (entry: Inspiration) => {
      setUserReferences((prev) => {
        const next = [entry, ...prev];
        flashIf(persistUserReferences(next));
        return next;
      });
    },
    [flashIf],
  );

  const deleteReference = useCallback(
    (id: string) => {
      setUserReferences((prev) => {
        const next = prev.filter((r) => r.id !== id);
        flashIf(persistUserReferences(next));
        return next;
      });
      setSavedIds((prev) => {
        const next = prev.filter((x) => x !== id);
        flashIf(persistSavedIds(next));
        return next;
      });
    },
    [flashIf],
  );

  const allEntries = useMemo(() => [...userReferences, ...SEED_ENTRIES], [userReferences]);

  const value = useMemo<LibraryState>(
    () => ({
      allEntries,
      savedIds,
      isSaved,
      toggleSave,
      removeSaved,
      clearSaved,
      saveCount,
      userReferences,
      addReference,
      deleteReference,
      storageError,
      dismissStorageError: () => setStorageError(null),
    }),
    [
      allEntries,
      savedIds,
      isSaved,
      toggleSave,
      removeSaved,
      clearSaved,
      saveCount,
      userReferences,
      addReference,
      deleteReference,
      storageError,
    ],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary(): LibraryState {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used inside <LibraryProvider>');
  return ctx;
}
