import { useGameTimer } from "@/hooks/useGameTimer";
import { useTeamRotation } from "@/hooks/useTeamRotation";
import { CHALLENGES_CONFIGURATION } from "@/data/challenges";
import { TEAMS_SAMPLE } from "@/data/teams";
import ChallengeRenderer from "@/components/game/ChallengeRenderer";
import TimerDisplay from "@/components/game/TimerDisplay";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import TeamRotationPanel from "@/components/game/TeamRotationPanel";

type GameScreenProps = {
  onFinish: () => void;
};

export default function GameScreen({ onFinish }: GameScreenProps) {
  const { state, start, pause } = useGameTimer(150000);
  const { state: rotationState, start: startRotation, pause: pauseRotation, currentTeam, nextTeam } = useTeamRotation(TEAMS_SAMPLE);

  if (state.timeRemaining === 0 && state.isRunning) {
    pause();
    pauseRotation();
    onFinish();
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
        <p className="text-lg text-neutral-700">
          Temps restant: {Math.ceil(state.timeRemaining / 1000)}s
        </p>
        <div className="flex gap-4">
          <button
            className="rounded-lg bg-brand-primary px-5 py-2 text-white font-semibold"
            onClick={() => {
              start();
              startRotation();
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
          <ChallengeRenderer
            challenge={CHALLENGES_CONFIGURATION[0]}
            onSubmit={() => {
              onFinish();
            }}
          />
        </div>
        <CountdownOverlay
          timeRemaining={state.timeRemaining}
          isActive={state.countdownMode === "audio-visual"}
        />
      </div>
    </div>
  );
}
