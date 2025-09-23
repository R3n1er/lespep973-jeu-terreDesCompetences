import type { Challenge, ChallengeResponse, ScoreData } from "@/types/game";

export interface ScoreBreakdown {
  pointsEarned: number;
  isCorrect: boolean;
  correctMatches: number;
  incorrectMatches: number;
  total: number;
  accuracy: number;
}

export function calculatePartialScore(challenge: Challenge, response: ChallengeResponse): ScoreBreakdown {
  const correct = new Set(challenge.correctAnswers);
  const total = correct.size || 1;

  const correctMatches = response.selectedOptions.filter((option) => correct.has(option)).length;
  const incorrectMatches = response.selectedOptions.filter((option) => !correct.has(option)).length;

  const accuracy = correctMatches / total;
  const penalty = incorrectMatches > 0 ? incorrectMatches / Math.max(response.selectedOptions.length, 1) : 0;
  const baseScore = Math.max(0, accuracy - penalty) * challenge.points;

  const isExact = correctMatches === total && incorrectMatches === 0;

  return {
    pointsEarned: Math.round(baseScore),
    isCorrect: isExact,
    correctMatches,
    incorrectMatches,
    total,
    accuracy,
  };
}

export function applyScore(score: ScoreData, response: ChallengeResponse): ScoreData {
  const updatedTeamScore = (score.teamScores[response.teamId] ?? 0) + response.pointsEarned;
  const isCorrect = response.isCorrect;

  const streak = isCorrect ? score.streak + 1 : 0;
  const multiplier = streak >= 5 ? 1.2 : streak >= 3 ? 1.1 : 1;
  const multiplierPoints = isCorrect ? Math.round(response.pointsEarned * (multiplier - 1)) : 0;

  return {
    teamScores: {
      ...score.teamScores,
      [response.teamId]: updatedTeamScore + multiplierPoints,
    },
    globalScore: score.globalScore + response.pointsEarned + multiplierPoints,
    correctAnswers: score.correctAnswers + (isCorrect ? 1 : 0),
    totalChallenges: score.totalChallenges + 1,
    streak,
  };
}
