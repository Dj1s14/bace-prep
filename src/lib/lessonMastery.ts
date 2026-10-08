import { Domain, Lesson, LessonGradeRecord, StudentOverview } from '../types/database';
// Every active lesson has equal weight within its domain. Unfinished lessons
// earn no credit; completed lessons use their latest assessment, if available.
export function lessonMastery(student:StudentOverview, completedIds:string[], grades:LessonGradeRecord[], lessons:Lesson[], domains:Domain[]):StudentOverview {
 const completed=new Set(completedIds);
 const latest=new Map<string,LessonGradeRecord>();
 for(const grade of grades.filter(g=>g.student_id===student.profile.id)) {
  const prior=latest.get(grade.lesson_id);
  if(!prior || Date.parse(grade.submitted_at)>=Date.parse(prior.submitted_at)) latest.set(grade.lesson_id,grade);
 }
 const domain_mastery:Record<string,number>={};
 for(const domain of domains) {
  const relevant=lessons.filter(l=>l.active!==false && l.domain_id===domain.id);
  const credit=relevant.reduce((sum,l)=>{
   if(!completed.has(l.id)) return sum;
   const grade=latest.get(l.id);
   const score=grade?Number(grade.percentage):100;
   return sum+Math.min(100,Math.max(0,Number.isFinite(score)?score:0));
  },0);
  domain_mastery[domain.id]=relevant.length?Math.round(credit/relevant.length):0;
 }
 const readiness=Math.round(domains.reduce((sum,d)=>sum+(domain_mastery[d.id]||0)*d.exam_weight/100,0));
 return {...student,domain_mastery,overall_readiness:readiness,lessons_completed:lessons.filter(l=>l.active!==false && completed.has(l.id)).length,status:readiness>=80?'Ready':readiness>=70?'Developing':readiness>=60?'Needs Review':'At Risk'};
}
