import { Lesson } from '../types/database';
import { COVERAGE_EXPANSION_LESSONS } from './coverageExpansionLessons';

export const ALL_LESSONS: Lesson[] = [
  // -------------------------------------------------------------
  // DOMAIN 1: BIOTECHNOLOGY SKILLS
  // -------------------------------------------------------------
  {
    id: 'les_pipette',
    topic_id: 't1_1',
    domain_id: 'd1',
    title: 'Micropipetting: Technique, Range Selection, and Error Prevention',
    description: 'Master operating principles, digital volume display interpretation, two-stop plunger handling, and calibration checks.',
    estimated_minutes: 18,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Nominal Volume', definition: 'The maximum operating volume specified by the manufacturer for a given micropipette model.' },
      { term: 'First Stop', definition: 'The point of initial resistance on the plunger used to draw up the calibrated volume of liquid.' },
      { term: 'Second Stop (Blowout)', definition: 'The final plunge depth used exclusively to expel any residual droplet during dispensing.' },
      { term: 'Air Displacement', definition: 'The mechanism where an internal piston moves a column of air to aspirate liquid into a disposable plastic tip.' },
      { term: 'Pre-wetting', definition: 'Aspirating and expelling the sample liquid 2–3 times prior to actual delivery to equilibrate vapor pressure.' }
    ],
    important_concepts: [
      'Pipette selection must always use the smallest nominal instrument that accommodates the target volume for highest volumetric precision.',
      'Always maintain the pipette vertically when aspirating liquid; tilting past 20 degrees introduces substantial volumetric inaccuracy.',
      'Never rotate the volume adjustment wheel beyond the upper or lower design limit, as this causes stripped internal threading and severe decalibration.',
      'Immersion depth matters: submerge tips 1–2 mm for P2/P10/P20, and 2–4 mm for P200/P1000.'
    ],
    worked_examples: [
      {
        title: 'Determining the Optimal Pipette for 175 µL',
        scenario: 'A student needs to transfer 175 µL of restriction digest master mix into a microcentrifuge tube.',
        solution: 'Compare common ranges: P20 (2–20 µL), P200 (20–200 µL), P1000 (100–1000 µL). While both P200 and P1000 can measure 175 µL, pipettes deliver maximum accuracy and lowest coefficient of variation (CV) in the upper 30–100% of their operational range. 175 µL represents 87.5% of the P200 capacity versus only 17.5% of the P1000 capacity. Therefore, the P200 is the correct instrument.'
      },
      {
        title: 'Reading a P20 Digital Volumeter Display',
        scenario: 'A P20 display has three rotating numbered rings with a horizontal tick line separating the bottom digit.',
        solution: 'For a P20: Top ring = tens (10 µL), Middle ring = ones (1 µL), Bottom red/line ring = tenths (0.1 µL). A display showing [ 1 | 8 | 4 ] reads as 18.4 µL.'
      }
    ],
    common_mistakes: [
      'Depressing the plunger to the second stop BEFORE immersing the tip into the liquid (causes massive air aspiration and inaccurate high volumes).',
      'Laying a loaded pipette horizontally on the lab bench (liquid flows into the internal barrel, corroding the piston and contaminating future samples).',
      'Releasing the plunger rapidly like a spring (causes aerosolization, splashing into the tip filter, and volumetric inaccuracy).'
    ],
    bace_exam_tip: 'BACE questions frequently test whether you recognize that drawing up liquid begins at the FIRST stop only. The SECOND stop is reserved solely for dispensing. Look out for trick answer choices that describe pushing to the second stop to aspirate liquid!',
    sections: [
      {
        title: '1. Fundamentals of Air-Displacement Micropipetting',
        content: 'Modern biotechnology laboratories rely almost universally on air-displacement micropipettes for liquid volumes ranging from 0.1 µL up to 1000 µL (1.0 mL). Inside the instrument, a finely machined stainless steel or ceramic piston moves within a cylinder. When the technician pushes the plunger down to the first stop, a specific volume of air is displaced out of the tip. When released smoothly, atmospheric pressure forces an equivalent volume of liquid up into the disposable polypropylene tip.'
      },
      {
        title: '2. Choosing the Proper Pipette Range',
        content: 'Standard laboratory pipettes are designated by their maximum nominal volume in microliters:\n• P10 or P20: Ideal for 0.5–10 µL or 2–20 µL (PCR primers, restriction enzymes, loading dyes)\n• P200: Ideal for 20–200 µL (assay reagents, buffer additions, small culture transfers)\n• P1000: Ideal for 100–1000 µL (growth media, diluents, column washes)\nOperating at the lowest end of a pipette range (e.g. measuring 100 µL on a P1000) introduces up to 3–5x more volumetric variance than using a P200 dialed to 100 µL.'
      },
      {
        title: '3. Aspiration and Dispensing Protocol (Step-by-Step)',
        content: '1. Fit the appropriate tip firmly by pressing straight down with gentle twisting; never hammer the pipette onto the tip box.\n2. Depress the plunger to the FIRST STOP outside the liquid.\n3. Hold the pipette vertically (90°) and immerse the tip 2–3 mm below the liquid surface.\n4. Smoothly release the plunger over 1–2 seconds, pausing briefly before withdrawing.\n5. Place the tip against the interior wall of the destination tube at a 45° angle.\n6. Depress the plunger smoothly to the FIRST stop, pause, and then depress fully to the SECOND stop to expel the final fluid droplet.\n7. Keep the plunger held at the second stop while withdrawing the tip from the tube, then release the plunger and eject the tip into biohazard waste.'
      }
    ]
  },
  {
    id: 'les_dilutions',
    topic_id: 't1_3',
    domain_id: 'd1',
    title: 'Serial Dilutions & Concentration Factor Calculations',
    description: 'Calculate dilution factors, stock solutions, multi-tube dilution series, and bacterial plating concentrations.',
    estimated_minutes: 20,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'Dilution Factor (DF)', definition: 'The ratio of initial volume to final total volume (V1 / V2), or initial concentration to final concentration (C1 / C2).' },
      { term: 'Serial Dilution', definition: 'A systematic stepwise dilution of a substance in solution, where the dilution factor is uniform at each successive step.' },
      { term: 'Aliquot', definition: 'A measured sub-volume of a sample transferred from one container to another.' },
      { term: 'Diluent', definition: 'The solvent or sterile liquid (such as sterile PBS or water) added to reduce concentration.' }
    ],
    important_concepts: [
      'Individual Dilution Factor = Aliquot Volume / Total Volume (Aliquot + Diluent).',
      'Cumulative Dilution Factor is the product of all individual dilution factors: DF_total = DF1 × DF2 × DF3...',
      'Always mix thoroughly (e.g. vortex 3 seconds or pipette mix 5 times) before transferring the aliquot to the next tube in the series.',
      'A 1:10 dilution means 1 part sample plus 9 parts diluent, yielding a 10-fold reduction in concentration.'
    ],
    worked_examples: [
      {
        title: 'Calculating a 10-Fold (1:10) Three-Step Serial Dilution',
        scenario: 'You have a bacterial culture at 1.0 × 10^7 CFU/mL. You transfer 100 µL into 900 µL of sterile broth in Tube 1, mix, and repeat for Tube 2 and Tube 3.',
        calculation: 'Step 1: 100 µL / (100 µL + 900 µL) = 100 / 1000 = 1/10 (10^-1)\nTube 1 = 1.0 × 10^6 CFU/mL\nTube 2 = 1.0 × 10^5 CFU/mL\nTube 3 = 1.0 × 10^4 CFU/mL\nCumulative DF for Tube 3 = 10 × 10 × 10 = 1,000 (10^-3).',
        solution: 'The concentration in Tube 3 is 1.0 × 10^4 CFU/mL.'
      }
    ],
    common_mistakes: [
      'Forgetting that "1 to 10" or "1:10" means 1 volume of solute into 9 volumes of diluent (total volume = 10), NOT 1 into 10.',
      'Failing to change micropipette tips between dilution tubes (causes carryover contamination that invalidates the entire series).',
      'Failing to invert or vortex tubes between transfers.'
    ],
    bace_exam_tip: 'When reading BACE dilution word problems, pay close attention to whether the question asks for the concentration in the final tube or the number of cells plated on an agar plate (which requires multiplying by the plating volume, often 100 µL = 0.1 mL)!',
    sections: [
      {
        title: '1. Why Serial Dilutions Are Essential in Biotechnology',
        content: 'Biotechnicians frequently deal with astronomical concentrations of cells, viral particles, or concentrated proteins. For example, an overnight E. coli culture typically contains 10^9 cells per mL. Because viable plate count methods only yield countable, statistically reliable colonies between 30 and 300 colonies per plate, direct plating would produce an unreadable lawn. Serial dilutions provide an accurate, reproducible method to scale down concentrations by orders of magnitude.'
      },
      {
        title: '2. The Dilution Equation in Action',
        content: 'The core relationship is:\nDilution = Volume of Aliquot / (Volume of Aliquot + Volume of Diluent) = V_sample / V_total\nIf 0.5 mL of serum is added to 4.5 mL of physiological saline, the dilution is:\n0.5 / (0.5 + 4.5) = 0.5 / 5.0 = 1/10 (a 10-fold dilution).\nThe dilution factor (DF) is the reciprocal of the dilution: DF = 10.'
      }
    ]
  },
  {
    id: 'les_aseptic',
    topic_id: 't1_4',
    domain_id: 'd1',
    title: 'Aseptic Technique & Sterile Maintenance in the Bioscience Lab',
    description: 'Principles of sterile fields, Bunsen burner updrafts, 70% ethanol efficacy, and biosafety cabinet operations.',
    estimated_minutes: 15,
    display_order: 3,
    active: true,
    key_vocabulary: [
      { term: 'Aseptic Technique', definition: 'Procedures executed under sterile conditions to prevent contamination from microorganisms.' },
      { term: '70% Isopropanol / Ethanol', definition: 'The optimal alcohol concentration for biological disinfection; water content slows evaporation and facilitates membrane penetration.' },
      { term: 'HEPA Filter', definition: 'High-Efficiency Particulate Air filter capable of trapping 99.97% of airborne particles 0.3 µm or larger.' },
      { term: 'Sterile Field', definition: 'A designated work surface devoid of viable microorganisms, protected by laminar airflow or flame updraft.' }
    ],
    important_concepts: [
      '70% ethanol is significantly more microbicidal than 95% or 100% ethanol because water facilitates cell wall penetration and coagulates bacterial proteins.',
      'Never reach over open sterile containers; airborne microbes and shedding skin flakes fall directly into exposed vessels.',
      'Laminar flow biosafety cabinets protect personnel and products through directional HEPA airflow; never block front or rear intake grilles.',
      'Vessel openings (glass test tubes, media bottles) should be passed through a flame before and after pipetting to create an outward thermal updraft.'
    ],
    worked_examples: [
      {
        title: 'Sterilizing a Biosafety Cabinet Prior to Cell Seeding',
        scenario: 'A technician arrives at a Class II Type A2 biosafety cabinet to prepare mammalian culture flasks.',
        solution: 'Turn on blower for 10–15 minutes before work to purge air. Spray and wipe all interior surfaces with 70% ethanol working from cleanest to dirtiest (back to front, top to bottom). Spray all items with 70% ethanol before placing them inside. Allow surfaces to air-dry completely for appropriate contact time (minimum 30 seconds). Keep the front sash at the certified height.'
      }
    ],
    common_mistakes: [
      'Using 100% ethanol thinking higher concentration equals stronger killing power (100% alcohol rapidly dehydrates microbes without lysing them).',
      'Cluttering the front air intake grille of a biosafety hood with pipettes and boxes, disrupting laminar containment.',
      'Leaving open culture dishes or bottles open to room air instead of immediately recapping.'
    ],
    bace_exam_tip: 'Remember why 70% ethanol is preferred over 95% or 100%: Water is required to denature proteins and prevent premature crusting of the outer membrane. This is a classic BACE exam question across both Safety and Biotech Skills!',
    sections: [
      {
        title: '1. The Biological Contamination Threat',
        content: 'Bacteria, molds, yeasts, and mycoplasma are ubiquitous in the laboratory environment. A single stray spore can ruin a week-long cell culture or recombinant protein production run. Aseptic technique is the collection of physical behaviors, chemical agents, and engineering controls designed to exclude all extraneous microorganisms.'
      },
      {
        title: '2. Working with Laminar Flow & Biosafety Hoods',
        content: 'A laminar flow hood draws ambient air through a pre-filter and then forces it through a HEPA filter in smooth, parallel streamlines. In a vertical laminar flow biosafety cabinet (Class II), air forms an invisible air curtain across the front opening, preventing pathogens from escaping into the room and preventing room dust from entering the work chamber.'
      }
    ]
  },
  {
    id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    title: 'Agarose Gel Electrophoresis: Matrix, Running Buffers, and Band Analysis',
    description: 'Electrophoretic separation of nucleic acids, agarose gel concentrations, TAE vs TBE buffers, loading dyes, and molecular weight ladders.',
    estimated_minutes: 20,
    display_order: 4,
    active: true,
    key_vocabulary: [
      { term: 'Agarose Matrix', definition: 'A polysaccharide meshwork derived from seaweed that sieves charged biomolecules based on molecular size.' },
      { term: 'TAE Buffer', definition: 'Tris-Acetate-EDTA buffer; optimal for preparative gels and cloning due to lower ionic strength and rapid fragment recovery.' },
      { term: 'TBE Buffer', definition: 'Tris-Borate-EDTA buffer; provides higher buffering capacity and sharper resolution for small DNA fragments (<1 kb).' },
      { term: 'Ethidium Bromide / GelRed', definition: 'Intercalating fluorescent dyes that fluoresce under UV or blue light when bound between DNA base pairs.' },
      { term: 'Loading Dye', definition: 'A tracking solution containing glycerol/ficoll to weight samples down into wells and visible dye markers (e.g., bromophenol blue).' }
    ],
    important_concepts: [
      'DNA has a net negative charge due to its sugar-phosphate backbone and always migrates toward the positive anode ("Run to the Red").',
      'Migration velocity is inversely proportional to the log10 of base-pair length; smaller fragments migrate faster and farther than larger ones.',
      'Higher percentage agarose gels (1.5% to 2.0%) resolve small fragments (100–1000 bp), while lower percentages (0.7% to 0.8%) resolve large genomic fragments (5–10 kb).',
      'Never use pure deionized water as a running buffer; water lacks ions to conduct current and will cause the gel to overheat and melt.'
    ],
    worked_examples: [
      {
        title: 'Choosing Agarose Percentage for a 350 bp PCR Product',
        scenario: 'A technician wants to verify whether an amplicon of 350 bp amplified cleanly without primer dimers (50 bp).',
        solution: 'A 0.8% gel will resolve fragments from 1 kb to 10 kb, causing the 350 bp band and 50 bp primer dimers to run together near the dye front. A 1.8%–2.0% agarose gel creates small matrix pores that clearly separate the 350 bp target from the 50 bp primer dimer.'
      }
    ],
    common_mistakes: [
      'Reversing the electrical leads (negative black cathode at the bottom), causing DNA samples to migrate backward out of the wells and into the buffer.',
      'Diluting running buffer with deionized water inside the chamber, causing uneven voltage gradients and "smiling" bands.',
      'Puncturing the bottom of the agarose well with the pipette tip, causing sample to leak under the gel.'
    ],
    bace_exam_tip: 'BACE questions frequently test electrode polarity: DNA is negatively charged and moves toward the positive ANODE (red lead). Remember: "Run to Red, Away from Black"!',
    sections: [
      {
        title: '1. The Physical Basis of Electrophoresis',
        content: 'When an electric field is applied across an electrolyte buffer, charged macromolecules migrate toward the electrode of opposite polarity. Because nucleic acids have a constant charge-to-mass ratio (one negative phosphate per nucleotide), migration speed through an agarose polymer mesh is determined strictly by physical size (conformation and molecular weight in base pairs).'
      },
      {
        title: '2. Running Buffers and Gel Casting',
        content: 'Agarose is dissolved in running buffer (never water) by microwave boiling, cooled to ~55°C, and poured into a casting tray with a well-forming comb. TAE buffer is preferred when DNA bands will be excised for downstream cloning, whereas TBE buffer is preferred for long electrophoresis runs and sizing small fragments.'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 2: TECHNICAL SKILLS & APPLICATIONS
  // -------------------------------------------------------------
  {
    id: 'les_pcr',
    topic_id: 't2_1',
    domain_id: 'd2',
    title: 'Polymerase Chain Reaction (PCR): Thermocycling, Primers, and Optimization',
    description: 'Amplification chemistry, denaturation, annealing temperatures, Taq polymerase, magnesium chloride cofactors, and master mix setup.',
    estimated_minutes: 22,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Denaturation', definition: 'The initial PCR thermal phase (~94–95°C) breaking hydrogen bonds between complementary DNA strands.' },
      { term: 'Annealing', definition: 'The thermal step (~50–65°C) where synthetic oligonucleotide forward and reverse primers hybridize to target sequences.' },
      { term: 'Extension', definition: 'The enzymatic phase (~72°C) where thermostable Taq polymerase synthesizes new complementary DNA in the 5\' to 3\' direction.' },
      { term: 'Taq Polymerase', definition: 'Thermostable DNA polymerase isolated from the thermophilic bacterium Thermus aquaticus.' },
      { term: 'Primer Dimer', definition: 'A non-specific artifact formed when forward and reverse primers anneal to each other due to complementary 3\' ends.' }
    ],
    important_concepts: [
      'PCR yields exponential amplification: 2^n copies after n cycles (e.g., 30 cycles produces over 1 billion copies from a single template molecule).',
      'Primer annealing temperature (Ta) is typically set 3–5°C below the lower calculated melting temperature (Tm) of the primer pair.',
      'Magnesium chloride (MgCl2) is an essential cofactor for Taq polymerase; too little Mg2+ reduces yield, while too much causes non-specific amplification.',
      'DNA polymerase always synthesizes new strands exclusively in the 5\' to 3\' direction, reading the template in the 3\' to 5\' direction.'
    ],
    worked_examples: [
      {
        title: 'Setting Annealing Temperature Based on Primer Tm',
        scenario: 'Forward primer has a Tm of 60°C and reverse primer has a Tm of 58°C.',
        solution: 'Always base the annealing temperature on the lower Tm. Setting Ta to 53–55°C (3–5°C below 58°C) allows specific hybridization while avoiding non-specific mispriming.'
      }
    ],
    common_mistakes: [
      'Leaving PCR master mixes at room temperature without hot-start enzymes, allowing non-specific primer binding before cycling begins.',
      'Setting annealing temperature too high (prevents primers from binding, yielding zero product) or too low (causes non-specific spurious bands).',
      'Cross-contaminating PCR reagents with aerosolized amplicons from previous runs by using un-filtered pipette tips.'
    ],
    bace_exam_tip: 'Know the 3 steps of a standard PCR cycle and their exact temperature ranges: Denaturation (94–95°C), Annealing (50–65°C), and Extension (72°C). Also remember that extension time is typically calculated as 1 minute per 1,000 base pairs (1 kb) of target DNA.',
    sections: [
      {
        title: '1. The Molecular Mechanism of PCR',
        content: 'Developed by Kary Mullis in 1983, PCR mimics cellular DNA replication in vitro through cyclic temperature shifts. By utilizing a heat-stable polymerase (Taq), reaction mixtures can withstand repeated high-temperature denaturation without denaturing the enzyme itself.'
      },
      {
        title: '2. PCR Master Mix Components',
        content: 'A standard PCR reaction contains: template DNA, forward and reverse primers (0.1–0.5 µM), deoxynucleotide triphosphates (dNTPs: dATP, dCTP, dGTP, dTTP), reaction buffer with MgCl2 (typically 1.5–2.5 mM), thermostable DNA polymerase, and nuclease-free water.'
      }
    ]
  },
  {
    id: 'les_transformation',
    topic_id: 't2_4',
    domain_id: 'd2',
    title: 'Bacterial Transformation, Plasmids, and Antibiotic Selection',
    description: 'Competent cell preparation, calcium chloride neutralization, heat-shock dynamics, recovery incubation, and selective plating.',
    estimated_minutes: 20,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'Competence', definition: 'The physiological state of bacterial cells enabling them to take up foreign extracellular DNA from the environment.' },
      { term: 'Heat Shock', definition: 'A sudden temperature shift (0°C on ice to 42°C for 45–90 seconds) creating transient pores in the bacterial membrane.' },
      { term: 'Selectable Marker', definition: 'A gene on a plasmid (such as bla for ampicillin resistance) conferring survival on media containing antibiotics.' },
      { term: 'SOC / LB Recovery Broth', definition: 'Nutrient-rich broth in which transformed bacteria incubate at 37°C for 45–60 minutes to express antibiotic resistance proteins before plating.' }
    ],
    important_concepts: [
      'Calcium chloride (CaCl2) shields the negative charges of both DNA phosphate backbones and bacterial lipopolysaccharides, allowing DNA to adhere to the cell wall.',
      'The recovery incubation phase at 37°C without antibiotics is mandatory; bacteria must synthesize beta-lactamase enzyme before exposure to ampicillin, or they will be killed.',
      'Satellite colonies are tiny non-resistant colonies that appear around a true transformant when beta-lactamase degrades ampicillin in the surrounding agar after prolonged incubation.'
    ],
    worked_examples: [
      {
        title: 'Calculating Transformation Efficiency',
        scenario: 'A student transforms 0.1 µg of pUC19 plasmid into 100 µL of competent cells, adds 900 µL of SOC (total 1000 µL), and plates 100 µL. 250 colonies grow.',
        calculation: 'DNA plated = 0.1 µg × (100 µL plated / 1000 µL total) = 0.01 µg.\nTransformation Efficiency = 250 transformants / 0.01 µg = 25,000 CFU/µg (2.5 × 10^4 CFU/µg).',
        solution: 'The transformation efficiency is 2.5 × 10^4 CFU/µg.'
      }
    ],
    common_mistakes: [
      'Skipping the 45–60 minute recovery incubation in antibiotic-free broth, leading to 0 colonies because cells have not yet expressed the resistance protein.',
      'Over-heating during heat shock (e.g., leaving cells at 42°C for 5 minutes instead of 45–90 seconds), which lyses and kills the competent cells.',
      'Incubating selective agar plates for >24 hours, leading to false-positive satellite colonies.'
    ],
    bace_exam_tip: 'Transformation efficiency calculations appear on almost every BACE exam! Remember: Efficiency = Total Colonies / µg of plasmid DNA plated. Keep your units in micrograms (µg), NOT nanograms!',
    sections: [
      {
        title: '1. The Molecular Basis of Transformation',
        content: 'Transformation introduces foreign recombinant plasmid DNA into a bacterial host (typically E. coli strains like DH5-alpha). Because wild-type E. coli is not naturally competent, cells are chemically treated with cold divalent cations (CaCl2) to neutralize charge repulsions between DNA and membrane phospholipids.'
      },
      {
        title: '2. The Four Stages of Chemical Transformation',
        content: '1. Incubation on ice with plasmid DNA.\n2. Heat shock at 42°C for exactly 45–90 seconds.\n3. Return to ice for 2 minutes to stabilize membrane.\n4. Outgrowth / recovery in SOC broth at 37°C for 45–60 minutes before plating on selective antibiotic agar.'
      }
    ]
  },
  {
    id: 'les_restriction',
    topic_id: 't2_3',
    domain_id: 'd2',
    title: 'Restriction Enzyme Digestion, Endonucleases, and Cleavage Verification',
    description: 'Type II restriction endonucleases, palindromic recognition sequences, sticky vs. blunt ends, unit definitions, and buffer compatibility.',
    estimated_minutes: 18,
    display_order: 3,
    active: true,
    key_vocabulary: [
      { term: 'Restriction Endonuclease', definition: 'A bacterial defense enzyme that recognizes a specific palindromic DNA sequence and cleaves phosphodiester bonds.' },
      { term: 'Palindromic Sequence', definition: 'A double-stranded nucleic acid sequence that reads identically 5\' to 3\' on both the forward and complementary reverse strands (e.g., GAATTC).' },
      { term: 'Sticky (Cohesive) Ends', definition: 'Overhanging single-stranded 5\' or 3\' extensions produced by staggered cuts that can re-anneal by complementary base-pairing.' },
      { term: 'Blunt Ends', definition: 'Non-overhanging, fully base-paired double-stranded termini generated by straight cleavage across both strands (e.g., EcoRV, SmaI).' },
      { term: 'Star Activity', definition: 'Relaxation of cleavage specificity where an endonuclease cuts non-canonical sequences due to high glycerol, high enzyme concentration, or incorrect buffer pH.' }
    ],
    important_concepts: [
      'One Unit (1 U) of restriction enzyme is defined as the amount required to completely digest 1 µg of substrate DNA in 1 hour at 37°C in a 50 µL reaction.',
      'Restriction enzymes are stored in 50% glycerol at -20°C; because glycerol inhibits enzymes and causes star activity, enzyme volume should never exceed 10% of total reaction volume.',
      'Circular plasmid DNA has the same number of fragments as cleavage sites (n sites = n fragments); linear DNA yields n + 1 fragments.'
    ],
    worked_examples: [
      {
        title: 'Predicting Digestion Fragments for Circular vs Linear DNA',
        scenario: 'A 6,000 bp circular plasmid has 3 EcoRI recognition sites. A 6,000 bp linear PCR product also has 3 EcoRI sites.',
        solution: 'Circular plasmid: 3 cleavage cuts produce 3 fragments.\nLinear DNA: 3 cleavage cuts produce 4 fragments (cuts + 1).'
      }
    ],
    common_mistakes: [
      'Pipetting restriction enzymes with the pipette tip warm from hands or leaving the stock enzyme tube out on the bench instead of in a cold block.',
      'Adding more than 10% enzyme by volume, resulting in star activity where the enzyme cuts at non-target sites.',
      'Confusing circular plasmid fragment numbers with linear fragment numbers.'
    ],
    bace_exam_tip: 'BACE questions often ask you to count bands on a gel after restriction digest: A circular plasmid cut twice gives 2 fragments. A linear piece of DNA cut twice gives 3 fragments. Memorize this distinction!',
    sections: [
      {
        title: '1. Biological Role and Nomenclature',
        content: 'Restriction enzymes are named after the host organism from which they were isolated: EcoRI is derived from Escherichia coli, strain RY13, first enzyme discovered (I). In bacteria, restriction-modification systems protect against bacteriophage invasion by cleaving unmethylated viral DNA.'
      },
      {
        title: '2. Setting Up a Restriction Digest',
        content: 'Standard digest components include: target DNA (0.5–1.0 µg), 10X reaction buffer (5 µL), BSA (if recommended by manufacturer), restriction enzyme (1–2 µL, <10% total volume), and sterile nuclease-free water brought to a total volume of 50 µL.'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 3: SAFETY & WORKPLACE CULTURE
  // -------------------------------------------------------------
  {
    id: 'les_sds_ghs',
    topic_id: 't3_1',
    domain_id: 'd3',
    title: 'Safety Data Sheets (SDS), GHS Hazard Communication, and Chemical Hygiene',
    description: '16-section SDS interpretation, GHS pictograms, signal words (Danger vs Warning), NFPA 704 fire diamond, and chemical storage.',
    estimated_minutes: 18,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Safety Data Sheet (SDS)', definition: 'A standardized 16-section document mandated by OSHA providing comprehensive health, safety, and disposal information for a chemical.' },
      { term: 'GHS', definition: 'Globally Harmonized System of Classification and Labelling of Chemicals; an international standard for chemical hazard classification.' },
      { term: 'Signal Word', definition: 'A single word used on labels to indicate hazard severity: "DANGER" indicates severe hazard, whereas "WARNING" indicates less severe hazard.' },
      { term: 'NFPA 704 Diamond', definition: 'The standard fire safety symbol ranking hazards from 0 (minimal) to 4 (extreme) in Blue (Health), Red (Flammability), and Yellow (Instability).' }
    ],
    important_concepts: [
      'In the NFPA 704 and HMIS systems, a rating of 4 represents the HIGHEST hazard level, while 0 represents NO significant hazard. In GHS categories, however, Category 1 is the MOST severe.',
      'Section 8 of the SDS covers Exposure Controls and Personal Protection (PEL, TLV, recommended glove materials).',
      'Acids and bases must be stored in separate dedicated secondary containment cabinets; never store concentrated nitric acid with organic solvents.'
    ],
    worked_examples: [
      {
        title: 'Locating PPE Requirements on an Unknown Chemical SDS',
        scenario: 'A technician is handling acrylamide powder for SDS-PAGE preparation and needs to identify the required respiratory protection.',
        solution: 'Consult Section 8: Exposure Controls/Personal Protection. Acrylamide is a neurotoxin and potential carcinogen; Section 8 specifies handling exclusively inside a chemical fume hood with a certified particulate respirator and nitrile/neoprene gloves.'
      }
    ],
    common_mistakes: [
      'Confusing NFPA hazard numbers (where 4 is highest danger) with GHS category classifications (where Category 1 is highest danger).',
      'Storing incompatible chemicals alphabetically rather than by hazard class (e.g., placing glacial acetic acid adjacent to nitric acid).',
      'Discarding concentrated hazardous chemical waste down the laboratory sink drain.'
    ],
    bace_exam_tip: 'BACE exams love to ask: "Which SDS section contains information on First-Aid measures?" (Section 4), "Which section lists required PPE?" (Section 8), and "Which signal word represents greater danger?" (DANGER is more severe than WARNING).',
    sections: [
      {
        title: '1. OSHA Hazard Communication Standard and SDS',
        content: 'OSHA 29 CFR 1910.1200 requires that every hazardous chemical present in the workplace have an accessible Safety Data Sheet formatted in 16 standardized sections. Technicians must be trained to locate and interpret SDS information prior to handling any novel chemical substance.'
      },
      {
        title: '2. The 16 Standard SDS Sections',
        content: 'Sections 1–8 provide immediate safety response information (Identification, Hazard(s), Composition, First-Aid, Fire-Fighting, Accidental Release, Handling/Storage, Exposure Controls/PPE). Sections 9–11 and 16 provide technical and scientific data (Physical/Chemical Properties, Stability/Reactivity, Toxicological Info).'
      }
    ]
  },
  {
    id: 'les_biosafety',
    topic_id: 't3_3',
    domain_id: 'd3',
    title: 'Biosafety Levels (BSL-1 to BSL-4), PPE Protocols, and Biohazard Protocol',
    description: 'CDC/NIH biosafety containment levels, risk groups, autoclave decontamination, biohazard waste segregation, and PPE donning/doffing sequence.',
    estimated_minutes: 16,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'BSL-1', definition: 'Containment for well-characterized agents not known to consistently cause disease in immunocompetent adults (e.g., non-pathogenic E. coli K-12, Saccharomyces cerevisiae).' },
      { term: 'BSL-2', definition: 'Containment for moderate-risk agents that cause human disease of varying severity via ingestion or percutaneous injury (e.g., Staphylococcus aureus, Lentivirus, human blood).' },
      { term: 'BSL-3', definition: 'Containment for indigenous or exotic agents with potential for aerosol transmission that cause serious or lethal disease (e.g., Mycobacterium tuberculosis, SARS-CoV-2).' },
      { term: 'BSL-4', definition: 'Maximum containment for dangerous exotic agents posing high individual risk of life-threatening aerosol infections with no available vaccine or therapy (e.g., Ebola virus).' },
      { term: 'PPE Doffing Sequence', definition: 'The established protocol for removing contaminated protective gear: Gloves first, followed by Goggles/Face Shield, Gown, and Mask/Respirator.' }
    ],
    important_concepts: [
      'Biosafety cabinets (BSCs) provide biological containment; chemical fume hoods provide chemical vapor exhaust. Never handle aerosol-transmissible infectious pathogens in a standard chemical fume hood.',
      'Biohazard bags marked with the universal biohazard symbol must be autoclaved prior to municipal waste disposal or incinerated by a licensed contractor.',
      'Sharps (needles, scalpels, broken glass) must ALWAYS go into rigid, puncture-resistant sharps containers; never recap needles by hand.'
    ],
    worked_examples: [
      {
        title: 'Selecting Biosafety Level for a Transformation Lab',
        scenario: 'High school or undergraduate students are transforming E. coli DH5-alpha with the pGLO plasmid.',
        solution: 'DH5-alpha is an attenuated, non-pathogenic strain derived from E. coli K-12. This requires BSL-1 containment: standard open lab bench work, decontamination with 70% ethanol, lab coats, and gloves.'
      }
    ],
    common_mistakes: [
      'Recapping contaminated needles using two hands (leads to needle-stick injuries; use single-handed scoop or dispose directly without recapping).',
      'Disposing of intact agar plates containing bacterial colonies directly into standard classroom trash.',
      'Removing PPE out of sequence (e.g., touching eyes or face with contaminated gloves on).'
    ],
    bace_exam_tip: 'Remember the proper order of PPE removal (doffing): GLOVES FIRST (most contaminated), then eye protection, gown, and mask. Then immediately wash hands with soap and water.',
    sections: [
      {
        title: '1. The Biosafety Level Spectrum',
        content: 'The CDC and NIH classify biological laboratories into four Biosafety Levels (BSL-1 through BSL-4) based on agent infectivity, severity of disease, transmission mode, and availability of medical treatments.'
      },
      {
        title: '2. Waste Management & Autoclave Deactivation',
        content: 'Solid biohazardous materials must be collected in autoclavable polypropylene biohazard bags. Sterilization cycles must be validated with chemical indicator tape and biological spore test ampoules (Geobacillus stearothermophilus).'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 4: APPLIED MATHEMATICS
  // -------------------------------------------------------------
  {
    id: 'les_math_molarity',
    topic_id: 't4_1',
    domain_id: 'd4',
    title: 'Applied Math: Molarity, Formula Weight, and Solution Calculations',
    description: 'Calculate mass required for molar solutions, hydration factors, and unit conversion for laboratory reagents.',
    estimated_minutes: 22,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Molarity (M)', definition: 'The concentration of a solution expressed as moles of solute per liter of solution (mol/L).' },
      { term: 'Formula Weight / MW', definition: 'The sum of the atomic weights of all atoms in a compound formula unit, expressed in grams per mole (g/mol).' },
      { term: 'Hydrate', definition: 'A chemical compound containing water molecules loosely bound to its ionic lattice (e.g., CuSO4 · 5H2O).' }
    ],
    important_concepts: [
      'The Universal Mass Equation: Mass (g) = Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol).',
      'Always convert milliliters to liters before multiplying: 500 mL = 0.500 L; 250 mL = 0.250 L.',
      'When weighing hydrated salts, you must use the total formula weight including the bound water molecules.',
      'Never dissolve solid directly to the final volume; dissolve in ~80% volume first, adjust pH, then "QS" (quantum satis - bring up to final volume with solvent).'
    ],
    worked_examples: [
      {
        title: 'Preparing a 2.0 M NaCl Buffer Solution',
        scenario: 'How many grams of sodium chloride (NaCl, MW = 58.44 g/mol) are required to prepare 500 mL of a 2.0 M solution?',
        calculation: 'Step 1: Convert volume: 500 mL = 0.500 L\nStep 2: Apply formula: Mass = M × V × MW\nMass = (2.0 mol/L) × (0.500 L) × (58.44 g/mol)\nMass = 1.0 mol × 58.44 g/mol = 58.44 g',
        solution: 'Weigh out 58.44 g of NaCl, dissolve in approximately 400 mL of dH2O, and bring to 500 mL in a volumetric flask.'
      }
    ],
    common_mistakes: [
      'Multiplying by volume in mL directly without converting to liters (yielding an answer that is 1000x too large).',
      'Adding the full volume of water to the dry solute in a graduated cylinder rather than dissolving first, resulting in excess total volume.',
      'Forgetting the molecular weight of waters of hydration (e.g. anhydrous vs pentahydrate).'
    ],
    bace_exam_tip: 'On the BACE exam, you will definitely be asked to calculate the grams of solute needed for a buffer. Memorize Mass = M × V(L) × MW. Double check that volume is in LITERS!',
    sections: [
      {
        title: '1. The Language of Chemical Concentration',
        content: 'Molarity is the most fundamental unit of concentration in life science laboratories. A 1 M solution contains 1 mole (6.022 × 10^23 molecules) of solute dissolved in enough water to make exactly 1 liter of total solution.'
      },
      {
        title: '2. Step-by-Step Preparation Protocol',
        content: '1. Calculate mass required using Mass = M × V(L) × MW.\n2. Tare an analytical balance with a weigh boat or weighing paper.\n3. Weigh the calculated solute mass accurately to the required precision.\n4. Transfer solute into a beaker with a magnetic stir bar and ~70–80% of final solvent volume.\n5. Stir until completely dissolved; check and adjust pH if required.\n6. Quantitatively transfer to a graduated cylinder or volumetric flask and bring up to the calibration mark with deionized water (QS to final volume).\n7. Label bottle according to Good Documentation Practices (Chemical name, concentration, date, initials, hazards).'
      }
    ]
  },
  {
    id: 'les_c1v1_percent',
    topic_id: 't4_2',
    domain_id: 'd4',
    title: 'Dilution Equations (C1V1 = C2V2) & Percent Solutions (% w/v, % v/v)',
    description: 'Stock dilutions, concentrated fold stocks (e.g., 50X TAE), weight-per-volume percentage, and volume-per-volume solutions.',
    estimated_minutes: 20,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'C1V1 = C2V2', definition: 'The fundamental conservation of mass equation for dilutions: Initial Concentration × Initial Volume = Final Concentration × Final Volume.' },
      { term: 'Percent Weight-in-Volume (% w/v)', definition: 'Grams of dry solute dissolved in 100 mL of total solution (e.g., 1% agarose = 1 g per 100 mL).' },
      { term: 'Percent Volume-in-Volume (% v/v)', definition: 'Milliliters of liquid solute in 100 mL of total solution (e.g., 70% ethanol = 70 mL 100% ethanol + 30 mL water).' },
      { term: 'Fold Concentration (X)', definition: 'A designation indicating how many times more concentrated a stock solution is compared to the working (1X) concentration.' }
    ],
    important_concepts: [
      'In C1V1 = C2V2, concentration units must match on both sides, and volume units must match on both sides.',
      'To dilute an NX stock to 1X: V1 = V2 / N (e.g., preparing 1000 mL of 1X from 50X stock: V1 = 1000 mL / 50 = 20 mL stock + 980 mL water).',
      'Percent (w/v) is always calculated per 100 mL of solution. For 500 mL of 2% agarose: 2 g/100 mL × 500 mL = 10 g.'
    ],
    worked_examples: [
      {
        title: 'Preparing 2 Liters of 1X TAE Running Buffer from a 50X Stock',
        scenario: 'A student needs 2.0 L (2000 mL) of 1X TAE for gel electrophoresis.',
        calculation: 'C1 = 50X, V1 = ?, C2 = 1X, V2 = 2000 mL\n(50X)(V1) = (1X)(2000 mL)\nV1 = 2000 / 50 = 40 mL of 50X TAE stock.\nVolume of water = 2000 mL - 40 mL = 1960 mL dH2O.',
        solution: 'Measure 40 mL of 50X stock and add 1960 mL of deionized water.'
      }
    ],
    common_mistakes: [
      'Adding 40 mL of stock to 2000 mL of water (total volume would be 2040 mL, altering final concentration). Always subtract V1 from V2 to find diluent volume.',
      'Treating % w/v as grams per liter instead of grams per 100 mL.'
    ],
    bace_exam_tip: 'Whenever a problem asks for % (w/v), anchor your thinking to: 1% = 1 gram in 100 mL. Scale up or down proportionally!',
    sections: [
      {
        title: '1. The Stock Dilution Principle',
        content: 'Biotechnology laboratories prepare reagents as concentrated stocks (e.g., 10X PBS, 50X TAE) to save storage space and prevent microbial spoilage. Diluting these stocks to 1X working concentration relies on the dilution formula C1V1 = C2V2.'
      },
      {
        title: '2. Working with Percentage Solutions',
        content: 'Percentage solutions express concentration parts per hundred. Solid in liquid is expressed as % w/v (grams per 100 mL). Liquid in liquid is expressed as % v/v (mL of solute per 100 mL of total solution).'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 5: BIOCHEMISTRY & MOLECULAR BIOLOGY
  // -------------------------------------------------------------
  {
    id: 'les_central_dogma',
    topic_id: 't5_2',
    domain_id: 'd5',
    title: 'Molecular Biology & Central Dogma: Replication, Transcription, Translation',
    description: 'DNA double helix antiparallel structure, RNA polymerases, mRNA processing, codon tables, tRNA anticodons, and ribosomes.',
    estimated_minutes: 20,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Central Dogma', definition: 'The core tenet of molecular biology stating that genetic information flows from DNA -> RNA -> Protein.' },
      { term: 'Transcription', definition: 'The synthesis of a complementary messenger RNA (mRNA) transcript from a DNA template by RNA polymerase.' },
      { term: 'Translation', definition: 'The decoding of an mRNA sequence by ribosomes and tRNAs into a polypeptide chain of amino acids.' },
      { term: 'Phosphodiester Bond', definition: 'The covalent chemical linkage connecting the 3\' carbon atom of one sugar molecule to the 5\' carbon atom of another in DNA/RNA.' },
      { term: 'Hydrogen Bonding', definition: 'Non-covalent bonds pairing bases across opposite strands: 2 H-bonds between A-T, and 3 H-bonds between G-C.' }
    ],
    important_concepts: [
      'G-C pairs have 3 hydrogen bonds, while A-T pairs have only 2; therefore, sequences with high G-C content have higher melting temperatures (Tm).',
      'The genetic code is redundant (degenerate) because multiple codons encode the same amino acid, but unambiguous because each codon specifies only one amino acid.',
      'Start codon is AUG (Methionine in eukaryotes, fMet in prokaryotes); stop codons are UAA, UAG, and UGA.'
    ],
    worked_examples: [
      {
        title: 'Transcribing and Translating a DNA Coding Strand',
        scenario: 'DNA coding strand sequence is: 5\'-ATG GCA GCT TAA-3\'. What is the mRNA and peptide?',
        solution: 'Coding strand has identical sequence to mRNA (except T is replaced by U):\nmRNA: 5\'-AUG GCA GCU UAA-3\'\nCodons: AUG (Met) - GCA (Ala) - GCU (Ala) - UAA (Stop).\nPeptide: Met-Ala-Ala.'
      }
    ],
    common_mistakes: [
      'Using the template strand instead of the coding strand when reading standard genetic code tables.',
      'Forgetting that RNA contains Uracil (U) instead of Thymine (T).'
    ],
    bace_exam_tip: 'Remember the number of hydrogen bonds between base pairs: A-T has 2, G-C has 3. Because G-C has 3 bonds, higher GC content DNA requires higher temperatures to denature!',
    sections: [
      {
        title: '1. The Structure of Genetic Material',
        content: 'DNA consists of two antiparallel polynucleotide strands wound in a right-handed double helix. Nitrogenous bases project inward and pair according to Chargaff rules (A with T, G with C).'
      },
      {
        title: '2. From Gene to Functional Protein',
        content: 'In prokaryotes, transcription and translation are coupled in the cytoplasm. In eukaryotes, pre-mRNA undergoes 5\' capping, 3\' polyadenylation, and splicing in the nucleus prior to nuclear export.'
      }
    ]
  },
  {
    id: 'les_enzymes',
    topic_id: 't5_3',
    domain_id: 'd5',
    title: 'Enzyme Kinetics, Active Sites, Substrates, and Environmental Factors',
    description: 'Enzyme catalysis, lowering of activation energy, Michaelis-Menten kinetics, optimal pH and temperature, and enzyme inhibition.',
    estimated_minutes: 18,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'Active Site', definition: 'The specific catalytic pocket of an enzyme where substrate molecules bind and undergo chemical transformation.' },
      { term: 'Activation Energy (Ea)', definition: 'The minimum threshold of energy required to initiate a chemical reaction; enzymes accelerate reactions by lowering Ea.' },
      { term: 'Denaturation', definition: 'The loss of tertiary and secondary protein structure due to extreme heat or pH, abolishing catalytic activity.' },
      { term: 'Competitive Inhibitor', definition: 'A molecule that directly competes with substrate for binding at the active site; overcome by increasing substrate concentration.' },
      { term: 'Non-Competitive Inhibitor', definition: 'An inhibitor that binds to an allosteric site, altering enzyme conformation and reducing Vmax regardless of substrate concentration.' }
    ],
    important_concepts: [
      'Enzymes accelerate reaction rates by lowering the activation energy barrier; they do NOT alter the net free energy change (delta G) or equilibrium constant.',
      'Every enzyme exhibits an optimal temperature and pH; deviating from this optimum reduces activity or causes irreversible denaturation.',
      'Competitive inhibitors increase apparent Km without changing Vmax; non-competitive inhibitors decrease Vmax without changing Km.'
    ],
    worked_examples: [
      {
        title: 'Differentiating Inhibition Types Experimentally',
        scenario: 'Adding excess substrate restores the maximum reaction velocity (Vmax) of an enzyme in the presence of an unknown inhibitor.',
        solution: 'Because high substrate outcompetes the inhibitor for the catalytic active site, the inhibitor is COMPETITIVE.'
      }
    ],
    common_mistakes: [
      'Believing enzymes provide energy to drive non-spontaneous reactions (enzymes only lower activation energy).',
      'Assuming that boiling an enzyme increases reaction speed because molecular collisions increase (boiling denatures the enzyme).'
    ],
    bace_exam_tip: 'Look for questions testing competitive vs non-competitive inhibition. If the effect can be overcome by flooding the system with substrate, it is COMPETITIVE!',
    sections: [
      {
        title: '1. Catalytic Principles of Biocatalysts',
        content: 'Enzymes are specialized globular protein catalysts that accelerate chemical reactions by factors of 10^6 to 10^12 without being consumed in the process.'
      },
      {
        title: '2. Environmental Sensitivity of Enzymes',
        content: 'Subtle shifts in pH alter the ionization states of amino acid side chains in the active site. Temperatures exceeding the thermal optimum disrupt hydrophobic interactions and hydrogen bonds, causing unfolding and denaturation.'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 6: REGULATION & QUALITY
  // -------------------------------------------------------------
  {
    id: 'les_cgmp_gdp',
    topic_id: 't6_1',
    domain_id: 'd6',
    title: 'cGMP Guidelines, Good Documentation Practices (GDP), and Traceability',
    description: 'FDA CFR Title 21, cGMP regulations, ALCOA+ data integrity principles, single-strike error corrections, and batch production records.',
    estimated_minutes: 20,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'cGMP', definition: 'Current Good Manufacturing Practice; FDA regulations (21 CFR Parts 210/211) enforcing that pharmaceutical and biological products are consistently produced and controlled according to quality standards.' },
      { term: 'Good Documentation Practice (GDP)', definition: 'Standards that ensure data integrity, legibility, traceability, and defensibility across all regulated life science records.' },
      { term: 'Single-Strike Rule', definition: 'The GDP requirement that errors in written records must be corrected with a single horizontal strike-through line, initials, date, and reason for correction.' },
      { term: 'ALCOA+', definition: 'Core data integrity framework: Attributable, Legible, Contemporaneous, Original, Accurate, Complete, Consistent, Enduring, and Available.' }
    ],
    important_concepts: [
      'In regulated bioscience manufacturing: "If it wasn\'t documented, it never happened!"',
      'Never use correction fluid (White-Out), erasers, or blacked-out scribble over erroneous data in a laboratory notebook or batch record.',
      'All entries must be written in permanent indelible blue or black ink and recorded contemporaneously at the exact moment the task is executed.'
    ],
    worked_examples: [
      {
        title: 'Correcting an Erroneous Volume Entry in a Batch Record',
        scenario: 'A technician accidentally writes "15.4 mL" instead of "14.5 mL" in a manufacturing batch record.',
        solution: '1. Draw a single clean line through "15.4 mL" so the original entry remains legible.\n2. Write the correct value "14.5 mL" adjacent to it.\n3. Add technician initials (e.g., JD), current date (e.g., 12-Sep-2026), and brief error code (e.g., "EE" for entry error).'
      }
    ],
    common_mistakes: [
      'Using White-Out or scribbling over a mistake until the original number is illegible (violates FDA GDP and voids the audit record).',
      'Back-dating or pre-dating entries instead of signing at the exact time the step occurred.',
      'Recording data on loose paper scraps or sticky notes with intention to transfer to the official record later.'
    ],
    bace_exam_tip: 'The single-strike correction rule appears consistently on the BACE: A single line through the error, correct data written nearby, accompanied by initials and date. NO liquid paper, NO pencil!',
    sections: [
      {
        title: '1. Regulatory Mandates and FDA Oversight',
        content: 'Biopharmaceuticals, vaccines, and diagnostic medical devices must be manufactured under strict federal regulations to ensure safety, identity, strength, purity, and quality (SISPQ).'
      },
      {
        title: '2. Audit Trails and Data Integrity',
        content: 'Regulatory auditors inspect batch records and computerized system audit trails to verify that data has not been deleted, altered, or fabricated.'
      }
    ]
  },
  {
    id: 'les_qa_qc_sops',
    topic_id: 't6_2',
    domain_id: 'd6',
    title: 'Quality Assurance vs. Quality Control & SOP Compliance',
    description: 'Distinguishing QA from QC, Standard Operating Procedures (SOPs), deviations, Corrective and Preventive Actions (CAPA), and out-of-specification (OOS).',
    estimated_minutes: 18,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'Quality Assurance (QA)', definition: 'Process-oriented activities focused on preventing defects and ensuring manufacturing systems comply with quality standards.' },
      { term: 'Quality Control (QC)', definition: 'Product-oriented activities focused on identifying defects through testing and analysis of raw materials, in-process samples, and finished product.' },
      { term: 'Standard Operating Procedure (SOP)', definition: 'An authorized, controlled document detailing step-by-step instructions for routinely performing an operational activity.' },
      { term: 'CAPA', definition: 'Corrective and Preventive Action; a formal regulatory system to investigate root causes of non-conformances and implement permanent solutions.' },
      { term: 'Out of Specification (OOS)', definition: 'A test result that falls outside the pre-established acceptance criteria approved in regulatory filings.' }
    ],
    important_concepts: [
      'QA focuses on prevention and processes; QC focuses on detection and product testing.',
      'Technicians must follow current approved SOP revisions; working from an outdated revision or deviating without prior QA authorization constitutes a critical compliance violation.',
      'When an OOS result occurs, the sample cannot simply be re-tested until it passes; a formal laboratory investigation must occur.'
    ],
    worked_examples: [
      {
        title: 'Classifying a Laboratory Activity as QA or QC',
        scenario: 'Activity A: Reviewing and approving an autoclave validation protocol. Activity B: Testing the pH of a finished buffer batch on an analytical pH meter.',
        solution: 'Activity A is QA (process compliance, document approval, prevention).\nActivity B is QC (physical measurement, analytical testing of product).'
      }
    ],
    common_mistakes: [
      'Confusing QA and QC roles (thinking QC writes the quality manual, or QA performs bench-top ELISA assays).',
      'Performing unauthorized modifications to an SOP because a "better shortcut" was discovered.'
    ],
    bace_exam_tip: 'Remember the core distinction: QA is PROCESS-oriented (preventing defects through audits and documentation), while QC is PRODUCT-oriented (inspecting and testing actual samples at the bench).',
    sections: [
      {
        title: '1. Quality Management Architecture',
        content: 'Quality management systems in biotechnology harmonize QA oversight and QC testing to ensure patient safety and product efficacy.'
      },
      {
        title: '2. Standard Operating Procedures and Deviation Reporting',
        content: 'SOPs ensure that identical procedures yield identical results across different operators and shifts. Any departure from an SOP must be formally documented as a deviation.'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 7: STANDARD EQUIPMENT
  // -------------------------------------------------------------
  {
    id: 'les_autoclave_centrifuge',
    topic_id: 't7_1',
    domain_id: 'd7',
    title: 'Autoclave Sterilization Cycles & Centrifuge Rotor Mechanics',
    description: 'Steam sterilization parameters (121°C at 15 psi), biological spore indicators, centrifuge rotor balancing, RPM vs. RCF conversions.',
    estimated_minutes: 20,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Autoclave', definition: 'A pressure chamber using saturated pressurized steam to sterilize equipment, media, and biohazardous waste.' },
      { term: 'Sterilization Parameters', definition: 'The standard minimum cycle: 121°C (250°F) at 15 pounds per square inch (psi) gauge pressure for 20–30 minutes.' },
      { term: 'Geobacillus stearothermophilus', definition: 'The thermophilic endospore-forming bacterium used as the biological indicator gold standard for validating autoclave sterilization cycles.' },
      { term: 'Relative Centrifugal Force (RCF)', definition: 'The force exerted on a sample during centrifugation relative to Earth gravity (g-force); RCF = 1.118 × 10^-5 × r(cm) × (RPM)^2.' },
      { term: 'Revolutions Per Minute (RPM)', definition: 'The rotational speed of a centrifuge rotor; unlike RCF, RPM is not universal because g-force depends on rotor radius.' }
    ],
    important_concepts: [
      'Autoclave tape only confirms exposure to heat; only biological indicators (bacterial spores) verify true biological sterilization.',
      'Caps on liquid bottles must be loosened half a turn before autoclaving; tightly sealed bottles explode due to internal pressure build-up.',
      'Centrifuges must ALWAYS be balanced by placing tubes of equal mass directly opposite each other across the rotor axis.',
      'Scientific protocols must specify RCF (g-force) rather than RPM to ensure reproducibility across centrifuges with different rotor diameters.'
    ],
    worked_examples: [
      {
        title: 'Balancing a Centrifuge with 3 Sample Tubes',
        scenario: 'A technician needs to centrifuge 3 microcentrifuge tubes containing 1.0 mL of cell lysate in a 12-place fixed-angle rotor.',
        solution: 'Options: Place the 3 tubes in positions 12, 4, and 8 (equilateral triangle with 4 empty slots between each), OR prepare a balance blank tube with 1.0 mL water and place pairs opposite each other (e.g., 1 & 7, 4 & 10).'
      }
    ],
    common_mistakes: [
      'Balancing centrifuge tubes by liquid volume rather than mass (different liquids have different densities, creating dangerous rotor imbalance).',
      'Tightening bottle caps completely before placing media into an autoclave, causing pressure explosion.',
      'Reporting centrifugation protocol parameters in RPM without specifying rotor radius or RCF.'
    ],
    bace_exam_tip: 'Two guaranteed BACE questions: 1. Autoclave parameters: 121°C at 15 psi for 20–30 minutes. 2. Why RCF is preferred over RPM: RCF measures actual centrifugal gravitational force, whereas RPM depends on rotor radius!',
    sections: [
      {
        title: '1. High-Pressure Steam Sterilization',
        content: 'Moist heat destroys microorganisms primarily by coagulating and denaturing structural proteins and enzymes. Boiling water at ambient atmospheric pressure (100°C) cannot kill bacterial endospores; autoclaving raises steam pressure to 15 psi, allowing steam to reach 121°C.'
      },
      {
        title: '2. Centrifugation Physics and Rotor Care',
        content: 'Centrifugation uses centrifugal force to separate particles suspended in a liquid according to particle size, shape, and density. Imbalanced rotors spinning at high velocity generate catastrophic mechanical stress that can destroy the instrument.'
      }
    ]
  },
  {
    id: 'les_ph_spec',
    topic_id: 't7_2',
    domain_id: 'd7',
    title: 'pH Meter Calibration, Maintenance & Spectrophotometric Absorbance',
    description: 'Electrode calibration with reference buffers (pH 4, 7, 10), storage in 3M KCl, Beer-Lambert law (A = ebc), cuvette handling, and blanking.',
    estimated_minutes: 20,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'pH Meter', definition: 'An electronic potentiometer that measures the hydrogen ion activity (acidity/alkalinity) in water-based solutions via a glass bulb electrode.' },
      { term: 'Two/Three-Point Calibration', definition: 'Standardizing a pH meter using reference buffers (pH 7.0 neutral, plus pH 4.0 for acidic or pH 10.0 for basic ranges) prior to measurement.' },
      { term: 'Electrode Storage Solution', definition: '3M potassium chloride (KCl); electrodes must never be allowed to dry out or stored in deionized water, which leaches electrolyte ions.' },
      { term: 'Beer-Lambert Law', definition: 'A = ε × b × c; Absorbance is directly proportional to molar absorptivity (ε), path length (b), and analyte concentration (c).' },
      { term: 'Blanking (Zeroing)', definition: 'Calibrating a spectrophotometer to 0.000 Absorbance using a cuvette containing only the solvent/buffer to subtract background absorbance.' }
    ],
    important_concepts: [
      'Always rinse the pH electrode with deionized water and blot dry with a lint-free wipe (Kimwipe); NEVER rub or wipe the delicate glass bulb, which creates static electrical interference.',
      'Electrode storage in pure water (dH2O) destroys the internal electrolyte concentration gradient; store in 3M KCl or designated buffer.',
      'Handle spectrophotometer cuvettes exclusively by their frosted or grooved sides; fingerprint grease on clear optical windows absorbs light and falsely elevates readings.'
    ],
    worked_examples: [
      {
        title: 'Zeroing a Spectrophotometer for a Bradford Protein Assay',
        scenario: 'A student is measuring BSA protein standards prepared in 1X PBS with Coomassie G-250 dye.',
        solution: 'The blank cuvette must contain: 1X PBS (same buffer as standards) plus Coomassie dye, but NO protein. This ensures that the reading reflects only the blue Coomassie-protein complex, subtracting background dye absorbance.'
      }
    ],
    common_mistakes: [
      'Storing pH electrodes in distilled/deionized water or leaving them dry exposed to air.',
      'Rubbing the glass bulb with paper towels instead of gently blotting with a Kimwipe.',
      'Forgetting to blank the spectrophotometer at the exact wavelength of the assay.'
    ],
    bace_exam_tip: 'BACE questions frequently test pH electrode storage: Store in 3M KCl storage solution, NEVER in deionized water! For spectrophotometry, remember that the blank cuvette must contain all buffer/dye components EXCEPT the analyte of interest.',
    sections: [
      {
        title: '1. Electrochemical Principles of pH Measurement',
        content: 'A glass pH electrode develops an electrical potential across a thin hydrated gel layer on the glass bulb proportional to the hydrogen ion activity difference between the internal buffer and sample solution.'
      },
      {
        title: '2. Principles of UV-Vis Spectrophotometry',
        content: 'Spectrophotometers pass light of a selected wavelength through a sample in a cuvette. The photodetector measures transmitted light (T), converted logarithmically to Absorbance: A = -log10(T).'
      }
    ]
  },

  // -------------------------------------------------------------
  // DOMAIN 8: EXPERIMENTAL DESIGN & DATA ANALYSIS
  // -------------------------------------------------------------
  {
    id: 'les_controls_variables',
    topic_id: 't8_1',
    domain_id: 'd8',
    title: 'Experimental Variables & Positive/Negative/Vehicle Controls',
    description: 'Independent, dependent, and controlled variables, vehicle controls, positive controls for assay validity, and negative controls for contamination.',
    estimated_minutes: 18,
    display_order: 1,
    active: true,
    key_vocabulary: [
      { term: 'Independent Variable', definition: 'The experimental factor that is intentionally manipulated or varied by the researcher (plotted on the X-axis).' },
      { term: 'Dependent Variable', definition: 'The measurable outcome or response observed as a result of changing the independent variable (plotted on the Y-axis).' },
      { term: 'Controlled Variables', definition: 'All environmental and experimental parameters held constant across all treatment groups to isolate the independent variable.' },
      { term: 'Positive Control', definition: 'A treatment group known from prior evidence to produce the expected positive outcome, verifying that reagents and equipment function properly.' },
      { term: 'Negative Control', definition: 'A treatment group where no response is expected (e.g., no-template PCR control), verifying that reagents are free of contamination.' },
      { term: 'Vehicle Control', definition: 'A control group treated with the solvent or carrier liquid alone (e.g., DMSO or ethanol) to rule out solvent toxicity or interference.' }
    ],
    important_concepts: [
      'If the positive control fails (shows no signal), the entire experiment is invalid and inconclusive; reagents or protocol failed.',
      'If the negative control fails (shows a positive signal), contamination is present, invalidating all test samples.',
      'Vehicle controls are necessary whenever a drug or compound is dissolved in an organic solvent (such as DMSO) rather than water.'
    ],
    worked_examples: [
      {
        title: 'Interpreting a PCR Gel with a Contaminated No-Template Control',
        scenario: 'A researcher runs a PCR experiment. The positive control shows a 500 bp band. The experimental samples show 500 bp bands. The negative control (water instead of DNA) also shows a 500 bp band.',
        solution: 'Because the negative control (NTC) amplified a band, the PCR reagents (water, primers, or master mix) are contaminated with template DNA. The entire experiment is invalid and must be discarded and repeated with fresh reagents.'
      }
    ],
    common_mistakes: [
      'Confusing the independent variable (what the experimenter changes) with the dependent variable (what is measured).',
      'Reporting experimental results as valid when the negative control shows a positive signal.',
      'Omitting a vehicle control when testing hydrophobic drugs dissolved in DMSO or ethanol.'
    ],
    bace_exam_tip: 'On the BACE: A negative control proves absence of contamination. A positive control proves assay reagents work. If either control fails, the experiment is INVALID!',
    sections: [
      {
        title: '1. The Structure of Controlled Scientific Experiments',
        content: 'Scientific experiments test specific, falsifiable hypotheses. Isolating cause and effect requires holding all variables constant while systematically altering a single independent variable.'
      },
      {
        title: '2. The Role of Controls in Assay Validation',
        content: 'Controls provide the experimental baseline. Without positive and negative controls, anomalous readings cannot be distinguished from biological phenomena or experimental error.'
      }
    ]
  },
  {
    id: 'les_standard_curves',
    topic_id: 't8_2',
    domain_id: 'd8',
    title: 'Standard Curves, Linear Regression & Unknown Interpolation',
    description: 'Bovine Serum Albumin (BSA) protein standard curves, linear regression equations (y = mx + b), R-squared goodness of fit, and interpolation.',
    estimated_minutes: 20,
    display_order: 2,
    active: true,
    key_vocabulary: [
      { term: 'Standard Curve', definition: 'A quantitative calibration plot showing the relationship between known concentrations of a substance and their assay response (e.g., absorbance).' },
      { term: 'Linear Dynamic Range', definition: 'The concentration span over which the assay response is directly proportional to analyte concentration and obeys Beer\'s Law.' },
      { term: 'Coefficient of Determination (R^2)', definition: 'A statistical measure of how well the regression line approximates real data points; an R^2 value >= 0.98 is typically required in bioscience QC.' },
      { term: 'Interpolation', definition: 'Calculating unknown concentrations that fall WITHIN the range of tested known standard points.' },
      { term: 'Extrapolation', definition: 'Estimating values OUTSIDE the tested range; prone to severe error because linearity and assay saturation are unknown.' }
    ],
    important_concepts: [
      'In standard curve equations y = mx + b: y is the assay response (Absorbance), and x is the analyte concentration (mg/mL or µg/mL).',
      'To calculate unknown concentration: x = (y - b) / m.',
      'If an unknown sample absorbance exceeds the highest standard point, the sample must be diluted and re-assayed so the reading falls within the linear dynamic range.',
      'Never extrapolate beyond the highest standard in quantitative regulatory bioassays.'
    ],
    worked_examples: [
      {
        title: 'Calculating Unknown Protein Concentration from a Standard Curve',
        scenario: 'A Bradford assay standard curve yields linear regression equation y = 0.005x + 0.02, with R^2 = 0.995 (where y = Absorbance at 595 nm, and x = protein in µg/mL). An unknown sample has an absorbance of 0.420.',
        calculation: 'y = 0.420\n0.420 = 0.005x + 0.02\n0.420 - 0.02 = 0.005x\n0.400 = 0.005x\nx = 0.400 / 0.005 = 80 µg/mL.',
        solution: 'The concentration of protein in the unknown sample is 80 µg/mL.'
      }
    ],
    common_mistakes: [
      'Plugging the unknown absorbance into x instead of y in the formula y = mx + b.',
      'Forgetting to multiply by the dilution factor if the sample was diluted prior to assaying.',
      'Accepting a standard curve with an unacceptable R^2 value (e.g., R^2 = 0.85).'
    ],
    bace_exam_tip: 'BACE math questions frequently ask you to solve for unknown concentration using a line of best fit. Remember: Absorbance is Y, and concentration is X! To find X: x = (y - b) / m. If the sample was diluted, multiply by the dilution factor at the end!',
    sections: [
      {
        title: '1. Quantitative Calibration in Analytical Biotechnology',
        content: 'Biological samples (cell extracts, purified recombinant proteins) rarely come with known concentrations. Standard curves provide the conversion bridge between physical optical signals and chemical mass.'
      },
      {
        title: '2. Evaluating Goodness of Fit and Assay Limits',
        content: 'Linear regression calculates the best-fit line through standard data points. The R^2 value indicates the proportion of variance explained by the model. Values below 0.98 signify pipetting inaccuracy, sample degradation, or detector saturation.'
      }
    ]
  },
  ...COVERAGE_EXPANSION_LESSONS,
];
