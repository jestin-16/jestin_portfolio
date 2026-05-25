import { motion } from "motion/react";
import { User, MapPin, Mail, Phone, Award, Compass, Heart, Database } from "lucide-react";
import { JESTIN_BIO } from "../data";

export default function About() {
  const customBioMetrics = [
    {
      icon: <Database className="w-5 h-5 text-[#3B82F6]" />,
      title: "Backend Focus",
      value: "95%",
      description: "Dedicated specialization in Spring Boot microservices and enterprise database schemas.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#06B6D4]" />,
      title: "Solutions Architecting",
      value: "Scalable",
      description: "Engineering clean separation of concerns, Docker clustering, and self-repairing nodes.",
    },
    {
      icon: <Award className="w-5 h-5 text-purple-500" />,
      title: "Academic Excellence",
      value: "MCA Candidate",
      description: "Focusing on distributed database algorithms, REST system security, and data structures.",
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Self-Driven Learning",
      value: "Continuous",
      description: "Actively deploying personal micro-services blueprints to Docker Hub and local Kubernetes nodes.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03]">
      {/* Visual backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 radial-glow rounded-full opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 radial-glow-cyan rounded-full opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Group */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]" />
            <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase font-bold">
              01 / Core Identity
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white"
          >
            Behind the Architecture.
          </motion.h2>
        </div>

        {/* Brand layout in premium Split grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Storyteller Profile & Details */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#3B82F6]/10 to-transparent rounded-bl-full pointer-events-none" />
              <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-4 font-semibold">
                &lt;Professional Brief /&gt;
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                MCA student by record. Cloud Architect and Spring Boot engineer by conviction.
              </h3>
              <p className="text-gray-400 font-sans leading-relaxed text-base mb-6">
                {JESTIN_BIO.aboutFull}
              </p>
              <p className="text-gray-400 font-sans leading-relaxed text-base">
                My workflow integrates systematic, clean code-writing principles (SOLID, DRY) with bleeding-edge deployment operations. Whether establishing secure REST filters or orchestrating heavy multi-stage Jenkins pipelines inside Kubernetes workloads, I commit to delivery latency benchmarks and pristine architecture.
              </p>
            </motion.div>

            {/* Quick Contact Credentials Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <MapPin className="w-5 h-5 text-[#3B82F6] mb-3" />
                  <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">LOCATION</span>
                </div>
                <span className="text-sm font-semibold text-white">{JESTIN_BIO.location}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <Mail className="w-5 h-5 text-[#06B6D4] mb-3" />
                  <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">EMAIL</span>
                </div>
                <a
                  href={`mailto:${JESTIN_BIO.email}`}
                  className="text-sm font-semibold text-white hover:text-[#06B6D4] truncate transition-colors"
                >
                  {JESTIN_BIO.email}
                </a>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <Phone className="w-5 h-5 text-purple-500 mb-3" />
                  <span className="text-xs font-mono text-gray-400 tracking-wider block mb-1">DIAL</span>
                </div>
                <a
                  href={`tel:${JESTIN_BIO.phone}`}
                  className="text-sm font-semibold text-white hover:text-purple-400 transition-colors"
                >
                  {JESTIN_BIO.phone}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Metrics Cards in Bento Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customBioMetrics.map((itm, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative group"
              >
                <div className="p-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg inline-block text-white mb-4 group-hover:scale-110 transition-transform">
                  {itm.icon}
                </div>
                <div className="text-xs font-mono text-gray-500 tracking-wider uppercase mb-1">
                  {itm.title}
                </div>
                <div className="text-2xl font-extrabold text-white mb-2 font-display bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  {itm.value}
                </div>
                <div className="text-xs text-gray-400 leading-relaxed">
                  {itm.description}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
