import { useMemo, useState } from "react";
import type { ChallengeMetierToCompetences } from "@/types/game";
import { getJobLabel, getCompetenceLabel } from "@/data/metiers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MAX_SELECTION = 6;

type Props = {
  challenge: ChallengeMetierToCompetences;
  onSubmit: (selected: string[]) => void;
};

export default function MetierToCompetences({ challenge, onSubmit }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const jobLabel = useMemo(() => getJobLabel(challenge.metier), [challenge.metier]);

  function toggle(option: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else if (next.size < MAX_SELECTION) {
        next.add(option);
      }
      return next;
    });
  }

  const handleSubmit = () => {
    if (selected.size === MAX_SELECTION) {
      onSubmit(Array.from(selected));
    }
  };

  return (
    <Card
      className="w-full bg-neutral-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
    >
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold text-neutral-900">
          Sélectionnez 6 compétences pour {jobLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-neutral-600 mb-2">
          Sélection en cours: {selected.size}/{MAX_SELECTION}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {challenge.options.map((option) => {
            const isSelected = selected.has(option);
            const isDisabled = !isSelected && selected.size >= MAX_SELECTION;
            return (
              <motion.div key={option} whileHover={{ scale: isDisabled ? 1 : 1.03 }}>
                <Button
                  variant={isSelected ? "secondary" : "outline"}
                  className="h-14 w-full text-left text-base"
                  onClick={() => toggle(option)}
                  disabled={isDisabled}
                >
                  {getCompetenceLabel(option)}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {selected.size > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-700">
            {Array.from(selected).map((option) => (
              <span
                key={option}
                className="rounded-full bg-brand-primary/10 px-3 py-1 text-brand-primary"
              >
                {getCompetenceLabel(option)}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" disabled={selected.size !== MAX_SELECTION} onClick={handleSubmit}>
            Valider
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSelected(new Set())}>
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
