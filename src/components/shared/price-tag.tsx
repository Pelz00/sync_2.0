/**
 * PriceTag - formats Naira with an optional "per night" / "per session" suffix.
 * Use in ListingCard, booking sidebars, plan cards.
 */
import { formatNaira } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  amount: number;
  /** "per night", "per session", "from", etc. Rendered small and muted. */
  unit?: string;
  /** Show kobo (2 decimals). */
  withDecimals?: boolean;
  className?: string;
}

export function PriceTag({ amount, unit, withDecimals, className }: PriceTagProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-1', className)}>
      <span className="font-display text-card text-ink">{formatNaira(amount, { withDecimals })}</span>
      {unit && <span className="text-muted text-xs">{unit}</span>}
    </span>
  );
}
