// app/layout.js
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Send } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'KBFixer - All-in-One File Size Optimizer',
  description: 'Compress, resize, and optimize Image, PDF, DOCX, and PPT files locally in your browser. 100% Secure & Fast. Powered by OnePersonAI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.className} min-h-screen flex flex-col`}>
        
        {/* Pure B&W Header */}
        <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="text-2xl font-black tracking-tighter uppercase">
                KBFixer
              </div>
              <div className="hidden sm:block px-2 py-0.5 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-widest">
                by OnePersonAI
              </div>
            </a>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Telegram Join Button */}
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
                className="px-4 py-2 border-2 border-black bg-white text-black font-bold uppercase text-xs sm:text-sm transition-all hard-shadow hidden md:block"
              >
                AI Suite
              </a>
            </div>
          </div>
        </header>

        {/* Telegram Banner Alert */}
        <div className="w-full bg-black text-white border-b-2 border-black py-2 px-4 text-center text-xs sm:text-sm font-bold uppercase flex items-center justify-center gap-2">
          <span>📢 Join our Telegram for instant feature updates & tools:</span>
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
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Pure B&W Footer */}
        <footer className="border-t-4 border-black bg-white pt-12 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              
              <div>
                <div className="text-2xl font-black uppercase tracking-tighter mb-2">KBFixer</div>
                <p className="text-sm font-medium text-black max-w-sm border-l-4 border-black pl-3">
                  Local, instant, and secure file optimization. Your files never leave your browser.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase">
                <a 
                  href="https://t.me/onepersonaiofficial" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 border-b-2 border-black pb-0.5 hover:bg-black hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" /> Join Updates
                </a>
                <a href="#" className="hover:underline underline-offset-4 decoration-2">Privacy</a>
                <a href="#" className="hover:underline underline-offset-4 decoration-2">Terms</a>
              </div>
            </div>

            <div className="w-full h-1 bg-black mb-6"></div>

            <div className="text-xs sm:text-sm font-bold uppercase flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span>© {new Date().getFullYear()} KBFixer. All rights reserved.</span>
              <span>Built by <a href="https://onepersonai.in" target="_blank" className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors">OnePersonAI</a></span>
            </div>
          </div>
        </footer>
        
      </body>
    </html>
  );
}