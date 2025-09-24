import { useEffect, useState } from 'react';

interface HUDProps {
  timeRemaining?: number;
  totalTime?: number;
  score?: number;
  maxScore?: number;
  teamName?: string;
  onTimeUp?: () => void;
}

export default function HUD({
  timeRemaining = 150,
  totalTime = 150,
  score = 0,
  maxScore = 100,
  teamName,
  onTimeUp
}: HUDProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(timeRemaining);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, currentTime, onTimeUp]);

  useEffect(() => {
    setCurrentTime(timeRemaining);
  }, [timeRemaining]);

  const timePercent = ((totalTime - currentTime) / totalTime) * 100;
  const scorePercent = (score / maxScore) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="app__topbar">
      {/* Brand */}
      <div className="brand">
        <img
          src="/images/logo_lespep973.jpg"
          alt="PEP Guyane"
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold">Terres de Compétences</span>
          {teamName && (
            <span className="text-sm text-ink-soft">{teamName}</span>
          )}
        </div>
      </div>

      {/* HUD Central */}
      <div className="hud">
        {/* Timer */}
        <div className="timer">
          <div
            className="timer__bar"
            style={{
              transform: `scaleX(${1 - (timePercent / 100)})`,
              transition: isRunning ? 'transform 1s linear' : 'none'
            }}
          />
          <div className="absolute -bottom-6 left-0 text-sm text-ink-soft font-medium">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Score */}
        <div className="score">
          <div className="score__label">Score</div>
          <div
            className="score__meter"
            style={{ '--score-percent': scorePercent } as React.CSSProperties}
          >
            <span className="score__value">{score}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          className="btn btn--ghost"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? '⏸️' : '▶️'}
        </button>
      </div>
    </header>
  );
}
