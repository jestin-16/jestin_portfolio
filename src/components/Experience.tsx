import { motion } from "motion/react";
import { EXPERIENCES } from "../data";
import { GraduationCap, Award, Terminal, Calendar, Compass } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03] select-none">
      
      {/* Background radial atmosphere grids */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-blue-500 to-transparent" />
          <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
            CHAPTER 04 / CHRONICLES
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white mb-3">
            Developer Chronicles.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-sans">
            Tracking theoretical engineering foundations paired alongside real system builds and infrastructure projects.
          </p>
        </div>

        {/* Futuristic Timeline Line Vector */}
        <div className="relative max-w-5xl mx-auto pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-x-12 before:absolute before:inset-y-0 before:left-8 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-gradient-to-b before:from-blue-500/50 before:via-purple-500/50 before:to-transparent">
          
          {EXPERIENCES.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div key={exp.id} className={`relative mb-16 sm:mb-24 flex flex-col justify-start items-stretch ${isLeft ? "sm:col-start-1" : "sm:col-start-2 sm:translate-y-12"}`}>
                
                {/* Orbital Node Pin */}
                <div className="absolute left-[-24px] sm:left-auto sm:right-0 sm:translate-x-[calc(50%+24px)] top-2 sm:top-6 z-20">
                  <div className="w-10 h-10 rounded-full bg-[#0a0a0f] border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-white shadow-2xl transition-all scale-110">
                    {exp.category === "academic" && <GraduationCap className="w-4 h-4 text-[#3B82F6]" />}
                    {exp.category === "development" && <Terminal className="w-4 h-4 text-[#06B6D4]" />}
                    {exp.category === "certification" && <Award className="w-4 h-4 text-purple-500" />}
                  </div>
                </div>

                {/* Core Narrative Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className="bg-[#0b0b10] border border-white/[0.04] p-6 hover:bg-white/[0.02] hover:border-white/10 rounded-2xl transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {exp.role}
                  </h3>
                  
                  <span className="text-xs font-mono text-gray-500 block mb-4 mt-1 font-bold">
                    // {exp.institution} • {exp.location}
                  </span>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                    {exp.description}
                  </p>

                  {/* Achievement Bullets */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.04]">
                    {exp.achievements.map((ach, ai) => (
                      <div key={ai} className="flex items-start gap-2.5 text-[11px] text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shrink-0 mt-1.5" />
                        <span className="leading-relaxed font-sans">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* High Quality Foot Decor */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
                
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
