import Color from 'color';

export const generateTheme = (baseColor: Color) => {
  const theme = {
    light: {},
    dark: {},
  };

  // Helper function to generate color with adjusted lightness
  const adjustLightness = (color: Color, amount: number) =>
    color.lightness(amount);

  // Helper function to generate analogous color
  const analogous = (color: Color, amount: number) => color.rotate(amount);

  // Helper function to format color for CSS variables
  const formatColor = (color: Color) => {
    const [h, s, l] = color.hsl().array();
    return `${h.toFixed(0)} ${s.toFixed(0)}% ${l.toFixed(0)}%`;
  };

  // Generate light theme
  theme.light = {
    background: formatColor(adjustLightness(baseColor, 98)),
    foreground: formatColor(adjustLightness(baseColor, 10)),
    card: formatColor(adjustLightness(baseColor, 100)),
    'card-foreground': formatColor(adjustLightness(baseColor, 10)),
    popover: formatColor(adjustLightness(baseColor, 100)),
    'popover-foreground': formatColor(adjustLightness(baseColor, 10)),
    primary: formatColor(baseColor),
    'primary-foreground': formatColor(adjustLightness(baseColor, 98)),
    secondary: formatColor(analogous(baseColor, 30).lightness(80)),
    'secondary-foreground': formatColor(analogous(baseColor, 30).lightness(10)),
    muted: formatColor(adjustLightness(baseColor, 90).desaturate(0.5)),
    'muted-foreground': formatColor(adjustLightness(baseColor, 40)),
    accent: formatColor(analogous(baseColor, 60).lightness(60)),
    'accent-foreground': formatColor(analogous(baseColor, 60).lightness(98)),
    destructive: formatColor(Color('red')),
    'destructive-foreground': formatColor(Color('red').lightness(98)),
    border: formatColor(adjustLightness(baseColor, 85)),
    input: formatColor(adjustLightness(baseColor, 85)),
    ring: formatColor(baseColor),
  };

  // Generate dark theme
  theme.dark = {
    background: formatColor(adjustLightness(baseColor, 10)),
    foreground: formatColor(adjustLightness(baseColor, 98)),
    card: formatColor(adjustLightness(baseColor, 12)),
    'card-foreground': formatColor(adjustLightness(baseColor, 98)),
    popover: formatColor(adjustLightness(baseColor, 12)),
    'popover-foreground': formatColor(adjustLightness(baseColor, 98)),
    primary: formatColor(adjustLightness(baseColor, 60)),
    'primary-foreground': formatColor(adjustLightness(baseColor, 10)),
    secondary: formatColor(analogous(baseColor, 30).lightness(30)),
    'secondary-foreground': formatColor(analogous(baseColor, 30).lightness(98)),
    muted: formatColor(adjustLightness(baseColor, 20).desaturate(0.5)),
    'muted-foreground': formatColor(adjustLightness(baseColor, 70)),
    accent: formatColor(analogous(baseColor, 60).lightness(40)),
    'accent-foreground': formatColor(analogous(baseColor, 60).lightness(98)),
    destructive: formatColor(Color('red').darken(0.2)),
    'destructive-foreground': formatColor(Color('red').lightness(98)),
    border: formatColor(adjustLightness(baseColor, 25)),
    input: formatColor(adjustLightness(baseColor, 25)),
    ring: formatColor(adjustLightness(baseColor, 60)),
  };

  return theme;
};
