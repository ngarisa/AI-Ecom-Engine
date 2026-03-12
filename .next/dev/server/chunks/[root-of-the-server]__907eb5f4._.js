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
"[project]/src/lib/foreplay/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "discoverAds",
    ()=>discoverAds,
    "discoverBrands",
    ()=>discoverBrands,
    "getAdDetails",
    ()=>getAdDetails,
    "getAdsByBrandId",
    ()=>getAdsByBrandId
]);
const BASE_URL = "https://public.api.foreplay.co";
function getApiKey() {
    const key = process.env.FOREPLAY_API_KEY;
    if (!key) throw new Error("FOREPLAY_API_KEY is not set");
    return key;
}
function buildParams(params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)){
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
            value.forEach((v)=>searchParams.append(key, String(v)));
        } else {
            searchParams.set(key, String(value));
        }
    }
    return searchParams;
}
async function foreplayFetch(path, params) {
    const url = new URL(path, BASE_URL);
    if (params) {
        const searchParams = buildParams(params);
        url.search = searchParams.toString();
    }
    const res = await fetch(url.toString(), {
        headers: {
            Authorization: getApiKey(),
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Foreplay API error ${res.status}: ${body}`);
    }
    return res.json();
}
async function discoverBrands(params) {
    return foreplayFetch("/api/discovery/brands", {
        query: params.query,
        niches: params.niches,
        limit: params.limit ?? 20,
        cursor: params.cursor
    });
}
async function discoverAds(params) {
    return foreplayFetch("/api/discovery/ads", {
        query: params.query,
        niches: params.niches,
        display_format: params.display_format ?? [
            "image"
        ],
        publisher_platform: params.publisher_platform,
        running_duration_min_days: params.running_duration_min_days,
        running_duration_max_days: params.running_duration_max_days,
        start_date: params.start_date,
        end_date: params.end_date,
        order: params.order ?? "longest_running",
        limit: params.limit ?? 30,
        cursor: params.cursor,
        live: params.live
    });
}
async function getAdsByBrandId(params) {
    return foreplayFetch("/api/brand/getAdsByBrandId", {
        brand_ids: params.brand_ids,
        live: params.live,
        display_format: params.display_format ?? [
            "image"
        ],
        publisher_platform: params.publisher_platform,
        niches: params.niches,
        running_duration_min_days: params.running_duration_min_days,
        running_duration_max_days: params.running_duration_max_days,
        start_date: params.start_date,
        end_date: params.end_date,
        order: params.order ?? "newest",
        limit: params.limit ?? 50,
        cursor: params.cursor
    });
}
async function getAdDetails(adId) {
    return foreplayFetch(`/api/ad/${encodeURIComponent(adId)}`);
}
}),
"[project]/src/app/api/foreplay/brand-ads/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$foreplay$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/foreplay/client.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const params = request.nextUrl.searchParams;
    const brandIds = params.getAll("brand_ids");
    if (!brandIds.length) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "brand_ids required"
        }, {
            status: 400
        });
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$foreplay$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdsByBrandId"])({
            brand_ids: brandIds,
            live: params.get("live") === "true" ? true : undefined,
            display_format: params.getAll("display_format").length ? params.getAll("display_format") : [
                "image"
            ],
            running_duration_min_days: params.get("running_duration_min_days") ? Number(params.get("running_duration_min_days")) : undefined,
            order: params.get("order") || "newest",
            limit: params.get("limit") ? Number(params.get("limit")) : 50,
            cursor: params.get("cursor") ? Number(params.get("cursor")) : undefined
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__907eb5f4._.js.map