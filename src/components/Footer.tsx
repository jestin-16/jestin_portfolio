import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  Check,
  Copy,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Radio,
  Server,
  Activity,
  Zap,
  CornerDownLeft,
  Database
} from "lucide-react";
import { JESTIN_BIO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [actuatorPinged, setActuatorPinged] = useState(false);
  const [pingLatency, setPingLatency] = useState<number>(24);
  const [isPinging, setIsPinging] = useState(false);

  // Live India Standard Time (IST) clock display
  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);
    };

    updateIST();
    const timer = setInterval(updateIST, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(JESTIN_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePingHealth = () => {
    if (isPinging) return;
    setIsPinging(true);
    setTimeout(() => {
      setPingLatency(Math.floor(Math.random() * 18) + 14); // 14-32ms
      setActuatorPinged(true);
      setIsPinging(false);
    }, 450);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home", badge: "01" },
    { id: "services", label: "Services", badge: "02" },
    { id: "about", label: "About", badge: "03" },
    { id: "tech", label: "Stack & Skills", badge: "04" },
    { id: "projects", label: "Projects", badge: "05" },
    { id: "experience", label: "Experience", badge: "06" },
    { id: "blog", label: "Articles", badge: "07" },
    { id: "contact", label: "Contact", badge: "08" },
  ];

  const focusAreas = [
    { name: "Spring Boot Microservices", desc: "Decoupled domain architectures", tag: "Java 21" },
    { name: "Cloud & Kubernetes Pods", desc: "Multi-tenant orchestration", tag: "Docker / K8s" },
    { name: "API Gateway & Security", desc: "Zero-Trust OAuth2 & JWT chains", tag: "Security" },
    { name: "High-Throughput Streams", desc: "Event-driven messaging", tag: "Apache Kafka" },
    { name: "Distributed Data & Cache", desc: "Sub-millisecond query access", tag: "Postgres & Redis" },
  ];

  const socials = [
    {
      name: "GitHub",
      url: JESTIN_BIO.socials.github,
      icon: Github,
      tag: "Source Code",
      color: "hover:text-white hover:border-white/30 hover:bg-white/[0.04]",
    },
    {
      name: "LinkedIn",
      url: JESTIN_BIO.socials.linkedin,
      icon: Linkedin,
      tag: "Professional",
      color: "hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/[0.05]",
    },
    {
      name: "Direct Email",
      url: JESTIN_BIO.socials.email,
      icon: Mail,
      tag: "Instant Inbox",
      color: "hover:text-teal-300 hover:border-teal-500/40 hover:bg-teal-500/[0.05]",
    },
  ];

  return (
    <footer className="relative bg-[#0a0b0e] text-neutral-300 border-t border-white/[0.06] select-none overflow-hidden font-sans">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-emerald-500/[0.04] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-teal-500/[0.03] blur-[160px] pointer-events-none rounded-full" />

      {/* Top subtle highlight divider line with gradient accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-16 pb-12 relative z-10">
        
        {/* 1. High-Impact Call-to-Action / Collaboration Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl p-7 sm:p-9 md:p-12 mb-16 bg-gradient-to-br from-[#121520] via-[#0d0f17] to-[#0a0b0e] border border-white/[0.09] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden group"
        >
          {/* Internal ambient corner glows */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all duration-700" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/15 transition-all duration-700" />
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-2xl">
              {/* Radar Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-semibold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Active &bull; Open for Engineering Roles &amp; Collaborations</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-display font-extrabold text-white tracking-tight leading-[1.15]">
                Let&apos;s build robust, resilient{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                  backend architectures
                </span>{" "}
                together.
              </h3>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Looking to architect low-latency Spring Boot microservices, secure zero-trust APIs, or containerize cloud infrastructure? Let&apos;s discuss your engineering goals.
              </p>
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0a0b0e] font-sans font-bold text-sm shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#0a0b0e]" />
                <span>Start a Conversation</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-neutral-200 hover:text-white font-mono text-xs font-medium transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                title="Copy jestinshaji777@gmail.com"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span className="text-emerald-300 font-bold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/[0.06] relative">
          
          {/* Column 1: Identity, Brand & Live IST Clock (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div
                onClick={() => onNavigate("home")}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border border-emerald-500/40 flex items-center justify-center font-mono font-black text-emerald-300 text-sm cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-400 hover:scale-105 transition-all"
                title="Jestin Shaji"
              >
                JS
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-white tracking-wide flex items-center gap-2">
                  Jestin Shaji
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-xs text-neutral-400 font-sans">
                  Backend Java &amp; Cloud Security Specialist
                </p>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm font-sans leading-relaxed">
              Engineering ultra-scalable Spring Boot microservices, zero-trust API security pipelines, and container clouds with low-latency design patterns.
            </p>

            {/* Timezone, Geo & Actuator Telemetry Pill */}
            <div className="space-y-2">
              <div className="inline-flex flex-wrap items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{JESTIN_BIO.location}</span>
                </div>
                <span className="text-neutral-600">&bull;</span>
                <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>{currentTime || "IST (UTC+5:30)"}</span>
                </div>
              </div>

              {/* Interactive Micro Actuator Health Ping */}
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${actuatorPinged ? "bg-emerald-400" : "bg-emerald-400 animate-pulse"}`} />
                    <span className="text-[11px] font-mono text-neutral-300 font-medium">JVM Actuator Endpoint</span>
                  </div>
                  <button
                    onClick={handlePingHealth}
                    disabled={isPinging}
                    className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer disabled:opacity-50"
                    title="Simulate /actuator/health ping"
                  >
                    <Activity className={`w-3 h-3 ${isPinging ? "animate-spin" : ""}`} />
                    <span>{isPinging ? "pinging..." : "probe API"}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/[0.04]">
                  <span className="text-neutral-400">status: <span className="text-emerald-400 font-semibold">&quot;UP&quot;</span></span>
                  <span className="text-neutral-500">&bull;</span>
                  <span className="text-neutral-400">latency: <span className="text-teal-300 font-semibold">{pingLatency}ms</span></span>
                  <span className="text-neutral-500">&bull;</span>
                  <span className="text-neutral-400">jvm: <span className="text-white font-semibold">OpenJDK 21</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Navigation Directory</span>
            </div>
            
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="group text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.03] text-left w-full"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-emerald-500/40 group-hover:text-emerald-400 transition-colors font-bold">&rsaquo;</span>
                      <span className="group-hover:translate-x-0.5 transition-transform truncate">{link.label}</span>
                    </div>
                    <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 font-mono shrink-0 ml-1">
                      {link.badge}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stack Specializations (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Core Stack</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              {focusAreas.map((item, idx) => (
                <li key={idx} className="group flex flex-col">
                  <span className="text-neutral-300 font-sans font-medium text-xs group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
                      {item.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Channels & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Channels &amp; Socials</span>
            </div>

            <div className="space-y-2">
              {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] ${social.color} transition-all group`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-medium text-neutral-300 group-hover:text-white transition-colors leading-none">
                          {social.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 mt-1 leading-none">
                          {social.tag}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors opacity-60 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>

            {/* Quick Security Badge */}
            <div className="p-3 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/15 flex items-center gap-2.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-[11px] font-sans text-neutral-400">
                <span className="text-neutral-200 font-medium">Security First:</span> Zero-trust RBAC &amp; encrypted token standards.
              </div>
            </div>
          </div>

        </div>

        {/* 3. Subtle Brand Watermark (Architectural aesthetic element) */}
        <div className="relative pt-8 pb-4 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-widest text-white/[0.02] uppercase whitespace-nowrap">
            JESTIN SHAJI
          </span>
        </div>

        {/* 4. Bottom Utility Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs font-sans text-neutral-400">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Jestin Shaji.</span>
            <span className="hidden sm:inline text-neutral-600">&bull;</span>
            <span className="text-neutral-400">All rights reserved.</span>
          </div>

          {/* Center Framework Badge */}
          <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono bg-white/[0.02] px-3.5 py-1.5 rounded-full border border-white/[0.06]">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built with React 18 &bull; Tailwind CSS &bull; Spring Spirit</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer text-xs font-mono shadow-sm active:scale-95"
            title="Return to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 group-hover:-translate-y-0.5 transition-all" />
          </button>

        </div>

      </div>
    </footer>
  );
}
