import { Card, CardContent } from "@/components/ui/card";
import type { Team } from "@/types/game";

type TeamRotationPanelProps = {
  currentTeam: Team;
  nextTeam: Team;
  timeRemaining: number;
  isIntermission: boolean;
};

export default function TeamRotationPanel({ currentTeam, nextTeam, timeRemaining, isIntermission }: TeamRotationPanelProps) {
  const seconds = Math.ceil(timeRemaining / 1000);

  return (
    <Card className="w-full max-w-4xl bg-gradient-to-r from-brand-secondary/15 via-neutral-0 to-brand-primary/15">
      <CardContent className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Équipe en cours</p>
          <h3 className="text-2xl font-extrabold text-brand-primary">{currentTeam.nom}</h3>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Équipe suivante</p>
          <p className="text-lg font-semibold text-neutral-700">{nextTeam.nom}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            {isIntermission ? "Intermission" : "Temps équipe"}
          </p>
          <p className="text-3xl font-black text-neutral-900">{seconds}s</p>
        </div>
      </CardContent>
    </Card>
  );
}


