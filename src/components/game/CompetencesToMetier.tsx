import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <Card className="w-full bg-neutral-0" as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
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
            <motion.div key={o} whileHover={{ scale: 1.03 }}>
              <Button
                variant={selected === o ? "accent" : "outline"}
                className="h-14 w-full text-base"
                onClick={() => setSelected(o)}
              >
                {o}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div className="pt-4" whileHover={{ scale: selected ? 1.02 : 1 }}>
          <Button
            size="lg"
            disabled={!selected}
            onClick={() => selected && onSubmit(selected)}
          >
            Valider
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
