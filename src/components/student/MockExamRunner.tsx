import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question, QuizAttempt } from '../../types/database';
import { cleanQuestionText } from '../../utils/questionUtils';
import { allocateQuestionsByPointWeight } from '../../data/baceBlueprint';

export const MockExamRunner: React.FC = () => {
  const {
    activeExamConfig,
    questions,
    domains,
    currentStudent,
    recordExamSubmission,
    setStudentPage,
  } = useApp();

  // Create or retrieve exam questions pool covering all 8 domains
  const [examQuestions] = useState<Question[]>(() => {
    const totalNeeded = activeExamConfig?.totalQuestions || 25;
    const selected: Question[] = [];
    const usedIds = new Set<string>();

    // Step 1: Allocate exact integer targets from published category point weights.
    // These are simulation targets, not a claim about unpublished current item counts.
    const domainTargets = allocateQuestionsByPointWeight(totalNeeded);
    domains.forEach((d) => {
      const domainQs = questions
        .filter((q) => q.domain_id === d.id && q.active !== false)
        .sort(() => 0.5 - Math.random());

      const targetCount = domainTargets[d.id] || 0;
      const countToTake = Math.min(targetCount, domainQs.length);

      for (let i = 0; i < countToTake; i++) {
        selected.push(domainQs[i]);
        usedIds.add(domainQs[i].id);
      }
    });

    // Step 2: Fill remaining up to totalNeeded if any
    if (selected.length < totalNeeded) {
      const remainingQs = questions
        .filter((q) => !usedIds.has(q.id) && q.active !== false)
        .sort(() => 0.5 - Math.random());

      for (const q of remainingQs) {
        if (selected.length >= totalNeeded) break;
        selected.push(q);
        usedIds.add(q.id);
      }
    }

    // If still less than totalNeeded, safely duplicate with unique IDs
    let copyIdx = 0;
    while (selected.length < totalNeeded && questions.length > 0) {
      const baseQ = questions[copyIdx % questions.length];
      selected.push({ ...baseQ, id: `${baseQ.id}_exam_${selected.length}` });
      copyIdx++;
    }

    // Step 3: Trim to totalNeeded and shuffle so domains are interleaved
    return selected.slice(0, totalNeeded).sort(() => 0.5 - Math.random());
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Timer logic
  const initialSeconds = (activeExamConfig?.timeLimitMinutes || 30) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex] || examQuestions[0];
  const currentDomain = domains.find((d) => d.id === currentQ?.domain_id);
  const isCurrentFlagged = flaggedQuestions[currentQ?.id] || false;

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoices((prev) => ({ ...prev, [currentQ.id]: choiceId }));
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  // Pre-submission counts
  const totalQuestions = examQuestions.length;
  const answeredCount = Object.keys(selectedChoices).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  const handleFinalSubmit = () => {
    let correctCount = 0;
    const domainBreakdown: Record<
      string,
      { correct: number; total: number; percentage: number }
    > = {};

    domains.forEach((d) => {
      domainBreakdown[d.id] = { correct: 0, total: 0, percentage: 0 };
    });

    examQuestions.forEach((q) => {
      const selectedId = selectedChoices[q.id];
      const correctChoice = q.choices.find((c) => c.is_correct);
      const isCorrect = selectedId === correctChoice?.id;

      if (isCorrect) correctCount++;

      const dId = q.domain_id || 'd1';
      if (!domainBreakdown[dId]) {
        domainBreakdown[dId] = { correct: 0, total: 0, percentage: 0 };
      }
      domainBreakdown[dId].total++;
      if (isCorrect) domainBreakdown[dId].correct++;
    });

    // Compute percentages
    Object.keys(domainBreakdown).forEach((dId) => {
      const item = domainBreakdown[dId];
      item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      student_id: currentStudent.profile.id,
      quiz_type: activeExamConfig?.quizType || 'mock_quick',
      score: correctCount,
      total_questions: totalQuestions,
      percentage: scorePercentage,
      started_at: new Date(Date.now() - (initialSeconds - secondsRemaining) * 1000).toISOString(),
      completed_at: new Date().toISOString(),
      time_spent_seconds: initialSeconds - secondsRemaining,
      domain_breakdown: domainBreakdown,
    };

    recordExamSubmission(attempt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Testing Header with Timer & Progress */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 lg:sticky lg:top-24 lg:z-20">
        <div className="flex items-center space-x-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {activeExamConfig?.title || 'BACE Mock Exam'}
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-700">
            Question <span className="text-blue-600 font-bold">{currentIndex + 1}</span> of {totalQuestions}
          </span>
        </div>

        {/* Timer Display */}
        <div className="flex items-center space-x-4">
          <div
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold ${
              secondsRemaining < 300
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setShowQuestionGrid(!showQuestionGrid)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LayoutGrid className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Grid Navigator</span>
          </button>

          <button
            onClick={() => setShowSummaryModal(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors shadow-xs"
          >
            <span>Submit Exam</span>
          </button>
        </div>

        {/* Horizontal progress bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Grid Navigator Dropdown / Overlay */}
      {showQuestionGrid && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Question Navigator</h3>
            <button
              onClick={() => setShowQuestionGrid(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-600" /> Answered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-white border border-slate-300" /> Unanswered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400" /> Flagged
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-60 overflow-y-auto p-1">
            {examQuestions.map((q, idx) => {
              const isAnswered = !!selectedChoices[q.id];
              const isFlag = !!flaggedQuestions[q.id];
              const isCurrent = currentIndex === idx;

              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
              if (isFlag) btnStyle = 'bg-amber-100 border-amber-400 text-amber-900 font-bold';
              else if (isAnswered) btnStyle = 'bg-blue-600 border-blue-600 text-white font-semibold';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowQuestionGrid(false);
                  }}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center transition-all ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 scroll-mt-40">
        {/* Question Header: Domain & Flag */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md">
              Question {currentIndex + 1}
            </span>
            <span className="text-blue-700 font-semibold bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              {currentDomain?.name || 'Biotechnology Skills'}
            </span>
          </div>

          <button
            onClick={handleToggleFlag}
            className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              isCurrentFlagged
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-current text-amber-600' : ''}`} />
            <span>{isCurrentFlagged ? 'Flagged for Review' : 'Flag for Review'}</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {cleanQuestionText(currentQ.question_text)}
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 pt-2">
          {currentQ.choices.map((choice, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = selectedChoices[currentQ.id] === choice.id;

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                className={`w-full text-left p-4 rounded-xl border text-sm flex items-center space-x-3.5 transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 text-blue-950 font-medium ring-1 ring-blue-600'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 text-slate-800'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {letter}
                </span>
                <span className="flex-1 leading-snug">{choice.choice_text}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Nav: Previous & Next */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <span className="text-xs text-slate-400">
            {answeredCount} of {totalQuestions} answered
          </span>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-colors shadow-xs"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSummaryModal(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              <span>Review & Submit</span>
            </button>
          )}
        </div>
      </div>

      {/* Pre-Submission Audit Modal (Strictly as specified in Prompt) */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Ready to Submit Exam?
              </h2>
              <p className="text-xs text-slate-500">
                Please review your exam status before final grading.
              </p>
            </div>

            {/* Exact wording from Prompt */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-slate-800">
                <span>Questions Answered:</span>
                <strong className="font-bold text-slate-900">
                  You have answered {answeredCount} of {totalQuestions} questions.
                </strong>
              </div>

              {unansweredCount > 0 && (
                <div className="space-y-1 pt-1 border-t border-slate-200/60">
                  <div className="flex items-center justify-between text-rose-700 font-medium">
                    <span>Unanswered:</span>
                    <strong>{unansweredCount} questions remain unanswered.</strong>
                  </div>
                  <p className="text-[11px] text-rose-600 leading-tight">
                    Unanswered questions will be marked incorrect and will affect your accuracy trends.
                  </p>
                </div>
              )}

              {flaggedCount > 0 && (
                <div className="flex items-center justify-between text-amber-700 font-medium">
                  <span>Flagged:</span>
                  <strong>{flaggedCount} questions are flagged for review.</strong>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Return to Exam
              </button>

              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
