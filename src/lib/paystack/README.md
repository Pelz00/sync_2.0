# lib/paystack

Paystack integration.

- `client.ts` - loads Paystack v2 inline JS on demand and `resumeTransaction(accessCode)` for a server-initialized charge (we skipped `react-paystack` because it doesn't support React 19).
- `server.ts` - `initializeTransaction()` + `verifyTransaction()` using the secret key (server-only). `paystackConfigured` gates everything so the app stays demoable without keys.
- Webhook at `/api/webhooks/paystack` verifies `x-paystack-signature` (HMAC-SHA512) before processing any event.
- Escrow state transitions live in `modules/payments/actions.ts`.

## Wallet top-up flow

1. `POST /api/wallet/topup` (auth) fixes the amount server-side and calls `initializeTransaction`; returns `{ accessCode, reference, publicKey }`. No keys → `{ mock: true }` and the client credits locally (dev only).
2. Client opens the popup via `openWalletTopup(accessCode)`. The browser never sees the secret or sets the amount.
3. Webhook `charge.success` → `verifyTransaction(reference)` → credit the wallet. **The webhook is the source of truth**, not the popup callback.

**TODO to go live:** fill the `PAYSTACK_*` env keys and add the wallet schema, then implement the credit in `handleChargeSuccess` (webhook):

- `wallet_transactions` with a **UNIQUE `reference`** (insert `on conflict (reference) do nothing` for idempotency / replay-safety),
- a balance (e.g. `wallets.balance` or a `profiles.wallet_balance` column), incremented via the service-role client (`@/lib/supabase/admin`).
