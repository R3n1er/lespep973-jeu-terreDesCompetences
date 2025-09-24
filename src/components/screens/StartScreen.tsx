import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AppShell from "@/components/arcade/AppShell";

type StartScreenProps = {
  onStart: () => void;
  onShowInfo?: () => void;
  skipSplash?: boolean;
};

export default function StartScreen({ onStart, onShowInfo, skipSplash = false }: StartScreenProps) {
  const [showSplash, setShowSplash] = useState(!skipSplash);

  useEffect(() => {
    if (!skipSplash) {
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [skipSplash]);

  return (
    <AppShell
      theme="scolarite"
      headerContent={
        <div className="topbar__tagline">
          <span className="topbar__tagline-title">Découverte des métiers</span>
          <span className="topbar__tagline-sub">Session iPad • 10 minutes • 13 équipes</span>
        </div>
      }
      footerSlot={
        <p className="text-ink-muted text-sm text-center">
          Journée institutionnelle 2025 • <span className="text-accent font-medium">Les PEP Guyane</span>
        </p>
      }
      boardClassName="relative flex flex-col items-center justify-center gap-10 px-12 py-12 text-center"
    >
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: 'radial-gradient(600px at center, rgba(33, 150, 243, 0.3) 0%, #0b1020 70%)'
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center gap-8"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Logo avec effet mask selon le brief */}
              <div
                className="w-80 h-80 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--pep-blue) 0%, var(--pep-pink) 100%)',
                  mask: 'radial-gradient(circle, white 30%, transparent 70%)',
                  WebkitMask: 'radial-gradient(circle, white 30%, transparent 70%)',
                  opacity: 0.18
                }}
              />

              <motion.img
                src="/images/logo_lespep973.jpg"
                alt="Logo PEP Guyane"
                className="absolute w-32 h-auto rounded-2xl shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(33, 150, 243, 0.5))'
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.h1
                className="text-4xl font-black text-gradient text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                TERRE DES COMPÉTENCES
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex flex-col items-center justify-center text-center w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: showSplash ? 2.2 : 0, duration: 0.6 }}
      >
          {/* Logo cliquable pour infos */}
          <motion.img
            src="/images/logo_lespep973.jpg"
            alt="Logo PEP Guyane"
            className="w-20 h-auto rounded-xl mb-6 cursor-pointer glow"
            onClick={onShowInfo}
            whileHover={{
              scale: 1.1,
              filter: 'drop-shadow(0 0 20px rgba(33, 150, 243, 0.8))'
            }}
            whileTap={{ scale: 0.95 }}
          />

          {/* Titre principal avec gradient */}
          <h1 className="text-6xl font-black text-gradient mb-4 tracking-tight">
            TERRE DES COMPÉTENCES
          </h1>

          <p className="text-xl text-ink-soft mb-2 font-medium">
            Découvrez les métiers ADPEP Guyane
          </p>

          {/* Indicateurs avec icônes thématiques */}
          <div className="flex items-center justify-center gap-8 mb-12 text-ink-soft">
            <div className="flex items-center gap-2">
              <img src="/icones/icone-scolarite.svg" alt="" className="w-5 h-5 opacity-70" />
              <span className="text-sm">15 métiers</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icones/icone-mobilite.svg" alt="" className="w-5 h-5 opacity-70" />
              <span className="text-sm">13 équipes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pep-green rounded-full animate-pulse"></span>
              <span className="text-sm">Mode iPad</span>
            </div>
          </div>

          {/* Bouton principal arcade */}
          <motion.button
            className="btn btn--accent glow"
            style={{
              fontSize: '1.5rem',
              padding: '1.5rem 3rem',
              minWidth: '320px',
              minHeight: '80px'
            }}
            onClick={onStart}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), var(--accent-glow)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: showSplash ? 2.5 : 0.3 }}
          >
            <span className="flex items-center gap-3">
              🎮 <span className="font-black">COMMENCER LE JEU</span>
            </span>
          </motion.button>

          {/* Particules décoratives */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full opacity-20"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + ((i % 3) + 1) * 15}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.1, 0.35, 0.1],
                  scale: [0.85, 1.25, 0.85],
                }}
                transition={{
                  duration: 4 + i * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            ))}
          </div>
      </motion.div>
    </AppShell>
  );
}
