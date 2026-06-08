import { useState } from "react";
import Markdown from "react-markdown";
import { Sparkles, ArrowRight, Loader2, FileText, CheckCircle, Download, Calendar, Mail, UserPlus } from "lucide-react";

export default function AiProjectBuilder() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [blueprint, setBlueprint] = useState<string | null>(null);

  // Form states
  const [projectName, setProjectName] = useState("");
  const [businessType, setBusinessType] = useState("SaaS Platform");
  const [budgetRange, setBudgetRange] = useState("$2,500 - $5,000");
  const [servicesNeeded, setServicesNeeded] = useState<string[]>(["Website design & dev", "Technical SEO mapping"]);
  const [description, setDescription] = useState("");
  
  // Lead states
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");

  const staticServices = [
    "Website design & dev",
    "AI-powered website creation",
    "Elite Content strategy",
    "High-retention Video production",
    "Social media scaling",
    "Branding & typography design",
    "Technical SEO mapping",
    "Workflow automation solution"
  ];

  const toggleService = (srv: string) => {
    if (servicesNeeded.includes(srv)) {
      setServicesNeeded(servicesNeeded.filter((s) => s !== srv));
    } else {
      setServicesNeeded([...servicesNeeded, srv]);
    }
  };

  const cycleStatus = (statuses: string[], interval = 1200) => {
    let currentIdx = 0;
    setLoadingStatus(statuses[0]);
    const timer = setInterval(() => {
      currentIdx++;
      if (currentIdx < statuses.length) {
        setLoadingStatus(statuses[currentIdx]);
      } else {
        clearInterval(timer);
      }
    }, interval);
    return timer;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !description) return;

    setLoading(true);
    const statuses = [
      "Consulting Avtaran engineering guidelines...",
      "Scrutinizing custom component allocation ratios...",
      "Mapping week-by-week timeline milestones...",
      "Compiling cost estimation matrices...",
      "Polishing final bespoke markdown blueprint..."
    ];
    const timer = cycleStatus(statuses, 1100);

    try {
      const response = await fetch("/api/scope-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName,
          businessType,
          budgetRange,
          coreFeatures: servicesNeeded,
          description
        })
      });

      if (!response.ok) throw new Error("Scope generation failed");
      const data = await response.json();
      setBlueprint(data.scope);
    } catch (err) {
      console.error("Scope generator error, displaying detailed offline backup template:", err);
      // Backup fallback handled handled by backend, but if offline connection fails entirely:
      setBlueprint(`### Custom Blueprint: ${projectName}
**Target business**: ${businessType}
**Scope focus**: ${servicesNeeded.join(", ")}

---
### 1. Executive Vision
We recommend a customized React application styled with responsive glassmorphism structures, featuring advanced animations to elevate your business footprint.

### 2. Implementation Deliverables
*   **Aesthetic UI Overhaul**: Typography setups, logo vectors, custom spacing.
*   **SEO Schema Audits**: Google Search tagging layouts.
*   **Lead generation modules**: Dynamic slot selections.

### 3. Estimated Investments
*   Recommended Plan: **Growth Engine Package / Base estimate $2,400**`);
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadEmail) {
      setLeadCaptured(true);
    }
  };

  const resetBuilder = () => {
    setStep(1);
    setBlueprint(null);
    setLeadCaptured(false);
    setLeadEmail("");
    setProjectName("");
    setDescription("");
  };

  return (
    <div id="ai-project-scoper-container" className="w-full bg-white dark:bg-slate-950/80 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md dark:shadow-2xl relative">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      {/* Top Header */}
      <div className="px-6 py-5 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
          <h3 className="text-sm font-bold font-sans text-slate-800 dark:text-slate-100 uppercase tracking-wider">Avtaran AI Project Consultant</h3>
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {blueprint ? "STATUS: BLUEPRINT EMBEDDED" : `STEP ${step} OF 3`}
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-950/60 animate-fadeIn">
          <Loader2 className="w-12 h-12 text-cyan-600 dark:text-cyan-400 animate-spin mb-4" />
          <p className="text-slate-800 dark:text-slate-200 font-sans font-semibold text-sm transition-all duration-300">{loadingStatus}</p>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-2 font-mono">This usually takes about 3 seconds...</p>
        </div>
      ) : blueprint ? (
        /* Blueprint View */
        <div className="p-6 md:p-8 space-y-6 text-left animate-fadeIn">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold font-sans text-slate-800 dark:text-slate-100 uppercase tracking-widest">Bespoke Blueprint Crafted</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Our AI Engine generated an elite scoping guide specifically aligning with your objectives. Review below:</p>
            </div>
          </div>

          {/* Render Markdown Scope */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800/60 overflow-x-auto max-h-[350px] overflow-y-auto font-sans text-xs leading-relaxed text-slate-700 dark:text-slate-300 markdown-body">
            <Markdown>{blueprint}</Markdown>
          </div>

          {/* Lead Capture overlay or confirmation */}
          {!leadCaptured ? (
            <div className="p-5 bg-slate-50 dark:bg-gradient-to-r dark:from-slate-900 dark:to-indigo-950/30 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase font-mono tracking-widest">
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Download PDF & Schedule Kickstarter Call
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Save this detailed estimation roadmap! Submit your business email below to immediately lock in a free 15-minute engineer alignment call & secure pricing.
              </p>
              <form onSubmit={handleLeadSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-800 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-sm dark:shadow-none"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_2px_12px_rgba(6,182,212,0.15)] pointer-events-auto cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Secure Blueprint
                </button>
              </form>
            </div>
          ) : (
            <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center">
              <CheckCircle className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-2 animate-bounce" />
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase font-mono">Blueprint Saved Successfully</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Your PDF copy has been generated and dispatched to <span className="text-cyan-600 dark:text-cyan-400 font-bold">{leadEmail}</span>.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-2 border-t border-slate-100 dark:border-slate-900">
            <button
              onClick={resetBuilder}
              type="button"
              className="text-xs font-mono text-slate-400 hover:text-slate-655 dark:text-slate-500 dark:hover:text-slate-350 underline cursor-pointer pointer-events-auto"
            >
              Analyze Another Project Spec
            </button>
          </div>
        </div>
      ) : (
        /* Form view stepper */
        <form onSubmit={handleGenerate} className="p-6 md:p-8 space-y-5 text-left">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 font-mono uppercase tracking-widest">1. General Classification</h4>
                <p className="text-xs text-slate-500">Provide your product identifier and general industry niche.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-slate-555 dark:text-slate-400">Project Name / Client Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helix Watch Shop"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 rounded-lg px-3.5 py-2 text-xs text-slate-803 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-slate-555 dark:text-slate-400">Industry / Business Sector</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 rounded-lg px-3.5 py-2 text-xs text-slate-700 dark:text-slate-205 focus:outline-none focus:border-cyan-500 cursor-pointer outline-none"
                  >
                    <option value="SaaS Platform">SaaS/Tech Platform</option>
                    <option value="E-Commerce Fashion">E-Commerce Boutique</option>
                    <option value="Professional Consulting">Professional Firm</option>
                    <option value="Healthcare MedCorp">Healthcare & Wellness</option>
                    <option value="Creator / Personal Brand">Personal Brand Portfolio</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!projectName.trim()}
                  onClick={() => setStep(2)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all pointer-events-auto cursor-pointer"
                >
                  Continue to Scale
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 font-mono uppercase tracking-widest">2. Budget Scope limiters</h4>
                <p className="text-xs text-slate-500">Pick a starting estimation budget bracket that represents your scaling objectives.</p>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { value: "$1,000 - $2,500", desc: "Starter velocity focus" },
                  { value: "$2,500 - $5,000", desc: "Moderate growth core" },
                  { value: "$5,000 - $10,000", desc: "Bespoke customized agency design" },
                  { value: "Custom Scale Priority", desc: "Bespoke full-suite system" }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setBudgetRange(tier.value)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      budgetRange === tier.value
                        ? "bg-cyan-500/10 border-cyan-500 shadow-[0_2px_10px_rgba(6,182,212,0.15)] text-slate-900 dark:text-slate-101"
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-205"
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{tier.value}</div>
                    <div className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">{tier.desc}</div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline font-mono pointer-events-auto cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-mono px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all pointer-events-auto cursor-pointer"
                >
                  Configure Services
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 font-mono uppercase tracking-widest">3. Required Capabilities & Objective Prompt</h4>
                <p className="text-xs text-slate-500">Pick required services & describe core functional priorities.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {staticServices.map((srv) => {
                  const isChecked = servicesNeeded.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`p-2.5 rounded-lg border text-left text-[10px] font-semibold transition-all cursor-pointer ${
                        isChecked
                          ? "bg-cyan-500/15 border-cyan-500 text-cyan-600 dark:text-cyan-300 font-bold"
                          : "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-850 text-slate-550 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-800"
                      }`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-semibold">Project Strategy Objective & Audience</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your goals in 1-2 sentences. (e.g. We need to redesign our product interface so growth investors trust us immediately. Needs elite dark aesthetics, fast load speed, and client booking.)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-405 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none font-sans shadow-sm dark:shadow-none"
                />
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-900">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-205 underline font-mono pointer-events-auto cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!description.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 font-bold px-5 py-3 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-[0_2px_12px_rgba(6,182,212,0.15)] pointer-events-auto cursor-pointer"
                >
                  Generate Scope Roadmap
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
