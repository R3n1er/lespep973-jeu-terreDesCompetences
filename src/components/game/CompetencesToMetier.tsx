import { useState } from "react";

type Props = {
  competences: string[];
  options: string[];
  onSubmit: (selected: string) => void;
};

export default function CompetencesToMetier({
  competences,
  options,
  onSubmit,
}: Props) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="max-w-4xl w-full">
      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
        Associez les compétences au métier
      </h3>
      <ul className="mb-6 list-disc pl-6 text-neutral-800">
        {competences.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((o) => (
          <button
            key={o}
            className={`rounded-lg border px-4 py-3 font-semibold transition ${
              selected === o
                ? "bg-brand-primary text-white border-brand-primary"
                : "border-brand-primary text-brand-primary hover:bg-brand-primary/10"
            }`}
            onClick={() => setSelected(o)}
          >
            {o}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="rounded-lg bg-brand-primary px-6 py-3 text-white font-semibold disabled:opacity-50"
          disabled={!selected}
          onClick={() => selected && onSubmit(selected)}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
