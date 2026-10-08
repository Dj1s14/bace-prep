import test from 'node:test';
import assert from 'node:assert/strict';
import { canOpenPortal, createPreviewStudent, resolveTeacherIdentity } from '../src/lib/portalAccess.ts';
import { build } from 'esbuild';
import { mkdtempSync,readFileSync,writeFileSync,rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
test('admins retain teaching identity while teachers and students cannot open admin',()=>{
  assert.equal(canOpenPortal('admin','teacher'),true);
  assert.equal(canOpenPortal('teacher','admin'),false);
  assert.equal(canOpenPortal('student','teacher'),false);
  assert.equal(canOpenPortal('student','admin'),false);
  assert.equal(canOpenPortal('teacher','student'),true);
  const p:any={id:'own',email:'own@example.edu',first_name:'Own',last_name:'Teacher',role:'admin',created_at:'today'};
  assert.equal(resolveTeacherIdentity(p).id,p.id);
  assert.equal(createPreviewStudent().profile.first_name,'Demo');
});
test('real provider isolates student preview and scopes admin teacher workspace to own classes',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'bace-portals-'));const output=join(dir,'check.cjs');
 try {
 const result=await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
 import React from 'react';import {renderToString} from 'react-dom/server';import assert from 'node:assert/strict';
 (async()=>{
 const storage=new Map();globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)};
 globalThis.window={location:{origin:'https://baceprep.jisd.link'},addEventListener(){},removeEventListener(){},scrollTo(){}};
 const states=[];let cursor=0;
 globalThis.__state=initial=>{const i=cursor++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return [states[i],next=>{states[i]=typeof next==='function'?next(states[i]):next;}];};
 globalThis.__ref=initial=>globalThis.__state({current:initial})[0];
 const {AppProvider,useApp,AppContext}=await import('./src/context/AppContext');const {Header}=await import('./src/components/common/Header');const {TeacherSidebar}=await import('./src/components/common/TeacherSidebar');let ctx;
 const Capture=()=>{ctx=useApp();return null;};
 const render=()=>{cursor=0;renderToString(<AppProvider><Capture/></AppProvider>);return ctx;};
 render();
 const admin={id:'admin-own',email:'admin@example.edu',first_name:'Own',last_name:'Admin',role:'admin',created_at:'2026-01-01'};
 globalThis.__controls.setCurrentUser(admin);globalThis.__controls.setRoleState('admin');globalThis.__controls.setTeachers([{id:'other-teacher',first_name:'Other',last_name:'Teacher',email:'other@example.edu'}]);globalThis.__controls.setActiveTeacherIdState('other-teacher');
 const realStudent={...ctx.currentStudent,profile:{...ctx.currentStudent.profile,id:'private-student',email:'private@example.edu',first_name:'Private',last_name:'Real'},class_id:'own-class'};
 globalThis.__controls.setStudents([realStudent,{...realStudent,profile:{...realStudent.profile,id:'other-student'},class_id:'other-class'}]);
 globalThis.__controls.setClasses([{id:'own-class',teacher_id:admin.id},{id:'other-class',teacher_id:'other-teacher'}]);
 globalThis.__controls.setActivitySessions([{id:'private-session',student_id:'private-student'}]);
 globalThis.__controls.setLessonGrades([{id:'private-grade',student_id:'private-student'}]);
 render();const before=JSON.stringify(globalThis.__snapshots);
 ctx.setRole('teacher');render();
 assert.equal(ctx.currentTeacher.id,admin.id);assert.equal(ctx.activeTeacherId,admin.id);ctx.setActiveTeacherId('other-teacher');render();assert.equal(ctx.currentTeacher.id,admin.id);assert.deepEqual(ctx.classes.map(c=>c.id),['own-class']);assert.deepEqual(ctx.students.map(s=>s.profile.id),['private-student']);const teacherHtml=renderToString(<AppContext.Provider value={ctx}><TeacherSidebar isOpen={false} onClose={()=>{}} /></AppContext.Provider>);assert.ok(teacherHtml.includes(admin.email));assert.ok(!teacherHtml.includes('other@example.edu'));assert.ok(!teacherHtml.includes('openAccountModal'));
 ctx.setRole('student');render();
 assert.equal(ctx.currentUser.id,admin.id);assert.equal(ctx.currentUser.role,'admin');
 assert.equal(ctx.currentStudent.profile.id,'generic-student-preview');assert.equal(ctx.activeStudentId,'generic-student-preview');
 assert.equal(ctx.currentStudent.profile.first_name,'Demo');const html=renderToString(<AppContext.Provider value={ctx}><Header /></AppContext.Provider>);assert.ok(html.includes('Demo Student'));assert.ok(!html.includes('private@example.edu'));assert.ok(!html.includes('Private Real'));assert.equal(ctx.classes.length,0);assert.equal(ctx.activitySessions.length,0);assert.equal(ctx.lessonGrades.length,0);
 ctx.recordLessonCompletion('l1','private-student');ctx.markAssignmentCompleted('private-assignment','private-student');
 ctx.recordLessonGrade({student_id:'private-student',student_name:'Private Real',lesson_id:'l1',score:1,total_questions:1,percentage:100});
 ctx.updateDomainMastery('d1',90);ctx.deleteActivitySession('private-session');ctx.updateLessonGrade('private-grade',{score:0});
 ctx.recordBenchActivity('pipette',1,1);ctx.markBenchLessonComplete('pipette_intro');
 const masteryBeforeMock=JSON.stringify(ctx.currentStudent.domain_mastery);
 await ctx.recordExamSubmission({id:'preview-attempt',student_id:'private-student',quiz_type:'mock_quick',score:1,total_questions:1,percentage:100,time_spent_seconds:60});
 render();assert.equal(JSON.stringify(ctx.currentStudent.domain_mastery),masteryBeforeMock,'Mock exams must not award lesson mastery');assert.deepEqual(ctx.currentStudent.mock_exam_scores,[100]);assert.equal(JSON.stringify(globalThis.__snapshots),before,'Preview must not change underlying real classroom data');
 assert.equal(ctx.lessonGrades[0].student_id,'generic-student-preview');assert.equal(ctx.activitySessions[0].student_id,'generic-student-preview');
 assert.equal(ctx.currentStudent.questions_attempted,1);assert.deepEqual(ctx.completedLessonIds,['l1']);assert.equal(ctx.benchStats.pipetteDrillsCompleted,1);
 assert.equal(storage.has('bace_bench_stats'),false);
 ctx.returnToFacultyConsole();render();assert.equal(ctx.role,'teacher');assert.equal(ctx.currentTeacher.id,admin.id);assert.equal(ctx.students[0].profile.id,'private-student');
 ctx.setRole('admin');render();ctx.setRole('student');render();ctx.returnToFacultyConsole();render();assert.equal(ctx.role,'admin');
 globalThis.__controls.setCurrentUser({...admin,role:'teacher'});globalThis.__controls.setRoleState('teacher');render();ctx.setRole('admin');render();assert.equal(ctx.role,'teacher');assert.deepEqual(ctx.classes.map(c=>c.id),['own-class']);assert.equal(ctx.currentTeacher.id,admin.id);
 globalThis.__controls.setCurrentUser({...admin,role:'student'});globalThis.__controls.setRoleState('student');render();ctx.setRole('teacher');render();assert.equal(ctx.role,'student');assert.notEqual(ctx.currentTeacher.id,'other-teacher');globalThis.__controls.setCurrentUser(null);render();assert.notEqual(ctx.currentTeacher.id,'other-teacher');
 })().catch(e=>{console.error(e);process.exitCode=1;});
 `},bundle:true,platform:'node',format:'cjs',packages:'external',write:false,define:{'import.meta.env':'{}'},plugins:[{name:'controlled-provider-state',setup(builder){
 builder.onLoad({filter:/AppContext\.tsx$/},args=>{
 let s=readFileSync(args.path,'utf8').replace('useContext, useState, useEffect','useContext, useState as realUseState, useEffect');
 s+='\nconst useState: typeof realUseState = globalThis.__state;\nexport {AppContext};';
 s=s.replaceAll('React.useRef','globalThis.__ref');
 s=s.replace('  return (\n    <AppContext.Provider','  globalThis.__controls={setCurrentUser,setRoleState,setStudents,setClasses,setActivitySessions,setLessonGrades,setTeachers,setActiveTeacherIdState}; globalThis.__snapshots={students,classes,activitySessions,lessonGrades,assignmentProgress,studentCompletedLessonsMap};\n  return (\n    <AppContext.Provider');
 return {contents:s,loader:'tsx'};
 });}}]});
 writeFileSync(output,result.outputFiles[0].contents);
 execFileSync(process.execPath,[output],{env:{...process.env,NODE_PATH:join(process.cwd(),'node_modules')},timeout:30000,stdio:'pipe'});
 }finally{rmSync(dir,{recursive:true,force:true});}
});
