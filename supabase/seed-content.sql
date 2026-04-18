-- ============================================================
-- SEED DATA: DAN Public Content (Events, Reports, Resources, Vlogs)
-- Run this in your Supabase SQL Editor AFTER schema.sql
-- This loads real-looking DAN content for the public website.
-- ============================================================

-- ─── EVENTS ─────────────────────────────────────────────────────────────────
-- Note: chapter_id is NULL for org-wide events (no specific chapter author)

INSERT INTO public.events (chapter_id, title, description, start_date, end_date, location, status) VALUES

(NULL, 'Digital Literacy Bootcamp — Philadelphia', 
'A two-day intensive bootcamp equipping 50+ community members with foundational digital skills including internet safety, email, Google Workspace, and job application tools. Participants receive a device kit upon completion.',
'2026-05-10 09:00:00+00', '2026-05-11 17:00:00+00', 
'Free Library of Philadelphia, 1901 Vine St, Philadelphia, PA', 
'published'),

(NULL, 'Youth Tech Leadership Summit 2026',
'Annual summit gathering young digital equity leaders from 4 countries. Features keynotes, workshops on AI literacy, design thinking, and networking with industry mentors. 200+ attendees expected.',
'2026-06-14 08:00:00+00', '2026-06-15 18:00:00+00',
'University of Pennsylvania, Philadelphia, PA',
'published'),

(NULL, 'Device Drive & Refurbishment Day',
'Community drop-off event for used laptops, tablets, and phones. Our volunteer technicians refurbish devices on-site and redistribute them to families in need. Bring your old devices — every contribution counts!',
'2026-05-24 10:00:00+00', '2026-05-24 16:00:00+00',
'DAN Community Hub, 2301 Market St, Philadelphia, PA',
'published'),

(NULL, 'Internet Safety Workshop for Seniors',
'Hands-on workshop designed for adults 60+ covering phishing awareness, password security, safe online shopping, and video calling with family. Limited seats — register early.',
'2026-05-17 13:00:00+00', '2026-05-17 16:00:00+00',
'South Philadelphia Community Center, Philadelphia, PA',
'published'),

(NULL, 'Global Chapter Leaders Webinar — Q2 2026',
'Quarterly virtual meetup for all active DAN chapter leaders. Agenda includes impact report reviews, best practice sharing, upcoming grant opportunities, and Q&A with the DAN Executive Team.',
'2026-05-29 18:00:00+00', '2026-05-29 20:00:00+00',
'Online (Zoom — link sent via portal)',
'published'),

-- Past Events
(NULL, 'Digital Access Awareness Day 2025',
'Our annual flagship awareness event reached 1,200+ attendees across Philadelphia. Featured panel discussions, device donations, live demos, and chapter showcases from our global network.',
'2025-11-15 09:00:00+00', '2025-11-15 18:00:00+00',
'Philadelphia City Hall Plaza, Philadelphia, PA',
'published'),

(NULL, 'Back-to-School Tech Kit Distribution',
'Distributed 300+ device kits including refurbished Chromebooks, chargers, and learning resource packs to K-12 students across 8 Philadelphia schools ahead of the 2025 academic year.',
'2025-08-20 10:00:00+00', '2025-08-20 15:00:00+00',
'DAN Distribution Center, North Philadelphia, PA',
'published');


-- ─── REPORTS (Chapter Impact Stories) ───────────────────────────────────────

INSERT INTO public.reports (chapter_id, title, excerpt_description, content, icon_emoji, cover_image_url, status, published_date) VALUES

(NULL, 'Building Digital Literacy in South Asia',
'Our Pakistan chapter trained 500+ youth leaders who now provide digital skills training to their communities across Lahore and Karachi.',
'The Digital Access Now Pakistan chapter launched its flagship Digital Literacy Program in early 2025, targeting underserved communities in Lahore and Karachi. Over six months, the program trained 520 youth leaders — each of whom went on to deliver basic digital skills training to an average of 30 community members.

Key outcomes included:
• 520 youth leaders trained in digital tools, internet literacy, and device maintenance
• 15,600+ community members reached through peer-to-peer training
• 12 new community digital labs established in local schools and mosques
• Partnership forged with the Punjab Information Technology Board for device procurement

The program''s train-the-trainer model proved highly scalable and cost-effective. Participants reported increased confidence in job applications, accessing government services online, and supporting their children''s remote learning.',
'📚',
'https://i.ibb.co/gZpd6L93/497859265-122095815776883922-6063565023698107666-n-Picsart-Ai-Image-Enhancer.jpg',
'published',
'2025-12-01 00:00:00+00'),

(NULL, 'Connectivity for Remote Communities in East Africa',
'The Kenya chapter brought internet access and refurbished devices to 8 remote villages, enabling educational and economic opportunities for 2,000+ residents.',
'In partnership with a local telecommunications provider, the DAN Kenya chapter carried out a six-month connectivity initiative targeting eight remote villages in Kisumu County with limited or no broadband access.

The initiative provided:
• Solar-powered WiFi hotspots installed in 8 community centers
• 250 refurbished laptops distributed to primary schools
• Digital literacy workshops for 800 adults and 1,200 children
• Training for 40 local community technicians to maintain equipment

Residents now access e-government portals, telemedicine services, and online education platforms. Local entrepreneurs report using the internet for mobile banking and reaching wider markets for their products.',
'🌐',
NULL,
'published',
'2025-10-15 00:00:00+00'),

(NULL, 'Youth Leadership in Digital Advocacy',
'Young DAN leaders from 5 countries presented at the UN Youth Forum, successfully advocating for digital equity policies at the national and international levels.',
'For the first time in DAN''s history, a cohort of 12 youth leaders from our chapters in the US, Pakistan, Kenya, Nigeria, and India were selected to present at the United Nations Youth Forum on Sustainable Development in Geneva.

The youth delegation:
• Delivered a formal statement on digital equity as a fundamental right
• Presented data from DAN''s 5-year impact report to a 200-person audience
• Met with representatives from 18 national governments
• Secured commitments from 3 countries to adopt digital inclusion frameworks inspired by DAN''s model

Back home, the delegates launched national advocacy campaigns, gathering over 40,000 petition signatures calling for universal broadband access in underserved regions.',
'🚀',
NULL,
'published',
'2025-09-01 00:00:00+00'),

(NULL, 'Philadelphia Chapter: 300 Laptops in 30 Days',
'Our Philadelphia flagship chapter set a new DAN record by refurbishing and distributing 300 laptops to families in need — all within a single month.',
'The Philadelphia chapter mobilized 85 volunteers over four weekends in March 2025 to achieve what seemed impossible: refurbish and distribute 300 laptops in just 30 days.

The "30-in-30" initiative included:
• Collection drives at 15 corporate partner locations (Apple, Microsoft, local law firms)
• A volunteer tech lab operating every weekend at the Free Library of Philadelphia
• Rigorous testing, OS reinstallation, and sanitization of each device
• Delivery in partnership with the Philadelphia School District to Title I schools

Every device came loaded with educational software, a learning resource pack, and a QR code connecting families to DAN''s Digital Literacy Program. 92% of recipient families reported the laptop had a meaningful impact on their child''s studies within the first month.',
'💻',
'https://i.ibb.co/gZpd6L93/497859265-122095815776883922-6063565023698107666-n-Picsart-Ai-Image-Enhancer.jpg',
'published',
'2025-07-10 00:00:00+00'),

(NULL, 'DAN Nigeria: Digital Skills for Women Entrepreneurs',
'The DAN Lagos chapter trained 200 women entrepreneurs in digital marketing, mobile banking, and e-commerce — helping them grow their small businesses.',
'Small business owners in Lagos often lack the digital skills to leverage online tools that could dramatically grow their customer base and revenue. The DAN Lagos chapter partnered with the Lagos State Employment Trust Fund to address this gap.

The 8-week Digital Skills for Women Entrepreneurs program covered:
• Social media marketing (Instagram, WhatsApp Business, Facebook)
• Mobile banking and fintech tools (M-Pesa, Paystack, Flutterwave)
• Setting up and managing an e-commerce store
• Digital record keeping and basic data literacy

Outcomes after 3 months:
• 200 women entrepreneurs trained
• Average monthly revenue increase of 34% among participants
• 60 participants launched new online sales channels
• 3 participants hired additional employees to handle increased demand',
'👩‍💼',
NULL,
'published',
'2025-06-15 00:00:00+00');


-- ─── RESOURCES (Volunteer Uploaded Guides & Templates) ───────────────────────

INSERT INTO public.resources (volunteer_id, title, description, category, file_url, status) VALUES

(NULL, 'Digital Literacy Curriculum — Beginner Level',
'A complete 8-week curriculum guide for delivering digital literacy training to adults with no prior computer experience. Includes lesson plans, activities, and assessment sheets.',
'Digital Literacy',
'https://drive.google.com/file/d/example1/view',
'published'),

(NULL, 'Device Refurbishment Standard Operating Procedure',
'Step-by-step SOP for safely wiping, reinstalling, and testing refurbished laptops and tablets. Covers Windows, Chrome OS, and Linux systems. Used by all DAN chapters.',
'Guides',
'https://drive.google.com/file/d/example2/view',
'published'),

(NULL, 'Grant Writing Template for Digital Equity Projects',
'A ready-to-use grant application template tailored for digital equity and community technology projects. Includes sections for impact measurement, budget templates, and sample language.',
'Templates',
'https://drive.google.com/file/d/example3/view',
'published'),

(NULL, 'Internet Safety Workshop Facilitator Guide',
'Complete facilitator guide for the 90-minute DAN Internet Safety Workshop, including slide deck notes, discussion prompts, and printable handouts for participants.',
'Training',
'https://drive.google.com/file/d/example4/view',
'published'),

(NULL, 'Digital Equity Research Snapshot — 2025',
'A concise 12-page research brief summarizing the state of digital equity in the United States, with data on broadband access gaps, device ownership, and digital skills by demographic.',
'Research',
'https://drive.google.com/file/d/example5/view',
'published'),

(NULL, 'Chapter Starter Pack — New Leader Handbook',
'Everything a new DAN chapter leader needs: organizational templates, event planning checklist, branding guidelines, impact reporting forms, and a 90-day launch roadmap.',
'Guides',
'https://drive.google.com/file/d/example6/view',
'published');


-- ─── VLOGS ────────────────────────────────────────────────────────────────────

INSERT INTO public.vlogs (volunteer_id, title, description, video_url, status) VALUES

(NULL, 'A Day in the Life of a DAN Chapter Leader',
'Follow Amara, our Nairobi chapter leader, through a typical day — from morning training sessions to evening community meetings. See what real digital equity work looks like on the ground.',
'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
'published'),

(NULL, 'How We Refurbished 300 Laptops in 30 Days',
'A behind-the-scenes look at the Philadelphia chapter''s record-breaking "30-in-30" device distribution initiative. Features our volunteer tech team in action.',
'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
'published'),

(NULL, 'Digital Literacy Training: First Session',
'Watch a first-ever digital literacy class for senior citizens at the South Philadelphia Community Center. Heartwarming moments as participants send their first emails and video-call their families.',
'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
'published'),

(NULL, 'Youth Tech Summit 2025 Highlights',
'Best moments from our annual Youth Tech Leadership Summit — keynote addresses, workshop proceedings, and interviews with young digital equity advocates from around the world.',
'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
'published');

-- ─── TEAM MEMBERS ─────────────────────────────────────────────────────────────

INSERT INTO public.team_members (name, role_title, country, bio, image_url, status) VALUES

('Ritika Malik', 'CEO and Founder', 'Global', 'Student studying Neuroscience at Columbia University', 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png', 'active'),
('Awahan Sapkota', 'Vice President', 'Global', 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania', 'https://i.ibb.co/jZwpDG3G/Awahan.jpg', 'active'),
('Aayushi Shah', 'Director of Human Resources', 'Global', 'Leading human resources and team development initiatives', 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg', 'active'),
('Ishita', 'Director of Education Systems', 'Global', 'Developing educational programs and curriculum frameworks', 'https://i.ibb.co/DDnVbWXY/Ishita.png', 'active'),
('Nishu Shukla', 'Website Director', 'Global', 'Overseeing creative direction and brand development', 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg', 'active'),
('Suman', 'Director of Data & Technology', 'Global', 'Managing data analytics and technology infrastructure', 'https://i.ibb.co/V02X2YCP/suman1.png', 'active'),
('Tejinderjit Singh', 'Director of Student Engagement', 'Global', 'Leading student outreach and engagement initiatives', 'https://i.ibb.co/7xN2gfhs/TJ.jpg', 'active'),
('Prof. Abirlal Mukherjee', 'Country Director, India', 'India', 'Leading operations and strategic initiatives in India', 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png', 'active'),
('Fashiba', 'Country Director, Pakistan', 'Pakistan', 'Leading operations and strategic initiatives in Pakistan', 'https://i.ibb.co/KPp0qp3/Fashiba.jpg', 'active');
