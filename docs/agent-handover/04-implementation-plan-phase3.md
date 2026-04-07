# Phase 3: Detailed Implementation Plan (API Wiring)

## Current State of the Codebase
1. **Frontend**: UI for both the public website and the `/portal` dashboards is fully built using Tailwind CSS v4 and Next.js App Router.
2. **Database (Supabase)**: The `supabase/schema.sql` establishes tables for Profiles, Reports, Events, Resources, Vlogs, and Attendance. It includes the necessary Triggers and RLS (Row Level Security) policies.
3. **Authentication**: Fully implemented. Custom middleware forces role-specific access controls.
4. **The Missing Link**: All forms in the `/portal/chapter` and `/portal/volunteer` dashboards currently use mock functions with `setTimeout(resolve, 800)`. They **do not** write to the database yet. The main website pages (`/impact`, `/resources`, etc.) are filled with static placeholder content instead of fetching from the database.

---

## Goal of Phase 3
To replace all mock form submissions with Server Actions (or API routes) that write to Supabase, and to replace static public website pages with Server Components that read `published` data from Supabase.

### Step 1: Execute Database Schema
The very first action the next agent must take is ensuring `supabase/schema.sql` has been executed inside the user's Supabase instance. Without this, the upcoming APIs will throw "relation does not exist" errors.

### Step 2: Implement Write APIs (Portal Submissions)
We will build Next.js Server Actions (inside `app/portal/actions.ts` or scoped to the feature folders) to handle form data:

1. **Chapter Resource APIs** (`/portal/chapter/*`)
   - `submitChapterReport(formData)`: Inserts into the `reports` table. Required fields: `title`, `content_body`, `images[]`. Sets `status = 'pending_verification'`.
   - `submitChapterEvent(formData)`: Inserts into the `events` table. Required fields: `event_name`, `date`, `location`, `description`. Sets `status = 'pending_verification'`.

2. **Volunteer Contribution APIs** (`/portal/volunteer/*`)
   - `uploadVolunteerResource(formData)`: Handles file streams. Uploads the provided Document/PDF to the Supabase Storage Bucket `resources_bucket`. Once uploaded, inserts the file's public URL and metadata into the `resources` table with `status = 'pending_verification'`.
   - `submitVolunteerVlog(formData)`: Validates the YouTube/Vimeo URL format. Inserts into the `vlogs` table.
   - `logVolunteerHours(formData)`: Inserts `hours_worked` and `activity_description` into the `volunteer_attendance` table for Admin payroll/tracking.

### Step 3: Implement Verification Logic (Admin Dashboard)
The Admin Approvals page (`/portal/admin/approvals/page.tsx`) needs to be wired up.
- **Fetch**: Query all tables (`reports`, `events`, `resources`, `vlogs`) where `status = 'pending_verification'`.
- **Action (`verifySubmission`)**: A Server Action that takes an `item_id` and `table_name`. It executes `UPDATE {table_name} SET status = 'published' WHERE id = {item_id}`.

### Step 4: Implement Read APIs (Public Website Bridging)
Once the Admin can verify pending submissions, the main website must display them. We will convert the static public pages into async Server Components that query Supabase.

1. **Impact Page (`app/impact/page.tsx`)**:
   - `const { data: reports } = await supabase.from('reports').select('*').eq('status', 'published')`
   - Map over `reports` to replace the static HTML UI cards.

2. **Programs Page (`app/programs/page.tsx`)**:
   - `const { data: events } = await supabase.from('events').select('*').eq('status', 'published').gte('date', today)`
   - Show upcoming verified events dynamically.

3. **Resources Page (`app/resources/page.tsx`)**:
   - `const { data: resources } = await supabase.from('resources').select('*').eq('status', 'published')`
   - Render download links to the files stored in Supabase Storage.

## Validation Strategy
The final step of Phase 3 is full End-to-End testing:
1. Log in as a Chapter -> Submit a Report.
2. Verify the Report does *not* show up on the public `/impact` page yet.
3. Log in as Admin -> Go to Approvals -> Click "Approve" on the new Report.
4. Go to the public `/impact` page -> Verify the Report is now visible to the public.
