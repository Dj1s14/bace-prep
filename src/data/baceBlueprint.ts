/**
 * BACE current-format preparation blueprint.
 *
 * Biotility's current credential page lists a 124-question, four-hour CBT.
 * Public category percentages are distributions of exam POINTS, not guaranteed
 * question counts. We use those percentages to build balanced practice/mock
 * simulations without claiming an unpublished per-category question split.
 *
 * AY25-26 published specification (revised 2025-08-20) listed 116 questions.
 */
export const BACE_CURRENT_TOTAL_QUESTIONS = 124;
export const BACE_CURRENT_TIME_MINUTES = 240;
export const BACE_PASSING_PERCENT = 80;

export const BACE_POINT_WEIGHTS: Record<string, number> = {
  d1: 23, // Biotechnology Skills
  d2: 19, // Technical Skills & Applications
  d3: 12, // Safety & Workplace Culture
  d4: 12, // Applied Mathematics
  d5: 10, // Biochemistry & Molecular Biology
  d6: 9,  // Regulation & Quality
  d7: 8,  // Standard Equipment
  d8: 7,  // Experimental Design & Data Analysis
};

/**
 * Converts point weights to integer question targets using largest remainder.
 * This is an app simulation distribution, not an assertion of Biotility's
 * unpublished current per-category question counts.
 */
export function allocateQuestionsByPointWeight(totalQuestions: number) {
  const entries = Object.entries(BACE_POINT_WEIGHTS).map(([domainId, weight]) => {
    const raw = (totalQuestions * weight) / 100;
    return {
      domainId,
      weight,
      raw,
      count: Math.floor(raw),
      remainder: raw - Math.floor(raw),
    };
  });

  let remaining = totalQuestions - entries.reduce((sum, item) => sum + item.count, 0);
  entries
    .slice()
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((item) => {
      if (remaining <= 0) return;
      const target = entries.find((entry) => entry.domainId === item.domainId)!;
      target.count += 1;
      remaining -= 1;
    });

  return Object.fromEntries(entries.map((entry) => [entry.domainId, entry.count]));
}

export const BACE_CURRENT_SIMULATION_COUNTS = allocateQuestionsByPointWeight(
  BACE_CURRENT_TOTAL_QUESTIONS
);
