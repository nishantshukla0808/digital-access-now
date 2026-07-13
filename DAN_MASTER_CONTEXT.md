# 🌐 DIGITAL ACCESS NOW — MASTER CONTEXT FILE
**Generated**: July 12, 2026 (auto-scanned by AI)  
**Path**: `D:\DAN\digital-access-now`  
**Deployed at**: https://www.digitalaccessnow.org  
**Status**: Active — Portal live, public site in ongoing development

---

## 🏢 ORGANIZATION OVERVIEW

| Field | Value |
|---|---|
| Name | Digital Access Now (DAN) |
| Type | 501(c)(3) Nonprofit |
| Fiscal Sponsor | Registration Nation |
| Tax ID (EIN) | 87-3891341 |
| Founded | Active since at least 2025 |
| HQ | Philadelphia, USA (with global chapters) |
| Mission | Break barriers to digital access so every community can thrive |
| Email | hello@digitalaccessnow.org |
| Phone | +1 (407) 619-5503 |
| Instagram | https://www.instagram.com/digitalaccessnow/ |
| LinkedIn | https://www.linkedin.com/company/digital-access-now/ |
| YouTube | (coming soon) |
| Facebook | (linked but not active) |

### Key Impact Metrics (Seeded in DB)
| Metric | Value |
|---|---|
| Lives Empowered | 340K+ |
| Devices Distributed | 89K+ |
| Communities Served | 245 |
| Countries Active | 52 |
| Donation Raised | $128,400 |
| Donor Count | 1,426 |
| Monthly Goal | $25,000 |

---

## 💻 TECH STACK

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.0.10** (App Router + Turbopack) |
| Language | TypeScript 5 |
| React | 19.2.0 |
| Package Manager | pnpm (also has package-lock.json) |
| Styling | **Tailwind CSS v4.1.9** + tw-animate-css |
| UI Components | **shadcn/ui** (57 components in `/components/ui/`) |
| Icons | Lucide React v0.454 |
| Fonts | **Poppins** (primary body) + **Montserrat** (secondary) via Google Fonts |
| Database | **Supabase** (PostgreSQL with RLS) |
| Auth | **Custom OTP flow** via Resend + Supabase Auth admin API |
| Email Service | **Resend** via `hello@digitalaccessnow.org` |
| Maps | **Leaflet + React-Leaflet** (chapters world map) |
| Charts | **Recharts** (admin dashboards) |
| Forms | React Hook Form + Zod |
| Analytics | Vercel Analytics |
| Deployment | **Vercel** |
| Storage | Supabase Storage (`resources_bucket` — public bucket) |

---

## 🎨 DESIGN SYSTEM

### Brand Colors
```css
/* Brand Custom Colors (globals.css) */
--primary-blue: #00BCD4;      /* Cyan — main brand, CTAs, accents */
--primary-purple: #6633CC;    /* Purple — secondary accent, gradients */
--red-accent: #E63946;        /* DEPRECATED — use primary-blue instead */
--footer-black: #000000;      /* Navbar + Footer background */
--white: #FFFFFF;
--light-gray: #F5F5F5;        /* Section alternating background */
--dark-gray: #333333;
--border-gray: #E0E0E0;
--text-dark: #1A1A1A;
```

> ⚠️ `--red-accent` is marked **Deprecated** in code — new features should use `--primary-blue`.

### Tailwind Aliases (globals.css `@theme inline`)
```
text-primary-blue, bg-primary-blue       → #00BCD4
text-primary-purple, bg-primary-purple   → #6633CC
bg-footer-black                          → #000000
bg-light-gray                            → #F5F5F5
text-text-dark                           → #1A1A1A
```

### Typography
- **Font Sans**: `Montserrat` → `Poppins` → `system-ui`
- **Font Heading**: `Poppins` → `Montserrat` → `system-ui`
- All h1–h6 are `font-bold` by default via `@layer base`
- **h1**: `text-4xl md:text-5xl lg:text-6xl`
- **h2**: `text-3xl md:text-4xl lg:text-5xl`
- **h3**: `text-2xl md:text-3xl`

### Design Patterns
- **Buttons**: `rounded-full`, `font-bold`, `transition-all duration-300`
  - Primary: `bg-primary-blue hover:bg-cyan-600 text-white`
  - Outline: `border border-primary-blue/30 text-primary-blue hover:bg-primary-blue/10`
- **Cards**: `rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- **Sections**: `py-16 md:py-24` for standard spacing
- **Gradient text/sections**: `bg-linear-to-r from-primary-blue to-primary-purple`
- **Hero overlays**: `bg-linear-to-r from-black/60 to-black/30`
- **Border accents**: `border-t-4 border-primary-blue`
- **Bento grid**: Used on homepage highlights gallery
- **`suppressHydrationWarning`**: Added to all interactive buttons/inputs to avoid SSR hydration mismatches

### Portal-Specific Design
- **Sidebar background**: `#04111f` (near-black navy)
- **Portal background**: `linear-gradient(180deg,#f0f9ff 0%,#e8f4fd 100%)`
- **Active nav item**: `bg-primary-blue text-[#04111f]`
- **Page header**: `bg-white` with `border-b border-[#00BCD4]/15`
- **Stat cards** (`PortalStatCard`): Glassmorphism style — white card, primary-blue accent

---

## 🖥️ HEADER / NAVBAR

**File**: [`components/navbar.tsx`](file:///d:/DAN/digital-access-now/components/navbar.tsx)

| Property | Value |
|---|---|
| Position | `fixed`, `z-50` |
| Background | `bg-footer-black` (`#000000`) |
| Text | White |
| Height | `h-28` |
| Logo | `https://i.ibb.co/xKnvQK05/logo-DAN.jpg` — `h-16 sm:h-18 lg:h-20` |

**Desktop Navigation (left-center)**:
```
ABOUT ▾                     (hover dropdown)
  ├── About Us          → /about
  ├── Why Digital Access Now? → /about/why-digital-access-now
  ├── Our Team          → /about/our-team
  └── Our Press         → /about/our-press

VOLUNTEER                   → /volunteer
PROGRAMS                    → /programs
EVENTS                      → /events

IMPACT ▾                    (hover dropdown)
  ├── Our 2025 Report   → /impact/our-2025-report
  ├── Our Impact        → /impact/our-impact
  ├── Our Theory of Change → /impact/our-theory-of-change
  ├── Monitoring & Evaluation → /impact/monitoring-evaluation
  └── Recognition for Impact → /impact/recognition-for-impact

RESOURCES                   → /resources
BLOG                        → /blog
CONTACT US                  → /contact-us
```

**Right side**: Instagram, LinkedIn, YouTube icons + `DONATE` button (rounded-full, bg-primary-blue)

**Dropdown style**: `bg-footer-black`, `border-t-2 border-primary-blue`  
**Hover**: `hover:bg-gray-800`  
**Mobile**: Hamburger → accordion dropdowns, social icons, DONATE button

---

## 🦶 FOOTER

**File**: [`components/footer.tsx`](file:///d:/DAN/digital-access-now/components/footer.tsx)

- Background: `bg-footer-black text-white`
- 4-column grid: Logo+Tagline | Quick Links | Contact | Newsletter
- Quick Links: Home, About, Programs, Volunteer, Resources
- Contact: `hello@digitalaccessnow.org` (Mail icon in `text-primary-blue`)
- Newsletter: email input + Subscribe button (bg-primary-blue)
- Bottom bar: Copyright 2026 + Facebook/Instagram/LinkedIn/YouTube social icons
- Divider: `border-t border-gray-800`
- Hover color on all links: `hover:text-primary-blue`

---

## 📂 FULL PROJECT STRUCTURE

```
digital-access-now/
├── app/
│   ├── globals.css                    # Tailwind v4 + CSS vars + Leaflet map styles
│   ├── layout.tsx                     # Root layout — Poppins/Montserrat fonts, metadata
│   ├── page.tsx                       # Homepage (hero carousel + all sections)
│   │
│   ├── about/
│   │   ├── page.tsx                   # About page (mission, team carousel)
│   │   ├── our-team/page.tsx          # Team members from DB
│   │   ├── why-digital-access-now/page.tsx
│   │   ├── our-press/page.tsx
│   │   ├── our-careers/page.tsx
│   │   └── internships/page.tsx
│   │
│   ├── programs/page.tsx              # Three programs: Chapters, Devices, Literacy
│   ├── events/page.tsx                # Events from DB (published)
│   ├── blog/page.tsx                  # Blog + vlogs from DB (published)
│   ├── resources/page.tsx             # Resources from DB + external WiFi/equity tools
│   ├── volunteer/page.tsx             # Volunteer application page
│   ├── donate/page.tsx                # Donation page (interactive widget)
│   ├── contact-us/page.tsx            # Contact form + social media
│   │
│   ├── impact/
│   │   ├── our-impact/page.tsx        # Live DB metrics (site_metrics table)
│   │   ├── our-2025-report/page.tsx
│   │   ├── our-theory-of-change/page.tsx
│   │   ├── monitoring-evaluation/page.tsx
│   │   └── recognition-for-impact/page.tsx
│   │
│   ├── portal/
│   │   ├── layout.tsx                 # Portal root layout (no Navbar/Footer)
│   │   ├── page.tsx                   # Portal landing (role preview cards)
│   │   ├── actions.ts                 # 🔐 Auth server actions (login/signup/OTP/logout)
│   │   ├── submissions.ts             # 📝 Submit/verify content server actions
│   │   │
│   │   ├── login/page.tsx             # Login form
│   │   ├── register/page.tsx          # Signup form (role selector)
│   │   ├── verify-email/page.tsx      # OTP entry page
│   │   ├── forgot-password/page.tsx   # Request reset code
│   │   ├── reset-password/page.tsx    # Enter reset code + new password
│   │   ├── update-password/page.tsx   # Password change (when logged in)
│   │   │
│   │   ├── admin/
│   │   │   ├── admin-actions.ts       # 🔒 Admin-only server actions (service client)
│   │   │   ├── dashboard/page.tsx     # Admin mission control
│   │   │   ├── users/page.tsx         # User management + role changes
│   │   │   ├── approvals/page.tsx     # Pending content review queue
│   │   │   ├── content/page.tsx       # CMS for published content
│   │   │   ├── team/page.tsx          # Team members CRUD
│   │   │   ├── performance/page.tsx   # Volunteer attendance tracking
│   │   │   ├── donations/page.tsx     # Donations log viewer
│   │   │   ├── impact/page.tsx        # Edit site_metrics for public pages
│   │   │   └── fundraising/page.tsx   # Donation campaign settings
│   │   │
│   │   ├── chapter/
│   │   │   ├── dashboard/page.tsx     # Chapter KPIs
│   │   │   ├── submit-report/page.tsx # Submit impact report form
│   │   │   ├── submit-event/page.tsx  # Submit event form
│   │   │   └── my-submissions/page.tsx # Submission status table
│   │   │
│   │   └── volunteer/
│   │       ├── dashboard/page.tsx     # Volunteer overview
│   │       ├── submit-resource/page.tsx # Upload file to Supabase Storage
│   │       ├── submit-vlog/page.tsx   # Submit video URL
│   │       ├── log-hours/page.tsx     # Log volunteer hours form
│   │       └── my-performance/page.tsx # Personal hours & submissions
│   │
│   └── api/
│       └── auth/
│           ├── magic/                 # Magic link token verification route
│           └── send-email/            # Webhook/email sending route
│
├── components/
│   ├── navbar.tsx                     # Fixed top nav
│   ├── footer.tsx                     # Site footer
│   ├── chapters-map.tsx               # Leaflet map wrapper (SSR-safe)
│   ├── map-content.tsx                # Leaflet map inner (client-only)
│   ├── theme-provider.tsx             # next-themes wrapper
│   ├── portal/
│   │   ├── portal-shell.tsx           # Sidebar layout for all portal pages
│   │   ├── portal-nav.ts              # Nav item arrays (admin/chapter/volunteer)
│   │   └── portal-stat-card.tsx       # Stat card component
│   └── ui/                            # 57 shadcn/ui components
│
├── lib/
│   ├── email.ts                       # Resend email helpers (OTP, magic link, reset, approval)
│   ├── utils.ts                       # cn() classname merger
│   └── supabase/
│       ├── client.ts                  # Browser-side Supabase client
│       ├── server.ts                  # Server-side Supabase client (cookies)
│       ├── service.ts                 # Service-role client (bypasses RLS)
│       ├── middleware.ts              # Session refresh middleware
│       └── types.ts                   # Supabase type exports
│
├── supabase/
│   ├── schema.sql                     # Core DB tables + trigger
│   ├── rls-policies.sql               # Supplemental RLS policies
│   ├── add-email-verifications.sql    # email_verifications table
│   ├── add-multi-role.sql             # roles[] array + multi-role support
│   ├── site-metrics.sql               # site_metrics table + seed data
│   ├── update-credential-format.sql   # Custom ID format update
│   └── seed-content.sql              # Test/demo content seeder
│
├── middleware.ts                      # Next.js middleware → Supabase session refresh
├── next.config.mjs
├── tailwind.config / postcss.config.mjs
├── PROJECT_CONTEXT.md                 # OLD context file (pre-portal, Feb 2026)
├── PORTAL_PLAN.md                     # Portal architecture plan doc
└── docs/
    ├── portal-features-and-workflows.md
    └── agent-handover/
```

---

## 🗄️ DATABASE SCHEMA

**Backend**: Supabase (PostgreSQL)

### Tables Summary

| Table | Purpose | Key Fields |
|---|---|---|
| `public.users` | Portal user profiles (linked to `auth.users`) | `id`, `custom_id` (e.g., `DAN-ADM-2026-1001`), `email`, `role` (string), `roles` (text[]), `full_name`, `is_email_verified` |
| `public.email_verifications` | OTP + magic link tokens | `user_id`, `email`, `otp`, `type` (signup/magic_link/password_reset), `expires_at`, `used_at` |
| `public.team_members` | About/Our Team page content | `name`, `role_title`, `country`, `image_url`, `bio`, `status` (active/inactive) |
| `public.reports` | Chapter impact reports | `chapter_id`, `title`, `excerpt_description`, `content`, `cover_image_url`, `icon_emoji`, `status`, `published_date`, `verified_by` |
| `public.events` | Chapter-submitted events | `chapter_id`, `title`, `description`, `start_date`, `end_date`, `location`, `status` |
| `public.resources` | Volunteer-submitted resources | `volunteer_id`, `title`, `file_url`, `description`, `category`, `status` |
| `public.vlogs` | Volunteer-submitted videos | `volunteer_id`, `title`, `video_url`, `description`, `status` |
| `public.volunteer_attendance` | Hour logging / performance | `volunteer_id`, `event_id`, `hours_logged`, `activity_description`, `date`, `status` (pending/verified/rejected) |
| `public.donations_log` | Donation records | `donor_name`, `donor_email`, `amount`, `currency`, `payment_method`, `status` |
| `public.donation_settings` | Campaign configuration | `preset_amounts`, `goal_amount`, `current_raised`, `active_campaign_title` |
| `public.site_metrics` | Editable public-facing stats | `key` (PK), `value`, `updated_at` |

### User Roles
| Role | Custom ID Format | Redirected To |
|---|---|---|
| `ADMIN` | `DAN-ADM-{year}-{seq}` | `/portal/admin/dashboard` |
| `CHAPTER` | `DAN-CH-{year}-{seq}` | `/portal/chapter/dashboard` |
| `VOLUNTEER` | `DAN-VOL-{year}-{seq}` | `/portal/volunteer/dashboard` |

> Users can have **multiple roles** via the `roles text[]` array column.

### Content Status Lifecycle
```
Chapter/Volunteer submits → status: "pending_verification"
Admin reviews            → status: "published"  OR  "rejected"
Admin unpublishes        → status: "pending_verification" (returned to queue)
Admin deletes            → row deleted from DB
```
Public pages **only** display `status = 'published'` items.

### Storage
- **Bucket**: `resources_bucket` (public read)
- **Path pattern**: `{user_id}/{timestamp}.{ext}`
- **Max file size**: 10MB
- Used for volunteer-uploaded resource files

---

## 🔐 AUTHENTICATION FLOW (Custom OTP)

**NOT** standard Supabase email-link auth. Custom implementation:

```
Registration:
1. /portal/register → user fills name/email/password/role
2. server: admin.createUser() (silent, no Supabase email sent)
3. OTP generated (6-digit) + stored in email_verifications table
4. OTP emailed via Resend (10 min expiry)
5. Redirect → /portal/verify-email?email=...

Verification:
6. User enters OTP
7. server: validates OTP, marks used, sets is_email_verified=true
8. server: admin.updateUserById(id, {email_confirm:true}) ← required for signInWithPassword
9. Redirect → /portal/login with success message

Login:
10. /portal/login → email + password
11. server: supabase.auth.signInWithPassword()
12. Checks is_email_verified — blocks login if false
13. Reads roles[] array → redirects to role-appropriate dashboard

Additional flows:
- Magic Link: 64-char token → email → /api/auth/magic?token=...
- Forgot Password: 6-digit OTP → /portal/reset-password
- Resend OTP: same signup OTP, new expiry
```

### Supabase Client Types
| Client | File | Use Case |
|---|---|---|
| Browser client | `lib/supabase/client.ts` | Client components only |
| Server client | `lib/supabase/server.ts` | Server components, API routes (respects RLS) |
| Service client | `lib/supabase/service.ts` | Admin server actions only (bypasses RLS) |
| Middleware | `lib/supabase/middleware.ts` | Session refresh on every request |

---

## 🏛️ PORTAL WORKFLOWS

### Admin Portal (`/portal/admin/*`)

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/portal/admin/dashboard` | User counts, pending queue counts |
| User Management | `/portal/admin/users` | View all users, change roles |
| Pending Approvals | `/portal/admin/approvals` | Review + Publish/Reject reports/events/resources/vlogs |
| Content CMS | `/portal/admin/content` | Manage published content (unpublish/delete) |
| Team Members | `/portal/admin/team` | CRUD for About/Our-Team page |
| Volunteer Performance | `/portal/admin/performance` | View + verify volunteer attendance hours |
| Donations | `/portal/admin/donations` | View donations log |
| Impact Metrics | `/portal/admin/impact` | Edit `site_metrics` keys shown on public pages |
| Fundraising | `/portal/admin/fundraising` | Edit donation campaign settings |

**Key server actions** in `admin-actions.ts` (uses **service client**):
- `addTeamMember()` / `removeTeamMember()`
- `deleteContent()` / `unpublishContent()`
- `approveOrReject()` — Approve or reject any submission
- `updateSiteMetric()` — Edit public-facing metrics (homepage, impact page)
- `changeUserRole()` — Assign ADMIN/CHAPTER/VOLUNTEER

### Chapter Portal (`/portal/chapter/*`)

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/portal/chapter/dashboard` | Chapter KPIs and recent activity |
| Submit Report | `/portal/chapter/submit-report` | File impact report → pending review |
| Submit Event | `/portal/chapter/submit-event` | Schedule a community event → pending review |
| My Submissions | `/portal/chapter/my-submissions` | View own submissions + status |

**Key server actions** in `submissions.ts`:
- `submitChapterReport(formData)` → inserts into `reports`
- `submitChapterEvent(formData)` → inserts into `events`

### Volunteer Portal (`/portal/volunteer/*`)

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/portal/volunteer/dashboard` | Overview + resources |
| Submit Resource | `/portal/volunteer/submit-resource` | Upload file to Supabase Storage |
| Submit Vlog | `/portal/volunteer/submit-vlog` | Submit YouTube/video URL |
| Log Hours | `/portal/volunteer/log-hours` | Log activity + hours |
| My Performance | `/portal/volunteer/my-performance` | View personal logs + status |

**Key server actions** in `submissions.ts`:
- `uploadVolunteerResource(formData)` → uploads to storage + inserts into `resources`
- `submitVolunteerVlog(formData)` → inserts into `vlogs`
- `logVolunteerHours(formData)` → inserts into `volunteer_attendance`

### Portal Shell Layout
All portal pages use `<PortalShell>` from `components/portal/portal-shell.tsx`:
- Left sidebar: `bg-[#04111f]` with logo, role badge, nav links, sign out
- Main area: white page header (badge + title + subtitle) + content area
- Active nav: `bg-primary-blue text-[#04111f]`

---

## 🌍 PUBLIC PAGES — KEY SECTIONS

### Homepage (`/`)
- **Announcement bar**: Upcoming event ticker (sticky below navbar)
- **Hero Carousel**: 5 slides, 5s auto-advance, fade transition
- **Partners**: Corporate & Government + NGO/Nonprofit logos (ibb.co hosted)
- **Stats**: Cyan (`bg-primary-blue`) section — 1000+ Laptops, 100+ Student Kits, 5 Countries
- **Mission**: Text left + Leaflet chapters map right
- **Featured Video**: YouTube embed + text
- **Program Stories**: 3 cards
- **Recent Highlights**: Bento grid gallery (6 images + 1 wide)
- **CTA Cards**: Donate / Join Programs / Stay Updated
- **Social Section**: Cyan-to-purple gradient — Instagram, LinkedIn, YouTube

### Resources Page (`/resources`)
- Gradient hero (primary-blue → primary-purple → cyan-600)
- Free WiFi Finder (phila.gov/wifi)
- DigitalEquityPHL section
- Philadelphia City Programs & Events
- Northstar Digital Literacy
- Our Services (4 accordion items)
- DB-fetched published resources (if any)

### Email System (Resend)
Sent from `hello@digitalaccessnow.org` — 4 email types:
1. **OTP Verification** — signup, cyan header, 6-digit OTP
2. **Magic Link** — passwordless sign-in, 15-min expiry
3. **Password Reset** — 6-digit OTP, 10-min expiry
4. **Approval/Rejection** — admin review result, green/red status

---

## 🗺️ CHAPTERS MAP

- **File**: `components/chapters-map.tsx` + `components/map-content.tsx`
- Uses **Leaflet** + **React-Leaflet** (dynamically imported to avoid SSR issues)
- Custom markers for chapter locations
- Country label tooltips with `border: 2px solid #00BCD4`
- Map z-index carefully managed to not overlap navbar (z-50)
- Only shown in `homepage > Mission section`

---

## 🧩 COMPONENT LIBRARY (shadcn/ui — 57 components)

Key components installed and available:
- Layout: `card`, `separator`, `sheet`, `resizable`, `scroll-area`
- Forms: `button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `form`, `label`, `field`
- Navigation: `navigation-menu`, `breadcrumb`, `pagination`, `tabs`
- Feedback: `alert`, `alert-dialog`, `dialog`, `sonner` (toasts), `badge`, `skeleton`
- Data: `table`, `chart` (recharts wrapper), `progress`
- Overlay: `dropdown-menu`, `popover`, `hover-card`, `tooltip`, `context-menu`
- Input special: `input-otp`, `calendar`, `date-picker`

Custom components added beyond shadcn defaults:
- `button-group`, `field`, `input-group`, `item`, `kbd`, `empty`, `spinner`

---

## 🔒 SECURITY / RLS SUMMARY

| Table | Public (anon) | Own (auth) | Admin |
|---|---|---|---|
| `users` | ❌ | ✅ (read own) | ✅ (read all, full write) |
| `team_members` | ✅ (active only) | ❌ | ✅ (service key) |
| `reports` | ✅ (published only) | ✅ (own, any status) | ✅ (update status) |
| `events` | ✅ (published only) | ✅ (own, any status) | ✅ (update status) |
| `resources` | ✅ (published only) | ✅ (own, any status) | ✅ (update status) |
| `vlogs` | ✅ (published only) | ✅ (own, any status) | ✅ (update status) |
| `volunteer_attendance` | ❌ | ✅ (own hours) | ✅ (read all, verify) |
| `donations_log` | ❌ | ❌ | ✅ (service key) |
| `donation_settings` | ✅ (read) | ❌ | ✅ (service key) |
| `site_metrics` | ✅ (read all) | ❌ | ✅ (service key) |
| `email_verifications` | ❌ | ❌ | ✅ (service key) |

---

## 🛠️ DEVELOPMENT PATTERNS

### Page Template (public pages)
```tsx
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

export default async function PageName() {
  const supabase = await createClient()
  const { data } = await supabase.from('table').select('...').eq('status', 'published')

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero — always pt-28 or pt-32 to clear fixed navbar */}
      <section className="pt-32 pb-24 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white">
        ...
      </section>

      {/* Content sections */}
      <section className="py-16 md:py-24 bg-white">...</section>
      <section className="py-16 md:py-24 bg-light-gray">...</section>
      
      <Footer />
    </div>
  )
}
```

### Portal Page Template
```tsx
import { PortalShell } from '@/components/portal/portal-shell'
import { adminNavItems } from '@/components/portal/portal-nav'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/login')

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/dashboard"
      title="Dashboard"
      subtitle="Your mission control"
      badge="Admin"
      navItems={adminNavItems}
    >
      {/* page content */}
    </PortalShell>
  )
}
```

### Tailwind v4 Gotchas
```tsx
// ✅ Correct Tailwind v4 syntax:
bg-linear-to-r        // (not bg-gradient-to-r)
shrink-0              // (not flex-shrink-0)
text-primary-blue     // uses @theme inline aliases
```

### Admin Server Action Pattern
```ts
'use server'
import { createServiceClient } from '@/lib/supabase/service'
import { revalidatePath } from 'next/cache'

export async function adminAction(...) {
  const service = createServiceClient() // bypasses RLS
  const { error } = await service.from('table').update(...)
  if (error) return { error: error.message }
  revalidatePath('/affected/path')
  return {}
}
```

---

## 👥 TEAM MEMBERS

| Name | Role | Notes |
|---|---|---|
| Ritika Malik | CEO and Founder | Main public face |
| Awahan Sapkota | Vice President | |
| Aayushi Shah | Director of Human Resources | |
| Ishita | Director of Education Systems | |
| Nishu Shukla | Website Director | You — the webmaster |
| Suman | Director of Data & Technology | |
| Tejinderjit Singh | Director of Student Engagement | |
| Yash | Social Media Director | |
| Prof. Abirlal Mukherjee | Country Director, India | |
| Fashiba | Country Director, Pakistan | |

---

## 🤝 PARTNERS

**Corporate & Government**: Apple, Microsoft, City of Philadelphia, PA State Government  
**NGO/Nonprofit**: Power Up Tech, Rotary International, Moinee, Zonta

---

## ⚠️ KNOWN ISSUES & GOTCHAS

1. **Logo**: Using external `ibb.co` hosted image — consider migrating to `/public/` for reliability
2. **YouTube link**: YouTube social link is `href="#"` (placeholder — not connected yet)
3. **Facebook link**: Also `href="#"` in footer — not active
4. **`suppressHydrationWarning`**: Applied broadly on all interactive elements to prevent browser extension conflicts
5. **`email_verifications` table**: Created by a separate migration SQL (`add-email-verifications.sql`) — must run AFTER `schema.sql`
6. **`is_email_verified`**: Column added via `add-email-verifications.sql` — not in base `schema.sql`
7. **`roles[]` array**: Added via `add-multi-role.sql` migration — base schema only has `role` text column
8. **Leaflet SSR**: ChaptersMap uses dynamic import with `ssr: false` — only rendered client-side
9. **Admin content page**: `admin/content/` referenced in `admin-actions.ts` but directory not listed in scan — may be partially implemented or missing
10. **`portal/layout.tsx`**: Minimal layout — does NOT include Navbar/Footer (portal has its own sidebar shell)
11. **Hero image sizes**: Uses Tailwind arbitrary height classes like `h-100`, `h-125`, `h-150` which require Tailwind v4 arbitrary value support

---

## 📋 TODO / PENDING WORK (as of July 2026)

### Frontend
- [ ] **Blog page** — currently fetches from DB but needs richer layout (categories, pagination, author info)
- [ ] **Events page** — fetches DB events, needs calendar view option
- [ ] **Impact pages** — most pages appear stub/static
- [ ] **Donate page** — currently a static widget; needs real payment integration (Stripe/PayPal)
- [ ] **Newsletter** — footer subscribe button not functional
- [ ] **YouTube link** — needs real channel URL
- [ ] **Facebook link** — needs real page URL
- [ ] **Programs page** — Device Distribution + Digital Literacy have placeholder visuals

### Backend / Portal
- [ ] **Donation processing** — no payment gateway connected
- [ ] **File storage permissions** — verify `resources_bucket` storage policies in Supabase Dashboard
- [ ] **Admin content page** — `/portal/admin/content/` may need implementation
- [ ] **`fundraising`** page — referenced in nav but may be incomplete
- [ ] **Volunteer hours verification flow** — `log-hours` form exists; admin review UI in `performance/` page

### Infrastructure
- [ ] **`.env.local`** — Needs `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
- [ ] **Logo migration** — move from `ibb.co` to `/public/` folder
- [ ] **Supabase seed** — run `seed-content.sql` for test data

---

## 🔧 DEVELOPMENT COMMANDS

```bash
# Start dev server (Turbopack)
pnpm dev

# Build production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

Dev server: `http://localhost:3000`  
Portal: `http://localhost:3000/portal`

---

## 🚀 QUICK START FOR NEW CONTEXT WINDOW

To pick up instantly in a new session:
```
I'm the webmaster for Digital Access Now (NGO), working on our Next.js 16 site.
Read D:\DAN\digital-access-now\DAN_MASTER_CONTEXT.md for full project context.
[Then describe what you want to do]
```

---

*This file was fully auto-generated from source code on July 12, 2026. Update this file after significant changes.*
