import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTeamRotation } from "@/hooks/useTeamRotation";

const TEAMS = [
  { id: "team-1", nom: "Équipe 1", membres: [] },
  { id: "team-2", nom: "Équipe 2", membres: [] },
];

describe("useTeamRotation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passe à l'intermission puis à l'équipe suivante", () => {
    const { result } = renderHook(() => useTeamRotation(TEAMS, { rotationMs: 2000, intermissionMs: 1000 }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.state.isIntermission).toBe(true);
    expect(result.current.state.timeRemaining).toBe(1000);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.state.isIntermission).toBe(false);
    expect(result.current.currentTeam.nom).toBe("Équipe 2");
  });
});


