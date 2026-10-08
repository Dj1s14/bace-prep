import React from 'react';
import { useApp } from '../../context/AppContext';
import { lessonRewards } from '../../lib/lessonRewards';

export const LessonRewards: React.FC<{studentId?: string}> = ({studentId}) => {
  const {completedLessonIds, studentLessonCompletions, lessons, domains, startLesson} = useApp();
  const ids = studentId ? studentLessonCompletions[studentId] || [] : completedLessonIds;
  const rewards = lessonRewards(ids, lessons, domains);
  const next = lessons.find(l => l.active && !ids.includes(l.id));
  const ownView = !studentId;
  return <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5 space-y-4" aria-label="Lesson rewards">
    <div className="flex flex-wrap justify-between gap-3"><div><h3 className="font-bold text-violet-950">Lesson Journey · Level {rewards.level}</h3><p className="text-sm text-violet-800">{rewards.xp} XP · {rewards.count} lessons completed · {rewards.nextLevelXp} XP to the next level</p></div><span className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-violet-800">100 XP / lesson</span></div>
    <div className="h-2 rounded-full bg-violet-200"><div className="h-2 rounded-full bg-violet-600" style={{width:`${rewards.xp % 500 / 5}%`}} /></div>
    <p className="text-xs text-slate-600">XP celebrates completion and is separate from mastery. Repeating a lesson or taking a mock exam does not award additional lesson XP. Badges recognize participation, not certification.</p>
    <div className="flex flex-wrap gap-2">{rewards.badges.map(b => <span key={b.name} title={b.description} className={`rounded-lg border px-3 py-2 text-xs ${b.earned ? 'bg-white border-violet-300 text-violet-900 font-bold' : 'border-slate-200 text-slate-500'}`}>{b.earned ? '★' : '○'} {b.name}</span>)}</div>
    {ownView && next && <button onClick={() => startLesson(next.id)} className="rounded-xl bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 text-sm font-semibold">Next mission: {next.title}</button>}
    {ownView && !next && <p className="text-sm font-semibold text-violet-900">All lesson missions complete! Revisit lessons to reinforce your skills.</p>}
  </section>;
};
