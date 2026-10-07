import { captureTestReview } from '../../lib/completedTests';
import { recordAnswerReview } from '../../lib/studyReviews';
import { AnswerExplanations } from './AnswerExplanations';
import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  Zap,
  Target,
  Shuffle,
  Flag,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { Question } from '../../types/database';
import { cleanQuestionText } from '../../utils/questionUtils';
import { allocateQuestionsByPointWeight } from '../../data/baceBlueprint';

export const PracticeView: React.FC = () => {
  const {
    currentUser,
    currentStudent,
    isProduction,
    isFacultyPreviewingStudent,
    recordExamSubmission,
    domains,
    topics,
    lessons,
    questions,
    activePracticeConfig,
    setActivePracticeConfig,
    setStudentPage,
  } = useApp();

  const [activeSession, setActiveSession] = useState<{
    questions: Question[];
    currentIndex: number;
    selectedChoices: Record<string, string>;
    submitted: Record<string, boolean>;
    flagged: Record<string, boolean>;
    score: number;
    isFinished: boolean;
  } | null>(null);

  const practiceStartedAt = React.useRef(new Date().toISOString());
  const practiceRecorded = React.useRef(false);
  React.useEffect(() => {
    if (!activeSession?.isFinished || practiceRecorded.current) return;
    practiceRecorded.current = true;
    const breakdown: Record<string, { correct: number; total: number; percentage: number }> = {};
    for (const question of activeSession.questions) {
      const entry = breakdown[question.domain_id] ||= { correct: 0, total: 0, percentage: 0 };
      entry.total++; if (question.choices.some(c => c.is_correct && c.id === activeSession.selectedChoices[question.id])) entry.correct++;
      entry.percentage = Math.round(entry.correct / entry.total * 100);
    }
    void recordExamSubmission({ id: `practice_${crypto.randomUUID()}`, student_id: currentStudent.profile.id, quiz_type: 'practice_drill', score: activeSession.score, total_questions: activeSession.questions.length, percentage: Math.round(activeSession.score / Math.max(1,activeSession.questions.length)*100), started_at: practiceStartedAt.current, completed_at: new Date().toISOString(), time_spent_seconds: Math.round((Date.now()-Date.parse(practiceStartedAt.current))/1000), domain_breakdown: breakdown, review_questions: captureTestReview(activeSession.questions, activeSession.selectedChoices) }).catch(console.error);
  }, [activeSession?.isFinished]);

  // Quick preset starters
  const startPresetPractice = (
    mode: string,
    options?: { domainId?: string; topicId?: string; lessonId?: string; questionIds?: string[]; count?: number }
  ) => {
    let pool = questions.filter(q => q.active !== false);
    if (options?.questionIds) pool = pool.filter(q => options.questionIds!.includes(q.id));

    if (options?.lessonId) {
      pool = pool.filter((q) => q.lesson_id === options.lessonId);
    } else if (options?.domainId) {
      pool = pool.filter((q) => q.domain_id === options.domainId);
    } else if (options?.topicId) {
      pool = pool.filter((q) => q.topic_id === options.topicId);
    } else if (mode === 'Weakest Topics') {
      const weakest = [...domains].sort((a,b) => (currentStudent.domain_mastery[a.id] || 0) - (currentStudent.domain_mastery[b.id] || 0)).slice(0,2);
      pool = pool.filter(q => weakest.some(domain => domain.id === q.domain_id));
    }

    const count = options?.count || 10;
    let selected: Question[] = [];

    const hasSpecificFilter = Boolean(options?.questionIds || options?.lessonId || options?.domainId || options?.topicId) || mode === 'Weakest Topics';

    if (!hasSpecificFilter) {
      // Mixed practice follows the published BACE point-weight distribution
      // so the oversized legacy Domain 1 banks cannot dominate random sessions.
      const targets = allocateQuestionsByPointWeight(count);
      const used = new Set<string>();

      domains.forEach((domain) => {
        const domainPool = questions
          .filter((q) => q.domain_id === domain.id && q.active !== false)
          .sort(() => 0.5 - Math.random());
        const take = Math.min(targets[domain.id] || 0, domainPool.length);
        domainPool.slice(0, take).forEach((q) => {
          selected.push(q);
          used.add(q.id);
        });
      });

      if (selected.length < count) {
        const remainder = questions
          .filter((q) => q.active !== false && !used.has(q.id))
          .sort(() => 0.5 - Math.random());
        selected.push(...remainder.slice(0, count - selected.length));
      }

      selected = selected.slice(0, count).sort(() => 0.5 - Math.random());
    } else {
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      selected = shuffled.slice(0, Math.min(count, shuffled.length));
    }

    practiceRecorded.current = false;
    practiceStartedAt.current = new Date().toISOString();
    setActiveSession({
      questions: selected.length > 0 ? selected : questions.slice(0, 10),
      currentIndex: 0,
      selectedChoices: {},
      submitted: {},
      flagged: {},
      score: 0,
      isFinished: false,
    });
  };

  // If there's an active practice configuration from external link (e.g. Dashboard)
  React.useEffect(() => {
    if (activePracticeConfig && !activeSession) {
      startPresetPractice(activePracticeConfig.mode, {
        domainId: activePracticeConfig.domainId,
        topicId: activePracticeConfig.topicId,
        lessonId: activePracticeConfig.lessonId,
        questionIds: activePracticeConfig.questionIds,
        count: activePracticeConfig.count,
      });
      setActivePracticeConfig(null);
    }
  }, [activePracticeConfig]);

  // Session question handlers
  const handleSelectChoice = (questionId: string, choiceId: string) => {
    if (!activeSession || activeSession.submitted[questionId]) return;
    setActiveSession((prev) =>
      prev
        ? {
            ...prev,
            selectedChoices: { ...prev.selectedChoices, [questionId]: choiceId },
          }
        : null
    );
  };

  const handleToggleFlag = (questionId: string) => {
    if (!activeSession) return;
    setActiveSession((prev) =>
      prev
        ? {
            ...prev,
            flagged: { ...prev.flagged, [questionId]: !prev.flagged[questionId] },
          }
        : null
    );
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (!activeSession || activeSession.submitted[questionId] || !activeSession.selectedChoices[questionId]) return;

    const currentQ = activeSession.questions[activeSession.currentIndex];
    const correctChoice = currentQ.choices.find((c) => c.is_correct);
    const isCorrect = activeSession.selectedChoices[questionId] === correctChoice?.id;
    if (isProduction && currentUser && !isFacultyPreviewingStudent) void recordAnswerReview(currentUser.id, currentQ, isCorrect).catch(console.error);

    setActiveSession((prev) =>
      prev
        ? {
            ...prev,
            submitted: { ...prev.submitted, [questionId]: true },
            score: isCorrect ? prev.score + 1 : prev.score,
          }
        : null
    );
  };

  const handleNextQuestion = () => {
    if (!activeSession) return;
    if (activeSession.currentIndex + 1 >= activeSession.questions.length) {
      setActiveSession((prev) => (prev ? { ...prev, isFinished: true } : null));
    } else {
      setActiveSession((prev) =>
        prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null
      );
    }
  };

  // If Active Session in Progress
  if (activeSession && !activeSession.isFinished) {
    const currentQ = activeSession.questions[activeSession.currentIndex];
    const domain = domains.find((d) => d.id === currentQ.domain_id);
    const topic = topics.find((t) => t.id === currentQ.topic_id);
    const isSubmitted = activeSession.submitted[currentQ.id];
    const chosenChoiceId = activeSession.selectedChoices[currentQ.id];
    const correctChoice = currentQ.choices.find((c) => c.is_correct);
    const isCorrect = isSubmitted && chosenChoiceId === correctChoice?.id;
    const isFlagged = activeSession.flagged[currentQ.id];

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-16">
        {/* Session Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveSession(null)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Practice</span>
          </button>

          <div className="flex items-center space-x-3 text-xs">
            <span className="font-semibold text-slate-700">
              Score: {activeSession.score} / {Object.keys(activeSession.submitted).length}
            </span>
            <div className="w-28 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((activeSession.currentIndex + 1) / activeSession.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Question Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                Question {activeSession.currentIndex + 1} of {activeSession.questions.length}
              </span>
              <span className="text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                {domain?.name || 'Biotechnology'}
              </span>
              <span className="text-slate-500 hidden sm:inline-block">
                • {topic?.name || 'Lab Skills'}
              </span>
            </div>

            {/* Flag for Review */}
            <button
              onClick={() => handleToggleFlag(currentQ.id)}
              className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                isFlagged
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current text-amber-600' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {cleanQuestionText(currentQ.question_text)}
          </div>

          {/* Choices */}
          <div className="space-y-3">
            {currentQ.choices.map((choice, index) => {
              const letter = String.fromCharCode(65 + index);
              const isSelected = chosenChoiceId === choice.id;

              let styleClasses = 'bg-white border-slate-200 hover:border-blue-300 text-slate-800';

              if (isSubmitted) {
                if (choice.is_correct) {
                  styleClasses = 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-medium';
                } else if (isSelected && !choice.is_correct) {
                  styleClasses = 'bg-rose-100/70 border-rose-400 text-rose-950';
                } else {
                  styleClasses = 'bg-white/60 border-slate-200 text-slate-400 opacity-70';
                }
              } else if (isSelected) {
                styleClasses = 'bg-blue-50 border-blue-600 text-blue-950 font-medium ring-1 ring-blue-600';
              }

              return (
                <button
                  key={choice.id}
                  disabled={isSubmitted}
                  onClick={() => handleSelectChoice(currentQ.id, choice.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm flex items-center space-x-3.5 transition-all ${styleClasses}`}
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700">
                    {letter}
                  </span>
                  <span className="flex-1 leading-snug">{choice.choice_text}</span>
                  {isSubmitted && choice.is_correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !choice.is_correct && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons / Post submission feedback */}
          {!isSubmitted ? (
            <div className="pt-4 flex justify-end">
              <button
                disabled={!chosenChoiceId}
                onClick={() => handleSubmitAnswer(currentQ.id)}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div
                className={`p-5 rounded-xl text-xs sm:text-sm border space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-300 text-rose-950'
                }`}
              >
                <div className="font-bold flex items-center space-x-2 text-base">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Incorrect</span>
                    </>
                  )}
                </div>

                {!isCorrect && (
                  <div className="font-semibold text-slate-800">
                    Correct answer:{' '}
                    <span className="text-emerald-700">{correctChoice?.choice_text}</span>
                  </div>
                )}

                <p className="text-slate-700 leading-relaxed pt-1">
                  <strong>Explanation:</strong> {cleanQuestionText(currentQ.explanation)}
                </p>

                <AnswerExplanations question={currentQ} />
                <div className="pt-2 text-xs text-slate-500 font-medium">
                  Related BACE Topic: <strong>{topic?.name || domain?.name}</strong>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <span>
                    {activeSession.currentIndex + 1 >= activeSession.questions.length
                      ? 'View Practice Summary'
                      : 'Next Question'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If Session Completed Summary Screen
  if (activeSession && activeSession.isFinished) {
    const total = activeSession.questions.length;
    const score = activeSession.score;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
          <Target className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Practice Set Completed</h2>
          <p className="text-sm text-slate-600 mt-1">
            Great practice session! Here is your performance summary:
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="text-4xl font-extrabold text-slate-900">
            {score} / {total}
          </div>
          <div className="text-sm font-semibold text-blue-700">
            {percentage}% Accuracy
          </div>
          <div className="text-xs text-slate-500">
            {percentage >= 80 ? 'Ready benchmark achieved for this set.' : 'Additional topic review recommended.'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveSession(null)}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Return to Practice Center
          </button>
          <button
            onClick={() => startPresetPractice('Mixed Practice', { count: 10 })}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
          >
            Start Another Set
          </button>
        </div>
      </div>
    );
  }

  // Main Practice Choice Center View
  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Practice Question Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Targeted BACE Practice
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Strengthen your laboratory competencies with individual question practice sets. Choose a quick drill, target your weakest topics, or practice by specific exam domain.
          </p>
        </div>

        {/* Quick presets row */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <button
            onClick={() => startPresetPractice('Quick 10', { count: 10 })}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            <Zap className="w-4 h-4" />
            <span>Quick 10</span>
          </button>

          <button
            onClick={() => startPresetPractice('Quick 20', { count: 20 })}
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            <Zap className="w-4 h-4 text-teal-400" />
            <span>Quick 20</span>
          </button>

          <button
            onClick={() => startPresetPractice('Quick 50', { count: 50 })}
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick 50</span>
          </button>

          <button
            onClick={() => startPresetPractice('Weakest Topics', { count: 15 })}
            className="inline-flex items-center space-x-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Target className="w-4 h-4 text-rose-600" />
            <span>Practice Weakest Topics</span>
          </button>

          <button
            onClick={() => startPresetPractice('Mixed Practice', { count: 20 })}
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Shuffle className="w-4 h-4 text-slate-500" />
            <span>Mixed Practice</span>
          </button>
        </div>
      </div>

      {/* Lesson Question Banks Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full mb-1">
              <BookOpen className="w-3 h-3" />
              <span>Lesson Question Banks</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Drill by Lesson</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any core curriculum lesson to practice with curriculum-aligned questions and immediate feedback.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const domain = domains.find((d) => d.id === lesson.domain_id);
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                      {domain?.name}
                    </span>
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50/80 border border-teal-200/60 px-2.5 py-0.5 rounded-full">
                      BACE-Aligned
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">Drill size:</span>
                  <button
                    onClick={() => startPresetPractice(lesson.title, { lessonId: lesson.id, count: 10 })}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 rounded-lg transition-colors"
                  >
                    10 Qs
                  </button>
                  <button
                    onClick={() => startPresetPractice(lesson.title, { lessonId: lesson.id, count: 25 })}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 rounded-lg transition-colors"
                  >
                    25 Qs
                  </button>
                  <button
                    onClick={() => startPresetPractice(lesson.title, { lessonId: lesson.id, count: 50 })}
                    className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 rounded-lg transition-colors"
                  >
                    50 Qs
                  </button>
                  <button
                    onClick={() => startPresetPractice(lesson.title, { lessonId: lesson.id, count: 150 })}
                    className="px-3 py-1 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors shadow-2xs ml-auto"
                  >
                    Mastery Drill
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Select Practice by Domain */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Practice by Domain</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any BACE exam domain below to generate an interactive practice set.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((domain) => {
            return (
              <div
                key={domain.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                      <DomainIcon name={domain.icon_name} className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {domain.exam_weight}%
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Coverage:</span>
                    <span className="font-semibold text-slate-700">
                      Full Exam Blueprint
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      startPresetPractice('Domain Practice', {
                        domainId: domain.id,
                        count: 10,
                      })
                    }
                    className="w-full inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors shadow-2xs group"
                  >
                    <span>Practice Domain</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
