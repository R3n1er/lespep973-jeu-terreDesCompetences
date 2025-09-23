import type { Challenge } from "@/types/game";
import CompetencesToMetier from "@/components/game/CompetencesToMetier";

type ChallengeRendererProps = {
  challenge: Challenge;
  onSubmit: (payload: { selectedMetier?: string }) => void;
};

export default function ChallengeRenderer({
  challenge,
  onSubmit,
}: ChallengeRendererProps) {
  if (challenge.type === "competences-to-metier") {
    return (
      <CompetencesToMetier
        competences={challenge.competences}
        options={challenge.options}
        onSubmit={(selected) => onSubmit({ selectedMetier: selected })}
      />
    );
  }

  return null;
}
