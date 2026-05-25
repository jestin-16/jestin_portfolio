import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";
import { BookOpen, Calendar, Clock, Terminal, ChevronRight, Share2, Search, CheckCircle } from "lucide-react";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filterCategories = ["all", "microservices", "springboot", "kubernetes"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden border-t border-white/[0.03]">
      <div className="absolute top-1/3 right-10 w-96 h-96 radial-glow rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title and Controls group */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]" />
              <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase font-bold">
                05 / Writeups
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
              Technical Content.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl">
              Deconstructing backend engineering workflows, micro-service configurations, and cloud metrics down into digestible, step-by-step guides.
            </p>
          </div>

          {/* Search bar helper */}
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3 w-full md:max-w-xs focus-within:border-[#06B6D4] transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-gray-500"
            />
          </div>
        </div>

        {/* Category toggles */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer capitalize ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/[0.01] border-white/[0.04] text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat === "all" ? "All Writeups" : cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel p-6 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-all relative group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-gray-500 text-[10px] font-mono mb-4 uppercase">
                  <span className="text-[#06B6D4] font-bold">#{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-xs leading-relaxed mt-3 line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Interaction button link */}
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-6">
                <span className="text-[10px] font-mono text-gray-500">{post.date}</span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-mono font-bold text-white group-hover:text-[#06B6D4] flex items-center gap-1.5 cursor-pointer"
                >
                  Read Blueprint
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popout Dialog Modal details for reading */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 25 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative w-full max-w-2xl bg-[#0c0c12] border border-white/10 rounded-xl max-h-[85vh] overflow-y-auto p-6 md:p-8 z-10 space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white text-xs px-2.5 py-1.5 cursor-pointer transition-colors"
              >
                &lt;Close /&gt;
              </button>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase">
                  <span className="text-[#3B82F6] font-bold">#{selectedPost.category}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                  {selectedPost.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed antialiased">
                  {selectedPost.content}
                </p>

                {/* Additional simulated sections */}
                <div className="bg-black/30 border border-white/[0.04] rounded-lg p-5 mt-6 font-mono text-xs">
                  <span className="text-emerald-400 uppercase font-bold text-[10px] block mb-2 tracking-wider">
                    [SYSTEM_RUN_OK] SIMULATED ARCHITECTURE NOTES:
                  </span>
                  <div className="space-y-2 text-gray-400">
                    <p>• Avoid state leaks by strictly mapping lifecycle contexts during bean initiation.</p>
                    <p>• Use Docker caching layered techniques to reduce compile build time overheads.</p>
                    <p>• Minimize connection delays with connection pools for database engines.</p>
                  </div>
                </div>

                {/* Footer action logs */}
                <div className="flex items-center justify-between border-t border-white/[0.05] pt-6 mt-6">
                  <span className="text-[10px] font-mono text-gray-500">
                    written by Jestin Shaji • Spring specialist
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Copied portfolio bookmark link to clipboard!");
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share article
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
