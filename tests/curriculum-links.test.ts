import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_LESSONS, INITIAL_TOPICS, INITIAL_QUESTIONS } from '../src/data/initialData';
import { REVIEW_QUESTIONS } from '../src/data/reviewPacketLessons';
import { EXPANDED_LESSONS, EXPANDED_QUESTIONS } from '../src/data/expandedLearning';

test('new curriculum is reachable through domain, topic, lesson, and assessment registries', () => {
  const ids = new Set(INITIAL_LESSONS.map(l=>l.id));
  assert.equal(ids.size, INITIAL_LESSONS.length, 'duplicate lesson IDs break navigation');
  assert.equal(new Set(EXPANDED_LESSONS.map(l=>l.domain_id)).size, 8);
  for(const lesson of EXPANDED_LESSONS) {
    assert.ok(INITIAL_LESSONS.some(l=>l.id===lesson.id));
    assert.ok(INITIAL_TOPICS.some(t=>t.id===lesson.topic_id && t.domain_id===lesson.domain_id));
    const questions=INITIAL_QUESTIONS.filter(q=>q.lesson_id===lesson.id);
    assert.ok(questions.length>=2, `${lesson.id} has no usable lesson assessment`);
    assert.ok(lesson.lab_activities?.length);
    for(const question of questions) {
      assert.equal(question.domain_id,lesson.domain_id);
      assert.equal(question.topic_id,lesson.topic_id);
      assert.equal(question.choices.filter(c=>c.is_correct).length,1);
      assert.equal(new Set(question.choices.map(c=>c.choice_text)).size,4);
    }
  }
  assert.equal(new Set(EXPANDED_QUESTIONS.map(q=>q.id)).size,EXPANDED_QUESTIONS.length);
});

test('active question bank has unique prompts, valid lesson links and consistent difficulty labels', () => {
 const active=INITIAL_QUESTIONS.filter(q=>q.active!==false);
 const prompts=active.map(q=>q.question_text.trim().replace(/\s+/g,' ').toLowerCase());
 assert.equal(new Set(prompts).size,prompts.length);
 for(const q of INITIAL_QUESTIONS) {
  if(q.lesson_id) {
   const lesson=INITIAL_LESSONS.find(l=>l.id===q.lesson_id);
   assert.ok(lesson,`missing lesson ${q.lesson_id}`);
   assert.equal(q.domain_id,lesson.domain_id);
   assert.equal(q.topic_id,lesson.topic_id);
  }
  assert.ok(['Easy','Medium','Hard'].includes(q.difficulty));
 }
 // Archived repeated IDs remain available to an already-saved exam.
 assert.equal(INITIAL_QUESTIONS.length,972 + REVIEW_QUESTIONS.length);
 for(const d of ['d1','d2','d3','d4','d5','d6','d7','d8']) assert.ok(active.filter(q=>q.domain_id===d).length>=10);
});
