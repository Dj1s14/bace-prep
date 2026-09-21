import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Scale,
  Award,
  Check,
  FlaskConical,
  Zap,
  Flame,
  Info,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface PracticalRubricsTheoryLessonProps {
  onLaunchDrill?: () => void;
}

export const PracticalRubricsTheoryLesson: React.FC<PracticalRubricsTheoryLessonProps> = ({ onLaunchDrill }) => {
  const { benchStats, markBenchLessonComplete } = useApp?.() || {};
  const isCompleted = Boolean(benchStats?.lessonsCompleted?.['lesson_rubrics']);

  const [activeStationTab, setActiveStationTab] = useState<'station1' | 'station2' | 'station3'>('station1');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 rounded-2xl p-6 border border-teal-800/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <CheckSquare className="w-3.5 h-3.5 text-teal-400" />
              <span>Biotility Practical Skills Assessment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              BACE Practical Skills Stations: Proctor Rubrics & Evaluator Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Step-by-step procedural guides and scoring criteria for Station 1 (Gravimetric Pipetting), Station 2 (Aseptic Streak Plate), and Station 3 (Agarose Gel Electrophoresis).
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center shrink-0">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_rubrics', !isCompleted)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Lesson Certified Complete</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 text-teal-400" />
                  <span>Mark Lesson as Complete</span>
                </>
              )}
            </button>

            {onLaunchDrill && (
              <button
                onClick={onLaunchDrill}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-500 text-white flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Launch Station Rubrics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Station Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            id: 'station1',
            num: 'Station 1',
            title: 'Gravimetric Verification',
            icon: Scale,
            badge: 'Analytical Balance',
          },
          {
            id: 'station2',
            num: 'Station 2',
            title: 'Aseptic Quadrant Streak',
            icon: Flame,
            badge: 'Microbiology Isolation',
          },
          {
            id: 'station3',
            num: 'Station 3',
            title: 'Agarose Gel Electrophoresis',
            icon: Zap,
            badge: '"Run to the Red"',
          },
        ].map((tab) => {
          const active = activeStationTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStationTab(tab.id as any)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  {tab.num}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${active ? 'text-teal-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs">{tab.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* STATION 1: GRAVIMETRIC PIPETTING */}
      {activeStationTab === 'station1' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Station 1: Gravimetric Micropipetting Verification
              </h3>
              <p className="text-xs text-slate-500">
                Verifying liquid handling accuracy and precision using an analytical balance (ISO 8655 Standards).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-bold">1. Balance Setup & Draft Shield</strong>
              <p className="text-slate-600 leading-relaxed">
                Verify the bubble level is centered. Ensure all draft shield sliding glass doors are fully closed before taring. Air currents in the lab can cause balance drift of ±0.005 g.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-bold">2. Water Density (Z-Factor)</strong>
              <p className="text-slate-600 leading-relaxed">
                At room temperature (20°C–22°C), pure deionized water has a density of approximately <strong>1.000 g/mL (or 1.000 mg/µL)</strong>:
              </p>
              <div className="font-mono text-[11px] bg-white p-1.5 rounded border border-slate-200">
                1000 µL = 1.0000 g<br />
                200 µL = 0.2000 g<br />
                20 µL = 0.0200 g
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-bold">3. Percent Error Calculation</strong>
              <p className="text-slate-600 leading-relaxed">
                Evaluators grade your replicate delivery volume accuracy using the standard percent error equation:
              </p>
              <div className="font-mono text-[11px] bg-white p-1.5 rounded border border-slate-200">
                % Error = [ |Measured - Expected| ÷ Expected ] × 100%
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <span className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Critical Proctor Checkpoints for Station 1:
            </span>
            <ul className="list-disc list-inside space-y-1 text-amber-900 leading-relaxed">
              <li>Candidate tares balance to 0.0000 g with the weighing container in place.</li>
              <li>Pre-wets tip 2–3 times with deionized water before taking official measurement.</li>
              <li>Aspirates with pipette held vertically; dispenses at 45° angle along container sidewall.</li>
              <li>Depresses plunger to 1st stop, pauses 1 sec, then pushes through to 2nd stop for complete blowout.</li>
              <li>Withdraws tip completely before releasing thumb.</li>
            </ul>
          </div>
        </div>
      )}

      {/* STATION 2: ASEPTIC STREAK PLATE */}
      {activeStationTab === 'station2' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Station 2: Four-Quadrant Aseptic Bacterial Streak Plate
              </h3>
              <p className="text-xs text-slate-500">
                Isolating pure single colonies from mixed bacterial cultures using sterile inoculation loop technique.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">1. The Inoculation Loop Flame Protocol</span>
              <p className="text-slate-600 leading-relaxed">
                Hold the inoculating loop like a pencil at a 60° angle in the hottest blue cone of the Bunsen burner flame. The wire must glow <strong>cherry red</strong> from base to tip.
              </p>
              <div className="p-2 bg-rose-50 rounded border border-rose-200 text-rose-950 font-bold">
                Crucial Step: Cool loop for 10–15 seconds on the sterile agar margin before touching bacteria. Hot wire instantly lyses and kills cells!
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">2. The Clamshell Lid Technique</span>
              <p className="text-slate-600 leading-relaxed">
                Never place the Petri dish lid face-down or open on the benchtop. Lift the lid only <strong>30° to 45°</strong> directly over the plate, using it as an umbrella shield against airborne fungal spores and dust.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">3. Quadrant Dilution & Re-Flaming</span>
              <p className="text-slate-600 leading-relaxed">
                Streak Quadrant 1 with primary culture. <strong>FLAME AND COOL LOOP</strong>. Rotate plate 90°. Drag loop through Quadrant 1 only 2–3 times, then streak into Quadrant 2. Repeat flaming between Quadrants 2→3 and 3→4.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">4. Inversion & Incubation</span>
              <p className="text-slate-600 leading-relaxed">
                Always label the <strong>AGAR BOTTOM</strong> of the Petri dish around the perimeter (never on the removable lid). Incubate plates <strong>upside down (agar on top)</strong> at 37°C so condensation on the lid does not drip onto growing colonies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STATION 3: AGAROSE GEL ELECTROPHORESIS */}
      {activeStationTab === 'station3' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Station 3: Agarose Gel Electrophoresis & "Run to the Red"
              </h3>
              <p className="text-xs text-slate-500">
                DNA molecular weight determination, zero-puncture well loading, and electrical polarity verification.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-rose-700 font-bold">
                <Zap className="w-4 h-4" />
                <span>"Run to the Red" Polarity Rule</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                DNA contains a sugar-phosphate backbone with a strong negative charge (-). In an electric field, DNA migrates from the negative <strong>Cathode (Black electrode)</strong> toward the positive <strong>Anode (Red electrode)</strong>.
              </p>
              <div className="bg-slate-900 text-white p-2 rounded font-mono text-[10px] text-center">
                Black (-) ──► DNA Travel ──► Red (+)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-blue-700 font-bold">
                <FlaskConical className="w-4 h-4" />
                <span>Zero-Puncture Loading Technique</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Steady your pipetting hand with your opposite forefinger or elbow on the bench. Submerge tip just below buffer surface inside the mouth of the well. <strong>NEVER touch or pierce the bottom of the well</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-1.5 text-purple-700 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Loading Dye Density Agent</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Loading dye contains glycerol, Ficoll, or sucrose to increase sample density so DNA sinks into the well rather than diffusing into the running buffer. Tracking dyes (Bromophenol blue) monitor progress.
              </p>
            </div>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-950 space-y-2">
            <span className="font-bold flex items-center gap-1.5 text-teal-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Pre-Flight Electrophoresis Checklist:
            </span>
            <ul className="list-disc list-inside space-y-1 text-teal-900 leading-relaxed">
              <li>Buffer submerged: 1X TAE or 1X TBE buffer covers the gel surface by 2–3 mm.</li>
              <li>Wells oriented nearest to the black (-) negative electrode.</li>
              <li>Power supply set to 100V–120V (approx. 5V per cm between electrodes).</li>
              <li>Microbubbles observed generating at platinum wire electrodes confirming current flow.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Lesson Footer Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          {isCompleted ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lesson completed! All 3 practical station criteria reviewed.
            </span>
          ) : (
            <span>Understand the evaluators' checklist before starting Station Rubrics.</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => markBenchLessonComplete?.('lesson_rubrics', !isCompleted)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
            }`}
          >
            {isCompleted ? 'Unmark Completion' : '✓ Mark Lesson as Complete'}
          </button>

          {onLaunchDrill && (
            <button
              onClick={onLaunchDrill}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>Practice Station Rubrics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
