# Brief Graphique IA — Terres de Compétences

## 0) Intention & tonalité

Ambiance : ludique, joyeuse, “arcade premium” (néons doux, dégradés vifs, halos).

Lisibilité d’abord : fond sombre coloré → contenus clairs et contrastés.

Cohérence PEP 973 : réutiliser logo et icônes (SVG fournis) comme marqueurs thématiques.

Zero-JS visuel : tous les effets et animations décrits doivent être réalisables en CSS pur (JS uniquement pour la logique de jeu, pas pour le rendu).

## 1) Contraintes de sortie

Format cible : iPad paysage (ratio 4:3). Taille de référence pour les images de fond : 2048×1536 px.

Technos : HTML + CSS (variables CSS, conic-gradient, radial-gradient, backdrop-filter, mask).

Accessibilité : contraste ≥ 4.5:1 pour le texte courant ; tailles tactiles ≥ 44 px ; support prefers-reduced-motion.

Actifs (chemins logiques) :

- /assets/Logo-les-PEP-973.webp
- /assets/icone_handicap.svg
- /assets/icone_prevention.svg
- /assets/icone-aide-parentalite.svg
- /assets/icone-centre-multimedia.svg
- /assets/icone-insertion-professionnel.svg
- /assets/icone-mobilite.svg
- /assets/icone-multi-accueil-enfants.svg
- /assets/icone-protection-enfance.svg
- /assets/icone-scolarite.svg

## 2) Système de design (tokens)

Définir ces variables CSS globales :

```css
:root {
  /* Couleurs marque & arcade */
  --pep-blue: #2196f3;
  --pep-navy: #2d3848;
  --pep-red: #e53e3e;
  --pep-green: #13c58c;
  --pep-yellow: #ffc857;
  --pep-violet: #7d5fff;
  --pep-pink: #ff679a;

  --ink: #e9eef8; /* texte principal sur fond sombre */
  --ink-soft: #c7d1f3;
  --bg: radial-gradient(1600px 800px at 60% 20%, #1b2550 0%, #0b1020 60%);

  --card-1: #11172e; /* haut */
  --card-2: #0f1430; /* bas */
  --glass: rgba(255, 255, 255, 0.06);
  --white: #fff;

  --shadow-1: 0 10px 30px rgba(0, 0, 0, 0.25);
  --shadow-2: 0 14px 40px rgba(0, 0, 0, 0.35);

  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 12px;

  --stage-max-w: 1600px; /* zone utile au centre */
  --stage-max-h: 1000px;

  /* Accent thématique (écrans à thème) — modifié par .theme--* */
  --accent: var(--pep-blue);
}

/* Thèmes par domaine (appliqués sur <body class="theme--xxx">) */
.theme--handicap {
  --accent: #41d1b6;
  --pattern: url("/assets/icone_handicap.svg");
}
.theme--parentalite {
  --accent: #ff679a;
  --pattern: url("/assets/icone-aide-parentalite.svg");
}
.theme--scolarite {
  --accent: #2196f3;
  --pattern: url("/assets/icone-scolarite.svg");
}
.theme--prevention {
  --accent: #ffc857;
  --pattern: url("/assets/icone_prevention.svg");
}
.theme--protection {
  --accent: #e53e3e;
  --pattern: url("/assets/icone-protection-enfance.svg");
}
.theme--insertion {
  --accent: #13c58c;
  --pattern: url("/assets/icone-insertion-professionnel.svg");
}
.theme--mobilite {
  --accent: #7d5fff;
  --pattern: url("/assets/icone-mobilite.svg");
}
.theme--multiaccueil {
  --accent: #8bc34a;
  --pattern: url("/assets/icone-multi-accueil-enfants.svg");
}
.theme--multimedia {
  --accent: #00bcd4;
  --pattern: url("/assets/icone-centre-multimedia.svg");
}
```

## 3) Grille & mise en page

Topbar “HUD” (header flottant, verre dépoli).

Stage : zone centrale avec plateau (.board) encadrant la carte active et la colonne des réponses.

Footer facultatif (messages, crédits, pagination).

Classes structurelles obligatoires :

`.app, .app__topbar, .stage, .board, .card, .choices`

## 4) Composants obligatoires (styles & comportements CSS)

### 4.1 Topbar (HUD)

Contient : branding (logo + titre), timer, score.

Style : bande translucide, `backdrop-filter: blur(4px)`, icônes nettes, texte clair.

Timer CSS-only :

Barre horizontale qui se rétracte sur 150 s par animation scaleX (modulable).

Dégradé vert → jaune → rouge.

Score circulaire CSS-only :

Utiliser conic-gradient pour remplir selon %.

Valeur visible au centre.

### 4.2 Plateau .board

Panneau sombre arrondi, légers halos colorés, motif SVG répétitif via `--pattern`.

Garde-fou : contour discret `outline: 1px solid rgba(255,255,255,.08)`.

### 4.3 Carte principale .card

En-tête dégradé `--accent`, icône thématique à gauche (SVG).

Corps : liste à puces ou intitulé métier.

Pied : deux boutons (Indice, Valider) → variantes ghost et accent.

Effet flip (CSS pur) pour alterner Métier ↔ Compétences :

Utiliser un input checkbox masqué + `transform: rotateY(180deg)` sur la face arrière.

`perspective: 1200px`, `transform-style: preserve-3d`.

### 4.4 Choix / réponses .choices

Chips cliquables (pastille allongée, icône + label), feedback hover/active.

Taille mini 44 px, ombre douce, survol → glow léger.

### 4.5 Boutons .btn

Variant accent : dégradé `--accent` → couleur complice (ex. `--pep-violet`).

Variant ghost : fond transparent, bord clair, hover = intensification du bord.

### 4.6 Toasts feedback (correct / wrong)

Bulle centrée haut, couleurs vert (succès) / rouge (erreur).

Animation d’entrée drop (.4s), disparition gérée côté logique (mais CSS prêt).

### 4.7 Badges / Bonus

Pilule “BONUS” jaune/orangé, majuscules, petite icône SVG, ombre.

## 5) Écrans à générer (fond 2048×1536 + CSS appliqué)

### 5.1 Accueil

Logo PEP en masque (CSS mask) avec dégradé bleu→rose, opacité ~0.18.

Titre du jeu et bouton Commencer (.btn--accent).

Particules/dots discrets (radial gradients répétés).

### 5.2 Sélection/Rotation d’équipes

4 cartes d’équipe avec couleurs distinctes, libellés A/B/C/D.

Mini-timer ou indications de tour.

Icônes thématiques en arrière-plan faible.

### 5.3 Question — Format A (deviner le métier à partir de compétences)

Carte affiche 3 à 6 puces (compétences).

Colonne .choices = métiers possibles (3–6 items).

Icône thématique associée au métier ciblé dans le header de la carte.

### 5.4 Question — Format B (deviner les compétences à partir d’un métier)

Carte affiche le métier (titre + pictogramme).

Colonne .choices = compétences (6–9 items). Multi-sélection possible (géré en logique, style `:has(:checked)` si besoin).

### 5.5 Carte “Bonus”

Bordure dorée (linear-gradient or), petit glow pulsant.

Icône étoile ou point d’interrogation stylisé.

### 5.6 Résultats

Fond “célébration” (confettis CSS animés, opacité faible).

Grand score, rang de performance (libellés : Exceptionnelle / Belle réussite / Bonne performance / Seconde chance / Apprentissage renforcé).

Badge du rang, CTA “Rejouer”.

### 5.7 Pause / Transition

Carte centrale minimaliste, icône thématique du prochain domaine, micro-animation.

## 6) Animations CSS (toutes sans JS)

### 6.1 Timer

```css
.timer__bar {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--pep-green),
    var(--pep-yellow),
    var(--pep-red)
  );
  animation: countdown 150s linear forwards;
  transform-origin: left center;
}
@keyframes countdown {
  to {
    transform: scaleX(0);
  }
}
```

### 6.2 Flip carte

```css
/* carte flip (structure indicatrice) */
perspective: 1200px;
transition:.6s
  cubic-bezier(0.2,0.8,0.2,1)
  .flip__toggler:checked
  + .flip__card {
  transform: rotateY(180deg);
}
```

### 6.3 Hover glow (boutons/chips)

```css
.glow:hover {
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(
        255,
        255,
        255,
        0.08
      ) inset;
}
```

### 6.4 Pulse subtil (mise en avant carte active)

```css
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01);
  }
}
.card--active {
  animation: pulse 2.4s ease-in-out infinite;
}
```

### 6.5 Confettis CSS (écran résultats)

```css
.stage--celebrate::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.25;
  background-image: radial-gradient(circle 6px, #fff 99%, transparent),
    radial-gradient(circle 8px, var(--pep-yellow) 98%, transparent),
    radial-gradient(circle 6px, var(--pep-pink) 98%, transparent);
  background-size: 20px 20px, 24px 24px, 18px 18px;
  animation: confetti 12s linear infinite;
}
@keyframes confetti {
  from {
    background-position: 0 0, 0 0, 0 0;
  }
  to {
    background-position: 0 800px, 0 1200px, 0 600px;
  }
}
```

### 6.6 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## 7) Traitement des SVG

Comme icônes (dans headers de cartes, chips de réponses).

Comme patterns de fond de plateau : `background-image: var(--pattern); background-repeat: repeat; background-size: 200–280px; opacity ~0.06–0.12`.

Comme masques décoratifs (logo) sur l’accueil/résultats :

```css
mask: url("/assets/Logo-les-PEP-973.webp") center/contain no-repeat;
/* Fond masqué en dégradé --pep-blue → --pep-pink. */
```

Règles d’import :

Préserver la monochromie (ton sur ton clair sur fond sombre).

Appliquer `filter: drop-shadow()` léger pour les icônes de premier plan.

## 8) États & feedbacks normalisés

Correct : vert (#00e78a → #16a085), toast “Bonne réponse !”, chip valide avec bordure verte.

Incorrect : rouge (#ff5f6d → #E53E3E), toast “Essaie encore…”, chip en secousse légère (optionnel avec reduced-motion off).

Désactivé : opacité 0.4, pas d’ombre.

Focus clavier : `outline: 3px solid #ffd56b; outline-offset: 3px;`

## 9) Acceptation graphique (critères)

Cohérence des couleurs, rayons, ombres et textures sur tous les écrans.

Lisibilité du texte ≥ 16 px, contrastes respectés.

Tactile : zones cliquables confortables, espacements suffisants.

Performance : pas d’images de fond > 500 Ko chacune si possible ; privilégier SVG ou gradients.

Theming : changement de thème par simple classe `.theme--*` sans modifier l’HTML interne.

## 10) Livrables attendus (pour une IA génératrice)

Feuille CSS complète avec :

- Variables (tokens) ci-dessus,
- Styles des composants `.app__topbar`, `.timer`, `.score`, `.board`, `.card`, `.choices`, `.chip`, `.btn`, `.toast`, `.badge`,
- Animations (`@keyframes` countdown, confetti, pulse, etc.),
- Media query `prefers-reduced-motion`,
- Thèmes `.theme--*`.

3 fonds 2048×1536 (PNG ou SVG) :

- Accueil (logo masqué),
- Plateau générique (halos + pattern faible),
- Résultats (confettis).

Extraits HTML d’exemple (snippets) montrant :

- Un écran Format A (Compétences → Métier),
- Un écran Format B (Métier → Compétences),
- Carte Bonus,
- HUD (timer + score).

Tableau de mappage thème ↔ icône ↔ couleur `--accent` (tel que section 2).

## 11) Do / Don’t (garde-fous IA)

Do

- Utiliser dégradés, halos radiaux, ombres douces, arrondis généreux.
- Répéter les SVG en motifs subtils pour thématiser sans saturer.
- Conserver une hiérarchie claire : carte centrale > réponses > HUD.

Don’t

- Pas de fonds ultra saturés derrière du texte sans overlay.
- Pas d’animations agressives (secousses fortes, clignotements rapides).
- Pas de polices fantaisie illisibles ; rester sur une sans-serif moderne (Poppins/Nunito/system-ui).

## 12) Exemple d’assemblage (mini-snippet)

```html
<body class="app theme--scolarite">
  <header class="app__topbar">
    <div class="brand">
      <img src="/assets/Logo-les-PEP-973.webp" alt="PEP 973" />
      <span>Terres de Compétences</span>
    </div>
    <div class="hud">
      <div class="timer"><div class="timer__bar"></div></div>
      <div class="score score--good">
        <div class="score__label">Score</div>
        <div class="score__meter" data-value="72">
          <span class="score__fill"></span>
          <span class="score__value">72%</span>
        </div>
      </div>
    </div>
  </header>

  <main class="stage">
    <section class="board">
      <article class="card card--primary card--active">
        <header class="card__header">
          <img src="/assets/icone-scolarite.svg" class="card__icon" alt="" />
          <h1 class="card__title">Devine le métier</h1>
        </header>
        <div class="card__content">
          <ul class="bullets">
            <li>Accompagnement individualisé</li>
            <li>Projet personnalisé</li>
            <li>Coordination avec les familles</li>
          </ul>
        </div>
        <footer class="card__footer">
          <button class="btn btn--ghost glow">Indice</button>
          <button class="btn btn--accent glow">Valider</button>
        </footer>
      </article>

      <div class="choices">
        <button class="chip glow">
          <img src="/assets/icone-handicap.svg" alt="" />Éducateur spécialisé
        </button>
        <button class="chip glow">
          <img src="/assets/icone-prevention.svg" alt="" />Infirmier·e
        </button>
        <button class="chip glow">
          <img src="/assets/icone-protection-enfance.svg" alt="" />Psychologue
        </button>
      </div>
    </section>
  </main>
</body>
```
