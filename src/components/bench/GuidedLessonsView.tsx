import React, { useState } from 'react';
import {
  BookOpen,
  Pipette,
  Calculator,
  FileCheck2,
  CheckSquare,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PipetteTheoryLesson } from './lessons/PipetteTheoryLesson';
import { BenchMathTheoryLesson } from './lessons/BenchMathTheoryLesson';
import { NotebookAuditTheoryLesson } from './lessons/NotebookAuditTheoryLesson';
import { PracticalRubricsTheoryLesson } from './lessons/PracticalRubricsTheoryLesson';
import { BenchTab } from './BenchSimulatorView';

interface GuidedLessonsViewProps {
  onSwitchToDrillTab: (tab: BenchTab) => void;
  initialLessonTab?: 'pipette' | 'math' | 'audit' | 'rubric';
}

export const GuidedLessonsView: React.FC<GuidedLessonsViewProps> = ({
  onSwitchToDrillTab,
  initialLessonTab = 'pipette',
}) => {
  const { benchStats } = useApp?.() || {};
  const [activeLesson, setActiveLesson] = useState<'pipette' | 'math' | 'audit' | 'rubric'>(initialLessonTab);

  const lessonsCompleted = benchStats?.lessonsCompleted || {};
  const completedCount = [
    lessonsCompleted['lesson_pipette'],
    lessonsCompleted['lesson_math'],
    lessonsCompleted['lesson_audit'],
    lessonsCompleted['lesson_rubrics'],
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedCount / 4) * 100);

  const LESSON_TABS = [
    {
      id: 'pipette' as const,
      lessonId: 'lesson_pipette',
      title: '1. Micropipette Mechanics & Dials',
      shortTitle: 'Micropipette Dials',
      icon: Pipette,
      color: 'text-blue-600',
      badge: 'Volumetric Windows & 2-Stop Plunger',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'math' as const,
      lessonId: 'lesson_math',
      title: '2. Algorithmic Bench Math',
      shortTitle: 'Solution Calculations',
      icon: Calculator,
      color: 'text-emerald-600',
      badge: 'C1V1, Molarity, % Solutions',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'audit' as const,
      lessonId: 'lesson_audit',
      title: '3. GLP / GMP Notebook Audits',
      shortTitle: 'ALCOA+ & GDP Rules',
      icon: FileCheck2,
      color: 'text-purple-600',
      badge: '21 CFR §58 & §211 Standards',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'rubric' as const,
      lessonId: 'lesson_rubrics',
      title: '4. Practical Skills Rubrics',
      shortTitle: 'Proctor Scoring Guides',
      icon: CheckSquare,
      color: 'text-teal-600',
      badge: 'Stations 1–3 Pre-Station Prep',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Progress & Overview Strip */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Guided Theory Curriculum Progress
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
              {completedCount} of 4 Completed
            </span>
          </div>
          <div className="text-lg font-black text-slate-900 flex items-center space-x-2">
            <span>BACE Wet-Lab Knowledge & Bench Competencies</span>
          </div>
        </div>

        {/* Progress Bar & Jump to Drills */}
        <div className="flex items-center space-x-4 self-stretch md:self-auto">
          <div className="flex-1 md:w-56 space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-600">
              <span>Theory Completion</span>
              <span className="text-blue-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => onSwitchToDrillTab(activeLesson)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Jump to Drill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lesson Navigation Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LESSON_TABS.map((tab) => {
          const active = activeLesson === tab.id;
          const isDone = Boolean(lessonsCompleted[tab.lessonId]);
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveLesson(tab.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    active ? 'bg-white/10 text-white' : 'bg-slate-100 ' + tab.color
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {isDone ? (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Complete</span>
                  </span>
                ) : (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/15 text-slate-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Theory Guide
                  </span>
                )}
              </div>

              <div className="font-bold text-xs leading-tight mb-1">{tab.title}</div>
              <div
                className={`text-[10px] truncate ${
                  active ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {tab.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Lesson Component */}
      <div>
        {activeLesson === 'pipette' && (
          <PipetteTheoryLesson onLaunchDrill={() => onSwitchToDrillTab('pipette')} />
        )}
        {activeLesson === 'math' && (
          <BenchMathTheoryLesson onLaunchDrill={() => onSwitchToDrillTab('math')} />
        )}
        {activeLesson === 'audit' && (
          <NotebookAuditTheoryLesson onLaunchDrill={() => onSwitchToDrillTab('audit')} />
        )}
        {activeLesson === 'rubric' && (
          <PracticalRubricsTheoryLesson onLaunchDrill={() => onSwitchToDrillTab('rubric')} />
        )}
      </div>
    </div>
  );
};
