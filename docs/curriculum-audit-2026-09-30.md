# BACE curriculum audit and expansion — September 30, 2026

## Scope and evidence

Compared the app lesson registry with Biotility's **BACE Exam Categories and Standards**, last updated September 21, 2026:
https://19942150.hs-sites.com/knowledge/bace-exam-categories
Preparation entry point: https://biotility.research.ufl.edu/biotech-industry-credentials/bace/preparation-prepare-with-confidence/

This is a qualitative coverage review, not Biotility approval or a claim that every standard is mastered. The detailed DOCX content guide was linked but not parsed during this review. No actual exam questions were used. App domains d1–d8 are grouped differently from the official numbered categories 10–17; use subject matter, not matching numbers, when comparing coverage.

## Findings and changes

The original registry had 35 lessons. Many theory sections were short summaries (several lessons had fewer than 100 words of theory), despite other study tools and bench modules. Several current standards had no dedicated lesson. The registry now has **51 lessons**, including **16 new lessons**, **32 original assessment questions**, **32 application scenarios**, and **32 new worked examples**. Eight existing core lessons each gained two explanation sections and one worked example. New lessons include vocabulary, four theory sections, examples, scenarios, questions, and source links.

| App domain | Existing foundation | Added material addressing thin or missing coverage |
|---|---|---|
| d1 Biotechnology Skills | Pipetting, solutions, dilution, culture, microscopy, gels | Balance measurement, reagent identity, traceable dates/time; cell counts, viability, CFU calculations |
| d2 Technical Skills | PCR, extraction, restriction, transformation, protein methods | qPCR and diagnostic controls; ELISA and validation; chromatography/FTIR; flow cytometry, sorting and automation |
| d3 Safety | SDS, PPE, biosafety, spill/waste | Near misses, compatibility-based storage, hazardous energy and authorized response |
| d4 Mathematics | Molarity, stock dilution, percent solutions, units | Significant figures, pH logarithms, mean, sample SD, CV and measurement interpretation |
| d5 Molecular Biology | DNA/RNA, central dogma, enzymes | Cell physiology and expression hosts; monoclonal antibodies, mRNA and CAR-T principles |
| d6 Quality | GMP, GDP, QA/QC, SOPs | Upstream/downstream processing, environmental monitoring, CAPA; regulatory evidence, audits and sensitive-data protection |
| d7 Equipment | Autoclaves, pH meters, centrifuges | Glassware fitness, baths/incubators/blocks, verification; BSC/fume hood/clean bench distinctions |
| d8 Design/Data | Variables, controls, curves, integrity | Testable questions, independent units, replication, communication and RCR; PCA and multivariable error review |

## Corrected misleading guidance

- Distinguished dilution fraction from reciprocal dilution factor.
- Removed a universal pipette variance multiplier.
- Removed a universal R² cutoff and claims that R² diagnoses the cause of a failed curve.
- Removed guaranteed exam-question claims and a universal autoclave minimum cycle.
- Replaced fixed BSC disinfectant/contact-time advice with approved-agent and manufacturer/SOP requirements.
- Qualified primer-temperature estimates and biosafety assignments.
- Replaced claims that passing controls prove absence of contamination with control-purpose and acceptance guidance.

## Verification

TypeScript check, production build, and curriculum-link integration test check that new content is reachable through topics, lesson IDs, and assessment registries. The test also checks domain/topic alignment, unique new question IDs, and one correct answer per new question. Existing save/resume tests remain in the suite. These checks establish application integration, not independent scientific peer review.

## Remaining depth opportunities

Several older overview lessons remain brief. More authored visual diagrams, worked chromatogram/flow-plot interpretation, larger dedicated question banks, and instructor review of every existing question would improve depth further. New lessons have two assessment items each; this is introductory coverage, not enough by itself to establish mastery. The app's separate adaptive mastery modules have not been extended for every new topic. Practice questions and scenarios reuse the same cases, so they are reinforcement rather than independent assessments. Bench actions still require approved local SOPs, equipment instructions, authorized organisms, and supervision.
