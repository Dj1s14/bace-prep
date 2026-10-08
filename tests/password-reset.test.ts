import test from 'node:test';
import assert from 'node:assert/strict';
import { createPasswordResetHandler } from '../supabase/functions/admin-reset-password/handler.ts';
const id = '00000000-0000-4000-8000-000000000002';
const input = { user_id: id, password: 'New-test-password-42!' };
function fixture(role = 'admin', target = 'student', failed = false) {
  const calls: {url:string;init:RequestInit}[] = [];
  const mock = async (url:unknown, init:RequestInit = {}) => {
    const path = String(url); calls.push({url:path,init});
    let body:unknown = {};
    if(path.endsWith('/auth/v1/user')) body = {id:'actor',user_metadata:{role:'admin'}};
    else if(path.includes('select=role')) body = [{role}];
    else if(path.includes('select=id,email,role')) body = target === 'missing' ? [] : [{id,email:'test@example.edu',role:target}];
    else if(init.method !== 'PUT') throw new Error('Unexpected call');
    return new Response(JSON.stringify(body),{status:init.method === 'PUT' && failed ? 422 : 200});
  };
  const handler = createPasswordResetHandler({url:'https://example.supabase.co',serviceKey:'server-secret'},mock as typeof fetch);
  const send = (body = input, origin = 'https://baceprep.jisd.link') => handler(new Request('https://example',{method:'POST',headers:{Authorization:'Bearer token',Origin:origin},body:JSON.stringify(body)}));
  return {calls,send,handler};
}
test('admin resets student and teacher passwords without returning credentials or mutating profiles',async()=>{
  for(const role of ['student','teacher']) {
    const f=fixture('admin',role); const response=await f.send();
    assert.equal(response.status,200);
    assert.deepEqual(await response.json(),{success:true,id,email:'test@example.edu'});
    const writes=f.calls.filter(c=>c.init.method);
    assert.equal(writes.length,1); assert.equal(writes[0].init.method,'PUT');
    assert.ok(writes[0].url.endsWith('/auth/v1/admin/users/'+id));
    assert.deepEqual(JSON.parse(String(writes[0].init.body)),{password:input.password});
  }
});
test('live database role controls access despite spoofed admin metadata',async()=>{
  for(const role of ['student','teacher']) {
    const f=fixture(role); assert.equal((await f.send()).status,403);
    assert.equal(f.calls.filter(c=>c.init.method).length,0);
  }
});
test('invalid requests and protected or absent targets cannot change passwords',async()=>{
  for(const [target,status] of [['admin',403],['missing',404]] as const) {
    const f=fixture('admin',target); assert.equal((await f.send()).status,status);
    assert.equal(f.calls.filter(c=>c.init.method).length,0);
  }
  assert.equal((await fixture().send({...input,password:'short'})).status,400);
  assert.equal((await fixture().send({...input,user_id:'invalid'})).status,400);
  assert.equal((await fixture().send(input,'https://evil.example')).status,403);
  assert.equal((await fixture().handler(new Request('https://example',{method:'POST'}))).status,401);
  assert.equal((await fixture('admin','student',true).send()).status,400);
});
