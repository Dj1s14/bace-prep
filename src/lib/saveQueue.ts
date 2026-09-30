import { SupabaseClient } from '@supabase/supabase-js';
export type Write = { table: string; action: 'insert'|'upsert'|'update'|'delete'|'rpc'; row?: any; id?: string; conflict?: string };
type Pending = Write & { key: string; owner: string };
let queue: Pending[] = [];
let state = { pending: 0, saving: false, error: '', savedAt: '' };
let activeOwner = '';
let chain: Promise<void> = Promise.resolve();
const listeners = new Set<() => void>();
export const subscribeSaves = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const getSaveState = () => state;
function publish(updates: Partial<typeof state>) { state = { ...state, ...updates, pending: queue.length }; listeners.forEach(fn => fn()); }
function persist() { try { localStorage.setItem(`bace_pending_writes:${activeOwner}`, JSON.stringify(queue)); } catch { publish({ error: 'This browser cannot retain unsaved work. Keep this page open and retry.' }); } }
export function setSaveOwner(owner: string) {
  if (owner === activeOwner) return;
  activeOwner = owner;
  try { queue = owner ? JSON.parse(localStorage.getItem(`bace_pending_writes:${owner}`) || '[]') : []; } catch { queue = []; }
  publish({ saving: false, error: queue.length ? 'Unsaved work is waiting. Retry to sync this account.' : '', savedAt: '' });
}
async function perform(client: SupabaseClient, write: Write) {
  let query: any = write.action === 'rpc' ? client.rpc(write.table, write.row) : client.from(write.table);
  if (write.action === 'insert') query = query.upsert(write.row, { onConflict: 'id', ignoreDuplicates: true });
  if (write.action === 'upsert') query = query.upsert(write.row, { onConflict: write.conflict || 'id' });
  if (write.action === 'update') query = query.update(write.row).eq('id', write.id).select('id');
  if (write.action === 'delete') query = query.delete().eq('id', write.id).select('id');
  const { data, error } = await query;
  if (error) throw error;
  if (write.action === 'update' && !data?.length) throw new Error('Update was not authorized or the record no longer exists.');
}
export function saveWrite(client: SupabaseClient, write: Write): Promise<void> {
  const owner = activeOwner;
  if (!owner) return Promise.reject(new Error('Sign in before saving work.'));
  const job: Pending = { ...write, owner, key: crypto.randomUUID() };
  queue.push(job); persist(); publish({ saving: true, error: '' });
  const task = chain.then(async () => {
    if (owner !== activeOwner) throw new Error('Account changed; work remains saved for the original account.');
    const { data } = await client.auth.getSession();
    if (data.session?.user.id !== owner) throw new Error('Your session has expired. Sign in and retry.');
    // Preserve write order: never send a later change while an earlier change is pending.
    for (const item of [...queue]) {
      if (activeOwner !== owner) throw new Error('Account changed.');
      await perform(client, item);
      if (activeOwner !== owner) throw new Error('Account changed.');
      queue = queue.filter(x => x.key !== item.key); persist();
    }
    publish({ saving: false, error: '', savedAt: new Date().toLocaleTimeString() });
  }).catch(err => { if (activeOwner === owner) publish({ saving: false, error: err.message || 'Save failed. Retry when connected.' }); throw err; });
  chain = task.catch(() => {});
  return task;
}
export async function retrySaves(client: SupabaseClient) {
  const owner = activeOwner;
  const task = chain.then(async () => {
    const { data } = await client.auth.getSession();
    if (!owner || data.session?.user.id !== owner) throw new Error('Sign in to the original account to retry.');
    publish({ saving: true, error: '' });
    for (const item of [...queue]) {
      if (activeOwner !== owner) throw new Error('Account changed.');
      await perform(client, item);
      if (activeOwner !== owner) throw new Error('Account changed.');
      queue = queue.filter(x => x.key !== item.key); persist();
    }
    publish({ saving: false, error: '', savedAt: new Date().toLocaleTimeString() });
  }).catch(err => { if (activeOwner === owner) publish({ saving: false, error: err.message }); });
  chain = task;
  await task;
}

export function discardOldestFailedWrite() {
  if (state.saving || !state.error || !queue.length) return;
  queue = queue.slice(1); persist(); publish({error:queue.length ? 'Retry the remaining changes.' : '', savedAt:''});
}
