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
- Justification: performance (Vite + Rolldown), DX moderne, accessibilité (Radix), cohérence visuelle rapide (Tailwind/shadcn), API React 19.

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

- Orientation paysage (PWA manifest), gestion des safe areas (`viewport-fit=cover`, `env(safe-area-inset-*)`).
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
