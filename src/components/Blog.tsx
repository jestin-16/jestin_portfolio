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
    <section id="blog" className="py-20 px-6 md:px-12 bg-white text-black border-t border-black/[0.08] select-none">
      
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-neutral-800 text-xs font-mono font-medium"
            >
              <span>ARTICLES &amp; WRITING</span>
            </motion.div>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-black tracking-tight">
              Technical Blog
            </h2>

            <p className="text-neutral-600 text-xs sm:text-sm max-w-md font-sans">
              Insights on microservices, Spring Boot, and cloud systems
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-neutral-50 border border-black/10 rounded-full px-4 py-2.5 w-full md:max-w-xs focus-within:border-black transition-all">
            <Search className="w-3.5 h-3.5 text-black shrink-0" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-black focus:outline-none w-full placeholder-neutral-400 font-sans"
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
                  ? "bg-black text-white font-bold shadow-xs"
                  : "bg-white border border-black/10 text-neutral-700 hover:text-black hover:border-black"
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
              className="p-5 rounded-2xl bg-white border border-black/10 hover:border-black shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5 text-neutral-700 font-semibold">
                    <Calendar className="w-3 h-3 text-black" />
                    {post.date}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 border border-black/5 text-neutral-800 uppercase text-[10px] font-semibold">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-black group-hover:underline transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-600 font-sans leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-black/[0.08] text-xs font-mono text-black font-semibold group-hover:translate-x-1 transition-transform">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-black/15 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative text-black shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span>{selectedPost.date}</span>
                  <span>&bull;</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h2 className="text-2xl font-display font-black text-black">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-mono text-black flex items-center gap-2 cursor-pointer border border-black/10"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{hasCopied ? "Link Copied!" : "Share Link"}</span>
                </button>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-full bg-black text-white hover:bg-neutral-800 font-heading font-bold text-xs cursor-pointer"
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
