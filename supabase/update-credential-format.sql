-- ============================================================
-- UPDATE CREDENTIAL ID FORMAT
-- Run this in Supabase SQL Editor to update the ID generator.
-- New format: DAN-{ROLE}-{YEAR}-{SERIAL}
-- Examples: DAN-ADM-2026-1000, DAN-CH-2026-1001, DAN-VOL-2026-1002
-- ============================================================

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
