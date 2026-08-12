import { motion } from "motion/react";
import { Database, Server, Cpu, Layers } from "lucide-react";

export default function Services() {
  const servicesData = [
    {
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      title: "Backend API Architecture",
      description: "Delivering modular Java controllers, Spring Security filter chains, global exception handlers, and clean service layers.",
      tags: ["RESTful APIs", "Spring Boot", "JWT Auth"],
    },
    {
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      title: "DevOps & Cloud Pipelines",
      description: "Automated delivery pipelines using Docker multi-stage builds, Jenkins CI/CD, and Kubernetes pod clusters.",
      tags: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack Integration",
      description: "Building responsive React & Vite web applications styled with Tailwind CSS to seamlessly consume backend APIs.",
      tags: ["React.js", "Tailwind CSS", "TypeScript"],
    },
    {
      icon: <Database className="w-5 h-5 text-amber-400" />,
      title: "Relational Database Design",
      description: "Optimized PostgreSQL and MySQL schemas, connection pooling, query optimization, and secure index management.",
      tags: ["PostgreSQL", "MySQL", "Optimization"],
    },
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-[#0b0c10] border-t border-white/[0.06] select-none">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
          >
            <span>WHAT I DO</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight"
          >
            Services &amp; Capabilities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-neutral-400 font-sans text-xs sm:text-sm max-w-md mx-auto"
          >
            Clean, scalable backends and intuitive user interfaces
          </motion.p>
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((serv, sidx) => (
            <motion.div
              key={sidx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sidx * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {serv.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 flex flex-wrap gap-1.5">
                {serv.tags.map((tag, tidx) => (
                  <span
                    key={tidx}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
