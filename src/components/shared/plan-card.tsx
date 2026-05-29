/**
 * PlanCard - subscription tier card used on the vendor `plan` page and the
 * marketing /for-vendors landing. Highlights the recommended tier.
 */
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatNaira } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface PlanCardProps {
  name: string;
  /** Monthly price in Naira. Pass 0 for "Free". */
  priceMonthly: number;
  tagline: string;
  features: string[];
  /** Highlights this as the recommended tier. */
  recommended?: boolean;
  /** Primary action (e.g. choose / upgrade). */
  action?: ReactNode;
  className?: string;
}

export function PlanCard({
  name,
  priceMonthly,
  tagline,
  features,
  recommended,
  action,
  className,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-5 rounded-xl p-6',
        recommended ? 'bg-ink text-cream shadow-pop' : 'bg-white text-ink shadow-card',
        className,
      )}
    >
      {recommended && (
        <Badge variant="accent" className="absolute -top-2 left-6">
          Recommended
        </Badge>
      )}
      <div>
        <p className="font-display text-card">{name}</p>
        <p className={cn('mt-1 text-sm', recommended ? 'text-cream/70' : 'text-muted')}>{tagline}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-section">
          {priceMonthly === 0 ? 'Free' : formatNaira(priceMonthly)}
        </span>
        {priceMonthly > 0 && (
          <span className={cn('text-xs', recommended ? 'text-cream/70' : 'text-muted')}>/month</span>
        )}
      </div>
      <ul className="flex flex-col gap-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              className={cn('mt-0.5 h-4 w-4 shrink-0', recommended ? 'text-lime' : 'text-lime-deep')}
              strokeWidth={2.5}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {action ? (
        <div className="mt-auto">{action}</div>
      ) : (
        <Button
          variant={recommended ? 'primary' : 'outline'}
          className={cn('mt-auto', !recommended && 'border-ink/15')}
        >
          Choose {name}
        </Button>
      )}
    </div>
  );
}
