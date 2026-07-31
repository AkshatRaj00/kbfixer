// src/app/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const tools = [
    {
      id: 'image',
      name: 'Image Fixer',
      description: 'Compress or enlarge JPG, PNG, WEBP files instantly for govt forms.',
      icon: <ImageIcon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      link: '/image',
      badge: 'Popular',
    },
    {
      id: 'pdf',
      name: 'PDF Optimizer',
      description: 'Reduce or increase PDF document size without losing text quality.',
      icon: <FileText className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      link: '/pdf',
      badge: 'High Demand',
    },
    {
      id: 'word',
      name: 'Word Resizer',
      description: 'Optimize DOCX files size for easy email sharing and fast uploads.',
      icon: <FileBox className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      link: '/word',
      badge: null,
    },
    {
      id: 'ppt',
      name: 'PPT Compressor',
      description: 'Shrink massive PowerPoint presentations in seconds directly in browser.',
      icon: <Presentation className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />,
      link: '/ppt',
      badge: null,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col items-center">
      {/* Mobile Utility Bar */}
      <div className="w-full max-w-5xl md:hidden mb-8">
        <div className="border-4 border-black bg-white hard-shadow">
          <div className="flex items-center justify-between px-4 py-3 border-b-4 border-black">
            <div className="text-sm font-black uppercase tracking-widest">Quick Access</div>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="min-h-[44px] min-w-[44px] border-2 border-black bg-black text-white flex items-center justify-center hard-shadow"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {menuOpen && (
            <div className="p-4 grid grid-cols-1 gap-3 bg-white">
              <a
                href="https://t.me/onepersonaiofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] border-2 border-black bg-black text-white px-4 py-3 font-bold uppercase text-xs tracking-wider flex items-center justify-between hard-shadow"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Join Updates
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://onepersonai.in"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] border-2 border-black bg-white text-black px-4 py-3 font-bold uppercase text-xs tracking-wider flex items-center justify-between hard-shadow"
              >
                <span>OnePersonAI</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.link}
                    onClick={() => setMenuOpen(false)}
                    className="min-h-[48px] border-2 border-black bg-white px-3 py-3 text-xs font-black uppercase tracking-wide flex items-center justify-center text-center hard-shadow"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center w-full max-w-4xl mb-14 sm:mb-16 lg:mb-24">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-2 border-2 border-black bg-white text-[10px] sm:text-xs md:text-sm font-bold text-black uppercase tracking-widest mb-6 sm:mb-8 hard-shadow">
          <Zap className="w-4 h-4 fill-black shrink-0" />
          <span>100% Client-Side Processing</span>
        </div>

        <h1 className="text-[2.5rem] xs:text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black tracking-[-0.05em] mb-6 sm:mb-8 leading-[1] uppercase">
          Fix Your File Size <br />
          <span className="inline-block bg-black text-white px-3 sm:px-4 py-1">
            Instantly.
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl font-medium text-black max-w-2xl mx-auto border-l-4 border-black pl-4 text-left leading-relaxed">
          The ultimate utility to compress, enlarge, and optimize your files in KB/MB.
          No server uploads. Completely secure. Built for speed.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full max-w-5xl mb-16 sm:mb-20 lg:mb-24">
        {tools.map((tool) => (
          <Link
            href={tool.link}
            key={tool.id}
            className="block group focus:outline-none focus-visible:outline-4 focus-visible:outline-black"
            aria-label={`Open ${tool.name}`}
          >
            <div className="relative h-full min-h-[280px] sm:min-h-[300px] bg-white border-4 border-black p-5 sm:p-6 lg:p-8 hard-shadow flex flex-col">
              {tool.badge && (
                <div className="absolute top-4 right-4 max-w-[46%] bg-black border-2 border-black text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 uppercase tracking-wider text-right">
                  {tool.badge}
                </div>
              )}

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-4 border-black flex items-center justify-center mb-5 sm:mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors duration-200 shrink-0">
                {tool.icon}
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black uppercase tracking-tight mb-3 leading-tight pr-20 sm:pr-24">
                {tool.name}
              </h2>

              <p className="text-sm sm:text-base font-medium text-black mb-6 sm:mb-8 border-l-2 border-black pl-3 leading-relaxed flex-grow">
                {tool.description}
              </p>

              <div className="inline-flex w-fit min-h-[44px] items-center text-xs sm:text-sm font-bold text-white bg-black px-4 py-2.5 uppercase tracking-wider group-hover:bg-white group-hover:text-black group-hover:border-black border-2 border-black transition-colors duration-200">
                Open Tool <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Trust & Security Features */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-black bg-white hard-shadow overflow-hidden">
        <div className="flex flex-col items-start p-6 sm:p-7 lg:p-8 border-b-4 sm:border-r-4 lg:border-b-0 border-black hover:bg-black hover:text-white transition-colors duration-200 group min-h-[220px]">
          <Lock className="w-8 h-8 sm:w-10 sm:h-10 mb-4 text-black group-hover:text-white shrink-0" />
          <h3 className="font-black text-lg sm:text-xl uppercase mb-2">100% Private</h3>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Files never leave your device. Processing happens in your RAM.
          </p>
        </div>

        <div className="flex flex-col items-start p-6 sm:p-7 lg:p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black hover:bg-black hover:text-white transition-colors duration-200 group min-h-[220px]">
          <Zap className="w-8 h-8 sm:w-10 sm:h-10 mb-4 text-black group-hover:text-white shrink-0" />
          <h3 className="font-black text-lg sm:text-xl uppercase mb-2">Blazing Fast</h3>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Zero upload time. Leverage your browser&apos;s raw processing power.
          </p>
        </div>

        <div className="flex flex-col items-start p-6 sm:p-7 lg:p-8 hover:bg-black hover:text-white transition-colors duration-200 group min-h-[220px] sm:col-span-2 lg:col-span-1">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 mb-4 text-black group-hover:text-white shrink-0" />
          <h3 className="font-black text-lg sm:text-xl uppercase mb-2">Secure Core</h3>
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            Built with anti-injection and magic-byte verification logic.
          </p>
        </div>
      </div>
    </div>
  );
}