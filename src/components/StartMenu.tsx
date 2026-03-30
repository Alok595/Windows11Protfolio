import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Power, 
  User, 
  Search,
  LayoutGrid,
  UserCircle,
  Briefcase,
  Code2,
  Terminal,
  Mail,
  Github,
  Linkedin,
  Youtube,
  LogOut,
  RotateCcw,
  Moon,
  Camera as CameraIcon,
  Award
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (id: string) => void;
  onShutdown: () => void;
  onRestart: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppClick, onShutdown, onRestart }) => {
  const [showPowerOptions, setShowPowerOptions] = useState(false);
  
  if (!isOpen) return null;

  const pinnedApps = [
    { id: 'about', name: 'About Me', icon: <img src="https://img.icons8.com/fluency/48/000000/user-male-circle.png" alt="About" className="w-6 h-6 object-contain" /> },
    { id: 'projects', name: 'Projects', icon: <img src="https://img.icons8.com/fluency/48/000000/briefcase.png" alt="Projects" className="w-6 h-6 object-contain" /> },
    { id: 'skills', name: 'Skills', icon: <img src="https://img.icons8.com/fluency/48/000000/code.png" alt="Skills" className="w-6 h-6 object-contain" /> },
    { id: 'certificates', name: 'Certificates', icon: <img src="https://img.icons8.com/fluency/48/000000/certificate.png" alt="Certificates" className="w-6 h-6 object-contain" /> },
    { id: 'terminal', name: 'Terminal', icon: <img src="https://img.icons8.com/fluency/48/000000/console.png" alt="Terminal" className="w-6 h-6 object-contain" /> },
    { id: 'contact', name: 'Contact', icon: <img src="https://img.icons8.com/fluency/48/000000/mail.png" alt="Contact" className="w-6 h-6 object-contain" /> },
    { id: 'explorer', name: 'File Explorer', icon: <img src="https://img.icons8.com/fluency/48/000000/folder-invoices.png" alt="Explorer" className="w-6 h-6 object-contain" /> },
    { id: 'camera', name: 'Camera', icon: <img src="https://img.icons8.com/fluency/48/000000/camera.png" alt="Camera" className="w-6 h-6 object-contain" /> },
    { id: 'github', name: 'GitHub', icon: <img src="https://img.icons8.com/fluency/48/000000/github.png" alt="GitHub" className="w-6 h-6 object-contain" /> },
    { id: 'linkedin', name: 'LinkedIn', icon: <img src="https://img.icons8.com/fluency/48/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6 object-contain" /> },
    { id: 'youtube', name: 'YouTube', icon: <img src="https://img.icons8.com/fluency/48/000000/youtube-play.png" alt="YouTube" className="w-6 h-6 object-contain" /> },
  ];

  return (
    <motion.div
      initial={{ y: 300, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 300, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[540px] h-[600px] max-w-[95vw] win-mica rounded-2xl z-[9998] flex flex-col border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Search Bar */}
      <div className="p-6 pb-0 shrink-0">
        <div className="bg-black/30 border-b-2 border-blue-500/50 flex items-center px-4 py-2.5 rounded-t-lg transition-all focus-within:bg-black/40">
          <Search size={16} className="text-blue-400/80 mr-3" />
          <input 
            placeholder="Search for apps, settings, and documents" 
            className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-white/30 text-white/90"
            autoFocus
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="flex-1 p-8 pt-6 overflow-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-5 px-1">
          <span className="text-[13px] font-semibold text-white/90">Pinned</span>
          <button className="text-[11px] bg-white/5 px-2.5 py-1 rounded-md hover:bg-white/10 active:bg-white/5 transition-all text-white/80">All apps &gt;</button>
        </div>
        
        <div className="grid grid-cols-6 gap-y-6">
          {pinnedApps.map(app => (
            <button
              key={app.id}
              onClick={() => { onAppClick(app.id); onClose(); }}
              className="flex flex-col items-center gap-2 group outline-none"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg group-hover:bg-white/10 group-hover:scale-110 group-active:scale-95 transition-all duration-200">
                {app.icon}
              </div>
              <span className="text-[11px] text-center leading-tight text-white/80 group-hover:text-white transition-colors">{app.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-5 px-1">
            <span className="text-[13px] font-semibold text-white/90">Recommended</span>
            <button className="text-[11px] bg-white/5 px-2.5 py-1 rounded-md hover:bg-white/10 active:bg-white/5 transition-all text-white/80">More &gt;</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3.5 p-2.5 hover:bg-white/5 rounded-lg transition-all cursor-pointer group">
              <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><User size={18} className="text-blue-400" /></div>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-white/90">Get Started</span>
                <span className="text-[10px] text-white/40">Welcome to your portfolio</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 p-2.5 hover:bg-white/5 rounded-lg transition-all cursor-pointer group">
              <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><Briefcase size={18} className="text-orange-400" /></div>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-white/90">Recent Project</span>
                <span className="text-[10px] text-white/40">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/30 p-4 px-8 flex items-center justify-between border-t border-white/5 relative">
        <div className="flex items-center gap-3 hover:bg-white/5 p-2 px-3 rounded-lg transition-all cursor-pointer group">
          <div className="w-8 h-8 bg-win-blue rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg group-hover:scale-110 transition-transform">NG</div>
          <span className="text-[12px] font-medium text-white/90">Niraj Gupta</span>
        </div>
        
        <div className="relative">
          <AnimatePresence>
            {showPowerOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-3 w-52 win-mica rounded-xl border border-white/10 shadow-2xl p-1.5 overflow-hidden"
              >
                <button className="w-full flex items-center gap-3.5 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-[12px] text-white/90 group">
                  <Moon size={14} className="opacity-70 group-hover:opacity-100" />
                  <span>Sleep</span>
                </button>
                <button 
                  onClick={() => { onShutdown(); onClose(); }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-[12px] text-white/90 group"
                >
                  <Power size={14} className="opacity-70 group-hover:opacity-100" />
                  <span>Shut down</span>
                </button>
                <button 
                  onClick={() => { onRestart(); onClose(); }}
                  className="w-full flex items-center gap-3.5 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-[12px] text-white/90 group"
                >
                  <RotateCcw size={14} className="opacity-70 group-hover:opacity-100" />
                  <span>Restart</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1.5 mx-2" />
                <button className="w-full flex items-center gap-3.5 px-3 py-2.5 hover:bg-white/10 rounded-lg transition-all text-[12px] text-white/90 group">
                  <LogOut size={14} className="opacity-70 group-hover:opacity-100" />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setShowPowerOptions(!showPowerOptions); }}
            className={cn(
              "p-2.5 flex items-center gap-2 rounded-lg transition-all",
              showPowerOptions ? "bg-white/15" : "hover:bg-white/5"
            )}
          >
            <Power size={18} className="text-white/90" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
