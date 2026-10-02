begin;
insert into public.profiles(id,email,first_name,last_name,role) values
('44444444-0000-4000-8000-444444444444','class-release-admin@example.com','Release','Admin','admin'),
('11111111-0000-4000-8000-111111111111','class-release-old@example.com','Release','Old','teacher'),
('22222222-0000-4000-8000-222222222222','class-release-new@example.com','Release','New','teacher'),
('33333333-0000-4000-8000-333333333333','class-release-student@example.com','Release','Student','student');
insert into public.school_classes(id,name,teacher_id) values ('class_release_test_20261001','Release test','11111111-0000-4000-8000-111111111111');
insert into public.assignments(id,title,assignment_type,class_id,teacher_id) values ('assignment_release_test_20261001','Release test','lesson','class_release_test_20261001','11111111-0000-4000-8000-111111111111');
update public.profiles set class_id='class_release_test_20261001' where id='33333333-0000-4000-8000-333333333333';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"44444444-0000-4000-8000-444444444444","role":"authenticated"}',true);
select public.admin_assign_class_teacher('class_release_test_20261001','22222222-0000-4000-8000-222222222222');
do $$ begin
if not exists(select 1 from public.school_classes where id='class_release_test_20261001' and teacher_id='22222222-0000-4000-8000-222222222222') then raise exception 'Class owner did not transfer'; end if;
if not exists(select 1 from public.assignments where id='assignment_release_test_20261001' and teacher_id='22222222-0000-4000-8000-222222222222') then raise exception 'Assignment owner did not transfer'; end if;
if not exists(select 1 from public.profiles where id='33333333-0000-4000-8000-333333333333' and class_id='class_release_test_20261001') then raise exception 'Student enrollment changed'; end if;
begin perform public.admin_assign_class_teacher('class_release_test_20261001','33333333-0000-4000-8000-333333333333'); raise exception 'Invalid teacher accepted' using errcode='P0002'; exception when sqlstate 'P0001' then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"22222222-0000-4000-8000-222222222222","role":"authenticated"}',true);
do $$ begin
if not exists(select 1 from public.school_classes where id='class_release_test_20261001') or not exists(select 1 from public.assignments where id='assignment_release_test_20261001') then raise exception 'New teacher cannot see transferred data'; end if;
begin perform public.admin_assign_class_teacher('class_release_test_20261001','11111111-0000-4000-8000-111111111111'); raise exception 'Teacher reassignment was accepted' using errcode='P0002'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"11111111-0000-4000-8000-111111111111","role":"authenticated"}',true);
do $$ begin
if exists(select 1 from public.school_classes where id='class_release_test_20261001') or exists(select 1 from public.assignments where id='assignment_release_test_20261001') then raise exception 'Old teacher retained transferred access'; end if;
end $$;
rollback;
