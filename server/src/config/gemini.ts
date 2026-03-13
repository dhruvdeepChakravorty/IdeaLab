import { GoogleGenAI } from "@google/genai";
import { aiOutputSchema } from "../types/aiOutput.types";
import dotenv from "dotenv";

import { zodToJsonSchema } from "zod-to-json-schema";
dotenv.config();
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY not defined");
}
const ai = new GoogleGenAI({ apiKey });

const generateAiOutput = async (explanation: string, title: string) => {
  const prompt = `
You are an expert idea refinement assistant. Your job is to help users clarify and strengthen their ideas through structured analysis.

Idea Title: ${title}
User's Explanation: ${explanation}

Analyze this idea and provide:
- A refined, clearer version of the idea
- Exactly 3 Honest strengths (not overly positive)
- Exactly 3 Real weaknesses and challenges to consider
- Exactly 4 Concrete actionable next steps
- Exactly 2 Socratic questions that challenge assumptions and help the user think deeper

Be honest, constructive and specific. Avoid generic advice.
Return only the structured JSON output. No greetings, no explanations, no markdown. Just the JSON.
Use camelCase for all JSON field names: refinedIdea, strengths, weaknesses, nextSteps, questions.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: aiOutputSchema,
    },
  });
  if (!response.text) {
    throw new Error("No response text received from AI");
  }
  return aiOutputSchema.parse(JSON.parse(response.text));
};
export default generateAiOutput;
