import { useCallback, useEffect, useRef, useState } from 'react';

import type { Route } from '@/types';

export function routeToHash(route: Route): string {
  switch (route.name) {
    case 'discover':
      return '#/discover';
    case 'collections':
      return '#/collections';
    case 'collection':
      return `#/collections/${route.id}`;
    case 'saved':
      return '#/saved';
    case 'kage':
      return '#/kage';
    case 'detail':
      return `#/reference/${route.id}`;
  }
}

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'discover' };
  switch (parts[0]) {
    case 'collections':
      return parts[1] ? { name: 'collection', id: parts[1] } : { name: 'collections' };
    case 'saved':
      return { name: 'saved' };
    case 'kage':
      return { name: 'kage' };
    case 'reference':
      return parts[1] ? { name: 'detail', id: parts[1] } : { name: 'discover' };
    case 'discover':
    default:
      return { name: 'discover' };
  }
}

/** Route keys used for AnimatePresence transitions. */
export function routeKey(route: Route): string {
  return route.name === 'collection' || route.name === 'detail' ? `${route.name}:${route.id}` : route.name;
}

/**
 * Minimal hash router so browser back/forward works everywhere,
 * including closing a detail view.
 */
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  const prevRoute = useRef<Route>(route);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash);
      prevRoute.current = route;
      setRoute(next);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const navigate = useCallback(
    (next: Route) => {
      const hash = routeToHash(next);
      if (window.location.hash === hash) return;
      window.location.hash = hash;
    },
    [],
  );

  const back = useCallback(
    (fallback: Route) => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate(fallback);
      }
    },
    [navigate],
  );

  return { route, navigate, back, prevRoute: prevRoute.current };
}
