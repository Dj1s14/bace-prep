drop index if exists public.school_classes_teacher_id_idx;
drop index if exists public.assignments_teacher_id_idx;
drop index if exists public.assignments_class_id_idx;
drop index if exists public.quiz_attempts_student_id_idx;
drop index if exists public.lesson_grades_student_id_idx;
drop index if exists public.activity_sessions_student_id_idx;

drop policy if exists "Admins update profiles" on public.profiles;
drop policy if exists "Teachers update students in own classes" on public.profiles;
drop policy if exists "Users update own profile without role escalation" on public.profiles;

create policy "Authorized profile updates"
on public.profiles for update
to authenticated
using (
  id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or (
    role = 'student'
    and exists (
      select 1 from public.school_classes c
      where c.id = profiles.class_id
        and c.teacher_id = (select auth.uid())::text
    )
  )
)
with check (
  (select private.current_profile_role()) = 'admin'
  or (
    id = (select auth.uid())::text
    and role = (select private.current_profile_role())
    and profiles.class_id is not distinct from (select private.current_profile_class_id())
  )
  or (
    role = 'student'
    and (
      profiles.class_id is null
      or profiles.class_id = ''
      or exists (
        select 1 from public.school_classes c
        where c.id = profiles.class_id
          and c.teacher_id = (select auth.uid())::text
      )
    )
  )
);

drop policy if exists "Students insert own lesson grades" on public.lesson_grades;
drop policy if exists "Teachers create lesson grades for own students" on public.lesson_grades;

create policy "Authorized lesson grade inserts"
on public.lesson_grades for insert
to authenticated
with check (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = lesson_grades.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

drop policy if exists "Students and teachers read lesson progress" on public.lesson_progress;
drop policy if exists "Students manage own lesson progress" on public.lesson_progress;

create policy "Authorized lesson progress read"
on public.lesson_progress for select
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = lesson_progress.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

create policy "Students insert own lesson progress"
on public.lesson_progress for insert
to authenticated
with check (student_id = (select auth.uid())::text);

create policy "Students update own lesson progress"
on public.lesson_progress for update
to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);

create policy "Students delete own lesson progress"
on public.lesson_progress for delete
to authenticated
using (student_id = (select auth.uid())::text);

drop policy if exists "Students and teachers read assignment progress" on public.assignment_progress;
drop policy if exists "Students manage own assignment progress" on public.assignment_progress;
drop policy if exists "Teachers manage progress for own assignments" on public.assignment_progress;

create policy "Authorized assignment progress read"
on public.assignment_progress for select
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.assignments a
    join public.profiles p on p.id = assignment_progress.student_id
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
      and p.class_id = a.class_id
  )
);

create policy "Authorized assignment progress insert"
on public.assignment_progress for insert
to authenticated
with check (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.assignments a
    join public.profiles p on p.id = assignment_progress.student_id
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
      and p.class_id = a.class_id
  )
);

create policy "Authorized assignment progress update"
on public.assignment_progress for update
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.assignments a
    join public.profiles p on p.id = assignment_progress.student_id
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
      and p.class_id = a.class_id
  )
)
with check (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.assignments a
    join public.profiles p on p.id = assignment_progress.student_id
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
      and p.class_id = a.class_id
  )
);

create policy "Authorized assignment progress delete"
on public.assignment_progress for delete
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.assignments a
    join public.profiles p on p.id = assignment_progress.student_id
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
      and p.class_id = a.class_id
  )
);

create or replace function private.assign_signup_class()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  signup_code text;
  matched_class_id text;
begin
  if new.role <> 'student' or coalesce(new.class_id, '') <> '' then
    return new;
  end if;

  select upper(trim(u.raw_user_meta_data ->> 'class_join_code'))
    into signup_code
  from auth.users u
  where u.id::text = new.id;

  if signup_code is null or signup_code = '' then
    return new;
  end if;

  select c.id into matched_class_id
  from public.school_classes c
  where upper(c.join_code) = signup_code
  limit 1;

  if matched_class_id is not null then
    new.class_id := matched_class_id;
  end if;

  return new;
end;
$$;

revoke all on function private.assign_signup_class() from public, anon, authenticated;

drop trigger if exists assign_signup_class_before_profile_insert on public.profiles;
create trigger assign_signup_class_before_profile_insert
before insert on public.profiles
for each row
execute function private.assign_signup_class();

drop policy if exists "Anyone can read class join information" on public.school_classes;

create policy "Users read permitted classes"
on public.school_classes for select
to authenticated
using (
  teacher_id = (select auth.uid())::text
  or id = (select private.current_profile_class_id())
  or (select private.current_profile_role()) = 'admin'
);

revoke select on public.school_classes from anon;
grant select on public.school_classes to authenticated;
