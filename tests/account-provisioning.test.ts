import test from 'node:test';
import assert from 'node:assert/strict';
import { createProvisionHandler } from '../supabase/functions/provision-account/handler.ts';

const input = { role: 'student', first_name: 'Test', last_name: 'Student', email: 'test@example.edu', password: 'Strong-test-password', class_id: 'class-a' };
const env = { url: 'https://example.supabase.co', serviceKey: 'server-secret' };
function fixture(actorRole = 'admin', options: { owner?: string; profileFails?: boolean; duplicate?: boolean; badToken?: boolean } = {}) {
  const calls: { url: string; init: RequestInit }[] = [];
  const mock = async (url: string | URL | Request, init: RequestInit = {}) => {
    calls.push({ url: String(url), init });
    const path = String(url);
    const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
    if (path.endsWith('/auth/v1/user')) return options.badToken ? json({}, 401) : json({ id: 'actor', user_metadata: { role: 'admin' } });
    if (path.includes('/profiles?') && !init.method) return json([{ role: actorRole }]);
    if (path.includes('/school_classes?')) return json([{ id: 'class-a', teacher_id: options.owner || 'actor' }]);
    if (path.endsWith('/admin/users') && init.method === 'POST') return options.duplicate ? json({ error_code: 'email_exists' }, 422) : json({ id: 'new-user' });
    if (path.includes('/profiles?') && init.method === 'POST') return options.profileFails ? json({}, 500) : new Response(null, { status: 201 });
    if (path.includes('/profiles?') && init.method === 'DELETE') return new Response(null, { status: 204 });
    if (path.endsWith('/admin/users/new-user') && init.method === 'DELETE') return json({});
    throw new Error(`Unexpected request ${path}`);
  };
  const handler = createProvisionHandler(env, mock as typeof fetch);
  const send = (body = input, token = 'valid-token', origin = 'https://baceprep.jisd.link') => handler(new Request('https://example/functions/v1/provision-account', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, Origin: origin }, body: JSON.stringify(body),
  }));
  return { send, calls, handler };
}
test('admin creates an immediately usable teacher login and matching profile without returning secrets', async () => {
  const { send, calls } = fixture();
  const response = await send({ ...input, role: 'teacher' });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { id: 'new-user', email: input.email, role: 'teacher' });
  const auth = JSON.parse(String(calls.find(c => c.url.endsWith('/admin/users'))!.init.body));
  assert.equal(auth.email_confirm, true);
  assert.equal(auth.password, input.password);
  const profile = JSON.parse(String(calls.find(c => c.init.method === 'POST' && c.url.includes('/profiles?'))!.init.body));
  assert.equal(profile.role, 'teacher'); assert.equal(profile.class_id, null);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://baceprep.jisd.link');
});
test('student cannot create accounts even with admin user_metadata', async () => {
  const { send, calls } = fixture('student');
  assert.equal((await send()).status, 403);
  assert.equal(calls.filter(c => c.init.method === 'POST').length, 0);
});
test('teacher can enroll own students but cannot create teachers or use another class', async () => {
  assert.equal((await fixture('teacher').send()).status, 201);
  assert.equal((await fixture('teacher').send({ ...input, role: 'teacher' })).status, 403);
  const denied = fixture('teacher', { owner: 'other-teacher' });
  assert.equal((await denied.send()).status, 403);
  assert.equal(denied.calls.filter(c => c.init.method === 'POST').length, 0);
  assert.equal((await fixture('teacher').send({ ...input, class_id: '' })).status, 400);
});
test('invalid tokens, origins, roles and passwords never reach user creation', async () => {
  assert.equal((await fixture('admin', { badToken: true }).send()).status, 401);
  assert.equal((await fixture().send(input, 'token', 'https://evil.example')).status, 403);
  assert.equal((await fixture().send({ ...input, role: 'admin' })).status, 400);
  assert.equal((await fixture().send({ ...input, password: 'short' })).status, 400);
  const { handler, calls } = fixture();
  assert.equal((await handler(new Request('https://example', { method: 'POST' }))).status, 401);
  assert.equal(calls.length, 0);
});
test('duplicate accounts are not changed and failed profile creation removes only the new login', async () => {
  const duplicate = fixture('admin', { duplicate: true });
  assert.equal((await duplicate.send()).status, 409);
  assert.equal(duplicate.calls.filter(c => c.init.method === 'DELETE').length, 0);
  const failed = fixture('admin', { profileFails: true });
  assert.equal((await failed.send()).status, 500);
  assert.equal(failed.calls.at(-1)!.init.method, 'DELETE');
  assert.equal(failed.calls.at(-2)!.url, `${env.url}/auth/v1/admin/users/new-user`);
  assert.equal(failed.calls.at(-1)!.url, `${env.url}/rest/v1/profiles?id=eq.new-user`);
});
