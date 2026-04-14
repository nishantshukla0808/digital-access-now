-- ============================================================
-- MIGRATION: Custom Email Verification System
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Table to store OTPs for signup verification
create table if not exists public.email_verifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  email text not null,
  otp text not null,
  type text check (type in ('signup', 'magic_link', 'password_reset')) not null default 'signup',
  expires_at timestamp with time zone not null,
  used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table public.email_verifications enable row level security;

-- Users can only read their own verifications
create policy "Users can read own verifications" on public.email_verifications
  for select to authenticated using (auth.uid() = user_id);

-- Only service role can insert (server actions use service role)
create policy "Service role insert" on public.email_verifications
  for insert to service_role with check (true);

create policy "Service role update" on public.email_verifications
  for update to service_role using (true);

-- Add is_email_verified column to users table
alter table public.users 
  add column if not exists is_email_verified boolean not null default false;

-- Index for fast OTP lookups
create index if not exists idx_email_verifications_user_otp 
  on public.email_verifications(user_id, otp, type);

create index if not exists idx_email_verifications_expires
  on public.email_verifications(expires_at);
