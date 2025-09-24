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
  const jobLabel = useMemo(
    () => getJobLabel(challenge.metier),
    [challenge.metier]
  );

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
      className="card--game"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
    >
      <CardHeader>
        <CardTitle>
          Sélectionnez 6 compétences pour {jobLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="selection-counter">
          Sélection en cours: {selected.size}/{MAX_SELECTION}
        </p>
        <div className="selection-grid">
          {challenge.options.map((option) => {
            const isSelected = selected.has(option);
            const isDisabled = !isSelected && selected.size >= MAX_SELECTION;
            return (
              <motion.div
                key={option}
                whileHover={{ scale: isDisabled ? 1 : 1.03 }}
              >
                <Button
                  variant={isSelected ? "secondary" : "outline"}
                  size="lg"
                  className="selection-grid__button"
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
          <div className="selection-badges">
            {Array.from(selected).map((option) => (
              <span
                key={option}
                className="selection-badge"
              >
                {getCompetenceLabel(option)}
              </span>
            ))}
          </div>
        )}

        <div className="selection-actions">
          <Button
            size="xl"
            disabled={selected.size !== MAX_SELECTION}
            onClick={handleSubmit}
          >
            Valider
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setSelected(new Set())}
          >
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
