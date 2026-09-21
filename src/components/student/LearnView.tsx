import React from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Play,
  Check,
  Target,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { MasteryBadge } from '../common/MasteryBadge';
import { getMasteryDetails } from '../../types/database';
import { getMasteryLessonsByDomain } from '../../data/mastery';

export const LearnView: React.FC = () => {
  const {
    domains,
    topics,
    lessons,
    selectedDomainId,
    setSelectedDomainId,
    studentPage,
    setStudentPage,
    startLesson,
    completedLessonIds,
    currentStudent,
    startPractice,
    lessonGrades,
  } = useApp();

  const isDetailView = studentPage === 'domain_detail' && selectedDomainId;
  const activeDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];
  const domainTopics = topics.filter((t) => t.domain_id === activeDomain?.id);
  const domainLessons = lessons.filter((l) => l.domain_id === activeDomain?.id);

  // Dynamic lesson and topic status calculated from real student progress
  const getTopicStats = (topicId: string) => {
    const topicLessons = lessons.filter((l) => l.topic_id === topicId);
    const completedTopicLessons = topicLessons.filter((l) => completedLessonIds.includes(l.id));
    const isCompleted = topicLessons.length > 0 && completedTopicLessons.length === topicLessons.length;
    const isStarted = completedTopicLessons.length > 0;

    // Check if student has recorded grades from lesson checks/drills
    const studentGrades = lessonGrades.filter(
      (g) => g.student_id === currentStudent.profile.id && topicLessons.some((l) => l.id === g.lesson_id)
    );

    let mastery = 0;
    if (studentGrades.length > 0) {
      const totalScore = studentGrades.reduce((sum, g) => sum + g.percentage, 0);
      mastery = Math.round(totalScore / studentGrades.length);
    } else if (isCompleted) {
      mastery = 100;
    } else if (isStarted) {
      mastery = Math.round((completedTopicLessons.length / topicLessons.length) * 50);
    } else if (currentStudent.domain_mastery[activeDomain?.id] && currentStudent.domain_mastery[activeDomain?.id] > 0) {
      mastery = currentStudent.domain_mastery[activeDomain.id];
    }

    const estMinutes = topicLessons[0]?.estimated_minutes || 15;

    return {
      isCompleted,
      isStarted,
      mastery,
      estMinutes,
    };
  };

  // If in Domain Detail Page
  if (isDetailView && activeDomain) {
    const domainMastery = currentStudent.domain_mastery[activeDomain.id] ?? 0;

    return (
      <div className="space-y-6 pb-12">
        {/* Header navigation bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => setStudentPage('learn')}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Domains</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                startPractice({
                  mode: 'Domain Practice',
                  domainId: activeDomain.id,
                  count: 20,
                })
              }
              className="inline-flex items-center space-x-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-xs"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice This Domain</span>
            </button>
          </div>
        </div>

        {/* Domain Hero Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                  <DomainIcon name={activeDomain.icon_name} className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    BACE Domain Weight: {activeDomain.exam_weight}%
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {activeDomain.name}
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
                {activeDomain.description}
              </p>
            </div>

            {/* Domain Mastery Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 min-w-[240px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase text-slate-500">Domain Mastery</span>
                <MasteryBadge percentage={domainMastery} size="sm" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-2">
                {domainMastery}%
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getMasteryDetails(domainMastery).progressColor}`}
                  style={{ width: `${Math.min(100, domainMastery)}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2 font-medium">
                Target: 80% passing threshold
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Mastery "Answer Until 100%" Modules for this Domain */}
        {(() => {
          const domainMasteryLessons = getMasteryLessonsByDomain(activeDomain.id);
          if (domainMasteryLessons.length === 0) return null;

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <Target className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">
                      Adaptive Mastery "Answer Until 100%" Modules ({domainMasteryLessons.length})
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Pedagogical retrieval model: Missed questions require parallel bench variants and diagnostic lab remediation until 100% competency is verified.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domainMasteryLessons.map((m) => (
                  <div
                    key={m.lesson_metadata.lesson_id}
                    className="bg-gradient-to-br from-emerald-950 to-teal-950 text-white rounded-2xl p-5 border border-emerald-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                          {m.competencies.length} Core Competencies
                        </span>
                        <span className="text-[11px] font-semibold text-teal-200">
                          {m.lesson_metadata.difficulty_tier}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5">
                        {m.lesson_metadata.sublesson}
                      </h3>
                      <p className="text-xs text-emerald-100/70 leading-relaxed mb-4">
                        Mastery protocol targeting real BACE laboratory scenarios, calculations, and diagnostic troubleshooting.
                      </p>
                    </div>

                    <button
                      onClick={() => startLesson(m.lesson_metadata.lesson_id)}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Launch 100% Mastery Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Interactive Domain Lessons */}
        {domainLessons.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Core Interactive Lessons ({domainLessons.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Deep-dive modules with laboratory protocols, check-your-understanding questions, and auto-graded assessments.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domainLessons.map((lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          Interactive Lesson
                        </span>
                        {isCompleted ? (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Mastered</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <span>Ready to Start</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {lesson.description}
                      </p>

                      <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100 mb-4">
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~{lesson.estimated_minutes || 20} mins</span>
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                          {lesson.sections?.length || 4} sections
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => startLesson(lesson.id)}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs group"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Topic Units List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Instructional Topics & Units ({domainTopics.length})
              </h2>
              <p className="text-xs text-slate-500">
                Work through key concepts, interactive worked examples, and check-your-understanding questions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainTopics.map((topic, index) => {
              const stats = getTopicStats(topic.id);

              return (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Unit index and Completion Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Topic {index + 1}
                      </span>
                      {stats.isCompleted ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      ) : stats.isStarted ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          <span>Not Started</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {topic.description}
                    </p>

                    {/* Estimated Time and Mastery Percentage */}
                    <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100 mb-4">
                      <div className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{stats.estMinutes} mins</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500 font-medium">Mastery:</span>
                        <MasteryBadge percentage={stats.mastery} size="sm" />
                      </div>
                    </div>
                  </div>

                  {/* Start Lesson Button */}
                  <button
                    onClick={() => {
                      const matchedLesson =
                        lessons.find((l) => l.topic_id === topic.id) ||
                        domainLessons[0] ||
                        lessons[0];
                      if (matchedLesson) {
                        startLesson(matchedLesson.id);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs group cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {stats.isCompleted
                        ? 'Review Topic Lesson'
                        : stats.isStarted
                        ? 'Continue Topic Lesson'
                        : 'Start Topic Lesson'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // All-Domains Overview View
  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Curriculum & Competencies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            BACE Learning Center
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Select any of the eight exam domains below to explore individual lesson units, key vocabulary, laboratory procedures, and check-your-understanding quizzes.
          </p>
        </div>
      </div>

      {/* 8 Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {domains.map((domain) => {
          const mastery = currentStudent.domain_mastery[domain.id] ?? 0;
          const details = getMasteryDetails(mastery);
          const domainTopicCount = topics.filter((t) => t.domain_id === domain.id).length || 5;

          return (
            <div
              key={domain.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                    <DomainIcon name={domain.icon_name} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {domain.exam_weight}% Weight
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1 leading-snug">
                  {domain.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {domain.description}
                </p>

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    {mastery}% Mastery
                  </span>
                  <MasteryBadge percentage={mastery} showPercentage={false} size="sm" />
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${details.progressColor}`}
                    style={{ width: `${Math.min(100, mastery)}%` }}
                  />
                </div>

                <div className="text-xs text-slate-500 mb-4">
                  {domainTopicCount} Curriculum Topics Available
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDomainId(domain.id);
                  setStudentPage('domain_detail');
                }}
                className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-xs group"
              >
                <span>Explore Topics</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
