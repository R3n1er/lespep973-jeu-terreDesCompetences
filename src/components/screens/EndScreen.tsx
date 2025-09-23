import { exportCurrentGame, importGameData } from "@/context/GameDataManager";

type EndScreenProps = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="mx-auto w-full max-w-xl text-center p-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Fin de session
        </h2>
        <p className="text-neutral-700 mb-6">
          Merci pour votre participation !
        </p>
        <div className="flex flex-col gap-4 items-center">
          <button
            className="rounded-lg bg-brand-primary px-6 py-3 text-white font-semibold shadow-card"
            onClick={onRestart}
          >
            Nouvelle session
          </button>
          <button
            className="rounded-lg border border-brand-primary px-6 py-3 text-brand-primary font-semibold"
            onClick={async () => {
              const data = await exportCurrentGame();
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `terres-competences-export-${Date.now()}.json`;
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            Exporter la session
          </button>
          <label className="cursor-pointer text-brand-primary underline">
            Importer une session
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                const json = JSON.parse(text);
                await importGameData(json);
                onRestart();
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
