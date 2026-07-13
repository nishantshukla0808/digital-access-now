-- ============================================================
-- FULL SETUP: Create team_members table + insert all 13 members
-- Run this in Supabase SQL Editor (safe to run on fresh DB)
-- ============================================================

-- Enable UUID extension (needed for uuid_generate_v4)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Create the team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.team_members (
  id         uuid    DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       text    NOT NULL,
  role_title text    NOT NULL,
  country    text    NOT NULL DEFAULT 'Global',
  bio        text,
  image_url  text    NOT NULL,
  status     text    CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: Enable Row Level Security
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Step 3: Allow public read of active members (for /about/our-team)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'team_members'
    AND policyname = 'Allow public read access on active team members'
  ) THEN
    EXECUTE 'CREATE POLICY "Allow public read access on active team members"
      ON public.team_members FOR SELECT USING (status = ''active'')';
  END IF;
END $$;

-- Step 4: Wipe any existing rows and insert all 13 members fresh
DELETE FROM public.team_members;

INSERT INTO public.team_members (name, role_title, country, bio, image_url, status) VALUES

('Ritika Malik',            'CEO and Founder',                'Global',   'Student studying Neuroscience at Columbia University',                                        'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png',                                                     'active'),
('Awahan Sapkota',          'Vice President',                 'Global',   'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',           'https://i.ibb.co/jZwpDG3G/Awahan.jpg',                                                                                              'active'),
('Aayushi Shah',            'Director of Human Resources',    'Global',   'Leading human resources and team development initiatives',                                    'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg',                                                             'active'),
('Ishita',                  'Director of Education Systems',  'Global',   'Developing educational programs and curriculum frameworks',                                   'https://i.ibb.co/DDnVbWXY/Ishita.png',                                                                                              'active'),
('Nishu Shukla',            'Website Director',               'Global',   'Overseeing creative direction and brand development',                                         'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg',                                                                                         'active'),
('Suman',                   'Director of Data & Technology',  'Global',   'Managing data analytics and technology infrastructure',                                       'https://i.ibb.co/V02X2YCP/suman1.png',                                                                                              'active'),
('Tejinderjit Singh',       'Director of Student Engagement', 'Global',   'Leading student outreach and engagement initiatives',                                         'https://i.ibb.co/7xN2gfhs/TJ.jpg',                                                                                                  'active'),
('Yash Sharma',             'Social Media Director',          'Global',   'Driving digital presence and social media strategy across platforms',                         'https://i.ibb.co/jvcmFJgQ/Yash-Picsart-Ai-Image-Enhancer.jpg',                                                                  'active'),
('Prof. Abirlal Mukherjee', 'Country Director, India',        'India',    'Leading operations and strategic initiatives in India',                                       'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png',                                            'active'),
('Fashiba',                 'Country Director, Pakistan',     'Pakistan', 'Leading operations and strategic initiatives in Pakistan',                                    'https://i.ibb.co/KPp0qp3/Fashiba.jpg',                                                                                              'active'),
('Stuti Jhunjhunwala',      'Workshop Director',              'Global',   'Designing and leading impactful digital literacy workshops for communities',                   'https://i.ibb.co/qMDzmrhG/Whats-App-Image-2026-07-11-at-23-47-12-Picsart-Ai-Image-Enhancer.jpg',                                   'active'),
('Christopher Ayisah',      'Full Stack Developer',           'Global',   'Building and maintaining the technical infrastructure that powers our mission',                'https://i.ibb.co/fYVwLwYd/Whats-App-Image-2026-07-11-at-23-48-00-Picsart-Ai-Image-Enhancer.jpg',                                   'active'),
('Shashi Bhushan',          'Team Member',                    'Global',   'Contributing to digital equity initiatives and community outreach programs',                   'https://i.ibb.co/Fb35dvys/Whats-App-Image-2026-07-11-at-23-50-27-Picsart-Ai-Image-Enhancer.jpg',                                   'active');

-- Step 5: Verify — should show 13 rows
SELECT name, role_title, status FROM public.team_members ORDER BY created_at;
