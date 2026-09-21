import { AdaptiveMasteryLesson } from '../../types/mastery';
import { DOMAIN_1_MASTERY_LESSONS } from './domain1';
import { DOMAIN_2_MASTERY_LESSONS } from './domain2';
import { DOMAIN_3_MASTERY_LESSONS } from './domain3';
import { DOMAIN_4_MASTERY_LESSONS } from './domain4';
import { DOMAIN_5_MASTERY_LESSONS } from './domain5';
import { DOMAIN_6_MASTERY_LESSONS } from './domain6';
import { DOMAIN_7_MASTERY_LESSONS } from './domain7';
import { DOMAIN_8_MASTERY_LESSONS } from './domain8';

export const ALL_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  ...DOMAIN_1_MASTERY_LESSONS,
  ...DOMAIN_2_MASTERY_LESSONS,
  ...DOMAIN_3_MASTERY_LESSONS,
  ...DOMAIN_4_MASTERY_LESSONS,
  ...DOMAIN_5_MASTERY_LESSONS,
  ...DOMAIN_6_MASTERY_LESSONS,
  ...DOMAIN_7_MASTERY_LESSONS,
  ...DOMAIN_8_MASTERY_LESSONS,
];

/**
 * Retrieve the mastery lesson corresponding to a given lesson ID
 */
export function getMasteryLesson(lessonId: string): AdaptiveMasteryLesson | undefined {
  // Direct match
  const direct = ALL_MASTERY_LESSONS.find((m) => m.lesson_metadata.lesson_id === lessonId);
  if (direct) return direct;

  // Domain fallback if specific sublesson doesn't have an exact id match
  return ALL_MASTERY_LESSONS.find((m) => {
    // If lesson has same topic or domain
    return m.lesson_metadata.lesson_id.includes(lessonId.replace('les_', ''));
  });
}

/**
 * Retrieve all mastery lessons belonging to a domain
 */
export function getMasteryLessonsByDomain(domainId: string): AdaptiveMasteryLesson[] {
  return ALL_MASTERY_LESSONS.filter((m) => m.lesson_metadata.domain_id === domainId);
}
