import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAccountForm, facultyDirectory } from '../src/lib/accountProvisioning.ts';

function form(updates: Record<string, string> = {}) {
  const data = new FormData();
  Object.entries({ first_name: 'New', last_name: 'Teacher', email: 'teacher@example.edu', password: 'StrongPassword', confirm_password: 'StrongPassword', ...updates }).forEach(([key, value]) => data.set(key, value));
  return data;
}
test('account form explains missing information and password requirements before submitting', () => {
  assert.match(validateAccountForm(form({ first_name: ' ' })), /first and last name/);
  assert.match(validateAccountForm(form({ email: 'teacher' })), /valid email/);
  assert.match(validateAccountForm(form({ password: '', confirm_password: '' })), /initial password/);
  assert.match(validateAccountForm(form({ password: 'short', confirm_password: 'short' })), /8 and 128/);
  assert.match(validateAccountForm(form({ confirm_password: 'different' })), /do not match/);
  assert.equal(validateAccountForm(form()), '');
});
test('admin faculty directory includes teachers and admins without creating a duplicate account', () => {
  const profiles: any[] = [
    { id: 'admin', role: 'admin' }, { id: 'student', role: 'student' },
    { id: 'existing', role: 'teacher', first_name: 'Existing', last_name: 'Teacher', email: 'existing@example.edu' },
    { id: 'new', role: 'teacher', first_name: 'New', last_name: 'Teacher', email: 'new@example.edu', department: 'Science' },
  ];
  const directory = facultyDirectory(profiles);
  assert.deepEqual(directory.map(t => t.id), ['admin', 'existing', 'new']);
  assert.equal(directory[2].department, 'Science');
  assert.equal(directory[1].school_name, 'Biotechnology & Life Sciences Academy');
});
