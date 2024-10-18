'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Color from 'color';
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
import {
  ClipboardCopyIcon,
  CodeIcon,
  CoffeeIcon,
  Globe2Icon,
  MoonIcon,
  SunIcon,
  Wand2Icon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { generateTheme } from '@/lib/generateTheme';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useConfig } from '@/lib/hooks/useConfig';
import { copyCSSToClipboard, generateCSS } from '@/lib/generateCssString';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { codeBlocks } from '@/lib/codeBlocks';
import Link from 'next/link';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

const basicColors = [
  'background',
  'foreground',
  'primary',
  'secondary',
  'accent',
  'muted',
];

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className='flex flex-col items-center mr-4 mb-4'>
    <div
      className='w-16 h-16 rounded-full mb-2'
      style={{ backgroundColor: `hsl(${color})` }}
    ></div>
    <span className='text-xs font-semibold text-center'>{name}</span>
  </div>
);

const ThemeSwatches = ({ colors }: { colors: Record<string, string> }) => (
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
  const [themeColors, setThemeColors] = useState<Record<string, string>>({});
  const [customHexValue, setCustomHexValue] = useState('');
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const [customTheme, setCustomTheme] = useState<{
    light: Record<string, string>;
    dark: Record<string, string>;
  } | null>(null);
  const [customCSS, setCustomCSS] = useState('');
  const [showPredefinedCSSModal, setShowPredefinedCSSModal] = useState(false);
  const [predefinedCSS, setPredefinedCSS] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateColors = () => {
      const style = getComputedStyle(document.documentElement);
      const colors = basicColors.reduce((acc, color) => {
        acc[color] = style.getPropertyValue(`--${color}`).trim();
        return acc;
      }, {} as Record<string, string>);

      setThemeColors(colors);
    };

    const updatePredefinedCSS = () => {
      if (theme && theme !== 'custom' && theme !== 'custom-dark') {
        const baseTheme = theme.replace('-dark', '');
        const css = codeBlocks(config.radius ?? 0.5)[
          baseTheme as keyof typeof codeBlocks
        ];
        setPredefinedCSS(css);
      }
    };

    if (isMounted) {
      updateColors();
      updatePredefinedCSS();
      const observer = new MutationObserver(() => {
        updateColors();
        updatePredefinedCSS();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      return () => observer.disconnect();
    }
  }, [isMounted, theme]);

  if (!isMounted) return null;

  const applyTheme = (newTheme: string) => {
    if (newTheme === 'custom' || newTheme === 'custom-dark') {
      if (customTheme) {
        const mode = newTheme === 'custom-dark' ? 'dark' : 'light';
        Object.entries(customTheme[mode]).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value);
        });
        setThemeColors(
          Object.fromEntries(
            Object.entries(customTheme[mode]).filter(([key]) =>
              basicColors.includes(key)
            )
          )
        );
      }
    } else {
      setCustomHexValue('');
      document.documentElement.style.cssText = '';
    }
    setTheme(newTheme);
  };

  const handleThemeChange = (newTheme: string) => {
    setIsCustomTheme(newTheme === 'custom' || newTheme === 'custom-dark');
    applyTheme(newTheme);

    if (newTheme !== 'custom' && newTheme !== 'custom-dark') {
      const baseTheme = newTheme.replace('-dark', '');
      const css = codeBlocks(config.radius ?? 0.5)[
        baseTheme as keyof typeof codeBlocks
      ];
      setPredefinedCSS(css);
      setCustomHexValue('');
      setCustomTheme(null);
    }
  };

  const toggleDarkMode = () => {
    const currentTheme = theme || 'light';
    const isDark = currentTheme.endsWith('-dark');
    const baseTheme = currentTheme.replace('-dark', '');
    const newTheme = isDark ? baseTheme : `${baseTheme}-dark`;
    handleThemeChange(newTheme);
  };

  const applyCustomTheme = () => {
    try {
      const color = Color(customHexValue);
      const generatedTheme = generateTheme(color);
      setCustomTheme(generatedTheme);
      setIsCustomTheme(true);

      // Apply the custom theme immediately
      const mode = theme?.endsWith('-dark') ? 'dark' : 'light';
      Object.entries(generatedTheme[mode]).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value as string);
      });
      setThemeColors(
        Object.fromEntries(
          Object.entries(generatedTheme[mode]).filter(([key]) =>
            basicColors.includes(key)
          )
        ) as Record<string, string>
      );

      setTheme('custom');
      setCustomCSS(generateCSS(generatedTheme));
      setPredefinedCSS('');
    } catch (error) {
      alert('Invalid hex value');
    }
  };

  const groupedThemes = themes.reduce((acc, t) => {
    if (t !== 'custom' && t !== 'custom-dark') {
      const baseName = t.replace('-dark', '');
      if (!acc[baseName]) {
        acc[baseName] = { light: baseName, dark: `${baseName}-dark` };
      }
    }
    return acc;
  }, {} as Record<string, { light: string; dark: string }>);

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='w-full flex items-end justify-between gap-8 mb-4'>
        <Image alt='mascot' src='/mascot.png' width={80} height={80} />
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href='https://twitter.com/ctrlaltideate' target='_blank'>
              <TwitterLogoIcon className='w-4 h-4' />
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='https://richardwestmoreland.com' target='_blank'>
              <Globe2Icon className='w-4 h-4' />
            </Link>
          </Button>
          <Button variant='outline' asChild>
            <Link
              href='https://buymeacoffee.com/westmorelandcreative'
              target='_blank'
              className='flex items-center text-xs'
            >
              <CoffeeIcon className='w-4 h-4 mr-0 md:mr-2' />
              <span className='sr-only md:not-sr-only'>Buy me a coffee</span>
            </Link>
          </Button>
        </div>
      </div>
      <Card className=''>
        <CardHeader>
          <CardTitle>Theme Picker</CardTitle>
          <CardDescription>
            Select a pre-defined theme or create a custom one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col mb-4 items-start gap-4'>
            <div className='flex items-start md:items-center gap-4'>
              <div className='flex gap-4'>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a theme' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pre-defined Themes</SelectLabel>
                      {Object.entries(groupedThemes).map(
                        ([baseName, { light, dark }]) => (
                          <React.Fragment key={baseName}>
                            <SelectItem value={light}>{baseName}</SelectItem>
                            <SelectItem
                              value={dark}
                            >{`${baseName} (Dark)`}</SelectItem>
                          </React.Fragment>
                        )
                      )}
                    </SelectGroup>
                    {customTheme && (
                      <SelectGroup>
                        <SelectLabel>Custom Theme</SelectLabel>
                        <SelectItem value='custom'>Custom</SelectItem>
                        <SelectItem value='custom-dark'>
                          Custom (Dark)
                        </SelectItem>
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
                <Button size='icon' variant='outline' onClick={toggleDarkMode}>
                  {theme?.endsWith('-dark') ? (
                    <SunIcon className='h-4 w-4' />
                  ) : (
                    <MoonIcon className='h-4 w-4' />
                  )}
                </Button>
              </div>
              {Boolean(predefinedCSS) && (
                <Dialog
                  open={showPredefinedCSSModal}
                  onOpenChange={setShowPredefinedCSSModal}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      onClick={() => setShowPredefinedCSSModal(true)}
                    >
                      <CodeIcon className='md:mr-2 mr-0 h-4 w-4' />
                      <span className='sr-only md:not-sr-only'>
                        View Theme CSS
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[625px] max-h-[80vh] flex flex-col'>
                    <DialogHeader>
                      <DialogTitle>Theme CSS</DialogTitle>
                      <DialogDescription>
                        Copy this CSS to use the selected theme in your project.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className='h-[75vh] mt-4'>
                      <pre className='bg-muted p-4 rounded-md'>
                        <code>{predefinedCSS}</code>
                      </pre>
                    </ScrollArea>
                    <div className='mt-4 flex justify-end'>
                      <Button onClick={() => copyCSSToClipboard(predefinedCSS)}>
                        Copy to Clipboard
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <Input
                className='w-48'
                value={customHexValue}
                onChange={(e) => setCustomHexValue(e.target.value)}
                placeholder='Enter a hex value'
              />
              <Button disabled={!!customHexValue} onClick={applyCustomTheme}>
                <Wand2Icon className='md:hidden block h-4 w-4' />
                <span className='sr-only md:not-sr-only'>
                  Apply Custom Theme
                </span>
              </Button>
            </div>
            <div>
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
          </div>
          <ThemeSwatches colors={themeColors} />
          {isCustomTheme && (
            <div>
              <p className='mt-4 text-sm text-muted-foreground'>
                Showing basic colors for custom theme
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline'>
                    <ClipboardCopyIcon className='mr-2 h-4 w-4' />
                    View CSS
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[625px] max-h-[80vh] flex flex-col'>
                  <DialogHeader>
                    <DialogTitle>Custom Theme CSS</DialogTitle>
                    <DialogDescription>
                      Copy this CSS to use your custom theme in your project.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className='h-[75vh] mt-4'>
                    <pre className='bg-muted p-4 rounded-md'>
                      <code>{customCSS}</code>
                    </pre>
                  </ScrollArea>
                  <div className='mt-4 flex justify-end'>
                    <Button onClick={() => copyCSSToClipboard(customCSS)}>
                      Copy to Clipboard
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NextThemeSwatches;
