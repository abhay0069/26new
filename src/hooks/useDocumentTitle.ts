import { useEffect } from 'react';

/** Keep the document title in sync with the current view. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Atmos Library`;
    return () => {
      document.title = 'Atmos Library — Collect the feeling. Build something original.';
    };
  }, [title]);
}
