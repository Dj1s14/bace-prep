import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_5_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_nucleic_acids',
      domain_id: 'd5',
      domain: 'Biochemistry & Molecular Biology',
      sublesson: 'Nucleic Acid Structure, Hydrogen Bonding & Melting Temperature (Tm)',
      total_competencies: 3,
      estimated_completion_time_minutes: 20,
      difficulty_tier: 'Foundational',
    },
    competencies: [
      {
        competency_id: 'COMP-D5-01',
        statement: 'Analyze the chemical bonds in DNA, distinguishing between covalent 3\'-to-5\' phosphodiester bonds and inter-strand hydrogen bonds.',
        primary_item: {
          item_id: 'COMP-D5-01-A',
          question_text: 'When double-stranded DNA is heated to 95°C in a thermal cycler, which specific chemical bonds are disrupted, and which remain intact?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Phosphodiester bonds are cleaved, while hydrogen bonds remain intact' },
            { id: 'B', text: 'Hydrogen bonds between complementary base pairs are broken, while covalent phosphodiester bonds along the backbone remain intact' },
            { id: 'C', text: 'Both phosphodiester and hydrogen bonds are completely hydrolyzed' },
            { id: 'D', text: 'Peptide bonds are broken, but disulfide bridges remain intact' }
          ],
          correct_answer_id: 'B',
          explanation: 'Thermal denaturation provides sufficient kinetic energy to disrupt the relatively weak, non-covalent hydrogen bonds holding complementary bases together (2 H-bonds for A-T, 3 H-bonds for G-C). The high covalent bond energy of the phosphodiester backbone remains intact.',
          remediation_hints: {
            'A': 'Diagnostic Error: Inverted bond stability. Covalent phosphodiester bonds are strong and stable at 95°C; non-covalent hydrogen bonds melt.',
            'C': 'Diagnostic Error: Hydrolysis of the phosphodiester backbone requires harsh chemical acid/base treatment or nucleases.',
            'D': 'Diagnostic Error: Peptide bonds are in proteins, not DNA.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D5-01-B',
          question_text: 'Which enzyme is capable of forming covalent phosphodiester bonds between adjacent 3\'-hydroxyl and 5\'-phosphate ends of Okazaki fragments or cloned DNA inserts?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'DNA Ligase' },
            { id: 'B', text: 'DNA Helicase' },
            { id: 'C', text: 'Topoisomerase I' },
            { id: 'D', text: 'Restriction Endonuclease EcoRI' }
          ],
          correct_answer_id: 'A',
          explanation: 'DNA Ligase catalyzes the ATP- or NAD+-dependent formation of covalent phosphodiester bonds between a 3\'-OH and an adjacent 5\'-phosphate, sealing nicks in the sugar-phosphate backbone.',
          remediation_hints: {
            'B': 'Diagnostic Error: Helicase unwinds double-stranded DNA by breaking hydrogen bonds, not forming covalent bonds.',
            'C': 'Diagnostic Error: Topoisomerase relieves supercoiling tension.',
            'D': 'Diagnostic Error: Restriction endonucleases cleave phosphodiester bonds, the reverse of ligase.'
          }
        }
      },
      {
        competency_id: 'COMP-D5-02',
        statement: 'Predict melting temperature (Tm) differences based on GC content and base pair hydrogen bonding.',
        primary_item: {
          item_id: 'COMP-D5-02-A',
          question_text: 'Two 20-base-pair oligonucleotide primers are analyzed. Primer 1 has 70% GC content, while Primer 2 has 30% GC content. Which primer will have the higher melting temperature (Tm) and why?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Primer 1, because Guanine-Cytosine pairs form 3 hydrogen bonds compared to 2 hydrogen bonds for Adenine-Thymine pairs' },
            { id: 'B', text: 'Primer 2, because Adenine-Thymine pairs have greater molecular mass' },
            { id: 'C', text: 'Both primers will have identical Tm because they both contain exactly 20 nucleotides' },
            { id: 'D', text: 'Primer 2, because AT-rich DNA has stronger base stacking interactions' }
          ],
          correct_answer_id: 'A',
          explanation: 'G-C base pairs are joined by 3 hydrogen bonds, whereas A-T base pairs are joined by only 2 hydrogen bonds. Higher GC content requires significantly more thermal energy to disrupt, leading to a higher melting temperature (Tm).',
          remediation_hints: {
            'B': 'Diagnostic Error: Melting temperature depends on base-pairing bond energy, not base molecular mass.',
            'C': 'Diagnostic Error: Base composition strongly dictates Tm (e.g. Wallace rule: Tm = 2(A+T) + 4(G+C)). Length alone does not equate to identical Tm.',
            'D': 'Diagnostic Error: GC pairs provide both more hydrogen bonds and stronger base stacking enthalpy than AT pairs.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D5-02-B',
          question_text: 'Using the standard Wallace rule approximation for short oligonucleotides [Tm = 2°C(A + T) + 4°C(G + C)], what is the estimated Tm of the primer sequence: 5\'-GGCAATCGTACG-3\'?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '38°C' },
            { id: 'B', text: '24°C' },
            { id: 'C', text: '48°C' },
            { id: 'D', text: '12°C' }
          ],
          correct_answer_id: 'A',
          explanation: 'Sequence: 5\'-GGCAATCGTACG-3\'. Count bases: G=4, C=3 (total G+C = 7); A=3, T=2 (total A+T = 5). Tm = 2(5) + 4(7) = 10 + 28 = 38°C.',
          remediation_hints: {
            'B': 'Diagnostic Error: If you multiply all 12 bases by 2°C, you get 24°C, failing to weight G+C by 4°C.',
            'C': 'Diagnostic Error: If you multiply all bases by 4°C, you get 48°C, overestimating A+T contributions.',
            'D': 'Diagnostic Error: Total number of nucleotides is 12, not the melting temperature.'
          }
        }
      },
      {
        competency_id: 'COMP-D5-03',
        statement: 'Describe the directional orientation of nucleic acid synthesis and structural polarity.',
        primary_item: {
          item_id: 'COMP-D5-03-A',
          question_text: 'In what chemical direction does DNA polymerase synthesize a nascent daughter strand during replication and PCR?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '5\' to 3\' direction exclusively' },
            { id: 'B', text: '3\' to 5\' direction exclusively' },
            { id: 'C', text: 'Bidirectionally starting from both ends simultaneously' },
            { id: 'D', text: 'From the amino-terminus to the carboxyl-terminus' }
          ],
          correct_answer_id: 'A',
          explanation: 'All known DNA and RNA polymerases synthesize nucleic acids exclusively in the 5\' to 3\' direction. The incoming deoxynucleoside triphosphate (dNTP) 5\'-phosphate is nucleophilically attacked by the free 3\'-hydroxyl group of the growing strand.',
          remediation_hints: {
            'B': 'Diagnostic Error: DNA polymerase reads the template strand in the 3\' to 5\' direction, but synthesizes the new strand 5\' to 3\'.',
            'C': 'Diagnostic Error: Polymerases require a free 3\'-OH primer terminus; synthesis is strictly unidirectional.',
            'D': 'Diagnostic Error: N-terminus to C-terminus is the direction of ribosomal protein translation, not nucleic acid synthesis.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D5-03-B',
          question_text: 'Why does DNA synthesis require a free 3\'-hydroxyl (-OH) group on the existing primer strand?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'The 3\'-OH acts as a nucleophile to attack the alpha-phosphate of the incoming dNTP, releasing pyrophosphate' },
            { id: 'B', text: 'The 3\'-OH bonds directly to the nitrogenous base of the next nucleotide' },
            { id: 'C', text: 'The 3\'-OH is required to activate the magnesium cofactor' },
            { id: 'D', text: 'The 3\'-OH unwinds the DNA double helix' }
          ],
          correct_answer_id: 'A',
          explanation: 'During phosphodiester bond formation, the lone pair on the 3\'-oxygen carries out a nucleophilic attack on the alpha-phosphorus atom of the incoming dNTP. This forms a new phosphodiester bridge and releases inorganic pyrophosphate (PPi).',
          remediation_hints: {
            'B': 'Diagnostic Error: Bases attach to the 1\' carbon of the deoxyribose ring via N-glycosidic bonds, not the 3\'-OH.',
            'C': 'Diagnostic Error: Divalent magnesium coordinates negative charges on the triphosphate moiety, not the 3\'-OH.',
            'D': 'Diagnostic Error: Helicases unwind double helices; 3\'-OH is a chemical reaction functional group.'
          }
        }
      }
    ]
  }
];
