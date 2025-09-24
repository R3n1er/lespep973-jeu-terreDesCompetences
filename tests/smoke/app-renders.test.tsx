import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";
import { GameProvider } from "@/context/GameContext";

describe("App", () => {
  it("rend le header et les boutons de base", () => {
    render(
      <GameProvider>
        <App />
      </GameProvider>
    );
    expect(screen.getByText(/Terres de Compétences/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Commencer le jeu/i })
    ).toBeInTheDocument();
  });
});
