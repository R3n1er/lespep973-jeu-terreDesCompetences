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

Des équopes de 15 personnes maximum se succèdent sur une tablette pendant **10 minutes au total**. Chaque équipe compose des groupes de 2 ou 3 personnes qui vont manipuler la tablette et réponse aux question. Chaque groupe en rotation dispose de **2 minutes 30** pour relever un maximum de défis d'association entre métiers et compétences.

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
- **Alerte visuelle :** Changement de couleur à 30 secondes restantes

### 🏆 Scoring et niveaux

- **Performance exceptionnelle (>80%)** : "Vous maîtrisez parfaitement nos métiers !"
- **Belle réussite (65-80%)** : "Excellente culture transversale !"
- **Bonne performance (50-65%)** : "Belle découverte de nos activités !"
- **Seconde chance (40-50%)** : Question bonus collective
- **Apprentissage renforcé (<40%)** : Débriefing approfondi

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
- Bouton de validation
- Indicateur de temps restant

#### Métier → Compétences

- Card du métier cible
- Grille de compétences (12 options, 6 à choisir)
- Compteur de sélection
- Validation avec récapitulatif

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

- **Tailwind CSS v4.0** - Framework CSS utility-first nouvelle génération
- **Shadcn/ui** - Composants React avec CLI 3.0
- **Motion 12.23.18** - Animations fluides (ex-Framer Motion)
- **Radix UI** - Primitives accessibles

### État et données

- **React Context** - Gestion d'état globale
- **Custom Hooks** - Logique métier réutilisable
- **LocalStorage** - Persistance locale RGPD-compliant

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

# Démarrer en mode développement
npm run dev

# Ouvrir http://localhost:5173
```

### Build de production

```bash
# Générer le build optimisé
npm run build

# Prévisualiser en local
npm run preview
```

## 📂 Structure du projet

```
terres-competences/
├── public/                 # Assets statiques
├── src/
│   ├── components/        # Composants React
│   │   ├── game/         # Composants spécifiques au jeu
│   │   ├── ui/           # Composants UI génériques
│   │   └── screens/      # Écrans de l'application
│   ├── data/             # Données des métiers et compétences
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires et helpers
│   ├── styles/           # Styles globaux
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
npm run test          # Tests unitaires
npm run test:watch    # Tests en mode watch
npm run lint          # Vérification du code
npm run type-check    # Vérification TypeScript
```

### Couverture de tests

- **Composants UI** : Tests avec Testing Library
- **Logique métier** : Tests unitaires Jest
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
- **Équipe technique** : Carole, Françoise
- **Direction** : Elsa, Jade

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
