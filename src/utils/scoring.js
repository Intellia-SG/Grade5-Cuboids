import { shuffleArray } from './shuffle.js';

export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // 3 Stars (90%+)
  if (correct >= 7) return 2; // 2 Stars (70%+)
  if (correct >= 5) return 1; // 1 Star (50%+)
  return 0;
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}

export function generateDistractors(correct, min = 1, max = 4000, count = 3) {
  const distractors = new Set();
  const offsets = [
    -Math.round(correct * 0.1),
    -Math.round(correct * 0.2),
    Math.round(correct * 0.1),
    Math.round(correct * 0.2),
    -1,
    1,
    -2,
    2,
  ];

  shuffleArray(offsets).forEach((offset) => {
    const d = correct + offset;
    if (d >= min && d <= max && d !== correct && d > 0 && distractors.size < count) {
      distractors.add(d);
    }
  });

  while (distractors.size < count) {
    const d = correct + (distractors.size + 1) * 3;
    if (d <= max && d !== correct && d > 0) distractors.add(d);
  }

  return shuffleArray([correct, ...Array.from(distractors)]);
}
