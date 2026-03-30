import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from "lucide-react";

// ── Real contact data ──────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "iitpatnaalokranjan@gmail.com",
    href: "mailto:iitpatnaalokranjan@gmail.com",
    color: "#60a5fa",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6202585952",
    href: "tel:+916202585952",
    color: "#34d399",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bokaro, Jharkhand, India",
    href: null,
    color: "#f472b6",
  },
];

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Alok595",
    color: "#e2e8f0",
    handle: "@Alok595",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/alok-ranjan-193a84298",
    color: "#60a5fa",
    handle: "alok-ranjan",
  },
];

// ── Mailto builder ─────────────────────────────────────────────────────────────
function buildMailto(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  const body = `Hi Alok,\n\nMy name is ${name} (${email}).\n\n${message}`;
  return `mailto:iitpatnaalokranjan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;
    setSending(true);
    // Simulate brief loading then open mailto
    setTimeout(() => {
      window.location.href = buildMailto(
        form.name,
        form.email,
        form.subject,
        form.message,
      );
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const inputClass = (field: keyof typeof form) =>
    `w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none placeholder:text-white/15 ${
      errors[field]
        ? "bg-red-500/10 border border-red-500/50 text-white focus:border-red-400"
        : "bg-white/[0.04] border border-white/10 text-white/90 focus:border-blue-500/60 focus:bg-white/[0.06]"
    }`;

  return (
    <div
      className="flex flex-col h-full text-white overflow-y-auto"
      style={{
        background: "#07070e",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #60a5fa, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #f472b6, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-8 py-10 space-y-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Alok Ranjan · IIT Patna
          </p>
          <h1
            className="text-5xl font-black leading-none text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            Let's Talk<span style={{ color: "#60a5fa" }}>.</span>
          </h1>
          <p className="text-sm text-white/40 max-w-md leading-relaxed pt-1">
            Open to internships, freelance projects, and interesting
            collaborations. Drop a message — I reply fast.
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Left panel ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    whileHover={
                      { backgroundColor: "rgba(255,255,255,0.05)" } as any
                    }
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-white/75 truncate group-hover:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowUpRight
                        size={14}
                        className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: item.color }}
                      />
                    )}
                  </motion.div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl space-y-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20">
                Find me online
              </p>
              <div className="space-y-2">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        textDecoration: "none",
                      }}
                    >
                      <Icon size={16} style={{ color: s.color }} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                          {s.label}
                        </span>
                        <span className="text-[10px] text-white/25 ml-2">
                          {s.handle}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-60 transition-opacity text-white"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#34d399" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: "#34d399" }}
                />
              </span>
              <span className="text-xs font-bold" style={{ color: "#6ee7b7" }}>
                Available for opportunities
              </span>
            </motion.div>
          </div>

          {/* ── Right: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-3 rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(96,165,250,0.12), transparent)",
              }}
            />

            <div className="relative z-10 space-y-5">
              <div>
                <h2 className="text-lg font-black text-white/90 tracking-tight">
                  Send a Message
                </h2>
                <p className="text-[11px] text-white/30 mt-0.5">
                  Fills your mail client — no server needed.
                </p>
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={inputClass("name")}
                    placeholder="Your name"
                    value={form.name}
                    onChange={set("name")}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-400">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={inputClass("email")}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                  Subject
                </label>
                <input
                  type="text"
                  className={inputClass("subject")}
                  placeholder="Project inquiry / Collaboration / Just saying hi"
                  value={form.subject}
                  onChange={set("subject")}
                />
                {errors.subject && (
                  <p className="text-[10px] text-red-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                  Message
                </label>
                <textarea
                  rows={5}
                  className={inputClass("message")}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  value={form.message}
                  onChange={set("message")}
                />
                {errors.message && (
                  <p className="text-[10px] text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-xl"
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.25)",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: "#34d399" }} />
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#6ee7b7" }}
                    >
                      Mail client opened! Message ready to send.
                    </span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    onClick={handleSend}
                    disabled={sending}
                    whileHover={sending ? {} : { scale: 1.02 }}
                    whileTap={sending ? {} : { scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2.5 transition-all duration-200"
                    style={{
                      background: sending ? "rgba(96,165,250,0.4)" : "#2563eb",
                      color: "#fff",
                      boxShadow: sending
                        ? "none"
                        : "0 8px 32px rgba(37,99,235,0.35)",
                      cursor: sending ? "not-allowed" : "pointer",
                      border: "none",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Opening Mail…
                      </>
                    ) : (
                      <>
                        <Send
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                        Send Message
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default Contact;
