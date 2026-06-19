import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, BookOpen, Code } from 'lucide-react';
import { SKILLS } from '../db/initialData';

export const Skills: React.FC = () => {
  const categories = [
    {
      title: 'Laboratory Skills',
      icon: <FlaskConical className="text-scientific-teal" size={20} />,
      list: SKILLS.laboratory,
      description: 'Hands-on pharmaceutical compounding, in-process manufacturing audits, and chemical analytical protocols.'
    },
    {
      title: 'Research Skills',
      icon: <BookOpen className="text-scientific-cyan" size={20} />,
      list: SKILLS.research,
      description: 'Literature synthesis, experimental framework planning, statistical modeling, and scientific documentation.'
    },
    {
      title: 'Technical & Data Skills',
      icon: <Code className="text-scientific-mint" size={20} />,
      list: SKILLS.technical,
      description: 'Programmatic sequence translation, data visualization charts, and ledger parser scripting.'
    }
  ];

  return (
    <section id="skills" className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // SPECIALIZED SKILLS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Skills Inventory
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
          {categories.map((cat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={idx}
              className="glass p-6 sm:p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-navy-800 dark:border-navy-800 light:border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 dark:bg-navy-900 light:bg-slate-100 flex items-center justify-center border border-slate-700/20 shadow-inner">
                    {cat.icon}
                  </div>
                  <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950">
                    {cat.title}
                  </h4>
                </div>

                <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs sm:text-sm mb-6 leading-relaxed font-light">
                  {cat.description}
                </p>

                {/* Progress bars */}
                <div className="space-y-4">
                  {cat.list.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-200 dark:text-slate-200 light:text-navy-900">
                          {skill.name}
                        </span>
                        <span className="text-scientific-teal font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill Bar track */}
                      <div className="h-2 w-full bg-navy-950 dark:bg-navy-950 light:bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: sIdx * 0.05 + 0.2, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-scientific-teal to-scientific-cyan rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
