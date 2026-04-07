# Digital Access Now (DAN) - Feature Breakdown & Architecture

## 1. Public Website (`/app`)
The primary website is the outward-facing component of the DAN ecosystem. Its goal is to raise awareness, accept donations, and publish the verified activities conducted by the organization's Chapters and Volunteers.

### Website Pages & Their Purpose
- **Home (`/`)**: Landing page showcasing the mission, high-level impact metrics, and primary donation/volunteer call-to-actions.
- **About (`/about`)**: Detailed background of the organization, its mission, and team structure.
- **Impact & Reports (`/impact`)**: Showcases real-world results of donation drives and tech distributions. *This page is dynamically fueled by the Chapter dashboard.*
- **Programs & Events (`/programs`)**: Lists upcoming tech-literacy workshops, device drops, and community events. *Dynamically fueled by the Chapter dashboard.*
- **Educational Resources (`/resources`)**: A public library of tech-literacy PDFs, guides, and tutorials. *Dynamically fueled by the Volunteer dashboard.*
- **Volunteer (`/volunteer`)**: Recruitment page for new volunteers to join the cause.
- **Donate (`/donate`)**: Primary financial and device donation portal. Connects to future Stripe/PayPal webhook endpoints.
- **Contact Us (`/contact-us`)**: General inquiry form.

### How the Website Connects to the Portal Backend
The main website is meant to be highly dynamic, acting as a "read-only" presentation layer for the data managed inside the `/portal`:
1. **Resources Feed**: When a Volunteer uploads a PDF guide in `/portal/volunteer/submit-resource`, an Admin must approve it. Once approved, the `app/resources/page.tsx` will query the Supabase `resources` table for `status = 'published'` and display the Volunteer's document to the public.
2. **Impact Feed**: When a Chapter Lead submits a success story via `/portal/chapter/submit-report`, it pends approval. Once verified by an Admin, the `app/impact/page.tsx` queries the `reports` table to publish the story.
3. **Programs Feed**: Chapter-submitted events (`/portal/chapter/submit-event`), once verified, appear on the `app/programs/page.tsx` page as upcoming opportunities.

---

## 2. Operations Portal (`/portal/*`)
The portal contains three deeply distinct dashboard interfaces depending on the user's role (assigned during registration and tracked via Supabase Auth + triggers).

### Admin Dashboard (`/portal/admin`)
- **Users Tracker**: Admins view and manage performance attributes for all team members (hours logged, items submitted). Used to decide the "Volunteer of the Month".
- **Approvals Dashboard (`/portal/admin/approvals`)**: The crucial bridge between the portal and the public website. Admins review pending Chapter Reports, Events, Volunteer Vlogs, and Resources. Clicking "Verify" sets their database status from `pending` to `published`, instantly making them live on the public website pages.
- **Donation Tracking (`/portal/admin/donations`)**: Displays total donations, automated logging, and funding goals. (Pending API wire-up to payment gateways).

### Chapter Dashboard (`/portal/chapter`)
Chapters act as regional leads governing local tech-donation drives.
- **Submit Report**: Post impact reports outlining recent successful distributions to fuel the public `/impact` page.
- **Submit Event**: Propose upcoming public donation drives or tech-literacy workshops for the `/programs` page.
- **My Submissions**: Tracks the `pending`/`published` status of their submitted documents.

### Volunteer Dashboard (`/portal/volunteer`)
Volunteers are individuals contributing time or educational material.
- **Submit Resource**: Upload PDFs/Documents teaching digital literacy to expand the public `/resources` library.
- **Submit Vlog**: Upload specific YouTube/Vimeo vlog links documenting activities.
- **Log Hours**: Track and log specific volunteer timesheets for Admin review.
- **My Performance**: Displays personal total verified impact hours and content contributions.
