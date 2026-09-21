import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Clock,
  X,
  ChevronRight,
  Sparkles,
  UserPlus,
  Send,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MasteryBadge } from '../common/MasteryBadge';
import { DomainIcon } from '../common/DomainIcon';
import { getMasteryDetails, StudentOverview } from '../../types/database';
import { CreateStudentModal } from '../common/CreateStudentModal';

export const TeacherStudentsView: React.FC = () => {
  const {
    students,
    classes,
    domains,
    selectedStudentId,
    setSelectedStudentId,
    createAssignment,
    deleteStudentAccount,
  } = useApp();

  const [filterLevel, setFilterLevel] = useState<'All' | 'Ready' | 'Developing' | 'Needs Support'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [assignReviewSuccess, setAssignReviewSuccess] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<StudentOverview | null>(null);

  // Filter logic
  const filteredStudents = students.filter((stu) => {
    // Search
    const fullName = `${stu.profile.first_name} ${stu.profile.last_name}`.toLowerCase();
    if (searchQuery && !fullName.includes(searchQuery.toLowerCase())) return false;

    // Class filter
    if (selectedClassFilter !== 'all' && stu.class_id !== selectedClassFilter) return false;

    // Readiness Level filter (All, BACE Ready (80%+), Developing (70–79%), Needs Support (<70%))
    if (filterLevel === 'Ready' && stu.overall_readiness < 80) return false;
    if (filterLevel === 'Developing' && (stu.overall_readiness < 70 || stu.overall_readiness >= 80)) return false;
    if (filterLevel === 'Needs Support' && stu.overall_readiness >= 70) return false;

    return true;
  });

  const activeStudent = students.find((s) => s.profile.id === selectedStudentId);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Student Performance Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Student Roster & Domain Mastery
          </h1>
          <p className="text-sm text-slate-600">
            Monitor individualized BACE preparation progress, practice metrics, and targeted intervention needs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-900">{filteredStudents.length}</span> of {students.length} Students Shown
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar (Matching prompt: All, BACE Ready (80%+), Developing (70–79%), Needs Support (<70%)) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Readiness Level Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Readiness:
          </span>

          <button
            onClick={() => setFilterLevel('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterLevel === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({students.length})
          </button>

          <button
            onClick={() => setFilterLevel('Ready')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterLevel === 'Ready'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            BACE Ready (80%+)
          </button>

          <button
            onClick={() => setFilterLevel('Developing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterLevel === 'Developing'
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            Developing (70–79%)
          </button>

          <button
            onClick={() => setFilterLevel('Needs Support')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterLevel === 'Needs Support'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            Needs Support (&lt;70%)
          </button>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Class Section</th>
                <th className="p-3.5">BACE Readiness</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Questions Attempted</th>
                <th className="p-3.5">Accuracy</th>
                <th className="p-3.5">Weakest Topic</th>
                <th className="p-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((stu) => {
                const assignedClass = classes.find((c) => c.id === stu.class_id);
                const weakest = stu.weakest_topics[0]?.name || 'Applied Math';

                return (
                  <tr
                    key={stu.profile.id}
                    onClick={() => setSelectedStudentId(stu.profile.id)}
                    className="hover:bg-teal-50/20 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-semibold text-slate-900 flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs border border-teal-100">
                        {stu.profile.first_name[0]}
                        {stu.profile.last_name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {stu.profile.first_name} {stu.profile.last_name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {stu.profile.email}
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-700 font-medium">
                      {assignedClass?.period || 'Period 2'}
                    </td>

                    <td className="p-3.5 font-extrabold text-slate-900 text-sm">
                      {stu.overall_readiness}%
                    </td>

                    <td className="p-3.5">
                      <MasteryBadge percentage={stu.overall_readiness} size="sm" />
                    </td>

                    <td className="p-3.5 font-medium text-slate-700">
                      {stu.questions_attempted} Qs
                    </td>

                    <td className="p-3.5 font-semibold text-slate-800">
                      {stu.accuracy}%
                    </td>

                    <td className="p-3.5">
                      <span className="text-[11px] font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        {weakest}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudentId(stu.profile.id);
                          }}
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <span>View Domain Mastery</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStudentToDelete(stu);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Deletion Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Remove Student Account</h3>
              <p className="text-xs text-slate-600 mt-1">
                Are you sure you want to permanently remove <strong>{studentToDelete.profile.first_name} {studentToDelete.profile.last_name}</strong> from your class roster and delete their progress records?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteStudentAccount(studentToDelete.profile.id);
                  setStudentToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Student Progress & Domain Mastery Modal / Drawer */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-base border border-teal-200">
                  {activeStudent.profile.first_name[0]}
                  {activeStudent.profile.last_name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {activeStudent.profile.first_name} {activeStudent.profile.last_name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeStudent.profile.email} • Student ID: {activeStudent.profile.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Readiness
                </div>
                <div className="text-2xl font-extrabold text-teal-700 mt-0.5">
                  {activeStudent.overall_readiness}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Accuracy
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {activeStudent.accuracy}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Questions
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {activeStudent.questions_attempted}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Lessons Done
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  {activeStudent.lessons_completed}
                </div>
              </div>
            </div>

            {/* Domain Mastery Breakdown for This Student */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Domain Mastery Breakdown
                </h3>
                <span className="text-[11px] text-slate-500">80% Passing Threshold</span>
              </div>

              <div className="space-y-3">
                {domains.map((d) => {
                  const mastery = activeStudent.domain_mastery[d.id] ?? 0;
                  const details = getMasteryDetails(mastery);

                  return (
                    <div key={d.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center space-x-1.5">
                          <DomainIcon name={d.icon_name} className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-semibold text-slate-800">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">{mastery}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full ${details.progressColor}`}
                          style={{ width: `${Math.min(100, mastery)}%` }}
                        />
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60"
                          style={{ left: '80%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weakest Topics & Mock Exam History */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Identified Weak Topics
                </div>
                <div className="space-y-1 text-xs">
                  {(activeStudent.weakest_topics || []).length === 0 ? (
                    <p className="text-slate-500 italic">No topic deficits identified yet.</p>
                  ) : (
                    activeStudent.weakest_topics.map((t, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{t.name}</span>
                        <span className="font-bold text-rose-700">{t.percentage}%</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Mock Exam Records
                </div>
                <div className="space-y-1 text-xs">
                  {(activeStudent.mock_exam_scores || []).length === 0 ? (
                    <p className="text-slate-500 italic">No mock exams taken yet.</p>
                  ) : (
                    activeStudent.mock_exam_scores.map((m: any, idx: number) => {
                      const scoreVal = typeof m === 'number' ? m : m?.score ?? 0;
                      const titleVal = typeof m === 'object' && m?.title ? m.title : `Mock Exam #${idx + 1}`;
                      return (
                        <div key={idx} className="flex justify-between text-slate-700">
                          <span>{titleVal}</span>
                          <span className="font-bold text-teal-700">{scoreVal}%</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Permanently remove student ${activeStudent.profile.first_name} ${activeStudent.profile.last_name} from the roster?`
                    )
                  ) {
                    deleteStudentAccount(activeStudent.profile.id);
                    setSelectedStudentId(null);
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200 transition-colors"
                title="Remove this student"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Student</span>
              </button>

              <div className="flex items-center space-x-3">
                {assignReviewSuccess ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Review assignment created & dispatched!
                </span>
              ) : (
                <button
                  onClick={() => {
                    const topWeak = activeStudent.weakest_topics[0]?.name || 'Applied Math Competencies';
                    createAssignment({
                      title: `Targeted Review: ${topWeak} (${activeStudent.profile.first_name})`,
                      class_id: activeStudent.class_id,
                      assignment_type: 'Targeted Review',
                      reference_id: 'd4',
                      due_date: '2026-04-05',
                      instructions: `Complete practice problem sets and reinforce benchmark competency in ${topWeak}.`,
                    });
                    setAssignReviewSuccess(true);
                    setTimeout(() => setAssignReviewSuccess(false), 2500);
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-teal-700" />
                  <span>Assign Targeted Review</span>
                </button>
              )}

              <button
                onClick={() => setSelectedStudentId(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white"
              >
                Done
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Test Student Account Modal */}
      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
