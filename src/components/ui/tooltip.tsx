/**
 * Tooltip - Radix-backed contextual hint. Wrap any element with `<Tooltip>` +
 * `<TooltipTrigger asChild>{trigger}</TooltipTrigger>` + `<TooltipContent>...</TooltipContent>`.
 *
 * A `<TooltipProvider>` must exist higher in the tree - mount one in the root
 * providers tree (see Phase 6).
 */
'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'bg-ink text-cream z-50 overflow-hidden rounded-md px-2.5 py-1.5 text-xs',
          'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
