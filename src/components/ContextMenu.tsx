import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Image as ImageIcon, LayoutGrid, Settings, Monitor, FolderPlus } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onChangeBackground: () => void;
  onCreateFolder?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, isOpen, onClose, onRefresh, onChangeBackground, onCreateFolder }) => {
  if (!isOpen) return null;

  const items = [
    { label: 'View', icon: <LayoutGrid size={14} />, sub: true },
    { label: 'Sort by', icon: <Monitor size={14} />, sub: true },
    { label: 'Refresh', icon: <RefreshCw size={14} />, onClick: onRefresh },
    { divider: true },
    { label: 'New Folder', icon: <FolderPlus size={14} />, onClick: onCreateFolder },
    { label: 'New', icon: <LayoutGrid size={14} />, sub: true },
    { divider: true },
    { label: 'Display settings', icon: <Monitor size={14} /> },
    { label: 'Personalize', icon: <ImageIcon size={14} />, onClick: onChangeBackground },
    { divider: true },
    { label: 'Open in Terminal', icon: <Settings size={14} /> },
  ];

  return (
    <div 
      className="fixed inset-0 z-[10000]" 
      onClick={onClose}
      onContextMenu={(e) => { e.preventDefault(); onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{ top: y, left: x }}
        className="absolute w-64 win-mica rounded-xl border border-white/10 shadow-2xl p-1.5 overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, i) => (
          item.divider ? (
            <div key={i} className="h-[1px] bg-white/10 my-1 mx-2" />
          ) : (
            <button
              key={i}
              onClick={() => { item.onClick?.(); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 active:bg-white/5 rounded-md transition-all text-[13px] group"
            >
              <div className="flex items-center gap-3.5">
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                <span className="text-white/90 group-hover:text-white transition-colors">{item.label}</span>
              </div>
              {item.sub && <span className="opacity-40 text-[10px] group-hover:opacity-80 transition-opacity">▶</span>}
            </button>
          )
        ))}
      </motion.div>
    </div>
  );
};
