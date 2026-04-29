import test from 'node:test';
import assert from 'node:assert/strict';

import {
  defaultState,
  normalizeState,
  modeForDate,
  weatherForMode,
  fishActivityForMode,
  summarizeWatch,
  spanishWordForDate,
} from '../assets/dinosaur-state.js';

test('normalizeState keeps safe defaults for note and watch state', () => {
  const normalized = normalizeState({
    notes: { kira: '  Practice at 7  ' },
    rentalSettings: { sites: ['nope'], sendMode: 'ignored' },
  });

  assert.equal(normalized.notes.kira, 'Practice at 7');
  assert.deepEqual(normalized.rentalSettings.sites, ['airbnb', 'vrbo']);
  assert.equal(normalized.rentalSettings.sendMode, defaultState().rentalSettings.sendMode);
});

test('modeForDate stays deterministic and returns matching weather payload', () => {
  const mode = modeForDate(new Date('2026-04-28T18:00:00Z'));
  const weather = weatherForMode(mode);

  assert.ok(['sun', 'cold', 'rain'].includes(mode));
  assert.equal(typeof weather.temperatureF, 'number');
  assert.match(weather.image, /family-(sun|cold|rain)\.jpg/);
});

test('watch summaries and fish activity remain human-readable', () => {
  const summary = summarizeWatch(defaultState().buySettings, 'buy');
  const fish = fishActivityForMode('sun');
  const spanish = spanishWordForDate(defaultState(), new Date('2026-04-28T18:00:00Z'));

  assert.match(summary, /Palm Coast/);
  assert.equal(fish.length, 3);
  assert.equal(typeof fish[0].title, 'string');
  assert.equal(typeof spanish.spanish, 'string');
});
