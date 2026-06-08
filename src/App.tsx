import { useState, useEffect } from "react";
import { 
  Layout, 
  Cpu, 
  PenTool, 
  Video, 
  TrendingUp, 
  Palette, 
  SearchCode, 
  Megaphone, 
  Workflow, 
  ArrowRight, 
  ArrowUp,
  Mail,
  Sparkles, 
  Smartphone, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Send, 
  Lock, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Calendar, 
  AlertCircle 
} from "lucide-react";

import { 
  AGENCY_SERVICES, 
  AGENCY_PROJECTS, 
  AGENCY_TESTIMONIALS, 
  AGENCY_PRICING, 
  AGENCY_FAQS, 
  AGENCY_BLOGS 
} from "./data";
import { PricingPlan } from "./types";

// Import modular subcomponents
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import BookingCalendar from "./components/BookingCalendar";
import InteractiveChat from "./components/InteractiveChat";
import AiProjectBuilder from "./components/AiProjectBuilder";
import PaymentModal from "./components/PaymentModal";
import BlogSearch from "./components/BlogSearch";
import PortfolioShowcase from "./components/PortfolioShowcase";

const getFaqAdditions = (faqId: string) => {
  switch (faqId) {
    case "faq1":
      return {
        challengePrefix: "DIFFERENTIATION",
        solutionLabel: "The Bespoke Craft Manifesto",
        highlights: [
          { title: "No Templates Policy", desc: "Every line of React code is hand-crafted specifically for your brand voice and conversion rhythm." },
          { title: "Direct Architect Pipeline", desc: "No junior delegates or project managers: collaborate directly with design and core engineering builders." },
          { title: "Conversion-Focused Craft", desc: "We deploy premium micro-animations and typography designed to convert premium-tier clients." }
        ],
        estimatedSpeed: "Deployment in 7-14 Days",
        impactMetric: "95+ Lighthouse Scores Guaranteed",
      };
    case "faq2":
      return {
        challengePrefix: "INTEGRATION",
        solutionLabel: "Secure AI & Portal Blueprint",
        highlights: [
          { title: "Secure Proxy Architecture", desc: "All system credentials and Gemini API calls are hosted on private server routes (Express) preventing browser leakage." },
          { title: "Intelligent UI Context", desc: "Natural chat, voice intakes, and customized visual elements that match your product style perfectly." },
          { title: "Instant Workflow Automations", desc: "Sync leads and analytics into HubSpot, CRM platforms, and Slack pipelines simultaneously." }
        ],
        estimatedSpeed: "Deployment in 14-21 Days",
        impactMetric: "HIPAA/SOC-2 Aligned Server Routes",
      };
    case "faq3":
      return {
        challengePrefix: "SCOPING",
        solutionLabel: "Interactive Estimation System",
        highlights: [
          { title: "Sub-3s Fast Blueprinting", desc: "Generate actionable budgets, timelines, and suggested tech stacks instantly." },
          { title: "Milestone Roadmaps", desc: "Receive automated week-by-week delivery guides with zero initial consultation overhead." },
          { title: "Dynamic Agile Re-scoping", desc: "Fine-tune and scale features up or down as project parameters shift." }
        ],
        estimatedSpeed: "Instant Execution",
        impactMetric: "Accelerated Project Kickoffs",
      };
    case "faq4":
      return {
        challengePrefix: "ONBOARDING",
        solutionLabel: "Frictionless Client Hub",
        highlights: [
          { title: "24-Hour Active Pipelines", desc: "Private client communication feeds and collaborative board access set up on day one." },
          { title: "Secure Material Gathering", desc: "Transparent, fast onboarding modules to import existing layout components, copy, and logo vectors." },
          { title: "Bi-Weekly Review Checkpoints", desc: "Active review servers where you can inspect real-time progress on every single sprint." }
        ],
        estimatedSpeed: "Under 24 Hours Setup",
        impactMetric: "100% Client Sync Rates",
      };
    case "faq5":
      return {
        challengePrefix: "TRANSPARENCY",
        solutionLabel: "Clean Asset Transfer Guarantee",
        highlights: [
          { title: "Zero Lock-In Commitment", desc: "Transparent, non-binding dynamic monthly retainers that scale with your team." },
          { title: "Complete IP Ownership", desc: "All client code, repo controls, databases, and domain vectors live permanently under your business records." },
          { title: "Direct Cloud Billing", desc: "Third-party platform resources and API keys are run on cost with zero markups." }
        ],
        estimatedSpeed: "Transparent Fixed Retainer",
        impactMetric: "100% Intellectual Property Security",
      };
    default:
      return {
        challengePrefix: "CONSULTATION",
        solutionLabel: "Bespoke Technical Proposal",
        highlights: [],
        estimatedSpeed: "Ongoing Delivery",
        impactMetric: "Bespoke System Performance",
      };
  }
};

export default function App() {
  const [selectedTab, setSelectedTab] = useState<
    "home" | "services" | "portfolio" | "about" | "pricing" | "testimonials" | "blog" | "contact"
  >("home");
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState("faq1");
  
  // Checkout Modal State
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  // Billing interval toggle
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  // Lead contact form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Newsletter lead state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Video testimonial mock player states
  const [activeVideoTestimonial, setActiveVideoTestimonial] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(45); // simulated percent

  // Simulated metrics counters increment on component load
  const [projectsCount, setProjectsCount] = useState(128);
  const [roiAvg, setRoiAvg] = useState(132);

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectsCount((prev) => (prev < 142 ? prev + 1 : 142));
      setRoiAvg((prev) => (prev < 147 ? prev + 1 : 147));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }, 5000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail("");
      }, 5000);
    }
  };

  const mapIconToComponent = (iconName: string) => {
    switch (iconName) {
      case "Layout": return <Layout className="w-5 h-5 text-cyan-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "PenTool": return <PenTool className="w-5 h-5 text-teal-400" />;
      case "Video": return <Video className="w-5 h-5 text-amber-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case "Palette": return <Palette className="w-5 h-5 text-purple-400" />;
      case "SearchCode": return <SearchCode className="w-5 h-5 text-cyan-400" />;
      case "Megaphone": return <Megaphone className="w-5 h-5 text-sky-400" />;
      case "Workflow": return <Workflow className="w-5 h-5 text-violet-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Background ambient lighting glow (exclusive layout detail for dark mode) */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] bg-radial from-cyan-500/10 via-slate-950/0 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-radial from-indigo-500/10 via-slate-950/0 to-transparent rounded-full blur-3xl opacity-50" />
        </div>
      )}

      {/* Modern Sticky Navigation */}
      <header className={`sticky top-0 z-40 transition-all duration-200 border-b backdrop-blur-md ${
        isDark ? "bg-slate-950/80 border-slate-900" : "bg-white/80 border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand Brand */}
          <div 
            onClick={() => setSelectedTab("home")} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-600 to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full bg-slate-950 rounded-md flex items-center justify-center font-bold text-sm text-cyan-400 group-hover:text-white transition-colors">
                λ
              </div>
            </div>
            <div>
              <span className="font-display font-semibold text-lg tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-cyan-200 transition-all">
                {isDark ? "Avtaran" : "Avtaran Agency"}
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-[#06b6d4] uppercase">DIGITAL CODES</span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "about", label: "About" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Testimonials" },
              { id: "blog", label: "Briefs" },
              { id: "contact", label: "Contact" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`text-xs font-mono tracking-wider transition-colors uppercase ${
                  selectedTab === tab.id
                    ? "text-cyan-400 font-bold"
                    : isDark ? "text-slate-400 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Navigation Controls Extra */}
          <div className="hidden sm:flex items-center gap-3.5 z-40">
            {/* Theme Toggle toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border transition-colors ${
                isDark ? "bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300" : "bg-slate-100 border-slate-250 text-indigo-700 hover:text-indigo-900"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* AI Custom blueprint generator quick trigger */}
            <button
              onClick={() => setSelectedTab("services")}
              className="bg-slate-950 hover:bg-slate-900 text-slate-205 border border-slate-800 hover:border-cyan-500/80 px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide uppercase transition-all flex items-center gap-1.5 shadow-md pointer-events-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-450 animate-pulse" />
              AI Estimate
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg border bg-slate-900 border-slate-800 text-amber-400 mr-2"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-200 border-slate-300 text-slate-800"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-x-0 top-16 z-30 p-4 border-b animate-fadeIn lg:hidden ${
          isDark ? "bg-slate-950 border-slate-900 text-slate-200" : "bg-white border-slate-200 text-slate-900"
        }`}>
          <div className="grid grid-cols-2 gap-3.5">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "about", label: "About" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Testimonials" },
              { id: "blog", label: "Briefs" },
              { id: "contact", label: "Contact" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`py-3 px-4 rounded-xl text-[11px] font-mono tracking-widest uppercase transition-all duration-150 text-left border ${
                  selectedTab === tab.id
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                    : isDark ? "bg-slate-900/60 border-slate-850 text-slate-300" : "bg-slate-100 border-slate-250 text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-900">
            <button
              onClick={() => {
                setSelectedTab("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-center"
            >
              Book Strategy Session
            </button>
          </div>
        </div>
      )}

      {/* CORE DISPLAY ZONE */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* ========================================================================= */}
        {/* HOME SECTION */}
        {selectedTab === "home" && (
          <div className="space-y-24 animate-fadeIn">
            {/* Hero Section */}
            <section className="text-center space-y-7 max-w-4xl mx-auto pt-4 md:pt-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 text-xs font-mono rounded-full animate-pulse shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-spin duration-3000" />
                Available starting June 2026: Immersive Client Architectures
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-none text-slate-900 dark:text-slate-100">
                We Turn Ideas Into <br />
                <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 bg-clip-text text-transparent italic font-semibold">
                  Digital Success
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                 Avtaran is a premium digital agency engineering elite React web products, custom server-side artificial intelligence systems, and ROI-centric marketing engines for fast-scaling brands.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTab("contact")}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.45)] flex items-center justify-center gap-2 pointer-events-auto"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  Book Free Consultation
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTab("portfolio")}
                  className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 px-6 py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2 pointer-events-auto"
                >
                  View Case Files
                  <ArrowRight className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                </button>
              </div>
            </section>

            {/* Client Trust Indicators (Marquee look) */}
            <section className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 shadow-sm dark:shadow-md max-w-6xl mx-auto">
              <p className="text-center font-mono text-[9px] uppercase tracking-widest text-slate-500">Trusted By Ventures backed by top global partners</p>
              <div className="mt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
                {["Lumina SaaS", "Apex Luxury Goods", "Aegis Health MedCorp", "Zenith Venture Capital", "OmniScale Fintech"].map((brand) => (
                  <div key={brand} className="text-xs font-display font-medium text-slate-700 dark:text-slate-350 tracking-wider">
                    {brand}
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Services Overview */}
            <section className="space-y-10">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Capabilities Suite</span>
                <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Our Core Transformation Segments</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Bespoke Development",
                    desc: "State-of-the-art interactive frontends styled with Tailwind and powered by custom TypeScript modular components. Perfect Lighthouse speed scores guaranteed.",
                    icon: "Layout",
                    bgImg: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600"
                  },
                  {
                    title: "Premium Sound & Video",
                    desc: "Editing high-retention campaigns, micro-reels, and founder briefings with professional audio layering and engaging textual hooks that retain users.",
                    icon: "Video",
                    bgImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=600"
                  },
                  {
                    title: "Intelligent Workflows",
                    desc: "Deploying secure server-side Gemini AI proxies, in-app advisors, and Zapier/Make connections that streamline customer relationship pipelines safely.",
                    icon: "Cpu",
                    bgImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-805 rounded-2xl p-6 hover:border-cyan-500/30 dark:hover:border-slate-700 transition-all group flex flex-col justify-between shadow-sm dark:shadow-none"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-850">
                        {mapIconToComponent(item.icon)}
                      </div>
                      <h3 className="text-sm font-bold font-sans text-slate-800 dark:text-slate-200 uppercase tracking-wider">{item.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTab("services")}
                      className="mt-6 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      Inspect services list
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Transformative Visual Sandbox (Slider) */}
            <section className="space-y-6 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-cyan-650 dark:text-cyan-400 uppercase tracking-widest">Aesthetic Proof of Concept</span>
                <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-slate-800 dark:text-slate-200">Witness the Avtaran transformation benchmark</h2>
              </div>
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"
                afterImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
                beforeLabel="Legacy Bootstrap Theme (Slow conversions)"
                afterLabel="Avtaran Glassmorphism (High authority conversions)"
              />
            </section>

            {/* Dynamic Counter Metrics */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto bg-white dark:bg-slate-950/20 p-8 border border-slate-200 dark:border-slate-900 rounded-3xl text-center shadow-md dark:shadow-lg">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">AVG scaling boost</p>
                <div className="text-lg sm:text-3xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">{roiAvg}%+</div>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">CLIENT METRICS SECURED</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Delivered masterworks</p>
                <div className="text-lg sm:text-3xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">{projectsCount}+</div>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">ZERO TEMPLATE USAGE</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Audited Core Speed</p>
                <div className="text-lg sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">98/100</div>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">LIGHTHOUSE CERTIFIED</span>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Secure AI queries</p>
                <div className="text-lg sm:text-3xl font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">100%</div>
                <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono">SERVER SIDE ENCRYPTION</span>
              </div>
            </section>
            {/* Testimonials preview slider */}
            <section className="space-y-10 max-w-4xl mx-auto bg-white dark:bg-slate-900/10 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-900/60 shadow-md dark:shadow-inner">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Success Stories</span>
                <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-slate-100">Endorsed by Fast-scaling partners</h2>
              </div>
              
              <div className="space-y-5">
                <p className="text-sm italic text-slate-700 dark:text-slate-300 text-center leading-relaxed">
                  "{AGENCY_TESTIMONIALS[activeVideoTestimonial].review}"
                </p>
                <div className="flex justify-center items-center gap-3">
                  <img
                    src={AGENCY_TESTIMONIALS[activeVideoTestimonial].avatar}
                    alt={AGENCY_TESTIMONIALS[activeVideoTestimonial].name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-801 object-cover"
                  />
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{AGENCY_TESTIMONIALS[activeVideoTestimonial].name}</h5>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">{AGENCY_TESTIMONIALS[activeVideoTestimonial].role}, {AGENCY_TESTIMONIALS[activeVideoTestimonial].company}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-1.5 pt-2">
                  {AGENCY_TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveVideoTestimonial(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        activeVideoTestimonial === i ? "bg-cyan-500 scale-125" : "bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Lead capture footer newsletter */}
            <section className="max-w-4xl mx-auto bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-950 dark:to-indigo-950/20 p-8 rounded-3xl border border-slate-200 dark:border-slate-801 shadow-lg dark:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-center md:text-left md:flex justify-between items-center gap-6">
                <div className="space-y-1.5 max-w-md">
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center md:justify-start gap-1 uppercase tracking-wider font-mono">
                    <Send className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    Get High-Converting Strategy Briefs
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                     We dispatch curated tactical studies on user interface conversions, SEO indexing trends, and automation setups once every two weeks. Strictly zero slop.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 w-full md:max-w-xs shrink-0">
                  {newsletterSubscribed ? (
                    <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      Dispatch secure! Check your inbox shortly.
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="your@business.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-202 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all pointer-events-auto shadow-md"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
        {/* ========================================================================= */}
        {/* SERVICES SECTION */}
        {selectedTab === "services" && (
          <div className="space-y-14 animate-fadeIn">
            {/* Header intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Our Engineering capabilities</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Bespoke Professional Services</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Avtaran doesn't trade standard templates. We build high-utility, custom-tailored solutions engineered from line zero with direct scaling blueprints.
              </p>
            </div>

            {/* AI Diagnostics scoper integration directly inside workflow */}
            <section className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <h4 className="text-xs font-bold font-sans text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    Unsure of requirements scoping?
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 max-w-md font-sans">Our integrated Gemini system can compile a direct timeline and outline of services based on your business descriptions instantly.</p>
                </div>
                <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 uppercase bg-cyan-500/10 border border-slate-200 dark:border-cyan-900 px-2.5 py-1 rounded">
                  AI ROBUST CONSOLE ENABLED
                </div>
              </div>
              <AiProjectBuilder />
            </section>

            {/* Detailed Services list mapping */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGENCY_SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between group hover:border-cyan-500/30 dark:hover:border-slate-700 transition-all duration-300 shadow-sm dark:shadow-none"
                >
                  <div className="space-y-4">
                    {/* Header line icon starting price */}
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-850 group-hover:border-cyan-500/30">
                        {mapIconToComponent(srv.icon)}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-505/20">
                        {srv.pricing}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold font-sans text-slate-800 dark:text-slate-100 uppercase tracking-widest">{srv.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{srv.description}</p>

                    {/* Key Benefits layout list */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Key Benefits:</p>
                      <ul className="space-y-1.5">
                        {srv.benefits.map((ben, i) => (
                          <li key={i} className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug flex items-start gap-1.5 font-sans">
                            <span className="text-cyan-500 dark:text-cyan-400 text-xs mt-0.5">•</span>
                            {ben}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process steps brief dropdown accordion */}
                    <div className="space-y-1 pt-2">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Deployment Roadmap:</p>
                      <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-850 space-y-1">
                        {srv.process.map((step, idx) => (
                          <div key={idx} className="text-[9px] font-mono text-slate-600 dark:text-slate-400 flex gap-1 items-center">
                            <span className="text-cyan-600 dark:text-cyan-400 font-bold">{idx + 1}.</span>
                            <span className="line-clamp-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buy action button */}
                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-900">
                    <button
                      type="button"
                      onClick={() => {
                        // Find matching visual retainer plan or launch general pricing check
                        const targetPlan = AGENCY_PRICING.find(p => p.id === "growth");
                        if (targetPlan) setSelectedPlan(targetPlan);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-805 text-slate-700 dark:text-slate-300 p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center gap-1.5 uppercase tracking-wide pointer-events-auto"
                    >
                      Lock In This Retainer
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTFOLIO SECTION */}
        {selectedTab === "portfolio" && (
          <div className="space-y-14 animate-fadeIn">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Selected Masterworks</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Bespoke Case Briefings</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                 Review technical breakdowns of how our custom UI deployments, secure AI proxy APIs, and high-converting marketing briefs produced record ROI parameters.
              </p>
            </div>
            
            <PortfolioShowcase projects={AGENCY_PROJECTS} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABOUT SECTION */}
        {selectedTab === "about" && (
          <div className="space-y-16 animate-fadeIn select-text">
            {/* Mission Statement */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Our origin story</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
                  Concept Incarnation: Designing the Future Space
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed select-text font-sans">
                   Avtaran is Sanskrit for "demanding incarnation"—representing the transition of premium, high-utility conceptual theories into functional, high-speed digital reality on the web.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed select-text font-sans">
                   We built Avtaran because we observed a catastrophic vacuum in the digital industry: agencies building sluggish, uninspired WordPress portals that are incapable of performing secure client integrations. We established a studio of engineers, visual artists, and conversion growth directors working in complete alignment.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  alt="Avtaran Lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-4 rounded-xl backdrop-blur-md">
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">“The craft is defined purely by precision spacing, robust data integrity, and fast-flowing micro-animations.”</p>
                </div>
              </div>
            </section>

            {/* Core Pillars Why Choose us */}
            <section className="space-y-10">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Our Alignment Philosophy</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-slate-100">Why fast-growth startups prioritize Avtaran</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Desktop-First Visual Precision",
                    desc: "Every grid margin, paragraph spacing, and layer index is meticulously checked against standard visual rules. No default template leaks, ever."
                  },
                  {
                    title: "Intelligent API Secure Proxies",
                    desc: "Our full-stack solutions process queries on secure cloud endpoints, isolating confidential corporate elements while delivering speed ratings below 300ms."
                  },
                  {
                    title: "Data-Backed Growth Metrics",
                    desc: "We prioritize organic search signals, conversion funnel optimization, pixel tracking structures, and done-for-you authority, bypassings ad climbing costs."
                  }
                ].map((p, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 space-y-3 shadow-inner">
                    <div className="text-xs font-mono text-cyan-605 dark:text-cyan-400 font-bold">0{idx + 1}.</div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-sans">{p.title}</h4>
                    <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-sans">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Meet the founders team */}
            <section className="space-y-10">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-bold">The Brain Trust</span>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-slate-100">Craftsmen behind the Avtaran standard</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    name: "Soren Radcliffe",
                    role: "Lead UI Craftsman",
                    desc: "Ex-Apple design team lead. Obsessive about typography tracking, modular grid spacing, and balanced layout alignments.",
                    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120"
                  },
                  {
                    name: "Tanya Sen",
                    role: "AI Integration Lead",
                    desc: "Ex-Google Brain researcher. Directing server-side model alignment, prompt conditioning, and workflow automations.",
                    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120"
                  },
                  {
                    name: "Liam O'Connor",
                    role: "Lead SEO Strategist",
                    desc: "Ex-Stripe growth scale marketing. Directing topical search mapping structures, local indexings, and conversion copy pipelines.",
                    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120"
                  }
                ].map((member, i) => (
                  <div key={i} className="text-center space-y-3.5 bg-white dark:bg-slate-900/20 p-5 rounded-2xl border border-slate-200 dark:border-slate-900 shadow-sm dark:shadow-none">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-full border border-slate-200 dark:border-slate-805 mx-auto object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">{member.name}</h4>
                      <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mt-0.5 block">{member.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-650 dark:text-slate-400 leading-relaxed font-sans">{member.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PRICING SECTION */}
        {selectedTab === "pricing" && (
          <div className="space-y-14 animate-fadeIn">
            {/* Header intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Clear transparent investments</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Bespoke Retainer Packages</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                 Select an active velocity rate that matches your scale. We operate with transparent retainers, billed monthly with zero hidden fees.
              </p>
              
              {/* Billing Cycle Selector Selector */}
              <div className="flex items-center justify-center gap-3 pt-4 select-none">
                <span className={`text-xs font-mono transition-colors ${billingPeriod === "monthly" ? "text-cyan-605 dark:text-cyan-400 font-bold" : "text-slate-400 dark:text-slate-500"}`}>Billed Monthly</span>
                <button
                  type="button"
                  onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
                  className="w-11 h-6 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative flex items-center p-1 transition-all pointer-events-auto"
                >
                  <div className={`w-4 h-4 rounded-full bg-cyan-500 transition-all ${billingPeriod === "annual" ? "translate-x-5" : "translate-x-0"}`} />
                </button>
                <span className={`text-xs font-mono transition-colors ${billingPeriod === "annual" ? "text-cyan-650 dark:text-cyan-400 font-bold" : "text-slate-400 dark:text-slate-500"}`}>
                  Billed Annually <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded ml-1">SAVE 20%</span>
                </span>
              </div>
            </div>

            {/* Plans Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
              {AGENCY_PRICING.map((plan) => {
                // Calculate price based on billing interval
                const basePriceNum = parseInt(plan.price.replace(",", ""));
                const intervalPrice = billingPeriod === "annual" 
                  ? Math.round((basePriceNum * 0.8)).toLocaleString()
                  : plan.price;

                const cardStyles = plan.id === "starter"
                  ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700"
                  : plan.id === "growth"
                  ? "border-cyan-500 bg-white dark:bg-slate-950 shadow-[0_4px_25px_rgba(6,182,212,0.06)] dark:shadow-[0_0_20px_rgba(6,182,212,0.15)] text-slate-900 dark:text-slate-100"
                  : "border-indigo-200 dark:border-indigo-500 bg-gradient-to-b from-white via-indigo-50/5 to-white dark:from-slate-950 dark:to-indigo-950/20 text-slate-900 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-400";

                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 relative group overflow-hidden ${cardStyles}`}
                  >
                    {/* Popular banner highlight */}
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-bl-xl shadow-lg">
                        Highly recommended scaling engine
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Name of Plan */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 tracking-widest block font-bold">retainer plan</span>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mt-0.5">{plan.name}</h4>
                      </div>

                      {/* Explicit Price metrics */}
                      <div>
                        <span className="text-3xl font-bold font-mono text-cyan-600 dark:text-cyan-400">${intervalPrice}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-500 font-mono"> / {plan.period}</span>
                        <p className="text-[10px] font-sans text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{plan.description}</p>
                      </div>

                      {/* Plan features alignment checklists */}
                      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-900/60">
                        <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">Features Included:</p>
                        <ul className="space-y-1.5">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-snug flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Excluded plan limitations (Transparent indicator) */}
                        {plan.featuresExclusions && plan.featuresExclusions.length > 0 && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-900/40">
                            <p className="text-[9px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-wider">plan exclusions:</p>
                            <ul className="space-y-1 mt-1">
                              {plan.featuresExclusions.map((excl, idx) => (
                                <li key={idx} className="text-[10px] text-slate-500 dark:text-slate-500 leading-snug flex items-start gap-1">
                                  <span className="text-red-500 text-xs">-</span>
                                  <span className="line-through opacity-70">{excl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Buy CTA trigger checkout */}
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-900">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={`w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 pointer-events-auto cursor-pointer ${
                          plan.popular 
                            ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_4px_20px_rgba(6,182,212,0.25)]" 
                            : "bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-305 border border-slate-250 dark:border-slate-805 hover:border-slate-300 dark:hover:border-slate-705"
                        }`}
                      >
                        Launch Retainer Contract
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In depth comparison matrix table */}
            <section className="max-w-4xl mx-auto space-y-6 pt-10">
              <h3 className="text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">Comprehensive Capabilities Comparison matrix</h3>
              <div className="bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-900 rounded-2xl overflow-x-auto shadow-sm dark:shadow-inner">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400 select-text">
                  <thead className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 font-mono text-[10px] text-slate-600 dark:text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Capability Core</th>
                      <th className="p-4">Starter</th>
                      <th className="p-4">Growth</th>
                      <th className="p-4">Cosmic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                    {[
                      { cap: "React Page Scaffolding", s: "1 Core page", g: "Multi-page portals", p: "Custom Headless Web Apps" },
                      { cap: "Server SEO schema audits", s: "Standard tags", g: "Bespoke maps", p: "Semantic priority code crawl" },
                      { cap: "Workflows & automated webhooks", s: "No", g: "Standard integrations", p: "Complete Make/n8n pipelines" },
                      { cap: "Secure Gemini Server Proxies", s: "No", g: "Optional Chat support", p: "Unlimited Custom models API" },
                      { cap: "Cinematic Founder content writes", s: "No", g: "4 briefs / mo", p: "8 briefs + dynamic social scale" },
                      { cap: "Committed Engineer SLA Support", s: "7 Days Handover", g: "2 Hour Slack priority", p: "Permanent priority queue" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/10">
                        <td className="p-4 font-medium text-slate-800 dark:text-slate-300">{row.cap}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{row.s}</td>
                        <td className="p-4 text-cyan-600 dark:text-cyan-400 font-medium">{row.g}</td>
                        <td className="p-4 text-indigo-600 dark:text-indigo-400 font-medium">{row.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TESTIMONIALS SECTION */}
        {selectedTab === "testimonials" && (
          <div className="space-y-14 animate-fadeIn">
            {/* Header intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-bold">Verified Success Ratios</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Endorsements & Case Briefs</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                 We are proud of the partnerships we establish with scaling founders. Read direct, verified client logs mapping their experience scaling with Avtaran.
              </p>
            </div>

            {/* Video Testimonials mock player workspace */}
            <section className="bg-slate-100 dark:bg-slate-950/80 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-801 shadow-lg dark:shadow-2xl max-w-4xl mx-auto space-y-6">
              <h4 className="text-xs font-mono text-cyan-600 dark:text-cyan-405 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-900 pb-3">
                <Video className="w-4 h-4 text-cyan-400" />
                Play Interactive Client Video Case Studies
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Simulated video screen player canvas */}
                <div className="md:col-span-7 bg-slate-950 aspect-video rounded-2xl overflow-hidden border border-slate-850/80 relative flex items-center justify-center select-none group">
                  <img
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
                    alt="Mock video backdrop"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40" />
                  
                  {videoPlaying ? (
                    <div className="text-center z-10 p-4">
                      <Sparkles className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-3" />
                      <p className="text-xs text-slate-350 font-mono">STREAMING INTAKE: {AGENCY_TESTIMONIALS[activeVideoTestimonial].videoUrl}</p>
                      <button
                        onClick={() => setVideoPlaying(false)}
                        className="mt-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-205 px-4 py-1.5 rounded-lg text-[10px] uppercase font-mono pointer-events-auto"
                      >
                        pause briefing
                      </button>
                    </div>
                  ) : (
                    <div className="text-center z-10 px-4">
                      <div className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center mx-auto mb-4 cursor-pointer outline-none border border-cyan-400 pointer-events-auto shadow-lg" onClick={() => setVideoPlaying(true)}>
                        <span className="text-lg ml-1">▶</span>
                      </div>
                      <p className="text-xs font-bold text-slate-101">{AGENCY_TESTIMONIALS[activeVideoTestimonial].name}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">{AGENCY_TESTIMONIALS[activeVideoTestimonial].company}</p>
                    </div>
                  )}

                  {/* Player seek timing controller bars */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/80 border-t border-slate-900 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none z-10">
                    <span>0:45</span>
                    <div className="flex-1 mx-3 h-1 bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded" style={{ width: `${videoProgress}%` }} />
                    </div>
                    <span>1:30</span>
                  </div>
                </div>

                {/* Reviews selectors */}
                <div className="md:col-span-5 space-y-3">
                  <p className="text-[10px] font-mono text-slate-400 dark:text-slate-501 uppercase tracking-wider mb-2">Select client feedback logs:</p>
                  {AGENCY_TESTIMONIALS.map((test, idx) => (
                    <button
                      key={test.id}
                      onClick={() => {
                        setActiveVideoTestimonial(idx);
                        setVideoPlaying(false);
                      }}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                        activeVideoTestimonial === idx
                          ? "bg-cyan-500/10 border-cyan-500 text-cyan-800 dark:text-slate-100"
                          : "bg-white dark:bg-slate-900/30 border-slate-205 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-800 shadow-sm dark:shadow-none"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-205">{test.name}</span>
                        {test.isVideo && (
                          <span className="text-[8px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-900/30 font-semibold">VIDEO BRIEFING</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono uppercase mt-0.5">{test.company}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Static customer reviews list */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pt-6">
              {AGENCY_TESTIMONIALS.map((test, i) => (
                <div key={i} className="bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-805 space-y-4 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, id) => (
                      <span key={id} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans select-text">
                     "{test.review}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 dark:text-slate-202">{test.name}</h5>
                      <p className="text-[9px] text-slate-500 font-mono uppercase mt-0.5">{test.role}, {test.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLOG SECTION */}
        {selectedTab === "blog" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Header intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold font-mono">Avtaran intel briefings</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-100">The Obsidian briefings</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                 We compile technical tutorials on front-end rendering engines, conversion typography, and secure AI server proxies. Direct engineering data with zero marketing slop.
              </p>
            </div>

            {/* Search Filter Blog List component */}
            <BlogSearch posts={AGENCY_BLOGS} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTACT SECTION */}
        {selectedTab === "contact" && (
          <div className="space-y-14 animate-fadeIn">
            {/* Header intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Connect with our engineering technicians</span>
              <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-100">Secure Consultation</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                 Schedule your complimentary strategy session or dispatch detailed requirements below. We provide zero-obligation scopes and timeline maps.
              </p>
            </div>

            {/* Main scheduler calendar block */}
            <section className="space-y-6">
              <BookingCalendar />
            </section>

            {/* Secondary Forms & WhatsApp mapping */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto pt-6 items-stretch">
              {/* Manual intake form (7 Cols) */}
              <div className="md:col-span-7 bg-slate-900/30 p-6 sm:p-8 rounded-2xl border border-slate-802 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-cyan-405 uppercase tracking-wide">Or Submit General Spec Questionnaire</h4>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="General Name"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-801 p-3 rounded-lg text-xs text-slate-205 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Corporate Email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-801 p-3 rounded-lg text-xs text-slate-205 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detail your growth goals, timeframe constraints, and current challenges (e.g. Sluggish conversions, wanting to migrate from WooCommerce to headless React)."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-801 p-3 rounded-lg text-xs text-slate-205 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none font-sans"
                      />
                    </div>
                    
                    {contactSubmitted ? (
                      <div className="bg-cyan-500/10 border border-cyan-500/25 p-3.5 rounded-lg text-cyan-404 text-xs flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        Credentials dispatched secure! A technologist will reach out in under 2 hours.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-slate-950 hover:bg-slate-900 text-slate-205 hover:text-cyan-400 border border-slate-801 hover:border-slate-700 p-3 rounded-xl text-xs font-mono uppercase tracking-widest transition-all text-center pointer-events-auto"
                      >
                        dispatch specification details
                      </button>
                    )}
                  </form>
                </div>
              </div>

              {/* Direct channels & Google Maps iframe/vector visualization mockup (5 Cols) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                {/* Instant WhatsApp core redirect */}
                <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-802 space-y-3 text-center sm:text-left">
                  <span className="text-[8px] font-mono text-emerald-400 border border-emerald-900 bg-emerald-500/10 px-1.5 py-0.5 rounded">DIRECT DISPATCH</span>
                  <h4 className="text-xs font-bold text-slate-205 uppercase tracking-wide">Text Kiara on WhatsApp</h4>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
                     Prefer immediate texting? Open a direct conversation pipeline with our primary advisor widget. Available 24/7.
                  </p>
                  <a
                    href="https://wa.me/mocknumber"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold px-4 py-2 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all mt-2 pointer-events-auto shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                    Open client whatsapp
                  </a>
                </div>

                {/* Google coordinate maps mockup */}
                <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-lg p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Physical Labs Coordinates</span>
                    <div className="flex justify-between items-center text-slate-350 text-[10px] font-mono mt-1 border-b border-slate-900 pb-2">
                      <span>Silicon Valley Hub: Palo Alto, CA</span>
                      <span className="text-cyan-400">active</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-350 text-[10px] font-mono pt-2 border-b border-slate-900 pb-2">
                      <span>Bengaluru Engineering Hub, KA</span>
                      <span className="text-cyan-400">active</span>
                    </div>
                  </div>

                  {/* SVG Blueprint Mockup Map Map */}
                  <div className="mt-4 border border-slate-900 rounded-lg aspect-video flex flex-col items-center justify-center p-4 bg-slate-900/40 relative overflow-hidden group select-none">
                    {/* Simulated SVG dynamic grid map coordinates map */}
                    <div className="absolute inset-0 z-0 opacity-15">
                      <div className="w-full h-full bg-cyan-900/20" style={{ backgroundImage: "radial-gradient(circle, #06b6d4 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                    </div>
                    <div className="relative text-center z-10 space-y-1">
                      <p className="text-xs text-cyan-401 font-mono tracking-wide flex items-center justify-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" />SECURE INTERSECTIONS</p>
                      <span className="text-[9px] font-mono text-slate-500">{`lat: 37.4419 / lng: -122.1430`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FAQ INTERACTIVE DUAL-PANE SECTION */}
        <section className="mt-28 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-cyan-500 dark:text-cyan-400 uppercase tracking-widest font-bold">INTERACTIVE SOLUTION MATRIX</span>
            <h3 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">Bespoke Solutions to Elite Challenges</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 max-w-xl mx-auto leading-relaxed">
              Select your primary query or operational roadblock on the left to review how Avtaran engineers a tailored resolution roadmap for your team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4 text-left">
            {/* LEFT LEDGER COLUMN - Client Scenarios (Vertical layout lists) */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-start">
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Select Client Challenge</span>
              <div className="space-y-3">
                {AGENCY_FAQS.map((faq) => {
                  const isActive = activeFaqId === faq.id;
                  const add = getFaqAdditions(faq.id);
                  return (
                    <button
                      key={faq.id}
                      onClick={() => setActiveFaqId(faq.id)}
                      className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer text-xs pointer-events-auto flex gap-3.5 items-start ${
                        isActive
                          ? "bg-cyan-500/10 border-cyan-500/80 text-cyan-950 dark:text-slate-100 shadow-[0_2px_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20"
                          : "bg-white dark:bg-slate-900/30 border-slate-200 dark:border-slate-850/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/10"
                      }`}
                    >
                      {/* Dynamic Icon Bullet */}
                      <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                        isActive
                          ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-600 dark:text-cyan-400"
                          : "bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500"
                      }`}>
                        {faq.id === "faq1" && <Layout className="w-3.5 h-3.5" />}
                        {faq.id === "faq2" && <Cpu className="w-3.5 h-3.5" />}
                        {faq.id === "faq3" && <Sparkles className="w-3.5 h-3.5" />}
                        {faq.id === "faq4" && <Workflow className="w-3.5 h-3.5" />}
                        {faq.id === "faq5" && <AlertCircle className="w-3.5 h-3.5" />}
                      </div>
                      
                      {/* Text Description */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[8px] font-mono uppercase tracking-widest font-bold ${
                            isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-500"
                          }`}>
                            {add.challengePrefix}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-250 dark:bg-slate-800" />
                          <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {add.estimatedSpeed}
                          </span>
                        </div>
                        <h4 className="font-bold sm:leading-snug font-sans text-slate-800 dark:text-slate-100">
                          {faq.question}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANEL COLUMN - Bespoke Solution Board */}
            <div className="lg:col-span-7 flex">
              {(() => {
                const activeFaq = AGENCY_FAQS.find((f) => f.id === activeFaqId) || AGENCY_FAQS[0];
                const add = getFaqAdditions(activeFaq.id);
                return (
                  <div className="w-full bg-white dark:bg-slate-950/40 border-2 border-cyan-500/25 dark:border-slate-850 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden backdrop-blur-xl group">
                    {/* Absolute glow overlays for visual craft */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Top Banner section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-150 dark:border-slate-900 pb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                            AVTARAN CLIENT SOLUTION
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                          {add.impactMetric}
                        </div>
                      </div>

                      {/* Client Scenario details */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">The Client Challenge:</span>
                        <h4 className="text-base font-sans font-extrabold text-slate-800 dark:text-slate-100 select-text uppercase leading-relaxed">
                          "{activeFaq.question}"
                        </h4>
                      </div>

                      {/* Avtaran Blueprint Resolution */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-wider font-semibold flex items-center gap-1.5 matches-icons">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                          The Recommended Solution Framework:
                        </span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans select-text border-l-2 border-cyan-500/40 pl-3">
                          {activeFaq.answer}
                        </p>
                      </div>

                      {/* Deep Dive Docket Features */}
                      <div className="space-y-3 pt-4">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-bold">
                          Bespoke Implementation Framework
                        </span>
                        <ul className="space-y-3">
                          {add.highlights.map((item, index) => (
                            <li key={index} className="flex gap-3 items-start text-xs bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm">
                              <div className="w-5 h-5 rounded-full bg-[#06b6d4]/10 dark:bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                                {index + 1}
                              </div>
                              <div className="space-y-0.5">
                                <h5 className="font-bold text-slate-850 dark:text-slate-100 font-sans">{item.title}</h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer call to action inside the board */}
                    <div className="mt-8 pt-5 border-t border-slate-150 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <span className="block text-slate-500">ENGINEERING SPEED:</span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">{add.estimatedSpeed}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTab("contact");
                          // Scroll to contact scoper area
                          setTimeout(() => {
                            document.getElementById("ai-project-scoper-container")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4.5 py-2.5 rounded-xl text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 pointer-events-auto cursor-pointer"
                      >
                        Initiate {add.challengePrefix} Setup
                        <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
      </main>

      {/* FLOAT AI FLOATING ADVISOR CHAT IN WORKSPACE */}
      <InteractiveChat />

      {/* DETAILED CHECKOUT Retainer Payment payment triggers checkouts */}
      <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />

      {/* Visual footer details */}
      <footer className="mt-32 bg-slate-900 border-t border-slate-200 text-slate-300 dark:bg-slate-950 dark:border-slate-850 select-none pb-12 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top segment with Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left">
            
            {/* Column 1: Brand & Craft Manifesto (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-cyan-500 inline-block shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                <span className="font-display font-black text-sm tracking-widest text-slate-100 dark:text-white uppercase">
                  AVTARAN DIGITAL
                </span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-300 leading-relaxed font-sans max-w-sm">
                Architecting elite digital systems that integrate pristine visual craft with secure, server-side Gemini environments. We construct bespoke, high-conversion applications designed for real-world business velocity.
              </p>
              
              {/* Dynamic Coordinate status lines */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase font-mono text-cyan-500 dark:text-cyan-400 tracking-widest block font-bold">Active Engineering Labs</span>
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  <div className="bg-slate-950 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 pr-1 text-slate-301">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PALO ALTO
                    </div>
                    <span className="text-[9px] text-slate-500">lat: 37.4419</span>
                  </div>
                  <div className="bg-slate-950 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 pr-1 text-slate-301">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      BENGALURU
                    </div>
                    <span className="text-[9px] text-slate-500">lng: 77.5946</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: System Portals / Navigation Hookups (2.5 Cols) */}
            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-white dark:text-slate-100 font-sans font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
                SYSTEM PORTALS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => {
                      setSelectedTab("home");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-slate-300 hover:text-cyan-400 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <span className="text-[10px]">⊙</span> Brand Core Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedTab("portfolio");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-slate-300 hover:text-cyan-400 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <span className="text-[10px]">⊙</span> Case Studies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedTab("pricing");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-slate-300 hover:text-cyan-400 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <span className="text-[10px]">⊙</span> Premium Retainers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedTab("contact");
                      setTimeout(() => {
                        document.getElementById("ai-project-scoper-container")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="text-slate-300 hover:text-cyan-400 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <span className="text-[10px]">⊙</span> Interactive Scoper
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedTab("contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-slate-300 hover:text-cyan-400 dark:text-slate-300 dark:hover:text-cyan-400 flex items-center gap-1.5 focus:outline-none transition-all cursor-pointer"
                  >
                    <span className="text-[10px]">⊙</span> Booking Channels
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Custom Solutions (2.5 Cols) */}
            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-white dark:text-slate-100 font-sans font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
                SOLUTIONS BRIEF
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#06b6d4] font-bold">✔</span> No-Template Policy
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#06b6d4] font-bold">✔</span> Server API Security
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#06b6d4] font-bold">✔</span> Direct Architect Pipe
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#06b6d4] font-bold">✔</span> 95+ Lighthouse Score
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#06b6d4] font-bold">✔</span> Dynamic Agile Timelines
                </li>
              </ul>
            </div>

            {/* Column 4: Client Access Channels (3 Cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-white dark:text-slate-100 font-sans font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-2">
                ACCESS PIPELINES
              </h4>
              
              <div className="space-y-3">
                {/* Instant action call block */}
                <a
                  href="mailto:partner@avtaran.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 dark:bg-slate-900 border border-slate-800/85 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer pointer-events-auto"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-mono">partner@avtaran.com</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </a>

                {/* social networks */}
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold block">Secure Social Feeds</span>
                  <div className="flex gap-2">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-center gap-1.5 pointer-events-auto text-[10px] font-mono">
                      <Linkedin className="w-3.5 h-3.5 text-cyan-500" />
                      LINKEDIN
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex-1 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors flex items-center justify-center gap-1.5 pointer-events-auto text-[10px] font-mono">
                      <Twitter className="w-3.5 h-3.5 text-cyan-400" />
                      TWITTER
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom sector carrying copy, operational states and Scroll to crown anchor */}
          <div className="pt-8 mt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Real engineering copyright license */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-[10px] font-mono text-slate-500 tracking-wide">
                © 2026 Avtaran Digital Agency. All intellectual rights secured. 100% Client Code Ownership.
              </p>
              <span className="text-[8px] font-mono text-slate-600 block uppercase tracking-widest">
                Protected under server-side credentials. Zero templated elements detected.
              </span>
            </div>

            {/* Back to top crown styled control button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-slate-800 hover:border-cyan-400 transition-all font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5 pointer-events-auto cursor-pointer shadow-lg hover:shadow-cyan-500/15"
            >
              Back to crown
              <ArrowUp className="w-3 h-3 text-cyan-400 group-hover:text-slate-950" />
            </button>

          </div>

        </div>
      </footer>
    </div>
  );
}
