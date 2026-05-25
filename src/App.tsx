import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, Cpu, Server, ShieldCheck, Mail, Database, Terminal, Compass, Layers } from "lucide-react";

// Section imports
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Cinematic mock initialization compiling screen state
  const [systemLoading, setSystemLoading] = useState(true);
  const [compilingLogs, setCompilingLogs] = useState<string[]>([]);
  const [currentCompileStep, setCurrentCompileStep] = useState(0);

  const compileSequence = [
    "BOOTSTRAP_INIT: Spawning remote digital sandbox environment...",
    "MAVEN_RESOLVER: Fetching Spring Boot dependency jars...",
    "ROUTER_MAPPING: Allocating core proxy paths in memory nodes...",
    "GEMINI_SYNC: Establishing model configurations (gemini-3.5-flash)...",
    "SUCCESS: Security handshake approved. Ready to deploy view systems!"
  ];

  // Simulated initialization compilation sequence
  useEffect(() => {
    if (currentCompileStep < compileSequence.length) {
      const delay = currentCompileStep === 4 ? 600 : 350;
      const t = setTimeout(() => {
        setCompilingLogs((prev) => [...prev, compileSequence[currentCompileStep]]);
        setCurrentCompileStep((p) => p + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const waitT = setTimeout(() => {
        setSystemLoading(false);
      }, 700);
      return () => clearTimeout(waitT);
    }
  }, [currentCompileStep]);

  // Handle header background shadows on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#050505] text-gray-100 overflow-x-hidden relative font-sans">
      
      {/* 1. Cinematic Compiling Entrance Sequence */}
      <AnimatePresence>
        {systemLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-center items-center p-6 text-white font-mono selection:bg-none"
          >
            <div className="max-w-xl w-full space-y-6">
              {/* Header label */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-gray-500 tracking-wider font-extrabold uppercase">
                    Jestin Shaji Compilation Engine
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  v2026.5.25
                </span>
              </div>

              {/* Logs area */}
              <div className="space-y-2 h-[180px] overflow-y-auto text-[11px] leading-relaxed text-gray-400 select-none scrollbar-none">
                {compilingLogs.map((log, li) => (
                  <div
                    key={li}
                    className={`flex items-start gap-2 ${
                      log.includes("SUCCESS") ? "text-emerald-400 font-bold" : ""
                    }`}
                  >
                    <span className="text-gray-600">[{li + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {/* Loader layout bar */}
              <div className="w-full h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.1, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-purple-500"
                />
              </div>

              <div className="text-[10px] text-gray-600 text-center select-none uppercase tracking-widest font-extrabold">
                BOOTING PORTFOLIO NODE CONTEXT...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Sticky Glassmorphic Header */}
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 font-mono tracking-wider ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-md py-4 border-b border-white/[0.05] shadow-lg shadow-black/40"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand/logo anchor */}
          <button
            onClick={() => handleScrollToSection("app-root")}
            className="flex items-center gap-2 text-white font-extrabold text-sm tracking-tight cursor-pointer"
          >
            <span className="text-[#3B82F6] font-mono">&lt;</span>
            <span className="font-display text-gray-200">Jestin.S</span>
            <span className="text-[#06B6D4] font-mono">/&gt;</span>
          </button>

          {/* Desktop Nav Actions */}
          <nav role="navigation" className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-400">
            <button
              onClick={() => handleScrollToSection("about")}
              className="hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              Identity
            </button>
            <button
              onClick={() => handleScrollToSection("tech")}
              className="hover:text-[#06B6D4] transition-colors cursor-pointer"
            >
              Arsenal
            </button>
            <button
              onClick={() => handleScrollToSection("projects")}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Works
            </button>
            <button
              onClick={() => handleScrollToSection("experience")}
              className="hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              Timeline
            </button>
            <button
              onClick={() => handleScrollToSection("blog")}
              className="hover:text-[#06B6D4] transition-colors cursor-pointer"
            >
              Writeups
            </button>
            <button
              onClick={() => handleScrollToSection("contact")}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Connect
            </button>
          </nav>

          {/* Handheld Trigger toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 border border-white/5 bg-white/[0.01] rounded-lg cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Handheld Dropdown Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0c0c12] border-b border-white/[0.08]"
            >
              <nav role="navigation" className="flex flex-col p-6 gap-4 text-xs font-mono font-bold text-gray-400">
                <button
                  onClick={() => handleScrollToSection("about")}
                  className="text-left py-2 border-b border-white/[0.03] hover:text-white"
                >
                  // Identity
                </button>
                <button
                  onClick={() => handleScrollToSection("tech")}
                  className="text-left py-2 border-b border-white/[0.03] hover:text-white"
                >
                  // Arsenal
                </button>
                <button
                  onClick={() => handleScrollToSection("projects")}
                  className="text-left py-2 border-b border-white/[0.03] hover:text-white"
                >
                  // Works
                </button>
                <button
                  onClick={() => handleScrollToSection("experience")}
                  className="text-left py-2 border-b border-white/[0.03] hover:text-white"
                >
                  // Timeline
                </button>
                <button
                  onClick={() => handleScrollToSection("blog")}
                  className="text-left py-2 border-b border-white/[0.03] hover:text-white"
                >
                  // Writeups
                </button>
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="w-full text-center py-3 bg-white text-black rounded-lg mt-2 font-bold select-none cursor-pointer"
                >
                  Initiate Connect Sequence
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main visual sections contents */}
      <main role="main">
        {/* Cinematic Hero entry */}
        <Hero
          onScrollToProjects={() => handleScrollToSection("projects")}
          onScrollToContact={() => handleScrollToSection("contact")}
          onOpenChat={() => {
            // Programmatically active chatbot flow state - handled inside ChatBot floating wrapper
            const el = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLElement;
            if (el) {
              const btn = el.querySelector("button") as HTMLButtonElement;
              if (btn) btn.click();
            }
          }}
        />

        {/* Details Profile info */}
        <About />

        {/* Interactive Stack cards */}
        <TechStack />

        {/* Alternate Interactive Cases */}
        <Projects />

        {/* Growth timeline history */}
        <Experience />

        {/* Engineering blog writeups */}
        <Blog />

        {/* Form submittals and Kopiers */}
        <Contact />
      </main>

      {/* 3. Footer */}
      <footer className="py-12 border-t border-white/[0.04] bg-[#050505] text-center font-mono text-xs text-gray-500 relative select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="tracking-wide">
            &copy; 2026 Jestin Shaji. Engineered on clean modular architectures.
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="hover:text-white">Java Spring Boot</span>
            <span>•</span>
            <span className="hover:text-white">DevOps Automatic Pipelines</span>
            <span>•</span>
            <span className="hover:text-white">Intelligent AI Networks</span>
          </div>
        </div>
      </footer>

      {/* 4. Floating AI Companion Assistant & Back to Top Widgets */}
      <ChatBot />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleBackToTop}
            title="Back to Top"
            className="fixed bottom-24 right-6 w-11 h-11 rounded-lg bg-[#0c0c12]/80 border border-white/10 hover:border-[#3B82F6]/50 text-white flex items-center justify-center cursor-pointer shadow-lg backdrop-blur"
          >
            <ArrowUp className="w-4 h-4 text-gray-400 hover:text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
