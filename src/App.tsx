import { useState } from "react";
import StartScreen from "@/components/screens/StartScreen";
import GameInfoScreen from "@/components/screens/GameInfoScreen";
import GameScreen from "@/components/screens/GameScreen";
import EndScreen from "@/components/screens/EndScreen";
import { useGameContext } from "@/context/useGameContext";

type Phase = "start" | "info" | "game" | "end";

function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [hasVisitedInfo, setHasVisitedInfo] = useState(false);
  const { state: gameState } = useGameContext();
  const activeTheme = gameState.currentTheme ?? "scolarite";

  if (phase === "start") {
    return (
      <StartScreen
        onStart={() => setPhase("game")}
        onShowInfo={() => {
          setHasVisitedInfo(true);
          setPhase("info");
        }}
        skipSplash={hasVisitedInfo}
      />
    );
  }

  if (phase === "info") {
    return (
      <GameInfoScreen
        onStart={() => setPhase("game")}
        onBack={() => setPhase("start")}
      />
    );
  }

  if (phase === "game") {
    return <GameScreen onFinish={() => setPhase("end")} />;
  }

  return <EndScreen theme={activeTheme} onRestart={() => setPhase("start")} />;
}

export default App;
