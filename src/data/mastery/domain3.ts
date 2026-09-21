import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_3_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_sds_ghs',
      domain_id: 'd3',
      domain: 'Safety & Workplace Culture',
      sublesson: 'Safety Data Sheets (SDS), GHS Pictograms & Chemical Hazards',
      total_competencies: 3,
      estimated_completion_time_minutes: 18,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D3-01',
        statement: 'Interpret the standardized 16-section Safety Data Sheet (SDS) format to locate specific hazard classifications, first-aid measures, and handling guidelines.',
        primary_item: {
          item_id: 'COMP-D3-01-A',
          question_text: 'A splash of 1.0 M Hydrochloric Acid enters a technician\'s eye. While an emergency eye-wash is being initiated, a colleague pulls the SDS. In which standardized SDS section are immediate medical treatment and exposure symptoms detailed?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Section 4: First-Aid Measures' },
            { id: 'B', text: 'Section 9: Physical and Chemical Properties' },
            { id: 'C', text: 'Section 13: Disposal Considerations' },
            { id: 'D', text: 'Section 15: Regulatory Information' }
          ],
          correct_answer_id: 'A',
          explanation: 'Under OSHA and the Globally Harmonized System (GHS), Section 4 is universally dedicated to First-Aid Measures, including descriptions of necessary measures subdivided by exposure route (inhalation, skin, eye, ingestion) and immediate medical attention needs.',
          remediation_hints: {
            'B': 'Diagnostic Error: Section 9 describes physical properties like boiling point, vapor pressure, pH, and appearance.',
            'C': 'Diagnostic Error: Section 13 describes waste treatment and disposal containers.',
            'D': 'Diagnostic Error: Section 15 outlines EPA, OSHA, and federal regulatory statutes.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D3-01-B',
          question_text: 'Where on a standardized 16-section SDS should a technician look to determine whether a chemical requires a chemical fume hood and specific nitrile glove thickness for breakthrough protection?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Section 1: Identification' },
            { id: 'B', text: 'Section 8: Exposure Controls / Personal Protection' },
            { id: 'C', text: 'Section 11: Toxicological Information' },
            { id: 'D', text: 'Section 14: Transport Information' }
          ],
          correct_answer_id: 'B',
          explanation: 'Section 8 (Exposure Controls/Personal Protection) lists OSHA Permissible Exposure Limits (PELs), ACGIH Threshold Limit Values (TLVs), engineering controls (fume hoods), and personal protective equipment specifications (gloves, eye protection, respiratory masks).',
          remediation_hints: {
            'A': 'Diagnostic Error: Section 1 lists manufacturer contact details, chemical names, and emergency phone numbers.',
            'C': 'Diagnostic Error: Section 11 describes acute toxicity, LD50 values, and carcinogenicity data.',
            'D': 'Diagnostic Error: Section 14 covers DOT shipping names and hazardous transport classifications.'
          }
        }
      },
      {
        competency_id: 'COMP-D3-02',
        statement: 'Differentiate between GHS Signal Words "DANGER" and "WARNING" and decode standardized GHS hazard pictograms.',
        primary_item: {
          item_id: 'COMP-D3-02-A',
          question_text: 'On a GHS-compliant chemical reagent bottle, what is the regulatory distinction between the signal words "DANGER" and "WARNING"?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '"DANGER" is used for more severe hazard categories; "WARNING" is reserved for less severe hazard categories' },
            { id: 'B', text: '"DANGER" indicates an environmental hazard, while "WARNING" indicates a biological hazard' },
            { id: 'C', text: '"DANGER" means the chemical is flammable, while "WARNING" means it is corrosive' },
            { id: 'D', text: 'The terms are interchangeable synonyms with no regulatory distinction' }
          ],
          correct_answer_id: 'A',
          explanation: 'Under the OSHA GHS Hazard Communication Standard, only two signal words exist: "DANGER" signifies severe hazard categories (e.g. fatal if swallowed, category 1/2), whereas "WARNING" signifies less severe hazard categories (e.g. harmful if swallowed, category 3/4).',
          remediation_hints: {
            'B': 'Diagnostic Error: Signal words indicate severity of hazard, not the biological or environmental category of the material.',
            'C': 'Diagnostic Error: Specific hazard types are indicated by pictograms (flame vs corrosion), not the signal word itself.',
            'D': 'Diagnostic Error: OSHA mandates strict legal distinctions between DANGER and WARNING.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D3-02-B',
          question_text: 'A reagent bottle displays a GHS pictogram showing a human torso with an exploding starburst in the chest. What class of hazard does this pictogram represent?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Health Hazard (carcinogen, mutagen, reproductive toxin, or target organ systemic toxicity)' },
            { id: 'B', text: 'Corrosive to metal and skin tissue' },
            { id: 'C', text: 'Acute toxicity (fatal or toxic short-term poison)' },
            { id: 'D', text: 'Flammable aerosol' }
          ],
          correct_answer_id: 'A',
          explanation: 'The Health Hazard pictogram (silhouette of head and chest with a starburst) denotes respiratory sensitizers, germ cell mutagens, carcinogens, reproductive toxins, aspiration hazards, and specific target organ toxicity (STOT).',
          remediation_hints: {
            'B': 'Diagnostic Error: Corrosive materials are symbolized by two test tubes pouring liquid dissolving a metal surface and a human hand.',
            'C': 'Diagnostic Error: Acute toxicity is indicated by the Skull and Crossbones pictogram.',
            'D': 'Diagnostic Error: Flammables are indicated by the Flame pictogram.'
          }
        }
      },
      {
        competency_id: 'COMP-D3-03',
        statement: 'Execute correct response protocols for biohazard decontamination and chemical spill containment.',
        primary_item: {
          item_id: 'COMP-D3-03-A',
          question_text: 'A culture flask containing 50 mL of BSL-2 human cell culture drops and shatters on the laboratory floor. What is the correct protocol for decontaminating and cleaning the spill?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Immediately wipe up the liquid with paper towels, sweep glass into a regular trash can, and spray with tap water' },
            { id: 'B', text: 'Evacuate the immediate area for 15–20 minutes to allow aerosols to settle, alert others, don appropriate PPE, cover the spill with absorbent paper towels, saturate with freshly diluted 10% bleach, allow a 20-minute contact time, and discard into biohazard sharps and waste' },
            { id: 'C', text: 'Pour dry sodium bicarbonate powder over the culture broth to neutralize the pH, then sweep' },
            { id: 'D', text: 'Mop the floor with 100% pure ethanol and ignite with a Bunsen burner to flame sterilize' }
          ],
          correct_answer_id: 'B',
          explanation: 'Standard biosafety spill response requires: 1) Alerting lab personnel and allowing aerosols to settle (15–30 min); 2) Donning PPE (gloves, coat, face shield); 3) Covering with absorbent paper towels to contain spread; 4) Saturating with 1:10 dilution of household bleach (0.5% sodium hypochlorite); 5) Allowing a 20-minute contact time for complete viral/bacterial inactivation; 6) Collecting glass with tongs into rigid sharps containers.',
          remediation_hints: {
            'A': 'Diagnostic Error: Immediate dry wiping spreads infectious aerosols and broken glass cuts personnel. Glass must go into rigid biohazard sharps containers, never regular trash.',
            'C': 'Diagnostic Error: Sodium bicarbonate is for neutralizing acid spills, not for biological disinfection.',
            'D': 'Diagnostic Error: Igniting ethanol creates a catastrophic fire and explosion hazard.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D3-03-B',
          question_text: 'What is the required minimum contact time when using a freshly prepared 10% (v/v) bleach solution to decontaminate a biological spill on a non-porous lab bench?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: '10 to 15 seconds' },
            { id: 'B', text: '20 to 30 minutes' },
            { id: 'C', text: '4 hours' },
            { id: 'D', text: '24 hours' }
          ],
          correct_answer_id: 'B',
          explanation: 'Sodium hypochlorite requires adequate contact time (typically 20 to 30 minutes) to denature microbial proteins and oxidize cell envelopes. Wiping it away immediately before 20 minutes leaves viable pathogens behind.',
          remediation_hints: {
            'A': 'Diagnostic Error: A few seconds is inadequate for chemical disinfectant kill time. The hypochlorite ion needs time to penetrate cell walls.',
            'C': 'Diagnostic Error: 4 hours is excessive and causes unnecessary chlorine corrosion of laboratory equipment.',
            'D': 'Diagnostic Error: 24 hours is unnecessary and bleach degrades rapidly when exposed to air and organic matter.'
          }
        }
      }
    ]
  }
];
