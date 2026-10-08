import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  BarChart3,
  Radar as RadarIcon,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DomainIcon } from '../../common/DomainIcon';
import { getMasteryDetails } from '../../../types/database';

interface DomainChartData {
  id: string;
  name: string;
  shortName: string;
  score: number;
  weight: number;
  icon: string;
  status: string;
  tierColor: string;
  pointsToGoal: number;
}

export const DomainMasteryChart: React.FC = () => {
  const { currentStudent, domains, openDomain, startPractice } = useApp();
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');
  const [sortBy, setSortBy] = useState<'default' | 'score_asc' | 'score_desc' | 'weight_desc'>('default');
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

  // Transform domain data for Recharts
  const chartData: DomainChartData[] = useMemo(() => {
    const data = domains.map((domain) => {
      const score = currentStudent.domain_mastery[domain.id] ?? 0;
      const details = getMasteryDetails(score);

      // Shorten name for mobile / compact chart labels
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

      return {
        id: domain.id,
        name: domain.name,
        shortName: shortNames[domain.id] || domain.name.slice(0, 14),
        score,
        weight: domain.exam_weight,
        icon: domain.icon_name,
        status: details.level,
        tierColor: details.progressColor,
        pointsToGoal: 80 - score,
      };
    });

    switch (sortBy) {
      case 'score_asc':
        return [...data].sort((a, b) => a.score - b.score);
      case 'score_desc':
        return [...data].sort((a, b) => b.score - a.score);
      case 'weight_desc':
        return [...data].sort((a, b) => b.weight - a.weight);
      case 'default':
      default:
        return data;
    }
  }, [domains, currentStudent.domain_mastery, sortBy]);

  // Determine bar fill colors matching clinical theme
  const getBarColor = (score: number) => {
    if (score >= 90) return '#059669'; // Emerald
    if (score >= 80) return '#2563eb'; // Clinical Blue
    if (score >= 70) return '#d97706'; // Amber
    return '#e11d48'; // Rose
  };

  const selectedDomain = useMemo(() => {
    if (!selectedDomainId) return null;
    return chartData.find((d) => d.id === selectedDomainId);
  }, [selectedDomainId, chartData]);

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DomainChartData = payload[0].payload;
      const isReady = item.score >= 80;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-800 text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
            <span className="font-bold text-sm text-slate-100">{item.name}</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              {item.weight}% Exam Weight
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Mastery:</span>
              <span className="font-extrabold text-base text-white">{item.score}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span
                className={`font-semibold ${
                  item.score >= 80 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {item.status}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Distance to 80% benchmark:</span>
              <span
                className={`font-mono font-bold ${
                  isReady ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isReady ? `+${item.score - 80}% above goal` : `-${item.pointsToGoal}% needed`}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-1 italic">
            Click bar to open domain study module
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
      {/* Header with Title and Control Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              BACE Lesson Mastery Levels
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Mastery is earned through completed lessons and their latest assessment scores. Unfinished lessons earn no credit; mock exams do not raise mastery.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Mode Toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setChartType('bar')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                chartType === 'bar'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar Chart</span>
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                chartType === 'radar'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar Map</span>
            </button>
          </div>

          {/* Sorting Selector */}
          {chartType === 'bar' && (
            <div className="flex items-center space-x-1 text-xs">
              <label htmlFor="domain-sort-select" className="sr-only">
                Sort Domains
              </label>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="domain-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="default">Default Order</option>
                <option value="score_asc">Lowest First (Review Priority)</option>
                <option value="score_desc">Highest First</option>
                <option value="weight_desc">Highest Exam Weight</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Legend & Goal Indicator */}
      <div className="flex flex-wrap items-center justify-between text-xs gap-3 py-2 px-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
            <span className="text-slate-600">≥90% Mastered</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
            <span className="text-slate-600">80–89% BACE Ready</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
            <span className="text-slate-600">70–79% Developing</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
            <span className="text-slate-600">&lt;70% Critical Focus</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-semibold text-slate-700">
          <span className="w-4 h-0.5 bg-slate-900 border-t-2 border-dashed border-slate-900 inline-block" />
          <span>80% Official BACE Passing Benchmark</span>
        </div>
      </div>

      {/* Primary Chart Canvas */}
      <div className="w-full h-80 min-h-[320px]">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 32, left: 10, bottom: 8 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  const clickedId = e.activePayload[0].payload.id;
                  setSelectedDomainId(clickedId);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                unit="%"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="shortName"
                width={120}
                stroke="#334155"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', opacity: 0.6 }} />
              <ReferenceLine
                x={80}
                stroke="#0f172a"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: '80% Goal',
                  position: 'top',
                  fill: '#0f172a',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              />
              <Bar
                dataKey="score"
                radius={[0, 6, 6, 0]}
                barSize={18}
                isAnimationActive={true}
                animationDuration={800}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.id}
                    fill={getBarColor(entry.score)}
                    className="cursor-pointer transition-opacity hover:opacity-85"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="shortName" stroke="#475569" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
              <Radar
                name="Lesson Mastery"
                dataKey="score"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.4}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Interactive Domain Drilldown Quick-Card */}
      {selectedDomain ? (
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg border border-blue-200 shadow-2xs">
              <DomainIcon name={selectedDomain.icon} className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">{selectedDomain.name}</div>
              <div className="text-xs text-slate-600 flex items-center space-x-2 mt-0.5">
                <span className="font-bold text-blue-700">{selectedDomain.score}% Mastery</span>
                <span>•</span>
                <span>{selectedDomain.weight}% Exam Weight</span>
                <span>•</span>
                <span className={selectedDomain.score >= 80 ? 'text-emerald-700' : 'text-amber-700'}>
                  {selectedDomain.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => openDomain(selectedDomain.id)}
              className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors shadow-2xs"
            >
              Explore Domain
            </button>
            <button
              onClick={() =>
                startPractice({
                  mode: 'Domain Practice',
                  domainId: selectedDomain.id,
                  count: 10,
                })
              }
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Practice This Domain</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xs text-slate-400 py-1 italic">
          Tip: Tap any domain bar above to view tailored learning and practice options.
        </div>
      )}
    </div>
  );
};
