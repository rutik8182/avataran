export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  process: string[];
  pricing: string;
  icon: string; // lucide icon name
  category: "design" | "marketing" | "tech";
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
  category: "all" | "web" | "branding" | "marketing" | "ai";
  caseStudy: string;
  results: string[];
  tags: string[];
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
  isVideo: boolean;
  videoUrl?: string; // mock url or status
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featuresExclusions?: string[];
  popular: boolean;
  color: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "services" | "pricing" | "ai-tools";
}
