import React from 'react';
import { Download, Printer, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, DEPARTMENTS, CERTIFICATIONS, RESEARCH_PORTFOLIO } from '../db/initialData';
import type { AssetsConfig } from '../db/store';

interface ResumeViewProps {
  assetsConfig: AssetsConfig | null;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ assetsConfig }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-800/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 no-print">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // DOCUMENT VIEWER
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Professional Resume
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Toolbar Buttons (No Print) */}
        <div className="flex justify-end space-x-4 mb-6 no-print">
          {assetsConfig?.resumeUrl && assetsConfig.resumeUrl !== '#' ? (
            <a
              href={assetsConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-navy-900 border border-slate-700/60 hover:border-scientific-teal text-slate-100 hover:bg-navy-800 light:bg-white light:border-slate-350 light:text-navy-900 light:hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          ) : (
            <button
              onClick={() => {
                alert("Note: To download, you can use the 'Print' button and select 'Save as PDF' to generate a beautifully styled vector PDF document of this resume.");
              }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-navy-900 border border-slate-700/60 hover:border-scientific-teal text-slate-100 hover:bg-navy-800 light:bg-white light:border-slate-350 light:text-navy-900 light:hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white text-xs font-bold rounded-lg shadow-glow-teal hover:shadow-glow-teal-strong transition-all"
          >
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* CV Print Container */}
        <div className="glass p-8 sm:p-12 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 text-left bg-white dark:bg-navy-900 light:bg-white shadow-glow-teal print-container transition-colors duration-300">
          
          {/* Header Layout (Printable) */}
          <div className="pb-6 border-b-2 border-scientific-teal flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-sans font-black text-navy-950 dark:text-white light:text-navy-950 tracking-tight leading-none print-only">
                {PERSONAL_INFO.fullName.toUpperCase()}
              </h1>
              {/* Fallback header for screens */}
              <h4 className="text-2xl sm:text-3xl font-black text-white dark:text-slate-100 light:text-navy-950 leading-tight">
                {PERSONAL_INFO.fullName}
              </h4>
              <p className="text-sm sm:text-base text-scientific-teal font-semibold font-mono tracking-wide mt-1">
                MEDICAL BIOCHEMISTRY GRADUATE & LAB SCIENTIST
              </p>
            </div>
            
            {/* Contact specifications */}
            <div className="space-y-1.5 text-xs font-mono text-slate-400 dark:text-slate-400 light:text-navy-800">
              <div className="flex items-center space-x-2">
                <Phone size={12} className="text-scientific-teal" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={12} className="text-scientific-teal" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-scientific-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                <span className="break-all">{PERSONAL_INFO.linkedin.replace('https://', '')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-scientific-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                <span>github.com/Wesley-Kirui</span>
              </div>
            </div>
          </div>

          {/* Core Body Section (Screen uses flex wrap, Print uses blocks) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Sidebar Column (Lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-slate-300 dark:text-slate-300 light:text-navy-900 text-xs sm:text-sm leading-relaxed font-light">
                  {PERSONAL_INFO.bio}
                </p>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Languages
                </h2>
                <ul className="text-xs sm:text-sm space-y-1 text-slate-300 dark:text-slate-300 light:text-navy-900 font-light">
                  <li>English - Proficient</li>
                  <li>Kiswahili - Fluent</li>
                </ul>
              </div>

              {/* Certifications preview in brief */}
              <div className="space-y-2 page-break-avoid">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Certifications
                </h2>
                <ul className="text-xs space-y-2 text-slate-300 dark:text-slate-300 light:text-navy-900 font-light">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <li key={idx}>
                      <strong className="text-white dark:text-slate-200 light:text-navy-950 font-semibold">{cert.title}</strong>
                      <span className="block text-slate-400 font-mono text-[10px]">{cert.issuer} ({cert.date})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Laboratory Skills checklist */}
              <div className="space-y-2.5 page-break-avoid">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Core Competencies
                </h2>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "FTIR & UV-Vis Spectrometry",
                    "GC-MS & LC-MS/MS Testing",
                    "Wet Granulation Compounding",
                    "Tablet Coating & Defect Audit",
                    "SOP Adherence",
                    "GLP Compliance Documentation",
                    "Python Data Analysis",
                    "HSE Workplace Safety"
                  ].map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-navy-850 dark:bg-navy-800 light:bg-slate-200 text-slate-300 dark:text-slate-200 light:text-navy-900 border border-slate-700/20 text-[10px] font-mono"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Details Column (Lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Education
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <h3 className="text-sm font-bold text-white dark:text-slate-200 light:text-navy-950">
                      {EDUCATION.degree}
                    </h3>
                    <span className="text-xs font-mono text-scientific-teal">{EDUCATION.duration}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-300 light:text-navy-800 leading-none">
                    {EDUCATION.institution}
                  </p>
                  
                  {/* Coursework list */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-slate-500 block">KEY UNITS:</span>
                    <p className="text-slate-300 dark:text-slate-300 light:text-navy-900 text-xs font-light leading-relaxed mt-1">
                      {EDUCATION.coursework.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Research Work */}
              <div className="space-y-3 page-break-avoid">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Research Experience
                </h2>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-start flex-wrap">
                    <h3 className="font-bold text-white dark:text-slate-200 light:text-navy-950">
                      Undergraduate Research Project
                    </h3>
                    <span className="font-mono text-slate-400">2026</span>
                  </div>
                  <p className="font-medium text-scientific-cyan italic">
                    "{RESEARCH_PORTFOLIO.projectTitle}"
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 dark:text-slate-300 light:text-navy-900 font-light mt-2">
                    {RESEARCH_PORTFOLIO.projectDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Experience timeline */}
              <div className="space-y-3 page-break-avoid">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Industry Practice
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="text-sm font-bold text-white dark:text-slate-200 light:text-navy-950 leading-tight">
                        Quality Control Attaché
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-300 light:text-navy-850 mt-0.5">
                        Lab and Allied Ltd. Manufacturers of Pharmaceuticals
                      </p>
                    </div>
                    <span className="text-xs font-mono text-scientific-teal">May 2025 – Aug 2025</span>
                  </div>

                  <p className="text-slate-300 dark:text-slate-300 light:text-navy-900 text-xs sm:text-sm leading-relaxed font-light">
                    Analyzed product compliance utilizing FTIR and UV-Vis spectrophotometers. Documented operational deviations under strict SOP adherence, maintaining audit-ready data logs. Handled tablet compression machinery calibrations, volumetric titration verification, and capsule weight adjustments across pharmaceutical production lines:
                  </p>

                  {/* Departments preview list */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                    {DEPARTMENTS.map((dept, idx) => (
                      <div key={idx} className="p-2 border border-navy-800 dark:border-navy-800 light:border-slate-200 rounded">
                        <span className="text-[10px] font-bold text-slate-200 dark:text-slate-200 light:text-navy-950 block">
                          {dept.name}
                        </span>
                        <span className="text-[9px] text-scientific-teal font-mono block truncate mt-0.5">
                          {dept.products[0] || 'Calibration Checks'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Referees */}
              <div className="space-y-2 pt-4 page-break-avoid">
                <h2 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-widest border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-1">
                  Referees
                </h2>
                <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs font-mono italic">
                  AVAILABLE UPON REQUEST //
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
