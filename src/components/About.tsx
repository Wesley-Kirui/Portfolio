import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Award, Compass, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO, MILESTONES } from '../db/initialData';

export const About: React.FC = () => {
  const interests = [
    { name: 'Medical Biochemistry', desc: 'Metabolic networks, disease pathways, and clinical endocrinology.', color: 'from-scientific-teal to-scientific-cyan' },
    { name: 'Molecular Genetics', desc: 'Recombinant DNA tech, transcription modeling, and sequence translation.', color: 'from-scientific-cyan to-scientific-mint' },
    { name: 'Phytochemistry', desc: 'Secondary plant metabolites characterization and antimicrobial testing.', color: 'from-scientific-mint to-scientific-teal' },
    { name: 'Pharmaceutical Manufacturing', desc: 'Tablet formulations, polymer film coatings, quality controls, and GLP.', color: 'from-scientific-teal to-scientific-cyan' },
    { name: 'Biotechnology', desc: 'Genetically engineered crops, bacterial synthesis, and tissue culture.', color: 'from-scientific-cyan to-scientific-mint' },
    { name: 'Data Analysis', desc: 'Bioinformatics computing, Python parsing, and digital clinical logs.', color: 'from-scientific-mint to-scientific-teal' }
  ];

  const getTimelineIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('joined') || t.includes('education')) return <GraduationCap size={16} className="text-scientific-teal" />;
    if (t.includes('chairperson') || t.includes('leadership')) return <Award size={16} className="text-scientific-cyan" />;
    if (t.includes('attachment') || t.includes('attaché')) return <Briefcase size={16} className="text-scientific-mint" />;
    return <Calendar size={16} className="text-scientific-teal" />;
  };

  return (
    <section id="about" className="py-24 bg-navy-900 dark:bg-navy-900 light:bg-white grid-lines border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // PROFILE SUMMARY
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            About Me
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Bio and Career Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-6 space-y-6 text-left">
            <h4 className="text-xl font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-2">
              <Compass className="text-scientific-teal" size={22} />
              <span>Professional Biography</span>
            </h4>
            <p className="text-slate-300 dark:text-slate-300 light:text-navy-700 leading-relaxed font-light text-base">
              {PERSONAL_INFO.bio}
            </p>
            
            <div className="glass p-6 rounded-xl border border-scientific-teal/20 bg-scientific-teal/5">
              <h5 className="text-sm font-mono font-bold text-scientific-teal uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <ShieldAlert size={14} />
                <span>Career Objective</span>
              </h5>
              <p className="text-slate-300 dark:text-slate-300 light:text-navy-800 text-sm leading-relaxed font-light">
                {PERSONAL_INFO.careerObjective}
              </p>
            </div>
          </div>

          {/* Research Interest Cards */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h4 className="text-xl font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-2">
              <span className="text-scientific-cyan text-2xl">🧬</span>
              <span>Research Interests</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interests.map((interest, idx) => (
                <div 
                  key={idx}
                  className="glass p-4 rounded-xl border border-navy-800 hover:border-scientific-teal/30 hover:shadow-glow-teal transition-all duration-300 group"
                >
                  <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${interest.color} absolute left-0 top-4`} />
                  <div className="pl-3">
                    <h5 className="font-semibold text-white dark:text-white light:text-navy-900 group-hover:text-scientific-teal transition-colors duration-200 text-sm">
                      {interest.name}
                    </h5>
                    <p className="text-slate-400 dark:text-slate-400 light:text-navy-600 text-xs mt-1 leading-relaxed font-light">
                      {interest.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic & Leadership Timeline */}
        <div className="mt-20">
          <div className="text-left mb-10">
            <h4 className="text-xl font-bold text-white dark:text-white light:text-navy-950 flex items-center space-x-2">
              <Calendar className="text-scientific-teal" size={22} />
              <span>Academic & Professional Milestones</span>
            </h4>
          </div>

          <div className="relative border-l border-navy-800 dark:border-navy-800 light:border-slate-200 ml-4 md:ml-32">
            {MILESTONES.map((milestone, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="mb-10 ml-6 relative group"
              >
                {/* Timeline node */}
                <span className="absolute -left-10 top-0.5 w-8 h-8 rounded-lg bg-navy-800 border border-slate-700/80 dark:bg-navy-800 dark:border-slate-700 light:bg-slate-100 light:border-slate-300 flex items-center justify-center group-hover:border-scientific-teal transition-colors shadow-sm">
                  {getTimelineIcon(milestone.title)}
                </span>

                {/* Left side year indicator (large screens) */}
                <span className="hidden md:block absolute -left-32 top-1 w-20 text-right font-mono font-bold text-sm text-scientific-teal">
                  {milestone.year}
                </span>

                {/* Timeline Card */}
                <div className="glass p-5 rounded-xl border border-navy-800 dark:border-navy-800 light:border-slate-100 shadow-sm text-left hover:border-slate-700/50 light:hover:border-slate-300 transition-colors">
                  {/* Small screen year tag */}
                  <span className="inline-block md:hidden font-mono font-bold text-xs text-scientific-teal mb-1.5">
                    {milestone.year}
                  </span>
                  <h5 className="text-base font-bold text-white dark:text-white light:text-navy-950">
                    {milestone.title}
                  </h5>
                  <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs sm:text-sm mt-1 leading-relaxed font-light">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
