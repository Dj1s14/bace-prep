import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Search,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Award,
  ChevronRight,
  Info,
  BadgeAlert,
  FileSpreadsheet,
  FileText,
  AlertOctagon,
} from 'lucide-react';
import { AuditScenario, AuditErrorItem } from './types';
import { useApp } from '../../context/AppContext';

export const AUDIT_SCENARIOS: AuditScenario[] = [
  {
    id: 'bpr_tae_buffer',
    documentType: 'Batch Production Record (BPR)',
    documentId: 'BPR-2026-042',
    title: 'Preparation & QC of 1000 mL 50X TAE Running Buffer',
    facility: 'BioPharma Core cGMP Reagent Facility (Room 204)',
    protocolSOP: 'SOP-BUF-014 Rev. 4: Preparation of Concentrated Electrophoresis Buffers',
    overview:
      'Perform a QA/QC documentation audit on this executed batch record. Flag all violations of Good Documentation Practices (GDP), 21 CFR Part 211, and ALCOA+ data integrity rules before QA release.',
    lines: [
      {
        lineNumber: 1,
        section: '1.0 Header & Authorizations',
        text: 'Batch Number: BACE-TAE-202609-A | Target Volume: 1000 mL | Start Date: 09/14/2026',
        hasError: false,
      },
      {
        lineNumber: 2,
        section: '2.0 Reagent Dispensing',
        text: 'Tris Base (MW 121.14): Target 242.0 g | Lot #TRIS-9921 Exp: 12/2028 | Actual: 242.05 g [Verified by: JD]',
        hasError: false,
      },
      {
        lineNumber: 3,
        section: '2.0 Reagent Dispensing',
        text: 'Disodium EDTA Dihydrate (MW 372.24): Target 18.61 g | Lot #EDTA-4401 Exp: 05/2027 | Actual: .50 g weighed out',
        hasError: true,
        errorId: 'err_naked_decimal',
        highlightReason: 'Naked decimal without leading zero (.50 g instead of 0.50 g) and incorrect target weight',
      },
      {
        lineNumber: 4,
        section: '2.0 Reagent Dispensing',
        text: 'Equipment: Analytical Top-Loading Balance | Asset ID: BAL-04 (Cal Due: 11/15/2026) | Zero/Tare verified: Yes',
        hasError: false,
      },
      {
        lineNumber: 5,
        section: '3.0 Liquid Additions',
        text: 'Glacial Acetic Acid: Target 57.1 mL | Lot #: [BLANK - NOT RECORDED] | Exp Date: [BLANK] | Actual: 57.1 mL added',
        hasError: true,
        errorId: 'err_missing_lot',
        highlightReason: 'Missing raw material lot number and expiration date (Traceability failure)',
      },
      {
        lineNumber: 6,
        section: '4.0 Dissolution & pH',
        text: 'Dissolved in 800 mL DI Water on magnetic stir plate. Stir bar Asset: MAG-12.',
        hasError: false,
      },
      {
        lineNumber: 7,
        section: '4.0 Dissolution & pH',
        text: 'Initial pH measured at 25°C: 8.54 [NUMBER OBLITERATED WITH WHITE-OUT FLUID] -> re-typed as 8.31',
        hasError: true,
        errorId: 'err_white_out',
        whiteOutStyle: true,
        highlightReason: 'Use of correction fluid / obliteration hiding original value (ALCOA+ violation)',
      },
      {
        lineNumber: 8,
        section: '4.0 Dissolution & pH',
        text: 'pH Meter Asset ID: Lab pH Meter on bench 3 (Calibration expired 08/2026)',
        hasError: true,
        errorId: 'err_missing_asset_cal',
        highlightReason: 'Vague asset ID without valid calibration status (Expired equipment calibration)',
      },
      {
        lineNumber: 9,
        section: '5.0 Quantum Satis & Sterilization',
        text: 'Volume brought to 1000 mL graduation mark in 1000 mL Pyrex Class A volumetric flask (Asset VF-1000-02).',
        hasError: false,
      },
      {
        lineNumber: 10,
        section: '6.0 Final Packaging & Signatures',
        text: 'Dispensed into 1 L amber bottles. Filter sterilized through 0.22 µm PES membrane.',
        hasError: false,
      },
      {
        lineNumber: 11,
        section: '6.0 Final Packaging & Signatures',
        text: 'Technician Signature: M. Rodriguez | Signed: 09/10/2026 (Batch was performed on 09/14/2026)',
        hasError: true,
        errorId: 'err_backdating',
        highlightReason: 'Backdating error: signature date predates the batch execution date (Severe CFR violation)',
      },
    ],
    intentionalErrors: [
      {
        id: 'err_naked_decimal',
        lineNumber: 3,
        fieldOrText: 'Actual: .50 g weighed out',
        errorType: 'naked_decimal_ambiguous',
        errorTypeName: 'Naked Decimal Point (Missing Leading Zero)',
        citation: '21 CFR §211.68 & USP General Chapter <1029>',
        regulatoryStandard: '21 CFR §211.68',
        remediation:
          'Values less than 1 must always be written with a leading zero (e.g., "0.50 g", not ".50 g"). A stray pencil mark or photocopy artifact can lead to a 10x or 100x dosing/reagent error.',
      },
      {
        id: 'err_missing_lot',
        lineNumber: 5,
        fieldOrText: 'Lot #: [BLANK - NOT RECORDED] | Exp Date: [BLANK]',
        errorType: 'missing_lot_or_expiry',
        errorTypeName: 'Missing Reagent Lot Number & Expiration Date',
        citation: '21 CFR §211.84(d) Component Testing & Traceability',
        regulatoryStandard: '21 CFR §211.84',
        remediation:
          'All components used in GMP formulation must have their manufacturer lot number and expiration date recorded to ensure backward and forward traceability.',
      },
      {
        id: 'err_white_out',
        lineNumber: 7,
        fieldOrText: '[NUMBER OBLITERATED WITH WHITE-OUT FLUID]',
        errorType: 'white_out_obliteration',
        errorTypeName: 'Correction Fluid / Obliteration of Original Data',
        citation: '21 CFR §58.35 & ALCOA+ Data Integrity Principles',
        regulatoryStandard: '21 CFR §58.35',
        remediation:
          'Never use white-out, correction tape, or heavy cross-outs. Corrections must be made with a single strikethrough so the original value remains legible, accompanied by the reason code, date, and initials of the person making the change.',
      },
      {
        id: 'err_missing_asset_cal',
        lineNumber: 8,
        fieldOrText: 'Lab pH Meter on bench 3 (Calibration expired 08/2026)',
        errorType: 'missing_asset_id',
        errorTypeName: 'Use of Out-of-Calibration / Unidentified Equipment',
        citation: '21 CFR §58.105 & §211.160 Equipment Calibration',
        regulatoryStandard: '21 CFR §58.105',
        remediation:
          'Equipment must be identified by unique calibrated asset ID (e.g., PHM-012) with active calibration status. Results gathered on uncalibrated instruments are legally void.',
      },
      {
        id: 'err_backdating',
        lineNumber: 11,
        fieldOrText: 'Signed: 09/10/2026 for work executed on 09/14/2026',
        errorType: 'backdating',
        errorTypeName: 'Backdating of Regulatory Signatures (Data Integrity Breach)',
        citation: 'ALCOA+ Principle: Contemporaneous Documentation',
        regulatoryStandard: 'ALCOA+ Principle',
        remediation:
          'Records must be signed contemporaneously (at the time the activity occurs). Backdating or pre-dating is a severe regulatory finding and federal compliance violation.',
      },
    ],
  },
  {
    id: 'log_pipette_cal',
    documentType: 'Calibration & Maintenance Log',
    documentId: 'LOG-PIP-8891',
    title: 'Gravimetric Pipette Calibration Verification (Quarterly)',
    facility: 'Quality Assurance Testing Laboratory',
    protocolSOP: 'SOP-MET-008: Gravimetric Verification of Single-Channel Pipettes',
    overview:
      'Audit this quarterly calibration check for three micropipettes (P20, P200, P1000). Verify adherence to gravimetric testing, balance stability, and out-of-specification reporting.',
    lines: [
      {
        lineNumber: 1,
        section: '1.0 Instrument Identification',
        text: 'Pipette Model: P200 | Serial Number: SN-2024-998 | Nominal Range: 20–200 µL',
        hasError: false,
      },
      {
        lineNumber: 2,
        section: '2.0 Environmental & Metrology Conditions',
        text: 'Test Liquid: High-purity Milli-Q Water | Water Temp: 20.0°C | Z-factor: 1.0029 µL/mg',
        hasError: false,
      },
      {
        lineNumber: 3,
        section: '2.0 Environmental & Metrology Conditions',
        text: 'Analytical Balance Asset: BAL-01 | Draft shield doors left open during weighing cycle',
        hasError: true,
        errorId: 'err_draft_shield',
        highlightReason: 'Draft shield left open on 4-place microbalance, invalidating gravimetric readings',
      },
      {
        lineNumber: 4,
        section: '3.0 10 Replicate Weighings (Target: 200 µL)',
        text: 'Runs 1–5 (mg): 199.2, 199.5, 198.8, 199.1, 199.4 [All within tolerance]',
        hasError: false,
      },
      {
        lineNumber: 5,
        section: '3.0 10 Replicate Weighings (Target: 200 µL)',
        text: 'Run 6: Written as ~199 mg (Tilde symbol used, approximation in analytical log)',
        hasError: true,
        errorId: 'err_approx_symbol',
        highlightReason: 'Approximations and non-definitive symbols (~, approx) are forbidden in GMP records',
      },
      {
        lineNumber: 6,
        section: '4.0 Statistical Analysis',
        text: 'Mean Volume: 199.4 µL | Calculated Inaccuracy (E%): -0.30% (Pass limit ≤ ±0.8%)',
        hasError: false,
      },
      {
        lineNumber: 7,
        section: '5.0 Low Volume Check (Target: 20 µL)',
        text: 'Run 1: 18.2 mg | Run 2: 18.0 mg | Inaccuracy E% = -9.0% (Limit is ±2.5%) -> Passed without investigation',
        hasError: true,
        errorId: 'err_unaddressed_oos',
        highlightReason: 'Failure marked as "Passed" with no Out-of-Specification (OOS) deviation or investigation',
      },
      {
        lineNumber: 8,
        section: '6.0 Review & Authorization',
        text: 'Change to Run 3 made with single strikethrough, but missing reviewer initials and date',
        hasError: true,
        errorId: 'err_unsigned_correction',
        highlightReason: 'Unattributed and undated correction (Violation of 21 CFR §58.35)',
      },
    ],
    intentionalErrors: [
      {
        id: 'err_draft_shield',
        lineNumber: 3,
        fieldOrText: 'Draft shield doors left open during weighing cycle',
        errorType: 'unaddressed_oos',
        errorTypeName: 'Severe Environmental Violation (Air Currents on Microbalance)',
        citation: 'ISO 8655-6 & 21 CFR §58.105',
        regulatoryStandard: '21 CFR §58.105',
        remediation:
          'When weighing volumes with an analytical balance (resolution 0.0001 g or 0.00001 g), draft shield glass must always be closed to prevent air convection currents from biasing measurements.',
      },
      {
        id: 'err_approx_symbol',
        lineNumber: 5,
        fieldOrText: 'Written as ~199 mg',
        errorType: 'naked_decimal_ambiguous',
        errorTypeName: 'Ambiguous Approximation in Quantitative Record',
        citation: 'Good Documentation Practices (GDP) & ALCOA+ Accurate',
        regulatoryStandard: 'ALCOA+ Principle',
        remediation:
          'Exact instrument readings must be recorded. Never use approximations (~, approx, roughly) in analytical test logs.',
      },
      {
        id: 'err_unaddressed_oos',
        lineNumber: 7,
        fieldOrText: 'Inaccuracy E% = -9.0% -> Passed without investigation',
        errorType: 'unaddressed_oos',
        errorTypeName: 'Unaddressed Out-of-Specification (OOS) Result',
        citation: '21 CFR §211.192 Production Record Review & OOS Investigations',
        regulatoryStandard: '21 CFR §211.84',
        remediation:
          'When an instrument or batch fails acceptance criteria, testing must halt and a formal OOS / Non-Conformance Investigation (NCI) must be initiated. Technicians cannot arbitrarily pass out-of-spec instruments.',
      },
      {
        id: 'err_unsigned_correction',
        lineNumber: 8,
        fieldOrText: 'Single strikethrough missing reviewer initials and date',
        errorType: 'unsigned_undated_correction',
        errorTypeName: 'Unattributed & Undated Correction',
        citation: '21 CFR §58.35 & ALCOA+ Attributable',
        regulatoryStandard: '21 CFR §58.35',
        remediation:
          'Every correction on a GxP record must bear the initials of the person making the change, the date of correction, and a reason code.',
      },
    ],
  },
  {
    id: 'nb_transformation',
    documentType: 'Research Notebook Page',
    documentId: 'NB-412-P14',
    title: 'Bacterial Transformation & Heat-Shock Protocol',
    facility: 'Molecular Biology Research & Development Lab',
    protocolSOP: 'R&D Protocol 04: Chemical Competent Cell Heat Shock',
    overview:
      'Review this experimental notebook entry documenting a calcium chloride heat-shock transformation with pGLO plasmid. Identify research compliance errors.',
    lines: [
      {
        lineNumber: 1,
        section: 'Header',
        text: 'Project: GFP Expression Assay | Date: 09/14/2026 | Operator: A. Patel',
        hasError: false,
      },
      {
        lineNumber: 2,
        section: 'Materials & Media',
        text: 'Entry written in #2 lead pencil on loose notebook sheet inserted into binder',
        hasError: true,
        errorId: 'err_pencil',
        highlightReason: 'Written in pencil instead of indelible ink, and on loose paper instead of bound numbered notebook',
      },
      {
        lineNumber: 3,
        section: 'Cell Thawing',
        text: 'E. coli HB101 competent cells thawed on ice for 10 minutes. 50 µL aliquoted to Tube A (+pGLO) and Tube B (-pGLO).',
        hasError: false,
      },
      {
        lineNumber: 4,
        section: 'DNA Addition & Controls',
        text: '10 µL of pGLO plasmid (0.08 µg/µL) added to Tube A. No DNA added to negative control Tube B.',
        hasError: false,
      },
      {
        lineNumber: 5,
        section: 'Heat Shock Step',
        text: 'Water bath incubated at 42 for 50 seconds (Units omitted: no °C written)',
        hasError: true,
        errorId: 'err_omitted_unit',
        highlightReason: 'Omission of temperature units (42 without °C or measurement unit)',
      },
      {
        lineNumber: 6,
        section: 'Recovery Period',
        text: '250 µL LB nutrient broth added. Incubated at 37°C in shaking incubator for 45 minutes.',
        hasError: false,
      },
      {
        lineNumber: 7,
        section: 'Plating & Sign-Off',
        text: '100 µL spread onto LB/amp and LB/amp/ara plates. Bottom of page left blank with no witness or reviewer signature.',
        hasError: true,
        errorId: 'err_missing_witness',
        highlightReason: 'Missing witness / supervisor review signature on experimental notebook page',
      },
    ],
    intentionalErrors: [
      {
        id: 'err_pencil',
        lineNumber: 2,
        fieldOrText: 'Entry written in #2 lead pencil on loose notebook sheet',
        errorType: 'pencil_non_indelible',
        errorTypeName: 'Use of Pencil & Loose Paper in Laboratory Notebook',
        citation: '21 CFR §58.35 & ALCOA+ Original / Permanent',
        regulatoryStandard: '21 CFR §58.35',
        remediation:
          'Laboratory notebooks must be bound volumes with pre-numbered pages. All entries must be made in permanent indelible black or blue ballpoint ink so that data cannot be erased or tampered with.',
      },
      {
        id: 'err_omitted_unit',
        lineNumber: 5,
        fieldOrText: 'Water bath incubated at 42 for 50 seconds',
        errorType: 'naked_decimal_ambiguous',
        errorTypeName: 'Omission of Critical Measurement Unit (°C)',
        citation: '21 CFR §211.68 & USP <1029>',
        regulatoryStandard: '21 CFR §211.68',
        remediation:
          'All scientific parameters must have their engineering or scientific units explicitly stated (e.g. 42°C, 50 s). Omitted units create unacceptable ambiguity.',
      },
      {
        id: 'err_missing_witness',
        lineNumber: 7,
        fieldOrText: 'Bottom of page left blank with no witness or reviewer signature',
        errorType: 'unsigned_undated_correction',
        errorTypeName: 'Omission of Witness / Quality Review Signature',
        citation: 'ALCOA+ Principle: Attributable & Contemporaneous',
        regulatoryStandard: 'ALCOA+ Principle',
        remediation:
          'To establish intellectual property rights and verify compliance, all notebook pages must be signed and dated by the author, and countersigned by a witness who understood the work ("Read and understood by:").',
      },
    ],
  },
];

const ERROR_CATEGORY_OPTIONS = [
  { id: 'white_out_obliteration', label: 'White-Out Fluid / Data Obliteration' },
  { id: 'missing_asset_id', label: 'Missing Equipment Asset ID / Expired Calibration' },
  { id: 'missing_lot_or_expiry', label: 'Missing Reagent Lot # or Expiry Date' },
  { id: 'naked_decimal_ambiguous', label: 'Naked Decimal Point or Omitted/Ambiguous Units' },
  { id: 'unsigned_undated_correction', label: 'Unattributed / Undated Correction or Missing Witness' },
  { id: 'backdating', label: 'Backdating or Pre-dating of Signatures' },
  { id: 'pencil_non_indelible', label: 'Pencil / Non-Indelible Ink / Loose Sheet' },
  { id: 'unaddressed_oos', label: 'Unaddressed Out-of-Specification (OOS) Result' },
];

export const NotebookAuditChallenge: React.FC = () => {
  const { recordBenchActivity } = useApp?.() || {};

  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const scenario = AUDIT_SCENARIOS[activeScenarioIndex];

  // Selected line for inspection
  const [inspectedLineNumber, setInspectedLineNumber] = useState<number | null>(null);
  const [selectedErrorCategory, setSelectedErrorCategory] = useState<string>('');

  // Flagged errors by candidate: record of lineNumber -> chosen error category
  const [candidateFlags, setCandidateFlags] = useState<Record<number, string>>({});

  // Audit submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showAlcoaKey, setShowAlcoaKey] = useState<boolean>(false);

  const inspectedLine = scenario.lines.find((l) => l.lineNumber === inspectedLineNumber);

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIndex(idx);
    setInspectedLineNumber(null);
    setSelectedErrorCategory('');
    setCandidateFlags({});
    setIsSubmitted(false);
  };

  const handleFlagLine = () => {
    if (!inspectedLineNumber || !selectedErrorCategory) return;
    setCandidateFlags((prev) => ({
      ...prev,
      [inspectedLineNumber]: selectedErrorCategory,
    }));
    setInspectedLineNumber(null);
    setSelectedErrorCategory('');
  };

  const handleUnflagLine = (lineNum: number) => {
    setCandidateFlags((prev) => {
      const next = { ...prev };
      delete next[lineNum];
      return next;
    });
  };

  // Submit Audit Evaluation
  const handleSubmitAudit = () => {
    setIsSubmitted(true);

    // Calculate score
    const totalErrors = scenario.intentionalErrors.length;
    let correctlyIdentified = 0;
    let falsePositives = 0;

    Object.entries(candidateFlags).forEach(([lineStr, chosenCategory]) => {
      const lineNum = parseInt(lineStr, 10);
      const matchedErr = scenario.intentionalErrors.find((e) => e.lineNumber === lineNum);

      if (matchedErr) {
        if (matchedErr.errorType === chosenCategory) {
          correctlyIdentified += 1;
        } else {
          // Flagged correct line, partial category
          correctlyIdentified += 0.5;
        }
      } else {
        falsePositives += 1;
      }
    });

    const passed = correctlyIdentified >= totalErrors * 0.75 && falsePositives <= 1;
    recordBenchActivity?.(
      'audit',
      correctlyIdentified,
      totalErrors,
      `Audited ${scenario.documentId}: ${correctlyIdentified}/${totalErrors} found (${passed ? 'PASS' : 'RETRY'})`
    );
  };

  // Stats calculation
  const totalErrors = scenario.intentionalErrors.length;
  let correctCount = 0;
  let falsePositiveCount = 0;

  if (isSubmitted) {
    Object.entries(candidateFlags).forEach(([lineStr, chosenCategory]) => {
      const lineNum = parseInt(lineStr, 10);
      const matchedErr = scenario.intentionalErrors.find((e) => e.lineNumber === lineNum);
      if (matchedErr) {
        if (matchedErr.errorType === chosenCategory) correctCount += 1;
        else correctCount += 0.5;
      } else {
        falsePositiveCount += 1;
      }
    });
  }

  const isPassed = isSubmitted && correctCount >= totalErrors * 0.75 && falsePositiveCount <= 1;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
              GLP / GMP Compliance
            </span>
            <span className="text-xs text-slate-500 font-medium">21 CFR §58 & §211</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Laboratory Notebook & BPR Audit Challenge</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Step into the role of a Quality Assurance (QA) auditor. Inspect authentic simulated batch production records, equipment logs, and laboratory notebooks for Good Documentation Practices (GDP) and ALCOA+ violations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAlcoaKey(!showAlcoaKey)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 transition-colors cursor-pointer ${
              showAlcoaKey ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ALCOA+ Key</span>
          </button>
        </div>
      </div>

      {/* ALCOA+ Educational Reference Banner */}
      {showAlcoaKey && (
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 text-xs text-purple-950 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-purple-200">
            <h3 className="font-bold text-purple-900 text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>ALCOA+ Data Integrity Principles (FDA 21 CFR §211 / §58)</span>
            </h3>
            <span className="text-[11px] font-semibold text-purple-700">Audit Standards</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block text-xs">Attributable (A)</span>
              <span className="text-[11px] text-slate-600 mt-0.5 block">
                Who performed the work and signed/dated? Never initial for someone else.
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block text-xs">Legible (L)</span>
              <span className="text-[11px] text-slate-600 mt-0.5 block">
                Can entries be read years later? No white-out fluid, scribbles, or pencil.
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block text-xs">Contemporaneous (C)</span>
              <span className="text-[11px] text-slate-600 mt-0.5 block">
                Recorded at the exact time the step occurred. No backdating or pre-dating.
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block text-xs">Original (O)</span>
              <span className="text-[11px] text-slate-600 mt-0.5 block">
                First recording on bound notebook or official record, not scraps of scrap paper.
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block text-xs">Accurate (A)</span>
              <span className="text-[11px] text-slate-600 mt-0.5 block">
                Truthful, free of errors, using verified calibrated instruments and units.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AUDIT_SCENARIOS.map((s, idx) => {
          const active = activeScenarioIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                active
                  ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded">
                  {s.documentType}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{s.documentId}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{s.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{s.overview}</p>
            </button>
          );
        })}
      </div>

      {/* Main Audit Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Document Inspection Paper (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4 font-mono text-xs">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Official Quality Record
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans">{scenario.title}</h3>
              <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                {scenario.facility} • {scenario.protocolSOP}
              </div>
            </div>
            <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Status</span>
              <span className="text-xs font-bold text-amber-700 font-sans">Under QA Audit</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-sans italic">
            Click on any line to flag a GDP violation or review regulatory evidence.
          </div>

          {/* Interactive Document Lines */}
          <div className="space-y-2 font-mono">
            {scenario.lines.map((line) => {
              const isInspected = inspectedLineNumber === line.lineNumber;
              const flaggedCategory = candidateFlags[line.lineNumber];
              const isFlagged = Boolean(flaggedCategory);

              return (
                <div
                  key={line.lineNumber}
                  onClick={() => !isSubmitted && setInspectedLineNumber(line.lineNumber)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isInspected
                      ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-400/30'
                      : isFlagged
                      ? 'border-amber-400 bg-amber-50/60'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <span className="text-slate-400 select-none font-mono text-[11px] shrink-0 w-6">
                        {String(line.lineNumber).padStart(2, '0')}.
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-sans">
                          {line.section}
                        </span>
                        <div
                          className={`text-slate-900 text-xs font-medium leading-relaxed ${
                            line.whiteOutStyle ? 'bg-amber-100/70 px-1 py-0.5 rounded' : ''
                          }`}
                        >
                          {line.text}
                        </div>
                      </div>
                    </div>

                    {/* Flagged indicator chip */}
                    {isFlagged && (
                      <div className="shrink-0 flex items-center space-x-1 bg-amber-200/80 text-amber-900 border border-amber-300 px-2 py-0.5 rounded text-[10px] font-sans font-bold">
                        <AlertTriangle className="w-3 h-3 text-amber-700" />
                        <span>Flagged</span>
                        {!isSubmitted && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnflagLine(line.lineNumber);
                            }}
                            className="ml-1 text-amber-800 hover:text-amber-950 font-bold"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submission Evaluation Overlay */}
                  {isSubmitted && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 font-sans text-xs">
                      {line.hasError ? (
                        <div className="flex items-start space-x-2 text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">True Compliance Finding:</span>
                            <span>{line.highlightReason}</span>
                          </div>
                        </div>
                      ) : isFlagged ? (
                        <div className="flex items-start space-x-2 text-rose-800 bg-rose-50/80 p-2 rounded-lg border border-rose-200">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">False Positive:</span>
                            <span>This line complies with Good Documentation Practices.</span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs font-sans text-slate-500">
              Total Flagged Violations: <strong>{Object.keys(candidateFlags).length}</strong> / {totalErrors} Expected
            </span>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAudit}
                disabled={Object.keys(candidateFlags).length === 0}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold font-sans rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Submit QA Audit Report</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSelectScenario(activeScenarioIndex)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-sans rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-Audit Document</span>
              </button>
            )}
          </div>
        </div>

        {/* Audit Inspector Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Inspection Modal / Card */}
          {inspectedLine && !isSubmitted && (
            <div className="bg-white rounded-2xl p-5 border-2 border-purple-500 shadow-md space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-purple-900 flex items-center space-x-1.5">
                  <Search className="w-3.5 h-3.5 text-purple-600" />
                  <span>Inspect Line #{inspectedLine.lineNumber}</span>
                </span>
                <button
                  onClick={() => setInspectedLineNumber(null)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                {inspectedLine.text}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Violation Category:
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {ERROR_CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedErrorCategory(opt.id)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors cursor-pointer border ${
                        selectedErrorCategory === opt.id
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleFlagLine}
                disabled={!selectedErrorCategory}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Flag This Violation</span>
              </button>
            </div>
          )}

          {/* Audit Scoring & Final Regulatory Feedback */}
          {isSubmitted && (
            <div
              className={`rounded-2xl p-5 border-2 shadow-xs space-y-4 ${
                isPassed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-start space-x-3">
                {isPassed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertOctagon className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-base">
                    {isPassed ? 'Audit Passed (QA Certification Valid)' : 'Audit Remediation Needed'}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    Identified <strong>{correctCount}</strong> of <strong>{totalErrors}</strong> true violations with{' '}
                    <strong>{falsePositiveCount}</strong> false alarms.
                  </p>
                </div>
              </div>

              {/* Detailed Regulatory Citations Breakdown */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block text-xs border-b pb-1">
                  Required Regulatory Remediations:
                </span>
                {scenario.intentionalErrors.map((err) => (
                  <div key={err.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-purple-900">Line {err.lineNumber}:</span>
                      <span className="font-semibold text-slate-800">{err.errorTypeName}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{err.remediation}</p>
                    <span className="text-[10px] font-mono text-purple-700 block">
                      Ref: {err.citation} ({err.regulatoryStandard})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Auditor Field Guide Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>BACE GDP Golden Rules</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li>
                • <strong>Single Strikethrough Only:</strong> Draw one straight line through errors so the initial entry remains legible. Add date, initials, and reason.
              </li>
              <li>
                • <strong>Leading Zero Mandate:</strong> Never write <code>.25</code>; always write <code>0.25</code> to eliminate tenfold reading errors.
              </li>
              <li>
                • <strong>No Backdating:</strong> Every signature must reflect the exact calendar timestamp when the pen touched the paper.
              </li>
              <li>
                • <strong>Indelible Blue or Black Ink:</strong> Pencil, erasable pens, or colored gel inks are prohibited in GLP/GMP environments.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
