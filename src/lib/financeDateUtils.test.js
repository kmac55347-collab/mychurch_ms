import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRecentMonthSeries, isDateInCurrentMonth, isDateInMonth } from './financeDateUtils.js';

test('buildRecentMonthSeries creates a rolling 6-month window based on today', () => {
  const now = new Date(2026, 9, 1);
  const months = buildRecentMonthSeries(now);

  assert.deepEqual(
    months.map((entry) => entry.key),
    ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10']
  );
  assert.equal(months[0].shortMonth, 'May');
  assert.equal(months[5].month, 'Oct 2026');
});

test('month checks use the active runtime date instead of fixed 2026 dates', () => {
  const now = new Date(2026, 9, 1);
  assert.equal(isDateInCurrentMonth('2026-10-15', now), true);
  assert.equal(isDateInCurrentMonth('2026-09-30', now), false);
  assert.equal(isDateInMonth('2026-09-30', '2026-09', now), true);
});
