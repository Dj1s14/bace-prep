/**
 * Supabase PostgreSQL SQL DDL Schema Definition for BACE Prep Lab
 * Matches all TypeScript entities defined in /src/types/database.ts
 * Can be run in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
 */

export const SUPABASE_SQL_SCHEMA = `-- BACE Prep Lab Database Schema for Supabase PostgreSQL
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/gfdbcrfqbsowlbnprqqn/sql

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Domains Table (BACE 6 Knowledge Domains)
CREATE TABLE IF NOT EXISTS public.domains (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    exam_weight INTEGER NOT NULL DEFAULT 15,
    display_order INTEGER NOT NULL DEFAULT 1,
    icon_name TEXT DEFAULT 'Dna',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Topics Table
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    domain_id TEXT NOT NULL REFERENCES public.domains(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    domain_id TEXT NOT NULL REFERENCES public.domains(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    estimated_minutes INTEGER DEFAULT 20,
    display_order INTEGER NOT NULL DEFAULT 1,
    active BOOLEAN DEFAULT true,
    key_vocabulary JSONB DEFAULT '[]'::jsonb,
    important_concepts JSONB DEFAULT '[]'::jsonb,
    worked_examples JSONB DEFAULT '[]'::jsonb,
    common_mistakes JSONB DEFAULT '[]'::jsonb,
    bace_exam_tip TEXT,
    sections JSONB DEFAULT '[]'::jsonb,
    roadmap_topics JSONB DEFAULT '[]'::jsonb,
    bench_modules JSONB DEFAULT '[]'::jsonb,
    lab_activities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    domain_id TEXT NOT NULL REFERENCES public.domains(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    lesson_id TEXT,
    question_type TEXT DEFAULT 'multiple_choice',
    difficulty TEXT DEFAULT 'Moderate',
    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    bace_standard TEXT,
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    choices JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. User Profiles (Teachers, Students, Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    email TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    school_name TEXT,
    target_exam_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. School Classes Roster
CREATE TABLE IF NOT EXISTS public.school_classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    teacher_id TEXT,
    school_year TEXT DEFAULT '2025-2026',
    period TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
    id TEXT PRIMARY KEY,
    teacher_id TEXT,
    class_id TEXT,
    class_name TEXT,
    title TEXT NOT NULL,
    assignment_type TEXT NOT NULL,
    reference_id TEXT,
    instructions TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Quiz / Exam Attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    quiz_type TEXT NOT NULL,
    domain_id TEXT,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    domain_breakdown JSONB,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Student Lesson Grades & Teacher Feedback
CREATE TABLE IF NOT EXISTS public.lesson_grades (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT,
    lesson_id TEXT NOT NULL,
    lesson_title TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    domain_name TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    letter_grade TEXT NOT NULL,
    status TEXT NOT NULL,
    teacher_notes TEXT,
    teacher_feedback TEXT,
    graded_by TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Student Activity Sessions
CREATE TABLE IF NOT EXISTS public.activity_sessions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    formatted_date TEXT,
    session_number INTEGER,
    label TEXT,
    type TEXT,
    domain_id TEXT,
    domain_name TEXT,
    score INTEGER,
    total_questions INTEGER,
    accuracy NUMERIC(5,2),
    time_spent_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) Enablement & Open Anonymous Access for Client App
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anon read access to educational content
CREATE POLICY "Public Read Domains" ON public.domains FOR SELECT USING (true);
CREATE POLICY "Public Read Topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public Read Lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public Read Questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Classes" ON public.school_classes FOR SELECT USING (true);
CREATE POLICY "Public Read Assignments" ON public.assignments FOR SELECT USING (true);

-- Allow student & teacher data inserts/updates
CREATE POLICY "Public Insert Questions" ON public.questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Questions" ON public.questions FOR UPDATE USING (true);

CREATE POLICY "Public Insert Assignments" ON public.assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Assignments" ON public.assignments FOR UPDATE USING (true);

CREATE POLICY "Public Insert Quiz Attempts" ON public.quiz_attempts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Insert Lesson Grades" ON public.lesson_grades FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Insert Activity Sessions" ON public.activity_sessions FOR ALL USING (true) WITH CHECK (true);
`;
