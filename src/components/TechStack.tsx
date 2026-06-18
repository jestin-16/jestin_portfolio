import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { Cpu, Server, Database, Cloud, Terminal, CheckCircle } from "lucide-react";
import { TechItem } from "../types";

interface TechNode {
  name: string;
  proficiency: string;
  specs: string;
}

export default function TechStack() {
  const { techStack } = useFirebase();
  const [selectedSkill, setSelectedSkill] = useState<TechNode>({
    name: "Spring Boot",
    proficiency: "Expert / Core System",
    specs: "Developing solid, high-throughput microservices, transaction filters, and secure token access.",
  });

  // Align active skill on load
  useEffect(() => {
    if (techStack && techStack.length > 0) {
      const springBoot = techStack.find(t => t.name.toLowerCase().includes("spring"));
      const first = springBoot || techStack[0];
      setSelectedSkill({
        name: first.name,
        proficiency: first.proficiency || "Advanced",
        specs: `Proficient execution of ${first.name} capabilities to drive stable backend logic.`
      });
    }
  }, [techStack]);

  // Dynamically map category names to titles and icons with rich colors
  const categoryMetaData: Record<string, { title: string; icon: React.ReactNode; colorClass: string; hoverShadow: string }> = {
    backend: { 
      title: "Core Backend Stack", 
      icon: <Server className="w-5 h-5 text-amber-400" />, 
      colorClass: "text-amber-400/80 border-amber-500/10", 
      hoverShadow: "group-hover:text-amber-400 group-hover:border-amber-500/35 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.18)]" 
    },
    frontend: { 
      title: "Frontend & UI Tech", 
      icon: <Cpu className="w-5 h-5 text-cyan-400" />, 
      colorClass: "text-cyan-400/80 border-cyan-500/10", 
      hoverShadow: "group-hover:text-cyan-400 group-hover:border-cyan-500/35 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.18)]" 
    },
    database: { 
      title: "Database Ecosystems", 
      icon: <Database className="w-5 h-5 text-fuchsia-400" />, 
      colorClass: "text-fuchsia-400/80 border-fuchsia-500/10", 
      hoverShadow: "group-hover:text-fuchsia-400 group-hover:border-fuchsia-500/35 group-hover:shadow-[0_0_12px_rgba(240,46,170,0.18)]" 
    },
    devops: { 
      title: "DevOps & Cloud Systems", 
      icon: <Cloud className="w-5 h-5 text-emerald-400" />, 
      colorClass: "text-emerald-400/80 border-emerald-500/10", 
      hoverShadow: "group-hover:text-emerald-400 group-hover:border-emerald-500/35 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.18)]" 
    },
    programming: { 
      title: "Languages & Frameworks", 
      icon: <Terminal className="w-5 h-5 text-violet-400" />, 
      colorClass: "text-violet-400/80 border-violet-500/10", 
      hoverShadow: "group-hover:text-violet-400 group-hover:border-violet-500/35 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.18)]" 
    },
    ai_ml: { 
      title: "AI & Machine Learning", 
      icon: <Database className="w-5 h-5 text-rose-400" />, 
      colorClass: "text-rose-400/80 border-rose-500/10", 
      hoverShadow: "group-hover:text-rose-400 group-hover:border-rose-500/35 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.18)]" 
    },
    tools: { 
      title: "Productivity Tools", 
      icon: <Cpu className="w-5 h-5 text-sky-400" />, 
      colorClass: "text-sky-400/80 border-sky-500/10", 
      hoverShadow: "group-hover:text-sky-400 group-hover:border-sky-500/35 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.18)]" 
    },
  };

  // Group techStack dynamically by category
  const categoriesMap = techStack.reduce((acc, tech) => {
    const cat = tech.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  // Render Category grids
  const categories = (Object.entries(categoriesMap) as [string, TechItem[]][]).map(([key, list]) => {
    const meta = categoryMetaData[key] || { 
      title: key.toUpperCase(), 
      icon: <Cpu className="w-5 h-5 text-indigo-400" />, 
      colorClass: "text-indigo-400/80 border-indigo-500/10", 
      hoverShadow: "group-hover:text-indigo-400 group-hover:border-indigo-500/35"
    };
    return {
      title: meta.title,
      icon: meta.icon,
      colorClass: meta.colorClass,
      hoverShadow: meta.hoverShadow,
      skills: list.map(item => ({
        name: item.name,
        proficiency: item.proficiency || "Advanced",
        specs: `Proficient execution of ${item.name} capabilities to drive stable backend logic.`
      }))
    };
  });

  return (
    <section id="tech" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04040b] via-[#020205] to-[#04040d] relative overflow-hidden border-t border-neutral-900/60 select-none">
      
      {/* Background atmospheres */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.035)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.025)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400"
          >
            Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-sans"
          >
            Crafting seamless enterprise backend components and super fluid front-end utilities
          </motion.p>
        </div>

        {/* 4-Column Skills Panels as illustrated in image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, cidx) => (
            <motion.div
              key={cidx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: cidx * 0.1 }}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }}
              className="glass-panel p-6 space-y-6 transition-all duration-300 group overflow-hidden bg-[#0a0a0f]/40 hover:bg-[#0d0d18]/60 hover:shadow-[0_4px_30px_rgba(255,255,255,0.01)]"
            >
              {/* Category Identifier */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl bg-neutral-950 border flex items-center justify-center transition-all ${cat.hoverShadow}`}>
                  {cat.icon}
                </div>
                <h3 className="text-xs font-mono font-black tracking-widest text-[#999] uppercase group-hover:text-neutral-200 transition-colors">
                  {cat.title}
                </h3>
              </div>

              {/* Tag Capsules Row layout - exact same styling as skills list in picture */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sidx) => {
                  const isActive = selectedSkill.name === skill.name;
                  return (
                    <motion.button
                      key={sidx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      className={`px-3.5 py-2 rounded-full text-xs font-sans tracking-tight transition-all duration-300 uppercase cursor-pointer border ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white border-transparent font-black shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-[1.03]"
                          : "bg-white/[0.02] border-white/[0.04] backdrop-blur-md text-neutral-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.05]"
                      }`}
                    >
                      {skill.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Spec Analyzer Reading HUD below the grid */}
        <div className="mt-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel-ultra p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    [Active Node Spec Analysis]
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <h4 className="text-2xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-200">
                  {selectedSkill.name}
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl font-medium">
                  {selectedSkill.specs}
                </p>
              </div>

              {/* Specs Badge */}
              <div className="bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-xl p-5 self-start md:self-center font-mono text-xs space-y-2 shrink-0 shadow-lg min-w-[200px]">
                <div className="space-y-1">
                  <span className="text-[9px] text-neutral-500 block uppercase font-bold tracking-widest">PROFICIENCY COEFFICIENT</span>
                  <span className="text-cyan-400 font-extrabold block text-sm">{selectedSkill.proficiency}</span>
                </div>
                {/* Micro Level Indicator */}
                <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" 
                    style={{ 
                      width: selectedSkill.proficiency.toLowerCase().includes("expert") 
                        ? "95%" 
                        : selectedSkill.proficiency.toLowerCase().includes("advanced") 
                        ? "85%" 
                        : "70%" 
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
