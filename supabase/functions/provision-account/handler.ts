type Environment = { url: string; serviceKey: string };

const allowedOrigins = new Set(['https://baceprep.jisd.link', 'https://dj1s14.github.io']);

/** Authentication is checked against Auth, and authorization against the live profile. */
export function createProvisionHandler(env: Environment, request: typeof fetch = fetch) {
  return async (req: Request): Promise<Response> => {
    const origin = req.headers.get('Origin');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json', 'Cache-Control': 'no-store', Vary: 'Origin',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };
    if (origin && allowedOrigins.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
    const reply = (status: number, data: unknown) => new Response(JSON.stringify(data), { status, headers });
    if (origin && !allowedOrigins.has(origin)) return reply(403, { error: 'Website origin is not allowed.' });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (req.method !== 'POST') return reply(405, { error: 'Use POST.' });
    const authorization = req.headers.get('Authorization') || '';
    if (!/^Bearer\s+\S+$/i.test(authorization)) return reply(401, { error: 'Sign in to create an account.' });
    if (!env.url || !env.serviceKey) return reply(503, { error: 'Account provisioning is not configured.' });
    const adminHeaders = { apikey: env.serviceKey, Authorization: `Bearer ${env.serviceKey}`, 'Content-Type': 'application/json' };
    let createdId: string | undefined;
    try {
      const identity = await request(`${env.url}/auth/v1/user`, { headers: { apikey: env.serviceKey, Authorization: authorization } });
      if (!identity.ok) return reply(401, { error: 'Your session expired. Sign in again.' });
      const actor = await identity.json();
      if (!actor.id || actor.is_anonymous) return reply(403, { error: 'Faculty access required.' });
      const lookup = await request(`${env.url}/rest/v1/profiles?id=eq.${encodeURIComponent(actor.id)}&select=role`, { headers: adminHeaders });
      if (!lookup.ok) throw new Error('Profile lookup failed');
      const [profile] = await lookup.json();
      if (!['admin', 'teacher'].includes(profile?.role)) return reply(403, { error: 'Faculty access required.' });
      const raw = await req.text();
      if (raw.length > 8192) return reply(413, { error: 'Account details are too large.' });
      let data: Record<string, unknown>;
      try { data = JSON.parse(raw); } catch { return reply(400, { error: 'Invalid account details.' }); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { error: 'Invalid account details.' });
      const text = (key: string) => typeof data[key] === 'string' ? (data[key] as string).trim() : '';
      const role = text('role');
      if (!['student', 'teacher'].includes(role)) return reply(400, { error: 'Choose student or teacher.' });
      if (role === 'teacher' && profile.role !== 'admin') return reply(403, { error: 'Only administrators can create teachers.' });
      const first_name = text('first_name'), last_name = text('last_name'), email = text('email').toLowerCase();
      const password = typeof data.password === 'string' ? data.password : '';
      if (!first_name || !last_name || first_name.length > 100 || last_name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return reply(400, { error: 'Enter a valid name and email address.' });
      }
      if (password.length < 8 || password.length > 128) return reply(400, { error: 'Use a password between 8 and 128 characters.' });
      const class_id = role === 'student' ? text('class_id') : '';
      if (profile.role === 'teacher' && !class_id) return reply(400, { error: 'Choose one of your classes.' });
      if (class_id) {
        const classes = await request(`${env.url}/rest/v1/school_classes?id=eq.${encodeURIComponent(class_id)}&select=id,teacher_id`, { headers: adminHeaders });
        if (!classes.ok) throw new Error('Class lookup failed');
        const [schoolClass] = await classes.json();
        if (!schoolClass || (profile.role === 'teacher' && schoolClass.teacher_id !== actor.id)) return reply(403, { error: 'Choose a class you manage.' });
      }
      const details = { first_name, last_name, school_name: text('school_name').slice(0, 200) || null,
        prefix: role === 'teacher' ? text('prefix').slice(0, 30) || null : null,
        department: role === 'teacher' ? text('department').slice(0, 200) || null : null };
      const created = await request(`${env.url}/auth/v1/admin/users`, {
        method: 'POST', headers: adminHeaders,
        body: JSON.stringify({ email, password, email_confirm: true, user_metadata: details }),
      });
      const authUser = await created.json();
      if (!created.ok) {
        if (authUser.error_code === 'weak_password') return reply(400, { error: 'Choose a stronger password.' });
        if (['email_exists', 'user_already_exists'].includes(authUser.error_code)) return reply(409, { error: 'This email is already registered. Use a different email or manage the existing account.' });
        return reply(400, { error: 'Supabase could not create this login. Check the email and password, then try again.' });
      }
      createdId = authUser.id || authUser.user?.id;
      if (!createdId) throw new Error('Missing created user');
      const saved = await request(`${env.url}/rest/v1/profiles?on_conflict=id`, {
        method: 'POST', headers: { ...adminHeaders, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ id: createdId, email, role, class_id: class_id || null, ...details }),
      });
      if (!saved.ok) throw new Error('Profile creation failed');
      return reply(201, { id: createdId, email, role });
    } catch {
      if (createdId) {
        // A failed profile must not leave a usable orphan login. Never remove existing users.
        try {
          const removed = await request(`${env.url}/auth/v1/admin/users/${encodeURIComponent(createdId)}`, { method: 'DELETE', headers: adminHeaders });
          if (!removed.ok) return reply(500, { error: 'Login was created but profile setup failed. Ask an administrator to repair the account before retrying.' });
          const removedProfile = await request(`${env.url}/rest/v1/profiles?id=eq.${encodeURIComponent(createdId)}`, { method: 'DELETE', headers: adminHeaders });
          if (!removedProfile.ok) return reply(500, { error: 'Login was removed, but an incomplete roster entry remains. Ask an administrator to remove it before retrying.' });
        } catch { return reply(500, { error: 'Login was created but profile setup failed. Ask an administrator to repair the account before retrying.' }); }
      }
      return reply(500, { error: 'Account creation failed. Please try again.' });
    }
  };
}
