begin;
-- Rollback-only fixtures: never create or change actual student accounts.
insert into public.profiles(id,email,first_name,last_name,role) values
('11111111-0000-4000-8000-111111111111','review-owner-fixture@example.com','Review','Owner','student'),
('22222222-0000-4000-8000-222222222222','review-other-fixture@example.com','Review','Other','student');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"11111111-0000-4000-8000-111111111111","role":"authenticated"}',true);
insert into public.quiz_attempts(id,student_id,quiz_type,score,total_questions,percentage,time_spent_seconds,completed_at,review_questions)
values ('review-test-fixture','11111111-0000-4000-8000-111111111111','mock_quick',0,1,0,60,now(),'[{"question":{"id":"fixture","question_text":"Original wording","explanation":"Original explanation","choices":[]},"selected_choice_id":null}]'::jsonb);
do $$ begin
 if not exists(select 1 from public.quiz_attempts where id='review-test-fixture' and review_questions->0->'question'->>'question_text'='Original wording') then raise exception 'Owner cannot reload saved question review'; end if;
end $$;
select set_config('request.jwt.claims','{"sub":"22222222-0000-4000-8000-222222222222","role":"authenticated"}',true);
do $$ begin
 if exists(select 1 from public.quiz_attempts where id='review-test-fixture') then raise exception 'Other student can read completed test'; end if;
 update public.quiz_attempts set review_questions='[]'::jsonb where id='review-test-fixture';
 if found then raise exception 'Other student can change completed test'; end if;
 begin
  insert into public.quiz_attempts(id,student_id,quiz_type,score,total_questions,percentage) values('review-cross-owner-fixture','11111111-0000-4000-8000-111111111111','mock_quick',0,1,0);
  raise exception 'Other student can insert under owner' using errcode='P0002';
 exception when insufficient_privilege then null; end;
end $$;
set local role anon;
do $$ begin
 begin
  if exists(select 1 from public.quiz_attempts where id='review-test-fixture') then raise exception 'Signed-out client can read review'; end if;
 exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
