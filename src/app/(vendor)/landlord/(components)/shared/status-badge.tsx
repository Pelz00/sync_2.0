import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

type Tone = 'accent' | 'warning' | 'neutral' | 'outline' | 'muted';

const map: Record<string, { label: string; tone: Tone }> = {
  // property listing status
  Active: { label: 'Active', tone: 'accent' },
  Inactive: { label: 'Inactive', tone: 'muted' },
  // availability
  available: { label: 'Available', tone: 'outline' },
  occupied: { label: 'Occupied', tone: 'accent' },
  review: { label: 'Under review', tone: 'warning' },
  // payment
  paid: { label: 'Paid', tone: 'accent' },
  due: { label: 'Due', tone: 'warning' },
  overdue: { label: 'Overdue', tone: 'warning' },
  // transactions
  pending: { label: 'Pending', tone: 'warning' },
  failed: { label: 'Failed', tone: 'warning' },
  // kyc
  not_started: { label: 'Not started', tone: 'muted' },
  submitted: { label: 'Submitted', tone: 'outline' },
  under_review: { label: 'Under review', tone: 'warning' },
  verified: { label: 'Verified', tone: 'accent' },
  rejected: { label: 'Rejected', tone: 'warning' },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const config = map[status] ?? { label: status, tone: 'neutral' as Tone };
  return (
    <Badge variant={config.tone} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
