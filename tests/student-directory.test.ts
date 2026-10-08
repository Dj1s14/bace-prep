import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_DIRECTORY_FILTERS, filterStudentDirectory, directoryGroup, directoryGroupKey } from '../src/lib/studentDirectory';
const classes:any[]=[{id:'period1',name:'First Period',teacher_id:'t1',period:'1'},{id:'period2',name:'Second Period',teacher_id:'t2',period:'2'}];
const teachers:any[]=[{id:'t1',first_name:'Alex',last_name:'Teacher'},{id:'t2',first_name:'Sam',last_name:'Teacher'}];
const student=(id:string,classId:string,ready:number,questions:number,lessons=0):any=>({profile:{id,first_name:id,last_name:id,email:`${id}@school.edu`},class_id:classId,overall_readiness:ready,questions_attempted:questions,lessons_completed:lessons,mock_exam_scores:[]});
const students=[student('anna','period1',80,1),student('ben','period1',70,0,1),student('carl','period2',69,0),student('dana','',0,0)];
const filter=(changes:any={},search='',classId='all')=>filterStudentDirectory(students,classes,teachers,search,classId,{...DEFAULT_DIRECTORY_FILTERS,...changes}).map(s=>s.profile.id);
test('directory filters intersect class, teacher, period, readiness and study progress',()=>{
 assert.deepEqual(filter({teacher:'t1',period:'1',readiness:'ready',activity:'started'}),['anna']);
 assert.deepEqual(filter({teacher:'t1',period:'2'}),[]);
 assert.deepEqual(filter({readiness:'developing'}),['ben']);
 assert.deepEqual(filter({readiness:'support'}),['carl','dana']);
 assert.deepEqual(filter({activity:'not_started'}),['carl','dana']);
 assert.deepEqual(filter({activity:'started'}),['anna','ben']);
 assert.deepEqual(filter({},'  ANNA@school.edu  '),['anna']);
 assert.deepEqual(filter({},'','period2'),['carl']);
});
test('unassigned students remain findable without treating them as enrolled',()=>{
 assert.deepEqual(filter({},'','unassigned'),['dana']);
 assert.deepEqual(filter({teacher:'unassigned'}),['dana']);
 assert.equal(directoryGroup(students[3],'class',classes,teachers),'No assigned class');
});
test('grouping keeps cohorts together and sorts within each cohort',()=>{
 const result=filterStudentDirectory(students,classes,teachers,'','all',{...DEFAULT_DIRECTORY_FILTERS,group:'class',sort:'readiness_high'});
 assert.deepEqual(result.slice(0,2).map(s=>s.profile.id),['anna','ben']);
 assert.deepEqual(filter({sort:'readiness_low'}),['dana','carl','ben','anna']);
 assert.equal(directoryGroup(students[0],'teacher',classes,teachers),'Alex Teacher');
 assert.equal(students[0].profile.id,'anna');
});

test('distinct class IDs do not merge even when class names are identical',()=>{
 const sameNames=classes.map(c=>({...c,name:'Biomedical Science'}));
 assert.notEqual(directoryGroupKey(students[0],'class',sameNames),directoryGroupKey(students[2],'class',sameNames));
});
