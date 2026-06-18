---
name: admin-role-seeding-gotcha
description: Why admin/super_admin access breaks and how to actually set profiles.role on the Sync project
metadata:
  type: project
---

Sync grants `/admin` access from two sources (see `src/lib/supabase/middleware.ts` + `src/proxy.ts`): the `ADMIN_EMAILS` env allowlist (bootstrap) and `profiles.role` in the DB (source of truth). A 403 for an admin means BOTH resolve to non-admin.

Two recurring gotchas:

1. **Stale env.** `ADMIN_EMAILS` is parsed once at module load (`src/lib/admin-emails.ts`). If the dev server was started before the var existed, restart it. Sync's dev port often shifts (3000 may be taken by other local projects → it lands on 3001/3002).

2. **`profiles.role` writes via the API are silently reverted.** The project uses the new Supabase `sb_secret_`/`sb_publishable_` API keys. The `profiles_guard_privileged` trigger (`supabase/migrations/0001_profiles.sql`) reverts `role`/`verification_status` for any writer it sees as authenticated/anon, and PostgREST writes with the secret key hit this. So `npm run seed:admins` (a `.from('profiles').upsert`) AND the `promote_to_admin`/`create_admin` RPCs all "succeed" while leaving role unchanged. The OTP self-heal in `src/modules/auth/actions.ts` is broken for the same reason.

   **The only reliable fix: a direct UPDATE as `postgres` in the Supabase SQL Editor**, e.g.
   `update public.profiles p set role='admin' from auth.users u where u.id=p.id and lower(u.email)='muiz@raavon.com';`

Configured admins: `hello@raavon.com` (super_admin), `muiz@raavon.com` (admin) — both passwordless (email OTP). Fixed on 2026-06-17; `seed-admins.ts` was patched to read-back and fail loudly instead of printing a false success.
