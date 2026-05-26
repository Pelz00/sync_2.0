/**
 * Skeleton — animated placeholder for loading states.
 * Sync prefers RSC streaming + Suspense over client-side spinners; use this
 * inside Suspense `fallback` props and in module-level `loading.tsx`.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-ink/8 animate-pulse rounded-md', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
