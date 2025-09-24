import type { Team } from "@/types/game";
import { cn } from "@/lib/utils";

type TeamRotationPanelProps = {
  currentTeam: Team;
  nextTeam: Team;
  timeRemaining: number;
  isIntermission: boolean;
  className?: string;
};

export default function TeamRotationPanel({ currentTeam, nextTeam, timeRemaining, isIntermission, className }: TeamRotationPanelProps) {
  const seconds = Math.ceil(timeRemaining / 1000);

  return (
    <section className={cn("rotation-panel glass-panel", isIntermission && "rotation-panel--intermission", className)}>
      <div className="rotation-panel__item">
        <span className="rotation-panel__label">Équipe en cours</span>
        <span className="rotation-panel__value">{currentTeam.nom}</span>
      </div>
      <div className="rotation-panel__item">
        <span className="rotation-panel__label">Équipe suivante</span>
        <span className="rotation-panel__value rotation-panel__value--muted">{nextTeam.nom}</span>
      </div>
      <div className="rotation-panel__timer">
        <span className="rotation-panel__label">
          {isIntermission ? "Intermission" : "Temps équipe"}
        </span>
        <span className="rotation-panel__countdown">{seconds}s</span>
      </div>
    </section>
  );
}

