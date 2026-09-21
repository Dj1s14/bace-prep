import React, { useState, useMemo } from 'react';
import {
  Ruler,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Zap,
  Info,
  HelpCircle,
  Eye,
  Layers,
  Award,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LadderBand {
  bp: number;
  label: string;
  migrationMm: number; // in mm
  isRef?: boolean;
}

const LADDER_1KB: LadderBand[] = [
  { bp: 10000, label: '10.0 kb', migrationMm: 12.0 },
  { bp: 8000, label: '8.0 kb', migrationMm: 15.5 },
  { bp: 6000, label: '6.0 kb', migrationMm: 19.5 },
  { bp: 5000, label: '5.0 kb', migrationMm: 23.0 },
  { bp: 4000, label: '4.0 kb', migrationMm: 27.5 },
  { bp: 3000, label: '3.0 kb (Ref)', migrationMm: 33.0, isRef: true },
  { bp: 2000, label: '2.0 kb', migrationMm: 41.0 },
  { bp: 1500, label: '1.5 kb', migrationMm: 47.0 },
  { bp: 1000, label: '1.0 kb (Ref)', migrationMm: 55.5, isRef: true },
  { bp: 500, label: '0.5 kb', migrationMm: 68.0 },
];

export const GelBandSizingStation: React.FC = () => {
  const { recordBenchActivity, benchStats } = useApp?.() || {};

  // Transilluminator display modes
  const [transilluminatorMode, setTransilluminatorMode] = useState<'blue_light' | 'uv'>('blue_light');
  const [activeLaneTab, setActiveLaneTab] = useState<'sampleA' | 'sampleB' | 'plasmid'>('sampleA');

  // Digital Caliper position (mm from well)
  const [caliperMm, setCaliperMm] = useState<number>(44.0);
  const [activePin, setActivePin] = useState<string | null>('unknownA');

  // Unknown Samples definition
  const unknownA = {
    id: 'unknownA',
    name: 'Unknown A (PCR Amplicon)',
    actualBp: 1750,
    expectedMm: 44.0,
  };

  const unknownB = {
    id: 'unknownB',
    name: 'Unknown B (Digest Fragment)',
    actualBp: 3500,
    expectedMm: 30.0,
  };

  // Student calculation input
  const [studentEstimateBp, setStudentEstimateBp] = useState<string>('');
  const [sizingResult, setSizingResult] = useState<{
    evaluated: boolean;
    isCorrect: boolean;
    difference: number;
    feedback: string;
  } | null>(null);

  // Plasmid Conformation Challenge State
  const [plasmidAnswers, setPlasmidAnswers] = useState<{
    bandTop: string;
    bandMid: string;
    bandBot: string;
  }>({
    bandTop: '',
    bandMid: '',
    bandBot: '',
  });
  const [plasmidFeedback, setPlasmidFeedback] = useState<string | null>(null);

  // Caliper click handler on the gel image
  const handleGelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const gelHeight = rect.height;
    // Map gel height to 0 - 80 mm
    const calculatedMm = Math.max(0, Math.min(80, Math.round((clickY / gelHeight) * 80 * 10) / 10));
    setCaliperMm(calculatedMm);
  };

  const handleBandSnap = (mm: number, pinKey: string) => {
    setCaliperMm(mm);
    setActivePin(pinKey);
  };

  const handleVerifySizing = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!studentEstimateBp.trim()) return;

    const parsedBp = parseInt(studentEstimateBp.trim(), 10);
    if (isNaN(parsedBp)) return;

    const target = activeLaneTab === 'sampleA' ? unknownA.actualBp : unknownB.actualBp;
    const diff = Math.abs(parsedBp - target);
    const percentDiff = (diff / target) * 100;

    // Standard electrophoresis interpolation allows ±10% margin of error
    const isCorrect = percentDiff <= 12.0;

    setSizingResult({
      evaluated: true,
      isCorrect,
      difference: diff,
      feedback: isCorrect
        ? `Accurate interpolation! ${parsedBp.toLocaleString()} bp is within acceptable standard curve tolerance of the true ${target.toLocaleString()} bp size (Variance: ${percentDiff.toFixed(1)}%).`
        : `Estimate out of tolerance. Your estimate was ${parsedBp.toLocaleString()} bp, but semi-log ladder interpolation yields ${target.toLocaleString()} bp (Variance: ${percentDiff.toFixed(1)}%).`,
    });

    recordBenchActivity?.(
      'gel',
      isCorrect ? 1 : 0,
      1,
      `Agarose Gel Band Sizing: Evaluated ${activeLaneTab === 'sampleA' ? 'Unknown A' : 'Unknown B'} (${parsedBp} bp)`
    );
  };

  const handleVerifyPlasmid = () => {
    // Correct order:
    // bandTop (slowest, shortest migration) = nicked / open-circular
    // bandMid (intermediate) = linear
    // bandBot (fastest, furthest migration) = supercoiled
    const isCorrect =
      plasmidAnswers.bandTop === 'nicked' &&
      plasmidAnswers.bandMid === 'linear' &&
      plasmidAnswers.bandBot === 'supercoiled';

    if (isCorrect) {
      setPlasmidFeedback(
        'Outstanding! You correctly recognized that Supercoiled plasmid is tightly compacted and migrates fastest (furthest toward anode +). Linear plasmid has intermediate mobility, while Nicked Open-Circular has high steric friction and migrates slowest.'
      );
      recordBenchActivity?.(
        'gel',
        1,
        1,
        'Plasmid Conformations Challenge: Correctly mapped supercoiled, linear, and nicked forms'
      );
    } else {
      setPlasmidFeedback(
        'Review plasmid topology: Remember that pore friction slows floppy open-circular molecules the most (Top band = Nicked). Compact supercoiled coils snake through agarose pores easiest (Bottom band = Supercoiled).'
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
              Station 1.4 Molecular Diagnostics
            </span>
            <span className="text-xs text-slate-500 font-medium">BACE Domain 1 & 8</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Agarose Gel Band Sizing & Transilluminator Analysis
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
            Measure DNA fragment migration distance with a digital caliper, perform semi-log molecular weight interpolation, and identify topological plasmid DNA conformations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Sizings Checked</div>
            <div className="text-lg font-black text-indigo-700">
              {benchStats?.gelSizingsCompleted || 0}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Accuracy</div>
            <div className="text-lg font-black text-slate-800">
              {benchStats?.gelSizingAccuracy ?? 100}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: TRANSILLUMINATOR GEL SCREEN & DIGITAL CALIPER (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl text-white space-y-4">
            {/* Transilluminator Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    transilluminatorMode === 'blue_light' ? 'bg-cyan-400' : 'bg-fuchsia-400'
                  }`}
                />
                <span className="text-xs font-black tracking-widest text-slate-300 uppercase">
                  BIODOC-IT 400 TRANSILLUMINATOR
                </span>
              </div>

              {/* Light Switch Mode */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTransilluminatorMode('blue_light')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    transilluminatorMode === 'blue_light'
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Safe Blue (470 nm)
                </button>
                <button
                  onClick={() => setTransilluminatorMode('uv')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    transilluminatorMode === 'uv'
                      ? 'bg-fuchsia-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  UV Dark (302 nm)
                </button>
              </div>
            </div>

            {/* Digital Caliper Readout Bar */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between font-mono">
              <div className="flex items-center space-x-2 text-xs">
                <Ruler className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-400">Digital Caliper:</span>
                <span className="text-cyan-300 font-bold text-base">{caliperMm.toFixed(1)} mm</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">
                From Wells (0 mm) → Anode (+)
              </span>
            </div>

            {/* GEL TRANSILLUMINATOR STAGE */}
            <div
              onClick={handleGelClick}
              className={`relative w-full h-[380px] rounded-2xl p-4 border-2 transition-colors cursor-crosshair select-none overflow-hidden ${
                transilluminatorMode === 'blue_light'
                  ? 'bg-gradient-to-b from-[#02182b] via-[#042845] to-[#011424] border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  : 'bg-gradient-to-b from-[#18022b] via-[#280445] to-[#120120] border-fuchsia-500/40 shadow-[0_0_30px_rgba(217,70,239,0.15)]'
              }`}
            >
              {/* Gel Wells at Top */}
              <div className="flex justify-around items-center pt-2 pb-4 border-b border-white/10">
                {['1: Ladder', '2: Sample A', '3: Sample B', '4: Plasmid'].map((lane, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">
                      {lane}
                    </span>
                    <div className="w-9 h-2.5 bg-black/80 rounded-xs border border-white/20 shadow-inner" />
                  </div>
                ))}
              </div>

              {/* DNA Bands Visual Canvas */}
              <div className="relative w-full h-[300px] mt-2">
                {/* Millimeter Scale Tick Marks on Left */}
                <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between text-[8px] font-mono text-slate-500 border-r border-slate-700/50 pr-1">
                  <span>0mm</span>
                  <span>20mm</span>
                  <span>40mm</span>
                  <span>60mm</span>
                  <span>80mm</span>
                </div>

                {/* Caliper Horizontal Indicator Line */}
                <div
                  className="absolute left-6 right-0 border-t-2 border-cyan-400/90 z-20 pointer-events-none transition-all duration-100 flex items-center justify-end pr-2"
                  style={{ top: `${(caliperMm / 80) * 100}%` }}
                >
                  <span className="bg-cyan-500 text-slate-950 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {caliperMm.toFixed(1)} mm
                  </span>
                </div>

                {/* LANE 1: 1 KB DNA LADDER */}
                <div className="absolute left-[12%] w-[16%] top-0 bottom-0">
                  {LADDER_1KB.map((band, idx) => {
                    const topPct = (band.migrationMm / 80) * 100;
                    return (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBandSnap(band.migrationMm, `ladder_${band.bp}`);
                        }}
                        className={`absolute left-1 right-1 h-[3px] rounded-xs cursor-pointer hover:brightness-150 transition-all ${
                          band.isRef
                            ? transilluminatorMode === 'blue_light'
                              ? 'bg-cyan-200 shadow-[0_0_8px_rgba(165,243,252,0.9)] h-[4px]'
                              : 'bg-fuchsia-200 shadow-[0_0_8px_rgba(245,208,254,0.9)] h-[4px]'
                            : transilluminatorMode === 'blue_light'
                            ? 'bg-cyan-400/80 shadow-[0_0_4px_rgba(34,211,238,0.7)]'
                            : 'bg-fuchsia-400/80 shadow-[0_0_4px_rgba(232,121,249,0.7)]'
                        }`}
                        style={{ top: `${topPct}%` }}
                        title={`${band.label} (${band.bp} bp) - ${band.migrationMm} mm`}
                      />
                    );
                  })}
                </div>

                {/* LANE 2: SAMPLE A (Unknown PCR Amplicon ~1750 bp, 44.0 mm) */}
                <div className="absolute left-[36%] w-[16%] top-0 bottom-0">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBandSnap(unknownA.expectedMm, 'unknownA');
                      setActiveLaneTab('sampleA');
                    }}
                    className={`absolute left-1 right-1 h-[4px] rounded-xs cursor-pointer hover:scale-105 transition-all ${
                      transilluminatorMode === 'blue_light'
                        ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]'
                        : 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.9)]'
                    }`}
                    style={{ top: `${(unknownA.expectedMm / 80) * 100}%` }}
                    title="Unknown Amplicon A"
                  />
                </div>

                {/* LANE 3: SAMPLE B (Digest ~3500 bp, 30.0 mm) */}
                <div className="absolute left-[60%] w-[16%] top-0 bottom-0">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBandSnap(unknownB.expectedMm, 'unknownB');
                      setActiveLaneTab('sampleB');
                    }}
                    className={`absolute left-1 right-1 h-[4px] rounded-xs cursor-pointer hover:scale-105 transition-all ${
                      transilluminatorMode === 'blue_light'
                        ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]'
                        : 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.9)]'
                    }`}
                    style={{ top: `${(unknownB.expectedMm / 80) * 100}%` }}
                    title="Unknown Fragment B"
                  />
                </div>

                {/* LANE 4: PLASMID CONFORMATIONS (3 bands: Nicked, Linear, Supercoiled) */}
                <div className="absolute left-[83%] w-[15%] top-0 bottom-0">
                  {/* Top: Nicked open-circular (~24 mm, slowest) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBandSnap(24.0, 'plasmid_top');
                      setActiveLaneTab('plasmid');
                    }}
                    className="absolute left-1 right-1 h-[3px] bg-rose-400 rounded-xs shadow-[0_0_6px_rgba(251,113,133,0.8)] cursor-pointer"
                    style={{ top: `${(24.0 / 80) * 100}%` }}
                    title="Plasmid Band 1 (Slowest)"
                  />
                  {/* Mid: Linear cut (~36 mm) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBandSnap(36.0, 'plasmid_mid');
                      setActiveLaneTab('plasmid');
                    }}
                    className="absolute left-1 right-1 h-[3px] bg-amber-400 rounded-xs shadow-[0_0_6px_rgba(251,191,36,0.8)] cursor-pointer"
                    style={{ top: `${(36.0 / 80) * 100}%` }}
                    title="Plasmid Band 2 (Intermediate)"
                  />
                  {/* Bot: Supercoiled (~52 mm, fastest) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBandSnap(52.0, 'plasmid_bot');
                      setActiveLaneTab('plasmid');
                    }}
                    className="absolute left-1 right-1 h-[3px] bg-teal-400 rounded-xs shadow-[0_0_6px_rgba(45,212,191,0.8)] cursor-pointer"
                    style={{ top: `${(52.0 / 80) * 100}%` }}
                    title="Plasmid Band 3 (Fastest)"
                  />
                </div>
              </div>

              {/* Anode (+) Indicator at bottom */}
              <div className="absolute bottom-1 right-4 text-[10px] font-mono text-rose-400 font-bold flex items-center space-x-1">
                <span>(+) Red Anode (Run to Red)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              💡 Tip: Click anywhere along the gel or click directly on a band to snap the digital caliper tool.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: SEMI-LOG INTERPOLATION & PLASMID CHALLENGE (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Lane Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => {
                setActiveLaneTab('sampleA');
                setCaliperMm(unknownA.expectedMm);
                setSizingResult(null);
                setStudentEstimateBp('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLaneTab === 'sampleA'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Analyze Unknown A
            </button>
            <button
              onClick={() => {
                setActiveLaneTab('sampleB');
                setCaliperMm(unknownB.expectedMm);
                setSizingResult(null);
                setStudentEstimateBp('');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLaneTab === 'sampleB'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Analyze Unknown B
            </button>
            <button
              onClick={() => {
                setActiveLaneTab('plasmid');
                setCaliperMm(24.0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLaneTab === 'plasmid'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Plasmid Topology Challenge
            </button>
          </div>

          {/* TAB 1 & 2: SEMI-LOG BAND SIZING DRILL */}
          {activeLaneTab !== 'plasmid' ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Semi-Logarithmic Molecular Weight Interpolation
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Size Determination for {activeLaneTab === 'sampleA' ? unknownA.name : unknownB.name}
                </h3>
              </div>

              {/* Reference Ladder Migration Data Table */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">
                  1 kb Reference Ladder Standard Migration Scale:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {LADDER_1KB.slice(0, 8).map((b, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg border text-center ${
                        b.isRef
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-[10px] text-slate-500">{b.migrationMm} mm</div>
                      <div className="font-mono">{b.bp.toLocaleString()} bp</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Band Caliper Reading Callout */}
              <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-700">Measured Caliper Distance:</span>
                  <div className="text-xl font-black text-indigo-950 font-mono">
                    {caliperMm.toFixed(1)} mm
                  </div>
                </div>
                <div className="text-right text-xs text-indigo-800">
                  <span>Target: </span>
                  <span className="font-bold">
                    {activeLaneTab === 'sampleA' ? 'Sample A Amplicon' : 'Sample B Restriction Fragment'}
                  </span>
                </div>
              </div>

              {/* Student Entry Form */}
              <form onSubmit={handleVerifySizing} className="space-y-3">
                <label className="text-xs font-bold text-slate-800 block">
                  Estimate Unknown Band Size (in Base Pairs):
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={studentEstimateBp}
                      onChange={(e) => setStudentEstimateBp(e.target.value)}
                      placeholder="e.g. 1750"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      bp
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verify Size</span>
                  </button>
                </div>
              </form>

              {/* Sizing Verification Feedback */}
              {sizingResult?.evaluated && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
                    sizingResult.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold">
                    {sizingResult.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Electrophoresis Sizing Passed</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Interpolation Tolerance Exceeded</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">{sizingResult.feedback}</p>
                </div>
              )}
            </div>
          ) : (
            /* TAB 3: PLASMID CONFORMATION DIAGNOSTIC CHALLENGE */
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Molecular Topology Diagnostic
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Lane 4: Plasmid DNA Conformations
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The exact same 4,200 bp plasmid DNA sample was loaded undigested into Lane 4. Due to topological differences, it separates into 3 distinct bands. Identify which band corresponds to which conformation.
                </p>
              </div>

              {/* Band Identification Selectors */}
              <div className="space-y-3 bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-700">Top Band (24.0 mm, Slowest Migration)</span>
                    <span className="text-[10px] font-mono text-slate-500">Highest friction</span>
                  </div>
                  <select
                    value={plasmidAnswers.bandTop}
                    onChange={(e) =>
                      setPlasmidAnswers({ ...plasmidAnswers, bandTop: e.target.value })
                    }
                    className="w-full p-2 bg-white rounded-xl border border-purple-200 text-xs font-semibold text-slate-800"
                  >
                    <option value="">Select Conformation...</option>
                    <option value="supercoiled">Supercoiled (Covalently Closed Circular)</option>
                    <option value="linear">Linearized (Double-Strand Cut)</option>
                    <option value="nicked">Nicked Open-Circular (Relaxed Floppy Circle)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-700">Middle Band (36.0 mm, Intermediate)</span>
                    <span className="text-[10px] font-mono text-slate-500">True MW mobility</span>
                  </div>
                  <select
                    value={plasmidAnswers.bandMid}
                    onChange={(e) =>
                      setPlasmidAnswers({ ...plasmidAnswers, bandMid: e.target.value })
                    }
                    className="w-full p-2 bg-white rounded-xl border border-purple-200 text-xs font-semibold text-slate-800"
                  >
                    <option value="">Select Conformation...</option>
                    <option value="supercoiled">Supercoiled (Covalently Closed Circular)</option>
                    <option value="linear">Linearized (Double-Strand Cut)</option>
                    <option value="nicked">Nicked Open-Circular (Relaxed Floppy Circle)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-700">Bottom Band (52.0 mm, Fastest Migration)</span>
                    <span className="text-[10px] font-mono text-slate-500">Tightly wound</span>
                  </div>
                  <select
                    value={plasmidAnswers.bandBot}
                    onChange={(e) =>
                      setPlasmidAnswers({ ...plasmidAnswers, bandBot: e.target.value })
                    }
                    className="w-full p-2 bg-white rounded-xl border border-purple-200 text-xs font-semibold text-slate-800"
                  >
                    <option value="">Select Conformation...</option>
                    <option value="supercoiled">Supercoiled (Covalently Closed Circular)</option>
                    <option value="linear">Linearized (Double-Strand Cut)</option>
                    <option value="nicked">Nicked Open-Circular (Relaxed Floppy Circle)</option>
                  </select>
                </div>

                <button
                  onClick={handleVerifyPlasmid}
                  disabled={!plasmidAnswers.bandTop || !plasmidAnswers.bandMid || !plasmidAnswers.bandBot}
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs mt-2"
                >
                  Verify Topology Assignment
                </button>
              </div>

              {plasmidFeedback && (
                <div className="p-4 bg-white rounded-xl border border-purple-200 text-xs text-slate-800 leading-relaxed shadow-xs">
                  {plasmidFeedback}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
