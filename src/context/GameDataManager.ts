import { exportGameData, persistGameState, persistScoreToLocalStorage, persistResponse } from "@/lib/storage";
import type { ChallengeResponse, GameState, ScoreData } from "@/types/game";

export type ExportedGameData = {
  state: Partial<GameState> | null;
  responses: ChallengeResponse[];
  score: ScoreData | null;
  exportedAt: string;
};

export async function exportCurrentGame(): Promise<ExportedGameData> {
  const { state, responses, score } = await exportGameData();
  return {
    state,
    responses,
    score,
    exportedAt: new Date().toISOString(),
  };
}

export async function importGameData(data: ExportedGameData) {
  if (data.state) {
    await persistGameState(data.state);
  }
  if (data.score) {
    persistScoreToLocalStorage(data.score);
  }
  for (const response of data.responses) {
    await persistResponse(response);
  }
}
