## Roadmap du projet — Terres de Compétences

Dernière mise à jour: 2025-09-23

### Rôle de ce document

- Source de vérité pour le suivi d’évolution (jalons, tâches, statut).
- À mettre à jour à chaque livraison majeure ou nouveau blocage.
- Convention: cases à cocher ✔ quand terminé, 🟡 en cours, 🟥 bloqué.

### Liens utiles

- README: `./README.md`
- PRD: `./docs/PRD.md`
- ADR: `./docs/ADR.md`
- Plan d’implémentation: `./docs/Implementation.md`
- Charte graphique: `./docs/CharteGraphique.md`
- Brief UI: `./docs/Brief_Graphisme.md`

### Synthèse état actuel

- Fondations techniques (React/Vite/TS/PWA/tests) ✔
- Gameplay fonctionnel (timer, rotation, défis, persistance) ✔
- UI actuelle = base shadcn mais non conforme au brief arcade glassmorphique 🟡
- Tests unitaires OK, Playwright à mettre en place 🟡

### Jalons 2025 – Refondre l’expérience iPad (Glassmorphisme « Poulolo UI Arcade »)

#### J6 — Mise à jour thème global & tokens (plein écran iPad) _(en cours)_

- [x] Étendre `src/styles/theme.css` avec les tokens ADPEP (palette, gradients, shadows, glass, fonts Exo2/Adventor).
- [x] Mettre à jour `tailwind.config` (+ `postcss.config` si besoin) pour exposer les variables (`brand`, `accent`, `glass`...).
- [x] Charger les polices (import CSS ou assets), définir la pile typographique globale.
- [x] Créer helpers CSS (`.app`, `.glass-panel`, `.chip`, animations countdown/pulse/confetti) selon le brief.
- [x] Vérifier lint/type/build.

#### J7 — AppShell & layout sans scroll (iPad paysage)

- [x] Introduire `AppShell` (fond halo + topbar HUD + footer) englobant Start/Game/End.
- [x] Gérer `safe-area`/`viewport-fit=cover`, `h-screen w-screen` sans scroll; breakpoints paysage.
- [x] Implémenter topbar HUD (logo, titre, timer global, score) en glassmorphisme.
- [x] Ajuster `App.tsx` pour intégrer `AppShell` + synchronisation theme dynamique (`GameState.currentTheme`).

#### J8 — Composants UI atomiques (glass/arcade)

- [ ] Refondre `Button`, `Card`, `Chip`, `Badge`, `Toast`, `TimerDisplay`, `StatsPanel`, `TeamRotationPanel` avec look arcade (ombres à étages, bordures épaisses, glow, min 44px).
  - ✅ `Button`, `Card`, `Chip`, `TimerDisplay`, `StatsPanel`, `TeamRotationPanel`
  - ⏳ `Badge`, `Toast`
- [ ] Ajouter états : hover/tap (Motion), disabled, focus (outline jaune).
- [ ] Centraliser variants (ex: `chipVariants`, `glassCardVariants`).

#### J9 — Écrans immersifs

- [ ] **StartScreen** : hero plein écran (logo masqué, CTA arcade, highlights rotation/mode tablette, splash optionnel).
- [ ] **GameScreen** : plateau board + choices glass, intégration icônes thématiques depuis `/public/icones`, timer barre, scoreboard, overlay countdown.
- [ ] **EndScreen** : écran célébration (confettis, badge de rang, CTA rejouer/export).
- [ ] Écran transition/pause (glass overlay) & raffiner `CountdownOverlay`.

#### J10 — Thématisation & finesse

- [ ] Mapping automatique thème défi (`theme--handicap` etc.) + pattern background.
- [ ] Animations finales (pulse carte active, glow chips, transitions Motion, respects `prefers-reduced-motion`).
- [ ] Tests ergonomie iPad (DevTools 1366×1024) : cibles ≥44px, typos ≥16px.

#### J11 — QA & Documentation finale

- [ ] Mettre à jour `docs/Implementation.md`, `docs/ADR.md`, `README.md` avec la refonte UI.
- [ ] Vérifications : `npm run lint`, `npm run type-check`, `npm run test`, `npm run build`.
- [ ] Configurer tests Playwright (viewport iPad, scénarios Start→Game→End, offline) et exécuter.
- [ ] Revue PWA (manifest, icons, caching) + capture pour communication.

### Backlog / Risques

- Chargement polices personnalisées (licences Exo2/Adventor) → fallback system si indisponible.
- Performances visuelles (glass + blur) sur iPad → surveiller via DevTools, prévoir mode réduit.
- Gestion thèmes multiples → vérifier cohérence caches SW et rechargements.

### Historique

- 2025-09-23 : Ajout jalons J6 → J11 pour refonte UI glassmorphisme.
