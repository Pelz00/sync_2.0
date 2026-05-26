/**
 * Input — single-line text field.
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
        'border-ink/15 bg-white text-ink placeholder:text-muted h-11 w-full rounded-lg border px-3 text-sm transition-colors',
        'focus:border-ink focus:outline-none',
        'disabled:opacity-50',
        'file:text-ink file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  );
});
