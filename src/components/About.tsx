import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import InteractiveConsole from "./InteractiveConsole";

export default function About() {
  const { bio } = useFirebase();

  const approaches = [
    {
      step: "01",
      title: "Analyze Scope & Schema",
      description: "Deconstructing domain models, analyzing relational dependency cascades, and planning database isolation metrics.",
    },
    {
      step: "02",
      title: "Design SOLID Core APIs",
      description: "Writing strictly typed, encapsulated controller paths, exception resolvers, and Spring Security token validations.",
    },
    {
      step: "03",
      title: "Containerize & Release",
      description: "Packaging targets into optimized lightweight Docker image layers and routing via Kubernetes automated cloud clusters.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-neutral-900 select-none">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Section Header */}
        <div className="space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-white"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-500 text-xs font-mono tracking-widest uppercase font-extrabold"
          >
            // Pursuing Master of Computer Applications (MCA)
          </motion.p>
        </div>

        {/* Balanced Grid for bio and interactive terminal simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Biography Narrative (Col span: 6/7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#06b6d4] font-bold uppercase tracking-widest block">
                [SYSTEM INTRODUCTORY] BIOGRAPHY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Fusing high-performance Java JVM execution with agile cloud-native APIs.
              </h3>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line font-medium"
            >
              {bio.aboutFull}
            </motion.p>

            <div className="flex flex-wrap gap-3 text-[10px] font-mono text-[#06b6d4] pt-2">
              <span className="px-3.5 py-2 bg-neutral-950/60 border border-neutral-900 rounded-xl">STATUS: Actively Engineering APIs</span>
              <span className="px-3.5 py-2 bg-[#09090d] border border-neutral-850 rounded-xl">DEGREE: Master of Computer Applications</span>
              <span className="px-3.5 py-2 bg-neutral-950/60 border border-neutral-900 rounded-xl font-bold">LOCATION: {bio.location}</span>
            </div>
          </div>

          {/* Right Block: Live Spring Boot Actuator console (Col span: 5) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-full flex justify-center"
            >
              <InteractiveConsole />
            </motion.div>
          </div>

        </div>

        {/* High quality divider */}
        <div className="h-px bg-neutral-900 w-full my-8" />

        {/* Sub-heading Approach */}
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold text-white tracking-tight">
            My Approach
          </h3>
          <div className="w-12 h-0.5 bg-neutral-800 mx-auto rounded" />
        </div>

        {/* Tri-fold Horizontal Approach Bento Containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          {approaches.map((appr, aidx) => (
            <motion.div
              key={aidx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: aidx * 0.12 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="glass-panel p-6 relative overflow-hidden group hover:border-[#06b6d4]/35 transition-all duration-300"
            >
              {/* Internal subtle shift glow background */}
              <div className="absolute -inset-24 bg-gradient-to-r from-blue-500/[0.02] via-purple-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* Large high-contrast index indicator with glow styling */}
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800/80 group-hover:border-blue-500/30 group-hover:text-blue-400 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] flex items-center justify-center text-xs font-mono font-black text-neutral-400 transition-all duration-300">
                  {appr.step}
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-blue-100 transition-colors">
                  {appr.title}
                </h4>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans relative z-10">
                {appr.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Large Counter-based Statistics Grid below, exactly mirroring image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 text-center max-w-4xl mx-auto">
          {bio.stats && bio.stats.map((stat: any, sIdx: number) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: sIdx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
              className="space-y-1 glass-panel p-5 hover:border-indigo-500/30 hover:shadow-[0_4px_24px_rgba(99,102,241,0.08)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Internal ambient backglow */}
              <div className="absolute -inset-10 bg-radial from-indigo-500/[0.015] to-transparent pointer-events-none" />
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-indigo-200 block tracking-tight font-sans relative z-10">
                {stat.value}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase block font-semibold relative z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
