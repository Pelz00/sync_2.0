-- ============================================================================
-- 0004_seed_admin_roles.sql
-- Set profiles.role for the founding admins so the DB (the source of truth) is
-- correct - not just the ADMIN_EMAILS allowlist bootstrap.
--
-- WHY THIS IS A DIRECT UPDATE (not seed:admins / promote_to_admin):
-- The profiles column-guard trigger (0001) reverts role for any writer it sees
-- as authenticated/anon. With the new Supabase `sb_secret_`/`sb_publishable_`
-- API keys, ALL PostgREST writes (the seed:admins script AND the
-- promote_to_admin/create_admin RPCs) are reverted this way and leave role
-- unchanged. A migration / the SQL Editor runs as `postgres`, which the trigger
-- allows - so the update below actually sticks.
--
-- Run in Supabase -> SQL Editor (or `supabase db push`). Idempotent.
-- The auth users must already exist (created by `npm run seed:admins`, which
-- creates them correctly even though it can't set the role).
-- ============================================================================

update public.profiles p set role = 'super_admin'
  from auth.users u
  where u.id = p.id and lower(u.email) = 'hello@raavon.com';

update public.profiles p set role = 'admin'
  from auth.users u
  where u.id = p.id and lower(u.email) = 'muiz@raavon.com';

-- Verify (optional): should show super_admin / admin, not student.
--   select u.email, p.role
--   from public.profiles p join auth.users u on u.id = p.id
--   where lower(u.email) in ('hello@raavon.com', 'muiz@raavon.com');
