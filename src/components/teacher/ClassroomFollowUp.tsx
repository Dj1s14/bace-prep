import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
export function ClassroomFollowUp() {
  const { students, classes, assignments, assignmentProgress, activitySessions, domains, currentUser, setSelectedStudentId, setTeacherPage, refreshWorkspace } = useApp();
  const [classId,setClassId] = useState('all'); const [message,setMessage] = useState('');
  const owned = classes.filter(c => currentUser?.role === 'admin' || c.teacher_id === currentUser?.id);
  const roster = students.filter(s => owned.some(c=>c.id===s.class_id) && (classId==='all'||s.class_id===classId));
  const now = Date.now();
  const rows = roster.map(student => {
    const due = assignments.filter(a=>a.class_id===student.class_id && a.due_date && Date.parse(a.due_date)<now && !assignmentProgress.some(p=>p.assignment_id===a.id && p.student_id===student.profile.id && ['Completed','Graded'].includes(p.status)));
    const sessions = activitySessions.filter(a=>a.student_id===student.profile.id).sort((a,b)=>b.date.localeCompare(a.date));
    const last = sessions[0];
    const measured = domains.filter(d=>student.questions_attempted>0 && (student.domain_mastery[d.id]||0)<70).sort((a,b)=>(student.domain_mastery[a.id]||0)-(student.domain_mastery[b.id]||0));
    return {student,due,last,measured};
  }).sort((a,b)=>b.due.length-a.due.length || a.student.overall_readiness-b.student.overall_readiness);
  return <section className="bg-white border rounded-2xl p-6 space-y-4"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="text-xl font-bold">Classroom follow-up</h2><p className="text-sm text-slate-600">Overdue work, review priorities, and the latest recorded activity.</p></div><div className="flex gap-3"><select aria-label="Follow-up class" value={classId} onChange={e=>setClassId(e.target.value)} className="border rounded-lg p-2"><option value="all">All my classes</option>{owned.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><button className="text-blue-700 underline" onClick={async()=>{ setMessage('Refreshing…'); try { await refreshWorkspace(); setMessage('Refresh complete'); } catch(error: any) {setMessage(error.message);}  }}>Refresh</button></div></div>
    {message && <p role="status" className="text-sm">{message}</p>}
    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Student</th><th>Overdue assignments</th><th>Review domains</th><th>Latest activity</th></tr></thead><tbody>{rows.map(({student,due,last,measured})=><tr key={student.profile.id} className="border-b"><td className="p-2"><button className="text-blue-700 underline" onClick={()=>{setSelectedStudentId(student.profile.id);setTeacherPage('student_detail');}}>{student.profile.first_name} {student.profile.last_name}</button></td><td className="p-2">{due.length}{due.length>0 && <p className="text-xs text-rose-700">{due.map(a=>a.title).join(', ')}</p>}</td><td className="p-2">{student.questions_attempted===0?'No assessment baseline':measured.slice(0,2).map(d=>`${d.name} (${student.domain_mastery[d.id]||0}%)`).join(', ')||'No domains below 70%'}</td><td className="p-2">{last?`${last.date} · ${last.label}`:'No recorded activity'}</td></tr>)}</tbody></table></div>{rows.length===0 && <p className="text-sm text-slate-500">No enrolled students in this selection.</p>}
  </section>;
}
