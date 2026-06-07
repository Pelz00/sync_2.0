/**
 * Root `<Providers>` - the one place client providers are mounted. Chains:
 *
 *   ReduxProvider         (cart + wizard + ui state + RTK Query cache)
 *     → TooltipProvider   (Radix tooltip context)
 *       → children
 *       → Toaster         (sonner; renders at the end so it overlays)
 *
 * RTK Query needs no provider of its own - its cache lives in the Redux store,
 * so being inside ReduxProvider is enough.
 *
 * Mount once in the root layout. Anything that needs to run on the client
 * (Redux/RTK Query hooks, useTooltip, toast()) requires being inside this.
 */
'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from '@/components/ui/toast';
import { ReduxProvider } from './redux-provider';
import { ChatWidget } from '@/components/chat/chat-widget';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <TooltipProvider delayDuration={150}>
        {children}
        {/* Floating, draggable chat - present on every page. */}
        <ChatWidget />
        <Toaster />
      </TooltipProvider>
    </ReduxProvider>
  );
}
