import React, { useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import { useApp } from '../../context/AppContext';

export function AdminPasswordResetModal({ account, onClose }: { account: { id: string; email: string; name: string }; onClose: () => void }) {
  const { currentUser, isProduction } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (busy || saved) return;
    const form = event.currentTarget, fields = new FormData(form);
    const password = String(fields.get('password') || '');
    if (password.length < 8 || password.length > 128) { setError('Enter a new password between 8 and 128 characters.'); return; }
    if (password !== fields.get('confirm_password')) { setError('Passwords do not match.'); return; }
    if (!isProduction) { setError('Sign in to the live Admin Portal to reset real passwords.'); return; }
    const sb = getSupabase(); if (!sb) { setError('Supabase is unavailable.'); return; }
    setBusy(true); setError('');
    try {
      const { data: session, error: sessionError } = await sb.auth.getSession();
      if (sessionError || !session.session) throw new Error('Your session expired. Sign in again.');
      const { data, error: failure } = await sb.functions.invoke('admin-reset-password', {
        headers: { Authorization: `Bearer ${session.session.access_token}` }, timeout: 30000,
        body: { user_id: account.id, password },
      });
      if (failure) {
        let message = failure.message;
        try { const body = await failure.context?.json(); message = body?.error || body?.message || message; } catch {}
        throw new Error(message);
      }
      if (!data?.success) throw new Error('The password change could not be confirmed.');
      form.reset(); setSaved(true);
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Password reset failed.'); }
    finally { setBusy(false); }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"><section role="dialog" aria-modal="true" aria-labelledby="password-reset-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
    <h2 id="password-reset-title" className="text-lg font-bold">Reset password</h2>
    <p className="mt-2 text-sm"><strong>{account.name}</strong><br/>{account.email}</p>
    {currentUser?.role !== 'admin' ? <p className="my-4">Administrator access required.</p> : saved ? <div className="mt-4 space-y-3"><p role="status">Password reset successfully. Share the new password privately. They can sign in immediately and use Forgot password to change it.</p><button onClick={onClose} className="bg-teal-700 text-white px-4 py-2 rounded-lg">Done</button></div> : <form noValidate onSubmit={submit} className="mt-4 space-y-4">
      <p className="text-sm text-slate-600">This replaces their current password. You do not need their old password.</p>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <fieldset disabled={busy} className="space-y-3"><label className="block text-sm">New password (at least 8 characters)<input name="password" type="password" autoComplete="new-password" maxLength={128} className="w-full rounded-lg border p-2 mt-1"/></label><label className="block text-sm">Confirm new password<input name="confirm_password" type="password" autoComplete="new-password" maxLength={128} className="w-full rounded-lg border p-2 mt-1"/></label></fieldset>
      <div className="flex justify-end gap-3"><button type="button" disabled={busy} onClick={onClose}>Cancel</button><button disabled={busy} className="bg-teal-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">{busy ? 'Resetting…' : 'Reset password'}</button></div>
    </form>}
    {currentUser?.role !== 'admin' && <button onClick={onClose}>Close</button>}
  </section></div>;
}
