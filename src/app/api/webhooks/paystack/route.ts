/**
 * ROUTE: POST /api/webhooks/paystack
 * ACCESS: public (Paystack-only); rejected unless HMAC-SHA512 signature matches.
 * PURPOSE: Process Paystack webhook events — payment success/failure, transfer
 *          updates, refunds — and drive the escrow state machine in
 *          modules/payments/actions.ts.
 *
 * SECURITY:
 *   1. Read raw body BEFORE JSON parsing (signature is over the raw bytes).
 *   2. Verify `x-paystack-signature` (HMAC-SHA512) with PAYSTACK_SECRET_KEY.
 *   3. Reject unsigned/invalid requests with 401. Never throw the raw error
 *      back to the caller — log and respond 200 to acknowledge receipt.
 *   4. Idempotency: persist `event.data.reference` + status before mutating
 *      domain state (TODO once payments table exists).
 *
 * TODO: dispatch verified events to modules/payments/actions.ts handlers.
 */
import crypto from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    // Don't leak which key is missing — log generically, fail closed.
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

  // TODO: dispatch by `event.event` (charge.success, transfer.success, refund.processed, etc).
  console.info('paystack webhook received', event.event);

  return NextResponse.json({ ok: true });
}

function verifySignature(raw: string, signature: string, secret: string): boolean {
  const computed = crypto.createHmac('sha512', secret).update(raw).digest('hex');
  if (computed.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}
