import { exportCurrentGame, importGameData } from "@/context/GameDataManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EndScreenProps = {
  onRestart: () => void;
};

export default function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 pt-16">
      <Card className="mx-auto w-full max-w-xl bg-gradient-to-br from-brand-secondary/20 via-neutral-0 to-brand-primary/20 text-center">
        <CardContent className="flex flex-col gap-6 p-8">
          <h2 className="text-3xl font-extrabold text-neutral-900">Fin de session</h2>
          <p className="text-neutral-700">Merci pour votre participation !</p>
          <div className="flex flex-col gap-4 items-center">
            <Button size="lg" onClick={onRestart}>
              Nouvelle session
            </Button>
            <Button
              variant="secondary"
              size="lg"
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
            </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}
