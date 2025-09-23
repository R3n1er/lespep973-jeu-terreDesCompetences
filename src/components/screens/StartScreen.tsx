import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-neutral-100 pt-16">
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card className="bg-gradient-to-br from-brand-primary/15 via-neutral-0 to-brand-secondary/15">
          <CardContent className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border-4 border-neutral-900 bg-brand-primary px-6 py-2 text-sm font-semibold uppercase text-white shadow-[0_6px_0_#0f172a]"
            >
              <span>Terres de Compétences</span>
            </motion.div>
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 250, damping: 22 }}
            >
              Jeu interactif pour découvrir les métiers ADPEP Guyane
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-neutral-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 250, damping: 22 }}
            >
              Optimisé pour tablette iPad, le projet associe défis compétences ↔ métiers, rotation automatique des équipes et gestion hors-ligne.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 350, damping: 26 }}
            >
              <Button size="lg" onClick={onStart}>
                Commencer le jeu
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/docs/ReglesDuJeu.md">Lire la documentation</a>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
