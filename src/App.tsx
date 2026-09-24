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
import Footer from "./components/Footer";
import { Skiper31 } from "./components/ScrollShowcase";

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
    }, 1400); // Snappy 1.4s presentation before smoothly revealing portfolio
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
    <div id="app-root" className="min-h-screen bg-white text-black overflow-x-hidden relative font-sans">
      
      {/* 1. Cinematic Floating Particle Backdrop Canvas */}
      <CinematicCanvas />

      {/* 2. Minimal Entrance Sequence displaying Name */}
      <AnimatePresence>
        {systemLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-center items-center p-6 text-black select-none overflow-hidden will-change-[opacity]"
          >
            {/* Soft decorative background glow to frame the text */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-neutral-100 blur-[100px] pointer-events-none" />
            
            <div className="text-center space-y-4 relative z-10 max-w-xl mx-auto">
              
              {/* Monospace System Header Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 mb-2 font-mono"
              >
                <span className="text-neutral-400 text-xs animate-pulse">✦</span>
                <span className="text-[11px] sm:text-xs tracking-[0.28em] text-neutral-600 font-semibold uppercase">
                  SYSTEM INITIALIZING
                </span>
                <span className="text-neutral-400 text-xs animate-pulse">✦</span>
              </motion.div>

              {/* Main Display Typography in Clean Space Grotesk */}
              <h1 className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight uppercase text-black leading-none"
                >
                  JESTIN SHAJI
                </motion.span>
              </h1>

              {/* Sub-label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-xs sm:text-sm font-sans tracking-wide text-neutral-600 font-medium"
              >
                Backend Java Architect <span className="text-neutral-400 mx-1.5">&bull;</span> Cloud Security Specialist
              </motion.p>
              
              {/* Sleek minimal progress line ticker */}
              <div className="w-[180px] h-[2px] bg-neutral-200 rounded-full relative overflow-hidden mx-auto mt-5">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute h-full w-[45%] bg-black rounded-full"
                />
              </div>

              {/* Monospace telemetry status indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-3 font-mono text-[10px] tracking-widest text-neutral-400 uppercase pt-1"
              >
                <span>LOC: IST (UTC+5:30)</span>
                <span>&bull;</span>
                <span className="text-neutral-800 font-semibold">SPRING BOOT 3.x</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Refined Floating Pill Header/Navbar */}
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 font-sans ${
          scrolled
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => handleScrollToSection("home")}
            className="font-sans text-black text-xs font-bold tracking-widest hover:opacity-60 transition-opacity cursor-pointer select-none"
          >
            JESTIN SHAJI
          </button>

          {/* Centered Floating Nav Bar */}
          <nav role="navigation" className="hidden md:flex items-center gap-6 px-6 py-2 bg-neutral-100/90 border border-black/[0.08] rounded-full backdrop-blur-xl relative">
            {["home", "services", "about", "tech", "projects", "contact"].map((item) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  onClick={() => handleScrollToSection(item)}
                  className="text-xs font-sans tracking-wide capitalize transition-colors duration-200 cursor-pointer relative py-0.5"
                >
                  <span className={isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black"}>
                    {item === "tech" ? "Skills" : item}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
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
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-md text-xs font-sans font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Say Hello
          </button>

          {/* Handheld Trigger toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-800 hover:text-black p-2 border border-black/10 bg-white/90 backdrop-blur-md rounded-lg cursor-pointer"
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-black/[0.08] overflow-hidden"
            >
              <nav role="navigation" className="flex flex-col p-6 gap-2 text-xs font-mono font-bold text-neutral-700">
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
                    className="text-left py-2 border-b border-black/[0.04] text-neutral-700 hover:text-black uppercase tracking-wider cursor-pointer font-medium"
                  >
                    // {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  onClick={() => handleScrollToSection("contact")}
                  className="w-full text-center py-3 bg-black text-white hover:bg-neutral-800 rounded-full mt-4 font-bold select-none cursor-pointer uppercase tracking-widest text-[11px]"
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

              {/* Scroll Animation Showcase (Skiper 31) */}
              <Skiper31 />

              {/* Alternate Interactive Cases */}
              <Projects />

              {/* Growth timeline history */}
              <Experience />

              {/* Engineering blog writeups */}
              <Blog />

              {/* Form submittals and Kopiers */}
              <Contact />
            </main>

            {/* 3. Enhanced Studio Footer */}
            <Footer onNavigate={handleScrollToSection} />

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
                  className="fixed bottom-24 right-6 w-11 h-11 rounded-lg bg-white/90 border border-black/10 hover:border-black text-black flex items-center justify-center cursor-pointer shadow-lg backdrop-blur hover:bg-black hover:text-white transition-colors"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        );
      }
