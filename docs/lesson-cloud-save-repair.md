# Lesson cloud-save repair — November 17, 2026

**Do not merge without the tests below.** This branch is a non-destructive repair, not an approval to put student data into production.

## Existing data protection
- Do not clear browser site data, reset demo/production storage, or use the purge function on student devices.
- Have each student use the **same computer and browser profile** where they completed work.
- Open the app as the student and use **Back up my lesson work**. Store the JSON backup only in approved school storage. It contains student identifying information; do not commit it to GitHub or share publicly.
- The existing browser storage keys are maintained and the two legacy and environment-scoped lesson formats are merged rather than replaced.
- The new sync reads remote records first and inserts only missing records. A failed save must not delete local records.

## How this branch works
- Login attempts a Supabase Auth email/password session before falling back to the old browser sign-in for recovery access.
- The lesson cloud-save banner displays **Not verified**, **Saving**, or **Verified**. Legacy local login alone must NEVER show Verified.
- A student may sync only when Supabase returns an authenticated matching-email student profile. RLS remains the final access check.
- Teachers/admins fetch only the student profiles and grades authorized to their authenticated account by RLS.
- Completion records and grades retain stable IDs, and retry does not intentionally duplicate them.
- No new DB migration or production database write has been performed for this branch.

## Required tests on an isolated preview URL
1. Run `npm ci`, `npm run lint`, and `npm run build`. Fix any errors before proceeding.
2. Use a teacher-controlled test student with a verified Supabase Auth identity and a matching `public.profiles` row.
3. Submit a test lesson grade; ensure the banner becomes **Verified** only after the matching row appears in `public.lesson_grades`, plus a completed row in `public.lesson_progress`.
4. Reload and sign in on another browser. Grade and lesson completion must be recovered from Supabase.
5. Sign in as an instructor who is assigned to the test student's class and confirm the grade appears in gradebook. Confirm an unrelated teacher cannot see it.
6. Repeatedly press Retry and refresh; grades/completions should not duplicate.
7. Turn off the network, submit a test grade, verify the banner reports **Not verified** and the local data survives refresh; reconnect and Retry.
8. Sign in using only a legacy browser-local credential (no Supabase Auth session). Confirm the UI NEVER reports Verified and no cloud write occurs.
9. Verify backups contain only that student's lesson data, not any access code, token, password, or other student's records.
10. Check progress restoration and the correct student mapping after navigating between Demo and Production modes.
11. Verify permission policies under `public.lesson_grades` and `public.lesson_progress` with RLS enabled and mapped `auth.uid()`.

## Existing security debt — release blocker
This patch does NOT remove the pre-existing browser-only authentication, locally saved plain-text passwords, or static faculty/admin access codes. These must be replaced with proper Supabase authentication and server-trusted role authorization before general production rollout. Gradebook writes performed through the old local-only flow are not authoritative cloud saves.
