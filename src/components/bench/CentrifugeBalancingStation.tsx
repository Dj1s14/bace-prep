import React, { useState, useMemo } from 'react';
import {
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Zap,
  Info,
  ShieldAlert,
  Calculator,
  Award,
  CircleDot,
  Check,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CentrifugeChallenge {
  id: string;
  title: string;
  sampleCount: number;
  initialSlots: number[]; // pre-filled sample tube slot indices (0-indexed)
  description: string;
  rotorSize: 12 | 24;
}

const CHALLENGES: CentrifugeChallenge[] = [
  {
    id: 'c1',
    title: 'Challenge 1: Balance 1 Sample Tube',
    sampleCount: 1,
    initialSlots: [0],
    description: 'You have 1 reaction tube in Slot 1. Add a balance tube with matching volume to achieve 180° counter-balance.',
    rotorSize: 12,
  },
  {
    id: 'c2',
    title: 'Challenge 2: Balance 3 Sample Tubes (Equilateral Triangle)',
    sampleCount: 3,
    initialSlots: [0, 4, 8],
    description: 'You have 3 samples placed in Slots 1, 5, and 9 (120° apart). Is this rotor naturally balanced without balance tubes? Test and spin.',
    rotorSize: 12,
  },
  {
    id: 'c3',
    title: 'Challenge 3: Balance 5 Sample Tubes (Odd Count)',
    sampleCount: 5,
    initialSlots: [0, 1, 2, 4, 8],
    description: 'You have 5 sample tubes. Strategic balance: Add 1 water balance tube to create two balanced sets (one 120° triangle + one 180° pair).',
    rotorSize: 12,
  },
  {
    id: 'c4',
    title: 'Challenge 4: High-Throughput 24-Well Balance (7 Tubes)',
    sampleCount: 7,
    initialSlots: [0, 2, 4, 6, 8, 10, 12],
    description: 'A 24-well rotor with 7 active tubes. Position balance tubes to achieve total center-of-mass equilibrium.',
    rotorSize: 24,
  },
];

export const CentrifugeBalancingStation: React.FC = () => {
  const { recordBenchActivity, benchStats } = useApp?.() || {};

  // Rotor Configuration State
  const [rotorSize, setRotorSize] = useState<12 | 24>(12);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [tubeSlots, setTubeSlots] = useState<('empty' | 'sample' | 'balance')[]>(() => {
    const arr = new Array(12).fill('empty');
    arr[0] = 'sample';
    return arr;
  });

  // Spin Animation & Safety Check State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinOutcome, setSpinOutcome] = useState<'balanced' | 'unbalanced' | null>(null);

  // Metrology Drill State: RCF vs RPM
  const [metrologySeed, setMetrologySeed] = useState<number>(1);
  const metrologyProblem = useMemo(() => {
    const rpmOptions = [10000, 12000, 13000, 14000, 15000];
    const radiusOptions = [7.0, 7.5, 8.0, 8.5];
    const rpm = rpmOptions[metrologySeed % rpmOptions.length];
    const r = radiusOptions[(metrologySeed * 3) % radiusOptions.length];

    // Formula: RCF = 1.118 * 10^-5 * r * (RPM)^2
    const exactRcf = 1.118e-5 * r * Math.pow(rpm, 2);
    const roundedRcf = Math.round(exactRcf);

    return {
      rpm,
      radiusCm: r,
      correctRcf: roundedRcf,
    };
  }, [metrologySeed]);

  const [studentRcfInput, setStudentRcfInput] = useState<string>('');
  const [metrologyFeedback, setMetrologyFeedback] = useState<{
    evaluated: boolean;
    isCorrect: boolean;
    diff: number;
    explanation: string;
  } | null>(null);

  // Center of Mass Physics Calculation
  const balancePhysics = useMemo(() => {
    const N = rotorSize;
    let sumCos = 0;
    let sumSin = 0;
    let totalTubes = 0;

    tubeSlots.slice(0, N).forEach((slot, i) => {
      if (slot !== 'empty') {
        totalTubes++;
        const angle = (i * 2 * Math.PI) / N;
        sumCos += Math.cos(angle);
        sumSin += Math.sin(angle);
      }
    });

    const netOffset = Math.sqrt(sumCos * sumCos + sumSin * sumSin);
    // Rotor is balanced if center-of-mass offset is near 0 (< 0.05) and totalTubes > 0
    const isBalanced = totalTubes > 0 && netOffset < 0.05;

    return {
      totalTubes,
      netOffset: Math.round(netOffset * 1000) / 1000,
      isBalanced,
    };
  }, [tubeSlots, rotorSize]);

  // Load a challenge scenario
  const handleSelectChallenge = (idx: number) => {
    setActiveChallengeIdx(idx);
    const ch = CHALLENGES[idx];
    setRotorSize(ch.rotorSize);
    const newSlots = new Array(ch.rotorSize).fill('empty');
    ch.initialSlots.forEach((slotIdx) => {
      if (slotIdx < ch.rotorSize) {
        newSlots[slotIdx] = 'sample';
      }
    });
    setTubeSlots(newSlots);
    setSpinOutcome(null);
    setIsSpinning(false);
  };

  // Toggle slot state: empty -> balance (green) -> sample (blue) -> empty
  const handleSlotClick = (slotIdx: number) => {
    if (isSpinning) return;
    setSpinOutcome(null);
    setTubeSlots((prev) => {
      const next = [...prev];
      const cur = next[slotIdx];
      if (cur === 'empty') next[slotIdx] = 'balance';
      else if (cur === 'balance') next[slotIdx] = 'sample';
      else next[slotIdx] = 'empty';
      return next;
    });
  };

  // Spin rotor and evaluate safety
  const handleSpinRotor = () => {
    if (balancePhysics.totalTubes === 0) {
      alert('The rotor is empty! Place microcentrifuge tubes before spinning.');
      return;
    }

    setIsSpinning(true);
    setSpinOutcome(null);

    setTimeout(() => {
      setIsSpinning(false);
      if (balancePhysics.isBalanced) {
        setSpinOutcome('balanced');
        recordBenchActivity?.(
          'centrifuge',
          1,
          1,
          `Centrifuge Balance: Verified safe ${rotorSize}-well rotor balance (${balancePhysics.totalTubes} tubes)`
        );
      } else {
        setSpinOutcome('unbalanced');
      }
    }, 1800);
  };

  // Metrology RCF Check
  const handleVerifyRcf = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!studentRcfInput.trim()) return;

    const parsed = parseInt(studentRcfInput.replace(/,/g, '').trim(), 10);
    if (isNaN(parsed)) return;

    const diff = Math.abs(parsed - metrologyProblem.correctRcf);
    const percentDiff = (diff / metrologyProblem.correctRcf) * 100;
    const isCorrect = percentDiff <= 2.5;

    setMetrologyFeedback({
      evaluated: true,
      isCorrect,
      diff,
      explanation: isCorrect
        ? `Correct RCF calculation! ${parsed.toLocaleString()} × g matches the formula RCF = 1.118 × 10⁻⁵ × r × (RPM)².`
        : `Calculation out of range. Your answer was ${parsed.toLocaleString()} × g. Correct value is ${metrologyProblem.correctRcf.toLocaleString()} × g (Variance: ${percentDiff.toFixed(1)}%).`,
    });

    recordBenchActivity?.(
      'math',
      isCorrect ? 1 : 0,
      1,
      `Centrifuge Metrology: Calculated RCF from ${metrologyProblem.rpm} RPM`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
              Station 1.5 Equipment Safety & Metrology
            </span>
            <span className="text-xs text-slate-500 font-medium">BACE Domain 1 & 7</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Centrifuge Rotor Balancing & RCF Metrology Simulator
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
            Ensure rotational center-of-mass symmetry to prevent catastrophic high-speed spindle damage, and convert instrument RPM into protocol gravitational force (RCF × g).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Rotors Balanced</div>
            <div className="text-lg font-black text-amber-700">
              {benchStats?.centrifugeBalancesCompleted || 0}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: INTERACTIVE ROTOR TOP-DOWN VIEW (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl text-white space-y-4">
            {/* Rotor Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSpinning ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'
                  }`}
                />
                <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                  MICROFUGE 20R • {rotorSize}-WELL ROTOR
                </span>
              </div>

              {/* Rotor Size Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-bold">
                <button
                  onClick={() => {
                    setRotorSize(12);
                    setTubeSlots(new Array(12).fill('empty'));
                    setSpinOutcome(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    rotorSize === 12 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  12-Place
                </button>
                <button
                  onClick={() => {
                    setRotorSize(24);
                    setTubeSlots(new Array(24).fill('empty'));
                    setSpinOutcome(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    rotorSize === 24 ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  24-Place
                </button>
              </div>
            </div>

            {/* TOP-DOWN ROTOR CANVAS */}
            <div className="relative w-full h-[320px] flex items-center justify-center">
              {/* Outer Centrifuge Housing Rim */}
              <div className="absolute w-[290px] h-[290px] rounded-full border-8 border-slate-800 bg-slate-950 shadow-inner flex items-center justify-center">
                {/* Rotor Spindle Center Hub with CSS Spin animation */}
                <div
                  className={`relative w-[240px] h-[240px] rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center transition-all ${
                    isSpinning ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '0.4s' }}
                >
                  {/* Central Aluminum Spindle Nut */}
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-md z-20">
                    <span className="text-[9px] font-mono text-slate-400 font-bold">SPINDLE</span>
                  </div>

                  {/* Tube Slots placed in circle */}
                  {Array.from({ length: rotorSize }).map((_, slotIdx) => {
                    const angleRad = (slotIdx * 2 * Math.PI) / rotorSize - Math.PI / 2;
                    const radiusPx = 92; // Distance from center
                    const leftPx = 120 + radiusPx * Math.cos(angleRad) - 15;
                    const topPx = 120 + radiusPx * Math.sin(angleRad) - 15;

                    const state = tubeSlots[slotIdx] || 'empty';

                    return (
                      <button
                        key={slotIdx}
                        onClick={() => handleSlotClick(slotIdx)}
                        style={{ left: `${leftPx}px`, top: `${topPx}px` }}
                        className={`absolute w-7 h-7 rounded-full border-2 text-[10px] font-mono font-bold flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md ${
                          state === 'empty'
                            ? 'bg-slate-950/80 border-slate-700 text-slate-500 hover:border-slate-400'
                            : state === 'sample'
                            ? 'bg-blue-600 border-blue-300 text-white shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                            : 'bg-emerald-500 border-emerald-200 text-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                        }`}
                        title={`Slot #${slotIdx + 1}: ${
                          state === 'empty'
                            ? 'Empty'
                            : state === 'sample'
                            ? 'Sample Tube'
                            : 'Balance Tube (dH₂O)'
                        }`}
                      >
                        {slotIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tube Legend & Quick Clear */}
            <div className="flex items-center justify-between text-xs px-2">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600 border border-blue-300" />
                  <span className="text-slate-300">Sample Tube</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-200" />
                  <span className="text-slate-300">Balance Tube (Water)</span>
                </span>
              </div>

              <button
                onClick={() => setTubeSlots(new Array(rotorSize).fill('empty'))}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Clear Rotor
              </button>
            </div>

            {/* Spin Action Button */}
            <div className="pt-2">
              <button
                onClick={handleSpinRotor}
                disabled={isSpinning}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-lg"
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>
                  {isSpinning ? 'Accelerating to 14,000 RPM...' : 'Close Lid & Test Spin (14,000 RPM)'}
                </span>
              </button>
            </div>

            {/* Spin Outcome Alert Banner */}
            {spinOutcome === 'balanced' && (
              <div className="p-3.5 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block font-black">Rotor Safely Balanced!</strong>
                  Center of mass offset: {balancePhysics.netOffset} (Zero vector). Safe centrifugation verified.
                </div>
              </div>
            )}

            {spinOutcome === 'unbalanced' && (
              <div className="p-3.5 bg-rose-950 border border-rose-700 text-rose-300 rounded-xl text-xs flex items-center space-x-2 animate-in shake duration-200">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <strong className="block font-black">SAFETY INTERLOCK: Rotor Unbalanced!</strong>
                  Center-of-mass offset: {balancePhysics.netOffset}. Spinning an unbalanced rotor causes catastrophic spindle shearing, bearing fatigue, and aerosol hazard.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SCENARIO CHALLENGES & RCF METROLOGY (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* CHALLENGE SCENARIO SELECTION */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              BACE Standard Centrifuge Drill
            </span>
            <h3 className="text-sm font-black text-slate-900">Select Practice Scenario</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHALLENGES.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChallenge(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeChallengeIdx === idx
                      ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs">{ch.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {ch.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RCF VS RPM METROLOGY DRILL */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Domain 4 & 7 Applied Metrology
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  RCF (g-force) Conversion Calculator
                </h3>
              </div>
              <button
                onClick={() => {
                  setMetrologySeed((s) => s + 1);
                  setStudentRcfInput('');
                  setMetrologyFeedback(null);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Problem</span>
              </button>
            </div>

            {/* Formula Callout */}
            <div className="bg-slate-900 text-amber-300 p-3 rounded-xl font-mono text-center text-xs font-bold shadow-inner">
              RCF = 1.118 × 10⁻⁵ × r × (RPM)²
            </div>

            {/* Drill Scenario */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <span className="text-slate-500 font-bold block uppercase text-[10px]">
                Given Parameters:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono">
                  <span className="text-slate-500 text-[10px] block">Rotor Radius (r):</span>
                  <strong className="text-slate-900 text-sm">{metrologyProblem.radiusCm} cm</strong>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono">
                  <span className="text-slate-500 text-[10px] block">Centrifuge Speed:</span>
                  <strong className="text-slate-900 text-sm">
                    {metrologyProblem.rpm.toLocaleString()} RPM
                  </strong>
                </div>
              </div>
            </div>

            {/* Calculation Form */}
            <form onSubmit={handleVerifyRcf} className="space-y-3">
              <label className="text-xs font-bold text-slate-800 block">
                Calculate Relative Centrifugal Force (RCF in × g, round to nearest whole number):
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={studentRcfInput}
                    onChange={(e) => setStudentRcfInput(e.target.value)}
                    placeholder="e.g. 14500"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    × g
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Check Metrology</span>
                </button>
              </div>
            </form>

            {/* Metrology Feedback */}
            {metrologyFeedback?.evaluated && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                  metrologyFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold">
                  {metrologyFeedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>RCF Metrology Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Metrology Out of Tolerance</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{metrologyFeedback.explanation}</p>
                <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                  RCF = 1.118 × 10⁻⁵ × {metrologyProblem.radiusCm} × ({metrologyProblem.rpm})² ={' '}
                  <strong>{metrologyProblem.correctRcf.toLocaleString()} × g</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
