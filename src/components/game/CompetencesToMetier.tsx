import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card className="w-full bg-neutral-0">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold text-neutral-900">
          Associez les compétences au métier
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="grid gap-2 rounded-2xl border-4 border-neutral-900 bg-neutral-50 p-4 text-left text-neutral-800">
          {competences.map((c) => (
            <li key={c} className="text-base font-medium">
              • {c}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((o) => (
            <Button
              key={o}
              variant={selected === o ? "accent" : "outline"}
              className="h-14 text-base"
              onClick={() => setSelected(o)}
            >
              {o}
            </Button>
          ))}
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            disabled={!selected}
            onClick={() => selected && onSubmit(selected)}
          >
            Valider
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
