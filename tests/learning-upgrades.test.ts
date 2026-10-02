import test from 'node:test';
import assert from 'node:assert/strict';
import { remainingSeconds, readExamDraft, examDraftKey } from '../src/lib/examDraft.ts';
import { saveWrite, retrySaves, setSaveOwner, getSaveState } from '../src/lib/saveQueue.ts';
const storage = new Map<string,string>();
Object.defineProperty(globalThis,'localStorage',{ value:{getItem:(key:string)=>storage.get(key)||null,setItem:(key:string,value:string)=>storage.set(key,value),removeItem:(key:string)=>storage.delete(key)} });

test('exam clock does not reset after time away and never becomes negative',()=>{
  assert.equal(remainingSeconds(10000,2500),8);
  assert.equal(remainingSeconds(10000,11000),0);
});
test('resume isolates accounts and rejects corrupt question positions',()=>{
  const draft={version:1,owner:'a',config:{quizType:'mock_quick'},questionIds:['q1'],currentIndex:0,selectedChoices:{q1:'c1'},flaggedQuestions:{},deadline:10000,startedAt:new Date().toISOString(),attemptId:'attempt1'};
  storage.set(examDraftKey('a','production'),JSON.stringify(draft));
  assert.equal(readExamDraft('a','production')?.selectedChoices.q1,'c1');
  assert.equal(readExamDraft('b','production'),null);
  storage.set(examDraftKey('a','production'),JSON.stringify({...draft,currentIndex:5}));
  assert.equal(readExamDraft('a','production'),null);
});
test('offline writes remain pending and replay in order under their original owner',async()=>{
  let offline=true; const writes:string[]=[];
  const client:any={auth:{getSession:async()=>({data:{session:{user:{id:'student-a'}}}})},from:(table:string)=>({upsert:async(row:any)=>{if(offline)return {error:{message:'offline'}};writes.push(table+':'+row.id);return{error:null};}})};
  setSaveOwner('student-a');
  await assert.rejects(saveWrite(client,{table:'quiz_attempts',action:'insert',row:{id:'attempt1'}}));
  await assert.rejects(saveWrite(client,{table:'activity_sessions',action:'insert',row:{id:'activity1'}}));
  assert.equal(getSaveState().pending,2);
  assert.match(storage.get('bace_pending_writes:student-a')!,/attempt1/);
  setSaveOwner('student-b'); assert.equal(getSaveState().pending,0);
  setSaveOwner('student-a'); assert.equal(getSaveState().pending,2);
  offline=false; await retrySaves(client);
  assert.deepEqual(writes,['quiz_attempts:attempt1','activity_sessions:activity1']);
  assert.equal(getSaveState().pending,0);
  await retrySaves(client);assert.equal(writes.length,2);
});
test('expired sessions do not send queued work under a different user',async()=>{
  let calls=0;setSaveOwner('student-c');
  const client:any={auth:{getSession:async()=>({data:{session:{user:{id:'student-d'}}}})},from:()=>{calls++;}};
  await assert.rejects(saveWrite(client,{table:'lesson_progress',action:'upsert',row:{id:'lp1'}}));
  assert.equal(calls,0);assert.equal(getSaveState().pending,1);
});

test('faculty preview cleanup removes test assessments while retaining classroom changes',async()=>{
 const { discardFacultyPreviewWrites } = await import('../src/lib/saveQueue.ts');
 const owner='faculty-test';
 storage.set(`bace_pending_writes:${owner}`,JSON.stringify([
  {table:'activity_sessions',action:'insert',row:{student_id:'preview-student'},owner,key:'preview'},
  {table:'school_classes',action:'update',row:{name:'Updated class'},owner,key:'class'}
 ]));
 setSaveOwner(owner);discardFacultyPreviewWrites();
 assert.equal(getSaveState().pending,1);
 const retained=JSON.parse(storage.get(`bace_pending_writes:${owner}`)!);
 assert.equal(retained[0].table,'school_classes');
});
