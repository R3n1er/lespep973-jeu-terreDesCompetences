# claude.md - Terres de Compétences ADPEP GUYANE

## Contexte Projet

**Application web interactive** pour journée institutionnelle 2025 ADPEP GUYANE (association médico-sociale).
**Objectif** : 13 équipes découvrent 15 métiers via jeu d'association compétences ↔ métiers.
**Format** : Rotation 2min30/équipe sur tablette, 10min total.

## Stack Technique 2025

```typescript
// Core
React: 19.1.0          // Server Components, Actions, useActionState
TypeScript: 5.6+       // Strict typing
Vite: 7.0             // Rolldown bundler, 5x faster
Node: 20.19+/22.12+   // ESM native

// UI/Styling
TailwindCSS: v4.0     // New engine, @layer, @theme
Shadcn/ui: CLI 3.0    // React 19 + Tailwind v4 compatible
Motion: 12.23.18      // Animations (ex-Framer Motion)
Radix UI: primitives  // Accessibility

// Testing Stack
Vitest: 3.x          // Unit/Integration - Vite-native, 4-20x faster
Playwright: 1.48+    // E2E testing - Cross-browser
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
@vitest/ui           // Visual test runner

// Dev Tools
ESLint + Prettier
Husky (git hooks)    // Pre-commit testing
lint-staged         // Staged files testing
```

## Architecture Données

### Types Métier Core

```typescript
interface JobProfile {
  id: string;
  nom: string;
  secteur:
    | "administratif"
    | "paramédical"
    | "pédagogique"
    | "social"
    | "général";
  competences: Competence[];
}

interface Competence {
  id: string;
  libelle: string;
  type: "spécifique" | "transversale" | "comportementale";
}

interface Team {
  id: string;
  nom: string;
  membres: TeamMember[];
}

interface Challenge {
  id: string;
  type: "competences-to-metier" | "metier-to-competences";
  question: string;
  options: string[];
  correctAnswers: string[];
  points: number;
}

interface GameState {
  phase: "setup" | "playing" | "rotation" | "finished";
  currentTeam: Team | null;
  timeRemaining: number;
  score: number;
}
```

### Context Pattern

```typescript
// GameContext.tsx - État global
interface GameContextType {
  state: GameState;
  teams: Team[];
  currentChallenge: Challenge | null;
  actions: {
    startGame: () => void;
    nextTeam: () => void;
    submitAnswer: (answer: string[]) => void;
    resetGame: () => void;
  };
}

// Usage pattern
const { state, actions } = useGameContext();
```

## Patterns de Développement

### Composants Structure

```typescript
// Naming convention: PascalCase
// Props interface: ComponentNameProps
// Export: default export

interface GameTimerProps {
  duration: number;
  onTimeout: () => void;
  className?: string;
}

export default function GameTimer({
  duration,
  onTimeout,
  className,
}: GameTimerProps) {
  // Hook logic first
  const [timeLeft, setTimeLeft] = useState(duration);

  // Effects
  useEffect(() => {
    // timer logic
  }, [duration]);

  // Render with Tailwind v4 + Motion
  return (
    <motion.div
      className={cn("timer-container", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* content */}
    </motion.div>
  );
}
```

### Hooks Pattern

```typescript
// Custom hooks: use[Description]
// Always return object for clarity

export function useGameTimer(duration: number, onTimeout: () => void) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setTimeRemaining(duration);
    setIsRunning(false);
  }, [duration]);

  return { timeRemaining, isRunning, start, pause, reset };
}
```

## Styling Conventions

### Tailwind v4 Patterns

```typescript
// Theme variables in CSS
@theme {
  --color-primary: #0066cc;
  --color-success: #16a34a;
  --color-warning: #f59e0b;
  --color-error: #dc2626;
}

// Component styling
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        success: "bg-success text-white hover:bg-success/90",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg"
      }
    }
  }
);
```

### Motion Animations

```typescript
// Standard transitions
const slideIn = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 300 },
};

// Usage
<motion.div {...slideIn}>content</motion.div>;
```

## Écrans Application

1. **Accueil** : Logo ADPEP + Start button
2. **Configuration** : Teams setup (13 max)
3. **Jeu Actif** : Timer + Challenge + Score
4. **Transition** : Team rotation (5s countdown)
5. **Résultats** : Final scores + export

### Défis Types

- **Type 1** : 3-6 compétences → 1 métier (choix multiple)
- **Type 2** : 1 métier → 6 compétences (sélection)

## Règles Métier

### Scoring

```typescript
function calculateScore(
  response: UserResponse,
  challenge: Challenge,
  timeSpent: number
): number {
  const accuracy = correctAnswers / totalAnswers;
  const timeBonus = Math.max(0, (timeLimit - timeSpent) / timeLimit);
  return Math.round(basePoints * accuracy * (1 + timeBonus * 0.2));
}
```

### Performance Levels

- > 80% : "Performance exceptionnelle"
- 65-80% : "Belle réussite"
- 50-65% : "Bonne performance"
- 40-50% : "Question bonus"
- <40% : "Apprentissage renforcé"

## Contraintes Techniques

### RGPD Compliance

- **Pas de données personnelles** stockées
- **LocalStorage uniquement** (pas de serveur)
- **Export anonymisé** des résultats
- **Auto-clear** en fin de session

### Performance

- **Tablette-first** design (touch optimized)
- **Bundle < 1MB** (Vite tree-shaking)
- **60fps animations** (Motion optimized)
- **Offline ready** (local data)

### Browser Support

- Safari 16.4+, Chrome 111+, Firefox 128+
- Modern ES features (ESM, optional chaining, nullish coalescing)

## Données Métiers

### Secteurs ADPEP

```typescript
const SECTEURS = {
  administratif: ["agent-accueil", "assistant-rh", "comptable"],
  paramédical: ["aide-soignant", "ergotherapeute", "orthophoniste"],
  pédagogique: ["educateur-specialise", "educateur-jeunes-enfants"],
  social: ["assistant-service-social"],
  général: ["agent-service-interieur", "chauffeur-accompagnateur"],
} as const;
```

## Tests Strategy

### Vitest Config

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test-setup.ts",
    coverage: {
      provider: "v8",
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

### Playwright E2E Config

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

### Pre-commit Strategy

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "pre-push": "npm run test:run && npm run test:e2e",
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write", "vitest related --run"]
  }
}
```

### Husky Git Hooks

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."
npm run pre-commit

# .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Running pre-push tests..."
npm run pre-push
```

### Test Patterns

```typescript
// Unit Tests - Vitest
describe("GameTimer Component", () => {
  test("counts down correctly", async () => {
    const mockTimeout = vi.fn();
    render(<GameTimer duration={10} onTimeout={mockTimeout} />);

    expect(screen.getByText("00:10")).toBeInTheDocument();

    vi.advanceTimersByTime(10000);
    await waitFor(() => expect(mockTimeout).toHaveBeenCalled());
  });

  test("handles pause/resume", () => {
    const { result } = renderHook(() => useGameTimer(60, vi.fn()));

    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);

    act(() => result.current.pause());
    expect(result.current.isRunning).toBe(false);
  });
});

// Integration Tests - Vitest
describe("Game Flow Integration", () => {
  test("complete team rotation cycle", async () => {
    const user = userEvent.setup();
    render(
      <GameProvider>
        <GameFlow />
      </GameProvider>
    );

    // Start game
    await user.click(screen.getByText("Commencer"));

    // Answer challenge
    await user.click(screen.getByText("Agent de service"));
    await user.click(screen.getByText("Valider"));

    // Verify score update
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });
});

// E2E Tests - Playwright
test("full game session workflow", async ({ page }) => {
  await page.goto("/");

  // Start game
  await page.click("text=Commencer le jeu");

  // Complete first challenge
  await page.click("text=Agent de service intérieur");
  await page.click("text=Valider");

  // Wait for feedback
  await page.waitForSelector("text=Correct");

  // Verify team rotation
  await page.waitForSelector("text=Équipe 2", { timeout: 180000 });

  // Complete game session
  await page.waitForSelector("text=Résultats finaux", { timeout: 600000 });

  // Verify export functionality
  await page.click("text=Exporter les résultats");

  // Check download
  const download = await page.waitForEvent("download");
  expect(download.suggestedFilename()).toMatch(/terres-competences-results/);
});

// Performance Tests
test("game renders within performance budget", async ({ page }) => {
  await page.goto("/");

  const startTime = Date.now();
  await page.waitForSelector("text=Commencer le jeu");
  const loadTime = Date.now() - startTime;

  expect(loadTime).toBeLessThan(2000); // < 2s load

  // Check bundle size
  const responses = await page.evaluate(() =>
    performance.getEntriesByType("navigation")
  );
  expect(responses[0].transferSize).toBeLessThan(1024 * 1024); // < 1MB
});
```

### Testing Commands

```bash
# Unit & Integration Tests
npm run test              # Watch mode
npm run test:run          # Single run
npm run test:coverage     # With coverage report
npm run test:ui           # Visual test runner

# E2E Tests
npm run test:e2e          # All browsers
npm run test:e2e:ui       # Interactive mode
npx playwright test --headed --project=chromium  # Debug mode

# Pre-push Validation
npm run pre-push          # Full test suite
npm run lint              # Code quality only
npm run type-check        # TypeScript only
```

### CI/CD Pipeline (.github/workflows/test.yml)

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci
      - run: npm run test:run
      - run: npm run test:e2e

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Development Guidelines

### Code Standards

- **ESLint + Prettier** enforced via Husky
- **Strict TypeScript** - no `any`, prefer unions
- **Functional components** only (no class components)
- **Custom hooks** for reusable logic
- **Error boundaries** for production stability

### Testing Requirements ⚠️ OBLIGATOIRE

```bash
# AVANT CHAQUE git push - Tests automatisés via Husky
1. Unit tests (Vitest) ✅
2. Integration tests (Vitest) ✅
3. E2E critical paths (Playwright) ✅
4. Coverage threshold (80%+) ✅
5. TypeScript compilation ✅
6. ESLint validation ✅

# Commandes de validation
npm run pre-push         # Validation complète (obligatoire)
npm run test:coverage    # Vérifier coverage
npm run test:e2e         # Tests end-to-end
```

### Git Workflow avec Tests

```bash
# 1. Développer la fonctionnalité
git add .
git commit -m "feat: add team rotation logic"

# 2. Tests automatiques pre-commit (Husky)
#    ✅ lint-staged exécute ESLint + Prettier + tests related

# 3. Push avec validation complète
git push origin feature-branch
#    ✅ Husky pre-push hook exécute:
#        - npm run test:run (tous les tests unitaires)
#        - npm run test:e2e (tests E2E critiques)
#        - Coverage validation (80%+ requis)

# 4. Si échec de test = Push bloqué ❌
#    Fix required avant push
```

### Test-Driven Development

```typescript
// 1. Écrire le test AVANT la fonctionnalité
test("GameScore calculates bonus correctly", () => {
  const score = calculateScore({
    correctAnswers: 5,
    totalAnswers: 6,
    timeSpent: 45,
    timeLimit: 60,
  });

  expect(score.basePoints).toBe(83); // 5/6 * 100
  expect(score.timeBonus).toBe(17); // 15s bonus
  expect(score.total).toBe(100);
});

// 2. Implémenter la fonctionnalité
function calculateScore(params: ScoreParams): ScoreResult {
  // Implementation to make test pass
}

// 3. Refactor si nécessaire
```

### Coverage Requirements

```typescript
// Minimum coverage per file type:
Components: 85%+        // UI critical pour l'expérience
Hooks: 90%+            // Logique métier essentielle
Utils: 95%+            // Fonctions pures, testables
Game Logic: 95%+       // Scoring, timer, règles métier

// Exclusions coverage:
- *.config.ts
- *.d.ts
- test-setup.ts
- main.tsx
```

### File Structure

```
src/
├── components/
│   ├── game/          # Game-specific components
│   ├── ui/            # Generic UI components
│   └── screens/       # Page-level components
├── hooks/             # Custom hooks
├── contexts/          # React contexts
├── data/              # Static game data
├── lib/               # Utilities
└── types/             # TypeScript definitions
```

### Commit Convention

```bash
feat: add team rotation component
fix: timer pause functionality
test: add challenge component tests
docs: update README game rules
style: format code with prettier
refactor: simplify score calculation
```

## Instructions Développement

1. **Priorité performance** - Tablette 60fps requis
2. **Mobile-first** - Touch interactions fluides
3. **Accessible** - ARIA labels, keyboard navigation
4. **Robust** - Error handling, edge cases
5. **Testable** - Unit tests required pour logique métier

### 🚨 Testing Workflow OBLIGATOIRE

```bash
# Chaque nouvelle fonctionnalité:
1. Écrire tests AVANT implémentation (TDD)
2. Implémenter fonctionnalité
3. Tests passent à 100% ✅
4. Coverage ≥ 80% ✅
5. E2E path critique testé ✅
6. git push (validation automatique via Husky)

# Claude Code: TOUJOURS générer tests avec le code
"Implémente GameTimer avec tests Vitest complets"
"Crée useGameContext avec tests unitaires et d'intégration"
"Ajoute composant ChallengeCard + tests Playwright E2E"
```

### Claude Code Testing Instructions

```markdown
⚠️ IMPORTANT: Chaque composant/hook/util généré doit inclure:

1. Tests unitaires Vitest ✅
2. Tests d'intégration si applicable ✅
3. Test E2E Playwright pour parcours critique ✅
4. Mocks appropriés pour dépendances ✅
5. Coverage des edge cases ✅

Exemple prompt:
"Crée le composant GameScore avec:

- Props validation TypeScript
- Tests Vitest complets (happy path + edge cases)
- Test E2E Playwright pour affichage score
- Coverage 90%+"
```

### Quick Commands

```bash
# Development
npm run dev          # Development server
npm run build        # Production build

# Testing (Obligatoire avant push)
npm run test         # Unit tests watch mode
npm run test:run     # Unit tests single run
npm run test:coverage # Coverage report (80%+ requis)
npm run test:e2e     # E2E tests Playwright
npm run test:e2e:ui  # E2E interactive mode

# Quality & Push
npm run lint         # ESLint validation
npm run type-check   # TypeScript compilation
npm run pre-push     # 🚨 VALIDATION COMPLÈTE (obligatoire)

# Setup Tests Initiaux
npm run test:setup   # Install Playwright browsers
npx husky install    # Setup git hooks
```

### Testing Framework Notes

```typescript
// Choix 2025: Vitest (recommandé) vs Jest
// ✅ Vitest: React + Vite projects
//    - 4-20x plus rapide que Jest
//    - Config partagée avec Vite
//    - ESM natif, TypeScript, HMR tests
//    - Même API que Jest (migration facile)

// ⚠️ Jest: Uniquement si legacy ou React Native
//   - Plus mature, community large
//   - Setup plus complexe avec Vite
//   - Performances moindres

// Configuration Jest alternative (si requis)
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)

---

**Context optimal fourni** - Développe avec ces patterns et conventions pour cohérence maximale.: 'ts-jest',
  },
  moduleNameMapping: {
    '\\.(css|scss)

---

**Context optimal fourni** - Développe avec ces patterns et conventions pour cohérence maximale.: 'identity-obj-proxy',
  },
};
```

---

**Context optimal fourni** - Développe avec ces patterns et conventions pour cohérence maximale.
