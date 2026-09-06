import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  MapPin,
  Clock,
  Code2,
  Type,
  ChevronRight
} from "lucide-react";
import { JESTIN_BIO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

type FooterFontStyle = "grotesk" | "mono" | "syne" | "sans";

export default function Footer({ onNavigate }: FooterProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<FooterFontStyle>("grotesk");

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home", num: "01" },
    { id: "services", label: "Services", num: "02" },
    { id: "about", label: "About", num: "03" },
    { id: "tech", label: "Skills", num: "04" },
    { id: "projects", label: "Projects", num: "05" },
    { id: "experience", label: "Experience", num: "06" },
    { id: "blog", label: "Articles", num: "07" },
    { id: "contact", label: "Contact", num: "08" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: JESTIN_BIO.socials.github,
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: JESTIN_BIO.socials.linkedin,
      icon: Linkedin,
    },
    {
      name: "Email",
      url: JESTIN_BIO.socials.email,
      icon: Mail,
    },
  ];

  // Dynamic font class mapping
  const containerFontClass = {
    grotesk: "font-display",
    mono: "font-mono",
    syne: "font-syne",
    sans: "font-sans",
  }[fontStyle];

  return (
    <footer
      className={`relative bg-[#0a0b0e] text-neutral-400 border-t border-white/[0.06] select-none transition-all duration-300 ${containerFontClass}`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1: Bio & Status (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("home")}
                className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs cursor-pointer hover:border-emerald-400 hover:bg-emerald-500/15 transition-all shadow-sm"
                title="Jestin Shaji"
              >
                JS
              </button>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  Jestin Shaji
                </h3>
                <p className="text-xs text-emerald-400 font-mono font-medium tracking-wide">
                  Backend Java &bull; Cloud Security
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm tracking-normal">
              Specialized in Spring Boot microservices, high-throughput systems, and zero-trust cloud architecture.
            </p>

            {/* Location & Live Time Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{JESTIN_BIO.location}</span>
              </div>
              <span className="text-neutral-600">&bull;</span>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentTime || "IST"}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Navigation</span>
            </h4>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="group flex items-center justify-between text-left text-neutral-400 hover:text-white transition-colors cursor-pointer py-1 px-1.5 rounded hover:bg-white/[0.02]"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform tracking-tight">
                    {link.label}
                  </span>
                  <span className="text-[10px] text-neutral-600 group-hover:text-emerald-400 font-mono transition-colors">
                    {link.num}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Status & Socials (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>Availability</span>
            </h4>
            
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 hover:border-emerald-500/25 transition-colors">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">Open to Roles</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug tracking-normal">
                Available for backend engineering &amp; distributed systems work.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.06] text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Font Style Selector */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 text-xs text-neutral-500">
          
          {/* Copyright */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>&copy; {new Date().getFullYear()} Jestin Shaji</span>
            <span>&bull;</span>
            <span>All rights reserved</span>
          </div>

          {/* Interactive Font Style Switcher Pill */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-[11px]">
            <span className="flex items-center gap-1 px-2 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
              <Type className="w-3 h-3 text-emerald-400" />
              <span>Font:</span>
            </span>
            {(
              [
                { key: "grotesk", label: "Space Grotesk" },
                { key: "mono", label: "JetBrains Mono" },
                { key: "syne", label: "Syne" },
                { key: "sans", label: "Plus Jakarta" },
              ] as const
            ).map((font) => (
              <button
                key={font.key}
                onClick={() => setFontStyle(font.key)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[10px] cursor-pointer ${
                  fontStyle === font.key
                    ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {font.label}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs font-mono"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
