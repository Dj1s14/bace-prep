import { getSupabase } from './supabase';
import { saveWrite } from './saveQueue';
import { Question } from '../types/database';
export type StudyReview = { id: string; student_id: string; question_id: string; last_correct: boolean; updated_at: string };
export function recordAnswerReview(studentId: string, question: Question, correct: boolean) {
  const client = getSupabase();
  if (!client) return Promise.reject(new Error('Sign in to save your review list.'));
  return saveWrite(client, { table: 'study_reviews', action: 'upsert', conflict: 'student_id,question_id', row: {
    id: `review_${studentId}_${question.id}`, student_id: studentId, question_id: question.id,
    last_correct: correct, updated_at: new Date().toISOString(),
  } });
}
export function prioritizeStudy(domains: Array<{ id: string; exam_weight: number }>, mastery: Record<string, number>, missed: Question[]) {
  return domains.map(domain => ({ ...domain, misses: missed.filter(q => q.domain_id === domain.id).length,
    priority: ((100 - (mastery[domain.id] || 0)) / 100) * domain.exam_weight + missed.filter(q => q.domain_id === domain.id).length * 2,
  })).sort((a,b) => b.priority - a.priority);
}

export function recordExamReviews(studentId: string, questions: Question[], choices: Record<string,string>) {
  const client = getSupabase(); if (!client) return Promise.reject(new Error('Sign in to save reviews.'));
  return saveWrite(client, { table: 'study_reviews', action: 'upsert', conflict: 'student_id,question_id', row: questions.map(question => ({
    id: `review_${studentId}_${question.id}`, student_id: studentId, question_id: question.id,
    last_correct: question.choices.some(choice => choice.is_correct && choice.id === choices[question.id]), updated_at: new Date().toISOString(),
  })) });
}
