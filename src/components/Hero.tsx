import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, FileText, Sparkles, Terminal } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  
  const handleDownloadCV = () => {
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
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-28 pb-16 overflow-hidden bg-[#0b0c10] select-none">
      
      {/* Subtle minimalist background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[250px] bg-amber-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center z-10 space-y-8">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Full-Stack &amp; Backend Engineering</span>
        </motion.div>

        {/* Minimal Hero Header */}
        <div className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Jestin Shaji
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-3xl font-serif italic text-emerald-300/90 tracking-wide"
          >
            Backend Developer &amp; Cloud Systems Architect
          </motion.p>
        </div>

        {/* Short clean tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-neutral-300 text-sm sm:text-base font-sans font-normal max-w-lg leading-relaxed"
        >
          {bio.tagline || "Architecting high-performance Java Spring Boot APIs, containerized microservices, and secure relational data pipelines."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto pt-2"
        >
          <button
            onClick={onScrollToProjects}
            className="w-full sm:w-auto px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-bold text-xs rounded-full transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Explore Work</span>
          </button>

          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto px-7 py-3 bg-white/[0.05] hover:bg-white/10 text-white border border-white/10 hover:border-emerald-500/30 font-heading font-semibold text-xs rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-300" />
            <span>Resume</span>
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-3 pt-2"
        >
          <a
            href={bio.socials?.github || "https://github.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-emerald-300 flex items-center justify-center transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={bio.socials?.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-emerald-300 flex items-center justify-center transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={onScrollToContact}
            aria-label="Contact"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-emerald-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Clean Key Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 w-full max-w-2xl"
        >
          {[
            { value: "15+", label: "Systems Built" },
            { value: "< 120ms", label: "Avg Latency" },
            { value: "99.9%", label: "Uptime Goal" },
            { value: "MCA", label: "Computer Science" }
          ].map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <div className="text-base sm:text-lg font-display font-bold text-white">{metric.value}</div>
              <div className="text-[11px] font-sans text-neutral-400">{metric.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll Down */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={onScrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-emerald-300" />
        </motion.div>
      </div>

    </section>
  );
}
