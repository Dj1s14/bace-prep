import { getSupabase } from './supabase';
import type { LessonGradeRecord, Profile, StudentOverview } from '../types/database';

/**
 * Cloud sync only ever writes under a Supabase-authenticated student's identity.
 * A locally stored "logged in" profile is not authentication.
 * Keep local records intact on any failure so historical work can be recovered.
 */
export async function syncStudentLessons(
  profile: Profile,
  grades: LessonGradeRecord[],
  completedLessonIds: string[],
): Promise<{ grades: LessonGradeRecord[]; completed: string[] }> {
  const client = getSupabase();
  if (!client) throw new Error('Cloud storage is not configured.');
  const { data: userData, error: authError } = await client.auth.getUser();
  const user = userData.user;
  if (authError || !user || !user.email) {
    throw new Error('Cloud save requires a verified Supabase sign-in. Your work remains in this browser.');
  }
  if (user.email.toLowerCase() !== profile.email.toLowerCase()) {
    throw new Error('Cloud identity differs from the displayed student. Work remains in this browser.');
  }
  const { data: remoteProfile, error: profileError } = await client.from('profiles')
    .select('id, role').eq('id', user.id).single();
  if (profileError || !remoteProfile || remoteProfile.role !== 'student') {
    throw new Error('Student cloud profile missing or not authorized. Your browser copy is preserved.');
  }

  // Read existing records BEFORE uploading local work. Never delete cloud or local records.
  const [remoteGradesResult, remoteProgressResult] = await Promise.all([
    client.from('lesson_grades').select('*').eq('student_id', user.id),
    client.from('lesson_progress').select('lesson_id').eq('student_id', user.id).eq('completed', true),
  ]);
  if (remoteGradesResult.error) throw remoteGradesResult.error;
  if (remoteProgressResult.error) throw remoteProgressResult.error;

  const ownedGrades = grades.filter(g => g.student_id === profile.id || g.student_id === user.id);
  // Use stable IDs to make repeated uploads idempotent.
  const alreadyStored = new Set((remoteGradesResult.data || []).map(g => g.id));
  const pendingGrades = ownedGrades.filter(g => !alreadyStored.has(g.id));
  if (pendingGrades.length) {
    const rows = pendingGrades.map(g => ({
      id: g.id, student_id: user.id, student_name: g.student_name || null,
      lesson_id: g.lesson_id, lesson_title: g.lesson_title || null,
      domain_id: g.domain_id || null, domain_name: g.domain_name || null,
      score: g.score, total_questions: g.total_questions,
      percentage: g.percentage, letter_grade: g.letter_grade || null,
      status: g.status, submitted_at: g.submitted_at,
      graded_by: g.graded_by || null, teacher_notes: g.teacher_notes || null,
      teacher_feedback: g.teacher_feedback || null,
    }));
    const { error } = await client.from('lesson_grades').insert(rows);
    if (error) throw error;
  }

  const remoteIds = new Set((remoteProgressResult.data || []).map(p => p.lesson_id));
  const pendingIds = [...new Set(completedLessonIds)].filter(id => !remoteIds.has(id));
  if (pendingIds.length) {
    const { error } = await client.from('lesson_progress').upsert(
      pendingIds.map(lessonId => ({
        id: `progress_${user.id}_${lessonId}`,
        student_id: user.id, lesson_id: lessonId,
        completed: true, completed_at: new Date().toISOString(),
      })),
      { onConflict: 'id' },
    );
    if (error) throw error;
  }

  // Re-read after writing; the UI must not claim 'Saved' until this succeeds.
  const [verifiedGrades, verifiedProgress] = await Promise.all([
    client.from('lesson_grades').select('*').eq('student_id', user.id),
    client.from('lesson_progress').select('lesson_id').eq('student_id', user.id).eq('completed', true),
  ]);
  if (verifiedGrades.error) throw verifiedGrades.error;
  if (verifiedProgress.error) throw verifiedProgress.error;
  const savedGradeIds = new Set((verifiedGrades.data || []).map(g => g.id));
  const savedLessonIds = new Set((verifiedProgress.data || []).map(p => p.lesson_id));
  if (ownedGrades.some(g => !savedGradeIds.has(g.id)) ||
      completedLessonIds.some(id => !savedLessonIds.has(id))) {
    throw new Error('Cloud verification incomplete. Browser records are preserved.');
  }

  return {
    grades: (verifiedGrades.data || []).map(g => ({ ...g, student_id: profile.id })) as LessonGradeRecord[],
    completed: [...savedLessonIds],
  };
}

/** Export only the current user's lesson data; no credentials or other students. */
export function downloadStudentLessonBackup(profile: Profile): void {
  const safeParse = (key: string): unknown => {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  };
  const gradeKeys = ['bace_lesson_grades', 'bace_production_lesson_grades'];
  const progressKeys = ['bace_student_completed_lessons', 'bace_production_student_completed_lessons'];
  const grades = gradeKeys.flatMap(key => {
    const val = safeParse(key);
    return Array.isArray(val) ? val.filter(g => g?.student_id === profile.id) : [];
  });
  const completed = progressKeys.flatMap(key => {
    const val = safeParse(key) as Record<string, string[]> | null;
    return val && Array.isArray(val[profile.id]) ? val[profile.id] : [];
  });
  const payload = {
    format: 'bace-student-lessons-v1',
    exported_at: new Date().toISOString(),
    student_email: profile.email,
    student_id: profile.id,
    grades: [...new Map(grades.map(g => [g.id, g])).values()],
    completed_lesson_ids: [...new Set(completed)],
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'bace-lesson-backup.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

/** Read only instructor-authorized students and their cloud-submitted lessons. RLS
 * is the source of authorization; never trust the local role by itself. */
export async function loadInstructorLessonData(profile: Profile): Promise<{
  students: StudentOverview[];
  grades: LessonGradeRecord[];
}> {
  const client = getSupabase();
  if (!client) throw new Error('Cloud storage unavailable');
  const { data: { user }, error: authError } = await client.auth.getUser();
  if (authError || !user || user.email?.toLowerCase() !== profile.email.toLowerCase()) {
    throw new Error('Sign in with your verified school account to view cloud grades.');
  }
  const { data: remoteProfile, error: roleError } = await client.from('profiles')
    .select('role').eq('id', user.id).single();
  if (roleError || !['teacher','admin'].includes(remoteProfile?.role || '')) {
    throw new Error('Your Supabase account is not authorized for instructor grade access.');
  }
  const [profilesResult, gradesResult, progressResult] = await Promise.all([
    client.from('profiles').select('id,email,first_name,last_name,role,class_id,created_at').eq('role', 'student'),
    client.from('lesson_grades').select('*'),
    client.from('lesson_progress').select('student_id,lesson_id').eq('completed',true),
  ]);
  if (profilesResult.error) throw profilesResult.error;
  if (gradesResult.error) throw gradesResult.error;
  if (progressResult.error) throw progressResult.error;
  const completionCount = new Map<string,Set<string>>();
  for (const p of progressResult.data || []) {
    if (!completionCount.has(p.student_id)) completionCount.set(p.student_id, new Set());
    completionCount.get(p.student_id)!.add(p.lesson_id);
  }
  const students: StudentOverview[] = (profilesResult.data || []).map(p => ({
    profile: {
      id:p.id, email:p.email,first_name:p.first_name,last_name:p.last_name,
      role:'student',class_id:p.class_id || '',created_at:p.created_at,
    },
    class_id:p.class_id || '', overall_readiness:0,
    domain_mastery:{ d1:0,d2:0,d3:0,d4:0,d5:0,d6:0,d7:0,d8:0 },
    last_active:'Cloud account', status:'Needs Review',
    lessons_completed:completionCount.get(p.id)?.size || 0,
    questions_attempted:0, accuracy:0,mock_exam_scores:[],
    weakest_topics:[],strongest_topics:[],recent_activities:[],
  }));
  return { students, grades:(gradesResult.data || []) as LessonGradeRecord[] };
}
