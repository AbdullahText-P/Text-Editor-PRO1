// api/modify.ts
import { GoogleGenAI } from "@google/genai";
import { ModificationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (text: string, modificationType: ModificationType): string => {
  const languageInstruction = "The following text could be in English or Arabic. Respond in the same language unless explicitly asked to translate. Preserve technical terms.";

  switch (modificationType) {
    case ModificationType.SUMMARIZE:
      return `Summarize the following text concisely, capturing the main points only. Do not add examples or commentary.\n\n---\n${text}\n---`;
    case ModificationType.CORRECT_GRAMMAR:
      return `Correct any spelling and grammatical errors in the following text. Return only the corrected text without explanations.\n\n---\n${text}\n---`;
    case ModificationType.IMPROVE_WRITING:
      return `Rewrite the following text to improve clarity, flow and style while preserving meaning. Return only the improved text.\n\n---\n${text}\n---`;
    case ModificationType.STRUCTURE_TEXT:
      return `Organize the following text into a clear structured format (headings, bullets) without extra commentary.\n\n---\n${text}\n---`;
    case ModificationType.SMART_TRANSLATE:
      return `Translate the following text while preserving technical terms. Return the translation only.\n\n---\n${text}\n---`;
    default:
      throw new Error("Unknown modification type");
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { text, modificationType } = req.body ?? {};
  if (!text) return res.status(400).json({ error: "missing text" });

  if (!process.env.API_KEY) return res.status(500).json({ error: "server not configured" });

  try {
    const prompt = getPrompt(text, modificationType);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const out = (response as any).text ?? response;
    return res.status(200).json({ text: typeof out === "string" ? out.trim() : out });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "API call failed" });
  }
}
