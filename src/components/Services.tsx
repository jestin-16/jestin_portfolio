import { motion } from "motion/react";
import { Database, Server, Cpu, Layers } from "lucide-react";

export default function Services() {
  const servicesData = [
    {
      icon: <Server className="w-5 h-5 text-black" />,
      title: "Backend API Architecture",
      description: "Delivering modular Java controllers, Spring Security filter chains, global exception handlers, and clean service layers.",
      tags: ["RESTful APIs", "Spring Boot", "JWT Auth"],
    },
    {
      icon: <Layers className="w-5 h-5 text-black" />,
      title: "DevOps & Cloud Pipelines",
      description: "Automated delivery pipelines using Docker multi-stage builds, Jenkins CI/CD, and Kubernetes pod clusters.",
      tags: ["Docker", "Kubernetes", "CI/CD"],
    },
    {
      icon: <Cpu className="w-5 h-5 text-black" />,
      title: "Full-Stack Integration",
      description: "Building responsive React & Vite web applications styled with Tailwind CSS to seamlessly consume backend APIs.",
      tags: ["React.js", "Tailwind CSS", "TypeScript"],
    },
    {
      icon: <Database className="w-5 h-5 text-black" />,
      title: "Relational Database Design",
      description: "Optimized PostgreSQL and MySQL schemas, connection pooling, query optimization, and secure index management.",
      tags: ["PostgreSQL", "MySQL", "Optimization"],
    },
  ];

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-neutral-800 text-xs font-mono font-medium"
          >
            <span>WHAT I DO</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-display font-black text-black tracking-tight"
          >
            Services &amp; Capabilities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-neutral-600 font-sans text-xs sm:text-sm max-w-md mx-auto"
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
              className="p-6 rounded-2xl bg-white border border-black/10 hover:border-black hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-black/10 flex items-center justify-center">
                  {serv.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-display font-bold text-black group-hover:underline transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 flex flex-wrap gap-1.5">
                {serv.tags.map((tag, tidx) => (
                  <span
                    key={tidx}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 border border-black/5 text-[10px] font-mono text-neutral-700"
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
