import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, MessageSquare, Terminal, Eye, Award } from "lucide-react";
import { JESTIN_BIO } from "../data";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact, onOpenChat }: HeroProps) {
  const [typedTitleIndex, setTypedTitleIndex] = useState(0);
  const titles = [
    "Building Scalable Digital Experiences",
    "Full Stack Spring Boot Architect",
    "Intelligent Software Developer",
    "Orchestrating DevOps Pipelines"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden bg-[#050505]">
      {/* 1. Futuristic Grid & Lighting Layers */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 radial-glow rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 radial-glow-cyan rounded-full animate-pulse pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] radial-glow-purple rounded-full opacity-60 pointer-events-none" />

      {/* 2. Floating Code Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 border border-white/10 rounded-lg p-2 font-mono text-[9px] text-[#3B82F6]/60 backdrop-blur-sm hidden md:block"
            style={{
              top: `${20 + i * 13}%`,
              left: `${8 + (i % 2 === 0 ? i * 12 : i * 15)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {i === 0 && "@SpringBootApplication"}
            {i === 1 && "kubectl apply -f deployment.yml"}
            {i === 2 && "public class MicroserviceApplication {}"}
            {i === 3 && "const ai = new GoogleGenAI();"}
            {i === 4 && "git commit -m 'Release Pipeline live'"}
            {i === 5 && "SELECT seat_id FROM college_lab_seats;"}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl mt-12">
        {/* Upper Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-gray-400 tracking-wider uppercase font-medium">
            Pursuing MCA • Available for Architectures
          </span>
        </motion.div>

        {/* Dynamic Typography Header */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-6 select-none leading-[1.05]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-500">
            Jestin Shaji
          </span>
          <div className="h-[72px] sm:h-[96px] md:h-[120px] relative flex justify-center items-center mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={typedTitleIndex}
                initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-purple-500 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight px-4"
              >
                {titles[typedTitleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 font-sans max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {JESTIN_BIO.tagline}
        </motion.p>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <button
            onClick={onScrollToProjects}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 relative group overflow-hidden bg-white text-black hover:scale-105 active:scale-95 shadow-lg shadow-white/5 active:shadow-none cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Explore Architectures
            </span>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>

          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 relative group overflow-hidden bg-transparent border border-white/10 hover:border-[#3B82F6]/50 text-white shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#06B6D4] group-hover:animate-bounce" />
            <span>Consult Jestin AI</span>
          </button>

          <button
            onClick={onScrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 border border-transparent hover:border-white/10 hover:bg-white/[0.02] text-gray-400 hover:text-white cursor-pointer"
          >
            &lt;Get In Touch /&gt;
          </button>
        </motion.div>
      </div>

      {/* 3. Infinite Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-8 rounded-2xl glass-panel relative"
      >
        {JESTIN_BIO.stats.map((stat, i) => (
          <div
            key={i}
            className="text-center py-4 flex flex-col justify-center items-center border-r last:border-r-0 border-white/[0.05]"
          >
            <span className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {stat.value}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mt-2 font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Down indicators */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
        onClick={onScrollToProjects}
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-gray-500" />
      </motion.div>
    </section>
  );
}
