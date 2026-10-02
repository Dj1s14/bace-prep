import type { Profile, UserRole, StudentOverview } from '../types/database';
export const PREVIEW_STUDENT_ID = 'generic-student-preview';
export function canOpenPortal(accountRole: UserRole, portal: UserRole) {
  return portal === 'student' || accountRole === 'admin' || (accountRole === 'teacher' && portal === 'teacher');
}
export function createPreviewStudent(): StudentOverview {
  return {
    profile: {id: PREVIEW_STUDENT_ID, email:'demo.student@example.invalid', first_name:'Demo', last_name:'Student', role:'student', created_at:'2026-01-01T00:00:00Z'},
    class_id:'', overall_readiness:0, domain_mastery:{}, last_active:'Preview only', status:'Needs Review',
    lessons_completed:0, questions_attempted:0, accuracy:0, mock_exam_scores:[], weakest_topics:[], strongest_topics:[], recent_activities:[],
  };
}
export function resolveTeacherIdentity(profile: Profile) {
  return {id:profile.id, role:profile.role as 'teacher'|'admin', prefix:profile.prefix,
    first_name:profile.first_name,last_name:profile.last_name,email:profile.email,
    school_name:profile.school_name || 'Biotechnology & Life Sciences Academy',
    department:profile.department || 'CTE Biomedical Science',created_at:profile.created_at};
}
