import { useGameTimer } from "@/hooks/useGameTimer";
import { useTeamRotation } from "@/hooks/useTeamRotation";
import ChallengeRenderer from "@/components/game/ChallengeRenderer";
import TimerDisplay from "@/components/game/TimerDisplay";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import TeamRotationPanel from "@/components/game/TeamRotationPanel";
import AnswerFeedback from "@/components/game/AnswerFeedback";
import OfflineIndicator from "@/components/game/OfflineIndicator";
import { useGameContext } from "@/context/useGameContext";
import { useMemo, useState } from "react";

type GameScreenProps = {
  onFinish: () => void;
};

export default function GameScreen({ onFinish }: GameScreenProps) {
  const { state: gameState, teams, actions, challenges } = useGameContext();
  const { state, start, pause } = useGameTimer(150000);
  const {
    state: rotationState,
    start: startRotation,
    pause: pauseRotation,
    currentTeam,
    nextTeam,
  } = useTeamRotation(teams);
  const [feedback, setFeedback] = useState({
    visible: false,
    isCorrect: false,
    points: 0,
  });

  const currentChallenge = useMemo(
    () =>
      gameState.currentChallenge ??
      challenges[gameState.challengeIndex] ??
      null,
    [gameState, challenges]
  );

  if (state.timeRemaining === 0 && state.isRunning) {
    pause();
    pauseRotation();
    actions.resetGame().then(() => onFinish());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 p-6">
        <h2 className="text-3xl font-bold text-neutral-900">Session de jeu</h2>
        <TimerDisplay
          timeRemaining={state.timeRemaining}
          isRunning={state.isRunning}
          alerts={state.alerts}
        />
        <TeamRotationPanel
          currentTeam={currentTeam}
          nextTeam={nextTeam}
          timeRemaining={rotationState.timeRemaining}
          isIntermission={rotationState.isIntermission}
        />
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-brand-primary px-5 py-2 text-white font-semibold"
            onClick={() => {
              start();
              startRotation();
              actions.startGame();
            }}
          >
            Démarrer
          </button>
          <button
            className="rounded-lg border border-brand-primary px-5 py-2 text-brand-primary font-semibold"
            onClick={() => {
              pause();
              pauseRotation();
            }}
          >
            Pause
          </button>
        </div>
        <div className="w-full max-w-4xl mt-8">
          {currentChallenge && (
            <ChallengeRenderer
              challenge={currentChallenge}
              onSubmit={({ selectedMetier, selectedCompetences }) => {
                const selectedOptions = selectedMetier
                  ? [selectedMetier]
                  : selectedCompetences ?? [];
                const correctAnswers = currentChallenge.correctAnswers;
                const correctCount = selectedOptions.filter((option) =>
                  correctAnswers.includes(option)
                ).length;
                const isCorrect =
                  currentChallenge.type === "competences-to-metier"
                    ? correctCount === correctAnswers.length
                    : correctCount >= 4;
                const pointsEarned = isCorrect
                  ? currentChallenge.points
                  : Math.round(
                      currentChallenge.points *
                        (correctCount / correctAnswers.length)
                    );

                actions.submitResponse({
                  challengeId: currentChallenge.id,
                  teamId: currentTeam.id,
                  selectedOptions,
                  timeSpent: 150000 - state.timeRemaining,
                  isCorrect,
                  pointsEarned,
                  timestamp: Date.now(),
                });

                setFeedback({ visible: true, isCorrect, points: pointsEarned });
                actions.advanceChallenge();
                actions.nextTeam();
                start();
                startRotation();
              }}
            />
          )}
        </div>
        <CountdownOverlay
          timeRemaining={state.timeRemaining}
          isActive={state.countdownMode === "audio-visual"}
        />
        <OfflineIndicator />
        <AnswerFeedback
          visible={feedback.visible}
          isCorrect={feedback.isCorrect}
          pointsEarned={feedback.points}
          onComplete={() =>
            setFeedback({ visible: false, isCorrect: false, points: 0 })
          }
        />
      </div>
    </div>
  );
}
