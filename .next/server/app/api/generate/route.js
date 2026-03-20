(()=>{var a={};a.id=435,a.ids=[435],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4564:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>E,patchFetch:()=>D,routeModule:()=>z,serverHooks:()=>C,workAsyncStorage:()=>A,workUnitAsyncStorage:()=>B});var d={};c.r(d),c.d(d,{POST:()=>y,maxDuration:()=>x});var e=c(9225),f=c(4006),g=c(8317),h=c(9373),i=c(4775),j=c(4235),k=c(261),l=c(4365),m=c(771),n=c(3461),o=c(7798),p=c(2280),q=c(2018),r=c(5696),s=c(7929),t=c(6439),u=c(7527),v=c(5592);async function w(a,b,c,d="4:5",e,f,g,h,i,j){let k=[{text:j||function(a,b,c,d,e,f,g){let h=e<=2||d<2,i=!!(f?.suggestedHeadline||f?.suggestedCta),j="";i&&(j="TEXT TO ADD TO THE IMAGE:\n",f?.suggestedHeadline&&(j+=`- Headline: "${f.suggestedHeadline}"
`),f?.suggestedCta&&(j+=`- CTA: "${f.suggestedCta}"
`));let k=f?.customColorScheme?`COLOR SCHEME: ${f.customColorScheme}`:`BRAND COLORS:
- Primary color: ${b.brandColors.primary}
- Secondary color: ${b.brandColors.secondary}
- Accent color: ${b.brandColors.accent}`,l=f?.customBranding?`BRANDING: ${f.customBranding}`:`BRANDING:
- Brand name: ${b.brandName||"the brand"}
- Style: ${b.niche||"e-commerce"} brand with a ${b.brandVoice||"professional"} tone`,m="";f?.additionalInstructions&&(m=`
ADDITIONAL INSTRUCTIONS:
${f.additionalInstructions}
`);let n=i?"":"\nIMPORTANT TEXT RULE: Do NOT add, invent, or generate any text, headlines, CTAs, slogans, or copy that is not already visible in the reference image. Only replicate text that exists in the original. The only text change allowed is swapping the competitor brand name for the user's brand name.\n";if(!a)if(h)return`I'm providing a reference competitor ad image. Create a PIXEL-PERFECT replica of this ad's visual design — same layout, composition, spacing, element sizes, text placement, and visual hierarchy.

THE ONLY CHANGES TO MAKE:
1. Remove any competitor brand name/logo and replace with: "${b.brandName||"my brand"}"
2. Adjust colors to match my brand palette (listed below)
3. Keep everything else IDENTICAL — same structure, same proportions, same visual flow

${g?`REFERENCE AD CONTEXT:
The reference ad says: "${g}"`:"Study the reference image carefully and replicate its structure exactly."}
${n}
${j}
${k}

${l}
${m}
DO NOT include: ${b.excludedThemes.join(", ")||"none specified"}

Create a professional, polished ad image at ${c} aspect ratio. The design must be an exact structural replica of the reference — only the branding and colors should differ. The text must be crisp and legible.`;else return`I'm providing a reference competitor ad image. Create a new variation INSPIRED BY the reference ad but with creative differences. This is creative variation #${d-1}.

KEEP SIMILAR: The overall feel, product presentation style, and general aesthetic of the reference ad.
CHANGE CREATIVELY: You may adjust colors, element sizes, layout positioning, visual hierarchy, and spacing. The result should look like a fresh take on the same concept — recognizably related but visually distinct.

${g?`REFERENCE AD CONTEXT:
The reference ad says: "${g}"`:"Study the reference image and create a creative variation."}
${n}
${j}
${k}

${l}

IMPORTANT: Use the brand name "${b.brandName||"my brand"}" — remove any competitor branding entirely.
${m}
DO NOT include: ${b.excludedThemes.join(", ")||"none specified"}

Create a professional, polished ad image at ${c} aspect ratio. The text must be crisp and legible. The design should look like it was made by a professional graphic designer.`;let o=a.replicationBrief,p=a.conversionElements.visualHierarchy;return h?`Generate a PIXEL-PERFECT replica of the provided reference ad image for ${b.brandName||"the brand"}.

LAYOUT: Use the EXACT same ${p.layoutType} layout with the focal point on ${p.focalPoint}. Visual flow: ${p.visualFlow}. Match proportions, spacing, and element sizes precisely.
${n}
${j}
${k}

${l}

THE ONLY CHANGES:
1. Remove competitor brand name/logo → replace with "${b.brandName||"the brand"}"
2. Adjust colors to match the brand palette above
3. Keep EVERYTHING ELSE identical — same structure, same composition, same visual hierarchy

CONVERSION ELEMENTS TO PRESERVE:
${o.mustKeepElements.map(a=>`- ${a}`).join("\n")}
${m}
DO NOT include: ${b.excludedThemes.join(", ")||"none specified"}

Create a professional, polished ad image at ${c} aspect ratio. The text must be crisp and legible. This should be a near-exact replica with only branding/colors swapped.`:`Generate a creative variation (#${d-1}) of the provided reference ad image for ${b.brandName||"the brand"}.

REFERENCE LAYOUT: The original uses a ${p.layoutType} layout with focal point on ${p.focalPoint}. Visual flow: ${p.visualFlow}.
FOR THIS VARIATION: Keep the overall feel but creatively adjust colors, element sizes, layout positioning, and visual hierarchy to create a fresh take.
${n}
${j}
${k}

${l}

KEEP THESE CONVERSION ELEMENTS (but you may reposition them):
${o.mustKeepElements.map(a=>`- ${a}`).join("\n")}

ADAPTATIONS TO APPLY:
${o.suggestedModifications.map(a=>`- ${a}`).join("\n")}

IMPORTANT: Use brand name "${b.brandName||"the brand"}" — remove all competitor branding.
${m}
DO NOT include: ${b.excludedThemes.join(", ")||"none specified"}

Create a professional, polished ad image at ${c} aspect ratio. The text must be crisp and legible. The design should look like a professional variation of the reference — recognizably related but visually distinct.`}(a,b,d,e,f,h,i)}];if(c)try{let a=await fetch(c);if(a.ok){let b=await a.arrayBuffer(),c=Buffer.from(b).toString("base64"),d=a.headers.get("content-type")||"image/jpeg";k.push({inline_data:{mime_type:d,data:c}})}}catch{}for(let a of b.logoFiles.slice(0,2))if(a.url.startsWith("data:")){let[b,c]=a.url.split(","),d=b.match(/data:(.*?);/)?.[1]||"image/png";k.push({inline_data:{mime_type:d,data:c}})}for(let a of b.exampleAds.slice(0,3))if(a.url.startsWith("data:")){let[b,c]=a.url.split(","),d=b.match(/data:(.*?);/)?.[1]||"image/png";k.push({inline_data:{mime_type:d,data:c}})}let l=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":g},body:JSON.stringify({contents:[{parts:k}]})});if(!l.ok){let a=await l.text();throw Error(`Gemini API error ${l.status}: ${a}`)}let m=(await l.json()).candidates;if(!m||0===m.length)throw Error("No candidates returned from Gemini");let n=m[0].content?.parts;if(!n)throw Error("No content parts in Gemini response");for(let a of n){if(a.inlineData)return{imageBase64:a.inlineData.data,mimeType:a.inlineData.mimeType||"image/png"};if(a.inline_data)return{imageBase64:a.inline_data.data,mimeType:a.inline_data.mimeType||a.inline_data.mime_type||"image/png"}}throw Error("No image generated in Gemini response")}let x=120;async function y(a){try{let{analysis:b,brandProfile:c,sourceImageUrl:d,aspectRatio:e,variationIndex:f,totalVariations:g,overrides:h,adDescription:i,customPrompt:j}=await a.json();if(!c)return v.NextResponse.json({error:"brandProfile required"},{status:400});let k=process.env.GOOGLE_AI_API_KEY;if(!k)return v.NextResponse.json({error:"GOOGLE_AI_API_KEY not configured"},{status:500});let l=await w(b,c,d,e||"4:5",f??0,g??1,k,h,i,j);return v.NextResponse.json({data:{imageBase64:l.imageBase64,mimeType:l.mimeType}})}catch(b){let a=b instanceof Error?b.message:"Unknown error";return console.error("[generate] Error:",a),v.NextResponse.json({error:a},{status:500})}}let z=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/generate/route",pathname:"/api/generate",filename:"route",bundlePath:"app/api/generate/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/Users/nihalgarisa/Downloads/AI Ecom Engine/src/app/api/generate/route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:A,workUnitAsyncStorage:B,serverHooks:C}=z;function D(){return(0,g.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:B})}async function E(a,b,c){z.isDev&&(0,h.addRequestMeta)(a,"devRequestTimingInternalsEnd",process.hrtime.bigint());let d="/api/generate/route";"/index"===d&&(d="/");let e=await z.prepare(a,b,{srcPage:d,multiZoneDraftMode:!1});if(!e)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:g,params:v,nextConfig:w,parsedUrl:x,isDraftMode:y,prerenderManifest:A,routerServerContext:B,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,resolvedPathname:E,clientReferenceManifest:F,serverActionsManifest:G}=e,H=(0,k.normalizeAppPath)(d),I=!!(A.dynamicRoutes[H]||A.routes[E]),J=async()=>((null==B?void 0:B.render404)?await B.render404(a,b,x,!1):b.end("This page could not be found"),null);if(I&&!y){let a=!!A.routes[E],b=A.dynamicRoutes[H];if(b&&!1===b.fallback&&!a){if(w.experimental.adapterPath)return await J();throw new t.NoFallbackError}}let K=null;!I||z.isDev||y||(K="/index"===(K=E)?"/":K);let L=!0===z.isDev||!I,M=I&&!L;G&&F&&(0,j.setManifestsSingleton)({page:d,clientReferenceManifest:F,serverActionsManifest:G});let N=a.method||"GET",O=(0,i.getTracer)(),P=O.getActiveScopeSpan(),Q={params:v,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:L,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d,e)=>z.onRequestError(a,b,d,e,B)},sharedContext:{buildId:g}},R=new l.NodeNextRequest(a),S=new l.NodeNextResponse(b),T=m.NextRequestAdapter.fromNodeNextRequest(R,(0,m.signalFromNodeResponse)(b));try{let e=async a=>z.handle(T,Q).finally(()=>{if(!a)return;a.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let c=O.getRootSpanAttributes();if(!c)return;if(c.get("next.span_type")!==n.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${c.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=c.get("next.route");if(e){let b=`${N} ${e}`;a.setAttributes({"next.route":e,"http.route":e,"next.span_name":b}),a.updateName(b)}else a.updateName(`${N} ${d}`)}),g=!!(0,h.getRequestMeta)(a,"minimalMode"),j=async h=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!g&&C&&D&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let d=await e(h);a.fetchMetrics=Q.renderOpts.fetchMetrics;let i=Q.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=Q.renderOpts.collectedTags;if(!I)return await (0,p.I)(R,S,d,Q.renderOpts.pendingWaitUntil),null;{let a=await d.blob(),b=(0,q.toNodeOutgoingHttpHeaders)(d.headers);j&&(b[s.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==Q.renderOpts.collectedRevalidate&&!(Q.renderOpts.collectedRevalidate>=s.INFINITE_CACHE)&&Q.renderOpts.collectedRevalidate,e=void 0===Q.renderOpts.collectedExpire||Q.renderOpts.collectedExpire>=s.INFINITE_CACHE?void 0:Q.renderOpts.collectedExpire;return{value:{kind:u.CachedRouteKind.APP_ROUTE,status:d.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:e}}}}catch(b){throw(null==f?void 0:f.isStale)&&await z.onRequestError(a,b,{routerKind:"App Router",routePath:d,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),b}},l=await z.handleResponse({req:a,nextConfig:w,cacheKey:K,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,responseGenerator:k,waitUntil:c.waitUntil,isMinimalMode:g});if(!I)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==u.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});g||b.setHeader("x-nextjs-cache",C?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,q.fromNodeOutgoingHttpHeaders)(l.value.headers);return g&&I||m.delete(s.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,r.getCacheControlHeader)(l.cacheControl)),await (0,p.I)(R,S,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};P?await j(P):await O.withPropagatedContext(a.headers,()=>O.trace(n.BaseServerSpan.handleRequest,{spanName:`${N} ${d}`,kind:i.SpanKind.SERVER,attributes:{"http.method":N,"http.target":a.url}},j))}catch(b){if(b instanceof t.NoFallbackError||await z.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),I)throw b;return await (0,p.I)(R,S,new Response(null,{status:500})),null}}},4870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},6487:()=>{},8335:()=>{},9294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[741,813],()=>b(b.s=4564));module.exports=c})();