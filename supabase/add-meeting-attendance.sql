-- ============================================================
-- MEETING ATTENDANCE (weekly / bi-weekly Google Meet meetings)
-- Run this in the Supabase SQL Editor, once, BEFORE using the
-- /portal/admin/meetings pages. Safe to run more than once
-- (all statements are IF NOT EXISTS / DROP IF EXISTS + CREATE).
-- Additive only: no DROP of existing tables, no data loss.
--
-- This is NOT the volunteer hours log (volunteer_attendance).
-- Meetings track who joined a Meet late (after 10 minutes of
-- the scheduled start) and who left early (more than 10
-- minutes before the scheduled end), from a CSV exported by a
-- Google Meet attendance extension.
-- ============================================================

-- UUID generator for primary keys
create extension if not exists "pgcrypto";

-- The RLS policies below check the single roles[] system (audit §10).
-- If the live users table does not have roles yet, add it here so the
-- policies can be created. Additive only; existing rows default to
-- VOLUNTEER. If roles already exists this statement is a no-op.
alter table public.users
  add column if not exists roles text[] not null default '{VOLUNTEER}';

-- ─── meetings ───────────────────────────────────────────────────
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  meet_link text,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint meetings_end_after_start check (scheduled_end > scheduled_start)
);

-- ─── meeting_attendance ─────────────────────────────────────────
create table if not exists public.meeting_attendance (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  name text not null,
  email text not null,
  first_join timestamptz,
  last_leave timestamptz,
  total_minutes integer not null default 0,
  is_late boolean not null default false,
  left_early boolean not null default false,
  minutes_late integer not null default 0,
  created_at timestamptz not null default now()
);

-- One row per person per meeting: re-importing the same CSV is a no-op.
-- The server action stores emails lowercased + trimmed, so the plain
-- (meeting_id, email) key is enough — no expression index needed.
create unique index if not exists meeting_attendance_meeting_email_key
  on public.meeting_attendance (meeting_id, email);
create index if not exists meeting_attendance_meeting_id_idx
  on public.meeting_attendance (meeting_id);

-- ─── RLS: admin-only, no public access ──────────────────────────
-- No SECURITY DEFINER helpers: the admin check is a plain EXISTS
-- against the users table. It accepts ADMIN from either role system
-- because the live DB still carries both (audit §7.5) — the roles[]
-- half is the future-proof one. Drop the `u.role = 'ADMIN'` half
-- once the clean backend removes the single `role` column.
alter table public.meetings enable row level security;
alter table public.meeting_attendance enable row level security;

drop policy if exists "Admins can manage meetings" on public.meetings;
create policy "Admins can manage meetings"
  on public.meetings for all
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

drop policy if exists "Admins can manage meeting attendance" on public.meeting_attendance;
create policy "Admins can manage meeting attendance"
  on public.meeting_attendance for all
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
