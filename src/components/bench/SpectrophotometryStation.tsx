import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info,
  Check,
  XCircle,
  HelpCircle,
  Sliders,
  Scale,
  Award,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StandardPoint {
  conc: number; // in µg/mL
  abs: number;
}

export const SpectrophotometryStation: React.FC = () => {
  const { recordBenchActivity, benchStats } = useApp?.() || {};

  // Spectrophotometer State
  const [wavelength, setWavelength] = useState<number>(595);
  const [mode, setMode] = useState<'absorbance' | 'transmittance'>('absorbance');
  const [cuvetteMaterial, setCuvetteMaterial] = useState<'plastic' | 'quartz'>('plastic');
  const [cuvetteOrientation, setCuvetteOrientation] = useState<'correct' | 'frosted'>('correct');
  const [isLidClosed, setIsLidClosed] = useState<boolean>(true);
  const [isZeroed, setIsZeroed] = useState<boolean>(false);
  const [sampleInWell, setSampleInWell] = useState<'blank' | 'unknown' | number | null>('blank'); // number is standard index 0..4

  // Standard Curve Dataset Generation
  const [curveSeed, setCurveSeed] = useState<number>(() => Math.floor(Math.random() * 1000));

  const standardCurve = useMemo(() => {
    // Generate realistic linear regression with slight experimental variation
    // Standards: 0, 125, 250, 500, 1000 µg/mL
    const slopeBase = 0.00115 + (curveSeed % 30) * 0.00001; // ~0.00115 to 0.00145
    const interceptBase = 0.015 + ((curveSeed * 3) % 20) * 0.001; // ~0.015 to 0.035
    const concs = [0, 125, 250, 500, 1000];

    const points: StandardPoint[] = concs.map((conc, idx) => {
      if (conc === 0) return { conc: 0, abs: 0.0 };
      const noise = (((curveSeed + idx * 17) % 11) - 5) * 0.002;
      const rawAbs = slopeBase * conc + interceptBase + noise;
      return { conc, abs: Math.max(0.005, Math.round(rawAbs * 1000) / 1000) };
    });

    // Compute actual linear regression: y = mx + b
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    points.forEach((p) => {
      sumX += p.conc;
      sumY += p.abs;
      sumXY += p.conc * p.abs;
      sumX2 += p.conc * p.conc;
      sumY2 += p.abs * p.abs;
    });

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    // R^2
    const numR = n * sumXY - sumX * sumY;
    const denR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r2 = Math.min(0.999, Math.round(Math.pow(numR / Math.max(0.0001, denR), 2) * 1000) / 1000);

    // Target unknown protein concentration
    const targetConc = Math.round((200 + ((curveSeed * 7) % 550)) * 10) / 10; // e.g. 200 - 750 µg/mL
    const unknownAbs = Math.round((m * targetConc + b) * 1000) / 1000;

    return {
      points,
      m: Math.round(m * 100000) / 100000,
      b: Math.round(b * 10000) / 10000,
      r2,
      targetConc,
      unknownAbs,
    };
  }, [curveSeed]);

  // Student calculation input
  const [studentInput, setStudentInput] = useState<string>('');
  const [evaluation, setEvaluation] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    difference: number;
    feedback: string;
  } | null>(null);

  // Compute live readout based on well content & optical state
  const liveReading = useMemo(() => {
    if (!isLidClosed) {
      return { val: 0.0, display: 'ERR: AMBIENT LIGHT', isError: true };
    }
    if (cuvetteOrientation === 'frosted') {
      return { val: 3.5, display: '> 3.000 (SCATTER)', isError: true };
    }
    if ((wavelength === 260 || wavelength === 280) && cuvetteMaterial === 'plastic') {
      return { val: 2.85, display: '> 2.500 (UV ABSORB)', isError: true };
    }
    if (!isZeroed && sampleInWell !== 'blank') {
      return { val: 0.88, display: 'UNZEROED DRIFT', isError: true };
    }

    if (sampleInWell === null) {
      return { val: 0.0, display: 'EMPTY WELL', isError: false };
    }
    if (sampleInWell === 'blank') {
      return { val: 0.0, display: mode === 'absorbance' ? '0.000 A' : '100.0 %T', isError: false };
    }
    if (sampleInWell === 'unknown') {
      const a = standardCurve.unknownAbs;
      const t = Math.round(Math.pow(10, -a) * 1000) / 10;
      return {
        val: a,
        display: mode === 'absorbance' ? `${a.toFixed(3)} A` : `${t.toFixed(1)} %T`,
        isError: false,
      };
    }
    if (typeof sampleInWell === 'number') {
      const a = standardCurve.points[sampleInWell]?.abs ?? 0;
      const t = Math.round(Math.pow(10, -a) * 1000) / 10;
      return {
        val: a,
        display: mode === 'absorbance' ? `${a.toFixed(3)} A` : `${t.toFixed(1)} %T`,
        isError: false,
      };
    }
    return { val: 0.0, display: '0.000 A', isError: false };
  }, [
    isLidClosed,
    cuvetteOrientation,
    cuvetteMaterial,
    wavelength,
    isZeroed,
    sampleInWell,
    mode,
    standardCurve,
  ]);

  const handleZeroInstrument = () => {
    if (sampleInWell !== 'blank') {
      alert('To zero the instrument, please place a Blank cuvette (dH₂O or buffer) in the chamber first!');
      return;
    }
    if (cuvetteOrientation === 'frosted') {
      alert('Cannot zero: Cuvette frosted face is blocking the optical path!');
      return;
    }
    setIsZeroed(true);
  };

  const handleCheckCalculation = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!studentInput.trim()) return;

    const parsed = parseFloat(studentInput.trim());
    if (isNaN(parsed)) return;

    const target = standardCurve.targetConc;
    // Expected x = (unknownAbs - b) / m
    const calculated = (standardCurve.unknownAbs - standardCurve.b) / standardCurve.m;
    const diff = Math.abs(parsed - calculated);
    const percentError = (diff / calculated) * 100;

    // Tolerance of ±5% or ±5 µg/mL
    const isCorrect = percentError <= 5.0 || diff <= 8.0;

    setEvaluation({
      submitted: true,
      isCorrect,
      difference: Math.round(diff * 10) / 10,
      feedback: isCorrect
        ? `Accurate calculation! ${parsed} µg/mL aligns with the regression standard curve (Expected: ${calculated.toFixed(1)} µg/mL, ~${percentError.toFixed(1)}% variance).`
        : `Calculation out of tolerance. Your value was ${parsed} µg/mL, but standard curve regression gives ${calculated.toFixed(1)} µg/mL (y=${standardCurve.unknownAbs} A, m=${standardCurve.m}, b=${standardCurve.b}).`,
    });

    recordBenchActivity?.(
      'spectro',
      isCorrect ? 1 : 0,
      1,
      `Bradford Standard Curve: Solved unknown protein conc (${parsed} µg/mL)`
    );
  };

  const handleRegenerate = () => {
    setCurveSeed(Math.floor(Math.random() * 10000));
    setStudentInput('');
    setEvaluation(null);
    setSampleInWell('unknown');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
              Station 1.3 Metrology
            </span>
            <span className="text-xs text-slate-500 font-medium">BACE Domain 7 & 8</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Spectrophotometry & Bradford Standard Curve Simulator
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
            Operate an authentic UV-Vis spectrophotometer, configure wavelengths, align optical cuvette paths, perform blanking, and quantify unknown protein samples using linear regression.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Runs Verified</div>
            <div className="text-lg font-black text-teal-700">
              {benchStats?.spectroRunsCompleted || 0}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
            <div className="text-lg font-black text-slate-800">
              {benchStats?.spectroAccuracy ?? 100}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: THE SPECTROPHOTOMETER INSTRUMENT (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl text-white space-y-5">
            {/* Instrument Brand Plate */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                  SPECTRA-BIO 2000 UV-VIS
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-bold">
                BEAM: 10 mm
              </span>
            </div>

            {/* DIGITAL LCD DISPLAY PANEL */}
            <div className="bg-slate-950 p-5 rounded-2xl border-2 border-teal-500/30 shadow-inner space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <span className="text-teal-400 font-bold">λ:</span>
                  <span className="text-white font-black text-sm">{wavelength} nm</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-teal-300 uppercase">
                  {mode}
                </span>
              </div>

              {/* Main Readout Digits */}
              <div className="py-2 text-center">
                <div
                  className={`text-3xl sm:text-4xl font-black tracking-wider transition-colors ${
                    liveReading.isError
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {liveReading.display}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  {isZeroed ? '✓ Calibrated Baseline Zero' : '⚠ Instrument Unblanked (Drift Active)'}
                </div>
              </div>

              {/* Status LEDs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[10px] text-center">
                <div className={`p-1 rounded ${isZeroed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-500'}`}>
                  ZERO READY
                </div>
                <div className={`p-1 rounded ${isLidClosed ? 'bg-teal-950 text-teal-300 border border-teal-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                  {isLidClosed ? 'LID SHIELDED' : 'LID OPEN'}
                </div>
                <div className={`p-1 rounded ${cuvetteOrientation === 'correct' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {cuvetteOrientation === 'correct' ? 'OPTICAL PASS' : 'FROSTED FACE'}
                </div>
              </div>
            </div>

            {/* WAVELENGTH PRESETS SELECTOR */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Wavelength Presets (BACE Protocols)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { nm: 595, label: '595 nm (Bradford)', desc: 'Coomassie Blue' },
                  { nm: 260, label: '260 nm (DNA/RNA)', desc: 'Nucleic Acids (UV)' },
                  { nm: 280, label: '280 nm (Protein)', desc: 'Aromatic Tyr/Trp' },
                  { nm: 600, label: '600 nm (OD600)', desc: 'Bacterial Density' },
                ].map((preset) => (
                  <button
                    key={preset.nm}
                    onClick={() => {
                      setWavelength(preset.nm);
                      setIsZeroed(false); // Changing wavelength requires re-blanking!
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      wavelength === preset.nm
                        ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{preset.label}</div>
                    <div className="text-[10px] text-slate-300">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CUVETTE CHAMBER & CONTROLS */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Cuvette Optical Chamber</span>
                <button
                  onClick={() => setIsLidClosed(!isLidClosed)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isLidClosed ? 'bg-teal-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {isLidClosed ? 'Lid: Closed (Protected)' : 'Lid: Open (Exposed)'}
                </button>
              </div>

              {/* Sample Slot Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Select Sample in Well:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => setSampleInWell('blank')}
                    className={`p-2 rounded-lg font-bold border transition-all cursor-pointer ${
                      sampleInWell === 'blank'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Blank (dH₂O)
                  </button>
                  <button
                    onClick={() => setSampleInWell('unknown')}
                    className={`p-2 rounded-lg font-bold border transition-all cursor-pointer ${
                      sampleInWell === 'unknown'
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Unknown #4
                  </button>
                  <button
                    onClick={() => setSampleInWell(sampleInWell === 3 ? 1 : 3)}
                    className={`p-2 rounded-lg font-bold border transition-all cursor-pointer ${
                      typeof sampleInWell === 'number'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Std #3 (500 µg)
                  </button>
                </div>
              </div>

              {/* Optical Face Alignment & Material */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">
                    Cuvette Face Orientation:
                  </label>
                  <button
                    onClick={() =>
                      setCuvetteOrientation(cuvetteOrientation === 'correct' ? 'frosted' : 'correct')
                    }
                    className={`w-full p-2 rounded-lg font-bold border text-center transition-all cursor-pointer ${
                      cuvetteOrientation === 'correct'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-rose-950 text-rose-300 border-rose-700'
                    }`}
                  >
                    {cuvetteOrientation === 'correct' ? 'Clear Face (0°)' : 'Frosted Face (90°)'}
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1">
                    Cuvette Material:
                  </label>
                  <button
                    onClick={() =>
                      setCuvetteMaterial(cuvetteMaterial === 'plastic' ? 'quartz' : 'plastic')
                    }
                    className="w-full p-2 rounded-lg font-bold bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-700 cursor-pointer text-center"
                  >
                    {cuvetteMaterial === 'plastic' ? 'Plastic (Vis Only)' : 'Quartz (UV Pass)'}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Blank / Zero */}
              <div className="pt-2 flex items-center space-x-2">
                <button
                  onClick={handleZeroInstrument}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Scale className="w-4 h-4" />
                  <span>Zero / Blank Instrument (0.000 A)</span>
                </button>
                <button
                  onClick={() => setMode(mode === 'absorbance' ? 'transmittance' : 'absorbance')}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
                  title="Toggle A vs %T"
                >
                  Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRADFORD STANDARD CURVE & QUANTIFICATION DRILL (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Beer-Lambert Linear Regression
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Bradford Assay: BSA Standard Curve
                </h3>
              </div>

              <button
                onClick={handleRegenerate}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center space-x-1.5 transition-colors cursor-pointer self-start sm:self-center"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Unknown Sample</span>
              </button>
            </div>

            {/* Standard Curve Interactive Scatter Plot (SVG) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Standard Calibration Plot (A₅₉₅ vs µg/mL)</span>
                <div className="flex items-center space-x-3 font-mono text-[11px]">
                  <span className="text-teal-700 font-bold">
                    y = {standardCurve.m}x + {standardCurve.b}
                  </span>
                  <span className="text-slate-500">R² = {standardCurve.r2}</span>
                </div>
              </div>

              {/* Chart Stage */}
              <div className="relative w-full h-48 bg-white rounded-xl border border-slate-200 p-2 overflow-hidden flex items-end">
                {/* SVG Graph */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
                  {/* Grid Lines */}
                  {[0, 40, 80, 120].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                  ))}
                  {[125, 250, 375, 480].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="140"
                      stroke="#e2e8f0"
                      strokeDasharray="3 3"
                    />
                  ))}

                  {/* Axes */}
                  <line x1="40" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="1.5" />
                  <line x1="40" y1="10" x2="40" y2="140" stroke="#475569" strokeWidth="1.5" />

                  {/* Trendline: from (0, b) to (1000, 1000*m + b) */}
                  {(() => {
                    const x1 = 40;
                    const y1 = 140 - ((standardCurve.b) / 1.4) * 125;
                    const x2 = 470;
                    const y2 = 140 - ((1000 * standardCurve.m + standardCurve.b) / 1.4) * 125;
                    return (
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#0d9488"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Standard Curve Points */}
                  {standardCurve.points.map((pt, idx) => {
                    const cx = 40 + (pt.conc / 1000) * 430;
                    const cy = 140 - (pt.abs / 1.4) * 125;
                    return (
                      <g key={idx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="5"
                          className="fill-teal-600 stroke-white stroke-2"
                        />
                        <text
                          x={cx}
                          y={cy - 8}
                          fontSize="9"
                          textAnchor="middle"
                          fill="#0f766e"
                          fontWeight="bold"
                        >
                          {pt.abs}
                        </text>
                      </g>
                    );
                  })}

                  {/* Unknown Sample Point on Curve */}
                  {(() => {
                    const cx = 40 + (standardCurve.targetConc / 1000) * 430;
                    const cy = 140 - (standardCurve.unknownAbs / 1.4) * 125;
                    return (
                      <g>
                        <line
                          x1="40"
                          y1={cy}
                          x2={cx}
                          y2={cy}
                          stroke="#9333ea"
                          strokeDasharray="2 2"
                        />
                        <line
                          x1={cx}
                          y1={cy}
                          x2={cx}
                          y2="140"
                          stroke="#9333ea"
                          strokeDasharray="2 2"
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r="6"
                          className="fill-purple-600 stroke-white stroke-2"
                        />
                        <text
                          x={cx + 10}
                          y={cy + 4}
                          fontSize="10"
                          fill="#7e22ce"
                          fontWeight="black"
                        >
                          Unknown (A={standardCurve.unknownAbs})
                        </text>
                      </g>
                    );
                  })()}

                  {/* Axis Labels */}
                  <text x="250" y="155" fontSize="10" textAnchor="middle" fill="#64748b">
                    BSA Protein Concentration (µg/mL)
                  </text>
                  <text
                    x="-75"
                    y="18"
                    fontSize="10"
                    textAnchor="middle"
                    fill="#64748b"
                    transform="rotate(-90)"
                  >
                    A₅₉₅
                  </text>
                </svg>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {standardCurve.points.map((pt, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">Std #{i + 1}</span>
                    <strong className="text-slate-800 text-[11px] block">{pt.conc} µg/mL</strong>
                    <span className="text-teal-700 font-mono text-[11px]">{pt.abs} A</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UNKNOWN CALCULATION DRILL CARD */}
            <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
                    Candidate Calculation Challenge
                  </span>
                  <h4 className="text-sm font-black text-purple-950">
                    Determine Unknown Cell Lysate Concentration
                  </h4>
                </div>
                <div className="bg-purple-100 text-purple-900 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                  Unknown A₅₉₅ = {standardCurve.unknownAbs}
                </div>
              </div>

              <p className="text-xs text-purple-900 leading-relaxed">
                Using the standard curve regression equation{' '}
                <span className="font-mono font-bold bg-white/70 px-1.5 py-0.5 rounded border border-purple-200">
                  y = {standardCurve.m}x + {standardCurve.b}
                </span>
                , rearrange to solve for protein concentration <span className="font-bold">x</span> in µg/mL.
              </p>

              <form onSubmit={handleCheckCalculation} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    step="any"
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="Enter concentration (e.g. 420.5)"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-300 bg-white text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    µg/mL
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-600 text-white flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verify Answer</span>
                </button>
              </form>

              {/* Step-by-Step Evaluation Feedback */}
              {evaluation?.submitted && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                    evaluation.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold">
                    {evaluation.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Pass: Calculation Confirmed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Needs Correction</span>
                      </>
                    )}
                  </div>

                  <p className="leading-relaxed">{evaluation.feedback}</p>

                  <div className="bg-white/80 p-3 rounded-lg border border-slate-200 font-mono text-[11px] space-y-1">
                    <strong className="text-slate-800 block">Dimensional Analysis Solution:</strong>
                    <div>1. y = mx + b → x = (y - b) ÷ m</div>
                    <div>
                      2. x = ({standardCurve.unknownAbs} - {standardCurve.b}) ÷ {standardCurve.m}
                    </div>
                    <div>
                      3. x = {(standardCurve.unknownAbs - standardCurve.b).toFixed(4)} ÷ {standardCurve.m} ={' '}
                      <strong>
                        {((standardCurve.unknownAbs - standardCurve.b) / standardCurve.m).toFixed(1)} µg/mL
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
