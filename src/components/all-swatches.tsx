'use client';

import { useTheme, ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Adsense } from '@ctrl/react-adsense';

export function AllSwatches() {
  const { themes } = useTheme();
  const [themeColors, setThemeColors] = useState({});

  const colorVariables = [
    'background',
    'foreground',
    'primary',
    'secondary',
    'accent',
    'muted',
  ];

  useEffect(() => {
    const extractColors = () => {
      const colors = {};
      themes.forEach((themeName) => {
        // @ts-expect-error no idea
        colors[themeName] = {};
        document.documentElement.setAttribute('data-theme', themeName);
        colorVariables.forEach((variable) => {
          const value = getComputedStyle(document.documentElement)
            .getPropertyValue(`--${variable}`)
            .trim();
          // @ts-expect-error no idea
          colors[themeName][variable] = value;
        });
      });
      setThemeColors(colors);
    };

    extractColors();
  }, [themes]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ColorSwatch = ({ variable, value }: { variable: any; value: any }) => (
    <div className='flex flex-col items-center text-center mb-2'>
      <div
        className='w-10 h-10 mr-2 border border-gray-300 rounded-full'
        style={{ backgroundColor: `hsl(${value})` }}
      ></div>
      <span className='text-xs'>{variable}</span>
    </div>
  );

  const ThemeCard = ({
    themeName,
    colors,
  }: {
    themeName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    colors: any;
  }) => {
    if (themeName === 'system') return null;

    return (
      <ThemeProvider forcedTheme={themeName} attribute='data-theme'>
        <div data-theme={themeName}>
          <Card>
            <CardHeader>
              <CardTitle>
                {themeName.includes('dark') ? 'dark' : 'light'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-rows-2 grid-cols-3 lg:grid-rows-1 lg:grid-cols-6'>
                {Object.entries(colors).map(([variable, value]) => (
                  <ColorSwatch
                    key={variable}
                    variable={variable}
                    value={value}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    );
  };

  return (
    <>
      {/* <Adsense
        client='ca-pub-3399938065938082'
        slot='7892467966'
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        layout='in-article'
        format='fluid'
      /> */}
      <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Object.entries(themeColors)
          .filter(
            (themeColor) =>
              !themeColor[0].includes('dark') && themeColor[0] !== 'system'
          )
          .map(([themeName]) => (
            <>
              <Card key={themeName}>
                <CardHeader>
                  <CardTitle>{themeName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col gap-2'>
                    {Object.entries(themeColors)
                      .filter((themeColor) => themeColor[0].includes(themeName))
                      .map(([themeName, colors]) => (
                        <ThemeCard
                          key={themeName}
                          themeName={themeName}
                          colors={colors}
                        />
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ))}
      </div>
    </>
  );
}
