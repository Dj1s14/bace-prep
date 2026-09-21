export type PipetteModel = 'P20' | 'P200' | 'P1000';

export interface PipetteSpec {
  model: PipetteModel;
  name: string;
  minVolume: number; // in µL
  maxVolume: number; // in µL
  stepFine: number; // in µL
  stepCoarse: number; // in µL
  tipType: string;
  tipColor: string;
  colorBand: string;
  accuracyTolerance: string; // e.g. "±1.0% to ±3.0%"
  precisionTolerance: string; // e.g. "< 1.0% CV"
  digitSpecs: {
    digit1: { label: string; unit: string; color: 'black' | 'red'; max: number };
    digit2: { label: string; unit: string; color: 'black' | 'red'; max: number };
    digit3: { label: string; unit: string; color: 'black' | 'red'; max: number; hasTicks?: boolean };
  };
  dialDescription: string;
}

export type BenchMathCategory = 'dilution' | 'molarity' | 'percent' | 'serial';

export interface BenchMathProblem {
  id: string;
  category: BenchMathCategory;
  categoryTitle: string;
  title: string;
  scenario: string;
  question: string;
  targetUnit: string;
  correctAnswer: number;
  tolerance: number; // e.g. 0.05 for 5% or absolute
  formulaName: string;
  formulaLatex: string;
  givenVariables: { label: string; value: string }[];
  steps: {
    stepNumber: number;
    title: string;
    explanation: string;
    mathExpression: string;
  }[];
  practicalTip: string;
  baceCompetency: string;
}

export interface AuditErrorItem {
  id: string;
  lineNumber: number;
  fieldOrText: string;
  errorType: 
    | 'white_out_obliteration'
    | 'missing_asset_id'
    | 'missing_lot_or_expiry'
    | 'naked_decimal_ambiguous'
    | 'unsigned_undated_correction'
    | 'backdating'
    | 'pencil_non_indelible'
    | 'unaddressed_oos';
  errorTypeName: string;
  citation: string;
  regulatoryStandard: '21 CFR §58.35' | '21 CFR §211.68' | '21 CFR §211.84' | '21 CFR §58.105' | 'ALCOA+ Principle';
  remediation: string;
}

export interface AuditScenario {
  id: string;
  documentType: 'Batch Production Record (BPR)' | 'Calibration & Maintenance Log' | 'Research Notebook Page';
  documentId: string;
  title: string;
  facility: string;
  protocolSOP: string;
  overview: string;
  lines: {
    lineNumber: number;
    section: string;
    text: string;
    hasError: boolean;
    errorId?: string;
    handwritingStyle?: boolean;
    struckThrough?: boolean;
    whiteOutStyle?: boolean;
    initialsDate?: string;
    highlightReason?: string;
  }[];
  intentionalErrors: AuditErrorItem[];
}

export interface RubricCriterion {
  id: string;
  category: string;
  title: string;
  description: string;
  critical: boolean; // critical failure point if omitted
  baceStandard: string;
}

export interface PracticalRubricStation {
  id: string;
  stationNumber: number;
  title: string;
  timeLimitMinutes: number;
  purpose: string;
  requiredMaterials: string[];
  safetyPPE: string[];
  criteria: RubricCriterion[];
}

export type SpectroWavelength = 595 | 260 | 280 | 600 | number;

export interface StandardCurvePoint {
  id: string;
  concentration: number; // in µg/mL
  absorbance: number; // A
  label: string;
}

export interface DnaLadderBand {
  sizeBp: number;
  label: string;
  migrationMm: number;
  intensity?: 'high' | 'medium' | 'standard'; // e.g. 1000 bp or 3000 bp reference bands
}

export interface GelSampleLane {
  id: string;
  name: string;
  sampleType: 'ladder' | 'unknown' | 'plasmid_conformations';
  bands: {
    id: string;
    sizeBp?: number;
    migrationMm: number;
    label?: string;
    conformation?: 'supercoiled' | 'linear' | 'relaxed_nicked';
  }[];
}

export interface CentrifugeSlot {
  slotNumber: number;
  hasTube: boolean;
  tubeType?: 'sample' | 'balance';
  volumeUl?: number;
}
