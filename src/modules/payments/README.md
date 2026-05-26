# modules/payments

Paystack initialise/verify, escrow lifecycle, payout reconciliation. Single source of truth for money state.

## Files
- `actions.ts` — Server Actions (mutations). Always re-validate input with the zod schema from `@/lib/validations`.
- `queries.ts` — Server-side data fetching. Imported by RSC pages.
- `types.ts` — Domain types specific to this module. Cross-module types belong in `@/types`.
- `components/` — Components owned by this module (composed of primitives from `@/components/ui`).

## Conventions
- This module never imports from other `modules/*` directly — cross-module composition happens in pages or in `components/shared`.
- Authorization belongs in Supabase RLS; this module's checks are UX, not security.
