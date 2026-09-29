import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Microscope, Gauge, Flame, ShieldCheck, TestTubes, Grid3X3 } from 'lucide-react';

type Option = { text: string; correct: boolean; feedback: string };
type Scenario = {
  title: string;
  prompt: string;
  options: Option[];
  takeaway: string;
};

type Station = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  scenarios: Scenario[];
};

const STATIONS: Station[] = [
  {
    id: 'microscopy',
    title: 'Microscopy',
    subtitle: 'Focus sequence, magnification, resolution, and oil immersion',
    icon: Microscope,
    scenarios: [
      {
        title: 'Locate the specimen safely',
        prompt: 'A stained slide is placed on a compound microscope. What is the best first focusing approach?',
        options: [
          { text: 'Start with the low-power objective, center the specimen, then increase magnification', correct: true, feedback: 'Correct. Low power provides a wider field and reduces the chance of objective-slide contact.' },
          { text: 'Start at 100× oil and use coarse focus aggressively', correct: false, feedback: 'High power is not the safest starting point; coarse focus can damage the slide or objective.' },
          { text: 'Add immersion oil to every objective before viewing', correct: false, feedback: 'Oil is used only with compatible oil-immersion objectives.' },
        ],
        takeaway: 'Low power first; center and focus before increasing magnification.',
      },
      {
        title: 'Interpret image quality',
        prompt: 'Changing to a stronger objective makes cells larger but does not reveal additional detail. Which property is limiting?',
        options: [
          { text: 'Resolution', correct: true, feedback: 'Correct. Resolution determines whether close structures can be distinguished.' },
          { text: 'Magnification', correct: false, feedback: 'Magnification has already increased; the missing detail is a resolution issue.' },
          { text: 'Stage color', correct: false, feedback: 'Stage color does not determine optical detail.' },
        ],
        takeaway: 'Magnification enlarges; resolution separates detail.',
      },
    ],
  },
  {
    id: 'ph',
    title: 'pH Meter',
    subtitle: 'Calibration, rinsing, storage, and troubleshooting',
    icon: Gauge,
    scenarios: [
      {
        title: 'Calibrate before measurement',
        prompt: 'Before measuring samples expected near neutral pH, which calibration approach is most appropriate?',
        options: [
          { text: 'Use fresh standard buffers that bracket the expected sample pH, beginning with pH 7 as directed by the instrument SOP', correct: true, feedback: 'Correct. Calibration uses certified buffers and should cover the measurement range.' },
          { text: 'Calibrate with distilled water only', correct: false, feedback: 'Distilled water is not a stable calibration standard.' },
          { text: 'Skip calibration if the meter was used yesterday', correct: false, feedback: 'Calibration frequency follows the SOP and should not be assumed from recent use alone.' },
        ],
        takeaway: 'Use certified buffers and follow the approved calibration sequence.',
      },
      {
        title: 'Protect the electrode',
        prompt: 'What should usually be done between different buffer or sample measurements?',
        options: [
          { text: 'Rinse the electrode with appropriate water and gently blot without rubbing', correct: true, feedback: 'Correct. This reduces carryover and protects the sensing surface.' },
          { text: 'Wipe the bulb vigorously with a dry paper towel', correct: false, feedback: 'Rubbing can create static and damage or contaminate the electrode.' },
          { text: 'Store the electrode dry on the bench between readings', correct: false, feedback: 'Many glass electrodes require approved storage solution; follow the manufacturer/SOP.' },
        ],
        takeaway: 'Rinse between samples and protect the hydrated sensing surface.',
      },
    ],
  },
  {
    id: 'autoclave',
    title: 'Autoclave',
    subtitle: 'Loading, cycle selection, indicators, and validation',
    icon: Flame,
    scenarios: [
      {
        title: 'Prepare a safe load',
        prompt: 'Which load setup best supports effective steam sterilization?',
        options: [
          { text: 'Loosen compatible caps as required, avoid overpacking, and allow steam circulation around items', correct: true, feedback: 'Correct. Steam must contact the load; sealed or tightly packed items can prevent sterilization and create pressure hazards.' },
          { text: 'Seal every container tightly before the cycle', correct: false, feedback: 'Tightly sealed containers can build dangerous pressure and may block steam penetration.' },
          { text: 'Pack items as tightly as possible to reduce cycle time', correct: false, feedback: 'Overpacking interferes with steam circulation.' },
        ],
        takeaway: 'Steam contact and pressure-safe loading are essential.',
      },
      {
        title: 'Verify sterilization',
        prompt: 'Which evidence provides the strongest direct confirmation that an autoclave process can inactivate resistant microorganisms?',
        options: [
          { text: 'A properly processed biological indicator', correct: true, feedback: 'Correct. Biological indicators challenge the cycle with resistant spores and provide direct biological evidence.' },
          { text: 'The chamber door feels warm', correct: false, feedback: 'Warmth does not validate sterilization.' },
          { text: 'The load looks dry', correct: false, feedback: 'Dryness is not proof that sterilization parameters were achieved.' },
        ],
        takeaway: 'Physical and chemical indicators monitor cycles; biological indicators provide biological validation evidence.',
      },
    ],
  },
  {
    id: 'aseptic',
    title: 'Aseptic / BSC',
    subtitle: 'Airflow, clean-to-dirty workflow, and contamination control',
    icon: ShieldCheck,
    scenarios: [
      {
        title: 'Set up the cabinet',
        prompt: 'Which setup best protects Class II biosafety cabinet airflow?',
        options: [
          { text: 'Keep front and rear grilles unobstructed and arrange materials from clean to dirty', correct: true, feedback: 'Correct. Blocking grilles disrupts containment and product protection.' },
          { text: 'Stack supplies across the front grille', correct: false, feedback: 'The front intake must remain unobstructed.' },
          { text: 'Place all waste in the cleanest work zone', correct: false, feedback: 'Waste should be separated from clean materials to reduce cross-contamination.' },
        ],
        takeaway: 'Preserve airflow and organize work from clean to contaminated.',
      },
      {
        title: 'Respond to a glove contamination event',
        prompt: 'A gloved hand touches an unclean phone outside the cabinet. What should happen before returning to sterile work?',
        options: [
          { text: 'Replace or appropriately disinfect the gloves according to procedure before re-entering the sterile workflow', correct: true, feedback: 'Correct. The glove is now a contamination source.' },
          { text: 'Continue because the glove was originally sterile', correct: false, feedback: 'Sterility is lost after contact with a contaminated surface.' },
          { text: 'Only move faster to reduce exposure time', correct: false, feedback: 'Speed does not restore asepsis.' },
        ],
        takeaway: 'Once a clean barrier contacts a contaminated surface, treat it as contaminated.',
      },
    ],
  },
  {
    id: 'serial',
    title: 'Serial Dilution',
    subtitle: 'Mixing, transfer order, dilution factors, and plating',
    icon: TestTubes,
    scenarios: [
      {
        title: 'Build a 1:10 series',
        prompt: 'To make one 1:10 dilution step using a 100 µL aliquot, how much diluent is needed?',
        options: [
          { text: '900 µL', correct: true, feedback: 'Correct. 100 µL sample + 900 µL diluent = 1000 µL total, a 1:10 dilution.' },
          { text: '1000 µL', correct: false, feedback: 'That would create 1100 µL total and would not be exactly 1:10.' },
          { text: '100 µL', correct: false, feedback: '100 + 100 produces a 1:2 dilution.' },
        ],
        takeaway: 'A 1:10 dilution is 1 part sample plus 9 parts diluent.',
      },
      {
        title: 'Protect the series',
        prompt: 'What must occur before transferring an aliquot from one dilution tube to the next?',
        options: [
          { text: 'Mix the current tube thoroughly and use a clean tip for the transfer', correct: true, feedback: 'Correct. Mixing distributes the sample evenly and fresh tips reduce carryover errors.' },
          { text: 'Transfer immediately without mixing', correct: false, feedback: 'An unmixed tube may not have a uniform concentration.' },
          { text: 'Return excess liquid from the tip to the previous tube', correct: false, feedback: 'Returning liquid can contaminate and alter concentrations.' },
        ],
        takeaway: 'Mix each tube before the next transfer and prevent carryover.',
      },
    ],
  },
  {
    id: 'counting',
    title: 'Cell Counting',
    subtitle: 'Hemocytometer counts, dilution factors, viability, and decisions',
    icon: Grid3X3,
    scenarios: [
      {
        title: 'Apply a dilution factor',
        prompt: 'A culture sample was mixed 1:1 with viability dye before counting. How should the original concentration be calculated?',
        options: [
          { text: 'Calculate from the chamber count and multiply by the dilution factor of 2', correct: true, feedback: 'Correct. The count represents a sample diluted twofold.' },
          { text: 'Divide the concentration by 100', correct: false, feedback: 'The correction depends on the actual dilution and chamber volume.' },
          { text: 'Ignore the dye dilution because it is only for staining', correct: false, feedback: 'The dye changed the sample concentration and must be accounted for.' },
        ],
        takeaway: 'Every sample dilution must be included in the original concentration calculation.',
      },
      {
        title: 'Assess viability',
        prompt: 'A culture has the correct total cell concentration but very poor viability. What is the best experimental decision?',
        options: [
          { text: 'Investigate culture health and avoid assuming the sample is suitable solely because total concentration is correct', correct: true, feedback: 'Correct. Total count does not guarantee adequate viable cells.' },
          { text: 'Proceed because total count is the only relevant value', correct: false, feedback: 'Viability can strongly affect downstream experiments.' },
          { text: 'Automatically double the seeding volume without documentation', correct: false, feedback: 'Unapproved compensation does not address the cause of poor viability.' },
        ],
        takeaway: 'Interpret cell concentration together with viability and culture condition.',
      },
    ],
  },
];

export const AdditionalPracticalStations: React.FC = () => {
  const [stationId, setStationId] = useState(STATIONS[0].id);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const station = useMemo(
    () => STATIONS.find((item) => item.id === stationId) || STATIONS[0],
    [stationId]
  );
  const scenario = station.scenarios[scenarioIndex];

  const choose = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    setAttempted((value) => value + 1);
    if (scenario.options[index].correct) setScore((value) => value + 1);
  };

  const next = () => {
    setSelectedIndex(null);
    setScenarioIndex((index) => (index + 1) % station.scenarios.length);
  };

  const selectStation = (id: string) => {
    setStationId(id);
    setScenarioIndex(0);
    setSelectedIndex(null);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">Practical Stations+</h2>
            <p className="text-xs text-slate-500 mt-1">Decision drills for six additional technician-level procedures.</p>
          </div>
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
            Score {score}/{attempted}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {STATIONS.map((item) => {
            const Icon = item.icon;
            const active = item.id === station.id;
            return (
              <button
                key={item.id}
                onClick={() => selectStation(item.id)}
                className={`text-left p-3 rounded-xl border transition-all ${active ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <Icon className={`w-4 h-4 mb-2 ${active ? 'text-blue-700' : 'text-slate-500'}`} />
                <div className="text-xs font-bold text-slate-900">{item.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 leading-relaxed">{item.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-950 text-white rounded-2xl p-5 md:p-6 shadow-lg">
        <div className="text-[10px] uppercase tracking-wider font-bold text-blue-300">{station.title}</div>
        <h3 className="text-lg font-black mt-1">{scenario.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mt-3">{scenario.prompt}</p>

        <div className="space-y-2.5 mt-5">
          {scenario.options.map((option, index) => {
            const answered = selectedIndex !== null;
            const selected = selectedIndex === index;
            let styles = 'border-white/15 bg-white/5 hover:bg-white/10';
            if (answered && option.correct) styles = 'border-emerald-500 bg-emerald-500/15';
            else if (answered && selected && !option.correct) styles = 'border-rose-500 bg-rose-500/15';

            return (
              <button
                key={option.text}
                onClick={() => choose(index)}
                disabled={answered}
                className={`w-full text-left p-3.5 border rounded-xl text-sm transition-all ${styles}`}
              >
                <div className="flex items-start gap-2.5">
                  {answered && option.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : answered && selected ? (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-500 shrink-0 mt-0.5" />
                  )}
                  <span>{option.text}</span>
                </div>
                {answered && (selected || option.correct) && (
                  <div className="text-xs text-slate-300 mt-2 pl-6">{option.feedback}</div>
                )}
              </button>
            );
          })}
        </div>

        {selectedIndex !== null && (
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <strong className="text-white">Takeaway:</strong> {scenario.takeaway}
            </div>
            <button onClick={next} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-xs font-bold">
              <RotateCcw className="w-3.5 h-3.5" />
              Next scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalPracticalStations;
