import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

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

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { projectName, businessType, description, budgetRange, coreFeatures } = JSON.parse(event.body || "{}");
    if (!projectName || !description) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Project name and description are requested." }),
      };
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

      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ scope: response.text }),
      };
    } catch (apiErr: any) {
      console.warn("Gemini API not available for Scope Generator inside Netlify. Falling back:", apiErr.message);
      
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

      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ scope: fallbackScope }),
      };
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "Internal server error" }),
    };
  }
};
