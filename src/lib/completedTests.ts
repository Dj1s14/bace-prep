import { CompletedQuestionReview, Question, QuizAttempt } from '../types/database';

// Capture the wording, answer key and explanation used at submission time.
// Curriculum edits must not silently rewrite a completed student's test.
export function captureTestReview(questions: Question[], selected: Record<string,string>): CompletedQuestionReview[] {
 return questions.map(question => ({
  question: JSON.parse(JSON.stringify(question)) as Question,
  selected_choice_id: question.choices.some(c => c.id === selected[question.id]) ? selected[question.id] : null,
 }));
}
export function reviewStatus(item: CompletedQuestionReview): 'Correct' | 'Incorrect' | 'Unanswered' {
 if (!item.selected_choice_id) return 'Unanswered';
 return item.question.choices.some(c => c.id === item.selected_choice_id && c.is_correct) ? 'Correct' : 'Incorrect';
}
export function ownCompletedTests(attempts: QuizAttempt[], studentId: string): QuizAttempt[] {
 if (!studentId) return [];
 return attempts.filter(a => a.student_id === studentId && a.completed_at)
  .sort((a,b) => Date.parse(b.completed_at) - Date.parse(a.completed_at));
}
export function testTitle(attempt: QuizAttempt): string {
 const names: Record<QuizAttempt['quiz_type'],string> = {practice:'Practice Test',practice_drill:'Practice Drill',mock_quick:'Quick Mock Exam',mock_half:'Half Mock Exam',mock_full:'Full Mock Exam',lesson_check:'Lesson Check'};
 return names[attempt.quiz_type] || 'Completed Test';
}
