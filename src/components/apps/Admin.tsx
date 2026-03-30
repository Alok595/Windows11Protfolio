import React, { useState, useRef } from 'react';
import { PortfolioData } from '../../types';
import { Lock, Save, Plus, Trash2, ChevronRight, ChevronDown, FileText, Upload, Award } from 'lucide-react';

interface AdminProps {
  data: PortfolioData | null;
  onUpdate: (newData: PortfolioData, password: string) => Promise<boolean>;
}

export const Admin: React.FC<AdminProps> = ({ data, onUpdate }) => {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editData, setEditData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsLoggedIn(true);
      const initialData = JSON.parse(JSON.stringify(data || {}));
      // Ensure all arrays exist to prevent .map errors
      setEditData({
        about: initialData.about || { text: '' },
        projects: initialData.projects || [],
        skillGroups: initialData.skillGroups || initialData.skills || [], // Handle both names
        certificates: initialData.certificates || [],
        resume: initialData.resume || { url: '', lastUpdated: '' },
        fileSystem: initialData.fileSystem || [],
        desktopItems: initialData.desktopItems || []
      });
    }
  };

  const handleSave = async () => {
    if (!editData) return;
    setStatus('saving');
    const success = await onUpdate(editData, password);
    if (success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editData) return;

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('password', password);

    try {
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        setEditData({
          ...editData,
          resume: {
            ...editData.resume,
            url,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        });
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      } else {
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }
    } catch (error) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  if (!isLoggedIn) {
// ... existing login UI ...
    return (
      <div className="h-full flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 bg-white/5 p-8 rounded-lg border border-white/10">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-win-blue/20 rounded-full">
              <Lock size={32} className="text-win-blue" />
            </div>
            <h2 className="text-xl font-semibold">Admin Access</h2>
            <p className="text-xs text-gray-400 text-center">Enter your password to manage your portfolio content.</p>
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-2 text-sm focus:border-win-blue outline-none transition-colors"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-win-blue hover:bg-blue-600 text-white py-2 rounded-sm text-sm font-medium transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (!editData) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <h2 className="font-semibold flex items-center gap-2">
          <Lock size={16} className="text-win-blue" />
          Portfolio Manager
        </h2>
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${
            status === 'success' ? 'bg-green-600' : 
            status === 'error' ? 'bg-red-600' : 
            'bg-win-blue hover:bg-blue-600'
          }`}
        >
          <Save size={16} />
          {status === 'saving' ? 'Saving...' : status === 'success' ? 'Saved!' : status === 'error' ? 'Failed' : 'Save Changes'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* About Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">About Me</h3>
          <textarea
            value={editData.about?.text || ''}
            onChange={(e) => setEditData({ ...editData, about: { text: e.target.value } })}
            className="w-full h-32 bg-black/40 border border-white/10 rounded-sm p-4 text-sm focus:border-win-blue outline-none resize-none"
          />
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-lg font-medium">Projects</h3>
            <button
              onClick={() => setEditData({
                ...editData,
                projects: [...(editData.projects || []), { title: 'New Project', description: '', tech: [], image: 'https://picsum.photos/seed/new/400/250' }]
              })}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-sm transition-colors"
            >
              <Plus size={14} /> Add Project
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {(editData.projects || []).map((project, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-4">
                <div className="flex justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <input
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...(editData.projects || [])];
                        newProjects[idx].title = e.target.value;
                        setEditData({ ...editData, projects: newProjects });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none"
                      placeholder="Project Title"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...(editData.projects || [])];
                        newProjects[idx].description = e.target.value;
                        setEditData({ ...editData, projects: newProjects });
                      }}
                      className="w-full h-20 bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none resize-none"
                      placeholder="Description"
                    />
                  </div>
                  <div className="w-32 h-20 bg-black/40 rounded-sm overflow-hidden border border-white/10">
                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    value={(project.tech || []).join(', ')}
                    onChange={(e) => {
                      const newProjects = [...(editData.projects || [])];
                      newProjects[idx].tech = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setEditData({ ...editData, projects: newProjects });
                    }}
                    className="flex-1 bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-xs focus:border-win-blue outline-none"
                    placeholder="Technologies (comma separated)"
                  />
                  <button
                    onClick={() => {
                      const newProjects = (editData.projects || []).filter((_, i) => i !== idx);
                      setEditData({ ...editData, projects: newProjects });
                    }}
                    className="ml-4 p-2 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-lg font-medium">Skills</h3>
            <button
              onClick={() => setEditData({
                ...editData,
                skillGroups: [...(editData.skillGroups || []), { category: 'New Category', skills: [] }]
              })}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-sm transition-colors"
            >
              <Plus size={14} /> Add Category
            </button>
          </div>
          <div className="space-y-6">
            {(editData.skillGroups || []).map((group, gIdx) => (
              <div key={gIdx} className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <input
                    value={group.category}
                    onChange={(e) => {
                      const newGroups = [...(editData.skillGroups || [])];
                      newGroups[gIdx].category = e.target.value;
                      setEditData({ ...editData, skillGroups: newGroups });
                    }}
                    className="bg-transparent border-b border-white/20 focus:border-win-blue outline-none font-semibold px-1"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const newGroups = [...(editData.skillGroups || [])];
                        newGroups[gIdx].skills = [...(newGroups[gIdx].skills || []), { name: 'New Skill', level: 50 }];
                        setEditData({ ...editData, skillGroups: newGroups });
                      }}
                      className="p-1.5 text-win-blue hover:bg-win-blue/10 rounded-sm transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => {
                        const newGroups = (editData.skillGroups || []).filter((_, i) => i !== gIdx);
                        setEditData({ ...editData, skillGroups: newGroups });
                      }}
                      className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(group.skills || []).map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-4 bg-black/20 p-2 rounded-sm border border-white/5">
                      <input
                        value={skill.name}
                        onChange={(e) => {
                          const newGroups = [...(editData.skillGroups || [])];
                          newGroups[gIdx].skills[sIdx].name = e.target.value;
                          setEditData({ ...editData, skillGroups: newGroups });
                        }}
                        className="flex-1 bg-transparent border-none outline-none text-xs"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => {
                          const newGroups = [...(editData.skillGroups || [])];
                          newGroups[gIdx].skills[sIdx].level = parseInt(e.target.value) || 0;
                          setEditData({ ...editData, skillGroups: newGroups });
                        }}
                        className="w-12 bg-black/40 border border-white/10 rounded-sm px-1 text-center text-xs outline-none"
                      />
                      <button
                        onClick={() => {
                          const newGroups = [...(editData.skillGroups || [])];
                          newGroups[gIdx].skills = newGroups[gIdx].skills.filter((_, i) => i !== sIdx);
                          setEditData({ ...editData, skillGroups: newGroups });
                        }}
                        className="text-red-400 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-lg font-medium">Certificates</h3>
            <button
              onClick={() => setEditData({
                ...editData,
                certificates: [...(editData.certificates || []), { title: 'New Certificate', issuer: '', date: '', link: '' }]
              })}
              className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-sm transition-colors"
            >
              <Plus size={14} /> Add Certificate
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {(editData.certificates || []).map((cert, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-4">
                <div className="flex justify-between gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={cert.title}
                      onChange={(e) => {
                        const newCerts = [...(editData.certificates || [])];
                        newCerts[idx].title = e.target.value;
                        setEditData({ ...editData, certificates: newCerts });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none"
                      placeholder="Certificate Title"
                    />
                    <input
                      value={cert.issuer}
                      onChange={(e) => {
                        const newCerts = [...(editData.certificates || [])];
                        newCerts[idx].issuer = e.target.value;
                        setEditData({ ...editData, certificates: newCerts });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none"
                      placeholder="Issuer"
                    />
                    <input
                      value={cert.date}
                      onChange={(e) => {
                        const newCerts = [...(editData.certificates || [])];
                        newCerts[idx].date = e.target.value;
                        setEditData({ ...editData, certificates: newCerts });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none"
                      placeholder="Date (e.g. 2023)"
                    />
                    <input
                      value={cert.link}
                      onChange={(e) => {
                        const newCerts = [...(editData.certificates || [])];
                        newCerts[idx].link = e.target.value;
                        setEditData({ ...editData, certificates: newCerts });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-1.5 text-sm focus:border-win-blue outline-none"
                      placeholder="Credential Link"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newCerts = (editData.certificates || []).filter((_, i) => i !== idx);
                      setEditData({ ...editData, certificates: newCerts });
                    }}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-sm transition-colors self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">Resume</h3>
          <div className="bg-white/5 p-6 rounded-sm border border-white/10 flex flex-col md:flex-row items-center gap-8">
            <div className="p-6 bg-win-blue/10 rounded-full">
              <FileText size={48} className="text-win-blue" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <p className="text-sm font-medium">Current Resume</p>
                <p className="text-xs text-gray-400">
                  {editData.resume?.url ? `Last updated: ${editData.resume.lastUpdated}` : 'No resume uploaded yet'}
                </p>
                {editData.resume?.url && (
                  <a 
                    href={editData.resume.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-win-blue hover:underline mt-1 inline-block"
                  >
                    View Current File
                  </a>
                )}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadStatus === 'uploading'}
                  className="flex items-center gap-2 bg-win-blue hover:bg-blue-600 px-4 py-2 rounded-sm text-sm font-medium transition-colors"
                >
                  <Upload size={16} />
                  {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload New Resume'}
                </button>
                {uploadStatus === 'success' && <span className="text-green-400 text-xs flex items-center">Upload successful!</span>}
                {uploadStatus === 'error' && <span className="text-red-400 text-xs flex items-center">Upload failed</span>}
              </div>
              <p className="text-[10px] text-gray-500 italic">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          </div>
        </section>

        {/* File Manager Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium border-b border-white/10 pb-2">File Manager & Desktop</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Desktop Items (JSON)</label>
              <textarea
                value={JSON.stringify(editData.desktopItems, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditData({ ...editData, desktopItems: parsed });
                  } catch (err) {
                    // Ignore invalid JSON while typing
                  }
                }}
                className="w-full h-48 bg-black/40 border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-win-blue outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">File System (JSON)</label>
              <textarea
                value={JSON.stringify(editData.fileSystem, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditData({ ...editData, fileSystem: parsed });
                  } catch (err) {
                    // Ignore invalid JSON while typing
                  }
                }}
                className="w-full h-96 bg-black/40 border border-white/10 rounded-sm p-4 text-xs font-mono focus:border-win-blue outline-none"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
