import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  Plus,
  Calendar,
  Clock,
  BookOpen,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  X,
  School,
  ArrowRight,
  GraduationCap,
  Award,
  Search,
  Filter,
  Edit3,
  Check,
  AlertCircle,
  UserCheck,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { LessonGradeRecord } from '../../types/database';

export const TeacherAssignmentsView: React.FC = () => {
  const {
    assignments,
    assignmentProgress,
    classes,
    domains,
    lessons,
    students,
    lessonGrades,
    createAssignment,
    deleteAssignment,
    recordLessonGrade,
    updateLessonGrade,
  } = useApp();

  // Active top-level tab
  const [activeTab, setActiveTab] = useState<'assignments' | 'gradebook'>('assignments');

  // Assignment Creation Modal
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState(classes[0]?.id || 'cls_p2');
  const [assignmentType, setAssignmentType] = useState<'Lesson' | 'Practice' | 'Mock Exam'>('Lesson');
  const [dueDate, setDueDate] = useState('2026-04-18');
  const [referenceId, setReferenceId] = useState(lessons[0]?.id || 'les_pipette');
  const [instructions, setInstructions] = useState('');

  // Gradebook Filtering
  const [gradeSearch, setGradeSearch] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState('all');
  const [gradeStatusFilter, setGradeStatusFilter] = useState<'all' | 'mastered' | 'support'>('all');

  // Manual Grade / Edit Modal State
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<LessonGradeRecord | null>(null);

  // Form state for Grade Modal
  const [gradeStudentId, setGradeStudentId] = useState(students[0]?.profile.id || '');
  const [gradeLessonId, setGradeLessonId] = useState(lessons[0]?.id || 'les_pipette');
  const [gradeScore, setGradeScore] = useState<number>(5);
  const [gradeTotal, setGradeTotal] = useState<number>(5);
  const [gradeFeedback, setGradeFeedback] = useState('');
  const [gradeStatus, setGradeStatus] = useState<'Mastered' | 'Passed' | 'Needs Review'>('Mastered');

  // Open modal to create a new manual grade record
  const handleOpenNewGradeModal = () => {
    setEditingGrade(null);
    setGradeStudentId(students[0]?.profile.id || '');
    setGradeLessonId(lessons[0]?.id || 'les_pipette');
    setGradeScore(5);
    setGradeTotal(5);
    setGradeFeedback('Mastery demonstrated on domain lesson check.');
    setGradeStatus('Mastered');
    setShowGradeModal(true);
  };

  // Open modal to edit existing grade record
  const handleOpenEditGradeModal = (record: LessonGradeRecord) => {
    setEditingGrade(record);
    setGradeStudentId(record.student_id);
    setGradeLessonId(record.lesson_id);
    setGradeScore(record.score);
    setGradeTotal(record.total_questions);
    setGradeFeedback(record.teacher_feedback || '');
    setGradeStatus(record.status);
    setShowGradeModal(true);
  };

  // Save manual or edited grade
  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedScore = Math.max(0, Number(gradeScore));
    const parsedTotal = Math.max(1, Number(gradeTotal));
    const calculatedPercentage = Math.round((parsedScore / parsedTotal) * 100);

    const studentObj = students.find((s) => s.profile.id === gradeStudentId);
    const studentName = studentObj
      ? `${studentObj.profile.first_name} ${studentObj.profile.last_name}`
      : 'Student';

    if (editingGrade) {
      updateLessonGrade(editingGrade.id, {
        score: parsedScore,
        total_questions: parsedTotal,
        percentage: calculatedPercentage,
        status: gradeStatus,
        teacher_feedback: gradeFeedback,
      });
    } else {
      recordLessonGrade({
        student_id: gradeStudentId,
        student_name: studentName,
        lesson_id: gradeLessonId,
        score: parsedScore,
        total_questions: parsedTotal,
        percentage: calculatedPercentage,
        status: gradeStatus,
        teacher_feedback: gradeFeedback,
      });
    }

    setShowGradeModal(false);
  };

  // Create Assignment Form Submission
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createAssignment({
      class_id: classId,
      title,
      assignment_type: assignmentType,
      reference_id: referenceId,
      due_date: dueDate,
      instructions: instructions || 'Complete this assignment before our next laboratory block.',
    });

    setTitle('');
    setInstructions('');
    setShowAssignmentModal(false);
  };

  // Filtered Gradebook Records
  const filteredGrades = useMemo(() => {
    return lessonGrades.filter((record) => {
      // Student search
      if (gradeSearch.trim()) {
        const query = gradeSearch.toLowerCase();
        if (
          !record.student_name.toLowerCase().includes(query) &&
          !record.student_id.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Lesson filter
      if (selectedLessonFilter !== 'all' && record.lesson_id !== selectedLessonFilter) {
        return false;
      }

      // Domain filter
      if (selectedDomainFilter !== 'all') {
        const matchedLesson = lessons.find((l) => l.id === record.lesson_id);
        if (matchedLesson?.domain_id !== selectedDomainFilter) {
          return false;
        }
      }

      // Grade status / mastery filter
      if (gradeStatusFilter === 'mastered' && record.percentage < 80) return false;
      if (gradeStatusFilter === 'support' && record.percentage >= 80) return false;

      return true;
    });
  }, [lessonGrades, gradeSearch, selectedLessonFilter, selectedDomainFilter, gradeStatusFilter, lessons]);

  // Summary Metrics for Gradebook
  const gradebookStats = useMemo(() => {
    if (lessonGrades.length === 0) {
      return { total: 0, avg: 0, masteryRate: 0, domainsCovered: 0 };
    }
    const sum = lessonGrades.reduce((acc, curr) => acc + curr.percentage, 0);
    const avg = Math.round(sum / lessonGrades.length);
    const mastered = lessonGrades.filter((g) => g.percentage >= 80).length;
    const masteryRate = Math.round((mastered / lessonGrades.length) * 100);

    const domainsSet = new Set<string>();
    lessonGrades.forEach((g) => {
      const les = lessons.find((l) => l.id === g.lesson_id);
      if (les?.domain_id) domainsSet.add(les.domain_id);
    });

    return {
      total: lessonGrades.length,
      avg,
      masteryRate,
      domainsCovered: domainsSet.size,
    };
  }, [lessonGrades, lessons]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <ClipboardList className="w-3.5 h-3.5 text-teal-600" />
            <span>Curriculum & Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Assignments & Lesson Grading
          </h1>
          <p className="text-sm text-slate-600">
            Assign curriculum modules across all 8 domains and assess student competencies with the centralized lesson gradebook.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start">
          {activeTab === 'assignments' ? (
            <button
              onClick={() => setShowAssignmentModal(true)}
              className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Assignment</span>
            </button>
          ) : (
            <button
              onClick={handleOpenNewGradeModal}
              className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>+ Enter Manual Grade</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'assignments'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Active Assignments ({assignments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gradebook')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gradebook'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Lesson Gradebook & Assessment ({lessonGrades.length})</span>
        </button>
      </div>

      {/* TAB 1: ASSIGNMENTS VIEW */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Published Coursework & Milestones
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Synchronized with Student Dashboards
            </span>
          </div>

          <div className="space-y-4">
            {assignments.map((asg) => {
              const assignedClass = classes.find((c) => c.id === asg.class_id);
              const matchedLesson = lessons.find((l) => l.id === asg.reference_id);
              const matchedDomain = domains.find(
                (d) => d.id === asg.reference_id || d.id === matchedLesson?.domain_id
              );

              return (
                <div
                  key={asg.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                        {asg.assignment_type}
                      </span>
                      {matchedDomain && (
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          Domain: {matchedDomain.name}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <School className="w-3.5 h-3.5" />
                        {assignedClass ? `${assignedClass.name} (${assignedClass.period})` : 'All Sections'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due {asg.due_date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {asg.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {asg.instructions}
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 gap-2 shrink-0">
                    {(() => {
                      const completedCount = assignmentProgress.filter(
                        (p) => p.assignment_id === asg.id && p.status === 'Completed'
                      ).length;
                      const targetClassStudents = asg.class_id
                        ? students.filter((s) => s.class_id === asg.class_id)
                        : students;
                      const totalTarget = Math.max(targetClassStudents.length, completedCount > 0 ? completedCount : 1);
                      const completionRate = Math.round((completedCount / totalTarget) * 100);

                      return (
                        <>
                          <div className="text-right">
                            <div className="text-xs font-bold text-slate-900">
                              {completedCount} of {targetClassStudents.length} Completed
                            </div>
                            <div className="text-[11px] text-emerald-600 font-medium">
                              {completionRate}% Completion Rate
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-400">
                              Auto-Graded via Drills
                            </span>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete assignment "${asg.title}"?`)) {
                                  deleteAssignment(asg.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete Assignment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LESSON GRADEBOOK & ASSESSMENT */}
      {activeTab === 'gradebook' && (
        <div className="space-y-6">
          {/* Summary KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Submissions
              </span>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {gradebookStats.total}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Across all student cohorts</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Average Lesson Score
              </span>
              <div className="text-2xl font-bold text-teal-700 mt-1">
                {gradebookStats.avg}%
              </div>
              <p className="text-[11px] text-emerald-600 mt-0.5">Composite lesson performance</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                BACE Mastery Rate (≥80%)
              </span>
              <div className="text-2xl font-bold text-blue-700 mt-1">
                {gradebookStats.masteryRate}%
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Passing benchmark aligned</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Domain Representation
              </span>
              <div className="text-2xl font-bold text-purple-700 mt-1">
                {gradebookStats.domainsCovered} / 8
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Domains evaluated</p>
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student name..."
                value={gradeSearch}
                onChange={(e) => setGradeSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto text-xs">
              {/* Domain Filter */}
              <select
                value={selectedDomainFilter}
                onChange={(e) => {
                  setSelectedDomainFilter(e.target.value);
                  setSelectedLessonFilter('all');
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"
              >
                <option value="all">All Domains</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* Lesson Filter */}
              <select
                value={selectedLessonFilter}
                onChange={(e) => setSelectedLessonFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 max-w-[220px]"
              >
                <option value="all">All Lessons ({lessons.length})</option>
                {(selectedDomainFilter === 'all'
                  ? lessons
                  : lessons.filter((l) => l.domain_id === selectedDomainFilter)
                ).map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>

              {/* Mastery Level Filter */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setGradeStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    gradeStatusFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Grades
                </button>
                <button
                  onClick={() => setGradeStatusFilter('mastered')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    gradeStatusFilter === 'mastered'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mastered (≥80%)
                </button>
                <button
                  onClick={() => setGradeStatusFilter('support')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    gradeStatusFilter === 'support'
                      ? 'bg-white text-amber-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Needs Review (&lt;80%)
                </button>
              </div>
            </div>
          </div>

          {/* Gradebook Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Lesson & Domain</th>
                    <th className="py-3.5 px-4 text-center">Score</th>
                    <th className="py-3.5 px-4 text-center">Mastery %</th>
                    <th className="py-3.5 px-4">Teacher Feedback / Notes</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGrades.map((record) => {
                    const matchedLesson = lessons.find((l) => l.id === record.lesson_id);
                    const matchedDomain = domains.find((d) => d.id === matchedLesson?.domain_id);
                    const isPassing = record.percentage >= 80;

                    return (
                      <tr key={record.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Student Name */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {record.student_name}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {record.student_id}
                          </span>
                        </td>

                        {/* Lesson & Domain */}
                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {matchedLesson?.title || record.lesson_id}
                          </div>
                          <div className="flex items-center space-x-1 text-[11px] text-teal-700 font-medium mt-0.5">
                            {matchedDomain && (
                              <>
                                <DomainIcon name={matchedDomain.icon_name} className="w-3 h-3 inline" />
                                <span>{matchedDomain.name}</span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Score */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-slate-900 text-sm">
                            {record.score}
                          </span>
                          <span className="text-slate-400"> / {record.total_questions}</span>
                        </td>

                        {/* Mastery % */}
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold text-xs ${
                              isPassing
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {record.percentage}%
                          </span>
                        </td>

                        {/* Teacher Feedback */}
                        <td className="py-4 px-4 max-w-sm">
                          <p className="text-slate-600 line-clamp-2 text-xs leading-relaxed">
                            {record.teacher_feedback || 'No comments recorded.'}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                          {record.submitted_at.split('T')[0]}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditGradeModal(record)}
                            className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Grade</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredGrades.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500">
                        <FileCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="font-semibold text-sm text-slate-700">No Grade Records Found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Try adjusting your filters or click "+ Enter Manual Grade" to score a lesson.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE ASSIGNMENT */}
      {showAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-teal-700" />
                <h2 className="text-lg font-bold text-slate-900">New BACE Assignment</h2>
              </div>
              <button
                onClick={() => setShowAssignmentModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              {/* Class Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assign to Class
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.period})
                    </option>
                  ))}
                </select>
              </div>

              {/* Assignment Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assignment Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Lesson', 'Practice', 'Mock Exam'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAssignmentType(type)}
                      className={`py-2 rounded-xl border font-semibold text-xs transition-all ${
                        assignmentType === type
                          ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Targeted Learning Unit / Domain / Lesson */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {assignmentType === 'Lesson'
                    ? 'Targeted Domain Lesson'
                    : assignmentType === 'Mock Exam'
                    ? 'Exam Simulation Format'
                    : 'Targeted Domain Drill'}
                </label>
                <select
                  value={referenceId}
                  onChange={(e) => {
                    setReferenceId(e.target.value);
                    if (assignmentType === 'Lesson') {
                      const l = lessons.find((item) => item.id === e.target.value);
                      if (l && !title) setTitle(`Lesson Module: ${l.title}`);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                >
                  {assignmentType === 'Lesson' ? (
                    domains.map((dom) => {
                      const domLessons = lessons.filter((l) => l.domain_id === dom.id);
                      if (domLessons.length === 0) return null;
                      return (
                        <optgroup key={dom.id} label={`Domain ${dom.id.replace('d', '')}: ${dom.name}`}>
                          {domLessons.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.title}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })
                  ) : assignmentType === 'Mock Exam' ? (
                    <>
                      <option value="quick">Quick Mock Exam (25 Questions)</option>
                      <option value="half">Half Mock Exam (50 Questions)</option>
                      <option value="full">Full BACE Simulation (100 Questions)</option>
                    </>
                  ) : (
                    domains.map((d) => (
                      <option key={d.id} value={d.id}>
                        Domain: {d.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dilution Formulas Practice & Verification"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              {/* Instructions */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Teacher Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter specific instructions, required passing score, or prep guidance..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-xs"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL GRADE / EDIT GRADE RECORD */}
      {showGradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-teal-700" />
                <h2 className="text-lg font-bold text-slate-900">
                  {editingGrade ? 'Edit Lesson Grade & Rubric' : 'Record Manual Lesson Grade'}
                </h2>
              </div>
              <button
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs">
              {/* Student Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Name
                </label>
                <select
                  disabled={!!editingGrade}
                  value={gradeStudentId}
                  onChange={(e) => setGradeStudentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white disabled:bg-slate-100 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                >
                  {students.map((stu) => (
                    <option key={stu.profile.id} value={stu.profile.id}>
                      {stu.profile.first_name} {stu.profile.last_name} ({stu.profile.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lesson to Grade (Grouped by Domain)
                </label>
                <select
                  disabled={!!editingGrade}
                  value={gradeLessonId}
                  onChange={(e) => setGradeLessonId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white disabled:bg-slate-100 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                >
                  {domains.map((dom) => {
                    const domLessons = lessons.filter((l) => l.domain_id === dom.id);
                    if (domLessons.length === 0) return null;
                    return (
                      <optgroup key={dom.id} label={`Domain ${dom.id.replace('d', '')}: ${dom.name}`}>
                        {domLessons.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.title}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </div>

              {/* Score and Total */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Points Earned (Score)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={gradeTotal}
                    required
                    value={gradeScore}
                    onChange={(e) => setGradeScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Total Possible Points
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={gradeTotal}
                    onChange={(e) => setGradeTotal(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Calculated Percentage Preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Calculated Percentage:</span>
                <span className="font-bold text-sm text-slate-900">
                  {Math.round((gradeScore / Math.max(1, gradeTotal)) * 100)}%
                  <span className="text-[11px] font-normal text-slate-500 ml-1.5">
                    {Math.round((gradeScore / Math.max(1, gradeTotal)) * 100) >= 80
                      ? '(Mastery Level)'
                      : '(Needs Remediation)'}
                  </span>
                </span>
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Grading Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGradeStatus('Mastered')}
                    className={`py-2 rounded-xl border font-semibold text-xs transition-all ${
                      gradeStatus === 'Mastered'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Mastered
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradeStatus('Passed')}
                    className={`py-2 rounded-xl border font-semibold text-xs transition-all ${
                      gradeStatus === 'Passed'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Passed
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradeStatus('Needs Review')}
                    className={`py-2 rounded-xl border font-semibold text-xs transition-all ${
                      gradeStatus === 'Needs Review'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Needs Review
                  </button>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Teacher Feedback & Remediation Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Demonstrated excellent grasp of standard dilution steps. Review pipetting technique..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-xs"
                >
                  {editingGrade ? 'Update Grade Record' : 'Submit Grade'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
