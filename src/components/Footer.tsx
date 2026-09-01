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
  Radio
} from "lucide-react";
import { JESTIN_BIO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Live India Standard Time (IST) display
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home", category: "Start" },
    { id: "services", label: "Services", category: "Core" },
    { id: "about", label: "About", category: "Story" },
    { id: "tech", label: "Skills & Stack", category: "Capabilities" },
    { id: "projects", label: "Featured Work", category: "Showcase" },
    { id: "experience", label: "Experience", category: "Career" },
    { id: "blog", label: "Insights", category: "Articles" },
    { id: "contact", label: "Get in Touch", category: "Connect" },
  ];

  const focusAreas = [
    { name: "Spring Boot Microservices", tag: "Java 21" },
    { name: "Cloud & Kubernetes Pods", tag: "DevOps" },
    { name: "RESTful API Security", tag: "OAuth2 / JWT" },
    { name: "Event-Driven Kafka", tag: "Streaming" },
    { name: "Distributed Caching", tag: "Redis" },
  ];

  const socials = [
    {
      name: "GitHub",
      url: JESTIN_BIO.socials.github,
      icon: Github,
      username: "@jestinshaji",
      color: "hover:text-white hover:border-white/30",
    },
    {
      name: "LinkedIn",
      url: JESTIN_BIO.socials.linkedin,
      icon: Linkedin,
      username: "in/jestinshaji",
      color: "hover:text-emerald-400 hover:border-emerald-500/40",
    },
    {
      name: "Direct Email",
      url: JESTIN_BIO.socials.email,
      icon: Mail,
      username: "jestinshaji777@gmail.com",
      color: "hover:text-teal-300 hover:border-teal-500/40",
    },
  ];

  return (
    <footer className="relative bg-[#0a0b0e] text-neutral-300 border-t border-white/[0.06] select-none overflow-hidden font-sans">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-emerald-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[250px] bg-teal-500/[0.02] blur-[140px] pointer-events-none rounded-full" />

      {/* Top subtle highlight divider with animated pulse */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-16 pb-12 relative z-10">
        
        {/* 1. Interactive Pre-Footer Collaboration Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl p-6 sm:p-8 md:p-10 mb-16 bg-gradient-to-b from-[#10131c]/90 via-[#0d0f17]/95 to-[#0a0b0e] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle background circuit styling */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>Active Availability &bull; Ready for High-Impact Roles</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s build robust, scalable <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">backend systems</span> together.
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                Whether you have an ambitious microservices architecture in mind or require cloud security engineering, my inbox is always open.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => onNavigate("contact")}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0a0b0e] font-sans font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Conversation</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-neutral-200 hover:text-white font-mono text-xs font-medium transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                title="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                    <span className="text-emerald-300">Copied Address!</span>
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

        {/* 2. Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/[0.06]">
          
          {/* Column 1: Identity, Role & Local Time (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate("home")}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/5 border border-emerald-500/40 flex items-center justify-center font-mono font-extrabold text-emerald-300 text-sm cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400 hover:scale-105 transition-all"
                title="Jestin Shaji Portfolio"
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
              Designing high-throughput Spring Boot microservices, containerized deployments, and resilient cloud architectures with a zero-trust mindset.
            </p>

            {/* Timezone & Location Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
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
          </div>

          {/* Column 2: Navigation Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Navigation</span>
            </div>
            
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs font-mono">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="group text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1 text-left w-full"
                  >
                    <span className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors font-bold">&rsaquo;</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specializations & Stack Focus (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Expertise</span>
            </div>
            <ul className="space-y-2 text-xs">
              {focusAreas.map((item, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="text-neutral-300 font-sans font-medium text-xs">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {item.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect & Telemetry (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Socials &amp; Channels</span>
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
                      <span className="text-xs font-sans font-medium text-neutral-300 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-neutral-300 transition-colors opacity-60 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>

            {/* Micro Telemetry Box */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-neutral-300 font-medium">JVM Service</span>
              </div>
              <span className="text-emerald-400 font-bold">200 OK</span>
            </div>
          </div>

        </div>

        {/* 3. Bottom Utility Bar & Back-to-Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-sans text-neutral-400">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Jestin Shaji.</span>
            <span className="hidden sm:inline text-neutral-600">&bull;</span>
            <span className="text-neutral-500">All rights reserved.</span>
          </div>

          {/* Center Crafted Badge */}
          <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-mono bg-white/[0.02] px-3 py-1 rounded-full border border-white/[0.04]">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built with React, TypeScript &amp; Spring Cloud Spirit</span>
          </div>

          {/* Back to Top Quick Action */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/40 text-neutral-300 hover:text-white transition-all cursor-pointer text-xs font-mono"
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
