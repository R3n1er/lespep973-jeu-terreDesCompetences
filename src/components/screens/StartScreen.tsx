type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">
          <span>Terres de Compétences</span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl">
          Jeu interactif pour découvrir les métiers ADPEP Guyane
        </h1>
        <p className="max-w-2xl text-lg text-neutral-700">
          Optimisé pour tablette iPad, le projet associe défis compétences ↔
          métiers, rotation automatique des équipes et gestion hors-ligne.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            className="rounded-lg bg-brand-primary px-6 py-3 text-base font-semibold text-white shadow-card transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
            onClick={onStart}
          >
            Commencer le jeu
          </button>
          <a
            className="rounded-lg border border-brand-primary px-6 py-3 text-base font-semibold text-brand-primary transition hover:bg-brand-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            href="/docs/ReglesDuJeu.md"
          >
            Lire la documentation
          </a>
        </div>
      </header>
    </div>
  );
}
