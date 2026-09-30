export type ExamConfig = { title: string; totalQuestions: number; timeLimitMinutes: number; quizType: 'mock_quick'|'mock_half'|'mock_full' };
export type ExamDraft = { version: 1; owner: string; config: ExamConfig; questionIds: string[]; currentIndex: number; selectedChoices: Record<string,string>; flaggedQuestions: Record<string,boolean>; deadline: number; startedAt: string; attemptId: string };
export const examDraftKey = (owner: string, environment: string) => `bace_exam_draft:${environment}:${owner}`;
export function readExamDraft(owner: string, environment: string): ExamDraft | null {
  try { const draft = JSON.parse(localStorage.getItem(examDraftKey(owner,environment)) || 'null');
    if (!draft || draft.version !== 1 || draft.owner !== owner || !Array.isArray(draft.questionIds) || !draft.questionIds.length || !Number.isFinite(draft.deadline) || !draft.config || !['mock_quick','mock_half','mock_full'].includes(draft.config.quizType)) return null;
    if (!Number.isInteger(draft.currentIndex) || draft.currentIndex < 0 || draft.currentIndex >= draft.questionIds.length || typeof draft.selectedChoices !== 'object' || !draft.selectedChoices || typeof draft.flaggedQuestions !== 'object' || !draft.flaggedQuestions || !draft.attemptId || !Number.isFinite(Date.parse(draft.startedAt))) return null;
    return draft;
  } catch { return null; }
}
export function remainingSeconds(deadline: number, now = Date.now()) { return Math.max(0, Math.ceil((deadline-now)/1000)); }
