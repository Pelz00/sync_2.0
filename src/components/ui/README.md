# components/ui

Design-system primitives. Tiny, unopinionated, fully typed. One concern per component.

- Variants via `class-variance-authority` (cva).
- No data fetching, no Supabase, no Redux. These are pure UI.
- If a component needs a domain concept (e.g. `VerifiedBadge`), it lives in `shared/` instead.
