import { useEffect, useState } from "react";

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [lastChange, setLastChange] = useState<Date | null>(null);

  useEffect(() => {
    function updateStatus(status: boolean) {
      setIsOnline(status);
      setLastChange(new Date());
    }

    const handleOnline = () => updateStatus(true);
    const handleOffline = () => updateStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, lastChange };
}
