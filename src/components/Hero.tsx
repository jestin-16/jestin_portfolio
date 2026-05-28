import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, FileText, Compass, Server, Shield } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";
import InteractiveConsole from "./InteractiveConsole";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  
  const handleDownloadCV = () => {
    // Elegant CV simulation download
    const cvText = `
    ====================================================
    JESTIN SHAJI - BACKEND JAVA & SPRING BOOT ARCHITECT
    ====================================================
    Email: ${bio.email}
    Phone: ${bio.phone}
    Location: ${bio.location}
    
    Professional Overview:
    ${bio.aboutFull}
    
    Core Competencies:
    - Core Java, Advanced Multithreading, JVM Performance Tuning
    - Spring Boot, Spring Security, Spring Cloud, REST APIs, Microservices
    - Docker, Kubernetes, Jenkins, Automated Cloud Pipelines
    - PostgreSQL, MySQL, Relational Database optimization
    
    ----------------------------------------------------
    Generated dynamically on Jestin's Portfolio Vault.
    ====================================================
    `;
    const blob = new Blob([cvText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Jestin_Shaji_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-32 pb-16 overflow-hidden bg-[#020204] selection:bg-neutral-850">
      
      {/* Background Cinematic Lighting (Ambient Vignettes) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.015)_0%,transparent_50%)] pointer-events-none" />

      {/* Cyberpunk Neon Color Vignettes */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/[0.04] blur-[120px] pointer-events-none animate-[pulse_8s_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#06B6D4]/[0.03] blur-[140px] pointer-events-none animate-[pulse_10s_infinite_reverse]" />
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlays for fine structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 flex-1">
        
        {/* Left Hand: High Quality Editorial Narrative Block */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-8">
          
          {/* Subtle Accent Mini Hook */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full w-fit hover:border-blue-500/20 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-neutral-300 font-semibold tracking-wide">
              System architect : {bio.name}
            </span>
          </motion.div>

          {/* Majestic Hero Display Heading */}
          <div className="space-y-3.5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400"
            >
              {bio.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg font-sans font-medium bg-gradient-to-r from-blue-400 via-indigo-300 to-[#06B6D4] bg-clip-text text-transparent tracking-wide leading-relaxed"
            >
              {bio.subtitle}
            </motion.p>
          </div>

          {/* Narrative contextual statements matching text block */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#999999] text-xs sm:text-sm md:text-base max-w-lg leading-relaxed font-sans"
          >
            {bio.tagline}
          </motion.p>


          {/* Call to action element buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={handleDownloadCV}
              className="px-8 py-4 bg-[#121212] hover:bg-[#1c1c1c] text-white border border-neutral-800 rounded-full text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>Download CV</span>
            </button>

            <button
              onClick={onScrollToProjects}
              className="px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-white/5"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>Explore Works</span>
            </button>
          </motion.div>

          {/* Social connections cleanly arranged below button line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-3 pt-6"
          >
            <a
              href={bio.socials?.github || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile Link"
              className="w-10 h-10 rounded-full bg-[#111] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-700 font-mono text-sm flex items-center justify-center transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={bio.socials?.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile Link"
              className="w-10 h-10 rounded-full bg-[#111] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-700 font-mono text-sm flex items-center justify-center transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={onScrollToContact}
              title="Send Direct Message"
              aria-label="Navigate to email direct channel"
              className="w-10 h-10 rounded-full bg-[#111] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-700 font-mono text-sm flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

        {/* Right Hand: Immersive Black and White Architectural Visual Canvas Widget */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-4 lg:py-8">
          
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex justify-center items-center"
          >
            {/* Soft glowing base behind interactive console */}
            <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-b from-[#3b82f6]/20 via-[#06b6d4]/10 to-transparent blur-xl pointer-events-none opacity-60" />
            
            <InteractiveConsole />
          </motion.div>

        </div>

      </div>

      {/* Bounce continuous scrolling indicator matching design */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25 hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
        onClick={onScrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>

    </section>
  );
}
