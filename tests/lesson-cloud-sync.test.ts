import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { collectStudentLessons, legacyStudentIds, mergeCloudStudent } from '../src/lib/lessonIdentity';
import { syncStudentLessons } from '../src/lib/cloudLessonSync';
import type { LessonGradeRecord, Profile, StudentOverview } from '../src/types/database';

const store = new Map<string,string>();
const localStorageMock = {
  getItem: (key:string) => store.get(key) ?? null,
  setItem: (key:string,value:string) => { store.set(key,value); },
  removeItem: (key:string) => { store.delete(key); },
  clear: () => store.clear(),
  key: (index:number) => [...store.keys()][index] || null,
  get length() { return store.size; },
};
Object.defineProperty(globalThis, 'localStorage', { value:localStorageMock, configurable:true });
beforeEach(() => store.clear());

const userId = '123e4567-e89b-42d3-a456-426614174000';
const email = 'verified.student@example.edu';
const profile:Profile = {
  id:userId,email,role:'student',first_name:'Sample',last_name:'Student',created_at:'2026-11-17T00:00:00Z',
};
const grade:LessonGradeRecord = {
  id:'lesson_grade_1',student_id:'legacy_student_id',lesson_id:'lesson_1',
  lesson_title:'Test Lesson',domain_id:'d1',domain_name:'Domain 1',
  score:8,total_questions:10,percentage:80,letter_grade:'B',status:'Passed',
  submitted_at:'2026-11-17T00:00:00Z',
};
const localStudent:StudentOverview = {
  profile:{...profile,id:'legacy_student_id'},class_id:'class_1',
  overall_readiness:25,domain_mastery:{ d1:25 },last_active:'Yesterday',
  status:'Needs Review',lessons_completed:1,questions_attempted:0,accuracy:0,
  mock_exam_scores:[],weakest_topics:[],strongest_topics:[],recent_activities:[],
};

test('legacy student IDs remain recoverable after matching email to cloud ID', () => {
  const cloud = { ...localStudent, profile, lessons_completed:2 };
  const merged = mergeCloudStudent([localStudent],cloud);
  assert.equal(merged.length,1);
  assert.equal(merged[0].profile.id,userId);
  assert.equal(merged[0].overall_readiness,25);
  assert.equal(merged[0].lessons_completed,2);
  assert.deepEqual(legacyStudentIds(email,userId,merged),[userId,'legacy_student_id']);
  const {grades,completed} = collectStudentLessons(
    legacyStudentIds(email,userId,merged),[grade,grade],
    {legacy_student_id:['lesson_1','lesson_1']},
  );
  assert.equal(grades.length,1);
  assert.deepEqual(completed,['lesson_1']);
});

function mockClient(options:{auth?:boolean; wrongRole?:boolean; failGradeInsert?:boolean} = {}) {
  const tables:Record<string,Array<Record<string,unknown>>> = {
    profiles:[{id:userId, role:options.wrongRole?'teacher':'student',email}],
    lesson_grades:[],lesson_progress:[],
  };
  const auth = {getUser:async()=>({ data:{user:options.auth===false?null:{id:userId,email}},error:null })};
  let writes = 0;
  const from = (table:string) => ({
    select(_columns:string) {
      const filters:Array<[string,unknown]> = [];
      const chain = {
        eq(key:string,value:unknown) {filters.push([key,value]);return chain;},
        then(resolve:(value:unknown)=>unknown) {
          const data = tables[table].filter(row => filters.every(([k,v]) => row[k]===v)).map(v=>({...v}));
          return Promise.resolve(resolve({data,error:null}));
        },
        async single(){
          const data = tables[table].filter(row => filters.every(([k,v]) => row[k]===v))[0];
          return data?{data,error:null}:{data:null,error:{message:'not found'}};
        },
      };
      return chain;
    },
    async insert(rows:Array<Record<string,unknown>>) {
      if (table==='lesson_grades' && options.failGradeInsert) return {error:new Error('simulated failure')};
      writes+=rows.length;
      tables[table].push(...rows.map(v=>({...v})));
      return {error:null};
    },
    async upsert(rows:Array<Record<string,unknown>>, _config:unknown){
      writes+=rows.length;
      for(const row of rows){
        const index=tables[table].findIndex(v=>v.id===row.id);
        if(index<0)tables[table].push({...row});
        else tables[table][index]={...row};
      }
      return {error:null};
    },
  });
  return {
    client:{auth,from} as unknown as NonNullable<Parameters<typeof syncStudentLessons>[4]>,
    tables, get writes(){return writes;},
  };
}

test('authenticated legacy work uploads under canonical ID once, then reloads', async () => {
  const fake=mockClient();
  const first=await syncStudentLessons(profile,[grade],['lesson_1'],
    [userId,'legacy_student_id'],fake.client);
  assert.equal(first.grades.length,1);
  assert.deepEqual(first.completed,['lesson_1']);
  assert.equal(fake.tables.lesson_grades[0].student_id,userId);
  assert.match(String(fake.tables.lesson_grades[0].teacher_notes),/Recovered from browser storage/);
  assert.equal(fake.tables.lesson_progress[0].student_id,userId);
  const before=fake.writes;
  const second=await syncStudentLessons(profile,[grade],['lesson_1'],
    [userId,'legacy_student_id'],fake.client);
  assert.equal(fake.writes,before,'retry should not duplicate');
  assert.equal(second.grades[0].student_id,userId);
});

test('unauthenticated or mismatched identity never writes student grades', async () => {
  const fake=mockClient({auth:false});
  await assert.rejects(syncStudentLessons(profile,[grade],['lesson_1'],[grade.student_id],fake.client),/verified Supabase sign-in/);
  assert.equal(fake.writes,0);
  const another={...profile,email:'someone.else@example.edu'};
  const fake2=mockClient();
  await assert.rejects(syncStudentLessons(another,[grade],['lesson_1'],[grade.student_id],fake2.client),/identity differs/);
  assert.equal(fake2.writes,0);
});

test('cloud insert failure retains local inputs without erasing data', async () => {
  const fake=mockClient({failGradeInsert:true});
  const original=JSON.stringify(grade);
  await assert.rejects(syncStudentLessons(profile,[grade],['lesson_1'],[grade.student_id],fake.client),/simulated failure/);
  assert.equal(fake.writes,0);
  assert.equal(JSON.stringify(grade),original);
  assert.equal(fake.tables.lesson_grades.length,0);
});
