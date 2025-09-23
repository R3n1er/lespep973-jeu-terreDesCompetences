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
- **Tests**: Jest + Testing Library (unitaires/intégration), Playwright (E2E iPad paysage, PWA offline, UX).

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
  - Init Vite React+TS, Tailwind v4, ESLint/Prettier, Husky, Jest/RTL, Playwright.
  - Scripts npm: dev, build, preview, test, test:watch, lint, lint:fix, type-check, pre-commit.
- **PWA offline-first**
  - `manifest.webmanifest` (paysage), icônes, `theme_color`.
  - Service Worker Workbox: pré-cache shell, runtime caching, fallback offline.
  - Détection `online/offline` + pastille d’état en UI.
- **Données & types**
  - Types dans `src/types/*`.
  - Générer `src/data/metiers.ts` depuis la liste docs.
  - Esquisser `src/data/challenges.ts` pour les 2 formats.
- **Timer robuste**
  - `src/workers/timer.worker.ts` (tick ~20Hz, perf.now, reprise).
  - `useGameTimer` (API: start, pause, set, subscribe; alertes 30s/10s).
  - `TimerDisplay` (feedback couleur/animation).
- **Gameplay & écrans**
  - `StartScreen` (Lire les règles / Commencer), `GameScreen`, `EndScreen` (Nouvelle session, Export).
  - `ChallengeRenderer`, `CompetencesToMetier`, `MetierToCompetences`, `AnswerFeedback`, `ChallengeTransition`.
- **Rotation équipes**
  - `useTeamRotation` (2min30 + pause), synchronisé au timer.
  - UI: équipe active, suivante, progression.
- **Persistance & export**
  - `GameDataManager` (IndexedDB + localStorage), export JSON anonymisé.
- **UI/Styles iPad**
  - Safe areas, cibles 44×44, marges 24–32px, orientation verrouillée paysage.
- **Tests**
  - Unitaires: timer précision/rattrapage, rotation, scoring, mapping données.
  - Intégration: flux de jeu complet.
  - E2E Playwright: iPad paysage, PWA offline, interactions tactiles.

## 4) Roadmap (jalons)

- **J1–J2**: Setup outillage, PWA minimale, types de base, données métiers v1.
- **J3–J4**: Timer Worker + hook + UI, rotation équipes, écrans Start/End.
- **J5**: Défis v1 (2 types) + transitions/feedback, persistance locale.
- **J6**: Finitions UI iPad, a11y, animations, export résultats.
- **J7**: Tests unitaires/intégration/E2E, optimisations, documentation.

## 5) Risques & mitigations

- iPad PWA/Background Sync limité → dégradation: export local/sync manuel.
- Précision timer → Worker obligatoire + tolérance de dérive + tests.
- Quotas cache/offline → limiter assets, politique de purge SW.

## 6) Livrables initiaux (à créer)

- `src/workers/timer.worker.ts`
- `src/hooks/useGameTimer.ts`
- `src/components/screens/StartScreen.tsx`
- `src/components/screens/EndScreen.tsx`
- `src/components/game/ChallengeRenderer.tsx`
- `src/data/metiers.ts`, `src/data/challenges.ts`
- `src/types/*`
- `public/manifest.webmanifest`, `src/sw.ts`
- `tests/` (timer, rotation, défis)
