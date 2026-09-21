import { Question } from '../../types/database';

export const LESSON_ASEPTIC_QUESTIONS: Question[] = [
  {
    "id": "q_asep_1",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_1_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_1_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_1_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_1_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_2",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_2_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_2_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_2_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_2_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_3",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_3_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_3_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_3_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_3_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_4",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_4_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_4_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_4_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_4_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_5",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_5_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_5_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_5_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_5_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_6",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_6_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_6_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_6_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_6_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_7",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_7_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_7_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_7_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_7_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_8",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_8_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_8_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_8_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_8_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_9",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_9_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_9_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_9_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_9_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_10",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_10_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_10_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_10_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_10_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_11",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_11_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_11_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_11_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_11_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_12",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_12_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_12_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_12_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_12_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_13",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_13_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_13_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_13_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_13_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_14",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_14_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_14_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_14_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_14_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_15",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_15_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_15_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_15_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_15_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_16",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_16_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_16_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_16_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_16_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_17",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_17_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_17_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_17_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_17_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_18",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_18_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_18_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_18_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_18_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_19",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_19_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_19_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_19_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_19_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_20",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_20_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_20_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_20_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_20_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_21",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_21_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_21_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_21_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_21_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_22",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_22_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_22_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_22_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_22_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_23",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_23_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_23_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_23_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_23_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_24",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_24_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_24_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_24_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_24_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_25",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_25_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_25_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_25_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_25_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_26",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_26_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_26_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_26_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_26_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_27",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_27_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_27_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_27_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_27_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_28",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_28_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_28_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_28_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_28_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_29",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_29_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_29_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_29_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_29_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_30",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_30_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_30_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_30_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_30_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_31",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_31_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_31_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_31_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_31_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_32",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_32_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_32_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_32_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_32_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_33",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_33_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_33_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_33_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_33_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_34",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_34_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_34_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_34_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_34_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_35",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_35_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_35_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_35_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_35_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_36",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_36_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_36_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_36_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_36_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_37",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_37_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_37_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_37_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_37_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_38",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_38_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_38_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_38_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_38_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_39",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_39_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_39_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_39_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_39_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_40",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_40_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_40_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_40_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_40_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_41",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_41_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_41_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_41_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_41_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_42",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_42_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_42_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_42_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_42_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_43",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_43_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_43_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_43_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_43_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_44",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_44_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_44_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_44_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_44_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_45",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_45_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_45_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_45_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_45_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_46",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_46_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_46_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_46_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_46_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_47",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_47_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_47_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_47_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_47_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_48",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_48_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_48_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_48_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_48_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_49",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_49_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_49_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_49_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_49_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_50",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_50_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_50_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_50_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_50_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_51",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_51_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_51_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_51_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_51_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_52",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_52_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_52_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_52_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_52_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_53",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_53_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_53_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_53_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_53_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_54",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_54_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_54_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_54_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_54_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_55",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_55_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_55_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_55_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_55_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_56",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_56_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_56_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_56_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_56_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_57",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_57_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_57_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_57_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_57_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_58",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_58_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_58_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_58_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_58_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_59",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_59_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_59_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_59_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_59_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_60",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_60_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_60_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_60_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_60_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_61",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_61_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_61_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_61_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_61_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_62",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_62_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_62_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_62_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_62_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_63",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_63_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_63_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_63_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_63_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_64",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_64_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_64_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_64_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_64_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_65",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_65_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_65_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_65_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_65_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_66",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_66_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_66_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_66_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_66_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_67",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_67_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_67_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_67_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_67_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_68",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_68_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_68_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_68_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_68_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_69",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_69_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_69_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_69_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_69_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_70",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_70_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_70_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_70_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_70_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_71",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_71_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_71_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_71_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_71_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_72",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_72_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_72_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_72_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_72_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_73",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_73_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_73_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_73_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_73_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_74",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_74_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_74_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_74_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_74_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_75",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_75_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_75_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_75_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_75_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_76",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_76_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_76_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_76_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_76_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_77",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_77_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_77_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_77_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_77_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_78",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_78_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_78_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_78_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_78_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_79",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_79_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_79_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_79_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_79_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_80",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_80_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_80_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_80_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_80_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_81",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_81_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_81_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_81_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_81_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_82",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_82_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_82_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_82_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_82_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_83",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_83_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_83_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_83_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_83_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_84",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_84_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_84_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_84_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_84_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_85",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_85_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_85_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_85_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_85_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_86",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_86_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_86_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_86_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_86_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_87",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_87_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_87_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_87_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_87_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_88",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_88_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_88_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_88_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_88_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_89",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_89_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_89_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_89_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_89_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_90",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_90_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_90_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_90_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_90_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_91",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_91_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_91_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_91_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_91_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_92",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_92_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_92_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_92_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_92_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_93",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_93_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_93_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_93_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_93_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_94",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_94_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_94_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_94_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_94_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_95",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_95_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_95_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_95_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_95_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_96",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_96_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_96_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_96_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_96_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_97",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_97_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_97_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_97_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_97_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_98",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_98_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_98_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_98_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_98_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_99",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_99_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_99_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_99_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_99_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_100",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_100_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_100_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_100_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_100_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_101",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_101_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_101_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_101_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_101_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_102",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_102_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_102_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_102_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_102_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_103",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_103_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_103_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_103_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_103_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_104",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_104_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_104_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_104_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_104_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_105",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_105_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_105_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_105_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_105_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_106",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_106_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_106_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_106_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_106_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_107",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_107_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_107_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_107_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_107_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_108",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_108_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_108_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_108_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_108_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_109",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_109_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_109_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_109_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_109_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_110",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_110_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_110_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_110_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_110_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_111",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_111_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_111_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_111_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_111_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_112",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_112_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_112_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_112_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_112_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_113",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_113_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_113_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_113_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_113_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_114",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_114_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_114_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_114_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_114_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_115",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_115_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_115_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_115_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_115_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_116",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_116_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_116_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_116_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_116_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_117",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_117_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_117_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_117_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_117_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_118",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_118_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_118_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_118_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_118_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_119",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_119_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_119_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_119_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_119_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_120",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_120_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_120_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_120_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_120_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_121",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_121_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_121_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_121_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_121_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_122",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_122_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_122_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_122_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_122_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_123",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_123_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_123_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_123_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_123_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_124",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_124_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_124_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_124_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_124_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_125",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_125_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_125_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_125_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_125_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_126",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_126_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_126_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_126_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_126_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_127",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_127_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_127_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_127_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_127_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_128",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_128_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_128_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_128_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_128_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_129",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_129_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_129_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_129_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_129_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_130",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_130_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_130_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_130_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_130_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_131",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_131_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_131_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_131_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_131_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_132",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_132_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_132_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_132_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_132_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_133",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_133_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_133_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_133_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_133_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_134",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_134_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_134_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_134_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_134_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_135",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_135_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_135_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_135_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_135_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_136",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_136_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_136_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_136_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_136_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_137",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_137_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_137_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_137_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_137_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_138",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_138_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_138_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_138_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_138_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_139",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_139_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_139_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_139_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_139_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_140",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_140_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_140_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_140_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_140_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_141",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why is 70% ethanol a more effective antimicrobial disinfectant than 100% (absolute) ethanol?",
    "explanation": "Absolute (100%) ethanol rapidly coagulates surface proteins of microbes, creating a protective crust that blocks penetration. 30% water content allows deep penetration and adequate contact time.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_141_4",
        "choice_text": "100% ethanol has an acidic pH that buffers bacterial sporulation.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_141_3",
        "choice_text": "Water in 70% ethanol acts as a primary chemical carcinogen.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_141_1",
        "choice_text": "Water facilitates penetration across the bacterial cell wall and slows evaporation, allowing effective protein coagulation.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_141_2",
        "choice_text": "100% ethanol evaporates too slowly, leaving toxic residues.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_142",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What type of filter is incorporated into biosafety cabinets to capture airborne microorganisms with 99.97% efficiency down to 0.3 µm?",
    "explanation": "HEPA filters trap particles ≥ 0.3 µm via impaction, interception, and diffusion with 99.97% minimum efficiency.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_142_4",
        "choice_text": "0.22 µm nylon syringe filter",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_142_3",
        "choice_text": "Activated charcoal canister",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_142_1",
        "choice_text": "HEPA (High-Efficiency Particulate Air) filter",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_142_2",
        "choice_text": "Cellulose acetate membrane filter",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_143",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What is the primary operational difference between a horizontal laminar flow clean bench and a Class II Biosafety Cabinet (BSC)?",
    "explanation": "Clean benches blow air toward the operator and must NEVER be used with hazardous chemicals, infectious agents, or mammalian cultures.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_143_4",
        "choice_text": "There is no functional or engineering difference.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_143_2",
        "choice_text": "A clean bench uses UV radiation during operation; a BSC uses steam.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_143_1",
        "choice_text": "A clean bench blows air directly toward the user (protecting only the product), whereas a BSC protects both product and operator through an air curtain.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_143_3",
        "choice_text": "A clean bench is rated for BSL-3 pathogens; a BSC is only for BSL-1.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_144",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When working near a Bunsen burner flame, what provides the localized sterile working zone?",
    "explanation": "The thermal updraft created by the Bunsen flame prevents airborne dust, microbes, and skin flakes from settling onto open containers.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_144_3",
        "choice_text": "The blue flame emitting ultraviolet germicidal rays across the bench",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_144_1",
        "choice_text": "An outward thermal convection updraft that lifts ambient airborne particles away from the workspace",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_144_4",
        "choice_text": "Electrostatic attraction of dust particles into the flame base",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_144_2",
        "choice_text": "A blanket of sterile nitrogen gas released by the flame",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_145",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Which biological indicator organism is universally used to validate steam sterilization in autoclaves?",
    "explanation": "G. stearothermophilus endospores are extremely thermophilic and heat-resistant; their destruction validates an autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_145_3",
        "choice_text": "Bacillus subtilis spores",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_145_2",
        "choice_text": "Escherichia coli vegetative cells",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_145_1",
        "choice_text": "Geobacillus stearothermophilus endospores",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_145_4",
        "choice_text": "Saccharomyces cerevisiae yeast cells",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_146",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the standard autoclave sterilization parameter for general microbiological media and surgical instruments?",
    "explanation": "121°C (250°F) under 15 psi of saturated steam pressure for 15–20 minutes is the standard autoclave cycle.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_146_1",
        "choice_text": "121°C at 15 psi for 15 to 20 minutes",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_146_2",
        "choice_text": "100°C at 0 psi for 60 minutes",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_146_3",
        "choice_text": "160°C at 30 psi for 5 minutes",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_146_4",
        "choice_text": "85°C at 10 psi for 45 minutes",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_147",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "When opening a sterile glass culture tube during aseptic transfers, what step should immediately precede pipetting?",
    "explanation": "Flaming the neck creates an outward thermal draft and incinerates any dust or microbes resting on the rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_147_2",
        "choice_text": "Dipping the neck of the tube into 10% bleach",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_147_4",
        "choice_text": "Placing the plastic cap face down on the benchtop",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_147_1",
        "choice_text": "Passing the opening of the glass tube briefly through the flame 2 to 3 times",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_asep_147_3",
        "choice_text": "Wiping the rim with a dry paper towel",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_148",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "How should the cap of a sterile reagent bottle be handled while liquid is being aspirated with a pipette?",
    "explanation": "Never lay caps flat on unsterilized surfaces where bench bacteria can adhere to the interior rim.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_148_1",
        "choice_text": "Held in the hand using the pinky finger or placed inside-down without touching non-sterile surfaces",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_asep_148_4",
        "choice_text": "Left loose on top of the bottle while pipetting around it",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_asep_148_2",
        "choice_text": "Placed rim-down directly on the lab bench surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_148_3",
        "choice_text": "Placed into a beaker of tap water",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_149",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What minimum pore size membrane filter is required for filter-sterilizing heat-sensitive liquid reagents (such as vitamins and antibiotics)?",
    "explanation": "0.22 µm pore filters reliably retain all standard bacteria and mycoplasma.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_149_2",
        "choice_text": "0.45 µm",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_149_1",
        "choice_text": "0.22 µm",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_149_4",
        "choice_text": "5.0 µm",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_149_3",
        "choice_text": "1.2 µm",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_asep_150",
    "domain_id": "d1",
    "topic_id": "t1_4",
    "lesson_id": "les_aseptic",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "What is the primary mode of antimicrobial action of ultraviolet (UV) germicidal light at 254 nm in biosafety cabinets?",
    "explanation": "UV-C light (254 nm) induces adjacent thymine dimer formation, stalling DNA polymerase and causing lethal replication blocks.",
    "active": true,
    "choices": [
      {
        "id": "c_asep_150_3",
        "choice_text": "Denaturing lipid membranes by oxidative saponification",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_asep_150_1",
        "choice_text": "Inducing thymine-thymine pyrimidine dimers in DNA, disrupting replication and transcription",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_asep_150_2",
        "choice_text": "Generating high-temperature infrared heat that boils cellular water",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_asep_150_4",
        "choice_text": "Cross-linking ribosomal RNA into insoluble crystals",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  }
];
