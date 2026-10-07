import { testTitle } from '../../lib/completedTests';
import { TestAnswerReview } from './CompletedTests';
import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Target,
  ArrowRight,
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { MasteryBadge } from '../common/MasteryBadge';
import { getMasteryDetails } from '../../types/database';

export const ExamResultsView: React.FC = () => {
  const {
    lastExamAttempt,
    domains,
    startMockExam,
    startPractice,
    setStudentPage,
  } = useApp();

  if (!lastExamAttempt) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">No Recent Exam Attempts</h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            You haven't completed a mock exam session yet. Take a practice or full official simulation to view your comprehensive score breakdown, domain analysis, and targeted remediation recommendations.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => startMockExam('quick')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 px-6 py-3 rounded-xl transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Quick Mock (25 Qs)</span>
          </button>
          <button
            onClick={() => setStudentPage('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-6 py-3 rounded-xl transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  const attempt = lastExamAttempt;
  const isBaceReady = attempt.percentage >= 80;
  const statusLabel = isBaceReady ? 'BACE Ready' : 'Needs Additional Review';

  // Sort domains by percentage to find strongest and weakest
  const domainPerformanceList = domains.map((d) => {
    const perf = attempt.domain_breakdown?.[d.id] || {
      correct: 0,
      total: 0,
      percentage: 0,
    };
    return {
      domain: d,
      percentage: perf.percentage,
      correct: perf.correct,
      total: perf.total,
    };
  });

  const domainsWithQuestions = domainPerformanceList.filter((d) => d.total > 0);
  const sorted = [...(domainsWithQuestions.length > 0 ? domainsWithQuestions : domainPerformanceList)].sort(
    (a, b) => b.percentage - a.percentage
  );
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  // Dynamically compute recommended review domains from actual performance
  const belowBenchmarkDomains = domainPerformanceList
    .filter((d) => d.total > 0 && d.percentage < 80)
    .sort((a, b) => a.percentage - b.percentage);

  const recommendedTopics = belowBenchmarkDomains.map((d) => ({
    title: `${d.domain.name} Remediation Drills`,
    domain: d.domain.name,
    reason: `Scored ${d.percentage}% (${d.correct}/${d.total} correct) on this exam (benchmark is 80%)`,
    domainId: d.domain.id,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner & Score summary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Test Submission Complete
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {testTitle(attempt)} Performance Analysis
            </h1>
            <p className="text-sm text-slate-600">
              Based on the 80% Biotility BACE benchmark credentialing standard.
            </p>
          </div>

          {/* Big Score Card */}
          <div
            className={`p-6 rounded-2xl border min-w-[260px] text-center space-y-1.5 ${
              isBaceReady
                ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Overall Composite Score
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              {attempt.score} / {attempt.total_questions}
            </div>
            <div className="text-xl font-bold text-blue-700">
              {attempt.percentage}%
            </div>

            {/* Status Indicator */}
            <div className="pt-2">
              <span
                className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                  isBaceReady
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                {isBaceReady ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                )}
                <span>{statusLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <TestAnswerReview key={attempt.id} attempt={attempt} />
      <button onClick={() => setStudentPage('progress')} className="text-sm font-semibold text-blue-700 hover:underline">View all completed tests</button>

      {/* Strongest & Weakest Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strongest */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Highest Mastery Domain</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {strongest?.domain.name} — {strongest?.percentage}%
          </div>
          <p className="text-xs text-slate-600">
            Strong laboratory competency demonstrated across all questions in this category.
          </p>
        </div>

        {/* Weakest */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
          <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Priority Review Domain</span>
          </div>
          <div className="text-base font-bold text-slate-900">
            {weakest?.domain.name} — {weakest?.percentage}%
          </div>
          <p className="text-xs text-slate-600">
            Focus targeted practice on this domain to achieve the 80% passing threshold.
          </p>
        </div>
      </div>

      {/* Performance by Domain breakdown */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Performance by Domain</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Breakdown across all eight official BACE exam domains:
          </p>
        </div>

        <div className="space-y-4">
          {domainPerformanceList.map((item) => {
            const details = getMasteryDetails(item.percentage);

            return (
              <div key={item.domain.id} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center space-x-2">
                    <DomainIcon name={item.domain.icon_name} className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-800">{item.domain.name}</span>
                    <span className="text-slate-400 font-normal">
                      ({item.domain.exam_weight}% exam weight)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-900">
                      {item.percentage}% ({item.correct}/{item.total})
                    </span>
                    <MasteryBadge percentage={item.percentage} showPercentage={false} size="sm" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${details.progressColor}`}
                    style={{ width: `${Math.min(100, item.percentage)}%` }}
                  />
                  {/* 80% benchmark notch */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 z-10"
                    style={{ left: '80%' }}
                    title="80% Goal"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Topics to Review */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Recommended Topics to Review</span>
        </div>

        {recommendedTopics.length === 0 ? (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All tested domains met or exceeded the 80% passing standard. Excellent work! Continue maintaining retention with mixed review drills.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {recommendedTopics.map((rec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {rec.domain}
                  </span>
                  <div className="text-sm font-semibold text-slate-900 mt-1">
                    {rec.title}
                  </div>
                  <div className="text-xs text-slate-500">{rec.reason}</div>
                </div>

                <button
                  onClick={() =>
                    startPractice({
                      mode: 'Domain Practice',
                      domainId: rec.domainId,
                      count: 10,
                    })
                  }
                  className="self-start sm:self-center shrink-0 inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                >
                  <span>Practice Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={() => setStudentPage('dashboard')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() =>
              startPractice({
                mode: 'Weakest Topics',
                domainId: weakest?.domain.id,
                count: 15,
              })
            }
            className="inline-flex items-center space-x-2 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 hover:bg-rose-100 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Target className="w-4 h-4 text-rose-600" />
            <span>Practice Weak Areas</span>
          </button>

          <button
            onClick={() => startMockExam('half')}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>
    </div>
  );
};
