import React, { useState } from 'react';
import { BenchSkillTopic } from '../../types/database';
import {
  Sparkles,
  ClipboardList,
  Eye,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FlaskConical,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface LessonBenchGuideProps {
  modules: BenchSkillTopic[];
  lessonTitle: string;
}

export const LessonBenchGuide: React.FC<LessonBenchGuideProps> = ({ modules, lessonTitle }) => {
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number>(0);
  const currentTopic = modules[selectedTopicIdx] || modules[0];

  if (!modules || modules.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
        <FlaskConical className="w-8 h-8 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">Technician Bench Guide</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Bench skill protocols for this module are integrated across the curriculum theory and practice assessments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50/50 rounded-2xl p-6 border border-teal-200/80 shadow-2xs space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-800">
          <FlaskConical className="w-4 h-4 text-teal-600" />
          <span>BACE 4-Dimension Technician Framework</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Biotechnology operations require systematic mastery across four core dimensions: <strong className="text-slate-900 font-semibold">Core Concept & Language</strong>, <strong className="text-slate-900 font-semibold">Bench Use</strong>, <strong className="text-slate-900 font-semibold">Interpreting Results</strong>, and <strong className="text-slate-900 font-semibold">Quality & Error Points</strong>.
        </p>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {modules.map((mod, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTopicIdx(idx)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center space-x-2 ${
              selectedTopicIdx === idx
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-center text-[10px] leading-4 font-bold">
              {idx + 1}
            </span>
            <span>{mod.title}</span>
          </button>
        ))}
      </div>

      {/* Active Topic 4-Dimension Deep Dive */}
      <div className="space-y-5">
        {/* Topic Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Technician Skill Module {selectedTopicIdx + 1} of {modules.length}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{currentTopic.title}</h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            {currentTopic.core_idea}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Dimension 1: Core Concept & Language */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-blue-700">
              <Sparkles className="w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                1. Concept & Critical Language
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <div className="font-bold text-blue-900 mb-0.5">Purpose</div>
                <div className="text-slate-700 leading-relaxed">{currentTopic.purpose}</div>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100">
                <div className="font-bold text-indigo-900 mb-0.5">Condition</div>
                <div className="text-slate-700 leading-relaxed">{currentTopic.condition}</div>
              </div>

              <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-100">
                <div className="font-bold text-cyan-900 mb-0.5">Evidence & Documentation</div>
                <div className="text-slate-700 leading-relaxed">{currentTopic.evidence}</div>
              </div>
            </div>
          </div>

          {/* Dimension 2: Bench Use */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-teal-700">
              <ClipboardList className="w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                2. Bench Use & SOP Execution
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100">
                <div className="font-bold text-teal-900 mb-0.5">Where in the Laboratory</div>
                <div className="text-slate-700 leading-relaxed">{currentTopic.where_in_lab}</div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Procedure Awareness</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.procedure_awareness.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Material Details to Emphasize</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.material_details.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Dimension 3: Interpreting Results */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-purple-700">
              <Eye className="w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                3. Interpreting & Decision Rules
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <div className="font-bold text-purple-900 mb-0.5">What to Notice</div>
                <div className="text-slate-700 leading-relaxed">{currentTopic.what_to_notice}</div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Signs of a Valid Result</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.signs_of_valid_result.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1.5 flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
                  <span>Connecting Result to Decision</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.connecting_to_decision.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Dimension 4: Quality & Error Points */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                4. Quality & Error Points
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-bold text-rose-900 mb-1.5 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Common Problems</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.common_problems.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-rose-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-bold text-emerald-900 mb-1.5 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prevention & Control</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {currentTopic.prevention.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-slate-600">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70">
                <div className="font-bold text-amber-900 mb-0.5">Impact on the Work</div>
                <ul className="space-y-1 pl-1">
                  {currentTopic.impact_on_work.map((item, i) => (
                    <li key={i} className="text-amber-900/90 leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
