import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Terminal, Sparkles } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

const ROLES = [
  "Backend Java Engineer",
  "Spring Boot Architect",
  "Cloud Systems Engineer",
  "Distributed Systems Builder",
  "Microservices Specialist",
];

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const firstName = "JESTIN".split("");
  const lastName = "SHAJI".split("");

  return (
    <section
      id="home"
      className="relative min-h-[86vh] flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-20 bg-white text-black select-none overflow-hidden border-b border-black/[0.08]"
    >
      {/* Subtle architectural dot grid matching the rest of the portfolio */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* Subtle ambient soft bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[320px] bg-neutral-100/80 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10 space-y-6">
        {/* Availability status badge - pure minimal monochrome */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-black/10 text-xs text-neutral-800 font-mono tracking-wide shadow-2xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
          </span>
          <span className="uppercase text-[11px] font-medium tracking-wider">
            Available for backend &amp; cloud engineering roles
          </span>
        </motion.div>

        {/* Dynamic Name Display with Interactive Kinetic Character Hover */}
        <div className="space-y-3 pt-1">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight leading-none text-black flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 cursor-default">
            {/* First Name: JESTIN */}
            <span className="inline-flex overflow-hidden py-1">
              {firstName.map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.04 * index,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.1,
                    color: "#525252",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-black hover:text-neutral-500 select-none will-change-transform"
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.04 * (firstName.length + index),
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.1,
                    color: "#525252",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-black hover:text-neutral-500 select-none will-change-transform"
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-2.5 text-xl sm:text-2xl md:text-3xl font-display font-bold text-black tracking-tight will-change-transform"
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

        {/* Short punchy description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-neutral-600 text-base sm:text-lg font-sans font-normal max-w-xl leading-relaxed"
        >
          Building high-throughput{" "}
          <span className="text-black font-semibold">
            Spring Boot microservices
          </span>
          , secure{" "}
          <span className="text-black font-semibold">
            REST APIs
          </span>
          , and containerized{" "}
          <span className="text-black font-semibold">
            cloud architecture
          </span>
          .
        </motion.p>

        {/* Action Buttons: 2 CTAs with interactive hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToProjects}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white font-sans font-semibold text-xs rounded-full transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Featured Work</span>
          </motion.button>

          {/* Secondary CTA: Ghost style */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToContact}
            className="px-6 py-3 bg-white hover:bg-neutral-50 text-black font-sans font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 group rounded-full border border-black/15 hover:border-black shadow-2xs"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Minimalist Telemetry & Tech Highlights Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-400 uppercase border-t border-black/[0.06] w-full max-w-xl mx-auto"
        >
          <span className="text-neutral-600 font-semibold">JAVA 21 (LTS)</span>
          <span>&bull;</span>
          <span className="text-neutral-600 font-semibold">SPRING BOOT 3.x</span>
          <span>&bull;</span>
          <span>KUBERNETES</span>
          <span>&bull;</span>
          <span>POSTGRESQL</span>
          <span>&bull;</span>
          <span>DOCKER</span>
        </motion.div>
      </div>
    </section>
  );
}

