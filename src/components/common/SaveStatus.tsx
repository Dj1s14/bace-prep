import { useApp } from '../../context/AppContext';
import React, { useSyncExternalStore } from 'react';
import { getSaveState, subscribeSaves, retrySaves, discardOldestFailedWrite, discardFacultyPreviewWrites } from '../../lib/saveQueue';
import { getSupabase } from '../../lib/supabase';
export function SaveStatus() {
  const { isProduction, workspaceError, isFacultyPreviewingStudent, currentUser } = useApp();
  const status = useSyncExternalStore(subscribeSaves, getSaveState);
  if (!isProduction) return <p className="px-4 py-2 text-xs bg-amber-50">Demo workspace — results stay in this browser.</p>;
  return <div role="status" aria-live="polite" className={`px-4 py-2 text-xs border-b flex flex-wrap justify-between gap-2 ${status.error ? 'bg-amber-50 text-amber-900' : 'bg-blue-50 text-blue-900'}`}>
    {isFacultyPreviewingStudent && <span>Faculty preview — assessment results are not saved to student records.</span>}
    {status.pending > 0 && !status.saving && currentUser && ['admin','teacher'].includes(currentUser.role) && <button className="font-bold underline" onClick={() => {if(window.confirm('Clear queued faculty test assessments from this browser? Class, grade, and assignment changes remain queued.')) discardFacultyPreviewWrites();}}>Clear preview retries</button>}
    {workspaceError && <span className="text-rose-800">{workspaceError}</span>}
    <span>{status.saving ? `Saving ${status.pending} change(s)…` : status.pending ? `${status.pending} unsaved change(s). ${status.error}` : status.savedAt ? `Saved at ${status.savedAt}` : 'Ready to save'}{status.pending > 0 && ' Keep this browser’s data until your work is saved.'}</span>
    {status.pending > 0 && <button disabled={status.saving} className="font-bold underline disabled:opacity-50" onClick={() => { const client = getSupabase(); if (client) void retrySaves(client); }}>Retry saving</button>}
    {status.error && status.pending > 0 && !status.saving && <button className="underline text-rose-800" onClick={()=>{ if(window.confirm('Discard the oldest unsaved change? This removes its local retry copy. Other pending changes stay queued.')) discardOldestFailedWrite(); }}>Discard failed change</button>}
  </div>;
}
