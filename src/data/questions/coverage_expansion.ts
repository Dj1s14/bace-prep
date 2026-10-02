import { Question, DifficultyLevel } from '../../types/database';

type Item = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
  difficulty?: DifficultyLevel;
};

type TopicBank = {
  domain: string;
  topic: string;
  lesson: string;
  items: Item[];
};

const banks: TopicBank[] = [
  {
    domain: 'd1', topic: 't1_2', lesson: 'les_solution_prep',
    items: [
      {
        prompt: 'A technician must prepare 250 mL of a solution from a weighed solid. After dissolving the solid, what should the technician do next to obtain the correct concentration?',
        correct: 'Bring the solution to exactly 250 mL final volume in appropriate volumetric glassware',
        wrong: ['Add 250 mL of water to the dissolved solid', 'Estimate the final volume in a beaker', 'Discard any solution above 200 mL'],
        explanation: 'Solution concentrations are based on final solution volume. The solid is dissolved first, then the solution is brought to the specified final volume.',
      },
      {
        prompt: 'Which practice best reduces parallax error when measuring an aqueous solution in calibrated glassware?',
        correct: 'Read the bottom of the meniscus at eye level',
        wrong: ['Read the top of the meniscus from above', 'Hold the vessel at shoulder height', 'Tilt the vessel until the meniscus appears flat'],
        explanation: 'Viewing the meniscus at eye level prevents an angular viewing error.',
      },
      {
        prompt: 'A prepared buffer label is missing the preparation date and concentration. What is the best action?',
        correct: 'Do not use it until identity and traceability are resolved according to the SOP',
        wrong: ['Use it if the color looks correct', 'Estimate the concentration from the bottle size', 'Add a new label based on memory'],
        explanation: 'Untraceable reagents can compromise safety and data integrity. Required information must be verified before use.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'Why is a volumetric flask preferred over a beaker for preparing a primary standard to a precise final volume?',
        correct: 'It is calibrated to contain a specific volume with much better volumetric accuracy',
        wrong: ['It heats solutions faster', 'It prevents all evaporation', 'It automatically adjusts pH'],
        explanation: 'Volumetric flasks are calibrated for precise final volumes; beaker graduations are approximate.',
      },
    ],
  },
  {
    domain: 'd1', topic: 't1_5', lesson: 'les_cell_culture',
    items: [
      {
        prompt: 'A mammalian cell culture shows sudden turbidity and abnormal floating particles. What should the technician do?',
        correct: 'Isolate the culture and investigate possible contamination before using it',
        wrong: ['Use it immediately before viability decreases', 'Add more serum and continue', 'Transfer it into a clean flask without documentation'],
        explanation: 'Unexpected turbidity and particles are contamination warning signs. Questionable cultures should not be used for experiments.',
      },
      {
        prompt: 'What does confluency describe in an adherent cell culture?',
        correct: 'The approximate percentage of the growth surface covered by cells',
        wrong: ['The percentage of dead cells only', 'The concentration of antibiotic in the media', 'The incubator carbon dioxide setting'],
        explanation: 'Confluency estimates how much of the available surface is occupied by adherent cells.',
      },
      {
        prompt: 'A cell count was performed after a 1:2 dilution with viability dye. What must be included when calculating the original cell concentration?',
        correct: 'The dilution factor',
        wrong: ['Only the microscope objective power', 'The incubator humidity', 'The flask surface area only'],
        explanation: 'A diluted sample must be corrected by the dilution factor to estimate the original concentration.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'Why should a culture vessel remain open for the shortest practical time during manipulations?',
        correct: 'To reduce the opportunity for environmental contamination',
        wrong: ['To increase carbon dioxide loss', 'To make cells attach faster', 'To increase evaporation for better concentration'],
        explanation: 'Minimizing exposure protects the sterile culture from airborne and contact contamination.',
      },
    ],
  },
  {
    domain: 'd1', topic: 't1_6', lesson: 'les_microscopy',
    items: [
      {
        prompt: 'A microscope uses a 10× ocular lens and a 40× objective. What is the total magnification?',
        correct: '400×',
        wrong: ['50×', '40×', '4,000×'],
        explanation: 'Total magnification equals ocular magnification multiplied by objective magnification: 10 × 40 = 400.',
      },
      {
        prompt: 'Why should a specimen generally be located and focused under low power before switching to high power?',
        correct: 'Low power provides a wider field of view and reduces the risk of contacting the slide',
        wrong: ['High power cannot focus stained specimens', 'Low power increases specimen temperature', 'High power objectives cannot resolve cells'],
        explanation: 'Starting at low power makes the specimen easier to locate and is safer for the slide and objective.',
      },
      {
        prompt: 'An image becomes larger after changing objectives but no additional detail can be distinguished. Which optical property is limiting?',
        correct: 'Resolution',
        wrong: ['Magnification', 'Stage height', 'Working distance only'],
        explanation: 'Magnification enlarges an image; resolution determines whether close details can be distinguished.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'What is the primary purpose of staining many transparent biological specimens?',
        correct: 'To increase contrast so structures are easier to distinguish',
        wrong: ['To increase objective magnification', 'To sterilize the slide completely', 'To change the numerical aperture of the lens'],
        explanation: 'Stains improve visible contrast and may selectively highlight structures.',
      },
    ],
  },
  {
    domain: 'd1', topic: 't1_7', lesson: 'les_centrifugation',
    items: [
      {
        prompt: 'A centrifuge has one sample tube and no second sample. What is the correct setup?',
        correct: 'Prepare a compatible balance tube of equal mass and place it opposite the sample',
        wrong: ['Run the centrifuge at half speed with one tube', 'Place the sample next to the rotor hinge', 'Hold the centrifuge lid during the run'],
        explanation: 'Opposing rotor positions must be balanced by mass to prevent dangerous vibration and rotor stress.',
      },
      {
        prompt: 'Two centrifuges are set to the same RPM but have different rotor radii. What can be concluded about RCF?',
        correct: 'The RCF can be different because rotor radius affects centrifugal force',
        wrong: ['The RCF must be identical', 'RCF depends only on run time', 'RCF is unrelated to rotor geometry'],
        explanation: 'Relative centrifugal force depends on both rotational speed and rotor radius.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'A protocol says “retain the supernatant.” What should the technician do after centrifugation?',
        correct: 'Keep the liquid above the pellet and avoid discarding it',
        wrong: ['Discard all liquid and keep only the pellet', 'Resuspend the pellet and discard everything else', 'Invert the tube before identifying the fractions'],
        explanation: 'The supernatant is the liquid above the pellet; the protocol determines which fraction contains the target.',
      },
      {
        prompt: 'A centrifuge begins vibrating severely shortly after the run starts. What is the best response?',
        correct: 'Stop the run safely and investigate balance, tube placement, and rotor condition',
        wrong: ['Increase speed until vibration stops', 'Open the lid immediately while the rotor spins', 'Ignore it if the timer continues counting'],
        explanation: 'Unexpected vibration can indicate dangerous imbalance or rotor problems and requires safe shutdown and inspection.',
      },
    ],
  },
  {
    domain: 'd1', topic: 't1_9', lesson: 'les_spectrophotometry',
    items: [
      {
        prompt: 'What should a spectrophotometer blank contain for a colorimetric assay?',
        correct: 'The assay matrix and reagents without the analyte being measured',
        wrong: ['Always pure water only', 'Only the analyte at its highest concentration', 'A random sample from the batch'],
        explanation: 'The blank accounts for background absorbance from solvent and reagents.',
      },
      {
        prompt: 'An unknown sample has an absorbance above the validated standard-curve range. What is the best action?',
        correct: 'Dilute the sample, remeasure within range, and correct for the dilution factor',
        wrong: ['Extrapolate far beyond the curve', 'Record the maximum instrument value as the concentration', 'Change wavelength until the reading falls'],
        explanation: 'Quantitative results should be obtained within the validated linear range whenever possible.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'Which handling error can artificially change a cuvette absorbance reading?',
        correct: 'Fingerprints on the optical faces',
        wrong: ['Holding the cuvette by the ribbed sides', 'Using a matched blank', 'Closing the sample compartment'],
        explanation: 'Fingerprints, scratches, and bubbles can scatter or absorb light and alter measurements.',
      },
      {
        prompt: 'A blank reads unusually high. What should the technician check first?',
        correct: 'Blank composition, cuvette cleanliness, wavelength, and instrument setup',
        wrong: ['Assume all samples are highly concentrated', 'Delete the blank result', 'Average the blank with the samples'],
        explanation: 'A high blank suggests background or setup problems that should be corrected before samples are interpreted.',
      },
    ],
  },
  {
    domain: 'd1', topic: 't1_10', lesson: 'les_lab_documentation',
    items: [
      {
        prompt: 'A technician notices immediately that a handwritten notebook entry is wrong. Which correction best follows good documentation practice?',
        correct: 'Preserve the original entry, make a traceable correction, and initial/date it as required',
        wrong: ['Erase the incorrect value completely', 'Use correction fluid to cover it', 'Tear out the page and rewrite it'],
        explanation: 'Good documentation preserves the original record and makes corrections traceable.',
      },
      {
        prompt: 'Which action best demonstrates contemporaneous documentation?',
        correct: 'Recording the observation when the work is performed',
        wrong: ['Reconstructing the entire week from memory on Friday', 'Copying another technician’s notes', 'Entering only results that passed specifications'],
        explanation: 'Contemporaneous means documenting information at the time the activity occurs.',
      },
      {
        prompt: 'Why are reagent lot numbers and equipment IDs recorded in controlled laboratory records?',
        correct: 'They allow the work and materials to be traced during review or investigation',
        wrong: ['They replace the need for a procedure', 'They increase instrument precision', 'They eliminate calibration requirements'],
        explanation: 'Traceability connects results to the exact materials and equipment used.',
      },
      {
        prompt: 'Which practice is a data-integrity violation?',
        correct: 'Deleting an unexpected result because it does not fit the expected trend',
        wrong: ['Documenting a failed run', 'Recording a deviation investigation', 'Keeping an audit trail'],
        explanation: 'Unfavorable or unexpected data must remain part of the complete record and be investigated appropriately.',
        difficulty: 'Moderate',
      },
    ],
  },
  {
    domain: 'd2', topic: 't2_2', lesson: 'les_dna_extraction',
    items: [
      {
        prompt: 'In a silica-column DNA extraction, what is the purpose of the wash step?',
        correct: 'Remove contaminants while nucleic acid remains bound to the column',
        wrong: ['Amplify the DNA', 'Digest the DNA into fragments', 'Add primers to the sample'],
        explanation: 'Wash buffers remove proteins, salts, and other contaminants under conditions that keep DNA bound.',
      },
      {
        prompt: 'Why can residual ethanol from a wash buffer cause problems after DNA extraction?',
        correct: 'It can inhibit downstream enzymes such as DNA polymerases',
        wrong: ['It permanently increases DNA copy number', 'It converts DNA to RNA', 'It makes restriction sites disappear'],
        explanation: 'Residual alcohol can inhibit enzymatic reactions used after purification.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'Extracted DNA samples fail PCR, but the PCR positive control works. Which cause is most likely worth investigating?',
        correct: 'Inhibitors or poor-quality DNA from the extraction process',
        wrong: ['The thermocycler cannot reach denaturation temperature', 'All PCR reagents are inactive', 'The positive control DNA is contaminated with protein'],
        explanation: 'A working positive control supports the PCR system; failure limited to extracts points toward sample/extraction quality.',
      },
      {
        prompt: 'Which step releases nucleic acids from cells during an extraction workflow?',
        correct: 'Lysis',
        wrong: ['Elution only', 'Electrophoresis', 'Annealing'],
        explanation: 'Lysis disrupts cell structures and releases intracellular contents.',
      },
    ],
  },
  {
    domain: 'd2', topic: 't2_5', lesson: 'les_protein_methods',
    items: [
      {
        prompt: 'A Western blot shows no target band in any sample, including the positive control. What is the correct interpretation?',
        correct: 'The assay run is not valid for concluding that the samples lack the target',
        wrong: ['All samples are definitively negative', 'The target protein must be smaller than expected', 'The experiment proves antibody specificity'],
        explanation: 'A failed positive control means the detection system may have failed, so negative sample calls are not supported.',
      },
      {
        prompt: 'What is the main purpose of SDS in SDS-PAGE?',
        correct: 'Denature proteins and give them a similar charge-to-mass behavior for size-based separation',
        wrong: ['Create DNA restriction fragments', 'Bind antibodies to membranes', 'Increase cell viability'],
        explanation: 'SDS unfolds proteins and coats them with negative charge, allowing separation primarily by size.',
      },
      {
        prompt: 'An unknown protein-assay signal is higher than the highest standard. What should the technician do?',
        correct: 'Dilute the unknown into the standard range and account for the dilution factor',
        wrong: ['Use the highest standard concentration as the result', 'Ignore the standard curve', 'Subtract the sample from the blank twice'],
        explanation: 'Unknowns should be measured within the validated calibration range.',
      },
      {
        prompt: 'In a Western blot, what does the primary antibody bind?',
        correct: 'The target protein or its epitope',
        wrong: ['The power supply electrode', 'The molecular-weight ladder only', 'The gel casting tray'],
        explanation: 'The primary antibody provides target recognition; a secondary antibody commonly binds the primary antibody.',
      },
    ],
  },
  {
    domain: 'd3', topic: 't3_2', lesson: 'les_ppe',
    items: [
      {
        prompt: 'Which source should a technician use to confirm whether a glove material is appropriate for a specific hazardous chemical?',
        correct: 'The chemical SDS, SOP, and glove compatibility information',
        wrong: ['The glove color only', 'A coworker’s preference only', 'The container size'],
        explanation: 'Chemical resistance depends on the glove material and chemical; selection should be based on documented hazard information.',
      },
      {
        prompt: 'Why is PPE considered the last level in the hierarchy of controls?',
        correct: 'It depends on correct human use and does not remove the hazard itself',
        wrong: ['It is always the most expensive control', 'It cannot protect against splashes', 'It is only used after an accident'],
        explanation: 'Engineering and other upstream controls reduce exposure at the source; PPE remains necessary but relies heavily on correct use.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'A technician wearing contaminated gloves needs to answer a shared laboratory phone. What should they do?',
        correct: 'Remove or change contaminated gloves before touching the clean shared surface',
        wrong: ['Use the phone with the contaminated gloves', 'Spray the phone while still wearing the gloves', 'Ask another gloved technician to answer'],
        explanation: 'Contaminated gloves should not transfer hazards to clean common-touch surfaces.',
      },
      {
        prompt: 'A procedure has a significant chemical splash risk to the face. What additional protection may be required beyond safety glasses?',
        correct: 'Appropriate splash goggles and/or a face shield as specified by the risk assessment',
        wrong: ['Hearing protection only', 'A hairnet only', 'Shoe covers only'],
        explanation: 'Face splash hazards require eye and face protection appropriate to the identified risk.',
      },
    ],
  },
  {
    domain: 'd3', topic: 't3_4', lesson: 'les_spills_waste',
    items: [
      {
        prompt: 'A technician encounters a spill of an unidentified chemical. What is the safest immediate action?',
        correct: 'Restrict access and follow the emergency/spill procedure until the material and hazards are identified',
        wrong: ['Neutralize it with any available base', 'Wipe it up with paper towels immediately', 'Pour it into the sink'],
        explanation: 'Unknown spills should not be handled using an improvised cleanup method.',
      },
      {
        prompt: 'Where should a contaminated used needle be discarded?',
        correct: 'In an approved puncture-resistant sharps container',
        wrong: ['In regular trash', 'In a glass recycling bin', 'Loose inside a biohazard bag'],
        explanation: 'Sharps require puncture-resistant approved containers.',
      },
      {
        prompt: 'Why should incompatible chemical wastes not be combined?',
        correct: 'They may react dangerously, generate heat, gas, pressure, or toxic products',
        wrong: ['They become easier to label', 'They always turn into water', 'They reduce disposal cost'],
        explanation: 'Chemical compatibility must be considered during storage and waste collection.',
      },
      {
        prompt: 'A corrosive liquid splashes into a technician’s eyes. What should happen first?',
        correct: 'Begin immediate eyewash flushing according to the emergency procedure',
        wrong: ['Complete the experiment first', 'Search the internet for the chemical', 'Cover the eyes and wait for a supervisor'],
        explanation: 'Emergency decontamination should begin immediately, followed by required reporting and medical evaluation.',
      },
    ],
  },
  {
    domain: 'd4', topic: 't4_3', lesson: 'les_percent_solutions',
    items: [
      {
        prompt: 'How many grams of solute are required to prepare 250 mL of a 4% w/v solution?',
        correct: '10 g',
        wrong: ['4 g', '25 g', '100 g'],
        explanation: '4% w/v means 4 g per 100 mL. For 250 mL: 4 × 2.5 = 10 g.',
      },
      {
        prompt: 'What does 70% v/v ethanol mean?',
        correct: '70 mL ethanol per 100 mL final solution',
        wrong: ['70 g ethanol per 100 mL water', '70 mL water plus 100 mL ethanol', '70 g ethanol per 100 g solution'],
        explanation: '% v/v expresses milliliters of liquid component per 100 mL final solution.',
      },
      {
        prompt: 'A student dissolves 5 g NaCl and then adds 100 mL water. Why is this not necessarily the same as preparing 5% w/v NaCl?',
        correct: '5% w/v requires 5 g in a final solution volume of 100 mL',
        wrong: ['NaCl cannot be expressed as % w/v', 'A 5% solution must contain 50 g', 'Water cannot be used as a solvent'],
        explanation: 'Percent w/v is based on final solution volume, not simply the amount of solvent added.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'How much liquid solute is needed for 500 mL of a 10% v/v solution?',
        correct: '50 mL',
        wrong: ['5 mL', '10 mL', '100 mL'],
        explanation: '10 mL per 100 mL scaled to 500 mL requires 50 mL solute.',
      },
    ],
  },
  {
    domain: 'd4', topic: 't4_4', lesson: 'les_metric_analysis',
    items: [
      {
        prompt: 'Convert 750 µL to mL.',
        correct: '0.750 mL',
        wrong: ['7.50 mL', '75 mL', '0.075 mL'],
        explanation: '1000 µL = 1 mL, so 750 µL = 0.750 mL.',
      },
      {
        prompt: 'Convert 2.5 mg to µg.',
        correct: '2500 µg',
        wrong: ['0.0025 µg', '25 µg', '250 µg'],
        explanation: '1 mg = 1000 µg. Therefore 2.5 mg = 2500 µg.',
      },
      {
        prompt: 'Which dimensional-analysis setup correctly converts 500 µL to mL?',
        correct: '500 µL × (1 mL / 1000 µL)',
        wrong: ['500 µL × (1000 mL / 1 µL)', '500 µL × (1 µL / 1000 mL)', '500 µL + 1000 mL'],
        explanation: 'The conversion factor must place µL in the denominator so it cancels.',
      },
      {
        prompt: 'A calculated conversion says 2 mL equals 0.002 µL. What is the best conclusion?',
        correct: 'The conversion direction is wrong because a smaller unit should have a larger numerical value',
        wrong: ['The result is correct', 'Liters and microliters are unrelated', 'Only temperature could explain the result'],
        explanation: '2 mL = 2000 µL. A reasonableness check catches the incorrect order of magnitude.',
        difficulty: 'Moderate',
      },
    ],
  },
  {
    domain: 'd5', topic: 't5_1', lesson: 'les_nucleic_acids',
    items: [
      {
        prompt: 'Which base pairs with guanine in double-stranded DNA?',
        correct: 'Cytosine',
        wrong: ['Adenine', 'Thymine', 'Uracil'],
        explanation: 'Guanine pairs with cytosine through complementary base pairing.',
      },
      {
        prompt: 'What forms the covalent backbone of a DNA strand?',
        correct: 'Sugar-phosphate units linked by phosphodiester bonds',
        wrong: ['Hydrogen bonds between bases', 'Peptide bonds between amino acids', 'Disulfide bonds between nucleotides'],
        explanation: 'Phosphodiester bonds connect nucleotides along the sugar-phosphate backbone.',
      },
      {
        prompt: 'If one DNA strand is 5′-ATGCC-3′, which sequence is its antiparallel complement?',
        correct: '3′-TACGG-5′',
        wrong: ['5′-TACGG-3′', '3′-ATGCC-5′', '5′-UACGG-3′'],
        explanation: 'DNA strands are complementary and antiparallel.',
        difficulty: 'Moderate',
      },
      {
        prompt: 'Which base is normally found in RNA in place of thymine?',
        correct: 'Uracil',
        wrong: ['Cytosine', 'Guanine', 'Adenine'],
        explanation: 'RNA normally contains uracil rather than thymine.',
      },
    ],
  },
  {
    domain: 'd6', topic: 't6_3', lesson: 'les_sops',
    items: [
      {
        prompt: 'A technician finds that the printed SOP at the bench is an obsolete revision. What should they do?',
        correct: 'Stop and obtain the current approved version before continuing',
        wrong: ['Use the old version because it is familiar', 'Write the new steps into the old copy from memory', 'Ignore revision numbers if the title matches'],
        explanation: 'Controlled work should be performed using the current effective SOP.',
      },
      {
        prompt: 'What is the purpose of change control?',
        correct: 'Formally evaluate, approve, document, and implement planned changes',
        wrong: ['Hide deviations from reviewers', 'Allow technicians to edit procedures freely', 'Replace the need for training'],
        explanation: 'Change control ensures planned changes are assessed and authorized before implementation.',
      },
      {
        prompt: 'A technician accidentally performs one step outside the approved procedure. What is this generally called?',
        correct: 'A deviation',
        wrong: ['A calibration', 'A standard curve', 'A positive control'],
        explanation: 'A deviation is a departure from an approved procedure or expected condition.',
      },
      {
        prompt: 'Why is an SOP effective date important?',
        correct: 'It identifies when the approved revision becomes authorized for use',
        wrong: ['It shows when every reagent expires', 'It replaces the document version', 'It determines instrument voltage'],
        explanation: 'Controlled documents use approval/version/effective-date information to define the authorized procedure.',
      },
    ],
  },
  {
    domain: 'd7', topic: 't7_3', lesson: 'les_rotors',
    items: [
      {
        prompt: 'A high-speed centrifuge rotor has visible pitting and corrosion. What should the technician do?',
        correct: 'Remove it from service and follow the inspection/maintenance procedure',
        wrong: ['Run it at maximum speed to test it', 'Cover the pitting with tape', 'Use it only for short runs'],
        explanation: 'Rotor damage can lead to catastrophic failure and requires evaluation before reuse.',
      },
      {
        prompt: 'Which statement about a rotor speed rating is correct?',
        correct: 'The rotor should not be operated above its manufacturer-rated limit',
        wrong: ['The rating can be exceeded for short runs', 'Only tube ratings matter', 'Speed limits apply only to empty rotors'],
        explanation: 'Rotor speed ratings are critical safety limits.',
      },
      {
        prompt: 'What is a common difference between a fixed-angle and swinging-bucket rotor?',
        correct: 'The tubes remain angled in a fixed-angle rotor but swing outward in a swinging-bucket rotor',
        wrong: ['Only fixed-angle rotors require balancing', 'Swinging-bucket rotors cannot pellet particles', 'Fixed-angle rotors have no maximum speed'],
        explanation: 'Rotor geometry affects tube orientation and pellet location during centrifugation.',
      },
      {
        prompt: 'A centrifuge produces an unusual knocking sound during acceleration. What is the best action?',
        correct: 'Stop safely and inspect rotor seating, buckets, tubes, and balance',
        wrong: ['Increase speed to stabilize it', 'Open the lid while spinning', 'Continue if no error code appears'],
        explanation: 'Abnormal noise can signal unsafe setup or mechanical issues and should be investigated.',
      },
    ],
  },
  {
    domain: 'd8', topic: 't8_3', lesson: 'les_data_integrity_stats',
    items: [
      {
        prompt: 'A 100.0 g standard is measured repeatedly as 95.0, 95.1, 94.9, and 95.0 g. How should these results be described?',
        correct: 'Precise but inaccurate',
        wrong: ['Accurate but imprecise', 'Both accurate and precise', 'Neither precision nor accuracy can be assessed'],
        explanation: 'The values are tightly grouped but consistently far from the true value, indicating precision with systematic bias.',
      },
      {
        prompt: 'A single replicate is far from all others. What is the best first response?',
        correct: 'Investigate possible error or legitimate variation before deciding whether exclusion is justified',
        wrong: ['Delete it automatically', 'Average it twice', 'Change it to match the mean'],
        explanation: 'Outliers require documented investigation and predefined criteria; they are not removed merely for being inconvenient.',
      },
      {
        prompt: 'What is the main benefit of running replicate measurements?',
        correct: 'They provide information about variability and repeatability',
        wrong: ['They guarantee accuracy', 'They eliminate the need for controls', 'They make calibration unnecessary'],
        explanation: 'Replicates help characterize random variation and consistency.',
      },
      {
        prompt: 'Which practice best supports data integrity?',
        correct: 'Keeping failed runs and unexpected results traceable in the record',
        wrong: ['Reporting only results that agree with the hypothesis', 'Deleting failed controls after rerunning', 'Replacing outliers with the mean'],
        explanation: 'Complete, traceable data—including failed and unexpected results—supports honest scientific interpretation.',
      },
    ],
  },
];

const letters = ['a', 'b', 'c', 'd'];

const makeQuestion = (bank: TopicBank, item: Item, itemIndex: number): Question => {
  const choices = [item.correct, ...item.wrong]
    .map((choice_text, index) => ({
      choice_text,
      is_correct: index === 0,
      sort: ((itemIndex + 1) * 7 + index * 3) % 11,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ choice_text, is_correct }, index) => ({
      id: `c_${bank.topic}_coverage_${itemIndex + 1}_${letters[index]}`,
      choice_text,
      is_correct,
    }));

  return {
    id: `q_${bank.topic}_coverage_${itemIndex + 1}`,
    domain_id: bank.domain,
    topic_id: bank.topic,
    lesson_id: bank.lesson,
    question_type: 'scenario_based',
    difficulty: item.difficulty || 'Moderate',
    question_text: item.prompt,
    explanation: item.explanation,
    active: true,
    choices,
    created_at: '2026-09-28T00:00:00Z',
  };
};

export const COVERAGE_EXPANSION_QUESTIONS: Question[] = banks.flatMap((bank) =>
  bank.items.map((item, index) => makeQuestion(bank, item, index))
);
