import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Code2, MapPin } from "lucide-react";
import { useFirebase } from "../context/FirebaseContext";

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

const layers = [
  { name: "Interface", title: "A clear way in.", detail: "Thoughtful API contracts. Predictable responses." },
  { name: "Logic", title: "One purpose, well made.", detail: "Cohesive Java services, built with Spring Boot." },
  { name: "Delivery", title: "Ready for the real world.", detail: "Containerized services. Repeatable cloud deployments." },
];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const { bio } = useFirebase();
  const [activeLayer, setActiveLayer] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef);
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-heading" data-animate={isInView && !reduceMotion} className="hero-section px-6 text-[#252921] sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="hero-layout">
          <div className="hero-copy">
            <motion.div {...reveal(0)} className="mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.06em] text-[#64734f]">
              <span className="availability-dot" aria-hidden="true" />
              Available for backend &amp; cloud roles
            </motion.div>

            <motion.p {...reveal(0.08)} className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">Developer. Builder. Always curious.</motion.p>
            <h1 id="hero-heading" className="hero-name">
              <motion.span {...reveal(0.15)} className="inline-block">Jestin</motion.span>{" "}
              <motion.span {...reveal(0.24)} className="inline-block font-serif font-normal italic tracking-[-0.055em] text-[#71854e]">Shaji.</motion.span>
            </h1>

            <motion.h2 {...reveal(0.32)} className="hero-statement font-display">
              Complex problems.<br />Clear, dependable systems.
            </motion.h2>
            <motion.p {...reveal(0.4)} className="mt-4 max-w-[25rem] text-sm leading-7 text-neutral-500">
              I build the software behind the experience — from thoughtful Java APIs to the cloud infrastructure they call home.
            </motion.p>

            <motion.div {...reveal(0.48)} className="mt-7 flex flex-wrap items-center gap-5">
              <motion.button type="button" onClick={onScrollToProjects} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="hero-primary group">
                Explore my work <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.button>
              <button type="button" onClick={onScrollToContact} className="group inline-flex min-h-11 items-center gap-2 text-xs text-neutral-600 transition-colors hover:text-[#506237]">
                Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          <motion.div {...reveal(0.35)} className="hero-study" aria-label="Explore my approach to architecture">
            <div className="flex items-center justify-between px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500">
              <span>Under the surface</span><span className="text-[#949b88]">A study in layers</span>
            </div>
            <div className="hero-layer-drawing">
              <div className="hero-study-grid" aria-hidden="true" />
              <svg viewBox="0 0 480 350" className="h-full w-full overflow-visible" role="img" aria-label={`Architecture layers: interface, service logic, and cloud delivery. ${layers[activeLayer].name} highlighted.`}>
                <g fill="none" stroke="#d7decd" strokeWidth="1" strokeDasharray="3 5" aria-hidden="true">
                  <path d="M240 14V335M54 129L240 31L426 129M54 233L240 331L426 233" />
                </g>
                {[2, 1, 0].map((index) => (
                  <motion.g key={index} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.4 + (2 - index) * 0.13, ease }}>
                    <g transform={`translate(0 ${index * 53})`} className="hero-plane" data-active={activeLayer === index}>
                      <path d="M72 128L232 43Q240 39 248 43L408 128L408 137Q408 141 402 144L248 226Q240 230 232 226L78 144Q72 141 72 137Z" className="hero-plane-edge" />
                      <path d="M78 121L232 39Q240 35 248 39L402 121Q414 128 402 135L248 217Q240 221 232 217L78 135Q66 128 78 121Z" className="hero-plane-face" />
                      {index === 0 && (
                        <g aria-hidden="true">
                          <path d="M109 129L240 59L371 129L240 199Z" fill="none" stroke="#dbe3d0" strokeDasharray="2 5" />
                          <Code2 x={219} y={101} width={42} height={32} strokeWidth={1.2} className="text-[#73865b]" />
                          <text x="240" y="151" textAnchor="middle" className="hero-plane-label">API / INTERFACE</text>
                        </g>
                      )}
                      {index > 0 && <text x="240" y="198" textAnchor="middle" className="hero-plane-label">{index === 1 ? "JAVA / SPRING BOOT" : "CONTAINERS / CLOUD"}</text>}
                    </g>
                  </motion.g>
                ))}
                <circle className="hero-study-dot" cx="240" cy="20" r="3" fill="#8c9f70" aria-hidden="true" />
              </svg>
              <span className="hero-study-note" aria-hidden="true">simple, at every layer.</span>
            </div>
            <div className="hero-layer-controls" role="group" aria-label="Highlight an architecture layer">
              {layers.map((layer, index) => (
                <button key={layer.name} type="button" aria-pressed={activeLayer === index} aria-controls="hero-layer-description" onClick={() => setActiveLayer(index)}>
                  <span className="font-mono text-[9px] opacity-60">0{index + 1}</span>{layer.name}
                </button>
              ))}
            </div>
            <div id="hero-layer-description" className="hero-layer-description" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeLayer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>
                  <p className="text-xs font-medium text-[#536344]">{layers[activeLayer].title}</p>
                  <p className="mt-1.5 text-[11px] leading-5 text-neutral-500">{layers[activeLayer].detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div {...reveal(0.65)} className="hero-baseline">
          <span className="flex items-center gap-2 text-[11px] text-neutral-500"><MapPin size={12} aria-hidden="true" />{bio.location || "Kerala, India"}</span>
          <div className="flex flex-wrap items-center gap-5 text-[10px] text-neutral-500 sm:gap-7">
            {["Java", "Spring Boot", "PostgreSQL", "Docker", "AWS"].map((name) => <span key={name}>{name}</span>)}
          </div>
          <button type="button" onClick={onScrollToProjects} className="group hidden min-h-10 items-center gap-2 text-[10px] text-neutral-500 transition-colors hover:text-[#506237] sm:inline-flex">Selected work<ArrowDown size={12} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" /></button>
        </motion.div>
      </div>
    </section>
  );
}
