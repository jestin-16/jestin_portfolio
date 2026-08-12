import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();

  return (
    <section id="home" className="relative min-h-[82vh] flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-16 bg-[#0a0b0e] select-none">
      
      {/* Subtle faint radial glow behind the name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[280px] bg-emerald-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center z-10 space-y-5">
        
        {/* Quiet status indicator (no pill, no border) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs text-neutral-400 font-sans tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for backend &amp; cloud engineering roles</span>
        </motion.div>

        {/* Headline & Subtitle in single clean sans-serif */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-sans font-black tracking-tight text-white leading-none"
          >
            Jestin Shaji
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg sm:text-2xl font-sans font-medium text-neutral-400 tracking-tight"
          >
            Backend Java Engineer &amp; Cloud Systems Architect
          </motion.p>
        </div>

        {/* Short punchy description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 text-sm sm:text-base font-sans font-normal max-w-lg leading-relaxed pt-1"
        >
          Building high-throughput Spring Boot microservices, secure REST APIs, and containerized cloud architecture.
        </motion.p>

        {/* Action Buttons: 2 CTAs max */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-4 pt-3"
        >
          {/* Primary CTA */}
          <button
            onClick={onScrollToProjects}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-semibold text-xs rounded-md transition-colors cursor-pointer shadow-sm"
          >
            View Featured Work
          </button>

          {/* Secondary CTA: Ghost style */}
          <button
            onClick={onScrollToContact}
            className="text-neutral-400 hover:text-white font-sans font-medium text-xs transition-colors cursor-pointer flex items-center gap-1 group py-2.5"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>

    </section>
  );
}
