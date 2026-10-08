create or replace function private.manage_student_class(student_id_input uuid, class_id_input text)
returns void language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); actor_role text; old_class text; target_class text := coalesce(class_id_input, '');
begin
 select role into actor_role from public.profiles where id = actor::text;
 if actor is null or actor_role not in ('teacher','admin') then raise exception 'Teacher access required'; end if;
 select class_id into old_class from public.profiles where id = student_id_input::text and role = 'student' for update;
 if not found then raise exception 'Student not found'; end if;
 if actor_role = 'teacher' and not exists (select 1 from public.school_classes where id = old_class and teacher_id = actor::text) then raise exception 'Student is outside your classes'; end if;
 if target_class <> '' and not exists (select 1 from public.school_classes where id = target_class and (actor_role = 'admin' or teacher_id = actor::text)) then raise exception 'Target class is outside your classes'; end if;
 update public.profiles set class_id = target_class where id = student_id_input::text;
end $$;
revoke all on function private.manage_student_class(uuid,text) from public, anon;
grant execute on function private.manage_student_class(uuid,text) to authenticated;
create or replace function public.manage_student_class(student_id_input uuid, class_id_input text)
returns void language sql security invoker set search_path = '' as $$ select private.manage_student_class(student_id_input,class_id_input); $$;
revoke all on function public.manage_student_class(uuid,text) from public, anon;
grant execute on function public.manage_student_class(uuid,text) to authenticated;
