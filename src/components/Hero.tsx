import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, FileText, Compass, Server } from "lucide-react";
import { JESTIN_BIO } from "../data";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  
  const handleDownloadCV = () => {
    // Elegant CV simulation download
    const cvText = `
    ====================================================
    JESTIN SHAJI - FULL STACK SPRING BOOT ARCHITECT
    ====================================================
    Email: ${JESTIN_BIO.email}
    Phone: ${JESTIN_BIO.phone}
    Location: ${JESTIN_BIO.location}
    
    Professional Overview:
    ${JESTIN_BIO.aboutFull}
    
    Core Competencies:
    - Java, Spring Boot, Microservices, Spring Security
    - Docker, Kubernetes, Jenkins, CI/CD automated pipelines
    - React.js, Tailwind CSS, TypeScript
    - PostgreSQL, MySQL, Relational Database tuning
    
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-32 pb-16 overflow-hidden bg-[#050505] selection:bg-neutral-800">
      
      {/* Background Cinematic Lighting (Ambient Vignettes) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.015)_0%,transparent_50%)] pointer-events-none" />

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
            className="flex items-center gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-85" />
            <span className="text-sm font-sans text-neutral-400 font-semibold tracking-wide">
              I am {JESTIN_BIO.name}
            </span>
          </motion.div>

          {/* Majestic Hero Display Heading */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white leading-[1.05]"
            >
              Full-Stack Developer <br className="hidden sm:block" />
              <span className="text-neutral-500 font-medium font-sans">
                &amp; Spring Architect
              </span>
            </motion.h1>
          </div>

          {/* Narrative contextual statements matching text block */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#999999] text-base sm:text-lg max-w-xl leading-relaxed font-sans"
          >
            Blending thoughtful, highly secure backend microservices with fully automated continuous cloud integration to deploy digital platforms that are bulletproof, responsive, and incredibly fast.
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
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile Link"
              className="w-10 h-10 rounded-full bg-[#111] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-700 font-mono text-sm flex items-center justify-center transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
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
        <div className="lg:col-span-5 flex justify-center items-center relative py-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square rounded-[3rem] bg-gradient-to-b from-[#13131a] to-[#09090d] border border-neutral-800 p-6 flex items-center justify-center overflow-hidden shadow-2xl group"
          >
            {/* Elegant glowing background ring inside illustration container */}
            <div className="absolute inset-4 rounded-[2.5rem] border border-dashed border-neutral-800/60 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_60%)]" />
            </div>

            {/* Simulated Technical Blueprint Node Layout (Clean SVG-based monochrome schematic representation of full-stack developer architecture) */}
            <div className="w-full h-full relative z-10 flex flex-col justify-between p-4 font-mono text-[10px]">
              
              {/* Dynamic Coordinate Badge */}
              <div className="flex justify-between items-center text-[#777]">
                <span>SCALE_NODE: 2026.1_CORE</span>
                <span className="text-white font-bold">SYSTEM_ACTIVE</span>
              </div>

              {/* Central Abstract Monochrome Structural Portrait Representation */}
              <div className="flex-1 flex justify-center items-center relative py-4">
                
                {/* Visual orbital waves representing cloud deployment networks */}
                <div className="absolute w-48 h-48 rounded-full border border-neutral-800/40 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-neutral-800/20 animate-[spin_25s_linear_infinite_reverse]" />

                {/* Conceptual stylized representation of modern full-stack developer brain node */}
                <div className="w-24 h-24 rounded-full bg-black border-2 border-neutral-800 shadow-xl flex flex-col items-center justify-center relative group-hover:border-neutral-500 transition-colors duration-500">
                  <Server className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors duration-500 mb-1" />
                  <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-extrabold group-hover:text-white">SPRING</span>
                  
                  {/* Miniature connection signals */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600 animate-bounce" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                </div>

                {/* Left node anchor: React */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#0d0d12] border border-neutral-800 shadow-md text-neutral-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  <span>REACT</span>
                </div>

                {/* Right node anchor: Docker */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#0d0d12] border border-neutral-800 shadow-md text-neutral-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  <span>K8S</span>
                </div>
              </div>

              {/* Diagnostic data blocks at container base */}
              <div className="space-y-1 pt-3 border-t border-neutral-800/40 text-neutral-500">
                <div className="flex justify-between">
                  <span>LATENCY TIMEPOINT</span>
                  <span className="text-white font-semibold">&lt; 120ms</span>
                </div>
                <div className="flex justify-between">
                  <span>ACADEMIC VECTOR</span>
                  <span className="text-white font-semibold">FISAT MCA</span>
                </div>
              </div>

            </div>

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
