import React from 'react';
export function LessonVisual({lessonId}:{lessonId:string}) {
 if (lessonId === 'les_central_dogma' || lessonId === 'les_nucleic_acids') return <figure className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
  <figcaption className="font-bold text-slate-900 mb-4">From information to protein</figcaption>
  <div className="flex flex-wrap items-center gap-3 text-sm">
   <span className="rounded-xl bg-white border border-blue-200 px-5 py-3 font-bold">DNA</span><span className="text-blue-800">Transcription →</span>
   <span className="rounded-xl bg-white border border-blue-200 px-5 py-3 font-bold">RNA</span><span className="text-blue-800">Translation →</span>
   <span className="rounded-xl bg-white border border-blue-200 px-5 py-3 font-bold">Protein</span>
  </div><p className="mt-4 text-sm text-slate-600">Replication copies DNA. Transcription makes RNA; translation uses mRNA to build a polypeptide.</p>
 </figure>;
 if(lessonId !== 'les_pipette') return null;
 return <figure className="rounded-2xl border border-teal-200 bg-teal-50 p-6">
  <figcaption className="font-bold text-slate-900 mb-4">Know your micropipette</figcaption>
  <svg viewBox="0 0 600 300" role="img" aria-labelledby="pipette-diagram-title" className="w-full max-w-xl mx-auto">
   <title id="pipette-diagram-title">Schematic micropipette with labeled plunger, volume display, and disposable tip</title>
   <rect x="158" y="25" width="64" height="20" rx="8" fill="#0f766e"/>
   <rect x="180" y="45" width="20" height="30" fill="#64748b"/><rect x="155" y="75" width="70" height="120" rx="24" fill="#fff" stroke="#0f766e" strokeWidth="3"/>
   <rect x="170" y="115" width="40" height="35" rx="5" fill="#e2e8f0"/><text x="190" y="137" textAnchor="middle" fontSize="14" fill="#0f172a">100</text>
   <path d="M175 195H205L199 235H181Z" fill="#64748b"/><path d="M181 235H199L191 285H189Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2"/>
   <g stroke="#0f766e" strokeWidth="2"><path d="M222 35H290"/><path d="M211 133H290"/><path d="M200 250H290"/></g>
   <g fill="#134e4a" fontSize="18"><text x="305" y="41">Plunger</text><text x="305" y="139">Volume display</text><text x="305" y="256">Disposable tip</text></g>
  </svg><p className="text-sm text-slate-600 mt-3">Schematic, not to scale. For standard forward pipetting, aspirate from the first stop and use the second stop for blowout. Verify range and technique for your instrument.</p>
 </figure>;
}
