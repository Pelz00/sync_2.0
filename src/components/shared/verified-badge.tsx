/**
 * VerifiedBadge - the most important trust mark in Sync. Per the hi-fi
 * design guide, it renders as a lime pill with a leading green dot and the
 * label "Sync-verified". Apply liberally on listing cards, profile headers,
 * chat headers - anywhere a vendor's authenticity matters.
 */
import { cn } from '@/lib/utils';

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'bg-lime text-ink inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-lime-deep h-1.5 w-1.5 rounded-full"
      />
      Sync-verified
    </span>
  );
}
