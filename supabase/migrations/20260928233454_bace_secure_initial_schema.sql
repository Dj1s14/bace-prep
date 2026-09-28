-- Applied to Supabase project gfdbcrfqbsowlbnprqqn on 2026-09-28.
-- Secure initial BACE Prep schema with RLS and explicit Data API grants.

create extension if not exists "uuid-ossp";

create table if not exists public.domains (
  id text primary key,
  name text not null,
  description text,
  exam_weight integer not null default 15,
  display_order integer not null default 1,
  icon_name text default 'Dna',
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.topics (
  id text primary key,
  domain_id text not null references public.domains(id) on delete cascade,
  name text not null,
  description text,
  display_order integer not null default 1,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.lessons (
  id text primary key,
  topic_id text not null references public.topics(id) on delete cascade,
  domain_id text not null references public.domains(id) on delete cascade,
  title text not null,
  description text,
  estimated_minutes integer default 20,
  display_order integer not null default 1,
  active boolean default true,
  key_vocabulary jsonb default '[]'::jsonb,
  important_concepts jsonb default '[]'::jsonb,
  worked_examples jsonb default '[]'::jsonb,
  common_mistakes jsonb default '[]'::jsonb,
  bace_exam_tip text,
  sections jsonb default '[]'::jsonb,
  roadmap_topics jsonb default '[]'::jsonb,
  bench_modules jsonb default '[]'::jsonb,
  lab_activities jsonb default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.questions (
  id text primary key,
  domain_id text not null references public.domains(id) on delete cascade,
  topic_id text not null references public.topics(id) on delete cascade,
  lesson_id text,
  question_type text default 'multiple_choice',
  difficulty text default 'Moderate',
  question_text text not null,
  explanation text not null,
  bace_standard text,
  image_url text,
  active boolean default true,
  choices jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.profiles (
  id text primary key,
  email text not null unique,
  first_name text not null,
  last_name text not null,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  prefix text,
  school_name text,
  department text,
  target_exam_date date,
  class_id text,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.school_classes (
  id text primary key,
  name text not null,
  teacher_id text,
  school_year text default '2025-2026',
  period text,
  join_code text unique,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.assignments (
  id text primary key,
  teacher_id text,
  class_id text,
  class_name text,
  title text not null,
  assignment_type text not null,
  reference_id text,
  instructions text,
  due_date timestamptz,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.quiz_attempts (
  id text primary key,
  student_id text not null,
  quiz_type text not null,
  domain_id text,
  score integer not null,
  total_questions integer not null,
  percentage numeric(5,2) not null,
  time_spent_seconds integer not null default 0,
  domain_breakdown jsonb,
  started_at timestamptz,
  completed_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.lesson_grades (
  id text primary key,
  student_id text not null,
  student_name text,
  lesson_id text not null,
  lesson_title text not null,
  domain_id text not null,
  domain_name text not null,
  score integer not null,
  total_questions integer not null,
  percentage numeric(5,2) not null,
  letter_grade text not null,
  status text not null,
  teacher_notes text,
  teacher_feedback text,
  graded_by text,
  submitted_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.activity_sessions (
  id text primary key,
  student_id text not null,
  formatted_date text,
  session_number integer,
  label text,
  type text,
  domain_id text,
  domain_name text,
  score integer,
  total_questions integer,
  accuracy numeric(5,2),
  time_spent_minutes integer,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_topics_domain_id on public.topics(domain_id);
create index if not exists idx_lessons_domain_id on public.lessons(domain_id);
create index if not exists idx_lessons_topic_id on public.lessons(topic_id);
create index if not exists idx_questions_domain_id on public.questions(domain_id);
create index if not exists idx_questions_topic_id on public.questions(topic_id);
create index if not exists idx_school_classes_teacher_id on public.school_classes(teacher_id);
create index if not exists idx_assignments_teacher_id on public.assignments(teacher_id);
create index if not exists idx_assignments_class_id on public.assignments(class_id);
create index if not exists idx_quiz_attempts_student_id on public.quiz_attempts(student_id);
create index if not exists idx_lesson_grades_student_id on public.lesson_grades(student_id);
create index if not exists idx_activity_sessions_student_id on public.activity_sessions(student_id);

alter table public.domains enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.profiles enable row level security;
alter table public.school_classes enable row level security;
alter table public.assignments enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.lesson_grades enable row level security;
alter table public.activity_sessions enable row level security;

create policy "Public read domains" on public.domains for select to anon, authenticated using (true);
create policy "Public read topics" on public.topics for select to anon, authenticated using (true);
create policy "Public read lessons" on public.lessons for select to anon, authenticated using (true);
create policy "Public read questions" on public.questions for select to anon, authenticated using (true);

create policy "Users read own profile" on public.profiles for select to authenticated
using ((select auth.uid())::text = id);

create policy "Users insert own student profile" on public.profiles for insert to authenticated
with check ((select auth.uid())::text = id and role = 'student');

create policy "Authenticated read classes" on public.school_classes for select to authenticated using (true);
create policy "Authenticated read assignments" on public.assignments for select to authenticated using (true);

create policy "Students read own quiz attempts" on public.quiz_attempts for select to authenticated
using (student_id = (select auth.uid())::text);
create policy "Students insert own quiz attempts" on public.quiz_attempts for insert to authenticated
with check (student_id = (select auth.uid())::text);
create policy "Students update own quiz attempts" on public.quiz_attempts for update to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);
create policy "Students delete own quiz attempts" on public.quiz_attempts for delete to authenticated
using (student_id = (select auth.uid())::text);

create policy "Students read own lesson grades" on public.lesson_grades for select to authenticated
using (student_id = (select auth.uid())::text);

create policy "Students read own activity sessions" on public.activity_sessions for select to authenticated
using (student_id = (select auth.uid())::text);
create policy "Students insert own activity sessions" on public.activity_sessions for insert to authenticated
with check (student_id = (select auth.uid())::text);
create policy "Students update own activity sessions" on public.activity_sessions for update to authenticated
using (student_id = (select auth.uid())::text)
with check (student_id = (select auth.uid())::text);
create policy "Students delete own activity sessions" on public.activity_sessions for delete to authenticated
using (student_id = (select auth.uid())::text);

grant usage on schema public to anon, authenticated;
grant select on public.domains, public.topics, public.lessons, public.questions to anon;
grant select on public.domains, public.topics, public.lessons, public.questions to authenticated;
grant select, insert on public.profiles to authenticated;
grant select on public.school_classes, public.assignments to authenticated;
grant select, insert, update, delete on public.quiz_attempts, public.activity_sessions to authenticated;
grant select on public.lesson_grades to authenticated;
grant all on public.domains, public.topics, public.lessons, public.questions,
  public.profiles, public.school_classes, public.assignments, public.quiz_attempts,
  public.lesson_grades, public.activity_sessions to service_role;
