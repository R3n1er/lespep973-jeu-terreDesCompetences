# AGENTS.md

> Instructions pour les assistants IA travaillant sur le projet "Terres de Compétences" - ADPEP GUYANE

## 📋 À propos du projet

Jeu interactif de découverte des métiers pour la journée institutionnelle 2025 de l'Association Départementale des Pupilles de l'Enseignement Public de Guyane. Application web PWA optimisée pour tablettes iPad.

- Plus d'information sur le projet dans le dossier "docs" et avec les fichiers @PRD.md et @ADR.md
- Les regles du jeu sont dans le fichier @ReglesDuJeu.md
- La liste des Metiers et des competences est dans le fichier @ListeDesMetiersEtCompetences.md

## 🛠️ Commandes de développement

### Installation et démarrage

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Accéder à l'application
# http://localhost:5173
```

### Tests et vérifications

```bash
# Tests unitaires
npm run test

# Tests en mode watch
npm run test:watch

# Vérification du code
npm run lint

# Correction automatique du linting
npm run lint:fix

# Vérification TypeScript
npm run type-check
```

### Build et déploiement

```bash
# Build de production
npm run build

# Prévisualisation locale du build
npm run preview
```

### Tests E2E (Playwright)

```bash
# Installer Playwright (si pas déjà fait)
npx playwright install

# Lancer les tests E2E
npx playwright test

# Interface UI pour les tests
npx playwright test --ui
```

## 🎯 Stack technique

- **Framework** : React 19.1 + TypeScript 5.6+
- **Build tool** : Vite 7.0 avec Node.js 20.19+/22.12+
- **UI/Styling** : Tailwind CSS v4 + shadcn/ui + Radix UI
- **Animations** : Motion 12.23 (ex-Framer Motion)
- **PWA** : Service Worker avec Workbox
- **Stockage** : IndexedDB + localStorage
- **Tests** : Vitest + Testing Library + Playwright

## 📁 Structure du projet

```
src/
├── components/        # Composants React réutilisables
│   ├── game/         # Composants spécifiques au jeu
│   ├── ui/           # Composants UI génériques (shadcn/ui)
│   └── screens/      # Écrans de l'application
├── data/             # Données des métiers et compétences
├── hooks/            # Hooks personnalisés React
├── lib/              # Utilitaires et helpers
├── styles/           # Styles globaux Tailwind
└── types/            # Définitions TypeScript
```

## 🎮 Spécificités du jeu

### Contraintes importantes

- **Orientation iPad** : Paysage uniquement, cibles tactiles min 44×44px adapté aux iPad récents.
- **Mode hors-ligne** : PWA avec persistance locale (IndexedDB)
- **Timer précis** : Web Worker avec `performance.now()` et rattrapage d'interruption
- **Jusqu'à 13 équipes** : Session de 10 minutes, rotation automatique 2min30 par équipe, pause 15s entre deux passages
- **Alertes fin de défi** : Compte à rebours visuel et sonore sur les 5 dernières secondes avant le défi suivant
- **Validation manuelle** : Chaque défi doit proposer un bouton de validation pour confirmer la réponse et avancer
- **RGPD** : Aucune donnée personnelle, stockage local uniquement

### Types de défis

1. **Compétences → Métier** : Deviner le métier à partir des compétences
2. **Métier → Compétences** : Sélectionner 6 compétences pour un métier donné

## 🧪 Règles de tests

### Tests obligatoires avant commit

- Tests unitaires : `npm run test`
- Linting : `npm run lint`
- Vérification TypeScript : `npm run type-check`

### Tests spécifiques au projet

- **Timer** : Tests de précision, interruption, rattrapage
- **PWA** : Tests mode hors-ligne, Service Worker
- **iPad** : Tests viewport paysage, interactions tactiles
- **Gameplay** : Tests des 2 types de défis, rotation d'équipes

### Configuration Playwright

- **Viewport** : `{ width: 1366, height: 1024 }` (iPad Air paysage)
- **User Agent** : iPad pour tester les spécificités iOS
- **Tests PWA** : Installation, cache, mode offline

## 📖 Documentation

Liens vers la documentation complète :

- **[README.md](./README.md)** - Vue d'ensemble du projet
- **[docs/PRD.md](./docs/PRD.md)** - Spécifications techniques détaillées
- **[docs/ADR.md](./docs/ADR.md)** - Décisions d'architecture
- **[docs/ReglesDuJeu.md](./docs/ReglesDuJeu.md)** - Règles du jeu
- **[docs/ListeDesMetiersEtCompetences.md](./docs/ListeDesMetiersEtCompetences.md)** - Contenu métier
- **[ROADMAP.md](./ROADMAP.md)** - Suivi d'évolution et d'avancement (jalons, tâches, statut)

## 🚨 Points d'attention

### Avant toute modification

1. **Lire la documentation** : PRD et ADR pour comprendre les contraintes
2. **Vérifier les tests** : S'assurer que les tests existants passent
3. **Respecter TypeScript** : Typage strict obligatoire
4. **Tester sur iPad** : Viewport paysage et interactions tactiles

### Code style

- **ESLint + Prettier** : Configuration stricte
- **Composants** : Utiliser shadcn/ui + Radix UI
- **Animations** : Motion pour les transitions
- **Performance** : Lazy loading, memoization React

### Sécurité et conformité

- **CSP** : Content Security Policy stricte
- **RGPD** : Pas de tracking externe, données anonymisées
- **PWA** : HTTPS requis, cache sécurisé

## 🔧 Commandes git recommandées

```bash
# Vérifications avant commit
npm run pre-commit

# Commit avec message descriptif
git commit -m "feat: description de la fonctionnalité"

# Push vers GitHub
git push origin main
```

## 💡 Tips pour les IA

- **Toujours consulter le PRD** pour les spécifications techniques
- **Tenir à jour la ROADMAP** à chaque étape livrée ou blocage identifié
- **Utiliser les types TypeScript** définis dans `/src/types/`
- **Tester en mode PWA** avec `npm run build && npm run preview`
- **Vérifier la compatibilité iPad** avec les DevTools
- **Respecter l'architecture offline-first** du projet
