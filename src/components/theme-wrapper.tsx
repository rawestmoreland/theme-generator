'use client';

import { useConfig } from '@/lib/hooks/useConfig';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();
  return (
    <div
      style={
        { '--radius': `${config.radius ?? 0.5}rem` } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
