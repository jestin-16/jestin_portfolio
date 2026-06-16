import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, FileText, Compass } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

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
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#030308] via-[#050512] to-[#020205] selection:bg-cyan-500/20">
      
      {/* Background Cinematic Lighting (Ambient Vignettes) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.035)_0%,transparent_60%)] pointer-events-none" />

      {/* Cyberpunk Neon Color Vignettes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.08] blur-[150px] pointer-events-none animate-[pulse_8s_infinite]" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#06B6D4]/[0.06] blur-[130px] pointer-events-none animate-[pulse_10s_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/[0.045] blur-[160px] pointer-events-none" />

      {/* Grid Pattern overlays for fine structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center z-10 flex-1 space-y-10">
        
        {/* Subtle Accent Mini Hook */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/20 border border-cyan-500/20 rounded-full w-fit hover:border-cyan-400/40 transition-colors mx-auto shadow-[0_0_15px_rgba(6,182,212,0.05)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wide">
            SYSTEM ARCHITECT &bull; {bio.name}
          </span>
        </motion.div>

        {/* Majestic Hero Display Heading */}
        <div className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight leading-[1.12] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-300"
          >
            {bio.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg font-sans font-medium bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent tracking-wide leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]"
          >
            {bio.subtitle}
          </motion.p>
        </div>

        {/* Narrative contextual statements matching text block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-neutral-300 text-xs sm:text-base leading-relaxed font-sans max-w-2xl"
        >
          {bio.tagline}
        </motion.p>

        {/* Call to action element buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onScrollToProjects}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:via-blue-400 hover:to-indigo-400 text-white rounded-full text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-cyan-500/15 hover:shadow-cyan-500/25 border border-cyan-400/20"
          >
            <Compass className="w-4 h-4 text-white" />
            <span>Explore Works</span>
          </button>

          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto px-8 py-4 bg-[#0a0a10]/80 hover:bg-[#12121e]/80 text-[#eaeaea] hover:text-white border border-neutral-800 hover:border-cyan-500/30 rounded-full text-xs font-mono font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download CV</span>
          </button>
        </motion.div>

        {/* Social connections cleanly arranged below button line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 pt-4"
        >
          <a
            href={bio.socials?.github || "https://github.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile Link"
            className="w-11 h-11 rounded-full bg-[#0a0a0f] hover:bg-black text-neutral-400 hover:text-cyan-400 border border-neutral-900 hover:border-cyan-500/50 font-mono text-sm flex items-center justify-center transition-all hover:scale-115 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href={bio.socials?.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile Link"
            className="w-11 h-11 rounded-full bg-[#0a0a0f] hover:bg-black text-neutral-400 hover:text-blue-400 border border-neutral-900 hover:border-blue-500/50 font-mono text-sm flex items-center justify-center transition-all hover:scale-115 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <button
            onClick={onScrollToContact}
            title="Send Direct Message"
            aria-label="Navigate to email direct channel"
            className="w-11 h-11 rounded-full bg-[#0a0a0f] hover:bg-black text-neutral-400 hover:text-purple-400 border border-neutral-900 hover:border-purple-500/50 font-mono text-sm flex items-center justify-center transition-all hover:scale-115 cursor-pointer hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            <Mail className="w-4.5 h-4.5" />
          </button>
        </motion.div>

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
