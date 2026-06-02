/**
 * Textarea - multi-line text input.
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
        'border-line/15 bg-panel text-content placeholder:text-content-muted w-full rounded-lg border px-3 py-3 text-sm transition-colors',
        'focus:border-line focus:outline-none',
        'disabled:opacity-50 resize-y',
        className,
      )}
      {...props}
    />
  );
});
