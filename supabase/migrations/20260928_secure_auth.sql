-- Secure Supabase Auth/RLS migration for BACE Prep
-- Run this in the Supabase SQL editor after deploying the matching frontend.

-- profiles.id must match auth.users.id.
ALTER TABLE public.profiles
  ALTER COLUMN id TYPE uuid USING id::uuid;

-- Replace permissive profile policies.
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;

CREATE POLICY "Users read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users insert own student profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  id = auth.uid()
  AND role = 'student'
);

CREATE POLICY "Users update own non-privileged profile fields"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  AND role = (
    SELECT p.role
    FROM public.profiles p
    WHERE p.id = auth.uid()
  )
);

-- Public educational content can remain readable.
-- Sensitive operational/student data is authenticated-only.
DROP POLICY IF EXISTS "Public Read Classes" ON public.school_classes;
DROP POLICY IF EXISTS "Public Read Assignments" ON public.assignments;
DROP POLICY IF EXISTS "Public Insert Assignments" ON public.assignments;
DROP POLICY IF EXISTS "Public Update Assignments" ON public.assignments;
DROP POLICY IF EXISTS "Public Insert Quiz Attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Public Insert Lesson Grades" ON public.lesson_grades;
DROP POLICY IF EXISTS "Public Insert Activity Sessions" ON public.activity_sessions;

CREATE POLICY "Authenticated read classes"
ON public.school_classes
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated read assignments"
ON public.assignments
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Students manage own quiz attempts"
ON public.quiz_attempts
FOR ALL
TO authenticated
USING (student_id = auth.uid()::text)
WITH CHECK (student_id = auth.uid()::text);

CREATE POLICY "Students read own lesson grades"
ON public.lesson_grades
FOR SELECT
TO authenticated
USING (student_id = auth.uid()::text);

CREATE POLICY "Students manage own activity sessions"
ON public.activity_sessions
FOR ALL
TO authenticated
USING (student_id = auth.uid()::text)
WITH CHECK (student_id = auth.uid()::text);

-- Teacher/admin mutation rules should be added after teacher/class ownership
-- is normalized to auth.users UUIDs. Until then, privileged writes should be
-- performed from trusted admin tooling instead of the browser.
