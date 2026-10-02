import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';
import { prioritizeStudy, StudyReview } from '../../lib/studyReviews';
export function StudyPlan() {
  const { currentUser, currentStudent, domains, lessons, questions, completedLessonIds, startPractice, startLesson, isProduction, isFacultyPreviewingStudent } = useApp();
  const [reviews, setReviews] = useState<StudyReview[]>([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    let active = true;
    const client = getSupabase();
    if (client && currentUser && isProduction && !isFacultyPreviewingStudent) void client.from('study_reviews').select('*').eq('student_id', currentUser.id).then(({ data, error }) => {
      if (!active) return; if (error) setMessage('Review history could not load. Your domain study plan is still available.'); else setReviews(data || []);
    });
    return () => { active = false; };
  }, [currentUser?.id, isProduction, isFacultyPreviewingStudent]);
  const missed = questions.filter(q => reviews.some(r => r.question_id === q.id && !r.last_correct));
  const priorities = prioritizeStudy(domains, currentStudent.domain_mastery, missed).slice(0,3);
  return <section className="bg-white rounded-2xl border p-6 space-y-4">
    <h2 className="text-xl font-bold">Your next study session</h2><p className="text-sm text-slate-600">Review a lesson, complete a short drill, then revisit missed questions. Priorities use your recorded accuracy, missed questions, and exam weights.</p>
    {message && <p role="status" className="text-amber-800 text-sm">{message}</p>}
    {missed.length > 0 && <button onClick={() => startPractice({ mode: 'Missed Questions', questionIds: missed.map(q => q.id), count: Math.min(10,missed.length) })} className="study-button study-button-primary">Retry {Math.min(10,missed.length)} missed questions</button>}
    <div className="grid md:grid-cols-3 gap-4">{priorities.map((item,index) => {
      const domain = domains.find(d => d.id === item.id)!;
      const related = lessons.filter(l => l.domain_id === item.id);
      const missedLesson = related.find(l => missed.some(q => q.lesson_id === l.id || q.topic_id === l.topic_id));
      const lesson = missedLesson || related.find(l => !completedLessonIds.includes(l.id)) || related[0];
      return <div key={item.id} className="bg-slate-50 rounded-xl p-5 space-y-3"><p className="text-xs font-bold text-blue-700">Priority {index+1}</p><h3 className="font-bold">{domain.name}</h3><p className="text-sm text-slate-600">{currentStudent.questions_attempted ? `${currentStudent.domain_mastery[item.id] || 0}% recorded accuracy` : 'Start here to establish a baseline'} · {item.misses} questions to revisit</p>
        {lesson && <button className="block text-blue-700 underline text-sm text-left" onClick={() => startLesson(lesson.id)}>Review: {lesson.title}</button>}
        <button className="study-button study-button-secondary" onClick={() => startPractice({ mode: 'Domain Review', domainId: item.id, count: 10 })}>Practice 10 questions</button></div>;
    })}</div>
  </section>;
}

