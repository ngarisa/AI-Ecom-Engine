import { NextRequest, NextResponse } from "next/server";
import type { BrandProfile } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { prompt, brandProfile, adContext } = await request.json() as {
      prompt: string;
      brandProfile: BrandProfile;
      adContext?: string;
    };

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_AI_API_KEY not configured" }, { status: 500 });
    }

    const brandName = brandProfile.brandName || "the brand";
    const systemPrompt = `You are an expert video ad prompt writer for Google Veo, a text-to-video AI model.
Your job is to rewrite a rough video prompt into a polished, detailed Veo prompt that will generate a high-quality, on-brand video advertisement.

BRAND CONTEXT:
- Brand name (spell EXACTLY as written): "${brandName}"
- Brand niche: ${brandProfile.niche || "e-commerce"}
- Brand voice/tone: ${brandProfile.brandVoice || "professional"}
- Target audience: ${brandProfile.targetAudience || "general consumers"}
- Key USPs: ${brandProfile.usps.length > 0 ? brandProfile.usps.join(", ") : "not specified"}
- Primary brand color: ${brandProfile.brandColors.primary}
- Secondary brand color: ${brandProfile.brandColors.secondary}
- Accent color: ${brandProfile.brandColors.accent}
- Excluded themes: ${brandProfile.excludedThemes.length > 0 ? brandProfile.excludedThemes.join(", ") : "none"}
${adContext ? `\nREFERENCE AD CONTEXT:\n${adContext}` : ""}

REWRITING RULES:
1. The brand name "${brandName}" must appear spelled EXACTLY as shown above — never modify or abbreviate it.
2. Describe specific cinematic details: camera angles, lighting, motion, transitions, pacing.
3. Include the brand colors naturally in the visual description (products, backgrounds, overlays).
4. Match the brand voice in the tone of the visual storytelling.
5. Keep the video ad purpose clear — it must sell/promote effectively.
6. If any text appears on screen in the video, spell it correctly, especially the brand name.
7. Write in a single, cohesive paragraph. No bullet points. No headers. Be specific and vivid.
8. Keep it concise (3–5 sentences max) — Veo works best with focused prompts.
9. Do NOT include competitor brand names.

Return ONLY the rewritten prompt with no explanation, preamble, or quotes around it.`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\nROUGH PROMPT TO REWRITE:\n${prompt}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const enhanced = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!enhanced) {
      throw new Error("No enhanced prompt returned");
    }

    return NextResponse.json({ prompt: enhanced });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[enhance-video-prompt] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
