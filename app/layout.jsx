import { Syne, Outfit } from 'next/font/google';
import { SEO } from '@/constants/seo';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import StructuredData from '@/components/shared/StructuredData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/layout/PageLoader';
import LiquidCursor from '@/components/ui/LiquidCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default:  SEO.title,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords:    SEO.keywords,
  authors:     [{ name: SEO.author, url: SEO.siteUrl }],
  creator:     SEO.author,
  publisher:   SEO.siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:       SEO.title,
    description: SEO.description,
    url:         SEO.siteUrl,
    siteName:    SEO.siteName,
    locale:      SEO.locale,
    type:        'website',
    images: [{
      url:    SEO.ogImage,
      width:  1200,
      height: 630,
      alt:    'Jabir Mahmud — Creative Developer — jabx_fx',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SEO.title,
    description: SEO.description,
    creator:     SEO.twitterHandle,
    images:      [SEO.ogImage],
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':      -1,
    },
  },
  icons: {
    icon:  [
      { url: '/favicon.ico',  sizes: '32x32' },
      { url: '/icon.png',     sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'googlea80d508012c93542',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00F5D4" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-bg-primary focus:text-accent-cyan">
            Skip to content
          </a>
          <GoogleAnalytics />
          <StructuredData />
          <PageLoader />
          <NoiseOverlay />
          <LiquidCursor />
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
