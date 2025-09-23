import { useContext } from "react";
import { GameContext } from "@/context/gameContextShared";

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "useGameContext doit être utilisé à l'intérieur de GameProvider"
    );
  }
  return context;
}
