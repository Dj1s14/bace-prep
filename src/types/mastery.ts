export interface MasteryOption {
  id: string;
  text: string;
}

export interface MasteryItem {
  item_id: string;
  question_text: string;
  question_type: 'multiple_choice';
  options: MasteryOption[];
  correct_answer_id: string;
  explanation: string;
  remediation_hints: Record<string, string>; // Maps option ID (e.g. "B", "C", "D") to actionable lab diagnostic feedback
}

export interface MasteryCompetency {
  competency_id: string;
  statement: string;
  primary_item: MasteryItem;
  paired_variant: MasteryItem;
}

export interface MasteryLessonMetadata {
  lesson_id: string;
  domain_id: string;
  domain: string;
  sublesson: string;
  total_competencies: number;
  estimated_completion_time_minutes: number;
  difficulty_tier: 'Foundational' | 'Intermediate' | 'Practical Exam Scenario';
}

export interface AdaptiveMasteryLesson {
  lesson_metadata: MasteryLessonMetadata;
  competencies: MasteryCompetency[];
}

export type CompetencyStatus = 
  | 'pending' 
  | 'mastered_primary' 
  | 'needs_variant' 
  | 'mastered_variant' 
  | 'failed_both';

export interface CompetencyAttemptRecord {
  competency_id: string;
  status: CompetencyStatus;
  primary_choice_id?: string;
  primary_correct?: boolean;
  variant_choice_id?: string;
  variant_correct?: boolean;
  active_remediation_hint?: string;
  is_mastered: boolean;
}
