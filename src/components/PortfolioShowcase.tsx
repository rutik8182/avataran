import { useState } from "react";
import { FolderGit2, Sparkles, Filter, CheckCircle2, ArrowRight, X, TrendingUp, Cpu, Monitor, Hash } from "lucide-react";
import { ProjectItem } from "../types";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface PortfolioShowcaseProps {
  projects: ProjectItem[];
}

export default function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "web" | "branding" | "marketing" | "ai">("all");
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  const filterTabs: { value: typeof selectedCategory; label: string }[] = [
    { value: "all", label: "All Masterworks" },
    { value: "web", label: "Web Applications" },
    { value: "branding", label: "Creative Identity" },
    { value: "marketing", label: "Organic Marketing" },
    { value: "ai", label: "AI Integrations" }
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div id="portfolio-showcase-outer-container" className="space-y-10">
      {/* Search Sort Bars */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2.5 bg-white dark:bg-slate-950/40 p-3 border border-slate-200 dark:border-slate-805 rounded-2xl backdrop-blur shadow-sm dark:shadow-none max-w-2xl mx-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedCategory(tab.value)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === tab.value
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_2px_12px_rgba(6,182,212,0.25)]"
                : "bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800/80"
            }`}
          >
            {tab.value === "all" && <FolderGit2 className="w-3.5 h-3.5" />}
            {tab.value === "ai" && <Cpu className="w-3.5 h-3.5" />}
            {tab.value === "web" && <Monitor className="w-3.5 h-3.5" />}
            {tab.value === "marketing" && <TrendingUp className="w-3.5 h-3.5" />}
            {tab.value === "branding" && <Sparkles className="w-3.5 h-3.5" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="group bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-slate-350 dark:hover:border-slate-705 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-none"
          >
            <div>
              {/* Cover Card */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20" />
                
                {/* Client Label */}
                <div className="absolute top-4 left-4 bg-slate-955/80 border border-slate-800 text-slate-300 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur">
                  {proj.client}
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/80 border border-cyan-900/50 px-2 py-0.5 rounded shadow">
                    Category: {proj.category === "web" ? "React Engine" : proj.category === "ai" ? "Gemini-API Core" : proj.category === "marketing" ? "Organic Strategy" : "Custom Brand"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-white tracking-tight mt-2 drop-shadow">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Stats / Goals Brief in cards */}
              <div className="p-6">
                <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed">
                  {proj.desc}
                </p>

                {/* Key Metrics Ratios Highlight */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850/60 grid grid-cols-2 gap-4">
                  {proj.results.slice(0, 2).map((res, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Read Study action block */}
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => setActiveCaseStudy(proj)}
                className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-850 p-3 rounded-2xl text-xs font-mono transition-all flex items-center justify-center gap-2 pointer-events-auto cursor-pointer"
              >
                Inspect Custom Case Study
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform animate-pulse" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Overlay */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden animate-scaleIn max-h-[85vh] flex flex-col">
            {/* Header cover block */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 shrink-0 text-left">
              <div>
                <span className="text-[9px] font-mono text-cyan-650 dark:text-cyan-400 uppercase tracking-widest">{activeCaseStudy.client} • Case Briefing</span>
                <h4 className="text-sm sm:text-base font-bold font-sans text-slate-900 dark:text-slate-100 mt-0.5">{activeCaseStudy.title}</h4>
              </div>
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="p-1.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950/50 text-slate-500 dark:text-slate-455 hover:text-slate-900 dark:hover:text-slate-100 transition-colors pointer-events-auto cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Scroller pane */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 text-left bg-white dark:bg-slate-900">
              {/* Interactive Before After Slider */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Visual Transformation (Drag Handle)
                </h5>
                <BeforeAfterSlider
                  beforeImage={activeCaseStudy.beforeImg}
                  afterImage={activeCaseStudy.afterImg}
                  beforeLabel="Before (Legacy Workspace)"
                  afterLabel="After (Bespoke Avtaran Deployment)"
                />
              </div>

              {/* Narrative Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Core text narrative */}
                <div className="md:col-span-8 space-y-4">
                  <h5 className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-850 pb-1.5">Project Overview & Objectives</h5>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                    {activeCaseStudy.caseStudy}
                  </p>
                </div>

                {/* Metric Ratios list */}
                <div className="md:col-span-4 space-y-4 bg-slate-50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80">
                  <h5 className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850 pb-1.5">Performance Gains</h5>
                  <div className="space-y-3.5">
                    {activeCaseStudy.results.map((res, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-slate-750 dark:text-slate-350 leading-snug">{res}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-850">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Technologies Used</p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCaseStudy.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-405 border border-slate-200 dark:border-slate-850 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer close block */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-right bg-slate-50 dark:bg-slate-950/30 shrink-0">
              <button
                type="button"
                onClick={() => setActiveCaseStudy(null)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold font-sans uppercase tracking-wider pointer-events-auto cursor-pointer shadow-md"
              >
                close study files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
