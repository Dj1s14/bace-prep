# Student completed-test review

Students open **Progress → Completed Tests → Review Test**. Results also show question review immediately after submission. All questions or only missed/unanswered questions can be reviewed with the selected answer, original answer key, overall explanation, and per-choice explanations.

Mock exams, practice drills, and lesson checks capture submission-time question snapshots in `quiz_attempts.review_questions`. This includes stable choice IDs and null for unanswered questions. Existing curriculum edits cannot rewrite stored reviews. Lesson checks stay on the lesson when saved. Existing scores without snapshots remain visible through View Score; the UI explicitly says detailed answers were not saved, rather than reconstructing a potentially different question set.

The existing attempt RLS remains in force. No new public data grants or role changes are introduced. Student history is additionally filtered to the active student in the provider and history component. Generic faculty preview stores its own test history in memory and does not write student results to Supabase. Cloud writes retain the existing account-bound retry queue and the snapshot in the same attempt payload.

Validation: TypeScript; regression suite; production Pages build; review rendering for correct/incorrect/unanswered and legacy states; snapshot immutability; payload retention; own-account filtering. `tests/completed-test-reviews.sql` performs rollback-only database checks for own insert/reload, other-student read/update/insert denial, and signed-out access denial. No test accounts or records remain afterward.
