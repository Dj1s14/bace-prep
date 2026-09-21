import { AdaptiveMasteryLesson } from '../../types/mastery';

export const DOMAIN_6_MASTERY_LESSONS: AdaptiveMasteryLesson[] = [
  {
    lesson_metadata: {
      lesson_id: 'les_cgmp_glp',
      domain_id: 'd6',
      domain: 'Regulation & Quality',
      sublesson: 'cGMP, Good Documentation Practices (GDP) & Quality Systems',
      total_competencies: 3,
      estimated_completion_time_minutes: 18,
      difficulty_tier: 'Practical Exam Scenario',
    },
    competencies: [
      {
        competency_id: 'COMP-D6-01',
        statement: 'Apply Good Documentation Practices (GDP) rules for recording data, date formatting, and correcting errors on laboratory and batch records.',
        primary_item: {
          item_id: 'COMP-D6-01-A',
          question_text: 'A technician accidentally writes "14.2 g" instead of "12.4 g" in a cGMP Batch Production Record (BPR). What is the only acceptable method to correct this error under GDP regulations?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Apply correction fluid (white-out) and neatly write "12.4 g" on top' },
            { id: 'B', text: 'Draw a single clean strike-through line through "14.2 g", write "12.4 g" adjacent to it, record the reason for change, and initial and date the entry' },
            { id: 'C', text: 'Scribble out the incorrect number with heavy ink until illegible and initial next to it' },
            { id: 'D', text: 'Erase the pencil entry and re-write with permanent black ink' }
          ],
          correct_answer_id: 'B',
          explanation: 'Under 21 CFR regulations and Good Documentation Practices (GDP), original entries must remain completely legible to ensure auditability. The only compliant method is: 1) Single strike-through line; 2) Correct data written nearby; 3) Reason code or explanation; 4) Initials of the person making the change; 5) Current date.',
          remediation_hints: {
            'A': 'Diagnostic Error: White-out and correction tape are strictly prohibited in regulated laboratories because they obscure underlying entries and suggest data falsification.',
            'C': 'Diagnostic Error: Scribbling out entries obscures the original record, violating the core auditability mandate of GDP.',
            'D': 'Diagnostic Error: All cGMP records must be made directly in permanent indelible ink; pencil is strictly prohibited.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D6-01-B',
          question_text: 'Which of the following practices constitutes a direct violation of Good Documentation Practices (GDP) in an FDA-regulated biomanufacturing facility?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Signing a colleague\'s name on a buffer preparation log sheet because the colleague stepped away on break' },
            { id: 'B', text: 'Documenting tasks immediately at the time they are performed' },
            { id: 'C', text: 'Using indelible blue or black ballpoint ink' },
            { id: 'D', text: 'Drawing a diagonal line across an unused blank section of a page, signing, and dating it' }
          ],
          correct_answer_id: 'A',
          explanation: 'Signing or initialing for someone else (pre-dating or proxy signing) is a serious federal regulatory violation (data falsification under 21 CFR Part 11). Only the operator who personally executed or witnessed the task may sign.',
          remediation_hints: {
            'B': 'Diagnostic Error: Contemporaneous recording (documenting at the exact time of execution) is a core requirement of GDP.',
            'C': 'Diagnostic Error: Permanent blue or black ink is required; red ink or pencils are prohibited.',
            'D': 'Diagnostic Error: "Z-lining" or "N-lining" blank spaces prevents unauthorized retrospective data entry and is standard compliant procedure.'
          }
        }
      },
      {
        competency_id: 'COMP-D6-02',
        statement: 'Distinguish between Quality Assurance (QA) and Quality Control (QC) responsibilities in a biopharmaceutical organization.',
        primary_item: {
          item_id: 'COMP-D6-02-A',
          question_text: 'Which duty falls specifically within the operational scope of Quality Control (QC) rather than Quality Assurance (QA)?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Performing HPLC purity testing and endotoxin testing on raw material aliquots and finished product vials' },
            { id: 'B', text: 'Reviewing and releasing final batch production records for commercial distribution' },
            { id: 'C', text: 'Managing the facility-wide Corrective and Preventive Action (CAPA) tracking system' },
            { id: 'D', text: 'Authorizing and approving Standard Operating Procedures (SOPs) across departments' }
          ],
          correct_answer_id: 'A',
          explanation: 'Quality Control (QC) is testing- and product-oriented: QC analysts perform analytical assays (HPLC, gel electrophoresis, bioassays, sterility tests) to verify specifications. Quality Assurance (QA) is process-oriented: QA writes/approves SOPs, manages CAPAs, audits facilities, and authorizes final batch release.',
          remediation_hints: {
            'B': 'Diagnostic Error: Final batch release and disposition is an exclusive QA authority.',
            'C': 'Diagnostic Error: CAPA system administration is a QA governance role.',
            'D': 'Diagnostic Error: QA provides independent regulatory approval for all corporate SOPs.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D6-02-B',
          question_text: 'A biomanufacturing facility experiences an unplanned temperature excursion in a -80°C viral seed bank freezer. Which group is responsible for leading the formal root cause investigation and establishing the CAPA?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Quality Assurance (QA) with relevant engineering/operations SMEs' },
            { id: 'B', text: 'The facility custodial staff' },
            { id: 'C', text: 'The sales and marketing department' },
            { id: 'D', text: 'External news media reporters' }
          ],
          correct_answer_id: 'A',
          explanation: 'Deviations and equipment excursions must be formally documented under QA oversight, triggering an investigation into root causes, product impact assessment, and corrective/preventive actions (CAPA).',
          remediation_hints: {
            'B': 'Diagnostic Error: Custodial staff do not conduct cGMP deviation and risk assessments.',
            'C': 'Diagnostic Error: Commercial departments do not oversee cGMP quality deviations.',
            'D': 'Diagnostic Error: Quality systems are managed internally according to regulatory compliance frameworks.'
          }
        }
      },
      {
        competency_id: 'COMP-D6-03',
        statement: 'Identify standard cleanroom air classification criteria and environmental monitoring requirements under cGMP.',
        primary_item: {
          item_id: 'COMP-D6-03-A',
          question_text: 'In sterile biopharmaceutical manufacturing, what ISO cleanroom classification is required for the critical zone where open sterile product vials are filled and stoppered?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'ISO Class 5 (Grade A / Class 100: ≤3,520 particles ≥0.5 µm per cubic meter)' },
            { id: 'B', text: 'ISO Class 8 (Grade D / Class 100,000)' },
            { id: 'C', text: 'Uncontrolled warehouse environment' },
            { id: 'D', text: 'ISO Class 9 (ambient room air)' }
          ],
          correct_answer_id: 'A',
          explanation: 'Open sterile processing and filling of parenteral therapeutics must be conducted in an ISO Class 5 (Grade A) environment (maximum 3,520 particles ≥0.5 µm/m³), typically under unidirectional laminar HEPA airflow.',
          remediation_hints: {
            'B': 'Diagnostic Error: ISO Class 8 is for component washing, gowning airlocks, or early upstream fermentation; it is not clean enough for open sterile filling.',
            'C': 'Diagnostic Error: Filling injectables in uncontrolled air causes microbial contamination.',
            'D': 'Diagnostic Error: Ambient room air has millions of particulates per cubic meter.'
          }
        },
        paired_variant: {
          item_id: 'COMP-D6-03-B',
          question_text: 'Why do cleanroom operators wear sterile non-shedding bunny suits, hoods, masks, and double gloves in an ISO Class 5 filling line?',
          question_type: 'multiple_choice',
          options: [
            { id: 'A', text: 'Human operators shed millions of skin flakes and microbes per minute, making personnel the primary source of cleanroom contamination' },
            { id: 'B', text: 'To protect the operators from visible light radiation from the ceiling' },
            { id: 'C', text: 'To keep operators warm in refrigerated rooms' },
            { id: 'D', text: 'To prevent the transfer of electrostatic charge to cardboard boxes' }
          ],
          correct_answer_id: 'A',
          explanation: 'Humans shed approximately 10^7 skin flakes and thousands of viable micro-organisms per hour. Cleanroom garments act as a biological filter to prevent operator-derived particulate and microbial shedding from contaminating the product.',
          remediation_hints: {
            'B': 'Diagnostic Error: Cleanroom lighting is standard fluorescent or LED; garments are for particulate and bioburden containment.',
            'C': 'Diagnostic Error: Gowning is an environmental control, not temperature regulation.',
            'D': 'Diagnostic Error: Cardboard and paper are banned from ISO 5 zones because they shed cellulose fibers.'
          }
        }
      }
    ]
  }
];
