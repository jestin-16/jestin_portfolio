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
    <div id="app-root" className="min-h-screen bg-[#0d0f17] text-gray-100 overflow-x-hidden relative font-sans">
      
      {/* 1. Cinematic Floating Particle & Volumetric Fog Backdrop Canvas */}
      <CinematicCanvas />

      {/* 2. Premium Entrance Sequence displaying Name */}
      <AnimatePresence>
        {systemLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", y: -10 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0d0f17] flex flex-col justify-center items-center p-6 text-white select-none overflow-hidden"
          >
            {/* Soft decorative background glow to frame the text */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-pink-500/[0.08] blur-[120px] pointer-events-none" />
            
            <div className="text-center space-y-4 relative z-10">
              
              {/* Cute Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 mb-1"
              >
                <span className="text-pink-400 text-sm animate-bounce">✨</span>
                <span className="text-xs font-heading tracking-widest text-pink-300 uppercase font-semibold">
                  WELCOME &bull; PORTFOLIO
                </span>
                <span className="text-pink-400 text-sm animate-bounce">✨</span>
              </motion.div>

              {/* Main Display Typography Name */}
              <h1 className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-6xl font-heading tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-100 to-indigo-200"
                >
                  JESTIN SHAJI
                </motion.span>
              </h1>

              {/* Sub-label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-xs sm:text-sm font-sans tracking-wide text-neutral-300 font-medium"
              >
                Backend Java Developer &amp; Cloud Security Specialist
              </motion.p>
              
              {/* Sleek minimal progress line ticker */}
              <div className="w-[120px] h-[2px] bg-white/[0.08] rounded-full relative overflow-hidden mx-auto mt-4">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute h-full w-[40%] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Refined Floating Pill Header/Navbar */}
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
                  ? "py-3 bg-[#0d0f17]/60 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  : "py-5 bg-transparent border-b border-transparent"
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                
                {/* Logo */}
                <button
                  onClick={() => handleScrollToSection("home")}
                  className="font-sans text-white text-xs font-bold tracking-widest hover:text-emerald-400 transition-colors cursor-pointer select-none"
                >
                  JESTIN SHAJI
                </button>

                {/* Centered Floating Nav Bar */}
                <nav role="navigation" className="hidden md:flex items-center gap-6 px-6 py-2 bg-white/[0.02] border border-white/[0.06] rounded-full backdrop-blur-xl relative">
                  {["home", "services", "about", "tech", "projects", "contact"].map((item) => {
                    const isActive = activeSection === item;
                    return (
                      <button
                        key={item}
                        onClick={() => handleScrollToSection(item)}
                        className="text-xs font-sans tracking-wide capitalize transition-colors duration-200 cursor-pointer relative py-0.5"
                      >
                        <span className={isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-neutral-200"}>
                          {item === "tech" ? "Skills" : item}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNavItem"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Direct Action trigger */}
                <button
                  onClick={() => handleScrollToSection("contact")}
                  className="hidden md:inline-flex items-center px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-md text-xs font-sans font-semibold transition-colors cursor-pointer"
                >
                  Say Hello
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

            {/* 3. Studio Minimal Footer */}
            <footer className="relative pt-16 pb-12 bg-[#0b0c10] border-t border-white/[0.06] select-none">
              
              <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
                  
                  {/* Brand & Bio */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="px-3 py-1 rounded-full bg-white/[0.04] border border-emerald-500/30 flex items-center gap-1 font-mono text-emerald-300 text-xs font-bold cursor-pointer"
                        onClick={() => handleScrollToSection("home")}
                      >
                        JS
                      </div>
                      <div>
                        <h3 className="text-sm font-display font-bold text-white tracking-wide">
                          Jestin Shaji
                        </h3>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-xs font-sans max-w-sm leading-relaxed">
                      Backend Engineer specialized in Java Spring Boot, microservices architecture, and cloud infrastructure.
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="md:col-span-3 space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Quick Links
                    </h4>
                    <ul className="space-y-1 text-xs font-mono">
                      {[
                        { id: "home", name: "Home" },
                        { id: "services", name: "Services" },
                        { id: "about", name: "About" },
                        { id: "tech", name: "Skills" },
                        { id: "projects", name: "Projects" },
                        { id: "contact", name: "Contact" }
                      ].map((link) => (
                        <li key={link.id}>
                          <button
                            onClick={() => handleScrollToSection(link.id)}
                            className="text-neutral-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>&gt;</span>
                            <span>{link.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Badge */}
                  <div className="md:col-span-3 space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                      Availability
                    </h4>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-emerald-300">Open to Roles</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans">
                        Available for backend development &amp; cloud engineering roles.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sub Footer Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                  
                  <div className="text-neutral-400 font-sans text-xs text-center sm:text-left">
                    &copy; 2026 Jestin Shaji &bull; All rights reserved.
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-emerald-300 transition-all cursor-pointer"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-emerald-300 transition-all cursor-pointer"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="mailto:jestinshaji777@gmail.com"
                      className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-emerald-300 transition-all cursor-pointer"
                      title="Direct Mail"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
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
