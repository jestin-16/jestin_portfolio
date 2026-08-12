import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { BlogPost } from "../types";
import { Calendar, Search, ChevronRight, Share2, X } from "lucide-react";

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
    <section id="blog" className="py-20 px-6 md:px-12 bg-[#0b0c10] border-t border-white/[0.06] select-none">
      
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-xs font-mono font-medium"
            >
              <span>ARTICLES &amp; WRITING</span>
            </motion.div>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Technical Blog
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans">
              Insights on microservices, Spring Boot, and cloud systems
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2.5 w-full md:max-w-xs focus-within:border-emerald-500/40 transition-all">
            <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder-neutral-500 font-sans"
            />
          </div>
        </div>

        {/* Category toggles */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-emerald-500 text-black font-bold shadow-sm"
                  : "bg-white/[0.04] border border-white/10 text-neutral-300 hover:text-white"
              }`}
            >
              {cat === "all" ? "All Posts" : `#${cat}`}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-neutral-300 uppercase text-[10px]">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-emerald-300 group-hover:translate-x-1 transition-transform">
                <span>Read Article</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span>{selectedPost.date}</span>
                  <span>&bull;</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-xs font-mono text-emerald-300 flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{hasCopied ? "Link Copied!" : "Share Link"}</span>
                </button>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-full bg-emerald-500 text-black font-heading font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
