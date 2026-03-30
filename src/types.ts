import React from "react";

export type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "contact"
  | "terminal"
  | "settings"
  | "explorer"
  | "camera"
  | "recycle-bin"
  | "notepad"
  | "certificates";

export interface WindowState {
  id: WindowId;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  icon?: string;
  fileType?: string;
  content?: FileItem[];
  textContent?: string;
  url?: string;
}

export interface DesktopItem {
  id: string;
  name: string;
  icon: string;
  windowId?: WindowId;
  url?: string;
  type: "app" | "file" | "folder" | "link";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  link: string;
  category: string;
}

export interface PortfolioData {
  projects: Project[];
  skillGroups: {
    category: string;
    skills: { name: string; level: number }[];
  }[];
  about: {
    text: string;
  };
  certificates: {
    title: string;
    issuer: string;
    date: string;
    link: string;
  }[];
  resume: {
    url: string;
    lastUpdated: string;
  };
  fileSystem: FileItem[];
  desktopItems: DesktopItem[];
}
