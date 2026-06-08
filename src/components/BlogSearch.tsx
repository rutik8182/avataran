import { useState } from "react";
import { Search, Calendar, Clock, ArrowRight, User, X, ChevronRight, Hash, Sparkles } from "lucide-react";
import { BlogPostItem } from "../types";

interface BlogSearchProps {
  posts: BlogPostItem[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<BlogPostItem | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div id="blog-search-main-container" className="space-y-8">
      {/* Search and filter controls panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-950/40 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur shadow-sm dark:shadow-none">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search industry briefs, engineering guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-205 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 pointer-events-auto cursor-pointer"
            >
              clear
            </button>
          )}
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_2px_10px_rgba(6,182,212,0.2)]"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-205"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col items-center justify-center">
          <div className="text-slate-400 dark:text-slate-650 mb-3 text-lg">⚠️</div>
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-widest font-mono">No briefs found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">We couldn't locate any briefings corresponding to your lookups. Try searching with alternative keywords.</p>
        </div>
      ) : (
        /* Blog cards grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group duration-300 shadow-md hover:shadow-lg"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/85 text-cyan-400 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-slate-800/50 backdrop-blur">
                    {post.category}
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 space-y-3">
                  <div className="flex gap-4 text-[10px] text-slate-500 dark:text-slate-450 font-mono">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-650 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Tag and Read More Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-900/60 mt-3 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {post.tags.slice(0, 2).map((tg) => (
                    <span key={tg} className="text-[9px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-850 px-2 py-0.5 rounded flex items-center">
                      <Hash className="w-2.5 h-2.5 opacity-60" />
                      {tg}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="w-full text-center bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-850 p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 pointer-events-auto cursor-pointer"
                >
                  Acquire Full Briefing
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Embedded Article Reader Panel */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleIn select-text max-h-[85vh] flex flex-col">
            {/* Header / Cover */}
            <div className="relative aspect-video md:aspect-[2.4/1] overflow-hidden shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-slate-900/40 to-slate-950/30 dark:from-slate-900 dark:via-slate-900/40" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 backdrop-blur pointer-events-auto shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] bg-cyan-400 text-slate-950 uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded shadow">
                  {activeArticle.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white font-sans tracking-tight mt-2.5 line-clamp-1 max-w-lg drop-shadow">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            {/* Content Scrolling Pane */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 bg-white dark:bg-slate-900">
              {/* Author header */}
              <div className="flex gap-3.5 items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-205">{activeArticle.author.name}</h5>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-0.5">{activeArticle.author.role}</p>
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono text-slate-500">
                  <p>{activeArticle.date}</p>
                  <p className="text-cyan-600 dark:text-cyan-400 mt-0.5">{activeArticle.readTime}</p>
                </div>
              </div>

              {/* Core Content Rendered */}
              <div className="max-w-none text-xs leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
                {activeArticle.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return <h4 key={i} className="text-sm font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight pt-2 border-b border-slate-100 dark:border-slate-850 pb-1">{para.replace("###", "").trim()}</h4>;
                  }
                  if (para.startsWith("-") || para.startsWith("*")) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300 font-sans text-xs">
                        {para.split("\n").map((li, idx) => (
                          <li key={idx}>{li.replace(/^[-*]\s+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith("`")) {
                    return (
                      <pre key={i} className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl font-mono text-[10px] text-cyan-700 dark:text-cyan-300 overflow-x-auto">
                        <code>{para.replace(/```ts\n|```/, "").trim()}</code>
                      </pre>
                    );
                  }
                  return <p key={i} className="leading-relaxed font-sans">{para}</p>;
                })}
              </div>

              {/* Tags and Close Footer */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row gap-3 justify-between items-center bg-white dark:bg-slate-900">
                <div className="flex flex-wrap gap-1.5">
                  {activeArticle.tags.map((tg) => (
                    <span key={tg} className="text-[9px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-850 px-2.5 py-0.5 rounded-full flex items-center">
                      <Hash className="w-3 text-cyan-600 dark:text-cyan-500" />
                      {tg}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold font-sans uppercase tracking-wider pointer-events-auto shadow-md cursor-pointer"
                >
                  Conclude reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
