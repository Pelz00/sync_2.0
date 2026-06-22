'use client';

/**
 * DeclineReasonPopover - small popover for picking why an order is being
 * declined. Portaled to document.body and positioned with `fixed` coords
 * computed from the trigger button's bounding rect.
 *
 * Why portal instead of `absolute` inside the card: the pending list is a
 * stack of sibling Cards. An `absolute` popover nested inside one Card has
 * no guarantee of painting above the *next* Card in that stack — without a
 * portal it can render behind/under later siblings, which is exactly the
 * "popover gets hidden" bug. Rendering at the body level with `fixed`
 * coordinates sidesteps any ancestor's overflow/stacking entirely.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui';
import { DECLINE_REASONS, type DeclinePayload, type DeclineReasonCode } from './order-actions';

interface DeclineReasonPopoverProps {
  /** The element this popover is anchored to (e.g. a span wrapping the Decline button). */
  anchorRef: React.RefObject<HTMLElement>;
  onCancel: () => void;
  onConfirm: (payload: DeclinePayload) => void;
  submitting?: boolean;
}

const POPOVER_WIDTH = 256;
const GAP = 8;

export function DeclineReasonPopover({
  anchorRef,
  onCancel,
  onConfirm,
  submitting,
}: DeclineReasonPopoverProps) {
  const [reason, setReason] = useState<DeclineReasonCode>('out_of_stock');
  const [note, setNote] = useState('');
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Position against the anchor, recalculating on scroll/resize so it tracks
  // the button instead of going stale if the page moves under it.
  useLayoutEffect(() => {
    function place() {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const left = Math.min(
        Math.max(8, rect.right - POPOVER_WIDTH),
        window.innerWidth - POPOVER_WIDTH - 8,
      );
      setCoords({ top: rect.bottom + GAP, left });
    }
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [anchorRef]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        !anchorRef.current?.contains(target)
      ) {
        onCancel();
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [onCancel, anchorRef]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const noteRequired = reason === 'other';
  const canSubmit = !noteRequired || note.trim().length > 0;

  if (!coords) return null;

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Decline order"
      style={{ position: 'fixed', top: coords.top, left: coords.left, width: POPOVER_WIDTH }}
      className="border-line/10 bg-panel z-50 rounded-lg border p-3 shadow-lg"
    >
      <p className="text-content-muted mb-2 font-mono text-[11px] tracking-wide uppercase">
        Reason for declining
      </p>

      <div className="flex flex-col gap-1.5">
        {DECLINE_REASONS.map((r) => (
          <label
            key={r.value}
            className="text-content flex items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-black/5"
          >
            <input
              type="radio"
              name="decline-reason"
              value={r.value}
              checked={reason === r.value}
              onChange={() => setReason(r.value)}
              className="accent-current"
            />
            {r.label}
          </label>
        ))}
      </div>

      {noteRequired && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Briefly tell the customer why…"
          rows={2}
          className="border-line/20 text-content mt-2 w-full resize-none rounded-md border bg-transparent p-2 text-sm outline-none focus:border-current"
        />
      )}

      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" className="h-8 px-3 text-xs" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button
          className="h-8 px-3 text-xs"
          disabled={!canSubmit || submitting}
          onClick={() => onConfirm({ reason, note: note.trim() || undefined })}
        >
          {submitting ? 'Declining…' : 'Confirm decline'}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
