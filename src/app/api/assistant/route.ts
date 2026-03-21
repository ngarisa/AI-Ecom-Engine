import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, context } = (await request.json()) as {
      message: string;
      history?: ChatMessage[];
      context?: Record<string, unknown>;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

    if (!message?.trim()) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const systemPrompt = context
      ? `You are an AI ad assistant helping with e-commerce marketing. You have access to the following brand context:\n\nBrand: ${context.brand_name ?? "Unknown"}\nVoice: ${context.voice ?? "Unknown"}\nProducts: ${context.products ?? "Unknown"}\nTarget Audience: ${context.target_audience ?? "Unknown"}\nCompetitors: ${Array.isArray(context.competitors) ? (context.competitors as string[]).join(", ") : "Unknown"}\n\nUse this context to give tailored, actionable advice.`
      : "You are an AI ad assistant helping with e-commerce marketing. Give concise, actionable advice.";

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...(history ?? []).slice(-20),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[assistant/chat] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
