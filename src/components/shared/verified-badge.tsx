/**
 * VerifiedBadge — the most important trust mark in Sync.
 * Rendered on every vendor surface (listing cards, profile headers, chat).
 * Only show when the vendor has completed all three verification steps.
 */
import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <Badge variant="accent" className={cn('gap-1 pl-1.5', className)}>
      <BadgeCheck className="h-3 w-3" strokeWidth={2.5} />
      Verified
    </Badge>
  );
}
