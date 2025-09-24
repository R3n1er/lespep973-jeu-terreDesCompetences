import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TimerDisplay from "@/components/game/TimerDisplay";

describe("TimerDisplay", () => {
  it("affiche le temps formaté et la state visuelle", () => {
    render(
      <TimerDisplay
        timeRemaining={29_500}
        isRunning
        alerts={{ thirtySeconds: true, tenSeconds: false, fiveSeconds: false }}
      />
    );

    expect(screen.getByText(/00:30/)).toBeInTheDocument();
    const container = screen.getByText(/00:30/).closest(".timer-display");
    expect(container?.className).toContain("timer-display--caution");
  });

  it("passe en mode alerte rouge sous 5 secondes", () => {
    render(
      <TimerDisplay
        timeRemaining={4000}
        isRunning
        alerts={{ thirtySeconds: true, tenSeconds: true, fiveSeconds: true }}
      />
    );

    const container = screen.getByText(/00:04/).closest(".timer-display");
    expect(container?.className).toContain("timer-display--critical");
  });
});
