import { GoogleGenAI } from "@google/genai";
import { aiOutputSchema } from "../types/aiOutput.types";
import { zodToJsonSchema } from "zod-to-json-schema";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY not defined");
}
const ai = new GoogleGenAI({ apiKey });

const generateAiOutput = async (explanation: string, title: string) => {
  const prompt = `
You are an idea refinement assistant. 
Idea Title: ${title}
Explanation: ${explanation}
Refine this idea and provide structured feedback.
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
 export default generateAiOutput