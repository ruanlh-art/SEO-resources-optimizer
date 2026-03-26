
import { GoogleGenAI, Type } from "@google/genai";
import { SEOOutput, OptimizationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeContent = async (req: OptimizationRequest): Promise<SEOOutput> => {
  const prompt = `
    Role: Expert SEO Content Specialist for Filmora's Brazilian Portuguese market (BR).
    
    Task: Optimize the provided HTML content based on specific requirements and target keywords.
    
    Inputs:
    1. Original HTML: ${req.originalHtml}
    2. Modification Requirements: ${req.requirements}
    3. Target Keywords: ${req.keywords}
    
    Instructions:
    - URL Creation: Create a click-driven SEO slug (lowercase, hyphen-separated).
    - Browser Title: Max 60 chars. Must include highest value keyword. No "Filmora" unless asked. Mention tech like Gemini/AI if requested. Use "Grátis" or "Online" if applicable.
    - Meta Description: Max 160 chars. Natural keywords. End with CTA.
    - H1: Compelling H1 in the HTML using the main keyword.
    - Contextual Rewrite: If req says "Video to Image", swap context. Fix Portuguese grammar (Gender/Number agreement).
    - Keyword Integration: Natural insertion in H1, H2, <p>, and Alt texts.
    - Code Integrity: DO NOT change structure (divs, classes, ids). DO NOT remove CSS/Scripts.
    - Language: MUST be Brazilian Portuguese (pt-BR).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          url: { type: Type.STRING },
          browserTitle: { type: Type.STRING },
          metaDescription: { type: Type.STRING },
          modifiedHtml: { type: Type.STRING },
        },
        required: ["url", "browserTitle", "metaDescription", "modifiedHtml"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text.trim()) as SEOOutput;
};
