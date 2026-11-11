-- ============================================================
-- ATTENDANCE DEDUP — optional defence-in-depth for the log-hours fix
-- Run this in the Supabase SQL Editor, once, AFTER the code change.
-- Safe to run more than once (IF NOT EXISTS). Additive only: no DROP,
-- no data loss, no column changes.
--
-- What it does: a partial unique index that rejects a second identical
-- volunteer_attendance row for the same volunteer + same calendar date
-- (UTC) + same activity text, even if two requests race past the
-- server-side check in logVolunteerHours(). Rows an admin already
-- rejected are excluded, so a rejected log can be entered again.
--
-- The server-side duplicate check in app/portal/submissions.ts is the
-- primary enforcement and works without this index. This file is
-- optional hardening — skip it if you prefer, nothing else depends on it.
--
-- If this statement FAILS, it means duplicate rows already exist in the
-- live table. Find them first with the query at the bottom, delete or
-- correct the extras, then run this file again.
-- ============================================================

create unique index if not exists volunteer_attendance_no_duplicate_idx
  on public.volunteer_attendance (
    volunteer_id,
    ((date at time zone 'UTC')::date),
    activity_description
  )
  where status is distinct from 'rejected';

-- Find existing duplicates (run this first if the index creation fails):
-- select volunteer_id, (date at time zone 'UTC')::date as log_date,
--        activity_description, count(*) as rows
--   from public.volunteer_attendance
--  where status is distinct from 'rejected'
--  group by volunteer_id, (date at time zone 'UTC')::date, activity_description
-- having count(*) > 1
--  order by log_date desc;
