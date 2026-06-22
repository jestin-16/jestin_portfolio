import { motion } from "motion/react";
import { Database, Server, Cpu, Layers } from "lucide-react";

export default function Services() {
  const servicesData = [
    {
      icon: <Server className="w-5 h-5 text-amber-400" />,
      glowColor: "from-amber-500/10 to-transparent",
      hoverBorder: "group-hover:border-amber-500/45 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.18)]",
      hoverIconBg: "group-hover:bg-amber-950/20 group-hover:border-amber-500/30",
      bottomLine: "via-amber-500/40",
      title: "Backend API Integrity (Java & Spring)",
      description: "Delivering modular controllers, global exceptions handler templates, Spring Security filter chains, and decoupled service layers.",
      tags: ["RESTful Endpoints", "SOLID Principles"],
    },
    {
      icon: <Layers className="w-5 h-5 text-fuchsia-400" />,
      glowColor: "from-fuchsia-500/10 to-transparent",
      hoverBorder: "group-hover:border-fuchsia-500/45 group-hover:shadow-[0_0_15px_rgba(240,46,170,0.18)]",
      hoverIconBg: "group-hover:bg-fuchsia-950/20 group-hover:border-fuchsia-500/30",
      bottomLine: "via-fuchsia-500/40",
      title: "DevOps & Cloud Orchestration",
      description: "Automated delivery pipelines using Docker multi-layered files, Jenkins workflow hooks, and local Kubernetes clusters.",
      tags: ["Docker Hub Sync", "Kubernetes Pods"],
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      glowColor: "from-emerald-500/10 to-transparent",
      hoverBorder: "group-hover:border-emerald-500/45 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.18)]",
      hoverIconBg: "group-hover:bg-emerald-950/20 group-hover:border-emerald-500/30",
      bottomLine: "via-emerald-500/40",
      title: "Responsive Frontend Integration",
      description: "Integrating reactive React.js interfaces styled cleanly with Tailwind CSS to perfectly consume, bind, and visualize backend APIs and microservices workflows.",
      tags: ["Vite / React.js", "Tailwind CSS"],
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      glowColor: "from-cyan-500/10 to-transparent",
      hoverBorder: "group-hover:border-cyan-500/45 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.18)]",
      hoverIconBg: "group-hover:bg-cyan-950/20 group-hover:border-cyan-500/30",
      bottomLine: "via-cyan-500/40",
      title: "Relational Storage Systems",
      description: "Rigorous PostgreSQL and MySQL schema alignment, connection pooling configurations, query speed optimization, and secure indexes.",
      tags: ["Database Pools", "Index Optimization"],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#010104] to-[#04040d] relative overflow-hidden border-t border-white/[0.04] select-none">
      
      {/* Soft visual glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 text-glow"
        >
          Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-neutral-300 font-sans text-sm sm:text-base max-w-xl mx-auto font-medium"
        >
          Architecting clean, scalable backends and modern responsive interfaces
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((serv, sidx) => (
          <motion.div
            key={sidx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: sidx * 0.1 }}
            whileHover={{ y: -8, scale: 1.025, transition: { duration: 0.2, ease: "easeOut" } }}
            className={`group relative glass-panel p-6 flex flex-col justify-between pointer-events-auto overflow-hidden bg-white/[0.02] border-white/[0.04] backdrop-blur-md transition-all duration-350 hover:bg-white/[0.05] ${serv.hoverBorder}`}
          >
            {/* Absolute radial glow centered around the hover position inside card */}
            <div className={`absolute -inset-40 bg-radial ${serv.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            {/* Subtle light reflections inside the card */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />

            <div className="space-y-4 relative z-10 font-sans">
              {/* Header Visual with dynamic glow */}
              <div className={`w-10 h-10 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-center transition-all duration-300 ${serv.hoverIconBg}`}>
                {serv.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-300">
                  {serv.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-sans font-medium">
                  {serv.description}
                </p>
              </div>
            </div>

            {/* Bottom tag items pills */}
            <div className="flex flex-col gap-2 pt-6 mt-4 border-t border-white/[0.05] font-mono text-[9px] uppercase tracking-wider relative z-10">
              {serv.tags.map((tg, ti) => (
                <div
                  key={ti}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] backdrop-blur-md flex items-center justify-between text-neutral-300 group-hover:text-neutral-100 group-hover:border-white/[0.08] group-hover:bg-white/[0.04] transition-all duration-300"
                >
                  <span>{tg}</span>
                </div>
              ))}
            </div>

            {/* Glowing line at card base */}
            <div className={`absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent ${serv.bottomLine} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}
