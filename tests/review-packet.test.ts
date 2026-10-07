import test from 'node:test';
import assert from 'node:assert/strict';
import { REVIEW_LESSONS, REVIEW_QUESTIONS, REVIEW_TOPICS } from '../src/data/reviewPacketLessons';
import { ALL_LESSONS } from '../src/data/allLessons';
import { ALL_QUESTIONS } from '../src/data/questions';
import { INITIAL_LESSONS, INITIAL_TOPICS } from '../src/data/initialData';

test('review packet curriculum is reachable with consistent topic and practice links', () => {
  assert.equal(REVIEW_LESSONS.length, 12);
  assert.equal(REVIEW_QUESTIONS.length, 24);
  assert.equal(new Set(REVIEW_QUESTIONS.map(q => q.choices.findIndex(c => c.is_correct))).size, 4);
  for (const lesson of REVIEW_LESSONS) {
    assert.equal(ALL_LESSONS.filter(l => l.id === lesson.id).length, 1);
    assert.ok(INITIAL_LESSONS.some(l => l.id === lesson.id));
    assert.ok(INITIAL_TOPICS.some(t => t.id === lesson.topic_id && t.domain_id === lesson.domain_id));
    assert.ok(REVIEW_TOPICS.some(t => t.id === lesson.topic_id));
    assert.ok(lesson.sections.length >= 4);
    assert.ok((lesson.worked_examples?.length || 0) >= 2);
    const questions = ALL_QUESTIONS.filter(q => q.lesson_id === lesson.id && q.active);
    assert.equal(questions.length, 2);
    for (const question of questions) {
      assert.equal(question.topic_id, lesson.topic_id);
      assert.equal(question.domain_id, lesson.domain_id);
      assert.equal(question.choices.length, 4);
      assert.equal(question.choices.filter(c => c.is_correct).length, 1);
      assert.ok(question.choices.every(c => c.explanation));
    }
  }
  assert.equal(new Set(ALL_LESSONS.map(l => l.id)).size, ALL_LESSONS.length);
});

test('existing lesson IDs retain their curriculum and gain reviewed packet applications', () => {
  const originalIds = ['les_controls_variables','les_microscopy','les_math_molarity','les_central_dogma','les_chromatography','les_protein_methods','les_immunoassay_validation','les_cell_physiology','les_sops','les_sds_ghs','les_standard_curves','les_culture_counting','les_ph_spec','les_lab_documentation'];
  for (const id of originalIds) {
    const lesson = ALL_LESSONS.find(l => l.id === id);
    assert.ok(lesson);
    assert.equal(lesson.sections.filter(s => s.title.startsWith('Review packet application:')).length, 1);
  }
});
