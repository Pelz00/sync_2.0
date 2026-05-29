/**
 * RatingStars - read-only star rating display.
 * For an interactive rating input (review form), use a separate `RatingInput`
 * built on RadioGroup. This one is purely display.
 */
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  /** 0–5, fractional allowed (e.g. 4.3). */
  value: number;
  /** Optional review count to display alongside. */
  count?: number;
  /** Hide the numeric value. */
  hideValue?: boolean;
  className?: string;
}

export function RatingStars({ value, count, hideValue, className }: RatingStarsProps) {
  const rounded = Math.round(value * 10) / 10;
  return (
    <span className={cn('text-content-muted inline-flex items-center gap-1 text-xs', className)}>
      <Star className="fill-lime text-lime h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
      {!hideValue && <span className="text-foreground font-medium">{rounded.toFixed(1)}</span>}
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}
