import React, {useState} from 'react';
import {useApp} from '../../context/AppContext';
import {StudentOverview} from '../../types/database';
import {LessonRewards} from '../student/LessonRewards';
import {testTitle} from '../../lib/completedTests';

export const StudentLearningProfile: React.FC<{student:StudentOverview}> = ({student}) => {
 const {students, classes, lessons, domains, studentLessonCompletions, lessonGrades, activitySessions, studentTestHistory, assignments, assignmentProgress} = useApp();
 const [domain, setDomain] = useState('all');
 const [status, setStatus] = useState('all');
 // Resolve through the scoped roster on every render; never change authentication.
 if (!students.some(s => s.profile.id === student.profile.id)) return null;
 const id=student.profile.id;
 const completed=new Set(studentLessonCompletions[id] || []);
 const grades=lessonGrades.filter(g => g.student_id===id).sort((a,b)=>b.submitted_at.localeCompare(a.submitted_at));
 const units=lessons.filter(l=>l.active && (domain==='all'||l.domain_id===domain) && (status==='all'||completed.has(l.id)===(status==='completed')));
 const tests=studentTestHistory.filter(t=>t.student_id===id && t.completed_at).sort((a,b)=>b.completed_at.localeCompare(a.completed_at));
 const sessions=activitySessions.filter(s=>s.student_id===id).sort((a,b)=>b.date.localeCompare(a.date));
 const section=classes.find(c=>c.id===student.class_id);
 return <section className="space-y-5" aria-label="Student learning profile">
  <div className="text-sm text-slate-600"><strong>Student Profile</strong> · {section ? `${section.name} · ${section.period}` : 'No class assigned'}<p className="mt-1 text-xs">Last active: {student.last_active || 'No activity recorded'}. This profile keeps you in your teacher account.</p></div>
  <LessonRewards studentId={id}/>
  <div className="space-y-3"><h3 className="font-bold text-slate-900">Lesson Progress & Assessments</h3><div className="flex flex-wrap gap-2"><select aria-label="Filter lessons by domain" value={domain} onChange={e=>setDomain(e.target.value)} className="border rounded-lg p-2 text-sm"><option value="all">All domains</option>{domains.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select><select aria-label="Filter lessons by completion" value={status} onChange={e=>setStatus(e.target.value)} className="border rounded-lg p-2 text-sm"><option value="all">All lessons</option><option value="completed">Completed</option><option value="unfinished">Unfinished</option></select></div>
   <div className="max-h-64 overflow-auto border rounded-xl"><table className="w-full text-left text-xs"><thead className="bg-slate-50"><tr><th className="p-3">Lesson</th><th className="p-3">Completion</th><th className="p-3">Latest assessment</th></tr></thead><tbody>{units.map(l=>{const grade=grades.find(g=>g.lesson_id===l.id);return <tr key={l.id} className="border-t"><td className="p-3">{l.title}</td><td className="p-3">{completed.has(l.id)?'Completed':'Unfinished'}</td><td className="p-3">{grade?`${grade.percentage}% · ${new Date(grade.submitted_at).toLocaleDateString()}`:'No assessment recorded'}</td></tr>})}</tbody></table>{units.length===0&&<p className="p-3 text-sm text-slate-500">No lessons match these filters.</p>}</div>
  </div>
  <div className="space-y-2"><h3 className="font-bold text-slate-900">Completed Tests</h3><p className="text-xs text-slate-500">Test scores are separate from lesson mastery.</p>{tests.length?tests.slice(0,20).map(t=><div key={t.id} className="flex justify-between gap-3 border-b py-2 text-xs"><span>{testTitle(t)} · {new Date(t.completed_at).toLocaleDateString()}</span><strong>{t.percentage}% ({t.score}/{t.total_questions})</strong></div>):<p className="text-sm text-slate-500">No completed tests recorded.</p>}</div>
  <div className="space-y-2"><h3 className="font-bold text-slate-900">Class Assignments</h3>{assignments.filter(a=>a.class_id===student.class_id).map(a=>{const progress=assignmentProgress.find(p=>p.student_id===id&&p.assignment_id===a.id);return <div key={a.id} className="flex justify-between gap-3 text-xs border-b py-2"><span>{a.title} · Due {a.due_date}</span><strong>{progress?.status || 'Pending'}</strong></div>})}{!assignments.some(a=>a.class_id===student.class_id)&&<p className="text-sm text-slate-500">No class assignments.</p>}</div>
  <div className="space-y-2"><h3 className="font-bold text-slate-900">Recent Participation</h3>{sessions.slice(0,10).map(s=><div key={s.id} className="text-xs border-b py-2">{s.label} · {s.formattedDate} · {s.timeSpentMinutes} minutes</div>)}{!sessions.length&&<p className="text-sm text-slate-500">No activity sessions recorded.</p>}</div>
 </section>;
};
