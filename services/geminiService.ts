import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client && process.env.API_KEY) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const getMenuRecommendation = async (userQuery: string): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "I'm sorry, my connection to the kitchen is a bit slow right now (API Key missing). Please ask a human server!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 200, // Keep it brief
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    return response.text || "I recommend trying the Soul of Avocado! It's delicious.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble thinking of a recommendation right now. Why not try our famous Turkish Wrap?";
  }
};