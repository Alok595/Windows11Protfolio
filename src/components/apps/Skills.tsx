import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Wrench,
  BookOpen,
  ChevronDown,
  Sparkles,
} from "lucide-react";

// ─── Alok's actual data from resume ───────────────────────────────────────────
interface Skill {
  name: string;
  tag?: string;
}

interface SkillGroup {
  category: string;
  icon: ReactNode;
  color: string;
  glow: string;
  border: string;
  textColor: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming",
    icon: <Code2 size={16} />,
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.15)",
    border: "rgba(96,165,250,0.25)",
    textColor: "#93c5fd",
    skills: [{ name: "Python" }, { name: "JavaScript" }, { name: "SQL" }],
  },
  {
    category: "Web & App",
    icon: <Globe size={16} />,
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.25)",
    textColor: "#6ee7b7",
    skills: [
      { name: "HTML / CSS / JS" },
      { name: "ReactJS" },
      { name: "Next.js" },
      { name: "React Native" },
      { name: "TypeScript", tag: "Kirana App" },
    ],
  },
  {
    category: "Backend & Database",
    icon: <Database size={16} />,
    color: "#f472b6",
    glow: "rgba(244,114,182,0.15)",
    border: "rgba(244,114,182,0.25)",
    textColor: "#f9a8d4",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "REST APIs" },
      { name: "Socket.IO", tag: "Real-time" },
    ],
  },
  {
    category: "Libraries & Frameworks",
    icon: <Layers size={16} />,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.25)",
    textColor: "#c4b5fd",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "scikit-learn" },
      { name: "TensorFlow" },
      { name: "Tailwind CSS" },
      { name: "Redux Toolkit" },
      { name: "Framer Motion" },
    ],
  },
  {
    category: "Tools & OS",
    icon: <Wrench size={16} />,
    color: "#fb923c",
    glow: "rgba(251,146,60,0.15)",
    border: "rgba(251,146,60,0.25)",
    textColor: "#fdba74",
    skills: [
      { name: "Git" },
      { name: "VSCode" },
      { name: "Postman" },
      { name: "Google Colab" },
      { name: "PowerBI" },
    ],
  },
  {
    category: "Key Courses",
    icon: <BookOpen size={16} />,
    color: "#facc15",
    glow: "rgba(250,204,21,0.15)",
    border: "rgba(250,204,21,0.25)",
    textColor: "#fde047",
    skills: [
      { name: "Data Mining" },
      { name: "DBMS" },
      { name: "Machine Learning" },
      { name: "Data Science" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const Skills: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>("Web & App");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const toggle = (cat: string) =>
    setOpenCategory((prev) => (prev === cat ? null : cat));

  const totalSkills = SKILL_GROUPS.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <div
      className="flex flex-col h-full text-white select-none overflow-hidden"
      style={{
        background: "#080810",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
      }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.07), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.06), transparent 70%)",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <div
        className="relative z-10 px-8 pt-8 pb-6 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={12} style={{ color: "#facc15" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em]"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Alok Ranjan · IIT Patna
              </span>
            </div>
            <h1
              className="text-3xl font-black leading-none"
              style={{
                letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Tech Stack<span style={{ color: "#60a5fa" }}>_</span>
            </h1>
          </div>
          <div className="text-right">
            <div
              className="text-4xl font-black leading-none"
              style={{
                color: "rgba(255,255,255,0.08)",
                letterSpacing: "-0.05em",
              }}
            >
              {totalSkills}
            </div>
            <div
              className="text-[9px] font-bold uppercase tracking-[0.3em] mt-1"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              Skills
            </div>
          </div>
        </div>

        {/* Category count pills */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {SKILL_GROUPS.map((g) => (
            <button
              key={g.category}
              onClick={() => toggle(g.category)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-200"
              style={{
                background:
                  openCategory === g.category
                    ? g.glow
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  openCategory === g.category
                    ? g.border
                    : "rgba(255,255,255,0.07)"
                }`,
                color:
                  openCategory === g.category
                    ? g.textColor
                    : "rgba(255,255,255,0.25)",
              }}
            >
              <span
                style={{
                  color: openCategory === g.category ? g.color : "inherit",
                }}
              >
                {g.icon}
              </span>
              {g.category}
            </button>
          ))}
        </div>
      </div>

      {/* ── Accordion list ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-5 space-y-2">
        {SKILL_GROUPS.map((group, i) => {
          const isOpen = openCategory === group.category;

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: isOpen
                  ? `1px solid ${group.border}`
                  : "1px solid rgba(255,255,255,0.06)",
                background: isOpen
                  ? `linear-gradient(135deg, ${group.glow}, rgba(255,255,255,0.01))`
                  : "rgba(255,255,255,0.02)",
                transition: "border-color 0.3s, background 0.3s",
              }}
            >
              {/* Row header */}
              <button
                className="w-full flex items-center gap-4 px-6 py-4 text-left"
                onClick={() => toggle(group.category)}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: isOpen ? group.glow : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isOpen ? group.border : "rgba(255,255,255,0.07)"}`,
                    color: isOpen ? group.color : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s",
                  }}
                >
                  {group.icon}
                </div>

                {/* Category name */}
                <div className="flex-1">
                  <span
                    className="text-sm font-black uppercase tracking-wider"
                    style={{
                      color: isOpen ? group.textColor : "rgba(255,255,255,0.5)",
                      transition: "color 0.2s",
                    }}
                  >
                    {group.category}
                  </span>
                  {!isOpen && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {group.skills.slice(0, 4).map((s) => (
                        <span
                          key={s.name}
                          className="text-[9px]"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          {s.name}
                          {group.skills.indexOf(s) < 3
                            ? " ·"
                            : group.skills.length > 4
                              ? " ···"
                              : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Count badge */}
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-md"
                  style={{
                    background: isOpen ? group.glow : "rgba(255,255,255,0.04)",
                    color: isOpen ? group.color : "rgba(255,255,255,0.2)",
                    border: `1px solid ${isOpen ? group.border : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {group.skills.length}
                </span>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown
                    size={15}
                    style={{
                      color: isOpen ? group.color : "rgba(255,255,255,0.2)",
                    }}
                  />
                </motion.div>
              </button>

              {/* Expandable skills */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-1">
                      {/* Divider */}
                      <div
                        className="mb-4 h-px"
                        style={{
                          background: `linear-gradient(90deg, ${group.border}, transparent)`,
                        }}
                      />
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill, j) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: j * 0.05,
                              type: "spring",
                              stiffness: 200,
                            }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-default"
                            style={{
                              background:
                                hoveredSkill === skill.name
                                  ? group.glow
                                  : "rgba(255,255,255,0.04)",
                              border: `1px solid ${
                                hoveredSkill === skill.name
                                  ? group.border
                                  : "rgba(255,255,255,0.07)"
                              }`,
                              transition: "all 0.2s",
                              transform:
                                hoveredSkill === skill.name
                                  ? "translateY(-2px)"
                                  : "none",
                            }}
                          >
                            {/* Dot */}
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                background: group.color,
                                boxShadow:
                                  hoveredSkill === skill.name
                                    ? `0 0 8px ${group.color}`
                                    : "none",
                              }}
                            />
                            <span
                              className="text-xs font-bold"
                              style={{
                                color:
                                  hoveredSkill === skill.name
                                    ? group.textColor
                                    : "rgba(255,255,255,0.65)",
                              }}
                            >
                              {skill.name}
                            </span>
                            {skill.tag && (
                              <span
                                className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                                style={{
                                  background: `${group.color}20`,
                                  color: group.color,
                                  border: `1px solid ${group.color}30`,
                                }}
                              >
                                {skill.tag}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Bottom spacer */}
        <div className="h-6" />
      </div>

      {/* ── Footer ── */}
      <div
        className="relative z-10 px-8 py-4 shrink-0 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span
          className="text-[9px] font-bold uppercase tracking-[0.35em]"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          BSC(CSDA) · IIT Patna · 8.19 CGPA
        </span>
        <span
          className="text-[9px] font-bold uppercase tracking-[0.35em]"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          Click category to expand
        </span>
      </div>
    </div>
  );
};

export default Skills;
