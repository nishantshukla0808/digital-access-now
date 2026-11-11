-- ============================================================
-- MEETING EXPECTED ATTENDEES (the Absent feature) + DEFAULT ROSTER
-- Run this in the Supabase SQL Editor, once, BEFORE deploying the
-- Absent-feature code. Safe to run more than once (all statements
-- are IF NOT EXISTS / DROP IF EXISTS + CREATE).
-- Additive only: two new tables + two new columns on existing
-- tables (is_absent on meeting_attendance, from_defaults on
-- meeting_expected_attendees — both default false, existing rows
-- are untouched and keep behaving exactly as before). No DROP of
-- existing tables, no data loss.
--
-- WHY A SEPARATE TABLE: the attendance CSV only lists people who
-- joined. To know who was absent, the admin lists who was expected
-- for each meeting; anyone expected but missing from the CSV is
-- marked Absent. The list is per meeting and typed in by hand —
-- there is no Google Calendar API wiring in the webapp, so the
-- invitees are NOT pulled from Calendar automatically. Manual and
-- explicit beats a silent wrong guess.
--
-- WHY A DEFAULT ROSTER TOO: the same members attend every meeting,
-- so typing the list before every meeting is repetitive. The admin
-- saves the roster ONCE in meeting_expected_defaults; every new
-- meeting copies it into its own expected list automatically. A
-- typed list on the schedule form still wins for that meeting, and
-- editing one meeting's list never touches the defaults or other
-- meetings. The copy is a copy: later edits to the defaults only
-- affect meetings scheduled after the edit.
--
-- DEPLOY ORDER: supabase/add-meeting-attendance.sql FIRST (already
-- live), then this file, then the code. This file references the
-- meetings and meeting_attendance tables, so running it before the
-- first file fails at the first CREATE TABLE.
-- ============================================================

-- UUID generator for primary keys (no-op if already enabled)
create extension if not exists "pgcrypto";

-- The RLS policy below checks the roles[] system. If the live users
-- table does not have roles yet, add it here so the policy can be
-- created. Additive only; existing rows default to VOLUNTEER. If
-- roles already exists this statement is a no-op. (Same line as in
-- add-meeting-attendance.sql, repeated so this file works standalone
-- after that file.)
alter table public.users
  add column if not exists roles text[] not null default '{VOLUNTEER}';

-- ─── meeting_expected_attendees ─────────────────────────────────
create table if not exists public.meeting_expected_attendees (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  email text not null,
  full_name text,
  -- True when this row was copied from the default roster at
  -- scheduling time (lets the meeting page say so). Manually added
  -- rows are false. Included in CREATE TABLE for fresh installs;
  -- the ALTER below covers a table created by an earlier version of
  -- this file (which did not have the column).
  from_defaults boolean not null default false,
  created_at timestamptz not null default now()
);

-- One expected entry per person per meeting. The index is on
-- lower(email) because emails are matched case-insensitively
-- everywhere in the tracker (the server lowercases them before
-- insert; the index is the backstop for anything inserted by hand
-- or through a second client).
create unique index if not exists meeting_expected_attendees_meeting_email_key
  on public.meeting_expected_attendees (meeting_id, (lower(email)));
create index if not exists meeting_expected_attendees_meeting_id_idx
  on public.meeting_expected_attendees (meeting_id);

alter table public.meeting_expected_attendees
  add column if not exists from_defaults boolean not null default false;

-- ─── meeting_expected_defaults (the saved roster) ───────────────
-- One row per regular member. Saved once on the meetings page,
-- copied into every new meeting's expected list (unless the admin
-- types a list for that meeting instead). NOT linked to meetings:
-- editing or removing a default never changes a meeting that was
-- already scheduled — those meetings hold their own copies.
create table if not exists public.meeting_expected_defaults (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

-- One roster entry per email (case-insensitive).
create unique index if not exists meeting_expected_defaults_email_key
  on public.meeting_expected_defaults ((lower(email)));

-- ─── is_absent marker on meeting_attendance ─────────────────────
-- An Absent row lives in meeting_attendance like any other row
-- (same table, same unique key on (meeting_id, email), same CSV
-- export), with no join/leave times. The flag is what tells it
-- apart from a "No data" row (a CSV row with no times) — and it is
-- what the remove-expected action checks, so deleting an expected
-- attendee can only ever delete Absent rows, never real attendance.
alter table public.meeting_attendance
  add column if not exists is_absent boolean not null default false;

-- ─── RLS: admin-only, no public access ──────────────────────────
-- Same pattern as add-meeting-attendance.sql: ADMIN accepted from
-- either role system (roles[] or the single role column), because
-- the live DB still carries both (audit §7.5). The roles[] half is
-- the future-proof one.
alter table public.meeting_expected_attendees enable row level security;

drop policy if exists "Admins can manage meeting expected attendees" on public.meeting_expected_attendees;
create policy "Admins can manage meeting expected attendees"
  on public.meeting_expected_attendees for all
  using (
    exists (select 1 from public.users u
            where u.id = auth.uid()
              and ('ADMIN' = any(u.roles) or u.role = 'ADMIN'))
  )
  with check (
    exists (select 1 from public.users u
            where u.id = auth.uid()
              and ('ADMIN' = any(u.roles) or u.role = 'ADMIN'))
  );

-- ─── RLS for the default roster: admin-only, same pattern ───────
alter table public.meeting_expected_defaults enable row level security;

drop policy if exists "Admins can manage meeting expected defaults" on public.meeting_expected_defaults;
create policy "Admins can manage meeting expected defaults"
  on public.meeting_expected_defaults for all
  using (
    exists (select 1 from public.users u
            where u.id = auth.uid()
              and ('ADMIN' = any(u.roles) or u.role = 'ADMIN'))
  )
  with check (
    exists (select 1 from public.users u
            where u.id = auth.uid()
              and ('ADMIN' = any(u.roles) or u.role = 'ADMIN'))
  );
