import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export default function OfflineIndicator() {
  const { isOnline } = useOfflineStatus();

  if (isOnline) {
    return (
      <div className="fixed bottom-4 right-4 rounded-full bg-green-500 text-white px-4 py-2 shadow-lg">
        En ligne
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 rounded-full bg-orange-500 text-white px-4 py-2 shadow-lg">
      Hors ligne - vos données sont conservées localement
    </div>
  );
}
