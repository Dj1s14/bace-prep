import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  Check,
  XCircle,
  FileSpreadsheet,
  AlertOctagon,
  FileText,
  BadgeAlert,
  Scale,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface NotebookAuditTheoryLessonProps {
  onLaunchDrill?: () => void;
}

export const NotebookAuditTheoryLesson: React.FC<NotebookAuditTheoryLessonProps> = ({ onLaunchDrill }) => {
  const { benchStats, markBenchLessonComplete } = useApp?.() || {};
  const isCompleted = Boolean(benchStats?.lessonsCompleted?.['lesson_audit']);

  const [activeAlcoaKey, setActiveAlcoaKey] = useState<string>('A');

  const ALCOA_PRINCIPLES = [
    {
      letter: 'A',
      title: 'Attributable',
      tagline: 'Who performed the action, and who recorded it?',
      description:
        'Every single bench action, observation, instrument reading, or reagent addition must be traceable directly to the individual who executed it. This is guaranteed through unique signatures, printed initials, and date stamps.',
      regulatoryCFR: '21 CFR §58.105(a) & 21 CFR §211.194',
      compliantExample: 'Operator signs: "Dispensed 10.0 mL Buffer — J. Doe (JD), 15-SEP-2026 09:42 EST"',
      violationExample: 'Anonymous entries, shared passwords on digital scales, or signing a colleague’s initials.',
      baceDeduction: 'Critical Failure: Falsification of Attribution / Unauthorized Signatures.',
    },
    {
      letter: 'L',
      title: 'Legible',
      tagline: 'Can the data be clearly read throughout its lifecycle?',
      description:
        'Records must be permanently readable by anyone, including FDA field investigators 10 years later. Only permanent black or dark blue indelible ballpoint ink is permitted. Pencil, felt-tip markers that bleed, and erasable pens are strictly banned.',
      regulatoryCFR: '21 CFR §58.35(b) & ALCOA Guidance',
      compliantExample: 'Clean printed handwriting with leading decimals (e.g., "0.50 g" instead of ambiguous ".5 g").',
      violationExample: 'Using pencil, writing in margins, or scribbling numbers that could be mistaken (e.g. 1 vs 7).',
      baceDeduction: 'Major Defect: Illegible records or use of non-permanent media.',
    },
    {
      letter: 'C',
      title: 'Contemporaneous',
      tagline: 'Was the data recorded at the exact moment the work happened?',
      description:
        'Data must be recorded in real-time as the step is being executed—never reconstructed hours or days later from memory, and NEVER pre-recorded before the work is done. Pre-dating and back-dating are considered intentional fraud under federal law.',
      regulatoryCFR: '21 CFR §58.130(e) & 21 CFR §211.100',
      compliantExample: 'Recording balance readout immediately while standing at the scale.',
      violationExample: 'Jotting weights on a glove or paper towel to transfer into the official batch record later.',
      baceDeduction: 'Critical Failure: Back-dating or secondary transcription from unauthorized scratch paper.',
    },
    {
      letter: 'O',
      title: 'Original',
      tagline: 'Is this the primary, unaltered source record?',
      description:
        'The official laboratory notebook page or executed batch record is the legally recognized primary source. If an instrument outputs an automated thermal tape printout (spectrophotometer, analytical balance), the original printout must be taped in place and signed across the border.',
      regulatoryCFR: '21 CFR §211.180(d) & 21 CFR §58.190',
      compliantExample: 'Original thermal printout affixed with archival tape, signed and dated across the border.',
      violationExample: 'Photocopies substituted for lost raw data, or transcribing numbers without saving original tapes.',
      baceDeduction: 'Major Defect: Missing raw primary data.',
    },
    {
      letter: 'A2',
      title: 'Accurate',
      tagline: 'Is the data honest, truthful, and free of unrecorded edits?',
      description:
        'The record must reflect what actually occurred, including unexpected deviations, spills, or out-of-specification (OOS) readings. Any correction must follow strict Good Documentation Practice (GDP): a single line strike-through, initials, date, and reason code. Original data must NEVER be obscured.',
      regulatoryCFR: '21 CFR §58.105(c) & 21 CFR §211.68',
      compliantExample: 'Single strike: "~~12.45 g~~ 12.54 g JD 15-SEP-2026 (EE)" with original value readable.',
      violationExample: 'Using liquid correction fluid (Wite-Out), correction tape, erasures, or permanent marker blackout.',
      baceDeduction: 'Zero Tolerance: Use of correction fluid or obliteration is an automatic exam failure.',
    },
  ];

  const currentPrinciple = ALCOA_PRINCIPLES.find((p) => p.letter === activeAlcoaKey) || ALCOA_PRINCIPLES[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-purple-800/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <FileCheck2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Good Laboratory & Manufacturing Practice (GLP / cGMP)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              GLP / GMP Notebook Audits, ALCOA+ & Documentation Integrity
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Understand the federal regulatory framework governing scientific records (21 CFR Part 58 & Part 211), standard error correction codes, and how to spot documentation audit traps on the BACE.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center shrink-0">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_audit', !isCompleted)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Lesson Certified Complete</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mark Lesson as Complete</span>
                </>
              )}
            </button>

            {onLaunchDrill && (
              <button
                onClick={onLaunchDrill}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Launch Audit Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: ALCOA+ Interactive Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              1. The ALCOA+ Data Integrity Framework
            </h3>
            <p className="text-xs text-slate-500">
              The foundational standard required by the FDA, Biotility, and global biopharma quality assurance teams.
            </p>
          </div>
        </div>

        {/* ALCOA Key Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ALCOA_PRINCIPLES.map((principle) => {
            const active = activeAlcoaKey === principle.letter;
            return (
              <button
                key={principle.letter}
                onClick={() => setActiveAlcoaKey(principle.letter)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`text-lg font-black ${active ? 'text-purple-300' : 'text-purple-700'}`}>
                  {principle.letter === 'A2' ? 'A (Accurate)' : principle.letter}
                </div>
                <div className="text-xs font-bold truncate">{principle.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active ALCOA Principle Detail Card */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 font-mono">
                {currentPrinciple.regulatoryCFR}
              </span>
              <h4 className="text-xl font-black text-slate-900">{currentPrinciple.title}</h4>
              <p className="text-xs text-slate-600 font-medium">{currentPrinciple.tagline}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold self-start">
              FDA Compliance Pillar
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {currentPrinciple.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Compliant Laboratory Practice</span>
              </span>
              <p className="text-emerald-950 font-mono text-[11px] leading-relaxed">
                {currentPrinciple.compliantExample}
              </p>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs space-y-1">
              <span className="font-bold text-rose-900 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Audit Citation Violation</span>
              </span>
              <p className="text-rose-950 font-mono text-[11px] leading-relaxed">
                {currentPrinciple.violationExample}
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>BACE Exam Consequence: </strong>
              <span>{currentPrinciple.baceDeduction}</span>
            </div>
          </div>
        </div>

        {/* ALCOA+ Extension Banner */}
        <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs space-y-2">
          <span className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-teal-400" />
            The "+" in ALCOA+: Complete, Consistent, Enduring & Available
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-300 pt-1">
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <strong className="text-white block mb-0.5">Complete</strong>
              No torn pages; all attachments, repeats, and metadata preserved.
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <strong className="text-white block mb-0.5">Consistent</strong>
              Strict chronological dates; time stamps without contradictions.
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <strong className="text-white block mb-0.5">Enduring</strong>
              Archival-grade paper, bound pages, permanent ballpoint ink.
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <strong className="text-white block mb-0.5">Available</strong>
              Quickly retrievable for internal QA reviews and FDA audits.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Good Documentation Practice (GDP) Rules */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              2. Standard Good Documentation Practice (GDP) Rules
            </h3>
            <p className="text-xs text-slate-500">
              The exact mechanical protocol for handling errors, blank spaces, and signatures.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Rule 1: Single Line Strike */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h5 className="font-bold text-slate-900 text-sm">The Single-Line Strike Rule</h5>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When an erroneous entry is made in a batch record or notebook, draw <strong>EXACTLY ONE</strong> neat horizontal line through the error. The original mistaken text MUST remain 100% legible beneath the line.
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-center">
              Correct: <span className="line-through text-slate-400">12.50 mL</span> 15.20 mL JD 15-SEP-26 EE
            </div>
          </div>

          {/* Rule 2: Three Required Correction Elements */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h5 className="font-bold text-slate-900 text-sm">Initials, Date & Reason Code</h5>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Every strike-through must be immediately accompanied by:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-1 font-mono text-[11px]">
              <li><strong>Author Initials:</strong> Who made the correction (e.g. "JD")</li>
              <li><strong>Date:</strong> Current date (e.g. "15-SEP-2026")</li>
              <li><strong>Reason Code:</strong> e.g., <em>EE</em> (Entry Error), <em>CE</em> (Calculation Error), <em>TE</em> (Transposition Error), <em>CR</em> (Clarification)</li>
            </ul>
          </div>

          {/* Rule 3: Prohibited Obliteration */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h5 className="font-bold text-rose-900 text-sm">Strictly Prohibited Corrections</h5>
            </div>
            <p className="text-rose-800 leading-relaxed">
              The following are considered severe regulatory violations resulting in product quarantine or audit failure:
            </p>
            <ul className="list-disc list-inside text-rose-900 space-y-1 text-[11px]">
              <li>Liquid correction fluid (Wite-Out) or correction tape</li>
              <li>Scribbling out or black marker obliteration</li>
              <li>Erasing or using erasable pen inks</li>
              <li>Tearing out, replacing, or hiding notebook pages</li>
            </ul>
          </div>

          {/* Rule 4: The Z-Slash Rule */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h5 className="font-bold text-slate-900 text-sm">The "Z-Slash" for Blank Spaces</h5>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Never leave blank lines, unused rows in a table, or empty page bottoms. Draw a diagonal line or "Z" across the empty area, then sign and date it ("N/A JD 15-SEP-2026"). This prevents unauthorized retroactive additions to signed records.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Second-Person Verification & 21 CFR §58 Sign-Offs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              3. Second-Person Verification & Equipment Line Clearance
            </h3>
            <p className="text-xs text-slate-500">
              Mandatory dual sign-offs for critical process steps under 21 CFR Part 211.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">1. Critical Raw Weighings</strong>
            <p className="text-slate-600">
              Whenever measuring active pharmaceutical ingredients (API) or hazardous reagents, a second qualified technician must independently verify the balance calibration, tare, and weight display, signing "Verified By: [Initials] [Date]".
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">2. Equipment Line Clearance</strong>
            <p className="text-slate-600">
              Before starting a new batch, verify the workstation has been cleared of all previous reagents, labels, and products to prevent cross-contamination. Record room number, asset IDs, and calibration due dates.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 block font-bold">3. Lot Numbers & Expiration Dates</strong>
            <p className="text-slate-600">
              Never record just "Tris Base" or "Ethanol". You must document the manufacturer, specific Lot Number (e.g. Lot #24A910), and Expiration Date. Using expired reagents is a major non-conformance.
            </p>
          </div>
        </div>

        {/* Lesson Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Lesson completed! You are ready to audit executed Batch Production Records in the Challenge mode.
              </span>
            ) : (
              <span>Review all GDP rules carefully before taking the Notebook Audit Challenge.</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_audit', !isCompleted)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
              }`}
            >
              {isCompleted ? 'Unmark Completion' : '✓ Mark Lesson as Complete'}
            </button>

            {onLaunchDrill && (
              <button
                onClick={onLaunchDrill}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>Audit Batch Records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
