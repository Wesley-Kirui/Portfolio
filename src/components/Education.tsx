import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle, GraduationCap } from 'lucide-react';
import { EDUCATION } from '../db/initialData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // ACADEMIC FOUNDATION
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Education
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Main Institution Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-navy-900/40 to-navy-950/40 shadow-glow-teal"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-scientific-teal/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-scientific-teal/10 flex items-center justify-center text-scientific-teal mb-6 border border-scientific-teal/20">
                <GraduationCap size={24} />
              </div>
              <h4 className="text-sm font-mono text-scientific-teal uppercase tracking-widest leading-none mb-2">
                Bachelor of Science
              </h4>
              <h5 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-navy-950 leading-tight">
                {EDUCATION.degree}
              </h5>
              <p className="text-slate-300 dark:text-slate-300 light:text-navy-800 text-sm mt-3 font-semibold">
                {EDUCATION.institution}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-navy-800 dark:border-navy-800 light:border-slate-200">
              <span className="font-mono text-xs text-scientific-teal block">DURATION</span>
              <span className="text-white dark:text-white light:text-navy-900 text-sm font-bold tracking-wide mt-1 inline-block">
                {EDUCATION.duration}
              </span>
            </div>
          </motion.div>

          {/* Details Tabs Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Relevant Coursework */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass p-6 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 flex flex-col"
            >
              <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950 mb-4 flex items-center space-x-2 border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-2">
                <BookOpen size={18} className="text-scientific-teal" />
                <span>Relevant Coursework</span>
              </h4>
              <ul className="space-y-3 flex-grow">
                {EDUCATION.coursework.map((course, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-navy-800 font-light">
                    <span className="text-scientific-teal mt-1">•</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Achievements & Laboratory Training */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-6 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 flex flex-col justify-between space-y-6"
            >
              {/* Training */}
              <div>
                <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950 mb-3.5 flex items-center space-x-2 border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-2">
                  <span className="text-scientific-teal">🧪</span>
                  <span>Laboratory Training</span>
                </h4>
                <ul className="space-y-2">
                  {EDUCATION.laboratoryTraining.map((train, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-navy-800 font-light">
                      <CheckCircle size={12} className="text-scientific-teal mt-0.5 flex-shrink-0" />
                      <span>{train}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950 mb-3 flex items-center space-x-2 border-b border-navy-800 dark:border-navy-800 light:border-slate-200 pb-2">
                  <Award size={18} className="text-scientific-cyan" />
                  <span>Key Recognition</span>
                </h4>
                <ul className="space-y-2">
                  {EDUCATION.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-navy-800 font-light">
                      <CheckCircle size={12} className="text-scientific-cyan mt-0.5 flex-shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
