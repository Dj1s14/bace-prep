import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuizAttempt } from '../../types/database';
import { ownCompletedTests, reviewStatus, testTitle } from '../../lib/completedTests';
import { cleanQuestionText } from '../../utils/questionUtils';
import { AnswerExplanations } from './AnswerExplanations';

export function TestAnswerReview({ attempt }: { attempt: QuizAttempt }) {
 const [filter,setFilter] = useState<'all'|'missed'>('all');
 const items = attempt.review_questions || [];
 const visible = items.map((item,index)=>({item,index})).filter(({item}) => filter==='all' || reviewStatus(item)!=='Correct');
 return <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5" aria-label="Test answer review">
  <div className="flex flex-wrap items-center justify-between gap-3">
   <div><h2 className="text-xl font-bold text-slate-900">Review Your Answers</h2><p className="text-sm text-slate-600 mt-1">{attempt.score}/{attempt.total_questions} correct · {attempt.percentage}%</p></div>
   {items.length>0 && <div className="flex gap-2"><button onClick={()=>setFilter('all')} aria-pressed={filter==='all'} className={`px-3 py-2 text-sm rounded-lg ${filter==='all'?'bg-blue-700 text-white':'bg-slate-100 text-slate-700'}`}>All questions</button><button onClick={()=>setFilter('missed')} aria-pressed={filter==='missed'} className={`px-3 py-2 text-sm rounded-lg ${filter==='missed'?'bg-blue-700 text-white':'bg-slate-100 text-slate-700'}`}>Missed & unanswered</button></div>}
  </div>
  {!items.length ? <p className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">Only the score was saved for this test. Detailed answers are available for tests completed after this feature was added.</p> : <>
   <p className="text-xs text-slate-500">Questions and explanations are preserved as they appeared when you completed this test.</p>
   {!visible.length && <p className="text-sm text-emerald-700">You answered every question correctly. Switch to All questions to review the explanations.</p>}
   {visible.map(({item,index}) => {
    const q = item.question;
    const status = reviewStatus(item);
    const selected = q.choices.find(c=>c.id===item.selected_choice_id);
    const correct = q.choices.find(c=>c.is_correct);
    return <article key={`${q.id}_${index}`} className="border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 break-words">
     <div className="flex items-center justify-between gap-3"><span className="text-xs font-bold text-slate-500">Question {index+1}</span><span className={`inline-flex items-center gap-1 text-xs font-semibold ${status==='Correct'?'text-emerald-700':status==='Incorrect'?'text-rose-700':'text-amber-700'}`}>{status==='Correct'?<CheckCircle2 className="w-4 h-4"/>:<XCircle className="w-4 h-4"/>}{status}</span></div>
     <h3 className="font-semibold text-slate-900 whitespace-pre-wrap">{cleanQuestionText(q.question_text)}</h3>
     {q.image_url && <img src={q.image_url} alt="Question reference" className="max-h-64 max-w-full object-contain"/>}
     <div className="space-y-2 text-sm"><p><span className="font-semibold">Your answer: </span>{selected ? cleanQuestionText(selected.choice_text) : 'Not answered'}</p><p className="text-emerald-800"><span className="font-semibold">Correct answer: </span>{correct ? cleanQuestionText(correct.choice_text) : 'Answer key unavailable'}</p></div>
     <div className="bg-blue-50 rounded-lg p-3 text-sm text-slate-700"><p className="font-semibold text-blue-900 mb-1">Why this is correct</p><p className="whitespace-pre-wrap">{cleanQuestionText(q.explanation)}</p></div>
     <AnswerExplanations question={q}/>
    </article>;
   })}
  </>}
 </section>;
}

export function CompletedTests() {
 const {completedTests,currentStudent} = useApp();
 const [selectedId,setSelectedId] = useState<string|null>(null);
 const tests = ownCompletedTests(completedTests,currentStudent.profile.id);
 const selected = tests.find(a=>a.id===selectedId);
 return <section className="space-y-4" aria-label="Completed tests">
  <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-700"/><h2 className="text-xl font-bold text-slate-900">Completed Tests</h2></div>
  <p className="text-sm text-slate-600">Open a completed mock exam, practice drill, or lesson check to learn from your answers.</p>
  {selected ? <>
   <button onClick={()=>setSelectedId(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"><ArrowLeft className="w-4 h-4"/>Back to completed tests</button>
   <h3 className="font-semibold text-slate-900">{testTitle(selected)} · {new Date(selected.completed_at).toLocaleString()}</h3>
   <TestAnswerReview key={selected.id} attempt={selected}/>
  </> : !tests.length ? <div className="p-5 rounded-xl border border-slate-200 bg-white text-sm text-slate-600">No completed tests yet. Finish a test to see it here.</div> : <div className="space-y-3">
   {tests.map(attempt=><div key={attempt.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
    <div><h3 className="font-semibold text-slate-900">{testTitle(attempt)}</h3><p className="text-xs text-slate-500 mt-1">{new Date(attempt.completed_at).toLocaleString()} · {Math.ceil(attempt.time_spent_seconds/60)} min</p></div>
    <div className="flex items-center gap-4"><span className="text-sm font-bold text-slate-800">{attempt.score}/{attempt.total_questions} · {attempt.percentage}%</span><button onClick={()=>setSelectedId(attempt.id)} aria-label={`Review ${testTitle(attempt)} from ${new Date(attempt.completed_at).toLocaleString()}`} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-4 py-2 rounded-lg">{attempt.review_questions?.length ? 'Review Test' : 'View Score'}</button></div>
   </div>)}
  </div>}
 </section>;
}
