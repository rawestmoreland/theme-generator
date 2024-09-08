import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='data-theme'
          defaultTheme='zinc'
          enableSystem={false}
          themes={[
            'zinc',
            'zinc-dark',
            'slate',
            'slate-dark',
            'stone',
            'stone-dark',
            'gray',
            'gray-dark',
            'blue',
            'blue-dark',
            'orange',
            'orange-dark',
            'bubblegum-pop',
            'bubblegum-pop-dark',
            'cyberpunk-neon',
            'cyberpunk-neon-dark',
            'retro-arcade',
            'retro-arcade-dark',
            'tropical-paradise',
            'tropical-paradise-dark',
            'steampunk-cogs',
            'steampunk-cogs-dark',
            'neon-synthwave',
            'neon-synthwave-dark',
            'pastel-kawaii',
            'pastel-kawaii-dark',
            'space-odyssey',
            'space-odyssey-dark',
          ]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
