import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message?: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const ICONS: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
};

const DEFAULT_MESSAGES: Record<ToastType, string> = {
  success: 'Bonne réponse !',
  error: 'Essaie encore…',
  info: 'Information',
};

export default function Toast({
  message,
  type = 'info',
  duration = 3200,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 220);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const resolvedMessage = useMemo(() => message ?? DEFAULT_MESSAGES[type], [message, type]);

  if (!visible) return null;

  return (
    <div
      className={cn('toast', `toast--${type}`)}
      role="status"
      aria-live="polite"
    >
      <span className="toast__icon" aria-hidden>
        {ICONS[type]}
      </span>
      <span className="toast__message">{resolvedMessage}</span>
    </div>
  );
}
