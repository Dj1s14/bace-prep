import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_LESSONS, INITIAL_TOPICS, INITIAL_QUESTIONS } from '../src/data/initialData';
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
