import { type ReactNode, useState } from 'react';

interface GameCardProps {
  title: string;
  children: ReactNode;
  icon?: string;
  active?: boolean;
  flippable?: boolean;
  onFlip?: () => void;
  footerActions?: ReactNode;
  className?: string;
}

export default function GameCard({
  title,
  children,
  icon = '/icones/icone-scolarite.svg',
  active = false,
  flippable = false,
  onFlip,
  footerActions,
  className = ''
}: GameCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    if (flippable) {
      setFlipped(!flipped);
      onFlip?.();
    }
  };

  const cardClasses = [
    'card',
    active && 'card--active',
    className
  ].filter(Boolean).join(' ');

  if (flippable) {
    return (
      <div className="flip-container">
        <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
          {/* Face avant */}
          <div className="flip-face">
            <article className={cardClasses}>
              <header className="card__header">
                <img src={icon} className="card__icon" alt="" />
                <h1 className="card__title">{title}</h1>
              </header>

              <div className="card__content">
                {children}
              </div>

              {footerActions && (
                <footer className="card__footer">
                  {footerActions}
                  <button
                    className="btn btn--ghost glow"
                    onClick={handleFlip}
                  >
                    🔄 Retourner
                  </button>
                </footer>
              )}
            </article>
          </div>

          {/* Face arrière */}
          <div className="flip-face flip-face--back">
            <article className={cardClasses}>
              <header className="card__header">
                <img src={icon} className="card__icon" alt="" />
                <h1 className="card__title">Face cachée</h1>
              </header>

              <div className="card__content">
                <div className="text-center">
                  <p className="text-ink-soft">Informations supplémentaires</p>
                </div>
              </div>

              <footer className="card__footer">
                <button
                  className="btn btn--ghost glow"
                  onClick={handleFlip}
                >
                  🔄 Retourner
                </button>
              </footer>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className={cardClasses}>
      <header className="card__header">
        <img src={icon} className="card__icon" alt="" />
        <h1 className="card__title">{title}</h1>
      </header>

      <div className="card__content">
        {children}
      </div>

      {footerActions && (
        <footer className="card__footer">
          {footerActions}
        </footer>
      )}
    </article>
  );
}
