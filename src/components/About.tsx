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
      glowColor: "from-amber-500/[0.04] via-transparent to-transparent",
      hoverBorder: "hover:border-amber-500/40 hover:bg-[#0c0c0e]/70 hover:shadow-[0_0_20px_rgba(245,158,11,0.06)]",
      stepColor: "group-hover:text-amber-400 group-hover:border-amber-500/40 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    },
    {
      step: "02",
      title: "Design SOLID Core APIs",
      description: "Writing strictly typed, encapsulated controller paths, exception resolvers, and Spring Security token validations.",
      glowColor: "from-cyan-500/[0.04] via-transparent to-transparent",
      hoverBorder: "hover:border-cyan-500/40 hover:bg-[#080d12]/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.06)]",
      stepColor: "group-hover:text-cyan-400 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    },
    {
      step: "03",
      title: "Containerize & Release",
      description: "Packaging targets into optimized lightweight Docker image layers and routing via Kubernetes automated cloud clusters.",
      glowColor: "from-purple-500/[0.04] via-transparent to-transparent",
      hoverBorder: "hover:border-purple-500/40 hover:bg-[#0c0912]/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.06)]",
      stepColor: "group-hover:text-purple-400 group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04040d] via-[#05051c] to-[#03030b] relative overflow-hidden border-t border-white/[0.04] select-none">
      
      {/* Visual background atmospheric elements */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Section Header */}
        <div className="space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-sky-300 text-glow"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-cyan-400 text-xs font-mono tracking-widest uppercase font-extrabold"
          >
            // Pursuing Master of Computer Applications (MCA)
          </motion.p>
        </div>

        {/* Balanced Grid for bio and interactive terminal simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Biography Narrative (Col span: 6/7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-mono bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold uppercase tracking-widest block select-none">
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
              className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line font-medium"
            >
              {bio.aboutFull}
            </motion.p>

            <div className="flex flex-wrap gap-3 text-[10px] font-mono pt-2">
              <span className="px-3.5 py-2 bg-white/[0.02] border border-cyan-500/10 hover:border-cyan-500/30 text-cyan-300 rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.03)] backdrop-blur-md transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                STATUS: Actively Engineering APIs
              </span>
              <span className="px-3.5 py-2 bg-white/[0.02] border border-fuchsia-500/10 hover:border-fuchsia-500/30 text-fuchsia-300 rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(240,46,170,0.03)] backdrop-blur-md transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 inline-block" />
                DEGREE: Master of Computer Applications
              </span>
              <span className="px-3.5 py-2 bg-white/[0.02] border border-violet-500/10 hover:border-violet-500/30 text-violet-300 rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.03)] font-bold backdrop-blur-md transition-all">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                LOCATION: {bio.location}
              </span>
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
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent w-full my-8" />

        {/* Sub-heading Approach */}
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
            My Approach
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded shadow-[0_0_8px_#06b6d4]" />
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
              className={`glass-panel p-6 relative overflow-hidden group transition-all duration-300 ${appr.hoverBorder}`}
            >
              {/* Internal subtle shift glow background */}
              <div className={`absolute -inset-24 bg-gradient-to-r ${appr.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="flex items-center gap-4 mb-4 relative z-10">
                {/* Large high-contrast index indicator with glow styling */}
                <div className={`w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800/85 flex items-center justify-center text-xs font-mono font-black text-neutral-400 transition-all duration-300 ${appr.stepColor}`}>
                  {appr.step}
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
                  {appr.title}
                </h4>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans relative z-10 font-medium">
                {appr.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Large Counter-based Statistics Grid below, exactly mirroring image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 text-center max-w-4xl mx-auto">
          {bio.stats && bio.stats.map((stat: any, sIdx: number) => {
            const statGradients = [
              "from-cyan-400 to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:border-cyan-500/35",
              "from-amber-400 to-orange-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.18)] hover:border-amber-500/35",
              "from-emerald-400 to-teal-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:border-emerald-500/35",
              "from-fuchsia-400 to-purple-500 hover:shadow-[0_0_20px_rgba(240,46,170,0.18)] hover:border-fuchsia-500/35"
            ];
            const activeGrad = statGradients[sIdx % statGradients.length];
            return (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: sIdx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.15 } }}
                className={`space-y-1 glass-panel p-5 transition-all duration-300 relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.04] backdrop-blur-md ${activeGrad.split(" ").slice(1).join(" ")}`}
              >
                {/* Internal ambient backglow */}
                <div className="absolute -inset-10 bg-radial from-indigo-500/[0.012] to-transparent pointer-events-none" />
                <span className={`text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeGrad.split(" ")[0]} block tracking-tight font-sans relative z-10`}>
                  {stat.value}
                </span>
                <span className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase block font-bold relative z-10">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
