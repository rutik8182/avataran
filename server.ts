import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not set up correctly.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Interactive Advisor Chat Endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    try {
      const ai = getGeminiClient();
      
      // Map history format to Gemini expected format: { role: string, parts: [{ text: string }] }
      const contents = (history || []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      }));
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: `You are Kiara, the lead AI Digital Growth Consultant at Avtaran. 
Avtaran is a premium global product & digital agency specializing in website design, high-end React & mobile development, custom AI solutions, automation, branding, content writing, SEO, video editing, and modern digital marketing packages.
Your tone is professional, sophisticated, warm, helpful, and highly persuasive. Your goal is to understand potential client goals, explain how Avtaran can help, and guide them towards contacting the team, booking a free session, or requesting a custom scope blueprint.
Keep replies compact (2-3 short, highly styled paragraphs), and offer customized strategies based on their industry. Include clean bullet points where appropriate. Always match user questions directly.`,
        },
      });

      return res.json({ reply: response.text || "I apologize, let me think about how best to state this. What are your prime business objectives?" });
    } catch (apiErr: any) {
      console.warn("Gemini API not available. Falling back to structured response simulation:", apiErr.message);
      
      // Fallback simulated intelligent response
      let fallbackText = "Hello! I am Kiara, your Avtaran Advisor. ";
      const msgLower = message.toLowerCase();
      if (msgLower.includes("price") || msgLower.includes("cost") || msgLower.includes("pricing")) {
        fallbackText += "At Avtaran, we offer Starter, Growth, and Premium plans starting from $1,200/mo. We also create customized packages for complex enterprise requirements. I highly recommend using our interactive 'AI Scope Builder' tool on our Services/Pricing page for a personalized budget blueprint!";
      } else if (msgLower.includes("website") || msgLower.includes("design") || msgLower.includes("dev") || msgLower.includes("develop")) {
        fallbackText += "Web development is our crown jewel! We design and develop state-of-the-art interactive portals, e-commerce stores, and high-performance Web Apps using React, Vite, Tailwind, and custom database modules. Our work focuses on breathtaking animations and maximum search engine conversion rates.";
      } else if (msgLower.includes("seo") || msgLower.includes("marketing") || msgLower.includes("traffic")) {
        fallbackText += "Avtaran drives organic scaling. We specialize in deep keyword research, technical SEO frameworks, elite content copywriting, and social media hyper-scaling. Let's build a systematic funneled SEO campaign to draw in your core demographic.";
      } else {
        fallbackText += "That sounds like an amazing digital project! Our cross-functional creative team at Avtaran specializes exactly in turning high-concept ideas into high-converting realities. Would you like to check out our detailed Service plans or perhaps lock in a complimentary 30-minute growth call?";
      }
      return res.json({ reply: fallbackText });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// AI Project Scope & Estimate Blueprint Generator
app.post("/api/scope-generator", async (req: Request, res: Response) => {
  try {
    const { projectName, businessType, description, budgetRange, coreFeatures } = req.body;
    if (!projectName || !description) {
      return res.status(400).json({ error: "Project name and description are requested." });
    }

    try {
      const ai = getGeminiClient();
      const prompt = `Generate a comprehensive professional Digital Agency Scope of Work, Estimate, and Milestone Roadmap.
Potential Client Details:
- Project Name: ${projectName}
- Business Model/Type: ${businessType || "Digital Brand"}
- Client Target Budget: ${budgetRange || "Custom Scale"}
- Key Features Wanted: ${(coreFeatures || []).join(", ") || "General digital growth scaling"}
- Core Description: ${description}

Format your output beautifully in standard markdown. Include:
1. ### Executive Summary
2. ### Recommended Avtaran Services & Action Items (e.g. Website development, branding, SEO tactics, and workflow automations)
3. ### Advanced Tech Stack & Strategy recommendation
4. ### Project Milestones & Detailed Timeline (e.g., Week 1: Identity & UX, Week 2-4: Engine Core, Week 5: Launch QA)
5. ### Exclusive Avtaran Service Tier recommendation & Transparent Budget Estimation matching their request.

Ensure the styling is highly detailed, modern, and inspiring to prove Avtaran's unparalleled executive skill.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the premium Avtaran Technical Lead and Strategic Director. You draft hyper-polished, realistic digital blueprints, project timetables, and cost breakdowns that turn leads into clients.",
        },
      });

      return res.json({ scope: response.text });
    } catch (apiErr: any) {
      console.warn("Gemini API not available for Scope Generator. Falling back to customized template:", apiErr.message);
      
      // Return beautiful fallback markdown template rich with user inputs
      const featuresText = (coreFeatures || []).map((f: string) => `- **${f}**: Premium bespoke creation`).join("\n");
      const fallbackScope = `### Avtaran Project Scope Blueprint
**Prepared for**: ${projectName} (${businessType})
**Target Scale Tracker**: ${budgetRange}

---

### 1. Executive Summary
We have analyzed your description: *"${description}"*.
Avtaran proposes a state-of-the-art interactive digital development that emphasizes lightning-fast micro-interactions, responsive design, and cohesive modern typography to capture and convert your target audience.

### 2. Recommended Avtaran Services
*   **Bespoke Website Design & Interface Planning**: Premium high-fidelity layout.
*   **Next-Gen Web Core Engine**: Developed with React, Tailwind, and high-performance server integrations.
*   **SEO Optimization Suite**: Full meta tagging, search mapping, and copy polishing.
*   **Interactive Core Features**:
${featuresText || "- Modern Lead Generation Modules\n- WhatsApp Support Core\n- Advanced Custom Branding"}

### 3. Recommended Technical Infrastructure
*   **Frontend**: React 19 + TypeScript + Vite (compiled to raw speed)
*   **Theme**: Glassmorphism dark aesthetic combined with premium fluid layouts
*   **Hosting**: High-performance CDN backed by full SEO compliance

### 4. Milestone Timeline (Estimated)
*   **Milestone 1 (Design System & Branding)**: Week 1 — Interactive UI/UX Figma-style mockups and typography direction approved.
*   **Milestone 2 (Core Engineering)**: Weeks 2–3 — Custom page layouts, fast page state logic, interactive forms, and API proxy pipelines.
*   **Milestone 3 (Optimization & Marketing Setup)**: Week 4 — SEO keywords infused, Google Lighthouse speed audit, live-testing.

### 5. Estimated Investment Blueprint
*   **Recommended Tier**: **Growth Plan - Premium Delivery**
*   **Estimated Base Total**: $2,400–$4,500 (depending on revision iterations)
*   *Avtaran Special Offer: Book your discovery session within 48 hours to secure a waiver on Milestone 1 scoping fees!*`;

      return res.json({ scope: fallbackScope });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Setup Vite / Static Files serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Avtaran Digital Agency full-stack server listening on port ${PORT}`);
  });
}

setupServer();
