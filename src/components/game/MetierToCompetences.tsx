import { useMemo, useState } from "react";
import type { ChallengeMetierToCompetences } from "@/types/game";
import { getJobLabel, getCompetenceLabel } from "@/data/metiers";

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
    <div className="max-w-4xl w-full">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
        Sélectionnez 6 compétences pour {jobLabel}
      </h3>
      <p className="text-neutral-600 mb-4">
        Sélection en cours: {selected.size}/{MAX_SELECTION}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {challenge.options.map((option) => {
          const isSelected = selected.has(option);
          const isDisabled = !isSelected && selected.size >= MAX_SELECTION;
          return (
            <button
              key={option}
              className={`rounded-lg border px-4 py-3 text-left font-semibold transition ${
                isSelected
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "border-brand-primary text-brand-primary hover:bg-brand-primary/10"
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => toggle(option)}
              disabled={isDisabled}
            >
              {getCompetenceLabel(option)}
            </button>
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

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          className="rounded-lg bg-brand-primary px-6 py-3 text-white font-semibold disabled:opacity-50"
          disabled={selected.size !== MAX_SELECTION}
          onClick={handleSubmit}
        >
          Valider
        </button>
        <button
          className="rounded-lg border border-brand-primary px-6 py-3 text-brand-primary font-semibold"
          onClick={() => setSelected(new Set())}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
