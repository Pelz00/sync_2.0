/**
 * Textarea — multi-line text input.
 * Defaults to a minimum height of 6 lines; pass `rows` to override.
 */
import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 6, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'border-ink/15 bg-white text-ink placeholder:text-muted w-full rounded-lg border px-3 py-3 text-sm transition-colors',
        'focus:border-ink focus:outline-none',
        'disabled:opacity-50 resize-y',
        className,
      )}
      {...props}
    />
  );
});
