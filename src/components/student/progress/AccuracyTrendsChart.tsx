import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  HelpCircle,
  Award,
  Filter,
  Trash2,
  History,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { StudentActivitySession } from '../../../types/database';

export const AccuracyTrendsChart: React.FC = () => {
  const { activitySessions, currentStudent, deleteActivitySession } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'mock' | 'drill'>('all');
  const [showSessionLog, setShowSessionLog] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter sessions based on user selection
  const filteredSessions = useMemo(() => {
    if (filterType === 'mock') {
      return activitySessions.filter((s) => s.type === 'Mock Exam');
    }
    if (filterType === 'drill') {
      return activitySessions.filter(
        (s) => s.type === 'Practice Drill' || s.type === 'Domain Quiz' || s.type === 'Lesson Check'
      );
    }
    return activitySessions;
  }, [activitySessions, filterType]);

  // Compute stats
  const stats = useMemo(() => {
    if (filteredSessions.length === 0) {
      return {
        averageAccuracy: currentStudent.accuracy,
        highestScore: 0,
        lowestScore: 0,
        totalQuestions: 0,
        improvementTrend: 0,
      };
    }

    const accuracies = filteredSessions.map((s) => s.accuracy);
    const sumAccuracy = accuracies.reduce((a, b) => a + b, 0);
    const avg = Math.round(sumAccuracy / accuracies.length);
    const max = Math.max(...accuracies);
    const min = Math.min(...accuracies);
    const totalQ = filteredSessions.reduce((sum, s) => sum + s.totalQuestions, 0);

    const firstAccuracy = accuracies[0];
    const lastAccuracy = accuracies[accuracies.length - 1];
    const trend = lastAccuracy - firstAccuracy;

    return {
      averageAccuracy: avg,
      highestScore: max,
      lowestScore: min,
      totalQuestions: totalQ,
      improvementTrend: trend,
    };
  }, [filteredSessions, currentStudent.accuracy]);

  // Transform data points for Recharts with moving average calculation
  const chartData = useMemo(() => {
    let runningSum = 0;
    return filteredSessions.map((sess, idx) => {
      runningSum += sess.accuracy;
      const rollingAvg = Math.round(runningSum / (idx + 1));

      return {
        id: sess.id,
        sessionIndex: idx + 1,
        date: sess.formattedDate,
        label: sess.label,
        type: sess.type,
        accuracy: sess.accuracy,
        rollingAverage: rollingAvg,
        score: sess.score,
        totalQuestions: sess.totalQuestions,
        timeSpent: sess.timeSpentMinutes,
        domainName: sess.domainName,
      };
    });
  }, [filteredSessions]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-800 text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-100">{data.label}</span>
            <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded font-mono">
              {data.date}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Score Achieved:</span>
              <span className="font-bold text-white">
                {data.score} / {data.totalQuestions} ({data.accuracy}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Session Type:</span>
              <span className="text-slate-200">{data.type}</span>
            </div>
            {data.domainName && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Domain:</span>
                <span className="text-blue-300 font-medium">{data.domainName}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Time Spent:</span>
              <span className="text-slate-300">{data.timeSpent} mins</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">Cumulative Average:</span>
              <span className="font-mono text-cyan-400 font-semibold">{data.rollingAverage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Accuracy & Performance Trends
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Historical accuracy trajectory across practice drills, domain quizzes, and simulated BACE exams.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto bg-slate-50 border border-slate-200 p-1 rounded-lg text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterType === 'all'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Sessions ({activitySessions.length})
          </button>
          <button
            onClick={() => setFilterType('mock')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterType === 'mock'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mock Exams
          </button>
          <button
            onClick={() => setFilterType('drill')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              filterType === 'drill'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Drills & Quizzes
          </button>
        </div>
      </div>

      {/* Metric Highlights Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Average Accuracy
          </div>
          <div className="text-xl font-extrabold text-blue-700">
            {stats.averageAccuracy}%
          </div>
          <div className="text-[10px] text-slate-500">Across {chartData.length} recorded sets</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Peak Accuracy
          </div>
          <div className="text-xl font-extrabold text-emerald-600">
            {stats.highestScore}%
          </div>
          <div className="text-[10px] text-slate-500">Highest single attempt</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Attempted
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {stats.totalQuestions} Q
          </div>
          <div className="text-[10px] text-slate-500">Questions evaluated</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Growth Delta
          </div>
          <div
            className={`text-xl font-extrabold flex items-center ${
              stats.improvementTrend > 0
                ? 'text-emerald-600'
                : stats.improvementTrend < 0
                ? 'text-rose-600'
                : 'text-slate-600'
            }`}
          >
            {stats.improvementTrend > 0
              ? `+${stats.improvementTrend}%`
              : `${stats.improvementTrend}%`}
            {stats.improvementTrend > 0 ? (
              <TrendingUp className="w-4 h-4 ml-1 shrink-0" />
            ) : stats.improvementTrend < 0 ? (
              <TrendingDown className="w-4 h-4 ml-1 shrink-0" />
            ) : (
              <Minus className="w-4 h-4 ml-1 shrink-0 text-slate-400" />
            )}
          </div>
          <div className="text-[10px] text-slate-500">Since baseline diagnostic</div>
        </div>
      </div>

      {/* Chart Canvas */}
      {chartData.length === 0 ? (
        <div className="w-full h-72 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center">
          <Activity className="w-10 h-10 text-slate-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">No Practice Sessions Logged Yet</h3>
          <p className="text-xs text-slate-500 max-w-md">
            Complete domain drills, lesson checks, or mock simulations to see your rolling accuracy trend mapped over time.
          </p>
        </div>
      ) : (
        <div className="w-full h-80 min-h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 12, right: 24, left: -10, bottom: 8 }}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                unit="%"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={80}
                stroke="#0f172a"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: '80% BACE Passing Goal',
                  position: 'insideTopRight',
                  fill: '#0f172a',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                name="Session Accuracy"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#accuracyGradient)"
                dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 6, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="rollingAverage"
                name="Cumulative Average"
                stroke="#0d9488"
                strokeWidth={2}
                strokeDasharray="3 3"
                fillOpacity={0}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Legend & Explanation Footer */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 gap-3">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-0.5 bg-blue-600 inline-block rounded-full" />
            <span className="text-slate-700 font-medium">Session Accuracy Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-0.5 bg-teal-600 border-t border-dashed border-teal-600 inline-block" />
            <span className="text-slate-700 font-medium">Rolling Mean Trend</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-0.5 bg-slate-900 border-t-2 border-dashed border-slate-900 inline-block" />
            <span className="text-slate-700 font-medium">80% Passing Goal</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {filteredSessions.length > 0 && (
            <button
              onClick={() => setShowSessionLog((prev) => !prev)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>{showSessionLog ? 'Hide Session Log' : `Manage Recorded Sessions (${filteredSessions.length})`}</span>
              {showSessionLog ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable Session Log & Management Drawer */}
      {showSessionLog && filteredSessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recorded Practice & Exam Sessions
              </h4>
              <p className="text-[11px] text-slate-500">
                You can review or delete anomalous, abandoned, or diagnostic attempts to recalibrate your trends.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              {filteredSessions.length} total attempt{filteredSessions.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40">
            {[...filteredSessions].reverse().map((sess) => (
              <div
                key={sess.id}
                className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{sess.label}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sess.type === 'Mock Exam'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {sess.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{sess.formattedDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-3">
                    <span>Score: <strong className="text-slate-800 font-bold">{sess.score} / {sess.totalQuestions} Q</strong></span>
                    <span>•</span>
                    <span>Duration: {sess.timeSpentMinutes} min{sess.timeSpentMinutes === 1 ? '' : 's'}</span>
                    {sess.domainName && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">{sess.domainName}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      sess.accuracy >= 80
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : sess.accuracy >= 70
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {sess.accuracy}%
                  </span>

                  {confirmDeleteId === sess.id ? (
                    <div className="flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                      <span className="text-[10px] font-bold text-rose-700">Delete?</span>
                      <button
                        onClick={() => {
                          deleteActivitySession(sess.id);
                          setConfirmDeleteId(null);
                        }}
                        className="text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-700 px-2 py-0.5 rounded transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-[10px] text-slate-600 hover:text-slate-800 px-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(sess.id)}
                      title="Delete this session from history"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
