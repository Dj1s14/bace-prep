import { Domain, Lesson } from '../types/database';

// Derive rewards from saved completion records. Replays cannot multiply XP.
export function lessonRewards(ids: string[], lessons: Lesson[], domains: Domain[]) {
  const completed = new Set(ids);
  const active = lessons.filter(l => l.active);
  const count = active.filter(l => completed.has(l.id)).length;
  const xp = count * 100;
  const badges = [
    {name: 'First Steps', earned: count >= 1, description: 'Complete your first lesson.'},
    {name: 'Building Momentum', earned: count >= 5, description: 'Complete five lessons.'},
    {name: 'Lesson Explorer', earned: count >= 15, description: 'Complete fifteen lessons.'},
    ...domains.map(d => {
      const units = active.filter(l => l.domain_id === d.id);
      return {name: `${d.name} Explorer`, earned: units.length > 0 && units.every(l => completed.has(l.id)), description: `Complete every active lesson in ${d.name}.`};
    }),
  ];
  return {count, xp, level: Math.floor(xp / 500) + 1, nextLevelXp: 500 - xp % 500, badges};
}
