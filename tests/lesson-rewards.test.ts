import test from 'node:test';
import assert from 'node:assert/strict';
import {lessonRewards} from '../src/lib/lessonRewards';
const lessons:any[]=[{id:'a',domain_id:'one',active:true},{id:'b',domain_id:'one',active:true},{id:'old',domain_id:'one',active:false}];
const domains:any[]=[{id:'one',name:'Biotech'},{id:'empty',name:'Empty'}];
test('lesson XP counts unique active completions and cannot be farmed by replays',()=>{
 const r=lessonRewards(['a','a','old','unknown'],lessons,domains);
 assert.equal(r.xp,100);assert.equal(r.count,1);assert.equal(r.level,1);assert.equal(r.nextLevelXp,400);
 assert.equal(r.badges.find(b=>b.name==='First Steps')?.earned,true);
 assert.equal(r.badges.find(b=>b.name==='Biotech Explorer')?.earned,false);
});
test('domain badges require every active lesson and empty domains earn nothing',()=>{
 const r=lessonRewards(['a','b'],lessons,domains);
 assert.equal(r.badges.find(b=>b.name==='Biotech Explorer')?.earned,true);
 assert.equal(r.badges.find(b=>b.name==='Empty Explorer')?.earned,false);
});
test('levels advance at 500 XP without changing mastery or counting assessments',()=>{
 const many:any[]=Array.from({length:5},(_,i)=>({id:String(i),active:true,domain_id:'one'}));
 const r=lessonRewards(many.map(l=>l.id),many,domains);
 assert.equal(r.level,2);assert.equal(r.nextLevelXp,500);
 assert.equal(lessonRewards([],many,domains).xp,0);
});
