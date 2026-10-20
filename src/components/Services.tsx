import { motion } from "motion/react";
import { Database, Server, Cpu, Layers, ArrowUpRight } from "lucide-react";

export default function Services() {
  const servicesData = [
    {
      num: "01",
      icon: <Server className="w-5 h-5 text-black" />,
      title: "Backend API Architecture",
      description: "Engineering modular Java controllers, Spring Security filter chains, global exception handlers, and clean domain service layers.",
      tags: ["RESTful APIs", "Spring Boot 3", "JWT Auth", "Postman"],
    },
    {
      num: "02",
      icon: <Layers className="w-5 h-5 text-black" />,
      title: "DevOps & Cloud Pipelines",
      description: "Automated multi-stage Docker builds, Jenkins CI/CD automation pipelines, Kubernetes pod manifests, and cluster deployments.",
      tags: ["Docker", "Kubernetes", "Jenkins CI/CD", "AWS EKS"],
    },
    {
      num: "03",
      icon: <Cpu className="w-5 h-5 text-black" />,
      title: "Full-Stack Integration",
      description: "Constructing modern React & TypeScript applications with Tailwind CSS to seamlessly consume decoupled backend REST microservices.",
      tags: ["React 19", "TypeScript", "Tailwind CSS", "Vite"],
    },
    {
      num: "04",
      icon: <Database className="w-5 h-5 text-black" />,
      title: "Relational Database Design",
      description: "Optimizing PostgreSQL and MySQL schemas, connection pooling with HikariCP, ACID transactions, and query index performance tuning.",
      tags: ["PostgreSQL", "MySQL", "HikariCP", "JPA / Hibernate"],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Heading with Zero-Pill Editorial Discipline */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-neutral-500 uppercase font-semibold"
          >
            01 · Capabilities &amp; Services
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight"
          >
            Engineered For Scale &amp; Reliability
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-600 font-sans text-xs sm:text-sm max-w-lg mx-auto leading-relaxed"
          >
            Production-grade Java services, distributed database architectures, and automated cloud infrastructure delivery.
          </motion.p>
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((serv, sidx) => (
            <motion.div
              key={sidx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sidx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-7 rounded-2xl bg-white border border-black/10 hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top corner index */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-200">
                  {serv.icon}
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-black transition-colors">
                  {serv.num}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="text-base font-display font-bold text-black group-hover:text-neutral-900 transition-colors">
                  {serv.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {serv.description}
                </p>
              </div>

              {/* Clean unboxed metadata with separators */}
              <div className="pt-4 border-t border-black/[0.08] flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono text-neutral-500">
                {serv.tags.map((tag, tidx) => (
                  <span key={tidx} className="flex items-center gap-1.5">
                    <span className="text-neutral-700">{tag}</span>
                    {tidx < serv.tags.length - 1 && <span className="text-neutral-300">·</span>}
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
