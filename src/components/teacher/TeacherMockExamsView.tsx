import React from 'react';
import {
  FileCheck,
  Clock,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherMockExamsView: React.FC = () => {
  const { students, setTeacherPage } = useApp();

  // Collect all real exam attempts across all students
  const studentsWithExams = students.filter(
    (s) => (s.mock_exam_scores || []).length > 0
  );

  const allScores = students.flatMap((s) =>
    (s.mock_exam_scores || []).map((m) => (typeof m === 'number' ? m : (m as any)?.score ?? 0))
  );

  const totalTakers = studentsWithExams.length;
  const overallAvg = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;
  const overallPassRate = allScores.length > 0
    ? Math.round((allScores.filter((s) => s >= 80).length / allScores.length) * 100)
    : 0;

  const mockTemplates = [
    {
      id: 'quick',
      title: 'Quick Mock Exam (25 Questions)',
      duration: '30 Minutes',
      avgScore: overallAvg,
      totalTakers: totalTakers,
      passRate: overallPassRate,
      status: 'Active',
    },
    {
      id: 'half',
      title: 'Half Mock Exam (50 Questions)',
      duration: '60 Minutes',
      avgScore: overallAvg,
      totalTakers: totalTakers,
      passRate: overallPassRate,
      status: 'Active',
    },
    {
      id: 'full',
      title: 'Full BACE Official Simulation (100 Questions)',
      duration: '4 Hours (240 Min)',
      avgScore: overallAvg,
      totalTakers: totalTakers,
      passRate: overallPassRate,
      status: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <FileCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Standardized Assessment Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mock Exam Administration
          </h1>
          <p className="text-sm text-slate-600">
            Configure simulated credentialing test blocks, manage 4-hour timers, and monitor student test endurance.
          </p>
        </div>

        <button
          onClick={() => setTeacherPage('assignments')}
          className="inline-flex items-center space-x-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Assign Mock Exam to Class</span>
        </button>
      </div>

      {/* Mock Exam Tiers Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTemplates.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-100">
                  {item.status}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {item.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Avg Score</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {item.avgScore}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-medium">Pass Rate</div>
                  <div className="text-lg font-extrabold text-teal-700 mt-0.5">
                    {item.passRate}%
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {item.totalTakers} students attempted
              </span>
              <button
                onClick={() => setTeacherPage('analytics')}
                className="font-semibold text-teal-700 hover:text-teal-800"
              >
                View Analytics →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Mock Submissions Roster */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Recent Student Mock Exam Submissions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Exam Type</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Time Spent</th>
                <th className="p-3">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentsWithExams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No student mock exam submissions recorded yet. When students complete timed mock exams, their scores and BACE readiness status will appear here.
                  </td>
                </tr>
              ) : (
                studentsWithExams.slice(0, 8).map((stu) => {
                  const firstScore = stu.mock_exam_scores[0];
                  const examScore = typeof firstScore === 'number' ? firstScore : (firstScore as any)?.score ?? 0;
                  const examTitle = typeof firstScore === 'object' && (firstScore as any)?.title ? (firstScore as any).title : 'Mock Simulation';
                  const isPassing = examScore >= 80;
                  const timeSpent = typeof firstScore === 'object' && (firstScore as any)?.time_spent ? (firstScore as any).time_spent : 'Completed';
                  const submitted = typeof firstScore === 'object' && (firstScore as any)?.date ? (firstScore as any).date : stu.last_active || 'Recent';

                  return (
                    <tr key={stu.profile.id} className="hover:bg-slate-50/70">
                      <td className="p-3 font-semibold text-slate-900">
                        {stu.profile.first_name} {stu.profile.last_name}
                      </td>
                      <td className="p-3 text-slate-700">{examTitle}</td>
                      <td className="p-3 font-extrabold text-slate-900 text-sm">
                        {examScore}%
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            isPassing
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {isPassing ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                          )}
                          <span>{isPassing ? 'BACE Ready' : 'Needs Review'}</span>
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{timeSpent}</td>
                      <td className="p-3 text-slate-400">{submitted}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
