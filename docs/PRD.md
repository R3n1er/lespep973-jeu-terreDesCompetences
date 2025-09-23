# PRD - Jeu "Terres de Compétences" ADPEP GUYANE

## Vue d'ensemble du projet

### Contexte métier

L'Association Départementale des Pupilles de l'Enseignement Public de Guyane (ADPEP GUYANE) est une association loi 1901 œuvrant dans le secteur médico-social pour l'accompagnement des jeunes enfants en situation de handicap. L'association gère diverses structures : CAMSP, CMPP, SESSAD, IEM, SAMES, SAPHADE.

Dans le cadre de la journée institutionnelle 2025, l'association souhaite développer un jeu interactif numérique permettant aux 13 groupes de collaborateurs de découvrir la richesse et la diversité des métiers exercés au sein de l'association.

### Objectif principal

Créer une application web interactive permettant aux équipes de découvrir les 15 métiers représentatifs de l'ADPEP GUYANE à travers un jeu d'association entre compétences professionnelles et métiers correspondants.

## Spécifications techniques

### Stack technologique moderne (2025)

#### Frontend Core

- **React 19.1.0** : Framework UI avec Server Components, Actions, useActionState
- **TypeScript 5.6+** : Typage statique pour la robustesse du code
- **Vite 7.0** : Build tool avec Rolldown bundler (dev/preview sur port 3000)
- **Node.js 20.19+/22.12+** : Runtime JavaScript moderne

#### Styling et UI

- **Tailwind CSS v4.0** : Framework CSS utility-first avec engine haute performance
- **Shadcn/ui** : Bibliothèque de composants avec CLI 3.0 et support React 19
- **CSS Cascade Layers** : Organisation des styles avec @layer
- **Responsive Design** : Interface adaptable tablette/desktop

#### Animations et interactions

- **Motion 12.23.18** : Bibliothèque d'animations React (ex-Framer Motion)
- **Gestures API** : Support des interactions tactiles et souris
- **Layout Animations** : Transitions fluides entre les états

#### État et données

- **React Hooks** : useState, useEffect, useReducer, useContext
- **Custom Hooks** : Logique métier réutilisable
- **Local Storage** : Persistance des scores et progressions
- **Context API** : Gestion d'état globale

#### Développement et qualité

- **ESLint + Prettier** : Linting et formatage automatique
- **Husky** : Git hooks pour la qualité du code
- **Vitest + Testing Library** : Tests unitaires et d'intégration
- **Storybook** : Documentation interactive des composants

#### Mode hors-ligne (Offline-first)

- **PWA + Service Worker (Workbox)** : pré-cache du shell applicatif (HTML/CSS/JS), routes de repli hors-ligne, stratégie cache-first pour le shell et stale-while-revalidate pour les assets.
- **Persistance locale** : IndexedDB (via `idb`) pour les données de sessions et scores. `localStorage` réservé aux états légers (timer, drapeaux d'alerte) avec sérialisation robuste.
- **Synchronisation différée** : file d'actions hors-ligne + Background Sync (si supporté) pour envoyer les exports/statistiques à la reconnexion.
- **Détection réseau** : indicateur UI (On/Off) et écouteurs `online`/`offline` pour adapter les feedbacks sans interrompre la partie.
- **iOS/iPad PWA** : tenir compte des limites (quota stockage, mise en veille agressive). Dégradations élégantes prévues si Background Sync indisponible.

## Architecture de l'application

### Structure des composants React

#### Composants racine

```typescript
// App.tsx - Composant racine
interface AppProps {
  gameConfig: GameConfiguration;
  participants: TeamMember[];
}

// GameProvider.tsx - Context global du jeu
interface GameContextType {
  currentTeam: Team;
  gameState: GameState;
  score: ScoreData;
  metrics: GameMetrics;
  actions: GameActions;
}
```

#### Composants de jeu principal

```typescript
// GameContainer.tsx - Container principal du jeu
interface GameContainerProps {
  maxDuration: number;
  teamsRotation: RotationConfig;
}

// GameBoard.tsx - Plateau de jeu interactif
interface GameBoardProps {
  challenge: Challenge;
  onAnswer: (answer: Answer) => void;
  timeRemaining: number;
}

// TimerComponent.tsx - Gestion du temps
interface TimerProps {
  duration: number;
  onTimeout: () => void;
  onWarning: (remaining: number) => void;
}
```

#### Composants de défis

```typescript
// ChallengeRenderer.tsx - Affichage des défis
interface ChallengeProps {
  type: "competences-to-metier" | "metier-to-competences";
  data: ChallengeData;
  onSubmit: (response: UserResponse) => void;
}

// CompetenceCard.tsx - Carte de compétence interactive
interface CompetenceCardProps {
  competence: Competence;
  isSelected: boolean;
  isCorrect?: boolean;
  onSelect: (id: string) => void;
}

// MetierCard.tsx - Carte de métier
interface MetierCardProps {
  metier: JobProfile;
  isTarget: boolean;
  onSelect: () => void;
}
```

### Modèles de données TypeScript

#### Types métier

```typescript
interface JobProfile {
  id: string;
  nom: string;
  description: string;
  secteur:
    | "administratif"
    | "paramédical"
    | "pédagogique"
    | "social"
    | "général";
  competences: Competence[];
}

interface Competence {
  id: string;
  libelle: string;
  type: "spécifique" | "transversale" | "comportementale";
  description?: string;
}

interface Team {
  id: string;
  nom: string;
  membres: TeamMember[];
  currentPlayer?: string;
}

interface TeamMember {
  id: string;
  nom: string;
  service: string;
  isCapitain?: boolean;
}
```

#### Types de jeu

```typescript
interface GameConfiguration {
  duration: number; // 10 minutes
  teamsCount: number; // 13 équipes
  rotationTime: number; // 2min30 par équipe
  challengesPerRound: number;
  difficultyProgression: boolean;
}

interface Challenge {
  id: string;
  type: ChallengeType;
  difficulty: "facile" | "moyen" | "difficile";
  question: string;
  options: Option[];
  correctAnswers: string[];
  points: number;
  timeLimit?: number;
}

interface UserResponse {
  challengeId: string;
  selectedOptions: string[];
  timeSpent: number;
  teamId: string;
}

interface ScoreData {
  teamScores: Map<string, number>;
  globalScore: number;
  correctAnswers: number;
  totalChallenges: number;
  averageTime: number;
}
```

#### États du jeu

```typescript
interface GameState {
  phase: "setup" | "playing" | "rotation" | "finished" | "bonus";
  currentTeam: Team | null;
  currentChallenge: Challenge | null;
  timeRemaining: number;
  challengeIndex: number;
  rotationTimer: number;
}

interface GameMetrics {
  startTime: Date;
  endTime?: Date;
  teamPerformances: TeamPerformance[];
  challengeStatistics: ChallengeStats[];
}
```

## Fonctionnalités principales

### Écrans d’accueil et fin de jeu

- **Écran d’accueil** (au lancement):
  - Bouton « Lire les règles »: ouvre un écran/modal présentant `ReglesDuJeu.md` (affichage embarqué, offline).
  - Bouton « Commencer le jeu »: initialise la session (équipes, timer, premier défi), vérifie l’état réseau et indique le mode hors-ligne si applicable.
  - Indicateur réseau: pastille On/Off avec info-bulle « Hors-ligne: vos scores seront sauvegardés localement ».
- **Écran de fin de jeu**:
  - Récapitulatif: pourcentage de bonnes associations, score global, temps total.
  - Actions: « Nouvelle session » (réinitialise proprement l’état), « Voir les règles », éventuellement « Exporter les résultats » (JSON) en local si offline.

### Timer synchronisé et robuste

- **Phases**: alternance dynamique `team[n] → intermission → team[n+1]` générée en fonction du nombre d’équipes configuré (1 à 13), puis `finished`.
- **Durées**:
  - Temps par équipe: 2 min 30 s (150 000 ms), alertes à T−30 s, T−10 s et déclenchement d’un compte à rebours spécial à T−5 s.
  - Intermission: 15–20 s configurable (par défaut: 15 000 ms) utilisée pour les transitions d’équipe et la préparation du défi suivant.
- **Précision**:
  - Calcul deltas avec `performance.now()` (monotone) plutôt que `Date.now()`.
  - Rendu des updates via `requestAnimationFrame` côté UI pour un affichage fluide.
  - Tick logique dans un Web Worker pour éviter les blocages du thread principal (postMessage ≈ 10–20 Hz, calcul local précis).
- **Rattrapage d’interruption**:
  - Sauvegarde de `timeRemaining`, `phase`, `currentTeam`, `lastUpdate` toutes les 1 s et sur `visibilitychange`/`pagehide`.
  - À la reprise: recalcul du temps écoulé en comparant `performance.now()` courant au `lastUpdate` sauvegardé; si l’onglet a été fermé, reprise à l’identique depuis l’instant snapshot.
  - Stratégie de tolérance: si dérive > 1 s détectée, correction lissée (clamp) pour éviter un saut brutal à l’écran.
- **Alertes visuelles/sonores**:
  - À 30 s: transition progressive de thème (accent → orange/rouge), badge « 30 s ».
  - À 10 s: animation de clignotement et son court; vibration si `navigator.vibrate` disponible (dégradé silencieux sinon).
  - À 5 s: déclenchement d’un compte à rebours visuel pleine largeur synchronisé avec un bip par seconde et un signal distinct à 0, utilisé aussi bien en phase de défi qu’en intermission entre deux questions.
- **Persistance**:
  - État léger (timer/alertes): `localStorage` avec clé namespacée.
  - État de session complet (équipes, réponses, scores): `IndexedDB`.

#### Structure de données du timer

```typescript
interface GameTimer {
  phase: "team" | "intermission" | "finished";
  timeRemaining: number; // en millisecondes
  isRunning: boolean;
  lastUpdate: number; // performance.now()
  currentTeamIndex: number; // 0..teams.length-1
  alerts: {
    thirtySeconds: boolean;
    tenSeconds: boolean;
    fiveSeconds: boolean;
  };
  countdownMode: "none" | "visual" | "audio-visual";
}
```

#### Réponses aux questions techniques

- **Timer précis – affichage**: `requestAnimationFrame` pour synchro avec le rafraîchissement, pas de setInterval pour l’UI.
- **Timer précis – calcul**: Web Worker dédié qui tient l’horloge (basée sur `performance.now()`), envoie des ticks; le main thread met à jour l’affichage.
- **Synchronisation**: le worker publie `timeRemaining` et `phase`; côté UI, on dérive les alertes et l’habillage visuel.
- **Rattrapage d’interruption**: snapshot sérialisé chaque seconde et à chaque changement de visibilité; reprise idempotente même après crash.
- **Reset manuel**: action « Nouvelle session » force un nettoyage de l’état (localStorage + IndexedDB) pour éviter les corruptions persistées.
- **Alertes visuelles**: changement de couleur à 30 s, clignotement à 10 s, compte à rebours plein écran + audio sur les 5 dernières secondes avant passage au défi suivant.

```typescript
// Esquisse de worker (timer.worker.ts)
let last = performance.now();
let remaining = 150000; // exemple
let running = false;

self.onmessage = (e) => {
  const { type, payload } = e.data;
  if (type === "START") {
    running = true;
    last = performance.now();
  }
  if (type === "PAUSE") {
    running = false;
  }
  if (type === "SET") {
    remaining = payload.remaining;
  }
};

function tick() {
  const now = performance.now();
  if (running) {
    const delta = now - last;
    remaining = Math.max(0, remaining - delta);
    (self as any).postMessage({ type: "TICK", remaining });
  }
  last = now;
  setTimeout(tick, 50); // ~20 Hz logique
}
tick();
```

### 1. Système de défi interactif

#### Défi type 1 : Compétences → Métier

```typescript
function CompetencesToMetierChallenge({ challenge, onAnswer }: ChallengeProps) {
  const [selectedMetier, setSelectedMetier] = useState<string>("");

  return (
    <motion.div
      className="challenge-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CompetencesList competences={challenge.competences} />
      <MetierGrid
        metiers={challenge.options}
        onSelect={setSelectedMetier}
        selected={selectedMetier}
      />
      <SubmitButton
        disabled={!selectedMetier}
        onClick={() => onAnswer({ selectedMetier })}
      />
    </motion.div>
  );
}
```

- Le bouton de soumission est disponible en permanence et permet de valider la réponse pour passer immédiatement au défi suivant.
- Si la validation n’est pas déclenchée manuellement, le compte à rebours standard continue et le passage se fait automatiquement lorsque le temps est écoulé.

#### Défi type 2 : Métier → Compétences

```typescript
function MetierToCompetencesChallenge({ challenge, onAnswer }: ChallengeProps) {
  const [selectedCompetences, setSelectedCompetences] = useState<Set<string>>(
    new Set()
  );

  return (
    <motion.div className="challenge-container">
      <MetierDisplay metier={challenge.metier} />
      <CompetencesGrid
        competences={challenge.options}
        selectedIds={selectedCompetences}
        onToggle={toggleCompetence}
        maxSelection={6}
      />
      <ValidationPanel
        selection={selectedCompetences}
        onSubmit={() =>
          onAnswer({ competences: Array.from(selectedCompetences) })
        }
      />
    </motion.div>
  );
}
```

- Le panneau de validation affiche l’état de complétion (0/6 → 6/6) et reste activable même avant la limite des 6 choix pour permettre une réponse partielle.
- À l’envoi, le système déclenche la transition vers le décompte intermission de 5 secondes avec feedback sonore/visuel.

### 2. Gestion des équipes et rotation

#### Système de rotation automatique

```typescript
function useTeamRotation(teams: Team[], rotationTime: number) {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [rotationTimer, setRotationTimer] = useState(rotationTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationTimer((prev) => {
        if (prev <= 1) {
          setCurrentTeamIndex((idx) => (idx + 1) % teams.length);
          return rotationTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [teams.length, rotationTime]);

  return {
    currentTeam: teams[currentTeamIndex],
    rotationTimer,
    nextTeam: () => setCurrentTeamIndex((idx) => (idx + 1) % teams.length),
  };
}
```

### 3. Système de scoring et feedback

#### Calcul des scores

```typescript
class ScoreCalculator {
  static calculateChallengeScore(
    response: UserResponse,
    challenge: Challenge,
    timeSpent: number
  ): ScoreResult {
    const correctAnswers = response.selectedOptions.filter((option) =>
      challenge.correctAnswers.includes(option)
    ).length;

    const accuracy = correctAnswers / challenge.correctAnswers.length;
    const timeBonus = Math.max(
      0,
      (challenge.timeLimit - timeSpent) / challenge.timeLimit
    );
    const basePoints = challenge.points * accuracy;
    const bonusPoints = basePoints * timeBonus * 0.2;

    return {
      basePoints,
      bonusPoints,
      totalPoints: basePoints + bonusPoints,
      accuracy,
      feedback: this.generateFeedback(accuracy),
    };
  }

  static generateFeedback(accuracy: number): string {
    if (accuracy >= 0.9)
      return "Excellent ! Vous maîtrisez parfaitement ces métiers.";
    if (accuracy >= 0.7)
      return "Très bien ! Belle connaissance de nos activités.";
    if (accuracy >= 0.5)
      return "Bien joué ! Continuez à découvrir nos métiers.";
    return "Découverte en cours ! Chaque métier apporte sa richesse.";
  }
}
```

### 4. Interface responsive et accessible

#### Composants UI optimisés tablette

```typescript
function TabletOptimizedInterface() {
  const { isMobile, isTablet } = useResponsiveDesign();

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-blue-50 to-green-50",
        "p-4 md:p-6 lg:p-8",
        isTablet && "touch-manipulation select-none"
      )}
    >
      <GameHeader />
      <main className="container mx-auto max-w-6xl">
        <TeamRotationDisplay />
        <GameContent />
        <ScorePanel />
      </main>
      <GameFooter />
    </div>
  );
}
```

#### Gestion des interactions tactiles

```typescript
function useTouchOptimization() {
  return {
    buttonProps: {
      className: "min-h-[44px] min-w-[44px] touch-none",
      onTouchStart: preventBounce,
      onTouchEnd: handleTouchFeedback,
    },
    cardProps: {
      whileTap: { scale: 0.98 },
      whileHover: { scale: 1.02 },
      transition: { type: "spring", stiffness: 300 },
    },
  };
}
```

#### Contraintes d’écran iPad (paysage)

- **Résolutions cibles**:
  - iPad Air: 1366×1024
  - iPad Pro: 1640×1200
- **Orientation**: PWA manifest `"orientation": "landscape"`; éviter les rotations accidentelles via layout qui degrade en portrait (écran de verrouillage demandant de pivoter).
- **Zone utile**: utiliser `viewport-fit=cover` et variables `env(safe-area-inset-*)` pour éviter le home indicator et les bords; marges internes min 24–32 px.
- **Multitâche**: conserver une grille fluide jusqu’à 75 % de largeur; pas d’éléments critiques au ras des bords.
- **Cibles tactiles**: min 44×44 px; espacement 8–12 px.

### 5. Animations et transitions fluides

#### Transitions entre challenges

```typescript
function ChallengeTransition({ children, challengeKey }: TransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={challengeKey}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

#### Feedback visuel des réponses

```typescript
function AnswerFeedback({ isCorrect, onComplete }: FeedbackProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onAnimationComplete={onComplete}
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50",
        "bg-black/20 backdrop-blur-sm"
      )}
    >
      <motion.div
        className={cn(
          "bg-white rounded-2xl p-8 shadow-2xl",
          isCorrect ? "border-green-500" : "border-orange-500"
        )}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" }}
      >
        <FeedbackContent isCorrect={isCorrect} />
      </motion.div>
    </motion.div>
  );
}
```

## Système de données

### Structure des données métiers

```typescript
// data/metiers.ts
export const METIERS_ADPEP: JobProfile[] = [
  {
    id: "agent-service-interieur",
    nom: "Agent/Agente de service intérieur",
    secteur: "général",
    competences: [
      {
        id: "entretien-locaux",
        libelle: "Assurer l'entretien des locaux",
        type: "spécifique",
      },
      {
        id: "protocoles-hygiene",
        libelle: "Appliquer les protocoles d'hygiène et sécurité",
        type: "spécifique",
      },
      // ... autres compétences
    ],
  },
  // ... autres métiers
];

// data/challenges.ts
export const CHALLENGES_CONFIGURATION: Challenge[] = [
  {
    id: "challenge-1",
    type: "competences-to-metier",
    difficulty: "facile",
    question: "À quel métier correspondent ces compétences ?",
    competences: [
      "entretien-locaux",
      "protocoles-hygiene",
      "utilisation-equipements",
    ],
    options: [
      "agent-service-interieur",
      "aide-soignant",
      "educateur-specialise",
    ],
    correctAnswers: ["agent-service-interieur"],
    points: 100,
  },
  // ... autres challenges
];
```

### Gestion de la persistance

```typescript
class GameDataManager {
  private static STORAGE_KEYS = {
    GAME_STATE: "adpep-game-state",
    SCORES: "adpep-scores",
    TEAM_PROGRESS: "adpep-team-progress",
  } as const;

  static saveGameState(state: GameState): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.GAME_STATE, JSON.stringify(state));
    } catch (error) {
      console.warn("Impossible de sauvegarder l'état du jeu:", error);
    }
  }

  static loadGameState(): GameState | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.GAME_STATE);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn("Impossible de charger l'état du jeu:", error);
      return null;
    }
  }

  static exportResults(): ExportData {
    return {
      gameSession: {
        date: new Date().toISOString(),
        duration: this.getGameDuration(),
        participants: this.getParticipantsData(),
      },
      teamResults: this.getTeamResults(),
      globalStats: this.getGlobalStatistics(),
    };
  }
}
```

## Performance et optimisation

### Optimisations React 19

```typescript
// Utilisation des Server Components pour le contenu statique
function GameInstructions() {
  // Server Component - pas de JavaScript côté client
  return (
    <div className="instructions-container">
      <h2>Règles du jeu</h2>
      <InstructionsList />
    </div>
  );
}

// Actions pour les mutations de données
function useGameActions() {
  const [isPending, startTransition] = useTransition();

  const submitAnswer = useActionState(async (prevState, formData: FormData) => {
    const response = await processAnswer(formData);
    return response;
  }, null);

  return { submitAnswer, isPending };
}
```

### Optimisations de performance

```typescript
// Lazy loading des composants
const ChallengeRenderer = lazy(() => import("./ChallengeRenderer"));
const ScorePanel = lazy(() => import("./ScorePanel"));
const ResultsExport = lazy(() => import("./ResultsExport"));

// Memoization des calculs coûteux
const memoizedScore = useMemo(
  () => calculateTeamScore(responses, challenges),
  [responses, challenges]
);

// Debouncing des interactions
const debouncedSelect = useDeferredValue(selectedOption);
```

### Bundle optimization avec Vite 7.0

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "baseline-widely-available",
    rollupOptions: {
      output: {
        manualChunks: {
          "game-engine": ["./src/game/engine"],
          "ui-components": ["./src/components"],
          "data-models": ["./src/data"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["motion", "@radix-ui/react-dialog"],
  },
});
```

## Tests et qualité

### Suite de tests

```typescript
// __tests__/GameEngine.test.tsx
describe("GameEngine", () => {
  test("should calculate correct scores", () => {
    const response = createMockResponse();
    const challenge = createMockChallenge();

    const score = ScoreCalculator.calculateChallengeScore(
      response,
      challenge,
      30
    );

    expect(score.totalPoints).toBeGreaterThan(0);
    expect(score.accuracy).toBeLessThanOrEqual(1);
  });

  test("should handle team rotation correctly", () => {
    render(<GameContainer teams={mockTeams} />);

    act(() => {
      fireEvent.click(screen.getByText("Équipe suivante"));
    });

    expect(screen.getByText("Équipe 2")).toBeInTheDocument();
  });
});

// __tests__/integration/GameFlow.test.tsx
describe("Game Flow Integration", () => {
  test("complete game session", async () => {
    const { user } = renderWithProviders(<App />);

    // Démarrer le jeu
    await user.click(screen.getByText("Commencer le jeu"));

    // Répondre aux challenges
    for (let i = 0; i < 3; i++) {
      await answerChallenge(user);
      await waitForElementToBeRemoved(screen.queryByText("Chargement..."));
    }

    // Vérifier les résultats
    expect(screen.getByText(/Score final:/)).toBeInTheDocument();
  });
});
```

### Configuration ESLint et Prettier

```json
// .eslintrc.json
{
  "extends": [
    "@next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:a11y/recommended"
  ],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## Déploiement et infrastructure

### Configuration Vercel

```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Scripts de build et déploiement

```json
// package.json scripts (synchronisés)
{
  "scripts": {
    "dev": "vite --port 3000 --strictPort",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 3000 --strictPort",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "pre-commit": "npm run lint && npm run type-check && npm run test"
  }
}
```

## Sécurité et conformité

### Conformité RGPD

```typescript
interface DataCollectionConfig {
  collectPersonalData: false; // Pas de données personnelles stockées
  sessionData: "local-only"; // Données de session uniquement locales
  exportFormat: "anonymous"; // Export anonymisé des résultats
}

class PrivacyManager {
  static clearAllData(): void {
    localStorage.removeItem("adpep-game-state");
    localStorage.removeItem("adpep-scores");
    localStorage.removeItem("adpep-team-progress");
  }

  static getDataSummary(): DataSummary {
    return {
      type: "game-session",
      storage: "local-browser-only",
      retention: "session-only",
      personalData: false,
    };
  }
}
```

### Sécurité web

```typescript
// Content Security Policy
const cspDirectives = {
  "default-src": "'self'",
  "script-src": "'self' 'unsafe-inline'",
  "style-src": "'self' 'unsafe-inline'",
  "img-src": "'self' data:",
  "connect-src": "'self'",
  "font-src": "'self'",
};
```

## Métriques et analytics

### Métriques de jeu

```typescript
interface GameAnalytics {
  sessionMetrics: {
    totalDuration: number;
    averageResponseTime: number;
    completionRate: number;
    userSatisfaction: number;
  };
  challengeMetrics: {
    difficulty: Record<string, number>;
    successRate: Record<string, number>;
    averageAttempts: Record<string, number>;
  };
  teamMetrics: {
    collaboration: number;
    engagement: number;
    knowledgeGain: number;
  };
}

class AnalyticsCollector {
  static trackEvent(event: GameEvent): void {
    // Analytics locales uniquement - pas de tracking externe
    const metrics = this.getSessionMetrics();
    metrics.events.push({
      ...event,
      timestamp: Date.now(),
    });
    this.saveMetrics(metrics);
  }

  static generateReport(): AnalyticsReport {
    return {
      summary: this.calculateSummaryStats(),
      teamPerformances: this.getTeamAnalytics(),
      recommendations: this.generateRecommendations(),
    };
  }
}
```

## Maintenance et évolution

### Extensibilité

```typescript
// Plugin system pour ajouter de nouveaux types de défis
interface ChallengePlugin {
  type: string;
  component: React.ComponentType<ChallengeProps>;
  validator: (response: UserResponse) => boolean;
  scoreCalculator: (response: UserResponse) => ScoreResult;
}

class GameEngine {
  private plugins = new Map<string, ChallengePlugin>();

  registerPlugin(plugin: ChallengePlugin): void {
    this.plugins.set(plugin.type, plugin);
  }

  renderChallenge(challenge: Challenge): React.ReactNode {
    const plugin = this.plugins.get(challenge.type);
    if (!plugin) {
      throw new Error(`Plugin non trouvé pour le type: ${challenge.type}`);
    }

    return React.createElement(plugin.component, { challenge });
  }
}
```

### Monitoring et logging

```typescript
class GameLogger {
  static logError(error: Error, context: GameContext): void {
    const logEntry = {
      level: "error",
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.error("[Game Error]", logEntry);
    // En production, envoyer vers un service de logging
  }

  static logPerformance(metric: PerformanceMetric): void {
    const entry = {
      type: metric.type,
      value: metric.value,
      timestamp: performance.now(),
    };

    console.debug("[Performance]", entry);
  }
}
```

## Planning de développement

Note: le suivi opérationnel et l'état d'avancement sont tenus dans `../ROADMAP.md`.

### Phase 1 : Fondations (Semaine 1-2)

- Configuration de l'environnement de développement
- Architecture des composants de base
- Système de données des métiers et compétences
- Interface utilisateur responsive

### Phase 2 : Logique de jeu (Semaine 3-4)

- Implémentation des types de défis
- Système de rotation des équipes
- Calcul des scores et feedback
- Gestion du timing et des transitions

### Phase 3 : UX/UI et animations (Semaine 5)

- Animations avec Motion
- Optimisation des interactions tactiles
- Feedback visuel et sonore
- Tests d'ergonomie

### Phase 4 : Tests et déploiement (Semaine 6)

- Tests unitaires et d'intégration
- Tests sur différents appareils
- Optimisation des performances
- Déploiement et documentation

## Conclusion

Ce PRD définit une application web moderne et robuste pour le jeu "Terres de Compétences" de l'ADPEP GUYANE. L'utilisation des dernières technologies React 19, Vite 7.0, Tailwind v4, et Motion garantit une expérience utilisateur fluide et engageante tout en respectant les contraintes de sécurité et de conformité RGPD du secteur médico-social.

L'architecture modulaire permet une maintenance aisée et une extensibilité future, tandis que l'approche responsive assure une utilisation optimale sur tablettes lors de la journée institutionnelle 2025.
