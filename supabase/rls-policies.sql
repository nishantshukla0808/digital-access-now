-- ============================================================
-- SUPPLEMENTAL RLS POLICIES
-- Run this in the Supabase SQL Editor AFTER the main schema.sql
-- ============================================================

-- USERS: Allow users to read their own profile
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

-- REPORTS: Chapters can insert their own reports
create policy "Chapters can insert reports"
  on public.reports for insert
  with check (auth.uid() = chapter_id);

-- REPORTS: Chapters can read their own reports
create policy "Chapters can read own reports"
  on public.reports for select
  using (auth.uid() = chapter_id OR status = 'published');

-- REPORTS: Admins can update status on any report
create policy "Admins can update report status"
  on public.reports for update
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- EVENTS: Chapters can insert their own events
create policy "Chapters can insert events"
  on public.events for insert
  with check (auth.uid() = chapter_id);

-- EVENTS: Chapters can read their own events
create policy "Chapters can read own events"
  on public.events for select
  using (auth.uid() = chapter_id OR status = 'published');

-- EVENTS: Admins can update event status
create policy "Admins can update event status"
  on public.events for update
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- RESOURCES: Volunteers can insert their own resources
create policy "Volunteers can insert resources"
  on public.resources for insert
  with check (auth.uid() = volunteer_id);

-- RESOURCES: Volunteers can read their own resources
create policy "Volunteers can read own resources"
  on public.resources for select
  using (auth.uid() = volunteer_id OR status = 'published');

-- RESOURCES: Admins can update resource status
create policy "Admins can update resource status"
  on public.resources for update
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- VLOGS: Volunteers can insert their own vlogs
create policy "Volunteers can insert vlogs"
  on public.vlogs for insert
  with check (auth.uid() = volunteer_id);

-- VLOGS: Volunteers can read their own vlogs
create policy "Volunteers can read own vlogs"
  on public.vlogs for select
  using (auth.uid() = volunteer_id OR status = 'published');

-- VLOGS: Admins can update vlog status
create policy "Admins can update vlog status"
  on public.vlogs for update
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- VOLUNTEER_ATTENDANCE: Volunteers can insert hours
create policy "Volunteers can log hours"
  on public.volunteer_attendance for insert
  with check (auth.uid() = volunteer_id);

-- VOLUNTEER_ATTENDANCE: Volunteers can read own hours
create policy "Volunteers can read own attendance"
  on public.volunteer_attendance for select
  using (auth.uid() = volunteer_id);

-- VOLUNTEER_ATTENDANCE: Admins can read all attendance
create policy "Admins can read all attendance"
  on public.volunteer_attendance for select
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- VOLUNTEER_ATTENDANCE: Admins can verify hours
create policy "Admins can update attendance status"
  on public.volunteer_attendance for update
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- USERS: Admins can read all users
create policy "Admins can read all users"
  on public.users for select
  using (
    exists (select 1 from public.users where id = auth.uid() and role = 'ADMIN')
  );

-- STORAGE: Allow authenticated users to upload to resources_bucket
-- (Run this command in Supabase Dashboard → Storage → New Bucket → name: "resources_bucket", Public: true)
-- Then in Storage Policies, add:
-- INSERT policy: (auth.role() = 'authenticated')
-- SELECT policy: true (public read)
