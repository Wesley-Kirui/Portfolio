import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Calendar, User, X } from 'lucide-react';
import type { BlogPost } from '../db/initialData';
import { dbGetBlogPosts } from '../db/store';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await dbGetBlogPosts();
      setPosts(data);
    };
    fetchPosts();

    const handleUpdate = () => {
      fetchPosts();
    };
    window.addEventListener('portfolio-db-update', handleUpdate);
    return () => window.removeEventListener('portfolio-db-update', handleUpdate);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="blog" className="py-24 bg-navy-900 dark:bg-navy-900 light:bg-white grid-lines border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // SCIENCE ARTICLES
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Scientific Blog
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter / Search Bar */}
        <div className="max-w-xl mx-auto mb-12 blog-search">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-navy-950 border border-slate-800 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-355 light:text-navy-950 text-sm font-light shadow-inner"
            />
          </div>
        </div>

        {/* Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredPosts.map((post, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="glass p-6 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 hover:border-scientific-teal/30 hover:shadow-glow-teal transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-scientific-teal/15 text-scientific-teal border border-scientific-teal/25 font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock size={10} />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white dark:text-white light:text-navy-950 group-hover:text-scientific-teal transition-colors duration-200">
                    {post.title}
                  </h4>
                  <p className="text-slate-400 dark:text-slate-400 light:text-navy-700 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-6 pt-4 border-t border-navy-800/80 dark:border-navy-800/80 light:border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span className="flex items-center space-x-1">
                  <Calendar size={10} />
                  <span>{post.date.toUpperCase()}</span>
                </span>
                <span className="text-scientific-teal group-hover:underline font-bold">
                  READ ARTICLE //
                </span>
              </div>
            </motion.div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-500 font-mono text-xs">
              NO POSTS MATCHING SEARCH QUERY //
            </div>
          )}
        </div>

        {/* Blog Reading Modal */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass w-full max-w-2xl rounded-2xl border border-navy-800 shadow-glow-teal max-h-[85vh] flex flex-col justify-between text-left"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-navy-800 dark:border-navy-800 light:border-slate-200 flex justify-between items-center bg-navy-950 dark:bg-navy-950 light:bg-slate-50">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-scientific-teal/15 text-scientific-teal border border-scientific-teal/25">
                    {selectedPost.category}
                  </span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white light:bg-slate-200 light:hover:bg-slate-300 light:text-navy-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                  {/* Article Title & Meta */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-navy-950 leading-tight">
                      {selectedPost.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-b border-navy-850 dark:border-navy-800 light:border-slate-100 pb-3">
                      <span className="flex items-center space-x-1">
                        <User size={12} className="text-scientific-teal" />
                        <span>{selectedPost.author}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} className="text-scientific-teal" />
                        <span>{selectedPost.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock size={12} className="text-scientific-teal" />
                        <span>{selectedPost.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="text-slate-300 dark:text-slate-200 light:text-navy-900 text-sm leading-relaxed space-y-4 font-light whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-navy-800 dark:border-navy-800 light:border-slate-200 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>SICHAMBO_PUBLIC_LOGS //</span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-scientific-teal hover:underline font-bold"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
