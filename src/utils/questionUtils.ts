/**
 * Utility to strip any item numbering, brackets, or item prefixes from question text.
 * Ensures students never see "[Item 132]", "Item #12", "Item 5:", etc.
 */
export function cleanQuestionText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/^\[item\s*#?\s*\d+\]\s*[:-]?\s*/i, '')
    .replace(/^item\s*#?\s*\d+\s*[:-]\s*/i, '')
    .replace(/^\(item\s*#?\s*\d+\)\s*[:-]?\s*/i, '')
    .trim();
}
