import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  Check,
  Copy,
  Terminal,
  ShieldCheck,
  Cpu,
  Layers,
  Type
} from "lucide-react";
import { JESTIN_BIO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export type FooterFontTheme = "outfit" | "grotesk" | "mono" | "syne" | "sans";

export default function Footer({ onNavigate }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [fontTheme, setFontTheme] = useState<FooterFontTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_footer_font") as FooterFontTheme;
      if (saved && ["outfit", "grotesk", "mono", "syne", "sans"].includes(saved)) {
        return saved;
      }
    }
    return "outfit";
  });

  useEffect(() => {
    const updateTime = () => {
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

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectFont = (theme: FooterFontTheme) => {
    setFontTheme(theme);
    try {
      localStorage.setItem("portfolio_footer_font", theme);
    } catch {
      // ignore
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(JESTIN_BIO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home", index: "01" },
    { id: "services", label: "Services", index: "02" },
    { id: "about", label: "About", index: "03" },
    { id: "tech", label: "Skills", index: "04" },
    { id: "projects", label: "Projects", index: "05" },
    { id: "experience", label: "Experience", index: "06" },
    { id: "blog", label: "Articles", index: "07" },
    { id: "contact", label: "Contact", index: "08" },
  ];

  const focusDomains = [
    { name: "Spring Boot Microservices", tag: "Java 21" },
    { name: "Zero-Trust API Security", tag: "OAuth2 / JWT" },
    { name: "Cloud & Kubernetes", tag: "Docker / K8s" },
    { name: "Event-Driven Streams", tag: "Kafka" },
    { name: "High-Speed Caching", tag: "Redis & Postgres" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: JESTIN_BIO.socials.github,
      icon: Github,
      tag: "Code Repositories",
    },
    {
      name: "LinkedIn",
      url: JESTIN_BIO.socials.linkedin,
      icon: Linkedin,
      tag: "Professional Network",
    },
    {
      name: "Email",
      url: JESTIN_BIO.socials.email,
      icon: Mail,
      tag: "Direct Inbox",
    },
  ];

  // Map theme to corresponding CSS class
  const fontClasses: Record<FooterFontTheme, string> = {
    outfit: "font-outfit",
    grotesk: "font-display",
    mono: "font-mono",
    syne: "font-syne",
    sans: "font-sans",
  };

  return (
    <footer
      className={`relative bg-[#0a0b0e] text-neutral-300 border-t border-white/[0.08] select-none transition-all duration-300 overflow-hidden ${fontClasses[fontTheme]}`}
    >
      {/* Soft ambient backlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-emerald-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-[300px] h-[200px] bg-teal-500/[0.02] blur-[120px] pointer-events-none rounded-full" />

      {/* Top micro hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-10 relative z-10 space-y-12">
        
        {/* 1. Sleek Modern Callout Strip */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-white/[0.03] via-white/[0.015] to-transparent border border-white/[0.08] backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Backend Roles &amp; High-Scale Architectures</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              Ready to engineer robust distributed systems?
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Let&apos;s build scalable microservices, low-latency APIs, or containerize cloud infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate("contact")}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0a0b0e] font-bold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#0a0b0e]" />
              <span>Get in Touch</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-neutral-200 text-xs font-mono transition-all cursor-pointer active:scale-95"
              title="Copy Email Address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-300 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Structured Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
          
          {/* Col 1: Identity & Time (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("home")}
                className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs cursor-pointer hover:border-emerald-400 hover:scale-105 transition-all shadow-sm"
                title="Jestin Shaji"
              >
                JS
              </button>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight leading-tight">
                  Jestin Shaji
                </h4>
                <p className="text-xs text-emerald-400 font-mono font-medium tracking-wide">
                  Backend Java &bull; Cloud Engineer
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-normal">
              Architecting secure Spring Boot microservices, high-concurrency event pipelines, and cloud-native Kubernetes environments.
            </p>

            {/* Timezone & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-1.5">
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

          {/* Col 2: Navigation Directory (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400/90 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Index</span>
            </h5>
            
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="group text-left text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center justify-between py-1 px-1.5 rounded-md hover:bg-white/[0.02]"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform tracking-tight font-medium">
                    {link.label}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500/60 group-hover:text-emerald-400 transition-colors">
                    {link.index}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Focus Domains (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400/90 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Stack</span>
            </h5>

            <ul className="space-y-2 text-xs">
              {focusDomains.map((domain, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="text-neutral-300 font-medium text-xs tracking-tight">
                    {domain.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {domain.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Network Channels (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400/90 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Channels</span>
            </h5>

            <div className="space-y-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-2.5 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors tracking-tight">
                          {social.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {social.tag}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-70 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* 3. Bottom Minimal Bar with Font Style Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400 pt-2">
          
          <div className="flex items-center gap-2 font-mono text-[11px] text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} Jestin Shaji</span>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-neutral-500">All rights reserved</span>
          </div>

          {/* Interactive Font Selector Pill */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-[11px]">
            <span className="flex items-center gap-1 px-2 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <Type className="w-3 h-3 text-emerald-400" />
              <span>Font:</span>
            </span>
            {(
              [
                { key: "outfit", label: "Outfit" },
                { key: "grotesk", label: "Space Grotesk" },
                { key: "mono", label: "JetBrains" },
                { key: "syne", label: "Syne" },
                { key: "sans", label: "Jakarta" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => handleSelectFont(f.key)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[10px] cursor-pointer ${
                  fontTheme === f.key
                    ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
                title={`Switch footer typography to ${f.label}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-lg hover:bg-white/[0.03]"
            title="Return to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
          </button>

        </div>

      </div>
    </footer>
  );
}
