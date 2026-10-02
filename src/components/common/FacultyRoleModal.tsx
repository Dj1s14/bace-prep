import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';
import type { TeacherProfile } from '../../types/database';
export function FacultyRoleModal({account,onClose}:{account:TeacherProfile;onClose:()=>void}) {
  const {currentUser,isProduction,refreshWorkspace}=useApp();
  const [busy,setBusy]=useState(false);const [saved,setSaved]=useState(false);const [message,setMessage]=useState('');
  const nextRole=account.role === 'admin' ? 'teacher' : 'admin';
  const save=async()=>{
    if(busy || saved) return;
    if(!isProduction || currentUser?.role !== 'admin') {setMessage('Sign in as an administrator to change access.');return;}
    if(account.id===currentUser.id) {setMessage('Your account already has both workspaces. Another admin must change your admin access.');return;}
    setBusy(true);setMessage('');
    try {
      const sb=getSupabase();if(!sb)throw new Error('Supabase is unavailable.');
      const {error}=await sb.rpc('admin_set_faculty_role',{profile_id_input:account.id,role_input:nextRole,expected_role_input:account.role || 'teacher'});
      if(error)throw error;setSaved(true);
      try {await refreshWorkspace();setMessage('Access updated. Ask them to refresh the website or sign in again. Their classes remain assigned.');}
      catch {setMessage('Access saved. Reload the page to refresh the directory.');}
    } catch(error:any) {setMessage(error.message || 'Access could not be updated.');}finally{setBusy(false);}
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"><section role="dialog" aria-modal="true" aria-labelledby="faculty-role-title" className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4">
    <h2 id="faculty-role-title" className="font-bold text-lg">{nextRole==='admin'?'Grant admin access':'Remove admin access'}</h2>
    <p>{account.first_name} {account.last_name}<br/>{account.email}</p>
    <p className="text-sm text-slate-600">{nextRole==='admin'?'They will have full admin access, including managing accounts, passwords, classes, and faculty access. They will also keep their teacher workspace.':'They will keep their teacher workspace and assigned classes. Admin tools will no longer be available.'}</p>
    {message && <p role="status" className="text-sm font-medium">{message}</p>}
    <div className="flex justify-end gap-3"><button disabled={busy} onClick={onClose}>{saved?'Done':'Cancel'}</button>{!saved && <button disabled={busy} onClick={save} className="bg-indigo-700 text-white rounded-lg px-4 py-2 disabled:opacity-50">{busy?'Saving…':nextRole==='admin'?'Grant admin access':'Remove admin access'}</button>}</div>
  </section></div>;
}
