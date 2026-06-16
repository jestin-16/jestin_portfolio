import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { GraduationCap, Award, Terminal, Calendar } from "lucide-react";

export default function Experience() {
  const { experiences } = useFirebase();
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#030308] via-[#020205] to-[#04040b] relative overflow-hidden border-t border-neutral-900/60 select-none">
      
      {/* Background radial atmosphere grids */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.035)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.025)_0%,transparent_70%)] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-black uppercase">
            // HISTORY & EDUCATION
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-300 mb-3">
            Developer Chronicles
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans font-medium">
            Theoretical core computer science foundations engineered in tandem with robust JVM microservice deployments.
          </p>
        </div>

        {/* Timeline Line Vector */}
        <div className="relative max-w-5xl mx-auto pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-x-12 before:absolute before:inset-y-0 before:left-8 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-gradient-to-b before:from-cyan-500/20 before:via-indigo-500/10 before:to-purple-500/20">
          
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            const categoryTheme = {
              academic: {
                borderHover: "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]",
                iconClass: "text-amber-400",
                indicatorBg: "border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.18)]",
                glowColor: "from-amber-500/[0.015]",
                bulletColor: "bg-amber-400",
                textColor: "text-amber-400"
              },
              development: {
                borderHover: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]",
                iconClass: "text-cyan-400",
                indicatorBg: "border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.18)]",
                glowColor: "from-cyan-500/[0.015]",
                bulletColor: "bg-cyan-400",
                textColor: "text-cyan-400"
              },
              certification: {
                borderHover: "hover:border-fuchsia-500/40 hover:shadow-[0_0_20px_rgba(240,46,170,0.08)]",
                iconClass: "text-fuchsia-400",
                indicatorBg: "border-fuchsia-500/30 shadow-[0_0_12px_rgba(240,46,170,0.18)]",
                glowColor: "from-fuchsia-500/[0.015]",
                bulletColor: "bg-fuchsia-400",
                textColor: "text-fuchsia-400"
              }
            };

            const theme = categoryTheme[exp.category as keyof typeof categoryTheme] || categoryTheme.development;

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
                  <div className={`w-10 h-10 rounded-full bg-[#07070c] border flex items-center justify-center text-white transition-all ${theme.indicatorBg}`}>
                    {exp.category === "academic" && <GraduationCap className="w-4 h-4 text-amber-400" />}
                    {exp.category === "development" && <Terminal className="w-4 h-4 text-cyan-400" />}
                    {exp.category === "certification" && <Award className="w-4 h-4 text-fuchsia-400" />}
                  </div>
                </motion.div>

                {/* Core Narrative Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className={`glass-panel p-6 hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden bg-[#0a0a0f]/40 ${theme.borderHover}`}
                >
                  {/* Subtle hover offset and internal shift glow */}
                  <div className={`absolute -inset-40 bg-radial ${theme.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className={`w-3.5 h-3.5 ${theme.textColor} opacity-80 shrink-0`} />
                    <span className={`font-mono text-xs ${theme.textColor} font-black uppercase tracking-wider`}>
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight transition-colors">
                    {exp.role}
                  </h3>
                  
                  <span className="text-xs font-mono text-neutral-300 block mb-4 mt-1 font-black leading-relaxed">
                    // {exp.institution} • {exp.location}
                  </span>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-6 font-medium">
                    {exp.description}
                  </p>

                  {/* Achievement Bullets */}
                  <div className="space-y-3 pt-4 border-t border-neutral-905">
                    {exp.achievements.map((ach, ai) => (
                      <div key={ai} className="flex items-start gap-2.5 text-[11px] text-neutral-300 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.bulletColor} shrink-0 mt-1.5 shadow-[0_0_6px_currentColor]`} />
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
