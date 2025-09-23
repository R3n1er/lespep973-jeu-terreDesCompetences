import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-neutral-100 pt-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <Card className="bg-gradient-to-br from-brand-primary/15 via-neutral-0 to-brand-secondary/15">
          <CardContent className="flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border-4 border-neutral-900 bg-brand-primary px-6 py-2 text-sm font-semibold uppercase text-white shadow-[0_6px_0_#0f172a]">
              <span>Terres de Compétences</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
              Jeu interactif pour découvrir les métiers ADPEP Guyane
            </h1>
            <p className="max-w-2xl text-lg text-neutral-700">
              Optimisé pour tablette iPad, le projet associe défis compétences ↔ métiers, rotation automatique des équipes et gestion hors-ligne.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" onClick={onStart}>
                Commencer le jeu
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/docs/ReglesDuJeu.md">Lire la documentation</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
