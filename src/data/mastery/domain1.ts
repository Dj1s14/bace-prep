import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_1_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_pipette',
      domain_id: 'd1',
      domain: 'Biotechnology Skills',
      sublesson: 'Micropipetting: Technique, Volume Selection & Calibration',
      total_competencies: 3,
      estimated_completion_time_minutes: 18,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D1-01',
        statement: 'Select the optimal micropipette model for a specified volume to ensure highest volumetric accuracy and minimal coefficient of variation.',
        primary_item: {
          item_id: 'COMP-D1-01-A',
          question_text: 'A technician must transfer 185 µL of restriction digest master mix into a reaction tube. Which micropipette should be selected to maximize volumetric accuracy and minimize delivery variance according to GLP?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'P1000 micropipette set to [0-1-8] with bottom indicator at 5' },
            { id: 'B', text: 'P200 micropipette set to [1-8-5]' },
            { id: 'C', text: 'P100 micropipette dispensed twice (100 µL + 85 µL)' },
            { id: 'D', text: '1 mL serological pipette using an electronic pipet-aid' }
          ],
          correct_answer_id: 'B',
          explanation: 'Micropipettes deliver maximum accuracy and lowest coefficient of variation (CV) in the upper 35%–100% of their operational range. 185 µL sits at 92.5% of a P200 (20–200 µL) capacity, whereas it represents only 18.5% of a P1000 capacity where mechanical piston displacement error is significantly elevated.',
          remediation_hints: {
            'A': 'Diagnostic Error: Although 185 µL is within the total volume boundary of a P1000 (100–1000 µL), operating in the bottom 20% of nominal volume increases volumetric error by 3- to 5-fold. Always select the smallest pipette that can accommodate the target volume.',
            'C': 'Diagnostic Error: Splitting a single aliquot across two separate pipetting steps doubles the cumulative mechanical and user delivery errors.',
            'D': 'Diagnostic Error: Serological pipettes lack the precision calibration needed for microliter-scale enzymatic reactions.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-01-B',
          question_text: 'An assay protocol requires adding 18.5 µL of PCR forward primer to a 96-well master mix plate. Which instrument should the technician select for the highest accuracy?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'P20 micropipette set to [1-8-5] where the bottom digit is 5 tenths' },
            { id: 'B', text: 'P200 micropipette set to [0-1-8] with bottom tick' },
            { id: 'C', text: 'P10 micropipette dialed twice (10 µL + 8.5 µL)' },
            { id: 'D', text: 'Positive displacement capillary tube' }
          ],
          correct_answer_id: 'A',
          explanation: '18.5 µL is within the rated range of a P20 (2–20 µL) and sits at 92.5% of its total capacity. A P200 dialed to 18.5 µL is operating below its calibrated 20 µL minimum range, resulting in severe volumetric inaccuracy.',
          remediation_hints: {
            'B': 'Diagnostic Error: 18.5 µL is below the manufacturer-specified minimum volume range of a P200 (20–200 µL). Using a pipette below its minimum range causes erratic volume delivery.',
            'C': 'Diagnostic Error: Splitting into multiple deliveries compounds tip-retention and pipetting error. A single delivery on a P20 is standard GLP.',
            'D': 'Diagnostic Error: Positive displacement pipettes are designated for viscous or volatile liquids (e.g. glycerol or acetone), not standard aqueous primers.'
          }
        }
      },
      {
        competency_id: 'COMP-D1-02',
        statement: 'Differentiate between the first and second stops of an air-displacement micropipette during aspiration and dispensing cycles.',
        primary_item: {
          item_id: 'COMP-D1-02-A',
          question_text: 'A technician notices that their pipetted aqueous samples consistently deliver 15% to 25% MORE volume than expected. What operational error in plunger handling is the most probable cause?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'The technician is releasing the plunger too slowly during aspiration' },
            { id: 'B', text: 'The technician is depressing the plunger down to the SECOND stop before aspirating liquid' },
            { id: 'C', text: 'The technician is holding the pipette vertically instead of at a 45° angle during aspiration' },
            { id: 'D', text: 'The technician is pre-wetting the tip three times before liquid transfer' }
          ],
          correct_answer_id: 'B',
          explanation: 'Depressing the plunger to the second stop (the blowout stop) BEFORE entering the liquid displaces excess air from the barrel. When released, this creates excessive negative pressure, drawing in substantially more liquid than the calibrated volumeter setting.',
          remediation_hints: {
            'A': 'Diagnostic Error: Releasing the plunger smoothly and slowly (1–2 seconds) is proper technique that prevents aerosol splashing and ensures accurate fluid uptake.',
            'C': 'Diagnostic Error: Holding the pipette vertically (90°) during aspiration is the correct technique. Tilting past 20° actually decreases volume intake due to hydrostatic head pressure.',
            'D': 'Diagnostic Error: Pre-wetting tips equilibrates vapor pressure and improves accuracy; it does not cause a 25% volume overshoot.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-02-B',
          question_text: 'When dispensing an aqueous sample from an air-displacement micropipette into a microcentrifuge tube, what is the correct sequence of plunger stops to ensure complete delivery?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Depress to 2nd stop immediately, pull tip out, then release to rest' },
            { id: 'B', text: 'Depress smoothly to 1st stop, pause, depress fully to 2nd stop to blow out residual droplet, withdraw tip, then release plunger' },
            { id: 'C', text: 'Depress to 1st stop only and shake the pipette tip to dislodge the remaining droplet' },
            { id: 'D', text: 'Depress to 1st stop, release to rest inside liquid, then depress to 2nd stop' }
          ],
          correct_answer_id: 'B',
          explanation: 'In forward pipetting: depress to 1st stop outside liquid to aspirate; to dispense, touch tip to tube wall at 45°, depress to 1st stop, pause, then push to 2nd stop (blowout) to expel the capillary droplet. Keep plunger depressed until the tip is completely withdrawn from the tube.',
          remediation_hints: {
            'A': 'Diagnostic Error: Depressing immediately to the second stop can splatter the sample and cause aerosol formation on the tube walls.',
            'C': 'Diagnostic Error: Shaking a micropipette creates aerosols and risks cross-contaminating adjacent wells or bench surfaces. The second stop is specifically engineered for blowout.',
            'D': 'Diagnostic Error: Releasing the plunger while the tip is still submerged in the liquid will re-aspirate the sample back into the tip.'
          }
        }
      },
      {
        competency_id: 'COMP-D1-03',
        statement: 'Identify standard operating procedures for forward versus reverse pipetting based on liquid physical properties.',
        primary_item: {
          item_id: 'COMP-D1-03-A',
          question_text: 'A technician is preparing an enzyme storage buffer containing 50% (v/v) glycerol. Forward pipetting results in bubble formation and incomplete volume delivery. How should the technician adjust their technique?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Increase aspiration speed to pull the viscous liquid past the tip orifice faster' },
            { id: 'B', text: 'Use reverse pipetting: depress to 2nd stop to aspirate, and depress only to 1st stop to dispense, retaining excess liquid in the tip' },
            { id: 'C', text: 'Dilute the glycerol with 100% ethanol to lower viscosity before pipetting' },
            { id: 'D', text: 'Heat the glycerol to 95°C in a dry bath immediately before pipetting' }
          ],
          correct_answer_id: 'B',
          explanation: 'Reverse pipetting is the standard GLP method for viscous (e.g. glycerol, protein lysates), foaming, or volatile liquids. The plunger is depressed to the second stop to aspirate an excess volume, but only depressed to the first stop during dispensing. The remaining fluid stays in the tip and is discarded, preventing air bubbles.',
          remediation_hints: {
            'A': 'Diagnostic Error: Fast aspiration of viscous liquids draws air into the tip orifice because viscous fluid cannot flow as fast as the air displacement piston, causing severe volume deficits.',
            'C': 'Diagnostic Error: Modifying the chemical composition by adding ethanol invalidates the formulation and denatures downstream enzymes.',
            'D': 'Diagnostic Error: Heating enzyme reagents to 95°C will inactivate heat-labile biomolecules and alter volumetric calibration due to thermal expansion.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-03-B',
          question_text: 'When performing reverse pipetting for a detergent solution (10% Triton X-100), what happens to the residual liquid remaining inside the tip after dispensing the target volume?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'It must be blown out into the reaction tube by pushing to the 2nd stop' },
            { id: 'B', text: 'It remains in the tip and is discarded with the tip into hazardous waste' },
            { id: 'C', text: 'It is re-aspirated and used for the next tube without changing tips' },
            { id: 'D', text: 'It is poured back into the stock reagent bottle' }
          ],
          correct_answer_id: 'B',
          explanation: 'In reverse pipetting, the excess volume remaining in the tip serves as a buffer against surface tension and bubble formation. It must never be dispensed into the target tube and must be discarded with the tip to avoid cross-contamination.',
          remediation_hints: {
            'A': 'Diagnostic Error: Blowing out the residual volume would deliver the excess liquid, ruining the stoichiometric ratio of the reaction.',
            'C': 'Diagnostic Error: Reusing the tip without changing violates aseptic practice and introduces carry-over contamination.',
            'D': 'Diagnostic Error: Returning pipetted liquids back into stock bottles is a major GLP violation that contaminates master stocks.'
          }
        }
      }
    ]
  },
  {
    lesson_metadata: {
      lesson_id: 'les_electrophoresis',
      domain_id: 'd1',
      domain: 'Biotechnology Skills',
      sublesson: 'Agarose Gel Electrophoresis: Matrix, Voltage & Fragment Resolution',
      total_competencies: 3,
      estimated_completion_time_minutes: 20,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D1-04',
        statement: 'Select agarose gel concentration based on expected DNA fragment size ranges to achieve optimal band resolution.',
        primary_item: {
          item_id: 'COMP-D1-04-A',
          question_text: 'A technician wants to resolve a 250 bp PCR amplicon from a 60 bp primer-dimer band. Which agarose gel percentage should be cast?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '0.6% agarose' },
            { id: 'B', text: '0.8% agarose' },
            { id: 'C', text: '2.0% agarose' },
            { id: 'D', text: '5.0% agarose' }
          ],
          correct_answer_id: 'C',
          explanation: 'Agarose concentration determines pore size. High-percentage gels (1.8% to 2.0%) have small pores ideal for resolving small DNA fragments (50–500 bp). Low-percentage gels (0.6%–0.8%) have large pores suited for resolving large DNA fragments (5–15 kb).',
          remediation_hints: {
            'A': 'Diagnostic Error: A 0.6% gel has large pores; both the 250 bp and 60 bp fragments will migrate with the dye front and appear as a compressed smear.',
            'B': 'Diagnostic Error: 0.8% is standard for separating 1 kb to 10 kb plasmid digests, but fails to clearly resolve small amplicons under 300 bp.',
            'D': 'Diagnostic Error: Standard agarose does not cast reliably at 5.0% due to high viscosity and brittleness; polyacrylamide (PAGE) is used if 5%+ sieving is required.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-04-B',
          question_text: 'A quality control analyst needs to separate an intact 12 kb lambda genomic DNA digest from an 8 kb fragment. Which agarose gel concentration is most appropriate?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '0.7% agarose' },
            { id: 'B', text: '2.5% agarose' },
            { id: 'C', text: '3.0% agarose' },
            { id: 'D', text: '4.0% agarose' }
          ],
          correct_answer_id: 'A',
          explanation: 'Large DNA fragments (>5 kb) require large gel matrix pores to migrate without being trapped at the well boundary. A 0.7% agarose gel provides optimal resolution for high molecular weight fragments between 5 kb and 15 kb.',
          remediation_hints: {
            'B': 'Diagnostic Error: A 2.5% gel has tiny pores that will severely retard fragments larger than 2 kb, causing 12 kb and 8 kb bands to stay stuck near the well.',
            'C': 'Diagnostic Error: 3.0% agarose is used for ultra-small oligos (sub-200 bp). Large fragments cannot migrate effectively through this dense meshwork.',
            'D': 'Diagnostic Error: Dense matrices hinder migration of high molecular weight fragments.'
          }
        }
      },
      {
        competency_id: 'COMP-D1-05',
        statement: 'Troubleshoot electrophoretic migration errors related to electrode polarity, running buffer composition, and well loading.',
        primary_item: {
          item_id: 'COMP-D1-05-A',
          question_text: 'During an electrophoresis run, the technician notices the bromophenol blue loading dye is migrating backward toward the top of the gel and out of the wells. What is the root cause?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'The voltage was set too low (e.g. 50V instead of 100V)' },
            { id: 'B', text: 'The electrical leads were plugged in backwards: negative cathode connected to the bottom of the chamber' },
            { id: 'C', text: 'The gel was prepared using TBE buffer instead of TAE buffer' },
            { id: 'D', text: 'Too much loading dye was mixed with the DNA samples' }
          ],
          correct_answer_id: 'B',
          explanation: 'DNA has a net negative charge due to its sugar-phosphate backbone and migrates toward the positive anode ("Run to Red"). If the electrodes are reversed (positive at the top, negative at the bottom), DNA and tracking dyes migrate backward out of the wells into the buffer.',
          remediation_hints: {
            'A': 'Diagnostic Error: Low voltage slows migration velocity, but does not invert the vector of electrophoretic movement.',
            'C': 'Diagnostic Error: Both TAE and TBE are functional running buffers that support standard forward migration.',
            'D': 'Diagnostic Error: Excess loading dye darkens the band or causes smiling, but cannot reverse the direction of electrical migration.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-05-B',
          question_text: 'A student accidentally fills the electrophoresis chamber with pure deionized water instead of 1X TAE buffer. What will happen when the power supply is turned on to 100 V?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Current will be extremely low/zero; bands will fail to migrate and the gel may overheat and melt due to high resistance' },
            { id: 'B', text: 'The DNA will migrate three times faster than normal with sharp bands' },
            { id: 'C', text: 'The DNA fragments will reverse electrical charge and become positive' },
            { id: 'D', text: 'The ethidium bromide dye will immediately disintegrate' }
          ],
          correct_answer_id: 'A',
          explanation: 'Deionized water lacks the free ions (Tris, acetate, EDTA) needed to conduct electrical current. Because resistance is extremely high, electrical current is near zero, DNA fails to migrate properly, and high electrical resistance generates excessive localized heat that can melt the agarose.',
          remediation_hints: {
            'B': 'Diagnostic Error: Without ions to carry current, migration stops or becomes erratic, rather than accelerating.',
            'C': 'Diagnostic Error: DNA charge is intrinsic to its chemical structure (negatively charged phosphate groups at physiological pH) and does not invert in pure water.',
            'D': 'Diagnostic Error: Fluorescent intercalating stains are stable in aqueous solutions; the failure is electrical, not fluorophore degradation.'
          }
        }
      },
      {
        competency_id: 'COMP-D1-06',
        statement: 'Explain the function of loading dye components including density agents and migration tracking dyes.',
        primary_item: {
          item_id: 'COMP-D1-06-A',
          question_text: 'What is the role of glycerol or Ficoll in standard 6X DNA gel loading buffer?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'It increases sample density so the DNA sinks smoothly to the bottom of the well under the running buffer' },
            { id: 'B', text: 'It breaks hydrogen bonds to denature double-stranded DNA into single strands' },
            { id: 'C', text: 'It acts as an enzymatic cofactor that activates Taq polymerase' },
            { id: 'D', text: 'It intercalates into DNA base pairs to emit orange fluorescence under UV light' }
          ],
          correct_answer_id: 'A',
          explanation: 'DNA samples in aqueous buffer have roughly the same density as running buffer and would float out of the wells. Glycerol or Ficoll increases density, ensuring the sample sinks and settles at the bottom of the well.',
          remediation_hints: {
            'B': 'Diagnostic Error: Formamide or urea are denaturants; glycerol is a density agent that maintains native double-stranded conformation in non-denaturing agarose gels.',
            'C': 'Diagnostic Error: Taq polymerase is used in PCR, not in gel loading buffers, and its cofactor is magnesium (Mg2+).',
            'D': 'Diagnostic Error: Intercalating fluorophores (ethidium bromide, GelGreen) emit fluorescence; loading dyes contain tracking dyes (bromophenol blue, xylene cyanol) and density agents.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D1-06-B',
          question_text: 'A technician loads DNA without loading buffer. Upon pipetting into the submerged well, the liquid immediately plumes upward into the buffer chamber. What component was missing?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'A density agent such as glycerol, sucrose, or Ficoll' },
            { id: 'B', text: 'Ethidium bromide stain' },
            { id: 'C', text: 'Magnesium chloride cofactor' },
            { id: 'D', text: 'Sodium dodecyl sulfate (SDS) surfactant' }
          ],
          correct_answer_id: 'A',
          explanation: 'Without a density agent (glycerol or Ficoll), the aqueous sample is less dense than or equal in density to the surrounding buffer and will disperse into the chamber buffer rather than remaining in the well.',
          remediation_hints: {
            'B': 'Diagnostic Error: Ethidium bromide allows visualization under UV transillumination, but does not provide the gravitational density to sink the sample.',
            'C': 'Diagnostic Error: MgCl2 is an enzymatic cofactor; it does not weigh down DNA in wells.',
            'D': 'Diagnostic Error: SDS is a detergent used in protein gels; adding detergent would lower surface tension and cause bubbling.'
          }
        }
      }
    ]
  }
];
