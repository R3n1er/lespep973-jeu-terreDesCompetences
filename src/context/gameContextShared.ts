import { createContext } from "react";
import type { GameState, Team, Challenge } from "@/types/game";
import type { ChallengeResponse } from "@/types/game";

export type GameActions = {
  startGame: () => void;
  submitResponse: (response: ChallengeResponse) => void;
  nextTeam: () => void;
  advanceChallenge: () => void;
  resetGame: () => Promise<void>;
};

export type GameContextValue = {
  state: GameState;
  challenges: Challenge[];
  teams: Team[];
  actions: GameActions;
};

export const GameContext = createContext<GameContextValue | undefined>(
  undefined
);
