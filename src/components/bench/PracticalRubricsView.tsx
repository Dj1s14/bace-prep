import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Award,
  AlertTriangle,
  Scale,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  Calculator,
  ChevronRight,
  ShieldAlert,
  Info,
  Layers,
  FlaskConical,
  Zap,
} from 'lucide-react';
import { PracticalRubricStation } from './types';
import { useApp } from '../../context/AppContext';

export const PRACTICAL_STATIONS: PracticalRubricStation[] = [
  {
    id: 'station_pipetting',
    stationNumber: 1,
    title: 'Station 1: Gravimetric Micropipetting Verification',
    timeLimitMinutes: 20,
    purpose:
      'Demonstrate precision liquid handling and metrological verification of a single-channel micropipette using an analytical 4-place balance and ISO 8655 standards.',
    requiredMaterials: [
      'P20, P200, or P1000 single-channel micropipette',
      'Matching certified pipet tips (filtered or standard)',
      'Analytical balance (readability 0.0001 g or 0.001 g) with draft shield',
      'Deionized / ASTM Type 1 water (equilibrated to room temperature)',
      'Weighing vessel with evaporation trap or microcentrifuge tube',
      'Calibrated thermometer for liquid temperature',
    ],
    safetyPPE: ['Nitrile examination gloves', 'Lab coat', 'Safety glasses'],
    criteria: [
      {
        id: 'pip_1',
        category: 'Preparation & Safety',
        title: 'Proper PPE & Workspace Disinfection',
        description: 'Candidate dons nitrile gloves, lab coat, and eye protection. Benchtop sanitized with 70% ethanol.',
        critical: true,
        baceStandard: 'BACE Standard 1.1: General Laboratory Safety & PPE',
      },
      {
        id: 'pip_2',
        category: 'Inspection & Setup',
        title: 'Volumeter Setting & Inspection',
        description:
          'Inspects pipette body and nose cone for cracks/contamination. Dials target volume without over-rotating stops.',
        critical: true,
        baceStandard: 'BACE Standard 1.2: Volumetric Measurement & Pipette Handling',
      },
      {
        id: 'pip_3',
        category: 'Tip Attachment',
        title: 'Aseptic Tip Seating (No Slamming)',
        description:
          'Mounts tip with firm downward vertical pressure and slight twist. Never jams or bangs the pipette down into the box.',
        critical: false,
        baceStandard: 'BACE Standard 1.2: Liquid Handling Technique',
      },
      {
        id: 'pip_4',
        category: 'Liquid Handling',
        title: 'Pre-Wetting the Tip',
        description:
          'Pre-wets tip 2–3 times with test water before taking gravimetric replicate measurements to equilibrate air cushion.',
        critical: false,
        baceStandard: 'ISO 8655-6 Gravimetric Calibration Standards',
      },
      {
        id: 'pip_5',
        category: 'Liquid Handling',
        title: 'Vertical Immersion Angle & Depth',
        description:
          'Maintains pipette strictly vertical (within 5° of 90°) during aspiration. Immerses tip 1–2 mm (P20) or 2–4 mm (P200/P1000).',
        critical: true,
        baceStandard: 'BACE Standard 1.2: Precision Volumetrics',
      },
      {
        id: 'pip_6',
        category: 'Dispensing & Metrology',
        title: '45° Dispensing & Complete Blowout',
        description:
          'Touches tip against inner sidewall at 45°. Depresses plunger smoothly to 1st stop, pauses 1 sec, then fully depresses to 2nd stop.',
        critical: true,
        baceStandard: 'BACE Standard 1.2: Analytical Liquid Transfer',
      },
      {
        id: 'pip_7',
        category: 'Balance Protocol',
        title: 'Closing Draft Shield & Tare Discipline',
        description:
          'Closes balance draft shield glass before recording every mass reading. Verifies stable zero tare before next aliquot.',
        critical: true,
        baceStandard: 'BACE Standard 1.3: Analytical Balances & Metrology',
      },
      {
        id: 'pip_8',
        category: 'Calculations & Data',
        title: 'Inaccuracy (E%) and Precision (%CV) Calculations',
        description:
          'Accurately calculates mean mass, mean volume, systematic error (inaccuracy E% ≤ ±1.5%), and random error (CV% ≤ 1.0%).',
        critical: true,
        baceStandard: 'BACE Standard 4.1: Statistical Analysis of Replicates',
      },
    ],
  },
  {
    id: 'station_streak_plate',
    stationNumber: 2,
    title: 'Station 2: Four-Quadrant Aseptic Bacterial Streak Plate',
    timeLimitMinutes: 15,
    purpose:
      'Isolate pure, well-separated single clonal colonies from a mixed or concentrated bacterial broth culture using sterile inoculation loop technique.',
    requiredMaterials: [
      'Luria-Bertani (LB) agar Petri plate',
      'Bacterial culture (e.g. E. coli or B. subtilis broth)',
      'Nichrome wire inoculation loop or sterile disposable loops',
      'Bunsen burner with striker or micro-incinerator',
      'Indelible laboratory marker',
      'Disinfectant (70% ethanol) and paper towels',
    ],
    safetyPPE: ['Nitrile gloves', 'Lab coat', 'Safety goggles', 'Hair tied back near open flame'],
    criteria: [
      {
        id: 'str_1',
        category: 'Labeling & Orientation',
        title: 'Agar-Side Peripheral Plate Labeling',
        description:
          'Labels the BOTTOM (agar-side) perimeter of the Petri dish with initials, date, organism, and period. Never labels the lid.',
        critical: true,
        baceStandard: 'BACE Standard 2.1: Aseptic Technique & Plate Labeling',
      },
      {
        id: 'str_2',
        category: 'Sterilization',
        title: 'Loop Sterilization & Complete Cooling',
        description:
          'Incinerates loop wire until glowing red hot from base to tip. Cools loop 15–20 sec without touching non-sterile surfaces.',
        critical: true,
        baceStandard: 'BACE Standard 2.2: Thermal Sterilization & Asepsis',
      },
      {
        id: 'str_3',
        category: 'Culture Inoculation',
        title: 'Aseptic Broth Tube Neck Flaming',
        description:
          'Holds culture tube cap with pinky finger. Flames glass tube lip before and after loop sampling without setting cap down.',
        critical: true,
        baceStandard: 'BACE Standard 2.2: Microbial Sampling',
      },
      {
        id: 'str_4',
        category: 'Quadrant 1 Streak',
        title: 'Dense Primary Zig-Zag Streak',
        description:
          'Streaks Quadrant 1 tightly across 1/4 of plate using clamshell lid technique to minimize airborne spore contamination.',
        critical: false,
        baceStandard: 'BACE Standard 2.3: Quadrant Isolation Protocol',
      },
      {
        id: 'str_5',
        category: 'Quadrant Dilution',
        title: 'Flaming Loop Between Every Quadrant',
        description:
          'Re-flames and cools loop before entering Quadrant 2. Crosses into Quadrant 1 exactly 2–3 times, then streaks into Q2.',
        critical: true,
        baceStandard: 'BACE Standard 2.3: Mechanical Dilution Across Agar',
      },
      {
        id: 'str_6',
        category: 'Quadrants 3 & 4',
        title: 'Sequential Passes without Touching Q1',
        description:
          'Streaks Quadrants 3 and 4 sequentially. Crucially ensures Quadrant 4 loose streak never touches the dense Quadrant 1.',
        critical: true,
        baceStandard: 'BACE Standard 2.3: Single Colony Separation',
      },
      {
        id: 'str_7',
        category: 'Incubation Discipline',
        title: 'Inverted Plate Storage (Agar-Side Up)',
        description:
          'Inverts plate (agar side facing up) before placing in 37°C incubator to prevent lid condensation droplets from flooding colonies.',
        critical: true,
        baceStandard: 'BACE Standard 2.4: Microbial Culturing & Incubation',
      },
    ],
  },
  {
    id: 'station_gel_electrophoresis',
    stationNumber: 3,
    title: 'Station 3: Agarose Gel Electrophoresis Loading & Running',
    timeLimitMinutes: 20,
    purpose:
      'Prepare, load, and resolve DNA restriction fragments or PCR amplicons in an agarose submarine gel without puncturing wells or spilling samples.',
    requiredMaterials: [
      'Submerged horizontal gel box with 1.0% agarose gel in 1X TAE buffer',
      'DNA ladder (molecular weight standard) and experimental DNA samples',
      '6X DNA loading dye (with glycerol and bromophenol blue/xylene cyanol)',
      'P20 micropipette and fine microloader tips',
      'Direct Current (DC) power supply with red/black lead cables',
      'Waste beaker for spent tips',
    ],
    safetyPPE: ['Nitrile gloves', 'Lab coat', 'UV/Blue-light shield glasses if viewing stain'],
    criteria: [
      {
        id: 'gel_1',
        category: 'Buffer Submersion',
        title: 'Running Buffer Submersion Depth',
        description:
          'Ensures gel is submerged under 1X TAE running buffer to a depth of 2–3 mm over the gel surface with no dimpling in wells.',
        critical: false,
        baceStandard: 'BACE Standard 3.1: Nucleic Acid Electrophoresis Setup',
      },
      {
        id: 'gel_2',
        category: 'Sample Preparation',
        title: 'Loading Dye Formulation (1X Final)',
        description:
          'Adds 6X loading dye to DNA samples to achieve 1X final concentration (ensures glycerol density pulls sample into well).',
        critical: true,
        baceStandard: 'BACE Standard 3.1: Reagent Formulation',
      },
      {
        id: 'gel_3',
        category: 'Loading Technique',
        title: 'Two-Handed Stabilization Technique',
        description:
          'Rests both elbows on the benchtop and uses non-dominant index finger to guide pipette shaft over the targeted well.',
        critical: false,
        baceStandard: 'BACE Standard 3.2: Micropipette Well Loading',
      },
      {
        id: 'gel_4',
        category: 'Loading Technique',
        title: 'Zero Well Puncture & Bubble Prevention',
        description:
          'Lowers tip into upper third of well without touching or piercing the delicate gel bottom. Expels air bubbles outside well.',
        critical: true,
        baceStandard: 'BACE Standard 3.2: Gel Integrity & Loading Precision',
      },
      {
        id: 'gel_5',
        category: 'Electrode Polarity',
        title: 'Electrode Polarity ("Run to the Red")',
        description:
          'Connects cathode (black / negative) at the well end and anode (red / positive) at the far end because DNA is negatively charged.',
        critical: true,
        baceStandard: 'BACE Standard 3.3: Electrical Polarity & Circuitry',
      },
      {
        id: 'gel_6',
        category: 'Operation & Verification',
        title: 'Voltage Setting & Electrolysis Confirmation',
        description:
          'Sets power supply to ~5–10 V/cm inter-electrode distance. Confirms platinum wire electrolysis bubbles (O2 at anode, H2 at cathode).',
        critical: true,
        baceStandard: 'BACE Standard 3.3: Power Supply Operation',
      },
    ],
  },
];

export const PracticalRubricsView: React.FC = () => {
  const { recordBenchActivity, currentStudent } = useApp?.() || {};

  const [activeStationId, setActiveStationId] = useState<string>('station_pipetting');
  const station = PRACTICAL_STATIONS.find((s) => s.id === activeStationId) || PRACTICAL_STATIONS[0];

  // Checklist state: record of stationId -> record of criterionId -> boolean
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({
    station_pipetting: {},
    station_streak_plate: {},
    station_gel_electrophoresis: {},
  });

  // Candidate sign-off
  const studentFullName = currentStudent?.profile?.first_name
    ? `${currentStudent.profile.first_name} ${currentStudent.profile.last_name}`
    : 'CTE Student';
  const [candidateName, setCandidateName] = useState<string>(studentFullName);
  const [evaluatorNotes, setEvaluatorNotes] = useState<string>('');
  const [signedOffStations, setSignedOffStations] = useState<Record<string, boolean>>({});

  // Gravimetric Replicate Calculator State (Station 1)
  const [pipetteTargetVol, setPipetteTargetVol] = useState<number>(100); // 100 µL for P200
  const [replicateMasses, setReplicateMasses] = useState<number[]>([
    0.0998, 0.1002, 0.0995, 0.1004, 0.0999,
  ]); // in grams

  const toggleCheckItem = (criterionId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [activeStationId]: {
        ...(prev[activeStationId] || {}),
        [criterionId]: !prev[activeStationId]?.[criterionId],
      },
    }));
  };

  const handleSelectAll = () => {
    const allChecked: Record<string, boolean> = {};
    station.criteria.forEach((c) => {
      allChecked[c.id] = true;
    });
    setCheckedItems((prev) => ({
      ...prev,
      [activeStationId]: allChecked,
    }));
  };

  const handleResetChecklist = () => {
    setCheckedItems((prev) => ({
      ...prev,
      [activeStationId]: {},
    }));
  };

  // Gravimetric Math Engine
  // Density of water at 20°C is ~0.9982 g/mL => Z-factor = 1.0029 µL/mg
  const zFactor = 1.0029; // µL / mg
  const volumesU = replicateMasses.map((m) => m * 1000 * zFactor);
  const n = volumesU.length;
  const meanVol = volumesU.reduce((a, b) => a + b, 0) / n;
  const inaccuracyPct = ((meanVol - pipetteTargetVol) / pipetteTargetVol) * 100;

  // Standard Deviation
  const variance = volumesU.reduce((sum, v) => sum + Math.pow(v - meanVol, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  const cvPct = (stdDev / meanVol) * 100;

  const isAccuracyPass = Math.abs(inaccuracyPct) <= 1.5;
  const isPrecisionPass = cvPct <= 1.0;
  const isGravimetricPass = isAccuracyPass && isPrecisionPass;

  // Checklist counts
  const currentStationChecks = checkedItems[activeStationId] || {};
  const checkedCount = Object.values(currentStationChecks).filter(Boolean).length;
  const totalCount = station.criteria.length;
  const allCompleted = checkedCount === totalCount;

  // Sign-off station
  const handleSignOff = () => {
    setSignedOffStations((prev) => ({ ...prev, [activeStationId]: true }));
    recordBenchActivity?.(
      'rubric',
      checkedCount,
      totalCount,
      `Signed off ${station.title}: ${checkedCount}/${totalCount} criteria validated`,
      activeStationId
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
              BACE Practical Stations
            </span>
            <span className="text-xs text-slate-500 font-medium">Wet-Lab Performance Rubrics</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Practical Skills Rubrics & Lab Station Audits</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Evaluate your hands-on laboratory mastery against official BACE proctor rubrics. Perform gravimetric calibration calculations and verify critical execution steps.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSelectAll}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Check All
          </button>
          <button
            onClick={handleResetChecklist}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Station Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRACTICAL_STATIONS.map((st) => {
          const active = activeStationId === st.id;
          const isSigned = signedOffStations[st.id];
          const stChecks = checkedItems[st.id] || {};
          const count = Object.values(stChecks).filter(Boolean).length;

          return (
            <button
              key={st.id}
              onClick={() => setActiveStationId(st.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                active
                  ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                  Station {st.stationNumber} ({st.timeLimitMinutes} min)
                </span>
                {isSigned ? (
                  <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Signed Off</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {count}/{st.criteria.length}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{st.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{st.purpose}</p>
            </button>
          );
        })}
      </div>

      {/* Station Overview & Required Materials Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">{station.title}</h3>
            <p className="text-xs text-slate-600 mt-0.5">{station.purpose}</p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
              Time Allowed: <strong>{station.timeLimitMinutes} mins</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Required Materials & Apparatus</span>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              {station.requiredMaterials.map((mat, i) => (
                <li key={i}>• {mat}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Mandatory PPE & Safety</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {station.safetyPPE.map((ppe, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white border border-slate-300 rounded text-[11px] font-medium text-slate-700"
                >
                  {ppe}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-rose-700 mt-2 font-medium">
              Note: Failure to wear mandatory PPE at any point incurs an immediate safety penalty under BACE testing regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool Specific to Station 1: Gravimetric Calibration Calculator */}
      {station.id === 'station_pipetting' && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center space-x-1.5">
                <Scale className="w-4 h-4" />
                <span>Station 1 Metrology Tool: 5-Replicate Balance Analysis</span>
              </span>
              <h4 className="text-sm text-slate-300 mt-0.5">
                Enter 5 consecutive gravimetric water dispense weighings (grams) to verify calibration tolerance.
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Target Volume:</span>
              <select
                value={pipetteTargetVol}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setPipetteTargetVol(val);
                  // generate realistic masses close to nominal
                  const g = val / 1000;
                  setReplicateMasses([
                    Math.round((g + (Math.random() - 0.5) * 0.0006) * 10000) / 10000,
                    Math.round((g + (Math.random() - 0.5) * 0.0006) * 10000) / 10000,
                    Math.round((g + (Math.random() - 0.5) * 0.0006) * 10000) / 10000,
                    Math.round((g + (Math.random() - 0.5) * 0.0006) * 10000) / 10000,
                    Math.round((g + (Math.random() - 0.5) * 0.0006) * 10000) / 10000,
                  ]);
                }}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer"
              >
                <option value={10}>P20: 10 µL (0.010 g)</option>
                <option value={20}>P20: 20 µL (0.020 g)</option>
                <option value={100}>P200: 100 µL (0.100 g)</option>
                <option value={200}>P200: 200 µL (0.200 g)</option>
                <option value={1000}>P1000: 1000 µL (1.000 g)</option>
              </select>
            </div>
          </div>

          {/* Mass Input Replicates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {replicateMasses.map((mass, idx) => (
              <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Run #{idx + 1} Mass (g)
                </span>
                <input
                  type="number"
                  step="0.0001"
                  value={mass}
                  onChange={(e) => {
                    const parsed = parseFloat(e.target.value) || 0;
                    const next = [...replicateMasses];
                    next[idx] = parsed;
                    setReplicateMasses(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white mt-1 focus:ring-1 focus:ring-teal-400"
                />
                <span className="text-[10px] text-teal-300 font-mono mt-1 block">
                  = {(mass * 1000 * zFactor).toFixed(2)} µL
                </span>
              </div>
            ))}
          </div>

          {/* Computed ISO 8655 Metrology Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Mean Volume (V̄)</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                {meanVol.toFixed(2)} µL
              </span>
              <span className="text-[10px] text-slate-500">Z-factor adjusted</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Inaccuracy (E%)</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-lg font-bold font-mono text-white">
                  {inaccuracyPct > 0 ? `+${inaccuracyPct.toFixed(2)}%` : `${inaccuracyPct.toFixed(2)}%`}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isAccuracyPass ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {isAccuracyPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Tolerance: ≤ ±1.5%</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Standard Dev (s)</span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                {stdDev.toFixed(3)} µL
              </span>
              <span className="text-[10px] text-slate-500">Random error spread</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Precision (%CV)</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-lg font-bold font-mono text-white">{cvPct.toFixed(2)}%</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isPrecisionPass ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {isPrecisionPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Tolerance: ≤ 1.0% CV</span>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Rubric Items */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">BACE Competency Criteria Evaluation</h3>
            <p className="text-xs text-slate-500">
              Check each performance item verified during the station dry-run.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700">
            Validated: {checkedCount} / {totalCount}
          </span>
        </div>

        <div className="space-y-3">
          {station.criteria.map((c) => {
            const isChecked = Boolean(currentStationChecks[c.id]);

            return (
              <div
                key={c.id}
                onClick={() => toggleCheckItem(c.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                  isChecked
                    ? 'bg-teal-50/60 border-teal-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <button
                  type="button"
                  className={`mt-0.5 p-0.5 rounded transition-colors ${
                    isChecked ? 'text-teal-600' : 'text-slate-400'
                  }`}
                >
                  {isChecked ? <CheckSquare className="w-5 h-5 fill-teal-50" /> : <Square className="w-5 h-5" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-bold ${
                        isChecked ? 'text-teal-950 line-through decoration-teal-600/40' : 'text-slate-900'
                      }`}
                    >
                      {c.title}
                    </span>
                    {c.critical && (
                      <span className="px-2 py-0.2 rounded text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                        Critical Point
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                  <span className="text-[10px] font-mono text-slate-400 block pt-0.5">
                    {c.baceStandard}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Candidate & Proctor Sign-Off Drawer */}
        <div className="pt-5 border-t border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Candidate Verification Sign-Off</span>
              <span className="text-[11px] text-slate-500">
                Signing certifies all procedural steps and safety criteria were executed to standard.
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Candidate Signature Name"
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleSignOff}
                disabled={checkedCount === 0}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5 shrink-0"
              >
                <FileCheck className="w-4 h-4" />
                <span>Sign & Save Sign-Off</span>
              </button>
            </div>
          </div>

          {signedOffStations[activeStationId] && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Station {station.stationNumber} Certified:</strong> Sign-off recorded for{' '}
                <strong>{candidateName}</strong> ({checkedCount}/{totalCount} criteria validated). Progress logged to BACE Candidate Portfolio.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
