import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Server, Database, Cloud, Terminal, CheckCircle } from "lucide-react";

interface TechNode {
  name: string;
  proficiency: string;
  specs: string;
}

export default function TechStack() {
  const [selectedSkill, setSelectedSkill] = useState<TechNode>({
    name: "Spring Boot",
    proficiency: "Expert / Core System",
    specs: "Developing solid, high-throughput microservices, transaction filters, and secure token access.",
  });

  const categories = [
    {
      title: "Core Backend Stack",
      icon: <Server className="w-5 h-5 text-neutral-400" />,
      skills: [
        { name: "Java Language", proficiency: "Expert", specs: "Enforcing thread-safety, memory management, and clean SOLID structures." },
        { name: "Spring Boot", proficiency: "Expert / Core System", specs: "Developing solid, high-throughput microservices, transaction filters, and secure token access." },
        { name: "REST APIs", proficiency: "Expert", specs: "Designing clean endpoint schemas, request filtering, and status code alignment." },
        { name: "Java Enterprise", proficiency: "Advanced", specs: "Developing dependency injections and transaction management schemas." },
      ],
    },
    {
      title: "Frontend & UI Tech",
      icon: <Cpu className="w-5 h-5 text-neutral-400" />,
      skills: [
        { name: "React.js", proficiency: "Advanced", specs: "Building customized component state hooks and smooth router animations." },
        { name: "JavaScript", proficiency: "Expert", specs: "Optimized memory layouts, async tasks orchestration, and ES6 triggers." },
        { name: "CSS3 / HTML5", proficiency: "Expert", specs: "Setting semantic visual grids, dark styling variables, and touch boundaries." },
        { name: "Tailwind CSS", proficiency: "Expert", specs: "Using utility definitions and fully fluent responsive viewport classes." },
      ],
    },
    {
      title: "Database Ecosystems",
      icon: <Database className="w-5 h-5 text-neutral-400" />,
      skills: [
        { name: "PostgreSQL", proficiency: "Advanced", specs: "Relational tuning, secure indexes, and balanced connection parameters." },
        { name: "MySQL", proficiency: "Advanced", specs: "Structuring ACID-complying tables and writing fast nested queries." },
        { name: "MongoDB", proficiency: "Intermediate", specs: "Establishing document stores and flexible dynamic configuration models." },
      ],
    },
    {
      title: "DevOps & Cloud Systems",
      icon: <Cloud className="w-5 h-5 text-neutral-400" />,
      skills: [
        { name: "Docker", proficiency: "Advanced", specs: "Writing lightweight alpine configurations and creating clean cached layers." },
        { name: "Kubernetes", proficiency: "Intermediate", specs: "Orchestrating multi-pod replications and rolling updates." },
        { name: "Jenkins Pipelines", proficiency: "Advanced", specs: "Triggering automated workflows, integration compiling, and webhooks." },
        { name: "Git & GitHub", proficiency: "Expert", specs: "Executing secure repositories control, branch merging, and tags audits." },
      ],
    },
  ];

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
              className="bg-[#0b0b10] border border-neutral-900 rounded-2xl p-6 space-y-6 hover:border-neutral-800 transition-all group"
            >
              {/* Category Identifier */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xs font-mono font-black tracking-widest text-[#777] uppercase">
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
                          ? "bg-white text-black border-white font-bold scale-[1.03]"
                          : "bg-[#07070a] border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800"
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
              className="bg-[#0e0e14] border border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-extrabold text-[#3b82f6] uppercase tracking-widest">
                    Active Node Spec analysis
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-2xl font-sans font-black text-white">
                  {selectedSkill.name}
                </h4>
                <p className="text-neutral-400 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl">
                  {selectedSkill.specs}
                </p>
              </div>

              {/* Specs Badge */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 self-start md:self-center font-mono text-xs space-y-1 shrink-0">
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
