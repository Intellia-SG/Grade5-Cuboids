export const BADGES = [
  {
    id: 'cargo_cadet',
    label: '📦 Cargo Cadet',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'cube_builder',
    label: '🧊 Cube Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'volume_voyager',
    label: '🚀 Volume Voyager',
    description: 'Score 80%+ in Practice phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_packer',
    label: '💎 Perfect Packer',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some((ws) => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_mission_complete',
    label: '🌟 Full Mission Complete',
    description: 'Complete all 6 screens',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_eyed_detective',
    label: '🕵️ Sharp-Eyed Detective',
    description: 'Complete Station B without any wrong pick',
    condition: (s) => s.stationBPerfect === true,
  },
  {
    id: 'formula_master',
    label: '📐 Formula Master',
    description: 'Answer 5 missing-dimension questions correctly',
    condition: (s) => (s.missingDimCorrect || 0) >= 5,
  },
];

export function checkBadges(state) {
  return BADGES.filter(
    (b) => !state.badges.includes(b.id) && b.condition(state)
  ).map((b) => b.id);
}
