/**
 * TanStack Query provider.
 *
 * Scope (per ARCHITECTURE.md): client-side data that RSC can't do well -
 * realtime messaging, live notifications, live order tracking. Do NOT use
 * this for browse/detail pages; those are RSC-fetched.
 *
 * The store is created in `useState` so the same QueryClient survives
 * re-renders but isn't shared across server requests (which would leak
 * user data between users).
 */
'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Conservative defaults - Sync users are on cheap bandwidth, so
            // we keep data fresh for a minute and don't aggressively retry.
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
