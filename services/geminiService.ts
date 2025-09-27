
// services/geminiService.ts
import { ModificationType } from "../types";

export async function modifyText(text: string, modificationType: ModificationType): Promise<string> {
  const r = await fetch("/api/modify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, modificationType }),
  });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(err || "API error");
  }
  const data = await r.json();
  return data.text;
}
