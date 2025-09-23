## Roadmap du projet — Terres de Compétences

Dernière mise à jour: 2025-09-23

### Rôle de ce document

- Source de vérité pour le suivi d’évolution et d’avancement (planning, jalons, tâches).
- À utiliser par l’équipe et les assistants IA pour reporter l’état (Done/In progress/Blocked).
- Mises à jour conseillées: à chaque étape majeure livrée ou blocage identifié.
- Convention: cocher les cases quand terminé, indiquer [Blocked] avec cause et action.

### Liens utiles

- README: `./README.md`
- PRD (Spécifications): `./docs/PRD.md`
- ADR (Décisions d’architecture): `./docs/ADR.md`
- Plan d’implémentation: `./docs/Implementation.md`
- Règles du jeu: `./docs/ReglesDuJeu.md`

### Jalons et suivi (Semaine J1 → J7)

#### J1–J2 — Fondations et offline minimal

- [ ] Initialiser Vite React + TypeScript, ESLint/Prettier, Husky, Vitest, Playwright _(Vite + React + TypeScript prêts ; outils qualité/tests à installer)_
- [x] Configurer Tailwind v4 (tokens, styles globaux)
- [ ] Ajouter PWA minimale: manifest (paysage), SW Workbox (shell pré-caché)
- [ ] Types de base dans `src/types/*`
- [ ] Données métiers v1 dans `src/data/metiers.ts`

#### J3–J4 — Timer + Rotation + Écrans de base

- [ ] `timer.worker.ts` (performance.now, tick ~20Hz, reprise)
- [ ] Hook `useGameTimer` (start/pause/set, alertes 30s/10s/5s, phase intermission)
- [ ] `StartScreen` (règles + commencer), `EndScreen` (récap + nouvelle session)
- [ ] `useTeamRotation` (2min30 + pause 15s) et intégration UI + compte à rebours audio-visuel 5s

#### J5 — Gameplay v1 et persistance

- [ ] `ChallengeRenderer` + défis (Compétences→Métier, Métier→Compétences)
- [ ] Transitions/feedback (Motion) et compteur sélection
- [ ] Boutons de validation manuelle (passage anticipé) + fallback auto à expiration
- [ ] `GameDataManager` (IndexedDB + localStorage) et export JSON

#### J6 — UI tablette, a11y et finitions

- [ ] Safe areas iPad, cibles 44×44, marges 24–32px
- [ ] Thèmes d’alertes (30s/10s), feedback sonore/vibration (si supportée)
- [ ] Optimisations performance (lazy, memo), bundle Vite

#### J7 — Tests et préparation déploiement

- [ ] Tests unitaires (timer, rotation, scoring, mapping données)
- [ ] Tests d’intégration (flux de jeu complet)
- [ ] E2E Playwright iPad paysage (PWA offline)
- [ ] Vérifs déploiement (Vercel, CSP), documentation finale

### Tâches ouvertes / Backlog

- [ ] Générer dataset `src/data/challenges.ts` à partir des métiers/compétences
- [ ] Mesure d’accessibilité (a11y) et correctifs ciblés
- [ ] Mode export/print des résultats (PDF optionnel)

### Historique (résumé)

- 2025-09-23: Création initiale de la roadmap (jalons J1→J7)
