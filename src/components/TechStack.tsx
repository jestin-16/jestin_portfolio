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

  // Dynamically map category names to titles and icons
  const categoryMetaData: Record<string, { title: string; icon: React.ReactNode }> = {
    backend: { title: "Core Backend Stack", icon: <Server className="w-5 h-5 text-neutral-400" /> },
    frontend: { title: "Frontend & UI Tech", icon: <Cpu className="w-5 h-5 text-neutral-400" /> },
    database: { title: "Database Ecosystems", icon: <Database className="w-5 h-5 text-neutral-400" /> },
    devops: { title: "DevOps & Cloud Systems", icon: <Cloud className="w-5 h-5 text-neutral-400" /> },
    programming: { title: "Languages & Frameworks", icon: <Terminal className="w-5 h-5 text-neutral-400" /> },
    ai_ml: { title: "AI & Machine Learning", icon: <Database className="w-5 h-5 text-neutral-400" /> },
    tools: { title: "Productivity Tools", icon: <Cpu className="w-5 h-5 text-neutral-400" /> },
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
    const meta = categoryMetaData[key] || { title: key.toUpperCase(), icon: <Cpu className="w-5 h-5 text-neutral-400" /> };
    return {
      title: meta.title,
      icon: meta.icon,
      skills: list.map(item => ({
        name: item.name,
        proficiency: item.proficiency || "Advanced",
        specs: `Proficient execution of ${item.name} capabilities to drive stable backend logic.`
      }))
    };
  });

  return (
    <section id="tech" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-neutral-900 select-none">
      
      {/* Background atmospheres */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white"
          >
            Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto font-sans"
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
              className="glass-panel p-6 space-y-6 hover:border-neutral-700/50 hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
            >
              {/* Category Identifier */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-xs font-mono font-black tracking-widest text-[#777] uppercase group-hover:text-neutral-400 transition-colors">
                  {cat.title}
                </h3>
              </div>

              {/* Tag Capsules Row layout - exact same styling as skills list in picture */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sidx) => {
                  const isActive = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={sidx}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      className={`px-3.5 py-2 rounded-full text-xs font-sans tracking-tight transition-all uppercase cursor-pointer border ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white border-transparent font-bold scale-[1.04] shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                          : "bg-[#07070a]/40 border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-850"
                      }`}
                    >
                      {skill.name}
                    </button>
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
              className="glass-panel p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-[0_4px_30px_rgba(6,182,212,0.06)] hover:border-cyan-500/20"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest">
                    Active Node Spec analysis
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-2xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-cyan-200">
                  {selectedSkill.name}
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl">
                  {selectedSkill.specs}
                </p>
              </div>

              {/* Specs Badge */}
              <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 self-start md:self-center font-mono text-xs space-y-1 shrink-0">
                <span className="text-[9px] text-neutral-500 block uppercase font-bold tracking-widest">PROFICIENCY COEFFICIENT</span>
                <span className="text-white font-bold block">{selectedSkill.proficiency}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
