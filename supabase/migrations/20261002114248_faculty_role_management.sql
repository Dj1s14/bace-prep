-- Admins keep teacher capabilities; faculty promotion does not move classes.
create or replace function public.admin_set_faculty_role(profile_id_input text, role_input text, expected_role_input text)
returns text language plpgsql security invoker set search_path = '' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(74190263);
  if auth.uid() is null or not exists (select 1 from public.profiles where id = auth.uid()::text and role = 'admin') then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if profile_id_input = auth.uid()::text then
    raise exception 'Another administrator must change your admin access' using errcode = '42501';
  end if;
  if role_input is null or role_input not in ('teacher','admin') or expected_role_input is null or expected_role_input not in ('teacher','admin') then
    raise exception 'Select teacher or admin access';
  end if;
  update public.profiles set role = role_input where id = profile_id_input and role = expected_role_input;
  if not found then raise exception 'Faculty account changed or was not found. Refresh the directory.'; end if;
  return role_input;
end; $$;
revoke all on function public.admin_set_faculty_role(text,text,text) from public, anon;
grant execute on function public.admin_set_faculty_role(text,text,text) to authenticated;

-- Apply the same restrictions to direct profile updates, including self-demotion.
create or replace function private.guard_faculty_role_change()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if new.role is not distinct from old.role or auth.uid() is null then return new; end if;
  if private.current_profile_role() is distinct from 'admin' or new.id = auth.uid()::text then
    raise exception 'Another administrator must change faculty access' using errcode = '42501';
  end if;
  if old.role not in ('teacher','admin') or new.role not in ('teacher','admin') then
    raise exception 'Only faculty access can be changed' using errcode = '42501';
  end if;
  return new;
end; $$;
revoke all on function private.guard_faculty_role_change() from public, anon, authenticated;
drop trigger if exists guard_faculty_role_change on public.profiles;
create trigger guard_faculty_role_change before update of role on public.profiles for each row execute function private.guard_faculty_role_change();

create or replace function public.admin_assign_class_teacher(class_id_input text, teacher_id_input text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null or not exists (select 1 from public.profiles where id = auth.uid()::text and role = 'admin') then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profiles where id = teacher_id_input and role in ('teacher','admin')) then
    raise exception 'Select a valid faculty member';
  end if;
  update public.school_classes set teacher_id = teacher_id_input where id = class_id_input;
  if not found then raise exception 'Class not found'; end if;
  update public.assignments set teacher_id = teacher_id_input where class_id = class_id_input;
end; $$;
revoke all on function public.admin_assign_class_teacher(text,text) from public, anon;
grant execute on function public.admin_assign_class_teacher(text,text) to authenticated;
