import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  type,
  duration = 3000,
  onClose
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Délai pour l'animation de sortie
      setTimeout(onClose, 200);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const toastClasses = [
    'toast',
    `toast--${type}`
  ].join(' ');

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '';
    }
  };

  const getMessage = () => {
    if (message) return message;

    switch (type) {
      case 'success': return 'Bonne réponse !';
      case 'error': return 'Essaie encore…';
      case 'info': return 'Information';
      default: return '';
    }
  };

  return (
    <div className={toastClasses}>
      <span className="mr-2">{getIcon()}</span>
      {getMessage()}
    </div>
  );
}