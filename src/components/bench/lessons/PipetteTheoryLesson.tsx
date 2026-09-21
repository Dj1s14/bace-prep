import React, { useState } from 'react';
import {
  Pipette,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  Check,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface PipetteTheoryLessonProps {
  onLaunchDrill?: () => void;
}

export const PipetteTheoryLesson: React.FC<PipetteTheoryLessonProps> = ({ onLaunchDrill }) => {
  const { benchStats, markBenchLessonComplete } = useApp?.() || {};
  const isCompleted = Boolean(benchStats?.lessonsCompleted?.['lesson_pipette']);

  // Interactive Two-Stop Plunger State
  const [plungerStep, setPlungerStep] = useState<number>(0);
  const [selectedPipetteTab, setSelectedPipetteTab] = useState<'P20' | 'P200' | 'P1000'>('P20');

  const PLUNGER_STEPS = [
    {
      step: 0,
      title: 'Position 0: Resting State (Unpressed)',
      positionDesc: 'Plunger is at full height. Air volume inside piston barrel equals the dialed setting.',
      liquidState: 'Dry tip or tip outside liquid. Spring is fully relaxed.',
      benchAction: 'Hold pipette vertically. Check that the dialed volume matches your protocol before touching liquid.',
      criticalRule: 'NEVER depress the plunger while the tip is submerged in liquid—this blows air bubbles and aerosols into your reagent!',
      plungerOffset: 0, // % from top
      liquidHeight: 0,
    },
    {
      step: 1,
      title: 'Step 1: Depress to First Stop (In Air)',
      positionDesc: 'Push thumb down until you feel initial firm resistance. This displaces exactly the calibrated volume of air.',
      liquidState: 'Tip is positioned in the air directly above the liquid vessel.',
      benchAction: 'Feel the mechanical resistance point. Do NOT push through to the second stop yet!',
      criticalRule: 'First Stop is for MEASURING volume. Always reach first stop BEFORE submerging the tip.',
      plungerOffset: 45,
      liquidHeight: 0,
    },
    {
      step: 2,
      title: 'Step 2: Submerge Tip at Proper Depth',
      positionDesc: 'Keep plunger held firmly at the first stop while immersing the tip into the target solution.',
      liquidState: 'Tip immersed 1–2 mm (P20), 2–3 mm (P200), or 3–6 mm (P1000) below surface.',
      benchAction: 'Keep pipette strictly vertical (within 20° of perpendicular). Do not touch the bottom of the tube.',
      criticalRule: 'Submerging too deep forces liquid to coat the outside of the tip, causing massive positive volume error.',
      plungerOffset: 45,
      liquidHeight: 10,
    },
    {
      step: 3,
      title: 'Step 3: Controlled Release to Aspirate',
      positionDesc: 'Smoothly and slowly release your thumb back to resting position over 1 to 2 seconds.',
      liquidState: 'Negative pressure draws liquid smoothly up into the tip without turbulence or air pockets.',
      benchAction: 'Let thumb follow plunger upward. Never allow your thumb to snap back or slip off!',
      criticalRule: 'Snapping the plunger releases liquid violently into the internal piston shaft, corroding parts and causing cross-contamination.',
      plungerOffset: 0,
      liquidHeight: 85,
    },
    {
      step: 4,
      title: 'Step 4: Capillary Pause (1–2 Seconds)',
      positionDesc: 'Keep tip submerged in liquid for 1 to 2 seconds after the plunger reaches top resting position.',
      liquidState: 'Hydrostatic pressure and viscous fluid flow reach true thermodynamic equilibrium.',
      benchAction: 'Pause and watch liquid level stabilize. For viscous solutions (glycerol, enzymes), pause for 3–5 seconds.',
      criticalRule: 'Withdrawing too fast creates a partial vacuum that sucks an air bubble into the tip orifice.',
      plungerOffset: 0,
      liquidHeight: 85,
    },
    {
      step: 5,
      title: 'Step 5: Touch Wall at 45° & Dispense to 1st Stop',
      positionDesc: 'Move tip into receiving vessel. Place tip against inner sidewall at a 45° angle. Depress smoothly to First Stop.',
      liquidState: 'Liquid flows down the tube wall aided by surface tension and capillary action.',
      benchAction: 'Smooth downward stroke to first stop. Most of the measured liquid transfers into the destination tube.',
      criticalRule: 'Dispensing into open air creates hanging droplets that cling to the tip orifice instead of entering the reaction.',
      plungerOffset: 45,
      liquidHeight: 15,
    },
    {
      step: 6,
      title: 'Step 6: Blow-Out to Second Stop (Purge)',
      positionDesc: 'From the first stop, push thumb down firmly past resistance to the SECOND STOP ("blow-out").',
      liquidState: 'An extra burst of air purges the stubborn residual droplet clinging to the inside tip orifice.',
      benchAction: 'Feel the spring compress through the secondary travel distance to ensure 100% volumetric delivery.',
      criticalRule: 'The Second Stop is ONLY used during dispensing. NEVER push to second stop when aspirating!',
      plungerOffset: 85,
      liquidHeight: 0,
    },
    {
      step: 7,
      title: 'Step 7: Withdraw Tip with Plunger Depressed',
      positionDesc: 'Lift pipette up along the tube sidewall while KEEPING plunger held down at the second stop.',
      liquidState: 'Tip clears the liquid surface and tube rim completely.',
      benchAction: 'Do not release your thumb until the tip is completely outside the destination tube!',
      criticalRule: 'Releasing your thumb while inside the tube will suck the sample you just dispensed right back up into the tip.',
      plungerOffset: 85,
      liquidHeight: 0,
    },
    {
      step: 8,
      title: 'Step 8: Release Thumb & Eject Tip',
      positionDesc: 'Release thumb to resting position. Position tip over biohazard sharps container and depress Tip Ejector button.',
      liquidState: 'Tip drops cleanly into waste. Pipette is ready for a fresh sterile tip.',
      benchAction: 'Never touch used tips with gloved hands. Store pipette vertically on carousel or stand.',
      criticalRule: 'Leaving micropipettes lying flat on the bench can cause liquid to seep into the barrel mechanism.',
      plungerOffset: 0,
      liquidHeight: 0,
    },
  ];

  const currentPlunger = PLUNGER_STEPS[plungerStep];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-blue-800/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Pipette className="w-3.5 h-3.5 text-blue-400" />
              <span>BACE Practical Station 1 & Domain 1 Mastery</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Micropipette Theory, Volumetric Dials & Plunger Dynamics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Master the optical readout conventions of P20, P200, and P1000 volumetric windows, the physical mechanics of the two-stop plunger, and good liquid handling practices required by BACE evaluators.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center shrink-0">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_pipette', !isCompleted)}
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
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mark Lesson as Complete</span>
                </>
              )}
            </button>

            {onLaunchDrill && (
              <button
                onClick={onLaunchDrill}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Launch Dial Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: Volumetric Dial Windows Explained */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
            <Pipette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              1. Reading the Volumetric Window: Red Digit Significance
            </h3>
            <p className="text-xs text-slate-500">
              Understanding decimal place values, line dividers, and mechanical ranges across the 3 standard BACE pipettes.
            </p>
          </div>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 pb-2">
          {(['P20', 'P200', 'P1000'] as const).map((model) => (
            <button
              key={model}
              onClick={() => setSelectedPipetteTab(model)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPipetteTab === model
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {model === 'P20' && 'P20 (2.0 – 20.0 µL)'}
              {model === 'P200' && 'P200 (20 – 200 µL)'}
              {model === 'P1000' && 'P1000 (100 – 1000 µL)'}
            </button>
          ))}
        </div>

        {/* Model Breakdown Panel */}
        {selectedPipetteTab === 'P20' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl text-white border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-2">
                P20 Volumetric Display (Window)
              </span>

              {/* Dial Representation */}
              <div className="bg-slate-900 border-4 border-slate-700 rounded-xl p-4 w-44 text-center shadow-inner space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Example: 12.5 µL</div>
                <div className="bg-black py-2 px-4 rounded-lg font-mono text-3xl font-black tracking-widest border border-slate-800 space-y-1">
                  <div className="text-white">1</div>
                  <div className="text-white">2</div>
                  <div className="h-0.5 w-full bg-slate-700 my-1" />
                  <div className="text-red-500 flex items-center justify-center gap-1">
                    <span>5</span>
                    <span className="text-[10px] text-red-400 font-normal">--</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Tens (1) • Ones (2) • <span className="text-red-400 font-bold">Tenths (0.5)</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-300 text-center leading-relaxed">
                Bottom digit is <span className="text-red-400 font-bold">RED</span>. The horizontal divider marks the decimal point.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  P20 Golden Rule: Red Digit = Tenths of a Microliter (0.1 µL)
                </strong>
                <p>
                  Because the maximum capacity of a P20 is 20 µL, the top digit never exceeds 2. If you see <strong>1-5-5</strong> on a P20, that is <strong>15.5 µL</strong>, NOT 155 µL! Sub-tick marks around the red digit represent 0.02 µL increments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Calibrated Range</div>
                  <div className="text-slate-600 mt-0.5">2.0 µL to 20.0 µL</div>
                  <div className="text-[11px] text-slate-400 mt-1">Volumes &lt; 2 µL exhibit high CV error.</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Tip Color Standard</div>
                  <div className="text-slate-600 mt-0.5">Clear / Small Yellow (10–20 µL)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Requires micro-orifice tips.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPipetteTab === 'P200' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl text-white border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-400 mb-2">
                P200 Volumetric Display (Window)
              </span>

              {/* Dial Representation */}
              <div className="bg-slate-900 border-4 border-slate-700 rounded-xl p-4 w-44 text-center shadow-inner space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Example: 125 µL</div>
                <div className="bg-black py-2 px-4 rounded-lg font-mono text-3xl font-black tracking-widest border border-slate-800 space-y-1">
                  <div className="text-white">1</div>
                  <div className="text-white">2</div>
                  <div className="text-white">5</div>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Hundreds (100) • Tens (20) • Ones (5)
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-300 text-center leading-relaxed">
                All 3 digits are <span className="font-bold text-white">BLACK</span>. No decimal point is displayed.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-yellow-950 space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-yellow-900">
                  <Info className="w-4 h-4 text-yellow-700" />
                  P200 Direct Integer Reading
                </strong>
                <p>
                  Every digit corresponds directly to whole microliters. The top digit represents hundreds (0, 1, or 2), the middle is tens, and the bottom is ones. <strong>0-7-5</strong> is exactly <strong>75 µL</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Calibrated Range</div>
                  <div className="text-slate-600 mt-0.5">20 µL to 200 µL</div>
                  <div className="text-[11px] text-slate-400 mt-1">Do not use below 20 µL (switch to P20).</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Tip Color Standard</div>
                  <div className="text-slate-600 mt-0.5">Standard Yellow Tips (200 µL)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Universal bevel-collar fit.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPipetteTab === 'P1000' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl text-white border border-slate-800 flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 mb-2">
                P1000 Volumetric Display (Window)
              </span>

              {/* Dial Representation */}
              <div className="bg-slate-900 border-4 border-slate-700 rounded-xl p-4 w-44 text-center shadow-inner space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Example: 550 µL</div>
                <div className="bg-black py-2 px-4 rounded-lg font-mono text-3xl font-black tracking-widest border border-slate-800 space-y-1">
                  <div className="text-red-500">0</div>
                  <div className="text-white">5</div>
                  <div className="text-white">5</div>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  <span className="text-red-400 font-bold">Thousands (0)</span> • Hundreds (5) • Tens (5)
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-300 text-center leading-relaxed">
                Top digit is <span className="text-red-400 font-bold">RED</span>. It only turns to <span className="text-red-400 font-bold">1</span> when set to 1000 µL (1.00 mL).
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-1">
                <strong className="font-bold flex items-center gap-1.5 text-blue-900">
                  <AlertTriangle className="w-4 h-4 text-blue-700" />
                  P1000 Golden Rule: Top Red Digit = Thousands of Microliters (1000 µL = 1 mL)
                </strong>
                <p>
                  The bottom digit represents tens of µL (increments of 10). If you see <strong>0-4-5</strong>, you have dialed <strong>450 µL</strong> (0.45 mL). Only when the top red digit reads <strong>1-0-0</strong> is it delivering 1000 µL.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Calibrated Range</div>
                  <div className="text-slate-600 mt-0.5">100 µL to 1000 µL (1.0 mL)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Never dial above 1000 µL (breaks spring).</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">Tip Color Standard</div>
                  <div className="text-slate-600 mt-0.5">Large Blue Tips (1000 µL)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Wide bore barrel seal.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parallax and Calibration Warning Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start space-x-3 text-xs text-slate-700">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">
              Critical BACE Evaluator Warning: Never Force the Adjustment Knob Past Calibration Stops
            </span>
            <p>
              Turning the volume adjustment knob below the minimum volume (e.g. below 2.0 µL on a P20) or above maximum (e.g. above 1000 µL on a P1000) jams the threaded lead screw and strips the internal calibration gears. This results in an automatic deduction on the BACE practical exam.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interactive Two-Stop Plunger Mechanism Walkthrough */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                2. The Two-Stop Plunger Mechanism: Step-by-Step Interactive Guide
              </h3>
              <p className="text-xs text-slate-500">
                Visualize internal displacement, spring travel, and liquid boundary behavior across each step of the pipetting cycle.
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-400">
            Step {plungerStep + 1} of {PLUNGER_STEPS.length}
          </div>
        </div>

        {/* Interactive Plunger Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Pipette Graphic */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[340px] text-white">
            <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider mb-4">
              Physical Plunger State Simulation
            </span>

            {/* Simulated Plunger Column */}
            <div className="relative w-28 h-60 bg-slate-900 rounded-2xl border-2 border-slate-700 flex flex-col items-center p-2 shadow-inner overflow-hidden">
              {/* Plunger Button */}
              <div
                className="w-16 h-6 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 shadow-md border border-blue-300 transition-all duration-300 flex items-center justify-center text-[9px] font-black tracking-wider text-white"
                style={{
                  transform: `translateY(${currentPlunger.plungerOffset * 0.9}px)`,
                }}
              >
                {currentPlunger.plungerOffset === 0
                  ? 'REST'
                  : currentPlunger.plungerOffset < 60
                  ? '1st STOP'
                  : '2nd STOP'}
              </div>

              {/* Plunger Shaft */}
              <div
                className="w-3 bg-slate-400 rounded-full transition-all duration-300"
                style={{
                  height: `${70 - currentPlunger.plungerOffset * 0.4}px`,
                }}
              />

              {/* Stop Indicator Bars */}
              <div className="absolute top-[48px] left-2 right-2 border-t border-dashed border-amber-400/50 flex justify-between px-1 text-[8px] text-amber-300 font-mono">
                <span>1st Stop</span>
                <span>(Calibrated)</span>
              </div>
              <div className="absolute top-[80px] left-2 right-2 border-t border-dashed border-red-400/50 flex justify-between px-1 text-[8px] text-red-300 font-mono">
                <span>2nd Stop</span>
                <span>(Blow-Out)</span>
              </div>

              {/* Pipette Tip Cone & Liquid Level */}
              <div className="mt-auto w-12 h-24 bg-slate-800/80 rounded-b-xl border border-slate-700 relative overflow-hidden flex flex-col justify-end">
                <div
                  className="w-full bg-gradient-to-t from-teal-500 to-cyan-400 transition-all duration-500"
                  style={{ height: `${currentPlunger.liquidHeight}%` }}
                />
                <div className="absolute top-1 left-0 right-0 text-[8px] font-mono text-center text-slate-400">
                  Tip
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] font-semibold text-teal-300 text-center">
              {currentPlunger.liquidHeight > 0
                ? `Aspirated Liquid: ${currentPlunger.liquidHeight}%`
                : 'Tip Empty / Purged'}
            </div>
          </div>

          {/* Step Narrative & Instructions */}
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Phase {plungerStep + 1}
              </span>
              <h4 className="text-xl font-black text-slate-900">{currentPlunger.title}</h4>
              <p className="text-sm text-slate-600">{currentPlunger.positionDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs">
                <span className="font-bold text-blue-900 block mb-1">Bench Action</span>
                <p className="text-blue-800 leading-relaxed">{currentPlunger.benchAction}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 block mb-1">Internal Liquid State</span>
                <p className="text-slate-600 leading-relaxed">{currentPlunger.liquidState}</p>
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-rose-900">Critical Exam Rule: </strong>
                <span>{currentPlunger.criticalRule}</span>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={plungerStep === 0}
                onClick={() => setPlungerStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                ← Previous Step
              </button>

              <div className="flex space-x-1.5">
                {PLUNGER_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPlungerStep(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      plungerStep === idx ? 'bg-blue-600 w-6' : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={`Step ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                disabled={plungerStep === PLUNGER_STEPS.length - 1}
                onClick={() => setPlungerStep((prev) => Math.min(PLUNGER_STEPS.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Best Practices & Pro-Tips for BACE Practical Evaluation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              3. Laboratory Best Practices: What BACE Evaluators Grade
            </h3>
            <p className="text-xs text-slate-500">
              Core physical handling standards checked on Station 1 Gravimetric Verification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Immersion Depth Standards</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Submerging the tip too deep causes hydrostatic surface tension to pull excess liquid onto the outside tip exterior, yielding significant over-delivery (+5% to +15% error).
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-1 font-mono text-[11px] pt-1">
              <li>P20: 1.0 – 2.0 mm immersion depth</li>
              <li>P200: 2.0 – 3.0 mm immersion depth</li>
              <li>P1000: 3.0 – 6.0 mm immersion depth</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Pre-Wetting / Rinsing the Tip</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Before aspirating your final aliquot, aspirate and dispense the solution <strong>2 to 3 times</strong>. This equalizes humidity inside the dead air volume and conditions the plastic tip interior, preventing evaporation loss and under-delivery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>45° Dispensing Angle Touching Tube Sidewall</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Always rest the bevel of the tip against the inner wall of the destination vessel at approximately a 45° angle. Capillary surface tension draws the droplet off the tip surface cleanly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Forward vs. Reverse Pipetting</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Forward Pipetting</strong> (1st stop aspirate, 2nd stop blow-out) is standard for aqueous buffers. <strong>Reverse Pipetting</strong> (2nd stop aspirate, 1st stop dispense) is used for viscous liquids (glycerol, restriction enzymes) or foaming detergents (SDS, Triton X-100).
            </p>
          </div>
        </div>

        {/* Final Sign-off Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Lesson status: Completed and recorded in your student profile readiness score.
              </span>
            ) : (
              <span>Mark this lesson complete once you understand the plunger mechanisms and optical window readouts.</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => markBenchLessonComplete?.('lesson_pipette', !isCompleted)}
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
                <span>Practice Micropipette Drills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
