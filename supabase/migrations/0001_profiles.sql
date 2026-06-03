-- ============================================================================
-- 0001_profiles.sql
-- Server-trusted user + vendor profile. `user_metadata` is editable by the user
-- themselves, so it must NOT be the source of truth for role/category. This
-- table is: populated by a signup trigger (which can only assign student/vendor,
-- never admin), readable for browsing/the map, and writable only via the server.
--
-- Policy:
--   * role is IMMUTABLE by the user (and never self-assignable to admin).
--   * Account "deletion" = ARCHIVE (set archived_at), never a hard delete, so
--     records are retained for future auditing. Archived profiles drop out of
--     public reads but the row persists (visible to the server / admins).
--
-- Run in Supabase → SQL Editor (or `supabase db push`).
-- ============================================================================

create table if not exists public.profiles (
  id                   uuid primary key references auth.users (id) on delete cascade,
  role                 text not null default 'student'
                         check (role in ('student', 'vendor', 'admin', 'super_admin')),
  full_name            text,
  phone                text,
  -- Vendor-only (null for students):
  vendor_category      text check (vendor_category in
                         ('landlord', 'food', 'beauty', 'laundry', 'tradesman')),
  trade                text check (trade in
                         ('carpenter', 'plumber', 'tailor', 'electrician',
                          'mechanic', 'painter', 'other')),
  business_name        text,
  sells                text,
  business_address     text,
  verification_status  text not null default 'unverified'
                         check (verification_status in
                         ('unverified', 'pending', 'verified', 'rejected')),
  -- Soft-delete / archive for auditing - we never hard-delete accounts.
  archived_at          timestamptz,
  archived_reason      text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- Make re-runs safe if an earlier version of this table already exists (the
-- create-if-not-exists above won't add new columns/constraints to it).
alter table public.profiles add column if not exists archived_at     timestamptz;
alter table public.profiles add column if not exists archived_reason text;
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'vendor', 'admin', 'super_admin'));

-- Indexes for browse / map / admin queries (and RLS performance).
create index if not exists profiles_role_idx               on public.profiles (role);
create index if not exists profiles_vendor_category_idx     on public.profiles (vendor_category);
create index if not exists profiles_verification_status_idx on public.profiles (verification_status);
-- Speeds up the >60-day auto-purge sweep + archived lookups.
create index if not exists profiles_archived_at_idx         on public.profiles (archived_at)
                                                            where archived_at is not null;

-- ── Row-Level Security ──────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Anyone (incl. signed-out) can read ACTIVE profiles — needed to browse vendors
-- and power the /around map. Archived (soft-deleted) profiles drop out of public
-- reads but the row is retained for auditing (server/admin can still read it).
drop policy if exists "profiles_select_all" on public.profiles;
drop policy if exists "profiles_select_active" on public.profiles;
create policy "profiles_select_active"
  on public.profiles for select
  using (archived_at is null);

-- A user may update only their OWN non-privileged fields. role and
-- verification_status are intentionally NOT updatable from the client (server
-- controls them); enforced via a column trigger below since RLS is row-level.
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Block client changes to privileged columns even on their own row. The server
-- (service role) bypasses RLS and these triggers, so it can still set them.
create or replace function public.guard_profile_privileged_cols()
returns trigger language plpgsql as $$
begin
  -- Block privileged-column changes only from end users: PostgREST runs their
  -- requests as the 'authenticated'/'anon' Postgres roles. The service role and
  -- the SQL editor (postgres / supabase_admin) may set role/verification_status.
  if current_user in ('authenticated', 'anon') then
    new.role := old.role;
    new.verification_status := old.verification_status;
  end if;
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists profiles_guard_privileged on public.profiles;
create trigger profiles_guard_privileged
  before update on public.profiles
  for each row execute function public.guard_profile_privileged_cols();

-- ── Auto-create a profile on signup ─────────────────────────────────────────
-- Reads signup metadata, but role is clamped to student/vendor so a malicious
-- client can never self-assign admin. verification_status always starts clean.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, role, full_name, phone, vendor_category, trade,
    business_name, sells, business_address
  )
  values (
    new.id,
    case when new.raw_user_meta_data ->> 'role' = 'vendor' then 'vendor' else 'student' end,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    nullif(new.raw_user_meta_data ->> 'vendor_category', ''),
    nullif(new.raw_user_meta_data ->> 'trade', ''),
    new.raw_user_meta_data ->> 'business_name',
    new.raw_user_meta_data ->> 'sells',
    new.raw_user_meta_data ->> 'business_address'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Backfill existing users ─────────────────────────────────────────────────
insert into public.profiles (
  id, role, full_name, phone, vendor_category, trade,
  business_name, sells, business_address, verification_status
)
select
  u.id,
  case when u.raw_user_meta_data ->> 'role' = 'vendor' then 'vendor' else 'student' end,
  u.raw_user_meta_data ->> 'full_name',
  u.raw_user_meta_data ->> 'phone',
  nullif(u.raw_user_meta_data ->> 'vendor_category', ''),
  nullif(u.raw_user_meta_data ->> 'trade', ''),
  u.raw_user_meta_data ->> 'business_name',
  u.raw_user_meta_data ->> 'sells',
  u.raw_user_meta_data ->> 'business_address',
  coalesce(u.raw_user_meta_data ->> 'verification_status', 'unverified')
from auth.users u
on conflict (id) do nothing;
