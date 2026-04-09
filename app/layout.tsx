import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexia Corp - Tu negocio, en piloto automático',
  description: 'Sistemas de IA que atienden, califican y convierten clientes 24/7. Automatización inteligente para negocios en Latinoamérica.',
  keywords: 'IA, automatización, WhatsApp bot, chatbot, Ecuador, LATAM',
  authors: [{ name: 'Nexia Corp' }],
  metadataBase: new URL('https://nexia-corp.com'),
  openGraph: {
    title: 'Nexia Corp - Tu negocio, en piloto automático',
    description: 'Sistemas de IA que atienden, califican y convierten clientes 24/7',
    url: 'https://nexia-corp.com',
    siteName: 'Nexia Corp',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nexia Corp',
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexia Corp',
    description: 'Tu negocio, en piloto automático',
    creator: '@nexia_corp',
  },
  robots: 'index, follow',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0057FF" />
      </head>
      <body className={`${syne.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
