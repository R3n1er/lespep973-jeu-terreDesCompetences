import type { Challenge } from "@/types/game";
import CompetencesToMetier from "@/components/game/CompetencesToMetier";
import MetierToCompetences from "@/components/game/MetierToCompetences";
import ChallengeTransition from "@/components/game/ChallengeTransition";

type ChallengeRendererProps = {
  challenge: Challenge;
  onSubmit: (payload: {
    selectedMetier?: string;
    selectedCompetences?: string[];
  }) => void;
};

export default function ChallengeRenderer({
  challenge,
  onSubmit,
}: ChallengeRendererProps) {
  return (
    <ChallengeTransition challengeKey={challenge.id}>
      {challenge.type === "competences-to-metier" && (
        <CompetencesToMetier
          competences={challenge.competences}
          options={challenge.options}
          onSubmit={(selected) => onSubmit({ selectedMetier: selected })}
        />
      )}
      {challenge.type === "metier-to-competences" && (
        <MetierToCompetences
          challenge={challenge}
          onSubmit={(selected) => onSubmit({ selectedCompetences: selected })}
        />
      )}
    </ChallengeTransition>
  );
}
