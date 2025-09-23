# Plan d’implémentation et Roadmap

Date: 2025-09-23

Références: `README.md`, `docs/PRD.md`, `docs/ADR.md`, `docs/ReglesDuJeu.md`, `docs/ListeDesMetiersEtCompetences.md`

## 1) Audit rapide — éléments manquants pour démarrer le code

- **Bootstrap projet**: Vite React + TypeScript, `tsconfig.json`, `vite.config.ts`, `package.json` (scripts), `eslint` + `prettier`, `husky`.
- **Tailwind v4**: `tailwind.config.ts`, `postcss.config.js`, styles globaux, tokens (thème ADPEP).
- **PWA offline-first**: `manifest.webmanifest` (orientation paysage), Service Worker (Workbox), stratégies de cache, fallback offline, indicateur réseau UI, `vercel.json` (headers CSP).
- **Données**: `src/data/metiers.ts` (à partir de `docs/ListeDesMetiersEtCompetences.md`), `src/data/challenges.ts` (deux types de défis).
- **Types TS**: `src/types/` (JobProfile, Competence, Challenge, GameState, GameTimer, Score, etc.).
- **Timer robuste**: `src/workers/timer.worker.ts` (perf.now + rattrapage) et hook `src/hooks/useGameTimer.ts` (start/pause/set, alertes 30s/10s, persistance locale).
- **Écrans/Flux**: `StartScreen`, `GameScreen`, `EndScreen`, `RulesScreen` (ou modal), `TransitionScreen`.
- **Composants de défi**: `CompetencesToMetier`, `MetierToCompetences`, `ChallengeRenderer`, `AnswerFeedback`, `ChallengeTransition` (Motion).
- **Équipes/Rotation**: hook `useTeamRotation` (2min30 + pause 15s), intégration timer.
- **Persistance**: `GameDataManager` (IndexedDB via `idb` + localStorage), export JSON.
- **Tests**: Vitest + Testing Library (unitaires/intégration), Playwright (E2E iPad paysage, PWA offline, UX).

## 2) Structure de dossiers proposée

```
src/
  components/
    game/
    ui/
    screens/
  data/
  hooks/
  lib/
  styles/
  types/
public/
```

## 3) Tâches d’implémentation (détail)

- **Outillage & qualité**
  - Init Vite React+TS, Tailwind v4, ESLint/Prettier, Husky, Vitest/RTL, Playwright. (EN COURS ➜ base faite)
  - Scripts npm: dev (port 3000 strict), build, preview (3000), test, test:watch, lint, lint:fix, type-check, pre-commit. (FAIT)
- **PWA offline-first**
  - `manifest.webmanifest` (paysage), icônes, `theme_color`. (FAIT v1)
  - Service Worker Workbox: pré-cache shell, runtime caching, fallback offline. (FAIT v1 injectManifest)
  - Détection `online/offline` + pastille d’état en UI. (FAIT `OfflineIndicator` + hook)
- **Données & types**
  - Types dans `src/types/*`. (FAIT v1)
  - Générer `src/data/metiers.ts` depuis la liste docs. (FAIT v1 — à compléter)
  - Esquisser `src/data/challenges.ts` pour les 2 formats. (FAIT v1)
- **Timer robuste**
  - `src/workers/timer.worker.ts` (tick ~20Hz, perf.now, reprise). (FAIT v1)
  - `useGameTimer` (API: start, pause, set; alertes). (FAIT v1 avec countdownMode)
  - `TimerDisplay` + compte à rebours audio-visuel 5s. (FAIT v1 — audio MP3 à fournir, animation couleur + pulsation/vibration à réaliser)
  - Sons/vibration et fallback silencieux. (En cours: audio stub)
- **Gameplay & écrans**
  - `StartScreen`, `GameScreen`, `EndScreen`. (FAIT v1 — flux minimal)
  - `ChallengeRenderer`, `CompetencesToMetier`, `MetierToCompetences`, `AnswerFeedback`, `ChallengeTransition`, `StatsPanel`. (FAIT v1 pour 2 défis + feedback détaillé)
  - Boutons de validation manuelle et intermission 5s. (FAIT — feedback scoring partiel)
- **Rotation équipes**
  - `useTeamRotation` (2min30 + pause). (FAIT v1 — intégration GameScreen)
  - UI: équipe active/suivante. (FAIT v1
  - Tests unitaires rotation. (FAIT vitest)
- **Persistance & export**
  - `GameDataManager` (IndexedDB + localStorage + export JSON). (FAIT)
- **UI/Styles iPad**
  - Safe areas, cibles 44×44, marges, orientation paysage. (À FAIRE)
  - Icônes: **Lucide Icons (lucide-react)** pour une cohérence visuelle et accessibilité. (À FAIRE)
- **Tests**
  - Unitaires: timer, rotation, scoring, mapping données. (EN COURS ➜ timer/rotation/scoring/défis ok)
  - Intégration: flux de jeu complet. (En cours: start→game)
  - E2E Playwright: iPad paysage, PWA offline. (À FAIRE)

## 4) Roadmap (jalons)

- **J1–J2**: Setup outillage, PWA minimale, types de base, données métiers v1. [60%]
  - ✅ Scripts port 3000 / Vitest / ESLint / Type-check
  - ✅ Types `game.ts`, données v1 (`metiers.ts`, `challenges.ts`, `teams.ts`)
  - ✅ SW placeholder + manifest paysage
  - ✅ Timer worker + hook + TimerDisplay + CountdownOverlay
  - ⏳ Workbox + indicateur réseau + écrans définitifs
- **J3–J4**: Timer Worker + hook + UI, rotation équipes, écrans Start/End. [70%]
  - ✅ Worker + hook timer v1 + overlay
  - ✅ Rotation équipes (`useTeamRotation` + panel)
  - ✅ Écrans Start/Game/End (flux minimal)
  - ⏳ UI dédiée (intermission 5s animée, transitions Motion)
- **J5**: Défis v1 + transitions/feedback, persistance locale. [90%]
  - ✅ ChallengeRenderer + type 1 + type 2 + feedback détaillé/stats
  - ✅ Persistance GameContext (IndexedDB + localStorage + queue offline + export JSON)
  - ⏳ Animation timer 5s (couleurs, pulsation, vibration)
- **J6**: Finitions UI iPad, a11y, animations, export résultats. [0%]
- **J7**: Tests unitaires/intégration/E2E, optimisations, documentation. [30%]
  - ✅ Tests unitaires timer + rotation + scoring + défis
  - ⏳ Tests intégration (défi complet) + E2E iPad + offline

## 5) Risques & mitigations

- iPad PWA/Background Sync limité → dégradation: export local/sync manuel.
- Précision timer → Worker obligatoire + tolérance de dérive + tests.
- Quotas cache/offline → limiter assets, politique de purge SW.

## 6) Livrables initiaux (à créer)

- `src/workers/timer.worker.ts` (créé)
- `src/hooks/useGameTimer.ts` (créé)
- `src/components/screens/StartScreen.tsx` (à créer)
- `src/components/screens/EndScreen.tsx` (à créer)
- `src/components/game/ChallengeRenderer.tsx` (à créer)
- `src/components/game/CountdownOverlay.tsx` (à créer)
- `src/data/metiers.ts`, `src/data/challenges.ts` (créés v1)
- `src/types/*` (créé `game.ts`)
- `public/manifest.webmanifest`, `src/sw.ts` (créés v1)
- `tests/` (smoke test OK; à compléter)
