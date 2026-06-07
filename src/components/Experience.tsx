import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { GraduationCap, Award, Terminal, Calendar } from "lucide-react";

export default function Experience() {
  const { experiences } = useFirebase();
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-neutral-900 select-none">
      
      {/* Background radial atmosphere grids */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-[#777] uppercase font-bold">
            // HISTORY & EDUCATION
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white mb-3">
            Developer Chronicles
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl font-sans">
            Theoretical core computer science foundations engineered in tandem with robust JVM microservice deployments.
          </p>
        </div>

        {/* Timeline Line Vector */}
        <div className="relative max-w-5xl mx-auto pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-x-12 before:absolute before:inset-y-0 before:left-8 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-neutral-900">
          
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={exp.id} className={`relative mb-16 sm:mb-24 flex flex-col justify-start items-stretch ${isLeft ? "sm:col-start-1" : "sm:col-start-2 sm:translate-y-12"}`}>
                
                {/* Orbital Node Pin */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1.1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.12 }}
                  className="absolute left-[-24px] sm:left-auto sm:right-0 sm:translate-x-[calc(50%+24px)] top-2 sm:top-6 z-20"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0f] border border-neutral-850 hover:border-neutral-700 flex items-center justify-center text-white shadow-2xl transition-all">
                    {exp.category === "academic" && <GraduationCap className="w-4 h-4 text-neutral-400" />}
                    {exp.category === "development" && <Terminal className="w-4 h-4 text-neutral-400" />}
                    {exp.category === "certification" && <Award className="w-4 h-4 text-neutral-400" />}
                  </div>
                </motion.div>

                {/* Core Narrative Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className="glass-panel p-6 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden bg-[#0b0b10]/40"
                >
                  {/* Subtle hover offset and internal shift glow */}
                  <div className="absolute -inset-40 bg-radial from-blue-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight transition-colors">
                    {exp.role}
                  </h3>
                  
                  <span className="text-xs font-mono text-neutral-500 block mb-4 mt-1 font-bold">
                    // {exp.institution} • {exp.location}
                  </span>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    {exp.description}
                  </p>

                  {/* Achievement Bullets */}
                  <div className="space-y-3 pt-4 border-t border-neutral-900">
                    {exp.achievements.map((ach, ai) => (
                      <div key={ai} className="flex items-start gap-2.5 text-[11px] text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 shrink-0 mt-1.5" />
                        <span className="leading-relaxed font-sans">{ach}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
