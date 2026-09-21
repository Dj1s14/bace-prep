import React from 'react';
import {
  BarChart2,
  TrendingUp,
  Award,
  AlertTriangle,
  Calendar,
  Users,
  CheckCircle2,
  Target,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DomainIcon } from '../common/DomainIcon';
import { MasteryBadge } from '../common/MasteryBadge';
import { getMasteryDetails } from '../../types/database';

export const TeacherAnalyticsView: React.FC = () => {
  const { students, domains, classes } = useApp();

  const totalStudents = students.length;
  const readyCount = students.filter((s) => s.overall_readiness >= 80).length;
  const passingRate = totalStudents > 0 ? Math.round((readyCount / totalStudents) * 100) : 0;

  // Compute domain statistics across whole cohort
  const domainStats = domains.map((domain) => {
    const scores = students.map((s) => s.domain_mastery[domain.id] ?? 0);
    const avg = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const max = scores.length > 0 ? Math.max(...scores) : 0;
    const min = scores.length > 0 ? Math.min(...scores) : 0;
    const readyStudents = scores.filter((score) => score >= 80).length;

    return {
      domain,
      avg,
      max,
      min,
      readyPercentage: totalStudents > 0 ? Math.round((readyStudents / totalStudents) * 100) : 0,
    };
  });

  // Dynamically compute cohort weakest topics from enrolled student performance
  const topicMap: Record<string, { topic: string; domain: string; totalScore: number; count: number; belowBenchmark: number }> = {};

  students.forEach((s) => {
    (s.weakest_topics || []).forEach((t) => {
      const domName = domains.find((d) => d.id === (t as any).domainId)?.name || 'Biotechnology Core';
      if (!topicMap[t.name]) {
        topicMap[t.name] = { topic: t.name, domain: domName, totalScore: 0, count: 0, belowBenchmark: 0 };
      }
      topicMap[t.name].totalScore += t.percentage;
      topicMap[t.name].count += 1;
      if (t.percentage < 80) {
        topicMap[t.name].belowBenchmark += 1;
      }
    });
  });

  const cohortWeakestTopics = Object.values(topicMap)
    .map((item) => ({
      topic: item.topic,
      domain: item.domain,
      cohortAverage: Math.round(item.totalScore / item.count),
      studentsBelowBenchmark: item.belowBenchmark,
    }))
    .sort((a, b) => a.cohortAverage - b.cohortAverage)
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <BarChart2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Cohort Analytics & Psychometrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Curriculum & Performance Analytics
          </h1>
          <p className="text-sm text-slate-600">
            Deep dive into class-wide readiness benchmarks, historical passing forecasts, and domain proficiency gaps.
          </p>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 text-center min-w-[200px]">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Cohort Passing Forecast
          </div>
          <div className="text-3xl font-extrabold text-teal-700 mt-0.5">
            {passingRate}% Ready
          </div>
          <div className="text-[11px] text-teal-900 mt-1">
            {readyCount} of {totalStudents} meet 80% mark
          </div>
        </div>
      </div>

      {/* Domain Proficiency Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Domain Competency Spread ({domains.length} Domains)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Analysis across all enrolled high school biotechnology students:
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Exam Domain</th>
                <th className="p-3">Exam Weight</th>
                <th className="p-3">Cohort Average</th>
                <th className="p-3">Passing Rate (≥80%)</th>
                <th className="p-3">Score Range</th>
                <th className="p-3">Readiness Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {domainStats.map(({ domain, avg, min, max, readyPercentage }) => {
                const details = getMasteryDetails(avg);

                return (
                  <tr key={domain.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-semibold text-slate-900 flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                        <DomainIcon name={domain.icon_name} className="w-3.5 h-3.5" />
                      </div>
                      <span>{domain.name}</span>
                    </td>

                    <td className="p-3 font-bold text-slate-500">
                      {domain.exam_weight}%
                    </td>

                    <td className="p-3">
                      <div className="font-extrabold text-slate-900 text-sm">{avg}%</div>
                      <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${details.progressColor}`}
                          style={{ width: `${Math.min(100, avg)}%` }}
                        />
                      </div>
                    </td>

                    <td className="p-3 font-semibold text-slate-800">
                      {readyPercentage}% of students
                    </td>

                    <td className="p-3 font-mono text-slate-600">
                      {min}% – {max}%
                    </td>

                    <td className="p-3">
                      <MasteryBadge percentage={avg} size="sm" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Priority Intervention Topics */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-rose-700">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900">
            Identified Cohort Knowledge Gaps (Needs Class Intervention)
          </h2>
        </div>

        <p className="text-xs text-slate-600">
          These specific topics have the highest error rates across student practice sessions and mock exams:
        </p>

        {cohortWeakestTopics.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs">
            No class-wide knowledge gaps detected yet. As students take mock exams and practice drills, cohort deficit areas will automatically aggregate here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {cohortWeakestTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-900">{item.topic}</span>
                  <span className="text-rose-700 font-extrabold bg-rose-100 px-2 py-0.5 rounded">
                    {item.cohortAverage}% Avg
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Belongs to: <strong>{item.domain}</strong>
                </div>
                <div className="text-xs text-rose-800 font-medium">
                  ⚠️ {item.studentsBelowBenchmark} of {totalStudents} students currently scoring below 80% benchmark
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
