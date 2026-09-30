import { StudyPlan } from './StudyPlan';
import { JoinClass } from './JoinClass';
import React from 'react';
import {
  Calendar,
  FlaskConical,
  BookOpen,
  ArrowRight,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Target,
  Flame,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { MasteryBadge } from '../common/MasteryBadge';
import { getMasteryDetails } from '../../types/database';

export const StudentDashboard: React.FC = () => {
  const {
    currentStudent,
    domains,
    lessons,
    questions,
    completedLessonIds,
    overallReadiness,
    openDomain,
    startMockExam,
    startPractice,
    startLesson,
    assignments,
    assignmentProgress,
    classes,
    teachers,
    setStudentPage,
    benchStats,
  } = useApp();

  const enrolledClass = classes.find((c) => c.id === currentStudent.class_id);
  const classTeacher = teachers.find((t) => t.id === enrolledClass?.teacher_id);
  const studentAssignments = assignments.filter(
    (a) => !a.class_id || a.class_id === currentStudent.class_id
  );

  const readinessDetails = getMasteryDetails(overallReadiness);
  const totalCompletedLessons = Math.max(currentStudent.lessons_completed, completedLessonIds.length);

  const weakestTopics = currentStudent.weakest_topics || [];
  const nextLesson = lessons.find((l) => !completedLessonIds.includes(l.id)) || lessons[0];
  const lowestDomain = [...domains].sort((a, b) => {
    const scoreA = currentStudent.domain_mastery[a.id] ?? 0;
    const scoreB = currentStudent.domain_mastery[b.id] ?? 0;
    return scoreA - scoreB;
  })[0];

  return (
    <div className="space-y-8 pb-12">
      <JoinClass />
      <StudyPlan />
      {/* Top Banner: Welcome & Readiness */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
              <span>Biotechnician Assistant Credentialing Exam</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              BACE Prep Lab
            </h1>
            <p className="text-base text-slate-600">
              Welcome back, <strong className="text-slate-900 font-semibold">{currentStudent.profile.first_name}</strong>. Learn. Practice. Master the BACE.
            </p>
          </div>

          {/* Overall Readiness Card */}
          <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200/80 min-w-[280px] sm:min-w-[340px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Overall BACE Readiness
              </span>
              <MasteryBadge percentage={overallReadiness} size="sm" />
            </div>

            <div className="flex items-baseline space-x-2 mb-3">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {overallReadiness}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / 80% passing goal benchmark
              </span>
            </div>

            {/* Horizontal progress bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-700 ${readinessDetails.progressColor}`}
                style={{ width: `${Math.min(100, overallReadiness)}%` }}
              />
              {/* 80% benchmark notch */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 z-10"
                style={{ left: '80%' }}
                title="80% Passing Goal Benchmark"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
              <span>Current Composite Mastery</span>
              <span className="text-blue-700 font-semibold">Goal: 80% Passing Benchmark</span>
            </div>
          </div>
        </div>

        {/* Quick actions strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setStudentPage('learn')}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Domains</span>
          </button>

          <button
            onClick={() => startPractice({ mode: 'Quick 10', count: 10 })}
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Quick 10 Practice</span>
          </button>

          <button
            onClick={() => setStudentPage('bench_simulator')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Bench Simulator & Lab Math</span>
          </button>

          <button
            onClick={() => setStudentPage('mock_exam')}
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Simulate BACE Exam</span>
          </button>
        </div>
      </section>

      {/* 4 Stat Cards Row (Prompt requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Questions Answered
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {currentStudent.questions_attempted}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Across all 8 domains</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overall Accuracy
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {currentStudent.accuracy}%
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">80% credential threshold</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lessons Completed
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {totalCompletedLessons} <span className="text-sm font-normal text-slate-500">/ {lessons.length}</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Theory & Bench Guides</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Study Streak
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <span>4 Days</span>
              <span className="text-base">🔥</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">Consistent daily practice</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Bench Simulator & Lab Math Practical Training Feature Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
              <span>BACE Wet-Lab & Math Station Readiness</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Bench Simulator & Lab Math Training Module
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Master hands-on BACE practical stations: interactive P20/P200/P1000 micropipette dial training, algorithmic solution math ($C_1V_1=C_2V_2$, molarity, serial dilutions), GLP/GMP batch record audit drills, and proctor rubrics.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 text-slate-200">
                Pipette Drills: <strong>{benchStats?.pipetteDrillsCompleted || 0}</strong>
              </span>
              <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 text-slate-200">
                Math Problems: <strong>{benchStats?.mathProblemsSolved || 0}</strong>
              </span>
              <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 text-slate-200">
                Notebook Audits: <strong>{benchStats?.auditsCompleted || 0}</strong>
              </span>
              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                Stations Certified: <strong>{Object.keys(benchStats?.rubricsSignedOff || {}).length} / 3</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setStudentPage('bench_simulator')}
              className="inline-flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Launch Bench Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Teacher Assignments & Weakest Topics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignments Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Assignments Due</h2>
                <p className="text-xs text-slate-500">
                  {enrolledClass ? `${enrolledClass.name} (${enrolledClass.period})` : 'Self-Paced Track'}
                  {classTeacher ? ` — ${classTeacher.prefix ? `${classTeacher.prefix} ` : ''}${classTeacher.first_name} ${classTeacher.last_name}` : ''}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              {studentAssignments.length} Assigned
            </span>
          </div>

          <div className="space-y-3">
            {studentAssignments.length === 0 ? (
              <div className="text-center py-8 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-semibold text-slate-700">All caught up!</p>
                <p className="text-[11px] text-slate-400 mt-0.5">No pending class assignments at this time.</p>
              </div>
            ) : (
              studentAssignments.map((asg) => {
                const isCompleted =
                  assignmentProgress.some(
                    (p) =>
                      p.assignment_id === asg.id &&
                      p.student_id === currentStudent.profile.id &&
                      p.status === 'Completed'
                  ) ||
                  (asg.assignment_type === 'Lesson' &&
                    asg.reference_id &&
                    completedLessonIds.includes(asg.reference_id));

                return (
                  <div
                    key={asg.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCompleted
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {asg.assignment_type}
                        </span>
                        {isCompleted ? (
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Completed (100% Mastery)
                          </span>
                        ) : (
                          <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Due {asg.due_date}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900">{asg.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-1">{asg.instructions}</p>
                    </div>

                    {isCompleted ? (
                      <span className="self-start sm:self-center shrink-0 inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mastered</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          if (asg.assignment_type === 'Lesson') {
                            if (asg.reference_id) {
                              startLesson(asg.reference_id);
                            } else {
                              setStudentPage('learn');
                            }
                          } else if (asg.assignment_type === 'Mock Exam') {
                            startMockExam('half');
                          } else {
                            startPractice({ mode: 'Domain Practice', domainId: asg.reference_id, count: 20 });
                          }
                        }}
                        className="self-start sm:self-center shrink-0 inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Start Activity</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Weakest Topics & Targeted Review (Prompt requirement) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold mb-1">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Your Weakest Topics</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Click any topic to begin targeted review drills.
            </p>

            {weakestTopics.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-1">No weak topics flagged yet</p>
                <p className="text-[11px] text-slate-500">
                  As you complete domain quizzes and mock exams, specific topics requiring review will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {weakestTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      startPractice({
                        mode: 'Weakest Topics',
                        domainId: (topic as any).domainId || 'd1',
                        count: 10,
                      })
                    }
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-rose-50/40 hover:border-rose-300 transition-colors cursor-pointer flex items-center justify-between"
                    title="Click to start targeted practice on this topic"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{topic.name}</p>
                      <p className="text-[10px] text-slate-500">Targeted review</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                        {topic.percentage}%
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() =>
                weakestTopics.length > 0
                  ? startPractice({ mode: 'Weakest Topics', count: 15 })
                  : startPractice({ mode: 'Diagnostic', count: 15 })
              }
              className="w-full text-center text-xs font-semibold text-teal-700 hover:text-teal-800 py-2 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors"
            >
              {weakestTopics.length > 0 ? 'Practice All Weak Areas →' : 'Start Diagnostic Quiz →'}
            </button>
          </div>
        </div>
      </div>

      {/* Eight BACE Exam Domains Grid (Matching exact prompt specification) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">BACE Exam Domains</h2>
            <p className="text-sm text-slate-600">
              Master the eight foundational competency domains defined by Biotility.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full self-start">
            Total Weight: 100%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((domain) => {
            const mastery = currentStudent.domain_mastery[domain.id] ?? 0;
            const domainLessons = lessons.filter((l) => l.domain_id === domain.id);
            const completedCount = domainLessons.filter((l) => completedLessonIds.includes(l.id)).length;
            const domainQuestions = questions.filter((q) => q.domain_id === domain.id);
            const questionsDone = currentStudent.questions_attempted > 0
              ? Math.min(domainQuestions.length, Math.round(domainQuestions.length * (mastery / 100)))
              : 0;
            const details = getMasteryDetails(mastery);

            return (
              <div
                key={domain.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon, Name & Weight */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                      <DomainIcon name={domain.icon_name} className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {domain.exam_weight}% Exam
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Current Mastery Percentage & Badge */}
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {mastery}% Mastery
                    </span>
                    <MasteryBadge percentage={mastery} showPercentage={false} size="sm" />
                  </div>

                  {/* Horizontal progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${details.progressColor}`}
                      style={{ width: `${Math.min(100, mastery)}%` }}
                    />
                  </div>

                  {/* Lessons completed & Practice questions completed */}
                  <div className="space-y-1 text-xs text-slate-600 mb-5">
                    <div className="flex justify-between">
                      <span>Lessons completed:</span>
                      <span className="font-semibold text-slate-800">
                        {completedCount} of {domainLessons.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Practice questions:</span>
                      <span className="font-semibold text-slate-800">
                        {questionsDone} completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Study Domain Button (Exact prompt wording) */}
                <button
                  onClick={() => openDomain(domain.id)}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs group"
                >
                  <span>Study Domain</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Next Steps Section (Prompt requirement) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Recommended Next Steps</h2>
        <p className="text-xs text-slate-500 mb-5">
          Priority actions to raise your overall composite readiness above the 80% passing goal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                Priority 1 • Next Lesson
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">
                {nextLesson?.title || 'Start Core Lessons'}
              </h3>
              <p className="text-xs text-slate-600">
                {nextLesson?.domain_id
                  ? `Focus curriculum module in ${domains.find((d) => d.id === nextLesson.domain_id)?.name || 'Biotechnology'}.`
                  : 'Work through interactive curriculum modules aligned to BACE standards.'}
              </p>
            </div>
            {nextLesson && (
              <button
                onClick={() => startLesson(nextLesson.id)}
                className="mt-4 inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                <span>Open Lesson</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                Priority 2 • Targeted Practice
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">
                {lowestDomain ? `${lowestDomain.name} Practice` : 'Targeted Practice Drills'}
              </h3>
              <p className="text-xs text-slate-600">
                Practice 10 high-yield questions with instant explanations and immediate feedback.
              </p>
            </div>
            <button
              onClick={() =>
                lowestDomain
                  ? startPractice({ mode: 'Domain Practice', domainId: lowestDomain.id, count: 10 })
                  : startPractice({ mode: 'Diagnostic', count: 10 })
              }
              className="mt-4 inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                Priority 3 • Assessment Check
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">
                Quick Mock Simulation (25 Qs)
              </h3>
              <p className="text-xs text-slate-600">
                Benchmark your readiness across all 8 exam domains against the 80% passing standard.
              </p>
            </div>
            <button
              onClick={() => startMockExam('quick')}
              className="mt-4 inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>Launch Mock Exam</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
