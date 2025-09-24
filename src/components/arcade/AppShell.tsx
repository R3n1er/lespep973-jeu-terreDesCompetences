import { type ReactNode } from 'react';
import type { ThemeType } from '@/types/game';
import ArcadeLayout, { type ArcadeHUDProps } from './ArcadeLayout';
import Stage from './Stage';

interface AppShellProps {
  children: ReactNode;
  theme?: ThemeType;
  hud?: ArcadeHUDProps;
  headerContent?: ReactNode;
  footerSlot?: ReactNode;
  stageClassName?: string;
  boardClassName?: string;
  celebrating?: boolean;
}

export default function AppShell({
  children,
  theme = 'scolarite',
  hud,
  headerContent,
  footerSlot,
  stageClassName,
  boardClassName,
  celebrating = false,
}: AppShellProps) {
  return (
    <ArcadeLayout
      theme={theme}
      hudProps={hud}
      headerContent={headerContent}
      footerSlot={footerSlot}
    >
      <Stage
        celebrating={celebrating}
        className={stageClassName}
        boardClassName={boardClassName}
      >
        {children}
      </Stage>
    </ArcadeLayout>
  );
}
