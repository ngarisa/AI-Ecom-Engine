module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/analysis/analyzer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeAd",
    ()=>analyzeAd
]);
const ANALYSIS_PROMPT = `You are an expert direct-response advertising analyst specializing in e-commerce static ads. Analyze this ad to identify specific elements that make it high-converting.

Ad Copy: "{ad_copy}"
Running Duration: {running_days} days (longer = better performing)
Niche: {niche}
Brand's Target Audience: {target_audience}
Brand Voice: {brand_voice}

Analyze this ad and return ONLY valid JSON (no markdown, no code fences) with this structure:
{
  "overallScore": <1-10>,
  "conversionElements": {
    "hook": {
      "text": "<exact hook text visible in ad>",
      "type": "<curiosity|fear|benefit|social_proof|urgency|question>",
      "effectivenessScore": <1-10>,
      "whyItWorks": "<explanation>"
    },
    "visualHierarchy": {
      "layoutType": "<single_product|lifestyle|before_after|testimonial|comparison|ugc_style>",
      "focalPoint": "<what draws the eye first>",
      "visualFlow": "<how the eye moves through the ad>"
    },
    "colorPsychology": {
      "dominantColors": ["<#hex1>", "<#hex2>"],
      "emotionalImpact": "<feeling the palette creates>",
      "contrastUsage": "<how contrast draws attention>"
    },
    "socialProof": {
      "present": <true|false>,
      "type": "<testimonial|star_rating|user_count|before_after|celebrity|press|none>",
      "placement": "<where in the ad>"
    },
    "cta": {
      "text": "<CTA text if visible>",
      "placement": "<top|middle|bottom|overlay>",
      "urgencyLevel": "<none|low|medium|high>"
    },
    "copyAnalysis": {
      "headline": "<extracted headline>",
      "bodyCopySummary": "<summary>",
      "emotionalTriggers": ["<trigger1>", "<trigger2>"],
      "powerWords": ["<word1>", "<word2>"]
    },
    "productPresentation": {
      "style": "<flat_lay|in_use|lifestyle|macro|packaging>",
      "background": "<solid|gradient|lifestyle|transparent>",
      "propsUsed": "<description>"
    }
  },
  "replicationBrief": {
    "mustKeepElements": ["<element1>", "<element2>"],
    "adaptableElements": ["<element1>", "<element2>"],
    "suggestedModifications": ["<modification1>", "<modification2>"],
    "textToRender": {
      "headline": "<suggested headline using brand voice>",
      "subheadline": "<if applicable>",
      "cta": "<suggested CTA>"
    }
  },
  "relevanceToBrand": {
    "score": <1-10>,
    "reasoning": "<why this pattern would or wouldn't work for the brand>"
  }
}`;
async function analyzeAd(ad, brandProfile, openaiApiKey) {
    const imageUrl = ad.image || ad.thumbnail;
    if (!imageUrl) {
        throw new Error("Ad has no image to analyze");
    }
    const prompt = ANALYSIS_PROMPT.replace("{ad_copy}", ad.description || "").replace("{running_days}", String(ad.running_duration?.days ?? 0)).replace("{niche}", brandProfile.niche || "general").replace("{target_audience}", brandProfile.targetAudience || "general consumers").replace("{brand_voice}", brandProfile.brandVoice || "professional");
    const messages = [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: prompt
                },
                {
                    type: "image_url",
                    image_url: {
                        url: imageUrl,
                        detail: "high"
                    }
                }
            ]
        }
    ];
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages,
            max_tokens: 2000,
            temperature: 0.3
        })
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`OpenAI API error ${res.status}: ${body}`);
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No response from OpenAI");
    // Strip markdown code fences if present
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
}
}),
"[project]/src/app/api/analyze/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analysis$2f$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analysis/analyzer.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { ad, brandProfile, openaiApiKey } = body;
        if (!ad || !brandProfile) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "ad and brandProfile required"
            }, {
                status: 400
            });
        }
        if (!openaiApiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "openaiApiKey required"
            }, {
                status: 400
            });
        }
        const analysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analysis$2f$analyzer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeAd"])(ad, brandProfile, openaiApiKey);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: analysis
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__80659fb4._.js.map