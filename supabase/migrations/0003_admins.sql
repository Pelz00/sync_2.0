-- ============================================================================
-- 0003_admins.sql
-- Create + promote admin / super_admin accounts. Admins are PASSWORDLESS: they
-- sign in with an email OTP (see login_method in 0002). There is no admin signup
-- UI by design, so these are seeded here / by a super_admin.
--
-- Two helpers (service-role / SQL-editor only - revoked from anon+authenticated):
--   • promote_to_admin(email, role)  → set the role on an EXISTING auth user.
--   • create_admin(email, role)      → create the passwordless auth user if it
--                                       doesn't exist, then set the role.
--
-- Run in Supabase → SQL Editor (or `supabase db push`), then seed at the bottom.
-- ============================================================================

-- Set the privileged role on an existing user (migrations run as postgres, so
-- the profiles column-guard trigger allows it).
create or replace function public.promote_to_admin(p_email text, p_role text)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  uid uuid;
begin
  if p_role not in ('admin', 'super_admin') then
    raise exception 'role must be admin or super_admin';
  end if;

  select id into uid from auth.users where lower(email) = lower(p_email) limit 1;
  if uid is null then
    raise exception 'no auth user with email %, create it first (or use create_admin)', p_email;
  end if;

  insert into public.profiles (id, role) values (uid, p_role)
    on conflict (id) do update set role = excluded.role;

  return uid;
end;
$$;

-- Create a passwordless, email-confirmed auth user (if missing) and set the role.
-- NOTE: writes auth.users + auth.identities directly - verify column names match
-- your Supabase version if it errors.
create or replace function public.create_admin(p_email text, p_role text)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  uid uuid;
begin
  if p_role not in ('admin', 'super_admin') then
    raise exception 'role must be admin or super_admin';
  end if;

  select id into uid from auth.users where lower(email) = lower(p_email) limit 1;

  if uid is null then
    uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) values (
      '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
      lower(p_email), now(),
      jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
      '{}'::jsonb, now(), now()
    );
    -- Email identity so OTP sign-in resolves the user.
    insert into auth.identities (
      provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) values (
      uid::text, uid,
      jsonb_build_object('sub', uid::text, 'email', lower(p_email)),
      'email', now(), now(), now()
    );
  end if;

  -- handle_new_user() may have created a clamped (student) profile on insert;
  -- force the privileged role here.
  insert into public.profiles (id, role) values (uid, p_role)
    on conflict (id) do update set role = excluded.role;

  return uid;
end;
$$;

revoke all on function public.promote_to_admin(text, text) from public, anon, authenticated;
revoke all on function public.create_admin(text, text) from public, anon, authenticated;

-- ── Seed the admin accounts ─────────────────────────────────────────────────
-- PREFERRED: `npm run seed:admins` (Supabase Admin API) - reliable across
-- Supabase versions. The SQL below writes auth.users/auth.identities directly,
-- which can error on some versions ("Database error finding user"), so it's left
-- commented. Uncomment only if you can't run the script:
--
--   select public.create_admin('hello@raavon.com', 'super_admin');
--   select public.create_admin('muiz@raavon.com', 'admin');
