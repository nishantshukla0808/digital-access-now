-- ============================================================
-- NEWSLETTER OPT-IN (The Bridge)
-- Run this in the Supabase SQL Editor, once, BEFORE deploying
-- the register-form change (or right after — the code tolerates
-- the columns being missing, but opt-ins are only recorded
-- once the columns exist).
-- Safe to run more than once (all statements are IF NOT EXISTS).
-- Additive only: no DROP, no data loss. Existing users default
-- to NOT opted in (false), so nobody is subscribed without asking.
-- ============================================================

-- Opt-in flag on the user profile (row created by handle_new_user)
alter table public.users
  add column if not exists newsletter_opt_in boolean not null default false;

-- When the user opted in (set at registration when the box is ticked)
alter table public.users
  add column if not exists newsletter_opt_in_at timestamptz;

-- Speed up the weekly export query (only opted-in rows are read)
create index if not exists users_newsletter_opt_in_idx
  on public.users (created_at)
  where newsletter_opt_in = true;

-- No RLS change needed: the admin export reads through the service
-- client (bypasses RLS), and users can already read their own
-- profile row under the existing "Users can read own profile" policy.
