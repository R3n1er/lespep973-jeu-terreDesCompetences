import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompetencesToMetier from "@/components/game/CompetencesToMetier";

describe("CompetencesToMetier", () => {
  it("désactive Valider tant qu'aucune option n'est sélectionnée, puis déclenche onSubmit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <CompetencesToMetier
        competences={["entretien-locaux", "protocoles-hygiene"]}
        options={["agent-service-interieur", "educateur-specialise"]}
        onSubmit={onSubmit}
      />
    );

    const validate = screen.getByRole("button", { name: /Valider/i });
    expect(validate).toBeDisabled();

    await user.click(
      screen.getByRole("button", { name: /agent-service-interieur/i })
    );
    expect(validate).not.toBeDisabled();

    await user.click(validate);
    expect(onSubmit).toHaveBeenCalledWith("agent-service-interieur");
  });
});
