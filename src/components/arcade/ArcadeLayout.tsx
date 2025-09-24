import { type CSSProperties, type ReactNode, useEffect } from 'react';
import { THEME_ICONS, type ThemeType } from './themes';

export interface ArcadeHUDProps {
  timeRemaining?: number;
  totalTime?: number;
  score?: number;
  maxScore?: number;
  teamName?: string;
}

interface ArcadeLayoutProps {
  children: ReactNode;
  theme?: ThemeType;
  hudProps?: ArcadeHUDProps;
  headerContent?: ReactNode;
  footerSlot?: ReactNode;
}

export default function ArcadeLayout({
  children,
  theme = 'scolarite',
  hudProps,
  headerContent,
  footerSlot,
}: ArcadeLayoutProps) {
  // Appliquer le thème sur le body
  useEffect(() => {
    void import('../../styles/arcade-system.css');
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add('app');

    return () => {
      body.classList.remove('app');
      body.classList.forEach((className) => {
        if (className.startsWith('theme--')) {
          body.classList.remove(className);
        }
      });
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.forEach((className) => {
      if (className.startsWith('theme--')) {
        body.classList.remove(className);
      }
    });
    body.classList.add(`theme--${theme}`);

    return () => {
      body.classList.remove(`theme--${theme}`);
    };
  }, [theme]);

  const timerRatio = (() => {
    if (!hudProps || !hudProps.totalTime || hudProps.totalTime <= 0) {
      return 1;
    }
    const time = Math.max(0, hudProps.timeRemaining ?? hudProps.totalTime);
    return Math.min(1, time / hudProps.totalTime);
  })();

  const scorePercent = (() => {
    if (!hudProps || !hudProps.maxScore || hudProps.maxScore <= 0) {
      return 0;
    }
    return Math.min(100, ((hudProps.score ?? 0) / hudProps.maxScore) * 100);
  })();

  const formatTime = (value?: number, total?: number): string => {
    if (value === undefined) {
      return total ? formatTime(total, total) : '2:30';
    }
    const mins = Math.floor(value / 60);
    const secs = Math.max(0, value % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
      <header className="app__topbar">
        <div className="brand">
          <img
            src="/images/logo_lespep973.jpg"
            alt="PEP Guyane"
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold">Terres de Compétences</span>
            {hudProps?.teamName && (
              <span className="text-sm text-ink-soft">{hudProps.teamName}</span>
            )}
          </div>
        </div>

        <div className="app__topbar-center">
          {hudProps ? (
            <div className="hud">
              <div className="timer">
                <div
                  className="timer__bar"
                  style={{ transform: `scaleX(${timerRatio})` }}
                />
                <div className="timer__label">
                  {formatTime(hudProps.timeRemaining, hudProps.totalTime)}
                </div>
              </div>
              <div className="score">
                <div className="score__label">Score</div>
                <div
                  className="score__meter"
                  style={{ '--score-percent': scorePercent } as CSSProperties}
                >
                  <span className="score__value">{hudProps.score ?? 0}</span>
                </div>
              </div>
            </div>
          ) : (
            headerContent ?? (
              <div className="topbar__tagline">
                <span className="topbar__tagline-title">Journée institutionnelle 2025</span>
                <span className="topbar__tagline-sub">Les PEP Guyane</span>
              </div>
            )
          )}
        </div>

        <div className="app__topbar-indicator">
          <img
            src={THEME_ICONS[theme]}
            alt={theme}
            className="w-8 h-8 opacity-70"
          />
          <span className="text-sm text-ink-soft capitalize">{theme}</span>
        </div>
      </header>

      <div className="app__content">{children}</div>

      {footerSlot ? <footer className="app__footer">{footerSlot}</footer> : null}
    </div>
  );
}
