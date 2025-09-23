import { describe, it, expect } from "vitest";
import { applyScore } from "@/lib/scoring";
import type { ScoreData, ChallengeResponse } from "@/types/game";

const baseScore: ScoreData = {
  teamScores: {},
  globalScore: 0,
  correctAnswers: 0,
  totalChallenges: 0,
  streak: 0,
};

describe("applyScore", () => {
  it("ajoute les points et gère le streak", () => {
    const response: ChallengeResponse = {
      challengeId: "challenge-1",
      teamId: "team-1",
      selectedOptions: [],
      timeSpent: 20,
      isCorrect: true,
      pointsEarned: 100,
      timestamp: Date.now(),
    };

    const score = applyScore(baseScore, response);
    expect(score.globalScore).toBeGreaterThan(0);
    expect(score.teamScores["team-1"]).toBeGreaterThan(0);
    expect(score.streak).toBe(1);
  });
});
