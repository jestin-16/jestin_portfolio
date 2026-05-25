import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECH_STACK } from "../data";
import { Code2, Server, Database, Cloud, Laptop, Brain, Wrench } from "lucide-react";

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tech", icon: <Laptop className="w-4 h-4" /> },
    { id: "programming", label: "Core Lang", icon: <Code2 className="w-4 h-4" /> },
    { id: "backend", label: "Backend Core", icon: <Server className="w-4 h-4" /> },
    { id: "frontend", label: "Visual Frontend", icon: <Laptop className="w-4 h-4" /> },
    { id: "database", label: "Databases", icon: <Database className="w-4 h-4" /> },
    { id: "devops", label: "Cloud & DevOps", icon: <Cloud className="w-4 h-4" /> },
    { id: "ai_ml", label: "AI / ML Networks", icon: <Brain className="w-4 h-4" /> },
    { id: "tools", label: "Productivity Kits", icon: <Wrench className="w-4 h-4" /> }
  ];

  const filteredItems = activeCategory === "all"
    ? TECH_STACK
    : TECH_STACK.filter(item => item.category === activeCategory);

  return (
    <section id="tech" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03]">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] radial-glow rounded-full opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] radial-glow-cyan rounded-full opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Group */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#06B6D4] to-purple-500" />
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-bold">
                02 / Arsenal
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
              Optimized Tech Stack.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl">
              Strict proficiency architecture. Combining heavy computational JVM architectures with real-time responsive client clients.
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium font-mono border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-white text-black border-white shadow-lg scale-105"
                  : "bg-white/[0.02] text-gray-400 border-white/[0.08] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filtered Wall representation grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-xl p-5 border bg-white/[0.01] border-white/[0.04] transition-all duration-300 hover:scale-[1.03] overflow-hidden"
                style={{
                  boxShadow: `hover: 0 10px 30px -10px ${item.glowingColor}`
                }}
              >
                {/* Back Light Glow */}
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${item.glowingColor} 0%, transparent 70%)`
                  }}
                />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-8">
                    {/* Category Label */}
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#06B6D4] px-2 py-0.5 rounded bg-[#06B6D4]/5 border border-[#06B6D4]/10">
                      {item.category}
                    </span>
                    {/* Level Badge */}
                    {item.proficiency && (
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        {item.proficiency}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                      {item.name}
                    </h3>
                    <div className="w-full h-1 bg-white/[0.03] rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: item.proficiency === "Expert" ? "100%" : item.proficiency === "Advanced" ? "80%" : item.proficiency === "Intermediate" ? "60%" : "45%"
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: item.category === "backend" ? "#3B82F6" : item.category === "devops" ? "#A855F7" : "#06B6D4"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
