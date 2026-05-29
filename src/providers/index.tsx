/**
 * Root `<Providers>` - the one place client providers are mounted. Chains:
 *
 *   ReduxProvider         (cart + wizard + ui state, persisted)
 *     → QueryProvider     (TanStack Query - realtime/messaging only)
 *       → TooltipProvider (Radix tooltip context)
 *         → children
 *         → Toaster       (sonner; renders at the end so it overlays)
 *
 * Mount once in the root layout. Anything that needs to run on the client
 * (Redux hooks, useQuery, useTooltip, toast()) requires being inside this.
 */
'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from '@/components/ui/toast';
import { ReduxProvider } from './redux-provider';
import { QueryProvider } from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <TooltipProvider delayDuration={150}>
          {children}
          <Toaster />
        </TooltipProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
