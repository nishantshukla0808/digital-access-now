-- ============================================================
-- FULL SETUP: team_members table — create + seed + advisory board
-- Safe to run on a fresh DB or re-run to reset members.
-- Run this in Supabase SQL Editor.
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Drop and recreate the table cleanly
-- (includes bio and member_type columns from the start)
DROP TABLE IF EXISTS public.team_members;

CREATE TABLE public.team_members (
  id          uuid        DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        text        NOT NULL,
  role_title  text        NOT NULL,
  country     text        NOT NULL DEFAULT 'Global',
  bio         text,
  image_url   text        NOT NULL,
  member_type text        NOT NULL DEFAULT 'team'
              CHECK (member_type IN ('team', 'advisory')),
  status      text        NOT NULL DEFAULT 'active'
              CHECK (status IN ('active', 'inactive')),
  created_at  timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Step 2: Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Step 3: Public read policy (active members only)
DROP POLICY IF EXISTS "Allow public read access on active team members" ON public.team_members;
CREATE POLICY "Allow public read access on active team members"
  ON public.team_members
  FOR SELECT
  USING (status = 'active');

-- Step 4: Insert all core team members (member_type = 'team')
INSERT INTO public.team_members (name, role_title, country, bio, image_url, member_type, status) VALUES

('Ritika Malik',
 'CEO and Founder', 'Global',
 'Student studying Neuroscience at Columbia University',
 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png',
 'team', 'active'),

('Awahan Sapkota',
 'Vice President', 'Global',
 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',
 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',
 'team', 'active'),

('Aayushi Shah',
 'Director of Human Resources', 'Global',
 'Leading human resources and team development initiatives',
 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg',
 'team', 'active'),

('Nishu Shukla',
 'Website Director', 'Global',
 'Overseeing creative direction and brand development',
 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg',
 'team', 'active'),

('Suman',
 'Director of Data & Technology', 'Global',
 'Managing data analytics and technology infrastructure',
 'https://i.ibb.co/V02X2YCP/suman1.png',
 'team', 'active'),

('Tejinderjit Singh',
 'Director of Student Engagement', 'Global',
 'Leading student outreach and engagement initiatives',
 'https://i.ibb.co/7xN2gfhs/TJ.jpg',
 'team', 'active'),

('Yash Sharma',
 'Social Media Director', 'Global',
 'Driving digital presence and social media strategy across platforms',
 'https://i.ibb.co/jvcmFJgQ/Yash-Picsart-Ai-Image-Enhancer.jpg',
 'team', 'active'),

('Prof. Abirlal Mukherjee',
 'Country Director, India', 'India',
 'Leading operations and strategic initiatives in India',
 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png',
 'team', 'active'),

('Fashiba',
 'Country Director, Pakistan', 'Pakistan',
 'Leading operations and strategic initiatives in Pakistan',
 'https://i.ibb.co/KPp0qp3/Fashiba.jpg',
 'team', 'active'),

('Stuti Jhunjhunwala',
 'Workshop Director', 'Global',
 'Designing and leading impactful digital literacy workshops for communities',
 'https://i.ibb.co/qMDzmrhG/Whats-App-Image-2026-07-11-at-23-47-12-Picsart-Ai-Image-Enhancer.jpg',
 'team', 'active'),

('Christopher Ayisah',
 'Full Stack Developer', 'Global',
 'Building and maintaining the technical infrastructure that powers our mission',
 'https://i.ibb.co/fYVwLwYd/Whats-App-Image-2026-07-11-at-23-48-00-Picsart-Ai-Image-Enhancer.jpg',
 'team', 'active'),

('Shashi Bhushan',
 'Team Member', 'Global',
 'Contributing to digital equity initiatives and community outreach programs',
 'https://i.ibb.co/Fb35dvys/Whats-App-Image-2026-07-11-at-23-50-27-Picsart-Ai-Image-Enhancer.jpg',
 'team', 'active');

-- Step 5: Verify — should show 12 rows, all member_type = 'team'
SELECT name, role_title, member_type, status FROM public.team_members ORDER BY created_at;
