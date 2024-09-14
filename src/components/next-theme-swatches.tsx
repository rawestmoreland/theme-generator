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
import { Globe2, MoonIcon, SunIcon } from 'lucide-react';
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
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useConfig } from '@/lib/hooks/useConfig';

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
  const [config, setConfig] = useConfig();
  const { theme, setTheme, themes } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [baseTheme, setBaseTheme] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [textCodeBlock, setTextCodeBlock] = useState('');
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
      const textCode = codeBlocks(config?.radius);
      setTextCodeBlock(textCode[baseTheme as keyof typeof textCode]);
    }
  }, [baseTheme, isDark, isMounted, setTheme, config.radius]);

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
      <div className='max-w-7xl w-full mx-auto flex items-end justify-between'>
        <div className='flex items-end gap-8'>
          <Image alt='mascot' src='/mascot.png' width={80} height={80} />
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href='https://twitter.com/ctrlaltideate' target='_blank'>
                <TwitterLogoIcon className='w-4 h-4' />
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='https://richardwestmoreland.com' target='_blank'>
                <Globe2 className='w-4 h-4' />
              </Link>
            </Button>
          </div>
        </div>
        <div className='flex items-baseline justify-baseline gap-2'>
          <Button
            id='dark-mode'
            size='icon'
            variant='outline'
            onClick={toggleDarkMode}
          >
            {isDark ? (
              <SunIcon className='h-4 w-4' />
            ) : (
              <MoonIcon className='h-4 w-4' />
            )}
          </Button>
          <Label className='sr-only' htmlFor='dark-mode'>
            Dark Mode
          </Label>
        </div>
      </div>
      <Card className='w-full max-w-7xl mx-auto'>
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
                        <CopyButton code={textCodeBlock} />
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
                          {textCodeBlock}
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
          <div className='flex flex-col mb-4 items-start gap-2'>
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
            <ToggleGroup
              className='flex flex-wrap items-start justify-start'
              type='single'
              value={(config?.radius ?? 0.5).toString()}
              variant='outline'
              onValueChange={(value) => {
                setConfig({ ...config, radius: Number(value) });
              }}
            >
              <ToggleGroupItem value='0'>0</ToggleGroupItem>
              <ToggleGroupItem value='0.125'>0.125rem</ToggleGroupItem>
              <ToggleGroupItem value='0.25'>0.25rem</ToggleGroupItem>
              <ToggleGroupItem value='0.375'>0.375rem</ToggleGroupItem>
              <ToggleGroupItem value='0.5'>0.5rem</ToggleGroupItem>
              <ToggleGroupItem value='1'>1rem</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <ThemeSwatches colors={themeColors} />
        </CardContent>
      </Card>
    </>
  );
};

export default NextThemeSwatches;
