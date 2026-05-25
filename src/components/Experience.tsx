import { motion } from "motion/react";
import { EXPERIENCES } from "../data";
import { GraduationCap, Award, Terminal } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 radial-glow rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Group */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="h-[2px] w-8 bg-gradient-to-r from-purple-500 to-[#3B82F6]" />
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-bold">
              04 / Timeline
            </span>
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#3B82F6] to-purple-500" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
            Academic & Growth Journey.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            Combining formal computing methodologies with relentless self-guided operational experimentation.
          </p>
        </div>

        {/* Timeline representation layout */}
        <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-white/[0.08]">
          {EXPERIENCES.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`flex flex-col sm:flex-row items-stretch relative ${
                  isLeft ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node circle indicator */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 sm:top-6 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#0c0c12] border border-white/10 flex items-center justify-center text-white scale-110 shadow-lg">
                    {exp.category === "academic" && <GraduationCap className="w-4 h-4 text-[#3B82F6]" />}
                    {exp.category === "development" && <Terminal className="w-4 h-4 text-[#06B6D4]" />}
                    {exp.category === "certification" && <Award className="w-4 h-4 text-purple-500" />}
                  </div>
                </div>

                {/* Information wrapper side box */}
                <div className="w-full sm:w-[50%] pl-12 sm:pl-0 sm:px-8">
                  <div className="glass-panel p-6 hover:bg-white/[0.03] transition-colors relative">
                    <span className="font-mono text-xs text-[#06B6D4] font-bold block mb-1">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-medium text-gray-500 block mb-3">
                      {exp.institution} • <span className="italic">{exp.location}</span>
                    </span>

                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements bullets */}
                    <div className="space-y-2 border-t border-white/[0.04] pt-4">
                      {exp.achievements.map((ach, ai) => (
                        <div key={ai} className="flex items-start gap-2 text-[11px] text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Balance spacing box for grids (Hidden on screens smaller than SM) */}
                <div className="hidden sm:block sm:w-[50%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
