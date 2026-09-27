import { useEffect, useState } from 'react';

/**
 * Brief first-visit loading window so the gallery can demonstrate its
 * skeleton state honestly (local data resolves near-instantly otherwise).
 */
export function useSimulatedLoad(delayMs = 550): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  return loading;
}
