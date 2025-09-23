import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MetierToCompetences from "@/components/game/MetierToCompetences";

const challenge = {
  id: "challenge-metier",
  type: "metier-to-competences" as const,
  difficulty: "moyen" as const,
  question: "",
  metier: "educateur-specialise",
  options: [
    "accompagnement-individualise",
    "projet-personnalise",
    "coordination-familles",
    "travail-pluridisciplinaire",
    "animation-ateliers",
    "evaluation-progression",
    "gestion-situations-crise",
  ],
  correctAnswers: [
    "accompagnement-individualise",
    "projet-personnalise",
    "coordination-familles",
    "travail-pluridisciplinaire",
    "animation-ateliers",
    "evaluation-progression",
  ],
  points: 120,
};

describe("MetierToCompetences", () => {
  it("enforce la limite de 6 sélections et active la validation", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<MetierToCompetences challenge={challenge} onSubmit={onSubmit} />);

    const buttons = screen.getAllByRole("button", { name: /./ });
    for (let i = 0; i < 6; i++) {
      await user.click(buttons[i]);
    }

    expect(screen.getByRole("button", { name: /Valider/ })).not.toBeDisabled();

    // 7e sélection doit être bloquée
    await user.click(buttons[6]);
    expect(screen.getAllByRole("button", { name: /Valider/ })[0]).not.toBeDisabled();

    await user.click(screen.getByRole("button", { name: /Valider/ }));
    expect(onSubmit).toHaveBeenCalledWith(expect.any(Array));
    expect(onSubmit.mock.calls[0][0]).toHaveLength(6);
  });
});


