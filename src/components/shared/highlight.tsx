/**
 * Highlight - the brand "accent moment": an inline lime block behind text,
 * mirroring the hi-fi treatment of words like *blocks.* / *radius.* / *Lodge.*
 * Constant lime + ink in both light and dark (a fixed brand mark, not theme-
 * aware), so it stays legible everywhere. Use sparingly - 3-5 times per page.
 *
 * Inline-block, box-decoration-clone so the block wraps cleanly across lines.
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HighlightProps {
  children: ReactNode;
  /** Override the block colour; defaults to the lime accent. */
  color?: string;
  className?: string;
}

export function Highlight({ children, color, className }: HighlightProps) {
  return (
    <span
      className={cn(
        'text-content box-decoration-clone rounded-[3px] px-1.5',
        color ?? 'bg-lime',
        className,
      )}
    >
      {children}
    </span>
  );
}
