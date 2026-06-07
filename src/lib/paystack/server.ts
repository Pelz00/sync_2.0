/**
 * Paystack server helpers. The secret key NEVER leaves the server - it's used
 * here (route handlers) to initialize + verify transactions. The browser only
 * ever sees the publishable key + an access code for a transaction the server
 * already created (so the amount can't be tampered with).
 */
import 'server-only';

const BASE = 'https://api.paystack.co';

/** True only when both Paystack keys are present; otherwise callers fall back
 *  to the dev/mock flow so the app stays demoable without a Paystack account. */
export const paystackConfigured = Boolean(
  process.env.PAYSTACK_SECRET_KEY && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
);

interface InitializeParams {
  email: string;
  /** Amount in kobo (₦1 = 100 kobo). */
  amountKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
}

export interface InitializeResult {
  access_code: string;
  authorization_url: string;
  reference: string;
}

/** Create a Paystack transaction. Returns the access code the inline popup
 *  resumes, plus a fallback authorization_url for the redirect flow. */
export async function initializeTransaction(p: InitializeParams): Promise<InitializeResult> {
  const res = await fetch(`${BASE}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: p.email,
      amount: p.amountKobo,
      reference: p.reference,
      metadata: p.metadata,
    }),
    cache: 'no-store',
  });
  const json = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: InitializeResult;
  };
  if (!res.ok || !json.status || !json.data) {
    throw new Error(json.message || 'Paystack initialize failed');
  }
  return json.data;
}

/** Server-side verify (used by the webhook + a callback) - re-checks a charge
 *  with Paystack rather than trusting the client. */
export async function verifyTransaction(reference: string): Promise<{
  status: string;
  amount: number;
  reference: string;
  metadata?: Record<string, unknown>;
}> {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    cache: 'no-store',
  });
  const json = (await res.json()) as { status?: boolean; message?: string; data?: never };
  if (!res.ok || !json.status || !json.data) {
    throw new Error(json.message || 'Paystack verify failed');
  }
  return json.data;
}
