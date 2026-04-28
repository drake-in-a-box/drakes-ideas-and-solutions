import test from 'node:test';
import assert from 'node:assert/strict';

import {
  defaultState,
  normalizeState,
  buildDinnerPlan,
  summarizePropertyWatch,
  checklistProgress,
  focusLabel,
} from '../assets/dinosaur-state.js';

test('normalizeState falls back to safe defaults', () => {
  const normalized = normalizeState({ propertyMode: 'weird', focusMode: 'bad', propertyBudget: 'abc' });
  const defaults = defaultState();

  assert.equal(normalized.propertyMode, defaults.propertyMode);
  assert.equal(normalized.focusMode, defaults.focusMode);
  assert.equal(normalized.propertyBudget, defaults.propertyBudget);
  assert.equal(normalized.checklist.length, defaults.checklist.length);
});

test('buildDinnerPlan uses custom saved dinner when present', () => {
  const plan = buildDinnerPlan(
    normalizeState({ dinnerTitle: 'Pizza night', dinnerSides: 'Salad, Fruit' }),
    new Date('2026-04-28T18:00:00'),
  );

  assert.equal(plan.title, 'Pizza night');
  assert.equal(plan.custom, true);
  assert.deepEqual(plan.items, ['Salad', 'Fruit']);
});

test('summaries stay human-readable', () => {
  const summary = summarizePropertyWatch(
    normalizeState({
      propertyArea: 'Jacksonville Beach',
      propertyBudget: '900',
      propertyMode: 'new-only',
    }),
  );

  assert.match(summary, /Jacksonville Beach/);
  assert.match(summary, /\$900/);
  assert.match(summary, /only new matches/);
  assert.equal(checklistProgress(defaultState()), '0/4 complete');
  assert.equal(focusLabel('reset'), 'Reset the house');
});
