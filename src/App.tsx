import React, { useState, useCallback, useEffect } from "react";
import {
  UserCircle,
  Briefcase,
  Code2,
  Terminal as TerminalIcon,
  Mail,
  FileText,
  Github,
  Linkedin,
  Youtube,
  LayoutGrid,
  RotateCcw,
  Power,
  Cpu,
  Camera as CameraIcon,
  Trash2,
  Image as ImageIcon,
  Award,
} from "lucide-react";
import { Window } from "./components/Window";
import { Taskbar } from "./components/Taskbar";
import { StartMenu } from "./components/StartMenu";
import { DesktopIcon } from "./components/DesktopIcon";
import { ContextMenu } from "./components/ContextMenu";
import AboutMe from "./components/apps/AboutMe";
import { Projects } from "./components/apps/Projects";
import { Terminal } from "./components/apps/Terminal";
import { Skills } from "./components/apps/Skills";
import { Contact } from "./components/apps/Contact";
import { FileExplorer } from "./components/apps/FileExplorer";
import { Camera } from "./components/apps/Camera";
import { RecycleBin } from "./components/apps/RecycleBin";
import { Notepad } from "./components/apps/Notepad";
import { Certificates } from "./components/apps/Certificates";
import { WindowId, WindowState, PortfolioData } from "./types";
import { AnimatePresence, motion } from "motion/react";

const WALLPAPERS = [
  "https://picsum.photos/seed/win11_1/1920/1080",
  "https://picsum.photos/seed/win11_2/1920/1080",
  "https://picsum.photos/seed/win11_3/1920/1080",
  "https://picsum.photos/seed/win11_4/1920/1080",
];

const WIN_ICONS = {
  about: (
    <img
      src="https://img.icons8.com/fluency/48/000000/user-male-circle.png"
      alt="About"
      className="w-full h-full object-contain"
    />
  ),
  projects: (
    <img
      src="https://img.icons8.com/fluency/48/000000/briefcase.png"
      alt="Projects"
      className="w-full h-full object-contain"
    />
  ),
  skills: (
    <img
      src="https://img.icons8.com/fluency/48/000000/code.png"
      alt="Skills"
      className="w-full h-full object-contain"
    />
  ),
  terminal: (
    <img
      src="https://img.icons8.com/fluency/48/000000/console.png"
      alt="Terminal"
      className="w-full h-full object-contain"
    />
  ),
  contact: (
    <img
      src="https://img.icons8.com/fluency/48/000000/mail.png"
      alt="Contact"
      className="w-full h-full object-contain"
    />
  ),
  explorer: (
    <img
      src="https://img.icons8.com/fluency/48/000000/folder-invoices.png"
      alt="Explorer"
      className="w-full h-full object-contain"
    />
  ),
  camera: (
    <img
      src="https://img.icons8.com/fluency/48/000000/camera.png"
      alt="Camera"
      className="w-full h-full object-contain"
    />
  ),
  recycleBin: (
    <img
      src="https://img.icons8.com/fluency/48/000000/recycle-bin.png"
      alt="Recycle Bin"
      className="w-full h-full object-contain"
    />
  ),
  notepad: (
    <img
      src="https://img.icons8.com/fluency/48/000000/notepad.png"
      alt="Notepad"
      className="w-full h-full object-contain"
    />
  ),
  github: (
    <img
      src="https://img.icons8.com/fluency/48/000000/github.png"
      alt="GitHub"
      className="w-full h-full object-contain"
    />
  ),
  linkedin: (
    <img
      src="https://img.icons8.com/fluency/48/000000/linkedin.png"
      alt="LinkedIn"
      className="w-full h-full object-contain"
    />
  ),
  youtube: (
    <img
      src="https://img.icons8.com/fluency/48/000000/youtube-play.png"
      alt="YouTube"
      className="w-full h-full object-contain"
    />
  ),
  resume: (
    <img
      src="https://img.icons8.com/fluency/48/000000/pdf.png"
      alt="Resume"
      className="w-full h-full object-contain"
    />
  ),
  certificates: (
    <img
      src="https://img.icons8.com/fluency/48/000000/certificate.png"
      alt="Certificates"
      className="w-full h-full object-contain"
    />
  ),
};

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: "about",
    title: "About Me",
    icon: WIN_ICONS.about,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "projects",
    title: "Projects",
    icon: WIN_ICONS.projects,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "skills",
    title: "Skills",
    icon: WIN_ICONS.skills,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: WIN_ICONS.terminal,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "contact",
    title: "Contact",
    icon: WIN_ICONS.contact,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "explorer",
    title: "File Explorer",
    icon: WIN_ICONS.explorer,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "camera",
    title: "Camera",
    icon: WIN_ICONS.camera,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: WIN_ICONS.recycleBin,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "notepad",
    title: "Notepad",
    icon: WIN_ICONS.notepad,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
  {
    id: "certificates",
    title: "Certificates",
    icon: WIN_ICONS.certificates,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
  },
];

type SystemState = "off" | "bios" | "booting" | "on" | "shutting-down";

export default function App() {
  const [systemState, setSystemState] = useState<SystemState>("off");
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(
    "about",
  );
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    isOpen: boolean;
  }>({ x: 0, y: 0, isOpen: false });
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState<any[]>([]);
  const [notepadContent, setNotepadContent] = useState("");
  const [notepadTitle, setNotepadTitle] = useState("Untitled - Notepad");
  const [notepadUrl, setNotepadUrl] = useState<string | undefined>(undefined);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolioData(data))
      .catch((err) => console.error("Failed to fetch portfolio data:", err));
  }, []);

  const updatePortfolioData = async (
    newData: PortfolioData,
    password: string,
  ) => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data: newData }),
      });
      if (res.ok) {
        setPortfolioData(newData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update portfolio data:", error);
      return false;
    }
  };

  const focusWindow = useCallback(
    (id: WindowId) => {
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w,
        ),
      );
      setActiveWindowId(id);
    },
    [maxZIndex],
  );

  const openWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isOpen: true, isMinimized: false } : w,
        ),
      );
      focusWindow(id);
    },
    [focusWindow],
  );

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isOpen: false, isMaximized: false } : w,
        ),
      );
      if (activeWindowId === id) setActiveWindowId(null);
    },
    [activeWindowId],
  );

  const toggleMinimize = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: !w.isMinimized } : w,
        ),
      );
      if (activeWindowId === id) setActiveWindowId(null);
      else focusWindow(id);
    },
    [activeWindowId, focusWindow],
  );

  const toggleMaximize = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w,
        ),
      );
      focusWindow(id);
    },
    [focusWindow],
  );

  const handleTaskbarClick = (id: WindowId) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;

    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      toggleMinimize(id);
    } else if (activeWindowId === id) {
      toggleMinimize(id);
    } else {
      focusWindow(id);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const changeBackground = () => {
    const currentIndex = WALLPAPERS.indexOf(wallpaper);
    const nextIndex = (currentIndex + 1) % WALLPAPERS.length;
    setWallpaper(WALLPAPERS[nextIndex]);
  };

  const handlePowerOn = () => {
    setSystemState("bios");
    setTimeout(() => {
      setSystemState("booting");
    }, 1500);
    setTimeout(() => {
      setSystemState("on");
    }, 5500);
  };

  const handleShutdown = () => {
    setSystemState("shutting-down");
    setTimeout(() => {
      setSystemState("off");
    }, 3000);
  };

  const handleRestart = () => {
    setSystemState("shutting-down");
    setTimeout(() => {
      setSystemState("bios");
      setTimeout(() => {
        setSystemState("booting");
      }, 1500);
      setTimeout(() => {
        setSystemState("on");
      }, 5500);
    }, 3000);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, isOpen: true });
  };

  const handleCreateFolder = async () => {
    if (!portfolioData) return;

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: "New Folder",
      icon: "https://img.icons8.com/fluency/48/000000/folder-invoices.png",
      type: "folder" as const,
      content: [],
    };

    const updatedDesktopItems = [
      ...(portfolioData.desktopItems || []),
      {
        ...newFolder,
        windowId: "explorer",
        type: "app" as const,
      },
    ];

    const updatedFileSystem = [...(portfolioData.fileSystem || [])];
    const desktopFolder = updatedFileSystem.find(
      (item) => item.id === "desktop",
    ) || {
      id: "desktop",
      name: "Desktop",
      type: "folder",
      icon: "https://img.icons8.com/fluency/48/000000/desktop.png",
      content: [],
    };

    if (!updatedFileSystem.find((item) => item.id === "desktop")) {
      updatedFileSystem.push(desktopFolder as any);
    }

    desktopFolder.content = [...(desktopFolder.content || []), newFolder];

    const newData = {
      ...portfolioData,
      desktopItems: updatedDesktopItems,
      fileSystem: updatedFileSystem,
    };

    // We need the password to update. For now, we'll just update locally
    // and let the user save via a backend if they want persistence across sessions,
    // OR we can assume a default password if we want it to work immediately.
    // Actually, the user wants to "modify in ever things", so let's make it persist if possible.
    // But we don't have the password here.
    // Let's just update the local state for now.
    setPortfolioData(newData);
    setContextMenu((prev) => ({ ...prev, isOpen: false }));
  };

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSavePhoto = (dataUrl: string) => {
    setCapturedPhotos((prev) => [dataUrl, ...prev]);
  };

  const handleRestoreItem = (id: string) => {
    setDeletedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEmptyBin = () => {
    setDeletedItems([]);
  };

  const handleDeleteFile = (file: any) => {
    const newItem = {
      ...file,
      deletedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setDeletedItems((prev) => [newItem, ...prev]);
  };

  const handleOpenFile = (name: string, content: string, url?: string) => {
    setNotepadTitle(`${name} - Notepad`);
    setNotepadContent(content);
    setNotepadUrl(url);
    openWindow("notepad");
  };

  // Power On Screen (CPU/Physical Button)
  if (systemState === "off") {
    return (
      <div className="w-screen h-screen bg-[#050505] flex flex-col items-center justify-center gap-16">
        <div className="relative group">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 50px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePowerOn}
            className="w-40 h-40 rounded-full bg-gradient-to-b from-gray-800 to-gray-950 border-4 border-gray-700 flex items-center justify-center cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-blue-500 transition-all outline-none"
          >
            <Power
              size={64}
              className="text-gray-600 group-hover:text-blue-500 transition-colors"
            />
          </motion.button>
          <div className="absolute -inset-8 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-gray-400 font-light tracking-[0.3em] uppercase text-lg animate-pulse">
            System Offline
          </h2>
          <p className="text-gray-600 text-sm font-medium tracking-wide">
            Press the Power Button to Start
          </p>
        </div>
      </div>
    );
  }

  // BIOS Screen
  if (systemState === "bios") {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-start p-12 font-mono text-white text-sm gap-2">
        <div className="flex items-center gap-4 mb-8">
          <Cpu size={48} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-xl font-bold">PORTFOLIO BIOS v2.0</span>
            <span className="opacity-60">Copyright (C) 2026 Niraj Gupta</span>
          </div>
        </div>
        <p>CPU: Intel(R) Core(TM) i9-12900K @ 3.20GHz</p>
        <p>Memory Test: 32768MB OK</p>
        <p>Detecting Storage Devices...</p>
        <p className="text-green-500">SSD: NVMe M.2 1TB - Status: Healthy</p>
        <p>Checking System Integrity...</p>
        <p className="text-blue-400 mt-4 animate-pulse">
          Entering Boot Sequence...
        </p>
      </div>
    );
  }

  // Boot Sequence
  if (systemState === "booting") {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-1"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-sm" />
          <div className="w-12 h-12 bg-blue-500 rounded-sm" />
          <div className="w-12 h-12 bg-blue-500 rounded-sm" />
          <div className="w-12 h-12 bg-blue-500 rounded-sm" />
        </motion.div>

        <div className="relative w-12 h-12">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: "50%",
                left: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
                transform: `rotate(${i * 45}deg) translate(24px)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Shutdown Sequence
  if (systemState === "shutting-down") {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <RotateCcw size={48} className="text-blue-500" />
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-light">Shutting down</h1>
          <p className="text-sm opacity-50">
            Please wait while we save your progress...
          </p>
        </div>
      </div>
    );
  }

  // Main Desktop Environment
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url("${wallpaper}")` }}
      onContextMenu={handleContextMenu}
      onClick={() => {
        if (isStartOpen) setIsStartOpen(false);
        if (contextMenu.isOpen)
          setContextMenu((prev) => ({ ...prev, isOpen: false }));
      }}
    >
      {/* Refresh Overlay */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 z-[10001] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 flex flex-col flex-wrap h-[calc(100vh-60px)] gap-2 content-start">
        {(portfolioData?.desktopItems || []).map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            name={item.name}
            icon={
              typeof item.icon === "string" ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                item.icon
              )
            }
            onClick={() => {
              if (item.type === "app" && item.windowId) {
                openWindow(item.windowId as WindowId);
              } else if (item.type === "link" && item.url) {
                openExternalLink(item.url);
              }
            }}
          />
        ))}
        <DesktopIcon
          id="resume"
          name="Resume.pdf"
          icon={WIN_ICONS.resume}
          onClick={() => window.open("/resume.pdf", "_blank")}
        />
      </div>

      {/* Windows */}
      <Window
        {...windows.find((w) => w.id === "about")!}
        onClose={() => closeWindow("about")}
        onMinimize={() => toggleMinimize("about")}
        onMaximize={() => toggleMaximize("about")}
        onFocus={() => focusWindow("about")}
      >
        <AboutMe data={portfolioData} />
      </Window>

      <Window
        {...windows.find((w) => w.id === "projects")!}
        onClose={() => closeWindow("projects")}
        onMinimize={() => toggleMinimize("projects")}
        onMaximize={() => toggleMaximize("projects")}
        onFocus={() => focusWindow("projects")}
      >
        <Projects data={portfolioData?.projects} />
      </Window>

      <Window
        {...windows.find((w) => w.id === "skills")!}
        onClose={() => closeWindow("skills")}
        onMinimize={() => toggleMinimize("skills")}
        onMaximize={() => toggleMaximize("skills")}
        onFocus={() => focusWindow("skills")}
      >
        <Skills data={portfolioData?.skillGroups} />
      </Window>

      <Window
        {...windows.find((w) => w.id === "terminal")!}
        onClose={() => closeWindow("terminal")}
        onMinimize={() => toggleMinimize("terminal")}
        onMaximize={() => toggleMaximize("terminal")}
        onFocus={() => focusWindow("terminal")}
      >
        <Terminal />
      </Window>

      <Window
        {...windows.find((w) => w.id === "contact")!}
        onClose={() => closeWindow("contact")}
        onMinimize={() => toggleMinimize("contact")}
        onMaximize={() => toggleMaximize("contact")}
        onFocus={() => focusWindow("contact")}
      >
        <Contact />
      </Window>

      <Window
        {...windows.find((w) => w.id === "explorer")!}
        onClose={() => closeWindow("explorer")}
        onMinimize={() => toggleMinimize("explorer")}
        onMaximize={() => toggleMaximize("explorer")}
        onFocus={() => focusWindow("explorer")}
      >
        <FileExplorer
          onFileClick={(id) => openWindow(id as WindowId)}
          onDeleteFile={handleDeleteFile}
          onOpenFile={handleOpenFile}
          capturedPhotos={capturedPhotos}
          fileSystem={portfolioData?.fileSystem}
        />
      </Window>

      <Window
        {...windows.find((w) => w.id === "camera")!}
        onClose={() => closeWindow("camera")}
        onMinimize={() => toggleMinimize("camera")}
        onMaximize={() => toggleMaximize("camera")}
        onFocus={() => focusWindow("camera")}
      >
        <Camera onSavePhoto={handleSavePhoto} />
      </Window>

      <Window
        {...windows.find((w) => w.id === "recycle-bin")!}
        onClose={() => closeWindow("recycle-bin")}
        onMinimize={() => toggleMinimize("recycle-bin")}
        onMaximize={() => toggleMaximize("recycle-bin")}
        onFocus={() => focusWindow("recycle-bin")}
      >
        <RecycleBin
          deletedItems={deletedItems}
          onRestore={handleRestoreItem}
          onEmpty={handleEmptyBin}
        />
      </Window>

      <Window
        {...windows.find((w) => w.id === "notepad")!}
        title={notepadTitle}
        onClose={() => closeWindow("notepad")}
        onMinimize={() => toggleMinimize("notepad")}
        onMaximize={() => toggleMaximize("notepad")}
        onFocus={() => focusWindow("notepad")}
      >
        <Notepad
          initialContent={notepadContent}
          title={notepadTitle}
          url={notepadUrl}
        />
      </Window>

      <Window
        {...windows.find((w) => w.id === "certificates")!}
        onClose={() => closeWindow("certificates")}
        onMinimize={() => toggleMinimize("certificates")}
        onMaximize={() => toggleMaximize("certificates")}
        onFocus={() => focusWindow("certificates")}
      >
        <Certificates data={portfolioData?.certificates} />
      </Window>

      {/* Context Menu */}
      <ContextMenu
        {...contextMenu}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onRefresh={handleRefresh}
        onChangeBackground={changeBackground}
        onCreateFolder={handleCreateFolder}
      />

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <StartMenu
            isOpen={isStartOpen}
            onClose={() => setIsStartOpen(false)}
            onAppClick={(id) => openWindow(id as WindowId)}
            onShutdown={handleShutdown}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        onWindowClick={(id) => handleTaskbarClick(id as WindowId)}
        activeWindowId={activeWindowId}
      />
    </div>
  );
}
