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
    <Card
      className="card--game"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
    >
      <CardHeader>
        <CardTitle>Associez les compétences au métier</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="competence-list">
          {competences.map((c) => (
            <li key={c} className="competence-list__item">
              <span className="competence-bullet">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <div className="selection-grid">
          {options.map((o) => (
            <motion.div key={o} whileHover={{ scale: selected === o ? 1 : 1.03 }}>
              <Button
                variant={selected === o ? "secondary" : "outline"}
                size="lg"
                className="selection-grid__button"
                onClick={() => setSelected(o)}
              >
                {o}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="selection-actions"
          whileHover={{ scale: selected ? 1.02 : 1 }}
        >
          <Button
            size="xl"
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
