# Digital Access Now (DAN) Portal Documentation
**Comprehensive Guide for Developers, Interns, and Project Managers**

This document details the architecture, roles, features, and workflows of the Digital Access Now custom web portal. It serves as a foundational guide to understand how the private portal connects to the public-facing areas of the platform.

---

## 1. System Architecture overview
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL) 
- **Authentication**: Custom Secure OTP Verification using Resend. (Bypasses standard Supabase Auth rate limits for high reliability).
- **Security model**: Strictly enforced through Supabase Row Level Security (RLS) policies and layout-level route protection. Only admins can bypass RLS via the `service-role` key for broad CMS mutations.
- **Styling**: Tailwind CSS utilizing a modern glassmorphism design system (cards, blur backgrounds, distinct gradients).

---

## 2. Authentication Flow
Instead of traditional passwords, the portal utilizes a highly secure, passwordless OTP (One-Time Password) workflow:
1. User enters their email on `/portal/login` or creates an account on `/portal/register`.
2. A custom 6-digit OTP code is generated and securely emailed via Resend.
3. User enters the OTP to establish an authenticated Supabase session.
4. The system checks the `users` database table to determine their exact role (`admin`, `chapter`, or `volunteer`), and redirects them to their respective dashboard view.

---

## 3. Role Breakdown & Features

### 👨‍💻 Role: Global Administrator (`admin`)
The Admin role has unrestricted control over the public website's content and organization-wide user access.

**Key Workflows:**
* **Admin Dashboard (`/portal/admin/dashboard`)**: 
  The mission control. Features live counts of all registered users and highlights items sitting in the pending review queue. Admins can click directly into actions from here.
* **Content Approvals (`/portal/admin/approvals`)**: 
  When chapters submit events or reports, they land here. Admins review the submission and either hit **Publish** (making it live on the main website) or **Reject** (returning it for edits). 
* **Content CMS Manager (`/portal/admin/content`)**: 
  If an admin spots a typo on a live public post, they use this interface. It lists all *currently published* Reports, Events, Resources, and Vlogs. Admins can **Unpublish** (move back to the approvals queue) or **Permanent Delete**.
* **Team Members CMS (`/portal/admin/team`)**:
  A dynamic CRUD (Create, Read, Update, Delete) area controlling the `/about/our-team` public page. Admins can add new leadership bios, role titles, and profile images, which instantly updates the website.
* **User Management (`/portal/admin/users`)**: 
  Admins review new signups here, modify an individual's role from `volunteer` to `chapter`, and administer access controls.

### 🏢 Role: Chapter Leader (`chapter`)
The Chapter role represents local branch leaders (e.g., DAN Pakistan, DAN Philadelphia). Their workflows revolve around submitting their local impact data and managing community events.

**Key Workflows:**
* **Chapter Dashboard (`/portal/chapter/dashboard`)**: 
  A tailored view displaying the chapter's specific success metrics (e.g., Total reports filed, pending submissions, upcoming local events).
* **Submit Impact Report (`/portal/chapter/submit-report`)**:
  A form where chapters log metrics (devices distributed, people trained) and stories. When saved, the status becomes `pending_verification` and alerts the Admin team. Once an admin approves it, the report auto-populates the public `/impact` page.
* **Submit Local Event (`/portal/chapter/submit-event`)**:
  Chapters can schedule events like completely "Digital Literacy Bootcamps" or "Device Drives." Similar to reports, these are held for admin review, and once published, appear on the public `/events` timeline.
* **My Submissions (`/portal/chapter/my-submissions`)**: 
  A transparency feature. Chapter leaders can see a live table of everything they have submitted and check its real-time status (`Published`, `Pending Review`, or `Rejected`).
* **Resources Hub (`/portal/chapter/resources`):** 
  A library of admin-approved templates, slide decks, and device refurbishment SOPs crucial to chapter operations.

### 🤝 Role: Volunteer (`volunteer`)
The Volunteer role is the entry-level tier assigned upon initial registration. This tier has intentionally restricted visibility to prevent data clutter. 

**Key Workflows:**
* **Restricted Dashboard**: Cannot access high-level metrics or chapter-specific workflows.
* **Resource Access**: Can view and download training materials necessary for their volunteer work (e.g., standard operating procedures, educational curriculum).
* **Submissions**: Volunteers can submit generalized community "Resources" or "Vlogs" for admin review, which, if approved, benefit the global DAN network.

---

## 4. Public Site "Hydration" (How the CMS works)
The entire public-facing website (`/events`, `/impact/our-impact`, `/programs`, `/about/our-team`) is **Dynamic**. 
None of the content is hardcoded.

1. **Async Server Components**: The public pages use Next.js server components to communicate directly with Supabase on page load.
2. **Filtering**: They run queries specifically looking for items where `status = 'published'`. 
3. **Fallback Mechanisms**: If the database is completely empty (e.g., during a fresh deployment before `seed-content.sql` is run), the UI automatically outputs gracefully prepared placeholder arrays to ensure the website is never blank or broken.

## 5. Development Reminders for Interns 
- **Bypassing RLS:** By default, Supabase RLS prevents standard users from editing other users' data. When writing an Admin function (like `unpublishContent`), you MUST use the Server Actions file (`admin-actions.ts`) utilizing the `service-role` key securely hidden in the environment variables to bypass these checks.
- **Database Seeding**: When bringing up a new local environment, always execute `supabase/seed-content.sql` in the Supabase SQL editor to populate the dashboards with testable content. Do not write test data manually via standard forms if you need bulk testing.
- **Always adhere to the Theme**: Ensure that new portal elements use the `PortalShell` layout wrapper and `PortalStatCard` components to maintain the strictly mandated glassmorphism aesthetic.
