export interface BrandContextBlock {
  brand_name: string;
  voice: string;
  products: string; // already stringified for prompt usage
  competitors: string[]; // names
  target_audience: string;
}

export function formatBrandContextBlock(ctx: BrandContextBlock) {
  const competitors = ctx.competitors.length ? ctx.competitors.join(", ") : "None configured";
  return [
    "[BRAND CONTEXT]",
    `Brand: ${ctx.brand_name || "Unknown"}`,
    `Voice: ${ctx.voice || "Unknown"}`,
    `Products: ${ctx.products || "Unknown"}`,
    `Competitors: ${competitors}`,
    `Target Audience: ${ctx.target_audience || "Unknown"}`,
    "[END CONTEXT]",
    "",
  ].join("\n");
}

