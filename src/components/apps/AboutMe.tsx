import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  User,
  Github,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { ReactNode } from "react";
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const profile = {
  name: "Alok Ranjan",
  title: "Full Stack Developer",
  subtitle: "Data Analyst · IIT Patna",
  bio: "BSc (Hons) CS & Data Analytics student at IIT Patna (CGPA 8.19), passionate about building full-stack web applications and exploring data science. Experienced with the MERN stack, Next.js, real-time systems, and machine learning tools.",
  phone: "+91-6202585952",
  email: "iitpatnaalokranjan@gmail.com",
  location: "IIT Patna, Bihar",
  github: "https://github.com",
  linkedin: "https://linkedin.com/in/alok-ranjan-193a84298",
};

const education = [
  {
    degree: "BSc (Hons) CS & Data Analytics",
    school: "IIT Patna",
    year: "2025–Present",
    score: "8.19 CGPA",
  },
  {
    degree: "Senior Secondary (XII)",
    school: "CBSE Board",
    year: "2022",
    score: "84.2%",
  },
  { degree: "Secondary (X)", school: "CBSE Board", year: "2020", score: "76%" },
];

const experience = [
  {
    role: "MERN Full-Stack Developer Intern",
    company: "UpToSkills",
    period: "Dec 2025 – Present",
    description:
      "Contributing to an AI Resume Builder product. Built Admin Panel features, designed REST APIs for dashboard data flow, and improved the CV creation module.",
  },
  {
    role: "Hybrid Integrated Internship",
    company: "GUVI (HCL Group)",
    period: "Jun – Sep 2025",
    description:
      "Worked on real-world industry challenges focusing on Python, MySQL, Data Science, TensorFlow, scikit-learn, and Deep Learning.",
  },
];

const projects = [
  {
    name: "Kirana Grocery Delivery App",
    stack: ["Next.js", "TypeScript", "Socket.IO", "Stripe"],
    period: "Dec 2025 – Feb",
    description:
      "Real-time grocery delivery platform with 3 user roles, live maps (Leaflet), OTP verification, and Stripe payments.",
  },
  {
    name: "WallPaperBot",
    stack: ["MERN", "Redux", "Firebase Auth", "Cloudinary"],
    period: "Jul 2025 – Present",
    description:
      "Wallpaper platform with role-based access, JWT + Firebase Auth, and Cloudinary image handling.",
  },
  {
    name: "BotWears",
    stack: ["MERN", "Google OAuth", "AI Voice Nav"],
    period: "Nov 2025 – Present",
    description:
      "E-commerce platform with Admin/User dashboards, product filters, search, and AI voice navigation.",
  },
];

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Redux",
  "TypeScript",
  "Python",
  "Tailwind CSS",
  "MySQL",
  "Socket.IO",
  "scikit-learn",
  "React Native",
  "Git",
  "PowerBI",
];

const certifications = [
  "React Native Mobile App Dev – GeeksforGeeks",
  "Data Science – GUVI | HCL",
];

/* ─────────────────────────────────────────────
   HERO BANNER
───────────────────────────────────────────── */
function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      alpha: number;
    };
    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.45 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147,197,253,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center"
      style={{ background: "#070d1a" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse,rgba(59,130,246,0.13),transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[280px] h-[280px] rounded-full blur-[90px]"
          style={{ background: "rgba(99,102,241,0.08)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-[220px] h-[220px] rounded-full blur-[80px]"
          style={{ background: "rgba(6,182,212,0.06)" }}
        />
      </div>

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Decorative ellipses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="50%"
          cy="50%"
          rx="43%"
          ry="39%"
          fill="none"
          stroke="rgba(148,163,184,0.045)"
          strokeWidth="1"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="49%"
          ry="45%"
          fill="none"
          stroke="rgba(148,163,184,0.025)"
          strokeWidth="1"
        />
      </svg>

      {/* Corner brackets */}
      {[
        "top-7 left-7 border-l-2 border-t-2 rounded-tl-sm",
        "top-7 right-7 border-r-2 border-t-2 rounded-tr-sm",
        "bottom-7 left-7 border-l-2 border-b-2 rounded-bl-sm",
        "bottom-7 right-7 border-r-2 border-b-2 rounded-br-sm",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 border-blue-400/25 ${cls}`}
        />
      ))}

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
        }}
      >
        {/* Status badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm"
          style={{
            borderColor: "rgba(96,165,250,0.2)",
            background: "rgba(96,165,250,0.05)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[3px] uppercase text-blue-300/70">
            Available for opportunities
          </span>
        </div>

        {/* Name — big display */}
        <div className="relative mb-3 leading-none select-none">
          <h1
            className="font-black tracking-tighter"
            style={{
              fontSize: "clamp(56px,11vw,128px)",
              lineHeight: 0.92,
              fontFamily: "Georgia, 'Times New Roman', serif",
              background:
                "linear-gradient(140deg,#e2e8f0 0%,#93c5fd 38%,#6366f1 68%,#a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Alok
            <br />
            Ranjan
          </h1>
          {/* Glow beneath name */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-10 blur-2xl"
            style={{ background: "rgba(99,102,241,0.22)" }}
          />
        </div>

        {/* Separator */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-px w-14"
            style={{
              background:
                "linear-gradient(to right,transparent,rgba(96,165,250,0.5))",
            }}
          />
          <span
            className="text-[10px] tracking-[5px] uppercase font-medium"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            IIT Patna · CS &amp; DA
          </span>
          <div
            className="h-px w-14"
            style={{
              background:
                "linear-gradient(to left,transparent,rgba(96,165,250,0.5))",
            }}
          />
        </div>

        {/* Role pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            "Full Stack Developer",
            "MERN Stack",
            "Data Analyst",
            "Next.js",
          ].map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(203,213,225,0.85)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p
          className="max-w-lg text-[13px] leading-relaxed mb-7"
          style={{ color: "rgba(148,163,184,0.75)" }}
        >
          {profile.bio}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href={profile.github}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(226,232,240,0.9)",
            }}
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "rgba(147,197,253,0.95)",
            }}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "rgba(165,180,252,0.95)",
            }}
          >
            <Mail size={14} /> Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-10">
          {[
            ["8.19", "CGPA"],
            ["3+", "Projects"],
            ["2", "Internships"],
          ].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <p className="text-2xl font-black text-white">{val}</p>
              <p
                className="text-[9px] tracking-widest uppercase mt-0.5"
                style={{ color: "rgba(100,116,139,1)" }}
              >
                {lbl}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
        style={{ color: "rgba(100,116,139,0.7)" }}
      >
        <span className="text-[8px] tracking-[3px] uppercase">Scroll</span>
        <ChevronDown size={13} />
      </div>

      {/* Fade to body */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top,#1a1a1a,transparent)" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function AboutMe() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white/90 overflow-y-auto">
      <HeroBanner />

      <div className="px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto w-full">
        {/* ── Left ── */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <section className="space-y-4">
            <SectionHeader
              icon={<User size={14} className="text-blue-400" />}
              label="About Me"
              iconBg="bg-blue-500/10"
            />
            <p className="text-[15px] leading-relaxed text-white/60">
              {profile.bio}
            </p>
          </section>

          <section className="space-y-5">
            <SectionHeader
              icon={<Briefcase size={14} className="text-purple-400" />}
              label="Internships"
              iconBg="bg-purple-500/10"
            />
            <div className="flex flex-col gap-6">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-5 border-l border-white/10 group"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-purple-400 transition-colors" />
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <span className="text-sm font-semibold text-white/90">
                      {exp.role}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-white/5 text-white/30 px-2 py-1 rounded-md">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mt-1 mb-2">
                    {exp.company}
                  </p>
                  <p className="text-[13px] text-white/45 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <SectionHeader
              icon={<Code2 size={14} className="text-emerald-400" />}
              label="Projects"
              iconBg="bg-emerald-500/10"
            />
            <div className="flex flex-col gap-3">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 space-y-2 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-white/90">
                      {proj.name}
                    </span>
                    <span className="text-[10px] text-white/25 shrink-0">
                      {proj.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/40 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right ── */}
        <div className="flex flex-col gap-8">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <p className="text-[9px] font-bold tracking-[3px] uppercase text-white/20">
              Contact
            </p>
            <ContactRow
              icon={<Phone size={14} />}
              label="Phone"
              value={profile.phone}
            />
            <ContactRow
              icon={<Mail size={14} />}
              label="Email"
              value={profile.email}
            />
            <ContactRow
              icon={<MapPin size={14} />}
              label="Location"
              value={profile.location}
            />
          </div>

          <section className="space-y-4">
            <SectionHeader
              icon={<GraduationCap size={14} className="text-emerald-400" />}
              label="Education"
            />
            <div className="flex flex-col gap-4">
              {education.map((edu, i) => (
                <div key={i} className="group space-y-0.5">
                  <p className="text-[13px] font-semibold text-white/90 group-hover:text-emerald-400 transition-colors">
                    {edu.degree}
                  </p>
                  <p className="text-[11px] text-white/40">{edu.school}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/60">
                    {edu.year} · {edu.score}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader
              icon={<Code2 size={14} className="text-blue-400" />}
              label="Skills"
            />
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-semibold bg-white/5 text-white/60 border border-white/[0.08] px-2.5 py-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader
              icon={<Award size={14} className="text-amber-400" />}
              label="Certifications"
            />
            <div className="flex flex-col gap-2">
              {certifications.map((c, i) => (
                <p
                  key={i}
                  className="text-[12px] text-white/55 leading-relaxed"
                >
                  {c}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="h-16 shrink-0" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function SectionHeader({
  icon,
  label,
  iconBg,
}: {
  icon: ReactNode;
  label: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {iconBg ? (
        <div
          className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center`}
        >
          {icon}
        </div>
      ) : (
        icon
      )}
      <span className="text-[10px] font-bold uppercase tracking-[3px] text-white/30">
        {label}
      </span>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">
          {label}
        </p>
        <p className="text-[12px] font-semibold text-white/80 mt-0.5 break-all">
          {value}
        </p>
      </div>
    </div>
  );
}
