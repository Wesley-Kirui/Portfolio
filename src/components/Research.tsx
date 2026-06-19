import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Bookmark, Search, GraduationCap } from 'lucide-react';
import type { PublicationDetail } from '../db/initialData';
import { RESEARCH_PORTFOLIO } from '../db/initialData';
import { dbGetPublications } from '../db/store';

export const Research: React.FC = () => {
  const [publications, setPublications] = useState<PublicationDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPubs = async () => {
      const data = await dbGetPublications();
      setPublications(data);
    };
    fetchPubs();

    const handleUpdate = () => {
      fetchPubs();
    };
    window.addEventListener('portfolio-db-update', handleUpdate);
    return () => window.removeEventListener('portfolio-db-update', handleUpdate);
  }, []);

  const filteredPubs = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="research" className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // INVESTIGATIONS & PUBLICATIONS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Research Portfolio
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Main Undergraduate Research Project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass p-6 sm:p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 relative bg-gradient-to-b from-navy-900/40 to-navy-950/40 shadow-glow-teal"
          >
            <span className="absolute top-4 right-4 text-[10px] font-mono font-bold text-scientific-teal bg-scientific-teal/10 px-2 py-0.5 rounded border border-scientific-teal/20">
              UNDERGRADUATE PROJECT
            </span>

            <div className="w-12 h-12 rounded-xl bg-scientific-teal/10 flex items-center justify-center text-scientific-teal mb-6 border border-scientific-teal/20">
              <GraduationCap size={24} />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white dark:text-white light:text-navy-950 leading-tight">
              {RESEARCH_PORTFOLIO.projectTitle}
            </h4>
            
            <div className="mt-6 space-y-4">
              <h5 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-wider">
                Abstract
              </h5>
              <p className="text-slate-300 dark:text-slate-300 light:text-navy-850 text-xs sm:text-sm leading-relaxed font-light">
                {RESEARCH_PORTFOLIO.projectAbstract}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-navy-800 dark:border-navy-800 light:border-slate-200 space-y-4">
              <h5 className="text-xs font-mono font-bold text-scientific-teal/80 uppercase tracking-wider">
                Key Methodologies & Achievements
              </h5>
              <ul className="space-y-3">
                {RESEARCH_PORTFOLIO.projectDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-navy-800 font-light">
                    <span className="text-scientific-teal mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Publications & Search List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Search and Header */}
            <div className="glass p-5 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-2">
                <Bookmark size={18} className="text-scientific-cyan" />
                <span>Publications & Reports ({publications.length})</span>
              </h4>

              {/* Search Box */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search scientific papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-300 light:text-navy-950 font-light"
                />
              </div>
            </div>

            {/* List of articles */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {filteredPubs.map((pub, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={pub.id}
                  className="glass p-5 rounded-xl border border-navy-800 dark:border-navy-800 light:border-slate-200 hover:border-scientific-cyan/30 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-white dark:text-white light:text-navy-950 group-hover:text-scientific-cyan transition-colors">
                      {pub.title}
                    </h5>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-navy-700">
                      BY {pub.authors.toUpperCase()} | {pub.journal.toUpperCase()} ({pub.date})
                    </p>
                    <p className="text-slate-300 dark:text-slate-300 light:text-navy-800 text-xs leading-relaxed font-light line-clamp-3">
                      {pub.abstract}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-navy-800/80 dark:border-navy-800/80 light:border-slate-200 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-scientific-cyan">
                      PEER REVIEWED //
                    </span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Note: This is a prototype publication download link. The document template is ready for integration.");
                      }}
                      className="inline-flex items-center space-x-1 text-xs text-scientific-cyan hover:underline font-mono font-bold"
                    >
                      <Download size={12} />
                      <span>PDF READ</span>
                    </a>
                  </div>
                </motion.div>
              ))}

              {filteredPubs.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  NO PAPERS MATCHING QUERY //
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
