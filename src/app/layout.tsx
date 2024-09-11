import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';

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
  title: 'shadcn UI Theme Picker',
  description:
    'Browse themes for your shadcn UI projects with our intuitive theme picker. Explore a wide range of color schemes and styles to make your UI stand out.',
  openGraph: {
    title: 'shadcn UI Theme Picker',
    description:
      'Browse custom themes for your shadcn UI projects. Explore color schemes and styles to make your UI stand out.',
    images: [
      {
        url: 'https://shadcncolors.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'shadcn UI Theme Picker',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shadcn UI Theme Picker',
    description:
      'Browse custom themes for your shadcn UI projects. Explore color schemes and styles to make your UI stand out.',
    images: ['https://shadcncolors.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          if (window.location.hostname !== 'localhost') {
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          }
        `}
      </Script>
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
