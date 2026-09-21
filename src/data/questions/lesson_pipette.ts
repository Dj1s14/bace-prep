import { Question } from '../../types/database';

export const LESSON_PIPETTE_QUESTIONS: Question[] = [
  {
    "id": "q_pip_1",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "A laboratory technician needs to accurately pipette 0.5 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "0.5 µL is within the calibrated range of a P2 (0.2–2 µL). The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_1_1",
        "choice_text": "P2 (0.2–2 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_1_2",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_1_3",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_1_4",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_2",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A laboratory technician needs to accurately pipette 1.2 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "1.2 µL falls within 0.2–2 µL and is best handled by a P2 or P10. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_2_1",
        "choice_text": "P2 (0.2–2 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_2_2",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_2_3",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_2_4",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_3",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "A laboratory technician needs to accurately pipette 3.5 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "3.5 µL is best measured on a P10 (0.5–10 µL) or P20 (2–20 µL). The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_3_1",
        "choice_text": "P10 or P20",
        "is_correct": true
      },
      {
        "id": "c_pip_3_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_3_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_3_4",
        "choice_text": "P5000 (1–5 mL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_4",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "A laboratory technician needs to accurately pipette 8 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "8.0 µL is near the upper range of a P10 and the mid-range of a P20. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_4_1",
        "choice_text": "P10 or P20",
        "is_correct": true
      },
      {
        "id": "c_pip_4_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_4_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_4_4",
        "choice_text": "P2 (0.2–2 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_5",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A laboratory technician needs to accurately pipette 14.5 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "14.5 µL is in the upper, most accurate range of a P20 (2–20 µL). The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_5_1",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_5_2",
        "choice_text": "P2 (0.2–2 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_5_3",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_5_4",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_6",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "A laboratory technician needs to accurately pipette 18.2 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "18.2 µL is 91% of P20 capacity, providing maximum accuracy. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_6_1",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_6_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_6_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_6_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_7",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "A laboratory technician needs to accurately pipette 25 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "25 µL exceeds P20 capacity and is best measured on a P200. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_7_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_7_2",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_7_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_7_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_8",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A laboratory technician needs to accurately pipette 45 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "45 µL is well within the 20–200 µL range of a P200. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_8_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_8_2",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_8_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_8_4",
        "choice_text": "P2 (0.2–2 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_9",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "A laboratory technician needs to accurately pipette 75 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "75 µL is accurately measured on a P200. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_9_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_9_2",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_9_3",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_9_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_10",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "A laboratory technician needs to accurately pipette 120 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "120 µL is 60% of P200 nominal volume, yielding lower error than P1000. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_10_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_10_2",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_10_3",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_10_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_11",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A laboratory technician needs to accurately pipette 165 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "165 µL is 82.5% of P200 capacity, yielding superior precision. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_11_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_11_2",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_11_3",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_11_4",
        "choice_text": "P50 (5–50 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_12",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "A laboratory technician needs to accurately pipette 195 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "195 µL is at the top of the P200 range, offering the highest volumetric precision. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_12_1",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_12_2",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_12_3",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_12_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_13",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "A laboratory technician needs to accurately pipette 220 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "220 µL exceeds P200 maximum capacity (200 µL); P1000 is required. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_13_1",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_13_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_13_3",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_13_4",
        "choice_text": "P10 (0.5–10 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_14",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A laboratory technician needs to accurately pipette 450 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "450 µL is ideal for a P1000 (100–1000 µL). The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_14_1",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_14_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_14_3",
        "choice_text": "P5000 (1–5 mL)",
        "is_correct": false
      },
      {
        "id": "c_pip_14_4",
        "choice_text": "P20 (2–20 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_15",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "A laboratory technician needs to accurately pipette 850 µL of a buffer solution. Which micropipette model should be selected for optimal accuracy?",
    "explanation": "850 µL is in the upper, most precise range of a P1000. The smallest nominal pipette that encompasses the target volume delivers the lowest volumetric coefficient of variation (CV).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_15_1",
        "choice_text": "P1000 (100–1000 µL)",
        "is_correct": true
      },
      {
        "id": "c_pip_15_2",
        "choice_text": "P200 (20–200 µL)",
        "is_correct": false
      },
      {
        "id": "c_pip_15_3",
        "choice_text": "P5000 (1–5 mL)",
        "is_correct": false
      },
      {
        "id": "c_pip_15_4",
        "choice_text": "P100 (10–100 µL)",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_16",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P20 micropipette. The display reads [ 1 | 5 | 2 ] with bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P20, top = tens, middle = ones, bottom red digit = tenths. [1|5|2] = 15.2 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_16_1",
        "choice_text": "15.2 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_16_2",
        "choice_text": "1.52 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_16_3",
        "choice_text": "152 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_16_4",
        "choice_text": "0.152 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_17",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P20 micropipette. The display reads [ 0 | 8 | 5 ] with bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P20, 0 tens, 8 ones, 5 tenths = 8.5 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_17_1",
        "choice_text": "8.5 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_17_2",
        "choice_text": "0.85 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_17_3",
        "choice_text": "85 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_17_4",
        "choice_text": "850 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_18",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P20 micropipette. The display reads [ 2 | 0 | 0 ] with bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P20, [2|0|0] represents 20.0 µL (maximum volume).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_18_1",
        "choice_text": "20.0 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_18_2",
        "choice_text": "2.00 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_18_3",
        "choice_text": "200 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_18_4",
        "choice_text": "0.20 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_19",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P20 micropipette. The display reads [ 0 | 2 | 0 ] with bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P20, 0 tens, 2 ones, 0 tenths = 2.0 µL (minimum calibrated volume).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_19_1",
        "choice_text": "2.0 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_19_2",
        "choice_text": "0.20 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_19_3",
        "choice_text": "20 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_19_4",
        "choice_text": "200 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_20",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P200 micropipette. The display reads [ 1 | 4 | 5 ] all black digits. What exact volume will be dispensed?",
    "explanation": "On a standard P200, top = hundreds, middle = tens, bottom = ones. [1|4|5] = 145 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_20_1",
        "choice_text": "145 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_20_2",
        "choice_text": "14.5 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_20_3",
        "choice_text": "1.45 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_20_4",
        "choice_text": "1450 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_21",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P200 micropipette. The display reads [ 0 | 7 | 5 ] all black digits. What exact volume will be dispensed?",
    "explanation": "On a standard P200, [0|7|5] represents 0 hundreds, 7 tens, 5 ones = 75 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_21_1",
        "choice_text": "75 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_21_2",
        "choice_text": "7.5 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_21_3",
        "choice_text": "750 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_21_4",
        "choice_text": "0.75 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_22",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P200 micropipette. The display reads [ 2 | 0 | 0 ] all black digits. What exact volume will be dispensed?",
    "explanation": "On a standard P200, [2|0|0] represents 200 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_22_1",
        "choice_text": "200 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_22_2",
        "choice_text": "20.0 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_22_3",
        "choice_text": "2.00 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_22_4",
        "choice_text": "2000 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_23",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P200 micropipette. The display reads [ 0 | 2 | 0 ] all black digits. What exact volume will be dispensed?",
    "explanation": "On a standard P200, [0|2|0] represents 20 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_23_1",
        "choice_text": "20 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_23_2",
        "choice_text": "2.0 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_23_3",
        "choice_text": "200 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_23_4",
        "choice_text": "0.20 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_24",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P1000 micropipette. The display reads [ 0 | 6 | 5 ] top digit red. What exact volume will be dispensed?",
    "explanation": "On a P1000, top red digit = thousands (mL), middle = hundreds, bottom = tens. [0|6|5] = 650 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_24_1",
        "choice_text": "650 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_24_2",
        "choice_text": "65 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_24_3",
        "choice_text": "6.5 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_24_4",
        "choice_text": "6500 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_25",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P1000 micropipette. The display reads [ 1 | 0 | 0 ] top digit red. What exact volume will be dispensed?",
    "explanation": "On a P1000, [1|0|0] represents 1 thousand, 0 hundreds, 0 tens = 1000 µL (1.0 mL).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_25_1",
        "choice_text": "1000 µL (1.0 mL)",
        "is_correct": true
      },
      {
        "id": "c_pip_25_2",
        "choice_text": "100 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_25_3",
        "choice_text": "10 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_25_4",
        "choice_text": "10000 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_26",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P1000 micropipette. The display reads [ 0 | 2 | 5 ] top digit red. What exact volume will be dispensed?",
    "explanation": "On a P1000, [0|2|5] represents 0 thousands, 2 hundreds, 5 tens = 250 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_26_1",
        "choice_text": "250 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_26_2",
        "choice_text": "25 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_26_3",
        "choice_text": "2.5 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_26_4",
        "choice_text": "2500 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_27",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P1000 micropipette. The display reads [ 0 | 1 | 0 ] top digit red. What exact volume will be dispensed?",
    "explanation": "On a P1000, [0|1|0] represents 0 thousands, 1 hundred, 0 tens = 100 µL (minimum capacity).",
    "active": true,
    "choices": [
      {
        "id": "c_pip_27_1",
        "choice_text": "100 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_27_2",
        "choice_text": "10 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_27_3",
        "choice_text": "1.0 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_27_4",
        "choice_text": "1000 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_28",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P10 micropipette. The display reads [ 0 | 7 | 5 ] bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P10, top = tens, middle = ones, bottom red digit = tenths. [0|7|5] = 7.5 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_28_1",
        "choice_text": "7.5 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_28_2",
        "choice_text": "0.75 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_28_3",
        "choice_text": "75 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_28_4",
        "choice_text": "750 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_29",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P10 micropipette. The display reads [ 1 | 0 | 0 ] bottom digit red. What exact volume will be dispensed?",
    "explanation": "On a P10, [1|0|0] represents 1 ten, 0 ones, 0 tenths = 10.0 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_29_1",
        "choice_text": "10.0 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_29_2",
        "choice_text": "1.0 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_29_3",
        "choice_text": "100 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_29_4",
        "choice_text": "0.10 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_30",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "A biotechnician inspects the volume display window of a P2 micropipette. The display reads [ 1 | 5 | 0 ] bottom two digits red. What exact volume will be dispensed?",
    "explanation": "On a P2, top black digit = ones, bottom red digits = tenths and hundredths. [1|5|0] = 1.50 µL.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_30_1",
        "choice_text": "1.50 µL",
        "is_correct": true
      },
      {
        "id": "c_pip_30_2",
        "choice_text": "15.0 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_30_3",
        "choice_text": "0.15 µL",
        "is_correct": false
      },
      {
        "id": "c_pip_30_4",
        "choice_text": "150 µL",
        "is_correct": false
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_31",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_31_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_31_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_31_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_31_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_32",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_32_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_32_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_32_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_32_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_33",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_33_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_33_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_33_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_33_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_34",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_34_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_34_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_34_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_34_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_35",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_35_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_35_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_35_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_35_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_36",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_36_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_36_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_36_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_36_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_37",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_37_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_37_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_37_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_37_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_38",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_38_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_38_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_38_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_38_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_39",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_39_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_39_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_39_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_39_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_40",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_40_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_40_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_40_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_40_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_41",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 41] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_41_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_41_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_41_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_41_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_42",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 42] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_42_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_42_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_42_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_42_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_43",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 43] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_43_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_43_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_43_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_43_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_44",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 44] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_44_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_44_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_44_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_44_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_45",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 45] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_45_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_45_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_45_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_45_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_46",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 46] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_46_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_46_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_46_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_46_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_47",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 47] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_47_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_47_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_47_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_47_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_48",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 48] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_48_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_48_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_48_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_48_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_49",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 49] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_49_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_49_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_49_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_49_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_50",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 50] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_50_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_50_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_50_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_50_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_51",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 51] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_51_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_51_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_51_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_51_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_52",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 52] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_52_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_52_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_52_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_52_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_53",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 53] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_53_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_53_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_53_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_53_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_54",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 54] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_54_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_54_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_54_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_54_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_55",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 55] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_55_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_55_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_55_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_55_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_56",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 56] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_56_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_56_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_56_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_56_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_57",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 57] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_57_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_57_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_57_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_57_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_58",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 58] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_58_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_58_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_58_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_58_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_59",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 59] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_59_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_59_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_59_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_59_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_60",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 60] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_60_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_60_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_60_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_60_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_61",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 61] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_61_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_61_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_61_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_61_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_62",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 62] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_62_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_62_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_62_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_62_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_63",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 63] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_63_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_63_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_63_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_63_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_64",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 64] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_64_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_64_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_64_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_64_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_65",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 65] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_65_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_65_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_65_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_65_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_66",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 66] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_66_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_66_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_66_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_66_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_67",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 67] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_67_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_67_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_67_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_67_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_68",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 68] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_68_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_68_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_68_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_68_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_69",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 69] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_69_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_69_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_69_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_69_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_70",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 70] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_70_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_70_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_70_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_70_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_71",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 71] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_71_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_71_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_71_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_71_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_72",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 72] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_72_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_72_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_72_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_72_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_73",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 73] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_73_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_73_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_73_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_73_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_74",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 74] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_74_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_74_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_74_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_74_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_75",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 75] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_75_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_75_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_75_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_75_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_76",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 76] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_76_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_76_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_76_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_76_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_77",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 77] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_77_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_77_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_77_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_77_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_78",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 78] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_78_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_78_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_78_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_78_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_79",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 79] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_79_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_79_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_79_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_79_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_80",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 80] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_80_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_80_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_80_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_80_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_81",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 81] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_81_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_81_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_81_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_81_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_82",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 82] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_82_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_82_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_82_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_82_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_83",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 83] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_83_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_83_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_83_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_83_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_84",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 84] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_84_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_84_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_84_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_84_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_85",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 85] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_85_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_85_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_85_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_85_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_86",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 86] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_86_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_86_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_86_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_86_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_87",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 87] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_87_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_87_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_87_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_87_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_88",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 88] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_88_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_88_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_88_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_88_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_89",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 89] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_89_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_89_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_89_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_89_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_90",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 90] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_90_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_90_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_90_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_90_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_91",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 91] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_91_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_91_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_91_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_91_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_92",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 92] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_92_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_92_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_92_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_92_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_93",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 93] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_93_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_93_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_93_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_93_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_94",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 94] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_94_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_94_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_94_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_94_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_95",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 95] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_95_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_95_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_95_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_95_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_96",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 96] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_96_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_96_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_96_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_96_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_97",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 97] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_97_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_97_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_97_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_97_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_98",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 98] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_98_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_98_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_98_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_98_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_99",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 99] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_99_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_99_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_99_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_99_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_100",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 100] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_100_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_100_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_100_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_100_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_101",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 101] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_101_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_101_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_101_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_101_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_102",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 102] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_102_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_102_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_102_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_102_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_103",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 103] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_103_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_103_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_103_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_103_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_104",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 104] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_104_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_104_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_104_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_104_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_105",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 105] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_105_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_105_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_105_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_105_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_106",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 106] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_106_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_106_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_106_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_106_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_107",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 107] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_107_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_107_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_107_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_107_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_108",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 108] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_108_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_108_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_108_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_108_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_109",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 109] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_109_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_109_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_109_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_109_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_110",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 110] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_110_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_110_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_110_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_110_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_111",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 111] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_111_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_111_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_111_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_111_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_112",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 112] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_112_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_112_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_112_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_112_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_113",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 113] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_113_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_113_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_113_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_113_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_114",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 114] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_114_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_114_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_114_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_114_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_115",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 115] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_115_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_115_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_115_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_115_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_116",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 116] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_116_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_116_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_116_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_116_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_117",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 117] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_117_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_117_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_117_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_117_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_118",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 118] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_118_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_118_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_118_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_118_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_119",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 119] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_119_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_119_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_119_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_119_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_120",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 120] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_120_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_120_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_120_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_120_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_121",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 121] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_121_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_121_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_121_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_121_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_122",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 122] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_122_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_122_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_122_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_122_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_123",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 123] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_123_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_123_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_123_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_123_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_124",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 124] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_124_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_124_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_124_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_124_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_125",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 125] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_125_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_125_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_125_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_125_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_126",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 126] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_126_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_126_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_126_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_126_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_127",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 127] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_127_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_127_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_127_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_127_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_128",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 128] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_128_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_128_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_128_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_128_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_129",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 129] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_129_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_129_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_129_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_129_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_130",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 130] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_130_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_130_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_130_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_130_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_131",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 131] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_131_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_131_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_131_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_131_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_132",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 132] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_132_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_132_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_132_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_132_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_133",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 133] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_133_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_133_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_133_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_133_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_134",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 134] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_134_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_134_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_134_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_134_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_135",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 135] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_135_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_135_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_135_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_135_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_136",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 136] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_136_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_136_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_136_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_136_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_137",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 137] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_137_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_137_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_137_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_137_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_138",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 138] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_138_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_138_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_138_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_138_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_139",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 139] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_139_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_139_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_139_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_139_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_140",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 140] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_140_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_140_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_140_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_140_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_141",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 141] In standard laboratory operations: When aspirating liquid using an air-displacement micropipette, what happens if the operator depresses the plunger to the SECOND stop before placing the tip in the liquid?",
    "explanation": "Depressing to the second stop before immersion displaces an oversized volume of air. Upon release, the piston pulls in excess liquid beyond the calibrated volume setting.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_141_1",
        "choice_text": "Excess volume will be drawn into the tip, causing substantial over-delivery of liquid.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_141_4",
        "choice_text": "The volume drawn will be exactly half the dialed volume.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_141_3",
        "choice_text": "The tip will experience vacuum lock and collapse.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_141_2",
        "choice_text": "The liquid will not be drawn into the tip at all.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_142",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 142] In standard laboratory operations: What is the primary function of the \"blowout\" (second stop) on a standard micropipette?",
    "explanation": "The second stop extends the piston beyond the nominal calibrated stroke to force out the final droplet clinging to the tip orifice.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_142_2",
        "choice_text": "To calibrate the internal digital counter mechanism.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_142_4",
        "choice_text": "To eject the disposable plastic tip into the biohazard bin.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_142_1",
        "choice_text": "To expel any residual droplet adhering to the inside wall of the disposable tip during dispensing.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_142_3",
        "choice_text": "To aspirate additional viscous fluid into the tip.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_143",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 143] In standard laboratory operations: Why should an air-displacement micropipette be held vertically (within 20 degrees of vertical) while aspirating sample liquid?",
    "explanation": "Holding the pipette at an angle alters the effective hydrostatic column height of the liquid, drawing in greater volume than calibrated.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_143_1",
        "choice_text": "Tilting the pipette increases hydrostatic pressure head, resulting in aspiration of an incorrect volume.",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_143_2",
        "choice_text": "Tilting causes the disposable tip to dislodge automatically from the shaft.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_143_4",
        "choice_text": "Tilting reverses the polarity of the liquid meniscus.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_143_3",
        "choice_text": "Tilting disables the internal digital volumeter gear mechanism.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_144",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 144] In standard laboratory operations: What is the recommended tip immersion depth when aspirating liquid with a P200 or P1000 micropipette?",
    "explanation": "Immersing the tip 2–4 mm prevents drawing air while avoiding liquid clinging to the outside of the tip barrel.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_144_3",
        "choice_text": "At least 15 to 20 mm below the surface",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_144_2",
        "choice_text": "Touching the very bottom of the tube",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_144_1",
        "choice_text": "2 to 4 mm below the liquid surface",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_144_4",
        "choice_text": "Submerging the entire shaft of the pipette",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_145",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 145] In standard laboratory operations: What laboratory technique involves aspirating and dispensing the sample volume 2 to 3 times before taking the actual aliquot?",
    "explanation": "Pre-wetting equilibrates the air space inside the tip with the vapor pressure and temperature of the liquid, increasing reproducibility.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_145_1",
        "choice_text": "Pre-wetting (conditioning) the tip",
        "is_correct": true,
        "display_order": 1
      },
      {
        "id": "c_pip_145_3",
        "choice_text": "Gravimetric normalization",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_145_4",
        "choice_text": "Aerosol scrubbing",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_145_2",
        "choice_text": "Reverse pipetting",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_146",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 146] In standard laboratory operations: Which technique is specifically recommended for pipetting viscous liquids such as 50% glycerol or restriction enzyme storage buffers?",
    "explanation": "In reverse pipetting, the plunger is depressed to the second stop before aspiration, and only to the first stop during dispensing, compensating for viscous film retention.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_146_2",
        "choice_text": "Rapid spring-release pipetting",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_146_1",
        "choice_text": "Reverse pipetting",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_146_3",
        "choice_text": "Multi-angle pipetting",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_146_4",
        "choice_text": "Centrifugal displacement",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_147",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 147] In standard laboratory operations: Why must an operator NEVER lay a loaded micropipette horizontally on the laboratory bench?",
    "explanation": "Laying a loaded pipette down allows liquid to run down into the barrel and piston assembly, damaging precision components and causing cross-contamination.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_147_2",
        "choice_text": "The digital display will lose its battery charge.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_147_3",
        "choice_text": "The plastic tip will dissolve upon contact with ambient air.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_147_1",
        "choice_text": "Liquid can flow back into the pipette shaft, corroding the internal piston and contaminating subsequent samples.",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_147_4",
        "choice_text": "The volume setting will automatically reset to zero.",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_148",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Moderate",
    "question_text": "[BACE Practice Item 148] In standard laboratory operations: What is the primary purpose of using aerosol-barrier (filter) pipette tips in molecular biology?",
    "explanation": "Filter tips contain a hydrophobic porous polyethylene barrier that blocks aerosols generated during pipetting, essential for PCR and RNA work.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_148_4",
        "choice_text": "To change the pH of the buffer during aspiration.",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_148_2",
        "choice_text": "To increase the maximum volume capacity of the tip by 50%.",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_148_3",
        "choice_text": "To chemically neutralize bacterial endotoxins as liquid passes through.",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_148_1",
        "choice_text": "To prevent liquid aerosols and volatile DNA/RNA from entering the barrel and causing sample cross-contamination.",
        "is_correct": true,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_149",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Easy",
    "question_text": "[BACE Practice Item 149] In standard laboratory operations: In gravimetric calibration of a P1000 micropipette, 1000 µL of deionized water at 20°C (density = 0.9982 g/mL) is weighed on an analytical balance. What target mass is expected?",
    "explanation": "Mass = Volume × Density = 1.000 mL × 0.9982 g/mL = 0.9982 g.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_149_4",
        "choice_text": "10.000 g",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_149_2",
        "choice_text": "1.9982 g",
        "is_correct": false,
        "display_order": 2
      },
      {
        "id": "c_pip_149_1",
        "choice_text": "0.9982 g",
        "is_correct": true,
        "display_order": 3
      },
      {
        "id": "c_pip_149_3",
        "choice_text": "0.0998 g",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  },
  {
    "id": "q_pip_150",
    "domain_id": "d1",
    "topic_id": "t1_1",
    "lesson_id": "les_pipette",
    "question_type": "multiple_choice",
    "difficulty": "Difficult",
    "question_text": "[BACE Practice Item 150] In standard laboratory operations: During pipette verification, ten 100 µL aliquots yield a mean of 99.2 µL. What is the percent inaccuracy (systematic error)?",
    "explanation": "Inaccuracy % = ((Measured Mean - Nominal) / Nominal) × 100 = ((99.2 - 100) / 100) × 100 = -0.8%.",
    "active": true,
    "choices": [
      {
        "id": "c_pip_150_3",
        "choice_text": "-0.08%",
        "is_correct": false,
        "display_order": 1
      },
      {
        "id": "c_pip_150_1",
        "choice_text": "-0.8%",
        "is_correct": true,
        "display_order": 2
      },
      {
        "id": "c_pip_150_4",
        "choice_text": "+1.6%",
        "is_correct": false,
        "display_order": 3
      },
      {
        "id": "c_pip_150_2",
        "choice_text": "+8.0%",
        "is_correct": false,
        "display_order": 4
      }
    ],
    "created_at": "2026-09-01T10:00:00Z"
  }
];
