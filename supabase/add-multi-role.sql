-- ============================================================
-- MIGRATION: Add Multi-Role Support (Fixed)
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Step 1: Add new roles array column with correct Postgres array default syntax
alter table public.users 
  add column if not exists roles text[] not null default '{VOLUNTEER}';

-- Step 2: Migrate existing data from single role -> roles array
update public.users 
  set roles = ARRAY[role];

-- Step 3: Update the handle_new_user trigger to populate roles array
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_custom_id text;
  user_role text;
  current_year text;
  serial_num text;
begin
  user_role := coalesce((new.raw_user_meta_data->>'role'), 'VOLUNTEER');
  current_year := extract(year from now())::text;
  serial_num := nextval('custom_id_seq')::text;

  if user_role = 'ADMIN' then
    new_custom_id := 'DAN-ADM-' || current_year || '-' || serial_num;
  elsif user_role = 'CHAPTER' then
    new_custom_id := 'DAN-CH-' || current_year || '-' || serial_num;
  else
    new_custom_id := 'DAN-VOL-' || current_year || '-' || serial_num;
  end if;

  insert into public.users (id, custom_id, email, role, roles, full_name)
  values (
    new.id, 
    new_custom_id, 
    new.email, 
    user_role,
    ARRAY[user_role],
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Step 4: Helper — Admin can grant a role to any user
create or replace function public.add_role_to_user(target_user_id uuid, new_role text)
returns void as $$
begin
  update public.users
  set roles = array_append(roles, new_role)
  where id = target_user_id
  and not (new_role = any(roles));
end;
$$ language plpgsql security definer;

-- Step 5: Helper — Admin can revoke a role from a user
create or replace function public.remove_role_from_user(target_user_id uuid, remove_role text)
returns void as $$
begin
  update public.users
  set roles = array_remove(roles, remove_role)
  where id = target_user_id;
end;
$$ language plpgsql security definer;

-- Step 6: Updated RLS — check roles array instead of role text
drop policy if exists "Admin full access" on public.users;
create policy "Admin full access" on public.users
  for all
  to authenticated
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid()
      and 'ADMIN' = any(u.roles)
    )
  );

drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile" on public.users
  for select
  to authenticated
  using (auth.uid() = id);

-- Step 7: After verifying data is correct, optionally drop old single role column:
-- alter table public.users drop column role;
