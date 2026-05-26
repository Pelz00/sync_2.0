# lib/paystack

Paystack integration.

- Client: loads Paystack inline JS on demand (we skipped `react-paystack` because it doesn't support React 19).
- Server: webhook handler at `/api/webhooks/paystack` verifies `x-paystack-signature` (HMAC-SHA512) before processing any event.
- Escrow state transitions live in `modules/payments/actions.ts`.
