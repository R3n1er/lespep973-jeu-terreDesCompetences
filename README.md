# 🎯 Terres de Compétences - LES PEP GUYANE

> Jeu interactif de découverte des métiers et compétences pour la journée institutionnelle 2025

## 📋 À propos du projet

**Terres de Compétences** est un jeu numérique conçu spécialement pour l'Association Départementale des Pupilles de l'Enseignement Public de Guyane (LES PEP GUYANE). Cette application web interactive permet aux équipes de collaborateurs de découvrir la richesse et la diversité des 15 métiers représentatifs de l'association dans le secteur médico-social.

### 🏢 Contexte ADPEP GUYANE

LES PEP GUYANE est une association loi 1901 œuvrant en Guyane dans le secteur du handicap pour les jeunes enfants. Elle gère diverses structures médico-sociales :

- **CAMSP** (Centre d'Action Médico-Sociale Précoce)
- **CMPP** (Centre Médico-Psycho-Pédagogique)
- **SESSAD** (Service d'Éducation Spéciale et de Soins à Domicile)
- **IEM** (Institut d'Éducation Motrice)
- **SAMES** & **SAPHADE**
- **SIEGE SOCIAL**

Elle a 2 pole :

- **Pole Cayenne Centre-Est** : Comprenant l'ile de Cayenne, Kourou et la région de l'est Guyanais
- **Pole Ouest Guyanais** : Qui couvre l'ouest Guyanais et les zone éloignés du fleuve. Nous avons 2 antennes à Saint-Laurent du Maroni et Awala-Yalimapo

## 🎮 Règles du jeu

### Principe général

Des équipes de 15 personnes maximum se succèdent sur une tablette pendant **10 minutes au total**. Chaque équipe compose des groupes de 2 ou 3 personnes qui vont manipuler la tablette et réponse aux question. Chaque groupe en rotation dispose de **2 minutes 30** pour relever un maximum de défis d'association entre métiers et compétences.

### Types de défis

#### 🔍 **Défi 1 : Compétences → Métier**

- On vous présente plusieurs compétences professionnelles
- **Mission :** Devinez de quel métier il s'agit !
- **Exemple :** "accompagnement individualisé" + "élaboration de projets personnalisés" + "coordination avec les familles" = ?

#### 🎯 **Défi 2 : Métier → Compétences**

- On vous donne un métier de l'ADPEP GUYANE
- **Mission :** Sélectionnez les 6 compétences qui lui correspondent le mieux
- **Exemple :** Pour "Éducateur spécialisé", quelles sont ses compétences principales ?

### ⏱️ Système de temporisation

- **Timer global :** 10 minutes pour toute la session
- **Timer équipe :** 2min30 par équipe avec rotation automatique
- **Bonus temps :** Plus vous répondez vite, plus vous gagnez de points !
- **Alertes visuelles :** Changement de couleur à 30 secondes restantes, compte à rebours animé dès 5 secondes restantes entre deux défis
- **Alertes sonores :** Bip court par seconde sur les 5 dernières secondes puis signal distinct à 0

### 🏆 Scoring et niveaux

#### Barème de base

- **Défi réussi** : 100 points fixes
- **Défi partiellement réussi** (métier → compétences, 4 ou 5 bonnes réponses) : 60 points
- **Défi échoué** : 0 point, mais conservation de la progression

#### Bonus de vitesse

- Calculé sur le temps restant du défi (0 à 30 points)
- Formule recommandée : `bonus = ⌈(temps_restant_en_secondes / durée_défi_en_secondes) × 30⌉`
- Le bonus est plafonné à 30 points pour éviter les écarts trop importants

#### Séries de bonnes réponses

- 3 bonnes réponses consécutives : multiplicateur ×1,1 sur le prochain défi
- 5 bonnes réponses consécutives : multiplicateur ×1,2
- Une erreur réinitialise le multiplicateur

#### Pénalité de rotation

- Si l'équipe suivante dépasse son temps de pause (15 s par défaut), retrait de 10 points sur le score collectif pour encourager la fluidité des rotations

#### Question bonus « Zone de repêchage »

- Déclenchée si le score final collectif est compris entre **40 % et 50 %**
- Format : défi « Métier → Compétences » simplifié (4 compétences à sélectionner)
- Gain : 80 points + bonus de vitesse (max 20 points)
- La réussite de la question bonus peut faire passer l'équipe dans la tranche supérieure

#### Paliers de performance

- **Performance exceptionnelle (>80%)** : "Vous maîtrisez parfaitement nos métiers !"
- **Belle réussite (65-80%)** : "Excellente culture transversale !"
- **Bonne performance (50-65%)** : "Belle découverte de nos activités !"
- **Seconde chance (40-50%)** : Question bonus collective
- **Apprentissage renforcé (<40%)** : Débriefing approfondi

#### Optimisations possibles

- Ajouter un **bonus d'équipe collaborative** (+20 points) quand toutes les équipes réussissent au moins un défi dans leur rotation
- Activer un **malus d'erreur rapide** (-10 points) si 3 réponses incorrectes surviennent en moins de 60 secondes
- Introduire un **score thématique** : certains métiers « focus » de l'évènement valent +15 % afin de mettre en avant une campagne spécifique
- Permettre un **joker pédagogique** utilisable une fois par session pour demander un indice (-20 points sur le score final)

## ✨ Fonctionnalités principales

### 🔄 Gestion des équipes

- **Rotation automatique** toutes les 2min30
- **Interface d'équipe** avec noms des participants
- **Scores individuels et collectifs** en temps réel
- **Système de capitaine** pour la coordination

### 🎨 Interface utilisateur

- **Design responsive** optimisé pour tablettes
- **Interactions tactiles** fluides et intuitives
- **Animations** avec Motion (ex-Framer Motion)
- **Feedback visuel** immédiat sur les réponses
- **Thème ADPEP** avec couleurs institutionnelles

### 📊 Tableau de bord

- **Compteur de progression** en temps réel
- **Scores par équipe** avec classement
- **Statistiques globales** de la session
- **Métriques de performance** (temps moyen, taux de réussite)

### 💾 Sauvegarde et export

- **Sauvegarde automatique** locale (pas de serveur)
- **Export des résultats** en format anonymisé
- **Reprise de session** en cas d'interruption
- **Conformité RGPD** (aucune donnée personnelle stockée)

## 🖥️ Écrans de l'application

### 1. 🏠 **Écran d'accueil**

- Logo ADPEP GUYANE
- Titre du jeu et slogan motivant
- Bouton "Commencer le jeu"
- Instructions rapides

### 2. ⚙️ **Configuration de session**

- Nombre d'équipes (max 13)
- Durée par équipe (2min30 par défaut)
- Niveau de difficulté global
- Validation et démarrage

### 3. 👥 **Écran équipe active**

- **Header :** Timer + nom équipe + score actuel
- **Zone principale :** Défi en cours
- **Footer :** Progression générale + équipe suivante

### 4. 🎯 **Écrans de défi**

#### Compétences → Métier

- Liste des compétences présentées
- Grille de métiers possibles (4-6 options)
- Bouton de validation pour soumettre la réponse et passer au défi suivant
- Indicateur de temps restant

#### Métier → Compétences

- Card du métier cible
- Grille de compétences (12 options, 6 à choisir)
- Compteur de sélection
- Validation avec récapitulatif avant passage automatique ou anticipé au défi suivant

### 5. ✅ **Écran feedback**

- Animation de réponse (correct/incorrect)
- Score obtenu + bonus temps
- Explication courte de la bonne réponse
- Transition vers défi suivant

### 6. 🔄 **Écran transition équipe**

- "Merci équipe [X] !"
- Score final de l'équipe
- "Au tour de l'équipe [X+1]"
- Compte à rebours (5 secondes)

### 7. 🏁 **Écran résultats finaux**

- Classement des équipes
- Score collectif global
- Statistiques de la session
- Bouton export résultats
- Message de félicitations personnalisé

### 8. 📈 **Écran statistiques**

- Performance par métier découvert
- Temps moyen de réponse
- Taux de réussite global
- Métiers les mieux/moins bien identifiés

## 🛠️ Technologies utilisées

### Core Stack 2025

- **React 19.1.0** - Server Components, Actions, useActionState
- **TypeScript 5.6+** - Typage strict et robustesse
- **Vite 7.0** - Build tool ultra-rapide avec Rolldown
- **Node.js 20.19+** - Runtime moderne

### UI/UX

- **Tailwind CSS v4.0** - Framework CSS utility-first nouvelle génération, alimenté par les tokens ADPEP définis dans `src/styles/theme.css`
- **Shadcn/ui** - Composants React avec CLI 3.0
- **Lucide Icons (lucide-react)** - Icônes SVG modernes, accessibles
- **Motion 12.23.18** - Animations fluides (ex-Framer Motion)
- **Radix UI** - Primitives accessibles
- **Design system arcade** - Styles glassmorphiques centralisés dans `src/styles/arcade-system.css`, helpers `.glass-panel`, `.btn`, `.chip`, animations countdown/confetti

### État et données

- **React Context** - Gestion d'état globale
- **Custom Hooks** - Logique métier réutilisable
- **LocalStorage** - Persistance locale RGPD-compliant
- **LocalStorage + IndexedDB** : Persistance hors-ligne et reprise de session
- **Offline queue** : File de réponses en mode hors-ligne

## 🎨 Design system arcade

- **Tokens ADPEP** : couleurs, surfaces, ombres, rayons et transitions définis dans `src/styles/theme.css` et exposés à Tailwind (`tailwind.config.ts`).
- **Typographies** : Exo 2 (texte et chiffres) et TeX Gyre Adventor (titres) chargées via `src/styles/typography.css`, accessibles sur les classes utilitaires `.font-display` / `.font-numeric`.
- **Arcade AppShell** : `src/styles/arcade-system.css` gère le layout plein écran (`body.app` fixe, gestion `env(safe-area-*)`), le HUD glassmorphique et les helpers `.glass-panel`, `.btn`, `.chip`.
- **Thèmes métiers** : classes `.theme--{domaine}` appliquées par `ArcadeLayout` pour injecter `--accent` et motifs SVG spécifiques (`public/icones/*`).
- **Composants arcade** : `src/components/arcade/` fournit `AppShell`, `ArcadeLayout`, `HUD`, `Stage`, `GameCard`, `Choices`, `Toast` et helpers alignés sur le brief graphique.
- **UI atomiques** : `src/components/ui/` met à disposition `Button`, `Card`, `Badge` (variants arcade) utilisés dans les écrans métier.
- **Thématisation dynamique** : `GameState.currentTheme` met à jour automatiquement le thème actif en fonction du défi courant (persisté offline).
- **Helper thème** : `src/lib/theme.ts` résout le thème d’un défi en se basant sur les métiers (`METIERS_ADPEP`) pour appliquer motifs/fond adaptés même lorsque le champ `theme` n’est pas défini.

## 📱 Compatibilité

### Appareils supportés

- **Tablettes** (recommandé) : iPad, Android tablets 10"+
- **Desktop** : Chrome, Firefox, Safari, Edge
- **Mobile** : Support responsive pour consultation

### Configuration minimale

- **Navigateur moderne** (2023+)
- **JavaScript activé**
- **LocalStorage** disponible
- **Écran tactile** recommandé pour l'expérience optimale

## 🚀 Installation et utilisation

### Prérequis

```bash
Node.js 20.19+ ou 22.12+
npm ou yarn ou pnpm
```

### Démarrage rapide

```bash
# Cloner le projet
git clone [repository-url]
cd terres-competences

# Installer les dépendances
npm install

# Démarrer en mode développement (port 3000)
npm run dev

# Ouvrir http://localhost:3000
```

### Build de production

```bash
# Générer le build optimisé
npm run build

# Prévisualiser en local (port 3000)
npm run preview

# Ouvrir http://localhost:3000
```

## 📂 Structure du projet

```
terres-competences/
├── public/                 # Assets statiques
├── src/
│   ├── components/        # Composants React
│   │   ├── arcade/       # AppShell arcade, HUD, GameCard, helpers glassmorphiques
│   │   ├── game/         # Composants spécifiques au jeu
│   │   ├── ui/           # Composants UI génériques (shadcn/ui)
│   │   └── screens/      # Écrans de l'application
│   ├── data/             # Données des métiers et compétences
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires et helpers
│   ├── styles/           # Styles globaux (theme, typography, arcade system)
│   └── types/            # Définitions TypeScript
├── tests/                # Tests unitaires et d'intégration
└── docs/                 # Documentation complémentaire
```

## 📌 Roadmap et suivi d'avancement

- Le suivi d’évolution et d’avancement est centralisé dans `ROADMAP.md` (jalons J1→J7, tâches, statut).
- Mettez à jour ce fichier en cochant les cases à chaque étape majeure et en notant les blocages.

## 🧪 Tests et qualité

### Commandes disponibles

```bash
npm run test          # Tests unitaires (Vitest)
npm run test:watch    # Tests en mode watch
npm run lint          # Vérification du code
npm run type-check    # Vérification TypeScript
```

### Couverture de tests

- **Composants UI** : Tests avec Testing Library
- **Logique métier** : Tests unitaires Vitest
- **Intégration** : Tests de flux complet
- **Accessibilité** : Tests automatisés a11y

## 🔒 Sécurité et confidentialité

### Conformité RGPD

- ✅ **Aucune donnée personnelle** stockée
- ✅ **Stockage local uniquement** (pas de serveur)
- ✅ **Export anonymisé** des résultats
- ✅ **Effacement automatique** en fin de session

### Sécurité technique

- **CSP** (Content Security Policy) configurée
- **Validation côté client** de toutes les entrées
- **Pas de tracking** externe
- **HTTPS** requis en production

## 📞 Support et contact

### Équipe projet

- **Responsable Informatique ADPEP GUYANE**

### En cas de problème

1. Vérifier la compatibilité du navigateur
2. Redémarrer l'application (F5)
3. Vider le cache si nécessaire
4. Contacter le support informatique

## 🎯 Objectifs pédagogiques

### Pour les participants

- **Découvrir** la diversité des métiers ADPEP
- **Comprendre** les liens entre compétences et fonctions
- **Valoriser** l'expertise de chaque service
- **Renforcer** la cohésion d'équipe

### Pour l'organisation

- **Améliorer** la connaissance transversale
- **Identifier** les passerelles entre services
- **Célébrer** la richesse des compétences
- **Créer** du lien social institutionnel

## 📈 Évolutions futures

### Version 2.0 (idées)

- Mode multijoueur en ligne
- Nouveaux types de défis (QCM, glisser-déposer)
- Intégration avec système RH
- Analytics avancées
- Mode formation continue

---

**🎮 Prêt à découvrir les Terres de Compétences de l'ADPEP GUYANE ?**

_Que le meilleur esprit d'équipe gagne !_ 🏆

## 📊 État d’avancement (synthèse)

- **En place** : Design tokens ADPEP (`theme.css`), design system arcade (`arcade-system.css`), typographies Exo 2/TeX Gyre Adventor, ArcadeLayout + thèmes dynamiques, composants HUD/Choices/GameCard, worker timer v1, rotation équipes, persistance IndexedDB/localStorage, Workbox + PWA injectManifest, scripts qualité (lint/type/test/build).
- **En cours** : AppShell global (J7), refonte complète des composants atomiques côté jeu (J8) et harmonisation Start/Game/End selon brief.
- **À planifier** : Tests Playwright iPad, QA accessibilité/performances iPad, documentation finale (ADR/Implementation/README) continue, refinements animations et thèmes dynamiques (J9-J10).
