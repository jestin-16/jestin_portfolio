import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Layers, Shield, Server, Cpu, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className || "h-8 sm:h-10 text-emerald-400"}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

interface TechStackItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  metric: string;
  description: string;
}

const TECH_ITEMS: TechStackItem[] = [
  {
    id: "spring",
    name: "Spring Boot 3",
    category: "Core Backend",
    icon: "🌱",
    metric: "< 12ms REST Latency",
    description: "Production-grade microservices with Spring Data JPA, WebFlux, and custom API filter chains."
  },
  {
    id: "java",
    name: "Java 21 (LTS)",
    category: "JVM Runtime",
    icon: "☕",
    metric: "Virtual Threads",
    description: "High-throughput concurrent processing utilizing Project Loom virtual threads and pattern matching."
  },
  {
    id: "docker",
    name: "Docker Containers",
    category: "Cloud Runtime",
    icon: "🐳",
    metric: "Multi-Stage Builds",
    description: "Alpine-based lightweight container images with layer caching and zero-downtime swarm deploys."
  },
  {
    id: "k8s",
    name: "Kubernetes",
    category: "Orchestration",
    icon: "☸️",
    metric: "Auto-Scaling Pods",
    description: "Declarative manifests for ingress routing, rolling updates, and cluster pod health probes."
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "Relational DB",
    icon: "🐘",
    metric: "ACID Isolation",
    description: "B-Tree index optimization, connection pooling with HikariCP, and query bottleneck refactoring."
  },
  {
    id: "redis",
    name: "Redis Cache",
    category: "In-Memory Store",
    icon: "⚡",
    metric: "Sub-ms Query Cache",
    description: "Distributed session caching, rate limiting tokens, and high-frequency data lookups."
  }
];

const ARCHITECTURE_PILLARS = [
  {
    title: "Microservices Mesh",
    icon: Layers,
    metric: "Decoupled & Resilient",
    desc: "Independent Spring Boot services communicating through REST interfaces, Eureka discovery, and API gateways."
  },
  {
    title: "Security & Filter Chains",
    icon: Shield,
    metric: "Stateless JWT Auth",
    desc: "Granular Spring Security filters, CORS origin validation, BCrypt password hashing, and role-based ACLs."
  },
  {
    title: "Cloud Deployment",
    icon: Server,
    metric: "Containerized Workflows",
    desc: "Automated multi-stage Docker builds, Kubernetes pod management, and CI/CD pipeline automation."
  }
];

export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<string>("spring");

  // Relative scroll progress within section (no scroll locking)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headlineX = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  const activeTechItem = TECH_ITEMS.find((item) => item.id === selectedTech) || TECH_ITEMS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 bg-[#0a0b0e] text-white border-t border-b border-white/[0.06] select-none overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/[0.025] blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full max-w-6xl mx-auto px-6 space-y-16 relative z-10">

        {/* Header Title with Scroll-Driven Kinetic Motion */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 font-mono text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>KINETIC ARCHITECTURE SHOWCASE</span>
          </div>

          <motion.div
            style={{ x: headlineX, opacity: headlineOpacity }}
            className="flex items-center justify-center gap-3 sm:gap-6 pt-2"
          >
            <Bracket className="h-8 sm:h-12 text-emerald-400 shrink-0" />
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-white uppercase">
              SPRING BOOT &amp; CLOUD ARCHITECTURE
            </h2>
            <Bracket className="h-8 sm:h-12 scale-x-[-1] text-emerald-400 shrink-0" />
          </motion.div>

          <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            Scalable backend engineering focusing on high-concurrency Java 21 microservices, containerization, and secure REST APIs.
          </p>
        </div>

        {/* Interactive Stack Grid + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Grid: Tech Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TECH_ITEMS.map((item) => {
              const isSelected = item.id === selectedTech;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTech(item.id)}
                  className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-white/[0.04] text-neutral-400 border-white/10"
                      }`}
                    >
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-sm font-sans font-bold text-white mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {item.category}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Right Inspector Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e1017] border border-white/10 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{activeTechItem.icon}</span>
                <div>
                  <h4 className="text-base font-sans font-bold text-white">
                    {activeTechItem.name}
                  </h4>
                  <span className="text-xs font-mono text-emerald-400">
                    {activeTechItem.category}
                  </span>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                {activeTechItem.metric}
              </div>
            </div>

            <p className="text-xs font-sans text-neutral-300 leading-relaxed">
              {activeTechItem.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                SYSTEM VERIFICATION METRICS
              </span>
              <div className="space-y-1.5 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Stateless JWT &amp; CORS Authorization Enforced</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Optimized PostgreSQL Connection Pooling</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Multi-Stage Docker Layer Caching Enabled</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {ARCHITECTURE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-sans font-bold text-white">
                      {pillar.title}
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {pillar.metric}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export { ScrollShowcase as Skiper31 };
