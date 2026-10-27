import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import InteractiveConsole from "./InteractiveConsole";
import { BookOpen, MapPin, Terminal, Award, CheckCircle2 } from "lucide-react";

export default function About() {
  const { bio } = useFirebase();

  const principles = [
    {
      num: "01",
      title: "Domain-Driven Modeling",
      description: "Architecting clean entity schemas, JPA cascade constraints, explicit boundary mappings, and database isolation levels.",
    },
    {
      num: "02",
      title: "Decoupled API Design",
      description: "Structuring stateless Spring controllers, JWT filter interceptors, global exception handlers, and idempotent endpoints.",
    },
    {
      num: "03",
      title: "Cloud-Native Delivery",
      description: "Packaging microservices into minimal alpine Docker images and managing declarative Kubernetes cluster deployments.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header with Zero-Pill Editorial Discipline */}
        <div className="space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-neutral-500 uppercase font-semibold"
          >
            02 · Architecture &amp; Background
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight"
          >
            Engineering Philosophy
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-600 text-xs sm:text-sm font-mono"
          >
            Master of Computer Applications (MCA) Candidate · Amal Jyothi College of Engineering
          </motion.p>
        </div>

        {/* Biography & Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black leading-snug">
                Building resilient backend architectures with <span className="font-serif italic font-normal text-black">precision &amp; clarity</span>.
              </h3>
              
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
                {bio.aboutFull || "Passionate about software architecture, clean code principles, and distributed cloud computing. Currently pursuing MCA while engineering real-world microservice solutions."}
              </p>
            </div>

            {/* Unboxed Status Metadata Line */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-600 border-t border-black/[0.08]">
              <div className="flex items-center gap-1.5 text-black font-semibold">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span>Active Java Engineer</span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5 text-neutral-700">
                <BookOpen className="w-3.5 h-3.5 text-black" />
                <span>MCA Class of 2026</span>
              </div>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5 text-neutral-700">
                <MapPin className="w-3.5 h-3.5 text-black" />
                <span>{bio.location || "Kerala, India"}</span>
              </div>
            </div>
          </div>

          {/* Interactive Console */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractiveConsole />
          </div>

        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="surface-card p-6 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-neutral-400">{p.num}.</span>
                <h4 className="text-sm font-display font-bold text-black">{p.title}</h4>
              </div>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
