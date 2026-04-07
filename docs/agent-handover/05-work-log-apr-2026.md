# Work Log (Apr 2026)

## Context
This log covers work done after reading the handover docs. It includes auth/login debugging, build fixes, and Supabase trigger updates.

## Defined Error
Supabase project status shows **Unhealthy** in the dashboard. This typically means the project is paused, failed to start, or has unavailable services (Auth/DB/Storage). When unhealthy, server-side Supabase calls fail with `fetch failed` and auth refresh retries.

Recommended checks:
- Visit https://pykqcefhqgvdhcafvxlc.supabase.co/auth/v1/health (should return {"status":"ok"}).
- Unpause or restart the Supabase project from the dashboard if it is paused.
- Verify network/VPN/proxy is not blocking Supabase.

## Changes Made
1) **Login/Register error visibility**
- Added UI banners for `error` and `message` query params so Supabase auth errors are visible.
- Files changed:
  - app/portal/login/page.tsx
  - app/portal/register/page.tsx

2) **Portal logout server action fix**
- Removed inline `use server` action from client component and used exported server action.
- File changed:
  - components/portal/portal-shell.tsx

3) **Supabase middleware resiliency**
- Wrapped `supabase.auth.getUser()` in try/catch to avoid crashes on network errors; treat user as unauthenticated if fetch fails.
- File changed:
  - lib/supabase/middleware.ts

4) **Supabase trigger safety**
- Updated SQL to set `search_path = public` on `handle_new_user()` to prevent "Database error saving new user" during signup.
- File changed:
  - supabase/schema.sql
- **Important**: This SQL must be executed in Supabase SQL Editor (not just in the repo).

## Root Causes Observed
- Signup failed with "Database error saving new user" due to missing `search_path` in the trigger (fixed in schema and provided SQL).
- Login failed with "Invalid login credentials"; likely due to email confirmation, wrong project credentials, or auth failures from unhealthy Supabase instance.
- Dev server error: `fetch failed` from Supabase Auth client due to Supabase project unhealthy or network issue.

## Outstanding Next Steps
1) Ensure Supabase project is healthy (unpause/restart in dashboard).
2) Run the updated trigger SQL in Supabase SQL Editor.
3) Confirm email confirmation settings in Supabase Auth; if enabled, user must confirm via email before login.
4) Verify `.env.local` points to the same Supabase project where users were created.
5) Continue Phase 3 API wiring once auth is stable.

## Useful Links/Notes
- Supabase URL: https://pykqcefhqgvdhcafvxlc.supabase.co
- Supabase health endpoint: https://pykqcefhqgvdhcafvxlc.supabase.co/auth/v1/health
- Auth trigger SQL (already updated in supabase/schema.sql):
  - create or replace function public.handle_new_user() ... set search_path = public
