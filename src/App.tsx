import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Research } from './components/Research';
import { Certifications } from './components/Certifications';
import { ResumeView } from './components/ResumeView';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { dbTrackEvent, isFirebaseConfigured } from './db/store';

function App() {
  // Theme state (Dark Mode by default)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    return saved ? saved === 'dark' : true;
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const isFirebase = isFirebaseConfigured();

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDarkMode]);

  // Track initial page view view
  useEffect(() => {
    const recordPageView = async () => {
      try {
        await dbTrackEvent('views');
      } catch (err) {
        console.error('Failed to log page view analytics', err);
      }
    };
    recordPageView();
  }, []);

  return (
    <div className={`min-h-screen text-slate-100 font-sans transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-navy-950 text-slate-100' 
        : 'bg-slate-50 text-navy-950 light'
    }`}>
      {/* Navigation bar */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isFirebaseMode={isFirebase}
      />

      {/* Main Viewport Content */}
      <main className="relative z-10">
        {activeSection === 'admin' ? (
          // Protected Admin dashboard portal
          <AdminDashboard />
        ) : (
          // Main portfolio section stack
          <>
            <Hero isDarkMode={isDarkMode} setActiveSection={setActiveSection} />
            <About />
            <Education />
            <Experience />
            <Skills />
            <Projects />
            <Research />
            <Certifications />
            <ResumeView />
            <Blog />
            <Contact />
          </>
        )}
      </main>

      {/* Footer bar */}
      <Footer />
    </div>
  );
}

export default App;
