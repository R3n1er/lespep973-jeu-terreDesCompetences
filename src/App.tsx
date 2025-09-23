import { useState } from "react";
import StartScreen from "@/components/screens/StartScreen";
import GameScreen from "@/components/screens/GameScreen";
import EndScreen from "@/components/screens/EndScreen";

type Phase = "start" | "game" | "end";

function App() {
  const [phase, setPhase] = useState<Phase>("start");

  if (phase === "start") {
    return <StartScreen onStart={() => setPhase("game")} />;
  }

  if (phase === "game") {
    return <GameScreen onFinish={() => setPhase("end")} />;
  }

  return <EndScreen onRestart={() => setPhase("start")} />;
}

export default App;
