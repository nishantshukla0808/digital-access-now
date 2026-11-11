-- ============================================================
-- WEBSITE USERS (separate from portal users)
-- Run this in the Supabase SQL Editor, once, BEFORE deploying the
-- website register dialog. Safe to run more than once (all statements
-- are IF NOT EXISTS / DROP IF EXISTS + CREATE).
--
-- THE MODEL (decided 2026-11-12):
--   - Supabase Auth (auth.users) is the identity layer for everyone.
--   - Portal people (Volunteer / Chapter / Admin) live ONLY in
--     public.users, created only via the portal registration.
--   - Website visitors live ONLY in public.website_users, created by
--     the website register dialog. The same email may exist in BOTH
--     tables — a volunteer can also be a website user. The two profile
--     rows are independent.
--
-- THE TRIGGER (read this before running):
--   handle_new_user() fires on EVERY auth.users insert and creates a
--   public.users row. That is wrong for website signups, so this file
--   REPLACES the function with a gated version: when the auth user's
--   metadata has account_type = 'website', the trigger returns early
--   and creates NO portal row.
--
--   The function has been defined THREE times in this repo, and nobody
--   knows which version is live (the files were pasted into the SQL
--   Editor in undocumented order):
--     v1  supabase/schema.sql               — IDs ADM-/CH-/VOL- + serial,
--                                             no roles[] column, no ON CONFLICT
--     v2  supabase/update-credential-format.sql — IDs DAN-{ROLE}-{YEAR}-{SERIAL},
--                                             no roles[] column, no ON CONFLICT
--     v3  supabase/add-multi-role.sql       — IDs DAN-{ROLE}-{YEAR}-{SERIAL},
--                                             populates roles[], ON CONFLICT DO NOTHING
--   The gated version below is v3-equivalent + the website gate, and it
--   works no matter which version is live right now:
--     - Custom IDs use the v2/v3 format DAN-{ROLE}-{YEAR}-{SERIAL}.
--       (If v1 was live, new portal signups will get DAN- IDs instead
--       of ADM- IDs. Both formats already coexist in the table — existing
--       rows are never renamed.)
--     - roles[] is populated when the column exists; when it does not
--       (add-multi-role.sql never run), the insert omits it and the
--       portal signup still works.
--     - ON CONFLICT (id) DO NOTHING guards against a double-fire.
--   Running this file changes the trigger for ALL future signups.
--   Portal signups are otherwise unaffected: same role-from-metadata
--   logic, same custom_id sequence (custom_id_seq), same SECURITY
--   DEFINER function. Existing rows are NOT touched by this file.
--
-- DEPLOY ORDER: run this file FIRST, then deploy the dialog code.
-- If the dialog goes live before this file runs, the OLD trigger will
-- create a portal users row for each website signup (role VOLUNTEER).
-- The website signup action deletes such a row as a safety net, but do
-- not rely on it — run this file first.
-- ============================================================

-- ─── website_users table ──────────────────────────────────────────
create table if not exists public.website_users (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  full_name text,
  newsletter_opt_in boolean not null default false,
  newsletter_opt_in_at timestamptz,
  is_email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── RLS: own row only, no public access ──────────────────────────
-- Rows are created by the app through the service client (which
-- bypasses RLS). A logged-in website user can read and update only
-- their own row. There is deliberately NO insert policy: website
-- signups go through the server action, never directly from a client.
alter table public.website_users enable row level security;

drop policy if exists "Website users can read own profile" on public.website_users;
create policy "Website users can read own profile"
  on public.website_users for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Website users can update own profile" on public.website_users;
create policy "Website users can update own profile"
  on public.website_users for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ─── GATED handle_new_user() ──────────────────────────────────────
-- Replaces whichever of the three versions is live. Portal behavior
-- is preserved (see header); website signups (account_type='website'
-- in user_metadata) skip the portal-row creation entirely.
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_custom_id text;
  user_role text;
  current_year text;
  serial_num text;
begin
  -- WEBSITE GATE: website visitors are NOT portal users. Their profile
  -- row lives in public.website_users, created by the app — not here.
  -- Return before consuming a custom_id sequence number.
  if coalesce(new.raw_user_meta_data->>'account_type', '') = 'website' then
    return new;
  end if;

  user_role := coalesce((new.raw_user_meta_data->>'role'), 'VOLUNTEER');
  current_year := extract(year from now())::text;
  serial_num := nextval('custom_id_seq')::text;

  if user_role = 'ADMIN' then
    new_custom_id := 'DAN-ADM-' || current_year || '-' || serial_num;
  elsif user_role = 'CHAPTER' then
    new_custom_id := 'DAN-CH-' || current_year || '-' || serial_num;
  else
    new_custom_id := 'DAN-VOL-' || current_year || '-' || serial_num;
  end if;

  -- roles[] exists only if supabase/add-multi-role.sql was run. Insert
  -- with roles when the column is there, without it when it is not, so
  -- this function works no matter which old trigger version is live.
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'users'
      and column_name = 'roles'
  ) then
    insert into public.users (id, custom_id, email, role, roles, full_name)
    values (
      new.id,
      new_custom_id,
      new.email,
      user_role,
      ARRAY[user_role],
      new.raw_user_meta_data->>'full_name'
    )
    on conflict (id) do nothing;
  else
    insert into public.users (id, custom_id, email, role, full_name)
    values (
      new.id,
      new_custom_id,
      new.email,
      user_role,
      new.raw_user_meta_data->>'full_name'
    )
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Re-create the trigger on the (possibly replaced) function.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
