-- ============================================================================
-- 0002_login_method.sql
-- login_method(email): tells the login form which input to show. Admins /
-- super_admins are passwordless ('otp'); everyone else uses a password.
--
-- SECURITY DEFINER so it can read auth.users. Callable ONLY by the service role
-- (the login route uses the admin client) - never anon/authenticated - to limit
-- account enumeration. Unknown emails return 'password' (don't reveal anything).
--
-- Run in Supabase → SQL Editor (or `supabase db push`).
-- ============================================================================
create or replace function public.login_method(p_email text)
returns text
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  r text;
begin
  select pr.role
    into r
    from auth.users u
    join public.profiles pr on pr.id = u.id
   where lower(u.email) = lower(p_email)
   limit 1;

  if r in ('admin', 'super_admin') then
    return 'otp';
  end if;
  return 'password';
end;
$$;

-- Lock it down: only the service role (which bypasses these grants) should call it.
revoke all on function public.login_method(text) from public;
revoke all on function public.login_method(text) from anon, authenticated;
