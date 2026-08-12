import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import InteractiveConsole from "./InteractiveConsole";
import { CheckCircle2, Award, BookOpen, MapPin } from "lucide-react";

export default function About() {
  const { bio } = useFirebase();

  const principles = [
    {
      num: "01",
      title: "Domain Modeling",
      description: "Analyzing business entity relationships, table cascading constraints, and clean persistence mappings.",
    },
    {
      num: "02",
      title: "Decoupled APIs",
      description: "Building encapsulated Spring Boot controllers, custom exception filters, and JWT authentication flows.",
    },
    {
      num: "03",
      title: "Cloud Deployment",
      description: "Packaging Spring microservices into Docker containers and orchestrating cloud clusters.",
    },
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-[#0b0c10] border-t border-white/[0.06] select-none">
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-2 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
          >
            <span>ABOUT ME</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight"
          >
            Engineering Philosophy
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-emerald-400/90 text-xs font-mono font-medium"
          >
            Master of Computer Applications (MCA) Candidate
          </motion.p>
        </div>

        {/* Biography & Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                Building robust backend infrastructure with <span className="font-serif italic text-emerald-300 font-normal">precision &amp; clarity</span>.
              </h3>
              
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans font-normal whitespace-pre-line">
                {bio.aboutFull || "Passionate about software architecture, clean code principles, and distributed cloud computing. Currently pursuing MCA while engineering real-world microservice solutions."}
              </p>
            </div>

            {/* Quick Status Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1">
              <span className="px-3 py-1 bg-white/[0.03] border border-emerald-500/30 text-emerald-300 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Java Engineer
              </span>
              <span className="px-3 py-1 bg-white/[0.03] border border-white/10 text-neutral-300 rounded-full flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-amber-400" />
                MCA Candidate
              </span>
              <span className="px-3 py-1 bg-white/[0.03] border border-white/10 text-neutral-300 rounded-full flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {bio.location || "Kerala, India"}
              </span>
            </div>
          </div>

          {/* Console */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractiveConsole />
          </div>

        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/20 transition-all space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">{p.num}.</span>
                <h4 className="text-sm font-display font-bold text-white">{p.title}</h4>
              </div>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
