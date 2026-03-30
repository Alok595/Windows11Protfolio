import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Zap,
  ShoppingBag,
} from "lucide-react";

const projects = [
  {
    id: "kirana",
    index: "01",
    title: "Kirana",
    subtitle: "Grocery Delivery App",
    label: "FULL-STACK · NEXT.JS · TYPESCRIPT",
    period: "Dec 2025 – Feb 2026",
    description:
      "Real-time grocery delivery platform for local kirana stores with multi-role architecture — User, Admin, and Delivery Agent — all operating in sync.",
    highlights: [
      "Real-time maps & live location tracking via Leaflet + Socket.IO",
      "OTP-based order delivery verification + in-app live chat",
      "Stripe payments, Recharts dashboards, Cloudinary media",
      "Google OAuth · NextAuth · Redux state management",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Socket.IO",
      "Stripe",
      "Redux",
      "Leaflet",
      "MongoDB",
    ],
    github: "https://github.com/Alok595/KiranaGroceryStore",
    demo: "https://kirana-eta.vercel.app/", 
    color: "#22c55e",
    accentLight: "#bbf7d0",
    icon: <Zap size={18} />,
  },
  {
    id: "wallpaperbot",
    index: "02",
    title: "WallPaperBot",
    subtitle: "MERN Wallpaper Platform",
    label: "FULL-STACK · MERN · ROLE-BASED",
    period: "Jul 2025 – Present",
    description:
      "Feature-rich wallpaper discovery platform with role-based access control for Owners and Users, powered by a full MERN stack.",
    highlights: [
      "JWT + Firebase Auth for secure multi-role signup & login",
      "REST APIs with Node.js / Express / MongoDB backend",
      "ReactJS + Redux + Tailwind CSS frontend",
      "Image uploads via Cloudinary + Multer pipeline",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Redux",
      "Cloudinary",
    ],
    github: "https://github.com/Alok595/WallPaperBotProject",
    demo: "https://wallpaperbotproject-1.onrender.com/", 
    color: "#818cf8",
    accentLight: "#c7d2fe",
    icon: <Layers size={18} />,
  },
  {
    id: "botwears",
    index: "03",
    title: "BotWears",
    subtitle: "MERN E-Commerce Platform",
    label: "FULL-STACK · E-COMMERCE · AI VOICE",
    period: "Nov 2025 – Present",
    description:
      "Full-featured e-commerce platform with separate Admin and User dashboards, AI voice navigation, and intelligent product discovery.",
    highlights: [
      "AI voice navigation for hands-free product browsing",
      "Smart product filters, search & recommendation engine",
      "Admin dashboard with full inventory management",
      "Google OAuth + JWT dual-layer secure authentication",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Google OAuth",
      "JWT",
      "Tailwind",
    ],
    github: "https://github.com/Alok595/BotWearsFullStack",
    demo: "https://botwearsfullstack-frontendone.onrender.com/", // 🔁 Replace with your URL
    color: "#f59e0b",
    accentLight: "#fde68a",
    icon: <ShoppingBag size={18} />,
  },
];

export const Projects: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="flex flex-col h-full text-white select-none overflow-hidden"
      style={{
        background: "#0a0a0f",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #818cf8, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #22c55e, transparent)",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-end justify-between px-10 pt-10 pb-6 shrink-0 border-b border-white/[0.06]">
        <div>
          <p className="text-[10px] font-bold tracking-[0.35em] text-white/25 uppercase mb-2">
            Alok Ranjan · IIT Patna
          </p>
          <h1
            className="text-4xl font-black tracking-tight text-white leading-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            Projects<span style={{ color: "#818cf8" }}>.</span>
          </h1>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">
            MERN · Next.js · TypeScript
          </span>
          <div className="flex gap-2">
            {["Full-Stack", "AI", "Real-Time"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project list */}
      <div className="relative z-10 flex-1 overflow-y-auto px-10 py-8 space-y-5">
        {projects.map((project, i) => {
          const isActive = active === project.id;
          const isHovered = hovered === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              onHoverStart={() => setHovered(project.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setActive(isActive ? null : project.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: isActive
                  ? `1px solid ${project.color}55`
                  : "1px solid rgba(255,255,255,0.06)",
                background: isActive
                  ? `linear-gradient(135deg, ${project.color}12, rgba(255,255,255,0.02))`
                  : "rgba(255,255,255,0.02)",
                transition: "border-color 0.3s, background 0.3s",
              }}
            >
              {/* Hover glow line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                animate={{ opacity: isHovered || isActive ? 1 : 0 }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                }}
              />

              {/* Main row */}
              <div className="flex items-center gap-6 px-7 py-5">
                <span
                  className="text-[11px] font-black tabular-nums shrink-0"
                  style={{
                    color: project.color,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  {project.index}
                </span>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${project.color}18`,
                    color: project.color,
                  }}
                >
                  {project.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3
                      className="text-xl font-black tracking-tight"
                      style={{
                        color:
                          isActive || isHovered
                            ? project.color
                            : "rgba(255,255,255,0.9)",
                        transition: "color 0.2s",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {project.subtitle}
                    </span>
                  </div>
                  <p
                    className="text-[10px] font-black tracking-[0.25em] mt-0.5"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {project.label}
                  </p>
                </div>

                <span
                  className="text-[10px] font-medium tracking-wide shrink-0 hidden md:block"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {project.period}
                </span>

                <div className="hidden xl:flex gap-1.5 flex-wrap max-w-[220px] justify-end shrink-0">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest"
                      style={{
                        background: `${project.color}15`,
                        color: project.accentLight,
                        border: `1px solid ${project.color}25`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <motion.div
                  animate={{ rotate: isActive ? 45 : 0 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: isActive
                      ? `${project.color}20`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isActive ? project.color + "40" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  <ArrowUpRight
                    size={14}
                    style={{
                      color: isActive ? project.color : "rgba(255,255,255,0.3)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Expandable detail panel */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mx-7 mb-6 mt-1 rounded-xl p-6"
                      style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: description + highlights */}
                        <div className="space-y-4">
                          <p
                            className="text-sm leading-relaxed font-medium"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {project.description}
                          </p>
                          <ul className="space-y-2">
                            {project.highlights.map((h, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.07 }}
                                className="flex items-start gap-2.5 text-xs font-medium"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ background: project.color }}
                                />
                                {h}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: tech stack + buttons */}
                        <div className="space-y-5 flex flex-col justify-between">
                          <div>
                            <p
                              className="text-[9px] font-black tracking-[0.3em] uppercase mb-3"
                              style={{ color: "rgba(255,255,255,0.2)" }}
                            >
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider"
                                  style={{
                                    background: `${project.color}15`,
                                    color: project.accentLight,
                                    border: `1px solid ${project.color}30`,
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            {/* GitHub Source */}
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest"
                              style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.6)",
                                textDecoration: "none",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={14} />
                              Source
                            </motion.a>

                            {/* Live Demo — opens project.demo in new tab */}
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest"
                              style={{
                                background: project.color,
                                color: "#000",
                                textDecoration: "none",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                              Live Demo
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="relative z-10 px-10 py-4 shrink-0 border-t border-white/[0.05] flex items-center justify-between">
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-bold"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {projects.length} Projects · Click to expand
        </span>
        <a
          href="https://github.com/Alok595"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
        >
          <Github size={12} />
          View All on GitHub
        </a>
      </div>
    </div>
  );
};

export default Projects;
