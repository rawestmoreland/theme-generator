'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { codeBlocks } from '@/lib/codeBlocks';
import { ScrollArea } from './ui/scroll-area';
import { CopyButton } from './copy-button';
import Link from 'next/link';

export const ColorSwatch = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => (
  <div className='flex flex-col items-center mr-4 mb-4'>
    <div
      className='w-16 h-16 rounded-full mb-2'
      style={{ backgroundColor: `hsl(${color})` }}
    ></div>
    <span className='text-xs font-semibold text-center'>{name}</span>
  </div>
);

export const ThemeSwatches = ({
  colors,
}: {
  colors: Record<string, string>;
}) => (
  <div className='flex flex-wrap items-center justify-center'>
    {Object.entries(colors).map(([name, color]) => (
      <ColorSwatch key={name} name={name} color={color} />
    ))}
  </div>
);

const NextThemeSwatches = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [baseTheme, setBaseTheme] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [themeColors, setThemeColors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme) {
      setBaseTheme(theme.replace('-dark', ''));
      setIsDark(theme.includes('-dark'));
    }
  }, [theme]);

  useEffect(() => {
    if (isMounted) {
      setTheme(isDark ? `${baseTheme}-dark` : baseTheme);
    }
  }, [baseTheme, isDark, isMounted, setTheme]);

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
      const colors = basicColors.reduce((acc, color) => {
        acc[color] = style.getPropertyValue(`--${color}`).trim();
        return acc;
      }, {} as Record<string, string>);

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

  if (!isMounted) return null;

  const groupedThemes = themes.reduce((acc, t) => {
    const baseName = t.replace('-dark', '');
    if (!acc[baseName]) {
      acc[baseName] = { light: baseName, dark: `${baseName}-dark` };
    }
    return acc;
  }, {} as Record<string, { light: string; dark: string }>);

  const handleThemeChange = (newTheme: string) => {
    setBaseTheme(newTheme);
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <Card className='w-full max-w-3xl mx-auto'>
        <CardHeader>
          <CardTitle>
            <div className='flex justify-between items-center'>
              <span>shadcn/ui Theme Color Swatches</span>
              <Button variant='link' asChild>
                <Link href='/swatches'>View All</Link>
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            <div className='flex flex-col gap-2'>
              The boring ones...and the fun ones.
              <div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant='outline' size='sm'>
                      View code
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className='space-x-4'>
                        <span>Copy CSS</span>{' '}
                        <CopyButton
                          code={
                            codeBlocks[baseTheme as keyof typeof codeBlocks]
                          }
                        />
                      </SheetTitle>
                      <SheetDescription>
                        Copy and paste this into your globals.css
                      </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className='max-h-full h-full mt-2 pb-20'>
                      <pre className='overflow-x-hidden pb-4'>
                        <code
                          id='code-block'
                          className='language-typescript text-xs'
                        >
                          {codeBlocks[baseTheme as keyof typeof codeBlocks]}
                        </code>
                      </pre>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center mb-4'>
            <Select value={baseTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select a theme' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fun ones</SelectLabel>
                  {Object.keys(groupedThemes)
                    .slice(6, Object.keys(groupedThemes).length)
                    .map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Boring ones</SelectLabel>
                  {Object.keys(groupedThemes)
                    .slice(0, 6)
                    .map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className='flex items-center space-x-2'>
              <Button
                id='dark-mode'
                size='icon'
                variant='outline'
                onClick={toggleDarkMode}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </Button>
              <Label className='sr-only' htmlFor='dark-mode'>
                Dark Mode
              </Label>
            </div>
          </div>
          <ThemeSwatches colors={themeColors} />
        </CardContent>
      </Card>
    </>
  );
};

export default NextThemeSwatches;
