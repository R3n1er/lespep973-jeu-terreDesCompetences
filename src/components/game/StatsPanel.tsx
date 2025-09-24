import type { ScoreData } from "@/types/game";
import { cn } from "@/lib/utils";

type StatsPanelProps = {
  score: ScoreData;
  className?: string;
};

export default function StatsPanel({ score, className }: StatsPanelProps) {
  const successRate = score.totalChallenges
    ? Math.round((score.correctAnswers / score.totalChallenges) * 100)
    : 0;

  return (
    <section className={cn("glass-panel stats-panel", className)}>
      <div className="stats-panel__item">
        <span className="stats-panel__label">Score global</span>
        <span className="stats-panel__value">{score.globalScore} pts</span>
      </div>
      <div className="stats-panel__item">
        <span className="stats-panel__label">Réussites</span>
        <span className="stats-panel__value stats-panel__value--accent">{successRate}%</span>
      </div>
      <div className="stats-panel__item">
        <span className="stats-panel__label">Défis joués</span>
        <span className="stats-panel__value">{score.totalChallenges}</span>
      </div>
      <div className="stats-panel__item">
        <span className="stats-panel__label">Streak</span>
        <span className="stats-panel__value">{score.streak}</span>
      </div>
    </section>
  );
}
