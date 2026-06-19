import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Upload, ClipboardCheck, ShieldCheck, FileText } from 'lucide-react';
import { dbUploadFile, dbGetAssetsConfig, dbUpdateAssetsConfig } from '../db/store';
import type { AssetsConfig } from '../db/store';

interface UpdatePortalProps {
  onAssetsUpdate: () => void;
}

export const UpdatePortal: React.FC<UpdatePortalProps> = ({ onAssetsUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Asset configurations
  const [assets, setAssets] = useState<AssetsConfig | null>(null);
  
  // File Upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'resume' | 'profile1' | 'profile2' | 'other'>('resume');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [copyUrl, setCopyUrl] = useState('');

  const loadAssets = async () => {
    const config = await dbGetAssetsConfig();
    setAssets(config);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAssets();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password === 'Weslykirui4627') {
      setIsAuthenticated(true);
    } else {
      setErrorMsg('Incorrect Security Password.');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload first.');
      return;
    }

    setUploading(true);
    setSuccessMsg('');
    setCopyUrl('');

    try {
      // 1. Upload to Firebase Storage
      const uploadedUrl = await dbUploadFile(selectedFile);
      
      if (!uploadedUrl) {
        throw new Error('Upload failed to return a valid URL.');
      }

      // 2. Map file type and update database configuration
      if (uploadType === 'resume') {
        await dbUpdateAssetsConfig({ resumeUrl: uploadedUrl });
        setSuccessMsg('Resume PDF uploaded and connected successfully!');
      } else if (uploadType === 'profile1') {
        await dbUpdateAssetsConfig({ profile1Url: uploadedUrl });
        setSuccessMsg('Blue Suit Profile Photo updated successfully!');
      } else if (uploadType === 'profile2') {
        await dbUpdateAssetsConfig({ profile2Url: uploadedUrl });
        setSuccessMsg('Grey Suit Profile Photo updated successfully!');
      } else {
        setCopyUrl(uploadedUrl);
        setSuccessMsg('File uploaded successfully! Copy the URL below:');
      }

      // Reload config states and call app parent triggers
      await loadAssets();
      setSelectedFile(null);
      onAssetsUpdate();
    } catch (err) {
      console.error(err);
      alert('Upload transaction failed. Check Firebase console configurations.');
    } finally {
      setUploading(false);
    }
  };

  // ----------------------------------------------------
  // LOGIN PROMPT SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <section className="min-h-[85vh] flex items-center justify-center py-20 text-left px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass w-full max-w-md p-6 sm:p-8 rounded-2xl border border-navy-800 shadow-glow-teal relative"
        >
          <div className="absolute top-0 left-0 right-0 bg-navy-950 px-4 py-2 border-b border-navy-850 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>PORTAL SECURITY ACCESS</span>
            <span> Weslykirui4627</span>
          </div>

          <div className="text-center pt-6 mb-6">
            <div className="w-12 h-12 rounded-xl bg-scientific-teal/10 border border-scientific-teal/20 flex items-center justify-center text-scientific-teal mx-auto mb-4">
              <Lock size={22} className="animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white">System Update Portal</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Protected administration login for uploading assets
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                ADMIN PASSWORD KEY
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 rounded-lg bg-navy-950 border border-slate-750 focus:border-scientific-teal focus:outline-none text-slate-100 font-light text-xs sm:text-sm"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-500 rounded-lg text-xs font-mono">
                // ACCESS_DENIED: {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white font-bold transition-all text-xs tracking-widest uppercase font-mono shadow-glow-teal"
            >
              UNLOCK PORTAL
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  // ----------------------------------------------------
  // FILE UPLOAD CONTROLS SCREEN
  // ----------------------------------------------------
  return (
    <section className="min-h-[85vh] py-24 bg-navy-950 text-left relative flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Block */}
        <div className="flex justify-between items-center pb-6 border-b border-navy-850 mb-8">
          <div>
            <span className="text-[10px] font-mono text-scientific-teal uppercase tracking-widest leading-none mb-1 inline-block">
              // ASSETS CONSOLE
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-white dark:text-white light:text-navy-950">
              Update Portal
            </h3>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 border border-slate-750 text-slate-400 hover:text-white rounded text-xs font-mono transition-colors"
          >
            LOCK CONSOLE //
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Uploader Column */}
          <div className="md:col-span-7 space-y-6">
            <form onSubmit={handleUploadSubmit} className="glass p-6 sm:p-8 rounded-2xl border border-navy-800 space-y-5">
              <h4 className="text-sm font-bold text-white border-b border-navy-850 pb-2.5 font-mono uppercase tracking-wider flex items-center space-x-2">
                <Upload size={16} className="text-scientific-teal" />
                <span>Upload New Asset</span>
              </h4>

              {/* Upload Asset Type Selection */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 block font-bold uppercase tracking-wider">
                  Select Asset Slot
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded bg-navy-950 border border-slate-750 text-xs text-slate-100 focus:outline-none"
                >
                  <option value="resume">Resume PDF (Curriculum Vitae Download)</option>
                  <option value="profile1">Profile Photo 1 (Main Blue Suit Frame)</option>
                  <option value="profile2">Profile Photo 2 (Alternative Grey Suit Frame)</option>
                  <option value="other">Other / Copyable Asset Image</option>
                </select>
              </div>

              {/* File selection box */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-slate-400 block font-bold uppercase tracking-wider">
                  Target File Attachment
                </label>
                <div className="border border-dashed border-slate-700/60 bg-navy-950 p-6 rounded-lg text-center cursor-pointer hover:border-scientific-teal transition-colors relative">
                  <input
                    type="file"
                    required
                    accept={uploadType === 'resume' ? 'application/pdf' : 'image/*'}
                    onChange={(e) => {
                      if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FileText className="mx-auto text-slate-500 mb-2" size={28} />
                  <span className="text-xs text-slate-300 block font-light">
                    {selectedFile ? selectedFile.name : 'Select file or drag it here'}
                  </span>
                  {selectedFile && (
                    <span className="text-[10px] text-scientific-teal font-mono mt-1 block">
                      READY: {(selectedFile.size/1024).toFixed(1)} KB
                    </span>
                  )}
                </div>
              </div>

              {/* Status and Action feedback messages */}
              {successMsg && (
                <div className="p-3 bg-scientific-emerald/10 border border-scientific-emerald/30 text-scientific-emerald rounded-lg flex items-center space-x-2 text-xs font-light">
                  <ClipboardCheck size={16} className="flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {copyUrl && (
                <div className="p-2.5 bg-navy-950 border border-slate-800 rounded text-[10px] font-mono text-slate-200 select-all break-all leading-normal">
                  {copyUrl}
                </div>
              )}

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-scientific-teal to-scientific-cyan hover:from-scientific-tealHover text-white font-bold transition-all text-xs tracking-widest uppercase font-mono shadow-glow-teal disabled:opacity-40"
              >
                {uploading ? 'UPLOADING TO STORAGE...' : 'START UPLOAD TRANSACTION'}
              </button>
            </form>
          </div>

          {/* Configuration Summary Column */}
          <div className="md:col-span-5 space-y-6 text-xs">
            <div className="glass p-5 rounded-2xl border border-navy-800 space-y-4">
              <h4 className="text-sm font-bold text-white border-b border-navy-850 pb-2.5 font-mono uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck size={16} className="text-scientific-cyan" />
                <span>Active Assets Map</span>
              </h4>

              {assets ? (
                <div className="space-y-3 font-mono">
                  <div className="p-2.5 rounded bg-navy-950 border border-navy-850">
                    <span className="text-[9px] text-slate-500 block">RESUME LINK</span>
                    <a
                      href={assets.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scientific-teal truncate block hover:underline text-[10px]"
                    >
                      {assets.resumeUrl}
                    </a>
                  </div>

                  <div className="p-2.5 rounded bg-navy-950 border border-navy-850">
                    <span className="text-[9px] text-slate-500 block">PROFILE PHOTO 1</span>
                    <a
                      href={assets.profile1Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scientific-cyan truncate block hover:underline text-[10px]"
                    >
                      {assets.profile1Url}
                    </a>
                  </div>

                  <div className="p-2.5 rounded bg-navy-950 border border-navy-850">
                    <span className="text-[9px] text-slate-500 block">PROFILE PHOTO 2</span>
                    <a
                      href={assets.profile2Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-scientific-cyan truncate block hover:underline text-[10px]"
                    >
                      {assets.profile2Url}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 font-mono">LOADING ASSETS CONFIG...</div>
              )}
            </div>
            
            <div className="p-4 rounded-xl bg-scientific-teal/5 border border-scientific-teal/20 text-slate-400 leading-normal font-light">
              <span className="text-scientific-teal font-bold block mb-1">⚡ Dynamic Synchronizer:</span>
              Once files are uploaded, their references update immediately in your Firestore collection. Any visitor loading the page will download the newly uploaded assets automatically.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
