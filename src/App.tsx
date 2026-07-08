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
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemLoading(false);
    }, 2400); // 2.4 seconds presentation before revealing portfolio
    return () => clearTimeout(timer);
  }, []);

  // Force scroll lock to top when preloader turns off
  useEffect(() => {
    if (!systemLoading) {
      window.scrollTo(0, 0);
    }
  }, [systemLoading]);

  // Track active section in viewport for high-end navigation pill morphing
  useEffect(() => {
    const sections = ["home", "services", "about", "tech", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the active view space
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
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
      <AnimatePresence>
        {!systemLoading && (
          <motion.div
            key="main-portfolio"
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <header
              id="navbar"
              className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 font-sans ${
                scrolled
                  ? "py-4 bg-[#050508]/40 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                  : "py-6 bg-transparent border-b border-transparent"
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                
                {/* Solid circular logo icon */}
                <button
                  onClick={() => handleScrollToSection("home")}
                  className="w-10 h-10 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-cyan-500/30 flex items-center justify-center font-black text-white uppercase text-xs cursor-pointer select-none tracking-wider shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.18)] hover:scale-105 transition-all duration-300"
                >
                  js
                </button>

                {/* Centered Floating Nav Bar (As shown in screenshot) */}
                <nav role="navigation" className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/[0.06] rounded-full backdrop-blur-xl relative">
                  {["home", "services", "about", "tech", "projects"].map((item) => {
                    const isActive = activeSection === item;
                    return (
                      <button
                        key={item}
                        onClick={() => handleScrollToSection(item)}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer rounded-full relative z-10`}
                      >
                        <span className={`relative z-10 ${isActive ? "text-cyan-300 font-bold" : "text-neutral-400 hover:text-white"}`}>
                          {item === "tech" ? "Skills" : item}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNavItem"
                            className="absolute inset-0 bg-white/[0.06] border border-white/[0.05] rounded-full z-0 shadow-inner"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Let's Talk Pill shape trigger */}
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="hidden md:inline-block px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40 rounded-full text-xs font-black tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg backdrop-blur-md"
                >
                  Let's Talk
                </button>

                {/* Handheld Trigger toggle */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-gray-300 hover:text-white p-2 border border-white/10 bg-white/[0.03] backdrop-blur-md rounded-lg cursor-pointer"
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden bg-[#07070b]/80 backdrop-blur-2xl border-b border-white/[0.05] overflow-hidden"
                  >
                    <nav role="navigation" className="flex flex-col p-6 gap-2 text-xs font-mono font-bold text-gray-400">
                      {[
                        { id: "home", label: "Home" },
                        { id: "services", label: "Services" },
                        { id: "about", label: "About Me" },
                        { id: "tech", label: "Skills Stack" },
                        { id: "projects", label: "Projects" },
                      ].map((item, idx) => (
                        <motion.button
                          key={item.id}
                          initial={{ x: -16, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                          onClick={() => handleScrollToSection(item.id)}
                          className="text-left py-2 border-b border-white/[0.03] hover:text-white uppercase tracking-wider cursor-pointer font-medium"
                          style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                        >
                          // {item.label}
                        </motion.button>
                      ))}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        onClick={() => handleScrollToSection("contact")}
                        className="w-full text-center py-3 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 rounded-full mt-4 font-black select-none cursor-pointer uppercase tracking-widest text-[11px] backdrop-blur-md"
                      >
                        Let's Talk
                      </motion.button>
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
            <footer className="relative pt-24 pb-16 border-t border-white/[0.04] bg-[#020205] overflow-hidden select-none">
              {/* Premium Top Glow Separator Line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 via-indigo-500/40 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" />
              
              {/* Ambient bottom glow lights (Enhanced color opacity) */}
              <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-gradient-to-t from-indigo-500/[0.06] to-transparent rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-gradient-to-t from-cyan-500/[0.06] to-transparent rounded-full blur-[120px] pointer-events-none" />

              {/* Grid Background Overlay for high-end technical feel */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Main Footer Interaction Core */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.05]">
                  
                  {/* Column 1: Brand & Bio Hook (Enhanced visual weight and branding) */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="flex items-center gap-4">
                      {/* Premium holographic hexagonal or rounded logo container with visual breath */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/[0.08] hover:border-cyan-500/50 flex items-center justify-center font-black text-white text-sm uppercase tracking-widest relative group transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
                        onClick={() => handleScrollToSection("home")}
                      >
                        {/* Interactive neon circle backdrop */}
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <span className="relative z-10 font-mono tracking-tighter">JS</span>
                      </motion.div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5 font-sans">
                          Jestin Shaji
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                        </h3>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-extrabold bg-cyan-500/[0.06] border border-cyan-500/20 px-2 py-0.5 rounded-md w-fit mt-1">
                          System Architect &bull; Cloud Engineer
                        </p>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-sans font-medium">
                      Architecting robust server-side structures, lightning-fast endpoints, automated pipeline orchestration, and resilient cybersecure infrastructure.
                    </p>
                  </div>

                  {/* Column 2: System Portals (Quick navigation links) */}
                  <div className="md:col-span-3 space-y-5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-black flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-sm" />
                      System Portals
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-sans font-semibold">
                      {[
                        { id: "home", name: "Home Node" },
                        { id: "services", name: "Services" },
                        { id: "about", name: "About Spec" },
                        { id: "tech", name: "Skills Core" },
                        { id: "projects", name: "Projects" },
                        { id: "contact", name: "Terminal Gate" }
                      ].map((link) => (
                        <li key={link.id}>
                          <button
                            onClick={() => handleScrollToSection(link.id)}
                            className="text-neutral-400 hover:text-cyan-400 hover:translate-x-1.5 transition-all duration-300 flex items-center gap-1 cursor-pointer font-medium"
                          >
                            <span className="font-mono text-[9px] text-neutral-600 group-hover:text-cyan-500">&gt;</span>
                            {link.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Telemetry & Status Indicators (More attractive status metrics) */}
                  <div className="md:col-span-4 space-y-5">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-black flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-sm" />
                      Network Telemetry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      
                      <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        </span>
                        <div>
                          <span className="text-[8px] text-neutral-500 block font-extrabold tracking-wider">DATABASE FLOW</span>
                          <span className="text-emerald-300 font-bold text-[10px] tracking-wide">FIRESTORE ACTIVE</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        </span>
                        <div>
                          <span className="text-[8px] text-neutral-500 block font-extrabold tracking-wider">ROUTER LATENCY</span>
                          <span className="text-cyan-300 font-bold text-[10px] tracking-wide">14ms // EXTREME</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all duration-300 flex items-center gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] sm:col-span-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        </span>
                        <div className="flex-1 flex justify-between items-center pr-1">
                          <div>
                            <span className="text-[8px] text-neutral-500 block font-extrabold tracking-wider">HOST INGRESS</span>
                            <span className="text-indigo-300 font-bold text-[10px] tracking-wide">CLOUD RUN SECURE</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold">SSL_v3</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Sub Footer Row */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-10 relative">
                  
                  {/* Left element: Bio hook & channels */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    
                    <div className="space-y-1">
                      <div className="text-neutral-400 font-mono text-xs font-semibold tracking-wide flex items-center justify-center sm:justify-start gap-2">
                        <span>&copy; 2026 Jestin Shaji.</span>
                        <span className="text-neutral-700">|</span>
                        <span className="text-neutral-500 font-medium">All systems online.</span>
                      </div>
                      <p className="text-[10px] text-neutral-600 font-mono">
                        Cryptographically secure interface built with React &amp; Tailwind CSS
                      </p>
                    </div>
                  </div>

                  {/* Middle element: Enhanced Social channels styled as keypad */}
                  <div className="flex items-center gap-3 bg-white/[0.01] border border-white/[0.04] p-1.5 rounded-2xl backdrop-blur-md">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 cursor-pointer"
                      title="GitHub Transmission"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-blue-500/30 hover:bg-blue-500/[0.03] hover:shadow-[0_0_15px_rgba(59,130,246,0.18)] flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-all duration-300 cursor-pointer"
                      title="LinkedIn Secure Link"
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="mailto:jestinshaji777@gmail.com"
                      className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:bg-cyan-500/[0.03] hover:shadow-[0_0_15px_rgba(6,182,212,0.18)] flex items-center justify-center text-neutral-400 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
                      title="Direct Mail Dispatch"
                    >
                      <Mail className="w-4.5 h-4.5" />
                    </a>
                  </div>

                  {/* Right element: Tech pill metrics */}
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono tracking-widest uppercase">
                    <span className="px-2.5 py-1 rounded-md bg-[#020205] border border-white/[0.04] text-neutral-500 hover:text-blue-400 hover:border-blue-500/20 transition-all duration-300 cursor-help" title="Responsive React SPA">REACT_SPA</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#020205] border border-white/[0.04] text-neutral-500 hover:text-cyan-400 hover:border-cyan-500/20 transition-all duration-300 cursor-help" title="NoSQL Database Architecture">FIREBASE_FIRESTORE</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#020205] border border-white/[0.04] text-neutral-500 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300 cursor-help" title="Serverless Container Ingress">GCP_RUN</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
