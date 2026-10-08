import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonMastery } from '../src/lib/lessonMastery';
const domains:any[]=[{id:'d1',exam_weight:60},{id:'d2',exam_weight:40}];
const lessons:any[]=[{id:'l1',domain_id:'d1',active:true},{id:'l2',domain_id:'d1',active:true},{id:'l3',domain_id:'d2',active:true}];
const student:any={profile:{id:'own'},domain_mastery:{d1:100,d2:100},overall_readiness:100,mock_exam_scores:[100],questions_attempted:100,accuracy:100};
const grade=(lesson:string,percentage:number,date='2026-10-08T12:00:00Z',student_id='own'):any=>({lesson_id:lesson,student_id,percentage,submitted_at:date});
test('perfect mock history cannot award mastery without completed lessons',()=>{
 const result=lessonMastery(student,[],[],lessons,domains);
 assert.deepEqual(result.domain_mastery,{d1:0,d2:0});
 assert.equal(result.overall_readiness,0);
 assert.deepEqual(result.mock_exam_scores,[100]);
 assert.equal(result.accuracy,100);
});
test('unfinished lessons remain in the denominator and only own latest lesson grade earns credit',()=>{
 const grades=[grade('l1',100,'2026-10-07T12:00:00Z'),grade('l1',80),grade('l2',100),grade('l1',0,'2026-10-09T12:00:00Z','other')];
 const result=lessonMastery(student,['l1'],grades,lessons,domains);
 assert.deepEqual(result.domain_mastery,{d1:40,d2:0});
 assert.equal(result.overall_readiness,24);
 assert.equal(result.lessons_completed,1);
});
test('completed lessons without a recorded check earn completion credit, archived IDs do not',()=>{
 const result=lessonMastery(student,['l1','l2','l3','unknown'],[],lessons,domains);
 assert.equal(result.overall_readiness,100);
 assert.equal(result.lessons_completed,3);
 assert.equal(student.overall_readiness,100);
});
