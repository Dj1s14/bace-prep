import test from 'node:test';
import assert from 'node:assert/strict';
import { captureTestReview, ownCompletedTests, reviewStatus } from '../src/lib/completedTests';
import { ALL_QUESTIONS } from '../src/data/questions';
import { cloudInsertQuizAttempt } from '../src/lib/cloudData';
import { setSaveOwner } from '../src/lib/saveQueue';
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

test('completed reviews preserve original wording, choice IDs and unanswered questions', () => {
 const q = structuredClone(ALL_QUESTIONS[0]);
 const answer = q.choices.find(c=>c.is_correct)!;
 const wrong = q.choices.find(c=>!c.is_correct)!;
 const correct = captureTestReview([q],{[q.id]:answer.id});
 assert.equal(reviewStatus(correct[0]),'Correct');
 assert.equal(reviewStatus(captureTestReview([q],{[q.id]:wrong.id})[0]),'Incorrect');
 assert.equal(reviewStatus(captureTestReview([q],{})[0]),'Unanswered');
 assert.equal(reviewStatus(captureTestReview([q],{[q.id]:'invalid-choice'})[0]),'Unanswered');
 const original = correct[0].question.question_text;
 q.question_text='Changed curriculum';q.choices[0].choice_text='Changed option';
 assert.equal(correct[0].question.question_text,original);
 assert.notEqual(correct[0].question.choices[0].choice_text,q.choices[0].choice_text);
});

test('completed history excludes other accounts and incomplete records, newest first',()=>{
 const attempts:any[]=[{id:'old',student_id:'own',completed_at:'2026-10-01T12:00:00Z'},{id:'new',student_id:'own',completed_at:'2026-10-07T12:00:00Z'},{id:'other',student_id:'other',completed_at:'2026-10-08T12:00:00Z'},{id:'draft',student_id:'own'}];
 assert.deepEqual(ownCompletedTests(attempts,'own').map(a=>a.id),['new','old']);
 assert.deepEqual(ownCompletedTests(attempts,''),[]);
});

test('cloud submission retains the complete review snapshot in the attempt write',async()=>{
 const values=new Map<string,string>();
 (globalThis as any).localStorage={getItem:(k:string)=>values.get(k)||null,setItem:(k:string,v:string)=>values.set(k,v)};
 setSaveOwner('review-test-owner');
 let payload:any;
 const client:any={auth:{getSession:async()=>({data:{session:{user:{id:'review-test-owner'}}}})},from:(table:string)=>({upsert:async(row:any)=>{assert.equal(table,'quiz_attempts');payload=row;return {error:null};}})};
 const review=captureTestReview([ALL_QUESTIONS[0]],{});
 await cloudInsertQuizAttempt(client,{id:'review-attempt',student_id:'review-test-owner',quiz_type:'mock_quick',score:0,total_questions:1,percentage:0,started_at:'2026-10-07T12:00:00Z',completed_at:'2026-10-07T12:01:00Z',time_spent_seconds:60,review_questions:review});
 assert.deepEqual(payload.review_questions,review);
 assert.equal(payload.student_id,'review-test-owner');
 setSaveOwner('');
});

test('answer review renders correct, incorrect, unanswered and legacy-only score states',async()=>{
 const directory=mkdtempSync(join(tmpdir(),'bace-completed-tests-'));const output=join(directory,'render.cjs');
 try {
  const result=await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
   import React from 'react';import {renderToString} from 'react-dom/server';import assert from 'node:assert/strict';
   import {TestAnswerReview} from './src/components/student/CompletedTests';
   const question={id:'q',question_text:'Which answer?',explanation:'Explanation from the original test.',choices:[{id:'yes',choice_text:'The correct answer',is_correct:true},{id:'no',choice_text:'The selected wrong answer',is_correct:false}]};
   const attempt={id:'attempt',score:1,total_questions:3,percentage:33,review_questions:[{question,selected_choice_id:'yes'},{question:{...question,id:'q2'},selected_choice_id:'no'},{question:{...question,id:'q3'},selected_choice_id:null}]};
   const html=renderToString(<TestAnswerReview attempt={attempt}/>);
   for(const text of ['Your answer:','Correct answer:','The selected wrong answer','Not answered','Explanation from the original test.','Missed &amp; unanswered']) assert.ok(html.includes(text),text);
   const legacy=renderToString(<TestAnswerReview attempt={{...attempt,review_questions:null}}/>);
   assert.ok(legacy.includes('Only the score was saved'));
   assert.ok(!legacy.includes('Which answer?'));
  `},bundle:true,platform:'node',format:'cjs',packages:'external',write:false,define:{'import.meta.env':'{}'}});
  writeFileSync(output,result.outputFiles[0].contents);
  execFileSync(process.execPath,[output],{env:{...process.env,NODE_PATH:join(process.cwd(),'node_modules')},timeout:30000});
 } finally {rmSync(directory,{recursive:true,force:true});}
});
