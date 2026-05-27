import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { BlogPost } from "../types";
import { Calendar, Search, ChevronRight, Share2, Terminal } from "lucide-react";

export default function Blog() {
  const { blogPosts } = useFirebase();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hasCopied, setHasCopied] = useState(false);

  const filterCategories = ["all", "microservices", "springboot", "kubernetes"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section id="blog" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-neutral-900 select-none">
      
      {/* Background atmospheres */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
            // WRITING & GUIDES
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white mb-3">
              Knowledge Archives
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-xl font-sans mt-3">
              Technical guides covering microservices decoupled layouts, Spring validation pipelines, and container isolation setups.
            </p>
          </div>

          {/* Clean High Contrast Search bar */}
          <div className="flex items-center gap-2 bg-[#0a0a0f] border border-neutral-900 rounded-full px-5 py-3.5 w-full md:max-w-sm focus-within:border-neutral-700 transition-all">
            <Search className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              type="text"
              placeholder="Search writing, tags, systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder-neutral-700 font-mono"
            />
          </div>
        </div>

        {/* Category toggles */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none font-mono">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] tracking-wider uppercase border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black border-white font-black"
                  : "bg-[#0b0b10] border-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-800"
              }`}
            >
              {cat === "all" ? "[Show All Archive]" : cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0b0b10] border border-neutral-900 p-6 hover:bg-[#0a0a0f] hover:border-neutral-800 rounded-2xl flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center gap-3 text-neutral-500 text-[9px] font-mono mb-4 uppercase tracking-wider font-extrabold">
                  <span className="text-neutral-400 font-bold">#{post.category}</span>
                  <span className="opacity-30">•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-neutral-400 text-xs leading-relaxed mt-3 line-clamp-3 font-sans">
                  {post.summary}
                </p>
              </div>

              {/* Action row footer */}
              <div className="flex items-center justify-between border-t border-neutral-900 pt-4 mt-8">
                <span className="text-[9px] font-mono text-neutral-500">{post.date}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer"
                >
                  DECRYPT BLUEPRINT
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-neutral-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader overlay modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative w-full max-w-2xl bg-[#0a0a0f] border border-neutral-900 rounded-3xl max-h-[85vh] overflow-y-auto p-6 md:p-10 z-10 space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white rounded-full p-2.5 cursor-pointer transition-colors text-xs font-mono font-bold"
              >
                &lt;Close /&gt;
              </button>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-extrabold">
                  <span className="text-white font-bold">#{selectedPost.category}</span>
                  <span className="opacity-30">•</span>
                  <span>{selectedPost.readTime}</span>
                  <span className="opacity-30">•</span>
                  <span>{selectedPost.date}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-sans font-black text-white">
                  {selectedPost.title}
                </h3>

                <div className="h-[1px] bg-neutral-900 w-full my-4" />

                <div className="text-neutral-300 text-sm sm:text-base leading-relaxed antialiased font-sans pr-2 space-y-4">
                  <p>{selectedPost.content}</p>
                  <p className="text-neutral-400 text-xs italic">
                    To construct resilient systems, it is vital to decouple heavy processing segments. By separating routing endpoints, database connections, and cache lifetimes, latency is minimized. Jestin implements these patterns directly into spring-boot projects to ensure absolute container performance.
                  </p>
                </div>

                {/* Simulated Spec card */}
                <div className="bg-black/40 border border-neutral-900 rounded-2xl p-5 mt-6 font-mono text-xs">
                  <span className="text-white uppercase font-bold text-[10px] block mb-3 tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
                    [SECURE_KNOWLEDGE_PIPELINE] ARCHITECTURE SPECIFICATION
                  </span>
                  <div className="space-y-2 text-neutral-400 text-[11px] leading-relaxed">
                    <p>• Avoid core memory leaks by establishing strictly mapped thread contextual configurations.</p>
                    <p>• Clean Docker multi-stage builds consistently drop target weight indicators down by up to 75%.</p>
                    <p>• Restrict authorization exceptions using custom, isolated filter chains inside security configurations.</p>
                  </div>
                </div>

                {/* Modal footer shares */}
                <div className="flex items-center justify-between border-t border-neutral-900 pt-6 mt-8">
                  <span className="text-[9px] font-mono text-neutral-500">
                    AUTHOR: JESTIN SHAJI • SPRING EXPERT
                  </span>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{hasCopied ? "[COPIED]" : "EXPORT LINK"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
