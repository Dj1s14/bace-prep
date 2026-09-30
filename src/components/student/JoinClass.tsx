import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getSupabase } from '../../lib/supabase';
export function JoinClass() {
  const { currentStudent, isProduction, refreshWorkspace } = useApp();
  const [code,setCode] = useState(''); const [busy,setBusy] = useState(false); const [message,setMessage] = useState('');
  if (!isProduction || currentStudent.class_id) return null;
  return <form className="bg-blue-50 border rounded-xl p-5 space-y-3" onSubmit={async event => {
    event.preventDefault(); setBusy(true); setMessage('');
    try { const client = getSupabase(); if (!client) throw new Error('Sign in first.');
      const { error } = await client.rpc('join_class_by_code', { join_code_input: code.trim().toUpperCase() });
      if (error) throw error; await refreshWorkspace(); setMessage('Class joined successfully.');
    } catch(error: any) { setMessage(error.message); } finally { setBusy(false); }
  }}><h2 className="font-bold">Join your class</h2><p className="text-sm">Ask your teacher for the current join code.</p><label className="text-sm">Class join code<input required maxLength={64} value={code} onChange={e=>setCode(e.target.value)} className="border rounded-lg p-2 ml-2" /></label><button disabled={busy} className="bg-blue-600 text-white rounded-lg px-4 py-2 ml-2">{busy ? 'Joining…' : 'Join class'}</button>{message && <p role="status">{message}</p>}</form>;
}
