import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Clock,
  Award,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BACE_CURRENT_TOTAL_QUESTIONS, BACE_CURRENT_TIME_MINUTES } from '../../data/baceBlueprint';

export const MockExamIntro: React.FC = () => {
  const { startMockExam, domains } = useApp();

  const [selectedType, setSelectedType] = useState<'quick' | 'half' | 'full'>('quick');

  const examOptions = [
    {
      id: 'quick' as const,
      title: 'Quick Mock Exam',
      questions: 25,
      timeLimit: '30 Minutes',
      minutes: 30,
      description: 'A rapid pacing check covering all eight domains. Ideal for a class period or targeted assessment.',
      badge: 'Popular',
    },
    {
      id: 'half' as const,
      title: 'Half Mock Exam',
      questions: 50,
      timeLimit: '60 Minutes',
      minutes: 60,
      description: 'Comprehensive mid-point simulation to assess endurance and domain mastery under timed conditions.',
      badge: 'Recommended',
    },
    {
      id: 'full' as const,
      title: 'Full BACE Simulation',
      questions: BACE_CURRENT_TOTAL_QUESTIONS,
      timeLimit: '4 Hours (240 Min)',
      minutes: BACE_CURRENT_TIME_MINUTES,
      description: 'Current-format 124-question simulation covering all 8 BACE domains, weighted to the published category point distribution with strict time and review tracking.',
      badge: 'Current Format',
    },
  ];

  const currentOption = examOptions.find((o) => o.id === selectedType)!;

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Intro Hero */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
          <span>Simulated Testing Environment</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          BACE Mock Exam Center
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Simulate the authentic Biotechnician Assistant Credentialing Exam (BACE) administered by Biotility. Test your biomedical knowledge, pacing, and endurance under timed, distraction-free test conditions.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Covers all 8 BACE Exam Domains</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Passing Benchmark: 80% Composite Score</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Blind Grading (Answers hidden until submission)</span>
          </div>
        </div>
      </div>

      {/* Select Exam Tier */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Choose Exam Format</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examOptions.map((opt) => {
            const isSelected = selectedType === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {opt.questions} Qs
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {opt.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-700 font-medium">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opt.timeLimit}</span>
                  </div>
                  <div className="font-bold text-blue-700">80% Goal</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pre-Exam Checklist / Confirmation Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
          <Info className="w-5 h-5 text-blue-600" />
          <span>Before You Begin: {currentOption.title}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
          <div>
            <div className="text-xs text-slate-500 font-medium">Questions</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {currentOption.questions}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Time Limit</div>
            <div className="text-xl font-extrabold text-slate-900 mt-0.5">
              {currentOption.timeLimit}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Passing Goal</div>
            <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
              80%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Coverage</div>
            <div className="text-xl font-extrabold text-blue-600 mt-0.5">
              8 Domains
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <div className="font-semibold text-blue-900">BACE Simulation Rules:</div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
            <li>Answers will <strong>NOT</strong> be displayed as correct or incorrect during testing.</li>
            <li>You can navigate back and forth freely and <strong>Flag questions</strong> for later review.</li>
            <li>A comprehensive audit of answered, unanswered, and flagged questions will be displayed prior to final submission.</li>
          </ul>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => startMockExam(selectedType)}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors shadow-xs group"
          >
            <span>Begin Exam</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
