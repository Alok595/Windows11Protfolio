import React, { useState } from "react";
import {
  Folder,
  ChevronRight,
  ChevronLeft,
  Search,
  LayoutGrid,
  List,
  Home,
  Star,
  HardDrive,
  Trash2,
  ExternalLink,
  Plus,
  ArrowUp,
  RefreshCw,
  MoreHorizontal,
  Info,
  Briefcase,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { FileItem } from "@/src/types";

interface FileExplorerProps {
  onFileClick: (id: string) => void;
  onDeleteFile?: (file: FileItem) => void;
  onOpenFile?: (name: string, content: string, url?: string) => void;
  capturedPhotos?: string[];
  fileSystem?: FileItem[];
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  onFileClick,
  onDeleteFile,
  onOpenFile,
  capturedPhotos = [],
  fileSystem = [],
}) => {
  const [currentPath, setCurrentPath] = useState<string[]>([
    "This PC",
    "Projects",
  ]);
  const [history, setHistory] = useState<string[][]>([["This PC", "Projects"]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    file: FileItem | null;
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getFilesForPath = (path: string[]) => {
    if (path[0] === "This PC" && path.length === 1) {
      return [
        {
          id: "projects",
          name: "Projects",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/fluency/48/000000/briefcase.png"
              alt="Projects"
              className="w-10 h-10 object-contain"
            />
          ),
        },
        {
          id: "internships",
          name: "Internships & Experience",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/?size=100&id=sjU25OaHSsIN&format=png&color=000000"
              alt="Internships"
              className="w-10 h-10 object-contain"
            />
          ),
        },
        {
          id: "skills",
          name: "Skills",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/fluency/48/000000/code.png"
              alt="Skills"
              className="w-10 h-10 object-contain"
            />
          ),
        },
        {
          id: "certificates",
          name: "Certificates",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/fluency/48/000000/certificate.png"
              alt="Certificates"
              className="w-10 h-10 object-contain"
            />
          ),
        },
        {
          id: "pictures",
          name: "Pictures",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/fluency/48/000000/pictures-folder.png"
              alt="Pictures"
              className="w-10 h-10 object-contain"
            />
          ),
        },
        {
          id: "drive-c",
          name: "Local Disk (C:)",
          type: "folder",
          icon: (
            <img
              src="https://img.icons8.com/?size=100&id=9914&format=png&color=000000"
              alt="Hard Drive"
              className="w-10 h-10 object-contain"
            />
          ),
        },
      ];
    }

    const findFolder = (
      items: FileItem[],
      targetPath: string[],
    ): FileItem[] => {
      const currentFolderName = targetPath[targetPath.length - 1];

      if (currentFolderName === "Pictures") {
        return capturedPhotos.map((photo, index) => ({
          id: `photo-${index}`,
          name: `Photo_${index + 1}.png`,
          icon: photo,
          type: "file",
          fileType: "PNG Image",
        }));
      }

      const recursiveSearch = (
        currentItems: FileItem[],
        depth: number,
      ): FileItem[] => {
        for (const item of currentItems) {
          if (item.name === targetPath[depth]) {
            if (depth === targetPath.length - 1) {
              return item.content || [];
            }
            if (item.content) {
              return recursiveSearch(item.content, depth + 1);
            }
          }
        }
        return [];
      };

      return recursiveSearch(fileSystem, 0);
    };

    return findFolder(fileSystem, path);
  };

  const navigateTo = (newPath: string[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(newPath);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goUp = () => {
    if (currentPath.length > 1) {
      navigateTo(currentPath.slice(0, -1));
    }
  };

  const handleFileAction = (file: FileItem) => {
    if (file.type === "folder" && !file.textContent) {
      navigateTo([...currentPath, file.name]);
    } else {
      if (
        (file.name.endsWith(".txt") || file.textContent) &&
        onOpenFile &&
        file.textContent
      ) {
        onOpenFile(file.name, file.textContent, file.url);
      } else if (file.url) {
        window.open(file.url, "_blank", "noopener,noreferrer");
      } else {
        onFileClick(file.id);
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const files = getFilesForPath(currentPath);

  const sidebarItems = [
    {
      name: "Home",
      icon: <Home size={16} className="text-blue-400" />,
      onClick: () => navigateTo(["This PC"]),
    },
    {
      name: "Quick Access",
      icon: <Star size={16} className="text-yellow-400" />,
    },
    {
      name: "Projects",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/000000/briefcase.png"
          alt="Projects"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.includes("Projects"),
      onClick: () => navigateTo(["This PC", "Projects"]),
    },
    {
      name: "Internships",
      icon: (
        <img
          src="https://img.icons8.com/?size=100&id=sjU25OaHSsIN&format=png&color=000000"
          alt="Internships"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.includes("Internships & Experience"),
      onClick: () => navigateTo(["This PC", "Internships & Experience"]),
    },
    {
      name: "Skills",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/000000/code.png"
          alt="Skills"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.includes("Skills"),
      onClick: () => navigateTo(["This PC", "Skills"]),
    },
    {
      name: "Certificates",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/000000/certificate.png"
          alt="Certificates"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.includes("Certificates"),
      onClick: () => navigateTo(["This PC", "Certificates"]),
    },
    {
      name: "Pictures",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/000000/pictures-folder.png"
          alt="Pictures"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.includes("Pictures"),
      onClick: () => navigateTo(["This PC", "Pictures"]),
    },
    {
      name: "This PC",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/000000/monitor.png"
          alt="This PC"
          className="w-4 h-4 object-contain"
        />
      ),
      active: currentPath.length === 1 && currentPath[0] === "This PC",
      onClick: () => navigateTo(["This PC"]),
    },
  ];

  return (
    <div
      className="flex flex-col h-full bg-[#1c1c1c] text-white/90 select-none font-sans"
      onClick={() => setContextMenu(null)}
    >
      {/* Toolbar */}
      <div className="h-14 border-b border-white/10 flex items-center px-4 gap-2 shrink-0 bg-white/[0.03]">
        <div className="flex items-center gap-1 pr-4 border-r border-white/10">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-all text-[11px] font-bold uppercase tracking-wider group">
            <Plus
              size={14}
              className="text-blue-400 group-hover:scale-110 transition-transform"
            />
            <span>New</span>
          </button>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-white/10">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-2 hover:bg-white/5 rounded-lg disabled:opacity-20 transition-all active:scale-90"
            title="Back"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="p-2 hover:bg-white/5 rounded-lg disabled:opacity-20 transition-all active:scale-90"
            title="Forward"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={goUp}
            className="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-90"
            title="Up"
          >
            <ArrowUp size={18} />
          </button>
          <button
            onClick={() => navigateTo(currentPath)}
            className="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-90"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-white/40" />
          </button>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg h-9 flex items-center px-3 gap-2 overflow-hidden focus-within:bg-white/[0.05] focus-within:border-blue-500/50 transition-all">
            <HardDrive size={14} className="text-white/20" />
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {currentPath.map((p, i) => (
                <React.Fragment key={p + i}>
                  <button
                    className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 px-2 py-1 rounded-md transition-all whitespace-nowrap active:scale-95"
                    onClick={() => navigateTo(currentPath.slice(0, i + 1))}
                  >
                    {p}
                  </button>
                  {i < currentPath.length - 1 && (
                    <ChevronRight
                      size={12}
                      className="text-white/10 shrink-0"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="w-64 bg-white/[0.03] border border-white/10 rounded-lg h-9 flex items-center px-3 gap-2 focus-within:bg-white/[0.05] focus-within:border-blue-500/50 transition-all">
            <Search size={14} className="text-white/20" />
            <input
              className="bg-transparent border-none outline-none text-[11px] font-medium w-full placeholder:text-white/10"
              placeholder={`Search ${currentPath[currentPath.length - 1]}`}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r border-white/10 p-3 flex flex-col gap-1 shrink-0 overflow-y-auto custom-scrollbar bg-white/[0.01]">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] transition-all text-left w-full group relative",
                item.active
                  ? "bg-blue-600/10 text-blue-400 font-bold shadow-[inset_0_0_20px_rgba(59,130,246,0.05)] border border-blue-500/20"
                  : "hover:bg-white/5 text-white/50 hover:text-white border border-transparent",
              )}
            >
              <span className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </span>
              <span className="truncate uppercase tracking-wider">
                {item.name}
              </span>
              {item.active && (
                <motion.div
                  layoutId="active-sidebar"
                  className="absolute left-0 w-1 h-4 bg-blue-500 rounded-r-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* File Grid */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative bg-black/20">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-10 gap-6">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                <Folder size={48} strokeWidth={1} />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                This folder is empty
              </span>
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-[repeat(auto-fill,minmax(110px,1fr))]"
                  : "grid-cols-1",
              )}
            >
              <AnimatePresence mode="popLayout">
                {files.map((file) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={file.id}
                    onDoubleClick={() => handleFileAction(file)}
                    onContextMenu={(e) => handleRightClick(e, file)}
                    onClick={() => onFileClick(file.id)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 hover:bg-white/[0.03] border border-transparent hover:border-white/10 rounded-2xl transition-all group w-full relative cursor-default select-none active:scale-95",
                      viewMode === "list" &&
                        "flex-row items-center justify-start gap-4 p-2",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 drop-shadow-2xl",
                        viewMode === "grid" ? "w-16 h-16" : "w-8 h-8",
                      )}
                    >
                      {typeof file.icon === "string" ? (
                        <img
                          src={file.icon}
                          alt={file.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        file.icon
                      )}
                    </div>
                    <div
                      className={cn(
                        "flex flex-col items-center w-full gap-1",
                        viewMode === "list" && "items-start",
                      )}
                    >
                      <span className="text-[11px] font-bold text-center leading-tight line-clamp-2 break-all text-white/70 group-hover:text-white transition-colors tracking-tight">
                        {file.name}
                      </span>
                      {file.type === "file" && (
                        <span className="text-[9px] text-white/20 font-bold tracking-widest uppercase">
                          {(file as any).fileType}
                        </span>
                      )}
                    </div>

                    {onDeleteFile && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFile(file);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 z-10 shadow-2xl border border-red-500/20"
                      >
                        <Trash2
                          size={12}
                          className="text-red-400 group-hover:text-white"
                        />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Context Menu */}
          {contextMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed z-[1000] win-mica border border-white/10 rounded-2xl shadow-2xl py-2 min-w-[200px] text-[11px] overflow-hidden"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  handleFileAction(contextMenu.file!);
                  setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-all text-left group"
              >
                <Folder
                  size={14}
                  className="text-white/30 group-hover:text-white transition-colors"
                />
                <span className="text-white/90 font-bold uppercase tracking-wider">
                  Open
                </span>
              </button>
              {contextMenu.file?.url && (
                <button
                  onClick={() => {
                    window.open(
                      contextMenu.file!.url,
                      "_blank",
                      "noopener,noreferrer",
                    );
                    setContextMenu(null);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-all text-left text-blue-400 font-bold group"
                >
                  <ExternalLink
                    size={14}
                    className="text-blue-400/70 group-hover:text-blue-400 transition-colors"
                  />
                  <span className="uppercase tracking-wider">Open Link</span>
                </button>
              )}
              <div className="h-px bg-white/10 my-2 mx-3" />
              <button
                onClick={() => setContextMenu(null)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-all text-left group"
              >
                <Info
                  size={14}
                  className="text-white/30 group-hover:text-white transition-colors"
                />
                <span className="text-white/60 uppercase tracking-wider">
                  Properties
                </span>
              </button>
              <button
                onClick={() => {
                  if (onDeleteFile) onDeleteFile(contextMenu.file!);
                  setContextMenu(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-all text-left text-red-400 font-bold group"
              >
                <Trash2
                  size={14}
                  className="text-red-400/70 group-hover:text-red-400 transition-colors"
                />
                <span className="uppercase tracking-wider">Delete</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-white/10 flex items-center px-4 justify-between shrink-0 bg-white/[0.03]">
        <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
          {files.length} items
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              viewMode === "grid"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white/30",
            )}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              viewMode === "list"
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white/30",
            )}
          >
            <List size={14} />
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-white/30 hover:text-white">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
