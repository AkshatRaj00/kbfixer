// app/layout.js
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Send } from 'lucide-react';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700', '900'],
  variable: '--font-dm-sans',
});

const SITE_URL = 'https://kbfixer.onepersonai.in';
const OG_IMAGE = `${SITE_URL}/og-image.png`; // 1200x630 banao aur /public mein rakhna

// 🚀 10/10 ULTRA-AGGRESSIVE SEO METADATA
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'KBFixer – #1 Free File Size Fixer | Compress Image, PDF, DOCX, PPT in KB | By Akshat Raj (OnePersonAI)',
    template: '%s | KBFixer by Akshat Raj – OnePersonAI',
  },
  description:
    'KBFixer by Akshat Raj (OnePersonAI) – 100% Free, Unlimited & Private. Best iLovePDF & Smallpdf Alternative. Resize image to exact KB for SSC, UPSC, SBI forms. Compress PDF to 100KB, resize Word DOCX & PowerPoint PPTX instantly in browser. Zero server upload. 100% secure.',
  keywords: [
    // ── Brand / Creator Keywords (Akshat Raj + OnePersonAI) ──
    'KBFixer',
    'KBFixer by Akshat Raj',
    'KBFixer OnePersonAI',
    'Akshat Raj file size tool',
    'OnePersonAI tools',
    'OnePersonAI KBFixer',
    'Akshat Raj OnePersonAI',
    'tools by Akshat Raj',

    // ── Competitor Displacement Keywords ──
    'iLovePDF alternative',
    'Smallpdf alternative free',
    'ResizePixel alternative',
    'TinyPNG alternative online',
    'Adobe PDF compressor alternative',
    'ilovepdf vs kbfixer',
    'better than ilovepdf',
    'free ilovepdf replacement',

    // ── Image / Photo KB Resizer ──
    'increase image kb size online free',
    'reduce image size in kb without losing quality',
    'photo kb fixer for govt forms',
    'passport photo 20kb to 50kb converter',
    'signature photo kb maker online',
    'jpg kb size increaser online',
    'png image compressor to 100kb',
    'webp image size reducer',
    'ssc upsc form photo size fixer',
    'resize photo to exact kb online',
    'image size changer in kb',
    'photo size fix for government exam forms',

    // ── PDF Compression ──
    'compress pdf to 100kb online free',
    'compress pdf to 200kb free',
    'reduce pdf file size in kb online',
    'increase pdf file size in kb',
    'pdf size reducer without quality loss',
    'fastest pdf compressor 2024',
    'pdf optimizer client side no upload',
    'merge and compress pdf free',

    // ── Word DOCX ──
    'reduce docx file size online',
    'compress word document in kb free',
    'docx size increaser for email',
    'ms word file size reducer online',
    'docx to 1mb converter free',

    // ── PowerPoint PPT ──
    'ppt size compressor online free',
    'shrink powerpoint file size in kb',
    'pptx presentation compressor online',
    'reduce heavy ppt file size',
    'compress pptx without losing quality',

    // ── High-Intent Utility ──
    'free online file size fixer',
    'client side private file resizer',
    'no upload file compressor',
    'instant kb mb file converter online',
    'file size fixer browser only',
    'compress files without uploading to server',
    'local file compressor no cloud',
    '100% private file resizer',
  ],

  authors: [
    { name: 'Akshat Raj', url: 'https://onepersonai.in' },
  ],
  creator: 'Akshat Raj – OnePersonAI',
  publisher: 'OnePersonAI',
  category: 'Technology & Utility',

  alternates: {
    canonical: SITE_URL,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'KBFixer by Akshat Raj – Instant KB/MB File Resizer (Better than iLovePDF)',
    description:
      'Fix KB size for images, PDFs, Word & PPTs instantly in browser. No server upload. 100% private. Built by Akshat Raj at OnePersonAI.',
    url: SITE_URL,
    siteName: 'KBFixer by OnePersonAI',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'KBFixer – Free File Size Fixer by Akshat Raj (OnePersonAI)',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'KBFixer – Fastest Local File KB Fixer by Akshat Raj (OnePersonAI)',
    description:
      'Compress & Enlarge PDF, Image, Word & PPT files 100% free, private & instant. Built by @Akshat_Raj00.',
    creator: '@Akshat_Raj00',
    site: '@Akshat_Raj00',
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Google Search Console verify karne ke baad apna code yahan daalna:
    // google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }) {

  // ── 1. WebApplication Schema ──
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'KBFixer',
    alternateName: [
      'KBFixer by Akshat Raj',
      'OnePersonAI KBFixer',
      'iLovePDF Alternative KBFixer',
      'Free File KB Fixer',
    ],
    url: SITE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All (Windows, macOS, Android, iOS, Linux)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'World-class browser-based client-side file resizer for Images, PDFs, Word DOCX, and PPTX. Built by Akshat Raj at OnePersonAI.',
    author: {
      '@type': 'Person',
      name: 'Akshat Raj',
      url: 'https://onepersonai.in',
      sameAs: [
        'https://github.com/AkshatRaj00',
        'https://twitter.com/Akshat_Raj00',
        'https://onepersonai.in',
      ],
    },
    creator: {
      '@type': 'Organization',
      name: 'OnePersonAI',
      url: 'https://onepersonai.in',
      founder: {
        '@type': 'Person',
        name: 'Akshat Raj',
      },
    },
  };

  // ── 2. WebSite + SitelinksSearchBox Schema ──
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KBFixer by Akshat Raj – OnePersonAI',
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'Akshat Raj',
      url: 'https://onepersonai.in',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // ── 3. Organization Schema ──
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OnePersonAI',
    alternateName: 'OnePersonAI by Akshat Raj',
    url: 'https://onepersonai.in',
    logo: 'https://onepersonai.in/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Akshat Raj',
      jobTitle: 'Founder & AI Engineer',
      url: 'https://onepersonai.in',
      sameAs: [
        'https://github.com/AkshatRaj00',
        'https://twitter.com/Akshat_Raj00',
      ],
    },
    sameAs: [
      'https://t.me/onepersonaiofficial',
      'https://github.com/AkshatRaj00',
    ],
  };

  // ── 4. BreadcrumbList Schema ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'OnePersonAI',
        item: 'https://onepersonai.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'KBFixer',
        item: SITE_URL,
      },
    ],
  };

  // ── 5. FAQPage Schema ──
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is KBFixer better and safer than iLovePDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike iLovePDF or Smallpdf, KBFixer by Akshat Raj (OnePersonAI) processes all files 100% locally inside your browser RAM. Your files are never uploaded to any cloud server, making it 100% private, instant, and hack-proof.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who made KBFixer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KBFixer is built by Akshat Raj, Founder of OnePersonAI – a suite of free, privacy-first browser tools. Visit https://onepersonai.in to see all tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to increase or decrease photo KB size for government exam forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Upload your photo to KBFixer Image Tool, enter your exact desired size in KB (e.g., 20KB to 50KB for SSC/UPSC forms), and hit Fix Image. Download your exact target file instantly. No server upload required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is KBFixer free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, KBFixer is 100% free and unlimited. No account needed, no file limits, no watermarks. Built as a free public tool by Akshat Raj at OnePersonAI.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to compress PDF to 100KB online free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use KBFixer PDF Tool – upload your PDF, set target size to 100KB, and click Fix PDF. The compression happens fully in your browser, no upload needed.',
        },
      },
    ],
  };

  const schemas = [webAppSchema, websiteSchema, orgSchema, breadcrumbSchema, faqSchema];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${dmSans.variable} font-sans min-h-screen flex flex-col antialiased bg-white text-black`}
      >

        {/* Top Announcement Strip */}
        <div className="w-full bg-black text-white py-2 px-4 text-center text-xs sm:text-sm font-bold uppercase flex items-center justify-center gap-2 border-b-2 border-black">
          <span className="px-1.5 py-0.5 bg-white text-black text-[10px] font-black tracking-widest">
            NEW
          </span>
          <span>Join Telegram for updates by Akshat Raj:</span>
          <a
            href="https://t.me/onepersonaiofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-2 underline-offset-4 hover:bg-white hover:text-black px-1.5 py-0.5 transition-colors"
          >
            @onepersonaiofficial
          </a>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            <a href="/" className="flex items-center gap-3" aria-label="KBFixer Home">
              <div className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">
                KBFixer
              </div>
              <div className="hidden sm:block px-2 py-0.5 border-2 border-black bg-black text-white text-[10px] font-bold uppercase tracking-widest">
                by Akshat Raj
              </div>
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/onepersonaiofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Telegram Channel by Akshat Raj"
                className="px-4 py-2 border-2 border-black bg-black text-white font-bold uppercase text-xs sm:text-sm flex items-center gap-2 transition-all hard-shadow hover:bg-white hover:text-black"
              >
                <Send className="w-4 h-4" />
                <span>Join Updates</span>
              </a>

              <a
                href="https://onepersonai.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit OnePersonAI by Akshat Raj"
                className="px-4 py-2 border-2 border-black bg-white text-black font-bold uppercase text-xs sm:text-sm transition-all hard-shadow hidden md:block"
              >
                OnePersonAI
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t-4 border-black bg-white pt-12 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">

              <div>
                <div className="text-2xl font-black uppercase tracking-tighter mb-1">KBFixer</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  by <a href="https://onepersonai.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Akshat Raj</a> · OnePersonAI
                </div>
                <p className="text-sm font-medium text-black max-w-md border-l-4 border-black pl-3">
                  The ultimate browser-based file size optimizer. Instant, private, and unlimited
                  processing for Image, PDF, DOCX, and PPT files.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase">
                <a
                  href="https://t.me/onepersonaiofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border-b-2 border-black pb-0.5 hover:bg-black hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" /> Telegram
                </a>
                <a
                  href="https://onepersonai.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-2"
                >
                  OnePersonAI Suite
                </a>
                <a
                  href="https://github.com/AkshatRaj00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-2"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="w-full h-1 bg-black mb-6" />

            {/* SEO Footer Text — Google ishe index karta hai */}
            <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">
              KBFixer is a free file size optimizer tool built by{' '}
              <a href="https://onepersonai.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-black">
                Akshat Raj
              </a>{' '}
              at{' '}
              <a href="https://onepersonai.in" target="_blank" rel="noopener noreferrer" className="underline font-bold text-black">
                OnePersonAI
              </a>
              . Compress images, PDFs, Word DOCX, and PowerPoint PPTX files to exact KB sizes — 100%
              free, private, and unlimited. Best free alternative to iLovePDF and Smallpdf.
            </p>

            <div className="text-xs sm:text-sm font-bold uppercase flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span>© {new Date().getFullYear()} KBFixer · Built by Akshat Raj · Powered by OnePersonAI</span>
              <a
                href="https://onepersonai.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors"
              >
                onepersonai.in
              </a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}