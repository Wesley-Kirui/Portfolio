import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ExternalLink, X, Compass, CheckCircle } from 'lucide-react';
import type { ProjectDetail } from '../db/initialData';
import { dbGetProjects } from '../db/store';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [filter, setFilter] = useState<'All' | 'Scientific' | 'Python' | 'Web Dev'>('All');
  const [selectedProj, setSelectedProj] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    const fetchProj = async () => {
      const data = await dbGetProjects();
      setProjects(data);
    };
    fetchProj();
    
    // Register custom window event to refresh projects list (from admin panel updates)
    const handleUpdate = () => {
      fetchProj();
    };
    window.addEventListener('portfolio-db-update', handleUpdate);
    return () => window.removeEventListener('portfolio-db-update', handleUpdate);
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-navy-900 dark:bg-navy-900 light:bg-white grid-lines border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // PORTFOLIO PROJECTS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Featured Projects
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center space-x-2 mb-12 project-filters">
          {(['All', 'Scientific', 'Python', 'Web Dev'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 border ${
                filter === cat
                  ? 'bg-scientific-teal border-scientific-teal text-white shadow-glow-teal'
                  : 'bg-navy-950/60 dark:bg-navy-950/60 light:bg-slate-100 border-navy-800 dark:border-navy-800 light:border-slate-200 text-slate-400 dark:text-slate-400 light:text-navy-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={proj.id}
                className="glass rounded-2xl overflow-hidden border border-navy-800 hover:border-scientific-teal/30 hover:shadow-glow-teal group flex flex-col justify-between"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 overflow-hidden bg-navy-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-navy-950/80 text-scientific-teal border border-scientific-teal/30 backdrop-blur-sm">
                    {proj.category}
                  </span>

                  {/* Eye details button overlay */}
                  <div 
                    onClick={() => setSelectedProj(proj)}
                    className="absolute inset-0 bg-navy-950/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-scientific-teal/20 border border-scientific-teal/40 flex items-center justify-center text-scientific-teal shadow-glow-teal transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <Eye size={20} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 
                      onClick={() => setSelectedProj(proj)}
                      className="text-base font-bold text-white dark:text-white light:text-navy-950 group-hover:text-scientific-teal transition-colors duration-200 cursor-pointer"
                    >
                      {proj.title}
                    </h4>
                    <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Technology badges */}
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-navy-850 dark:bg-navy-800 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-navy-800 border border-slate-700/20 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-500 light:text-navy-500 font-mono pl-1 pt-0.5">
                        +{proj.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Links Footer */}
                <div className="px-6 py-4 border-t border-navy-800 dark:border-navy-800 light:border-slate-200 flex justify-between items-center bg-navy-950/30 dark:bg-navy-950/30 light:bg-slate-50">
                  <button 
                    onClick={() => setSelectedProj(proj)}
                    className="text-xs text-scientific-teal hover:underline font-mono font-bold"
                  >
                    READ ANALYSIS //
                  </button>

                  <div className="flex space-x-3">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white light:text-navy-700 light:hover:text-scientific-teal transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    </a>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white light:text-navy-700 light:hover:text-scientific-teal transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal (Lightbox) */}
        <AnimatePresence>
          {selectedProj && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass w-full max-w-3xl rounded-2xl overflow-hidden border border-navy-800 shadow-glow-teal max-h-[90vh] flex flex-col justify-between text-left"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-navy-800 dark:border-navy-800 light:border-slate-200 flex justify-between items-center bg-navy-950 dark:bg-navy-950 light:bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-scientific-teal/15 text-scientific-teal border border-scientific-teal/25">
                      {selectedProj.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      ID: {selectedProj.id}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProj(null)}
                    className="p-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white light:bg-slate-200 light:hover:bg-slate-300 light:text-navy-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-navy-950">
                      {selectedProj.title}
                    </h3>
                    <p className="text-slate-300 dark:text-slate-300 light:text-navy-850 text-sm mt-3 leading-relaxed font-light">
                      {selectedProj.description}
                    </p>
                  </div>

                  {/* Objectives & Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-navy-800/80 dark:border-navy-800/80 light:border-slate-200">
                    {/* Objectives */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-scientific-teal uppercase tracking-wider flex items-center space-x-1.5">
                        <Compass size={14} />
                        <span>Research Objectives</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedProj.objectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-navy-800 leading-normal font-light">
                            <span className="text-scientific-teal mt-0.5">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Results */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold text-scientific-cyan uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle size={14} />
                        <span>Experimental Results</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedProj.results.map((res, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 dark:text-slate-300 light:text-navy-800 leading-normal font-light">
                            <span className="text-scientific-cyan mt-0.5">•</span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-4 border-t border-navy-800/85 dark:border-navy-800/80 light:border-slate-200 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Methodologies & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-navy-850 dark:bg-navy-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-navy-900 border border-slate-700/20 text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-navy-800 dark:border-navy-800 light:border-slate-200 flex justify-between bg-navy-950 dark:bg-navy-950 light:bg-slate-50">
                  <span className="text-xs text-slate-500 font-mono pt-2">
                    // CONFIDENTIAL REVIEW
                  </span>

                  <div className="flex space-x-3">
                    <a
                      href={selectedProj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-4 py-2 rounded bg-navy-800 dark:bg-navy-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-navy-900 border border-slate-750 light:border-slate-355 hover:bg-navy-750 light:hover:bg-slate-300 transition-colors text-xs font-semibold"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      <span>Repository</span>
                    </a>
                    {selectedProj.liveUrl && (
                      <a
                        href={selectedProj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-4 py-2 rounded bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white transition-colors text-xs font-semibold"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
