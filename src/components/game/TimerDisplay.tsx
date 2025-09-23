type TimerDisplayProps = {
  timeRemaining: number;
  isRunning: boolean;
  alerts: {
    thirtySeconds: boolean;
    tenSeconds: boolean;
    fiveSeconds: boolean;
  };
};

export default function TimerDisplay({
  timeRemaining,
  isRunning,
  alerts,
}: TimerDisplayProps) {
  const totalSeconds = Math.max(0, Math.ceil(timeRemaining / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  let visualState = "border-brand-primary text-brand-primary";
  if (alerts.fiveSeconds) {
    visualState = "border-red-500 text-red-600 animate-pulse";
  } else if (alerts.tenSeconds) {
    visualState = "border-orange-500 text-orange-600";
  } else if (alerts.thirtySeconds) {
    visualState = "border-amber-500 text-amber-600";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`rounded-full border-4 px-10 py-4 text-4xl font-bold shadow-card transition ${visualState}`}
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
