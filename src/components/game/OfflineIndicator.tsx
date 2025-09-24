import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { cn } from "@/lib/utils";

export default function OfflineIndicator() {
  const { isOnline } = useOfflineStatus();

  return (
    <div
      className={cn(
        "offline-indicator",
        isOnline ? "offline-indicator--online" : "offline-indicator--offline"
      )}
      role="status"
      aria-live="polite"
    >
      <span className="offline-indicator__dot" aria-hidden />
      <span className="offline-indicator__label">
        {isOnline
          ? "En ligne"
          : "Mode hors-ligne actif — la session est sauvegardée localement"}
      </span>
    </div>
  );
}
