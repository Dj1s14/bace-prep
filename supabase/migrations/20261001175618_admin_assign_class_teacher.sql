create or replace function public.admin_assign_class_teacher(class_id_input text, teacher_id_input text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null or not exists (select 1 from public.profiles where id = auth.uid()::text and role = 'admin') then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profiles where id = teacher_id_input and role = 'teacher') then
    raise exception 'Select a valid teacher';
  end if;
  update public.school_classes set teacher_id = teacher_id_input where id = class_id_input;
  if not found then raise exception 'Class not found'; end if;
  update public.assignments set teacher_id = teacher_id_input where class_id = class_id_input;
end; $$;
revoke all on function public.admin_assign_class_teacher(text,text) from public, anon;
grant execute on function public.admin_assign_class_teacher(text,text) to authenticated;
