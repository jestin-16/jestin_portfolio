import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";

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

const navigation = [
  { id: "services", label: "What I do" },
  { id: "about", label: "About" },
  { id: "tech", label: "Toolkit" },
  { id: "projects", label: "Selected work" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Writing" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = ["home", ...navigation.map(({ id }) => id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0.1 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowScrollTop(window.scrollY > 700);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="app-root" className="min-h-screen overflow-x-hidden bg-[#fbfaf7] text-neutral-950 font-sans">
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#b9e878]"
        />

        <header
          id="navbar"
          className={`fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-all duration-300 sm:px-6 ${scrolled ? "pt-2" : "pt-3"}`}
        >
          <div className={`mx-auto max-w-6xl rounded-2xl border px-4 transition-all duration-300 sm:px-6 ${scrolled ? "border-black/[0.08] bg-[#fbfaf7]/90 py-3 shadow-[0_10px_40px_rgba(24,24,22,0.06)] backdrop-blur-xl" : "border-transparent bg-transparent py-3"}`}>
            <div className="flex items-center justify-between gap-5">
              <button
                onClick={() => navigateTo("home")}
                className="group flex shrink-0 items-center gap-2.5 text-left"
                aria-label="Jestin Shaji, back to top"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-semibold tracking-tight text-white transition-transform duration-300 group-hover:rotate-[-8deg]">JS</span>
                <span className="font-display text-sm font-semibold tracking-tight">Jestin Shaji</span>
              </button>

              <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    aria-current={activeSection === item.id ? "location" : undefined}
                    className={`relative py-2 text-[11px] transition-colors duration-200 ${activeSection === item.id ? "text-neutral-950" : "text-neutral-500 hover:text-neutral-950"}`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#9acb54]"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                  </button>
                ))}
              </nav>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => navigateTo("contact")}
                  className="hidden items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 text-[11px] font-medium text-white transition duration-300 hover:bg-[#b9e878] hover:text-neutral-950 sm:inline-flex"
                >
                  Let&apos;s talk <ArrowUpRight size={13} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-800 transition-colors hover:border-black/30 lg:hidden"
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                      transition={{ duration: 0.16 }}
                    >
                      {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isMenuOpen && (
                <motion.nav
                  aria-label="Mobile navigation"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="grid gap-1 border-t border-black/[0.08] pt-3">
                    {[{ id: "home", label: "Home" }, ...navigation, { id: "contact", label: "Contact" }].map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.025, duration: 0.2 }}
                        onClick={() => navigateTo(item.id)}
                        className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm text-neutral-600 transition-colors hover:bg-white hover:text-neutral-950"
                      >
                        {item.label}
                        <ArrowUpRight size={13} aria-hidden="true" className="text-neutral-400" />
                      </motion.button>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main>
          <Hero onScrollToProjects={() => navigateTo("projects")} onScrollToContact={() => navigateTo("contact")} />
          <Services />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Blog />
          <Contact />
        </main>

        <Footer onNavigate={navigateTo} />
        <ChatBot />
        <AdminDashboard />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#fbfaf7]/90 text-neutral-900 shadow-[0_8px_30px_rgba(24,24,22,0.12)] backdrop-blur-lg transition-colors hover:bg-[#b9e878] sm:bottom-28 sm:right-8"
            >
            <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
