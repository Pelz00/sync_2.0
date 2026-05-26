# lib/supabase

Supabase client factories — kept as the recommended three-file split per @supabase/ssr.

- `client.ts` — browser client (anon key, public).
- `server.ts` — server client bound to the current request's cookies. Always use `supabase.auth.getUser()` for authorization decisions; never trust `getSession()`.
- `middleware.ts` — refreshes the session on every request.

The **service-role** key, if ever needed, lives in a separate server-only helper and must never reach a client bundle.
