import React, { useState, useEffect } from 'react';
import {
  Pipette,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Info,
  ShieldAlert,
  ArrowRight,
  Flame,
  Award,
  Check,
} from 'lucide-react';
import { PipetteModel, PipetteSpec } from './types';
import { useApp } from '../../context/AppContext';

export const PIPETTE_SPECS: Record<PipetteModel, PipetteSpec> = {
  P20: {
    model: 'P20',
    name: 'Gilson / Eppendorf Style P20',
    minVolume: 2.0,
    maxVolume: 20.0,
    stepFine: 0.1,
    stepCoarse: 1.0,
    tipType: '10 µL / 20 µL Micro-Tips (Clear or Yellow)',
    tipColor: 'bg-amber-100 text-amber-900 border-amber-300',
    colorBand: 'bg-amber-400',
    accuracyTolerance: '±1.0% (at 20 µL) to ±3.0% (at 2 µL)',
    precisionTolerance: '< 0.5% CV (at 20 µL)',
    digitSpecs: {
      digit1: { label: 'Tens (10 µL)', unit: '10s', color: 'black', max: 2 },
      digit2: { label: 'Ones (1 µL)', unit: '1s', color: 'black', max: 9 },
      digit3: { label: 'Tenths (0.1 µL)', unit: '0.1s', color: 'red', max: 9, hasTicks: true },
    },
    dialDescription:
      'Top 2 digits are black (Tens and Ones). Bottom digit is RED with sub-tick marks representing tenths of a microliter (0.1 µL).',
  },
  P200: {
    model: 'P200',
    name: 'Gilson / Eppendorf Style P200',
    minVolume: 20,
    maxVolume: 200,
    stepFine: 1,
    stepCoarse: 10,
    tipType: '200 µL Universal Tips (Yellow)',
    tipColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    colorBand: 'bg-yellow-400',
    accuracyTolerance: '±0.8% (at 200 µL) to ±2.5% (at 20 µL)',
    precisionTolerance: '< 0.4% CV (at 200 µL)',
    digitSpecs: {
      digit1: { label: 'Hundreds (100 µL)', unit: '100s', color: 'black', max: 2 },
      digit2: { label: 'Tens (10 µL)', unit: '10s', color: 'black', max: 9 },
      digit3: { label: 'Ones (1 µL)', unit: '1s', color: 'black', max: 9 },
    },
    dialDescription:
      'All 3 digits are BLACK. Top digit = Hundreds, Middle = Tens, Bottom = Ones (1 µL).',
  },
  P1000: {
    model: 'P1000',
    name: 'Gilson / Eppendorf Style P1000',
    minVolume: 100,
    maxVolume: 1000,
    stepFine: 10,
    stepCoarse: 100,
    tipType: '1000 µL Universal Tips (Blue)',
    tipColor: 'bg-blue-100 text-blue-900 border-blue-300',
    colorBand: 'bg-blue-500',
    accuracyTolerance: '±0.6% (at 1000 µL) to ±2.0% (at 100 µL)',
    precisionTolerance: '< 0.3% CV (at 1000 µL)',
    digitSpecs: {
      digit1: { label: 'Thousands (1000 µL)', unit: '1000s', color: 'red', max: 1 },
      digit2: { label: 'Hundreds (100 µL)', unit: '100s', color: 'black', max: 9 },
      digit3: { label: 'Tens (10 µL)', unit: '10s', color: 'black', max: 9, hasTicks: true },
    },
    dialDescription:
      'Top digit is RED (Thousands of µL, only 1 when set to 1000). Middle and bottom digits are BLACK (Hundreds and Tens of µL).',
  },
};

/**
 * Calculates the 3 display digits from an actual volume in µL.
 */
export function volumeToDigits(model: PipetteModel, vol: number): [number, number, number] {
  if (model === 'P20') {
    // Volume from 2.0 to 20.0
    // d1 = tens (0, 1, 2)
    // d2 = ones (0-9)
    // d3 = tenths (0-9)
    const rounded = Math.round(vol * 10) / 10;
    const d1 = Math.floor(rounded / 10);
    const d2 = Math.floor(rounded % 10);
    const d3 = Math.round((rounded * 10) % 10);
    return [Math.min(2, Math.max(0, d1)), Math.min(9, Math.max(0, d2)), Math.min(9, Math.max(0, d3))];
  } else if (model === 'P200') {
    // Volume from 20 to 200
    // d1 = hundreds (0, 1, 2)
    // d2 = tens (0-9)
    // d3 = ones (0-9)
    const rounded = Math.round(vol);
    const d1 = Math.floor(rounded / 100);
    const d2 = Math.floor((rounded % 100) / 10);
    const d3 = Math.floor(rounded % 10);
    return [Math.min(2, Math.max(0, d1)), Math.min(9, Math.max(0, d2)), Math.min(9, Math.max(0, d3))];
  } else {
    // P1000: volume from 100 to 1000
    // d1 = thousands (0 or 1)
    // d2 = hundreds (0-9)
    // d3 = tens (0-9)
    const rounded = Math.round(vol / 10) * 10;
    const d1 = Math.floor(rounded / 1000);
    const d2 = Math.floor((rounded % 1000) / 100);
    const d3 = Math.floor((rounded % 100) / 10);
    return [Math.min(1, Math.max(0, d1)), Math.min(9, Math.max(0, d2)), Math.min(9, Math.max(0, d3))];
  }
}

/**
 * Calculates actual volume in µL from the 3 digits.
 */
export function digitsToVolume(model: PipetteModel, d1: number, d2: number, d3: number): number {
  if (model === 'P20') {
    return Math.round((d1 * 10 + d2 + d3 * 0.1) * 10) / 10;
  } else if (model === 'P200') {
    return d1 * 100 + d2 * 10 + d3;
  } else {
    return d1 * 1000 + d2 * 100 + d3 * 10;
  }
}

export const MicropipetteTrainer: React.FC = () => {
  const { recordBenchActivity } = useApp?.() || {};

  // Selected Pipette
  const [selectedModel, setSelectedModel] = useState<PipetteModel>('P20');
  const spec = PIPETTE_SPECS[selectedModel];

  // Active Mode: 'read' (Read the dial) | 'set' (Set to target volume)
  const [drillMode, setDrillMode] = useState<'read' | 'set'>('read');

  // Interactive Volumeter State (digits)
  const [d1, setD1] = useState<number>(1);
  const [d2, setD2] = useState<number>(4);
  const [d3, setD3] = useState<number>(8);

  // Student inputs & answers
  const [userVolumeInput, setUserVolumeInput] = useState<string>('');
  const [targetVolume, setTargetVolume] = useState<number>(14.8);
  const [evaluation, setEvaluation] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    message: string;
    details?: string;
  } | null>(null);

  // Stats & Streak
  const [streak, setStreak] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [correctAttempts, setCorrectAttempts] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Helper to generate random volume
  const generateRandomVolume = (model: PipetteModel): number => {
    const s = PIPETTE_SPECS[model];
    if (model === 'P20') {
      // 2.0 to 20.0 with 0.1 step
      const steps = Math.round((s.maxVolume - s.minVolume) / 0.1);
      const randStep = Math.floor(Math.random() * (steps + 1));
      return Math.round((s.minVolume + randStep * 0.1) * 10) / 10;
    } else if (model === 'P200') {
      // 20 to 200 with 1 step, favor interesting numbers like 75, 148, 120, etc.
      const val = Math.floor(Math.random() * (s.maxVolume - s.minVolume + 1)) + s.minVolume;
      return val;
    } else {
      // 100 to 1000 with 10 or 20 step
      const steps = Math.round((s.maxVolume - s.minVolume) / 10);
      const randStep = Math.floor(Math.random() * (steps + 1));
      return s.minVolume + randStep * 10;
    }
  };

  // Reset or randomize for drill
  const initDrill = (model: PipetteModel, mode: 'read' | 'set') => {
    setEvaluation(null);
    setUserVolumeInput('');

    if (mode === 'read') {
      const vol = generateRandomVolume(model);
      const [newD1, newD2, newD3] = volumeToDigits(model, vol);
      setD1(newD1);
      setD2(newD2);
      setD3(newD3);
    } else {
      // 'set' mode: pick a target volume
      const target = generateRandomVolume(model);
      setTargetVolume(target);
      // set dial to a different starting volume
      let startVol = target;
      while (Math.abs(startVol - target) < 0.1) {
        startVol = generateRandomVolume(model);
      }
      const [newD1, newD2, newD3] = volumeToDigits(model, startVol);
      setD1(newD1);
      setD2(newD2);
      setD3(newD3);
    }
  };

  // When model or mode changes, re-init drill
  useEffect(() => {
    initDrill(selectedModel, drillMode);
  }, [selectedModel, drillMode]);

  const currentVolume = digitsToVolume(selectedModel, d1, d2, d3);

  // Check if volume is outside recommended range
  const isBelowMin = currentVolume < spec.minVolume;
  const isAboveMax = currentVolume > spec.maxVolume;
  const isOutOfRange = isBelowMin || isAboveMax;

  // Handle adjustments
  const adjustVolume = (delta: number) => {
    const rawNew = currentVolume + delta;
    // Allow dialing a bit out of range so student learns about mechanical damage
    const clamped = Math.max(0, Math.min(spec.maxVolume * 1.25, Math.round(rawNew * 10) / 10));
    const [newD1, newD2, newD3] = volumeToDigits(selectedModel, clamped);
    setD1(newD1);
    setD2(newD2);
    setD3(newD3);
    setEvaluation(null);
  };

  const setSingleDigit = (position: 1 | 2 | 3, delta: number) => {
    if (position === 1) {
      const max = spec.digitSpecs.digit1.max;
      const next = (d1 + delta + (max + 1)) % (max + 1);
      setD1(next);
    } else if (position === 2) {
      const next = (d2 + delta + 10) % 10;
      setD2(next);
    } else {
      const next = (d3 + delta + 10) % 10;
      setD3(next);
    }
    setEvaluation(null);
  };

  // Submit Answer for "Read the Dial"
  const handleReadSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userVolumeInput.trim()) return;

    const parsed = parseFloat(userVolumeInput.trim());
    if (isNaN(parsed)) return;

    setTotalAttempts((prev) => prev + 1);
    const expected = currentVolume;
    const isCorrect = Math.abs(parsed - expected) <= 0.05;

    if (isCorrect) {
      setCorrectAttempts((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setEvaluation({
        submitted: true,
        isCorrect: true,
        message: `Spot on! ${expected} µL is the exact volumeter reading for this ${selectedModel}.`,
        details: `Top: ${d1} (${spec.digitSpecs.digit1.label}), Middle: ${d2} (${spec.digitSpecs.digit2.label}), Bottom: ${d3} (${spec.digitSpecs.digit3.label}). Tip required: ${spec.tipType}.`,
      });
      recordBenchActivity?.('pipette', 1, 1, `Read ${selectedModel} dial: ${expected} µL`);
    } else {
      setStreak(0);
      setEvaluation({
        submitted: true,
        isCorrect: false,
        message: `Incorrect. The dial reads ${expected} µL, but you entered ${parsed} µL.`,
        details: `Remember for the ${selectedModel}: ${spec.dialDescription} Top digit = ${d1}, Middle = ${d2}, Bottom = ${d3}.`,
      });
      recordBenchActivity?.('pipette', 0, 1, `Read ${selectedModel} dial failed: ${parsed} µL (expected ${expected} µL)`);
    }
  };

  // Submit Answer for "Set the Volume"
  const handleSetSubmit = () => {
    setTotalAttempts((prev) => prev + 1);
    const isCorrect = Math.abs(currentVolume - targetVolume) <= 0.05;

    if (isCorrect) {
      setCorrectAttempts((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setEvaluation({
        submitted: true,
        isCorrect: true,
        message: `Excellent dialing! You set the ${selectedModel} perfectly to ${targetVolume} µL.`,
        details: `Display configuration: [${d1}] - [${d2}] - [${d3}]. Next step: seat tip firmly with a light downward twist (never slam the pipette into the box).`,
      });
      recordBenchActivity?.('pipette', 1, 1, `Set ${selectedModel} to ${targetVolume} µL`);
    } else {
      setStreak(0);
      setEvaluation({
        submitted: true,
        isCorrect: false,
        message: `Not quite. You dialed ${currentVolume} µL, but the target was ${targetVolume} µL.`,
        details: `Check your place values. For ${selectedModel}: ${spec.dialDescription}`,
      });
      recordBenchActivity?.('pipette', 0, 1, `Set ${selectedModel} failed: ${currentVolume} µL (target ${targetVolume} µL)`);
    }
  };

  const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              Wet-Lab Competency 1.1
            </span>
            <span className="text-xs text-slate-500 font-medium">BACE Liquid Handling</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Micropipette Dial & Volumeter Trainer</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Master the authentic vertical 3-digit volumeter readouts, color codes, and volume boundaries for P20, P200, and P1000 micropipettes.
          </p>
        </div>

        {/* Live Score Badge & Streak */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Streak</div>
            <div className="text-lg font-black text-amber-600 flex items-center justify-center space-x-1">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak}</span>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
            <div className="text-lg font-black text-slate-800">
              {accuracyPct}% <span className="text-xs font-normal text-slate-500">({correctAttempts}/{totalAttempts})</span>
            </div>
          </div>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border flex items-center space-x-1.5 transition-colors cursor-pointer ${
              showGuide ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Dial Guide</span>
          </button>
        </div>
      </div>

      {/* Model & Drill Mode Switchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Selector */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Select Pipette Instrument Model
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['P20', 'P200', 'P1000'] as PipetteModel[]).map((m) => {
              const active = selectedModel === m;
              const curSpec = PIPETTE_SPECS[m];
              return (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-slate-900">{m}</span>
                    <span className={`w-3 h-3 rounded-full ${curSpec.colorBand}`} />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-1">
                    {curSpec.minVolume} – {curSpec.maxVolume} µL
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {m === 'P20' ? 'Red tenths' : m === 'P200' ? 'Black digits' : 'Red thousands'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Drill Mode Selector */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Training & Drill Mode
          </label>
          <div className="grid grid-cols-2 gap-2 h-[calc(100%-28px)]">
            <button
              onClick={() => setDrillMode('read')}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                drillMode === 'read'
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">1. Read the Dial</span>
                  <Award className={`w-4 h-4 ${drillMode === 'read' ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inspect the volumeter display and calculate the exact delivered volume in µL.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide mt-2">
                Exam Recall Drill
              </span>
            </button>

            <button
              onClick={() => setDrillMode('set')}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                drillMode === 'set'
                  ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">2. Set the Volume</span>
                  <Sparkles className={`w-4 h-4 ${drillMode === 'set' ? 'text-teal-600' : 'text-slate-400'}`} />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Given a target volume, dial and align the volumeter wheels accurately.
                </p>
              </div>
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wide mt-2">
                Hands-On Setting Drill
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Educational Guide Drawer */}
      {showGuide && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 text-xs text-slate-700 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-200/80">
            <h3 className="font-bold text-blue-900 text-sm flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>BACE Micropipette Volumeter Quick Reading Key</span>
            </h3>
            <span className="text-[11px] text-blue-700 font-semibold">ISO 8655 Standards</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="font-bold text-slate-900">P20 (2.0 – 20.0 µL)</span>
              </div>
              <ul className="mt-2 space-y-1 text-slate-600 text-[11px]">
                <li>• <strong>Top digit (Black):</strong> Tens of µL (0, 1, or 2)</li>
                <li>• <strong>Middle digit (Black):</strong> Ones of µL (0 to 9)</li>
                <li>• <strong>Bottom digit (RED):</strong> Tenths of µL (0.1 µL) with tick marks</li>
                <li className="text-amber-800 font-medium bg-amber-50 p-1 rounded">Example: [1][4][red 8] = <strong>14.8 µL</strong></li>
              </ul>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="font-bold text-slate-900">P200 (20 – 200 µL)</span>
              </div>
              <ul className="mt-2 space-y-1 text-slate-600 text-[11px]">
                <li>• <strong>Top digit (Black):</strong> Hundreds of µL (0, 1, or 2)</li>
                <li>• <strong>Middle digit (Black):</strong> Tens of µL (0 to 9)</li>
                <li>• <strong>Bottom digit (Black):</strong> Ones of µL (0 to 9)</li>
                <li className="text-yellow-900 font-medium bg-yellow-50 p-1 rounded">Example: [1][7][5] = <strong>175 µL</strong>; [0][3][5] = <strong>35 µL</strong></li>
              </ul>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-900">P1000 (100 – 1000 µL)</span>
              </div>
              <ul className="mt-2 space-y-1 text-slate-600 text-[11px]">
                <li>• <strong>Top digit (RED):</strong> Thousands of µL (1 only at 1000)</li>
                <li>• <strong>Middle digit (Black):</strong> Hundreds of µL (0 to 9)</li>
                <li>• <strong>Bottom digit (Black):</strong> Tens of µL (0 to 9, x10 µL)</li>
                <li className="text-blue-900 font-medium bg-blue-50 p-1 rounded">Example: [red 0][7][5] = <strong>750 µL</strong>; [red 1][0][0] = <strong>1000 µL</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Simulated Micropipette Physical Hardware (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl flex flex-col items-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Pipette Plunger Button & Collar */}
          <div className="flex flex-col items-center w-full z-10">
            {/* Push button with knurled plunger top */}
            <div className="w-24 h-9 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-xl border-t-2 border-slate-400 shadow-md flex items-center justify-center relative cursor-pointer hover:brightness-110 transition-all">
              <div className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
                {selectedModel} PUSH
              </div>
            </div>

            {/* Plunger shaft */}
            <div className="w-10 h-6 bg-slate-700 border-x border-slate-600 shadow-inner" />

            {/* Knurled Volume Setting Thumb Wheel */}
            <div className="w-36 h-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-md border border-slate-600 flex items-center justify-between px-2 shadow-inner">
              <button
                type="button"
                onClick={() => adjustVolume(-spec.stepFine)}
                className="p-1 hover:bg-slate-600 text-slate-300 rounded cursor-pointer transition-colors"
                title={`Coarse down -${spec.stepFine} µL`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                Knurled Dial
              </span>
              <button
                type="button"
                onClick={() => adjustVolume(spec.stepFine)}
                className="p-1 hover:bg-slate-600 text-slate-300 rounded cursor-pointer transition-colors"
                title={`Coarse up +${spec.stepFine} µL`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Pipette Body Barrel */}
            <div className="w-48 bg-gradient-to-b from-slate-800 via-slate-750 to-slate-800 rounded-2xl p-4 mt-2 border border-slate-700 shadow-2xl flex flex-col items-center">
              {/* Manufacturer Label and Identification Band */}
              <div className="w-full flex items-center justify-between mb-3 border-b border-slate-700/80 pb-2">
                <span className="text-[11px] font-bold tracking-wider text-slate-300 font-mono">
                  BACE LAB PRO
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold text-slate-900 ${spec.colorBand}`}>
                  {selectedModel}
                </span>
              </div>

              {/* REALISTIC 3-DIGIT VOLUMETER WINDOW */}
              <div className="relative my-2">
                {/* Metallic bezel surround */}
                <div className="p-2 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl border-2 border-slate-600 shadow-2xl">
                  {/* Volumeter frame */}
                  <div className="w-24 bg-slate-950 rounded-lg p-1.5 border border-slate-700 flex flex-col space-y-1.5 shadow-inner">
                    {/* Digit 1 (Top) */}
                    <div className="relative group">
                      <div
                        className={`h-12 rounded-md flex items-center justify-center font-mono text-3xl font-black shadow-inner border border-slate-800 select-none ${
                          spec.digitSpecs.digit1.color === 'red'
                            ? 'bg-rose-950/70 text-rose-500 border-rose-900/60'
                            : 'bg-slate-900 text-slate-100'
                        }`}
                      >
                        {d1}
                      </div>
                      {drillMode === 'set' && (
                        <div className="absolute right-1 inset-y-0 flex flex-col justify-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSingleDigit(1, 1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setSingleDigit(1, -1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Digit 2 (Middle) */}
                    <div className="relative group">
                      <div
                        className={`h-12 rounded-md flex items-center justify-center font-mono text-3xl font-black shadow-inner border border-slate-800 select-none ${
                          spec.digitSpecs.digit2.color === 'red'
                            ? 'bg-rose-950/70 text-rose-500 border-rose-900/60'
                            : 'bg-slate-900 text-slate-100'
                        }`}
                      >
                        {d2}
                      </div>
                      {drillMode === 'set' && (
                        <div className="absolute right-1 inset-y-0 flex flex-col justify-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSingleDigit(2, 1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setSingleDigit(2, -1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Digit 3 (Bottom) */}
                    <div className="relative group">
                      <div
                        className={`h-12 rounded-md flex items-center justify-center font-mono text-3xl font-black shadow-inner border border-slate-800 relative overflow-hidden select-none ${
                          spec.digitSpecs.digit3.color === 'red'
                            ? 'bg-rose-950/80 text-rose-500 border-rose-900/60'
                            : 'bg-slate-900 text-slate-100'
                        }`}
                      >
                        <span>{d3}</span>
                        {/* Sub-graduation vernier ticks for P20 or P1000 */}
                        {spec.digitSpecs.digit3.hasTicks && (
                          <div className="absolute right-1.5 inset-y-0 flex flex-col justify-around py-1">
                            <span className="w-2 h-0.5 bg-rose-500/80" />
                            <span className="w-1.5 h-0.5 bg-rose-500/50" />
                            <span className="w-2 h-0.5 bg-rose-500/80" />
                          </div>
                        )}
                      </div>
                      {drillMode === 'set' && (
                        <div className="absolute right-1 inset-y-0 flex flex-col justify-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSingleDigit(3, 1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setSingleDigit(3, -1)}
                            className="p-0.5 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-indicator label */}
                <div className="text-center mt-1 text-[10px] text-slate-400 font-mono">
                  {selectedModel === 'P20'
                    ? '[10] - [1] - [0.1]'
                    : selectedModel === 'P200'
                    ? '[100] - [10] - [1]'
                    : '[1000] - [100] - [10]'}
                </div>
              </div>

              {/* Tip Ejector Button Indicator */}
              <div className="w-full mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Tip Ejector:</span>
                <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-200 text-[10px] font-bold">
                  Biohazard Safe
                </span>
              </div>
            </div>

            {/* Shaft & Tip Cone */}
            <div className="w-6 h-12 bg-gradient-to-b from-slate-700 to-slate-600 border-x border-slate-500" />
            <div className="w-4 h-8 bg-slate-500 border-x border-slate-400 rounded-b-md" />
            {/* Pipette Tip Preview */}
            <div
              className={`w-3 h-10 rounded-b-sm border shadow-sm ${spec.tipColor} mt-0.5 flex items-end justify-center pb-1`}
            >
              <div className="w-1 h-2 bg-blue-500/60 rounded-full" />
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-medium">{spec.tipType}</div>
          </div>
        </div>

        {/* Right Column: Interactive Drill & Setting Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Out of Range Error Warning Banner */}
          {isOutOfRange && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 text-rose-900 shadow-sm animate-pulse">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-rose-900">
                    Severe Mechanical Plunger Warning!
                  </h4>
                  <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                    You have dialed <strong>{currentVolume} µL</strong>, which is outside the calibrated operating range of the {selectedModel} ({spec.minVolume} – {spec.maxVolume} µL).
                  </p>
                  <p className="text-[11px] text-rose-700 mt-1 bg-white/70 p-2 rounded-lg border border-rose-200">
                    <strong>BACE Laboratory Rule:</strong> Forcing a micropipette beyond its upper or lower stop will strip the brass micrometer threading, distort the calibrated internal spring, and rupture the airtight piston seal. This causes permanent volumetric drift and invalidates ISO 8655 calibration.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Drill Mode: "Read the Dial" */}
          {drillMode === 'read' ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Volumeter Reading Drill
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    What volume is this {selectedModel} set to deliver?
                  </h3>
                </div>
                <button
                  onClick={() => initDrill(selectedModel, 'read')}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Random Dial</span>
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Inspect the 3-digit counter on the simulated pipette to your left. Note the color of each digit and enter the exact volume delivered in <strong>microliters (µL)</strong>.
              </p>

              {/* Form Input */}
              <form onSubmit={handleReadSubmit} className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step={selectedModel === 'P20' ? '0.1' : '1'}
                      value={userVolumeInput}
                      onChange={(e) => setUserVolumeInput(e.target.value)}
                      placeholder={selectedModel === 'P20' ? 'e.g., 14.8' : selectedModel === 'P200' ? 'e.g., 175' : 'e.g., 750'}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
                      autoFocus
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                      µL
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-2"
                  >
                    <span>Check Reading</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Evaluation Feedback */}
              {evaluation?.submitted && (
                <div
                  className={`rounded-2xl p-4 border transition-all ${
                    evaluation.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {evaluation.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{evaluation.message}</p>
                      {evaluation.details && (
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          {evaluation.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-black/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => initDrill(selectedModel, 'read')}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Next Problem →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Drill Mode: "Set the Volume" */
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    Volume Setting Challenge
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Target Volume: <span className="text-teal-600 font-mono text-xl">{targetVolume} µL</span>
                  </h3>
                </div>
                <button
                  onClick={() => initDrill(selectedModel, 'set')}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Target</span>
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Adjust the volume dials using the stepper buttons below or clicking the chevron arrows directly on the pipette volumeter wheels.
              </p>

              {/* Volume Adjustment Knobs */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Current Setting:</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {currentVolume} µL
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => adjustVolume(-spec.stepCoarse)}
                    className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    -{spec.stepCoarse} µL (Coarse)
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustVolume(-spec.stepFine)}
                    className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    -{spec.stepFine} µL (Fine)
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustVolume(spec.stepFine)}
                    className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    +{spec.stepFine} µL (Fine)
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustVolume(spec.stepCoarse)}
                    className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                  >
                    +{spec.stepCoarse} µL (Coarse)
                  </button>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSetSubmit}
                    className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm Volume Setting</span>
                  </button>
                </div>
              </div>

              {/* Evaluation Feedback */}
              {evaluation?.submitted && (
                <div
                  className={`rounded-2xl p-4 border transition-all ${
                    evaluation.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {evaluation.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{evaluation.message}</p>
                      {evaluation.details && (
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          {evaluation.details}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-black/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => initDrill(selectedModel, 'set')}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Next Target Volume →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wet-Lab BACE Protocol Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Pipette className="w-4 h-4 text-blue-600" />
              <span>BACE Wet-Lab Bench Discipline Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Aspiration (Upward)</span>
                Hold pipette vertically (90°). Immerse tip 1–2 mm (P20) or 2–4 mm (P200/P1000). Press to 1st stop before entering fluid, release smoothly over 1 second.
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Dispensing (Downward)</span>
                Hold tube at 45°. Place tip against sidewall. Depress to 1st stop, pause 1 second, then depress to 2nd stop (blowout) to expel residual droplet.
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Pre-Wetting Discipline</span>
                Pre-wetting the tip 2–3 times with sample fluid equilibrates humidity and temperature, reducing volumetric error by up to 50%.
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Tip Ejection & Storage</span>
                Always eject tips directly into biohazard or sharp waste. Store pipettes vertically on a carousel rack; never lay horizontally with liquid.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
