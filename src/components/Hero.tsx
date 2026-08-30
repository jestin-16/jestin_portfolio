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

  const firstName = "Jestin".split("");
  const lastName = "Shaji".split("");

  return (
    <section
      id="home"
      className="relative min-h-[84vh] flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-16 bg-[#0a0b0e] select-none overflow-hidden"
    >
      {/* Subtle ambient backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[320px] bg-emerald-500/[0.04] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[220px] bg-teal-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10 space-y-6">
        {/* Availability status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-xs text-neutral-300 font-sans tracking-wide shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for backend &amp; cloud engineering roles</span>
        </motion.div>

        {/* Dynamic Name Display with Interactive Kinetic Character Hover */}
        <div className="space-y-3 pt-1">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight leading-none drop-shadow-sm flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 cursor-default">
            {/* First Name: Jestin */}
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
                    scale: 1.12,
                    color: "#34d399",
                    textShadow: "0 0 20px rgba(52, 211, 153, 0.6)",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-white hover:text-emerald-400 select-none will-change-transform"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* Last Name: Shaji */}
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
                    scale: 1.12,
                    color: "#34d399",
                    textShadow: "0 0 20px rgba(52, 211, 153, 0.6)",
                    transition: { type: "spring", stiffness: 450, damping: 15 },
                  }}
                  className="inline-block transition-colors duration-150 text-white hover:text-emerald-400 select-none will-change-transform"
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
                className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-display font-semibold text-neutral-200 tracking-tight will-change-transform"
              >
                <Terminal className="w-5 h-5 text-emerald-400 hidden sm:inline-block shrink-0" />
                <span className="bg-gradient-to-r from-white via-neutral-100 to-emerald-300 bg-clip-text text-transparent animate-text-shimmer">
                  {ROLES[roleIndex]}
                </span>
                <span className="w-2 h-5 bg-emerald-400 inline-block animate-pulse shrink-0 rounded-sm ml-0.5" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Short punchy description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-neutral-400 text-base sm:text-lg font-sans font-normal max-w-xl leading-relaxed"
        >
          Building high-throughput{" "}
          <span className="text-neutral-200 font-medium hover:text-emerald-300 transition-colors">
            Spring Boot microservices
          </span>
          , secure{" "}
          <span className="text-neutral-200 font-medium hover:text-emerald-300 transition-colors">
            REST APIs
          </span>
          , and containerized{" "}
          <span className="text-neutral-200 font-medium hover:text-emerald-300 transition-colors">
            cloud architecture
          </span>
          .
        </motion.p>

        {/* Action Buttons: 2 CTAs with interactive hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 pt-2"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onScrollToProjects}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-semibold text-xs rounded-md transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Featured Work</span>
          </motion.button>

          {/* Secondary CTA: Ghost style */}
          <motion.button
            whileHover={{ x: 2 }}
            onClick={onScrollToContact}
            className="text-neutral-400 hover:text-white font-sans font-medium text-xs transition-colors cursor-pointer flex items-center gap-1 group py-2.5 px-3 rounded-md hover:bg-white/[0.04]"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

