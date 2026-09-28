-- Secure Supabase Auth/RLS migration for BACE Prep
-- Run this in the Supabase SQL editor after deploying the matching frontend.

-- New authenticated profiles use auth.users.id serialized as text.
-- Keep the existing TEXT column so legacy/demo profile IDs are not destroyed.

-- Replace permissive profile policies.
DROP POLICY IF EXISTS "Public Read Profiles" ON public.profiles;

CREATE POLICY "Users read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid()::text);

CREATE POLICY "Users insert own student profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  id = auth.uid()::text
  AND role = 'student'
);

-- Public educational content can remain readable.
-- Sensitive operational/student data is authenticated-only.
DROP POLICY IF EXISTS "Public Insert Questions" ON public.questions;
DROP POLICY IF EXISTS "Public Update Questions" ON public.questions;
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
USING (student_id = auth.uid()::text::text)
WITH CHECK (student_id = auth.uid()::text::text);

CREATE POLICY "Students read own lesson grades"
ON public.lesson_grades
FOR SELECT
TO authenticated
USING (student_id = auth.uid()::text::text);

CREATE POLICY "Students manage own activity sessions"
ON public.activity_sessions
FOR ALL
TO authenticated
USING (student_id = auth.uid()::text::text)
WITH CHECK (student_id = auth.uid()::text::text);

-- Teacher/admin mutation rules should be added after teacher/class ownership
-- is normalized to auth.users UUIDs. Until then, privileged writes should be
-- performed from trusted admin tooling instead of the browser.
