import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_2_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_pcr',
      domain_id: 'd2',
      domain: 'Technical Skills & Applications',
      sublesson: 'Polymerase Chain Reaction (PCR): Thermal Phases, Primers & Troubleshooting',
      total_competencies: 3,
      estimated_completion_time_minutes: 22,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D2-01',
        statement: 'Identify the biochemical events, temperature parameters, and order of the three steps in a PCR thermocycling cycle.',
        primary_item: {
          item_id: 'COMP-D2-01-A',
          question_text: 'Which sequence correctly lists the 3 thermal steps in a standard PCR cycle, including target temperatures and molecular events?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Annealing (95°C) -> Denaturation (72°C) -> Extension (55°C)' },
            { id: 'B', text: 'Denaturation (94–95°C: strand separation) -> Annealing (50–65°C: primer hybridization) -> Extension (72°C: DNA synthesis by Taq)' },
            { id: 'C', text: 'Extension (72°C) -> Annealing (95°C) -> Denaturation (55°C)' },
            { id: 'D', text: 'Denaturation (72°C) -> Extension (95°C) -> Annealing (37°C)' }
          ],
          correct_answer_id: 'B',
          explanation: 'PCR cycles follow a precise order: 1) Denaturation at 94–95°C disrupts hydrogen bonds between complementary strands; 2) Annealing at 50–65°C allows short oligonucleotide primers to base-pair with target sequences; 3) Extension at 72°C is optimal for Taq polymerase 5\' to 3\' synthesis.',
          remediation_hints: {
            'A': 'Diagnostic Error: Step order and temperatures are reversed. 95°C is far too hot for primers to anneal (they denature at ~60°C).',
            'C': 'Diagnostic Error: Inverted sequence. You cannot extend new DNA before denaturing the double helix and annealing the forward and reverse primers.',
            'D': 'Diagnostic Error: 72°C is inadequate to fully separate genomic DNA duplexes (requires 94–95°C), and 95°C denatures the Taq enzyme if held during synthesis.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-01-B',
          question_text: 'What biochemical event occurs during the 50–65°C phase of a thermocycler program?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Hydrogen bonds in the double-stranded template DNA are melted apart' },
            { id: 'B', text: 'Forward and reverse oligonucleotide primers bind specifically to complementary target sequences' },
            { id: 'C', text: 'Taq polymerase incorporates dNTPs at its maximal catalytic rate' },
            { id: 'D', text: 'Bacterial cell walls are chemically lysed by lysozyme' }
          ],
          correct_answer_id: 'B',
          explanation: 'The 50–65°C phase is the annealing step, where reduced thermal energy allows single-stranded primer molecules to form hydrogen bonds with complementary sequences on the template strands.',
          remediation_hints: {
            'A': 'Diagnostic Error: Strand melting is denaturation, requiring temperatures of 94–95°C.',
            'C': 'Diagnostic Error: Optimal Taq catalytic extension takes place at 72°C, not at annealing temperatures.',
            'D': 'Diagnostic Error: Lysis occurs during DNA extraction prior to PCR setup, not inside the thermocycler.'
          }
        }
      },
      {
        competency_id: 'COMP-D2-02',
        statement: 'Troubleshoot PCR reactions displaying non-specific secondary banding or complete amplification failure based on annealing temperature and magnesium concentration.',
        primary_item: {
          item_id: 'COMP-D2-02-A',
          question_text: 'An agarose gel reveals multiple spurious, non-specific bands alongside the expected PCR target band. How should the technician optimize the thermocycler conditions to eliminate non-specific amplification?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Increase the annealing temperature (Ta) by 2°C to 4°C' },
            { id: 'B', text: 'Decrease the annealing temperature by 5°C to 10°C' },
            { id: 'C', text: 'Increase the MgCl2 concentration in the master mix to 5 mM' },
            { id: 'D', text: 'Double the number of PCR cycles from 30 to 60' }
          ],
          correct_answer_id: 'A',
          explanation: 'Non-specific bands occur when primers anneal to partially complementary sites on the template (mispriming). Raising the annealing temperature increases stringency, preventing non-specific hybridization and ensuring only exact complementary matches can anneal.',
          remediation_hints: {
            'B': 'Diagnostic Error: Lowering annealing temperature reduces stringency, promoting even more non-specific mispriming and smeared bands.',
            'C': 'Diagnostic Error: Excess magnesium stabilizes mismatched primer-template duplexes, worsening non-specific amplification.',
            'D': 'Diagnostic Error: Increasing cycle number exhausts reagents and produces non-specific chimeric products and smears.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-02-B',
          question_text: 'A PCR reaction yields zero bands on an agarose gel, but the DNA ladder and positive control ran normally. The calculated primer Tm is 58°C, but the thermocycler annealing step was set to 68°C. What caused the reaction failure?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Annealing temperature was too high; thermal kinetic energy prevented primers from hybridizing to the template' },
            { id: 'B', text: 'The Taq polymerase was permanently destroyed by the 68°C temperature' },
            { id: 'C', text: 'The template DNA was degraded because 68°C causes spontaneous phosphodiester cleavage' },
            { id: 'D', text: 'The dNTPs precipitated out of solution at 68°C' }
          ],
          correct_answer_id: 'A',
          explanation: 'When annealing temperature (68°C) is significantly above primer Tm (58°C), thermal kinetic energy disrupts hydrogen bonding before primers can stably anneal. No primers bind, so Taq has no free 3\'-OH to initiate synthesis, resulting in complete amplification failure.',
          remediation_hints: {
            'B': 'Diagnostic Error: Taq is a thermostable enzyme from Thermus aquaticus and is stable at 95°C; 68°C does not harm it.',
            'C': 'Diagnostic Error: DNA double strands denature and re-anneal reversibly; covalent phosphodiester bonds do not break at 68°C.',
            'D': 'Diagnostic Error: dNTPs remain fully soluble across standard PCR operating temperatures.'
          }
        }
      },
      {
        competency_id: 'COMP-D2-03',
        statement: 'Analyze the mechanism and role of positive and negative controls (No Template Control - NTC) in PCR assay validation.',
        primary_item: {
          item_id: 'COMP-D2-03-A',
          question_text: 'In an end-point PCR experiment, the negative control (No Template Control, NTC) lane exhibits a clear band of the exact same size as the target amplicon. What does this indicate and what action must be taken?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'The assay is fully valid because NTC bands prove the reagents are active' },
            { id: 'B', text: 'Reagent contamination with target DNA or prior amplicons occurred; all experimental results are invalidated and must be repeated with fresh reagents' },
            { id: 'C', text: 'The thermocycler annealing temperature was set too high' },
            { id: 'D', text: 'The Taq polymerase has mutated and self-amplified' }
          ],
          correct_answer_id: 'B',
          explanation: 'The NTC contains all master mix components except template DNA (water substituted). A band in the NTC indicates contamination of water, primers, buffer, or enzyme with extraneous target DNA or aerosolized PCR products. Under GLP, this invalidates the entire assay.',
          remediation_hints: {
            'A': 'Diagnostic Error: An NTC must show zero bands. A band in the negative control demonstrates false-positive contamination.',
            'C': 'Diagnostic Error: High annealing temperature causes zero amplification, not contamination in negative controls.',
            'D': 'Diagnostic Error: DNA polymerases cannot self-synthesize without nucleic acid template and primers.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-03-B',
          question_text: 'Why is it mandatory in diagnostic PCR testing to include a known positive control sample in every run?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'To confirm that all master mix reagents and thermal cycler parameters functioned properly, preventing false-negative conclusions' },
            { id: 'B', text: 'To neutralize potential biohazardous contamination in the laboratory air' },
            { id: 'C', text: 'To calibrate the optical spectrophotometer before gel electrophoresis' },
            { id: 'D', text: 'To serve as a source of extra dNTPs for adjacent test tubes' }
          ],
          correct_answer_id: 'A',
          explanation: 'A positive control contains verified template DNA. If a test sample yields no band, the positive control proves the master mix, enzyme, primers, and thermocycler worked properly, ruling out false-negative technical failures.',
          remediation_hints: {
            'B': 'Diagnostic Error: Positive controls do not clean or neutralize laboratory air.',
            'C': 'Diagnostic Error: Agarose gel visualization uses UV transillumination or blue light, not a spectrophotometer.',
            'D': 'Diagnostic Error: Reactions are sealed in individual tubes; there is no chemical transfer between adjacent tubes.'
          }
        }
      }
    ]
  },
  {
    lesson_metadata: {
      lesson_id: 'les_transformation',
      domain_id: 'd2',
      domain: 'Technical Skills & Applications',
      sublesson: 'Bacterial Transformation: Competence, Heat Shock & Selection',
      total_competencies: 3,
      estimated_completion_time_minutes: 20,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D2-04',
        statement: 'Explain the mechanism of chemical competence induction using CaCl2 and the physical principle of heat shock.',
        primary_item: {
          item_id: 'COMP-D2-04-A',
          question_text: 'In calcium chloride-mediated bacterial transformation, what is the specific role of the divalent calcium cation (Ca2+)?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'It activates Taq polymerase to replicate the incoming plasmid' },
            { id: 'B', text: 'It neutralizes the repulsive negative charges between DNA phosphate backbones and bacterial outer membrane lipopolysaccharides' },
            { id: 'C', text: 'It acts as an antibiotic that selects against non-transformed bacteria' },
            { id: 'D', text: 'It denatures the plasmid DNA into single strands to enter the cell' }
          ],
          correct_answer_id: 'B',
          explanation: 'Both plasmid DNA and the bacterial outer membrane possess net negative electrical charges, causing natural electrostatic repulsion. Divalent calcium ions (Ca2+) bridge and neutralize these negative charges, allowing plasmid DNA to adhere to the cell surface.',
          remediation_hints: {
            'A': 'Diagnostic Error: Taq polymerase is used in in vitro PCR, not in bacterial cell transformation.',
            'C': 'Diagnostic Error: Calcium chloride is a salt used for competence, not an antibiotic like ampicillin or kanamycin.',
            'D': 'Diagnostic Error: Plasmids must remain intact, supercoiled double-stranded circular molecules to replicate and be expressed inside the cell.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-04-B',
          question_text: 'What is the physical mechanism of the 42°C heat-shock step during chemical transformation of E. coli?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'It creates a thermal imbalance that transiently opens pores in the cell membrane, allowing surface-bound plasmids to enter' },
            { id: 'B', text: 'It destroys all endogenous bacterial proteases and restriction enzymes' },
            { id: 'C', text: 'It translates the antibiotic resistance protein in less than 45 seconds' },
            { id: 'D', text: 'It integrates the plasmid directly into the bacterial bacterial chromosome' }
          ],
          correct_answer_id: 'A',
          explanation: 'The rapid shift from 0°C (ice) to 42°C for 45–90 seconds creates a thermal gradient across the bacterial membrane, transiently opening membrane pore complexes that permit plasmid uptake.',
          remediation_hints: {
            'B': 'Diagnostic Error: 42°C is a mild heat shock that does not denature intracellular enzymes; bacterial viability would collapse.',
            'C': 'Diagnostic Error: Protein translation requires mRNA transcription and ribosomal assembly, which happens during the post-heat shock recovery incubation, not during the 45-second heat pulse.',
            'D': 'Diagnostic Error: Plasmids are extrachromosomal self-replicating elements and do not require chromosomal integration.'
          }
        }
      },
      {
        competency_id: 'COMP-D2-05',
        statement: 'Calculate transformation efficiency in colony forming units per microgram (CFU/µg) of plasmid DNA.',
        primary_item: {
          item_id: 'COMP-D2-05-A',
          question_text: 'A student transforms competent cells with 10 ng (0.01 µg) of pUC19 plasmid DNA. The final cell suspension volume is 500 µL. The student plates 100 µL onto an LB/amp plate and counts 120 colonies the next morning. What is the transformation efficiency in CFU/µg?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '1.2 × 10^4 CFU/µg' },
            { id: 'B', text: '6.0 × 10^4 CFU/µg' },
            { id: 'C', text: '6.0 × 10^3 CFU/µg' },
            { id: 'D', text: '1.2 × 10^5 CFU/µg' }
          ],
          correct_answer_id: 'B',
          explanation: 'Mass of DNA plated = Total DNA × (Volume Plated / Total Volume) = 0.01 µg × (100 µL / 500 µL) = 0.002 µg DNA. Transformation Efficiency = Colonies Counted / Mass DNA Plated (µg) = 120 CFU / 0.002 µg = 60,000 = 6.0 × 10^4 CFU/µg.',
          remediation_hints: {
            'A': 'Diagnostic Error: You divided 120 by the total 0.01 µg of DNA (120 / 0.01 = 12,000 CFU/µg), omitting the fact that only 1/5th (100 µL of 500 µL) of the total transformation mix was plated.',
            'C': 'Diagnostic Error: Arithmetic order of magnitude error. 120 divided by 0.002 is 60,000 (6.0 × 10^4), not 6,000.',
            'D': 'Diagnostic Error: Calculation inverted the dilution fraction.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-05-B',
          question_text: 'If 0.05 µg of plasmid DNA yields 250 colonies after plating 50 µL out of a 250 µL recovery broth, what is the transformation efficiency in CFU/µg?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '5.0 × 10^3 CFU/µg' },
            { id: 'B', text: '2.5 × 10^4 CFU/µg' },
            { id: 'C', text: '2.5 × 10^3 CFU/µg' },
            { id: 'D', text: '1.0 × 10^5 CFU/µg' }
          ],
          correct_answer_id: 'B',
          explanation: 'Fraction plated = 50 µL / 250 µL = 1/5 (0.20). DNA plated = 0.05 µg × 0.20 = 0.01 µg. Efficiency = 250 CFU / 0.01 µg = 25,000 CFU/µg = 2.5 × 10^4 CFU/µg.',
          remediation_hints: {
            'A': 'Diagnostic Error: You divided 250 CFU by the total 0.05 µg of DNA without correcting for the 1/5 volume plated.',
            'C': 'Diagnostic Error: Decimal shift error; 250 / 0.01 = 25,000 (2.5 × 10^4), not 2,500.',
            'D': 'Diagnostic Error: Multiplied by the volume fraction rather than dividing the counted colonies by the actual plated mass.'
          }
        }
      },
      {
        competency_id: 'COMP-D2-06',
        statement: 'Explain the purpose of the outgrowth/recovery incubation step and identify the cause of satellite colonies.',
        primary_item: {
          item_id: 'COMP-D2-06-A',
          question_text: 'Why must transformed E. coli cells be incubated in nutrient broth (e.g. SOC or LB) at 37°C for 30–60 minutes BEFORE plating onto antibiotic selective media?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'To allow surviving cells to express the plasmid-encoded beta-lactamase resistance protein before encountering ampicillin' },
            { id: 'B', text: 'To degrade excess extracellular plasmid DNA so it does not poison the cells' },
            { id: 'C', text: 'To allow the cells to cool down to room temperature so they do not melt the agar plate' },
            { id: 'D', text: 'To wash off the calcium chloride buffer' }
          ],
          correct_answer_id: 'A',
          explanation: 'Ampicillin kills non-resistant dividing bacterial cells. The recovery period allows transformed cells time to transcribe and translate the beta-lactamase resistance enzyme from the newly acquired plasmid. Plating immediately onto ampicillin would kill the cells before resistance proteins can be produced.',
          remediation_hints: {
            'B': 'Diagnostic Error: Extracellular plasmid DNA is harmless to bacteria and does not poison culture media.',
            'C': 'Diagnostic Error: Agar plates do not melt at 37°C (agar melts above 85°C); the incubation is biological, not physical cooling.',
            'D': 'Diagnostic Error: Cells are not washed in recovery broth; recovery provides nutrients and time for protein synthesis.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D2-06-B',
          question_text: 'After 36 hours of incubation, small, translucent "satellite colonies" appear surrounding large primary transformed colonies on an ampicillin plate. What causes satellite colonies?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'The primary transformed colony secreted beta-lactamase into the surrounding agar, destroying ampicillin and allowing untransformed cells to grow' },
            { id: 'B', text: 'A viral phage infection has spread from the primary colony' },
            { id: 'C', text: 'The satellite colonies have spontaneously acquired double the plasmid copy number' },
            { id: 'D', text: 'The agar plate dried out and caused micro-cracking' }
          ],
          correct_answer_id: 'A',
          explanation: 'The bla gene product, beta-lactamase, is secreted into the extracellular space where it enzymatically cleaves the beta-lactam ring of ampicillin. Over extended incubation, ampicillin is depleted in the local zone around the primary colony, permitting non-transformed background cells to form tiny satellite colonies.',
          remediation_hints: {
            'B': 'Diagnostic Error: Satellite colonies are viable bacteria, not bacteriophage plaques (which produce clear lysis halos).',
            'C': 'Diagnostic Error: Satellite colonies do not contain plasmid; if picked and restreaked onto fresh ampicillin, they will fail to grow.',
            'D': 'Diagnostic Error: Micro-cracking does not produce organized living bacterial colonies.'
          }
        }
      }
    ]
  }
];
