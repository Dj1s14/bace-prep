import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_7_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_autoclave',
      domain_id: 'd7',
      domain: 'Standard Equipment',
      sublesson: 'Autoclave Operations, Sterilization Parameters & Biological Indicators',
      total_competencies: 3,
      estimated_completion_time_minutes: 18,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D7-01',
        statement: 'Specify standard autoclave operational parameters (temperature, pressure, time) and select appropriate exhaust cycles for liquids versus dry goods.',
        primary_item: {
          item_id: 'COMP-D7-01-A',
          question_text: 'What are the standard operational parameters for steam autoclave sterilization of liquid media, and which exhaust cycle must be selected to prevent violent boiling and vessel rupture?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '121°C at 15–18 psi for a minimum of 20 minutes; Slow (Liquid/Gravity) Exhaust' },
            { id: 'B', text: '100°C at 0 psi for 10 minutes; Fast (Vacuum) Exhaust' },
            { id: 'C', text: '160°C at 40 psi for 5 minutes; Instant Exhaust' },
            { id: 'D', text: '70°C at 5 psi for 45 minutes; Dry Heat Cycle' }
          ],
          correct_answer_id: 'A',
          explanation: 'Standard autoclaving parameters are 121°C (250°F) at 15–18 psi steam pressure for 20–30 minutes to kill all vegetative organisms and resistant bacterial endospores. Liquid media must ALWAYS use Slow Exhaust (gravity/slow venting) so pressure declines gradually, preventing superheated liquids from boiling over violently.',
          remediation_hints: {
            'B': 'Diagnostic Error: 100°C at atmospheric pressure is boiling water, which fails to kill heat-resistant bacterial endospores (e.g. Bacillus or Clostridium). Fast exhaust on liquids causes boiling over and bottle explosions.',
            'C': 'Diagnostic Error: 160°C at 40 psi is extreme and caramelizes sugar/agar components. Instant exhaust blows out bottle seals.',
            'D': 'Diagnostic Error: 70°C is pasteurization, not sterilization.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D7-01-B',
          question_text: 'A technician autoclaves dry pipette tip boxes and wrapped metal surgical instruments. Which exhaust setting should be selected, and why?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Fast (Vacuum) Exhaust, because rapid steam evacuation draws out residual moisture and prevents wet packs' },
            { id: 'B', text: 'Slow Liquid Exhaust, because dry goods will shatter if vented quickly' },
            { id: 'C', text: 'No exhaust; items must cool inside under pressure for 48 hours' },
            { id: 'D', text: 'Liquid simmer mode at 90°C' }
          ],
          correct_answer_id: 'A',
          explanation: 'Dry goods (pipette tips, glassware, surgical tools) do not contain liquids that can boil over. Fast/Vacuum Exhaust rapidly purges steam and includes a post-cycle vacuum dry phase that evaporates condensation, ensuring items emerge completely dry and ready for use.',
          remediation_hints: {
            'B': 'Diagnostic Error: Slow exhaust leaves excessive moisture trapped inside tip boxes and wrapping, causing mold growth or compromising sterile packaging integrity.',
            'C': 'Diagnostic Error: Leaving items sealed under pressure for days causes rust and halts laboratory operations.',
            'D': 'Diagnostic Error: Simmer mode does not achieve sterilization.'
          }
        }
      },
      {
        competency_id: 'COMP-D7-02',
        statement: 'Interpret autoclave validation indicators, distinguishing between chemical autoclave tape and biological spore indicators.',
        primary_item: {
          item_id: 'COMP-D7-02-A',
          question_text: 'A technician observes that the diagonal white indicator stripes on autoclave tape have turned dark black after a run. Does this result prove that the items inside the load are completely sterile?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'No; autoclave tape is a chemical indicator that only confirms exposure to heat (~121°C), not that sterilization duration and steam penetration were achieved throughout the core of the load' },
            { id: 'B', text: 'Yes; black stripes provide legal proof of complete sterility under FDA guidelines' },
            { id: 'C', text: 'No; black stripes indicate the load was contaminated by soot from the steam boiler' },
            { id: 'D', text: 'Yes; the stripes turn black only when every bacterial spore has died' }
          ],
          correct_answer_id: 'A',
          explanation: 'Chemical autoclave tape is a Class 1 process indicator. It only verifies that the exterior surface was exposed to heat; it does not measure time at temperature or steam saturation. Biological indicators (e.g. Geobacillus stearothermophilus spores) are required to validate actual biological kill.',
          remediation_hints: {
            'B': 'Diagnostic Error: Chemical indicators are qualitative process markers, not proof of sterility. Autoclaves can malfunction and turn tape black in 2 minutes without sterilizing.',
            'C': 'Diagnostic Error: The color change is a heat-activated lead carbonate chemical reaction, not soot.',
            'D': 'Diagnostic Error: Autoclave tape contains no living spores and cannot measure biological lethality.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D7-02-B',
          question_text: 'Which biological organism is utilized in standard biological indicator (BI) vials to formally validate autoclave steam sterilization efficacy, and what indicates a successful run?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Geobacillus stearothermophilus endospores; lack of microbial growth (no color change/turbidity) after 55–60°C incubation proves sterility' },
            { id: 'B', text: 'Escherichia coli vegetative cells; clear turbidity indicates successful sterilization' },
            { id: 'C', text: 'Saccharomyces cerevisiae yeast; formation of gas bubbles' },
            { id: 'D', text: 'Bacillus subtilis spores incubated at room temperature for 10 minutes' },
          ],
          correct_answer_id: 'A',
          explanation: 'Geobacillus stearothermophilus is an extreme thermophilic bacterium whose endospores have high resistance to moist heat (D121 value ~1.5–2.0 minutes). After autoclaving, the ampoule is incubated at 55–60°C. If spores were successfully killed, the media remains purple (no acid production). Yellow media indicates failed sterilization.',
          remediation_hints: {
            'B': 'Diagnostic Error: E. coli is heat-sensitive and killed easily at 65°C; it cannot validate autoclave spore kill.',
            'C': 'Diagnostic Error: Yeast is easily killed by mild heat and is not a sterilization indicator.',
            'D': 'Diagnostic Error: Bacillus atrophaeus/subtilis is used for ethylene oxide and dry heat, not steam autoclaves, and incubation takes 24–48 hours.'
          }
        }
      },
      {
        competency_id: 'COMP-D7-03',
        statement: 'Calibrate, operate, and maintain pH meters using standard calibration buffers and proper electrode storage.',
        primary_item: {
          item_id: 'COMP-D7-03-A',
          question_text: 'A technician must calibrate a glass electrode pH meter prior to adjusting a Tris-HCl electrophoresis buffer to pH 8.0. Which calibration buffer standard sequence should be used for a 2-point calibration?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Calibrate first with pH 7.00 buffer, then calibrate with pH 10.01 buffer' },
            { id: 'B', text: 'Calibrate with pH 4.01 buffer, then calibrate with pH 2.00 buffer' },
            { id: 'C', text: 'Calibrate with deionized water, then calibrate with 1.0 M NaOH' },
            { id: 'D', text: 'Calibrate with 70% ethanol, then rinse with acetone' }
          ],
          correct_answer_id: 'A',
          explanation: 'A 2-point calibration must bracket the target pH. Target is pH 8.0. Calibration always starts with the zero-potential reference buffer (pH 7.00), followed by the alkaline buffer (pH 10.01) to establish the electrode slope in the basic range.',
          remediation_hints: {
            'B': 'Diagnostic Error: pH 4.01 and 2.00 bracket acidic solutions (pH < 7). Using acid calibration for a basic buffer (pH 8.0) introduces significant extrapolation error.',
            'C': 'Diagnostic Error: Deionized water is unbuffered and cannot provide a stable pH reading. Standard reference NIST-traceable buffers are required.',
            'D': 'Diagnostic Error: Organic solvents dehydrate glass electrode bulb membranes and ruin calibration.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D7-03-B',
          question_text: 'In which solution should a standard glass combination pH electrode be stored when not in use, and why should it NEVER be stored in deionized water?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Store in 3 M or saturated KCl; storage in deionized water leaches internal electrolyte ions out through the porous reference junction' },
            { id: 'B', text: 'Store in 100% bleach to keep the glass sterile' },
            { id: 'C', text: 'Store dry on the bench to prevent evaporation' },
            { id: 'D', text: 'Store in 1.0 M Hydrochloric acid to keep the pH low' }
          ],
          correct_answer_id: 'A',
          explanation: 'The internal reference electrode contains 3 M KCl. Storing the probe in deionized water creates an osmotic gradient that leaches KCl ions out through the ceramic junction, permanently depleting the reference cell and rendering the electrode sluggish and inaccurate. 3M KCl maintains ionic equilibrium.',
          remediation_hints: {
            'B': 'Diagnostic Error: Bleach destroys reference junctions and degrades delicate glass membranes.',
            'C': 'Diagnostic Error: Allowing a pH bulb to dry out dehydrates the hydrated silica gel layer, causing erratic readings.',
            'D': 'Diagnostic Error: Concentrated acid damages the electrode junction over long-term storage.'
          }
        }
      }
    ]
  }
];
