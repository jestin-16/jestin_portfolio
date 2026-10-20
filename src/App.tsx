import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X, ArrowUp } from "lucide-react";

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
  const [systemLoading, setSystemLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Custom magnetic cursor position
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Smooth top scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Force scroll lock to top when preloader finishes
  useEffect(() => {
    if (!systemLoading) {
      window.scrollTo(0, 0);
    }
  }, [systemLoading]);

  // Track cursor for custom smooth trailer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section in viewport
  useEffect(() => {
    const sections = ["home", "services", "about", "tech", "projects", "experience", "blog", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
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
      
      {/* 0. Top Hairline Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-black origin-left z-50 pointer-events-none"
      />

      {/* 0. Subtle Minimal Magnetic Cursor Dot (Desktop Only) */}
      <div
        className="hidden lg:block fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x - (isHoveringClickable ? 18 : 6)}px, ${cursorPos.y - (isHoveringClickable ? 18 : 6)}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHoveringClickable
              ? "w-9 h-9 border border-black/40 bg-black/[0.04]"
              : "w-3 h-3 bg-black/60"
          }`}
        />
      </div>

      {/* 1. Cinematic Floating Particle Backdrop Canvas */}
      <CinematicCanvas />

      {/* 2. Minimal Entrance Sequence */}
      <AnimatePresence>
        {systemLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col justify-center items-center p-6 text-black select-none overflow-hidden will-change-[opacity]"
          >
            <div className="absolute w-[400px] h-[400px] rounded-full bg-neutral-100 blur-[80px] pointer-events-none" />
            
            <div className="text-center space-y-4 relative z-10 max-w-xl mx-auto">
              
              {/* Monospace System Header Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                className="text-xs font-mono tracking-widest text-neutral-500 uppercase font-semibold"
              >
                Jestin Shaji · Portfolio 2026
              </motion.div>

              {/* Main Display Typography */}
              <h1 className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight uppercase text-black leading-none"
                >
                  JESTIN SHAJI
                </motion.span>
              </h1>

              {/* Sub-label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xs sm:text-sm font-sans tracking-wide text-neutral-600 font-medium"
              >
                Backend Java Architect <span className="text-neutral-400 mx-1.5">·</span> Cloud Systems Engineer
              </motion.p>
              
              {/* Sleek minimal progress line ticker */}
              <div className="w-[160px] h-[2px] bg-neutral-200 rounded-full relative overflow-hidden mx-auto mt-5">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                  className="absolute h-full w-[45%] bg-black rounded-full"
                />
              </div>

              {/* Monospace telemetry status indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex items-center justify-center gap-3 font-mono text-[10px] tracking-widest text-neutral-400 uppercase pt-1"
              >
                <span>LOC: IST (UTC+5:30)</span>
                <span>·</span>
                <span className="text-neutral-800 font-semibold">SPRING BOOT 3.x</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Bar Navigation Contract: [Brand Mark] - [Nav Links] - [1 Primary Action] */}
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 font-sans ${
          scrolled
            ? "py-3.5 bg-white/90 backdrop-blur-xl border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleScrollToSection("home")}
            className="font-display text-black text-sm font-bold tracking-tight hover:opacity-60 transition-opacity cursor-pointer select-none whitespace-nowrap shrink-0"
          >
            Jestin Shaji
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav role="navigation" className="hidden md:flex items-center gap-7 text-xs font-sans tracking-wide">
            {[
              { id: "services", label: "Capabilities" },
              { id: "about", label: "Philosophy" },
              { id: "tech", label: "Ecosystem" },
              { id: "projects", label: "Projects" },
              { id: "blog", label: "Articles" },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`transition-colors duration-200 cursor-pointer relative py-1 whitespace-nowrap shrink-0 ${
                    isActive ? "text-black font-bold" : "text-neutral-500 hover:text-black font-medium"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScrollToSection("contact")}
              className="hidden md:inline-flex items-center px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-sans font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              Get In Touch
            </button>

            {/* Handheld Trigger toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-neutral-800 hover:text-black p-2 border border-black/10 bg-white/90 backdrop-blur-md rounded-lg cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
                  { id: "services", label: "Capabilities" },
                  { id: "about", label: "Philosophy" },
                  { id: "tech", label: "Ecosystem" },
                  { id: "projects", label: "Projects" },
                  { id: "experience", label: "Experience" },
                  { id: "blog", label: "Articles" },
                ].map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    onClick={() => handleScrollToSection(item.id)}
                    className="text-left py-2 border-b border-black/[0.04] text-neutral-700 hover:text-black uppercase tracking-wider cursor-pointer font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleScrollToSection("contact")}
                  className="w-full text-center py-3 bg-black text-white hover:bg-neutral-800 rounded-full mt-4 font-bold select-none cursor-pointer uppercase tracking-widest text-[11px]"
                >
                  Get In Touch
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

        {/* Form submittals */}
        <Contact />
      </main>

      {/* Enhanced Studio Footer */}
      <Footer onNavigate={handleScrollToSection} />

      {/* Floating AI Companion Assistant */}
      <ChatBot />
      <AdminDashboard />

      {/* Back to top with spring physics */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToTop}
            title="Back to Top"
            className="fixed bottom-24 right-6 w-11 h-11 rounded-full bg-white border border-black/15 hover:border-black text-black flex items-center justify-center cursor-pointer shadow-lg backdrop-blur hover:bg-black hover:text-white transition-all z-40"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
