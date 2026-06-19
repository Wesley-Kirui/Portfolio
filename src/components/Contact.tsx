import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../db/initialData';
import { dbAddMessage, dbTrackEvent } from '../db/store';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Add message to DB store
      await dbAddMessage(formData);
      // Track submission event in analytics
      await dbTrackEvent('submissions');
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-navy-950 dark:bg-navy-950 light:bg-slate-50 border-t border-navy-800/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-scientific-teal font-mono font-bold mb-2">
            // COMMUNICATIONS PORT
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
            Contact Me
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-scientific-teal to-scientific-cyan mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch text-left">
          
          {/* Contact Information Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white dark:text-white light:text-navy-950">
                Let's Connect
              </h4>
              <p className="text-slate-350 dark:text-slate-350 light:text-navy-850 text-xs sm:text-sm font-light leading-relaxed">
                Whether you want to discuss research initiatives, inquire about quality control testing projects, explore pharmaceutical collaborations, or connect scientifically, feel free to drop a message or reach out on social platforms.
              </p>

              {/* Info Items */}
              <div className="space-y-4 pt-4">
                {/* Email */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 dark:bg-navy-900 light:bg-slate-200/80 flex items-center justify-center border border-slate-700/20 text-scientific-teal">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">EMAIL ADDRESS</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-200 dark:text-slate-200 light:text-navy-950 hover:text-scientific-teal text-sm font-medium transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 dark:bg-navy-900 light:bg-slate-200/80 flex items-center justify-center border border-slate-700/20 text-scientific-teal">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">PHONE NUMBER</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-slate-200 dark:text-slate-200 light:text-navy-950 hover:text-scientific-teal text-sm font-medium transition-colors">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 dark:bg-navy-900 light:bg-slate-200/80 flex items-center justify-center border border-slate-700/20 text-scientific-teal">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">CURRENT LOCATION</span>
                    <span className="text-slate-200 dark:text-slate-200 light:text-navy-950 text-sm font-medium">
                      JKUAT, Kiambu, Kenya
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="pt-6 border-t border-navy-800 dark:border-navy-800 light:border-slate-200 flex space-x-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-900 hover:bg-scientific-teal hover:text-white dark:bg-navy-900 light:bg-slate-100 light:text-navy-950 light:hover:bg-scientific-teal light:hover:text-white text-slate-300 border border-slate-750 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-900 hover:bg-scientific-teal hover:text-white dark:bg-navy-900 light:bg-slate-100 light:text-navy-950 light:hover:bg-scientific-teal light:hover:text-white text-slate-300 border border-slate-750 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-2xl border border-navy-800 dark:border-navy-800 light:border-slate-200 shadow-glow-teal contact-form">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-300 light:text-navy-950 text-xs sm:text-sm font-light"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-300 light:text-navy-950 text-xs sm:text-sm font-light"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label htmlFor="subject" className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-300 light:text-navy-950 text-xs sm:text-sm font-light"
                  placeholder="Inquiry subject"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 dark:text-slate-100 light:bg-slate-50 light:border-slate-300 light:text-navy-950 text-xs sm:text-sm font-light"
                  placeholder="Write your message here..."
                />
              </div>

              {/* Status Banner */}
              {status === 'success' && (
                <div className="p-3 bg-scientific-emerald/10 border border-scientific-emerald/30 text-scientific-emerald rounded-lg flex items-center space-x-2 text-xs">
                  <CheckCircle2 size={16} />
                  <span>Your message was sent successfully. Thank you for connecting!</span>
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg flex items-center space-x-2 text-xs">
                  <AlertCircle size={16} />
                  <span>An error occurred while sending your message. Please try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white font-bold rounded-lg shadow-glow-teal hover:shadow-glow-teal-strong disabled:opacity-50 transition-all font-mono text-sm uppercase tracking-wider"
              >
                {loading ? (
                  <span>SENDING PORT DATA...</span>
                ) : (
                  <>
                    <span>SUBMIT PACKET</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
