import { useGameTimer } from "@/hooks/useGameTimer";
import { useTeamRotation } from "@/hooks/useTeamRotation";
import ChallengeRenderer from "@/components/game/ChallengeRenderer";
import TimerDisplay from "@/components/game/TimerDisplay";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import PauseOverlay from "@/components/game/PauseOverlay";
import TeamRotationPanel from "@/components/game/TeamRotationPanel";
import AnswerFeedback from "@/components/game/AnswerFeedback";
import OfflineIndicator from "@/components/game/OfflineIndicator";
import { useGameContext } from "@/context/useGameContext";
import { calculatePartialScore } from "@/lib/scoring";
import { useMemo, useState } from "react";
import StatsPanel from "@/components/game/StatsPanel";
import { AppShell } from "@/components/arcade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { THEME_ICONS } from "@/components/arcade/themes";

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
    correctMatches: 0,
    incorrectMatches: 0,
    total: 0,
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

  const timeRemainingSeconds = Math.max(0, Math.ceil(state.timeRemaining / 1000));
  const totalTimeSeconds = 150;
  const hudMaxScore = Math.max(1, challenges.length * 120);
  const activeTheme = gameState.currentTheme ?? currentChallenge?.theme ?? "scolarite";

  return (
    <AppShell
      theme={activeTheme}
      hud={{
        timeRemaining: timeRemainingSeconds,
        totalTime: totalTimeSeconds,
        score: gameState.score.globalScore,
        maxScore: hudMaxScore,
        teamName: currentTeam?.nom,
      }}
      footerSlot={<OfflineIndicator />}
      boardClassName="relative flex w-full max-w-6xl flex-col gap-6 px-8 py-8"
    >
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="glass-panel glass-panel--halo flex-1 overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={THEME_ICONS[activeTheme]}
                alt={activeTheme}
                className="h-10 w-10 opacity-80"
              />
              <div className="flex flex-col items-start">
                <Badge variant="ghost" className="tracking-[0.3em] uppercase">
                  {currentChallenge?.difficulty ?? "défi"}
                </Badge>
                <h2 className="text-3xl font-black text-ink">Session de jeu</h2>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="accent"
                size="lg"
                onClick={() => {
                  start();
                  startRotation();
                  actions.startGame();
                }}
              >
                Lancer
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  pause();
                  pauseRotation();
                }}
              >
                Pause
              </Button>
            </div>
          </div>

          <TimerDisplay
            className="mt-6"
            timeRemaining={state.timeRemaining}
            isRunning={state.isRunning}
            alerts={state.alerts}
          />

          <TeamRotationPanel
            className="mt-6"
            currentTeam={currentTeam}
            nextTeam={nextTeam}
            timeRemaining={rotationState.timeRemaining}
            isIntermission={rotationState.isIntermission}
          />

          <div className="relative mt-6">
            {currentChallenge && (
              <ChallengeRenderer
                challenge={currentChallenge}
                onSubmit={({ selectedMetier, selectedCompetences }) => {
                  const selectedOptions = selectedMetier
                    ? [selectedMetier]
                    : selectedCompetences ?? [];

                  const breakdown = calculatePartialScore(currentChallenge, {
                    challengeId: currentChallenge.id,
                    teamId: currentTeam.id,
                    selectedOptions,
                    timeSpent: 150000 - state.timeRemaining,
                    isCorrect: false,
                    pointsEarned: 0,
                    timestamp: Date.now(),
                  });

                  const responsePayload = {
                    challengeId: currentChallenge.id,
                    teamId: currentTeam.id,
                    selectedOptions,
                    timeSpent: 150000 - state.timeRemaining,
                    isCorrect: breakdown.isCorrect,
                    pointsEarned: breakdown.pointsEarned,
                    timestamp: Date.now(),
                  };

                  actions.submitResponse(responsePayload);

                  setFeedback({
                    visible: true,
                    isCorrect: breakdown.isCorrect,
                    points: breakdown.pointsEarned,
                    correctMatches: breakdown.correctMatches,
                    incorrectMatches: breakdown.incorrectMatches,
                    total: breakdown.total,
                  });
                  actions.advanceChallenge();
                  actions.nextTeam();
                  start();
                  startRotation();
                }}
              />
            )}
          </div>
        </div>

        <aside className="w-full max-w-xs flex-shrink-0 space-y-4">
          <StatsPanel className="h-full" score={gameState.score} />
          <div className="glass-panel p-4 text-left">
            <h3 className="text-sm uppercase tracking-[0.3em] text-ink-muted mb-2">Prochain défi</h3>
            <p className="text-ink font-semibold">
              {challenges[(gameState.challengeIndex + 1) % challenges.length]?.question ?? "Préparation"}
            </p>
            <p className="text-ink-soft text-xs mt-2">
              Thème : {challenges[(gameState.challengeIndex + 1) % challenges.length]?.theme ?? "à venir"}
            </p>
          </div>
        </aside>
      </div>

      <PauseOverlay
        visible={rotationState.isIntermission}
        title="Intermission"
        subtitle="Préparez l'équipe suivante"
      />
      <CountdownOverlay
        timeRemaining={state.timeRemaining}
        isActive={state.countdownMode === "audio-visual"}
        theme={activeTheme}
      />
      <AnswerFeedback
        visible={feedback.visible}
        isCorrect={feedback.isCorrect}
        pointsEarned={feedback.points}
        correctMatches={feedback.correctMatches}
        incorrectMatches={feedback.incorrectMatches}
        total={feedback.total}
        onComplete={() =>
          setFeedback({
            visible: false,
            isCorrect: false,
            points: 0,
            correctMatches: 0,
            incorrectMatches: 0,
            total: 0,
          })
        }
      />
    </AppShell>
  );
}
