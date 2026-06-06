import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, Cpu, Server, ShieldCheck, Mail, Database, Terminal, Compass, Layers, Github, Linkedin } from "lucide-react";

// Section imports
import CinematicCanvas from "./components/CinematicCanvas";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Premium minimalistic intro preloader state
  const [systemLoading, setSystemLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemLoading(false);
    }, 2400); // 2.4 seconds presentation before revealing portfolio
    return () => clearTimeout(timer);
  }, []);

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
      
      {/* 1. Cinematic Floating Particle & Volumetric Fog Backdrop Canvas */}
      <CinematicCanvas />

      {/* 2. Premium Cinematic Entrance Sequence displaying Name */}
      <AnimatePresence>
        {systemLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", y: -10 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col justify-center items-center p-6 text-white select-none overflow-hidden"
          >
            {/* Soft decorative background glow to frame the text */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[120px] pointer-events-none" />
            
            <div className="text-center space-y-5 relative z-10">
              
              {/* Elegant Accent Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 mb-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-[pulse_2s_infinite]" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                  PORTFOLIO &bull; INTRO
                </span>
              </motion.div>

              {/* Main Display Typography Name */}
              <h1 className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-6xl font-sans tracking-[0.3em] font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400 pl-[0.3em]"
                >
                  JESTIN SHAJI
                </motion.span>
              </h1>

              {/* Sub-label showing after short offset */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-400 font-medium uppercase"
              >
                Backend Developer &amp; Cloud Security Architect
              </motion.p>
              
              {/* Sleek minimal progress line ticker */}
              <div className="w-[120px] h-[1px] bg-white/[0.05] relative overflow-hidden mx-auto mt-4">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute h-full w-[40%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Refined Floating Pill Header/Navbar (Inspired by reference) */}
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 font-sans ${
          scrolled
            ? "py-4 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-900 shadow-xl shadow-black/80"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Solid circular logo icon */}
          <button
            onClick={() => handleScrollToSection("home")}
            className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center font-bold text-white uppercase text-xs cursor-pointer select-none tracking-wider shadow-lg hover:scale-105 transition-all duration-300"
          >
            js
          </button>

          {/* Centered Floating Nav Bar (As shown in screenshot) */}
          <nav role="navigation" className="hidden md:flex items-center gap-1.5 p-1 bg-[#121216]/60 border border-neutral-900 rounded-full backdrop-blur-md">
            <button
              onClick={() => handleScrollToSection("home")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer rounded-full hover:bg-neutral-900/40"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollToSection("services")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer rounded-full hover:bg-neutral-900/40"
            >
              Services
            </button>
            <button
              onClick={() => handleScrollToSection("about")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer rounded-full hover:bg-neutral-900/40"
            >
              About
            </button>
            <button
              onClick={() => handleScrollToSection("tech")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer rounded-full hover:bg-neutral-900/40"
            >
              Skills
            </button>
            <button
              onClick={() => handleScrollToSection("projects")}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer rounded-full hover:bg-neutral-900/40"
            >
              Projects
            </button>
          </nav>

          {/* Let's Talk Pill shape trigger */}
          <button
            onClick={() => handleScrollToSection("contact")}
            className="hidden md:inline-block px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-full text-xs font-bold tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            Let's Talk
          </button>

          {/* Handheld Trigger toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 border border-neutral-900 bg-neutral-950 rounded-lg cursor-pointer"
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
              className="md:hidden bg-[#0a0a0d] border-b border-neutral-900"
            >
              <nav role="navigation" className="flex flex-col p-6 gap-4 text-xs font-mono font-bold text-gray-400">
                <button
                  onClick={() => handleScrollToSection("home")}
                  className="text-left py-2 border-b border-neutral-900/40 hover:text-white uppercase tracking-wider"
                >
                  // Home
                </button>
                <button
                  onClick={() => handleScrollToSection("services")}
                  className="text-left py-2 border-b border-neutral-900/40 hover:text-white uppercase tracking-wider"
                >
                  // Services
                </button>
                <button
                  onClick={() => handleScrollToSection("about")}
                  className="text-left py-2 border-b border-neutral-900/40 hover:text-white uppercase tracking-wider"
                >
                  // About Me
                </button>
                <button
                  onClick={() => handleScrollToSection("tech")}
                  className="text-left py-2 border-b border-neutral-900/40 hover:text-white uppercase tracking-wider"
                >
                  // Skills Stack
                </button>
                <button
                  onClick={() => handleScrollToSection("projects")}
                  className="text-left py-2 border-b border-neutral-900/40 hover:text-white uppercase tracking-wider"
                >
                  // Projects
                </button>
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="w-full text-center py-3 bg-white text-black rounded-full mt-2 font-bold select-none cursor-pointer uppercase tracking-widest text-[11px]"
                >
                  Let's Talk
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

        {/* Modular Tech Capabilities Services Grid */}
        <Services />

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
      <footer className="relative pt-20 pb-12 border-t border-white/[0.05] bg-[#050505] overflow-hidden select-none">
        {/* Ambient bottom glow lights */}
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-gradient-to-t from-blue-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-gradient-to-t from-cyan-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Main Footer Interaction Core */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.05]">
            
            {/* Column 1: Brand & Bio Hook */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-white text-xs uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  JS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Jestin Shaji</h3>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#06B6D4] font-bold">
                    Backend Developer &amp; Cloud Security Enthusiast
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-sans font-medium">
                Designing ultra-scalable APIs, automated pipelines, and cloud-native systems with modular precision and high performance.
              </p>
            </div>

            {/* Column 2: System Status Indicators */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-extrabold pb-1">
                // ACTIVE SYSTEM STUDS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block font-bold">DB FLOWS</span>
                    <span className="text-gray-300 font-semibold text-[10px]">FIRESTORE SECURE</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase block font-bold">DEPLOY HOST</span>
                    <span className="text-gray-300 font-semibold text-[10px]">CLOUD RUN READY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Communication & Socials */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-extrabold pb-1">
                // EXTERNAL CHANNELS
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-blue-500/30 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="GitHub profile"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-indigo-500/30 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="LinkedIn profile"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="mailto:jestinshaji777@gmail.com"
                  className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-cyan-500/30 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Email"
                >
                  <Mail className="w-4.5 h-4.5" />
                </a>
              </div>
              <p className="text-[10px] text-gray-500 font-mono tracking-normal leading-relaxed">
                Response factor: Within 24 hours.
              </p>
            </div>

          </div>

          {/* Sub Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 font-mono text-[11px] text-gray-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="tracking-wide text-gray-400">
                &copy; 2026 Jestin Shaji. All rights reserved.
              </span>
              <span className="hidden sm:inline text-neutral-800">|</span>
              <span className="text-[10px] text-gray-500">
                Engineered with React &amp; Tailwind CSS
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-650 font-mono text-[10px] uppercase tracking-wider">
              <span className="hover:text-blue-400 transition-colors cursor-help" title="Modern React Frontend">React SPA</span>
              <span>•</span>
              <span className="hover:text-cyan-400 transition-colors cursor-help" title="NoSQL Serverless DB">Firebase</span>
              <span>•</span>
              <span className="hover:text-indigo-400 transition-colors cursor-help" title="Automated DevOps line">Automated Pipelines</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 4. Floating AI Companion Assistant & Back to Top Widgets */}
      <ChatBot />
      <AdminDashboard />

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
