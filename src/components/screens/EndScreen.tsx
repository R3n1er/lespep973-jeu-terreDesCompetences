import { exportCurrentGame, importGameData } from "@/context/GameDataManager";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AppShell from "@/components/arcade/AppShell";
import type { ThemeType } from "@/types/game";

type EndScreenProps = {
  onRestart: () => void;
  theme?: ThemeType;
};

export default function EndScreen({ onRestart, theme = "parentalite" }: EndScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell
      theme={theme}
      headerContent={
        <div className="topbar__tagline">
          <span className="topbar__tagline-title">Session terminée</span>
          <span className="topbar__tagline-sub">Merci pour votre participation</span>
        </div>
      }
      boardClassName="relative flex flex-col items-center justify-center gap-8 px-12 py-12 text-center"
      celebrating
    >
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src="/images/Logo_lespep973_png.png"
              alt="Logo ADPEP"
              className="w-56 h-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="glass-panel glass-panel--halo mx-auto flex w-full max-w-xl flex-col gap-6 p-8 text-center">
        <h2 className="text-4xl font-black text-ink">Fin de session</h2>
        <p className="text-lg text-ink-soft">
          Merci pour votre participation ! Exportez votre session ou redémarrez une nouvelle partie pour continuer à faire découvrir nos métiers.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button className="btn btn--accent px-12" onClick={onRestart}>
            Nouvelle session
          </button>
          <button
            className="btn btn--ghost px-12"
            onClick={async () => {
              const data = await exportCurrentGame();
              const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
              });
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
          <label className="cursor-pointer text-accent font-semibold underline">
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
    </AppShell>
  );
}
