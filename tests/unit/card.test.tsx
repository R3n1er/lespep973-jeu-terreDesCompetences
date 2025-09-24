import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function renderCard() {
  return render(
    <Card data-testid="arcade-card">
      <CardHeader>
        <CardTitle>Test Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
}

describe("Card arcade", () => {
  it("rend le contenu et le titre", () => {
    renderCard();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("possède les classes arcade", () => {
    renderCard();
    const card = screen.getByTestId("arcade-card");
    // Vérifie la classe racine arcade appliquée
    expect(card.className).toContain("card");
  });
});
