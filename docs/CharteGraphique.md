# Charte graphique — LES PEP GUYANE (Jeu « Terres de Compétences »)

Source institutionnelle : [LES PEP GUYANE – site officiel](https://www.lespep973.org/)

Objectif : règles de cohérence visuelle pour l’application PWA iPad, compatibles accessibilité (a11y) et Tailwind CSS v4.

## 1) Logos et usages

- Formats recommandés : SVG (préféré), PNG @2x/@3x pour splash iOS.
- Dossier assets : `public/assets/brand/`
  - `logo-pep973.svg`
  - `logo-pep973-dark.svg`
  - `logo-pep973.png`
  - `icon-*.png` (icônes PWA)
- Zone de protection : marge min = hauteur du « P » du logo.
- Fond clair recommandé ; variante « dark » sur fond foncé.
- Tailles minimales écran :
  - Barre supérieure : ≥ 32px
  - Écran d’accueil : 96–128px

## 2) Couleurs (tokens à valider)

- Marque
  - `--brand-primary` : #0A6CC2 (à valider)
  - `--brand-secondary` : #24A148 (à valider)
  - `--brand-accent` : #FF7A00 (à valider)
- Neutres
  - `--neutral-0` : #FFFFFF
  - `--neutral-50` : #F7F7F7
  - `--neutral-100` : #EDEDED
  - `--neutral-700` : #3F3F46
  - `--neutral-900` : #18181B
- États
  - `--success` : #16A34A
  - `--warning` : #F59E0B
  - `--danger` : #DC2626

### Mapping Tailwind v4

Déclarer des variables CSS et les référencer dans Tailwind.

```css
/* src/styles/theme.css */
@layer theme, base, components, utilities;

@layer theme {
  :root {
    --brand-primary: #0A6CC2;
    --brand-secondary: #24A148;
    --brand-accent: #FF7A00;

    --neutral-0: #fff;
    --neutral-50: #f7f7f7;
    --neutral-100: #ededed;
    --neutral-700: #3f3f46;
    --neutral-900: #18181b;

    --success: #16a34a;
    --warning: #f59e0b;
    --danger: #dc2626;
  }
}

@layer base {
  html { color: var(--neutral-900); background: var(--neutral-0); }
}
```

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)'
        },
        neutral: {
          0: 'var(--neutral-0)',
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          700: 'var(--neutral-700)',
          900: 'var(--neutral-900)'
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)'
      },
      borderRadius: { md: '12px', lg: '16px', xl: '24px' },
      boxShadow: { card: '0 8px 24px rgba(0,0,0,0.08)' }
    }
  },
  plugins: []
} satisfies Config
```

## 3) Typographies

- Police système iOS : `-apple-system`, `SF Pro Text` (performance/lecture).
- Alternative (si autorisée) : `Inter`.
- Hiérarchie :
  - H1/H2 : 28–36px, 700
  - H3/H4 : 20–24px, 600
  - Corps : 16–18px, 400–500
  - Légendes : 12–14px

```css
/* src/styles/typography.css */
@layer base {
  :root {
    --font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  html { font-family: var(--font-sans); }
}
```

## 4) Iconographie & imagerie

- Icônes : trait simple, 24px min, 2px d’épaisseur.
- Images : fonds clairs, contrastes suffisants; éviter texte incrusté.
- Formats : SVG (icônes), WebP/PNG (images).

## 5) Accessibilité (a11y)

- Contrastes WCAG AA : ≥ 4.5:1 (texte normal), ≥ 3:1 (gros texte).
- Cibles tactiles : ≥ 44×44px (iPad), espacement 8–12px.
- États non-couleur (icône/texte) pour daltonismes.
- Respecter `prefers-reduced-motion`; proposer mode réduit.
- Focus visible et ordre de tabulation logique.

## 6) Composants UI — directives

- Boutons : arrondi `lg`, fond `brand.primary`, texte blanc; hover `brightness-95`; disabled `neutral-100`.
- Cards : fond blanc, `shadow-card`, rayon `xl`, padding 16–24px.
- Badges d’alerte : 30s en `warning`, 10s en `danger`.

## 7) PWA — icônes & splash iOS

- Générer au minimum : 192, 256, 384, 512 (`public/assets/brand/icon-*.png`).
- iOS splash (iPad paysage) : fond `--brand-primary` + logo centré.
- Manifest : `background_color`/`theme_color` = `--brand-primary`.

## 8) Structure des assets (proposée)

```
public/
  assets/
    brand/
      logo-pep973.svg
      logo-pep973-dark.svg
      icon-192.png
      icon-512.png
      splash-ios-2048x1536.png
```

## 9) Exemples d’usage Tailwind

```tsx
// Bouton principal
<button className="px-5 py-3 rounded-lg bg-brand-primary text-white shadow-card hover:brightness-95 active:scale-[0.98]">
  Commencer le jeu
</button>
```

```tsx
// Badge d’alerte temps
<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white bg-warning">
  00:30
</span>
```

---

Note : Les codes exacts et variantes (clair/sombre) doivent être validés par la communication des LES PEP GUYANE. Référence : [site officiel](https://www.lespep973.org/).

