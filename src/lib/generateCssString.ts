export function generateCSS(theme: Record<string, Record<string, string>>) {
  const lightTheme = theme.light;
  const darkTheme = theme.dark;

  return `@layer base {
  :root {
${Object.entries(lightTheme)
  .map(([key, value]) => `    --${key}: ${value};`)
  .join('\n')}
  }
 
  .dark {
${Object.entries(darkTheme)
  .map(([key, value]) => `    --${key}: ${value};`)
  .join('\n')}
  }
}`;
}

export function copyCSSToClipboard(css: string) {
  navigator.clipboard.writeText(css).then(() => {
    alert('CSS copied to clipboard');
  });
}
