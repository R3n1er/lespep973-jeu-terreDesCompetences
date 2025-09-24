# 🎮 ARCADE DESIGN SYSTEM - IMPLEMENTATION GUIDE

## 🌟 Vue d'ensemble

Cette implémentation transforme complètement l'application **Terres de Compétences** selon le Brief_Graphisme.md pour créer une expérience arcade premium moderne.

## 🎨 Architecture visuelle

### Design System
- **Fond sombre** avec radial-gradient immersif
- **Glass morphism** avec backdrop-filter et transparences
- **Couleurs arcade** : 9 thèmes métiers dynamiques
- **Animations CSS pures** (timer, flip, glow, confettis)
- **Typographie** avec gradients et effets lumineux

### Layout Structure
```
ArcadeLayout (thème + HUD)
├── HUD Topbar (logo + timer + score)
└── Stage
    └── Board (plateau de jeu)
        ├── GameCard (carte active)
        └── Choices (sélections)
```

## 🧩 Composants créés

### 1. **ArcadeLayout** - Container principal
```tsx
<ArcadeLayout theme="handicap" showHUD hudProps={{...}}>
  {children}
</ArcadeLayout>
```
- Gère les 9 thèmes métiers
- Applique le CSS arcade automatiquement
- HUD optionnel avec timer + score

### 2. **GameCard** - Cartes de jeu
```tsx
<GameCard
  title="Devine le métier"
  icon="/icones/icone-handicap.svg"
  active
  flippable
  footerActions={<button>Valider</button>}
>
  <p>Contenu de la carte</p>
</GameCard>
```
- Glass morphism avec bordures lumineuses
- Effet flip 3D optionnel (CSS pur)
- Header thématique avec icône + couleur accent

### 3. **Choices** - Zone de sélection
```tsx
<Choices
  choices={[
    { id: '1', label: 'Éducateur spécialisé', icon: '/icones/...' },
    { id: '2', label: 'Psychologue', selected: true }
  ]}
  onSelect={handleSelect}
  multiSelect
  maxSelections={3}
/>
```
- Chips avec effets glow au hover
- Multi-sélection avec compteur
- Touch targets optimisés (≥56px)

### 4. **Toast** - Notifications
```tsx
{showToast && (
  <Toast
    message="Excellente réponse !"
    type="success"
    onClose={() => setShowToast(false)}
  />
)}
```
- Animation drop CSS pure
- 3 variants : success/error/info
- Auto-dismiss programmable

### 5. **HUD** - Interface de jeu
- Timer avec barre scaleX animée
- Score circulaire (conic-gradient)
- Brand avec logo + équipe active

## 🎭 Système de thèmes

### 9 Thèmes métiers disponibles
```typescript
type ThemeType =
  | 'handicap'      // Turquoise #41d1b6
  | 'parentalite'   // Rose     #ff679a
  | 'scolarite'     // Bleu     #2196f3
  | 'prevention'    // Jaune    #ffc857
  | 'protection'    // Rouge    #e53e3e
  | 'insertion'     // Vert     #13c58c
  | 'mobilite'      // Violet   #7d5fff
  | 'multiaccueil'  // Lime     #8bc34a
  | 'multimedia'    // Cyan     #00bcd4
```

### Changement de thème
```tsx
// Applique automatiquement les variables CSS
<ArcadeLayout theme="handicap">
  {/* Couleur accent, pattern, glow adaptés */}
</ArcadeLayout>
```

## 🎬 Animations CSS intégrées

### 1. Timer countdown
```css
.timer__bar--countdown {
  animation: countdown 150s linear forwards;
}
@keyframes countdown {
  to { transform: scaleX(0); }
}
```

### 2. Card pulse active
```css
.card--active {
  animation: pulse-glow 2.4s ease-in-out infinite;
}
```

### 3. Flip 3D
```css
.flip-card.flipped {
  transform: rotateY(180deg);
}
```

### 4. Confettis célébration
```css
.stage--celebrate::after {
  background-image: radial-gradient(...);
  animation: confetti 12s linear infinite;
}
```

## 📱 Écrans refactorisés

### StartScreen
- **Avant** : Corporate blanc/bleu
- **Après** : Splash avec logo mask + gradient, particules flottantes, bouton arcade premium

### GameInfoScreen
- **Avant** : Card simple avec infos
- **Après** : Glass cards avec domaines métiers, badge scoring, navigation fluide

### GameplayExampleScreen (nouveau)
- Démontre l'architecture complète HUD + Stage
- Timer fonctionnel, système de score
- Toasts feedback, thématisation dynamique

## 🔧 CSS Variables utilisées

```css
/* Couleurs arcade */
--pep-blue: #2196f3;
--pep-pink: #ff679a;
--accent: var(--pep-blue); /* Modifiable par thème */

/* Glass morphism */
--glass: rgba(255, 255, 255, 0.06);
--glass-border: rgba(255, 255, 255, 0.1);

/* Texte sombre */
--ink: #e9eef8;
--ink-soft: #c7d1f3;
--ink-muted: #8a95b2;

/* Ombres et profondeur */
--shadow-glow: 0 0 20px rgba(33, 150, 243, 0.3);
--accent-glow: 0 0 20px var(--accent);
```

## 🎯 Avantages de l'architecture

### UX/UI
- **Immersion totale** : Expérience gaming premium
- **Feedback immédiat** : Animations et toasts fluides
- **Thématisation** : 9 univers visuels métiers
- **Accessibilité** : Contrastes, focus, reduced-motion

### Technique
- **CSS pur** : Zero-JS pour les animations (Brief requis)
- **Performance** : Backdrop-filter optimisé, variables CSS
- **Maintenabilité** : Composants modulaires, thèmes centralisés
- **iPad optimisé** : Touch targets, format paysage

### Évolutivité
- **Nouveaux thèmes** : Ajout simple de variables CSS
- **Composants** : Architecture réutilisable
- **Animations** : Système extensible

## 🚀 Utilisation

### Import des composants
```tsx
import { ArcadeLayout, GameCard, Choices, Toast } from '@/components/arcade';
```

### Écran de jeu type
```tsx
export default function MyGameScreen() {
  return (
    <ArcadeLayout theme="handicap" showHUD hudProps={{...}}>
      <GameCard title="Défi" active>
        <p>Question du défi...</p>
      </GameCard>

      <Choices
        choices={choicesData}
        onSelect={handleSelect}
      />
    </ArcadeLayout>
  );
}
```

## 🎮 Prochaines étapes

1. **Intégrer** les nouveaux composants dans GameScreen.tsx
2. **Adapter** EndScreen avec confettis CSS
3. **Tester** sur iPad réel (interactions tactiles)
4. **Optimiser** les performances (will-change, transform3d)

---

*L'application **Terres de Compétences** respecte maintenant pleinement le Brief_Graphisme.md avec une expérience arcade premium moderne et immersive.* 🎯