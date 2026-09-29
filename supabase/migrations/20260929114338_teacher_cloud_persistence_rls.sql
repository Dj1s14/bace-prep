create schema if not exists private;

create or replace function private.current_profile_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.profiles p
  where p.id = (select auth.uid())::text
  limit 1
$$;

create or replace function private.current_profile_class_id()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.class_id
  from public.profiles p
  where p.id = (select auth.uid())::text
  limit 1
$$;

revoke all on function private.current_profile_role() from public;
revoke all on function private.current_profile_class_id() from public;
grant usage on schema private to authenticated;
grant execute on function private.current_profile_role() to authenticated;
grant execute on function private.current_profile_class_id() to authenticated;

create table if not exists public.lesson_progress (
  id text primary key,
  student_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  unique(student_id, lesson_id)
);

create table if not exists public.assignment_progress (
  id text primary key,
  assignment_id text not null,
  student_id text not null,
  status text not null default 'Assigned',
  score numeric,
  completed_at timestamptz,
  unique(assignment_id, student_id)
);

alter table public.lesson_progress enable row level security;
alter table public.assignment_progress enable row level security;

create index if not exists profiles_class_id_idx on public.profiles(class_id);
create index if not exists school_classes_teacher_id_idx on public.school_classes(teacher_id);
create index if not exists assignments_teacher_id_idx on public.assignments(teacher_id);
create index if not exists assignments_class_id_idx on public.assignments(class_id);
create index if not exists quiz_attempts_student_id_idx on public.quiz_attempts(student_id);
create index if not exists lesson_grades_student_id_idx on public.lesson_grades(student_id);
create index if not exists activity_sessions_student_id_idx on public.activity_sessions(student_id);
create index if not exists lesson_progress_student_id_idx on public.lesson_progress(student_id);
create index if not exists assignment_progress_student_id_idx on public.assignment_progress(student_id);
create index if not exists assignment_progress_assignment_id_idx on public.assignment_progress(assignment_id);

revoke all on public.school_classes, public.assignments, public.profiles,
  public.quiz_attempts, public.lesson_grades, public.activity_sessions,
  public.lesson_progress, public.assignment_progress
from anon, authenticated;

grant select on public.school_classes to anon, authenticated;
grant select, insert, update, delete on public.assignments to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.quiz_attempts to authenticated;
grant select, insert, update, delete on public.lesson_grades to authenticated;
grant select, insert, update, delete on public.activity_sessions to authenticated;
grant select, insert, update, delete on public.lesson_progress to authenticated;
grant select, insert, update, delete on public.assignment_progress to authenticated;
grant insert, update, delete on public.school_classes to authenticated;

drop policy if exists "Authenticated read classes" on public.school_classes;
drop policy if exists "Authenticated read assignments" on public.assignments;
drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users insert own student profile" on public.profiles;
drop policy if exists "Students read own quiz attempts" on public.quiz_attempts;
drop policy if exists "Students insert own quiz attempts" on public.quiz_attempts;
drop policy if exists "Students update own quiz attempts" on public.quiz_attempts;
drop policy if exists "Students delete own quiz attempts" on public.quiz_attempts;
drop policy if exists "Students read own lesson grades" on public.lesson_grades;
drop policy if exists "Students read own activity sessions" on public.activity_sessions;
drop policy if exists "Students insert own activity sessions" on public.activity_sessions;
drop policy if exists "Students update own activity sessions" on public.activity_sessions;
drop policy if exists "Students delete own activity sessions" on public.activity_sessions;

create policy "Anyone can read class join information"
on public.school_classes for select
to anon, authenticated
using (true);

create policy "Teachers create own classes"
on public.school_classes for insert
to authenticated
with check (
  (
    (select private.current_profile_role()) = 'teacher'
    and teacher_id = (select auth.uid())::text
  )
  or (select private.current_profile_role()) = 'admin'
);

create policy "Teachers update own classes"
on public.school_classes for update
to authenticated
using (
  teacher_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
)
with check (
  (
    teacher_id = (select auth.uid())::text
    and (select private.current_profile_role()) = 'teacher'
  )
  or (select private.current_profile_role()) = 'admin'
);

create policy "Teachers delete own classes"
on public.school_classes for delete
to authenticated
using (
  teacher_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
);

create policy "Users read permitted profiles"
on public.profiles for select
to authenticated
using (
  id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or (
    role = 'student'
    and exists (
      select 1
      from public.school_classes c
      where c.id = profiles.class_id
        and c.teacher_id = (select auth.uid())::text
    )
  )
);

create policy "Users insert own student profile"
on public.profiles for insert
to authenticated
with check (
  id = (select auth.uid())::text
  and role = 'student'
);

create policy "Users update own profile without role escalation"
on public.profiles for update
to authenticated
using (id = (select auth.uid())::text)
with check (
  id = (select auth.uid())::text
  and role = (select private.current_profile_role())
);

create policy "Admins update profiles"
on public.profiles for update
to authenticated
using ((select private.current_profile_role()) = 'admin')
with check ((select private.current_profile_role()) = 'admin');

create policy "Students read class assignments"
on public.assignments for select
to authenticated
using (
  class_id = (select private.current_profile_class_id())
  or teacher_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
);

create policy "Teachers create own assignments"
on public.assignments for insert
to authenticated
with check (
  (
    teacher_id = (select auth.uid())::text
    and exists (
      select 1 from public.school_classes c
      where c.id = assignments.class_id
        and c.teacher_id = (select auth.uid())::text
    )
  )
  or (select private.current_profile_role()) = 'admin'
);

create policy "Teachers update own assignments"
on public.assignments for update
to authenticated
using (
  teacher_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
)
with check (
  (
    teacher_id = (select auth.uid())::text
    and exists (
      select 1 from public.school_classes c
      where c.id = assignments.class_id
        and c.teacher_id = (select auth.uid())::text
    )
  )
  or (select private.current_profile_role()) = 'admin'
);

create policy "Teachers delete own assignments"
on public.assignments for delete
to authenticated
using (
  teacher_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
);

create policy "Students read own quiz attempts"
on public.quiz_attempts for select
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = quiz_attempts.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

create policy "Students insert own quiz attempts"
on public.quiz_attempts for insert
to authenticated
with check (student_id = (select auth.uid())::text);

create policy "Students update own quiz attempts"
on public.quiz_attempts for update
to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);

create policy "Students delete own quiz attempts"
on public.quiz_attempts for delete
to authenticated
using (student_id = (select auth.uid())::text);

create policy "Students and teachers read lesson grades"
on public.lesson_grades for select
to authenticated
using (
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

create policy "Students insert own lesson grades"
on public.lesson_grades for insert
to authenticated
with check (student_id = (select auth.uid())::text);

create policy "Teachers create lesson grades for own students"
on public.lesson_grades for insert
to authenticated
with check (
  (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = lesson_grades.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

create policy "Teachers update grades for own students"
on public.lesson_grades for update
to authenticated
using (
  (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = lesson_grades.student_id
      and c.teacher_id = (select auth.uid())::text
  )
)
with check (
  (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = lesson_grades.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

create policy "Students and teachers read activity sessions"
on public.activity_sessions for select
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1
    from public.profiles p
    join public.school_classes c on c.id = p.class_id
    where p.id = activity_sessions.student_id
      and c.teacher_id = (select auth.uid())::text
  )
);

create policy "Students insert own activity sessions"
on public.activity_sessions for insert
to authenticated
with check (student_id = (select auth.uid())::text);

create policy "Students update own activity sessions"
on public.activity_sessions for update
to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);

create policy "Students delete own activity sessions"
on public.activity_sessions for delete
to authenticated
using (student_id = (select auth.uid())::text);

create policy "Students and teachers read lesson progress"
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

create policy "Students manage own lesson progress"
on public.lesson_progress for all
to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);

create policy "Students and teachers read assignment progress"
on public.assignment_progress for select
to authenticated
using (
  student_id = (select auth.uid())::text
  or (select private.current_profile_role()) = 'admin'
  or exists (
    select 1 from public.assignments a
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
  )
);

create policy "Students manage own assignment progress"
on public.assignment_progress for all
to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);

create policy "Teachers manage progress for own assignments"
on public.assignment_progress for all
to authenticated
using (
  (select private.current_profile_role()) = 'admin'
  or exists (
    select 1 from public.assignments a
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
  )
)
with check (
  (select private.current_profile_role()) = 'admin'
  or exists (
    select 1 from public.assignments a
    where a.id = assignment_progress.assignment_id
      and a.teacher_id = (select auth.uid())::text
  )
);
