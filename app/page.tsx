'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ImageIcon,
  FileText,
  FileBox,
  Presentation,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Menu,
  X,
  Send,
  ExternalLink,
  Target,
  Sparkles,
  Crop,
  Layers,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [targetKb, setTargetKb] = useState('');
  const router = useRouter();

  const handlePresetClick = (type: string, kb: number) => {
    if (type === 'image') {
      router.push(`/image?target=${kb}`);
    } else if (type === 'pdf') {
      router.push(`/pdf?target=${kb}`);
    } else if (type === 'crop') {
      router.push('/crop');
    } else if (type === 'signature') {
      router.push('/signature');
    }
  };

  const handleCustomGo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKb = targetKb.trim();
    if (!cleanKb || isNaN(Number(cleanKb))) return;
    router.push(`/image?target=${cleanKb}`);
  };

  const tools = [
    {
      id: 'image',
      name: 'Image Fixer',
      description: 'Compress JPG, PNG, WEBP files to exact KB limits for all exam portals.',
      icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/image',
      badge: 'Popular',
    },
    {
      id: 'signature',
      name: 'Sign Clean-Up',
      description: 'Isolate signatures to pure black on white paper and lock under 20KB.',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/signature',
      badge: 'Exam Spec',
    },
    {
      id: 'crop',
      name: 'Dimension Cropper',
      description: 'Lock exact passport pixel aspect ratios (200x230 px) with zero distortion.',
      icon: <Crop className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/crop',
      badge: 'Pixel Lock',
    },
    {
      id: 'pdf-tool',
      name: 'PDF Visual Engine',
      description: 'Merge or split marksheets and documents with visual page inspection in RAM.',
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/pdf-tool',
      badge: 'Zero Upload',
    },
    {
      id: 'pdf',
      name: 'PDF Optimizer',
      description: 'Compress bank statements and certificates under strict portal thresholds.',
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/pdf',
      badge: 'Instant',
    },
    {
      id: 'word',
      name: 'Word Resizer',
      description: 'Compress DOCX documents instantly without damaging fonts or formatting.',
      icon: <FileBox className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/word',
      badge: null,
    },
    {
      id: 'ppt',
      name: 'PPT Compressor',
      description: 'Shrink heavy slide presentations inside browser memory for fast email attachments.',
      icon: <Presentation className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/ppt',
      badge: null,
    },
  ];

  const examGuidelines = [
    { portal: 'UPSC Civil Services', photo: '20 KB to 300 KB (350x350 px)', sign: '20 KB to 300 KB (1000x1000 px)' },
    { portal: 'SSC CGL / CHSL / GD', photo: '20 KB to 50 KB (3.5x4.5 cm)', sign: '10 KB to 20 KB (4.0x2.0 cm)' },
    { portal: 'IBPS / SBI Banking', photo: '20 KB to 50 KB (200x230 px)', sign: '10 KB to 20 KB (140x60 px)' },
    { portal: 'NTA NEET / JEE Main', photo: '10 KB to 200 KB (Passport Size)', sign: '4 KB to 30 KB (White Background)' },
  ];

  const faqs = [
    {
      question: 'What is KBFixer and how does it guarantee exact file sizes?',
      answer: 'KBFixer is a browser-native file size optimization platform. Unlike standard online compressors that guess quality levels, KBFixer uses an iterative binary search compression engine combined with HTML5 Canvas and WASM to match your target KB threshold on the first attempt.',
    },
    {
      question: 'Why is client-side processing safer than uploading to cloud servers?',
      answer: 'Traditional file compressors upload your private Aadhaar cards, PAN cards, marksheet PDFs, and identity photos to external servers. KBFixer executes all byte processing strictly inside your local machine memory (RAM). Zero bytes are transmitted to any server.',
    },
    {
      question: 'How do I resize an image to 20KB or 50KB for government forms?',
      answer: 'Select Image Fixer or Dimension Cropper, choose a quick preset like UPSC Photo (50KB) or SSC Sign (20KB), or enter any custom KB value. The tool locks both aspect ratio and byte boundaries automatically.',
    },
    {
      question: 'Does KBFixer support multi-page PDF compression, splitting, and merging?',
      answer: 'Yes. The PDF Visual Engine renders full thumbnail previews of every page in browser memory. You can visually inspect, exclude unwanted pages, extract specific sheets, and merge multiple documents with zero data leakage.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center">
        {/* Mobile Quick Navigation Bar */}
        <nav aria-label="Mobile Access" className="w-full max-w-4xl md:hidden mb-6">
          <div className="border-3 border-black bg-white hard-shadow">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b-3 border-black">
              <span className="text-xs font-black uppercase tracking-widest">Quick Navigation</span>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close quick menu' : 'Open quick menu'}
                aria-expanded={menuOpen}
                className="min-h-[38px] min-w-[38px] border-2 border-black bg-black text-white flex items-center justify-center hard-shadow"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            {menuOpen && (
              <div className="p-3.5 grid grid-cols-1 gap-2.5 bg-white">
                <a
                  href="https://t.me/onepersonaiofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] border-2 border-black bg-black text-white px-3 py-2 font-bold uppercase text-[11px] tracking-wider flex items-center justify-between hard-shadow"
                >
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Join Telegram Community
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://onepersonai.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] border-2 border-black bg-white text-black px-3 py-2 font-bold uppercase text-[11px] tracking-wider flex items-center justify-between hard-shadow"
                >
                  <span>OnePersonAI Main Ecosystem</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.link}
                      onClick={() => setMenuOpen(false)}
                      className="min-h-[40px] border-2 border-black bg-white px-2.5 py-2 text-[10px] font-black uppercase tracking-wide flex items-center justify-center text-center hard-shadow"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center w-full max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 px-3 py-1 border-2 border-black bg-white text-[10px] sm:text-xs font-black text-black uppercase tracking-widest mb-4 hard-shadow">
            <Target className="w-3.5 h-3.5 text-black shrink-0" />
            <span>Precision Client-Side File Optimizer • Zero Retries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-[-0.04em] mb-4 leading-[1.05] uppercase">
            KBFixer: Hit Exact KB <br />
            <span className="inline-block bg-black text-white px-2.5 py-0.5 mt-1">
              On The First Try.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-semibold text-black max-w-xl mx-auto border-l-3 border-black pl-3 text-left leading-snug">
            Type 20KB, get 20KB. Zero guessing, zero rejections at UPSC, SSC, IBPS, and state entrance portals. Completely executed inside your browser RAM.
          </p>

          {/* Preset Fast Selector */}
          <div className="mt-6 p-4 border-3 border-black bg-white hard-shadow text-left">
            <div className="text-[11px] font-black uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Instant Exam Presets:</span>
              <span className="text-[10px] font-bold text-gray-600">Click to run immediately</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <button
                type="button"
                onClick={() => handlePresetClick('image', 50)}
                className="px-2.5 py-1.5 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors uppercase hard-shadow"
              >
                UPSC Photo (50KB)
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('signature', 20)}
                className="px-2.5 py-1.5 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors uppercase hard-shadow"
              >
                SSC Clean Sign (&lt;20KB)
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('crop', 0)}
                className="px-2.5 py-1.5 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors uppercase hard-shadow"
              >
                Crop 200×230px
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('pdf', 300)}
                className="px-2.5 py-1.5 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors uppercase hard-shadow"
              >
                PDF Under 300KB
              </button>
            </div>

            <form onSubmit={handleCustomGo} className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="50000"
                placeholder="Or enter target KB (e.g. 45)..."
                value={targetKb}
                onChange={(e) => setTargetKb(e.target.value)}
                className="w-full text-xs font-bold border-2 border-black px-3 py-2 outline-none focus:bg-gray-50"
              />
              <button
                type="submit"
                className="px-4 py-2 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider shrink-0 hover:bg-white hover:text-black transition-colors"
              >
                Fix Now
              </button>
            </form>
          </div>
        </header>

        {/* Tools Grid */}
        <section aria-label="Available Utilities" className="w-full max-w-5xl mb-10 sm:mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {tools.map((tool) => (
              <Link
                href={tool.link}
                key={tool.id}
                className="block group focus:outline-none focus-visible:outline-2 focus-visible:outline-black"
                aria-label={`Open ${tool.name}`}
              >
                <article className="relative h-full min-h-[160px] bg-white border-3 border-black p-3.5 hard-shadow flex flex-col justify-between">
                  {tool.badge && (
                    <div className="absolute top-3 right-3 bg-black border border-black text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wider">
                      {tool.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                        {tool.icon}
                      </div>
                      <h2 className="text-sm sm:text-base font-black text-black uppercase tracking-tight leading-none pr-12">
                        {tool.name}
                      </h2>
                    </div>

                    <p className="text-[11px] font-medium text-black mb-2.5 border-l-2 border-black pl-2 leading-snug">
                      {tool.description}
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center text-[10px] font-black text-white bg-black px-2.5 py-1 uppercase tracking-wider group-hover:bg-white group-hover:text-black border-2 border-black transition-colors">
                    Launch Tool <ArrowRight className="w-3 h-3 ml-1 shrink-0" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust & Architecture Badges */}
        <section aria-label="Security Architecture" className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-0 border-3 border-black bg-white hard-shadow overflow-hidden mb-10 sm:mb-14">
          <div className="flex flex-col items-start p-4 border-b-3 sm:border-b-0 sm:border-r-3 border-black group">
            <Lock className="w-5 h-5 mb-2 text-black shrink-0" />
            <h3 className="font-black text-xs uppercase mb-1">Zero-Cloud RAM Processing</h3>
            <p className="text-[11px] font-medium leading-relaxed text-gray-800">
              Your sensitive documents never leave your browser. Identity cards and marksheets remain strictly confidential.
            </p>
          </div>

          <div className="flex flex-col items-start p-4 border-b-3 sm:border-b-0 sm:border-r-3 border-black group">
            <Zap className="w-5 h-5 mb-2 text-black shrink-0" />
            <h3 className="font-black text-xs uppercase mb-1">Instant Execution</h3>
            <p className="text-[11px] font-medium leading-relaxed text-gray-800">
              Zero network upload or download delay. Local WebAssembly pipelines process multi-megabyte files in milliseconds.
            </p>
          </div>

          <div className="flex flex-col items-start p-4 group">
            <ShieldCheck className="w-5 h-5 mb-2 text-black shrink-0" />
            <h3 className="font-black text-xs uppercase mb-1">Magic Byte Verification</h3>
            <p className="text-[11px] font-medium leading-relaxed text-gray-800">
              Every exported file includes clean headers and magic byte validation to prevent upload rejections on government gateways.
            </p>
          </div>
        </section>

        {/* Exam Portal Specifications Table (High SEO Entity Value) */}
        <section aria-label="Portal Specifications" className="w-full max-w-5xl border-3 border-black bg-white p-5 sm:p-6 hard-shadow text-left mb-10 sm:mb-14">
          <div className="border-b-2 border-black pb-3 mb-4">
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
              Official Examination Portal Guidelines Reference
            </h2>
            <p className="text-[11px] text-gray-600 font-semibold mt-1">
              Presets configured according to standard public service commission directives.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-gray-100">
                  <th className="p-2 font-black uppercase">Examination Gateway</th>
                  <th className="p-2 font-black uppercase">Photograph Requirement</th>
                  <th className="p-2 font-black uppercase">Signature Requirement</th>
                </tr>
              </thead>
              <tbody>
                {examGuidelines.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-300">
                    <td className="p-2 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                      {row.portal}
                    </td>
                    <td className="p-2 text-gray-700">{row.photo}</td>
                    <td className="p-2 text-gray-700">{row.sign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO-Rich FAQ Section */}
        <section aria-label="Frequently Asked Questions" className="w-full max-w-5xl border-3 border-black bg-white p-5 sm:p-6 hard-shadow text-left">
          <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-4">
            <HelpCircle className="w-5 h-5 text-black shrink-0" />
            <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-black">
              Frequently Asked Questions • KBFixer Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <article key={index} className="border-2 border-black p-3.5 bg-gray-50">
                <h3 className="text-xs font-black uppercase text-black mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-[11px] font-medium text-gray-800 leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}