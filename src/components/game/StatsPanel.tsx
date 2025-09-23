import type { ScoreData } from "@/types/game";

type StatsPanelProps = {
  score: ScoreData;
};

export default function StatsPanel({ score }: StatsPanelProps) {
  const successRate = score.totalChallenges
    ? Math.round((score.correctAnswers / score.totalChallenges) * 100)
    : 0;

  return (
    <aside className="w-full max-w-4xl rounded-xl bg-white/80 p-4 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-neutral-500">Score global</p>
          <p className="text-2xl font-bold text-neutral-900">{score.globalScore} pts</p>
        </div>
        <div>
          <p className="text-sm uppercase text-neutral-500">Réussites</p>
          <p className="text-xl font-semibold text-brand-primary">{successRate}%</p>
        </div>
        <div>
          <p className="text-sm uppercase text-neutral-500">Défis joués</p>
          <p className="text-xl font-semibold text-neutral-700">{score.totalChallenges}</p>
        </div>
        <div>
          <p className="text-sm uppercase text-neutral-500">Streak</p>
          <p className="text-xl font-semibold text-neutral-700">{score.streak}</p>
        </div>
      </div>
    </aside>
  );
}

