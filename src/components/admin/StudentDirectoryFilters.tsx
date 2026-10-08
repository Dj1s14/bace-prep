import React from 'react';
import { DirectoryFilters } from '../../lib/studentDirectory';
import { SchoolClass, TeacherProfile } from '../../types/database';
export function StudentDirectoryFilters({filters,onChange,classes,teachers,onReset,count,total,selectedCount,onClearSelection}:{filters:DirectoryFilters;onChange:(filters:DirectoryFilters)=>void;classes:SchoolClass[];teachers:TeacherProfile[];onReset:()=>void;count:number;total:number;selectedCount:number;onClearSelection:()=>void}) {
 const options: {key:keyof DirectoryFilters;label:string;values:[string,string][]}[]=[
  {key:'teacher',label:'Teacher',values:[['all','All teachers'],['unassigned','No assigned teacher'],...teachers.map(t=>[t.id,`${t.first_name} ${t.last_name}`] as [string,string])]},
  {key:'period',label:'Period',values:[['all','All periods'],...Array.from(new Set(classes.map(c=>c.period).filter(Boolean))).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(p=>[p,`Period ${p}`] as [string,string])]},
  {key:'readiness',label:'Readiness',values:[['all','All readiness levels'],['ready','BACE Ready (80%+)'],['developing','Developing (70–79%)'],['support','Needs Support (<70%)']]},
  {key:'activity',label:'Study progress',values:[['all','All students'],['started','Started studying'],['not_started','Not started studying']]},
  {key:'sort',label:'Sort by',values:[['name','Last name A–Z'],['readiness_low','Readiness: lowest first'],['readiness_high','Readiness: highest first']]},
  {key:'group',label:'Group by',values:[['none','No grouping'],['class','Class'],['teacher','Teacher'],['readiness','Readiness']]},
 ];
 return <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{options.map(o=><label key={o.key} className="text-xs font-semibold text-slate-600 space-y-1 block">{o.label}<select value={filters[o.key]} onChange={e=>onChange({...filters,[o.key]:e.target.value})} className="block w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500">{o.values.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>)}</div>
  <div className="flex flex-wrap items-center justify-between gap-3 text-xs"><p className="text-slate-600"><strong>{count}</strong> of {total} students shown · <strong>{selectedCount}</strong> selected</p><div className="flex gap-4">{selectedCount>0 && <button onClick={onClearSelection} className="text-blue-700 font-semibold">Clear selection</button>}<button onClick={onReset} className="text-blue-700 font-semibold">Reset filters</button></div></div>
 </div>;
}
