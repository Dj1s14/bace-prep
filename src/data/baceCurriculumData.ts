import { BenchSkillTopic, LabActivityScenario, Question } from '../types/database';

/**
 * Detailed 4-Dimension Technician Bench Skill Modules derived directly from BACE Curriculum Decks.
 * Framework:
 * 1. Concept (Core Idea & Important Language: Purpose, Condition, Evidence)
 * 2. Bench Use (Where in lab, Procedure Awareness, Material Details)
 * 3. Interpreting (What to Notice, Signs of a Valid Result, Connecting Result to Decision)
 * 4. Quality & Error Points (Common Problem, Prevention, Impact on Work)
 */
export const BACE_BENCH_MODULES: Record<string, BenchSkillTopic[]> = {
  // --------------------------------------------------------------------------
  // DOMAIN 1 / 5: Biotechnology Skills - Micropipettes & Serological Pipets
  // --------------------------------------------------------------------------
  les_pipette: [
    {
      title: 'Micropipette Range Selection',
      core_idea: 'Micropipettes measure microliter volumes and must be used within their rated volume range for maximum accuracy and precision.',
      purpose: 'Deliver accurate microliter volumes within manufacturer tolerance without mechanical damage.',
      condition: 'When setting volumes between 0.1 µL and 1000 µL for assays, master mixes, or dilutions.',
      evidence: 'Volumetric calibration gravimetric test values within specified limits (±1% to ±3%).',
      where_in_lab: 'Used during setup, execution, and master mix preparation for PCR, enzymatic digests, and serial dilutions.',
      procedure_awareness: [
        'Match the pipette model (P10, P20, P200, P1000) to the target volume; choose the smallest nominal pipette that fits the volume.',
        'Follow SOP rather than habit; operate in the top 30–100% of the instrument capacity whenever possible.',
        'Keep digital volume indicators visible and locked before aspirating.'
      ],
      material_details: [
        'Sample viscosity, temperature, and surface tension affect volume delivery.',
        'Immersion depth: 1–2 mm for P2/P10/P20, and 2–4 mm for P200/P1000.',
        'Documentation connects pipetted volume to the final analytical result.'
      ],
      what_to_notice: 'Accuracy is strongest when set volume is within the rated range; dialing beyond upper or lower stops strips the calibration threading.',
      signs_of_valid_result: [
        'Tip fills without air bubbles or foam.',
        'No liquid remains in the tip after second-stop blowout.',
        'Replicate deliveries show low standard deviation.'
      ],
      connecting_to_decision: [
        'Do not use a pipette whose volume setting slips or feels loose.',
        'If liquid leaks from the tip while holding vertically, check tip seating or replace piston seal.',
        'Consider whether the selected volume requires a positive-displacement pipette instead (e.g. for glycerol or detergents).'
      ],
      common_problems: [
        'Using a P1000 for tiny volumes (e.g. 30 µL) or dialing beyond mechanical limits.',
        'Depressing the plunger to the second stop before entering the sample fluid.'
      ],
      prevention: [
        'Check labels and volume limits before starting.',
        'Use the correct tips matching the pipette brand/model.',
        'Pause and verify target volume against the SOP.'
      ],
      impact_on_work: [
        'Errors affect assay accuracy, enzyme stoichiometry, and regulatory compliance.',
        'Document deviations and submit out-of-spec pipettes for recalibration.'
      ]
    },
    {
      title: 'Pipetting Technique & Forward vs. Reverse Pipetting',
      core_idea: 'Forward pipetting is standard for aqueous liquids; reverse pipetting delivers accurate volumes for viscous, volatile, or foamy liquids.',
      purpose: 'Ensure complete, bubble-free transfer and minimize volume variability.',
      condition: 'Aqueous buffers use forward mode; glycerol, serum, protein concentrates, or detergents use reverse mode.',
      evidence: 'Uniform delivery mass and lack of droplet retention inside disposable tip.',
      where_in_lab: 'Applied during reagent dispensing, dilution plating, and optical assay setup.',
      procedure_awareness: [
        'Forward: Press to 1st stop to aspirate; press to 2nd stop to dispense.',
        'Reverse: Press to 2nd stop to aspirate; press to 1st stop only to dispense (retaining excess in tip).',
        'Hold pipette vertically (90°) during aspiration; dispense at 45° against tube wall.'
      ],
      material_details: [
        'Pre-wetting the tip 2–3 times equilibrates vapor pressure and improves precision.',
        'Smooth plunger movement prevents liquid splashing into the barrel filter.'
      ],
      what_to_notice: 'Viscous liquids require slower aspiration and dispensing speeds to allow fluid displacement.',
      signs_of_valid_result: [
        'No liquid drawn into barrel or filter.',
        'Dispensed droplet adheres cleanly to tube wall without aerosols.'
      ],
      connecting_to_decision: [
        'If liquid foams during forward pipetting, switch to reverse pipetting for that reagent.',
        'Never release the plunger rapidly like a spring.'
      ],
      common_problems: [
        'Fast release causing aerosol contamination of the internal shaft.',
        'Touching non-sterile tube surfaces with tip exterior.'
      ],
      prevention: [
        'Practice smooth thumb cadence; pause 1 second after aspiration before pulling tip out.',
        'Pre-wet tips when working with organic solvents or warm solutions.'
      ],
      impact_on_work: [
        'Technique variation directly translates into replicate spread and assay invalidation.'
      ]
    },
    {
      title: 'Serological Pipets & Pipette Controllers',
      core_idea: 'Serological pipets transfer milliliter volumes (1–50 mL) using motorized or manual pipette aids for media, buffers, and bulk reagents.',
      purpose: 'Provide measured volumetric transfers of bulk liquids under sterile or non-sterile conditions.',
      condition: 'When liquid volumes exceed 1.0 mL up to 50 mL in tissue culture, solution preparation, or cell harvesting.',
      evidence: 'Clear meniscus alignment with graduation markings and sterile packaging integrity.',
      where_in_lab: 'Biosafety cabinets for mammalian culture, fermentation vessels, and buffer carboys.',
      procedure_awareness: [
        'Inspect sterile wrapper integrity before opening; open inside sterile field.',
        'Seat pipet firmly into rubber collet of motorized aid without excessive force.',
        'Read volume at the bottom of the meniscus at direct eye level.'
      ],
      material_details: [
        'Cotton plug at top prevents accidental liquid ingress into controller mechanism.',
        'Overdrawing liquid wets the hydrophobic barrier filter, stopping aspiration.'
      ],
      what_to_notice: 'Graduations allow volume measurement, but precision is lower than volumetric flasks for preparing primary analytical standards.',
      signs_of_valid_result: [
        'Meniscus rests squarely on graduation mark.',
        'No drips or bubbling during transfer.'
      ],
      connecting_to_decision: [
        'If the cotton plug is wetted, immediately discard pipet and replace controller filter.',
        'Do not touch pipet tip to non-sterile surfaces or outer wrapper.'
      ],
      common_problems: [
        'Overdrawing fluid into pipette controller by holding aspirate trigger too long.',
        'Parallax error from reading meniscus from an angle.'
      ],
      prevention: [
        'Operate controller at lower speed setting for small volumes.',
        'Keep pipet vertical when aligning meniscus.'
      ],
      impact_on_work: [
        'Contamination of pipet controller can spread mycoplasma or mold to dozens of culture flasks.'
      ]
    },
    {
      title: 'Pipette Care, Decontamination & Calibration Verification',
      core_idea: 'Pipettes require clean handling, vertical stand storage, seal integrity leak checks, and scheduled gravimetric calibration.',
      purpose: 'Maintain volumetric accuracy, prevent cross-contamination, and satisfy GLP/cGMP audit standards.',
      condition: 'Daily before critical assays, after suspected contamination, and on a quarterly/annual calibration schedule.',
      evidence: 'Signed and dated calibration sticker, gravimetric water weigh-in records within tolerance limits.',
      where_in_lab: 'Metrology benches, QC testing suites, and daily bench setup.',
      procedure_awareness: [
        'Perform daily 3-point water weigh check on analytical balance (minimum, mid, nominal volume).',
        'Store pipettes vertically on carousel or wall racks; NEVER lay flat on bench with or without tips.',
        'Wipe exterior with 70% isopropanol; autoclave shafts only if certified by manufacturer.'
      ],
      material_details: [
        'Deionized water density changes with temperature (use Z-factor in gravimetric calculations).',
        'Corrosive vapors from acids or chloroform degrade internal Viton O-rings.'
      ],
      what_to_notice: 'Droplet formation at tip tip during a 10-second hold indicates an air leak in the seal or cracked shaft.',
      signs_of_valid_result: [
        'Calculated mean mass matches expected volume within acceptable inaccuracy (%E) and precision (%CV).',
        'Plunger action is smooth without grating or sticking.'
      ],
      connecting_to_decision: [
        'If a pipette fails gravimetric check, quarantine with a red "OUT OF SERVICE" tag immediately.',
        'Notify QA and investigate any patient or release data generated since last verified calibration.'
      ],
      common_problems: [
        'Dropping pipettes onto floor, knocking pistons out of alignment.',
        'Storing horizontal on bench causing liquid backflow into piston chamber.'
      ],
      prevention: [
        'Always place on dedicated carousel.',
        'Use barrier/filter tips for volatile chemicals and radioactive or infectious agents.'
      ],
      impact_on_work: [
        'Uncalibrated pipettes invalidate all quantitative QC release testing and research data.'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // DOMAIN 4 / 6: Regulation & Quality - cGMP, GLP, GDP & Quality Systems
  // --------------------------------------------------------------------------
  les_cgmp_gdp: [
    {
      title: 'Good Documentation Practices (GDP) & ALCOA Principles',
      core_idea: 'Good Documentation Practices ensure records are Attributable, Legible, Contemporaneous, Original, and Accurate (ALCOA).',
      purpose: 'Provide legally defensible, traceable, and reconstructible records of all biotechnology operations.',
      condition: 'Applies to every entry in lab notebooks, batch production records, equipment logbooks, and electronic systems.',
      evidence: 'Indelible ink entries, contemporaneous signatures, intact audit trails, and documented correction codes.',
      where_in_lab: 'Manufacturing floor, QC analytical suites, receiving dock, and R&D notebooks.',
      procedure_awareness: [
        'Record data immediately as work is performed (Contemporaneous), never from memory or rough notes.',
        'Write in indelible blue or black ink; never use pencils, erasable pens, or correction fluid.',
        'Ensure all entries are signed, dated, and unambiguous.'
      ],
      material_details: [
        'Equipment ID numbers, reagent lot numbers, and expiration dates must be captured in the record.',
        'Never leave blank spaces: draw a "Z-line" through unused spaces and sign/date.'
      ],
      what_to_notice: 'Records must allow another qualified person to completely reconstruct what happened years later.',
      signs_of_valid_result: [
        'Document is complete, legible, properly signed, and all attachments permanently affixed.'
      ],
      connecting_to_decision: [
        'Never sign for another person or document a step you did not directly perform or witness.',
        'Pause and notify QA if a page or entry is missing or damaged.'
      ],
      common_problems: [
        'Backdating entries, copying from memory, using White-Out, or writing data on glove fingers.',
        'Missing units, dates without years, or vague initials.'
      ],
      prevention: [
        'Bring official batch record to the active workspace; record values immediately.',
        'Review records for completeness before ending each shift.'
      ],
      impact_on_work: [
        'Data integrity infractions lead to FDA 483 warning letters, batch rejection, and product recalls.'
      ]
    },
    {
      title: 'Single-Strike Error Corrections & Record Traceability',
      core_idea: 'Documentation corrections must preserve the original entry while showing the corrected value, reason, date, and initials.',
      purpose: 'Maintain complete historical transparency without obscuring original raw observations.',
      condition: 'Whenever an error is made in a physical GMP/GLP record or laboratory notebook.',
      evidence: 'Single horizontal strike-through line, legible original value, corrected entry, date, initials, and reason code.',
      where_in_lab: 'All paper batch records, calibration logs, QC test reports, and notebook pages.',
      procedure_awareness: [
        'Draw ONE straight line through incorrect text; ensure original text remains 100% legible.',
        'Write correct entry adjacent to error.',
        'Add technician initials, current date (date of correction), and reason (e.g. EE = Entry Error).'
      ],
      material_details: [
        'Use straight edge ruler for neatness; avoid multiple crossed lines or scribbles.',
        'Reason codes must comply with institutional SOP (e.g. CE = Calculation Error, TE = Transposition Error).'
      ],
      what_to_notice: 'A proper correction makes the chronological evolution of the entry completely understandable.',
      signs_of_valid_result: [
        'Both original and corrected values are fully legible to QA auditors.'
      ],
      connecting_to_decision: [
        'If a correction changes product release disposition, formal QA countersignature is required.',
        'Never erase, write over numbers, or obliterate errors.'
      ],
      common_problems: [
        'Using correction fluid, scribbling over numbers, or backdating the correction to yesterday.'
      ],
      prevention: [
        'Train on single-strike procedure during orientation; audit notebooks weekly.'
      ],
      impact_on_work: [
        'Obscuring data triggers regulatory suspicion of fraud and invalidates clinical batches.'
      ]
    },
    {
      title: 'GLP vs. CGMP & Controlled Operations',
      core_idea: 'GLP governs nonclinical safety testing; CGMP governs commercial manufacturing to ensure product identity, strength, and purity.',
      purpose: 'Ensure preclinical data integrity (GLP) and consistent quality built into commercial pharmaceutical lots (CGMP).',
      condition: 'GLP applies during animal and safety toxicology studies; CGMP applies during clinical trial and commercial drug production.',
      evidence: 'Approved Study Protocols and Final Reports (GLP); Master Production and Control Records (CGMP).',
      where_in_lab: 'Translational research vivariums (GLP), cleanrooms, formulation, and aseptic fill-finish suites (CGMP).',
      procedure_awareness: [
        'Quality must be built into the manufacturing process from start to finish, not merely tested into final product.',
        'Validate all processes and qualify all equipment (IQ/OQ/PQ) before routine use.',
        'Adhere strictly to active, approved SOP revisions; unauthorized shortcuts are strictly forbidden.'
      ],
      material_details: [
        'Raw materials must be tested and formally released by QC before production use.',
        'Environmental monitoring (particulates, bioburden) verifies cleanroom classification (ISO 5, 7, 8).'
      ],
      what_to_notice: 'Controlled operations minimize variability in materials, personnel, equipment, and environmental conditions.',
      signs_of_valid_result: [
        'Lot-to-lot consistency within tight analytical specifications; batch records executed without unresolved deviations.'
      ],
      connecting_to_decision: [
        'If equipment qualification lapses, suspend production immediately until re-qualified.'
      ],
      common_problems: [
        'Assuming clean final release testing excuses undocumented manufacturing excursions.'
      ],
      prevention: [
        'Implement automated environmental controls and preventive maintenance schedules.'
      ],
      impact_on_work: [
        'Regulatory shut-down, consent decrees, and potential patient injury from adulterated medicine.'
      ]
    },
    {
      title: 'Deviations, Investigations, CAPA & Change Control',
      core_idea: 'Quality systems identify unplanned departures (deviations), investigate root causes, implement CAPA, and manage planned modifications via change control.',
      purpose: 'Prevent recurrence of defects and ensure changes do not introduce unintended safety or quality risks.',
      condition: 'Deviations are filed for unexpected events; Change Controls are filed prior to intentional procedure/equipment modifications.',
      evidence: 'Deviation reports, root-cause 5-Why analysis, CAPA closure records, and change control approvals.',
      where_in_lab: 'Quality engineering, operations management, and analytical testing facilities.',
      procedure_awareness: [
        'Report all deviations immediately upon discovery; never ignore a small excursion.',
        'Perform root-cause analysis (e.g. Fishbone diagram, 5 Whys) rather than immediately blaming "human error".',
        'Verify CAPA effectiveness after implementation (e.g. 6-month recurrence review).'
      ],
      material_details: [
        'Define affected lot numbers, raw materials, and quarantine status of suspect products.',
        'Change control requires pre-approval by Quality Assurance before implementing any modification.'
      ],
      what_to_notice: 'Trend analysis of minor deviations often uncovers systemic equipment or procedural vulnerabilities before catastrophic failure occurs.',
      signs_of_valid_result: [
        'Root cause identified with objective data; zero recurrence of issue following CAPA closure.'
      ],
      connecting_to_decision: [
        'Do not release quarantined batch until deviation investigation is formally closed by QA.',
        'Never implement an "improved" shortcut without an approved Change Control Request (CCR).'
      ],
      common_problems: [
        'Defaulting to "retrain technician" without fixing confusing SOP instructions or faulty equipment.',
        'Closing CAPA without an objective effectiveness verification step.'
      ],
      prevention: [
        'Maintain a non-punitive reporting safety culture where near-misses are investigated transparently.'
      ],
      impact_on_work: [
        'Recurring deviations signal a broken quality management system to regulatory inspectors.'
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // DOMAIN 8: Experimental Design & Data Analysis
  // --------------------------------------------------------------------------
  les_controls_variables: [
    {
      title: 'Testable Hypotheses, Variables & Experimental Rigor',
      core_idea: 'Scientific experiments test falsifiable hypotheses by manipulating a single independent variable and measuring the dependent variable while controlling all other factors.',
      purpose: 'Isolate clear cause-and-effect relationships and ensure scientific validity and reproducibility.',
      condition: 'During protocol design, method validation, assay optimization, and root-cause investigations.',
      evidence: 'Hypothesis statement predicting directional relationship; defined quantitative measurement metric.',
      where_in_lab: 'Pre-experimental protocol planning, R&D design of experiments (DOE), and study protocols.',
      procedure_awareness: [
        'Independent Variable (X-axis): the single parameter deliberately altered by the investigator (e.g. enzyme concentration).',
        'Dependent Variable (Y-axis): the measured quantitative response (e.g. optical absorbance at 405 nm).',
        'Controlled Variables: incubation temperature, buffer pH, volume, pipetting technique, reagent lots held constant.'
      ],
      material_details: [
        'Ensure measuring instruments possess appropriate resolution for the dependent variable.',
        'Sample size must provide sufficient statistical power.'
      ],
      what_to_notice: 'Varying multiple parameters simultaneously prevents knowing which factor caused the observed change.',
      signs_of_valid_result: [
        'Response correlates with treatment; controlled variables show zero drift across experimental runs.'
      ],
      connecting_to_decision: [
        'If a controlled variable fluctuates (e.g. incubator temperature spiked 5°C), mark run as invalid and repeat.',
        'Separate factual observations from interpretative conclusions.'
      ],
      common_problems: [
        'Formulating untestable, opinion-based questions; changing two variables at the same time.'
      ],
      prevention: [
        'Write out experimental variable matrix and get peer review before preparing bench reagents.'
      ],
      impact_on_work: [
        'Confounded variables produce unpublishable results and waste expensive biological materials.'
      ]
    },
    {
      title: 'Negative, Positive, Vehicle Controls & Blanks',
      core_idea: 'Experimental controls prove the assay functions as intended: positive controls verify reactivity, negative controls detect contamination, and vehicle controls rule out solvent effects.',
      purpose: 'Provide the baseline comparison necessary to validate or invalidate experimental conclusions.',
      condition: 'Mandatory in every analytical run, PCR assay, ELISA plate, and cell culture experiment.',
      evidence: 'Positive control demonstrates expected signal; negative control shows zero/background signal.',
      where_in_lab: 'Every analytical microplate, gel electrophoresis lane, and chemical assay run.',
      procedure_awareness: [
        'Negative Control: omit analyte or template (e.g. water in PCR) to ensure reagents are free of contamination.',
        'Positive Control: include known verified standard to prove reagents, primers, and instrument are working.',
        'Vehicle Control: treat with carrier solvent alone (e.g. 0.1% DMSO or ethanol) to differentiate drug effect from vehicle toxicity.',
        'Blank: subtract background absorbance from buffer or reagents alone.'
      ],
      material_details: [
        'Controls must be treated identically to experimental samples through all processing steps.',
        'Vehicle concentration must match exactly across all test wells.'
      ],
      what_to_notice: 'A positive signal in a negative control (e.g. band in PCR no-template control) indicates contamination.',
      signs_of_valid_result: [
        'All controls meet predefined acceptance criteria before reading unknown samples.'
      ],
      connecting_to_decision: [
        'CRITICAL RULE: Never interpret unknowns if controls fail! Address failed controls first.',
        'If negative control amplifies, discard all data and discard suspect reagent aliquots.'
      ],
      common_problems: [
        'Reporting positive patient or experimental results when negative control failed.',
        'Omitting vehicle control when using hydrophobic compounds dissolved in organic solvents.'
      ],
      prevention: [
        'Load controls on every plate/gel; establish strict pass/fail criteria in SOP.'
      ],
      impact_on_work: [
        'False positives or false negatives compromise patient diagnostics and regulatory submissions.'
      ]
    },
    {
      title: 'Technical vs. Biological Replicates & Random vs. Systematic Error',
      core_idea: 'Technical replicates assess measurement precision; biological replicates assess organismal variation. Random error causes scatter; systematic error introduces consistent directional bias.',
      purpose: 'Quantify experimental variation, eliminate bias, and distinguish true biological effect from instrument noise.',
      condition: 'When establishing sample numbers, calculating standard deviation, and calibrating instruments.',
      evidence: 'Standard deviation (SD), coefficient of variation (%CV), and recovery percentage of certified reference materials.',
      where_in_lab: 'Assay validation, QC release testing, standard curve construction, and statistical analysis.',
      procedure_awareness: [
        'Technical Replicates: testing the SAME biological sample in triplicate (e.g. 3 wells from 1 lysate tube) to evaluate pipetting and instrument precision.',
        'Biological Replicates: testing INDEPENDENT biological specimens (e.g. 3 distinct animal cell cultures) to evaluate biological variation.',
        'Systematic Error (Bias): caused by a decalibrated pipette, contaminated blank, or wrong standard value; shifts all data in one direction.',
        'Random Error: caused by electrical noise, draft air currents, or minor thumb pressure variations; causes scatter around mean.'
      ],
      material_details: [
        'Repeating a method with systematic bias 100 times does NOT eliminate the error.',
        'Increasing technical replicates reduces the uncertainty of the mean for random error.'
      ],
      what_to_notice: 'A method can have outstanding precision (replicates agree within 0.5%) but be completely inaccurate if biased.',
      signs_of_valid_result: [
        'Replicates show low %CV (<5% for bioassays); recovery of known standards is 95–105%.'
      ],
      connecting_to_decision: [
        'If all replicates are consistently 20% below expected reference value, check instrument calibration and standard preparation.',
        'Never confuse technical replicates with biological replicates when claiming a biological finding.'
      ],
      common_problems: [
        'Treating 3 wells from one mouse as N=3 biological replicates (pseudo-replication).',
        'Ignoring systematic bias because standard deviation is low.'
      ],
      prevention: [
        'Regularly test certified reference materials; randomize plate layouts to avoid edge effects.'
      ],
      impact_on_work: [
        'Biased analytical assays lead to releasing sub-potent or toxic pharmaceutical batches.'
      ]
    },
    {
      title: 'Standard Curves, Interpolation & Outlier Management',
      core_idea: 'Standard curves relate known standard concentrations to instrument response (absorbance/fluorescence) to interpolate unknown sample concentrations within the linear dynamic range.',
      purpose: 'Accurately convert optical or physical assay signals into chemical concentration units.',
      condition: 'ELISA, Bradford/BCA protein assays, qPCR quantitation, and chromatography peak area analysis.',
      evidence: 'Linear regression equation (y = mx + b), model-fit and control acceptance under the validated procedure, and interpolation within the tested standard range.',
      where_in_lab: 'Spectrophotometer software, plate reader analysis, and QC quantitative release reports.',
      procedure_awareness: [
        'Plot standard concentration on X-axis and instrument signal (Absorbance) on Y-axis.',
        'Interpolate unknown: x = (y - b) / m. If sample was diluted by factor DF, multiply result by DF.',
        'Never extrapolate beyond the highest or lowest standard on the curve.',
        'Evaluate outliers using documented statistical criteria (e.g. Dixon Q-test, Grubbs test) or identifiable laboratory errors; NEVER delete data points arbitrarily.'
      ],
      material_details: [
        'Prepare standards fresh from primary reference stock; verify pipetting precision.',
        'Ensure blank is subtracted before generating regression line.'
      ],
      what_to_notice: 'A high R² value does not compensate for poor standards, bad blanks, or readings exceeding detector saturation (>2.0 AU).',
      signs_of_valid_result: [
        'Standard points fall on linear trendline; unknown absorbance values sit comfortably within mid-curve range (0.2–0.8 AU).'
      ],
      connecting_to_decision: [
        'If an unknown sample absorbance is above the top standard, dilute the sample (e.g. 1:5 or 1:10) and re-assay.',
        'If the calibration or required controls fail the specified criteria, investigate and follow the approved repeat-testing procedure.'
      ],
      common_problems: [
        'Arbitrarily deleting a data point because it doesn\'t fit expectations without documenting a technical cause.',
        'Extrapolating when unknown is darker than the highest standard.'
      ],
      prevention: [
        'Use pre-set sample dilutions; run standards in duplicate or triplicate.'
      ],
      impact_on_work: [
        'Inappropriate extrapolation or deletion of outliers leads to false purity or concentration reporting.'
      ]
    }
  ]
};

/**
 * Real-world Interactive Laboratory Decision & Troubleshooting Activities
 * Directly adapted from the "Quality & Error Points" and "Interpreting" slides.
 */
export const BACE_LAB_ACTIVITIES: Record<string, LabActivityScenario[]> = {
  les_pipette: [
    {
      id: 'act_pip_1',
      title: 'Viscous Liquid Transfer Dilemma',
      scenario: 'You are preparing an enzyme storage buffer containing 80% glycerol and 1% Triton X-100 detergent. When using a P200 with standard forward pipetting, you notice air bubbles being drawn into the tip and liquid clinging to the outside and inside walls, resulting in under-delivery.',
      options: [
        {
          id: 'opt_1',
          text: 'Dial the pipette 20% higher than the target volume to compensate for the fluid loss.',
          is_correct: false,
          feedback: 'Incorrect. Arbitrarily altering volume settings violates SOP discipline and produces uncalibrated, erratic results.'
        },
        {
          id: 'opt_2',
          text: 'Switch to reverse pipetting: push plunger to second stop to aspirate, and depress to first stop only to dispense, allowing the excess to remain in the tip.',
          is_correct: true,
          feedback: 'Correct! Reverse pipetting is specifically designed for viscous (glycerol) and foaming (detergent) liquids. Depressing to the second stop aspirates excess volume, and stopping at the first stop dispenses the exact calibrated amount without bubbles.'
        },
        {
          id: 'opt_3',
          text: 'Pump the plunger rapidly 10 times inside the stock bottle to decrease viscosity through thermal friction.',
          is_correct: false,
          feedback: 'Incorrect. Rapid pumping creates massive foaming and shears biomolecules without fixing the fluid delivery mechanism.'
        },
        {
          id: 'opt_4',
          text: 'Hold the pipette horizontally on the bench while aspirating to reduce gravitational head pressure.',
          is_correct: false,
          feedback: 'Incorrect. Laying a pipette horizontally causes fluid to enter the piston chamber, causing corrosion and cross-contamination.'
        }
      ],
      explanation: 'For viscous fluids (like glycerol) and foaming detergents, forward pipetting fails due to surface tension and fluid drag. Reverse pipetting aspirates an excess by starting at the 2nd stop and dispenses only to the 1st stop, ensuring accurate delivery.',
      bace_competency: 'Domain 1 & 5: Liquid-Handling & Volumetric Equipment - Reverse Pipetting'
    },
    {
      id: 'act_pip_2',
      title: 'Gravimetric Verification & Quality Control',
      scenario: 'You are performing a monthly calibration check on a P1000 micropipette. You set the dial to 1000 µL and dispense pure deionized water onto an analytical balance across 5 replicate deliveries. The recorded masses in grams are: 0.942 g, 0.945 g, 0.940 g, 0.943 g, and 0.941 g (Water density at 20°C = 0.9982 g/mL, expected mass ~0.998 g).',
      options: [
        {
          id: 'opt_1',
          text: 'Accept the pipette because the replicate precision is very tight (low standard deviation).',
          is_correct: false,
          feedback: 'Incorrect. Precision does not equal accuracy! Even though replicates are close to each other, the instrument is systematically under-delivering by ~5.7% (well outside the ±1% BACE/ISO tolerance).'
        },
        {
          id: 'opt_2',
          text: 'Quarantine the pipette with an "OUT OF SERVICE" tag, log the calibration excursion, and submit for servicing and seal replacement.',
          is_correct: true,
          feedback: 'Correct! The pipette exhibits systematic error (bias), consistently delivering ~942 µL instead of 1000 µL. It must be removed from service and documented according to GLP/cGMP protocols.'
        },
        {
          id: 'opt_3',
          text: 'Instruct all technicians to add 58 µL to every reading when using this instrument.',
          is_correct: false,
          feedback: 'Incorrect. Unofficial informal corrections are strictly prohibited under Good Laboratory Practices.'
        },
        {
          id: 'opt_4',
          text: 'Reweigh using a top-loading balance with 0.1 g resolution to see if the error disappears.',
          is_correct: false,
          feedback: 'Incorrect. Decreasing balance resolution hides measurement precision and violates calibration SOPs.'
        }
      ],
      explanation: 'Under-delivering by ~58 µL across all replicates demonstrates systematic bias (such as a worn internal piston seal or air leak). High precision with low accuracy is a classic sign of an out-of-calibration instrument.',
      bace_competency: 'Domain 1 & 5: Pipette Care and Calibration / Quality & Error Points'
    }
  ],

  les_cgmp_gdp: [
    {
      id: 'act_gdp_1',
      title: 'Batch Record Error Resolution',
      scenario: 'During the formulation of a clinical monoclonal antibody batch, a technician accidentally records "12.5 kg" in the batch production record when the balance display actually read "15.2 kg". The technician notices the mistake immediately.',
      options: [
        {
          id: 'opt_1',
          text: 'Carefully apply white correction fluid over "12.5 kg", wait for it to dry, and neatly write "15.2 kg".',
          is_correct: false,
          feedback: 'Incorrect. Using correction fluid (White-Out) is a severe FDA Good Documentation Practice (GDP) violation that voids the record and triggers regulatory sanctions.'
        },
        {
          id: 'opt_2',
          text: 'Draw a single horizontal line through "12.5 kg", write "15.2 kg" above it, initial, date, and record reason code "TE" (transposition error).',
          is_correct: true,
          feedback: 'Correct! The GDP Single-Strike Rule mandates: single line through the error preserving legibility of the original entry, write correct value adjacent, sign/initial, record current date, and document reason for correction.'
        },
        {
          id: 'opt_3',
          text: 'Scribble out the number completely with black ink so no one is confused by the wrong number.',
          is_correct: false,
          feedback: 'Incorrect. Obliterating or blacking out entries prevents auditors from reconstructing what originally occurred.'
        },
        {
          id: 'opt_4',
          text: 'Discard the batch record page and rewrite the entire page from memory before the QA auditor sees it.',
          is_correct: false,
          feedback: 'Incorrect. Tearing out or replacing official controlled pages is illegal data destruction under 21 CFR Part 211.'
        }
      ],
      explanation: 'Under ALCOA+ and FDA GDP guidelines, errors must be corrected with a single strike-through line so the original data remains readable. Initials, date, and reason code must accompany the change.',
      bace_competency: 'Domain 4 & 6: Good Documentation Practices & ALCOA - Corrections'
    },
    {
      id: 'act_gdp_2',
      title: 'Unapproved Shortcut vs. Change Control',
      scenario: 'A veteran biomanufacturing operator notices that reducing the centrifugation spin time from 30 minutes to 15 minutes appears to yield the same pellet density while speeding up the daily processing schedule by two hours.',
      options: [
        {
          id: 'opt_1',
          text: 'Implement the 15-minute spin immediately on today\'s commercial batch to improve operational efficiency.',
          is_correct: false,
          feedback: 'Incorrect. Changing a validated manufacturing parameter without formal Change Control constitutes an unapproved deviation and violates cGMP.'
        },
        {
          id: 'opt_2',
          text: 'Submit a formal Change Control Request (CCR) with supporting validation data, risk assessment, and QA/regulatory review before modifying the SOP.',
          is_correct: true,
          feedback: 'Correct! In cGMP regulated operations, any change to equipment, methods, or parameters must be evaluated for risk, validated through experimental evidence, approved by Quality Assurance, and updated in controlled SOPs before implementation.'
        },
        {
          id: 'opt_3',
          text: 'Use pencil to write a temporary note in the master batch record binder instructing operators to spin for 15 minutes.',
          is_correct: false,
          feedback: 'Incorrect. Pencil annotations and unauthorized SOP modifications violate document control protocols.'
        },
        {
          id: 'opt_4',
          text: 'Spin for 15 minutes, but document "30 minutes" in the batch record so the paperwork matches the registered filing.',
          is_correct: false,
          feedback: 'Incorrect. Falsification of records is a federal criminal offense under FDA Title 21 regulations.'
        }
      ],
      explanation: 'Under cGMP, quality is built into the validated process. Technicians cannot introduce shortcuts or modifications independently. Changes must proceed through the formal Change Control process with risk evaluation, validation testing, and QA approval.',
      bace_competency: 'Domain 4 & 6: Deviations, Investigations, CAPA & Change Control'
    }
  ],

  les_controls_variables: [
    {
      id: 'act_ctrl_1',
      title: 'The Contaminated No-Template Control',
      scenario: 'You run an agarose gel to analyze PCR amplicons for a diagnostic assay. The positive control shows the expected 450 bp band. Patient samples 1, 2, and 3 all show 450 bp bands. However, the No-Template Control (NTC), which contained sterile water instead of DNA, also displays a bright 450 bp band.',
      options: [
        {
          id: 'opt_1',
          text: 'Report Patient Samples 1, 2, and 3 as positive since their bands match the positive control size.',
          is_correct: false,
          feedback: 'Incorrect. CRITICAL RULE: Never interpret unknown samples when controls fail! The positive band in the negative control proves contamination is present in the assay reagents.'
        },
        {
          id: 'opt_2',
          text: 'Mark the entire run as INVALID, document the failed negative control, quarantine the master mix reagents, and investigate contamination before repeating the run.',
          is_correct: true,
          feedback: 'Correct! A negative control is designed to verify the absence of contamination and background signal. When the negative control shows amplification, any patient band could be an artifact of contaminated water, primers, or dNTPs.'
        },
        {
          id: 'opt_3',
          text: 'Cut the negative control lane out of the gel photograph before filing the report.',
          is_correct: false,
          feedback: 'Incorrect. Tampering with or cropping out control lanes is scientific fraud.'
        },
        {
          id: 'opt_4',
          text: 'Re-run the gel with double the voltage to burn off the negative control band.',
          is_correct: false,
          feedback: 'Incorrect. Increasing voltage does not remove contamination and will melt the gel.'
        }
      ],
      explanation: 'A fundamental tenet of biotechnology laboratory interpretation: Do not interpret unknowns before failed controls are addressed. A band in the NTC invalidates the entire assay run due to reagent contamination.',
      bace_competency: 'Domain 8: Controls, Blanks & Replication - Negative Controls'
    },
    {
      id: 'act_ctrl_2',
      title: 'Standard Curve Extrapolation Risk',
      scenario: 'In a Bradford protein concentration assay, your BSA standard curve spans from 0.05 mg/mL to 1.0 mg/mL (absorbance 0.08 to 0.95 at 595 nm, R² = 0.998). An unknown purified protein sample yields an absorbance of 1.72, well beyond the top standard.',
      options: [
        {
          id: 'opt_1',
          text: 'Use the linear regression equation y = mx + b to calculate the unknown concentration directly from absorbance 1.72.',
          is_correct: false,
          feedback: 'Incorrect. Extrapolating beyond the standard curve is unreliable because spectrophotometer detectors and Coomassie dye saturate at high concentrations, losing linearity.'
        },
        {
          id: 'opt_2',
          text: 'Dilute the unknown sample (e.g. 1:5 or 1:10), re-assay so its absorbance falls within the 0.08–0.95 range, and multiply the interpolated concentration by the dilution factor.',
          is_correct: true,
          feedback: 'Correct! Unknown values are reliable only when they fall within the linear dynamic range of the standard curve (interpolation). When a sample exceeds the range, dilute, re-test, and multiply by the dilution factor.'
        },
        {
          id: 'opt_3',
          text: 'Estimate the concentration by eye since the R² value of 0.998 is high enough to guarantee linearity at any absorbance.',
          is_correct: false,
          feedback: 'Incorrect. A high R² within the standard range does NOT guarantee linearity outside the tested range.'
        },
        {
          id: 'opt_4',
          text: 'Adjust the spectrophotometer zero knob until the sample reads 0.95.',
          is_correct: false,
          feedback: 'Incorrect. Manipulating instrument baseline to force samples into range invalidates the calibration.'
        }
      ],
      explanation: 'Assay responses become non-linear at high concentrations due to light detector saturation and binding exhaustion. Reliable quantitation requires interpolation within the tested standard curve bracket.',
      bace_competency: 'Domain 8: Data Presentation, Standard Curves & Interpretation'
    }
  ]
};

/**
 * 25 High-Yield Scenario-based BACE Examination Questions derived directly from the slide decks.
 */
export const BACE_EXTRA_QUESTIONS: Question[] = [
  // Equipment & Micropipettes
  {
    id: 'q_extra_pip_1',
    domain_id: 'd1',
    topic_id: 't1_1',
    lesson_id: 'les_pipette',
    question_text: 'When aspirating a liquid sample with a calibrated air-displacement micropipette, why must the technician hold the instrument vertically (at 90°) rather than at a tilted angle?',
    choices: [
      { id: 'c1', choice_text: 'Tilting increases hydrostatic pressure and capillary action, aspirating excess volume into the tip.', is_correct: true },
      { id: 'c2', choice_text: 'Tilting causes the digital volume display to slip its gears.', is_correct: false },
      { id: 'c3', choice_text: 'Tilting triggers the automatic blowout mechanism prematurely.', is_correct: false },
      { id: 'c4', choice_text: 'Tilting alters the chemical structure of disposable polypropylene tips.', is_correct: false }
    ],
    explanation: 'Holding a micropipette at an angle (e.g. 30° to 45°) increases the effective hydrostatic head of liquid, drawing significantly more volume into the tip than calibrated (up to 5–10% error). Always aspirate vertically at 90°.',
    difficulty: 'Medium',
    bace_standard: 'Domain 5: Biotechnology Skills - Pipetting Technique'
  },
  {
    id: 'q_extra_pip_2',
    domain_id: 'd1',
    topic_id: 't1_1',
    lesson_id: 'les_pipette',
    question_text: 'Under what specific laboratory condition is REVERSE pipetting mandatory instead of standard forward pipetting?',
    choices: [
      { id: 'c1', choice_text: 'When measuring volatile, viscous, or foaming liquids like glycerol, Triton X-100, or blood serum.', is_correct: true },
      { id: 'c2', choice_text: 'When preparing simple aqueous sodium chloride dilutions.', is_correct: false },
      { id: 'c3', choice_text: 'When loading an agarose gel with bromophenol blue dye.', is_correct: false },
      { id: 'c4', choice_text: 'When dispensing pure deionized water during analytical balance calibration.', is_correct: false }
    ],
    explanation: 'Reverse pipetting is indicated for viscous (dense drag), volatile (high vapor pressure), or foaming solutions. In reverse mode, the plunger is pressed to the 2nd stop to aspirate, and only to the 1st stop to dispense, preventing droplet retention and air bubbles.',
    difficulty: 'Medium',
    bace_standard: 'Domain 5: Biotechnology Skills - Forward and Reverse Pipetting'
  },

  // Balance & pH Measurement
  {
    id: 'q_extra_bal_1',
    domain_id: 'd7',
    topic_id: 't7_2',
    lesson_id: 'les_autoclave_centrifuge',
    question_text: 'Why do analytical balances feature sliding draft glass doors, whereas standard top-loading balances do not?',
    choices: [
      { id: 'c1', choice_text: 'Analytical balances measure masses to 0.0001 g (0.1 mg) and are sensitive enough that ambient air currents and thermal drafts distort readings.', is_correct: true },
      { id: 'c2', choice_text: 'The draft doors are UV-shielded to prevent photochemical degradation of non-sterile powders.', is_correct: false },
      { id: 'c3', choice_text: 'Top-loading balances use magnetic fields that are immune to air movement.', is_correct: false },
      { id: 'c4', choice_text: 'The doors prevent hazardous volatile toxic fumes from escaping into the lab room.', is_correct: false }
    ],
    explanation: 'Analytical balances measure minute masses with high resolution (typically 0.1 mg or 0.0001 g). Ambient HVAC drafts or technician breathing generate air currents that exert forces equivalent to several milligrams, requiring enclosed draft shields.',
    difficulty: 'Easy',
    bace_standard: 'Domain 7: Standard Equipment - Balances & Glassware'
  },
  {
    id: 'q_extra_ph_1',
    domain_id: 'd7',
    topic_id: 't7_2',
    lesson_id: 'les_ph_spec',
    question_text: 'A technician needs to measure the pH of an enzymatic reaction buffer expected to be around pH 7.8. Which standard calibration buffers should be selected to calibrate the pH meter?',
    choices: [
      { id: 'c1', choice_text: 'Buffers at pH 7.00 and pH 10.00 (bracketing the expected reading).', is_correct: true },
      { id: 'c2', choice_text: 'Buffers at pH 4.00 and pH 7.00.', is_correct: false },
      { id: 'c3', choice_text: 'Buffer at pH 7.00 and pure deionized water (pH 7.00).', is_correct: false },
      { id: 'c4', choice_text: 'Buffer at pH 4.00 only.', is_correct: false }
    ],
    explanation: 'A pH meter must be calibrated using reference standards that "bracket" the target pH. For a target of pH 7.8 (slightly basic), standard buffers at pH 7.00 and pH 10.00 must be used.',
    difficulty: 'Medium',
    bace_standard: 'Domain 7: Standard Equipment - pH Meter Calibration'
  },
  {
    id: 'q_extra_ph_2',
    domain_id: 'd7',
    topic_id: 't7_2',
    lesson_id: 'les_ph_spec',
    question_text: 'Why must a glass pH electrode NEVER be wiped with a paper towel or rough cloth after rinsing?',
    choices: [
      { id: 'c1', choice_text: 'Wiping rubs electrostatic charges onto the delicate hydrated glass bulb, causing erratic voltage drift and slow stabilization.', is_correct: true },
      { id: 'c2', choice_text: 'Paper towels absorb the glass silica lattice, thinning the bulb membrane.', is_correct: false },
      { id: 'c3', choice_text: 'The paper fiber chemically neutralizes the internal reference electrolyte solution.', is_correct: false },
      { id: 'c4', choice_text: 'Paper towels cause the liquid junction to precipitate KCl crystals.', is_correct: false }
    ],
    explanation: 'Wiping a glass electrode generates static electrical charges on the glass bulb that disrupt the delicate millivolt potential difference. Electrodes should only be rinsed with deionized water and gently blotted dry with a lint-free Kimwipe.',
    difficulty: 'Easy',
    bace_standard: 'Domain 5: Biotechnology Skills - pH Measurement'
  },

  // Centrifugation & Autoclaving
  {
    id: 'q_extra_cent_1',
    domain_id: 'd7',
    topic_id: 't7_1',
    lesson_id: 'les_autoclave_centrifuge',
    question_text: 'Why must centrifuge tubes placed across from each other in a high-speed rotor be balanced by MASS on a scale rather than by liquid volume alone?',
    choices: [
      { id: 'c1', choice_text: 'Liquids with different solute concentrations (e.g. sucrose vs. water) have different densities, meaning equal volumes will have unequal masses.', is_correct: true },
      { id: 'c2', choice_text: 'Centrifuge rotors calculate balance based on air displacement inside the tube.', is_correct: false },
      { id: 'c3', choice_text: 'Plastic tubes vary in diameter, causing meniscus readings to be optical illusions.', is_correct: false },
      { id: 'c4', choice_text: 'Balancing by mass prevents the motor from running backward.', is_correct: false }
    ],
    explanation: 'Centrifugal force depends directly on mass (F = m × r × ω²). Because different laboratory liquids have different densities (e.g. 30% sucrose solution is denser than water), matching volume does not guarantee equal mass, risking dangerous rotor imbalance.',
    difficulty: 'Medium',
    bace_standard: 'Domain 7: Standard Equipment - Centrifuges & Rotors'
  },
  {
    id: 'q_extra_auto_1',
    domain_id: 'd7',
    topic_id: 't7_1',
    lesson_id: 'les_autoclave_centrifuge',
    question_text: 'Why is autoclave indicator tape insufficient on its own to validate biological sterilization of microbiological media?',
    choices: [
      { id: 'c1', choice_text: 'Autoclave tape only changes color in response to temperature exposure, not sustained steam contact or microbial kill; biological spore indicators are required.', is_correct: true },
      { id: 'c2', choice_text: 'Autoclave tape only reacts to dry heat sterilization above 200°C.', is_correct: false },
      { id: 'c3', choice_text: 'The tape adhesive leaves toxic solvent residues in liquid growth broths.', is_correct: false },
      { id: 'c4', choice_text: 'The chemical dye in tape reverses color if the autoclave cools too quickly.', is_correct: false }
    ],
    explanation: 'Autoclave tape is a chemical indicator that verifies an item reached a certain temperature, but cannot prove that steam penetrated the load or that bacterial endospores (Geobacillus stearothermophilus) were eradicated.',
    difficulty: 'Medium',
    bace_standard: 'Domain 7: Standard Equipment - Autoclaves & Validation'
  },

  // Regulation, cGMP, GLP, ALCOA
  {
    id: 'q_extra_alcoa_1',
    domain_id: 'd6',
    topic_id: 't6_1',
    lesson_id: 'les_cgmp_gdp',
    question_text: 'In the ALCOA data integrity framework, what does the "C" (Contemporaneous) require of laboratory technicians?',
    choices: [
      { id: 'c1', choice_text: 'Data must be recorded at the exact moment the procedure or observation is executed.', is_correct: true },
      { id: 'c2', choice_text: 'Data must be confirmed by a secondary witness before being recorded.', is_correct: false },
      { id: 'c3', choice_text: 'Data must be transcribed to a digital spreadsheet within 30 days of completion.', is_correct: false },
      { id: 'c4', choice_text: 'Data must be calculated using certified algorithmic software.', is_correct: false }
    ],
    explanation: 'Under ALCOA (Attributable, Legible, Contemporaneous, Original, Accurate), Contemporaneous requires that records are generated in real-time as events happen, prohibiting delayed recording or relying on memory.',
    difficulty: 'Easy',
    bace_standard: 'Domain 4: Regulation & Quality - ALCOA Principles'
  },
  {
    id: 'q_extra_alcoa_2',
    domain_id: 'd6',
    topic_id: 't6_1',
    lesson_id: 'les_cgmp_gdp',
    question_text: 'Why does 21 CFR Part 11 prohibit technicians in a pharmaceutical QC laboratory from sharing passwords or user accounts on automated instruments?',
    choices: [
      { id: 'c1', choice_text: 'Shared credentials destroy attributable audit trails, making it impossible to verify who created, modified, or approved an electronic record.', is_correct: true },
      { id: 'c2', choice_text: 'Shared passwords reduce the calculation processing speed of spectrophotometer computers.', is_correct: false },
      { id: 'c3', choice_text: 'Individual accounts are required to automatically invoice reagent suppliers.', is_correct: false },
      { id: 'c4', choice_text: 'Sharing accounts causes laser detectors in plate readers to overheat.', is_correct: false }
    ],
    explanation: 'Under FDA 21 CFR Part 11 electronic records regulations and ALCOA principles, every electronic action must be strictly attributable to a specific identified individual. Shared logins break the legal chain of accountability.',
    difficulty: 'Medium',
    bace_standard: 'Domain 4: Regulation & Quality - Electronic Records'
  },
  {
    id: 'q_extra_dev_1',
    domain_id: 'd6',
    topic_id: 't6_2',
    lesson_id: 'les_qa_qc_sops',
    question_text: 'What is the primary difference between a "Deviation" and a "Change Control" in a regulated biomanufacturing facility?',
    choices: [
      { id: 'c1', choice_text: 'A deviation is an unplanned, unexpected departure from an SOP; a change control is a pre-planned, formally evaluated modification.', is_correct: true },
      { id: 'c2', choice_text: 'A deviation is written by QC; a change control is written exclusively by the CEO.', is_correct: false },
      { id: 'c3', choice_text: 'A deviation only applies to equipment; change control only applies to personnel training.', is_correct: false },
      { id: 'c4', choice_text: 'A deviation has no regulatory impact; change control triggers an automatic FDA plant inspection.', is_correct: false }
    ],
    explanation: 'A deviation is an unplanned departure from an approved procedure, specification, or process condition. Change control is a systematic process for proposing, evaluating risk, validating, and approving planned modifications before implementation.',
    difficulty: 'Medium',
    bace_standard: 'Domain 4: Regulation & Quality - Deviations & Change Control'
  },

  // Applied Mathematics & Calculations
  {
    id: 'q_extra_math_1',
    domain_id: 'd4',
    topic_id: 't4_3',
    lesson_id: 'les_c1v1_percent',
    question_text: 'A technician needs to prepare 500 mL of a 70% (v/v) ethanol sanitizing solution using 100% pure absolute ethanol and deionized water. How much absolute ethanol and water should be combined?',
    choices: [
      { id: 'c1', choice_text: '350 mL absolute ethanol brought to 500 mL total volume with deionized water (approx. 150 mL water).', is_correct: true },
      { id: 'c2', choice_text: '70 mL ethanol added to 500 mL water.', is_correct: false },
      { id: 'c3', choice_text: '350 mL ethanol added to 500 mL water.', is_correct: false },
      { id: 'c4', choice_text: '700 mL ethanol diluted to 1000 mL water.', is_correct: false }
    ],
    explanation: '70% v/v means 70 mL of solute per 100 mL of solution. For 500 mL: (70/100) × 500 mL = 350 mL of absolute ethanol. The solution is then brought to 500 mL final volume with water (C1V1 = C2V2: 100% × V1 = 70% × 500 mL -> V1 = 350 mL).',
    difficulty: 'Easy',
    bace_standard: 'Domain 6: Applied Mathematics - Percent Solutions'
  },
  {
    id: 'q_extra_math_2',
    domain_id: 'd4',
    topic_id: 't4_4',
    lesson_id: 'les_math_molarity',
    question_text: 'How many micrograms (µg) are present in 0.045 milligrams (mg)?',
    choices: [
      { id: 'c1', choice_text: '45 µg', is_correct: true },
      { id: 'c2', choice_text: '4.5 µg', is_correct: false },
      { id: 'c3', choice_text: '450 µg', is_correct: false },
      { id: 'c4', choice_text: '0.000045 µg', is_correct: false }
    ],
    explanation: '1 milligram (mg) = 1,000 micrograms (µg). Therefore, 0.045 mg × 1,000 µg/mg = 45 µg. Dimensional analysis and metric prefix conversions are core BACE skills.',
    difficulty: 'Easy',
    bace_standard: 'Domain 6: Applied Mathematics - Metric Prefixes'
  },
  {
    id: 'q_extra_math_3',
    domain_id: 'd4',
    topic_id: 't4_2',
    lesson_id: 'les_dilutions',
    question_text: 'A bacterial culture sample is diluted by transferring 0.1 mL of culture into 9.9 mL of sterile saline. What is the dilution and the dilution factor (DF)?',
    choices: [
      { id: 'c1', choice_text: 'Dilution = 1:100 (10^-2); Dilution Factor = 100', is_correct: true },
      { id: 'c2', choice_text: 'Dilution = 1:99; Dilution Factor = 99', is_correct: false },
      { id: 'c3', choice_text: 'Dilution = 1:10; Dilution Factor = 10', is_correct: false },
      { id: 'c4', choice_text: 'Dilution = 0.1; Dilution Factor = 0.01', is_correct: false }
    ],
    explanation: 'Total volume = 0.1 mL + 9.9 mL = 10.0 mL. Dilution = Aliquot / Total Volume = 0.1 / 10.0 = 1/100 (1:100). The Dilution Factor (DF) is the reciprocal = 100 (or 10^2).',
    difficulty: 'Medium',
    bace_standard: 'Domain 6: Applied Mathematics - Dilution Factors'
  },

  // Biochemistry & Molecular Biology
  {
    id: 'q_extra_bio_1',
    domain_id: 'd5',
    topic_id: 't5_1',
    lesson_id: 'les_central_dogma',
    question_text: 'Why does a DNA duplex with 65% GC content exhibit a significantly higher melting temperature (Tm) than a duplex with 35% GC content of identical length?',
    choices: [
      { id: 'c1', choice_text: 'Guanine-Cytosine pairs are joined by three hydrogen bonds, whereas Adenine-Thymine pairs have only two, requiring more thermal energy to dissociate.', is_correct: true },
      { id: 'c2', choice_text: 'GC pairs form covalent peptide bonds across the helical axis.', is_correct: false },
      { id: 'c3', choice_text: 'Adenine has an extra hydroxyl group that repels thymine in aqueous buffer.', is_correct: false },
      { id: 'c4', choice_text: 'Cytosine forms an ionic bond with magnesium in the PCR buffer.', is_correct: false }
    ],
    explanation: 'Watson-Crick base pairing establishes 3 hydrogen bonds between Guanine and Cytosine (G≡C) and 2 hydrogen bonds between Adenine and Thymine (A=T). More thermal energy is required to denature GC-rich DNA.',
    difficulty: 'Easy',
    bace_standard: 'Domain 3: Biochemistry & Molecular Biology - DNA Structure'
  },
  {
    id: 'q_extra_bio_2',
    domain_id: 'd5',
    topic_id: 't5_2',
    lesson_id: 'les_central_dogma',
    question_text: 'In molecular biology laboratories, why must RNA samples and RT-PCR reagents be kept on ice or frozen at -80°C, while double-stranded DNA can be stored at 4°C or -20°C?',
    choices: [
      { id: 'c1', choice_text: 'RNA possesses a 2\'-hydroxyl group that makes its phosphodiester backbone chemically susceptible to alkaline hydrolysis, and environmental RNase enzymes are extremely stable and ubiquitous.', is_correct: true },
      { id: 'c2', choice_text: 'RNA is a triple-stranded polymer that falls apart above 0°C.', is_correct: false },
      { id: 'c3', choice_text: 'DNA lacks phosphate groups, making it resistant to enzymatic cleavage.', is_correct: false },
      { id: 'c4', choice_text: 'Uracil reacts with atmospheric nitrogen at room temperature.', is_correct: false }
    ],
    explanation: 'RNA is notoriously labile because the 2\'-OH on ribose acts as an internal nucleophile. Furthermore, environmental RNases (from skin flakes and airborne microbes) do not require divalent cations and resist autoclaving. RNA must be handled on ice with certified RNase-free consumables.',
    difficulty: 'Hard',
    bace_standard: 'Domain 3: Biochemistry & Molecular Biology - Transcription & RNA Handling'
  },

  // Safety, SDS & Hazards
  {
    id: 'q_extra_safe_1',
    domain_id: 'd3',
    topic_id: 't3_1',
    lesson_id: 'les_sds_ghs',
    question_text: 'According to OSHA GHS labeling guidelines, which signal word indicates the MORE SEVERE hazard level?',
    choices: [
      { id: 'c1', choice_text: 'DANGER', is_correct: true },
      { id: 'c2', choice_text: 'WARNING', is_correct: false },
      { id: 'c3', choice_text: 'CAUTION', is_correct: false },
      { id: 'c4', choice_text: 'NOTICE', is_correct: false }
    ],
    explanation: 'Under the Globally Harmonized System (GHS), only two signal words are used: "DANGER" for more severe hazard categories, and "WARNING" for less severe hazard categories.',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Safety & Workplace Culture - GHS Labels'
  },
  {
    id: 'q_extra_safe_2',
    domain_id: 'd3',
    topic_id: 't3_1',
    lesson_id: 'les_sds_ghs',
    question_text: 'In which section of a standardized 16-section Safety Data Sheet (SDS) would a technician find required glove materials and permissible exposure limits (PEL)?',
    choices: [
      { id: 'c1', choice_text: 'Section 8: Exposure Controls/Personal Protection', is_correct: true },
      { id: 'c2', choice_text: 'Section 2: Hazard(s) Identification', is_correct: false },
      { id: 'c3', choice_text: 'Section 4: First-Aid Measures', is_correct: false },
      { id: 'c4', choice_text: 'Section 13: Disposal Considerations', is_correct: false }
    ],
    explanation: 'Section 8 of the SDS provides OSHA Permissible Exposure Limits (PEL), ACGIH Threshold Limit Values (TLV), engineering ventilation controls, and specific personal protective equipment (PPE) requirements.',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Safety & Workplace Culture - Safety Data Sheets'
  },
  {
    id: 'q_extra_safe_3',
    domain_id: 'd3',
    topic_id: 't3_4',
    lesson_id: 'les_biosafety',
    question_text: 'What is the correct protocol when a disposable needle or scalpel blade has been used in a biotechnology laboratory?',
    choices: [
      { id: 'c1', choice_text: 'Immediately deposit the un-recapped sharp directly into a rigid, puncture-resistant, labeled sharps biohazard container.', is_correct: true },
      { id: 'c2', choice_text: 'Recap the needle using two hands before throwing it into a red autoclave bag.', is_correct: false },
      { id: 'c3', choice_text: 'Bend or shear the needle by hand to prevent unauthorized reuse.', is_correct: false },
      { id: 'c4', choice_text: 'Place the needle in standard laboratory trash if it did not touch human blood.', is_correct: false }
    ],
    explanation: 'OSHA Bloodborne Pathogens standard (29 CFR 1910.1030) prohibits recapping needles with two hands or shearing/bending needles. Sharps must be immediately discarded without recapping into rigid, puncture-resistant biohazard sharps containers.',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Safety & Workplace Culture - Sharps Safety'
  },

  // Technical Skills - Microscopy & Staining
  {
    id: 'q_extra_micro_1',
    domain_id: 'd2',
    topic_id: 't1_6',
    lesson_id: 'les_aseptic',
    question_text: 'During a bacterial Gram stain procedure, what is the consequence of leaving the acetone-alcohol decolorizing solution on the slide for 60 seconds instead of 10–15 seconds?',
    choices: [
      { id: 'c1', choice_text: 'Gram-positive bacteria will be over-decolorized, losing the crystal violet-iodine complex and falsely appearing Gram-negative (pink/red).', is_correct: true },
      { id: 'c2', choice_text: 'Gram-negative bacteria will retain crystal violet and appear purple.', is_correct: false },
      { id: 'c3', choice_text: 'The bacterial cells will completely dissolve and disappear from the glass slide.', is_correct: false },
      { id: 'c4', choice_text: 'Safranin counterstain will fail to bind to any cell walls.', is_correct: false }
    ],
    explanation: 'Decolorization is the most timing-critical step of the Gram stain. Excessive solvent exposure damages the thick peptidoglycan wall of Gram-positive cells, allowing the crystal violet-iodine complex to leach out, leading to false Gram-negative (pink) results.',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Technical Skills & Applications - Gram Stain Logic'
  },
  {
    id: 'q_extra_micro_2',
    domain_id: 'd2',
    topic_id: 't1_6',
    lesson_id: 'les_aseptic',
    question_text: 'Why is immersion oil required when using the 100X high-power objective lens on a brightfield compound light microscope?',
    choices: [
      { id: 'c1', choice_text: 'Immersion oil has the same refractive index as glass (n ≈ 1.515), preventing light refraction and loss of resolution at the air-glass interface.', is_correct: true },
      { id: 'c2', choice_text: 'The oil lubricates the front lens element so it does not crack against the coverslip.', is_correct: false },
      { id: 'c3', choice_text: 'The oil stains live bacterial cells without killing them.', is_correct: false },
      { id: 'c4', choice_text: 'The oil acts as a blue optical filter to increase light wavelength.', is_correct: false }
    ],
    explanation: 'When light passes from glass coverslip into air, the refractive index mismatch causes light rays to bend away from the lens aperture. Immersion oil matches the refractive index of glass (n = 1.515), capturing wide-angle light and maximizing optical resolution.',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Technical Skills & Applications - Microscopy & Resolution'
  },

  // Culture & Aseptic Technique
  {
    id: 'q_extra_asep_1',
    domain_id: 'd1',
    topic_id: 't1_4',
    lesson_id: 'les_aseptic',
    question_text: 'When inoculating an agar plate using the four-quadrant streak method, why must the inoculating loop be flame-sterilized and allowed to cool between each successive quadrant?',
    choices: [
      { id: 'c1', choice_text: 'To dilute the bacterial cell density progressively across the surface so individual, well-isolated colonies grow in the final quadrant.', is_correct: true },
      { id: 'c2', choice_text: 'To prevent agar from sticking to the nichrome wire.', is_correct: false },
      { id: 'c3', choice_text: 'To heat-fix the colonies onto the agar so they cannot crawl across the plate.', is_correct: false },
      { id: 'c4', choice_text: 'To introduce atmospheric nitrogen necessary for bacterial respiration.', is_correct: false }
    ],
    explanation: 'Flaming the loop between sectors kills all residual organisms on the wire. When the sterile cooled loop pulls a small line of cells from the previous sector into the next, cell density is exponentially diluted, producing isolated single colonies.',
    difficulty: 'Easy',
    bace_standard: 'Domain 1: Technical Skills & Applications - Inoculation Methods'
  },

  // PCR & Electrophoresis
  {
    id: 'q_extra_pcr_1',
    domain_id: 'd2',
    topic_id: 't2_1',
    lesson_id: 'les_pcr',
    question_text: 'If a technician accidentally sets the PCR annealing temperature 12°C ABOVE the calculated melting temperature (Tm) of the primers, what will be the observed result on the agarose gel?',
    choices: [
      { id: 'c1', choice_text: 'No amplification product will be produced (blank lane) because thermal energy prevents primers from annealing to the template DNA.', is_correct: true },
      { id: 'c2', choice_text: 'Multiple non-specific bands and smeary background will appear.', is_correct: false },
      { id: 'c3', choice_text: 'The amplicon will be twice as long as expected.', is_correct: false },
      { id: 'c4', choice_text: 'The DNA will migrate backward toward the cathode.', is_correct: false }
    ],
    explanation: 'Annealing temperature (Ta) must be low enough to allow hydrogen bonding between primers and complementary template sequence. If Ta is substantially higher than the primer Tm, thermal motion prevents hybridization entirely, yielding zero PCR product.',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Technical Skills & Applications - Thermal Cycling'
  },
  {
    id: 'q_extra_gel_1',
    domain_id: 'd1',
    topic_id: 't1_8',
    lesson_id: 'les_electrophoresis',
    question_text: 'A technician loads DNA samples into an agarose gel and observes that the bands are faint and "smiling" with curved, smeared edges. Which operational error is the most probable cause?',
    choices: [
      { id: 'c1', choice_text: 'Running the gel at an excessively high voltage, generating uneven resistive heating across the gel box.', is_correct: true },
      { id: 'c2', choice_text: 'Using a P20 pipette instead of a P200 pipette to load the samples.', is_correct: false },
      { id: 'c3', choice_text: 'Using 1X TAE buffer instead of 10X TAE buffer in the chamber.', is_correct: false },
      { id: 'c4', choice_text: 'Allowing the gel to solidify for 45 minutes instead of 30 minutes.', is_correct: false }
    ],
    explanation: 'Running an electrophoresis gel at excessively high voltage generates Joule heating in the buffer and agarose matrix. Because the center of the gel retains heat more than the edges, resistance drops in the center, causing center lanes to migrate faster and create "smiling" or melted distorted bands.',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Technical Skills & Applications - Gel Electrophoresis'
  },

  // Experimental Design - Blanks & Vehicle Controls
  {
    id: 'q_extra_exp_1',
    domain_id: 'd8',
    topic_id: 't8_1',
    lesson_id: 'les_controls_variables',
    question_text: 'A pharmacology study tests a novel anticancer compound that is insoluble in water and must be dissolved in 100% dimethyl sulfoxide (DMSO). The final cell culture media contains 0.1% DMSO. What MUST the vehicle control group receive?',
    choices: [
      { id: 'c1', choice_text: 'Cell culture media containing 0.1% DMSO without the anticancer drug compound.', is_correct: true },
      { id: 'c2', choice_text: 'Pure sterile water without media or DMSO.', is_correct: false },
      { id: 'c3', choice_text: '100% undiluted DMSO alone.', is_correct: false },
      { id: 'c4', choice_text: 'A known cytotoxic chemotherapy drug like cisplatin.', is_correct: false }
    ],
    explanation: 'A vehicle control isolates the effect of the solvent/carrier. Because DMSO has intrinsic cellular effects and cytotoxicity, the vehicle control must contain the exact same solvent concentration (0.1% DMSO in media) as the treatment group, minus the active drug molecule.',
    difficulty: 'Medium',
    bace_standard: 'Domain 8: Experimental Design & Data Analysis - Vehicle Controls'
  },
  {
    id: 'q_extra_exp_2',
    domain_id: 'd8',
    topic_id: 't8_3',
    lesson_id: 'les_standard_curves',
    question_text: 'During spectrophotometric quantitation of DNA at 260 nm, what liquid must be placed in the blank cuvette to zero the spectrophotometer?',
    choices: [
      { id: 'c1', choice_text: 'The exact elution buffer or water used to dissolve the DNA sample (e.g. 1X TE buffer).', is_correct: true },
      { id: 'c2', choice_text: 'Tap water from the laboratory sink.', is_correct: false },
      { id: 'c3', choice_text: 'A certified calf thymus DNA reference standard.', is_correct: false },
      { id: 'c4', choice_text: 'An empty quartz cuvette with room air.', is_correct: false }
    ],
    explanation: 'A spectrophotometric blank must contain all solvents, buffers, and matrix components present in the sample EXCEPT the analyte being measured. Blanking with 1X TE buffer subtracts background absorbance from EDTA and Tris ions, ensuring readings reflect pure DNA absorption.',
    difficulty: 'Easy',
    bace_standard: 'Domain 8: Experimental Design & Data Analysis - Blanks'
  }
];
