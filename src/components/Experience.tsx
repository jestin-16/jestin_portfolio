import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { GraduationCap, Award, Terminal, Calendar } from "lucide-react";

export default function Experience() {
  const { experiences } = useFirebase();

  return (
    <section id="experience" className="py-20 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-neutral-800 text-xs font-mono font-medium"
          >
            <span>TIMELINE &amp; EDUCATION</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-display font-black text-black tracking-tight"
          >
            Experience &amp; Education
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-neutral-600 font-sans text-xs sm:text-sm max-w-md mx-auto"
          >
            Academic background and hands-on software development
          </motion.p>
        </div>

        {/* Clean Vertical Timeline */}
        <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-1/2 before:top-2 before:bottom-2 before:w-px before:bg-black/10">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative pl-10 sm:pl-0 flex flex-col ${
                  isEven ? "sm:items-start sm:pr-10 sm:text-right" : "sm:items-end sm:pl-10 sm:text-left sm:ml-auto"
                } sm:w-1/2`}
              >
                {/* Pin */}
                <div className="absolute left-2.5 sm:left-auto sm:right-0 sm:translate-x-1/2 top-4 w-3 h-3 rounded-full bg-black border-2 border-white shadow-xs z-10" />

                {/* Card */}
                <div className="p-5 rounded-2xl bg-white border border-black/10 hover:border-black transition-all space-y-2.5 w-full text-left shadow-xs">
                  <div className="flex items-center gap-2 text-neutral-600 text-xs font-mono font-medium">
                    <GraduationCap className="w-4 h-4 text-black shrink-0" />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-black">
                    {exp.role}
                  </h3>
                  
                  <div className="text-xs font-mono text-neutral-500">
                    {exp.institution} &bull; {exp.location}
                  </div>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-black/[0.08]">
                    {exp.achievements.map((ach, ai) => (
                      <div key={ai} className="text-[11px] text-neutral-600 font-sans">
                        &bull; {ach}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
