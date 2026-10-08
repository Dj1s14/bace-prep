import { LessonRewards } from './LessonRewards';
import { CompletedTests } from './CompletedTests';
import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  Flame,
  BookOpen,
  HelpCircle,
  BarChart2,
  AlertTriangle,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainMasteryChart } from './progress/DomainMasteryChart';
import { AccuracyTrendsChart } from './progress/AccuracyTrendsChart';
import { LessonCompletionChart } from './progress/LessonCompletionChart';

export const StudentProgressView: React.FC = () => {
  const {
    currentStudent,
    domains,
    completedLessonIds,
    activitySessions,
    startPractice,
    startLesson,
    recordExamSubmission,
    setStudentPage,
    isDemo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'mastery' | 'trends' | 'completion'>('all');
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  const mastery = currentStudent.overall_readiness;
  const accuracy = currentStudent.accuracy;
  const questionsAnswered = currentStudent.questions_attempted;
  const lessonsCount = Math.max(currentStudent.lessons_completed, completedLessonIds.length);
  const mockExamsCompleted = currentStudent.mock_exam_scores.length;
  const studyStreakDays =
    questionsAnswered > 0 || lessonsCount > 0 || mockExamsCompleted > 0 ? 1 : 0;

  const weakestTopics = currentStudent.weakest_topics || [];
  const ownActivitySessions = activitySessions.filter((session) =>
    session.student_id ? session.student_id === currentStudent.profile.id : isDemo
  );

  const recommendedNextSteps = [
    {
      title: 'Review Micropipetting & Volume Ranges',
      description: 'Master plunger stops, volume ranges, and precision pipetting.',
      actionType: 'lesson',
      targetId: 'les_pipette',
      actionLabel: 'Open Lesson',
    },
    {
      title: 'Complete 10 Biotech Skills Practice Problems',
      description: 'Targeted laboratory procedure problems with step-by-step solutions.',
      actionType: 'practice',
      targetId: 'd1',
      actionLabel: 'Start Practice',
    },
    {
      title: 'Take Biotechnology Skills Diagnostic Quiz',
      description: 'Benchmark your knowledge against the 80% passing threshold.',
      actionType: 'quiz',
      targetId: 'd1',
      actionLabel: 'Take Quiz',
    },
  ];

  // Helper to dynamically simulate a new practice set to test dynamic updates in real-time
  const handleSimulateQuickDrill = () => {
    const drillAttempt = {
      id: `sim_${Date.now()}`,
      student_id: currentStudent.profile.id,
      quiz_type: 'practice_drill' as const,
      domain_id: 'd1',
      total_questions: 10,
      score: 9,
      percentage: 90,
      time_spent_seconds: 480,
      started_at: new Date(Date.now() - 480000).toISOString(),
      completed_at: new Date().toISOString(),
      answers: [],
    };
    void recordExamSubmission(drillAttempt).catch(console.error);
    // Stay on progress page rather than auto-routing to exam results during direct simulation
    setStudentPage('progress');
    setSimulationToast('Logged 9/10 (90%) in Biotechnology Skills. Charts updated live!');
    setTimeout(() => setSimulationToast(null), 4000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>Real-Time Visual Competency Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Progress & Analytics
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Track your composite BACE readiness score, domain mastery levels, historical accuracy trends, and curriculum completion rates.
            </p>
          </div>

          {isDemo && (
            <div className="flex flex-col items-start sm:items-end shrink-0">
              <button
                onClick={handleSimulateQuickDrill}
                className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all shadow-2xs cursor-pointer"
                title="Demo-only chart responsiveness check"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Demo: Simulate Practice (+90%)</span>
              </button>
            </div>
          )}
        </div>

        {/* Live Simulation Feedback Toast */}
        {simulationToast && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{simulationToast}</span>
          </div>
        )}
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Overall Readiness */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Overall Readiness
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">
            {mastery}%
          </div>
          <div className="text-[11px] text-slate-500">Passing goal: 80%</div>
        </div>

        {/* Total Questions Answered */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Questions Answered
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {questionsAnswered}
          </div>
          <div className="text-[11px] text-slate-500">Total practice items</div>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Overall Accuracy
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {accuracy}%
          </div>
          <div className="text-[11px] text-slate-500">First-attempt rate</div>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Units Completed
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lessonsCount}
          </div>
          <div className="text-[11px] text-slate-500">Out of 35 total units</div>
        </div>

        {/* Practice Exams Completed */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Mock Exams Done
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600">
            {mockExamsCompleted}
          </div>
          <div className="text-[11px] text-slate-500">Simulated test runs</div>
        </div>

        {/* Current Study Streak */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Study Streak
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 flex items-center">
            <span>{studyStreakDays}</span>
            <Flame className="w-5 h-5 ml-1 fill-current" />
          </div>
          <div className="text-[11px] text-slate-500">Consecutive days</div>
        </div>
      </div>

      <LessonRewards />
      <CompletedTests />

      {/* Visual Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Visualizations
          </button>
          <button
            onClick={() => setActiveTab('mastery')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'mastery'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Domain Mastery
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'trends'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Accuracy Trends
          </button>
          <button
            onClick={() => setActiveTab('completion')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'completion'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Lesson Completion
          </button>
        </div>

        <span className="hidden sm:inline-flex text-xs text-slate-500 font-medium">
          {ownActivitySessions.length} recorded sessions
        </span>
      </div>

      {/* Visual Progress Tracking System: Domain Mastery, Accuracy Trends, Lesson Completion */}
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'mastery') && (
          <div className="animate-fadeIn">
            <DomainMasteryChart />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'trends') && (
          <div className="animate-fadeIn">
            <AccuracyTrendsChart />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'completion') && (
          <div className="animate-fadeIn">
            <LessonCompletionChart />
          </div>
        )}
      </div>

      {/* Two Column Section: Your Weakest Topics & Recommended Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Weakest Topics Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-rose-800">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg font-bold text-slate-900">Your Weakest Topics</h2>
            </div>
            <span className="text-xs text-rose-700 font-semibold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Priority Focus
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Targeted topics with lower diagnostic accuracy. Tap below to launch targeted drills:
          </p>

          {weakestTopics.length > 0 ? (
            <div className="space-y-3 pt-1">
              {weakestTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{topic.name}</div>
                    <div className="text-xs text-rose-700 font-semibold mt-0.5">
                      {topic.percentage}% Diagnostic Mastery
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      startPractice({
                        mode: 'Weakest Topics',
                        topicId: topic.name.toLowerCase().includes('dilution') ? 't1_3' : undefined,
                        count: 10,
                      })
                    }
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Target Practice</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
              <div className="text-xs font-semibold text-slate-700">No Deficits Identified Yet</div>
              <div className="text-[11px] text-slate-500">
                Complete practice drills or mock exams to automatically identify priority review areas.
              </div>
            </div>
          )}
        </div>

        {/* Recommended Next Steps Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Recommended Next Steps</span>
          </div>

          <p className="text-xs text-slate-600">
            Personalized study actions to boost your readiness to 80%+:
          </p>

          <div className="space-y-3 pt-1">
            {recommendedNextSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-900">{step.title}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (step.actionType === 'lesson') {
                      startLesson(step.targetId);
                    } else if (step.actionType === 'quiz') {
                      startPractice({ mode: 'Domain Quiz', domainId: step.targetId, count: 10 });
                    } else {
                      startPractice({ mode: 'Weakest Topics', count: 10 });
                    }
                  }}
                  className="self-start sm:self-center shrink-0 inline-flex items-center space-x-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
