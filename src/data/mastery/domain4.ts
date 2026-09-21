import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_4_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_molarity',
      domain_id: 'd4',
      domain: 'Applied Mathematics',
      sublesson: 'Molarity, Formula Weight & Solid Buffer Calculations',
      total_competencies: 3,
      estimated_completion_time_minutes: 20,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D4-01',
        statement: 'Calculate the required mass of dry chemical solute to prepare a target volume and molar concentration.',
        primary_item: {
          item_id: 'COMP-D4-01-A',
          question_text: 'An SOP specifies preparing 400 mL of 0.25 M Ethylenediaminetetraacetic acid disodium salt (EDTA-Na2 • 2H2O, Formula Weight = 372.24 g/mol). What mass of solid powder must be weighed?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '37.22 g' },
            { id: 'B', text: '93.06 g' },
            { id: 'C', text: '3.72 g' },
            { id: 'D', text: '14.89 g' }
          ],
          correct_answer_id: 'A',
          explanation: 'Mass (g) = Molarity (mol/L) × Volume (L) × FW (g/mol). 400 mL = 0.400 L. Mass = 0.25 mol/L × 0.400 L × 372.24 g/mol = 37.224 g.',
          remediation_hints: {
            'B': 'Diagnostic Error: You calculated for a full 1.0 L volume (0.25 × 1.0 × 372.24 = 93.06 g). Remember to convert 400 mL to 0.400 L.',
            'C': 'Diagnostic Error: Decimal shift error (treated 400 mL as 0.04 L instead of 0.400 L).',
            'D': 'Diagnostic Error: Divided by formula weight or multiplied by 0.16; use Mass = M × V × FW.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D4-01-B',
          question_text: 'A technician must prepare 250 mL of 1.5 M Tris base (FW = 121.14 g/mol). What mass of Tris base is required?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '181.71 g' },
            { id: 'B', text: '45.43 g' },
            { id: 'C', text: '80.76 g' },
            { id: 'D', text: '4.54 g' }
          ],
          correct_answer_id: 'B',
          explanation: 'Mass = M × V (L) × FW = 1.5 mol/L × 0.250 L × 121.14 g/mol = 45.4275 g (45.43 g).',
          remediation_hints: {
            'A': 'Diagnostic Error: Calculated mass for a full 1,000 mL (1.5 × 1.0 × 121.14 = 181.71 g).',
            'C': 'Diagnostic Error: Multiplied volume by FW and divided by molarity (0.250 × 121.14 / 1.5).',
            'D': 'Diagnostic Error: Metric decimal shift error; 250 mL is 0.250 L, not 0.025 L.'
          }
        }
      },
      {
        competency_id: 'COMP-D4-02',
        statement: 'Apply the dilution equation C1V1 = C2V2 to determine required concentrated stock volumes and necessary diluent volumes.',
        primary_item: {
          item_id: 'COMP-D4-02-A',
          question_text: 'A protocol requires 800 mL of 0.5X TBE buffer. You are provided with a 10X TBE liquid stock solution. How much stock solution and how much deionized water must be combined?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '40 mL of 10X stock and 760 mL of diH2O' },
            { id: 'B', text: '40 mL of 10X stock and 800 mL of diH2O' },
            { id: 'C', text: '80 mL of 10X stock and 720 mL of diH2O' },
            { id: 'D', text: '400 mL of 10X stock and 400 mL of diH2O' }
          ],
          correct_answer_id: 'A',
          explanation: 'C1V1 = C2V2 -> (10X)(V1) = (0.5X)(800 mL) -> V1 = (0.5 × 800) / 10 = 40 mL stock. Volume of diluent (water) = V_total - V_stock = 800 mL - 40 mL = 760 mL.',
          remediation_hints: {
            'B': 'Diagnostic Error: Adding 40 mL to 800 mL yields 840 mL, resulting in an under-concentrated buffer (~0.476X). You must subtract stock volume from total volume.',
            'C': 'Diagnostic Error: 80 mL into 800 mL is a 1:10 dilution, which would yield a 1.0X buffer, not the target 0.5X.',
            'D': 'Diagnostic Error: 400 mL into 800 mL represents a 1:2 dilution, yielding 5X TBE.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D4-02-B',
          question_text: 'You have a 5.0 mg/mL stock of bovine serum albumin (BSA). How would you prepare 10 mL of working BSA at a concentration of 0.25 mg/mL?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '0.5 mL of 5.0 mg/mL stock diluted with 9.5 mL of buffer' },
            { id: 'B', text: '0.5 mL of 5.0 mg/mL stock diluted with 10.0 mL of buffer' },
            { id: 'C', text: '1.0 mL of stock diluted with 9.0 mL of buffer' },
            { id: 'D', text: '2.5 mL of stock diluted with 7.5 mL of buffer' }
          ],
          correct_answer_id: 'A',
          explanation: 'C1V1 = C2V2 -> (5.0 mg/mL)(V1) = (0.25 mg/mL)(10 mL) -> V1 = 2.5 / 5.0 = 0.5 mL stock. Diluent volume = 10 mL - 0.5 mL = 9.5 mL buffer.',
          remediation_hints: {
            'B': 'Diagnostic Error: Adding 0.5 mL of stock to 10.0 mL diluent yields 10.5 mL total volume, altering the concentration to 0.238 mg/mL.',
            'C': 'Diagnostic Error: 1.0 mL of 5.0 mg/mL in 10 mL yields 0.5 mg/mL (double the desired concentration).',
            'D': 'Diagnostic Error: Arithmetic inversion.'
          }
        }
      },
      {
        competency_id: 'COMP-D4-03',
        statement: 'Calculate percent concentrations for weight/volume (% w/v) and volume/volume (% v/v) laboratory formulations.',
        primary_item: {
          item_id: 'COMP-D4-03-A',
          question_text: 'How many grams of agarose powder are needed to prepare 150 mL of a 1.2% (w/v) agarose gel in 1X TAE buffer?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '1.8 g' },
            { id: 'B', text: '1.2 g' },
            { id: 'C', text: '18.0 g' },
            { id: 'D', text: '0.8 g' }
          ],
          correct_answer_id: 'A',
          explanation: '% (w/v) is defined as grams of solute per 100 mL of solution. A 1.2% solution contains 1.2 g per 100 mL. For 150 mL: Mass = 1.2 g/100 mL × 150 mL = 1.8 g.',
          remediation_hints: {
            'B': 'Diagnostic Error: 1.2 g is for 100 mL; for 150 mL you must scale up by 1.5×.',
            'C': 'Diagnostic Error: Off by a factor of 10. 18.0 g in 150 mL would be a 12% solution.',
            'D': 'Diagnostic Error: Inverted the proportion (divided 1.2 by 1.5 instead of multiplying).'
          }
        },
        paired_variant: {
          item_id: 'COMP-D4-03-B',
          question_text: 'An SOP calls for 500 mL of a 20% (w/v) PEG-8000 solution for DNA precipitation. What mass of dry PEG-8000 must be dissolved and brought to volume?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '20 g' },
            { id: 'B', text: '100 g' },
            { id: 'C', text: '50 g' },
            { id: 'D', text: '200 g' }
          ],
          correct_answer_id: 'B',
          explanation: '20% (w/v) means 20 g of solute per 100 mL of solution. For 500 mL: Mass = 20 g/100 mL × 500 mL = 100 g.',
          remediation_hints: {
            'A': 'Diagnostic Error: 20 g is the mass for only 100 mL of solution.',
            'C': 'Diagnostic Error: 50 g in 500 mL is a 10% (w/v) solution.',
            'D': 'Diagnostic Error: 200 g in 500 mL would be a 40% (w/v) solution.'
          }
        }
      }
    ]
  }
];
