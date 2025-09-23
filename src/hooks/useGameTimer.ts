import { useEffect, useRef, useState } from "react";
import type { GameTimerState } from "@/types/game";

export function useGameTimer(initialMs: number) {
  const workerRef = useRef<Worker | null>(null);
  const [state, setState] = useState<GameTimerState>({
    phase: "team",
    timeRemaining: initialMs,
    isRunning: false,
    lastUpdate: performance.now(),
    currentTeamIndex: 0,
    alerts: { thirtySeconds: false, tenSeconds: false, fiveSeconds: false },
    countdownMode: "none",
  });

  useEffect(() => {
    if (typeof Worker !== "undefined") {
      workerRef.current = new Worker(
        new URL("../workers/timer.worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
      const worker = workerRef.current;
      worker.onmessage = (e) => {
        if (e.data?.type === "TICK") {
          const remaining = e.data.remaining as number;
          const countdownMode = remaining <= 5000 ? "audio-visual" : "none";
          setState((prev) => ({
            ...prev,
            timeRemaining: remaining,
            alerts: {
              thirtySeconds: prev.alerts.thirtySeconds || remaining <= 30000,
              tenSeconds: prev.alerts.tenSeconds || remaining <= 10000,
              fiveSeconds: prev.alerts.fiveSeconds || remaining <= 5000,
            },
            countdownMode,
          }));
        }
      };
      return () => {
        worker.terminate();
      };
    }
    return () => {};
  }, []);

  function start() {
    workerRef.current?.postMessage({ type: "START" });
    setState((s) => ({ ...s, isRunning: true }));
  }

  function pause() {
    workerRef.current?.postMessage({ type: "PAUSE" });
    setState((s) => ({
      ...s,
      isRunning: false,
      countdownMode: "none",
    }));
  }

  function set(ms: number) {
    workerRef.current?.postMessage({ type: "SET", payload: { remaining: ms } });
    setState((s) => ({
      ...s,
      timeRemaining: ms,
      alerts: { thirtySeconds: false, tenSeconds: false, fiveSeconds: false },
      countdownMode: "none",
    }));
  }

  return { state, start, pause, set };
}
