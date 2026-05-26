/**
 * Chip — interactive filter/selection pill. Used in filter panels and tag inputs.
 * For non-interactive labels use `Badge` instead.
 */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Controlled "is this chip selected" state. */
  selected?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { className, selected, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors',
        selected
          ? 'bg-ink text-cream border-ink'
          : 'border-ink/15 bg-white text-ink hover:bg-ink/5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
