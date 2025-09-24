import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StageProps {
  children: ReactNode;
  celebrating?: boolean;
  className?: string;
  boardClassName?: string;
}

export default function Stage({
  children,
  celebrating = false,
  className,
  boardClassName,
}: StageProps) {
  const stageClasses = cn('stage', celebrating && 'stage--celebrate', className);
  const boardClasses = cn('board', boardClassName);

  return (
    <main className={stageClasses}>
      <section className={boardClasses}>{children}</section>
    </main>
  );
}
