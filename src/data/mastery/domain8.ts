import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_8_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_standard_curves',
      domain_id: 'd8',
      domain: 'Experimental Design & Data Analysis',
      sublesson: 'Spectrophotometry, Standard Curves & Linear Regression',
      total_competencies: 3,
      estimated_completion_time_minutes: 20,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D8-01',
        statement: 'Apply the Beer-Lambert Law (A = εbc) to spectrophotometric absorbance measurements and understand cuvette pathlength conventions.',
        primary_item: {
          item_id: 'COMP-D8-01-A',
          question_text: 'According to the Beer-Lambert Law (A = εbc), what is the relationship between measured optical absorbance (A) and analyte concentration (c)?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Absorbance is directly proportional to concentration, assuming optical pathlength and molar absorptivity remain constant' },
            { id: 'B', text: 'Absorbance is inversely proportional to concentration squared' },
            { id: 'C', text: 'Absorbance is logarithmic and independent of pathlength' },
            { id: 'D', text: 'Absorbance increases exponentially with temperature' }
          ],
          correct_answer_id: 'A',
          explanation: 'In Beer-Lambert Law (A = εbc), A is absorbance, ε is molar absorptivity coefficient (L/(mol·cm)), b is path length (typically 1 cm), and c is molar concentration. As concentration doubles, absorbance doubles linearly within the dynamic linear range of the detector.',
          remediation_hints: {
            'B': 'Diagnostic Error: Light transmission (T) is logarithmic, but Absorbance (A = -log10 T) is directly linear with concentration.',
            'C': 'Diagnostic Error: Absorbance is directly dependent on pathlength b (a 2 cm cuvette will read double the absorbance of a 1 cm cuvette).',
            'D': 'Diagnostic Error: Beer-Lambert is an optical absorption relationship governed by photon absorption cross-section, not thermal kinetic acceleration.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D8-01-B',
          question_text: 'Prior to measuring absorbance of bacterial cultures at OD600, why must the spectrophotometer be calibrated with a "blank" cuvette containing sterile growth media?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'To zero out background light scattering and absorption caused by the cuvette plastic and media components' },
            { id: 'B', text: 'To warm up the halogen lamp inside the machine' },
            { id: 'C', text: 'To sterilize the optical chamber before inserting live cells' },
            { id: 'D', text: 'To measure the electrical conductivity of the photodiode' }
          ],
          correct_answer_id: 'A',
          explanation: 'A spectrophotometer blank resets the instrument to 100% transmittance (0.000 Absorbance) for all non-analyte components (cuvette walls, solvent, salts, amino acids). This ensures subsequent absorbance readings reflect only the light scattered by the bacterial cells.',
          remediation_hints: {
            'B': 'Diagnostic Error: Blanking zeroes optical detectors; warming up the lamp is done electronically during boot-up.',
            'C': 'Diagnostic Error: Inserting a cuvette into the compartment does not sterilize the instrument.',
            'D': 'Diagnostic Error: Spectrophotometers measure photons/transmittance, not liquid electrical conductivity.'
          }
        }
      },
      {
        competency_id: 'COMP-D8-02',
        statement: 'Calculate unknown sample concentrations using a standard curve linear regression equation (y = mx + b).',
        primary_item: {
          item_id: 'COMP-D8-02-A',
          question_text: 'A Bradford protein assay standard curve generates a linear regression line: y = 0.0045x + 0.052, where y is absorbance at 595 nm and x is protein concentration in µg/mL. An unknown sample has an absorbance of 0.412. What is the protein concentration of the unknown?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '80.0 µg/mL' },
            { id: 'B', text: '103.1 µg/mL' },
            { id: 'C', text: '0.054 µg/mL' },
            { id: 'D', text: '91.6 µg/mL' }
          ],
          correct_answer_id: 'A',
          explanation: 'y = mx + b -> 0.412 = 0.0045x + 0.052 -> 0.412 - 0.052 = 0.0045x -> 0.360 = 0.0045x -> x = 0.360 / 0.0045 = 80.0 µg/mL.',
          remediation_hints: {
            'B': 'Diagnostic Error: You added the y-intercept instead of subtracting it ((0.412 + 0.052) / 0.0045 = 103.1 µg/mL). In y = mx + b, x = (y - b) / m.',
            'C': 'Diagnostic Error: Multiplied absorbance by slope instead of isolating x.',
            'D': 'Diagnostic Error: Omitted subtracting the y-intercept entirely (0.412 / 0.0045 = 91.6 µg/mL).'
          }
        },
        paired_variant: {
          item_id: 'COMP-D8-02-B',
          question_text: 'A standard curve has the equation y = 0.025x + 0.010, where y is OD450 and x is ng/mL. If an unknown diluted sample reads y = 0.510, what is the concentration x in ng/mL?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '20.0 ng/mL' },
            { id: 'B', text: '20.8 ng/mL' },
            { id: 'C', text: '12.5 ng/mL' },
            { id: 'D', text: '2.5 ng/mL' }
          ],
          correct_answer_id: 'A',
          explanation: 'x = (y - b) / m = (0.510 - 0.010) / 0.025 = 0.500 / 0.025 = 20.0 ng/mL.',
          remediation_hints: {
            'B': 'Diagnostic Error: You forgot to subtract the y-intercept b = 0.010 (0.510 / 0.025 = 20.4 or 20.8).',
            'C': 'Diagnostic Error: Multiplied 0.500 by 0.025 instead of dividing.',
            'D': 'Diagnostic Error: Decimal shift error.'
          }
        }
      },
      {
        competency_id: 'COMP-D8-03',
        statement: 'Evaluate the R-squared (coefficient of determination) quality threshold and recognize when unknown sample values exceed the linear dynamic range.',
        primary_item: {
          item_id: 'COMP-D8-03-A',
          question_text: 'A technician constructs a 5-point standard curve for an ELISA assay and obtains an R² value of 0.892. According to standard biomanufacturing QC criteria, can this standard curve be used to quantify patient lot samples?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'No; QC standard curves generally require R² ≥ 0.98 (or ≥ 0.99) to verify linearity and analytical precision. R² = 0.892 indicates unacceptable experimental error' },
            { id: 'B', text: 'Yes; any R² above 0.800 is acceptable for clinical release' },
            { id: 'C', text: 'Yes; R² measures the y-intercept and has no relation to linearity' },
            { id: 'D', text: 'No; R² must be exactly 0.000 to be acceptable' }
          ],
          correct_answer_id: 'A',
          explanation: 'The coefficient of determination (R²) indicates how well the regression model fits the empirical data points. In regulated QC laboratories (cGMP/GLP), analytical standard curves must meet strict acceptance criteria (typically R² ≥ 0.980, often R² ≥ 0.995). An R² of 0.892 indicates pipetting error, bubble interference, or standard degradation, invalidating the run.',
          remediation_hints: {
            'B': 'Diagnostic Error: R² = 0.80 leaves 20% of sample variation unexplained, resulting in unacceptably high quantification error.',
            'C': 'Diagnostic Error: R² specifically quantifies goodness-of-fit to a linear line; it is distinct from the y-intercept.',
            'D': 'Diagnostic Error: R² = 1.000 is a perfect fit; R² = 0.000 indicates zero linear correlation.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D8-03-B',
          question_text: 'An unknown sample has an optical absorbance of 2.850 on a spectrophotometer whose validated linear range is 0.050 to 1.500. How should the technician accurately determine the sample concentration?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Dilute the sample (e.g. 1:5 or 1:10) with assay buffer so its absorbance falls within 0.050–1.500, re-read, and multiply by the dilution factor' },
            { id: 'B', text: 'Extrapolate the standard curve equation beyond the 1.500 boundary without diluting' },
            { id: 'C', text: 'Subtract 1.350 from the reading to force it into the linear range' },
            { id: 'D', text: 'Report the sample concentration as infinite' }
          ],
          correct_answer_id: 'A',
          explanation: 'At high absorbance (>1.5–2.0), stray light and detector saturation cause standard curves to plateau non-linearly (Beer-Lambert law breaks down). Never extrapolate outside the verified linear dynamic range. The sample must be diluted into range, re-assayed, and the result multiplied by the dilution factor.',
          remediation_hints: {
            'B': 'Diagnostic Error: Extrapolating beyond the linear range leads to massive underestimation of analyte concentration because absorbance plateaus.',
            'C': 'Diagnostic Error: Arbitrarily subtracting absorbance values is data falsification and destroys mathematical validity.',
            'D': 'Diagnostic Error: The sample has a finite concentration that can be accurately measured simply by performing an appropriate dilution.'
          }
        }
      }
    ]
  }
];
