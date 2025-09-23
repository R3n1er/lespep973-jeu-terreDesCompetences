import type { ChallengeResponse, ScoreData } from "@/types/game";

export function applyScore(
  score: ScoreData,
  response: ChallengeResponse
): ScoreData {
  const updatedTeamScore =
    (score.teamScores[response.teamId] ?? 0) + response.pointsEarned;
  const isCorrect = response.isCorrect;

  const streak = isCorrect ? score.streak + 1 : 0;
  const multiplier = streak >= 5 ? 1.2 : streak >= 3 ? 1.1 : 1;
  const multiplierPoints = isCorrect
    ? Math.round(response.pointsEarned * (multiplier - 1))
    : 0;

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
