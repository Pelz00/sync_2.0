/**
 * Input - single-line text field.
 * Pair with `FormField` (components/forms) for labelled, validated usage.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'border-line/15 bg-panel text-content placeholder:text-content-muted h-11 w-full rounded-lg border px-3 text-sm transition-colors',
        'focus:border-line focus:outline-none',
        'disabled:opacity-50',
        'file:text-content file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  );
});
