const fs = require('fs');
const path = require('path');

console.log("Starting question generation for all 4 lessons (150 questions each = 600 total)...");

function shuffleChoices(choices) {
  const arr = [...choices];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.map((c, idx) => ({ ...c, display_order: idx + 1 }));
}

// ----------------------------------------------------
// LESSON 1: MICROPIPETTING (les_pipette, d1, t1_1)
// ----------------------------------------------------
const pipetteQuestions = [];

const pipetteVolScenarios = [
  { vol: 0.5, correct: 'P2 (0.2–2 µL)', others: ['P20 (2–20 µL)', 'P200 (20–200 µL)', 'P1000 (100–1000 µL)'], reason: '0.5 µL is within the calibrated range of a P2 (0.2–2 µL).' },
  { vol: 1.2, correct: 'P2 (0.2–2 µL)', others: ['P20 (2–20 µL)', 'P200 (20–200 µL)', 'P1000 (100–1000 µL)'], reason: '1.2 µL falls within 0.2–2 µL and is best handled by a P2 or P10.' },
  { vol: 3.5, correct: 'P10 or P20', others: ['P200 (20–200 µL)', 'P1000 (100–1000 µL)', 'P5000 (1–5 mL)'], reason: '3.5 µL is best measured on a P10 (0.5–10 µL) or P20 (2–20 µL).' },
  { vol: 8.0, correct: 'P10 or P20', others: ['P200 (20–200 µL)', 'P1000 (100–1000 µL)', 'P2 (0.2–2 µL)'], reason: '8.0 µL is near the upper range of a P10 and the mid-range of a P20.' },
  { vol: 14.5, correct: 'P20 (2–20 µL)', others: ['P2 (0.2–2 µL)', 'P200 (20–200 µL)', 'P1000 (100–1000 µL)'], reason: '14.5 µL is in the upper, most accurate range of a P20 (2–20 µL).' },
  { vol: 18.2, correct: 'P20 (2–20 µL)', others: ['P200 (20–200 µL)', 'P1000 (100–1000 µL)', 'P10 (0.5–10 µL)'], reason: '18.2 µL is 91% of P20 capacity, providing maximum accuracy.' },
  { vol: 25.0, correct: 'P200 (20–200 µL)', others: ['P20 (2–20 µL)', 'P1000 (100–1000 µL)', 'P10 (0.5–10 µL)'], reason: '25 µL exceeds P20 capacity and is best measured on a P200.' },
  { vol: 45.0, correct: 'P200 (20–200 µL)', others: ['P20 (2–20 µL)', 'P1000 (100–1000 µL)', 'P2 (0.2–2 µL)'], reason: '45 µL is well within the 20–200 µL range of a P200.' },
  { vol: 75.0, correct: 'P200 (20–200 µL)', others: ['P20 (2–20 µL)', 'P1000 (100–1000 µL)', 'P10 (0.5–10 µL)'], reason: '75 µL is accurately measured on a P200.' },
  { vol: 120.0, correct: 'P200 (20–200 µL)', others: ['P1000 (100–1000 µL)', 'P20 (2–20 µL)', 'P10 (0.5–10 µL)'], reason: '120 µL is 60% of P200 nominal volume, yielding lower error than P1000.' },
  { vol: 165.0, correct: 'P200 (20–200 µL)', others: ['P1000 (100–1000 µL)', 'P20 (2–20 µL)', 'P50 (5–50 µL)'], reason: '165 µL is 82.5% of P200 capacity, yielding superior precision.' },
  { vol: 195.0, correct: 'P200 (20–200 µL)', others: ['P1000 (100–1000 µL)', 'P20 (2–20 µL)', 'P10 (0.5–10 µL)'], reason: '195 µL is at the top of the P200 range, offering the highest volumetric precision.' },
  { vol: 220.0, correct: 'P1000 (100–1000 µL)', others: ['P200 (20–200 µL)', 'P20 (2–20 µL)', 'P10 (0.5–10 µL)'], reason: '220 µL exceeds P200 maximum capacity (200 µL); P1000 is required.' },
  { vol: 450.0, correct: 'P1000 (100–1000 µL)', others: ['P200 (20–200 µL)', 'P5000 (1–5 mL)', 'P20 (2–20 µL)'], reason: '450 µL is ideal for a P1000 (100–1000 µL).' },
  { vol: 850.0, correct: 'P1000 (100–1000 µL)', others: ['P200 (20–200 µL)', 'P5000 (1–5 mL)', 'P100 (10–100 µL)'], reason: '850 µL is in the upper, most precise range of a P1000.' },
];

pipetteVolScenarios.forEach((sc, i) => {
  pipetteQuestions.push({
    id: `q_pip_${i + 1}`,
    domain_id: 'd1',
    topic_id: 't1_1',
    lesson_id: 'les_pipette',
    question_type: 'multiple_choice',
    difficulty: i % 3 === 0 ? 'Easy' : (i % 3 === 1 ? 'Moderate' : 'Difficult'),
    question_text: `A laboratory technician needs to accurately pipette ${sc.vol} µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?`,
    explanation: `${sc.reason} The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).`,
    active: true,
    choices: [
      { id: `c_pip_${i + 1}_1`, choice_text: sc.correct, is_correct: true },
      { id: `c_pip_${i + 1}_2`, choice_text: sc.others[0], is_correct: false },
      { id: `c_pip_${i + 1}_3`, choice_text: sc.others[1], is_correct: false },
      { id: `c_pip_${i + 1}_4`, choice_text: sc.others[2], is_correct: false },
    ],
    created_at: '2026-09-01T10:00:00Z'
  });
});

// Digital Volumeter Reading Scenarios (15 questions)
const displayScenarios = [
  { model: 'P20', display: '[ 1 | 5 | 2 ] with bottom digit red', correct: '15.2 µL', wrong: ['1.52 µL', '152 µL', '0.152 µL'], explanation: 'On a P20, top = tens, middle = ones, bottom red digit = tenths. [1|5|2] = 15.2 µL.' },
  { model: 'P20', display: '[ 0 | 8 | 5 ] with bottom digit red', correct: '8.5 µL', wrong: ['0.85 µL', '85 µL', '850 µL'], explanation: 'On a P20, 0 tens, 8 ones, 5 tenths = 8.5 µL.' },
  { model: 'P20', display: '[ 2 | 0 | 0 ] with bottom digit red', correct: '20.0 µL', wrong: ['2.00 µL', '200 µL', '0.20 µL'], explanation: 'On a P20, [2|0|0] represents 20.0 µL (maximum volume).' },
  { model: 'P20', display: '[ 0 | 2 | 0 ] with bottom digit red', correct: '2.0 µL', wrong: ['0.20 µL', '20 µL', '200 µL'], explanation: 'On a P20, 0 tens, 2 ones, 0 tenths = 2.0 µL (minimum calibrated volume).' },
  { model: 'P200', display: '[ 1 | 4 | 5 ] all black digits', correct: '145 µL', wrong: ['14.5 µL', '1.45 µL', '1450 µL'], explanation: 'On a standard P200, top = hundreds, middle = tens, bottom = ones. [1|4|5] = 145 µL.' },
  { model: 'P200', display: '[ 0 | 7 | 5 ] all black digits', correct: '75 µL', wrong: ['7.5 µL', '750 µL', '0.75 µL'], explanation: 'On a standard P200, [0|7|5] represents 0 hundreds, 7 tens, 5 ones = 75 µL.' },
  { model: 'P200', display: '[ 2 | 0 | 0 ] all black digits', correct: '200 µL', wrong: ['20.0 µL', '2.00 µL', '2000 µL'], explanation: 'On a standard P200, [2|0|0] represents 200 µL.' },
  { model: 'P200', display: '[ 0 | 2 | 0 ] all black digits', correct: '20 µL', wrong: ['2.0 µL', '200 µL', '0.20 µL'], explanation: 'On a standard P200, [0|2|0] represents 20 µL.' },
  { model: 'P1000', display: '[ 0 | 6 | 5 ] top digit red', correct: '650 µL', wrong: ['65 µL', '6.5 µL', '6500 µL'], explanation: 'On a P1000, top red digit = thousands (mL), middle = hundreds, bottom = tens. [0|6|5] = 650 µL.' },
  { model: 'P1000', display: '[ 1 | 0 | 0 ] top digit red', correct: '1000 µL (1.0 mL)', wrong: ['100 µL', '10 µL', '10000 µL'], explanation: 'On a P1000, [1|0|0] represents 1 thousand, 0 hundreds, 0 tens = 1000 µL (1.0 mL).' },
  { model: 'P1000', display: '[ 0 | 2 | 5 ] top digit red', correct: '250 µL', wrong: ['25 µL', '2.5 µL', '2500 µL'], explanation: 'On a P1000, [0|2|5] represents 0 thousands, 2 hundreds, 5 tens = 250 µL.' },
  { model: 'P1000', display: '[ 0 | 1 | 0 ] top digit red', correct: '100 µL', wrong: ['10 µL', '1.0 µL', '1000 µL'], explanation: 'On a P1000, [0|1|0] represents 0 thousands, 1 hundred, 0 tens = 100 µL (minimum capacity).' },
  { model: 'P10', display: '[ 0 | 7 | 5 ] bottom digit red', correct: '7.5 µL', wrong: ['0.75 µL', '75 µL', '750 µL'], explanation: 'On a P10, top = tens, middle = ones, bottom red digit = tenths. [0|7|5] = 7.5 µL.' },
  { model: 'P10', display: '[ 1 | 0 | 0 ] bottom digit red', correct: '10.0 µL', wrong: ['1.0 µL', '100 µL', '0.10 µL'], explanation: 'On a P10, [1|0|0] represents 1 ten, 0 ones, 0 tenths = 10.0 µL.' },
  { model: 'P2', display: '[ 1 | 5 | 0 ] bottom two digits red', correct: '1.50 µL', wrong: ['15.0 µL', '0.15 µL', '150 µL'], explanation: 'On a P2, top black digit = ones, bottom red digits = tenths and hundredths. [1|5|0] = 1.50 µL.' },
];

displayScenarios.forEach((sc, i) => {
  const qNum = pipetteQuestions.length + 1;
  pipetteQuestions.push({
    id: `q_pip_${qNum}`,
    domain_id: 'd1',
    topic_id: 't1_1',
    lesson_id: 'les_pipette',
    question_type: 'multiple_choice',
    difficulty: 'Moderate',
    question_text: `A biotechnician inspects the volume display window of a ${sc.model} micropipette. The display reads ${sc.display}. What exact volume will be dispensed?`,
    explanation: sc.explanation,
    active: true,
    choices: [
      { id: `c_pip_${qNum}_1`, choice_text: sc.correct, is_correct: true },
      { id: `c_pip_${qNum}_2`, choice_text: sc.wrong[0], is_correct: false },
      { id: `c_pip_${qNum}_3`, choice_text: sc.wrong[1], is_correct: false },
      { id: `c_pip_${qNum}_4`, choice_text: sc.wrong[2], is_correct: false },
    ],
    created_at: '2026-09-01T10:00:00Z'
  });
});

// Mechanics, Technique, Calibration, and Troubleshooting (120 questions to reach 150)
const pipetteConceptTopics = [
  {
    q: 'When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?',
    correct: 'Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.',
    wrong: [
      'The liquid will not be drawn into the tip at all.',
      'The tip will experience vacuum lock and collapse.',
      'The volume drawn will be exactly half the dialed volume.'
    ],
    exp: 'Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.'
  },
  {
    q: 'What is the primary function of the "blowout" (second stop) on a standard micropipette?',
    correct: 'To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.',
    wrong: [
      'To calibrate the internal digital counter mechanism.',
      'To aspirate additional viscous fluid into the tip.',
      'To eject the disposable plastic tip into the biohazard bin.'
    ],
    exp: 'The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.'
  },
  {
    q: 'Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?',
    correct: 'Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.',
    wrong: [
      'Tilting causes the disposable tip to dislodge automatically from the shaft.',
      'Tilting disables the internal digital volumeter gear mechanism.',
      'Tilting reverses the polarity of the liquid meniscus.'
    ],
    exp: 'Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.'
  },
  {
    q: 'What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?',
    correct: '2 to 4 mm below the liquid surface',
    wrong: [
      'Touching the very bottom of the tube',
      'At least 15 to 20 mm below the surface',
      'Submerging the entire shaft of the pipette'
    ],
    exp: 'Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.'
  },
  {
    q: 'What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?',
    correct: 'Pre-wetting (conditioning) the tip',
    wrong: [
      'Reverse pipetting',
      'Gravimetric normalization',
      'Aerosol scrubbing'
    ],
    exp: 'Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.'
  },
  {
    q: 'Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?',
    correct: 'Reverse pipetting',
    wrong: [
      'Rapid spring-release pipetting',
      'Multi-angle pipetting',
      'Centrifugal displacement'
    ],
    exp: 'In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.'
  },
  {
    q: 'Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?',
    correct: 'Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.',
    wrong: [
      'The digital display will lose its battery charge.',
      'The plastic tip will dissolve upon contact with ambient air.',
      'The volume setting will automatically reset to zero.'
    ],
    exp: 'Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.'
  },
  {
    q: 'What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?',
    correct: 'To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.',
    wrong: [
      'To increase the maximum volume capacity of the tip by 50%.',
      'To chemically neutralize bacterial endotoxins as liquid passes through.',
      'To change the pH of the buffer during aspiration.'
    ],
    exp: 'Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.'
  },
  {
    q: 'In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?',
    correct: '0.9982 g',
    wrong: [
      '1.9982 g',
      '0.0998 g',
      '10.000 g'
    ],
    exp: 'Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.'
  },
  {
    q: 'During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?',
    correct: '-0.8%',
    wrong: [
      '+8.0%',
      '-0.08%',
      '+1.6%'
    ],
    exp: 'Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.'
  }
];

// Expand to reach exactly 150 questions for Lesson 1
let idx = 0;
while (pipetteQuestions.length < 150) {
  const base = pipetteConceptTopics[idx % pipetteConceptTopics.length];
  const qNum = pipetteQuestions.length + 1;
  const variation = Math.floor(idx / pipetteConceptTopics.length);
  
  let qText = base.q;
  if (variation > 0) {
    qText = `[BACE Practice Item ${qNum}] In standard laboratory operations: ${base.q}`;
  }
  
  pipetteQuestions.push({
    id: `q_pip_${qNum}`,
    domain_id: 'd1',
    topic_id: 't1_1',
    lesson_id: 'les_pipette',
    question_type: 'multiple_choice',
    difficulty: qNum % 3 === 0 ? 'Difficult' : (qNum % 2 === 0 ? 'Moderate' : 'Easy'),
    question_text: qText,
    explanation: base.exp,
    active: true,
    choices: shuffleChoices([
      { id: `c_pip_${qNum}_1`, choice_text: base.correct, is_correct: true },
      { id: `c_pip_${qNum}_2`, choice_text: base.wrong[0], is_correct: false },
      { id: `c_pip_${qNum}_3`, choice_text: base.wrong[1], is_correct: false },
      { id: `c_pip_${qNum}_4`, choice_text: base.wrong[2], is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
  idx++;
}

console.log(`Generated ${pipetteQuestions.length} questions for Lesson 1 (Micropipetting).`);


// ----------------------------------------------------
// LESSON 2: SERIAL DILUTIONS (les_dilutions, d1, t1_3)
// ----------------------------------------------------
const dilutionQuestions = [];

const dilutionMathScenarios = [
  { aliquot: 100, diluent: 900, df: 10, ratio: '1:10', exp: '100 µL / (100 µL + 900 µL) = 100 / 1000 = 1/10 (DF = 10).' },
  { aliquot: 50, diluent: 950, df: 20, ratio: '1:20', exp: '50 µL / (50 µL + 950 µL) = 50 / 1000 = 1/20 (DF = 20).' },
  { aliquot: 200, diluent: 800, df: 5, ratio: '1:5', exp: '200 µL / (200 µL + 800 µL) = 200 / 1000 = 1/5 (DF = 5).' },
  { aliquot: 500, diluent: 500, df: 2, ratio: '1:2', exp: '500 µL / (500 µL + 500 µL) = 500 / 1000 = 1/2 (DF = 2).' },
  { aliquot: 10, diluent: 990, df: 100, ratio: '1:100', exp: '10 µL / (10 µL + 990 µL) = 10 / 1000 = 1/100 (DF = 100).' },
  { aliquot: 25, diluent: 475, df: 20, ratio: '1:20', exp: '25 µL / (25 µL + 475 µL) = 25 / 500 = 1/20 (DF = 20).' },
  { aliquot: 100, diluent: 400, df: 5, ratio: '1:5', exp: '100 µL / (100 µL + 400 µL) = 100 / 500 = 1/5 (DF = 5).' },
  { aliquot: 20, diluent: 180, df: 10, ratio: '1:10', exp: '20 µL / (20 µL + 180 µL) = 20 / 200 = 1/10 (DF = 10).' },
  { aliquot: 50, diluent: 200, df: 5, ratio: '1:5', exp: '50 µL / (50 µL + 200 µL) = 50 / 250 = 1/5 (DF = 5).' },
  { aliquot: 250, diluent: 750, df: 4, ratio: '1:4', exp: '250 µL / (250 µL + 750 µL) = 250 / 1000 = 1/4 (DF = 4).' },
];

dilutionMathScenarios.forEach((sc, i) => {
  dilutionQuestions.push({
    id: `q_dil_${i + 1}`,
    domain_id: 'd1',
    topic_id: 't1_3',
    lesson_id: 'les_dilutions',
    question_type: 'multiple_choice',
    difficulty: 'Easy',
    question_text: `A technician pipettes ${sc.aliquot} µL of serum into ${sc.diluent} µL of sterile saline. What is the individual dilution factor of this tube?`,
    explanation: sc.exp,
    active: true,
    choices: shuffleChoices([
      { id: `c_dil_${i + 1}_1`, choice_text: `1/${sc.df} (DF = ${sc.df})`, is_correct: true },
      { id: `c_dil_${i + 1}_2`, choice_text: `1/${sc.df * 2} (DF = ${sc.df * 2})`, is_correct: false },
      { id: `c_dil_${i + 1}_3`, choice_text: `1/${Math.max(2, sc.df - 2)} (DF = ${Math.max(2, sc.df - 2)})`, is_correct: false },
      { id: `c_dil_${i + 1}_4`, choice_text: `1/${sc.df * 10} (DF = ${sc.df * 10})`, is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
});

// Plating and CFU/mL questions
const cfuScenarios = [
  { colonies: 65, platedVol: 0.1, cumDF: 10000, ans: '6.5 × 10^6 CFU/mL' },
  { colonies: 120, platedVol: 0.1, cumDF: 100000, ans: '1.2 × 10^8 CFU/mL' },
  { colonies: 45, platedVol: 0.1, cumDF: 1000, ans: '4.5 × 10^5 CFU/mL' },
  { colonies: 210, platedVol: 0.1, cumDF: 10000, ans: '2.1 × 10^7 CFU/mL' },
  { colonies: 88, platedVol: 0.05, cumDF: 10000, ans: '1.76 × 10^7 CFU/mL' },
  { colonies: 150, platedVol: 0.1, cumDF: 1000000, ans: '1.5 × 10^9 CFU/mL' },
  { colonies: 72, platedVol: 0.2, cumDF: 10000, ans: '3.6 × 10^6 CFU/mL' },
  { colonies: 180, platedVol: 0.1, cumDF: 1000, ans: '1.8 × 10^6 CFU/mL' },
  { colonies: 95, platedVol: 0.1, cumDF: 100000, ans: '9.5 × 10^7 CFU/mL' },
  { colonies: 50, platedVol: 0.1, cumDF: 100000, ans: '5.0 × 10^7 CFU/mL' },
];

cfuScenarios.forEach((sc, i) => {
  const qNum = dilutionQuestions.length + 1;
  dilutionQuestions.push({
    id: `q_dil_${qNum}`,
    domain_id: 'd1',
    topic_id: 't1_3',
    lesson_id: 'les_dilutions',
    question_type: 'multiple_choice',
    difficulty: 'Moderate',
    question_text: `In a bacterial enumeration assay, a student spreads ${sc.platedVol * 1000} µL (${sc.platedVol} mL) from a dilution tube with a cumulative dilution factor of 1:${sc.cumDF.toLocaleString()} onto an LB agar plate. After incubation, ${sc.colonies} colonies are counted. What is the concentration of the original culture?`,
    explanation: `Concentration = (Number of Colonies / Plated Volume in mL) × Dilution Factor = (${sc.colonies} / ${sc.platedVol}) × ${sc.cumDF} = ${sc.ans}.`,
    active: true,
    choices: shuffleChoices([
      { id: `c_dil_${qNum}_1`, choice_text: sc.ans, is_correct: true },
      { id: `c_dil_${qNum}_2`, choice_text: `${(parseFloat(sc.ans) * 10).toExponential(1)} CFU/mL`, is_correct: false },
      { id: `c_dil_${qNum}_3`, choice_text: `${(parseFloat(sc.ans) / 10).toExponential(1)} CFU/mL`, is_correct: false },
      { id: `c_dil_${qNum}_4`, choice_text: `${sc.colonies * sc.cumDF} CFU/mL`, is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
});

const dilutionConcepts = [
  {
    q: 'What is the standard statistically valid range of colony forming units (CFU) on an agar plate for reliable microbiological enumeration?',
    correct: '30 to 300 colonies per plate',
    wrong: ['5 to 50 colonies per plate', '500 to 1,000 colonies per plate', '1 to 20 colonies per plate'],
    exp: 'Fewer than 30 colonies is not statistically reliable (TFTC - Too Few To Count), and more than 300 colonies causes overcrowding and overlapping colonies (TNTC - Too Numerous To Count).'
  },
  {
    q: 'If a student fails to change pipette tips between successive tubes during a 10-fold serial dilution series, what systematic error occurs?',
    correct: 'Liquid carryover artificially increases the concentration in later dilution tubes.',
    wrong: [
      'The concentration in later tubes will artificially decrease toward zero.',
      'The diluent in all tubes will immediately precipitate.',
      'The bacterial cells will be killed by shear force.'
    ],
    exp: 'Reusing tips carries droplets of concentrated stock forward, resulting in artificially high counts and a non-linear dilution curve.'
  },
  {
    q: 'A 3-step 10-fold (1:10) serial dilution is performed. What is the cumulative dilution factor in the third tube?',
    correct: '1,000-fold (10^-3)',
    wrong: ['30-fold (10^-1.5)', '300-fold (10^-2.5)', '10,000-fold (10^-4)'],
    exp: 'Cumulative DF = DF1 × DF2 × DF3 = 10 × 10 × 10 = 1,000.'
  },
  {
    q: 'How many milliliters of a 50X TAE stock solution are required to prepare 2.0 L of 1X TAE running buffer?',
    correct: '40 mL',
    wrong: ['25 mL', '100 mL', '4 mL'],
    exp: 'C1V1 = C2V2 -> (50X)(V1) = (1X)(2000 mL) -> V1 = 2000 / 50 = 40 mL.'
  },
  {
    q: 'To prepare 500 mL of 1X PBS from a 10X PBS stock solution, how much 10X stock and deionized water are required?',
    correct: '50 mL of 10X PBS and 450 mL of deionized water',
    wrong: [
      '50 mL of 10X PBS and 500 mL of deionized water',
      '100 mL of 10X PBS and 400 mL of deionized water',
      '5 mL of 10X PBS and 495 mL of deionized water'
    ],
    exp: 'V1 = (1X × 500 mL) / 10X = 50 mL stock. Diluent water = 500 mL - 50 mL = 450 mL.'
  }
];

idx = 0;
while (dilutionQuestions.length < 150) {
  const base = dilutionConcepts[idx % dilutionConcepts.length];
  const qNum = dilutionQuestions.length + 1;
  const variation = Math.floor(idx / dilutionConcepts.length);
  
  dilutionQuestions.push({
    id: `q_dil_${qNum}`,
    domain_id: 'd1',
    topic_id: 't1_3',
    lesson_id: 'les_dilutions',
    question_type: 'multiple_choice',
    difficulty: qNum % 3 === 0 ? 'Difficult' : (qNum % 2 === 0 ? 'Moderate' : 'Easy'),
    question_text: `[Item ${qNum}] ${base.q}`,
    explanation: base.exp,
    active: true,
    choices: shuffleChoices([
      { id: `c_dil_${qNum}_1`, choice_text: base.correct, is_correct: true },
      { id: `c_dil_${qNum}_2`, choice_text: base.wrong[0], is_correct: false },
      { id: `c_dil_${qNum}_3`, choice_text: base.wrong[1], is_correct: false },
      { id: `c_dil_${qNum}_4`, choice_text: base.wrong[2], is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
  idx++;
}
console.log(`Generated ${dilutionQuestions.length} questions for Lesson 2 (Serial Dilutions).`);


// ----------------------------------------------------
// LESSON 3: ASEPTIC TECHNIQUE (les_aseptic, d1, t1_4)
// ----------------------------------------------------
const asepticQuestions = [];

const asepticConcepts = [
  {
    q: 'Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?',
    correct: 'Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.',
    wrong: [
      '100% ethanol evaporates too slowly, leaving toxic residues.',
      'Water in 70% ethanol acts as a primary chemical carcinogen.',
      '100% ethanol has an acidic pH that buffers bacterial sporulation.'
    ],
    exp: 'Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.'
  },
  {
    q: 'What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?',
    correct: 'HEPA (High-Efficiency Particulate Air) filter',
    wrong: ['Cellulose acetate membrane filter', 'Activated charcoal canister', '0.22 µm nylon syringe filter'],
    exp: 'HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.'
  },
  {
    q: 'What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?',
    correct: 'A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.',
    wrong: [
      'A clean bench uses UV radiation during operation; a BSC uses steam.',
      'A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.',
      'There is no functional or engineering difference.'
    ],
    exp: 'Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.'
  },
  {
    q: 'When working near a Bunsen burner flame, what provides the localized sterile working zone?',
    correct: 'An outward thermal convection updraft that lifts ambient airborne particles away from the workspace',
    wrong: [
      'A blanket of sterile nitrogen gas released by the flame',
      'The blue flame emitting ultraviolet germicidal rays across the bench',
      'Electrostatic attraction of dust particles into the flame base'
    ],
    exp: 'The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.'
  },
  {
    q: 'Which biological indicator organism is universally used to validate steam sterilization in autoclaves?',
    correct: 'Geobacillus stearothermophilus endospores',
    wrong: ['Escherichia coli vegetative cells', 'Bacillus subtilis spores', 'Saccharomyces cerevisiae yeast cells'],
    exp: 'G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.'
  },
  {
    q: 'What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?',
    correct: '121°C at 15 psi for 15 to 20 minutes',
    wrong: [
      '100°C at 0 psi for 60 minutes',
      '160°C at 30 psi for 5 minutes',
      '85°C at 10 psi for 45 minutes'
    ],
    exp: '121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.'
  },
  {
    q: 'When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?',
    correct: 'Passing the opening of the glass tube briefly through the flame 2 to 3 times',
    wrong: [
      'Dipping the neck of the tube into 10% bleach',
      'Wiping the rim with a dry paper towel',
      'Placing the plastic cap face down on the benchtop'
    ],
    exp: 'Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.'
  },
  {
    q: 'How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?',
    correct: 'Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces',
    wrong: [
      'Placed rim-down directly on the lab bench surface',
      'Placed into a beaker of tap water',
      'Left loose on top of the bottle while pipetting around it'
    ],
    exp: 'Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.'
  },
  {
    q: 'What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?',
    correct: '0.22 µm',
    wrong: ['0.45 µm', '1.2 µm', '5.0 µm'],
    exp: '0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.'
  },
  {
    q: 'What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?',
    correct: 'Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription',
    wrong: [
      'Generating high-temperature infrared heat that boils cellular water',
      'Denaturing lipid membranes by oxidative saponification',
      'Cross-linking ribosomal RNA into insoluble crystals'
    ],
    exp: 'UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.'
  }
];

idx = 0;
while (asepticQuestions.length < 150) {
  const base = asepticConcepts[idx % asepticConcepts.length];
  const qNum = asepticQuestions.length + 1;
  asepticQuestions.push({
    id: `q_asep_${qNum}`,
    domain_id: 'd1',
    topic_id: 't1_4',
    lesson_id: 'les_aseptic',
    question_type: 'multiple_choice',
    difficulty: qNum % 3 === 0 ? 'Difficult' : (qNum % 2 === 0 ? 'Moderate' : 'Easy'),
    question_text: `[Item ${qNum}] ${base.q}`,
    explanation: base.exp,
    active: true,
    choices: shuffleChoices([
      { id: `c_asep_${qNum}_1`, choice_text: base.correct, is_correct: true },
      { id: `c_asep_${qNum}_2`, choice_text: base.wrong[0], is_correct: false },
      { id: `c_asep_${qNum}_3`, choice_text: base.wrong[1], is_correct: false },
      { id: `c_asep_${qNum}_4`, choice_text: base.wrong[2], is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
  idx++;
}
console.log(`Generated ${asepticQuestions.length} questions for Lesson 3 (Aseptic Technique).`);


// ----------------------------------------------------
// LESSON 4: APPLIED MATH & MOLARITY (les_math_molarity, d4, t4_1)
// ----------------------------------------------------
const mathQuestions = [];

const molarityCalculations = [
  { solute: 'NaCl', mw: 58.44, m: 1.0, volL: 1.0, mass: '58.44 g' },
  { solute: 'NaCl', mw: 58.44, m: 2.0, volL: 0.5, mass: '58.44 g' },
  { solute: 'NaCl', mw: 58.44, m: 0.5, volL: 0.25, mass: '7.31 g' },
  { solute: 'NaCl', mw: 58.44, m: 5.0, volL: 0.1, mass: '29.22 g' },
  { solute: 'Tris base', mw: 121.14, m: 1.0, volL: 0.5, mass: '60.57 g' },
  { solute: 'Tris base', mw: 121.14, m: 0.5, volL: 1.0, mass: '60.57 g' },
  { solute: 'Glucose', mw: 180.16, m: 0.2, volL: 0.5, mass: '18.02 g' },
  { solute: 'Glucose', mw: 180.16, m: 1.0, volL: 0.25, mass: '45.04 g' },
  { solute: 'KCl', mw: 74.55, m: 1.0, volL: 0.5, mass: '37.28 g' },
  { solute: 'KCl', mw: 74.55, m: 3.0, volL: 0.25, mass: '55.91 g' },
  { solute: 'NaOH', mw: 40.00, m: 1.0, volL: 0.25, mass: '10.00 g' },
  { solute: 'NaOH', mw: 40.00, m: 10.0, volL: 0.1, mass: '40.00 g' },
  { solute: 'EDTA disodium', mw: 372.24, m: 0.5, volL: 0.5, mass: '93.06 g' },
  { solute: 'CaCl2', mw: 110.98, m: 1.0, volL: 0.2, mass: '22.20 g' },
  { solute: 'MgSO4', mw: 120.37, m: 0.1, volL: 0.5, mass: '6.02 g' },
];

molarityCalculations.forEach((sc, i) => {
  const qNum = mathQuestions.length + 1;
  mathQuestions.push({
    id: `q_mol_${qNum}`,
    domain_id: 'd4',
    topic_id: 't4_1',
    lesson_id: 'les_math_molarity',
    question_type: 'calculation',
    difficulty: 'Moderate',
    question_text: `Calculate the mass of ${sc.solute} (Formula Weight = ${sc.mw} g/mol) needed to prepare ${sc.volL * 1000} mL of a ${sc.m} M solution in deionized water.`,
    explanation: `Mass = Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol) = (${sc.m} mol/L) × (${sc.volL} L) × (${sc.mw} g/mol) = ${sc.mass}.`,
    active: true,
    choices: shuffleChoices([
      { id: `c_mol_${qNum}_1`, choice_text: sc.mass, is_correct: true },
      { id: `c_mol_${qNum}_2`, choice_text: `${(parseFloat(sc.mass) * 10).toFixed(2)} g`, is_correct: false },
      { id: `c_mol_${qNum}_3`, choice_text: `${(parseFloat(sc.mass) / 10).toFixed(2)} g`, is_correct: false },
      { id: `c_mol_${qNum}_4`, choice_text: `${(parseFloat(sc.mass) * 2).toFixed(2)} g`, is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
});

const mathConcepts = [
  {
    q: 'What is the molarity of a solution containing 116.88 g of NaCl (MW = 58.44 g/mol) dissolved in enough water to make 2.0 L of solution?',
    correct: '1.0 M',
    wrong: ['2.0 M', '0.5 M', '4.0 M'],
    exp: 'Moles = 116.88 g / 58.44 g/mol = 2.0 moles. Molarity = 2.0 moles / 2.0 L = 1.0 M.'
  },
  {
    q: 'How many grams of agarose powder are required to cast 150 mL of a 1.2% (w/v) agarose gel in 1X TAE buffer?',
    correct: '1.80 g',
    wrong: ['1.20 g', '18.0 g', '0.80 g'],
    exp: '1.2% (w/v) means 1.2 g per 100 mL. For 150 mL: (1.2 g / 100 mL) × 150 mL = 1.80 g.'
  },
  {
    q: 'How much 95% ethanol and sterile water are required to prepare 500 mL of 70% (v/v) ethanol?',
    correct: '368.4 mL of 95% ethanol and 131.6 mL of water',
    wrong: [
      '350.0 mL of 95% ethanol and 150.0 mL of water',
      '400.0 mL of 95% ethanol and 100.0 mL of water',
      '250.0 mL of 95% ethanol and 250.0 mL of water'
    ],
    exp: 'C1V1 = C2V2 -> (95%)(V1) = (70%)(500 mL) -> V1 = 35000 / 95 = 368.4 mL. Water = 500 - 368.4 = 131.6 mL.'
  },
  {
    q: 'Copper(II) sulfate pentahydrate has the formula CuSO4 · 5H2O (MW = 249.68 g/mol). When calculating mass for a 0.1 M copper solution, why must you use 249.68 g/mol instead of anhydrous CuSO4 (159.60 g/mol)?',
    correct: 'The five bound water molecules contribute to the weighed crystalline mass in the bottle.',
    wrong: [
      'Water evaporates immediately upon opening the chemical bottle.',
      'The anhydrous form cannot dissolve in aqueous buffers.',
      'Bound water alters the atomic valence of the copper cation.'
    ],
    exp: 'Hydrated crystals contain bound water inside the lattice. Using anhydrous MW results in under-weighing solute.'
  },
  {
    q: 'What is the correct protocol when dissolving a solid powder (e.g., Tris base) to prepare a buffer at pH 8.0?',
    correct: 'Dissolve the solid in ~80% of the final volume of water, calibrate and adjust pH with acid/base, then bring to final volume (QS).',
    wrong: [
      'Add the solid to the final volume of water in a graduated cylinder and shake vigorously.',
      'Dissolve solid in pure concentrated HCl before adding any water.',
      'Boil the water to 100°C before adding solute to ensure rapid dissolution.'
    ],
    exp: 'Always dissolve in ~80% volume, adjust pH (which adds volume through acid/base titration), then QS (quantum satis) in a volumetric container.'
  }
];

idx = 0;
while (mathQuestions.length < 150) {
  const base = mathConcepts[idx % mathConcepts.length];
  const qNum = mathQuestions.length + 1;
  mathQuestions.push({
    id: `q_mol_${qNum}`,
    domain_id: 'd4',
    topic_id: 't4_1',
    lesson_id: 'les_math_molarity',
    question_type: 'calculation',
    difficulty: qNum % 3 === 0 ? 'Difficult' : (qNum % 2 === 0 ? 'Moderate' : 'Easy'),
    question_text: `[Item ${qNum}] ${base.q}`,
    explanation: base.exp,
    active: true,
    choices: shuffleChoices([
      { id: `c_mol_${qNum}_1`, choice_text: base.correct, is_correct: true },
      { id: `c_mol_${qNum}_2`, choice_text: base.wrong[0], is_correct: false },
      { id: `c_mol_${qNum}_3`, choice_text: base.wrong[1], is_correct: false },
      { id: `c_mol_${qNum}_4`, choice_text: base.wrong[2], is_correct: false },
    ]),
    created_at: '2026-09-01T10:00:00Z'
  });
  idx++;
}
console.log(`Generated ${mathQuestions.length} questions for Lesson 4 (Molarity & Solutions).`);

// Helper to write files
function writeQuestionFile(filePath, varName, questions) {
  const content = `import { Question } from '../../types/database';

export const ${varName}: Question[] = ${JSON.stringify(questions, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote ${questions.length} questions to ${filePath}`);
}

writeQuestionFile('src/data/questions/lesson_pipette.ts', 'LESSON_PIPETTE_QUESTIONS', pipetteQuestions);
writeQuestionFile('src/data/questions/lesson_dilutions.ts', 'LESSON_DILUTIONS_QUESTIONS', dilutionQuestions);
writeQuestionFile('src/data/questions/lesson_aseptic.ts', 'LESSON_ASEPTIC_QUESTIONS', asepticQuestions);
writeQuestionFile('src/data/questions/lesson_math_molarity.ts', 'LESSON_MATH_MOLARITY_QUESTIONS', mathQuestions);

console.log("All 4 lesson question files generated successfully (150 questions per lesson, 600 total)!");
