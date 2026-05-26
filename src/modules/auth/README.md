# modules/auth

Authentication & session — wraps Supabase auth (sign in/up, OTP, role lookup). Used by middleware, (auth) routes, and any server action that needs the current user.

## Files
- `actions.ts` — Server Actions (mutations). Always re-validate input with the zod schema from `@/lib/validations`.
- `queries.ts` — Server-side data fetching. Imported by RSC pages.
- `types.ts` — Domain types specific to this module. Cross-module types belong in `@/types`.
- `components/` — Components owned by this module (composed of primitives from `@/components/ui`).

## Conventions
- This module never imports from other `modules/*` directly — cross-module composition happens in pages or in `components/shared`.
- Authorization belongs in Supabase RLS; this module's checks are UX, not security.
