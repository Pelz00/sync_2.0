/**
 * useMediaQuery - subscribe to a CSS media query. Built on useSyncExternalStore
 * so there's no setState-in-effect and no hydration mismatch (server snapshot
 * is always false). e.g. `const isMobile = useMediaQuery('(max-width: 767px)')`.
 */
'use client';

import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
