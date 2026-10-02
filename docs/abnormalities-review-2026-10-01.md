# App abnormalities review

Confirmed and corrected in this pass:

- 395 repeated prompt entries among 972 question records. Archive repeated entries from new practice/assessment selection while retaining IDs for saved exams and history; 577 unique active prompts remain.
- 21 questions referenced five nonexistent lesson IDs. Map them to existing relevant lessons and align their topic/domain metadata. Also align the other linked-question metadata discrepancies.
- Difficulty values mixed Moderate/Difficult with the UI's Easy/Medium/Hard filters. Normalize labels, including returning users' cached banks.
- Lessons without dedicated mastery content selected the first unrelated module, and navigating between lessons retained old selections. Show an explicit choice and reset the selection; remove an unsupported "Verified" label.
- Lesson bank fallback combined topic matches with the entire domain even when topic questions existed. Prefer exact lesson, then topic, then domain; exclude archived questions.
- Difficulty/search/page state carried between lessons. Reset them on lesson changes.
- Lesson action buttons scrolled the browser window even though the app uses a main scrolling panel. Scroll the panel directly.
- Mock exams could fabricate duplicate question IDs if the bank was insufficient, making resume invalid. Remove that fallback; current unique pool supports all available exam sizes.
- Student signup placeholder promised a four-character password although the handler requires six. Match the displayed requirement.

Checks: TypeScript, production build, six automated tests including whole-bank links/difficulty/unique prompts. All question IDs remain retained. Current active domain counts: d1 280; d2 67; d3 43; d4 57; d5 34; d6 39; d7 33; d8 24.

Limits: This was a source/data/integration review. It does not establish that every scientific answer has been independently peer reviewed, every authenticated browser journey has passed, or every visual layout is correct. Previous preview-browser access was blocked. Password recovery email delivery remains untested. The production bundle still has a size warning and would benefit from further splitting.
