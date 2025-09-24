# ADR-001 — Architecture du jeu « Terres de Compétences »

Statut: Acceptée

Date: 2025-09-23

## Contexte

- L’application sera utilisée lors d’un évènement avec risque de coupures réseau.
- L’expérience cible une tablette iPad en orientation paysage, avec sessions courtes et rotations d’équipes.
- Le jeu doit rester fluide, accessible et exploiter des technologies modernes 2025.

Références:

- Guide général et présentation: `README.md`
- Spécifications produit détaillées: `docs/PRD.md`
- Règles affichées aux utilisateurs: `docs/ReglesDuJeu.md`
- Contenus métiers et compétences: `docs/ListeDesMetiersEtCompetences.md`

## Décisions

### 1) Stack Frontend et UI

- React 19.1 + TypeScript 5.6 + Vite 7 (Node 20.19+/22.12+).
- UI: Tailwind CSS v4, shadcn/ui et Radix UI; animations via Motion 12.
- Design system arcade « Poulolo UI » : tokens centralisés dans `src/styles/theme.css`, règles détaillées dans `src/styles/arcade-system.css`, typographies Exo 2 + TeX Gyre Adventor chargées via `src/styles/typography.css`.
- Justification: performance (Vite + Rolldown), DX moderne, accessibilité (Radix), cohérence visuelle rapide (Tailwind/shadcn), API React 19, différenciation graphique par un thème glassmorphique responsive.

### 2) Mode hors-ligne (Offline-first)

- PWA avec Service Worker (Workbox): pré-cache du shell applicatif, stratégies cache-first/stale-while-revalidate, fallback offline.
- Persistance: IndexedDB (via `idb`) pour sessions/résultats; `localStorage` pour états légers (timer, drapeaux d’alerte).
- Synchronisation différée: file d’actions et Background Sync si disponible; dégradation élégante sur iOS/iPadOS.
- Indicateur réseau et bascule transparente sans interrompre la partie.

### 3) Timer robuste, précis et résilient

- Phases dynamiques: alternance `team[n] → intermission → team[n+1]` générée selon le nombre d'équipes configuré (1 à 13), puis `finished`.
- Durées: 2 min 30 s par équipe (alertes à 30 s, 10 s, déclenchement d'un compte à rebours spécial à 5 s), intermission 15–20 s (par défaut 15 s) pour la transition et la préparation du défi suivant.
- Précision: calculs basés sur `performance.now()`; rendu via `requestAnimationFrame`; logique dans un Web Worker (tick ~20 Hz) pour éviter les blocages UI.
- Rattrapage d’interruption: snapshot de `phase`, `currentTeamIndex`, `timeRemaining`, `lastUpdate` chaque seconde et sur `visibilitychange/pagehide`; reprise à l’identique; correction lissée si dérive > 1 s.
- Alertes: thème qui vire à l’orange/rouge à 30 s, clignotement à 10 s, décompte audio-visuel 5→0 avec bip par seconde (signal distinct à 0) et vibration opportuniste si supportée.

Structure de données (référence PRD):

```typescript
interface GameTimer {
  phase: "team" | "intermission" | "finished";
  timeRemaining: number; // ms
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

### 4) UX: écrans d’accueil, défis et fin

- Accueil: boutons « Lire les règles » (affichage embarqué offline) et « Commencer le jeu », indicateur réseau.
- Défis: chaque écran de défi fournit un bouton de validation explicite permettant de soumettre la réponse et de déclencher l’intermission (compte à rebours 5 s). En absence de validation manuelle, le passage s’effectue automatiquement à l’expiration du timer.
- Fin de jeu: récapitulatif (scores, pourcentage), « Nouvelle session », « Voir les règles », « Exporter les résultats » (local si offline).

### 5) Cible iPad paysage et contraintes d’écran

- Orientation paysage (PWA manifest), gestion des safe areas (`viewport-fit=cover`, `env(safe-area-inset-*)`) gérée par `ArcadeLayout` qui injecte les classes `.app` / `.theme--xxx` sur `<body>`.
- Layout sans scroll: `body.app` fixe, padding dynamique sur les safe areas, `stage` centrée au sein d'un AppShell glassmorphique.
- Résolutions de référence: 1366×1024 (iPad Air) et 1640×1200 (iPad Pro).
- Cibles tactiles min 44×44 px; marges internes 24–32 px; éviter les bords (home indicator, multitasking).

### 6) Données et conformité RGPD

- Aucune donnée personnelle; stockage local uniquement; export anonymisé.
- Effacement des données en fin de session sur action explicite; politique CSP stricte.

### 7) Qualité, tests et déploiement

- Qualité: ESLint + Prettier, Husky hooks.
- Tests: Vitest + Testing Library (unitaires/intégration) et tests E2E/UX (Playwright) avec viewport iPad paysage.
- Déploiement: Vercel (build Vite), PWA activée, headers de sécurité.

## Alternatives envisagées

- Next.js App Router vs Vite: Next apporte SSR/ISR mais complexifie l’empreinte et la PWA offline; Vite est plus simple/rapide pour une app 100 % client.
- setInterval pour le timer: moins précis et sensible aux blocages; rejeté au profit Worker + `performance.now()`.
- Un seul stockage `localStorage`: insuffisant pour les volumes/transactions; préférer IndexedDB pour sessions et résultats.
- UI sans shadcn/ui: possible mais rallongerait le time-to-UI cohérent et les exigences a11y.

## Conséquences

Positives:

- Expérience fiable sans réseau, démarrage instantané, timer précis, UX tablette soignée.
- Maintenance facilitée (TS, composants modulaires), performances élevées (Vite).

Points d’attention:

- Complexité Service Worker et IndexedDB (tests nécessaires, scénarios iOS spécifiques).
- Gestion fine du timer (Worker, persistance, reprise) à valider par tests E2E.

## Liens

- `README.md`
- `docs/PRD.md`
- `docs/ReglesDuJeu.md`
- `docs/ListeDesMetiersEtCompetences.md`

## Suivi et implémentation

- Générer squelettes techniques: `timer.worker.ts`, hook `useGameTimer`, écrans `StartScreen`/`EndScreen`, composant de compte à rebours audio-visuel 5 s.
- Mettre en place Service Worker (Workbox) + manifest PWA.
- Créer IndexedDB (schéma sessions/résultats) + export JSON.
- Implémenter contrôles de validation manuelle des défis (UI + logique) avec fallback auto sur expiration du timer.
- Couvrir par tests Vitest/Testing Library et Playwright (viewport iPad paysage).

---

## Mises à jour (2025-09-24)

### Thème global & AppShell iPad

- Tokens graphiques consolidés dans `src/styles/theme.css` (couleurs ADPEP, surfaces, ombres, transitions, dimensions plateau) et exposés à Tailwind v4 (`tailwind.config.ts`).
- Fonts Exo 2 (corps/ui) et TeX Gyre Adventor (titres) chargées côté CSS, accessibles via `--font-sans`, `--font-display`, `--font-numeric`.
- `arcade-system.css` pilote le layout sans scroll (`body.app` fixe, safe areas `env()`) et fournit les helpers glassmorphiques (`.glass-panel`, `.btn`, `.chip`, animations countdown/confetti).
- `AppShell` compose `ArcadeLayout` + `Stage` pour offrir l'AppShell iPad (hud, stage, footer) et s'applique à tous les écrans clés.
- `ArcadeLayout` importe dynamiquement le design system, applique `.app` au `<body>` et gère le changement de thème (`.theme--{domaine}`) pour propager `--accent`, `--pattern`.
- Thématisation dynamique : `GameState.currentTheme` conserve le thème courant (persisté offline) et synchronise `AppShell`/`EndScreen` via `GameContext`.
- Revue HUD/Choices/GameCard/HUD pour respecter les types stricts (imports type-only, gestion `setInterval`, bornes multi-select).
- Build validé (`npm run lint`, `npm run type-check`, `npm run build`).

## Mises à jour (2025-09-23)

### UI/UX arcade et charte ADPEP

- Style arcade (bordures épaisses, ombres « borne », halos colorés, gradients dynamiques) défini dans `src/styles/arcade-system.css` et piloté par les variables de `src/styles/theme.css`.
- shadcn/ui + Tailwind v4 pour la cohérence visuelle; Motion pour transitions/feedback; composants UI consomment les nouveaux tokens (`brand`, `accent`, `glass`, `ink`).
- `ArcadeLayout` applique dynamiquement la classe `.app` et le thème métier (`.theme--handicap`, etc.) sur `<body>` pour propager les variables CSS.
- Composants refactorisés: `Button`, `Card`, `Chip`, `Toast`, `TimerDisplay`, `StatsPanel`, `TeamRotationPanel`, écrans `StartScreen`/`GameScreen`/`EndScreen` et overlay timer.
- Cibles tactiles iPad ≥ 44×44 px: tokens `--radius-*`, helpers `.glass-panel`, `.btn`, `.chip`; options de défis en `min-height: 56px`.

### Logo institutionnel

- Actif: `public/images/logo_lespep973.jpg` (format optimisé pour le HUD arcade).
- Splash au lancement (fade-in/out), réutilisation en en-tête/pied au sein du topbar glassmorphique.
- Performance: image mise en cache via stratégie Workbox (CacheFirst images).

### PWA / Service Worker

- Workbox: `precacheAndRoute`, routes `NetworkFirst` (documents), `StaleWhileRevalidate` (scripts/styles), `CacheFirst` (images).
- VitePWA: stratégie `injectManifest`, worker `src/sw.ts`.
- Décision: désactiver l’enregistrement du SW en développement (`devOptions.enabled=false`) pour éviter les incohérences HMR/hydratation (écran blanc). Consigne de debug: « Unregister » le SW et hard-reload si comportement anormal.

### Persistance offline

- IndexedDB: stores `game-state` (keyPath `id`), `responses` (keyPath `key`, index `byTimestamp`), `offline-queue` (autoIncrement `id`).
- localStorage: clé `adpep-score` (score courant global + par équipe).
- `GameDataManager`: export/import JSON; `clearStorage()` avant import; file offline vidée à la reconnexion.

### Scoring et feedback

- `calculatePartialScore`:
  - Compétences→métier: réponse exacte = points pleins; sinon 0.
  - Métier→compétences: succès partiel dès 4/6 corrects (points réduits), 6/6 = points pleins; bonus temps ≤ 30%.
- `applyScore`: mise à jour par équipe et globale; multiplicateur de série (×1,1 dès 3, ×1,2 dès 5).
- `AnswerFeedback`: feedback visuel détaillé (correct/incorrect/total + points).

### Contexte et architecture UI

- `GameContext` refactorisé (extraction `gameContextShared`, hook `useGameContext`) pour éviter les soucis de fast-refresh et isoler le contexte.
- Actions: `advanceChallenge` ajouté; `submitResponse` enrichi avec breakdown.
- Hydratation depuis IndexedDB/localStorage au montage.

### Timer et compte à rebours

- Worker `timer.worker.ts` à ~50ms tick avec `performance.now()`; hook `useGameTimer` (start/pause/set, alertes 30/10/5s).
- `TimerDisplay`: transitions de couleurs et pulsation sur les 5 dernières secondes.
- `CountdownOverlay`: décompte visuel 5→0 + vibration si supportée (audio optionnel, soumis aux permissions navigateur).

### Tests & qualité

- Vitest + Testing Library: unitaires (timer, rotation, scoring, composants) et intégration (flux start→game).
- Playwright E2E (à mettre en place): viewport iPad 1366×1024, scénarios PWA offline et vérification d’hydratation CSS.
- ESLint + TypeScript strict; scripts `pre-commit` (lint + type-check + tests).

### Port et dev server

- Vite `server` et `preview` forcés sur port 3000 (`strictPort: true`) pour homogénéité des environnements.
