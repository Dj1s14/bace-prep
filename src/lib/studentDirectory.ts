import { SchoolClass, StudentOverview, TeacherProfile } from '../types/database';
export type DirectoryFilters = { teacher:string; period:string; readiness:string; activity:string; sort:string; group:string };
export const DEFAULT_DIRECTORY_FILTERS: DirectoryFilters = {teacher:'all',period:'all',readiness:'all',activity:'all',sort:'name',group:'none'};
export function readinessGroup(s: StudentOverview) {return s.overall_readiness>=80?'BACE Ready (80%+)':s.overall_readiness>=70?'Developing (70–79%)':'Needs Support (<70%)';}
export function directoryGroup(s: StudentOverview, group:string, classes:SchoolClass[], teachers:TeacherProfile[]) {
 const cls=classes.find(c=>c.id===s.class_id);
 if(group==='class') return cls?.name||'No assigned class';
 if(group==='teacher') {const t=teachers.find(t=>t.id===cls?.teacher_id);return t?`${t.first_name} ${t.last_name}`:'No assigned teacher';}
 if(group==='readiness') return readinessGroup(s);
 return '';
}
export function directoryGroupKey(s: StudentOverview, group:string, classes:SchoolClass[]) {
 const cls=classes.find(c=>c.id===s.class_id);
 if(group==='class') return cls?.id||'unassigned';
 if(group==='teacher') return cls?.teacher_id||'unassigned';
 if(group==='readiness') return readinessGroup(s);
 return '';
}
export function filterStudentDirectory(students:StudentOverview[], classes:SchoolClass[], teachers:TeacherProfile[], search:string, classId:string, f:DirectoryFilters) {
 const query=search.trim().toLocaleLowerCase();
 return students.filter(s=>{
  const cls=classes.find(c=>c.id===s.class_id);
  if(query && !`${s.profile.first_name} ${s.profile.last_name} ${s.profile.email}`.toLocaleLowerCase().includes(query)) return false;
  if(classId==='unassigned' && cls) return false;
  if(classId!=='all' && classId!=='unassigned' && s.class_id!==classId) return false;
  if(f.teacher==='unassigned' && cls?.teacher_id && teachers.some(t=>t.id===cls.teacher_id)) return false;
  if(f.teacher!=='all' && f.teacher!=='unassigned' && cls?.teacher_id!==f.teacher) return false;
  if(f.period!=='all' && cls?.period!==f.period) return false;
  if(f.readiness==='ready' && s.overall_readiness<80) return false;
  if(f.readiness==='developing' && (s.overall_readiness<70 || s.overall_readiness>=80)) return false;
  if(f.readiness==='support' && s.overall_readiness>=70) return false;
  const started=s.questions_attempted>0||s.lessons_completed>0||s.mock_exam_scores.length>0;
  if(f.activity==='started' && !started) return false;
  if(f.activity==='not_started' && started) return false;
  return true;
 }).sort((a,b)=>{
  const grouped=directoryGroup(a,f.group,classes,teachers).localeCompare(directoryGroup(b,f.group,classes,teachers),undefined,{numeric:true});
  if(grouped) return grouped;
  const groupKeyOrder = directoryGroupKey(a,f.group,classes).localeCompare(directoryGroupKey(b,f.group,classes));
  if(groupKeyOrder) return groupKeyOrder;
  if(f.sort==='readiness_low' && a.overall_readiness!==b.overall_readiness) return a.overall_readiness-b.overall_readiness;
  if(f.sort==='readiness_high' && a.overall_readiness!==b.overall_readiness) return b.overall_readiness-a.overall_readiness;
  return `${a.profile.last_name} ${a.profile.first_name}`.localeCompare(`${b.profile.last_name} ${b.profile.first_name}`,undefined,{numeric:true});
 });
}
