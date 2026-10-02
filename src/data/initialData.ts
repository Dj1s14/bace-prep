import {
  Domain,
  Topic,
  Lesson,
  Question,
  Achievement,
  SchoolClass,
  StudentOverview,
  TeacherProfile,
  Assignment,
  StudentActivitySession,
  LessonGradeRecord,
} from '../types/database';
import { ALL_QUESTIONS } from './questions';
import { EXPANDED_TOPICS } from './expandedLearning';
import { ALL_LESSONS } from './allLessons';
import { BACE_BENCH_MODULES, BACE_LAB_ACTIVITIES } from './baceCurriculumData';

export const INITIAL_DOMAINS: Domain[] = [
  {
    id: 'd1',
    name: 'Biotechnology Skills',
    description: 'Core wet-lab competencies including micropipetting, solution prep, dilutions, aseptic technique, and electrophoresis.',
    exam_weight: 23,
    display_order: 1,
    icon_name: 'Pipette',
  },
  {
    id: 'd2',
    name: 'Technical Skills & Applications',
    description: 'Applied molecular biology methods including PCR, nucleic acid extraction, transformation, and protein analysis.',
    exam_weight: 19,
    display_order: 2,
    icon_name: 'Dna',
  },
  {
    id: 'd3',
    name: 'Safety & Workplace Culture',
    description: 'OSHA compliance, Safety Data Sheets (SDS), personal protective equipment (PPE), biosafety levels, and chemical hygiene.',
    exam_weight: 12,
    display_order: 3,
    icon_name: 'ShieldAlert',
  },
  {
    id: 'd4',
    name: 'Applied Mathematics',
    description: 'Molarity, normality, dilution equations (C1V1 = C2V2), percent solutions (w/v, v/v), metric conversions, and graphing.',
    exam_weight: 12,
    display_order: 4,
    icon_name: 'Calculator',
  },
  {
    id: 'd5',
    name: 'Biochemistry & Molecular Biology',
    description: 'Macromolecular structure and function, enzyme kinetics, central dogma of molecular biology, and cellular processes.',
    exam_weight: 10,
    display_order: 5,
    icon_name: 'Atom',
  },
  {
    id: 'd6',
    name: 'Regulation & Quality',
    description: 'cGMP, GLP, ISO standards, quality control (QC), quality assurance (QA), SOP compliance, and audit trails.',
    exam_weight: 9,
    display_order: 6,
    icon_name: 'FileCheck2',
  },
  {
    id: 'd7',
    name: 'Standard Equipment',
    description: 'Operation, calibration, and routine maintenance of autoclaves, centrifuges, spectrophotometers, incubators, and pH meters.',
    exam_weight: 8,
    display_order: 7,
    icon_name: 'Wrench',
  },
  {
    id: 'd8',
    name: 'Experimental Design & Data Analysis',
    description: 'Independent/dependent variables, positive and negative controls, standard curves, statistical metrics, and data integrity.',
    exam_weight: 7,
    display_order: 8,
    icon_name: 'BarChart3',
  },
];

export const INITIAL_TOPICS: Topic[] = [
  ...EXPANDED_TOPICS,
  // Biotechnology Skills (Domain 1)
  { id: 't1_1', domain_id: 'd1', name: 'Micropipetting', description: 'Volume ranges, tip selection, two-stop plunger operation, and calibration verification.', display_order: 1 },
  { id: 't1_2', domain_id: 'd1', name: 'Solution Preparation', description: 'Solid-mass dissolves, hydration factors, buffer formulation, and volume adjustment.', display_order: 2 },
  { id: 't1_3', domain_id: 'd1', name: 'Serial Dilutions', description: 'Stepwise dilution series, dilution factors, tube calculations, and plating concentrations.', display_order: 3 },
  { id: 't1_4', domain_id: 'd1', name: 'Aseptic Technique', description: 'Sterile fields, flame decontamination, biosafety cabinet airflow, and contamination mitigation.', display_order: 4 },
  { id: 't1_5', domain_id: 'd1', name: 'Cell Culture Basics', description: 'Media preparation, passaging, hemocytometer cell counts, and viability assessment.', display_order: 5 },
  { id: 't1_6', domain_id: 'd1', name: 'Microscopy', description: 'Brightfield, phase contrast, total magnification calculations, and oil immersion.', display_order: 6 },
  { id: 't1_7', domain_id: 'd1', name: 'Centrifugation', description: 'RCF vs. RPM conversions, pelleting, differential centrifugation, and rotor balancing.', display_order: 7 },
  { id: 't1_8', domain_id: 'd1', name: 'Gel Electrophoresis', description: 'Agarose matrix preparation, running buffers (TAE/TBE), DNA ladders, and band sizing.', display_order: 8 },
  { id: 't1_9', domain_id: 'd1', name: 'Spectrophotometry', description: 'Beer-Lambert law, blanking, absorption spectra, and OD600 optical density measurements.', display_order: 9 },
  { id: 't1_10', domain_id: 'd1', name: 'Laboratory Documentation', description: 'Lab notebooks, Good Documentation Practices (GDP), signature protocols, and data integrity.', display_order: 10 },

  // Technical Skills & Applications (Domain 2)
  { id: 't2_1', domain_id: 'd2', name: 'Polymerase Chain Reaction (PCR)', description: 'Denaturation, annealing, extension temperatures, Taq polymerase, and primer design basics.', display_order: 1 },
  { id: 't2_2', domain_id: 'd2', name: 'Plasmid DNA Extraction', description: 'Alkaline lysis mechanism, silica column binding, wash steps, and elution.', display_order: 2 },
  { id: 't2_3', domain_id: 'd2', name: 'Restriction Enzyme Digestion', description: 'Endonucleases, recognition sequences, sticky vs blunt cuts, and star activity.', display_order: 3 },
  { id: 't2_4', domain_id: 'd2', name: 'Bacterial Transformation', description: 'Chemically competent cells, heat shock, recovery phase, and antibiotic selection.', display_order: 4 },
  { id: 't2_5', domain_id: 'd2', name: 'Protein Assays & Western Blot', description: 'Bradford and BCA assays, SDS-PAGE separation, membrane transfer, and antibody probing.', display_order: 5 },

  // Safety & Workplace Culture (Domain 3)
  { id: 't3_1', domain_id: 'd3', name: 'Safety Data Sheets (SDS) & GHS', description: '16-section SDS interpretation, GHS pictograms, signal words, and hazard statements.', display_order: 1 },
  { id: 't3_2', domain_id: 'd3', name: 'Personal Protective Equipment (PPE)', description: 'Nitrile glove resistance, lab coats, eye protection, and proper doffing protocol.', display_order: 2 },
  { id: 't3_3', domain_id: 'd3', name: 'Biosafety Levels (BSL-1 to BSL-4)', description: 'Agent risk classifications, containment infrastructure, and biological waste handling.', display_order: 3 },
  { id: 't3_4', domain_id: 'd3', name: 'Chemical Spills & Waste Disposal', description: 'Neutralization, biohazard autoclaving, secondary containment, and sharps protocol.', display_order: 4 },

  // Applied Mathematics (Domain 4)
  { id: 't4_1', domain_id: 'd4', name: 'Molarity & Molecular Weight', description: 'Moles, molar concentration, molecular weight conversions, and mass calculations.', display_order: 1 },
  { id: 't4_2', domain_id: 'd4', name: 'Dilution Equation (C1V1 = C2V2)', description: 'Stock solutions, working concentrations, and required solvent volume math.', display_order: 2 },
  { id: 't4_3', domain_id: 'd4', name: 'Percentage Solutions (w/v and v/v)', description: 'Grams per 100 mL, volume ratios, and concentrated liquid stock preparation.', display_order: 3 },
  { id: 't4_4', domain_id: 'd4', name: 'Metric Prefixes & Dimensional Analysis', description: 'Microliters to milliliters, nanograms to micrograms, and unit conversion canceling.', display_order: 4 },

  // Biochemistry & Molecular Biology (Domain 5)
  { id: 't5_1', domain_id: 'd5', name: 'Nucleic Acid Structure & Function', description: 'Phosphodiester bonds, antiparallel double helix, base pairing rules, and melting temp (Tm).', display_order: 1 },
  { id: 't5_2', domain_id: 'd5', name: 'Central Dogma & Protein Synthesis', description: 'Transcription, RNA processing, genetic code translation, and folding.', display_order: 2 },
  { id: 't5_3', domain_id: 'd5', name: 'Enzyme Kinetics & Denaturation', description: 'Substrate binding, active sites, optimal temperature/pH, and competitive inhibition.', display_order: 3 },

  // Regulation & Quality (Domain 6)
  { id: 't6_1', domain_id: 'd6', name: 'cGMP & GLP Guidelines', description: 'Current Good Manufacturing Practices, FDA CFR Title 21, and documentation rigor.', display_order: 1 },
  { id: 't6_2', domain_id: 'd6', name: 'Quality Assurance vs. Quality Control', description: 'Process-oriented QA, test-oriented QC, batch release, and deviation reporting.', display_order: 2 },
  { id: 't6_3', domain_id: 'd6', name: 'Standard Operating Procedures (SOPs)', description: 'Document control, revision history, deviations, and operator compliance.', display_order: 3 },

  // Standard Equipment (Domain 7)
  { id: 't7_1', domain_id: 'd7', name: 'Autoclave Operations & Validation', description: 'Steam under pressure, sterilization cycle parameters (121°C at 15 psi), and biological indicators.', display_order: 1 },
  { id: 't7_2', domain_id: 'd7', name: 'pH Meter Calibration & Care', description: 'Standard buffers (pH 4.0, 7.0, 10.0), slope calibration, electrode storage in 3M KCl.', display_order: 2 },
  { id: 't7_3', domain_id: 'd7', name: 'Centrifuges & Rotors', description: 'Balancing opposing tubes by weight, rotor inspection, and RCF nomograms.', display_order: 3 },

  // Experimental Design & Data Analysis (Domain 8)
  { id: 't8_1', domain_id: 'd8', name: 'Variables & Controls', description: 'Independent, dependent, controlled variables, positive controls, and vehicle blanks.', display_order: 1 },
  { id: 't8_2', domain_id: 'd8', name: 'Standard Curves & Linear Regression', description: 'Bradford assay standards, R-squared goodness of fit, and unknown interpolation.', display_order: 2 },
  { id: 't8_3', domain_id: 'd8', name: 'Data Integrity & Outlier Analysis', description: 'Accuracy vs. precision, standard deviation, error bars, and honest reporting.', display_order: 3 },
];

export const INITIAL_LESSONS: Lesson[] = ALL_LESSONS.map((les) => ({
  ...les,
  bench_modules: BACE_BENCH_MODULES[les.id] || les.bench_modules || [],
  lab_activities: BACE_LAB_ACTIVITIES[les.id] || les.lab_activities || [],
}));

export const INITIAL_QUESTIONS: Question[] = ALL_QUESTIONS;

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_pipette',
    name: 'Pipette Pro',
    description: 'Score 90% or higher on the Micropipetting mastery unit and complete 15 pipetting questions.',
    icon: 'Pipette',
    requirement_type: 'topic_mastery',
    requirement_value: 90,
  },
  {
    id: 'ach_dna',
    name: 'DNA Detective',
    description: 'Complete all lessons in Technical Skills & Applications and achieve 85% domain accuracy.',
    icon: 'Dna',
    requirement_type: 'domain_score',
    requirement_value: 85,
  },
  {
    id: 'ach_dilution',
    name: 'Dilution Master',
    description: 'Solve 10 consecutive serial dilution and C1V1 = C2V2 problems without an error.',
    icon: 'Calculator',
    requirement_type: 'streak',
    requirement_value: 10,
  },
  {
    id: 'ach_safety',
    name: 'Safety Specialist',
    description: 'Earn a 100% perfect score on the Safety & Workplace Culture domain assessment.',
    icon: 'ShieldAlert',
    requirement_type: 'perfect_domain',
    requirement_value: 100,
  },
  {
    id: 'ach_data',
    name: 'Data Analyst',
    description: 'Successfully interpret 10 experimental control and standard curve scenarios.',
    icon: 'BarChart3',
    requirement_type: 'questions_answered',
    requirement_value: 10,
  },
  {
    id: 'ach_equipment',
    name: 'Equipment Expert',
    description: 'Master autoclave parameters, pH calibration, and centrifuge balance protocols.',
    icon: 'Wrench',
    requirement_type: 'domain_score',
    requirement_value: 80,
  },
  {
    id: 'ach_quality',
    name: 'Quality Champion',
    description: 'Demonstrate zero-error understanding of cGMP, GDP, and SOP compliance.',
    icon: 'FileCheck2',
    requirement_type: 'topic_mastery',
    requirement_value: 90,
  },
  {
    id: 'ach_ready',
    name: 'BACE Ready',
    description: 'Achieve an overall composite readiness score of 80% or higher across all eight exam domains.',
    icon: 'Award',
    requirement_type: 'overall_readiness',
    requirement_value: 80,
  },
];

export const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: 'cls_biotech_1',
    name: 'Period 1 — PLTW Principles of Biomedical Science (PBS)',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 1',
    join_code: 'WAGNER101',
    created_at: '2025-08-15T00:00:00Z',
  },
  {
    id: 'cls_biotech_2',
    name: 'Period 2 — PLTW Medical Interventions & BACE Prep',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 2',
    join_code: 'WAGNER202',
    created_at: '2025-08-15T00:00:00Z',
  },
  {
    id: 'cls_biotech_3',
    name: 'Period 3 — PLTW Human Body Systems (HBS)',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 3',
    join_code: 'WAGNER303',
    created_at: '2025-08-15T00:00:00Z',
  },
  {
    id: 'cls_adv_biotech',
    name: 'Period 4 — Wagner CTE Advanced Biotechnology (BI Capstone)',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 4',
    join_code: 'WAGNER404',
    created_at: '2025-08-15T00:00:00Z',
  },
  {
    id: 'cls_biotech_5',
    name: 'Period 5 — PLTW Principles of Biomedical Science (Section B)',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 5',
    join_code: 'WAGNER505',
    created_at: '2025-08-15T00:00:00Z',
  },
  {
    id: 'cls_biotech_6',
    name: 'Period 6 — Wagner CTE Biotechnology Practicum & BACE Review',
    teacher_id: '',
    school_year: '2025-2026',
    period: 'Period 6',
    join_code: 'WAGNER606',
    created_at: '2025-08-15T00:00:00Z',
  },
];

export const INITIAL_TEACHERS: TeacherProfile[] = [];

export const INITIAL_STUDENTS_ROSTER: StudentOverview[] = [];

export const INITIAL_ASSIGNMENTS: Assignment[] = [];

export const INITIAL_ACTIVITY_SESSIONS: StudentActivitySession[] = [];

export const INITIAL_LESSON_GRADES: LessonGradeRecord[] = [];

