'use client';

/**
 * PendingRequestList - the single "pending requests" list used by every
 * dashboard variant. One card design; the role decides what each row means:
 *   - vendor:   an order   (badge = order id, subtitle = items, amount = total)
 *   - landlord: a booking  (tags = location · room · time)
 *
 * Owns the list as client state, seeded from the server-fetched `items`
 * prop (same pattern as RevenueChartPanel's initialData) so Accept/Decline
 * can optimistically remove a row without a full page re-fetch.
 *
 * Accept: fires immediately, row shows a brief "Accepting…" state, then is
 * removed on success. On failure the row is restored with an inline error.
 * Decline: opens a reason popover anchored to that row's Decline button
 * (portaled to body — see DeclineReasonPopover) before the decline call
 * fires.
 *
 * Swap `onAccept`/`onDecline` defaults for real API calls once the backend
 * exists — see order-actions.ts for the exact shape to match.
 */
import { useRef, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { acceptOrderMock, declineOrderMock, type DeclinePayload } from './order-actions';
import { DeclineReasonPopover } from './decline-reason-popover';

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
  onAccept?: (id: string) => Promise<void>;
  onDecline?: (id: string, payload: DeclinePayload) => Promise<void>;
}

type RowState = 'idle' | 'accepting' | 'declining' | 'error';

function PendingRow({
  item,
  onAccept,
  onDecline,
}: {
  item: PendingRequestItem;
  onAccept: (id: string) => Promise<void>;
  onDecline: (id: string, payload: DeclinePayload) => Promise<void>;
}) {
  const [state, setState] = useState<RowState>('idle');
  const [error, setError] = useState('');
  const [declineOpen, setDeclineOpen] = useState(false);
  // Plain span wrapper (not the Button itself) as the popover anchor — this
  // works whether or not the Button component forwards refs.
  const declineAnchorRef = useRef<HTMLElement | null>(null);

  const busy = state === 'accepting' || state === 'declining';

  async function handleAccept() {
    setError('');
    setState('accepting');
    try {
      await onAccept(item.id);
      // Parent removes this row from the list on success.
    } catch {
      setState('error');
      setError("Couldn't accept this order. Try again.");
    }
  }

  async function handleDeclineConfirm(payload: DeclinePayload) {
    setError('');
    setState('declining');
    try {
      await onDecline(item.id, payload);
      setDeclineOpen(false);
    } catch {
      setState('error');
      setError("Couldn't decline this order. Try again.");
      setDeclineOpen(false);
    }
  }

  return (
    <Card className="group border-line/5 flex flex-col gap-2 border bg-transparent px-4 py-4 transition-shadow duration-300 hover:shadow-2xl sm:px-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
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
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-card leading-tight font-semibold break-words">
                {item.name}
              </h3>
              {item.badge && (
                <span className="text-content-muted font-mono text-xs">{item.badge}</span>
              )}
            </div>
            {item.subtitle && (
              <p className="text-content-muted text-sm break-words">{item.subtitle}</p>
            )}
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

        <div className="flex shrink-0 items-center gap-2 sm:justify-end">
          <span ref={declineAnchorRef} className="inline-block flex-1 sm:flex-none">
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setDeclineOpen(true)}
              className="w-full sm:w-auto"
            >
              {state === 'declining' ? 'Declining…' : 'Decline'}
            </Button>
          </span>
          <Button
            disabled={busy}
            onClick={handleAccept}
            className="text-ink bg-lime hover:bg-lime/85 flex-1 rounded-full border border-lime-300 font-semibold sm:flex-none"
          >
            {state === 'accepting' ? 'Accepting…' : 'Accept'}
            {state !== 'accepting' && <ArrowRight className="ml-1 size-4" />}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}

      {declineOpen && (
        <DeclineReasonPopover
          anchorRef={declineAnchorRef as React.RefObject<HTMLElement>}
          submitting={state === 'declining'}
          onCancel={() => setDeclineOpen(false)}
          onConfirm={handleDeclineConfirm}
        />
      )}
    </Card>
  );
}

export function PendingRequestList({
  items: initialItems,
  onAccept = acceptOrderMock,
  onDecline = declineOrderMock,
}: PendingRequestListProps) {
  const [items, setItems] = useState(initialItems);

  async function handleAccept(id: string) {
    await onAccept(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleDecline(id: string, payload: DeclinePayload) {
    await onDecline(id, payload);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return <p className="text-content-muted text-sm">No pending orders right now.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <PendingRow key={item.id} item={item} onAccept={handleAccept} onDecline={handleDecline} />
      ))}
    </div>
  );
}
