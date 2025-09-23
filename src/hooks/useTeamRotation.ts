import { useEffect, useMemo, useState } from "react";
import type { Team } from "@/types/game";

type RotationState = {
  currentTeamIndex: number;
  timeRemaining: number;
  isIntermission: boolean;
};

export function useTeamRotation(teams: Team[], options?: { rotationMs?: number; intermissionMs?: number }) {
  const { rotationMs, intermissionMs } = useMemo(
    () => ({ rotationMs: options?.rotationMs ?? 150_000, intermissionMs: options?.intermissionMs ?? 15_000 }),
    [options?.rotationMs, options?.intermissionMs]
  );

  const [state, setState] = useState<RotationState>({ currentTeamIndex: 0, timeRemaining: rotationMs, isIntermission: false });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setState((prev) => {
        const nextRemaining = prev.timeRemaining - 1000;
        if (nextRemaining > 0) {
          return { ...prev, timeRemaining: nextRemaining };
        }

        if (!prev.isIntermission) {
          return {
            currentTeamIndex: prev.currentTeamIndex,
            timeRemaining: intermissionMs,
            isIntermission: true,
          };
        }

        const nextIndex = (prev.currentTeamIndex + 1) % teams.length;
        return {
          currentTeamIndex: nextIndex,
          timeRemaining: rotationMs,
          isIntermission: false,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, intermissionMs, rotationMs, teams.length]);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setState({ currentTeamIndex: 0, timeRemaining: rotationMs, isIntermission: false });
    setIsRunning(false);
  }

  return {
    state,
    isRunning,
    start,
    pause,
    reset,
    currentTeam: teams[state.currentTeamIndex],
    nextTeam: teams[(state.currentTeamIndex + 1) % teams.length],
  };
}


