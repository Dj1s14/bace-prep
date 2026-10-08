import React, { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';
export function PasswordRecovery() {
  const [open, setOpen] = useState(() => window.location.hash.includes('type=recovery') || sessionStorage.getItem('bace_recovery') === 'true');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const client = getSupabase();
    const subscription = client?.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') { sessionStorage.setItem('bace_recovery', 'true'); setOpen(true); }
      if (event === 'SIGNED_OUT') { sessionStorage.removeItem('bace_recovery'); setOpen(false); }
    }).data.subscription;
    return () => subscription?.unsubscribe();
  }, []);
  if (!open) return null;
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setMessage('');
    if (password.length < 12) { setMessage('Use at least 12 characters.'); return; }
    if (password !== confirm) { setMessage('Passwords do not match.'); return; }
    const client = getSupabase(); if (!client) return;
    setBusy(true);
    try {
      const { error } = await client.auth.updateUser({ password });
      if (error) throw error;
      sessionStorage.removeItem('bace_recovery');
      setPassword(''); setConfirm('');
      await client.auth.signOut(); setOpen(false);
    } catch (error: any) { setMessage(error.message); }
    finally { setBusy(false); }
  };
  return <div className="fixed inset-0 z-[100] bg-slate-950/70 flex items-center justify-center p-4"><form onSubmit={submit} className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4" aria-label="Set a new password">
    <h2 className="text-xl font-bold">Set a new password</h2><p className="text-sm text-slate-600">Use at least 12 characters. After saving, sign in with your new password.</p>
    <label className="block text-sm">New password<input autoComplete="new-password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="block w-full border rounded-lg p-3 mt-1" /></label>
    <label className="block text-sm">Confirm password<input autoComplete="new-password" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="block w-full border rounded-lg p-3 mt-1" /></label>
    {message && <p role="alert" className="text-rose-700">{message}</p>}
    <button disabled={busy} className="bg-blue-600 text-white rounded-lg p-3 w-full">{busy ? 'Saving…' : 'Save new password'}</button>
    <button type="button" disabled={busy} onClick={() => { sessionStorage.removeItem('bace_recovery'); setOpen(false); }} className="text-sm underline">Cancel</button>
  </form></div>;
}
