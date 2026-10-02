import { ALL_LESSONS } from '../allLessons';
import { normalizeQuestionBank } from '../questionNormalization';
import { EXPANDED_QUESTIONS } from '../expandedLearning';
import { Question } from '../../types/database';
import { LESSON_PIPETTE_QUESTIONS } from './lesson_pipette';
import { LESSON_DILUTIONS_QUESTIONS } from './lesson_dilutions';
import { LESSON_ASEPTIC_QUESTIONS } from './lesson_aseptic';
import { LESSON_MATH_MOLARITY_QUESTIONS } from './lesson_math_molarity';
import { DOMAIN_1_QUESTIONS } from './domain1_biotech_skills';
import { DOMAIN_1_EXPANSION_QUESTIONS } from './domain1_expansion';
import { DOMAIN_2_QUESTIONS } from './domain2_technical_skills';
import { DOMAIN_2_EXPANSION_QUESTIONS } from './domain2_expansion';
import { DOMAIN_3_QUESTIONS } from './domain3_safety';
import { DOMAIN_3_EXPANSION_QUESTIONS } from './domain3_expansion';
import { DOMAIN_4_QUESTIONS } from './domain4_math';
import { DOMAIN_4_EXPANSION_QUESTIONS } from './domain4_expansion';
import { DOMAIN_5_QUESTIONS } from './domain5_biochemistry';
import { DOMAIN_5_EXPANSION_QUESTIONS } from './domain5_expansion';
import { DOMAIN_6_QUESTIONS } from './domain6_regulation';
import { DOMAIN_6_EXPANSION_QUESTIONS } from './domain6_expansion';
import { DOMAIN_7_QUESTIONS } from './domain7_equipment';
import { DOMAIN_7_EXPANSION_QUESTIONS } from './domain7_expansion';
import { DOMAIN_8_QUESTIONS } from './domain8_experimental_design';
import { DOMAIN_8_EXPANSION_QUESTIONS } from './domain8_expansion';
import { DOMAIN_LESSONS_QUESTIONS } from './domain_lessons_questions';
import { BACE_EXTRA_QUESTIONS } from '../baceCurriculumData';
import { COVERAGE_EXPANSION_QUESTIONS } from './coverage_expansion';

const RAW_QUESTIONS: Question[] = [
  ...EXPANDED_QUESTIONS,
  ...LESSON_PIPETTE_QUESTIONS,
  ...LESSON_DILUTIONS_QUESTIONS,
  ...LESSON_ASEPTIC_QUESTIONS,
  ...LESSON_MATH_MOLARITY_QUESTIONS,
  ...DOMAIN_LESSONS_QUESTIONS,
  ...BACE_EXTRA_QUESTIONS,
  ...COVERAGE_EXPANSION_QUESTIONS,
  ...DOMAIN_1_QUESTIONS,
  ...DOMAIN_1_EXPANSION_QUESTIONS,
  ...DOMAIN_2_QUESTIONS,
  ...DOMAIN_2_EXPANSION_QUESTIONS,
  ...DOMAIN_3_QUESTIONS,
  ...DOMAIN_3_EXPANSION_QUESTIONS,
  ...DOMAIN_4_QUESTIONS,
  ...DOMAIN_4_EXPANSION_QUESTIONS,
  ...DOMAIN_5_QUESTIONS,
  ...DOMAIN_5_EXPANSION_QUESTIONS,
  ...DOMAIN_6_QUESTIONS,
  ...DOMAIN_6_EXPANSION_QUESTIONS,
  ...DOMAIN_7_QUESTIONS,
  ...DOMAIN_7_EXPANSION_QUESTIONS,
  ...DOMAIN_8_QUESTIONS,
  ...DOMAIN_8_EXPANSION_QUESTIONS,
];

export const ALL_QUESTIONS = normalizeQuestionBank(RAW_QUESTIONS, ALL_LESSONS);

export {
  LESSON_PIPETTE_QUESTIONS,
  LESSON_DILUTIONS_QUESTIONS,
  LESSON_ASEPTIC_QUESTIONS,
  LESSON_MATH_MOLARITY_QUESTIONS,
  DOMAIN_LESSONS_QUESTIONS,
  DOMAIN_1_QUESTIONS,
  DOMAIN_1_EXPANSION_QUESTIONS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_2_EXPANSION_QUESTIONS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_3_EXPANSION_QUESTIONS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_4_EXPANSION_QUESTIONS,
  DOMAIN_5_QUESTIONS,
  DOMAIN_5_EXPANSION_QUESTIONS,
  DOMAIN_6_QUESTIONS,
  DOMAIN_6_EXPANSION_QUESTIONS,
  DOMAIN_7_QUESTIONS,
  DOMAIN_7_EXPANSION_QUESTIONS,
  DOMAIN_8_QUESTIONS,
  DOMAIN_8_EXPANSION_QUESTIONS,
  COVERAGE_EXPANSION_QUESTIONS,
};

