import { Card, CardContent } from "@/components/ui/card";
import type { ScoreData } from "@/types/game";

type StatsPanelProps = {
  score: ScoreData;
};

export default function StatsPanel({ score }: StatsPanelProps) {
  const successRate = score.totalChallenges
    ? Math.round((score.correctAnswers / score.totalChallenges) * 100)
    : 0;

  return (
    <Card className="w-full max-w-4xl bg-gradient-to-r from-brand-primary/15 via-neutral-0 to-brand-secondary/15">
      <CardContent className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Score global</p>
          <p className="text-2xl font-extrabold text-neutral-900">{score.globalScore} pts</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Réussites</p>
          <p className="text-xl font-bold text-brand-primary">{successRate}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Défis joués</p>
          <p className="text-xl font-semibold text-neutral-700">{score.totalChallenges}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Streak</p>
          <p className="text-xl font-semibold text-neutral-700">{score.streak}</p>
        </div>
      </CardContent>
    </Card>
  );
}

