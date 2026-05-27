import { motion } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";

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

      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Main Section Header */}
        <div className="space-y-4">
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

        {/* Long Narrative Paragraph representing text block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans max-w-3xl mx-auto whitespace-pre-line"
        >
          {bio.aboutFull}
        </motion.p>


        {/* High quality divider */}
        <div className="h-px bg-neutral-900 w-full my-12" />

        {/* Sub-heading Approach */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight">
            My Approach
          </h3>
          <div className="w-12 h-0.5 bg-neutral-800 mx-auto rounded" />
        </div>

        {/* Tri-fold Horizontal Approach Bento Containers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
          {approaches.map((appr, aidx) => (
            <motion.div
              key={aidx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: aidx * 0.12 }}
              className="bg-[#0b0b10] border border-neutral-900 rounded-2xl p-6 relative overflow-hidden group hover:border-neutral-800 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Large high-contrast index indicator */}
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono font-black text-white">
                  {appr.step}
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {appr.title}
                </h4>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                {appr.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Large Counter-based Statistics Grid below, exactly mirroring image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-12 text-center max-w-4xl mx-auto">
          {bio.stats && bio.stats.map((stat: any, sIdx: number) => (
            <div key={sIdx} className="space-y-1 bg-[#0b0b10] border border-neutral-900 rounded-2xl p-5 hover:border-neutral-800 transition-colors">
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight font-sans">
                {stat.value}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase block font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
