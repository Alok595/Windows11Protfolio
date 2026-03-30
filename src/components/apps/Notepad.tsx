import React, { useState, useEffect } from 'react';
import { Save, FileText, X, ExternalLink, ChevronDown, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface NotepadProps {
  initialContent?: string;
  title?: string;
  onSave?: (content: string) => void;
  url?: string;
}

export const Notepad: React.FC<NotepadProps> = ({ initialContent = '', title = 'Untitled - Notepad', onSave, url }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white/80 font-mono select-none">
      {/* Menu Bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-white/[0.03] text-[11px] border-b border-white/10 shrink-0">
        {['File', 'Edit', 'Format', 'View', 'Help'].map((item) => (
          <button key={item} className="hover:bg-white/5 px-2.5 py-1 rounded-md transition-all font-medium active:bg-white/10">
            {item}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2 pr-2">
          {url && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 px-3 py-1 rounded-lg transition-all text-blue-400 font-bold uppercase tracking-widest text-[9px] border border-blue-400/20"
            >
              <ExternalLink size={10} />
              Open Link
            </motion.button>
          )}
          {onSave && (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSave(content)}
              className="flex items-center gap-1.5 bg-green-600/20 hover:bg-green-600/30 px-3 py-1 rounded-lg transition-all text-green-400 font-bold uppercase tracking-widest text-[9px] border border-green-400/20"
            >
              <Save size={10} />
              Save
            </motion.button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Line Numbers gutter (simulated) */}
        <div className="w-12 bg-white/[0.02] border-r border-white/5 flex flex-col items-end pr-3 py-4 text-[10px] text-white/20 select-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-6 leading-relaxed">{i + 1}</div>
          ))}
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-transparent p-4 pt-4 outline-none resize-none custom-scrollbar text-sm leading-relaxed text-white/90 placeholder:text-white/10"
          spellCheck={false}
          placeholder="Start typing your thoughts..."
        />
      </div>

      {/* Status Bar */}
      <div className="h-7 bg-white/[0.03] border-t border-white/10 flex items-center px-4 justify-between text-[10px] font-bold uppercase tracking-widest text-white/30 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FileText size={10} />
            Windows (CRLF)
          </span>
          <span className="opacity-50">|</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 hover:text-white/60 cursor-default transition-colors">
            <span>Ln 1, Col 1</span>
            <ChevronDown size={10} />
          </div>
          <div className="flex items-center gap-1 hover:text-white/60 cursor-default transition-colors">
            <span>100%</span>
            <ChevronDown size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};
