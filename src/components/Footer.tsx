import React from 'react';
import { Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../db/initialData';

interface FooterProps {
  setActiveSection: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-navy-850 py-12 no-print relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Branding block */}
        <div>
          <h4 className="font-sans font-bold text-sm text-white tracking-widest leading-none">
            {PERSONAL_INFO.fullName.toUpperCase()}
          </h4>
          <p className="text-[10px] font-mono text-slate-500 mt-1.5 tracking-wider">
            Bachelor of Science in Medical Biochemistry (JKUAT)
          </p>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-500 font-light max-w-sm italic">
          "Transforming scientific knowledge into innovative healthcare solutions."
        </p>

        {/* Footer social icons */}
        <div className="flex space-x-4">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-scientific-teal transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-scientific-teal transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-slate-400 hover:text-scientific-teal transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>

      <div className="mt-8 text-center text-[10px] text-slate-600 font-mono tracking-widest flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
        <span>&copy; {currentYear} {PERSONAL_INFO.fullName.toUpperCase()} • ALL RIGHTS RESERVED // SECURE COMPILE</span>
        <span className="hidden sm:inline text-slate-700">|</span>
        <button
          onClick={() => {
            setActiveSection('update');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-slate-500 hover:text-scientific-teal hover:underline transition-colors"
        >
          SYSTEM UPDATE //
        </button>
      </div>
    </footer>
  );
};
