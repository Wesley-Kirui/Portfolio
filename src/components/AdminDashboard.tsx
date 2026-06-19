import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, LayoutDashboard, FolderKanban, BookOpenText, MessageSquare, 
  LogOut, Plus, Trash2, Edit, Check, Upload, Database
} from 'lucide-react';
import { VisitorAnalytics } from './VisitorAnalytics';
import { 
  dbGetProjects, dbAddProject, dbUpdateProject, dbDeleteProject,
  dbGetBlogPosts, dbAddBlogPost, dbUpdateBlogPost, dbDeleteBlogPost,
  dbGetPublications, dbAddPublication, dbUpdatePublication, dbDeletePublication,
  dbGetMessages, dbToggleMessageRead, dbDeleteMessage, dbUploadFile,
  isFirebaseConfigured
} from '../db/store';
import type { ProjectDetail, BlogPost, PublicationDetail, Message } from '../db/initialData';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'blog' | 'publications' | 'messages'>('analytics');

  // DB Data States
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [publications, setPublications] = useState<PublicationDetail[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Item Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form Fields
  const [projectForm, setProjectForm] = useState({
    title: '', category: 'Scientific' as 'Scientific' | 'Python' | 'Web Dev',
    description: '', objectives: '', results: '', technologies: '', githubUrl: '', liveUrl: '', image: ''
  });
  
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', category: 'General Science', readTime: '5 min read'
  });

  const [publicationForm, setPublicationForm] = useState({
    title: '', authors: 'Wisely Kirui Sichambo', journal: '', date: '', abstract: '', downloadUrl: '#'
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const isFirebase = isFirebaseConfigured();

  // Load Database Data
  const loadData = async () => {
    try {
      const p = await dbGetProjects();
      const b = await dbGetBlogPosts();
      const pub = await dbGetPublications();
      const m = await dbGetMessages();

      setProjects(p);
      setBlogs(b);
      setPublications(pub);
      setMessages(m);
    } catch (e) {
      console.error('Error loading admin dashboard datasets', e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (isFirebase) {
      try {
        const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        setIsAuthenticated(true);
      } catch (error: any) {
        setLoginError(error.message || 'Firebase Authentication Failed.');
      }
    } else {
      // Mock Auth Fallback
      if (email === 'admin@sichambo.org' && password === 'admin123') {
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid Administrator Credentials (Sandbox Mode). Use admin@sichambo.org / admin123');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Trigger custom event to notify home views to reload data
  const triggerDbUpdate = () => {
    window.dispatchEvent(new CustomEvent('portfolio-db-update'));
  };

  // Image Upload helper
  const handleImageUpload = async () => {
    if (!uploadFile) return '';
    setUploading(true);
    try {
      const url = await dbUploadFile(uploadFile);
      setUploadFile(null);
      return url;
    } catch (err) {
      console.error(err);
      alert('File upload failed.');
      return '';
    } finally {
      setUploading(false);
    }
  };

  // ----------------------------------------------------
  // Projects CRUD
  // ----------------------------------------------------
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = projectForm.image;
    
    if (uploadFile) {
      const uploaded = await handleImageUpload();
      if (uploaded) imageUrl = uploaded;
    }

    if (!imageUrl) {
      imageUrl = 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600'; // fallback
    }

    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      objectives: projectForm.objectives.split('\n').filter(Boolean),
      results: projectForm.results.split('\n').filter(Boolean),
      technologies: projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: projectForm.githubUrl,
      liveUrl: projectForm.liveUrl || undefined,
      image: imageUrl
    };

    if (editingId) {
      await dbUpdateProject(editingId, payload);
    } else {
      await dbAddProject(payload);
    }

    // Reset Form
    setEditingId(null);
    setProjectForm({ title: '', category: 'Scientific', description: '', objectives: '', results: '', technologies: '', githubUrl: '', liveUrl: '', image: '' });
    setShowForm(false);
    loadData();
    triggerDbUpdate();
  };

  const handleEditProject = (p: ProjectDetail) => {
    setEditingId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      description: p.description,
      objectives: p.objectives.join('\n'),
      results: p.results.join('\n'),
      technologies: p.technologies.join(', '),
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl || '',
      image: p.image
    });
    setShowForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      await dbDeleteProject(id);
      loadData();
      triggerDbUpdate();
    }
  };

  // ----------------------------------------------------
  // Blog CRUD
  // ----------------------------------------------------
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      category: blogForm.category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'Wisely Kirui Sichambo',
      readTime: blogForm.readTime
    };

    if (editingId) {
      await dbUpdateBlogPost(editingId, payload);
    } else {
      await dbAddBlogPost(payload);
    }

    setEditingId(null);
    setBlogForm({ title: '', excerpt: '', content: '', category: 'General Science', readTime: '5 min read' });
    setShowForm(false);
    loadData();
    triggerDbUpdate();
  };

  const handleEditBlog = (b: BlogPost) => {
    setEditingId(b.id);
    setBlogForm({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      readTime: b.readTime
    });
    setShowForm(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm('Delete this article?')) {
      await dbDeleteBlogPost(id);
      loadData();
      triggerDbUpdate();
    }
  };

  // ----------------------------------------------------
  // Publications CRUD
  // ----------------------------------------------------
  const handlePubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: publicationForm.title,
      authors: publicationForm.authors,
      journal: publicationForm.journal,
      date: publicationForm.date,
      abstract: publicationForm.abstract,
      downloadUrl: publicationForm.downloadUrl
    };

    if (editingId) {
      await dbUpdatePublication(editingId, payload);
    } else {
      await dbAddPublication(payload);
    }

    setEditingId(null);
    setPublicationForm({ title: '', authors: 'Wisely Kirui Sichambo', journal: '', date: '', abstract: '', downloadUrl: '#' });
    setShowForm(false);
    loadData();
    triggerDbUpdate();
  };

  const handleEditPub = (p: PublicationDetail) => {
    setEditingId(p.id);
    setPublicationForm({
      title: p.title,
      authors: p.authors,
      journal: p.journal,
      date: p.date,
      abstract: p.abstract,
      downloadUrl: p.downloadUrl
    });
    setShowForm(true);
  };

  const handleDeletePub = async (id: string) => {
    if (window.confirm('Delete this publication?')) {
      await dbDeletePublication(id);
      loadData();
      triggerDbUpdate();
    }
  };

  // ----------------------------------------------------
  // Messages Handlers
  // ----------------------------------------------------
  const handleToggleMessage = async (id: string) => {
    await dbToggleMessageRead(id);
    loadData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      await dbDeleteMessage(id);
      loadData();
    }
  };

  // ----------------------------------------------------
  // RENDER LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center py-20 text-left px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass w-full max-w-md p-6 sm:p-8 rounded-2xl border border-navy-800 shadow-glow-teal relative overflow-hidden"
        >
          {/* Database mode overlay */}
          <div className="absolute top-0 left-0 right-0 bg-navy-950 px-4 py-2 border-b border-navy-850 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Database size={11} className={isFirebase ? 'text-scientific-emerald' : 'text-amber-500'} />
              <span>MODE: {isFirebase ? 'GOOGLE_FIREBASE' : 'LOCAL_SANDBOX'}</span>
            </span>
            <span>SECURE CONSOLE</span>
          </div>

          <div className="text-center pt-6 mb-6">
            <div className="w-12 h-12 rounded-xl bg-scientific-teal/10 border border-scientific-teal/20 flex items-center justify-center text-scientific-teal mx-auto mb-4">
              <Lock size={22} className="animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white">Administrator Login</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {isFirebase ? 'Provide Firebase project credentials' : 'Use default sandbox credentials'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isFirebase ? 'admin@example.com' : 'admin@sichambo.org'}
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 font-light text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                SECURITY KEY
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isFirebase ? '••••••••' : 'admin123'}
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 font-light text-xs sm:text-sm"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-500 rounded-lg text-xs leading-normal font-mono">
                // ERROR: {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white font-bold transition-all text-xs tracking-widest uppercase font-mono shadow-glow-teal"
            >
              AUTHENTICATE CONSOLE
            </button>
          </form>

          {!isFirebase && (
            <div className="mt-6 p-3 rounded-lg bg-navy-950 border border-navy-850 text-[10px] font-mono text-slate-500 leading-normal">
              <span className="text-amber-500 font-bold block mb-1">🔑 SANDBOX CREDENTIALS:</span>
              <span>Email: admin@sichambo.org</span>
              <span className="block">Password: admin123</span>
            </div>
          )}
        </motion.div>
      </section>
    );
  }

  // ----------------------------------------------------
  // RENDER ADMIN DASHBOARD (ONCE AUTHENTICATED)
  // ----------------------------------------------------
  return (
    <section className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-850 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-navy-850">
          <div>
            <span className="text-[10px] font-mono text-scientific-teal uppercase tracking-widest leading-none mb-1 inline-block">
              // ADMIN CONTROL CENTER
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
              Lab Management System
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded bg-navy-900 border border-slate-750 text-slate-300 font-mono text-[10px] uppercase">
              {isFirebase ? 'Firebase Mode' : 'Sandbox Fallback'}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-650/10 border border-red-500/30 text-red-500 rounded hover:bg-red-500/20 text-xs font-bold font-mono transition-all"
            >
              <LogOut size={12} />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Dashboard Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sub Navigation Sidebar */}
          <div className="lg:col-span-3 flex flex-col space-y-1.5 bg-navy-900/40 p-3 rounded-2xl border border-navy-850">
            {/* Dashboard Analytics tab button */}
            <button
              onClick={() => { setActiveTab('analytics'); setShowForm(false); }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeTab === 'analytics'
                  ? 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal shadow-glow-teal'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Visitor Analytics</span>
            </button>

            {/* Projects tab button */}
            <button
              onClick={() => { setActiveTab('projects'); setShowForm(false); }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeTab === 'projects'
                  ? 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal shadow-glow-teal'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderKanban size={16} />
              <span>Projects Manager ({projects.length})</span>
            </button>

            {/* Blog posts tab button */}
            <button
              onClick={() => { setActiveTab('blog'); setShowForm(false); }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeTab === 'blog'
                  ? 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal shadow-glow-teal'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpenText size={16} />
              <span>Blog Editor ({blogs.length})</span>
            </button>

            {/* Publications tab button */}
            <button
              onClick={() => { setActiveTab('publications'); setShowForm(false); }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeTab === 'publications'
                  ? 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal shadow-glow-teal'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xs">🔬</span>
              <span>Research Publications ({publications.length})</span>
            </button>

            {/* Messages tab button */}
            <button
              onClick={() => { setActiveTab('messages'); setShowForm(false); }}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeTab === 'messages'
                  ? 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal shadow-glow-teal'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare size={16} />
              <span>Messages Port ({messages.length})</span>
            </button>
          </div>

          {/* Core Panel Window */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ANALYTICS PANEL */}
            {activeTab === 'analytics' && (
              <VisitorAnalytics />
            )}

            {/* PROJECTS MANAGER PANEL */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-navy-850">
                  <h4 className="text-base font-bold text-white">Projects Manager</h4>
                  {!showForm && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setProjectForm({ title: '', category: 'Scientific', description: '', objectives: '', results: '', technologies: '', githubUrl: '', liveUrl: '', image: '' });
                        setShowForm(true);
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-scientific-teal hover:bg-scientific-tealHover text-white rounded text-xs font-semibold"
                    >
                      <Plus size={14} />
                      <span>Add New Project</span>
                    </button>
                  )}
                </div>

                {/* Form to Create/Edit */}
                {showForm && (
                  <form onSubmit={handleProjectSubmit} className="glass p-5 rounded-2xl border border-navy-800 space-y-4">
                    <h5 className="text-sm font-bold text-white border-b border-navy-850 pb-2">
                      {editingId ? 'Edit Project Specifications' : 'New Project Specifications'}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">PROJECT TITLE</label>
                        <input
                          type="text" required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g., Phytochemical Screenings"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">CATEGORY</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value as any }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                        >
                          <option value="Scientific">Scientific Research</option>
                          <option value="Python">Python Development</option>
                          <option value="Web Dev">Web Systems Dev</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 block font-bold">DESCRIPTION SUMMARY</label>
                      <textarea
                        required rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                        placeholder="Provide a brief summary of what the project represents..."
                      />
                    </div>

                    {/* Objectives / Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">OBJECTIVES (ONE PER LINE)</label>
                        <textarea
                          rows={4}
                          value={projectForm.objectives}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, objectives: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="Objective 1&#10;Objective 2"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">RESULTS (ONE PER LINE)</label>
                        <textarea
                          rows={4}
                          value={projectForm.results}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, results: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="Result 1&#10;Result 2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Technologies */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">TECHNOLOGIES (COMMA SEPARATED)</label>
                        <input
                          type="text" required
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Chromatography, Titration, Python"
                        />
                      </div>

                      {/* Image / File Upload */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">PROJECT IMAGE</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={projectForm.image}
                            onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                            className="flex-grow px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                            placeholder="Image URL or upload a file"
                          />
                          <label className="px-3 py-2 bg-navy-900 border border-slate-700 hover:border-scientific-teal text-slate-300 rounded text-xs cursor-pointer flex items-center space-x-1.5">
                            <Upload size={12} />
                            <span>File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files?.[0]) setUploadFile(e.target.files[0]);
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {uploadFile && (
                          <div className="text-[10px] text-scientific-teal font-mono mt-1">
                            Pending Upload: {uploadFile.name} ({(uploadFile.size/1024).toFixed(1)} KB)
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* GitHub */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">GITHUB REPO URL</label>
                        <input
                          type="url" required
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="https://github.com/..."
                        />
                      </div>

                      {/* Live Link */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">LIVE DEMO URL (OPTIONAL)</label>
                        <input
                          type="url"
                          value={projectForm.liveUrl}
                          onChange={(e) => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-navy-850">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 rounded bg-navy-900 border border-slate-750 hover:bg-navy-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={uploading}
                        className="px-4 py-2 rounded bg-scientific-teal hover:bg-scientific-tealHover text-white text-xs font-semibold shadow-glow-teal"
                      >
                        {uploading ? 'Uploading assets...' : (editingId ? 'Save Edits' : 'Deploy Project')}
                      </button>
                    </div>
                  </form>
                )}

                {/* Projects List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {projects.map((proj) => (
                    <div key={proj.id} className="glass p-4 rounded-xl border border-navy-800 flex justify-between items-start">
                      <div className="space-y-1.5 max-w-[75%]">
                        <span className="inline-block px-1.5 py-0.2 rounded bg-scientific-teal/10 text-scientific-teal border border-scientific-teal/20 text-[9px] font-mono">
                          {proj.category.toUpperCase()}
                        </span>
                        <h5 className="text-sm font-bold text-white truncate">{proj.title}</h5>
                        <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="p-1.5 rounded bg-navy-900 border border-slate-750 hover:border-scientific-teal text-slate-300 hover:text-white transition-colors"
                          aria-label="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded bg-red-650/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOG EDITOR PANEL */}
            {activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-navy-850">
                  <h4 className="text-base font-bold text-white">Scientific Blog Editor</h4>
                  {!showForm && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setBlogForm({ title: '', excerpt: '', content: '', category: 'Chemistry', readTime: '5 min read' });
                        setShowForm(true);
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-scientific-teal hover:bg-scientific-tealHover text-white rounded text-xs font-semibold"
                    >
                      <Plus size={14} />
                      <span>Write Article</span>
                    </button>
                  )}
                </div>

                {/* Form to Create/Edit */}
                {showForm && (
                  <form onSubmit={handleBlogSubmit} className="glass p-5 rounded-2xl border border-navy-800 space-y-4">
                    <h5 className="text-sm font-bold text-white border-b border-navy-850 pb-2">
                      {editingId ? 'Edit Article specifications' : 'New Article specifications'}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Title */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">ARTICLE TITLE</label>
                        <input
                          type="text" required
                          value={blogForm.title}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Advanced Chromatography column configs"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">TOPIC CATEGORY</label>
                        <input
                          type="text" required
                          value={blogForm.category}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Phytochemistry"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Excerpt */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">EXCERPT (SHORT INTRO)</label>
                        <input
                          type="text" required
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="Provide a 1-sentence hook preview..."
                        />
                      </div>

                      {/* Read time */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">READ TIME</label>
                        <input
                          type="text" required
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, readTime: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. 5 min read"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 block font-bold">CONTENT BODY</label>
                      <textarea
                        required rows={8}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                        placeholder="Write the full scientific content here..."
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-navy-850">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 rounded bg-navy-900 border border-slate-750 hover:bg-navy-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 rounded bg-scientific-teal hover:bg-scientific-tealHover text-white text-xs font-semibold shadow-glow-teal"
                      >
                        {editingId ? 'Save Edits' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Articles list */}
                <div className="space-y-3">
                  {blogs.map((post) => (
                    <div key={post.id} className="glass p-4 rounded-xl border border-navy-800 flex justify-between items-center">
                      <div className="space-y-1 text-left max-w-[80%]">
                        <span className="text-[9px] text-scientific-teal font-mono bg-scientific-teal/10 border border-scientific-teal/20 px-1.5 py-0.2 rounded font-bold">
                          {post.category.toUpperCase()}
                        </span>
                        <h5 className="text-sm font-bold text-white truncate mt-1">{post.title}</h5>
                        <p className="text-xs text-slate-500 font-mono">Date: {post.date} | {post.readTime}</p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBlog(post)}
                          className="p-1.5 rounded bg-navy-900 border border-slate-750 hover:border-scientific-teal text-slate-300 hover:text-white transition-colors"
                          aria-label="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-1.5 rounded bg-red-650/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PUBLICATIONS MANAGER PANEL */}
            {activeTab === 'publications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-navy-850">
                  <h4 className="text-base font-bold text-white">Publications Manager</h4>
                  {!showForm && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setPublicationForm({ title: '', authors: 'Wisely Kirui Sichambo', journal: '', date: '', abstract: '', downloadUrl: '#' });
                        setShowForm(true);
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 bg-scientific-teal hover:bg-scientific-tealHover text-white rounded text-xs font-semibold"
                    >
                      <Plus size={14} />
                      <span>Add Publication</span>
                    </button>
                  )}
                </div>

                {/* Form to Create/Edit */}
                {showForm && (
                  <form onSubmit={handlePubSubmit} className="glass p-5 rounded-2xl border border-navy-800 space-y-4">
                    <h5 className="text-sm font-bold text-white border-b border-navy-850 pb-2">
                      {editingId ? 'Edit Publication specifications' : 'New Publication specifications'}
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">PAPER TITLE</label>
                        <input
                          type="text" required
                          value={publicationForm.title}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Nutrient Composition studies"
                        />
                      </div>

                      {/* Authors */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">AUTHORS</label>
                        <input
                          type="text" required
                          value={publicationForm.authors}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, authors: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Wisely Kirui Sichambo"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Journal */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">JOURNAL / VENUE</label>
                        <input
                          type="text" required
                          value={publicationForm.journal}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, journal: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. JKUAT Scientific Conference"
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-400 block font-bold">PUBLICATION DATE</label>
                        <input
                          type="text" required
                          value={publicationForm.date}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. August 2025"
                        />
                      </div>
                    </div>

                    {/* Abstract */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 block font-bold">ABSTRACT / DESCRIPTION</label>
                      <textarea
                        required rows={4}
                        value={publicationForm.abstract}
                        onChange={(e) => setPublicationForm(prev => ({ ...prev, abstract: e.target.value }))}
                        className="w-full px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                        placeholder="Abstract of the paper..."
                      />
                    </div>

                    {/* Document URL */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 block font-bold">ATTACHMENT RESOURCE URL</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={publicationForm.downloadUrl}
                          onChange={(e) => setPublicationForm(prev => ({ ...prev, downloadUrl: e.target.value }))}
                          className="flex-grow px-3 py-2 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                          placeholder="e.g. Link to PDF, or leave as #"
                        />
                        <label className="px-3 py-2 bg-navy-900 border border-slate-700 hover:border-scientific-teal text-slate-300 rounded text-xs cursor-pointer flex items-center space-x-1.5">
                          <Upload size={12} />
                          <span>PDF File</span>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              if (e.target.files?.[0]) setUploadFile(e.target.files[0]);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {uploadFile && (
                        <div className="text-[10px] text-scientific-teal font-mono mt-1">
                          Pending PDF Upload: {uploadFile.name} ({(uploadFile.size/1024).toFixed(1)} KB)
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-navy-850">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 rounded bg-navy-900 border border-slate-750 hover:bg-navy-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={uploading}
                        className="px-4 py-2 rounded bg-scientific-teal hover:bg-scientific-tealHover text-white text-xs font-semibold shadow-glow-teal"
                      >
                        {uploading ? 'Uploading PDF...' : (editingId ? 'Save Edits' : 'Publish Paper')}
                      </button>
                    </div>
                  </form>
                )}

                {/* Publications List */}
                <div className="space-y-3">
                  {publications.map((pub) => (
                    <div key={pub.id} className="glass p-4 rounded-xl border border-navy-800 flex justify-between items-center">
                      <div className="space-y-1 text-left max-w-[80%]">
                        <h5 className="text-sm font-bold text-white truncate">{pub.title}</h5>
                        <p className="text-xs text-slate-500 font-mono">
                          {pub.authors} | {pub.journal} ({pub.date})
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPub(pub)}
                          className="p-1.5 rounded bg-navy-900 border border-slate-750 hover:border-scientific-teal text-slate-300 hover:text-white transition-colors"
                          aria-label="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeletePub(pub.id)}
                          className="p-1.5 rounded bg-red-650/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES PORT PANEL */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-navy-850">
                  <h4 className="text-base font-bold text-white">Inquiries Inbox ({messages.length})</h4>
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`glass p-5 rounded-2xl border transition-all ${
                        msg.read ? 'border-navy-800 opacity-75' : 'border-scientific-teal/30 shadow-glow-teal'
                      }`}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2 pb-2 border-b border-navy-850 mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="font-bold text-white text-sm">{msg.name}</h5>
                            <span className="text-[10px] text-slate-400 font-mono">&lt;{msg.email}&gt;</span>
                          </div>
                          <p className="text-xs text-scientific-teal font-mono mt-0.5">SUBJECT: {msg.subject || 'No Subject'}</p>
                        </div>

                        <div className="flex items-center space-x-3 text-xs">
                          <span className="text-slate-500 font-mono text-[10px]">{msg.date}</span>
                          <button
                            onClick={() => handleToggleMessage(msg.id)}
                            className={`p-1.5 rounded font-mono text-[9px] font-bold border transition-colors flex items-center space-x-1 ${
                              msg.read 
                                ? 'bg-navy-900 border-slate-750 text-slate-400 hover:text-white' 
                                : 'bg-scientific-teal/15 border-scientific-teal/30 text-scientific-teal hover:bg-scientific-teal/20'
                            }`}
                          >
                            <Check size={10} />
                            <span>{msg.read ? 'READ' : 'UNREAD'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded bg-red-650/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                            aria-label="Delete message"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-300 dark:text-slate-200 light:text-navy-900 text-xs sm:text-sm font-light leading-relaxed whitespace-pre-line text-left">
                        {msg.message}
                      </p>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs">
                      INBOX COMPLETELY EMPTY // NO INQUIRIES REGISTERED
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
