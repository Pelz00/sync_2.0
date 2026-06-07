/**
 * ROUTE: POST /api/wallet/topup  (Route Handler - server)
 * Starts a wallet top-up. The amount is fixed here, server-side, then handed to
 * Paystack `transaction/initialize`; the browser only gets an access code +
 * publishable key (never the secret, never an amount it can tamper with).
 *
 * The wallet is actually credited by the verified webhook on `charge.success`
 * (see /api/webhooks/paystack), idempotent by reference - not by the client.
 *
 * If Paystack isn't configured yet (no keys), returns `{ mock: true }` so the
 * UI can fall back to the dev/demo top-up and stay usable.
 */
import crypto from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { initializeTransaction, paystackConfigured } from '@/lib/paystack/server';

export const runtime = 'nodejs';

const MIN_NAIRA = 100;
const MAX_NAIRA = 2_000_000;

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { amount?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < MIN_NAIRA || amount > MAX_NAIRA) {
    return Response.json(
      { error: `Enter an amount between ₦${MIN_NAIRA} and ₦${MAX_NAIRA}.` },
      {
        status: 400,
      },
    );
  }

  // No keys yet → let the client use its dev/mock top-up.
  if (!paystackConfigured) return Response.json({ mock: true });

  const reference = `WALLET_${user.id}_${crypto.randomUUID()}`;
  try {
    const data = await initializeTransaction({
      email: user.email,
      amountKobo: amount * 100,
      reference,
      metadata: { userId: user.id, purpose: 'wallet_topup', naira: amount },
    });
    return Response.json({
      reference: data.reference,
      accessCode: data.access_code,
      authorizationUrl: data.authorization_url,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    });
  } catch {
    return Response.json(
      { error: 'Could not start the payment. Please try again.' },
      {
        status: 502,
      },
    );
  }
}
