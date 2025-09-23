import { useEffect, useRef } from "react";

type CountdownOverlayProps = {
  timeRemaining: number;
  isActive: boolean;
};

export default function CountdownOverlay({
  timeRemaining,
  isActive,
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-neutral-900/70">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/beep.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={finalAudioRef} preload="auto">
        <source src="/audio/final-beep.mp3" type="audio/mpeg" />
      </audio>
      <div className="flex h-64 w-64 items-center justify-center rounded-[3rem] border-8 border-neutral-900 bg-red-500 text-7xl font-black text-white shadow-[0_12px_0_rgba(24,24,27,0.8)] animate-[pulse_0.5s_ease-in-out_infinite]">
        {seconds}
      </div>
    </div>
  );
}
