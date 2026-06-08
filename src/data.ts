import { ServiceItem, ProjectItem, TestimonialItem, BlogPostItem, PricingPlan, FAQItem } from "./types";

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: "web-design",
    title: "Website Design & Development",
    description: "Bespoke digital platforms engineered with high-end React, smooth animations, and optimized for maximum lead generation.",
    benefits: [
      "Ultra-fast loading times (95+ Google Lighthouse scores)",
      "Premium, distinct layouts tailored specifically to your audience",
      "Fully responsive, touch-optimized layouts for mobile",
      "SEO-friendly semantic HTML and lightning-fast rendering"
    ],
    process: [
      "Discovery & Wireframing (Mapping core flows)",
      "Premium Styling & Interaction Design (Prototyping feel and structure)",
      "Core Frontend Engineering (Clean React, TypeScript, Tailwind)",
      "Performance QA & Final Launch on global CDN nodes"
    ],
    pricing: "Starts from $2,499",
    icon: "Layout",
    category: "tech"
  },
  {
    id: "ai-creation",
    title: "AI-Powered Website Creation",
    description: "Integrating intelligent components, predictive user models, and self-optimizing layouts to deliver hyper-personalized spaces.",
    benefits: [
      "Dynamic personalization (content changes based on user source)",
      "In-app Gemini-integrated virtual advisors and assistants",
      "Auto-generating product recommendations & lead qualification",
      "Intelligent instant translation and voice search support"
    ],
    process: [
      "Integrations Scoping (Defining model flows)",
      "Server-Side API Proxy Secure Setup",
      "Custom Assistant Training & Alignment",
      "Feedback Loop Integration for auto-improvements"
    ],
    pricing: "Starts from $4,200",
    icon: "Cpu",
    category: "tech"
  },
  {
    id: "content-writing",
    title: "Elite Content Strategy & Writing",
    description: "High-concept copywriting that captures brand voice, stimulates emotion, and is mathematically written to rank on Google search.",
    benefits: [
      "Laser-focused conversion-copy for landing pages",
      "In-depth research-driven technical industry articles",
      "Custom brand voice guidelines and standard scripts",
      "SEO semantic keyword optimization injected naturally"
    ],
    process: [
      "Audiological Brand Voice Audit",
      "Comprehensive Competitor Keyword Matrix Mapping",
      "Drafting & Fine Copy Editing (Eliminating slop)",
      "A/B testing lead conversion rates"
    ],
    pricing: "Starts from $1,200/mo",
    icon: "PenTool",
    category: "marketing"
  },
  {
    id: "video-editing",
    title: "High-Retention Video Production",
    description: "Premium visual storytelling for YouTube, TikTok, Instagram Reels, and corporate launches designed to maximize viewer retention.",
    benefits: [
      "Advanced pacing structures keeping viewers locked in",
      "Custom premium sound design and subtle sensory soundscapes",
      "Elegant typography captions and dynamic motion graphics",
      "Engaging hooks and storytelling narrative architecture"
    ],
    process: [
      "Hook Formulation & Script Polish",
      "Multi-cam assembly & sound engineering",
      "Custom asset addition (emojis, motion plates, b-roll)",
      "Direct rendering optimization for specific platforms"
    ],
    pricing: "Starts from $1,500/mo",
    icon: "Video",
    category: "marketing"
  },
  {
    id: "social-media",
    title: "Social Growth Engine",
    description: "Organic content engines that build authentic authority on LinkedIn, X/Twitter, and Instagram to turn followers into active pipelines.",
    benefits: [
      "100% done-for-you strategic content calendar production",
      "Targeted authority positioning for founders & executives",
      "Organic growth focus avoiding paid bots or ads",
      "Direct conversion funnels linking to books, SaaS, or consultations"
    ],
    process: [
      "Niche Core Authority Strategy definition",
      "Weekly asset creation (carousel graphics, threads, posts)",
      "Daily active monitoring and engagement boosts",
      "Monthly pipeline optimization analytics report"
    ],
    pricing: "Starts from $1,800/mo",
    icon: "TrendingUp",
    category: "marketing"
  },
  {
    id: "branding-design",
    title: "High-End Visual Identity & Branding",
    description: "Fusing futuristic minimalist styling with visual systems, custom typography pairings, logos, and digital asset templates.",
    benefits: [
      "Iconic logo systems representing conceptual depth",
      "Fully detailed interactive Brand Bible & Design guidelines",
      "Cohesive typographic framework across all web channels",
      "Social, keynote, and product wrapper template kits"
    ],
    process: [
      "Semantic Brand Moodboards analysis",
      "Dynamic Typographic pairing and Vector conceptualization",
      "Logo iterations and collateral design",
      "Complete Brand Book compilation"
    ],
    pricing: "Starts from $3,000",
    icon: "Palette",
    category: "design"
  },
  {
    id: "seo-optimization",
    title: "Technical SEO Scaling",
    description: "Deep index mapping, speed audits, semantic page architecture, and high-quality backlink pipelines to claim the search landscape.",
    benefits: [
      "Eliminating Crawl Errors and Schema inconsistencies",
      "Core Web Vitals repair boosting rank signal",
      "Rich snippet cards configuration",
      "White-hat high-performance guest blogging acquisition"
    ],
    process: [
      "Full Codebase Technical crawl audit",
      "Semantic restructure design and Schema JSON-LD injection",
      "Speed recovery (Next-gen image conversion, script deferral)",
      "Ongoing authority building"
    ],
    pricing: "Starts from $1,600/mo",
    icon: "SearchCode",
    category: "tech"
  },
  {
    id: "digital-marketing",
    title: "Hyper-Targeted Paid Campaigns",
    description: "Precision-focused Meta, Google, and LinkedIn ad funnels combined with behavioral email sequences to maximize immediate ROI.",
    benefits: [
      "High-intent search target ads focusing on ready buyers",
      "Exquisite behavioral automated email welcome & nurturing sequences",
      "Highly refined retargeting grids matching specific drop-offs",
      "In-depth daily pixel tracking & analytic performance dashboard"
    ],
    process: [
      "Funnel mapping & creative design",
      "Cold & warm target copy variations drafting",
      "Campaign launch, pixel integration, and manual bid cooling",
      "Scale-up of winning assets and email retention automation"
    ],
    pricing: "Starts from $2,200/mo",
    icon: "Megaphone",
    category: "marketing"
  },
  {
    id: "automations",
    title: "Workflow Automation Solutions",
    description: "Architecting seamless digital bridges using Make, Zapier, and n8n to connect your CRM, leads, social posts, and storage automatically.",
    benefits: [
      "Saving up to 25 hours per week of manual coordinate tasks",
      "Instant AI Lead nurturing (notifying agents in <2 minutes)",
      "Zero-latency automated document & digital invoice delivery",
      "Robust failover logic preventing database sync errors"
    ],
    process: [
      "Process Bottleneck Audit (Mapping current manual tasks)",
      "Integration Sandbox Drafting & Token securing",
      "Deploying secure automations with webhook configurations",
      "Fail-safe logs training and maintenance handover"
    ],
    pricing: "Starts from $1,999",
    icon: "Workflow",
    category: "tech"
  }
];

export const AGENCY_PROJECTS: ProjectItem[] = [
  {
    id: "lumina-ai",
    title: "Bespoke SaaS Transformation",
    client: "Lumina Intelligence",
    desc: "Transformed a raw analytics backend into a breathtaking, futuristic dark-mode console that increased user retention by 89% and immediate conversions by 134%.",
    beforeImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=60&w=600",
    afterImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
    category: "web",
    caseStudy: "Lumina AI had industry-leading data models but suffered from heavy user friction due to a chaotic default UI template. Avtaran stepped in to redesign their complete ecosystem from scratch. We conceptualized an obsidian dashboard showcasing elegant typography, customizable modular panes, and high-performance charts that load synchronously.",
    results: [
      "134% increase in new subscription conversion rate in week 1",
      "89% drop in customer onboarding questions",
      "Sub-150ms dynamic page transitioning powered by custom-built React layouts"
    ],
    tags: ["React 19", "Obsidian Theme", "Inter Fonts", "Framer Engine"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "apex-ecommerce",
    title: "Decoupled Storefront Overhaul",
    client: "Apex Luxury Goods",
    desc: "Moved a high-end watchmaker from a sluggish default WooCommerce instance into a custom tailwind-powered decoupler storefront, creating high-fashion interactions.",
    beforeImg: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=60&w=600",
    afterImg: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1200",
    category: "branding",
    caseStudy: "For watches retailing at $5,000+, a cheap-built website felt disconnected from the craft. We built an incredibly smooth e-commerce app featuring rich 3D zoom assets, immersive vertical parallax scroll paths, and a custom Checkout flow that accepts Stripe/Apple Pay instantaneously.",
    results: [
      "Cart abandonment dropped from 71% to an elite 26%",
      "Site loading speed escalated by 4.2x",
      "Visual authority fully re-aligned with standard global design guidelines"
    ],
    tags: ["Headless Commerce", "Parallax Scroll", "Stripe Engine", "High-End Typography"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "zenith-funnel",
    title: "Founder Lead Authority Engine",
    client: "Zenith VC Partnerships",
    desc: "Engineered a systematic content creation and LinkedIn authority ecosystem for a Tier-1 venture firm's managing partners, yielding highly targeted LP conversations.",
    beforeImg: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=60&w=600",
    afterImg: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
    category: "marketing",
    caseStudy: "Zenith wanted high-value pipeline inflows from growth founders, but generic ads weren't reaching extreme capital executives. We created a bespoke authority channel focusing on thought leadership, premium micro-videos, and targeted newsletters.",
    results: [
      "Scaled brand reach from 12k to 1.8M organic views in 120 days",
      "Secured 34 validated high-net-worth partner introductions",
      "Established absolute category expertise throughout X and LinkedIn ecosystems"
    ],
    tags: ["Content Architecture", "Micro-Video Editing", "CEO Branding", "CRM Automation"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "aegis-diagnostics",
    title: "AI-Integrated Patient Portal",
    client: "Aegis Healthcare Services",
    desc: "Crafted a secure patient onboarding system with localized AI diagnostic summaries, ensuring complete HIPAA compliance and zero-friction navigation.",
    beforeImg: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=60&w=600",
    afterImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    category: "ai",
    caseStudy: "Aegis needed to safely onboard patient intakes and provide smart triage support. We engineered a gorgeous interface including a natural-dialog AI voice intake and responsive summary widgets using Gemini security frameworks on the web.",
    results: [
      "94% patient onboarding satisfaction rating",
      "Internal intake routing time minimized by 73%",
      "Secured complete high-encryption credentials database architecture"
    ],
    tags: ["Gemini API", "Intake Triage", "HIPAA Compliance", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800"
  }
];

export const AGENCY_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Catherine Vance",
    role: "Director of Product",
    company: "Lumina SaaS",
    review: "Avtaran operates on a level we have never seen before. Standard agencies build typical template widgets. Avtaran designed a breathtaking digital system that immediately felt premium, helping us secure our Series B funding within months of deploying. Absolute craftsmen.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120",
    isVideo: true,
    videoUrl: "Project Lumina Case Study View"
  },
  {
    id: "t2",
    name: "Marcus Thorne",
    role: "Founder & CEO",
    company: "Apex Luxury Group",
    review: "We are obsessive about details, and Avtaran stood neck-and-neck with us. From custom sound design for our video transitions to an e-commerce checkout flow optimized down to milliseconds, our brand value has reached a new standard. Outrageous ROI.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    isVideo: false
  },
  {
    id: "t3",
    name: "Dr. Alisha Patel",
    role: "Chief Operating Officer",
    company: "Aegis MedCorp",
    review: "The custom AI integration that Avtaran engineered changed how we onboard clinic leads. Their server-side implementation is exceptionally secure and lightning fast. Our team saves twenty hours every week. Truly a forward-thinking digital agency.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    isVideo: true,
    videoUrl: "Dr. Patel - Aegis AI System Overview"
  }
];

export const AGENCY_PRICING: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Velocity",
    price: "1,200",
    period: "month",
    description: "Perfect for high-growth startups, personal brands, and high-impact micro projects looking for a stunning design & content footprint.",
    features: [
      "Custom React Landing Page (1 Core Screen, fully responsive)",
      "Premium Branding, Logo System & Typographical Sheet",
      "Full SEO Semantic Configuration & Schema tags",
      "Integrated lead collection form with email notifications",
      "Secure WhatsApp & social link routing",
      "7 Days deployment & full documentation handover"
    ],
    featuresExclusions: [
      "Advanced server-side custom AI models integration",
      "Dynamic Multi-page portfolio systems",
      "Custom Make/Zapier workflow automations mapping"
    ],
    popular: false,
    color: "border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-200"
  },
  {
    id: "growth",
    name: "Growth Engine",
    price: "2,400",
    period: "month",
    description: "Ideal for established small businesses, local businesses, and modern e-commerce stores looking for complete, done-for-you active scaling.",
    features: [
      "Bespoke Multi-Page React Website Design & Core Development",
      "Elite Content Strategy (4 Research-Driven Blog posts/mo)",
      "Organic Social Media Scaling (8 Auth-optimized posts/mo)",
      "Interactive Step-by-Step Lead Booking System Integration",
      "Advanced Core Web Vitals optimization (100% caching)",
      "AI Chat Widget & client onboarding support proxy",
      "Dedicated slack channel with 2-hour response guarantee"
    ],
    featuresExclusions: [
      "Custom database portal portals development",
      "Bespoke high-retention cinematic video production"
    ],
    popular: true,
    color: "border-cyan-500 bg-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-slate-100"
  },
  {
    id: "premium",
    name: "Enterprise Cosmic",
    price: "4,500",
    period: "month",
    description: "The absolute zenith of digital design, AI-powered automation solutions, custom APIs, and high-retention video production for global leaders.",
    features: [
      "Next-Gen Headless Custom Web Apps / Advanced Portal Portals",
      "High-Retention Cinematic Video Production (6 Edited pieces/mo)",
      "Enterprise Custom AI Integrations (Gemini API server-proxies)",
      "Make/Zapier Workflow Automations Mapping (No manual overhead)",
      "Premium Brand Identity Rehaul with interactive UI Design kits",
      "A/B testing, pixel mapping, and deep scale Paid Ads funnels",
      "Bi-Weekly Strategy consultation calls & permanent priority dev queue"
    ],
    popular: false,
    color: "border-indigo-500 hover:border-indigo-400 bg-gradient-to-b from-slate-950 to-indigo-950/20 text-slate-100"
  }
];

export const AGENCY_FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "What actually makes Avtaran different from other digital agencies?",
    answer: "Most traditional agencies slap templates together or over-complicate processes. Avtaran operates at the intersection of extreme visual craft and next-gen technology. We build ultra-custom full-stack React systems, design breathtaking custom aesthetics (no templates), and integrate actual server-side AI solutions. We deliver elite, high-converting assets built for real-world scaling, fast.",
    category: "general"
  },
  {
    id: "faq2",
    question: "Do you build custom client client portals and AI tools?",
    answer: "Absolutely. In fact, custom AI creation is our sweet spot. We handle everything from secure server-side Gemini integrations, personalized user flows, smart lead qualification, and automated CRM connections. Your AI feature won't just be an unaligned iframe—it will be a seamless, high-speed extension of your product.",
    category: "ai-tools"
  },
  {
    id: "faq3",
    question: "How does the 'AI Project Scope Builder' function?",
    answer: "Our proprietary AI Project Scope tool uses Gemini to analyze your business description, core features, and budget range. It generates a detailed Scope of Work blueprint—including suggested tech stacks, exact milestones, and timeline recommendations—instantly. You can save, download, or use it to fast-track your kick-off call with our technicians.",
    category: "ai-tools"
  },
  {
    id: "faq4",
    question: "What is your onboarding process like?",
    answer: "Extremely simple. First, select a set plan or generate an AI project roadmap. Next, book your quick 1-on-1 strategy session on our contact screen. Once confirmed, we establish your dedicated private Slack channel, receive your brand assets, and initiate development in less than 24 hours.",
    category: "services"
  },
  {
    id: "faq5",
    question: "Are there any hidden costs in the Pricing Plans?",
    answer: "Zero. Our Starter, Growth, and Premium plans are 100% transparent and billed monthly with no lock-in contracts. Any third-party costs (like specific paid domain services or specialized premium email marketing tools) are configured directly under your billing so you maintain complete ownership of your stack.",
    category: "pricing"
  }
];

export const AGENCY_BLOGS: BlogPostItem[] = [
  {
    id: "b1",
    title: "The Design Principles That Drive 10x Product Conversion Rates",
    excerpt: "Why typical layouts are suffering, and how to deploy visual rhythm, premium micro-animations, and balanced typography matching Swiss modern guidelines to win.",
    content: `In the digital landscape of 2026, user attention spans are measured in milliseconds. If your website resembles everyone else's blockgrid template, you are losing cash, and your brand's digital value is depreciating.

At Avtaran, we design for structural distinction. Here are three core laws to immediately elevate your conversion rates:

### 1. Master Negative Space
Do not try to cram every single selling point above the fold. Generous whitespace creates breathing room, which translates to immediate premium feel. When a user lands, they should know exactly where their eyes should rest. Let the heading command the space.

### 2. High-Performance Glassmorphism
Premium aesthetics use layering. Dynamic blur presets, glowing subtle borders, and slight background blending gradients pull the user into a tactile interface. Ensure the back-blurs utilize \`backdrop-filter\` parameters correctly to prevent rendering flickering.

### 3. Motion with Purpose
A bounce animation on scroll that adds nothing but clutter is 'slop'. Micro-interactions—like subtle button glowing, card hovering elevation, and header fade transitions—smooth the visual pathway. Every motion must represent a physical reality to guide user intent toward CTA buttons.`,
    readTime: "4 min read",
    date: "June 3, 2026",
    category: "Design System",
    author: {
      name: "Soren Radclife",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120",
      role: "Lead UI Craftsman"
    },
    image: "https://images.unsplash.com/photo-1541462608141-2f5203690647?auto=format&fit=crop&q=80&w=800",
    tags: ["UI/UX", "Product Design", "Conversion Rate"]
  },
  {
    id: "b2",
    title: "Implementing Secure AI Assistants Without Ruining Site Performance",
    excerpt: "An architectural guide to deploying server-side Gemini API proxies inside custom React apps, maintaining perfect user security and high page speeds.",
    content: `Artificial intelligence is the ultimate converter for modern startups and e-commerce companies. A guest shouldn't just read an FAQ list; they should converse with an active advisor trained inside your brand context.

However, poorly implemented client-side API integrations are a security disaster and drag down your site's Lighthouse scores.

### Why Client-Side API Keys Are Dangerous
Exposing your custom API credentials to the browser's developer console invites malicious billing attacks and breaks standard security rules. Always isolate secret keys in your server context (e.g. \`process.env.GEMINI_API_KEY\`).

### Establishing Express Proxy Middleware
By deploying an Express route acting as a secure gate, your client app sends simple text frames, and the server communicates with Gemini using the high-performance \`@google/genai\` SDK.

\`\`\`ts
// Isolate on server
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.post("/api/chat", async (req, res) => { ... });
\`\`\`

### Caching and Stream Performance
By caching common questions and optimizing JSON responses, you can achieve sub-200ms latency, keeping your site feeling responsive and interactive. Let the AI serve your clients responsibly and watch your intake scales skyrocket.`,
    readTime: "6 min read",
    date: "May 28, 2026",
    category: "AI & Tech",
    author: {
      name: "Tanya Sen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120",
      role: "AI Integration Lead"
    },
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
    tags: ["Gemini API", "Express", "React", "Security"]
  },
  {
    id: "b3",
    title: "Organic Authority: Leaving Paid Ad Platforms for Systematic SEO SEO",
    excerpt: "How organic, expert-level keyword strategy and technical schema injection drives high-intent client portfolios bypassing climbing acquisition costs.",
    content: `Pay-Per-Click campaign costs are soaring. If you are a digital brand relying purely on premium Google or Meta campaigns, you are renting traffic instead of owning it.

The answer is Organic Authority.

### Technical Foundation Matters First
If search spiders struggle with your structural javascript rendering or encounter missing JSON Schema markups, your high-quality posts will remain invisible. Ensure your core Web Vitals are green, and metadata is structured around true semantic headers.

### Injecting High-Intent Topical Maps
Draft content that answers highly specific industry pain points. Instead of writing general guides like 'How To Launch A Blog', focus on precise high-intent keywords like 'Automated Lead Routing for Premium Clinic CRM'. These queries attract actual, ready-to-buy decision-makers.

### Authentic Organic Quality
Write detailed, structured articles with zero fluff. Focus on code samples, case studies, and transparent pricing references. High-quality dwell time signals Google that your domain holds the supreme answers, lifting your entire ranking profile naturally.`,
    readTime: "5 min read",
    date: "May 15, 2026",
    category: "Marketing",
    author: {
      name: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120",
      role: "Lead SEO Strategist"
    },
    image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&q=80&w=800",
    tags: ["SEO Strategy", "organic scaling", "Google Ranking"]
  }
];
