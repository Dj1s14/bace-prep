import type { LessonGradeRecord, StudentOverview } from '../types/database';

/** Use the verified email to discover a student's former browser-only IDs.
 * This is a recovery hint, NOT an authorization claim. Cloud writes still
 * require a matching authenticated Supabase profile and RLS. */
export function legacyStudentIds(
  verifiedEmail: string,
  canonicalUserId: string,
  students: StudentOverview[],
): string[] {
  const email = verifiedEmail.trim().toLowerCase();
  let knownAliases: string[] = [];
  try {
    const aliases = JSON.parse(localStorage.getItem('bace_student_identity_aliases') || '{}');
    if (Array.isArray(aliases[email])) knownAliases = aliases[email];
  } catch { /* preserve data on malformed legacy storage */ }
  return [...new Set([
    canonicalUserId,
    ...knownAliases,
    ...students.filter(s => s.profile.email.trim().toLowerCase() === email)
      .map(s => s.profile.id),
  ])];
}

export function collectStudentLessons(
  ids: string[],
  gradeRecords: LessonGradeRecord[],
  completionMap: Record<string, string[]>,
): { grades: LessonGradeRecord[]; completed: string[] } {
  const owned = new Set(ids);
  const uniqueGrades = new Map<string, LessonGradeRecord>();
  for (const grade of gradeRecords) {
    if (owned.has(grade.student_id) && grade.id) uniqueGrades.set(grade.id, grade);
  }
  const completed = [...new Set(ids.flatMap(id => completionMap[id] || []))];
  return { grades: [...uniqueGrades.values()], completed };
}

/** Merge cloud identities by email while retaining the locally saved progress.
 * Canonical Supabase IDs must be used for future teacher gradebook joins. */
export function mergeCloudStudent(
  existing: StudentOverview[],
  cloud: StudentOverview,
): StudentOverview[] {
  const email = cloud.profile.email.trim().toLowerCase();
  const index = existing.findIndex(s => s.profile.email.trim().toLowerCase() === email);
  if (index < 0) return [...existing, cloud];
  const result = [...existing];
  const local = result[index];
  if (local.profile.id !== cloud.profile.id) {
    try {
      const raw = localStorage.getItem('bace_student_identity_aliases');
      const aliases = raw ? JSON.parse(raw) : {};
      aliases[email] = [...new Set([...(aliases[email] || []), local.profile.id])];
      localStorage.setItem('bace_student_identity_aliases', JSON.stringify(aliases));
    } catch { /* cloud sync still uses the canonical ID */ }
  }
  result[index] = {
    ...local,
    profile: { ...local.profile, ...cloud.profile, id: cloud.profile.id },
    class_id: cloud.class_id || local.class_id,
    lessons_completed: Math.max(local.lessons_completed, cloud.lessons_completed),
  };
  return result.filter((student, i) =>
    i === index || student.profile.id !== cloud.profile.id);
}
