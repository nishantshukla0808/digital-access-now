-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS table (tied to Supabase Auth)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  custom_id text unique not null,
  email text unique not null,
  role text not null default 'VOLUNTEER',
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.users enable row level security;

-- Automatically generate ADM-XXXX, CH-XXXX, VOL-XXXX based on role
create sequence if not exists custom_id_seq start 1000;

create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_custom_id text;
  user_role text;
begin
  user_role := coalesce((new.raw_user_meta_data->>'role'), 'VOLUNTEER');
  
  if user_role = 'ADMIN' then
    new_custom_id := 'ADM-' || nextval('custom_id_seq')::text;
  elsif user_role = 'CHAPTER' then
    new_custom_id := 'CH-' || nextval('custom_id_seq')::text;
  else
    new_custom_id := 'VOL-' || nextval('custom_id_seq')::text;
  end if;

  insert into public.users (id, custom_id, email, role, full_name)
  values (
    new.id, 
    new_custom_id, 
    new.email, 
    user_role, 
    new.raw_user_meta_data->>'full_name'
  );
  
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. TEAM MEMBERS
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role_title text not null,
  country text not null,
  image_url text not null,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.team_members enable row level security;

-- 3. REPORTS (News & Program Stories)
create table public.reports (
  id uuid default uuid_generate_v4() primary key,
  chapter_id uuid references public.users(id) on delete set null,
  title text not null,
  excerpt_description text,
  content text not null,
  cover_image_url text,
  icon_emoji text,
  status text check (status in ('draft', 'pending_verification', 'published', 'rejected')) default 'pending_verification',
  published_date timestamp with time zone,
  verified_by uuid references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.reports enable row level security;

-- 4. EVENTS
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  chapter_id uuid references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  location text not null,
  status text check (status in ('pending_verification', 'published', 'rejected')) default 'pending_verification',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.events enable row level security;

-- 5. RESOURCES
create table public.resources (
  id uuid default uuid_generate_v4() primary key,
  volunteer_id uuid references public.users(id) on delete cascade,
  title text not null,
  file_url text not null,
  description text,
  category text,
  status text check (status in ('pending_verification', 'published', 'rejected')) default 'pending_verification',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.resources enable row level security;

-- 6. VLOGS
create table public.vlogs (
  id uuid default uuid_generate_v4() primary key,
  volunteer_id uuid references public.users(id) on delete cascade,
  title text not null,
  video_url text not null,
  description text,
  status text check (status in ('pending_verification', 'published', 'rejected')) default 'pending_verification',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.vlogs enable row level security;

-- 7. VOLUNTEER ATTENDANCE (Performance Tracking)
create table public.volunteer_attendance (
  id uuid default uuid_generate_v4() primary key,
  volunteer_id uuid references public.users(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  hours_logged numeric(5, 2) not null,
  status text check (status in ('pending', 'verified', 'rejected')) default 'pending',
  activity_description text,
  date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.volunteer_attendance enable row level security;

-- 8. DONATIONS LOG
create table public.donations_log (
  id uuid default uuid_generate_v4() primary key,
  donor_name text not null,
  donor_email text not null,
  amount numeric(10, 2) not null,
  currency text default 'USD',
  payment_method text,
  status text check (status in ('completed', 'pending', 'failed')) default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
alter table public.donations_log enable row level security;

-- 9. DONATION SETTINGS
create table public.donation_settings (
  id uuid default uuid_generate_v4() primary key,
  preset_amounts integer[] not null default '{10, 15, 25, 50, 100}',
  goal_amount numeric(10, 2) not null,
  current_raised numeric(10, 2) default 0,
  active_campaign_title text not null
);
alter table public.donation_settings enable row level security;

-- Basic Data Insertion for Settings
insert into public.donation_settings (goal_amount, current_raised, active_campaign_title)
values (10000, 2803, 'Global Digital Equity Fund');

-- Security Policies (RLS) - Basic Public Fetching setup
create policy "Allow public read access on published reports" on public.reports for select using (status = 'published');
create policy "Allow public read access on published events" on public.events for select using (status = 'published');
create policy "Allow public read access on published resources" on public.resources for select using (status = 'published');
create policy "Allow public read access on published vlogs" on public.vlogs for select using (status = 'published');
create policy "Allow public read access on active team members" on public.team_members for select using (status = 'active');
create policy "Allow public read access on donation settings" on public.donation_settings for select using (true);
