import { useEffect } from "react";
import { cn } from "@/lib/utils";

type TimerDisplayProps = {
  timeRemaining: number;
  isRunning: boolean;
  alerts: {
    thirtySeconds: boolean;
    tenSeconds: boolean;
    fiveSeconds: boolean;
  };
  className?: string;
};

export default function TimerDisplay({ timeRemaining, isRunning, alerts, className }: TimerDisplayProps) {
  const totalSeconds = Math.max(0, Math.ceil(timeRemaining / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  useEffect(() => {
    if (alerts.fiveSeconds && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.([100, 50, 100]);
    }
  }, [alerts.fiveSeconds]);

  let stateClass = "timer-display--safe";
  if (alerts.fiveSeconds) {
    stateClass = "timer-display--critical";
  } else if (alerts.tenSeconds) {
    stateClass = "timer-display--warning";
  } else if (alerts.thirtySeconds) {
    stateClass = "timer-display--caution";
  }

  return (
    <div className={cn("timer-display", stateClass, !isRunning && "timer-display--paused", className)}>
      <div className="timer-display__value" aria-live="polite">
        {minutes}:{seconds}
      </div>
      <p className="timer-display__label">
        {isRunning ? "Temps restant" : "En pause"}
      </p>
    </div>
  );
}
