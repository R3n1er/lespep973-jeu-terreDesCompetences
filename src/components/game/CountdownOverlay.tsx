import { useEffect, useRef } from "react";

type CountdownOverlayProps = {
  timeRemaining: number;
  isActive: boolean;
  theme?: string;
};

export default function CountdownOverlay({
  timeRemaining,
  isActive,
  theme,
}: CountdownOverlayProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finalAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastSecondRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const currentSecond = Math.ceil(timeRemaining / 1000);
    if (currentSecond === lastSecondRef.current) {
      return;
    }

    lastSecondRef.current = currentSecond;

    if (timeRemaining <= 1000 && finalAudioRef.current) {
      void finalAudioRef.current.play()?.catch(() => {});
      return;
    }

    if (timeRemaining <= 5000 && audioRef.current) {
      void audioRef.current.play()?.catch(() => {});
    }
  }, [timeRemaining, isActive]);

  if (!isActive) {
    return null;
  }

  const seconds = Math.max(0, Math.ceil(timeRemaining / 1000));

  return (
    <div className="countdown-overlay">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/beep.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={finalAudioRef} preload="auto">
        <source src="/audio/final-beep.mp3" type="audio/mpeg" />
      </audio>
      <div className="countdown-overlay__panel" data-theme={theme}>
        {seconds}
      </div>
    </div>
  );
}
