import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  FlaskConical,
  Target,
  ChevronRight,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import {
  AdaptiveMasteryLesson,
  MasteryCompetency,
  MasteryItem,
  CompetencyAttemptRecord
} from '../../types/mastery';
import { useApp } from '../../context/AppContext';

interface AdaptiveMasteryModuleProps {
  masteryLesson: AdaptiveMasteryLesson;
  onExit?: () => void;
}

export const AdaptiveMasteryModule: React.FC<AdaptiveMasteryModuleProps> = ({
  masteryLesson,
  onExit,
}) => {
  const {
    recordLessonGrade,
    recordLessonCompletion,
    selectedLessonId,
    currentStudent,
    activeStudentId,
  } = useApp();

  // State of progress per competency
  const [attemptRecords, setAttemptRecords] = useState<Record<string, CompetencyAttemptRecord>>(() => {
    const initial: Record<string, CompetencyAttemptRecord> = {};
    masteryLesson.competencies.forEach((c) => {
      initial[c.competency_id] = {
        competency_id: c.competency_id,
        status: 'pending',
        is_mastered: false,
      };
    });
    return initial;
  });

  // Current active competency index in the queue
  const [currentCompetencyIndex, setCurrentCompetencyIndex] = useState<number>(0);
  // Whether currently attempting primary ('primary') or variant ('variant')
  const [activeStage, setActiveStage] = useState<'primary' | 'variant'>('primary');
  // Selected option for current view
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  // Has the user submitted the current selection?
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  // Total attempts counter
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  const competencies = masteryLesson.competencies;
  const currentCompetency: MasteryCompetency | undefined = competencies[currentCompetencyIndex];

  // Current question item (either primary or paired variant)
  const currentItem: MasteryItem = useMemo(() => {
    if (!currentCompetency) return competencies[0].primary_item;
    return activeStage === 'primary' ? currentCompetency.primary_item : currentCompetency.paired_variant;
  }, [currentCompetency, activeStage, competencies]);

  // Overall mastery calculation
  const masteredCount = useMemo(() => {
    return Object.values(attemptRecords).filter((r) => r.is_mastered).length;
  }, [attemptRecords]);

  const totalCompetencies = competencies.length;
  const isAllMastered = masteredCount === totalCompetencies;
  const masteryPercentage = Math.round((masteredCount / totalCompetencies) * 100);

  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  // Submit the selected answer
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || hasSubmitted || !currentCompetency) return;

    setHasSubmitted(true);
    setTotalAttempts((prev) => prev + 1);

    const isCorrect = selectedOptionId === currentItem.correct_answer_id;
    const cid = currentCompetency.competency_id;
    const existing = attemptRecords[cid];

    if (activeStage === 'primary') {
      if (isCorrect) {
        // Mastered on primary
        setAttemptRecords((prev) => ({
          ...prev,
          [cid]: {
            ...existing,
            status: 'mastered_primary',
            primary_choice_id: selectedOptionId,
            primary_correct: true,
            is_mastered: true,
          },
        }));
      } else {
        // Missed primary; diagnostic remediation triggered
        const hint = currentItem.remediation_hints[selectedOptionId] || 'Review the procedural requirements for this standard laboratory technique.';
        setAttemptRecords((prev) => ({
          ...prev,
          [cid]: {
            ...existing,
            status: 'needs_variant',
            primary_choice_id: selectedOptionId,
            primary_correct: false,
            active_remediation_hint: hint,
            is_mastered: false,
          },
        }));
      }
    } else {
      // Stage is variant
      if (isCorrect) {
        // Mastered via variant
        setAttemptRecords((prev) => ({
          ...prev,
          [cid]: {
            ...existing,
            status: 'mastered_variant',
            variant_choice_id: selectedOptionId,
            variant_correct: true,
            is_mastered: true,
          },
        }));
      } else {
        // Failed variant as well
        const hint = currentItem.remediation_hints[selectedOptionId] || 'Review the core scientific principles underlying this calculation and procedure.';
        setAttemptRecords((prev) => ({
          ...prev,
          [cid]: {
            ...existing,
            status: 'needs_variant',
            variant_choice_id: selectedOptionId,
            variant_correct: false,
            active_remediation_hint: hint,
            is_mastered: false,
          },
        }));
      }
    }
  };

  // Move to next step or next unmastered competency
  const handleNextStep = () => {
    if (!currentCompetency) return;
    const cid = currentCompetency.competency_id;
    const record = attemptRecords[cid];

    // If just submitted and was incorrect on primary, switch immediately to the paired variant
    if (activeStage === 'primary' && !record.primary_correct) {
      setActiveStage('variant');
      setSelectedOptionId(null);
      setHasSubmitted(false);
      return;
    }

    // If just submitted variant and was incorrect, allow retry or move to another unmastered competency
    if (activeStage === 'variant' && !record.variant_correct) {
      // Find next unmastered competency in queue
      const nextUnmasteredIndex = competencies.findIndex(
        (c, idx) => idx > currentCompetencyIndex && !attemptRecords[c.competency_id]?.is_mastered
      );
      if (nextUnmasteredIndex !== -1) {
        setCurrentCompetencyIndex(nextUnmasteredIndex);
        setActiveStage('primary');
        setSelectedOptionId(null);
        setHasSubmitted(false);
        return;
      } else {
        // Wrap around to first unmastered
        const firstUnmastered = competencies.findIndex((c) => !attemptRecords[c.competency_id]?.is_mastered);
        if (firstUnmastered !== -1) {
          setCurrentCompetencyIndex(firstUnmastered);
          setActiveStage('variant'); // Retry variant
          setSelectedOptionId(null);
          setHasSubmitted(false);
          return;
        }
      }
    }

    // If mastered, advance to next unmastered competency
    const remainingUnmastered = competencies.findIndex(
      (c, idx) => idx > currentCompetencyIndex && !attemptRecords[c.competency_id]?.is_mastered
    );

    if (remainingUnmastered !== -1) {
      setCurrentCompetencyIndex(remainingUnmastered);
      setActiveStage('primary');
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      // Check if any prior unmastered competencies remain
      const priorUnmastered = competencies.findIndex((c) => !attemptRecords[c.competency_id]?.is_mastered);
      if (priorUnmastered !== -1) {
        setCurrentCompetencyIndex(priorUnmastered);
        const priorRec = attemptRecords[competencies[priorUnmastered].competency_id];
        setActiveStage(priorRec.status === 'needs_variant' ? 'variant' : 'primary');
        setSelectedOptionId(null);
        setHasSubmitted(false);
      } else {
        // All mastered! Record 100% grade
        if (selectedLessonId) {
          recordLessonGrade({
            lesson_id: selectedLessonId,
            student_id: activeStudentId || currentStudent?.profile?.id || 'stu_alex',
            student_name: currentStudent?.profile
              ? `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`
              : 'Student',
            score: totalCompetencies,
            total_questions: totalCompetencies,
            percentage: 100,
            status: 'Mastered',
            teacher_feedback:
              'Mastery verified: 100% retrieval achieved with diagnostic bench remediation.',
          });
          recordLessonCompletion(selectedLessonId);
        }
      }
    }
  };

  // Reset module to start fresh
  const handleResetModule = () => {
    const initial: Record<string, CompetencyAttemptRecord> = {};
    masteryLesson.competencies.forEach((c) => {
      initial[c.competency_id] = {
        competency_id: c.competency_id,
        status: 'pending',
        is_mastered: false,
      };
    });
    setAttemptRecords(initial);
    setCurrentCompetencyIndex(0);
    setActiveStage('primary');
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setTotalAttempts(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Pedagogical Framing */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-950 text-white p-6 rounded-2xl shadow-xl border border-emerald-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                Adaptive Mastery Model
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-emerald-100 border border-white/15">
                {masteryLesson.lesson_metadata.domain}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {masteryLesson.lesson_metadata.difficulty_tier}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              {masteryLesson.lesson_metadata.sublesson}
            </h2>
            <p className="text-sm text-emerald-100/80 max-w-3xl">
              In this BACE mastery protocol, every core competency must be proven. Missed questions trigger diagnostic lab error analysis and require passing a parallel bench variant targeting the exact same sub-skill before full 100% credential readiness is certified.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-center min-w-[170px]">
            <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300 mb-1">
              Mastery Progress
            </div>
            <div className="text-3xl font-extrabold text-white flex items-baseline justify-center gap-1">
              <span>{masteryPercentage}%</span>
              <span className="text-xs text-emerald-200 font-normal">
                ({masteredCount}/{totalCompetencies})
              </span>
            </div>
            <div className="w-full bg-emerald-950/60 h-2 rounded-full mt-2 overflow-hidden border border-emerald-500/30">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full transition-all duration-500 rounded-full"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Competency Tracker Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Module Competencies Matrix
          </div>
          <div className="text-xs text-slate-400">
            {isAllMastered ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Mastery Achieved
              </span>
            ) : (
              <span>Target: 100% Completion Required</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {competencies.map((comp, idx) => {
            const record = attemptRecords[comp.competency_id];
            const isCurrent = idx === currentCompetencyIndex && !isAllMastered;

            let badgeColor = 'border-slate-800 bg-slate-950/60 text-slate-400';
            let icon = <div className="w-2 h-2 rounded-full bg-slate-600" />;

            if (record.is_mastered) {
              if (record.status === 'mastered_primary') {
                badgeColor = 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
                icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
              } else {
                badgeColor = 'border-teal-500/40 bg-teal-950/40 text-teal-300';
                icon = <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />;
              }
            } else if (record.status === 'needs_variant') {
              badgeColor = 'border-amber-500/50 bg-amber-950/30 text-amber-300';
              icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
            } else if (isCurrent) {
              badgeColor = 'border-blue-500/60 bg-blue-950/40 text-blue-300 ring-1 ring-blue-500/40';
              icon = <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />;
            }

            return (
              <div
                key={comp.competency_id}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition-all ${badgeColor}`}
              >
                <div className="mt-0.5">{icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold uppercase tracking-wider text-[10px]">
                      {comp.competency_id}
                    </span>
                    {record.is_mastered && (
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {record.status === 'mastered_primary' ? 'Direct 100%' : 'Remediated'}
                      </span>
                    )}
                    {record.status === 'needs_variant' && (
                      <span className="text-[10px] font-semibold text-amber-400">
                        Variant Pending
                      </span>
                    )}
                  </div>
                  <p className="truncate text-slate-300 text-[11px]">{comp.statement}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      {isAllMastered ? (
        /* 100% MASTERY CELEBRATION CARD */
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-600/50 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Award className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              100% Competency Verified
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              BACE Mastery Certified!
            </h3>
            <p className="text-sm text-slate-300">
              You have successfully proven complete retrieval and practical bench competency across all {totalCompetencies} core learning objectives for <strong>{masteryLesson.lesson_metadata.sublesson}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 font-medium">Domain</div>
              <div className="text-sm font-bold text-white mt-0.5">{masteryLesson.lesson_metadata.domain}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 font-medium">Final Score</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">100%</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3.5">
              <div className="text-xs text-slate-400 font-medium">Total Responses</div>
              <div className="text-lg font-bold text-teal-300 mt-0.5">{totalAttempts}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleResetModule}
              className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Practice Module Again
            </button>
            {onExit && (
              <button
                onClick={onExit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-700/30 transition-all"
              >
                Continue Coursework <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION WORKSPACE */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* Competency Statement Header */}
          <div className="bg-slate-800/80 border-b border-slate-700/80 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {currentCompetency?.competency_id}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  activeStage === 'primary'
                    ? 'bg-blue-950/70 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                }`}>
                  {activeStage === 'primary' ? 'Primary Assessment Item' : 'Parallel Variant (Diagnostic Remediation)'}
                </span>
              </div>
              <p className="text-xs text-slate-300 italic font-medium">
                Objective: {currentCompetency?.statement}
              </p>
            </div>

            {activeStage === 'variant' && (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/30 shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Alternate Scenario Active</span>
              </div>
            )}
          </div>

          {/* Question Body */}
          <div className="p-6 space-y-6">
            <div className="text-base md:text-lg font-medium text-slate-100 leading-relaxed">
              {currentItem.question_text}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentItem.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentItem.correct_answer_id;

                let optionStyles = 'border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 text-slate-200';
                let letterStyles = 'bg-slate-800 text-slate-300 border-slate-700';

                if (isSelected && !hasSubmitted) {
                  optionStyles = 'border-emerald-500 bg-emerald-950/30 text-emerald-100 ring-1 ring-emerald-500/50';
                  letterStyles = 'bg-emerald-600 text-white border-emerald-500';
                }

                if (hasSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 ring-1 ring-emerald-500';
                    letterStyles = 'bg-emerald-600 text-white border-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-500 bg-rose-950/60 text-rose-100 ring-1 ring-rose-500';
                    letterStyles = 'bg-rose-600 text-white border-rose-400';
                  } else {
                    optionStyles = 'border-slate-800/60 bg-slate-950/20 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasSubmitted}
                    className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition-all ${optionStyles}`}
                  >
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 transition-all ${letterStyles}`}>
                      {opt.id}
                    </div>
                    <div className="flex-1 text-sm md:text-base leading-relaxed pt-0.5">
                      {opt.text}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Remediation & Explanation Area */}
            {hasSubmitted && (
              <div className="space-y-4 pt-2">
                {selectedOptionId === currentItem.correct_answer_id ? (
                  /* Correct Response Feedback */
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      Correct Competency Demonstrated
                    </div>
                    <p className="text-xs md:text-sm leading-relaxed text-emerald-100/90">
                      {currentItem.explanation}
                    </p>
                  </div>
                ) : (
                  /* Missed Question Diagnostic Feedback */
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
                        <XCircle className="w-5 h-5 text-rose-400" />
                        Targeted Lab Error Diagnosis
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-rose-100/90">
                        {currentItem.remediation_hints[selectedOptionId || ''] ||
                          'Review the standard procedure and physical parameters for this bench skill.'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-200 text-xs uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        Underlying Scientific Principle
                      </div>
                      <p className="text-xs md:text-sm leading-relaxed text-slate-300">
                        {currentItem.explanation}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Under the 100% Mastery model, you must now complete a parallel variant question to verify this competency.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Question {currentCompetencyIndex + 1} of {totalCompetencies}
                  {activeStage === 'variant' ? ' (Parallel Variant)' : ''}
                </span>
              </div>

              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                    selectedOptionId
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/30 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  Verify Response <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-700/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {activeStage === 'primary' && selectedOptionId !== currentItem.correct_answer_id
                    ? 'Begin Parallel Variant'
                    : isAllMastered
                    ? 'Review Module Summary'
                    : 'Proceed to Next Objective'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
