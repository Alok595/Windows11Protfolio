import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, name, icon, onClick }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.92, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
      className="w-[88px] flex flex-col items-center gap-1.5 p-2 border border-transparent transition-all rounded-lg group cursor-default z-10 select-none"
      onDoubleClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center relative">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 blur-xl rounded-full transition-all duration-500" />
        
        <div className={cn(
          "w-10 h-10 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-active:scale-95",
          id === 'about' && "drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]",
          id === 'projects' && "drop-shadow-[0_0_8px_rgba(251,146,60,0.3)]",
          id === 'skills' && "drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]",
          id === 'terminal' && "drop-shadow-[0_0_8px_rgba(209,213,219,0.3)]",
          id === 'contact' && "drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]",
          id === 'github' && "drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]",
          id === 'linkedin' && "drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]",
          id === 'youtube' && "drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]",
          id === 'mail' && "drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]",
          id.startsWith('project-') && "drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]"
        )}>
          {React.isValidElement(icon) && typeof (icon.type) !== 'string' ? (
            React.cloneElement(icon as React.ReactElement, { size: 34, strokeWidth: 1.5 })
          ) : (
            icon
          )}
        </div>
      </div>
      <span className="text-[11px] text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium leading-tight px-1 line-clamp-2 group-hover:drop-shadow-none transition-all">
        {name}
      </span>
    </motion.div>
  );
};



