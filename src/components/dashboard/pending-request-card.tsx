'use client';

/**
 * PendingRequestList - the single "pending requests" list used by every
 * dashboard variant. One card design; the role decides what each row means:
 *   - vendor:   an order   (badge = order id, subtitle = items, amount = total)
 *   - landlord: a booking  (tags = location · room · time)
 *
 * Replaces the two drifted BookingRequestsCard copies under vendor/ and
 * landlord/.
 */
import { Button, Card } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export interface PendingRequestItem {
  id: string;
  name: string;
  avatarUrl?: string;
  /** Small mono badge after the name, e.g. an order id. */
  badge?: string;
  /** Secondary line under the name, e.g. the order items. */
  subtitle?: string;
  /** Highlighted (accent) value on the meta line, e.g. the order total. */
  amount?: string;
  /** Dot-separated meta chips, e.g. ["delivery", "2h ago"] or ["Tanke Crescent", "3B", "2h"]. */
  tags?: string[];
}

interface PendingRequestListProps {
  items: PendingRequestItem[];
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

export function PendingRequestList({ items, onAccept, onDecline }: PendingRequestListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="group border-cream-deep flex items-center justify-between bg-transparent px-5 py-4 shadow-md transition-shadow duration-300 hover:shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="bg-ink/10 size-10 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
              {item.avatarUrl && (
                <Image
                  src={item.avatarUrl}
                  alt={item.name}
                  className="size-full object-cover"
                  width={100}
                  height={100}
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-card leading-tight font-semibold">{item.name}</h3>
                {item.badge && (
                  <span className="text-content-muted font-mono text-xs">{item.badge}</span>
                )}
              </div>
              {item.subtitle && <p className="text-content-muted text-sm">{item.subtitle}</p>}
              {(item.amount || item.tags?.length) && (
                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  {item.amount && (
                    <span className="text-accent-fg font-mono text-xs font-semibold">
                      {item.amount}
                    </span>
                  )}
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="text-content-muted flex items-center gap-2 text-xs">
                      {(item.amount || i > 0) && <span aria-hidden>·</span>}
                      <span className="capitalize">{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" onClick={() => onDecline?.(item.id)}>
              Decline
            </Button>
            <Button
              onClick={() => onAccept?.(item.id)}
              className="text-ink bg-lime hover:bg-lime/85 rounded-full border border-lime-300 font-semibold"
            >
              Accept <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
