import { Lesson, Question } from '../types/database';
const aliases: Record<string,string> = {
 les_upstream_bioreactors:'les_bioprocess_quality',
 les_chromatography_downstream:'les_chromatography',
 les_microbiology_plating:'les_culture_counting',
 les_gram_staining:'les_microscopy',
 les_cell_culture_viability:'les_cell_culture'
};
export function normalizeQuestionBank(questions: Question[], lessons: Lesson[]): Question[] {
 const seen = new Set<string>();
 return questions.map(question=>{
  const lessonId=aliases[question.lesson_id||'']||question.lesson_id;
  const lesson=lessons.find(l=>l.id===lessonId);
  const prompt=question.question_text.trim().replace(/\s+/g,' ').toLowerCase();
  const duplicate=seen.has(prompt);
  if(question.active!==false) seen.add(prompt);
  return {...question,lesson_id:lessonId,
    ...(lesson ? {domain_id:lesson.domain_id,topic_id:lesson.topic_id}:{}),
    difficulty:question.difficulty==='Moderate'?'Medium':question.difficulty==='Difficult'?'Hard':question.difficulty,
    // Retain IDs so saved exam drafts and historical references remain readable.
    active:duplicate?false:question.active
  };
 });
}
