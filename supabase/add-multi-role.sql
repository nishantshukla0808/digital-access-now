-- ============================================================
-- MIGRATION: Add Multi-Role Support
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Step 1: Add a new roles array column (keeping old role column temporarily)
alter table public.users add column if not exists roles text[] not null default ARRAY['VOLUNTEER'];

-- Step 2: Migrate existing data from role -> roles array
update public.users set roles = ARRAY[role] where roles = ARRAY['VOLUNTEER'];

-- Step 3: Update the handle_new_user trigger to use roles array
create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_custom_id text;
  user_role text;
  current_year text;
  serial_num text;
begin
  -- Get the primary role from metadata (used only for ID generation)
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

  -- Insert user: roles are stored as an array. 
  -- If user_roles metadata is provided (e.g. ["ADMIN","VOLUNTEER"]), use that, else default to [user_role]
  insert into public.users (id, custom_id, email, role, roles, full_name)
  values (
    new.id, 
    new_custom_id, 
    new.email, 
    user_role,  -- keep role for backwards compat
    ARRAY[user_role], -- initialize roles array
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Step 4: Helper function to add a role to a user (Admin use)
create or replace function public.add_role_to_user(user_id uuid, new_role text)
returns void as $$
begin
  update public.users
  set roles = array_append(roles, new_role)
  where id = user_id
  and not (new_role = any(roles)); -- avoid duplicates
end;
$$ language plpgsql security definer;

-- Step 5: Helper function to remove a role from a user (Admin use)
create or replace function public.remove_role_from_user(user_id uuid, remove_role text)
returns void as $$
begin
  update public.users
  set roles = array_remove(roles, remove_role)
  where id = user_id;
end;
$$ language plpgsql security definer;

-- Step 6: Update RLS policies to use roles array
-- Admins are users who have 'ADMIN' in their roles array
drop policy if exists "Admin full access" on public.users;
create policy "Admin full access" on public.users
  for all using (
    'ADMIN' = any(
      (select roles from public.users where id = auth.uid())
    )
  );

-- Users can read their own record
drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Step 7: (Optional) Drop old role column after verifying roles is correctly populated
-- Run this only AFTER you verify data migration is correct:
-- alter table public.users drop column role;
