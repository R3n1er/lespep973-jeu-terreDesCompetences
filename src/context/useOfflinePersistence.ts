import { useEffect, useRef } from "react";
import type { ChallengeResponse, GameState, ScoreData } from "@/types/game";
import {
  persistGameState,
  persistScoreToLocalStorage,
  persistResponse,
  queueOfflineResponse,
  flushOfflineQueue,
} from "@/lib/storage";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

type UseOfflinePersistenceParams = {
  gameState: GameState;
  score: ScoreData;
  lastResponse?: ChallengeResponse;
};

export function useOfflinePersistence({
  gameState,
  score,
  lastResponse,
}: UseOfflinePersistenceParams) {
  const { isOnline } = useOfflineStatus();
  const pendingResponses = useRef<ChallengeResponse[]>([]);

  useEffect(() => {
    void persistGameState({
      phase: gameState.phase,
      challengeIndex: gameState.challengeIndex,
      currentTeamIndex: gameState.currentTeamIndex,
    });
    persistScoreToLocalStorage(score);
  }, [
    gameState.phase,
    gameState.challengeIndex,
    gameState.currentTeamIndex,
    score,
  ]);

  useEffect(() => {
    if (lastResponse) {
      pendingResponses.current.push(lastResponse);
      queueOfflineResponse(lastResponse);
      if (isOnline) {
        void persistResponse(lastResponse);
        pendingResponses.current = [];
        flushOfflineQueue();
      }
    }
  }, [lastResponse, isOnline]);

  useEffect(() => {
    if (isOnline) {
      const cached = flushOfflineQueue();
      if (cached.length) {
        pendingResponses.current.push(...cached);
      }
      if (pendingResponses.current.length > 0) {
        pendingResponses.current.forEach((response) => {
          void persistResponse(response);
        });
        pendingResponses.current = [];
      }
    }
  }, [isOnline]);
}
