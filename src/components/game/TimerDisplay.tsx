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

  let visualState = "border-emerald-500 text-emerald-600 bg-emerald-50";
  if (alerts.fiveSeconds) {
    visualState = "border-red-600 bg-red-500 text-white animate-[pulse_0.5s_ease-in-out_infinite]";
  } else if (alerts.tenSeconds) {
    visualState = "border-orange-500 bg-orange-500/90 text-white animate-[pulse_1s_ease-in-out_infinite]";
  } else if (alerts.thirtySeconds) {
    visualState = "border-amber-500 bg-amber-100 text-amber-700";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-[2.5rem] border-4 px-12 py-5 text-4xl font-black tracking-wider shadow-[0_10px_0_rgba(15,23,42,0.75)]",
          "transition-transform duration-150",
          visualState
        )}
        aria-live="polite"
      >
        {minutes}:{seconds}
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        {isRunning ? "Temps restant" : "En pause"}
      </p>
    </div>
  );
}
