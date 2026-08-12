import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { Cpu, Server, Database, Cloud, Terminal } from "lucide-react";
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
    proficiency: "Expert",
    specs: "Developing solid microservices, transaction filters, and Spring Security token validation.",
  });

  useEffect(() => {
    if (techStack && techStack.length > 0) {
      const springBoot = techStack.find(t => t.name.toLowerCase().includes("spring"));
      const first = springBoot || techStack[0];
      setSelectedSkill({
        name: first.name,
        proficiency: first.proficiency || "Advanced",
        specs: `Proficient execution of ${first.name} capabilities across cloud microservices.`
      });
    }
  }, [techStack]);

  const categoryMetaData: Record<string, { title: string; icon: React.ReactNode }> = {
    backend: { title: "Backend Core", icon: <Server className="w-4 h-4 text-emerald-400" /> },
    frontend: { title: "Frontend UI", icon: <Cpu className="w-4 h-4 text-amber-400" /> },
    database: { title: "Databases", icon: <Database className="w-4 h-4 text-emerald-400" /> },
    devops: { title: "DevOps & Cloud", icon: <Cloud className="w-4 h-4 text-amber-400" /> },
    programming: { title: "Languages", icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    ai_ml: { title: "AI & Tools", icon: <Database className="w-4 h-4 text-amber-400" /> },
    tools: { title: "Developer Tools", icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
  };

  const categoriesMap = techStack.reduce((acc, tech) => {
    const cat = tech.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  const categories = (Object.entries(categoriesMap) as [string, TechItem[]][]).map(([key, list]) => {
    const meta = categoryMetaData[key] || { 
      title: key.toUpperCase(), 
      icon: <Cpu className="w-4 h-4 text-emerald-400" />, 
    };
    return {
      title: meta.title,
      icon: meta.icon,
      skills: list.map(item => ({
        name: item.name,
        proficiency: item.proficiency || "Advanced",
        specs: `Proficient execution of ${item.name} capabilities.`
      }))
    };
  });

  return (
    <section id="tech" className="py-20 px-6 md:px-12 bg-[#0b0c10] border-t border-white/[0.06] select-none">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
          >
            <span>TECH STACK</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight"
          >
            Skills &amp; Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-neutral-400 font-sans text-xs sm:text-sm max-w-md mx-auto"
          >
            Core tools &amp; frameworks powering backend applications
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, cidx) => (
            <motion.div
              key={cidx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: cidx * 0.06 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sidx) => {
                  const isActive = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={sidx}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-2.5 py-1 rounded-full text-xs font-heading font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-500 text-black font-bold shadow-sm"
                          : "bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
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

        {/* Selected Skill Analyzer Box */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  SELECTED SKILL SPEC
                </span>
                <h4 className="text-lg font-display font-bold text-white">
                  {selectedSkill.name}
                </h4>
                <p className="text-neutral-400 text-xs font-sans max-w-xl">
                  {selectedSkill.specs}
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-xs font-mono space-y-1 shrink-0 min-w-[180px]">
                <span className="text-[10px] text-neutral-400 block font-semibold uppercase">
                  Proficiency
                </span>
                <span className="text-emerald-300 font-bold block text-xs">
                  {selectedSkill.proficiency}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
