import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';

export function AssignClassTeacherModal({ initialTeacherId = '', initialClassId = '', onClose }: {
  initialTeacherId?: string; initialClassId?: string; onClose: () => void;
}) {
  const { teachers, classes, currentUser, refreshWorkspace, isProduction } = useApp();
  const [teacherId, setTeacherId] = useState(initialTeacherId);
  const [classId, setClassId] = useState(initialClassId);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy || saved) return;
    if (!teacherId || !classId) { setMessage('Select a teacher and a class.'); return; }
    if (!isProduction) { setMessage('Sign in to the live Admin Portal to save class assignments.'); return; }
    const sb = getSupabase();
    if (!sb) { setMessage('Supabase is unavailable.'); return; }
    setBusy(true); setMessage('');
    try {
      const { error } = await sb.rpc('admin_assign_class_teacher', { class_id_input: classId, teacher_id_input: teacherId });
      if (error) throw error;
      setSaved(true);
      try { await refreshWorkspace(); setMessage('Class assigned. The teacher now has access to its roster and assignments.'); }
      catch { setMessage('Class assignment was saved. Reload the page to refresh the directory.'); }
    } catch (error) { setMessage(error instanceof Error ? error.message : (error as any)?.message || 'Class assignment failed.'); }
    finally { setBusy(false); }
  };
  const selectedClass = classes.find(c => c.id === classId);
  const owner = teachers.find(t => t.id === selectedClass?.teacher_id);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="assign-class-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
      <h2 id="assign-class-title" className="font-bold text-lg">Assign class to teacher</h2>
      {currentUser?.role !== 'admin' ? <p className="my-4">Administrator access is required.</p> : <form onSubmit={submit} className="space-y-4 mt-4">
        <fieldset disabled={busy || saved} className="space-y-4">
          <label className="block text-sm">Teacher<select required value={teacherId} onChange={e => setTeacherId(e.target.value)} className="w-full border rounded-lg p-2 mt-1"><option value="">Select teacher…</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name} ({t.email})</option>)}</select></label>
          <label className="block text-sm">Class<select required value={classId} onChange={e => setClassId(e.target.value)} className="w-full border rounded-lg p-2 mt-1"><option value="">Select class…</option>{classes.map(c => <option key={c.id} value={c.id}>{c.name} — {c.period || 'No period'}</option>)}</select></label>
        </fieldset>
        {selectedClass && !saved && <p className="text-sm text-slate-600">Current instructor: {owner ? `${owner.first_name} ${owner.last_name}` : 'Unassigned'}. Saving transfers this class and its existing assignments to the selected teacher. Students stay enrolled.</p>}
        {message && <p role="status" className="text-sm font-medium">{message}</p>}
        <div className="flex justify-end gap-3"><button type="button" disabled={busy} onClick={onClose} className="px-4 py-2">{saved ? 'Done' : 'Cancel'}</button>{!saved && <button disabled={busy || !teachers.length || !classes.length} className="bg-teal-700 rounded-lg px-4 py-2 text-white disabled:opacity-50">{busy ? 'Saving…' : 'Save assignment'}</button>}</div>
        {!teachers.length && <p className="text-sm">Create a teacher account first.</p>}{!classes.length && <p className="text-sm">Create a class first.</p>}
      </form>}
      {currentUser?.role !== 'admin' && <button onClick={onClose}>Close</button>}
    </section>
  </div>;
}
