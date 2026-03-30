import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface WindowProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  if (!isOpen) return null;

  const windowVariants = {
    normal: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      width: '850px',
      height: '550px',
      top: '10%',
      left: '15%',
      borderRadius: '10px',
    },
    maximized: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      width: '100vw',
      height: 'calc(100vh - 48px)',
      top: 0,
      left: 0,
      borderRadius: '0px',
    },
    minimized: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          drag={!isMaximized}
          dragHandleSelector=".window-drag-handle"
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={isMaximized ? "maximized" : "normal"}
          variants={windowVariants}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            opacity: { duration: 0.2 }
          }}
          onClick={onFocus}
          style={{ zIndex }}
          className={cn(
            "absolute flex flex-col overflow-hidden win-window-shadow border border-white/10 win-mica",
            isMaximized ? "" : "max-w-[95vw] max-h-[85vh]"
          )}
        >
          {/* Title Bar */}
          <div 
            className="h-10 flex items-center justify-between bg-transparent px-3 cursor-default shrink-0 window-drag-handle select-none"
            onDoubleClick={onMaximize}
          >
            <div className="flex items-center gap-2.5 ml-1">
              <div className="w-4 h-4 flex items-center justify-center opacity-90 transition-opacity">
                {icon}
              </div>
              <span className="text-[12px] font-medium text-white/90 tracking-wide">
                {title}
              </span>
            </div>
            
            <div className="flex items-center h-full -mr-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                className="h-full px-4.5 hover:bg-white/10 active:bg-white/5 transition-colors flex items-center justify-center"
                title="Minimize"
              >
                <Minus size={14} strokeWidth={1.5} className="text-white/80" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                className="h-full px-4.5 hover:bg-white/10 active:bg-white/5 transition-colors flex items-center justify-center"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? (
                  <div className="relative w-3 h-3 border-[1.5px] border-white/80 rounded-[1px]">
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-[1.5px] border-white/80 rounded-[1px] bg-transparent" />
                  </div>
                ) : (
                  <Square size={11} strokeWidth={2} className="text-white/80" />
                )}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="h-full px-5 hover:bg-[#e81123] active:bg-[#f1707a] transition-colors flex items-center justify-center group"
                title="Close"
              >
                <X size={16} strokeWidth={1.5} className="text-white/80 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Content Area with subtle separator */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 z-10" />
            <div className="flex-1 overflow-auto bg-[#1a1a1a]/40 backdrop-blur-md text-white custom-scrollbar">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


