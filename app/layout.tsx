import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Send } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });

const SITE_URL = 'https://kbfixer.onepersonai.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KBFixer - All-in-One File Size Optimizer by OnePersonAI',
    template: '%s | KBFixer',
  },
  description:
    'Compress, resize, and optimize Image, PDF, DOCX, and PPT files locally in your browser with 100% Privacy. Zero server uploads. Built by OnePersonAI.',
  keywords: [
    'KBFixer',
    'KB Fixer',
    'KBFixer online',
    'OnePersonAI',
    'File Optimizer',
    'Image Compressor 20kb',
    'PDF Compressor 300kb',
    'UPSC photo resizer',
    'SSC signature clean up',
    'Local In-Browser Compressor',
    'kbfixer.onepersonai.in',
  ],
  authors: [{ name: 'OnePersonAI Team', url: 'https://onepersonai.in' }],
  creator: 'OnePersonAI',
  publisher: 'OnePersonAI',
  applicationName: 'KBFixer',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'KBFixer - 100% Private File & Image Optimizer',
    description:
      'Compress & resize Images, PDFs, DOCX & PPTs locally without uploading files to any server. Exact target KB output on first try.',
    url: SITE_URL,
    siteName: 'KBFixer by OnePersonAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KBFixer - Instant Client-Side File Compression',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KBFixer by OnePersonAI - Private File Optimizer',
    description:
      'Compress & resize files 100% locally in your browser RAM with zero server upload latency.',
    creator: '@onepersonai_in',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'KBFixer',
        alternateName: ['KB Fixer', 'KBFixer Online', 'KBFixer OnePersonAI'],
        publisher: {
          '@id': 'https://onepersonai.in/#organization',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'KBFixer',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        url: SITE_URL,
        description:
          'A 100% client-side, browser-native file size compressor, dimension cropper, and PDF optimizer built for precise document submissions.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Client-side image compression',
          'Exact KB target precision',
          'Client-side PDF merge and split',
          'Exam dimension crop (200x230)',
          'Signature shadow clean-up',
        ],
        author: {
          '@type': 'Organization',
          '@id': 'https://onepersonai.in/#organization',
          name: 'OnePersonAI',
          url: 'https://onepersonai.in',
          sameAs: [
            'https://x.com/onepersonai_in',
            'https://www.instagram.com/onepersonaiofficial/',
            'https://www.linkedin.com/in/onepersonai-in-197644426/',
            'https://www.facebook.com/profile.php?id=61592496011767',
            'https://www.youtube.com/@OnePersonAI_Official',
            'https://t.me/onepersonaiofficial',
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.className} min-h-screen flex flex-col bg-white text-black antialiased`}
      >
        {/* Pure B&W Header */}
        <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="text-2xl font-black tracking-tighter uppercase group-hover:underline">
                KBFixer
              </div>
              <div className="hidden sm:block px-2 py-0.5 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-widest">
                by OnePersonAI
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/onepersonaiofficial"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border-2 border-black bg-black text-white font-bold uppercase text-xs sm:text-sm flex items-center gap-2 transition-all hard-shadow hover:bg-white hover:text-black"
              >
                <Send className="w-4 h-4" />
                <span>Join Telegram</span>
              </a>

              <a
                href="https://onepersonai.in"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border-2 border-black bg-white text-black font-bold uppercase text-xs sm:text-sm transition-all hard-shadow hidden md:block hover:bg-black hover:text-white"
              >
                AI Suite
              </a>
            </div>
          </div>
        </header>

        {/* Telegram Banner Alert */}
        <div className="w-full bg-black text-white border-b-2 border-black py-2 px-4 text-center text-xs sm:text-sm font-bold uppercase flex items-center justify-center gap-2">
          <span>Join our Telegram for instant feature updates & tools:</span>
          <a
            href="https://t.me/onepersonaiofficial"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-2 underline-offset-4 hover:bg-white hover:text-black px-1 transition-colors"
          >
            @onepersonaiofficial
          </a>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">{children}</main>

        {/* Pure B&W Footer */}
        <footer className="border-t-4 border-black bg-white pt-12 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <div className="text-2xl font-black uppercase tracking-tighter mb-2">
                  KBFixer
                </div>
                <p className="text-sm font-medium text-black max-w-sm border-l-4 border-black pl-3">
                  Local, instant, and secure file optimization. Your files never
                  leave your browser. Powered by{' '}
                  <a
                    href="https://onepersonai.in"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold"
                  >
                    OnePersonAI
                  </a>
                  .
                </p>
              </div>

              {/* Social Media Ecosystem Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@OnePersonAI_Official"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  title="YouTube Channel"
                  className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all hard-shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/onepersonai_in"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter X"
                  title="X (Twitter) Profile"
                  className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all hard-shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/onepersonaiofficial/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram Page"
                  className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all hard-shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/onepersonai-in-197644426/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn Page"
                  className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all hard-shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61592496011767"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook Page"
                  className="p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all hard-shadow flex items-center justify-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/onepersonaiofficial"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  title="Telegram Channel"
                  className="p-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all hard-shadow flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="w-full h-1 bg-black mb-6"></div>

            <div className="text-xs sm:text-sm font-bold uppercase flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span>© 2026 KBFixer. All rights reserved.</span>
              <span>
                Built by{' '}
                <a
                  href="https://onepersonai.in"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors"
                >
                  OnePersonAI
                </a>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}