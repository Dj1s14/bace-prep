import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Check,
  RotateCcw,
  Shuffle,
  Search,
  ExternalLink,
  ListFilter,
  GraduationCap,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  Target,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { LessonBenchGuide } from './LessonBenchGuide';
import { LessonLabActivities } from './LessonLabActivities';
import { AdaptiveMasteryModule } from './AdaptiveMasteryModule';
import { LessonStudyToolkit } from './LessonStudyToolkit';
import { ALL_MASTERY_LESSONS, getMasteryLesson } from '../../data/mastery';
import { cleanQuestionText } from '../../utils/questionUtils';
import { Lesson, BenchSkillTopic, LabActivityScenario } from '../../types/database';

const buildFallbackBenchModules = (lesson: Lesson): BenchSkillTopic[] => {
  const concepts = lesson.important_concepts?.filter(Boolean) || [];
  const mistakes = lesson.common_mistakes?.filter(Boolean) || [];
  const vocab = lesson.key_vocabulary?.filter(Boolean) || [];
  const primaryConcept = concepts[0] || lesson.description;
  const secondaryConcept = concepts[1] || lesson.bace_exam_tip;
  const keyTerms = vocab.slice(0, 4).map((item) => item.term).join(', ');

  return [
    {
      title: `${lesson.title}: Bench Readiness`,
      core_idea: lesson.description,
      purpose: primaryConcept,
      condition:
        'Perform the task only under the approved laboratory SOP, with the correct PPE, labeled materials, verified equipment status, and instructor or supervisor authorization.',
      evidence:
        'Record the sample or material identity, date/time, equipment or lot identifiers when applicable, observations, calculations, deviations, and final result using good documentation practices.',
      where_in_lab:
        'This competency may appear at a preparation bench, analytical station, biosafety workspace, documentation station, or quality-control checkpoint depending on the lesson.',
      procedure_awareness: [
        'Read the applicable SOP and confirm the correct materials, equipment, settings, and sequence before beginning.',
        primaryConcept,
        secondaryConcept,
        'Pause and resolve any unexpected condition before continuing when the validity, safety, or traceability of the work could be affected.',
      ].filter(Boolean),
      material_details: [
        keyTerms ? `Know the purpose and correct use of key terms/materials such as: ${keyTerms}.` : 'Verify the identity and suitability of all materials before use.',
        'Check labels, expiration or preparation dates, required storage conditions, and equipment status where applicable.',
        'Use clean or sterile consumables when the procedure requires contamination control.',
      ],
      what_to_notice:
        'Compare the observed result with the expected appearance, measurement, control behavior, and procedural acceptance criteria described in the lesson and SOP.',
      signs_of_valid_result: [
        'Required controls or checks behave as expected.',
        'Measurements or observations are internally consistent and fall within the stated acceptance criteria.',
        'Documentation is complete enough for another technician to reconstruct what was done.',
      ],
      connecting_to_decision: [
        'Accept and document the result when required checks and acceptance criteria are met.',
        'Investigate before reporting when a control, instrument check, label, or procedural step is questionable.',
        'Escalate deviations or out-of-specification findings according to the SOP rather than improvising a correction.',
      ],
      common_problems:
        mistakes.length > 0
          ? mistakes.slice(0, 4)
          : [
              'Skipping a required verification step.',
              'Using the wrong material, setting, unit, or sequence.',
              'Failing to document an unexpected result or deviation.',
            ],
      prevention: [
        'Use a pre-run checklist and verify the SOP version before starting.',
        'Label materials before or immediately as they are prepared, according to local procedure.',
        'Check calculations, units, controls, and instrument status before accepting results.',
        'Document corrections transparently; never erase or obscure original data.',
      ],
      impact_on_work: [
        'Poor technique can invalidate the result and require repeat work.',
        'Incomplete traceability can make otherwise correct work unusable for quality purposes.',
        'Recognizing an error early protects safety, sample integrity, time, and downstream decisions.',
      ],
    },
  ];
};

const buildFallbackLabActivities = (lesson: Lesson): LabActivityScenario[] => {
  const mistake = lesson.common_mistakes?.[0] || 'a required verification step was skipped';
  const concept = lesson.important_concepts?.[0] || lesson.description;

  return [
    {
      id: `${lesson.id}_fallback_scenario_1`,
      title: 'Procedure Deviation at the Bench',
      scenario: `While working on ${lesson.title}, you realize that ${mistake}. The work is not yet reported. What is the best technician response?`,
      options: [
        {
          id: 'a',
          text: 'Continue the procedure and only mention the issue if the final result looks abnormal.',
          is_correct: false,
          feedback: 'Continuing can compound the error and may make the final result unreliable.',
        },
        {
          id: 'b',
          text: 'Stop at a safe point, preserve the sample/materials, document what occurred, and follow the SOP or supervisor instructions for the deviation.',
          is_correct: true,
          feedback: 'Correct. A technician should protect safety and traceability, then follow the approved deviation process.',
        },
        {
          id: 'c',
          text: 'Correct the record so the skipped step appears to have been completed.',
          is_correct: false,
          feedback: 'Records must reflect what actually occurred. Never backfill or falsify a completed step.',
        },
        {
          id: 'd',
          text: 'Discard everything immediately without documenting the event.',
          is_correct: false,
          feedback: 'Disposal may eventually be required, but the event and decision must first be handled according to procedure.',
        },
      ],
      explanation:
        'When a procedural deviation could affect safety, identity, traceability, or result validity, the correct response is to stop safely, document the actual event, and follow the approved SOP or escalation process.',
      bace_competency: `BACE application: ${concept}`,
    },
    {
      id: `${lesson.id}_fallback_scenario_2`,
      title: 'Unexpected Result or Control Check',
      scenario: `You complete a task related to ${lesson.title}, but the result does not match the expected pattern or acceptance criteria. What should you do first?`,
      options: [
        {
          id: 'a',
          text: 'Report the result as valid because the procedure was completed.',
          is_correct: false,
          feedback: 'Completion of the procedure does not automatically make the result valid.',
        },
        {
          id: 'b',
          text: 'Change the result to the expected value and document the expected value instead.',
          is_correct: false,
          feedback: 'Data must never be altered to fit expectations.',
        },
        {
          id: 'c',
          text: 'Verify controls, calculations, labels, equipment status, and critical procedural steps before deciding whether the result can be accepted or must be repeated.',
          is_correct: true,
          feedback: 'Correct. Troubleshooting begins by checking the factors that establish result validity.',
        },
        {
          id: 'd',
          text: 'Repeat the test immediately using different settings until the expected result appears.',
          is_correct: false,
          feedback: 'Unapproved changes can create a second deviation. Determine the cause and follow the authorized repeat procedure.',
        },
      ],
      explanation:
        'Unexpected results require a structured validity check. Controls, calculations, sample identity, equipment status, and procedural compliance should be reviewed before acceptance, repeat testing, or escalation.',
      bace_competency: `BACE troubleshooting: ${lesson.bace_exam_tip}`,
    },
  ];
};

export const LessonView: React.FC = () => {
  const lessonRootRef = React.useRef<HTMLDivElement>(null);
  const scrollLesson = (top = 0) => lessonRootRef.current?.closest('main')?.scrollTo({ top, left: 0, behavior: 'auto' });
  const {
    lessons,
    selectedLessonId,
    domains,
    setSelectedLessonId,
    setStudentPage,
    recordLessonCompletion,
    recordLessonGrade,
    currentStudent,
    activeStudentId,
    completedLessonIds,
    questions,
    setActivePracticeConfig,
  } = useApp();

  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const domain = domains.find((d) => d.id === lesson?.domain_id) || domains[0];

  const effectiveBenchModules = useMemo(
    () => (lesson.bench_modules && lesson.bench_modules.length > 0 ? lesson.bench_modules : buildFallbackBenchModules(lesson)),
    [lesson]
  );

  const effectiveLabActivities = useMemo(
    () => (lesson.lab_activities && lesson.lab_activities.length > 0 ? lesson.lab_activities : buildFallbackLabActivities(lesson)),
    [lesson]
  );


  // Active module view tab: theory, bench protocol guide, troubleshooting scenarios, assessment, or mastery
  const [activeTab, setActiveTab] = useState<'study' | 'theory' | 'bench_guide' | 'activities' | 'assessment' | 'mastery'>('study');

  // Mastery lesson for current lesson
  const defaultMasteryLesson = useMemo(() => {
    return getMasteryLesson(lesson.id);
  }, [lesson.id]);

  const [selectedMasteryLessonId, setSelectedMasteryLessonId] = useState<string>(defaultMasteryLesson?.lesson_metadata.lesson_id || '');

  // Sync selectedMasteryLessonId when lesson.id changes
  React.useEffect(() => {
    const matched = getMasteryLesson(lesson.id);
    setSelectedMasteryLessonId(matched?.lesson_metadata.lesson_id || '');
  }, [lesson.id]);

  React.useEffect(() => {
    scrollLesson();
  }, [lesson.id]);

  const activeMasteryLesson = useMemo(() => {
    return ALL_MASTERY_LESSONS.find(m => m.lesson_metadata.lesson_id === selectedMasteryLessonId) || defaultMasteryLesson;
  }, [selectedMasteryLessonId, defaultMasteryLesson]);

  // Questions mapped to this lesson (with topic/domain fallback for legacy lessons)
  const allLessonQuestions = useMemo(() => {
    const available = questions.filter(q => q.active !== false);
    const matched = available.filter((q) => q.lesson_id === lesson.id);
    if (matched.length > 0) return matched;
    const topicQuestions = available.filter(q => q.topic_id === lesson.topic_id);
    return topicQuestions.length ? topicQuestions : available.filter(q => q.domain_id === lesson.domain_id);
  }, [questions, lesson.id, lesson.topic_id, lesson.domain_id]);

  // Quiz vs Browse mode
  const [assessmentMode, setAssessmentMode] = useState<'quiz' | 'browse'>('quiz');
  const [drillSize, setDrillSize] = useState<number>(5);

  const drillSizeOptions = useMemo(() => {
    const fullBank = allLessonQuestions.length;
    return Array.from(
      new Set([...([5, 10, 25, 50].filter((size) => size < fullBank)), fullBank])
    ).filter((size) => size > 0);
  }, [allLessonQuestions.length]);

  React.useEffect(() => {
    setDrillSize(Math.min(5, Math.max(1, allLessonQuestions.length)));
    setDifficultyFilter('all');
    setBrowseSearch('');
    setBrowsePage(1);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setLessonFinished(false);
  }, [lesson.id, allLessonQuestions.length]);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [seed, setSeed] = useState<number>(0);
  const [browseSearch, setBrowseSearch] = useState<string>('');
  const [browsePage, setBrowsePage] = useState<number>(1);
  const browsePageSize = 10;

  // Filtered pool based on difficulty
  const filteredLessonPool = useMemo(() => {
    return allLessonQuestions.filter((q) => {
      if (difficultyFilter !== 'all') {
        if (q.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) return false;
      }
      return true;
    });
  }, [allLessonQuestions, difficultyFilter]);

  // Active quiz questions
  const checkQuestions = useMemo(() => {
    const shuffled = [...filteredLessonPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(drillSize, shuffled.length));
  }, [filteredLessonPool, drillSize, seed]);

  // Browse questions with search filter
  const browseFilteredQuestions = useMemo(() => {
    return allLessonQuestions.filter((q) => {
      if (difficultyFilter !== 'all') {
        if (q.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) return false;
      }
      if (browseSearch.trim()) {
        const s = browseSearch.toLowerCase();
        if (!q.question_text.toLowerCase().includes(s) && !q.explanation.toLowerCase().includes(s)) {
          return false;
        }
      }
      return true;
    });
  }, [allLessonQuestions, difficultyFilter, browseSearch]);

  const totalBrowsePages = Math.ceil(browseFilteredQuestions.length / browsePageSize) || 1;
  const paginatedBrowseQuestions = browseFilteredQuestions.slice(
    (browsePage - 1) * browsePageSize,
    browsePage * browsePageSize
  );

  // State for Check Your Understanding answers
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [lessonFinished, setLessonFinished] = useState(false);

  const handleSelectAnswer = (questionId: string, choiceId: string) => {
    if (submittedAnswers[questionId]) return; // already submitted
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (!selectedAnswers[questionId]) return;
    const updatedSubmitted = { ...submittedAnswers, [questionId]: true };
    setSubmittedAnswers(updatedSubmitted);

    // Check if all in active drill answered
    const totalAnswered = Object.keys(updatedSubmitted).length;
    if (totalAnswered >= checkQuestions.length) {
      setLessonFinished(true);
      recordLessonCompletion(lesson.id);

      let finalCorrect = 0;
      checkQuestions.forEach((q) => {
        const choice = q.choices.find((c) => c.is_correct);
        const ans = q.id === questionId ? selectedAnswers[questionId] : selectedAnswers[q.id];
        if (ans === choice?.id) {
          finalCorrect++;
        }
      });
      const percent = Math.round((finalCorrect / checkQuestions.length) * 100);
      recordLessonGrade({
        lesson_id: lesson.id,
        student_id: activeStudentId || currentStudent.profile.id || 'stu_alex',
        student_name: `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`,
        score: finalCorrect,
        total_questions: checkQuestions.length,
        percentage: percent,
        status: percent >= 80 ? 'Mastered' : percent >= 70 ? 'Passed' : 'Needs Review',
        teacher_feedback:
          percent >= 80
            ? 'Mastery demonstrated. Ready for BACE domain evaluation.'
            : 'Assessment completed. Review targeted laboratory procedures.',
      });
    }
  };

  const handleShuffle = () => {
    setSeed((s) => s + 1);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setLessonFinished(false);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setLessonFinished(false);
  };

  const handleLaunchExternalDrill = () => {
    setActivePracticeConfig({
      mode: `Lesson: ${lesson.title.split(':')[0]}`,
      lessonId: lesson.id,
      count: drillSize,
    });
    setStudentPage('practice');
  };

  const correctCount = checkQuestions.reduce((acc, q) => {
    const isSubmitted = submittedAnswers[q.id];
    const chosenId = selectedAnswers[q.id];
    const correctChoice = q.choices.find((c) => c.is_correct);
    return isSubmitted && chosenId === correctChoice?.id ? acc + 1 : acc;
  }, 0);

  const submittedCount = Object.keys(submittedAnswers).filter((id) =>
    checkQuestions.some((q) => q.id === id)
  ).length;

  const isCompleted = completedLessonIds.includes(lesson.id);

  // Nav helpers
  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div ref={lessonRootRef} className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Top Breadcrumb & Return button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStudentPage('domain_detail')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to {domain.name}</span>
        </button>

        {isCompleted && (
          <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Lesson Completed</span>
          </span>
        )}
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <DomainIcon name={domain.icon_name} className="w-4 h-4" />
          <span>{domain.name}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">~{lesson.estimated_minutes} min lesson</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {lesson.description}
        </p>

        {/* Progress indicator */}
        <div className="pt-2">
          <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1.5">
            <span>Lesson Progress</span>
            <span className="text-blue-700 font-semibold">
              {lessonFinished || isCompleted ? '100% Completed' : 'Instructional Phase'}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: lessonFinished || isCompleted ? '100%' : '60%' }}
            />
          </div>
        </div>

        {/* Quick Launch Mastery CTA */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 to-teal-50/80 p-3.5 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950">
                Mastery-Based "Answer Until 100%" Mode
              </div>
              <div className="text-[11px] text-emerald-800">
                Prove core bench competencies with paired parallel variants and diagnostic lab remediation.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('mastery')}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Launch Mastery Drill</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lesson Navigation Tabs: Theory, Bench Guide, Troubleshooting Scenarios, Assessment, Mastery */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none shadow-2xs">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex-1 min-w-[155px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'study'
              ? 'bg-white text-violet-700 shadow-2xs'
              : 'text-violet-700 hover:text-violet-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span>Study Sheet</span>
        </button>

        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'theory'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Curriculum Theory</span>
        </button>

        <button
          onClick={() => setActiveTab('mastery')}
          className={`flex-1 min-w-[190px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'mastery'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50'
          }`}
        >
          <Target className="w-4 h-4 text-emerald-400" />
          <span>100% Mastery Drill</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            {activeMasteryLesson.competencies.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bench_guide')}
          className={`flex-1 min-w-[170px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'bench_guide'
              ? 'bg-white text-teal-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-teal-600" />
          <span>Bench Guide</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
              {effectiveBenchModules.length}
            </span>
        </button>

        <button
          onClick={() => setActiveTab('activities')}
          className={`flex-1 min-w-[180px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'activities'
              ? 'bg-white text-indigo-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <span>Troubleshooting</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
              {effectiveLabActivities.length}
            </span>
        </button>

        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex-1 min-w-[150px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'assessment'
              ? 'bg-white text-blue-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Drills & Pool</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
            {allLessonQuestions.length}
          </span>
        </button>
      </div>

      {/* STUDY SHEET: ACTIVE RECALL & HIGH-YIELD REVIEW */}
      {activeTab === 'study' && (
        <LessonStudyToolkit lesson={lesson} />
      )}

      {/* TAB 1: CURRICULUM THEORY */}
      {activeTab === 'theory' && (
        <div className="space-y-8">
          {/* BACE Exam Tip Callout */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50/50 rounded-2xl p-5 sm:p-6 border border-blue-200/80 shadow-2xs">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0 shadow-xs">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                  BACE Exam Tip
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {lesson.bace_exam_tip}
                </p>
              </div>
            </div>
          </div>

          {/* Key Vocabulary Grid */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Key Vocabulary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {lesson.key_vocabulary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="text-xs font-bold text-blue-800 tracking-wide mb-1">
                    {item.term}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {item.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Concepts Checklist */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900">Important Concepts</h2>
            </div>

            <ul className="space-y-3">
              {lesson.important_concepts.map((concept, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructional Material Sections */}
          <div className="space-y-6">
            {lesson.sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3"
              >
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {lesson.references?.length ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 mb-3">Sources & Further Reading</h3>
              <ul className="space-y-2">
                {lesson.references.map(source => <li key={source.url}><a className="text-sm text-blue-700 underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}
              </ul>
              <p className="text-xs text-slate-600 mt-3">Original preparation material. For actual laboratory work, follow approved local procedures and required training.</p>
            </div>
          ) : null}

          {/* Worked Examples */}
          {lesson.worked_examples && lesson.worked_examples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Worked Laboratory Examples</span>
              </h2>

              {lesson.worked_examples.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Example {idx + 1}: {example.title}
                  </div>
                  <div className="text-sm text-slate-800 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                    {example.scenario}
                  </div>

                  {example.calculation && (
                    <div className="text-xs font-mono bg-slate-900 text-teal-300 p-4 rounded-xl leading-relaxed whitespace-pre-line overflow-x-auto">
                      {example.calculation}
                    </div>
                  )}

                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                    <strong className="font-semibold block mb-1">Standard Solution & Rationale:</strong>
                    {example.solution}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Common Mistakes */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900">Common Mistakes to Avoid</h2>
            </div>

            <div className="space-y-3">
              {lesson.common_mistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-rose-900"
                >
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Stage Navigation Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-0.5">
                Next Learning Stage
              </div>
              <div className="text-sm font-bold text-slate-900">
                Explore the 4-Dimension Technician Bench Protocol Guide
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('bench_guide');
                scrollLesson();
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2.5 rounded-xl transition-colors shadow-2xs shrink-0"
            >
              <span>View Bench Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICIAN BENCH GUIDE */}
      {activeTab === 'bench_guide' && (
        <div className="space-y-6">
          <LessonBenchGuide modules={effectiveBenchModules} lessonTitle={lesson.title} />

          {/* Next Stage Navigation Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-0.5">
                Next Learning Stage
              </div>
              <div className="text-sm font-bold text-slate-900">
                Apply your judgment in Interactive Troubleshooting Scenarios
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('activities');
                scrollLesson();
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-xl transition-colors shadow-2xs shrink-0"
            >
              <span>Go to Scenarios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: TROUBLESHOOTING SCENARIOS */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          <LessonLabActivities activities={effectiveLabActivities} lessonTitle={lesson.title} />

          {/* Next Stage Navigation Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">
                Ready for the Final Check?
              </div>
              <div className="text-sm font-bold text-slate-900">
                Test your mastery with the Lesson Assessment & Question Bank
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('assessment');
                scrollLesson();
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition-colors shadow-2xs shrink-0"
            >
              <span>Take Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ASSESSMENTS & DRILLS */}
      {activeTab === 'assessment' && (
      <section className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Lesson Assessment & Question Bank</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Check Your Understanding</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Practice with curriculum-aligned questions calibrated for this lesson.
            </p>
          </div>

          {/* Mode Switcher: Quiz vs Browse */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              onClick={() => {
                setAssessmentMode('quiz');
                handleResetQuiz();
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                assessmentMode === 'quiz'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Quiz
            </button>
            <button
              onClick={() => setAssessmentMode('browse')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                assessmentMode === 'browse'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Repository
            </button>
          </div>
        </div>

        {/* QUIZ MODE */}
        {assessmentMode === 'quiz' && (
          <div className="space-y-6">
            {/* Quiz Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-600">Drill Size:</span>
                {drillSizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setDrillSize(sz);
                      handleResetQuiz();
                    }}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      drillSize === sz
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sz === allLessonQuestions.length ? `Full Bank (${allLessonQuestions.length})` : `${sz} Qs`}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={difficultyFilter}
                  onChange={(e) => {
                    setDifficultyFilter(e.target.value);
                    handleResetQuiz();
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-white border border-slate-200 text-slate-700 font-semibold"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <button
                  onClick={handleShuffle}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md font-semibold transition-colors"
                  title={`Draw a new random set from ${allLessonQuestions.length} lesson questions`}
                >
                  <Shuffle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={handleLaunchExternalDrill}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-md font-bold transition-colors"
                  title="Open in Full Screen Practice Runner"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
                  <span>Practice Center</span>
                </button>
              </div>
            </div>

            {/* Score & Progress Summary */}
            <div className="flex items-center justify-between text-xs font-semibold px-1">
              <span className="text-slate-600">
                Answered {submittedCount} of {checkQuestions.length} questions
              </span>
              {submittedCount > 0 && (
                <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Current Score: {correctCount}/{submittedCount} (
                  {Math.round((correctCount / submittedCount) * 100)}%)
                </span>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {checkQuestions.map((q, qIndex) => {
                const isSubmitted = submittedAnswers[q.id];
                const chosenId = selectedAnswers[q.id];
                const correctChoice = q.choices.find((c) => c.is_correct);
                const isCorrect = isSubmitted && chosenId === correctChoice?.id;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                        : 'bg-slate-50/60 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Question {qIndex + 1} of {checkQuestions.length}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 mb-4 leading-relaxed">
                      {cleanQuestionText(q.question_text)}
                    </p>

                    {/* Choices */}
                    <div className="space-y-2.5 mb-4">
                      {q.choices.map((choice, cIndex) => {
                        const letter = String.fromCharCode(65 + cIndex);
                        const isSelected = chosenId === choice.id;

                        let choiceStyles = 'bg-white border-slate-200 hover:border-blue-300 text-slate-800';

                        if (isSubmitted) {
                          if (choice.is_correct) {
                            choiceStyles = 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-medium';
                          } else if (isSelected && !choice.is_correct) {
                            choiceStyles = 'bg-rose-100/70 border-rose-400 text-rose-950';
                          } else {
                            choiceStyles = 'bg-white/60 border-slate-200 text-slate-400 opacity-70';
                          }
                        } else if (isSelected) {
                          choiceStyles = 'bg-blue-50 border-blue-600 text-blue-900 font-medium ring-1 ring-blue-600';
                        }

                        return (
                          <button
                            key={choice.id}
                            disabled={isSubmitted}
                            onClick={() => handleSelectAnswer(q.id, choice.id)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center space-x-3 transition-all ${choiceStyles}`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 text-slate-700">
                              {letter}
                            </span>
                            <span className="flex-1 leading-snug">{choice.choice_text}</span>
                            {isSubmitted && choice.is_correct && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && !choice.is_correct && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit button if not yet checked */}
                    {!isSubmitted ? (
                      <button
                        disabled={!chosenId}
                        onClick={() => handleSubmitAnswer(q.id)}
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl transition-colors shadow-2xs"
                      >
                        <span>Check Answer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      /* Immediate Answer Feedback */
                      <div
                        className={`p-4 rounded-xl text-xs space-y-1.5 border ${
                          isCorrect
                            ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950'
                            : 'bg-rose-100/60 border-rose-300 text-rose-950'
                        }`}
                      >
                        <div className="font-bold flex items-center space-x-1.5 text-sm">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>Correct</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-700" />
                              <span>Incorrect</span>
                            </>
                          )}
                        </div>
                        {!isCorrect && (
                          <div className="font-semibold text-slate-800">
                            Correct Answer: {correctChoice?.choice_text}
                          </div>
                        )}
                        <p className="text-slate-700 leading-relaxed pt-1">
                          {cleanQuestionText(q.explanation)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BROWSE MODE */}
        {assessmentMode === 'browse' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Search ${allLessonQuestions.length} lesson questions...`}
                  value={browseSearch}
                  onChange={(e) => {
                    setBrowseSearch(e.target.value);
                    setBrowsePage(1);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 self-end sm:self-auto">
                <span>{browseFilteredQuestions.length} Questions in Repository</span>
              </div>
            </div>

            <div className="space-y-4">
              {paginatedBrowseQuestions.map((q) => {
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded text-[11px]">
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] font-medium text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
                        BACE Practice Question
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {cleanQuestionText(q.question_text)}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.choices.map((c, cIdx) => (
                        <div
                          key={c.id}
                          className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                            c.is_correct
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                              c.is_correct ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + cIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{c.choice_text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-1">Explanation & BACE Rubric:</span>
                      <p className="leading-relaxed">{cleanQuestionText(q.explanation)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Browse Pagination */}
            {totalBrowsePages > 1 && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span>
                  Page {browsePage} of {totalBrowsePages}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={browsePage === 1}
                    onClick={() => setBrowsePage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    disabled={browsePage === totalBrowsePages}
                    onClick={() => setBrowsePage((p) => Math.min(totalBrowsePages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      )}

      {/* TAB 5: ADAPTIVE 100% MASTERY MODULE */}
      {activeTab === 'mastery' && (
        <div className="space-y-6">
          {/* Module Selector Bar for easy navigation across all BACE domains */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                  BACE Exam Domain Mastery Modules
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Select Competency Module ({ALL_MASTERY_LESSONS.length} Modules Available)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="mastery-module-select" className="text-xs font-semibold text-slate-500 shrink-0">
                Active Module:
              </label>
              <select
                id="mastery-module-select"
                value={activeMasteryLesson?.lesson_metadata.lesson_id || ''}
                onChange={(e) => setSelectedMasteryLessonId(e.target.value)}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="" disabled>Choose a mastery module</option>
                {ALL_MASTERY_LESSONS.map((m) => (
                  <option key={m.lesson_metadata.lesson_id} value={m.lesson_metadata.lesson_id}>
                    [{m.lesson_metadata.domain}] {m.lesson_metadata.sublesson}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Render the Interactive Adaptive Engine */}
          {activeMasteryLesson ? <AdaptiveMasteryModule
            key={activeMasteryLesson.lesson_metadata.lesson_id}
            masteryLesson={activeMasteryLesson}
            onExit={() => setActiveTab('theory')}
          /> : <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-slate-700">This lesson has no dedicated adaptive mastery module yet. Use its lesson assessment, or choose a separate module above.</div>}
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => {
            if (prevLesson) {
              setSelectedLessonId(prevLesson.id);
              scrollLesson();
            } else {
              setStudentPage('domain_detail');
            }
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{prevLesson ? 'Previous Lesson' : 'Return to Domain'}</span>
        </button>

        <button
          onClick={() => setStudentPage('domain_detail')}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2.5"
        >
          <span>Return to Domain</span>
        </button>

        <button
          onClick={() => {
            if (nextLesson) {
              setSelectedLessonId(nextLesson.id);
              scrollLesson();
            } else {
              setStudentPage('learn');
            }
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors shadow-xs"
        >
          <span>{nextLesson ? 'Next Lesson' : 'Complete Unit'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
