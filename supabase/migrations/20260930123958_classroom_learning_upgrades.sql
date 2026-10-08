-- Enrollment is resolved from a validated join code, never a supplied class ID.
create or replace function private.assign_signup_class()
returns trigger language plpgsql security definer set search_path = '' as $$
declare signup_code text; matched text;
begin
  if new.role <> 'student' or auth.uid() is null or private.current_profile_role() = 'admin' then return new; end if;
  new.class_id := null;
  select upper(trim(raw_user_meta_data ->> 'class_join_code')) into signup_code from auth.users where id::text = new.id;
  if coalesce(signup_code, '') <> '' then
    select id into matched from public.school_classes where upper(join_code) = signup_code;
    new.class_id := matched;
  end if;
  return new;
end; $$;
revoke all on function private.assign_signup_class() from public, anon, authenticated;

drop policy "Authorized profile updates" on public.profiles;
create policy "Authorized profile updates" on public.profiles for update to authenticated
using (
  id = (select auth.uid())::text or (select private.current_profile_role()) = 'admin'
  or ((select private.current_profile_role()) = 'teacher' and role = 'student' and exists (
    select 1 from public.school_classes c where c.id = profiles.class_id and c.teacher_id = (select auth.uid())::text
  ))
)
with check (
  (select private.current_profile_role()) = 'admin'
  or (id = (select auth.uid())::text and role = (select private.current_profile_role()) and class_id is not distinct from (select private.current_profile_class_id()))
  or ((select private.current_profile_role()) = 'teacher' and id <> (select auth.uid())::text and role = 'student' and (
    class_id is null or class_id = '' or exists (select 1 from public.school_classes c where c.id = profiles.class_id and c.teacher_id = (select auth.uid())::text)
  ))
);

-- This narrowly scoped definer RPC performs the authorized enrollment that
-- ordinary self-profile updates deliberately cannot perform.
create or replace function public.join_class_by_code(join_code_input text)
returns void language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); matched text; existing text; metadata jsonb; account_email text;
begin
  if actor is null then raise exception 'Sign in before joining a class.'; end if;
  if length(trim(join_code_input)) > 64 then raise exception 'Invalid join code.'; end if;
  select class_id into existing from public.profiles where id = actor::text;
  if private.current_profile_role() is not null and private.current_profile_role() <> 'student' then raise exception 'Only students can join a class.'; end if;
  if coalesce(existing,'') <> '' then raise exception 'You already belong to a class. Ask your teacher to transfer you.'; end if;
  select id into matched from public.school_classes where upper(join_code) = upper(trim(join_code_input));
  if matched is null then raise exception 'Join code not recognized. Ask your teacher for the current code.'; end if;
  select raw_user_meta_data,email into metadata,account_email from auth.users where id = actor;
  if not exists(select 1 from public.profiles where id = actor::text) then
  insert into public.profiles(id,email,first_name,last_name,role)
  values(actor::text,account_email,coalesce(nullif(metadata->>'first_name',''),'Student'),coalesce(nullif(metadata->>'last_name',''),'User'),'student')
  on conflict (id) do nothing;
  end if;
  update public.profiles set class_id = matched where id = actor::text and role = 'student';
end; $$;
revoke all on function public.join_class_by_code(text) from public, anon;
grant execute on function public.join_class_by_code(text) to authenticated;

create table public.study_reviews (
  id text primary key,
  student_id text not null,
  question_id text not null,
  last_correct boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(student_id,question_id)
);
alter table public.study_reviews enable row level security;
grant select,insert,update,delete on public.study_reviews to authenticated;
grant all on public.study_reviews to service_role;
create policy "Students read own review history" on public.study_reviews for select to authenticated using (student_id = (select auth.uid())::text);
create policy "Students insert own review history" on public.study_reviews for insert to authenticated with check (student_id = (select auth.uid())::text);
create policy "Students update own review history" on public.study_reviews for update to authenticated using (student_id = (select auth.uid())::text) with check (student_id = (select auth.uid())::text);
create policy "Students delete own review history" on public.study_reviews for delete to authenticated using (student_id = (select auth.uid())::text);

-- A student can complete only an assignment belonging to their current class.
drop policy "Authorized assignment progress insert" on public.assignment_progress;
create policy "Authorized assignment progress insert" on public.assignment_progress for insert to authenticated with check (
  (student_id = (select auth.uid())::text and exists(select 1 from public.assignments a where a.id = assignment_progress.assignment_id and a.class_id = (select private.current_profile_class_id())))
  or (select private.current_profile_role()) = 'admin'
  or exists(select 1 from public.assignments a join public.profiles p on p.id = assignment_progress.student_id where a.id = assignment_progress.assignment_id and a.teacher_id = (select auth.uid())::text and p.class_id = a.class_id)
);
drop policy "Authorized assignment progress update" on public.assignment_progress;
create policy "Authorized assignment progress update" on public.assignment_progress for update to authenticated
using (student_id = (select auth.uid())::text or (select private.current_profile_role()) = 'admin' or exists(select 1 from public.assignments a join public.profiles p on p.id = assignment_progress.student_id where a.id = assignment_progress.assignment_id and a.teacher_id = (select auth.uid())::text and p.class_id = a.class_id))
with check (
  (student_id = (select auth.uid())::text and exists(select 1 from public.assignments a where a.id = assignment_progress.assignment_id and a.class_id = (select private.current_profile_class_id())))
  or (select private.current_profile_role()) = 'admin'
  or exists(select 1 from public.assignments a join public.profiles p on p.id = assignment_progress.student_id where a.id = assignment_progress.assignment_id and a.teacher_id = (select auth.uid())::text and p.class_id = a.class_id)
);

