import { motion } from "framer-motion";
import AppShell from "@/components/arcade/AppShell";
import { Badge } from "@/components/ui/badge";
import GameCard from "@/components/arcade/GameCard";

type GameInfoScreenProps = {
  onStart: () => void;
  onBack: () => void;
};

export default function GameInfoScreen({ onStart, onBack }: GameInfoScreenProps) {
  return (
    <AppShell
      theme="scolarite"
      headerContent={
        <div className="topbar__tagline">
          <span className="topbar__tagline-title">Guide de la session</span>
          <span className="topbar__tagline-sub">Règles & expérience tablette</span>
        </div>
      }
      footerSlot={
        <p className="text-ink-muted text-sm text-center">
          Journée institutionnelle 2025 • <span className="text-accent font-medium">Les PEP Guyane</span>
        </p>
      }
      boardClassName="relative flex flex-col items-center justify-center gap-10 px-10 py-10 text-center"
    >
      <motion.div
        className="flex flex-col items-center justify-center w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
          {/* En-tête avec logo et navigation */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              className="btn btn--ghost glow"
              onClick={onBack}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.img
              src="/images/logo_lespep973.jpg"
              alt="Logo PEP Guyane"
              className="w-16 h-auto rounded-xl glow cursor-pointer"
              onClick={onBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />

            <h1 className="text-4xl font-black text-gradient">
              À PROPOS DU JEU
            </h1>
          </motion.div>

          {/* Carte principale avec infos */}
          <GameCard
            title="Guide du jeu"
            icon="/icones/icone-scolarite.svg"
            active
            className="max-w-4xl"
            footerActions={
              <motion.button
                className="btn btn--accent glow"
                style={{
                  fontSize: '1.25rem',
                  padding: '1rem 2rem',
                  minWidth: '200px',
                  minHeight: '60px'
                }}
                onClick={onStart}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 30px rgba(0,0,0,0.3), var(--accent-glow)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  🎮 <span className="font-bold">JOUER MAINTENANT</span>
                </span>
              </motion.button>
            }
          >
            <div className="space-y-6">
              {/* Objectif principal */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-accent mb-3 flex items-center justify-center gap-2">
                  🎯 <span>Objectif</span>
                </h2>
                <p className="text-ink text-lg leading-relaxed">
                  Découvrez les <strong className="text-accent">15 métiers</strong> de l'ADPEP Guyane
                  à travers des défis d'association entre compétences et métiers.
                  Chaque équipe dispose de <strong className="text-pep-yellow">2 minutes 30</strong> pour
                  répondre avant la rotation.
                </p>
              </div>

              {/* Types de défis avec glass cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  className="p-6 rounded-lg border border-glass-border"
                  style={{
                    background: 'var(--glass)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <h3 className="text-xl font-bold text-ink flex items-center gap-3 mb-4">
                    <img src="/icones/icone-scolarite.svg" alt="" className="w-8 h-8" />
                    Types de défis
                  </h3>
                  <ul className="space-y-3 text-ink-soft">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      3-6 compétences → 1 métier
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pep-green rounded-full"></span>
                      1 métier → 6 compétences
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pep-pink rounded-full"></span>
                      Choix multiples et sélections
                    </li>
                  </ul>
                </div>

                <div
                  className="p-6 rounded-lg border border-glass-border"
                  style={{
                    background: 'var(--glass)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <h3 className="text-xl font-bold text-ink flex items-center gap-3 mb-4">
                    <img src="/icones/icone-mobilite.svg" alt="" className="w-8 h-8" />
                    Format de jeu
                  </h3>
                  <ul className="space-y-3 text-ink-soft">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pep-violet rounded-full"></span>
                      13 équipes en rotation
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pep-yellow rounded-full"></span>
                      2min30 par équipe
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pep-cyan rounded-full"></span>
                      Optimisé tablette iPad
                    </li>
                  </ul>
                </div>
              </div>

              {/* Badge système de scoring */}
              <div className="text-center">
                <Badge variant="accent" className="text-sm px-6 py-3 uppercase tracking-[0.25em]">
                  🏆 Système de points avec bonus temps et feedback détaillé
                </Badge>
              </div>

              {/* Domaines métiers avec icônes */}
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 pt-6 border-t border-glass-border">
                <div className="text-center">
                  <img src="/icones/icone_handicap.svg" alt="Handicap" className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <span className="text-xs text-ink-muted">Handicap</span>
                </div>
                <div className="text-center">
                  <img src="/icones/icone-aide-parentalite.svg" alt="Parentalité" className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <span className="text-xs text-ink-muted">Parentalité</span>
                </div>
                <div className="text-center">
                  <img src="/icones/icone-scolarite.svg" alt="Scolarité" className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <span className="text-xs text-ink-muted">Scolarité</span>
                </div>
                <div className="text-center">
                  <img src="/icones/icone_prevention.svg" alt="Prévention" className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <span className="text-xs text-ink-muted">Prévention</span>
                </div>
                <div className="text-center">
                  <img src="/icones/icone-protection-enfance.svg" alt="Protection" className="w-12 h-12 mx-auto mb-2 opacity-60" />
                  <span className="text-xs text-ink-muted">Protection</span>
                </div>
              </div>
            </div>
          </GameCard>
      </motion.div>
    </AppShell>
  );
}
