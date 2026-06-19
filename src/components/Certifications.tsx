import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../db/initialData';

export const Certifications: React.FC = () => {
  interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    code: string;
  }
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="py-24 bg-navy-900 dark:bg-navy-900 light:bg-white grid-lines border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // COMPLIANCE & CREDENTIALS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Certifications & Training
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              onClick={() => setSelectedCert(cert)}
              className="glass p-6 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 hover:border-scientific-teal/40 hover:shadow-glow-teal transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-lg bg-navy-950 dark:bg-navy-950 light:bg-slate-100 flex items-center justify-center text-scientific-teal border border-slate-800 dark:border-slate-800 light:border-slate-250 shadow-inner group-hover:text-scientific-cyan transition-colors">
                    <Award size={20} />
                  </div>
                  <span className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-navy-950 group-hover:text-scientific-teal transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-scientific-teal font-mono tracking-wider">
                    ISSUER: {cert.issuer.toUpperCase()}
                  </p>
                </div>

                <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-800/80 dark:border-navy-800/80 light:border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-mono tracking-wider text-[10px]">
                  CODE: {cert.code}
                </span>
                <span className="text-scientific-teal group-hover:underline font-mono font-bold flex items-center space-x-1 text-[10px]">
                  <span>PREVIEW</span>
                  <ExternalLink size={10} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Lightbox Preview Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass w-full max-w-xl rounded-2xl border border-navy-800 shadow-glow-teal p-6 text-left relative overflow-hidden"
              >
                {/* Cyber style background lines */}
                <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
                
                {/* Header buttons */}
                <div className="flex justify-between items-center mb-6">
                  <span className="inline-flex items-center space-x-1 text-xs text-scientific-emerald bg-scientific-emerald/10 border border-scientific-emerald/30 px-2 py-0.5 rounded font-mono">
                    <ShieldCheck size={12} />
                    <span>SECURE DIGITALLY VERIFIED</span>
                  </span>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white light:bg-slate-200 light:hover:bg-slate-300 light:text-navy-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Certificate Border Framing */}
                <div className="border-2 border-dashed border-scientific-teal/30 p-6 sm:p-8 rounded-xl bg-navy-950/50 dark:bg-navy-950/50 light:bg-slate-50 flex flex-col justify-between items-center text-center space-y-6">
                  
                  {/* Seal / Emblem */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-scientific-teal to-scientific-cyan flex items-center justify-center text-white border-4 border-navy-900 shadow-glow-teal animate-pulse">
                    <Award size={32} />
                  </div>

                  {/* Body text */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-scientific-teal uppercase block">
                      CERTIFICATE OF INSTRUCTION
                    </span>
                    <h4 className="text-xl sm:text-2xl font-sans font-extrabold text-white dark:text-white light:text-navy-950 leading-tight">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-navy-700">
                      Successfully granted to
                    </p>
                    <h5 className="text-lg font-serif font-semibold text-scientific-cyan italic tracking-wider">
                      Wisely Kirui Sichambo
                    </h5>
                    <p className="text-xs text-slate-300 dark:text-slate-300 light:text-navy-800 max-w-sm leading-relaxed font-light mx-auto">
                      For successfully completing the detailed curriculum and evaluations overseen by the{' '}
                      <strong className="text-white dark:text-white light:text-navy-900 font-semibold">{selectedCert.issuer}</strong>.
                    </p>
                  </div>

                  {/* Verification footer block */}
                  <div className="w-full pt-4 border-t border-navy-800/80 dark:border-navy-800/80 light:border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs space-y-2 sm:space-y-0">
                    <div className="text-left font-mono">
                      <span className="text-[9px] text-slate-500 block">LICENSE ID</span>
                      <span className="text-slate-300 dark:text-slate-300 light:text-navy-800 font-semibold">{selectedCert.code}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[9px] text-slate-500 block">GRANT DATE</span>
                      <span className="text-slate-300 dark:text-slate-300 light:text-navy-800 font-semibold">{selectedCert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Print note */}
                <div className="mt-4 text-[10px] text-slate-500 font-mono text-center">
                  REGULATORY STANDARDS AUTHORITY // DIGITAL VERIFICATION KEY SECURED
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
