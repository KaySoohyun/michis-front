import { expProgress, levelFor } from './level';

const DAY_MS = 86_400_000;
/** 2026-08-24T12:00:00.000Z */
const NOW = new Date('2026-08-24T12:00:00.000Z');
const birthAt = (msBefore: number) => new Date(NOW.getTime() - msBefore).toISOString();

describe('levelFor', () => {
  it('starts at level 1 for a newborn michi', () => {
    expect(levelFor(birthAt(5 * 60_000), NOW)).toBe(1);
  });

  it('gains one level per full day of life', () => {
    expect(levelFor(birthAt(DAY_MS), NOW)).toBe(2);
    expect(levelFor(birthAt(2 * DAY_MS), NOW)).toBe(3);
  });

  it('never goes below level 1', () => {
    expect(levelFor(new Date(NOW.getTime() + 3 * 60_000).toISOString(), NOW)).toBe(1);
  });
});

describe('expProgress', () => {
  it('is within [0, MAX] bounds', () => {
    const exp = expProgress(birthAt(DAY_MS + 4 * 60 * 60_000), NOW);
    expect(exp).toBeGreaterThanOrEqual(0);
    expect(exp).toBeLessThanOrEqual(200);
  });

  it('reflects progress inside the current day', () => {
    const quarter = expProgress(birthAt(DAY_MS + 6 * 60 * 60_000), NOW);
    expect(quarter).toBeCloseTo(50, 0);
  });
});
