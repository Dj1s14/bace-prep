create policy "Teachers update students in own classes"
on public.profiles for update
to authenticated
using (
  role = 'student'
  and exists (
    select 1 from public.school_classes c
    where c.id = profiles.class_id
      and c.teacher_id = (select auth.uid())::text
  )
)
with check (
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
);
