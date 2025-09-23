import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { GameProvider } from "@/context/GameContext";
import { useGameContext } from "@/context/useGameContext";
import type { ChallengeResponse } from "@/types/game";

function setup() {
  return renderHook(() => useGameContext(), {
    wrapper: ({ children }) => <GameProvider>{children}</GameProvider>,
  });
}

describe("GameContext", () => {
  it("cumule les scores après soumission", () => {
    const { result } = setup();

    act(() => {
      result.current.actions.startGame();
    });

    const response: ChallengeResponse = {
      challengeId: "challenge-1",
      teamId: "team-1",
      selectedOptions: ["agent-service-interieur"],
      timeSpent: 10,
      isCorrect: true,
      pointsEarned: 100,
      timestamp: Date.now(),
    };

    act(() => {
      result.current.actions.submitResponse(response);
    });

    expect(result.current.state.score.globalScore).toBeGreaterThan(0);
    expect(result.current.state.responses).toHaveLength(1);
  });
});
