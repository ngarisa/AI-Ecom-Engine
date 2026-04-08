(()=>{var a={};a.id=786,a.ids=[786],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4919:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>E,patchFetch:()=>D,routeModule:()=>z,serverHooks:()=>C,workAsyncStorage:()=>A,workUnitAsyncStorage:()=>B});var d={};c.r(d),c.d(d,{POST:()=>y});var e=c(9225),f=c(4006),g=c(8317),h=c(9373),i=c(4775),j=c(4235),k=c(261),l=c(4365),m=c(771),n=c(3461),o=c(7798),p=c(2280),q=c(2018),r=c(5696),s=c(7929),t=c(6439),u=c(7527),v=c(5592);let w=`You are an expert direct-response advertising analyst specializing in e-commerce static ads. Analyze this ad to identify specific elements that make it high-converting.

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
}`;async function x(a,b,c){let d=a.image||a.thumbnail;if(!d)throw Error("Ad has no image to analyze");let e=w.replace("{ad_copy}",a.description||"").replace("{running_days}",String(a.running_duration?.days??0)).replace("{niche}",b.niche||"general").replace("{target_audience}",b.targetAudience||"general consumers").replace("{brand_voice}",b.brandVoice||"professional"),f=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4o",messages:[{role:"user",content:[{type:"text",text:e},{type:"image_url",image_url:{url:d,detail:"high"}}]}],max_tokens:2e3,temperature:.3})});if(!f.ok){let a=await f.text();throw Error(`OpenAI API error ${f.status}: ${a}`)}let g=await f.json(),h=g.choices?.[0]?.message?.content;if(!h)throw Error("No response from OpenAI");return JSON.parse(h.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim())}async function y(a){try{let{ad:b,brandProfile:c,openaiApiKey:d}=await a.json();if(!b||!c)return v.NextResponse.json({error:"ad and brandProfile required"},{status:400});if(!d)return v.NextResponse.json({error:"openaiApiKey required"},{status:400});let e=await x(b,c,d);return v.NextResponse.json({data:e})}catch(b){let a=b instanceof Error?b.message:"Unknown error";return v.NextResponse.json({error:a},{status:500})}}let z=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/analyze/route",pathname:"/api/analyze",filename:"route",bundlePath:"app/api/analyze/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/Users/nihalgarisa/Downloads/AI Ecom Engine/src/app/api/analyze/route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:A,workUnitAsyncStorage:B,serverHooks:C}=z;function D(){return(0,g.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:B})}async function E(a,b,c){z.isDev&&(0,h.addRequestMeta)(a,"devRequestTimingInternalsEnd",process.hrtime.bigint());let d="/api/analyze/route";"/index"===d&&(d="/");let e=await z.prepare(a,b,{srcPage:d,multiZoneDraftMode:!1});if(!e)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:g,params:v,nextConfig:w,parsedUrl:x,isDraftMode:y,prerenderManifest:A,routerServerContext:B,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,resolvedPathname:E,clientReferenceManifest:F,serverActionsManifest:G}=e,H=(0,k.normalizeAppPath)(d),I=!!(A.dynamicRoutes[H]||A.routes[E]),J=async()=>((null==B?void 0:B.render404)?await B.render404(a,b,x,!1):b.end("This page could not be found"),null);if(I&&!y){let a=!!A.routes[E],b=A.dynamicRoutes[H];if(b&&!1===b.fallback&&!a){if(w.experimental.adapterPath)return await J();throw new t.NoFallbackError}}let K=null;!I||z.isDev||y||(K="/index"===(K=E)?"/":K);let L=!0===z.isDev||!I,M=I&&!L;G&&F&&(0,j.setManifestsSingleton)({page:d,clientReferenceManifest:F,serverActionsManifest:G});let N=a.method||"GET",O=(0,i.getTracer)(),P=O.getActiveScopeSpan(),Q={params:v,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!w.experimental.authInterrupts},cacheComponents:!!w.cacheComponents,supportsDynamicResponse:L,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:w.cacheLife,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d,e)=>z.onRequestError(a,b,d,e,B)},sharedContext:{buildId:g}},R=new l.NodeNextRequest(a),S=new l.NodeNextResponse(b),T=m.NextRequestAdapter.fromNodeNextRequest(R,(0,m.signalFromNodeResponse)(b));try{let e=async a=>z.handle(T,Q).finally(()=>{if(!a)return;a.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let c=O.getRootSpanAttributes();if(!c)return;if(c.get("next.span_type")!==n.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${c.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=c.get("next.route");if(e){let b=`${N} ${e}`;a.setAttributes({"next.route":e,"http.route":e,"next.span_name":b}),a.updateName(b)}else a.updateName(`${N} ${d}`)}),g=!!(0,h.getRequestMeta)(a,"minimalMode"),j=async h=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!g&&C&&D&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let d=await e(h);a.fetchMetrics=Q.renderOpts.fetchMetrics;let i=Q.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=Q.renderOpts.collectedTags;if(!I)return await (0,p.I)(R,S,d,Q.renderOpts.pendingWaitUntil),null;{let a=await d.blob(),b=(0,q.toNodeOutgoingHttpHeaders)(d.headers);j&&(b[s.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==Q.renderOpts.collectedRevalidate&&!(Q.renderOpts.collectedRevalidate>=s.INFINITE_CACHE)&&Q.renderOpts.collectedRevalidate,e=void 0===Q.renderOpts.collectedExpire||Q.renderOpts.collectedExpire>=s.INFINITE_CACHE?void 0:Q.renderOpts.collectedExpire;return{value:{kind:u.CachedRouteKind.APP_ROUTE,status:d.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:e}}}}catch(b){throw(null==f?void 0:f.isStale)&&await z.onRequestError(a,b,{routerKind:"App Router",routePath:d,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),b}},l=await z.handleResponse({req:a,nextConfig:w,cacheKey:K,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:C,revalidateOnlyGenerated:D,responseGenerator:k,waitUntil:c.waitUntil,isMinimalMode:g});if(!I)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==u.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});g||b.setHeader("x-nextjs-cache",C?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,q.fromNodeOutgoingHttpHeaders)(l.value.headers);return g&&I||m.delete(s.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,r.getCacheControlHeader)(l.cacheControl)),await (0,p.I)(R,S,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};P?await j(P):await O.withPropagatedContext(a.headers,()=>O.trace(n.BaseServerSpan.handleRequest,{spanName:`${N} ${d}`,kind:i.SpanKind.SERVER,attributes:{"http.method":N,"http.target":a.url}},j))}catch(b){if(b instanceof t.NoFallbackError||await z.onRequestError(a,b,{routerKind:"App Router",routePath:H,routeType:"route",revalidateReason:(0,o.c)({isStaticGeneration:M,isOnDemandRevalidate:C})},!1,B),I)throw b;return await (0,p.I)(R,S,new Response(null,{status:500})),null}}},6439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},6487:()=>{},8335:()=>{},9294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[445,813],()=>b(b.s=4919));module.exports=c})();