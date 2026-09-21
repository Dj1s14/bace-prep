import React, { useState } from 'react';
import {
  Users,
  Award,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  TrendingUp,
  Plus,
  ArrowRight,
  School,
  FileCheck,
  ChevronRight,
  Clock,
  Search,
  Filter,
  X,
  Send,
  BookOpen,
  FlaskConical,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { MasteryBadge } from '../common/MasteryBadge';
import { getMasteryDetails } from '../../types/database';

export const TeacherDashboard: React.FC = () => {
  const {
    currentTeacher,
    students,
    classes,
    domains,
    assignments,
    assignmentProgress,
    setTeacherPage,
    setSelectedStudentId,
    createAssignment,
  } = useApp();

  const [selectedStudentForModal, setSelectedStudentForModal] = useState<string | null>(null);
  const [classOverviewSearch, setClassOverviewSearch] = useState('');
  const [classOverviewFilter, setClassOverviewFilter] = useState<'All' | 'Ready' | 'Developing' | 'Needs Review' | 'At Risk'>('All');
  const [assignReviewSuccess, setAssignReviewSuccess] = useState(false);

  const totalStudents = students.length;
  const avgReadiness = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.overall_readiness, 0) / totalStudents)
    : 0;
  const baceReadyCount = students.filter((s) => s.overall_readiness >= 80).length;
  const developingCount = students.filter(
    (s) => s.overall_readiness >= 70 && s.overall_readiness < 80
  ).length;
  const needsReviewCount = students.filter(
    (s) => s.overall_readiness >= 60 && s.overall_readiness < 70
  ).length;
  const atRiskCount = students.filter((s) => s.overall_readiness < 60).length;
  const studentsNeedingReviewTotal = needsReviewCount + atRiskCount;
  const assignmentsDueCount = assignments.length;

  // Domain performance overview across all enrolled students
  const domainAverages = domains.map((domain) => {
    const total = students.reduce(
      (acc, s) => acc + (s.domain_mastery[domain.id] ?? 0),
      0
    );
    const average = totalStudents > 0 ? Math.round(total / totalStudents) : 0;
    return {
      domain,
      average,
    };
  });

  // Get status category for a student
  const getStudentStatus = (readiness: number): { label: 'Ready' | 'Developing' | 'Needs Review' | 'At Risk'; badgeClass: string } => {
    if (readiness >= 80) {
      return {
        label: 'Ready',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      };
    }
    if (readiness >= 70) {
      return {
        label: 'Developing',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
    if (readiness >= 60) {
      return {
        label: 'Needs Review',
        badgeClass: 'bg-orange-50 text-orange-800 border-orange-200',
      };
    }
    return {
      label: 'At Risk',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    };
  };

  // Filtered students for Class Overview table
  const filteredStudents = students.filter((stu) => {
    const fullName = `${stu.profile.first_name} ${stu.profile.last_name}`.toLowerCase();
    if (classOverviewSearch && !fullName.includes(classOverviewSearch.toLowerCase())) {
      return false;
    }
    const status = getStudentStatus(stu.overall_readiness).label;
    if (classOverviewFilter !== 'All' && status !== classOverviewFilter) {
      return false;
    }
    return true;
  });

  const activeStudent = students.find((s) => s.profile.id === selectedStudentForModal);

  const handleAssignReview = (studentName: string, topicName: string) => {
    createAssignment({
      title: `Targeted Review: ${topicName} (${studentName})`,
      class_id: activeStudent?.class_id || 'cls_p2_bio1',
      assignment_type: 'Targeted Review',
      reference_id: 'd4',
      due_date: '2026-04-05',
      instructions: `Complete high-yield practice items and review laboratory benchmark protocols for ${topicName}.`,
    });
    setAssignReviewSuccess(true);
    setTimeout(() => {
      setAssignReviewSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Teacher Welcome Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <School className="w-3.5 h-3.5 text-teal-600" />
              <span>Biotechnology Instructor Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              BACE Cohort Analytics & Control
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Overview for {currentTeacher.prefix ? `${currentTeacher.prefix} ` : ''}{currentTeacher.first_name} {currentTeacher.last_name}'s student cohorts at {currentTeacher.school_name || 'Biotechnology & Life Sciences Academy'} preparing for the BACE credentialing examination.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setTeacherPage('assignments')}
              className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Assignment</span>
            </button>

            <button
              onClick={() => setTeacherPage('question_bank')}
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Add BACE Question</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 5 Summary Cards (Prompt requirement: Total Students, Average BACE Readiness, Students Ready, Students Needing Review, Assignments Due) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Students
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {totalStudents}
          </div>
          <div className="text-xs text-slate-500">
            {classes.length} {classes.length === 1 ? 'Active Cohort' : 'Active Cohorts'}
          </div>
        </div>

        {/* Average BACE Readiness */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Average BACE Readiness
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-teal-700">
            {avgReadiness}%
          </div>
          <div className="text-xs text-slate-500">Goal: 80% Passing</div>
        </div>

        {/* Students Ready */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Students Ready
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600">
            {baceReadyCount}
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            ≥80% benchmark ({totalStudents > 0 ? Math.round((baceReadyCount / totalStudents) * 100) : 0}%)
          </div>
        </div>

        {/* Students Needing Review */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Students Needing Review
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-600">
            {studentsNeedingReviewTotal}
          </div>
          <div className="text-xs text-rose-700 font-medium">
            &lt;70% score ({totalStudents > 0 ? Math.round((studentsNeedingReviewTotal / totalStudents) * 100) : 0}%)
          </div>
        </div>

        {/* Assignments Due */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Assignments Due
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600">
            {assignmentsDueCount}
          </div>
          <div className="text-xs text-slate-500">Active assignments</div>
        </div>
      </div>

      {/* CLASS OVERVIEW TABLE (Prompt requirement: Student Name, Overall Readiness, 8 Domains, Last Active, Status) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Class Overview</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive student competency matrix across all eight BACE credentialing domains. Click any student to view detailed analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student..."
                value={classOverviewSearch}
                onChange={(e) => setClassOverviewSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {(['All', 'Ready', 'Developing', 'Needs Review', 'At Risk'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setClassOverviewFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    classOverviewFilter === lvl
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The 12-column Table */}
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs text-slate-600 min-w-[1050px]">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-y border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 sticky left-0 bg-slate-50 z-10">Student Name</th>
                <th className="py-3 px-3">Overall Readiness</th>
                <th className="py-3 px-2 text-center" title="Biotechnology Skills">Biotech</th>
                <th className="py-3 px-2 text-center" title="Technical Skills & Applications">Tech Skills</th>
                <th className="py-3 px-2 text-center" title="Safety & Workplace Culture">Safety</th>
                <th className="py-3 px-2 text-center" title="Applied Mathematics">Math</th>
                <th className="py-3 px-2 text-center" title="Biochemistry & Molecular Biology">Biochem</th>
                <th className="py-3 px-2 text-center" title="Regulation & Quality">Quality</th>
                <th className="py-3 px-2 text-center" title="Standard Laboratory Equipment">Equipment</th>
                <th className="py-3 px-2 text-center" title="Experimental Design & Data Analysis">Exp Design</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((stu) => {
                const status = getStudentStatus(stu.overall_readiness);
                const lastActive = stu.last_active || 'Enrolled';

                return (
                  <tr
                    key={stu.profile.id}
                    onClick={() => setSelectedStudentForModal(stu.profile.id)}
                    className="hover:bg-teal-50/20 cursor-pointer transition-colors group"
                  >
                    {/* Student Name */}
                    <td className="py-3 px-4 font-semibold text-slate-900 sticky left-0 bg-white group-hover:bg-teal-50/20 z-10">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs border border-teal-100 shrink-0">
                          {stu.profile.first_name[0]}
                          {stu.profile.last_name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 hover:text-teal-700 transition-colors">
                            {stu.profile.first_name} {stu.profile.last_name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {stu.profile.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Overall Readiness */}
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {stu.overall_readiness}%
                        </span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              stu.overall_readiness >= 80
                                ? 'bg-emerald-500'
                                : stu.overall_readiness >= 70
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, stu.overall_readiness)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* 8 Domain Scores */}
                    {['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'].map((domainId) => {
                      const score = stu.domain_mastery[domainId] ?? 0;
                      return (
                        <td key={domainId} className="py-3 px-2 text-center font-medium">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                              score >= 80
                                ? 'text-emerald-700 bg-emerald-50'
                                : score >= 70
                                ? 'text-amber-700 bg-amber-50'
                                : 'text-rose-700 bg-rose-50'
                            }`}
                          >
                            {score}%
                          </span>
                        </td>
                      );
                    })}

                    {/* Last Active */}
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {lastActive}
                    </td>

                    {/* Status Indicator */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.badgeClass}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Domain Performance Overview Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Domain Performance Overview</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Aggregated student mastery percentages across the eight BACE domains:
            </p>
          </div>
          <button
            onClick={() => setTeacherPage('analytics')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 self-start"
          >
            View Detailed Domain Analytics →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domainAverages.map(({ domain, average }) => {
            const details = getMasteryDetails(average);

            return (
              <div
                key={domain.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                    <DomainIcon name={domain.icon_name} className="w-4 h-4" />
                  </div>
                  <MasteryBadge percentage={average} size="sm" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {domain.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Class Average: <strong className="text-slate-800">{average}%</strong>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${details.progressColor}`}
                    style={{ width: `${Math.min(100, average)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lower Row: Upcoming Assignments & Priority Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Assignments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900">Active Assignments</h2>
            </div>
            <button
              onClick={() => setTeacherPage('assignments')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              Manage ({assignments.length})
            </button>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => {
              const doneCount = assignmentProgress.filter(
                (p) => p.assignment_id === asg.id && p.status === 'Completed'
              ).length;
              const targetClassStudents = students.filter((s) => s.class_id === asg.class_id);
              const totalAssigned = targetClassStudents.length > 0 ? targetClassStudents.length : totalStudents;
              const rate = totalAssigned > 0 ? Math.round((doneCount / totalAssigned) * 100) : 0;

              return (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {asg.assignment_type}
                    </span>
                    <div className="text-sm font-semibold text-slate-900 mt-1">
                      {asg.title}
                    </div>
                    <div className="text-xs text-slate-500">Due: {asg.due_date}</div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-slate-700">
                      {doneCount} / {totalAssigned} Done
                    </div>
                    <div className="text-[11px] text-teal-600 font-medium">
                      {rate}% Submission
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Intervention Students */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900">Students Needing Support (&lt;70%)</h2>
            </div>
            <button
              onClick={() => setTeacherPage('students')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              View Roster →
            </button>
          </div>

          <div className="space-y-2.5">
            {students
              .filter((s) => s.overall_readiness < 70)
              .map((student) => (
                <div
                  key={student.profile.id}
                  onClick={() => setSelectedStudentForModal(student.profile.id)}
                  className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:bg-rose-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {student.profile.first_name[0]}
                      {student.profile.last_name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {student.profile.first_name} {student.profile.last_name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Weakest: {student.weakest_topics[0]?.name || 'Applied Math'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MasteryBadge percentage={student.overall_readiness} size="sm" />
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Student Detailed Progress Modal (Opens upon clicking student name) */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-base border border-teal-100">
                  {activeStudent.profile.first_name[0]}
                  {activeStudent.profile.last_name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {activeStudent.profile.first_name} {activeStudent.profile.last_name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeStudent.profile.email} • Period 2 Biotechnology
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs text-slate-500">BACE Readiness</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeStudent.overall_readiness}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Accuracy</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeStudent.accuracy}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Questions Done</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeStudent.questions_attempted}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Lessons Done</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeStudent.lessons_completed}
                </div>
              </div>
            </div>

            {/* Domain Mastery Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Individual Domain Mastery Spread
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {domains.map((dom) => {
                  const mastery = activeStudent.domain_mastery[dom.id] ?? 0;
                  return (
                    <div
                      key={dom.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <DomainIcon name={dom.icon_name} className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="text-xs font-medium text-slate-800 truncate">{dom.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 ml-2">{mastery}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weakest Topics & Assign Review */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  Targeted Intervention Topics
                </h3>
                {assignReviewSuccess && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Assignment dispatched!
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {activeStudent.weakest_topics.map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{topic.name}</div>
                      <div className="text-[11px] text-rose-700">Current accuracy: {topic.percentage}%</div>
                    </div>
                    <button
                      onClick={() =>
                        handleAssignReview(
                          `${activeStudent.profile.first_name} ${activeStudent.profile.last_name}`,
                          topic.name
                        )
                      }
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Assign Review</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
