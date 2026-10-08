begin;
insert into public.profiles(id,email,first_name,last_name,role) values
('44444444-0000-4000-8000-444444444444','role-check-admin@example.com','Test','Admin','admin'),
('11111111-0000-4000-8000-111111111111','role-check-teacher@example.com','Test','Teacher','teacher'),
('33333333-0000-4000-8000-333333333333','role-check-student@example.com','Test','Student','student');
insert into public.school_classes(id,name,teacher_id) values ('role-check-class','Role test','11111111-0000-4000-8000-111111111111');
update public.profiles set class_id='role-check-class' where id='33333333-0000-4000-8000-333333333333';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"11111111-0000-4000-8000-111111111111","role":"authenticated","user_metadata":{"role":"admin"}}',true);
do $$ begin
begin perform public.admin_set_faculty_role('11111111-0000-4000-8000-111111111111','admin','teacher'); raise exception 'Teacher self-promotion allowed' using errcode='P0002'; exception when insufficient_privilege then null; end;
begin update public.profiles set role='admin' where id='11111111-0000-4000-8000-111111111111'; raise exception 'Direct self-promotion allowed' using errcode='P0002'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"44444444-0000-4000-8000-444444444444","role":"authenticated"}',true);
select public.admin_set_faculty_role('11111111-0000-4000-8000-111111111111','admin','teacher');
do $$ begin
if not exists(select 1 from public.profiles where id='11111111-0000-4000-8000-111111111111' and role='admin') then raise exception 'Promotion failed'; end if;
if not exists(select 1 from public.school_classes where id='role-check-class' and teacher_id='11111111-0000-4000-8000-111111111111') then raise exception 'Promotion moved classes'; end if;
begin perform public.admin_set_faculty_role('44444444-0000-4000-8000-444444444444','teacher','admin'); raise exception 'Self-demotion allowed' using errcode='P0002'; exception when insufficient_privilege then null; end;
begin update public.profiles set role='teacher' where id='44444444-0000-4000-8000-444444444444'; raise exception 'Direct self-demotion allowed' using errcode='P0002'; exception when insufficient_privilege then null; end;
begin perform public.admin_set_faculty_role('33333333-0000-4000-8000-333333333333','admin','student'); raise exception 'Student promoted' using errcode='P0002'; exception when sqlstate 'P0001' then null; end;
end $$;
-- Admins are eligible to teach, including the current administrator.
select public.admin_assign_class_teacher('role-check-class','44444444-0000-4000-8000-444444444444');
select public.admin_assign_class_teacher('role-check-class','11111111-0000-4000-8000-111111111111');
select public.admin_set_faculty_role('11111111-0000-4000-8000-111111111111','teacher','admin');
select set_config('request.jwt.claims','{"sub":"11111111-0000-4000-8000-111111111111","role":"authenticated"}',true);
do $$ begin
if not exists(select 1 from public.school_classes where id='role-check-class') or not exists(select 1 from public.profiles where id='33333333-0000-4000-8000-333333333333') then raise exception 'Demoted teacher lost own classroom'; end if;
if exists(select 1 from public.profiles where id='44444444-0000-4000-8000-444444444444') then raise exception 'Demoted teacher retained admin directory access'; end if;
begin perform public.admin_set_faculty_role('44444444-0000-4000-8000-444444444444','teacher','admin'); raise exception 'Demoted teacher retained role management' using errcode='P0002'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"33333333-0000-4000-8000-333333333333","role":"authenticated","user_metadata":{"role":"admin"}}',true);
do $$ begin
begin perform public.admin_set_faculty_role('11111111-0000-4000-8000-111111111111','admin','teacher'); raise exception 'Student granted admin' using errcode='P0002'; exception when insufficient_privilege then null; end;
end $$;
rollback;
