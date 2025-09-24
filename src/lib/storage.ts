import { openDB, type IDBPDatabase } from "idb";
import type { ChallengeResponse, GameState, ScoreData } from "@/types/game";

const DB_NAME = "adpep-terres-competences";
const DB_VERSION = 1;
const STORE_GAME_STATE = "game-state";
const STORE_RESPONSES = "responses";

let dbPromise: Promise<IDBPDatabase | null> | null = null;

async function getDB() {
  if (typeof indexedDB === "undefined") {
    return null;
  }

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_GAME_STATE)) {
          db.createObjectStore(STORE_GAME_STATE, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(STORE_RESPONSES)) {
          const store = db.createObjectStore(STORE_RESPONSES, {
            keyPath: "key",
          });
          store.createIndex("byTimestamp", "response.timestamp");
        }
      },
    }).catch(() => null);
  }

  return dbPromise;
}

export async function persistGameState(state: Partial<GameState>) {
  try {
    const db = await getDB();
    if (!db) return;
    const tx = db.transaction(STORE_GAME_STATE, "readwrite");
    await tx.store.put({ id: "current", ...state });
    await tx.done;
  } catch (error) {
    console.warn("Impossible de persister l'état du jeu", error);
  }
}

export async function loadPersistedGameState(): Promise<Partial<GameState> | null> {
  try {
    const db = await getDB();
    if (!db) return null;
    const tx = db.transaction(STORE_GAME_STATE, "readonly");
    const result = await tx.store.get("current");
    await tx.done;
    return result ?? null;
  } catch (error) {
    console.warn("Impossible de charger l'état du jeu", error);
    return null;
  }
}

export async function persistResponse(response: ChallengeResponse) {
  try {
    const db = await getDB();
    if (!db) return;
    const tx = db.transaction(STORE_RESPONSES, "readwrite");
    const key = `${response.challengeId}-${response.teamId}-${response.timestamp}`;
    await tx.store.put({ key, response });
    await tx.done;
  } catch (error) {
    console.warn("Impossible de persister la réponse", error);
  }
}

export async function loadResponses(): Promise<ChallengeResponse[]> {
  try {
    const db = await getDB();
    if (!db) return [];
    const tx = db.transaction(STORE_RESPONSES, "readonly");
    const values = await tx.store.index("byTimestamp").getAll();
    await tx.done;
    return values.map(
      (entry: { response: ChallengeResponse }) => entry.response
    );
  } catch (error) {
    console.warn("Impossible de charger les réponses", error);
    return [];
  }
}

const LOCAL_SCORE_KEY = "adpep-score";
const LOCAL_STATE_KEY = "adpep-session";

export function loadScoreFromLocalStorage(): ScoreData | null {
  try {
    const raw = localStorage.getItem(LOCAL_SCORE_KEY);
    return raw ? (JSON.parse(raw) as ScoreData) : null;
  } catch (error) {
    console.warn("Impossible de charger le score local", error);
    return null;
  }
}

export function persistScoreToLocalStorage(score: ScoreData) {
  try {
    localStorage.setItem(LOCAL_SCORE_KEY, JSON.stringify(score));
  } catch (error) {
    console.warn("Impossible de persister le score local", error);
  }
}

export function loadSessionSnapshot(): Partial<GameState> | null {
  try {
    const raw = sessionStorage.getItem(LOCAL_STATE_KEY);
    return raw ? (JSON.parse(raw) as Partial<GameState>) : null;
  } catch (error) {
    console.warn("Impossible de charger le snapshot de session", error);
    return null;
  }
}

export function persistSessionSnapshot(snapshot: Partial<GameState>) {
  try {
    sessionStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.warn("Impossible de persister le snapshot de session", error);
  }
}

const QUEUE_KEY = "adpep-offline-responses";
function getOfflineQueue(): ChallengeResponse[] {
  try {
    const raw = sessionStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as ChallengeResponse[]) : [];
  } catch (error) {
    console.warn("Impossible de récupérer la file offline", error);
    return [];
  }
}
function saveOfflineQueue(queue: ChallengeResponse[]) {
  try {
    sessionStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.warn("Impossible de sauvegarder la file offline", error);
  }
}

export function queueOfflineResponse(response: ChallengeResponse) {
  const queue = getOfflineQueue();
  queue.push(response);
  saveOfflineQueue(queue);
}

export function flushOfflineQueue(): ChallengeResponse[] {
  const queue = getOfflineQueue();
  saveOfflineQueue([]);
  return queue;
}

export async function exportGameData(): Promise<{
  state: Partial<GameState> | null;
  responses: ChallengeResponse[];
  score: ScoreData | null;
}> {
  const [state, responses, score] = await Promise.all([
    loadPersistedGameState(),
    loadResponses(),
    Promise.resolve(loadScoreFromLocalStorage()),
  ]);
  return { state, responses, score };
}

export async function clearStorage() {
  try {
    const db = await getDB();
    if (db) {
      const txState = db.transaction(STORE_GAME_STATE, "readwrite");
      await txState.store.clear();
      await txState.done;

      const txResponses = db.transaction(STORE_RESPONSES, "readwrite");
      await txResponses.store.clear();
      await txResponses.done;
    }
  } catch (error) {
    console.warn("Impossible de nettoyer l'IndexedDB", error);
  }

  try {
    localStorage.removeItem(LOCAL_SCORE_KEY);
    sessionStorage.removeItem(LOCAL_STATE_KEY);
    sessionStorage.removeItem(QUEUE_KEY);
  } catch (error) {
    console.warn("Impossible de nettoyer la session", error);
  }
}
