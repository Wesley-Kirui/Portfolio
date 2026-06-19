import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, FlaskConical, Wrench, Settings, ClipboardCheck } from 'lucide-react';
import { DEPARTMENTS } from '../db/initialData';

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const selectedDept = DEPARTMENTS[activeTab];

  return (
    <section id="experience" className="py-24 bg-navy-900 dark:bg-navy-900 light:bg-white grid-lines border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // INDUSTRIAL EXPERIENCE
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Work Experience
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Lab & Allied Ltd. Overview */}
        <div className="glass p-6 sm:p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 text-left mb-12 relative overflow-hidden bg-gradient-to-r from-navy-900/60 to-navy-950/60 shadow-glow-teal">
          <div className="absolute top-0 right-0 w-48 h-48 bg-scientific-teal/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-scientific-teal/10 flex items-center justify-center text-scientific-teal border border-scientific-teal/20 flex-shrink-0">
                <Briefcase size={22} />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-scientific-teal/15 text-scientific-teal border border-scientific-teal/25 mb-1.5">
                  Attaché / Quality Control
                </span>
                <h4 className="text-xl font-bold text-white dark:text-white light:text-navy-950">
                  Lab and Allied Ltd.
                </h4>
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-navy-800 font-light mt-1">
                  Manufacturers of Pharmaceuticals (Human and Veterinary Medicines) • Nairobi, Kenya
                </p>
              </div>
            </div>
            
            <div className="text-left md:text-right font-mono">
              <span className="text-xs text-scientific-teal block">TIMELINE</span>
              <span className="text-white dark:text-white light:text-navy-900 text-sm font-bold mt-1 inline-block">
                May 2025 – August 2025
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-navy-800 dark:border-navy-800 light:border-slate-200">
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-navy-800 leading-relaxed font-light">
              Supported routine laboratory operations for medicinal products analysis in a highly regulated environment. Conducted quality and compositional analysis using FTIR, UV-Vis, GC-MS, and LC-MS/MS in accordance with approved SOPs. Handled sample preparation, tested materials, verified results, and cataloged comprehensive logs to support quality assurance, workplace safety, and compliance with Good Laboratory Practices (GLP).
            </p>
          </div>
        </div>

        {/* Tabbed Department Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Tabs Column */}
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-[10px] text-scientific-teal tracking-widest uppercase mb-2 block pl-2">
              // PRODUCTION DEPARTMENTS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {DEPARTMENTS.map((dept, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-left transition-all duration-300 border ${
                    activeTab === idx
                      ? 'bg-scientific-teal/10 border-scientific-teal/50 text-scientific-teal shadow-glow-teal pl-6'
                      : 'bg-navy-950/60 dark:bg-navy-950/60 light:bg-slate-100 border-navy-850 dark:border-navy-800 light:border-slate-250 text-slate-400 dark:text-slate-400 light:text-navy-800 hover:border-slate-700/60 light:hover:bg-slate-200'
                  }`}
                >
                  <span className="font-mono text-[10px] text-scientific-teal/60 mr-2 block lg:inline">
                    0{idx + 1}.
                  </span>
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Department Details Dashboard */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 sm:p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 min-h-[400px] flex flex-col justify-between"
              >
                {/* Title */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-navy-800 dark:border-navy-800 light:border-slate-200">
                  <span className="text-xl">🧬</span>
                  <div>
                    <h5 className="text-lg font-bold text-white dark:text-white light:text-navy-950">
                      {selectedDept.name} Department
                    </h5>
                    <p className="text-xs text-scientific-teal font-mono">
                      PROCESS LINE VALIDATION & QUALITY ASSURANCE
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {/* Responsibilities */}
                  <div className="space-y-4">
                    <h6 className="text-xs font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-1.5 uppercase font-mono tracking-wider">
                      <ClipboardCheck size={14} className="text-scientific-teal" />
                      <span>Key Responsibilities</span>
                    </h6>
                    <ul className="space-y-3">
                      {selectedDept.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-navy-800 font-light">
                          <span className="text-scientific-teal mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    {/* Equipment */}
                    <div className="space-y-3">
                      <h6 className="text-xs font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-1.5 uppercase font-mono tracking-wider">
                        <Wrench size={14} className="text-scientific-cyan" />
                        <span>Equipment Operated</span>
                      </h6>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDept.equipment.map((eq, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-navy-850 dark:bg-navy-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-navy-900 border border-slate-700/20 text-xs font-mono font-medium"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills Acquired */}
                    <div className="space-y-3">
                      <h6 className="text-xs font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-1.5 uppercase font-mono tracking-wider">
                        <Settings size={14} className="text-scientific-teal" />
                        <span>Core Focus Areas</span>
                      </h6>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDept.skills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-scientific-teal/10 text-scientific-teal border border-scientific-teal/20 text-xs font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Products Handled */}
                    <div className="space-y-3">
                      <h6 className="text-xs font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-1.5 uppercase font-mono tracking-wider">
                        <FlaskConical size={14} className="text-scientific-mint" />
                        <span>Target Drug Formulations</span>
                      </h6>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDept.products.map((prod, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-scientific-mint/10 text-scientific-mint border border-scientific-mint/20 text-xs font-medium"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
