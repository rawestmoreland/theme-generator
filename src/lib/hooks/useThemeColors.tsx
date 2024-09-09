'use client';

import { useEffect, useState } from 'react';

export interface ThemeColors {
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  primary: string;
  secondary: string;
  [key: string]: string; // Add index signature
}

export function useThemeColors() {
  const [themeColors, setThemeColors] = useState<ThemeColors>({
    accent: '30 90% 80%',
    background: '330 100% 99%',
    foreground: '330 10% 10%',
    muted: '330 20% 90%',
    primary: '330 90% 60%',
    secondary: '275 90% 80%',
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateColors = () => {
      const basicColors = [
        'background',
        'foreground',
        'primary',
        'secondary',
        'accent',
        'muted',
      ];
      const style = getComputedStyle(document.documentElement);
      const colors = basicColors.reduce((acc: ThemeColors, color: string) => {
        acc[color] = style.getPropertyValue(`--${color}`).trim();
        return acc;
      }, {} as ThemeColors);

      setThemeColors(colors);
    };

    if (isMounted) {
      updateColors();
      // Use MutationObserver to detect changes in data-theme attribute
      const observer = new MutationObserver(updateColors);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      return () => observer.disconnect();
    }
  }, [isMounted]);

  return { themeColors, loading: !isMounted };
}
