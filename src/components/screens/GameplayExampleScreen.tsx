import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/arcade';
import GameCard from '@/components/arcade/GameCard';
import Choices from '@/components/arcade/Choices';
import Toast from '@/components/arcade/Toast';
import { Badge } from '@/components/ui/badge';

// Exemple de données de jeu
const EXAMPLE_CHALLENGE = {
  id: '1',
  type: 'competences-to-metier' as const,
  theme: 'handicap' as const,
  question: 'À quel métier correspondent ces compétences ?',
  competences: [
    'Accompagnement individualisé',
    'Élaboration de projets personnalisés',
    'Coordination avec les familles',
    'Stimulation développementale',
    'Observation comportementale'
  ],
  choices: [
    { id: 'edu-spe', label: 'Éducateur spécialisé', icon: '/icones/icone_handicap.svg' },
    { id: 'psycho', label: 'Psychologue', icon: '/icones/icone-aide-parentalite.svg' },
    { id: 'ortho', label: 'Orthophoniste', icon: '/icones/icone-scolarite.svg' },
    { id: 'ergo', label: 'Ergothérapeute', icon: '/icones/icone_prevention.svg' }
  ],
  correctAnswer: 'edu-spe'
};

type GameplayExampleScreenProps = {
  onBack?: () => void;
};

export default function GameplayExampleScreen({ onBack }: GameplayExampleScreenProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [score, setScore] = useState(340);
  const [showHint, setShowHint] = useState(false);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };

  const handleValidate = () => {
    if (!selectedChoice) {
      setToast({ message: 'Sélectionnez une réponse !', type: 'info' });
      return;
    }

    const isCorrect = selectedChoice === EXAMPLE_CHALLENGE.correctAnswer;
    setToast({
      message: isCorrect ? 'Excellente réponse ! 🎉' : 'Essayez encore… 💪',
      type: isCorrect ? 'success' : 'error'
    });

    if (isCorrect) {
      setScore(prev => prev + 100);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setToast({
      message: 'Indice : Ce métier est au cœur de l\'accompagnement médico-social',
      type: 'info'
    });
  };

  const choicesData = EXAMPLE_CHALLENGE.choices.map(choice => ({
    ...choice,
    selected: choice.id === selectedChoice,
    disabled: false
  }));

  return (
    <AppShell
      theme={EXAMPLE_CHALLENGE.theme}
      hud={{
        timeRemaining,
        totalTime: 150,
        score,
        maxScore: 1000,
        teamName: 'Équipe Alpha'
      }}
      boardClassName="flex flex-col gap-6"
    >
      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <motion.div
        className="flex gap-6 w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
          {/* Carte de défi */}
          <GameCard
            title={EXAMPLE_CHALLENGE.question}
            icon={`/icones/icone_${EXAMPLE_CHALLENGE.theme}.svg`}
            active
            footerActions={
              <div className="flex gap-3">
                <button
                  className="btn btn--ghost glow"
                  onClick={handleHint}
                  disabled={showHint}
                  style={{ opacity: showHint ? 0.5 : 1 }}
                >
                  💡 Indice
                </button>
                <button
                  className="btn btn--accent glow"
                  onClick={handleValidate}
                  disabled={!selectedChoice}
                  style={{
                    opacity: selectedChoice ? 1 : 0.6,
                    cursor: selectedChoice ? 'pointer' : 'not-allowed'
                  }}
                >
                  ✓ Valider
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Badge variant="ghost" className="px-4 py-2 tracking-[0.25em]">
                  Défi #{EXAMPLE_CHALLENGE.id} • Thème {EXAMPLE_CHALLENGE.theme}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-ink mb-4">
                Compétences identifiées :
              </h3>

              <ul className="space-y-3">
                {EXAMPLE_CHALLENGE.competences.map((comp, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      background: 'var(--glass)',
                      border: '1px solid var(--glass-border)'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></span>
                    <span className="text-ink">{comp}</span>
                  </motion.li>
                ))}
              </ul>

              {showHint && (
                <motion.div
                  className="mt-6 p-4 rounded-lg border border-pep-yellow/30"
                  style={{
                    background: 'rgba(255, 200, 87, 0.1)',
                    backdropFilter: 'blur(4px)'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-pep-yellow">
                    💡 <span className="font-semibold">Indice :</span>
                  </div>
                  <p className="text-ink-soft mt-2">
                    Ce métier est au cœur de l'accompagnement médico-social et travaille
                    en étroite collaboration avec les familles.
                  </p>
                </motion.div>
              )}
            </div>
          </GameCard>

          {/* Zone de choix */}
          <div className="glass-panel p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-ink mb-4 text-center">
              Choisissez le métier :
            </h3>

            <Choices
              choices={choicesData}
              onSelect={handleChoiceSelect}
              className="flex-1"
            />

            {/* Indicateur de progression */}
            <div className="mt-6 text-center">
              <div className="text-ink-soft text-sm mb-2">
                Progression du défi
              </div>
              <div className="w-full bg-glass rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: selectedChoice ? '100%' : '50%',
                    background: selectedChoice
                      ? 'linear-gradient(90deg, var(--pep-green), var(--accent))'
                      : 'linear-gradient(90deg, var(--pep-yellow), var(--ink-soft))'
                  }}
                />
              </div>
            </div>
          </div>
      </motion.div>

      {/* Controls de debug */}
      <div className="absolute top-4 right-4 flex gap-2">
        {onBack && (
          <button
            className="btn btn--ghost"
            onClick={onBack}
            style={{ padding: '0.5rem' }}
          >
            ← Retour
          </button>
        )}
        <button
          className="btn btn--ghost"
          onClick={() => setTimeRemaining(prev => Math.max(0, prev - 10))}
          style={{ padding: '0.5rem', fontSize: '0.75rem' }}
        >
          -10s
        </button>
        <button
          className="btn btn--accent"
          onClick={() => setScore(prev => prev + 50)}
          style={{ padding: '0.5rem', fontSize: '0.75rem' }}
        >
          +50pts
        </button>
      </div>
    </AppShell>
  );
}
