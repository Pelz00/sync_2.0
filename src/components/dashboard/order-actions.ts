/**
 * Accept/decline actions for a pending order. Mocked for now — swap the
 * body of each function for a real API call once the endpoint exists, e.g.:
 *
 *   export async function acceptOrder(id: string): Promise<void> {
 *     const res = await fetch(`/api/vendor/orders/${id}/accept`, { method: 'POST' });
 *     if (!res.ok) throw new Error('Failed to accept order');
 *   }
 *
 *   export async function declineOrder(id: string, payload: DeclinePayload): Promise<void> {
 *     const res = await fetch(`/api/vendor/orders/${id}/decline`, {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(payload),
 *     });
 *     if (!res.ok) throw new Error('Failed to decline order');
 *   }
 *
 * Both throw on failure so the caller's optimistic-update rollback runs —
 * keep that contract when wiring in the real endpoints.
 */

export const DECLINE_REASONS = [
  { value: 'out_of_stock', label: 'Out of stock' },
  { value: 'too_busy', label: 'Kitchen too busy' },
  { value: 'closing_soon', label: 'Closing soon' },
  { value: 'other', label: 'Other' },
] as const;

export type DeclineReasonCode = (typeof DECLINE_REASONS)[number]['value'];

export interface DeclinePayload {
  reason: DeclineReasonCode;
  /** Required when reason is 'other', optional extra context otherwise. */
  note?: string;
}

/** Simulates network latency + an occasional failure, so the optimistic UI has something real to handle. */
function simulateRequest(failRate = 0.08): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Network error'));
      } else {
        resolve();
      }
    }, 500);
  });
}

export async function acceptOrderMock(id: string): Promise<void> {
  await simulateRequest();
}

export async function declineOrderMock(id: string, payload: DeclinePayload): Promise<void> {
  await simulateRequest();
}
