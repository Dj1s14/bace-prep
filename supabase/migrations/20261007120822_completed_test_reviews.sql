alter table public.quiz_attempts add column if not exists review_questions jsonb;
alter table public.quiz_attempts add constraint quiz_attempts_review_questions_array check (review_questions is null or jsonb_typeof(review_questions) = 'array');
comment on column public.quiz_attempts.review_questions is 'Submission-time question, answer-key, explanation, and student answer snapshots for completed-test review. Existing attempt RLS applies.';
notify pgrst, 'reload schema';
