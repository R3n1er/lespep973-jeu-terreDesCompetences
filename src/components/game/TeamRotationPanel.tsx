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
    <section className="w-full max-w-4xl rounded-2xl border border-brand-primary/20 bg-white/80 p-6 shadow-card backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase text-neutral-500">Équipe en cours</p>
          <h3 className="text-2xl font-bold text-brand-primary">{currentTeam.nom}</h3>
        </div>
        <div>
          <p className="text-sm uppercase text-neutral-500">Équipe suivante</p>
          <h4 className="text-lg font-semibold text-neutral-700">{nextTeam.nom}</h4>
        </div>
        <div className="text-right">
          <p className="text-sm uppercase text-neutral-500">
            {isIntermission ? "Intermission" : "Temps restant"}
          </p>
          <p className="text-3xl font-bold text-neutral-900">{seconds}s</p>
        </div>
      </div>
    </section>
  );
}


