import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Search, 
  Monitor, 
  Wifi, 
  Volume2, 
  Battery, 
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TaskbarProps {
  windows: any[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  activeWindowId: string | null;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, onStartClick, onWindowClick, activeWindowId }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 win-mica flex items-center justify-between px-3 z-[9999] border-t border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      {/* Left section (Widgets/Visual only) */}
      <div className="flex items-center gap-4 w-40">
        <div className="flex items-center gap-2.5 opacity-80 hover:bg-white/10 px-3 py-1.5 rounded-md transition-all cursor-default group">
          <div className="w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform" />
          <span className="text-[12px] font-medium text-white/90">18°C</span>
        </div>
      </div>

      {/* Center section (Start & Apps) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <button 
          onClick={onStartClick}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-md transition-all active:scale-90 group relative"
        >
          <div className="grid grid-cols-2 gap-0.5 group-hover:scale-110 transition-transform">
            <div className="w-2 h-2 bg-blue-400 rounded-[1px] shadow-[0_0_4px_rgba(96,165,250,0.4)]" />
            <div className="w-2 h-2 bg-blue-400 rounded-[1px] shadow-[0_0_4px_rgba(96,165,250,0.4)]" />
            <div className="w-2 h-2 bg-blue-400 rounded-[1px] shadow-[0_0_4px_rgba(96,165,250,0.4)]" />
            <div className="w-2 h-2 bg-blue-400 rounded-[1px] shadow-[0_0_4px_rgba(96,165,250,0.4)]" />
          </div>
        </button>

        <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-md transition-all group">
          <Search size={20} className="text-blue-300/80 group-hover:text-blue-300 transition-colors" />
        </button>

        <div className="h-6 w-[1px] bg-white/10 mx-1.5" />

        {windows.filter(w => w.isOpen).map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-md transition-all relative group",
              activeWindowId === window.id ? "bg-white/15 shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]" : "hover:bg-white/10"
            )}
          >
            <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              {React.isValidElement(window.icon) && typeof (window.icon.type) !== 'string' ? (
                React.cloneElement(window.icon as React.ReactElement, { size: 20 })
              ) : (
                window.icon
              )}
            </div>
            <div className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-blue-400 rounded-full transition-all shadow-[0_0_8px_rgba(96,165,250,0.6)]",
              activeWindowId === window.id ? "w-5" : "w-1.5 opacity-40 group-hover:w-3 group-hover:opacity-80"
            )} />
          </button>
        ))}
      </div>

      {/* Right section (System Tray) */}
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <ChevronUp size={14} className="text-white/70" />
        </button>
        
        <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-white/10 rounded-md transition-all cursor-default group">
          <Wifi size={14} className="text-white/80 group-hover:text-white transition-colors" />
          <Volume2 size={14} className="text-white/80 group-hover:text-white transition-colors" />
          <Battery size={14} className="rotate-90 text-white/80 group-hover:text-white transition-colors" />
        </div>

        <div className="flex flex-col items-end px-3 py-1 hover:bg-white/10 rounded-md transition-all cursor-default group">
          <span className="text-[11px] font-semibold leading-tight text-white/90 group-hover:text-white transition-colors">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[11px] opacity-60 leading-tight text-white/70 group-hover:opacity-90 transition-opacity">
            {time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
        </div>

        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <MessageSquare size={14} className="text-white/70" />
        </button>
        
        <div className="w-[1px] h-8 bg-white/5 ml-1.5" />
      </div>
    </div>
  );
};
