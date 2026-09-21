import { Question } from '../../types/database';

export const DOMAIN_LESSONS_QUESTIONS: Question[] = [
  // =========================================================================
  // DOMAIN 1: les_electrophoresis (Agarose Gel Electrophoresis)
  // =========================================================================
  {
    id: 'q_gel_1',
    lesson_id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    question_text: 'In agarose gel electrophoresis, toward which electrical electrode does DNA migrate, and why?',
    choices: [
      { id: 'c1', choice_text: 'Toward the negative cathode, because DNA has positively charged nitrogenous bases.', is_correct: false },
      { id: 'c2', choice_text: 'Toward the positive anode, because DNA has a negatively charged sugar-phosphate backbone.', is_correct: true },
      { id: 'c3', choice_text: 'Toward the positive anode, because ethidium bromide adds positive charge to DNA.', is_correct: false },
      { id: 'c4', choice_text: 'Toward the negative cathode, because running buffers provide positive hydration shells.', is_correct: false }
    ],
    explanation: 'The repeating phosphate groups in the phosphodiester backbone of DNA carry negative charges at neutral/basic running pH. Under an electrical current, DNA is repelled by the negative cathode (black) and migrates toward the positive anode (red). Remember: "Run to the Red".',
    difficulty: 'Easy',
    bace_standard: 'Domain 1: Biotechnology Skills - Electrophoresis'
  },
  {
    id: 'q_gel_2',
    lesson_id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    question_text: 'Which percentage of agarose gel will provide the sharpest resolution when separating small DNA fragments ranging between 100 bp and 400 bp?',
    choices: [
      { id: 'c1', choice_text: '0.6% agarose', is_correct: false },
      { id: 'c2', choice_text: '0.8% agarose', is_correct: false },
      { id: 'c3', choice_text: '1.0% agarose', is_correct: false },
      { id: 'c4', choice_text: '2.0% agarose', is_correct: true }
    ],
    explanation: 'Higher percentage agarose gels (1.5% to 2.5%) create smaller pore sizes in the polymer matrix, effectively retarding and separating smaller DNA molecules (100–500 bp). Lower percentage gels (0.7–0.8%) have larger pores suitable for high molecular weight fragments (2–10 kb).',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Biotechnology Skills - Gel Matrix'
  },
  {
    id: 'q_gel_3',
    lesson_id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    question_text: 'What would happen if a student accidentally prepared the running buffer using pure deionized water instead of 1X TAE or 1X TBE?',
    choices: [
      { id: 'c1', choice_text: 'DNA would migrate 10 times faster with razor-sharp band resolution.', is_correct: false },
      { id: 'c2', choice_text: 'Minimal electrical current will flow initially; as resistance increases, the gel overheats and melts while DNA bands diffuse or fail to migrate properly.', is_correct: true },
      { id: 'c3', choice_text: 'The DNA fragments would reverse direction and migrate into the wells.', is_correct: false },
      { id: 'c4', choice_text: 'Fluorescent stains like GelRed would decompose instantly.', is_correct: false }
    ],
    explanation: 'Pure deionized water lacks ions to conduct electricity. The lack of electrolyte creates immense electrical resistance, which generates severe heat (Joule heating), melting the agarose gel and distorting or stopping DNA migration.',
    difficulty: 'Hard',
    bace_standard: 'Domain 1: Biotechnology Skills - Running Buffers'
  },
  {
    id: 'q_gel_4',
    lesson_id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    question_text: 'What is the primary function of glycerol or Ficoll contained within electrophoresis loading dye?',
    choices: [
      { id: 'c1', choice_text: 'To denature secondary DNA hairpin loops.', is_correct: false },
      { id: 'c2', choice_text: 'To increase sample density so it sinks to the bottom of the well under running buffer.', is_correct: true },
      { id: 'c3', choice_text: 'To fluoresce under ultraviolet light.', is_correct: false },
      { id: 'c4', choice_text: 'To covalently label the 5\' ends of DNA fragments.', is_correct: false }
    ],
    explanation: 'Loading dyes contain high-density reagents such as glycerol, Ficoll, or sucrose. This increases the specific gravity of the DNA solution relative to the surrounding running buffer, causing the sample to sink cleanly into the bottom of the well rather than diffusing away.',
    difficulty: 'Easy',
    bace_standard: 'Domain 1: Biotechnology Skills - Loading Dyes'
  },
  {
    id: 'q_gel_5',
    lesson_id: 'les_electrophoresis',
    topic_id: 't1_8',
    domain_id: 'd1',
    question_text: 'When analyzing an agarose gel after electrophoresis, how is fragment size related to distance migrated through the gel?',
    choices: [
      { id: 'c1', choice_text: 'Distance migrated is directly proportional to base pair size.', is_correct: false },
      { id: 'c2', choice_text: 'Distance migrated is inversely proportional to the log10 of molecular size (base pairs).', is_correct: true },
      { id: 'c3', choice_text: 'Migration distance is determined solely by GC base composition regardless of size.', is_correct: false },
      { id: 'c4', choice_text: 'Distance migrated is inversely proportional to the square root of buffer pH.', is_correct: false }
    ],
    explanation: 'Smaller DNA molecules maneuver through the agarose polymer pores with less frictional resistance than larger molecules. Migration distance is inversely proportional to the logarithm of molecular weight (log10 of base pairs).',
    difficulty: 'Medium',
    bace_standard: 'Domain 1: Biotechnology Skills - Band Sizing'
  },

  // =========================================================================
  // DOMAIN 2: les_pcr (Polymerase Chain Reaction)
  // =========================================================================
  {
    id: 'q_pcr_1',
    lesson_id: 'les_pcr',
    topic_id: 't2_1',
    domain_id: 'd2',
    question_text: 'What are the three fundamental thermal phases of a standard PCR cycle, in correct chronological sequence?',
    choices: [
      { id: 'c1', choice_text: 'Annealing (72°C) -> Denaturation (94°C) -> Extension (55°C)', is_correct: false },
      { id: 'c2', choice_text: 'Denaturation (94–95°C) -> Annealing (50–65°C) -> Extension (72°C)', is_correct: true },
      { id: 'c3', choice_text: 'Extension (94°C) -> Primer Annealing (72°C) -> Ligation (4°C)', is_correct: false },
      { id: 'c4', choice_text: 'Denaturation (55°C) -> Extension (72°C) -> Annealing (95°C)', is_correct: false }
    ],
    explanation: 'A PCR cycle consists of: 1. Denaturation (~94–95°C) to separate double-stranded DNA; 2. Annealing (~50–65°C) for primers to bind complementary sequences; 3. Extension (~72°C) for Taq DNA polymerase to synthesize new strands.',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Technical Skills - PCR Cycling'
  },
  {
    id: 'q_pcr_2',
    lesson_id: 'les_pcr',
    topic_id: 't2_1',
    domain_id: 'd2',
    question_text: 'Why is Taq DNA polymerase utilized in PCR rather than mammalian or E. coli DNA polymerase I?',
    choices: [
      { id: 'c1', choice_text: 'Taq polymerase has 3\' to 5\' proofreading exonuclease activity that prevents all errors.', is_correct: false },
      { id: 'c2', choice_text: 'Taq polymerase is heat-stable and withstands repeated denaturation cycles at 95°C without inactivating.', is_correct: true },
      { id: 'c3', choice_text: 'Taq polymerase synthesizes DNA in both 5\' to 3\' and 3\' to 5\' directions simultaneously.', is_correct: false },
      { id: 'c4', choice_text: 'Taq polymerase does not require oligonucleotide primers or magnesium cofactors.', is_correct: false }
    ],
    explanation: 'Taq polymerase was isolated from the thermophilic bacterium Thermus aquaticus living in hot springs. It remains stable at 95°C, eliminating the need to add fresh polymerase after each denaturation step.',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Technical Skills - Thermostable Enzymes'
  },
  {
    id: 'q_pcr_3',
    lesson_id: 'les_pcr',
    topic_id: 't2_1',
    domain_id: 'd2',
    question_text: 'What critical component acts as an essential divalent cofactor for Taq polymerase in PCR reaction buffers?',
    choices: [
      { id: 'c1', choice_text: 'Sodium chloride (NaCl)', is_correct: false },
      { id: 'c2', choice_text: 'Magnesium chloride (MgCl2)', is_correct: true },
      { id: 'c3', choice_text: 'EDTA', is_correct: false },
      { id: 'c4', choice_text: 'Glycerol', is_correct: false }
    ],
    explanation: 'Magnesium ions (Mg2+) are required cofactors for DNA polymerases. Mg2+ coordinates the negative charges of dNTP phosphate groups and stabilizes primer-template interactions. Omitting MgCl2 results in complete reaction failure.',
    difficulty: 'Medium',
    bace_standard: 'Domain 2: Technical Skills - PCR Reagents'
  },
  {
    id: 'q_pcr_4',
    lesson_id: 'les_pcr',
    topic_id: 't2_1',
    domain_id: 'd2',
    question_text: 'If a PCR annealing temperature is programmed 12°C below the melting temperature (Tm) of the primers, what artifact is most likely to appear on the resulting agarose gel?',
    choices: [
      { id: 'c1', choice_text: 'Total absence of any DNA bands due to thermal denaturation of primers.', is_correct: false },
      { id: 'c2', choice_text: 'Multiple non-specific bands and spurious amplification products.', is_correct: true },
      { id: 'c3', choice_text: 'Complete degradation of the genomic template DNA.', is_correct: false },
      { id: 'c4', choice_text: 'A band that runs higher than the molecular weight ladder.', is_correct: false }
    ],
    explanation: 'Lowering the annealing temperature too far below primer Tm decreases stringency, allowing primers to bind imperfectly to non-target regions with partial homology. This leads to non-specific amplification and multiple spurious bands.',
    difficulty: 'Hard',
    bace_standard: 'Domain 2: Technical Skills - Primer Specificity'
  },

  // =========================================================================
  // DOMAIN 2: les_transformation (Bacterial Transformation)
  // =========================================================================
  {
    id: 'q_trans_1',
    lesson_id: 'les_transformation',
    topic_id: 't2_4',
    domain_id: 'd2',
    question_text: 'What is the role of divalent calcium ions (CaCl2) during chemical competence induction in E. coli?',
    choices: [
      { id: 'c1', choice_text: 'They digest the bacterial peptidoglycan cell wall completely.', is_correct: false },
      { id: 'c2', choice_text: 'They neutralize repulsive negative charges on both the DNA phosphate backbone and bacterial outer membrane lipopolysaccharides.', is_correct: true },
      { id: 'c3', choice_text: 'They activate beta-lactamase enzyme transcription.', is_correct: false },
      { id: 'c4', choice_text: 'They degrade RNA to supply nucleotides for plasmid replication.', is_correct: false }
    ],
    explanation: 'Both the DNA backbone (phosphates) and the bacterial outer envelope (lipopolysaccharides and phospholipids) carry negative charges that naturally repel each other. Divalent Ca2+ ions bridge and shield these negative charges, allowing plasmid DNA to adhere to the bacterial cell wall.',
    difficulty: 'Medium',
    bace_standard: 'Domain 2: Technical Skills - Competent Cells'
  },
  {
    id: 'q_trans_2',
    lesson_id: 'les_transformation',
    topic_id: 't2_4',
    domain_id: 'd2',
    question_text: 'Why must transformed bacteria be incubated in antibiotic-free SOC or LB broth at 37°C for 45–60 minutes prior to plating on selective ampicillin agar?',
    choices: [
      { id: 'c1', choice_text: 'To allow the cells to wash off toxic calcium chloride residues.', is_correct: false },
      { id: 'c2', choice_text: 'To provide time for transcription and translation of the antibiotic-resistance protein (beta-lactamase) before confronting the drug.', is_correct: true },
      { id: 'c3', choice_text: 'To induce the lytic bacteriophage cycle.', is_correct: false },
      { id: 'c4', choice_text: 'To allow the plasmid to insert covalently into the bacterial chromosome.', is_correct: false }
    ],
    explanation: 'Immediately after heat shock, cells contain plasmid DNA but have not yet synthesized the resistance protein. If plated immediately onto ampicillin, the antibiotic inhibits cell wall synthesis and lyses the cells before they can express beta-lactamase.',
    difficulty: 'Medium',
    bace_standard: 'Domain 2: Technical Skills - Recovery Phase'
  },
  {
    id: 'q_trans_3',
    lesson_id: 'les_transformation',
    topic_id: 't2_4',
    domain_id: 'd2',
    question_text: 'If a student transforms 0.05 µg of plasmid DNA into 100 µL of cells, adds 900 µL SOC (total 1000 µL), plates 100 µL, and counts 120 colonies, what is the transformation efficiency?',
    choices: [
      { id: 'c1', choice_text: '2,400 CFU/µg', is_correct: false },
      { id: 'c2', choice_text: '12,000 CFU/µg', is_correct: false },
      { id: 'c3', choice_text: '24,000 CFU/µg (2.4 × 10^4 CFU/µg)', is_correct: true },
      { id: 'c4', choice_text: '240,000 CFU/µg', is_correct: false }
    ],
    explanation: 'Fraction plated = 100 µL / 1000 µL = 0.10. Mass plated = 0.05 µg × 0.10 = 0.005 µg. Transformation Efficiency = 120 colonies / 0.005 µg = 24,000 CFU/µg.',
    difficulty: 'Hard',
    bace_standard: 'Domain 2: Technical Skills - Transformation Calculations'
  },

  // =========================================================================
  // DOMAIN 2: les_restriction (Restriction Enzyme Digestion)
  // =========================================================================
  {
    id: 'q_rest_1',
    lesson_id: 'les_restriction',
    topic_id: 't2_3',
    domain_id: 'd2',
    question_text: 'Which of the following double-stranded DNA sequences represents a true palindromic restriction site recognized by a Type II endonuclease?',
    choices: [
      { id: 'c1', choice_text: '5\'-GAATTC-3\' (paired with 3\'-CTTAAG-5\')', is_correct: true },
      { id: 'c2', choice_text: '5\'-GATTACA-3\' (paired with 3\'-CTAATGT-5\')', is_correct: false },
      { id: 'c3', choice_text: '5\'-AAAAAA-3\' (paired with 3\'-TTTTTT-5\')', is_correct: false },
      { id: 'c4', choice_text: '5\'-GCATGC-3\' (paired with 3\'-ATGCAT-5\')', is_correct: false }
    ],
    explanation: 'A biological DNA palindrome reads identically 5\' to 3\' on both strands. For 5\'-GAATTC-3\', the complementary strand reading 5\' to 3\' is also 5\'-GAATTC-3\'. This is the canonical EcoRI restriction site.',
    difficulty: 'Medium',
    bace_standard: 'Domain 2: Technical Skills - Palindromic Recognition'
  },
  {
    id: 'q_rest_2',
    lesson_id: 'les_restriction',
    topic_id: 't2_3',
    domain_id: 'd2',
    question_text: 'A circular plasmid of 8,000 bp has two BamHI restriction cleavage sites. When completely digested with BamHI and run on an agarose gel, how many DNA fragments will be produced?',
    choices: [
      { id: 'c1', choice_text: '1 fragment', is_correct: false },
      { id: 'c2', choice_text: '2 fragments', is_correct: true },
      { id: 'c3', choice_text: '3 fragments', is_correct: false },
      { id: 'c4', choice_text: '4 fragments', is_correct: false }
    ],
    explanation: 'For circular DNA molecules, the number of fragments produced equals the number of cleavage cuts: n cuts = n fragments. Two cuts in a closed circular plasmid yield exactly 2 fragments. (In contrast, linear DNA yields n + 1 fragments).',
    difficulty: 'Easy',
    bace_standard: 'Domain 2: Technical Skills - Restriction Mapping'
  },

  // =========================================================================
  // DOMAIN 3: les_sds_ghs (Safety Data Sheets & Hazard Communication)
  // =========================================================================
  {
    id: 'q_sds_1',
    lesson_id: 'les_sds_ghs',
    topic_id: 't3_1',
    domain_id: 'd3',
    question_text: 'According to OSHA HazCom guidelines, which section of a standardized 16-section Safety Data Sheet (SDS) details required Personal Protective Equipment (PPE) and exposure limits (PEL/TLV)?',
    choices: [
      { id: 'c1', choice_text: 'Section 2: Hazard(s) Identification', is_correct: false },
      { id: 'c2', choice_text: 'Section 4: First-Aid Measures', is_correct: false },
      { id: 'c3', choice_text: 'Section 8: Exposure Controls / Personal Protection', is_correct: true },
      { id: 'c4', choice_text: 'Section 13: Disposal Considerations', is_correct: false }
    ],
    explanation: 'Section 8 of an SDS outlines OSHA Permissible Exposure Limits (PELs), ACGIH Threshold Limit Values (TLVs), engineering ventilation controls, and specific personal protective equipment (respirators, glove materials, eye protection).',
    difficulty: 'Easy',
    bace_standard: 'Domain 3: Safety - SDS Interpretation'
  },
  {
    id: 'q_sds_2',
    lesson_id: 'les_sds_ghs',
    topic_id: 't3_1',
    domain_id: 'd3',
    question_text: 'Under the Globally Harmonized System (GHS), which signal word indicates the MORE SEVERE hazard level?',
    choices: [
      { id: 'c1', choice_text: 'CAUTION', is_correct: false },
      { id: 'c2', choice_text: 'WARNING', is_correct: false },
      { id: 'c3', choice_text: 'DANGER', is_correct: true },
      { id: 'c4', choice_text: 'NOTICE', is_correct: false }
    ],
    explanation: 'Under GHS, only two signal words exist: "DANGER" (used for more severe hazards) and "WARNING" (used for less severe hazards). "CAUTION" is not an official GHS signal word.',
    difficulty: 'Easy',
    bace_standard: 'Domain 3: Safety - GHS Signal Words'
  },

  // =========================================================================
  // DOMAIN 3: les_biosafety (Biosafety Levels & Protocol)
  // =========================================================================
  {
    id: 'q_bio_1',
    lesson_id: 'les_biosafety',
    topic_id: 't3_3',
    domain_id: 'd3',
    question_text: 'What is the correct order for safely removing (doffing) Personal Protective Equipment (PPE) to minimize personal contamination?',
    choices: [
      { id: 'c1', choice_text: 'Mask -> Gown -> Goggles -> Gloves', is_correct: false },
      { id: 'c2', choice_text: 'Gloves -> Goggles/Face Shield -> Gown -> Mask/Respirator', is_correct: true },
      { id: 'c3', choice_text: 'Gown -> Mask -> Gloves -> Goggles', is_correct: false },
      { id: 'c4', choice_text: 'Goggles -> Gloves -> Mask -> Gown', is_correct: false }
    ],
    explanation: 'According to CDC guidelines, the outside of gloves is the most contaminated site. Gloves are peeled off first, followed by eye protection, gown, and lastly the mask/respirator. Hands are then immediately washed.',
    difficulty: 'Medium',
    bace_standard: 'Domain 3: Safety - PPE Doffing'
  },
  {
    id: 'q_bio_2',
    lesson_id: 'les_biosafety',
    topic_id: 't3_3',
    domain_id: 'd3',
    question_text: 'A laboratory handles non-pathogenic laboratory strains of Escherichia coli K-12 and Saccharomyces cerevisiae. What containment level is designated for this work?',
    choices: [
      { id: 'c1', choice_text: 'Biosafety Level 1 (BSL-1)', is_correct: true },
      { id: 'c2', choice_text: 'Biosafety Level 2 (BSL-2)', is_correct: false },
      { id: 'c3', choice_text: 'Biosafety Level 3 (BSL-3)', is_correct: false },
      { id: 'c4', choice_text: 'Biosafety Level 4 (BSL-4)', is_correct: false }
    ],
    explanation: 'BSL-1 is suitable for work involving well-characterized agents not known to consistently cause disease in immunocompetent adult humans, such as standard laboratory E. coli strains and baker\'s yeast.',
    difficulty: 'Easy',
    bace_standard: 'Domain 3: Safety - Biosafety Levels'
  },

  // =========================================================================
  // DOMAIN 4: les_c1v1_percent (Dilution Equations & Percent Solutions)
  // =========================================================================
  {
    id: 'q_dil_eq_1',
    lesson_id: 'les_c1v1_percent',
    topic_id: 't4_2',
    domain_id: 'd4',
    question_text: 'How many milliliters of a 50X TAE stock solution are needed to prepare 1.5 Liters (1500 mL) of 1X TAE electrophoresis buffer?',
    choices: [
      { id: 'c1', choice_text: '15 mL', is_correct: false },
      { id: 'c2', choice_text: '30 mL', is_correct: true },
      { id: 'c3', choice_text: '50 mL', is_correct: false },
      { id: 'c4', choice_text: '75 mL', is_correct: false }
    ],
    explanation: 'Using C1V1 = C2V2: (50X)(V1) = (1X)(1500 mL) -> V1 = 1500 / 50 = 30 mL. To prepare the solution, add 30 mL of 50X TAE to 1470 mL of deionized water.',
    difficulty: 'Easy',
    bace_standard: 'Domain 4: Applied Mathematics - C1V1'
  },
  {
    id: 'q_dil_eq_2',
    lesson_id: 'les_c1v1_percent',
    topic_id: 't4_2',
    domain_id: 'd4',
    question_text: 'How many grams of agarose powder are required to cast 250 mL of a 1.2% (w/v) agarose gel?',
    choices: [
      { id: 'c1', choice_text: '1.2 g', is_correct: false },
      { id: 'c2', choice_text: '2.4 g', is_correct: false },
      { id: 'c3', choice_text: '3.0 g', is_correct: true },
      { id: 'c4', choice_text: '12.0 g', is_correct: false }
    ],
    explanation: 'Percent (w/v) represents grams per 100 mL of solution. 1.2% (w/v) = 1.2 g / 100 mL. For 250 mL: (1.2 g / 100 mL) × 250 mL = 3.0 g of agarose.',
    difficulty: 'Easy',
    bace_standard: 'Domain 4: Applied Mathematics - Percent Solutions'
  },

  // =========================================================================
  // DOMAIN 5: les_central_dogma (Central Dogma & Molecular Biology)
  // =========================================================================
  {
    id: 'q_dogma_1',
    lesson_id: 'les_central_dogma',
    topic_id: 't5_2',
    domain_id: 'd5',
    question_text: 'How many hydrogen bonds form between a Guanine (G) and Cytosine (C) base pair compared to an Adenine (A) and Thymine (T) base pair in double-stranded DNA?',
    choices: [
      { id: 'c1', choice_text: 'G-C has 2 bonds; A-T has 3 bonds.', is_correct: false },
      { id: 'c2', choice_text: 'G-C has 3 bonds; A-T has 2 bonds.', is_correct: true },
      { id: 'c3', choice_text: 'Both base pairs have 2 bonds.', is_correct: false },
      { id: 'c4', choice_text: 'Both base pairs have 3 bonds.', is_correct: false }
    ],
    explanation: 'Guanine and Cytosine form 3 hydrogen bonds, whereas Adenine and Thymine form 2. Because of this extra bond, DNA regions with high G-C content require higher temperatures to denature.',
    difficulty: 'Easy',
    bace_standard: 'Domain 5: Biochemistry - Nucleic Acid Structure'
  },
  {
    id: 'q_dogma_2',
    lesson_id: 'les_central_dogma',
    topic_id: 't5_2',
    domain_id: 'd5',
    question_text: 'If a DNA template strand has the sequence 3\'-TAC GGC TTA ACT-5\', what is the corresponding mRNA sequence transcribed by RNA polymerase?',
    choices: [
      { id: 'c1', choice_text: '5\'-AUG CCG AAU UGA-3\'', is_correct: true },
      { id: 'c2', choice_text: '5\'-ATG CCG AAT TGA-3\'', is_correct: false },
      { id: 'c3', choice_text: '3\'-AUG CCG AAU UGA-5\'', is_correct: false },
      { id: 'c4', choice_text: '5\'-UAC GGC UUA ACU-3\'', is_correct: false }
    ],
    explanation: 'RNA polymerase reads the template 3\' to 5\' and synthesizes complementary mRNA 5\' to 3\', pairing A with U and C with G: 3\'-T->A, A->U, C->G, G->C, G->C, C->G, T->A, T->A, A->U, A->U, C->G, T->A-5\' -> 5\'-AUG CCG AAU UGA-3\'.',
    difficulty: 'Medium',
    bace_standard: 'Domain 5: Biochemistry - Transcription'
  },

  // =========================================================================
  // DOMAIN 5: les_enzymes (Enzyme Kinetics & Factors)
  // =========================================================================
  {
    id: 'q_enz_1',
    lesson_id: 'les_enzymes',
    topic_id: 't5_3',
    domain_id: 'd5',
    question_text: 'How does an enzyme accelerate the rate of a biochemical reaction?',
    choices: [
      { id: 'c1', choice_text: 'By making an endergonic reaction strongly exergonic.', is_correct: false },
      { id: 'c2', choice_text: 'By lowering the activation energy (Ea) barrier of the reaction.', is_correct: true },
      { id: 'c3', choice_text: 'By increasing the overall free energy change (delta G) of the products.', is_correct: false },
      { id: 'c4', choice_text: 'By permanently binding to the substrate molecule.', is_correct: false }
    ],
    explanation: 'Enzymes are biological catalysts that increase reaction velocity by stabilizing the transition state and lowering the activation energy (Ea). They do NOT alter delta G or equilibrium.',
    difficulty: 'Easy',
    bace_standard: 'Domain 5: Biochemistry - Catalysis'
  },
  {
    id: 'q_enz_2',
    lesson_id: 'les_enzymes',
    topic_id: 't5_3',
    domain_id: 'd5',
    question_text: 'In enzyme kinetics, what characterizes a competitive inhibitor compared to a non-competitive inhibitor?',
    choices: [
      { id: 'c1', choice_text: 'A competitive inhibitor binds at an allosteric site and permanently lowers Vmax.', is_correct: false },
      { id: 'c2', choice_text: 'A competitive inhibitor binds directly to the active site, and its inhibitory effect can be overcome by increasing substrate concentration.', is_correct: true },
      { id: 'c3', choice_text: 'A competitive inhibitor covalently destroys the enzyme peptide backbone.', is_correct: false },
      { id: 'c4', choice_text: 'A competitive inhibitor alters the optimal temperature of the reaction.', is_correct: false }
    ],
    explanation: 'Competitive inhibitors resemble the substrate and compete for binding at the active site. Increasing substrate concentration outcompetes the inhibitor, restoring maximum reaction velocity (Vmax).',
    difficulty: 'Medium',
    bace_standard: 'Domain 5: Biochemistry - Enzyme Inhibition'
  },

  // =========================================================================
  // DOMAIN 6: les_cgmp_gdp (cGMP & Good Documentation Practices)
  // =========================================================================
  {
    id: 'q_gdp_1',
    lesson_id: 'les_cgmp_gdp',
    topic_id: 't6_1',
    domain_id: 'd6',
    question_text: 'Under Good Documentation Practices (GDP) in a cGMP environment, how must an erroneous recording in a batch production record be corrected?',
    choices: [
      { id: 'c1', choice_text: 'Apply correction fluid (White-Out) and write the correct number on top.', is_correct: false },
      { id: 'c2', choice_text: 'Scribble out the wrong number thoroughly so it cannot be misread.', is_correct: false },
      { id: 'c3', choice_text: 'Draw a single horizontal strike-through line so the original entry remains legible, write the correct value nearby, and sign with initials, date, and error code.', is_correct: true },
      { id: 'c4', choice_text: 'Discard the batch record page and rewrite the page entirely from memory.', is_correct: false }
    ],
    explanation: 'GDP requires full traceability: a single strike-through line preserves the original entry for auditors. The technician records the correction alongside their initials, current date, and an explanation code (e.g., "EE" for entry error).',
    difficulty: 'Easy',
    bace_standard: 'Domain 6: Regulation - Good Documentation'
  },
  {
    id: 'q_gdp_2',
    lesson_id: 'les_cgmp_gdp',
    topic_id: 't6_1',
    domain_id: 'd6',
    question_text: 'In the FDA data integrity framework ALCOA+, what does the letter "C" represent?',
    choices: [
      { id: 'c1', choice_text: 'Confidential', is_correct: false },
      { id: 'c2', choice_text: 'Contemporaneous (recorded at the exact time the activity occurs)', is_correct: true },
      { id: 'c3', choice_text: 'Computerized', is_correct: false },
      { id: 'c4', choice_text: 'Certified', is_correct: false }
    ],
    explanation: 'ALCOA stands for Attributable, Legible, Contemporaneous, Original, and Accurate. "Contemporaneous" means data must be recorded at the exact moment the task is executed, never back-dated or pre-dated.',
    difficulty: 'Medium',
    bace_standard: 'Domain 6: Regulation - ALCOA+'
  },

  // =========================================================================
  // DOMAIN 6: les_qa_qc_sops (QA vs QC & SOPs)
  // =========================================================================
  {
    id: 'q_qa_qc_1',
    lesson_id: 'les_qa_qc_sops',
    topic_id: 't6_2',
    domain_id: 'd6',
    question_text: 'Which statement accurately captures the distinction between Quality Assurance (QA) and Quality Control (QC)?',
    choices: [
      { id: 'c1', choice_text: 'QA is product-oriented (testing samples at the bench), while QC is process-oriented (writing SOPs).', is_correct: false },
      { id: 'c2', choice_text: 'QA is process-oriented (preventing defects through audits and procedures), while QC is product-oriented (detecting defects through analytical testing).', is_correct: true },
      { id: 'c3', choice_text: 'QA is conducted only after product shipment, while QC occurs before manufacturing.', is_correct: false },
      { id: 'c4', choice_text: 'QA is regulated by OSHA, while QC is regulated by the EPA.', is_correct: false }
    ],
    explanation: 'Quality Assurance (QA) focuses on preventing defects by establishing, auditing, and enforcing manufacturing systems and SOPs. Quality Control (QC) focuses on detecting defects through analytical laboratory testing of samples.',
    difficulty: 'Easy',
    bace_standard: 'Domain 6: Regulation - QA vs QC'
  },

  // =========================================================================
  // DOMAIN 7: les_autoclave_centrifuge (Autoclave & Centrifuge)
  // =========================================================================
  {
    id: 'q_auto_1',
    lesson_id: 'les_autoclave_centrifuge',
    topic_id: 't7_1',
    domain_id: 'd7',
    question_text: 'What are the standard operating parameters for steam sterilization in an autoclave?',
    choices: [
      { id: 'c1', choice_text: '100°C at 0 psi for 60 minutes', is_correct: false },
      { id: 'c2', choice_text: '121°C at 15 psi for 20–30 minutes', is_correct: true },
      { id: 'c3', choice_text: '150°C at 50 psi for 5 minutes', is_correct: false },
      { id: 'c4', choice_text: '95°C at 5 psi for 45 minutes', is_correct: false }
    ],
    explanation: 'Standard autoclave parameters are 121°C (250°F) under 15 pounds per square inch (psi) gauge steam pressure for a minimum of 20 to 30 minutes, sufficient to kill bacterial endospores.',
    difficulty: 'Easy',
    bace_standard: 'Domain 7: Equipment - Autoclave Parameters'
  },
  {
    id: 'q_auto_2',
    lesson_id: 'les_autoclave_centrifuge',
    topic_id: 't7_1',
    domain_id: 'd7',
    question_text: 'Why do scientific protocols specify centrifugation speed in Relative Centrifugal Force (RCF or g) rather than Revolutions Per Minute (RPM)?',
    choices: [
      { id: 'c1', choice_text: 'RCF accounts for the rotor radius, ensuring that equivalent gravitational force is exerted regardless of centrifuge make or model.', is_correct: true },
      { id: 'c2', choice_text: 'RPM cannot be measured electronically on modern digital centrifuges.', is_correct: false },
      { id: 'c3', choice_text: 'RCF is always 10 times higher than RPM.', is_correct: false },
      { id: 'c4', choice_text: 'RCF prevents aerosol formation inside the chamber.', is_correct: false }
    ],
    explanation: 'Centrifugal force depends on both rotational velocity and the radius of the rotor (RCF = 1.118 × 10^-5 × r × RPM^2). A small rotor at 10,000 RPM generates far less g-force than a large rotor at 10,000 RPM.',
    difficulty: 'Medium',
    bace_standard: 'Domain 7: Equipment - Centrifugation RCF'
  },

  // =========================================================================
  // DOMAIN 7: les_ph_spec (pH Meter & Spectrophotometry)
  // =========================================================================
  {
    id: 'q_spec_1',
    lesson_id: 'les_ph_spec',
    topic_id: 't7_2',
    domain_id: 'd7',
    question_text: 'In which solution should a standard glass pH electrode be stored when not in use?',
    choices: [
      { id: 'c1', choice_text: 'Deionized / distilled water', is_correct: false },
      { id: 'c2', choice_text: '3M or saturated Potassium Chloride (KCl) storage solution', is_correct: true },
      { id: 'c3', choice_text: '70% Isopropanol', is_correct: false },
      { id: 'c4', choice_text: 'Dry in an empty Falcon tube', is_correct: false }
    ],
    explanation: 'pH electrodes contain a 3M KCl electrolyte solution behind a porous junction. Storing in deionized water causes KCl to leach out through osmosis, destroying the calibration and electrode responsiveness. Storing dry dries out the hydrated gel layer on the glass bulb.',
    difficulty: 'Medium',
    bace_standard: 'Domain 7: Equipment - pH Meter Care'
  },
  {
    id: 'q_spec_2',
    lesson_id: 'les_ph_spec',
    topic_id: 't7_2',
    domain_id: 'd7',
    question_text: 'What should be loaded into the "blank" cuvette when zeroing a spectrophotometer for a Bradford protein assay?',
    choices: [
      { id: 'c1', choice_text: 'Pure deionized water alone.', is_correct: false },
      { id: 'c2', choice_text: 'Buffer and Coomassie dye reagent without any protein sample.', is_correct: true },
      { id: 'c3', choice_text: 'A high-concentration BSA standard solution.', is_correct: false },
      { id: 'c4', choice_text: 'An empty dry cuvette.', is_correct: false }
    ],
    explanation: 'A blank cuvette must contain all reagents and solvents present in the test samples (buffer + dye) EXCEPT the substance being quantified (protein). This zeroes out the baseline absorbance of the reagents themselves.',
    difficulty: 'Easy',
    bace_standard: 'Domain 7: Equipment - Spectrophotometer Blanking'
  },

  // =========================================================================
  // DOMAIN 8: les_controls_variables (Controls & Variables)
  // =========================================================================
  {
    id: 'q_ctrl_1',
    lesson_id: 'les_controls_variables',
    topic_id: 't8_1',
    domain_id: 'd8',
    question_text: 'A researcher tests the effect of different antibiotic concentrations on bacterial growth. In this experiment, what is the independent variable and what is the dependent variable?',
    choices: [
      { id: 'c1', choice_text: 'Independent = Bacterial growth (OD600); Dependent = Antibiotic concentration', is_correct: false },
      { id: 'c2', choice_text: 'Independent = Antibiotic concentration; Dependent = Bacterial growth (OD600)', is_correct: true },
      { id: 'c3', choice_text: 'Independent = Incubation temperature; Dependent = Broth volume', is_correct: false },
      { id: 'c4', choice_text: 'Independent = Number of test tubes; Dependent = Pipette accuracy', is_correct: false }
    ],
    explanation: 'The independent variable is the experimental factor deliberately manipulated by the researcher (antibiotic concentration). The dependent variable is the measured response (bacterial growth / optical density).',
    difficulty: 'Easy',
    bace_standard: 'Domain 8: Experimental Design - Variables'
  },
  {
    id: 'q_ctrl_2',
    lesson_id: 'les_controls_variables',
    topic_id: 't8_1',
    domain_id: 'd8',
    question_text: 'If a negative control in an ELISA or PCR assay produces a strong positive optical signal, what conclusion must the analyst make?',
    choices: [
      { id: 'c1', choice_text: 'The experimental samples are extraordinarily concentrated and valid.', is_correct: false },
      { id: 'c2', choice_text: 'The assay is contaminated or non-specific; all results are invalid and cannot be reported.', is_correct: true },
      { id: 'c3', choice_text: 'The positive control can simply be substituted for the negative control.', is_correct: false },
      { id: 'c4', choice_text: 'The assay has achieved maximum clinical sensitivity.', is_correct: false }
    ],
    explanation: 'A negative control is designed to yield a negative result. If it produces a positive signal, reagent contamination or non-specific cross-reactivity has occurred, invalidating every test sample in the run.',
    difficulty: 'Easy',
    bace_standard: 'Domain 8: Experimental Design - Assay Validation'
  },

  // =========================================================================
  // DOMAIN 8: les_standard_curves (Standard Curves & Regression)
  // =========================================================================
  {
    id: 'q_std_1',
    lesson_id: 'les_standard_curves',
    topic_id: 't8_2',
    domain_id: 'd8',
    question_text: 'A Bradford protein standard curve produces the linear regression line y = 0.008x + 0.040, where y is Absorbance at 595 nm and x is protein concentration in µg/mL. What is the concentration of an unknown sample with an absorbance of 0.520?',
    choices: [
      { id: 'c1', choice_text: '40 µg/mL', is_correct: false },
      { id: 'c2', choice_text: '60 µg/mL', is_correct: true },
      { id: 'c3', choice_text: '80 µg/mL', is_correct: false },
      { id: 'c4', choice_text: '120 µg/mL', is_correct: false }
    ],
    explanation: 'y = mx + b -> 0.520 = 0.008x + 0.040 -> 0.520 - 0.040 = 0.008x -> 0.480 = 0.008x -> x = 0.480 / 0.008 = 60 µg/mL.',
    difficulty: 'Medium',
    bace_standard: 'Domain 8: Data Analysis - Standard Curve Calculations'
  },
  {
    id: 'q_std_2',
    lesson_id: 'les_standard_curves',
    topic_id: 't8_2',
    domain_id: 'd8',
    question_text: 'An unknown protein sample yields an absorbance of 1.850, which is higher than the top point on the standard curve (A = 1.200). What is the appropriate analytical action?',
    choices: [
      { id: 'c1', choice_text: 'Extrapolate the linear regression line beyond the highest standard.', is_correct: false },
      { id: 'c2', choice_text: 'Dilute the unknown sample (e.g. 1:5 or 1:10), re-measure so absorbance falls within the linear dynamic range, and multiply the calculated concentration by the dilution factor.', is_correct: true },
      { id: 'c3', choice_text: 'Assume the sample concentration is exactly equal to the top standard.', is_correct: false },
      { id: 'c4', choice_text: 'Change the spectrophotometer wavelength to reduce the reading.', is_correct: false }
    ],
    explanation: 'Extrapolating beyond a standard curve is invalid in analytical biochemistry because detector saturation or loss of Beer\'s Law linearity may occur. The sample must be diluted into the verified linear range and the result multiplied by the dilution factor.',
    difficulty: 'Medium',
    bace_standard: 'Domain 8: Data Analysis - Dynamic Range'
  }
];
