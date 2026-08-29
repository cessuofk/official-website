import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cessuofk.site'),
  title: 'CESS UofK — Civil Engineering Students Society, University of Khartoum',
  description: 'Civil Engineering Students Society — University of Khartoum (CESS UofK). Non-profit, student-run society established in 2013.',
  icons: {
    icon: '/favicon.png',
    apple: '/cess-lockup-ink.png', 
  },
  openGraph: {
    title: 'CESS UofK — Civil Engineering Students Society, University of Khartoum',
    description: 'Civil Engineering Students Society — University of Khartoum. Non-profit, student-run society.',
    url: 'https://www.cessuofk.site',
    siteName: 'CESS UofK',
    locale: 'en_US', // Fixes the missing og:locale warning
    type: 'website',
    images: [
      {
        url: '/images/touch.jpg', 
        width: 1200,
        height: 630,
        alt: 'CESS UofK Logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
