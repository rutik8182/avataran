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
  // Support options preflight for CORS
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
    const { message, history } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Message is required." }),
      };
    }

    try {
      const ai = getGeminiClient();
      
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

      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ reply: response.text || "I apologize, let me think about how best to state this. What are your prime business objectives?" }),
      };
    } catch (apiErr: any) {
      console.warn("Gemini API not available inside Netlify Serverless Function. Falling back:", apiErr.message);
      
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
      return {
        statusCode: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ reply: fallbackText }),
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
