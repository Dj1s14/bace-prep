import React, { useState } from 'react';
import {
  Pipette,
  Calculator,
  FileCheck2,
  CheckSquare,
  Award,
  Sparkles,
  TrendingUp,
  FlaskConical,
  Scale,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Dna,
  RotateCw,
  Eye,
} from 'lucide-react';
import { MicropipetteTrainer } from './MicropipetteTrainer';
import { BenchMathGenerator } from './BenchMathGenerator';
import { NotebookAuditChallenge } from './NotebookAuditChallenge';
import { PracticalRubricsView } from './PracticalRubricsView';
import { GuidedLessonsView } from './GuidedLessonsView';
import { SpectrophotometryStation } from './SpectrophotometryStation';
import { GelBandSizingStation } from './GelBandSizingStation';
import { CentrifugeBalancingStation } from './CentrifugeBalancingStation';
import { FormulaSheetDrawer } from './FormulaSheetDrawer';
import { AdditionalPracticalStations } from './AdditionalPracticalStations';
import { useApp } from '../../context/AppContext';

export type BenchTab =
  | 'pipette'
  | 'math'
  | 'spectro'
  | 'gel'
  | 'centrifuge'
  | 'audit'
  | 'rubric'
  | 'practical';

export const BenchSimulatorView: React.FC = () => {
  const { benchStats, overallReadiness, currentStudent } = useApp?.() || {};

  const [simulatorMode, setSimulatorMode] = useState<'theory' | 'drills'>('theory');
  const [activeTab, setActiveTab] = useState<BenchTab>('pipette');
  const [isFormulaDrawerOpen, setIsFormulaDrawerOpen] = useState<boolean>(false);

  const stats = benchStats || {
    pipetteDrillsCompleted: 0,
    pipetteAccuracy: 100,
    mathProblemsSolved: 0,
    mathAccuracy: 100,
    auditsCompleted: 0,
    auditsPassed: 0,
    rubricsSignedOff: {},
    lessonsCompleted: {},
    spectroRunsCompleted: 0,
    spectroAccuracy: 100,
    gelSizingsCompleted: 0,
    gelSizingAccuracy: 100,
    centrifugeBalancesCompleted: 0,
  };

  const signedCount = Object.keys(stats.rubricsSignedOff || {}).length;
  const lessonsCompleted = stats.lessonsCompleted || {};
  const completedLessonsCount = [
    lessonsCompleted['lesson_pipette'],
    lessonsCompleted['lesson_math'],
    lessonsCompleted['lesson_audit'],
    lessonsCompleted['lesson_rubrics'],
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Persistent Formula Sheet Floating Action Button */}
      <button
        onClick={() => setIsFormulaDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl flex items-center space-x-2 font-bold text-xs border border-white/20 transition-all hover:scale-105 cursor-pointer group"
        title="Open BACE Formula Reference Drawer"
      >
        <BookOpen className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
        <span>Formula Sheet</span>
        <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
          BACE Ref
        </span>
      </button>

      {/* Global Slide-Over Formula Drawer */}
      <FormulaSheetDrawer
        isOpen={isFormulaDrawerOpen}
        onClose={() => setIsFormulaDrawerOpen(false)}
      />

      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
                <span>Wet-Lab & Practical Preparation</span>
              </div>
              <button
                onClick={() => setIsFormulaDrawerOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                <span>Formula Sheet Drawer</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              BACE Bench Simulator & Lab Math Training
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Prepare for both the written exam and practical skills stations with structured guided theory walkthroughs, interactive micropipetting, algorithmic solution math, spectrophotometry standard curves, agarose gel band sizing, centrifuge balancing, and official proctor rubrics.
            </p>
          </div>

          {/* Quick Metrics Tile */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center space-x-6 self-start lg:self-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Overall BACE Readiness
              </span>
              <div className="text-2xl font-black text-white flex items-center space-x-2 mt-0.5">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>{overallReadiness ?? 78}%</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Candidate
              </span>
              <span className="text-sm font-bold text-blue-200 mt-0.5 block truncate max-w-[140px]">
                {currentStudent?.profile?.first_name
                  ? `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`
                  : 'CTE Student'}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Stats Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Theory Lessons</div>
            <div className="text-base font-black text-blue-300 mt-0.5">
              {completedLessonsCount} / 4{' '}
              <span className="text-[10px] font-normal text-slate-400">certified</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Pipette Drills</div>
            <div className="text-base font-black text-white mt-0.5">
              {stats.pipetteDrillsCompleted}{' '}
              <span className="text-[10px] font-normal text-slate-400">done</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Lab Math Solved</div>
            <div className="text-base font-black text-white mt-0.5">
              {stats.mathProblemsSolved}{' '}
              <span className="text-[10px] font-normal text-slate-400">done</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Spectro Runs</div>
            <div className="text-base font-black text-teal-300 mt-0.5">
              {stats.spectroRunsCompleted || 0}{' '}
              <span className="text-[10px] font-normal text-slate-400">runs</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Gel Sizings</div>
            <div className="text-base font-black text-indigo-300 mt-0.5">
              {stats.gelSizingsCompleted || 0}{' '}
              <span className="text-[10px] font-normal text-slate-400">bands</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-medium">Centrifuge Spins</div>
            <div className="text-base font-black text-amber-300 mt-0.5">
              {stats.centrifugeBalancesCompleted || 0}{' '}
              <span className="text-[10px] font-normal text-slate-400">balanced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Primary Mode Switcher: Guided Lessons vs Interactive Simulators */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => setSimulatorMode('theory')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              simulatorMode === 'theory'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Guided Lessons & Theory</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                simulatorMode === 'theory'
                  ? 'bg-blue-500/30 text-blue-200 border border-blue-400/30'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {completedLessonsCount}/4 Done
            </span>
          </button>

          <button
            onClick={() => setSimulatorMode('drills')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              simulatorMode === 'drills'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Interactive Simulators & Drills (8 Stations)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden md:block px-3">
          {simulatorMode === 'theory'
            ? 'Walk through core lab principles, dial mechanics, ALCOA+, and rubric standards.'
            : 'Test your wet-lab reflexes and calculations across 8 interactive stations.'}
        </div>
      </div>

      {/* View Content based on Simulator Mode */}
      {simulatorMode === 'theory' ? (
        <GuidedLessonsView
          initialLessonTab={
            activeTab === 'pipette' || activeTab === 'math' || activeTab === 'audit' || activeTab === 'rubric'
              ? activeTab
              : 'pipette'
          }
          onSwitchToDrillTab={(tab) => {
            setActiveTab(tab);
            setSimulatorMode('drills');
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Sub-Station Navigation Tabs for Drills */}
          <div className="flex items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto scrollbar-thin">
            {[
              {
                id: 'pipette',
                label: 'Micropipette Trainer',
                icon: Pipette,
                badge: 'Station 1.1',
                badgeColor: 'bg-blue-100 text-blue-800',
              },
              {
                id: 'math',
                label: 'Bench Math',
                icon: Calculator,
                badge: 'Station 1.2',
                badgeColor: 'bg-emerald-100 text-emerald-800',
              },
              {
                id: 'spectro',
                label: 'Spectrophotometry & Standard Curves',
                icon: FlaskConical,
                badge: 'Station 1.3',
                badgeColor: 'bg-teal-100 text-teal-800',
              },
              {
                id: 'gel',
                label: 'Gel Band Sizing',
                icon: Dna,
                badge: 'Station 1.4',
                badgeColor: 'bg-indigo-100 text-indigo-800',
              },
              {
                id: 'centrifuge',
                label: 'Centrifuge Balancing',
                icon: RotateCw,
                badge: 'Station 1.5',
                badgeColor: 'bg-amber-100 text-amber-800',
              },
              {
                id: 'audit',
                label: 'Notebook Audit',
                icon: FileCheck2,
                badge: 'GLP / GMP',
                badgeColor: 'bg-purple-100 text-purple-800',
              },
              {
                id: 'rubric',
                label: 'Practical Rubrics',
                icon: CheckSquare,
                badge: 'Official',
                badgeColor: 'bg-rose-100 text-rose-800',
              },
              {
                id: 'practical',
                label: 'Practical Stations+',
                icon: Eye,
                badge: '6 Skills',
                badgeColor: 'bg-cyan-100 text-cyan-800',
              },
            ].map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as BenchTab)}
                  className={`shrink-0 flex items-center space-x-2 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs font-bold whitespace-nowrap">{tab.label}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      active ? 'bg-white/20 text-white' : tab.badgeColor
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Stage */}
          <div>
            {activeTab === 'pipette' && <MicropipetteTrainer />}
            {activeTab === 'math' && <BenchMathGenerator />}
            {activeTab === 'spectro' && <SpectrophotometryStation />}
            {activeTab === 'gel' && <GelBandSizingStation />}
            {activeTab === 'centrifuge' && <CentrifugeBalancingStation />}
            {activeTab === 'audit' && <NotebookAuditChallenge />}
            {activeTab === 'rubric' && <PracticalRubricsView />}
            {activeTab === 'practical' && <AdditionalPracticalStations />}
          </div>
        </div>
      )}
    </div>
  );
};
export default BenchSimulatorView;

