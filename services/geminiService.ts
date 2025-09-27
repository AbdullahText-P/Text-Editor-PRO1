
import { GoogleGenAI } from "@google/genai";
import { ModificationType } from '../types';

// Fix: Per coding guidelines, API key must be from process.env.API_KEY directly.
// Removed fallback key and warning.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (text: string, modificationType: ModificationType): string => {
  const languageInstruction = "The following text could be in English or Arabic. Please preserve the original language in your response unless the instruction is to translate.";

  switch (modificationType) {
    case ModificationType.SUMMARIZE:
      return `Summarize the following text concisely, capturing the main points and core message in a much shorter form. ${languageInstruction} Return only the summarized text without any preamble.\n\n---\n${text}\n---`;
    case ModificationType.CORRECT_GRAMMAR:
      return `Correct any spelling and grammatical errors in the following text. Do not alter the meaning, tone, or structure of the original text. ${languageInstruction} Return only the corrected text, without any explanations or comments.\n\n---\n${text}\n---`;
    case ModificationType.IMPROVE_WRITING:
        return `Rephrase the following text to improve its clarity, organization, and flow, making it sound more professional and well-structured. ${languageInstruction} Return only the improved text.\n\n---\n${text}\n---`;
    case ModificationType.STRUCTURE_TEXT:
      return `Organize the following text into clear, hierarchically arranged sections with headings and subheadings. Do not change the wording of the original text itself, only add the structure around it. ${languageInstruction} Return only the structured text, without any preamble.\n\n---\n${text}\n---`;
    case ModificationType.SMART_TRANSLATE:
      return `Translate the following text. If the text is in English, translate it to Arabic. If it is in Arabic, translate it to English. When translating from English to Arabic, preserve technical terms or any words that do not have a direct, well-known Arabic equivalent in their original English form (e.g., 'API', 'framework', 'containerization'). Return only the translated text itself, with no additional commentary or explanation.\n\n---\n${text}\n---`;
    default:
      // This should ideally not be reached if types are correct
      throw new Error("Unknown modification type");
  }
};

export const modifyText = async (
  text: string,
  modificationType: ModificationType
): Promise<string> => {
  if (!text.trim()) {
    return "";
  }

  const prompt = getPrompt(text, modificationType);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
    // FIX: Added opening brace for the catch block.
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a more user-friendly error message
    throw new Error("Failed to modify text. Please check your API key or network connection and try again.");
  }
};