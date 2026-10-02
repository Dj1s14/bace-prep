/**
 * Database schema and TypeScript interfaces designed for Supabase integration.
 * Corresponds to the relational database tables for BACE Prep Lab.
 */

export type UserRole = 'student' | 'teacher' | 'admin';

export type AppEnvironment = 'production' | 'demo';

export type QuestionType =
  | 'multiple_choice'
  | 'multiple_select'
  | 'true_false'
  | 'calculation'
  | 'matching'
  | 'image_identification'
  | 'equipment_identification'
  | 'procedure_sequencing'
  | 'graph_interpretation'
  | 'scenario_based';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Difficult' | 'Medium' | 'Hard';

export type StudentStatus = 'Ready' | 'Developing' | 'Needs Review' | 'At Risk';

export type AssignmentType =
  | 'Lesson'
  | 'Domain Quiz'
  | 'Practice Set'
  | 'Practice'
  | 'Mock Exam'
  | 'Targeted Topic Review'
  | 'Targeted Review';

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  title?: string;
  prefix?: string;
  school_name?: string;
  department?: string;
  target_exam_date?: string;
  created_at: string;
  class_id?: string;
}

export interface UserAccount {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  created_at: string;
  student_id?: string;
  teacher_id?: string;
  class_id?: string;
}

export interface TeacherProfile {
  role?: 'teacher' | 'admin';
  id: string;
  prefix?: string; // 'Dr.', 'Mr.', 'Ms.', 'Mrs.', 'Prof.', etc.
  first_name: string;
  last_name: string;
  email: string;
  school_name: string;
  department?: string;
  created_at: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  teacher_id: string;
  school_year: string;
  period: string;
  join_code?: string;
  created_at: string;
}

export interface ClassMember {
  id: string;
  class_id: string;
  student_id: string;
  joined_at: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  exam_weight: number; // e.g., 23 for 23%
  display_order: number;
  icon_name: string;
}

export interface Topic {
  id: string;
  domain_id: string;
  name: string;
  description: string;
  display_order: number;
}

export interface LessonSection {
  title: string;
  content: string;
  diagram_url?: string;
  diagram_caption?: string;
}

export interface BenchSkillTopic {
  title: string;
  core_idea: string;
  purpose: string;
  condition: string;
  evidence: string;
  where_in_lab: string;
  procedure_awareness: string[];
  material_details: string[];
  what_to_notice: string;
  signs_of_valid_result: string[];
  connecting_to_decision: string[];
  common_problems: string[];
  prevention: string[];
  impact_on_work: string[];
}

export interface LabActivityScenario {
  id: string;
  title: string;
  scenario: string;
  options: Array<{
    id: string;
    text: string;
    is_correct: boolean;
  explanation?: string;
    feedback: string;
  }>;
  explanation: string;
  bace_competency: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  domain_id: string;
  title: string;
  description: string;
  estimated_minutes: number;
  display_order: number;
  active: boolean;
  key_vocabulary: Array<{ term: string; definition: string }>;
  important_concepts: string[];
  worked_examples?: Array<{
    title: string;
    scenario: string;
    calculation?: string;
    solution: string;
  }>;
  common_mistakes: string[];
  bace_exam_tip: string;
  sections: LessonSection[];
  references?: Array<{ title: string; url: string }>;
  roadmap_topics?: string[];
  bench_modules?: BenchSkillTopic[];
  lab_activities?: LabActivityScenario[];
}

export interface QuestionChoice {
  id: string;
  question_id?: string;
  choice_text: string;
  is_correct: boolean;
  explanation?: string;
  display_order?: number;
}

export interface Question {
  id: string;
  domain_id: string;
  topic_id: string;
  lesson_id?: string;
  question_type?: QuestionType;
  difficulty: DifficultyLevel;
  question_text: string;
  explanation: string;
  bace_standard?: string;
  image_url?: string;
  active?: boolean;
  choices: QuestionChoice[];
  created_at?: string;
}

export interface QuizAttempt {
  id: string;
  student_id: string;
  quiz_type: 'practice' | 'practice_drill' | 'mock_quick' | 'mock_half' | 'mock_full' | 'lesson_check';
  domain_id?: string;
  score: number;
  total_questions: number;
  percentage: number;
  started_at: string;
  completed_at: string;
  time_spent_seconds: number;
  domain_breakdown?: Record<string, { correct: number; total: number; percentage: number }>;
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_choice_id: string;
  is_correct: boolean;
  explanation?: string;
  answered_at: string;
}

export interface StudentActivitySession {
  id: string;
  student_id?: string;
  date: string;
  formattedDate: string;
  sessionNumber: number;
  label: string;
  type: 'Practice Drill' | 'Mock Exam' | 'Lesson Check' | 'Domain Quiz';
  domainId?: string;
  domainName?: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentMinutes: number;
}

export interface LessonProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
}

export interface StudentMastery {
  id: string;
  student_id: string;
  domain_id: string;
  topic_id?: string;
  questions_attempted: number;
  questions_correct: number;
  mastery_percentage: number;
  updated_at: string;
}

export interface Assignment {
  id: string;
  teacher_id?: string;
  class_id: string;
  title: string;
  assignment_type: AssignmentType;
  reference_id?: string; // lesson_id or domain_id
  instructions: string;
  due_date: string;
  created_at: string;
  class_name?: string;
}

export interface AssignmentProgress {
  id: string;
  assignment_id: string;
  student_id: string;
  status: 'Pending' | 'Completed' | 'Late';
  score?: number;
  completed_at?: string;
}

export interface LessonGradeRecord {
  id: string;
  student_id: string;
  student_name?: string;
  lesson_id: string;
  lesson_title?: string;
  domain_id?: string;
  domain_name?: string;
  score: number;
  total_questions: number;
  percentage: number;
  letter_grade?: 'A' | 'B' | 'C' | 'D' | 'F';
  status: 'Mastered' | 'Passed' | 'Needs Review';
  submitted_at: string;
  graded_by?: string;
  teacher_notes?: string;
  teacher_feedback?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
}

export interface StudentAchievement {
  id: string;
  student_id: string;
  achievement_id: string;
  earned_at: string;
}

export interface StudentOverview {
  profile: Profile;
  class_id: string;
  overall_readiness: number;
  domain_mastery: Record<string, number>;
  last_active: string;
  status: StudentStatus;
  lessons_completed: number;
  questions_attempted: number;
  accuracy: number;
  mock_exam_scores: number[];
  weakest_topics: Array<{ name: string; percentage: number }>;
  strongest_topics: Array<{ name: string; percentage: number }>;
  recent_activities: Array<{
    type: string;
    description: string;
    date: string;
    score?: string;
  }>;
}

/**
 * Mastery color system helper
 * 90–100% = Mastered
 * 80–89% = BACE Ready
 * 70–79% = Developing
 * Below 70% = Needs Review
 */
export function getMasteryDetails(percentage: number): {
  level: 'Mastered' | 'BACE Ready' | 'Developing' | 'Needs Review' | 'Not Started';
  bgClass: string;
  textClass: string;
  borderClass: string;
  badgeBg: string;
  progressColor: string;
} {
  if (percentage <= 0) {
    return {
      level: 'Not Started',
      bgClass: 'bg-slate-50',
      textClass: 'text-slate-600',
      borderClass: 'border-slate-200',
      badgeBg: 'bg-slate-100 text-slate-700 border-slate-200',
      progressColor: 'bg-slate-300',
    };
  }
  if (percentage >= 90) {
    return {
      level: 'Mastered',
      bgClass: 'bg-emerald-50',
      textClass: 'text-emerald-700',
      borderClass: 'border-emerald-200',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      progressColor: 'bg-emerald-600',
    };
  }
  if (percentage >= 80) {
    return {
      level: 'BACE Ready',
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      progressColor: 'bg-blue-600',
    };
  }
  if (percentage >= 70) {
    return {
      level: 'Developing',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-700',
      borderClass: 'border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      progressColor: 'bg-amber-500',
    };
  }
  return {
    level: 'Needs Review',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-700',
    borderClass: 'border-rose-200',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    progressColor: 'bg-rose-500',
  };
}

export interface UserAccount {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  school_name?: string;
  class_id?: string;
  created_at: string;
}



