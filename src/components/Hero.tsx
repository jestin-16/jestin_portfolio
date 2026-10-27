import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

const roles = [
  "Backend Java Engineer",
  "Spring Boot Architect",
  "Cloud Systems Builder",
  "Distributed Systems Engineer",
  "Microservices Specialist",
];

const metrics = [
  { value: "Java 21", label: "Virtual threads" },
  { value: "Spring Boot 3", label: "Service architecture" },
  { value: "< 120ms", label: "P99 latency target" },
  { value: "Docker + K8s", label: "Cloud delivery" },
];

const focusAreas = [
  {
    number: "01",
    title: "Clear service boundaries",
    description: "Cohesive Java services with responsibilities that stay easy to reason about.",
  },
  {
    number: "02",
    title: "Secure API design",
    description: "Stateless authentication, predictable contracts, and deliberate data access.",
  },
  {
    number: "03",
    title: "Ready to ship",
    description: "Containerized delivery with repeatable CI/CD and cloud operations.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] items-center overflow-hidden px-6 pb-16 pt-32 text-neutral-950 sm:min-h-[840px] sm:px-10 sm:pb-20 lg:min-h-[92vh] lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-44 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(185,232,120,0.22)_0%,rgba(185,232,120,0.08)_34%,transparent_70%)] blur-2xl sm:-right-28"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:gap-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]"
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeOut" }}
                className="absolute h-full w-full rounded-full bg-[#8fbd4e]"
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#84b63e]" />
            </span>
            <span>Open to backend &amp; cloud roles</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{bio.location || "Kerala, India"}</span>
          </motion.div>

          <h1 className="font-hero text-[clamp(4.25rem,13vw,9.5rem)] leading-[0.9]">
            <span className="block overflow-hidden pb-3">
              <motion.span
                initial={{ y: "110%", rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease }}
                className="block origin-bottom"
              >
                Jestin
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span
                initial={{ y: "110%", rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.16, ease }}
                className="block origin-bottom"
              >
                Shaji<span className="text-[#8fbd4e]">.</span>
              </motion.span>
            </span>
          </h1>

          <div className="mt-8 flex min-h-9 items-center gap-3 text-lg font-medium tracking-tight text-neutral-700 sm:text-xl">
            <span className="h-px w-8 bg-[#8fbd4e]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roleIndex}
                aria-live="polite"
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease }}
            className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8"
          >
            I design dependable software systems, from clean Spring Boot services and secure APIs to the cloud infrastructure that runs them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ y: -3, boxShadow: "0 14px 32px rgba(24,24,22,.13)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onScrollToProjects}
              className="group inline-flex items-center gap-3 rounded-full bg-neutral-950 px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[#b9e878] hover:text-neutral-950 sm:px-6 sm:py-3.5"
            >
              Explore my work
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onScrollToContact}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-950 sm:px-6 sm:py-3.5"
            >
              Get in touch <ArrowDownRight size={14} />
            </motion.button>
          </motion.div>

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-5 lg:hidden">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.58 + index * 0.06, ease }}
                className="space-y-1"
              >
                <span className="block text-sm font-medium tracking-tight text-neutral-800">{metric.value}</span>
                <span className="block text-[10px] text-neutral-400">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative hidden overflow-hidden rounded-[1.75rem] bg-[#191a16] px-7 py-8 text-white shadow-[0_24px_70px_rgba(23,24,20,0.12)] lg:block xl:px-9 xl:py-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(185,232,120,0.17),transparent_68%)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b9e878]" />
                Engineering focus
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#b9e878]"
              >
                <Sparkles size={14} />
              </motion.span>
            </div>

            <h2 className="mt-9 max-w-[16rem] font-display text-3xl font-medium leading-tight tracking-[-0.055em] text-white xl:text-4xl">
              Thoughtful at every <span className="font-serif italic text-[#b9e878]">layer.</span>
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-6 text-neutral-400">
              Reliable systems start with simple decisions made well.
            </p>

            <div className="relative mt-7">
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="absolute bottom-5 left-[11px] top-5 w-px origin-top bg-white/10"
              />
              <div className="divide-y divide-white/10">
                {focusAreas.map((area, index) => (
                  <motion.div
                    key={area.number}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.52 + index * 0.12, ease }}
                    whileHover={{ x: 3 }}
                    className="group relative grid grid-cols-[24px_1fr] gap-3 py-4"
                  >
                    <span className="relative z-10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#191a16] font-mono text-[8px] text-[#b9e878] transition-colors group-hover:border-[#b9e878]">
                      {area.number}
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-neutral-100">{area.title}</span>
                      <span className="mt-1.5 block text-[10px] leading-5 text-neutral-400">{area.description}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:flex"
        >
          <span>Scroll to explore</span>
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={12} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
