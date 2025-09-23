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
  - Service Worker Workbox: pré-cache shell, runtime caching, fallback offline. (À FAIRE: placeholder SW créé)
  - Détection `online/offline` + pastille d’état en UI. (À FAIRE)
- **Données & types**
  - Types dans `src/types/*`. (FAIT v1)
  - Générer `src/data/metiers.ts` depuis la liste docs. (FAIT v1 — à compléter)
  - Esquisser `src/data/challenges.ts` pour les 2 formats. (FAIT v1)
- **Timer robuste**
  - `src/workers/timer.worker.ts` (tick ~20Hz, perf.now, reprise). (FAIT v1)
  - `useGameTimer` (API: start, pause, set; alertes). (FAIT v1)
  - `TimerDisplay` + compte à rebours audio-visuel 5s. (À FAIRE)
  - Sons/vibration et fallback silencieux. (À FAIRE)
- **Gameplay & écrans**
  - `StartScreen`, `GameScreen`, `EndScreen`. (À FAIRE)
  - `ChallengeRenderer`, `CompetencesToMetier`, `MetierToCompetences`, `AnswerFeedback`, `ChallengeTransition`. (À FAIRE)
  - Boutons de validation manuelle et intermission 5s. (À FAIRE)
- **Rotation équipes**
  - `useTeamRotation` (2min30 + pause). (À FAIRE)
  - UI: équipe active/suivante. (À FAIRE)
- **Persistance & export**
  - `GameDataManager` (IndexedDB + localStorage), export JSON. (À FAIRE)
- **UI/Styles iPad**
  - Safe areas, cibles 44×44, marges, orientation paysage. (À FAIRE)
- **Tests**
  - Unitaires: timer, rotation, scoring, mapping données. (EN COURS ➜ smoke test OK)
  - Intégration: flux de jeu complet. (À FAIRE)
  - E2E Playwright: iPad paysage, PWA offline. (À FAIRE)

## 4) Roadmap (jalons)

- **J1–J2**: Setup outillage, PWA minimale, types de base, données métiers v1. [50%]
  - ✅ Scripts port 3000 / Vitest / ESLint / Type-check
  - ✅ Types `game.ts`, données v1 (`metiers.ts`, `challenges.ts`)
  - ✅ SW placeholder + manifest paysage
  - ⏳ Workbox + indicateur réseau + écrans de base
- **J3–J4**: Timer Worker + hook + UI, rotation équipes, écrans Start/End. [20%]
  - ✅ Worker + hook timer v1
  - ⏳ UI Timer + rotation + écrans
- **J5**: Défis v1 + transitions/feedback, persistance locale. [0%]
- **J6**: Finitions UI iPad, a11y, animations, export résultats. [0%]
- **J7**: Tests unitaires/intégration/E2E, optimisations, documentation. [10%]

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
