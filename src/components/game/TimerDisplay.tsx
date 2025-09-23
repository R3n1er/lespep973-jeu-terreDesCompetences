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
};

export default function TimerDisplay({ timeRemaining, isRunning, alerts }: TimerDisplayProps) {
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

  let visualState = "border-emerald-500 text-emerald-600";
  if (alerts.fiveSeconds) {
    visualState = "border-red-500 text-white bg-red-500 animate-[pulse_0.5s_ease-in-out_infinite]";
  } else if (alerts.tenSeconds) {
    visualState = "border-orange-500 text-orange-600 bg-orange-50 animate-[pulse_1s_ease-in-out_infinite]";
  } else if (alerts.thirtySeconds) {
    visualState = "border-amber-500 text-amber-600 bg-amber-50";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-full border-4 px-10 py-4 text-4xl font-bold shadow-card transition",
          visualState
        )}
        aria-live="polite"
      >
        {minutes}:{seconds}
      </div>
      <p className="text-sm uppercase tracking-wide text-neutral-500">
        {isRunning ? "Temps restant" : "En pause"}
      </p>
    </div>
  );
}
