# Digital Access Now (DAN) - Project Context

## Project Overview
Digital Access Now (DAN) is a platform dedicated to donating tech resources to individuals and communities in need. 
The application acts as both a **public-facing website** for general information and donation drives, and an internal **Operations Portal** (`/portal/*`) for team management and operations.

## Technology Stack
- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Database/Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Language**: TypeScript

## Repository & Infrastructure
- **GitHub Repo**: *(Please insert GitHub repo link here)*
- **Database Host**: Supabase (Project ID: `pykqcefhqgvdhcafvxlc`) 

## Environment Variables (`.env.local`)
The application relies heavily on Supabase credentials. Ensure the `.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://pykqcefhqgvdhcafvxlc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (your anon key)
```

## Architecture & Authentication
The portal completely relies on **Supabase Auth**. 
- We bypass standard email/password routing for custom middleware.
- `lib/supabase/middleware.ts` forces unauthenticated users on `/portal/*` to be redirected to `/portal/login`, except for the auth pages (`/portal/login`, `/portal/register`, `/portal/forgot-password`, `/portal/update-password`).
- **Database Schema**: Located in `supabase/schema.sql`. This must be applied directly to the Supabase SQL Editor. It includes triggers that automatically format User IDs upon registration:
  - Admin: `ADM-XXXX`
  - Chapter: `CH-XXXX`
  - Volunteer: `VOL-XXXX`
