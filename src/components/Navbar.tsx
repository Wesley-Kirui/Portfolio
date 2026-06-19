import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  setIsDarkMode,
  activeSection,
  setActiveSection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll spy logic
      if (activeSection === 'update') return; // Don't spy when in update view

      const sections = navLinks.map(l => l.id);
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);

    if (id === 'update') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 no-print ${
      scrolled 
        ? 'glass py-3 shadow-md shadow-navy-950/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Branding */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-scientific-teal to-scientific-cyan flex items-center justify-center text-white font-bold text-lg shadow-glow-teal animate-pulse">
              W
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-wider text-slate-100 dark:text-slate-100 light:text-navy-950 transition-colors duration-300">
                WISELY KIRUI
              </span>
              <div className="text-[10px] font-mono text-scientific-teal tracking-widest leading-none">
                BIOCHEM.LAB
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-scientific-teal bg-navy-800/60 dark:bg-navy-800/60 light:bg-slate-200/80 border-b-2 border-scientific-teal'
                    : 'text-slate-300 hover:text-scientific-teal dark:text-slate-300 light:text-navy-700 light:hover:text-scientific-teal'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side Options (Theme Toggle) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 light:bg-slate-100 light:hover:bg-slate-200 light:text-navy-950 transition-all duration-300 border border-slate-700/30 light:border-slate-300"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-900" />}
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="xl:hidden flex items-center space-x-3">
            {/* Theme Toggle for mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-navy-800 text-slate-300 light:bg-slate-100 light:text-navy-950 transition-colors"
            >
              {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-900" />}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white bg-navy-800 light:bg-slate-100 light:text-navy-950 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="xl:hidden glass border-b border-navy-800/80 light:border-slate-200 transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'text-scientific-teal bg-navy-800 light:bg-slate-200 border-l-4 border-scientific-teal'
                    : 'text-slate-300 light:text-navy-800 hover:text-scientific-teal'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
