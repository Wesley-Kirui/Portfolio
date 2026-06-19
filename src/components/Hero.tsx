import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mail, Award, BookOpen, GraduationCap } from 'lucide-react';
import { CanvasBackground } from './CanvasBackground';
import { PERSONAL_INFO } from '../db/initialData';
import type { AssetsConfig } from '../db/store';

interface HeroProps {
  isDarkMode: boolean;
  setActiveSection: (sec: string) => void;
  assetsConfig: AssetsConfig | null;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, setActiveSection, assetsConfig }) => {
  const stats = [
    { label: 'Years of Study', value: '4', icon: <GraduationCap className="text-scientific-teal" size={20} /> },
    { label: 'Research Projects', value: '3', icon: <BookOpen className="text-scientific-cyan" size={20} /> },
    { label: 'Laboratory Skills', value: '12+', icon: <span className="text-scientific-teal text-lg font-bold">🧪</span> },
    { label: 'Certifications', value: '3', icon: <Award className="text-scientific-emerald" size={20} /> }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-navy-950 dark:bg-navy-950 light:bg-slate-50 transition-colors duration-300">
      {/* Molecule Particle Canvas Background */}
      <CanvasBackground isDarkMode={isDarkMode} />

      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern-dark dark:bg-grid-pattern-dark light:bg-grid-pattern opacity-60 pointer-events-none z-0" />

      {/* Background soft glowing blur elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-scientific-teal/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-scientific-cyan/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-scientific-teal/10 border border-scientific-teal/30"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-scientific-teal sci-indicator" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-scientific-teal">
                Bio-Pharmaceutical Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white dark:text-white light:text-navy-950"
            >
              {PERSONAL_INFO.fullName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-semibold text-scientific-teal tracking-wide"
            >
              {PERSONAL_INFO.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 dark:text-slate-300 light:text-navy-700 max-w-xl text-base sm:text-lg leading-relaxed font-light"
            >
              "{PERSONAL_INFO.tagline}"
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => handleNavClick('projects')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover hover:to-scientific-teal text-white font-bold rounded-lg shadow-glow-teal hover:shadow-glow-teal-strong transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
              >
                <span>View Portfolio</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleNavClick('resume')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-navy-900 border border-slate-700/60 hover:border-scientific-teal hover:bg-navy-800 text-slate-100 light:bg-white light:border-slate-300 light:text-navy-950 light:hover:bg-slate-50 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
              >
                <FileText size={16} />
                <span>View CV / Print</span>
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-transparent border border-scientific-teal/40 hover:border-scientific-teal text-scientific-teal font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Profile Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-72 h-80 sm:w-80 sm:h-96 group cursor-pointer"
            >
              {/* Outer cyber sci-fi borders */}
              <div className="absolute inset-0 bg-gradient-to-tr from-scientific-teal via-scientific-cyan to-scientific-mint rounded-2xl opacity-40 group-hover:opacity-75 blur-md transition-all duration-500" />
              <div className="absolute inset-0 border border-scientific-teal/30 rounded-2xl z-20 pointer-events-none" />

              {/* Glowing brackets around picture */}
              <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-scientific-teal z-20" />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-scientific-teal z-20" />

              {/* Profile Image Container */}
              <div className="absolute inset-1.5 rounded-xl overflow-hidden bg-navy-900 z-10 relative">
                {/* Image 1: Main (Suit Blue) */}
                <img
                  src={assetsConfig?.profile1Url || "./images/profile_1.jpg"}
                  alt={PERSONAL_INFO.fullName}
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                />
                
                {/* Image 2: Hover (Suit Grey) */}
                <img
                  src={assetsConfig?.profile2Url || "./images/profile_2.jpg"}
                  alt={`${PERSONAL_INFO.fullName} Alternative`}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out bg-navy-950"
                />

                {/* Dark overlay with scientific readouts */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent p-4 text-left z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-mono text-[9px] text-scientific-teal tracking-widest leading-none">
                    LAB.SPECIMEN // SICHAMBO_W_K
                  </div>
                  <div className="text-[11px] text-slate-300 font-light mt-1">
                    Bachelor of Science in Medical Biochemistry (JKUAT)
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 lg:mt-24 w-full"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass p-5 rounded-xl border border-navy-700/30 flex items-center space-x-4 shadow-glow-teal hover:border-scientific-teal/30 hover:scale-105 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-navy-800 dark:bg-navy-800 light:bg-slate-200/80 flex items-center justify-center border border-slate-700/20 shadow-inner">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-navy-950 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-400 light:text-navy-700 tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
