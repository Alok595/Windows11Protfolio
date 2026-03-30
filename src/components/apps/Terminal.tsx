import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Command } from 'lucide-react';

export const Terminal = () => {
  const [history, setHistory] = useState<string[]>([
    'NirajOS Terminal [Version 10.0.22621.2428]',
    '(c) Niraj Gupta. All rights reserved.',
    '',
    'Welcome to NirajOS Terminal v1.0.0',
    'Type "help" to see available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: about, projects, skills, contact, clear, whoami, date, system';
        break;
      case 'about':
        response = 'Niraj Gupta - Full Stack Developer. Specializing in high-performance web systems and modern UI/UX.';
        break;
      case 'whoami':
        response = 'guest@niraj-portfolio';
        break;
      case 'date':
        response = new Date().toLocaleString();
        break;
      case 'system':
        response = 'OS: NirajOS v1.0\nKernel: React 18.2.0\nShell: PortfolioShell v1.0\nUptime: 2 days, 4 hours, 12 minutes';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'projects':
        response = 'Fetching project list...\n- E-Commerce Platform (React, Node.js)\n- AI Image Generator (Next.js, OpenAI)\n- Real-time Chat App (Socket.io)\n- DevOps Dashboard (Go, Docker)';
        break;
      case 'skills':
        response = 'Languages: TypeScript, JavaScript, Go, Python, Rust\nFrameworks: React, Next.js, Express, Gin\nTools: Docker, Kubernetes, AWS, GCP';
        break;
      default:
        response = `Command not found: ${cmd}. Type "help" for assistance.`;
    }

    setHistory(prev => [...prev, `C:\\Users\\Guest> ${input}`, response, '']);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] font-mono text-[13px] leading-relaxed text-[#cccccc] overflow-hidden selection:bg-white/20">
      {/* Terminal Header/Tabs (Visual only) */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1f1f1f] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#0c0c0c] rounded-t-md border-x border-t border-white/10 -mb-[9px] relative z-10">
          <TerminalIcon size={12} className="text-blue-400" />
          <span className="text-[11px] font-medium text-white/80">Command Prompt</span>
          <X size={10} className="ml-2 opacity-40 hover:opacity-100 cursor-pointer" />
        </div>
        <div className="flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/5 transition-colors ml-auto">
          <Command size={12} className="opacity-40" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div className="space-y-1">
          {history.map((line, i) => (
            <div key={i} className="min-h-[1.2em] whitespace-pre-wrap break-all">
              {line.startsWith('C:\\Users\\Guest>') ? (
                <span className="text-emerald-400 font-bold">{line}</span>
              ) : line.startsWith('Command not found') ? (
                <span className="text-red-400">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-1">
          <span className="shrink-0 text-emerald-400 font-bold">C:\Users\Guest&gt;</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-[#cccccc] caret-white"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};
