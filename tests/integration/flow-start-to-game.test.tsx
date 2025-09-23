import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

describe("Flux start → game", () => {
  it("passe de StartScreen à GameScreen", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Commencer le jeu/i }));
    expect(screen.getByText(/Session de jeu/i)).toBeInTheDocument();
  });
});
