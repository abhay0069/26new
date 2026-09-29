/**
 * Local-first persistence. Everything lives in localStorage; reads and
 * writes are defensive so a blocked or corrupted store degrades into an
 * explicit error banner instead of a crash.
 */

import type { Inspiration } from '@/types';

const SAVED_KEY = 'atmos.saved.v1';
const REFS_KEY = 'atmos.refs.v1';

export interface StorageResult<T> {
  value: T;
  error: string | null;
}

function readJson<T>(key: string, fallback: T): StorageResult<T> {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return { value: fallback, error: null };
    return { value: JSON.parse(raw) as T, error: null };
  } catch {
    return {
      value: fallback,
      error: 'Saved data could not be read from this browser. Your library is running from defaults this session.',
    };
  }
}

function writeJson(key: string, value: unknown): string | null {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return null;
  } catch {
    return 'Changes could not be saved — browser storage is unavailable or full.';
  }
}

export function loadSavedIds(): StorageResult<string[]> {
  const res = readJson<string[]>(SAVED_KEY, []);
  // Guard against corrupted shapes; only accept string arrays.
  if (!Array.isArray(res.value) || res.value.some((v) => typeof v !== 'string')) {
    return { value: [], error: res.error ?? 'Saved list was unreadable and has been reset.' };
  }
  return res;
}

export function persistSavedIds(ids: string[]): string | null {
  return writeJson(SAVED_KEY, ids);
}

export function loadUserReferences(): StorageResult<Inspiration[]> {
  const res = readJson<Inspiration[]>(REFS_KEY, []);
  if (!Array.isArray(res.value)) return { value: [], error: res.error };
  return {
    value: res.value.filter(
      (r): r is Inspiration => !!r && typeof r.id === 'string' && typeof r.title === 'string',
    ),
    error: res.error,
  };
}

export function persistUserReferences(refs: Inspiration[]): string | null {
  return writeJson(REFS_KEY, refs);
}
