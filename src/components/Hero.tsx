import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Terminal, Sparkles, Server, Cpu, Database, Check } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

const ROLES = [
  "Backend Java Engineer",
  "Spring Boot Architect",
  "Cloud Systems Builder",
  "Distributed Systems Engineer",
  "Microservices Specialist",
];

const METRICS = [
  { value: "Java 21", label: "Virtual Threads (LTS)" },
  { value: "Spring Boot 3", label: "Microservices Stack" },
  { value: "< 120ms", label: "P99 Target Latency" },
  { value: "Docker & K8s", label: "Cloud Containerized" },
];

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const firstName = "JESTIN".split("");
  const lastName = "SHAJI".split("");

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 pt-32 pb-24 bg-white text-black select-none overflow-hidden border-b border-black/[0.08]"
    >
      {/* Subtle interactive mouse spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.035), transparent 60%)`,
        }}
      />

      {/* Subtle architectural dot grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10 space-y-8">
        
        {/* Availability status - Zero-pill clean text indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 text-xs text-neutral-600 font-mono tracking-wider uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
          </span>
          <span className="font-semibold text-neutral-800">
            Available for Backend &amp; Cloud Engineering Roles
          </span>
          <span className="text-neutral-400 font-normal">·</span>
          <span className="text-neutral-500 font-normal">MCA 2026</span>
        </motion.div>

        {/* Dynamic Name Display with Interactive Kinetic Character Hover */}
        <div className="space-y-4 pt-1">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight leading-none text-black flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 cursor-default">
            {/* First Name: JESTIN */}
            <span className="inline-flex overflow-hidden py-1">
              {firstName.map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.03 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.08,
                    color: "#525252",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-black select-none will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Last Name: SHAJI */}
            <span className="inline-flex overflow-hidden py-1">
              {lastName.map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.03 * (firstName.length + index),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.08,
                    color: "#525252",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-black select-none will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Animated Rotating Subtitle Role */}
          <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-flex items-center gap-2.5 text-lg sm:text-2xl md:text-3xl font-display font-bold text-black tracking-tight will-change-transform"
              >
                <Terminal className="w-5 h-5 text-black hidden sm:inline-block shrink-0" />
                <span>
                  {ROLES[roleIndex]}
                </span>
                <span className="w-2 h-5 bg-black inline-block animate-pulse shrink-0 rounded-xs ml-0.5" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Editorial description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-600 text-sm sm:text-base md:text-lg font-sans font-normal max-w-2xl leading-relaxed"
        >
          Specializing in scalable{" "}
          <span className="text-black font-semibold">
            Spring Boot microservices
          </span>
          , stateless{" "}
          <span className="text-black font-semibold">
            JWT REST APIs
          </span>
          , and automated{" "}
          <span className="text-black font-semibold">
            Docker &amp; Kubernetes
          </span>{" "}
          deployment infrastructure.
        </motion.p>

        {/* Action Buttons: 2 CTAs with interactive spring physics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToProjects}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white font-sans font-semibold text-xs rounded-full transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>Explore Engineering Work</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToContact}
            className="px-6 py-3 bg-white hover:bg-neutral-50 text-black font-sans font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 group rounded-full border border-black/15 hover:border-black shadow-xs"
          >
            <span>Get In Touch</span>
          </motion.button>
        </motion.div>

        {/* Minimalist Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 border-t border-black/[0.08] w-full max-w-3xl mx-auto"
        >
          {METRICS.map((met, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <span className="text-base sm:text-lg font-display font-black text-black block tracking-tight">
                {met.value}
              </span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                {met.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
