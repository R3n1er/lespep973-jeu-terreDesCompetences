import { useEffect, useMemo, useReducer, useRef } from "react";
import type { ChallengeResponse, GameState } from "@/types/game";
import { CHALLENGES_CONFIGURATION } from "@/data/challenges";
import { TEAMS_SAMPLE } from "@/data/teams";
import { resolveThemeForChallenge } from "@/lib/theme";
import {
  loadPersistedGameState,
  loadResponses,
  loadScoreFromLocalStorage,
  persistGameState,
  persistResponse,
  persistScoreToLocalStorage,
  clearStorage,
  persistSessionSnapshot,
  loadSessionSnapshot,
} from "@/lib/storage";
import { applyScore, calculatePartialScore } from "@/lib/scoring";
import type { GameContextValue } from "@/context/gameContextShared";
import { GameContext } from "@/context/gameContextShared";
import { useOfflinePersistence } from "@/context/useOfflinePersistence";

const initialScore = {
  teamScores: {},
  globalScore: 0,
  correctAnswers: 0,
  totalChallenges: 0,
  streak: 0,
};

const initialState: GameState = {
  phase: "setup",
  currentTeamIndex: 0,
  currentChallenge: null,
  challengeIndex: 0,
  currentTheme: "scolarite",
  score: initialScore,
  responses: [],
};

type GameAction =
  | { type: "START_GAME" }
  | { type: "SET_CHALLENGE"; payload: { index: number } }
  | { type: "REGISTER_RESPONSE"; payload: ChallengeResponse }
  | { type: "NEXT_TEAM" }
  | { type: "END_GAME" }
  | { type: "HYDRATE"; payload: Partial<GameState> };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        phase: "playing",
        currentChallenge: CHALLENGES_CONFIGURATION[0],
        challengeIndex: 0,
        currentTeamIndex: 0,
        currentTheme: resolveThemeForChallenge(
          CHALLENGES_CONFIGURATION[0],
          state.currentTheme ?? "scolarite"
        ),
        score: state.score.teamScores ? state.score : initialScore,
      };
    case "SET_CHALLENGE": {
      const nextChallenge = CHALLENGES_CONFIGURATION[action.payload.index] ?? null;
      return {
        ...state,
        currentChallenge: nextChallenge,
        challengeIndex: action.payload.index,
        currentTheme: resolveThemeForChallenge(nextChallenge, state.currentTheme),
      };
    }
    case "REGISTER_RESPONSE": {
      const challenge = CHALLENGES_CONFIGURATION.find(
        (c) => c.id === action.payload.challengeId
      );
      const breakdown = challenge
        ? calculatePartialScore(challenge, action.payload)
        : {
            pointsEarned: action.payload.pointsEarned,
            isCorrect: action.payload.isCorrect,
          };
      const enrichedResponse: ChallengeResponse = {
        ...action.payload,
        pointsEarned: breakdown.pointsEarned,
        isCorrect: breakdown.isCorrect,
      };
      return {
        ...state,
        responses: [...state.responses, enrichedResponse],
        score: applyScore(state.score, enrichedResponse),
        currentChallenge: null,
        currentTheme: state.currentTheme,
      };
    }
    case "NEXT_TEAM":
      return {
        ...state,
        currentTeamIndex: (state.currentTeamIndex + 1) % TEAMS_SAMPLE.length,
      };
    case "END_GAME":
      return {
        ...state,
        phase: "finished",
        currentTheme: state.currentTheme,
      };
    case "HYDRATE":
      return {
        ...state,
        ...action.payload,
        phase: action.payload.phase ?? state.phase,
        score: action.payload.score ?? state.score,
        responses: action.payload.responses ?? state.responses,
        currentTheme: action.payload.currentTheme ?? state.currentTheme,
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const lastResponseRef = useRef<ChallengeResponse | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const snapshot = loadSessionSnapshot();
      const persistedState = snapshot ?? (await loadPersistedGameState());
      const persistedResponses = await loadResponses();
      const persistedScore = await loadScoreFromLocalStorage();

      if (persistedState || persistedResponses.length || persistedScore) {
        dispatch({
          type: "HYDRATE",
          payload: {
            ...persistedState,
            responses: persistedResponses,
            score: persistedScore ?? initialState.score,
          },
        });
        const index = persistedState?.challengeIndex ?? 0;
        dispatch({ type: "SET_CHALLENGE", payload: { index } });
      }
    })();
  }, []);

  useEffect(() => {
    void persistGameState(state);
    persistScoreToLocalStorage(state.score);
    persistSessionSnapshot({
      phase: state.phase,
      challengeIndex: state.challengeIndex,
      currentTeamIndex: state.currentTeamIndex,
      currentTheme: state.currentTheme,
    });
  }, [state]);

  useEffect(() => {
    if (lastResponseRef.current) {
      void persistResponse(lastResponseRef.current);
      lastResponseRef.current = undefined;
    }
  }, [state.responses]);

  useOfflinePersistence({
    gameState: state,
    score: state.score,
    lastResponse: lastResponseRef.current,
  });

  const actions = useMemo(
    () => ({
      startGame: () => dispatch({ type: "START_GAME" }),
      submitResponse: (response: ChallengeResponse) => {
        lastResponseRef.current = response;
        dispatch({ type: "REGISTER_RESPONSE", payload: response });
      },
      nextTeam: () => dispatch({ type: "NEXT_TEAM" }),
      advanceChallenge: () => {
        const nextIndex =
          (state.challengeIndex + 1) % CHALLENGES_CONFIGURATION.length;
        dispatch({ type: "SET_CHALLENGE", payload: { index: nextIndex } });
      },
      resetGame: async () => {
        await clearStorage();
        dispatch({ type: "END_GAME" });
      },
    }),
    [state.challengeIndex]
  );

  const value: GameContextValue = useMemo(
    () => ({
      state,
      challenges: CHALLENGES_CONFIGURATION,
      teams: TEAMS_SAMPLE,
      actions,
    }),
    [state, actions]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
