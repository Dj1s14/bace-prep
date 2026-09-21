import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const LessonCompletionChart: React.FC = () => {
  const { domains, topics, lessons, completedLessonIds, startLesson, openDomain } = useApp();

  // Compute lesson & topic statistics per domain
  const domainProgressData = useMemo(() => {
    // Short names for clean axis labels
    const shortNames: Record<string, string> = {
      d1: 'Biotech Skills',
      d2: 'Technical Apps',
      d3: 'Safety & Culture',
      d4: 'Applied Math',
      d5: 'Biochem & MolBio',
      d6: 'Reg & Quality',
      d7: 'Standard Equip',
      d8: 'Exp Design',
    };

    return domains.map((domain) => {
      const domainTopics = topics.filter((t) => t.domain_id === domain.id);
      const domainLessons = lessons.filter((l) => l.domain_id === domain.id);
      const totalUnits = domainTopics.length;

      // Count completed units strictly from completedLessonIds
      const completedUnits = domainTopics.filter((topic) => {
        const topicLessons = domainLessons.filter((l) => l.topic_id === topic.id);
        if (topicLessons.length === 0) {
          return completedLessonIds.includes(topic.id);
        }
        return topicLessons.every((l) => completedLessonIds.includes(l.id));
      }).length;

      const remainingUnits = Math.max(0, totalUnits - completedUnits);
      const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

      return {
        id: domain.id,
        name: domain.name,
        shortName: shortNames[domain.id] || domain.name.slice(0, 14),
        completed: completedUnits,
        remaining: remainingUnits,
        total: totalUnits,
        percentage,
      };
    });
  }, [domains, topics, lessons, completedLessonIds]);

  // Overall curriculum totals
  const overallTotals = useMemo(() => {
    const totalUnits = domainProgressData.reduce((acc, d) => acc + d.total, 0);
    const completed = domainProgressData.reduce((acc, d) => acc + d.completed, 0);
    const remaining = totalUnits - completed;
    const rate = Math.round((completed / totalUnits) * 100);

    return {
      totalUnits,
      completed,
      remaining,
      rate,
    };
  }, [domainProgressData]);

  // Donut chart data
  const donutData = [
    { name: 'Completed Units', value: overallTotals.completed, color: '#0d9488' },
    { name: 'Remaining Units', value: overallTotals.remaining, color: '#e2e8f0' },
  ];

  // Find next recommended uncompleted lesson
  const nextLesson = useMemo(() => {
    return (
      lessons.find((l) => !completedLessonIds.includes(l.id)) || lessons[0]
    );
  }, [lessons, completedLessonIds]);

  // Custom Tooltip for Stacked Bar
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-800 text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-100">{data.name}</span>
            <span className="text-[10px] bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded font-mono">
              {data.percentage}% Completed
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Units Completed:</span>
              <span className="font-bold text-teal-400">
                {data.completed} / {data.total} units
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Remaining to Study:</span>
              <span className="text-slate-300">{data.remaining} units</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">Completion Status:</span>
              <span
                className={`font-semibold ${
                  data.percentage >= 75
                    ? 'text-emerald-400'
                    : data.percentage >= 50
                    ? 'text-teal-400'
                    : data.percentage > 0
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }`}
              >
                {data.percentage >= 75
                  ? 'Near Complete'
                  : data.percentage >= 50
                  ? 'Substantial'
                  : data.percentage > 0
                  ? 'In Progress'
                  : 'Not Started'}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-1 italic">
            Click to explore domain curriculum
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Curriculum & Lesson Completion Rates
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Progress through core BACE topics and practical laboratory lesson units across the 8 exam domains.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-800">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
          <span>{overallTotals.completed} of {overallTotals.totalUnits} Units Finished ({overallTotals.rate}%)</span>
        </div>
      </div>

      {/* Main Grid: Stacked Domain Bar Chart + Donut Progress Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Progress Stacked Bar Chart (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Completion By Exam Domain</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
                <span>Completed Units</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200" />
                <span>Remaining</span>
              </div>
            </div>
          </div>

          <div className="w-full h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={domainProgressData}
                layout="vertical"
                margin={{ top: 8, right: 30, left: 10, bottom: 8 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload[0]) {
                    const dId = e.activePayload[0].payload.id;
                    openDomain(dId);
                  }
                }}
              >
                <XAxis
                  type="number"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  type="category"
                  dataKey="shortName"
                  width={115}
                  stroke="#334155"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.6 }} />
                <Bar
                  dataKey="completed"
                  name="Completed Units"
                  stackId="a"
                  fill="#0d9488"
                  radius={[0, 0, 0, 0]}
                  barSize={18}
                />
                <Bar
                  dataKey="remaining"
                  name="Remaining Units"
                  stackId="a"
                  fill="#e2e8f0"
                  radius={[0, 6, 6, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circular Curriculum Completion Donut & Next Step (1 col) */}
        <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>Overall Curriculum Status</span>
            </h3>
            <p className="text-xs text-slate-500">
              Coverage across all required BACE credentialing topics.
            </p>
          </div>

          {/* Donut graphic */}
          <div className="relative w-40 h-40 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={66}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-slate-900 leading-none">
                {overallTotals.rate}%
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-1">Complete</span>
            </div>
          </div>

          {/* Breakdown stat pills */}
          <div className="space-y-2 pt-1 border-t border-slate-200/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span>Finished Units</span>
              </span>
              <span className="font-bold text-slate-900">{overallTotals.completed} topics</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span>To Complete</span>
              </span>
              <span className="font-bold text-slate-900">{overallTotals.remaining} topics</span>
            </div>
          </div>

          {/* Next Lesson Call to Action */}
          {nextLesson && (
            <div className="p-3 bg-white rounded-lg border border-teal-200 shadow-2xs space-y-2 mt-2">
              <div className="flex items-center space-x-1.5 text-teal-800 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-teal-600" />
                <span>Next Recommended Lesson</span>
              </div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1">
                {nextLesson.title}
              </div>
              <button
                onClick={() => startLesson(nextLesson.id)}
                className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors shadow-2xs cursor-pointer"
              >
                <span>{completedLessonIds.length > 0 ? 'Resume Lesson' : 'Start Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
