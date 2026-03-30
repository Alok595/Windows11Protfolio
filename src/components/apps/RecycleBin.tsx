import React, { useState } from 'react';
import { Trash2, RotateCcw, Trash, FileText, Image as ImageIcon, Briefcase, UserCircle, Code2, Terminal as TerminalIcon, Mail, LayoutGrid, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DeletedItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: React.ReactNode;
  deletedAt: string;
}

interface RecycleBinProps {
  deletedItems: DeletedItem[];
  onRestore: (id: string) => void;
  onEmpty: () => void;
}

export const RecycleBin: React.FC<RecycleBinProps> = ({ deletedItems, onRestore, onEmpty }) => {
  return (
    <div className="flex flex-col h-full bg-[#1c1c1c] text-white/90 select-none">
      {/* Toolbar */}
      <div className="h-12 bg-white/[0.03] border-b border-white/10 flex items-center px-4 gap-4 shrink-0">
        <button 
          onClick={onEmpty}
          disabled={deletedItems.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all text-xs font-bold uppercase tracking-wider group"
        >
          <Trash size={14} className="text-red-400 group-hover:scale-110 transition-transform" />
          <span>Empty Bin</span>
        </button>
        <div className="w-[1px] h-5 bg-white/10" />
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
          <Info size={12} />
          <span>{deletedItems.length} {deletedItems.length === 1 ? 'Item' : 'Items'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        {deletedItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-6 opacity-20">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Trash2 size={48} />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-bold uppercase tracking-widest">Recycle Bin is empty</p>
              <p className="text-[10px] opacity-60">Deleted files will appear here for restoration</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6">
            <AnimatePresence mode="popLayout">
              {deletedItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/10 transition-all cursor-default relative"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center bg-white/5 rounded-xl text-gray-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-[#1c1c1c] shadow-lg">
                      <Trash size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-full">
                    <span className="text-[11px] font-bold text-center truncate w-full px-1 tracking-tight">{item.name}</span>
                    <span className="text-[9px] font-medium opacity-30 uppercase tracking-tighter">{item.deletedAt}</span>
                  </div>
                  
                  {/* Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 rounded-xl backdrop-blur-[1px]">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRestore(item.id)}
                      className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-2xl border border-white/10"
                      title="Restore Item"
                    >
                      <RotateCcw size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
