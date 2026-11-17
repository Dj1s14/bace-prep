import React, { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';

/** The Supabase PASSWORD_RECOVERY event must present an actual password update.
 * A recovery link alone is NOT a completed password reset. */
export const PasswordRecoveryDialog: React.FC = () => {
  const [open, setOpen] = useState(() => {
    const url = window.location.href;
    return /(?:[?#&])type=recovery(?:[&#]|$)/.test(url);
  });
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    const { data: { subscription } } = sb.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') setOpen(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!open) return null;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Use at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    const sb = getSupabase();
    if (!sb) { setError('Supabase is unavailable.'); return; }
    setLoading(true);
    try {
      const { data: { user }, error: authError } = await sb.auth.getUser();
      if (authError || !user) throw new Error('Recovery link expired. Request another password reset.');
      const { error: updateError } = await sb.auth.updateUser({ password });
      if (updateError) throw updateError;
      await sb.auth.signOut();
      window.history.replaceState({}, '', window.location.pathname);
      setPassword('');
      setConfirm('');
      setOpen(false);
      window.alert('Password changed. Sign in using your new password.');
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Password reset failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/75 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Set a new password">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white shadow-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Set a new BACE Prep password</h2>
        <p className="text-sm text-slate-600">Your verified recovery link is active. Choose a new password to protect your lesson progress.</p>
        <label className="block text-sm text-slate-800">New password
          <input type="password" autoComplete="new-password" required minLength={8} value={password}
            onChange={e => setPassword(e.target.value)} className="w-full mt-1 border rounded-lg p-2" />
        </label>
        <label className="block text-sm text-slate-800">Confirm new password
          <input type="password" autoComplete="new-password" required minLength={8} value={confirm}
            onChange={e => setConfirm(e.target.value)} className="w-full mt-1 border rounded-lg p-2" />
        </label>
        {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-teal-700 text-white font-semibold p-3 disabled:opacity-50">
          {loading ? 'Updating password…' : 'Set password and return to sign in'}
        </button>
      </form>
    </div>
  );
};
