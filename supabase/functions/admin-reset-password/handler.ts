export function createPasswordResetHandler(env: { url: string; serviceKey: string }, request: typeof fetch = fetch) {
  return async (req: Request): Promise<Response> => {
    const origin = req.headers.get('Origin');
    const origins = ['https://baceprep.jisd.link', 'https://dj1s14.github.io'];
    const headers: Record<string, string> = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', Vary: 'Origin',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
    if (origin && origins.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
    const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers });
    if (origin && !origins.includes(origin)) return reply(403, { error: 'Website origin is not allowed.' });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (req.method !== 'POST') return reply(405, { error: 'Use POST.' });
    const authorization = req.headers.get('Authorization') || '';
    if (!/^Bearer\s+\S+$/i.test(authorization)) return reply(401, { error: 'Sign in as an administrator.' });
    if (!env.url || !env.serviceKey) return reply(503, { error: 'Password reset is not configured.' });
    const adminHeaders = { apikey: env.serviceKey, Authorization: `Bearer ${env.serviceKey}`, 'Content-Type': 'application/json' };
    try {
      const identity = await request(`${env.url}/auth/v1/user`, { headers: { apikey: env.serviceKey, Authorization: authorization } });
      if (!identity.ok) return reply(401, { error: 'Your session expired. Sign in again.' });
      const actor = await identity.json();
      if (!actor.id || actor.is_anonymous) return reply(403, { error: 'Administrator access required.' });
      const profileResponse = await request(`${env.url}/rest/v1/profiles?id=eq.${encodeURIComponent(actor.id)}&select=role`, { headers: adminHeaders });
      if (!profileResponse.ok) throw new Error('Profile lookup failed');
      const [profile] = await profileResponse.json();
      if (profile?.role !== 'admin') return reply(403, { error: 'Only administrators can reset passwords.' });
      const raw = await req.text();
      if (raw.length > 2048) return reply(413, { error: 'Request is too large.' });
      let body;
      try { body = JSON.parse(raw); } catch { return reply(400, { error: 'Invalid reset request.' }); }
      const id = typeof body?.user_id === 'string' ? body.user_id : '';
      const password = typeof body?.password === 'string' ? body.password : '';
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return reply(400, { error: 'Choose a valid account.' });
      if (password.length < 8 || password.length > 128) return reply(400, { error: 'Use a password between 8 and 128 characters.' });
      const targetResponse = await request(`${env.url}/rest/v1/profiles?id=eq.${encodeURIComponent(id)}&select=id,email,role`, { headers: adminHeaders });
      if (!targetResponse.ok) throw new Error('Target lookup failed');
      const [target] = await targetResponse.json();
      if (!target) return reply(404, { error: 'Account not found.' });
      if (!['student', 'teacher'].includes(target.role)) return reply(403, { error: 'This tool resets student and teacher passwords only.' });
      const updated = await request(`${env.url}/auth/v1/admin/users/${id}`, { method: 'PUT', headers: adminHeaders, body: JSON.stringify({ password }) });
      if (!updated.ok) {
        if (updated.status === 404) return reply(404, { error: 'This roster entry has no Supabase login.' });
        return reply(400, { error: 'Supabase rejected the new password. Choose a different, stronger password.' });
      }
      // Never return Auth's full user response or the submitted password.
      return reply(200, { success: true, id, email: target.email });
    } catch { return reply(500, { error: 'The reset could not be confirmed. Try signing in with the new password before retrying.' }); }
  };
}
