/**
 * ROUTE: POST /api/webhooks/paystack
 * ACCESS: public (Paystack-only); rejected unless HMAC-SHA512 signature matches.
 * PURPOSE: Process Paystack webhook events - payment success/failure, transfer
 *          updates, refunds - and drive the escrow state machine in
 *          modules/payments/actions.ts.
 *
 * SECURITY:
 *   1. Read raw body BEFORE JSON parsing (signature is over the raw bytes).
 *   2. Verify `x-paystack-signature` (HMAC-SHA512) with PAYSTACK_SECRET_KEY.
 *   3. Reject unsigned/invalid requests with 401. Never throw the raw error
 *      back to the caller - log and respond 200 to acknowledge receipt.
 *   4. Idempotency: persist `event.data.reference` + status before mutating
 *      domain state (TODO once payments table exists).
 *
 * TODO: dispatch verified events to modules/payments/actions.ts handlers.
 */
import crypto from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { verifyTransaction } from '@/lib/paystack/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    // Don't leak which key is missing - log generically, fail closed.
    console.error('paystack webhook: server misconfigured');
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }

  const signature = req.headers.get('x-paystack-signature');
  const raw = await req.text();

  if (!signature || !verifySignature(raw, signature, secret)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let event: { event?: string; data?: unknown };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'bad_payload' }, { status: 400 });
  }

  try {
    if (event.event === 'charge.success') {
      await handleChargeSuccess(event.data);
    } else {
      console.info('paystack webhook received', event.event);
    }
  } catch (err) {
    // Acknowledge receipt (200) so Paystack doesn't hammer retries, but log.
    console.error('paystack webhook handler error', err);
  }

  return NextResponse.json({ ok: true });
}

type ChargeData = { reference?: string };

/**
 * Wallet top-up crediting. Re-verifies the charge with Paystack (never trusts
 * the webhook body alone), then credits the user's wallet - idempotent by
 * reference. Other charge purposes (orders, tickets…) are handled elsewhere.
 */
async function handleChargeSuccess(data: unknown) {
  const reference = (data as ChargeData)?.reference;
  if (!reference) return;

  const verified = await verifyTransaction(reference);
  if (verified.status !== 'success') return;

  const meta = verified.metadata as { purpose?: string; userId?: string } | undefined;
  if (meta?.purpose !== 'wallet_topup' || !meta.userId) return;

  const naira = verified.amount / 100;
  // TODO (needs the wallet schema): credit idempotently, e.g.
  //   insert into wallet_transactions (reference, user_id, amount, ...) -- reference UNIQUE
  //     on conflict (reference) do nothing;  -- ignore replays
  //   update wallets set balance = balance + amount where user_id = ...;
  // Use the service-role client (@/lib/supabase/admin) since this runs outside
  // any user session. Until the table exists, log so the flow is observable.
  console.info('paystack wallet_topup verified', { reference, userId: meta.userId, naira });
}

function verifySignature(raw: string, signature: string, secret: string): boolean {
  const computed = crypto.createHmac('sha512', secret).update(raw).digest('hex');
  if (computed.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}
