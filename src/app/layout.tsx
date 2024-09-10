import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
  title: 'shadcn UI Theme Generator',
  description:
    'Create custom themes for your shadcn UI projects with our intuitive theme generator. Explore a wide range of color schemes and styles to make your UI stand out.',
  openGraph: {
    title: 'shadcn UI Theme Generator',
    description:
      'Create custom themes for your shadcn UI projects. Explore color schemes and styles to make your UI stand out.',
    images: [
      {
        url: 'https://shadcncolors.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'shadcn UI Theme Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shadcn UI Theme Generator',
    description:
      'Create custom themes for your shadcn UI projects. Explore color schemes and styles to make your UI stand out.',
    images: ['https://shadcncolors.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
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
        {children}
        {/* <footer className='p-8'>
          <span className='text-sm'>
            &copy; 2024 Westmoreland Creative. All rights reserved.
          </span>
        </footer> */}
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3399938065938082'
          crossOrigin='anonymous'
        ></script>
      </body>
    </html>
  );
}
