import React, { useState } from 'react';
import { practicalWorkflows } from '../../data/practicalWorkflows';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';
import { cloudInsertActivitySession, cloudInsertQuizAttempt } from '../../lib/cloudData';
export function WorkflowCoach({ stationId }: { stationId: string }) {
  const workflow = practicalWorkflows[stationId];
  const { currentUser, isProduction, isFacultyPreviewingStudent, refreshWorkspace } = useApp();
  const [step,setStep] = useState(0); const [mistakes,setMistakes] = useState(0); const [feedback,setFeedback] = useState(''); const [saved,setSaved] = useState(false);
  const [busy,setBusy] = useState(false);
  const [runId] = useState(()=>crypto.randomUUID());
  if (!workflow) return null;
  const completed = step === workflow.steps.length;
  const choose = async (index: number) => {
    if (index !== step) { setMistakes(m=>m+1); setFeedback(`Before that action: ${workflow.steps[step].action}. ${workflow.steps[step].why}`); return; }
    setFeedback(workflow.steps[index].why); setStep(index+1);
  };
  const save = async () => {
    if (saved || busy || !isProduction || isFacultyPreviewingStudent || !currentUser) return;
    const client = getSupabase(); if (!client) return;
    const total = workflow.steps.length; const score = Math.max(0,total-mistakes); const id = `workflow_${runId}`;
    setBusy(true);
    try {
      await cloudInsertQuizAttempt(client,{ id, student_id:currentUser.id,quiz_type:'lesson_check',domain_id:workflow.domain,score,total_questions:total,percentage:Math.round(score/total*100),started_at:new Date().toISOString(),completed_at:new Date().toISOString(),time_spent_seconds:0 });
      await cloudInsertActivitySession(client,{id:`activity_${runId}`,student_id:currentUser.id,date:new Date().toISOString().slice(0,10),formattedDate:new Date().toLocaleDateString(),sessionNumber:0,label:workflow.title,type:'Practice Drill',domainId:workflow.domain,score,totalQuestions:total,accuracy:Math.round(score/total*100),timeSpentMinutes:0});
      setSaved(true); setFeedback('Workflow result saved.'); await refreshWorkspace().catch(()=>setFeedback('Workflow result saved. Refresh the dashboard when connected.'));
    } catch(error:any) {setFeedback(`Result not saved yet: ${error.message}. Retry saving below.`);} finally {setBusy(false);}
  };
  return <section className="bg-white border rounded-2xl p-5 space-y-4"><h3 className="font-bold text-lg">{workflow.title}</h3><p className="text-sm text-slate-600">Choose the next action in order. This is a classroom training sequence; the approved local SOP controls actual laboratory work.</p><details><summary className="text-blue-700 cursor-pointer">Review the step-by-step guide</summary><ol className="list-decimal pl-6 mt-3 space-y-2">{workflow.steps.map(s=><li key={s.action}><strong>{s.action}</strong><p className="text-sm text-slate-600">{s.why}</p></li>)}</ol></details>
    <p className="text-sm font-semibold">{completed?'Workflow complete':`Step ${step+1} of ${workflow.steps.length}`} · {mistakes} correction(s)</p>
    {!completed && <div className="grid gap-2">{workflow.steps.map((s,index)=>({s,index})).filter(item=>item.index>=step).sort((a,b)=>a.s.action.localeCompare(b.s.action)).map(({s,index})=><button key={s.action} className="text-left border rounded-lg p-3 hover:bg-blue-50" onClick={()=>void choose(index)}>{s.action}</button>)}</div>}
    {feedback && <p role="status" className="bg-blue-50 text-blue-900 p-3 rounded-lg text-sm">{feedback}</p>}
    {completed && isFacultyPreviewingStudent && <p className="text-sm text-blue-800">Preview complete — this result is not saved to student records.</p>}
    {completed && isProduction && !isFacultyPreviewingStudent && <button disabled={saved || busy} onClick={()=>void save()} className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">{saved?'Result saved':busy?'Saving…':'Save workflow result'}</button>}
  </section>;
}
