import { SupabaseClient } from '@supabase/supabase-js';
import {
  Assignment,
  AssignmentProgress,
  LessonGradeRecord,
  Profile,
  QuizAttempt,
  SchoolClass,
  StudentActivitySession,
} from '../types/database';

export interface CloudWorkspace {
  classes: SchoolClass[];
  assignments: Assignment[];
  profiles: Profile[];
  quizAttempts: QuizAttempt[];
  lessonGrades: LessonGradeRecord[];
  activitySessions: StudentActivitySession[];
  lessonProgress: Array<{
    id: string;
    student_id: string;
    lesson_id: string;
    completed: boolean;
    completed_at?: string;
  }>;
  assignmentProgress: AssignmentProgress[];
}

const throwOnError = <T>(result: { data: T; error: any }, label: string): T => {
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  return result.data;
};

export async function fetchCloudWorkspace(client: SupabaseClient): Promise<CloudWorkspace> {
  const [
    classResult,
    assignmentResult,
    profileResult,
    attemptResult,
    gradeResult,
    activityResult,
    lessonProgressResult,
    assignmentProgressResult,
  ] = await Promise.all([
    client.from('school_classes').select('*').order('created_at', { ascending: true }),
    client.from('assignments').select('*').order('created_at', { ascending: false }),
    client.from('profiles').select('*').order('last_name', { ascending: true }),
    client.from('quiz_attempts').select('*').order('completed_at', { ascending: false }),
    client.from('lesson_grades').select('*').order('submitted_at', { ascending: false }),
    client.from('activity_sessions').select('*').order('created_at', { ascending: true }),
    client.from('lesson_progress').select('*').order('completed_at', { ascending: true }),
    client.from('assignment_progress').select('*').order('completed_at', { ascending: false }),
  ]);

  const rawActivities: any[] = throwOnError(activityResult as any, 'Load activity sessions') || [];

  return {
    classes: (throwOnError(classResult as any, 'Load classes') || []) as SchoolClass[],
    assignments: (throwOnError(assignmentResult as any, 'Load assignments') || []) as Assignment[],
    profiles: (throwOnError(profileResult as any, 'Load profiles') || []) as Profile[],
    quizAttempts: (throwOnError(attemptResult as any, 'Load quiz attempts') || []) as QuizAttempt[],
    lessonGrades: (throwOnError(gradeResult as any, 'Load lesson grades') || []) as LessonGradeRecord[],
    activitySessions: rawActivities.map((row) => ({
      id: row.id,
      student_id: row.student_id,
      date: row.created_at ? String(row.created_at).slice(0, 10) : '',
      formattedDate: row.formatted_date || '',
      sessionNumber: row.session_number || 0,
      label: row.label || '',
      type: row.type || 'Practice Drill',
      domainId: row.domain_id || undefined,
      domainName: row.domain_name || undefined,
      score: row.score || 0,
      totalQuestions: row.total_questions || 0,
      accuracy: Number(row.accuracy || 0),
      timeSpentMinutes: row.time_spent_minutes || 0,
    })) as StudentActivitySession[],
    lessonProgress: (throwOnError(lessonProgressResult as any, 'Load lesson progress') || []) as any[],
    assignmentProgress: (throwOnError(assignmentProgressResult as any, 'Load assignment progress') || []) as AssignmentProgress[],
  };
}

export async function cloudCreateClass(client: SupabaseClient, row: SchoolClass) {
  const { error } = await client.from('school_classes').insert(row);
  if (error) throw error;
}

export async function cloudUpdateClass(client: SupabaseClient, id: string, updates: Partial<SchoolClass>) {
  const { error } = await client.from('school_classes').update(updates).eq('id', id);
  if (error) throw error;
}

export async function cloudDeleteClass(client: SupabaseClient, id: string) {
  const { error } = await client.from('school_classes').delete().eq('id', id);
  if (error) throw error;
}

export async function cloudCreateAssignment(client: SupabaseClient, row: Assignment) {
  const { error } = await client.from('assignments').insert(row);
  if (error) throw error;
}

export async function cloudDeleteAssignment(client: SupabaseClient, id: string) {
  const { error } = await client.from('assignments').delete().eq('id', id);
  if (error) throw error;
}

export async function cloudUpsertAssignmentProgress(client: SupabaseClient, row: AssignmentProgress) {
  const { error } = await client.from('assignment_progress').upsert(row, {
    onConflict: 'assignment_id,student_id',
  });
  if (error) throw error;
}

export async function cloudUpsertLessonProgress(
  client: SupabaseClient,
  row: { id: string; student_id: string; lesson_id: string; completed: boolean; completed_at?: string }
) {
  const { error } = await client.from('lesson_progress').upsert(row, {
    onConflict: 'student_id,lesson_id',
  });
  if (error) throw error;
}

export async function cloudInsertQuizAttempt(client: SupabaseClient, row: QuizAttempt) {
  const payload = {
    id: row.id,
    student_id: row.student_id,
    quiz_type: row.quiz_type,
    domain_id: row.domain_id || null,
    score: row.score,
    total_questions: row.total_questions,
    percentage: row.percentage,
    time_spent_seconds: row.time_spent_seconds || 0,
    domain_breakdown: row.domain_breakdown || null,
    started_at: row.started_at || null,
    completed_at: row.completed_at || new Date().toISOString(),
  };
  const { error } = await client.from('quiz_attempts').insert(payload);
  if (error) throw error;
}

export async function cloudInsertActivitySession(client: SupabaseClient, row: StudentActivitySession) {
  const payload = {
    id: row.id,
    student_id: row.student_id,
    formatted_date: row.formattedDate,
    session_number: row.sessionNumber,
    label: row.label,
    type: row.type,
    domain_id: row.domainId || null,
    domain_name: row.domainName || null,
    score: row.score,
    total_questions: row.totalQuestions,
    accuracy: row.accuracy,
    time_spent_minutes: row.timeSpentMinutes,
  };
  const { error } = await client.from('activity_sessions').insert(payload);
  if (error) throw error;
}

export async function cloudDeleteActivitySession(client: SupabaseClient, id: string) {
  const { error } = await client.from('activity_sessions').delete().eq('id', id);
  if (error) throw error;
}

export async function cloudInsertLessonGrade(client: SupabaseClient, row: LessonGradeRecord) {
  const { error } = await client.from('lesson_grades').insert(row);
  if (error) throw error;
}

export async function cloudUpdateLessonGrade(
  client: SupabaseClient,
  id: string,
  updates: Partial<LessonGradeRecord>
) {
  const { error } = await client.from('lesson_grades').update(updates).eq('id', id);
  if (error) throw error;
}

export async function cloudUpdateStudentProfile(
  client: SupabaseClient,
  studentId: string,
  updates: Partial<Profile>
) {
  const { error } = await client.from('profiles').update(updates).eq('id', studentId);
  if (error) throw error;
}
