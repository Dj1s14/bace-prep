import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';

export function ProvisionAccountModal({ accountRole, onClose, onCreated, initialClassId }: {
  accountRole: 'student' | 'teacher'; onClose: () => void; onCreated?: (id: string) => void; initialClassId?: string;
}) {
  const { classes, currentUser, refreshWorkspace } = useApp();
  const availableClasses = classes.filter(c => currentUser?.role === 'admin' || c.teacher_id === currentUser?.id);
  const [classId, setClassId] = useState(initialClassId || availableClasses[0]?.id || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState<{ id: string; email: string } | null>(null);
  const [refreshError, setRefreshError] = useState(false);
  const submitting = useRef(false);
  const canCreate = currentUser?.role === 'admin' || (accountRole === 'student' && currentUser?.role === 'teacher');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || created) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const password = String(fields.get('password') || '');
    if (password !== fields.get('confirm_password')) { setError('Passwords do not match.'); return; }
    const sb = getSupabase();
    if (!sb) { setError('Supabase is unavailable.'); return; }
    submitting.current = true; setBusy(true); setError('');
    try {
      const { data, error: failure } = await sb.functions.invoke('provision-account', { body: {
        role: accountRole, first_name: fields.get('first_name'), last_name: fields.get('last_name'),
        email: fields.get('email'), password, class_id: classId,
        school_name: fields.get('school_name'), prefix: fields.get('prefix'), department: fields.get('department'),
      } });
      if (failure) {
        let message = failure.message;
        try { const response = await failure.context?.json(); message = response?.error || message; } catch { /* network errors have no JSON response */ }
        throw new Error(message);
      }
      if (!data?.id) throw new Error('Account creation did not return a login.');
      form.reset();
      setCreated({ id: data.id, email: data.email });
      try { await refreshWorkspace(); } catch { setRefreshError(true); }
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Account creation failed.'); }
    finally { submitting.current = false; setBusy(false); }
  };
  const finish = () => { if (created) onCreated?.(created.id); onClose(); };
  const fieldClass = 'w-full rounded-lg border border-slate-300 px-3 py-2 mt-1 text-sm';
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
    <section role="dialog" aria-modal="true" aria-labelledby="provision-title" className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
      <h2 id="provision-title" className="text-lg font-bold text-slate-900">Create {accountRole} account</h2>
      {!canCreate ? <><p className="my-4">Administrator access is required to create teachers. Faculty can create students in their own classes.</p><button onClick={onClose}>Close</button></> : created ? <div className="space-y-4 mt-4">
        <p role="status">Account created for <strong>{created.email}</strong>. They can sign in immediately without email verification.</p>
        <p className="text-sm text-slate-600">Share the email and initial password privately. They can change their password through password recovery.</p>
        {refreshError && <p role="alert">Account creation succeeded, but the roster could not refresh. Reload the page to see it.</p>}
        <button onClick={finish} className="rounded-lg bg-teal-700 text-white px-4 py-2">Done</button>
      </div> : <form onSubmit={submit} className="space-y-4 mt-4">
        <p className="text-sm text-slate-600">Create a login with an initial password. No confirmation email is required.</p>
        <fieldset disabled={busy} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">First name<input name="first_name" required maxLength={100} autoComplete="off" className={fieldClass}/></label>
            <label className="text-sm">Last name<input name="last_name" required maxLength={100} autoComplete="off" className={fieldClass}/></label>
          </div>
          <label className="block text-sm">Email<input name="email" type="email" required maxLength={254} autoComplete="off" className={fieldClass}/></label>
          <label className="block text-sm">Initial password<input name="password" type="password" required minLength={8} maxLength={128} autoComplete="new-password" className={fieldClass}/></label>
          <label className="block text-sm">Confirm password<input name="confirm_password" type="password" required minLength={8} maxLength={128} autoComplete="new-password" className={fieldClass}/></label>
          {accountRole === 'student' && <label className="block text-sm">Class<select value={classId} onChange={e => setClassId(e.target.value)} required={currentUser?.role === 'teacher'} className={fieldClass}>
            <option value="">Unassigned</option>{availableClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select></label>}
          <label className="block text-sm">School / institution<input name="school_name" maxLength={200} className={fieldClass}/></label>
          {accountRole === 'teacher' && <div className="grid grid-cols-2 gap-3"><label className="text-sm">Prefix<input name="prefix" placeholder="Mr., Ms., Dr." maxLength={30} className={fieldClass}/></label><label className="text-sm">Department<input name="department" maxLength={200} className={fieldClass}/></label></div>}
        </fieldset>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3"><button type="button" disabled={busy} onClick={onClose} className="px-4 py-2">Cancel</button><button type="submit" disabled={busy} className="rounded-lg bg-teal-700 text-white px-4 py-2 disabled:opacity-50">{busy ? 'Creating…' : 'Create account'}</button></div>
      </form>}
    </section>
  </div>;
}
