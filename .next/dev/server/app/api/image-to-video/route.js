/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/image-to-video/route";
exports.ids = ["app/api/image-to-video/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fimage-to-video%2Froute&page=%2Fapi%2Fimage-to-video%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fimage-to-video%2Froute.ts&appDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine&isDev=true&tsconfigPath=&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fimage-to-video%2Froute&page=%2Fapi%2Fimage-to-video%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fimage-to-video%2Froute.ts&appDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine&isDev=true&tsconfigPath=&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/server/app-render/manifests-singleton */ \"(rsc)/./node_modules/next/dist/server/app-render/manifests-singleton.js\");\n/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _Users_nihalgarisa_Downloads_AI_Ecom_Engine_src_app_api_image_to_video_route_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/app/api/image-to-video/route.ts */ \"(rsc)/./src/app/api/image-to-video/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/image-to-video/route\",\n        pathname: \"/api/image-to-video\",\n        filename: \"route\",\n        bundlePath: \"app/api/image-to-video/route\"\n    },\n    distDir: \".next/dev\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"/Users/nihalgarisa/Downloads/AI Ecom Engine/src/app/api/image-to-video/route.ts\",\n    nextConfigOutput,\n    userland: _Users_nihalgarisa_Downloads_AI_Ecom_Engine_src_app_api_image_to_video_route_ts__WEBPACK_IMPORTED_MODULE_17__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    if (routeModule.isDev) {\n        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());\n    }\n    let srcPage = \"/api/image-to-video/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    const render404 = async ()=>{\n        // TODO: should route-module itself handle rendering the 404\n        if (routerServerContext == null ? void 0 : routerServerContext.render404) {\n            await routerServerContext.render404(req, res, parsedUrl, false);\n        } else {\n            res.end('This page could not be found');\n        }\n        return null;\n    };\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                if (nextConfig.experimental.adapterPath) {\n                    return await render404();\n                }\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isStaticGeneration = isIsr && !supportsDynamicResponse;\n    // Before rendering (which initializes component tree modules), we have to\n    // set the reference manifests to our global store so Server Action's\n    // encryption util can access to them at the top level of the page module.\n    if (serverActionsManifest && clientReferenceManifest) {\n        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({\n            page: srcPage,\n            clientReferenceManifest,\n            serverActionsManifest\n        });\n    }\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            cacheComponents: Boolean(nextConfig.cacheComponents),\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: nextConfig.cacheLife,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${srcPage}`);\n                }\n            });\n        };\n        const isMinimalMode = Boolean( false || (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        const silenceLog = false;\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({\n                                isStaticGeneration,\n                                isOnDemandRevalidate\n                            })\n                        }, silenceLog, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil,\n                isMinimalMode\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!isMinimalMode) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!(isMinimalMode && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__.sendResponse)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.\n            new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${srcPage}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {\n            const silenceLog = false;\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({\n                    isStaticGeneration,\n                    isOnDemandRevalidate\n                })\n            }, silenceLog, routerServerContext);\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZpbWFnZS10by12aWRlbyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGaW1hZ2UtdG8tdmlkZW8lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZpbWFnZS10by12aWRlbyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm5paGFsZ2FyaXNhJTJGRG93bmxvYWRzJTJGQUklMjBFY29tJTIwRW5naW5lJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRm5paGFsZ2FyaXNhJTJGRG93bmxvYWRzJTJGQUklMjBFY29tJTIwRW5naW5lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPSZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QmaXNHbG9iYWxOb3RGb3VuZEVuYWJsZWQ9ISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ0U7QUFDUDtBQUNnQjtBQUNUO0FBQ0s7QUFDbUM7QUFDakQ7QUFDTztBQUNmO0FBQ3NDO0FBQ3pCO0FBQ007QUFDQztBQUNoQjtBQUMwQztBQUM1RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhLFdBQW9DLElBQUksQ0FBRTtBQUN2RCx3QkFBd0IsTUFBdUM7QUFDL0Q7QUFDQTtBQUNBLFlB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QTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0ZBQTJCO0FBQ3ZEO0FBQ0EsK0JBQStCLDRFQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwRkFBcUI7QUFDbEU7QUFDQSxrQkFBa0IsNkVBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2RUFBNkUsZ0ZBQWM7QUFDM0YsaUNBQWlDLFFBQVEsRUFBRSxRQUFRO0FBQ25ELDBCQUEwQix1RUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLE1BQU07QUFDTiw2QkFBNkIsNkZBQWU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw0RkFBbUI7QUFDckQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNkVBQVk7QUFDMUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0IHsgYWRkUmVxdWVzdE1ldGEsIGdldFJlcXVlc3RNZXRhIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcmVxdWVzdC1tZXRhXCI7XG5pbXBvcnQgeyBnZXRUcmFjZXIsIFNwYW5LaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3RyYWNlL3RyYWNlclwiO1xuaW1wb3J0IHsgc2V0TWFuaWZlc3RzU2luZ2xldG9uIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvYXBwLXJlbmRlci9tYW5pZmVzdHMtc2luZ2xldG9uXCI7XG5pbXBvcnQgeyBub3JtYWxpemVBcHBQYXRoIH0gZnJvbSBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9hcHAtcGF0aHNcIjtcbmltcG9ydCB7IE5vZGVOZXh0UmVxdWVzdCwgTm9kZU5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Jhc2UtaHR0cC9ub2RlXCI7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdEFkYXB0ZXIsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvc3BlYy1leHRlbnNpb24vYWRhcHRlcnMvbmV4dC1yZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyU3BhbiB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi90cmFjZS9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldFJldmFsaWRhdGVSZWFzb24gfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9pbnN0cnVtZW50YXRpb24vdXRpbHNcIjtcbmltcG9ydCB7IHNlbmRSZXNwb25zZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3NlbmQtcmVzcG9uc2VcIjtcbmltcG9ydCB7IGZyb21Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycywgdG9Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycyB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3dlYi91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0Q2FjaGVDb250cm9sSGVhZGVyIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL2NhY2hlLWNvbnRyb2xcIjtcbmltcG9ydCB7IElORklOSVRFX0NBQ0hFLCBORVhUX0NBQ0hFX1RBR1NfSEVBREVSIH0gZnJvbSBcIm5leHQvZGlzdC9saWIvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBOb0ZhbGxiYWNrRXJyb3IgfSBmcm9tIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbm8tZmFsbGJhY2stZXJyb3IuZXh0ZXJuYWxcIjtcbmltcG9ydCB7IENhY2hlZFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3Jlc3BvbnNlLWNhY2hlXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL25paGFsZ2FyaXNhL0Rvd25sb2Fkcy9BSSBFY29tIEVuZ2luZS9zcmMvYXBwL2FwaS9pbWFnZS10by12aWRlby9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvaW1hZ2UtdG8tdmlkZW8vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9pbWFnZS10by12aWRlb1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvaW1hZ2UtdG8tdmlkZW8vcm91dGVcIlxuICAgIH0sXG4gICAgZGlzdERpcjogcHJvY2Vzcy5lbnYuX19ORVhUX1JFTEFUSVZFX0RJU1RfRElSIHx8ICcnLFxuICAgIHJlbGF0aXZlUHJvamVjdERpcjogcHJvY2Vzcy5lbnYuX19ORVhUX1JFTEFUSVZFX1BST0pFQ1RfRElSIHx8ICcnLFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL25paGFsZ2FyaXNhL0Rvd25sb2Fkcy9BSSBFY29tIEVuZ2luZS9zcmMvYXBwL2FwaS9pbWFnZS10by12aWRlby9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzLCBjdHgpIHtcbiAgICBpZiAocm91dGVNb2R1bGUuaXNEZXYpIHtcbiAgICAgICAgYWRkUmVxdWVzdE1ldGEocmVxLCAnZGV2UmVxdWVzdFRpbWluZ0ludGVybmFsc0VuZCcsIHByb2Nlc3MuaHJ0aW1lLmJpZ2ludCgpKTtcbiAgICB9XG4gICAgbGV0IHNyY1BhZ2UgPSBcIi9hcGkvaW1hZ2UtdG8tdmlkZW8vcm91dGVcIjtcbiAgICAvLyB0dXJib3BhY2sgZG9lc24ndCBub3JtYWxpemUgYC9pbmRleGAgaW4gdGhlIHBhZ2UgbmFtZVxuICAgIC8vIHNvIHdlIG5lZWQgdG8gdG8gcHJvY2VzcyBkeW5hbWljIHJvdXRlcyBwcm9wZXJseVxuICAgIC8vIFRPRE86IGZpeCB0dXJib3BhY2sgcHJvdmlkaW5nIGRpZmZlcmluZyB2YWx1ZSBmcm9tIHdlYnBhY2tcbiAgICBpZiAocHJvY2Vzcy5lbnYuVFVSQk9QQUNLKSB7XG4gICAgICAgIHNyY1BhZ2UgPSBzcmNQYWdlLnJlcGxhY2UoL1xcL2luZGV4JC8sICcnKSB8fCAnLyc7XG4gICAgfSBlbHNlIGlmIChzcmNQYWdlID09PSAnL2luZGV4Jykge1xuICAgICAgICAvLyB3ZSBhbHdheXMgbm9ybWFsaXplIC9pbmRleCBzcGVjaWZpY2FsbHlcbiAgICAgICAgc3JjUGFnZSA9ICcvJztcbiAgICB9XG4gICAgY29uc3QgbXVsdGlab25lRHJhZnRNb2RlID0gcHJvY2Vzcy5lbnYuX19ORVhUX01VTFRJX1pPTkVfRFJBRlRfTU9ERTtcbiAgICBjb25zdCBwcmVwYXJlUmVzdWx0ID0gYXdhaXQgcm91dGVNb2R1bGUucHJlcGFyZShyZXEsIHJlcywge1xuICAgICAgICBzcmNQYWdlLFxuICAgICAgICBtdWx0aVpvbmVEcmFmdE1vZGVcbiAgICB9KTtcbiAgICBpZiAoIXByZXBhcmVSZXN1bHQpIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICAgIHJlcy5lbmQoJ0JhZCBSZXF1ZXN0Jyk7XG4gICAgICAgIGN0eC53YWl0VW50aWwgPT0gbnVsbCA/IHZvaWQgMCA6IGN0eC53YWl0VW50aWwuY2FsbChjdHgsIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHsgYnVpbGRJZCwgcGFyYW1zLCBuZXh0Q29uZmlnLCBwYXJzZWRVcmwsIGlzRHJhZnRNb2RlLCBwcmVyZW5kZXJNYW5pZmVzdCwgcm91dGVyU2VydmVyQ29udGV4dCwgaXNPbkRlbWFuZFJldmFsaWRhdGUsIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkLCByZXNvbHZlZFBhdGhuYW1lLCBjbGllbnRSZWZlcmVuY2VNYW5pZmVzdCwgc2VydmVyQWN0aW9uc01hbmlmZXN0IH0gPSBwcmVwYXJlUmVzdWx0O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRTcmNQYWdlID0gbm9ybWFsaXplQXBwUGF0aChzcmNQYWdlKTtcbiAgICBsZXQgaXNJc3IgPSBCb29sZWFuKHByZXJlbmRlck1hbmlmZXN0LmR5bmFtaWNSb3V0ZXNbbm9ybWFsaXplZFNyY1BhZ2VdIHx8IHByZXJlbmRlck1hbmlmZXN0LnJvdXRlc1tyZXNvbHZlZFBhdGhuYW1lXSk7XG4gICAgY29uc3QgcmVuZGVyNDA0ID0gYXN5bmMgKCk9PntcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIHJvdXRlLW1vZHVsZSBpdHNlbGYgaGFuZGxlIHJlbmRlcmluZyB0aGUgNDA0XG4gICAgICAgIGlmIChyb3V0ZXJTZXJ2ZXJDb250ZXh0ID09IG51bGwgPyB2b2lkIDAgOiByb3V0ZXJTZXJ2ZXJDb250ZXh0LnJlbmRlcjQwNCkge1xuICAgICAgICAgICAgYXdhaXQgcm91dGVyU2VydmVyQ29udGV4dC5yZW5kZXI0MDQocmVxLCByZXMsIHBhcnNlZFVybCwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzLmVuZCgnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgaWYgKGlzSXNyICYmICFpc0RyYWZ0TW9kZSkge1xuICAgICAgICBjb25zdCBpc1ByZXJlbmRlcmVkID0gQm9vbGVhbihwcmVyZW5kZXJNYW5pZmVzdC5yb3V0ZXNbcmVzb2x2ZWRQYXRobmFtZV0pO1xuICAgICAgICBjb25zdCBwcmVyZW5kZXJJbmZvID0gcHJlcmVuZGVyTWFuaWZlc3QuZHluYW1pY1JvdXRlc1tub3JtYWxpemVkU3JjUGFnZV07XG4gICAgICAgIGlmIChwcmVyZW5kZXJJbmZvKSB7XG4gICAgICAgICAgICBpZiAocHJlcmVuZGVySW5mby5mYWxsYmFjayA9PT0gZmFsc2UgJiYgIWlzUHJlcmVuZGVyZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbmZpZy5leHBlcmltZW50YWwuYWRhcHRlclBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlbmRlcjQwNCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9GYWxsYmFja0Vycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGNhY2hlS2V5ID0gbnVsbDtcbiAgICBpZiAoaXNJc3IgJiYgIXJvdXRlTW9kdWxlLmlzRGV2ICYmICFpc0RyYWZ0TW9kZSkge1xuICAgICAgICBjYWNoZUtleSA9IHJlc29sdmVkUGF0aG5hbWU7XG4gICAgICAgIC8vIGVuc3VyZSAvaW5kZXggYW5kIC8gaXMgbm9ybWFsaXplZCB0byBvbmUga2V5XG4gICAgICAgIGNhY2hlS2V5ID0gY2FjaGVLZXkgPT09ICcvaW5kZXgnID8gJy8nIDogY2FjaGVLZXk7XG4gICAgfVxuICAgIGNvbnN0IHN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlID0gLy8gSWYgd2UncmUgaW4gZGV2ZWxvcG1lbnQsIHdlIGFsd2F5cyBzdXBwb3J0IGR5bmFtaWMgSFRNTFxuICAgIHJvdXRlTW9kdWxlLmlzRGV2ID09PSB0cnVlIHx8IC8vIElmIHRoaXMgaXMgbm90IFNTRyBvciBkb2VzIG5vdCBoYXZlIHN0YXRpYyBwYXRocywgdGhlbiBpdCBzdXBwb3J0c1xuICAgIC8vIGR5bmFtaWMgSFRNTC5cbiAgICAhaXNJc3I7XG4gICAgLy8gVGhpcyBpcyBhIHJldmFsaWRhdGlvbiByZXF1ZXN0IGlmIHRoZSByZXF1ZXN0IGlzIGZvciBhIHN0YXRpY1xuICAgIC8vIHBhZ2UgYW5kIGl0IGlzIG5vdCBiZWluZyByZXN1bWVkIGZyb20gYSBwb3N0cG9uZWQgcmVuZGVyIGFuZFxuICAgIC8vIGl0IGlzIG5vdCBhIGR5bmFtaWMgUlNDIHJlcXVlc3QgdGhlbiBpdCBpcyBhIHJldmFsaWRhdGlvblxuICAgIC8vIHJlcXVlc3QuXG4gICAgY29uc3QgaXNTdGF0aWNHZW5lcmF0aW9uID0gaXNJc3IgJiYgIXN1cHBvcnRzRHluYW1pY1Jlc3BvbnNlO1xuICAgIC8vIEJlZm9yZSByZW5kZXJpbmcgKHdoaWNoIGluaXRpYWxpemVzIGNvbXBvbmVudCB0cmVlIG1vZHVsZXMpLCB3ZSBoYXZlIHRvXG4gICAgLy8gc2V0IHRoZSByZWZlcmVuY2UgbWFuaWZlc3RzIHRvIG91ciBnbG9iYWwgc3RvcmUgc28gU2VydmVyIEFjdGlvbidzXG4gICAgLy8gZW5jcnlwdGlvbiB1dGlsIGNhbiBhY2Nlc3MgdG8gdGhlbSBhdCB0aGUgdG9wIGxldmVsIG9mIHRoZSBwYWdlIG1vZHVsZS5cbiAgICBpZiAoc2VydmVyQWN0aW9uc01hbmlmZXN0ICYmIGNsaWVudFJlZmVyZW5jZU1hbmlmZXN0KSB7XG4gICAgICAgIHNldE1hbmlmZXN0c1NpbmdsZXRvbih7XG4gICAgICAgICAgICBwYWdlOiBzcmNQYWdlLFxuICAgICAgICAgICAgY2xpZW50UmVmZXJlbmNlTWFuaWZlc3QsXG4gICAgICAgICAgICBzZXJ2ZXJBY3Rpb25zTWFuaWZlc3RcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QgfHwgJ0dFVCc7XG4gICAgY29uc3QgdHJhY2VyID0gZ2V0VHJhY2VyKCk7XG4gICAgY29uc3QgYWN0aXZlU3BhbiA9IHRyYWNlci5nZXRBY3RpdmVTY29wZVNwYW4oKTtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHByZXJlbmRlck1hbmlmZXN0LFxuICAgICAgICByZW5kZXJPcHRzOiB7XG4gICAgICAgICAgICBleHBlcmltZW50YWw6IHtcbiAgICAgICAgICAgICAgICBhdXRoSW50ZXJydXB0czogQm9vbGVhbihuZXh0Q29uZmlnLmV4cGVyaW1lbnRhbC5hdXRoSW50ZXJydXB0cylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWNoZUNvbXBvbmVudHM6IEJvb2xlYW4obmV4dENvbmZpZy5jYWNoZUNvbXBvbmVudHMpLFxuICAgICAgICAgICAgc3VwcG9ydHNEeW5hbWljUmVzcG9uc2UsXG4gICAgICAgICAgICBpbmNyZW1lbnRhbENhY2hlOiBnZXRSZXF1ZXN0TWV0YShyZXEsICdpbmNyZW1lbnRhbENhY2hlJyksXG4gICAgICAgICAgICBjYWNoZUxpZmVQcm9maWxlczogbmV4dENvbmZpZy5jYWNoZUxpZmUsXG4gICAgICAgICAgICB3YWl0VW50aWw6IGN0eC53YWl0VW50aWwsXG4gICAgICAgICAgICBvbkNsb3NlOiAoY2IpPT57XG4gICAgICAgICAgICAgICAgcmVzLm9uKCdjbG9zZScsIGNiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyVGFza0Vycm9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbkluc3RydW1lbnRhdGlvblJlcXVlc3RFcnJvcjogKGVycm9yLCBfcmVxdWVzdCwgZXJyb3JDb250ZXh0LCBzaWxlbmNlTG9nKT0+cm91dGVNb2R1bGUub25SZXF1ZXN0RXJyb3IocmVxLCBlcnJvciwgZXJyb3JDb250ZXh0LCBzaWxlbmNlTG9nLCByb3V0ZXJTZXJ2ZXJDb250ZXh0KVxuICAgICAgICB9LFxuICAgICAgICBzaGFyZWRDb250ZXh0OiB7XG4gICAgICAgICAgICBidWlsZElkXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG5vZGVOZXh0UmVxID0gbmV3IE5vZGVOZXh0UmVxdWVzdChyZXEpO1xuICAgIGNvbnN0IG5vZGVOZXh0UmVzID0gbmV3IE5vZGVOZXh0UmVzcG9uc2UocmVzKTtcbiAgICBjb25zdCBuZXh0UmVxID0gTmV4dFJlcXVlc3RBZGFwdGVyLmZyb21Ob2RlTmV4dFJlcXVlc3Qobm9kZU5leHRSZXEsIHNpZ25hbEZyb21Ob2RlUmVzcG9uc2UocmVzKSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW52b2tlUm91dGVNb2R1bGUgPSBhc3luYyAoc3Bhbik9PntcbiAgICAgICAgICAgIHJldHVybiByb3V0ZU1vZHVsZS5oYW5kbGUobmV4dFJlcSwgY29udGV4dCkuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgIGlmICghc3BhbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgICAgICdodHRwLnN0YXR1c19jb2RlJzogcmVzLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgICduZXh0LnJzYyc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFNwYW5BdHRyaWJ1dGVzID0gdHJhY2VyLmdldFJvb3RTcGFuQXR0cmlidXRlcygpO1xuICAgICAgICAgICAgICAgIC8vIFdlIHdlcmUgdW5hYmxlIHRvIGdldCBhdHRyaWJ1dGVzLCBwcm9iYWJseSBPVEVMIGlzIG5vdCBlbmFibGVkXG4gICAgICAgICAgICAgICAgaWYgKCFyb290U3BhbkF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKSAhPT0gQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuZXhwZWN0ZWQgcm9vdCBzcGFuIHR5cGUgJyR7cm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5zcGFuX3R5cGUnKX0nLiBQbGVhc2UgcmVwb3J0IHRoaXMgTmV4dC5qcyBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanNgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHJvb3RTcGFuQXR0cmlidXRlcy5nZXQoJ25leHQucm91dGUnKTtcbiAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke21ldGhvZH0gJHtyb3V0ZX1gO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ25leHQucm91dGUnOiByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwLnJvdXRlJzogcm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnbmV4dC5zcGFuX25hbWUnOiBuYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnVwZGF0ZU5hbWUobmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi51cGRhdGVOYW1lKGAke21ldGhvZH0gJHtzcmNQYWdlfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpc01pbmltYWxNb2RlID0gQm9vbGVhbihwcm9jZXNzLmVudi5NSU5JTUFMX01PREUgfHwgZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSk7XG4gICAgICAgIGNvbnN0IGhhbmRsZVJlc3BvbnNlID0gYXN5bmMgKGN1cnJlbnRTcGFuKT0+e1xuICAgICAgICAgICAgdmFyIF9jYWNoZUVudHJ5X3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VHZW5lcmF0b3IgPSBhc3luYyAoeyBwcmV2aW91c0NhY2hlRW50cnkgfSk9PntcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTWluaW1hbE1vZGUgJiYgaXNPbkRlbWFuZFJldmFsaWRhdGUgJiYgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQgJiYgIXByZXZpb3VzQ2FjaGVFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbi1kZW1hbmQgcmV2YWxpZGF0ZSBhbHdheXMgc2V0cyB0aGlzIGhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcigneC1uZXh0anMtY2FjaGUnLCAnUkVWQUxJREFURUQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5lbmQoJ1RoaXMgcGFnZSBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaW52b2tlUm91dGVNb2R1bGUoY3VycmVudFNwYW4pO1xuICAgICAgICAgICAgICAgICAgICByZXEuZmV0Y2hNZXRyaWNzID0gY29udGV4dC5yZW5kZXJPcHRzLmZldGNoTWV0cmljcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlbmRpbmdXYWl0VW50aWwgPSBjb250ZXh0LnJlbmRlck9wdHMucGVuZGluZ1dhaXRVbnRpbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXR0ZW1wdCB1c2luZyBwcm92aWRlZCB3YWl0VW50aWwgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0J3Mgbm90IHdlIGZhbGxiYWNrIHRvIHNlbmRSZXNwb25zZSdzIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nV2FpdFVudGlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LndhaXRVbnRpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC53YWl0VW50aWwocGVuZGluZ1dhaXRVbnRpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1dhaXRVbnRpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZVRhZ3MgPSBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkVGFncztcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlcXVlc3QgaXMgZm9yIGEgc3RhdGljIHJlc3BvbnNlLCB3ZSBjYW4gY2FjaGUgaXQgc28gbG9uZ1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyBpdCdzIG5vdCBlZGdlLlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNJc3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb3B5IHRoZSBoZWFkZXJzIGZyb20gdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IHRvTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMocmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVUYWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tORVhUX0NBQ0hFX1RBR1NfSEVBREVSXSA9IGNhY2hlVGFncztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGVhZGVyc1snY29udGVudC10eXBlJ10gJiYgYmxvYi50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBibG9iLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZhbGlkYXRlID0gdHlwZW9mIGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlID09PSAndW5kZWZpbmVkJyB8fCBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZSA+PSBJTkZJTklURV9DQUNIRSA/IGZhbHNlIDogY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBpcmUgPSB0eXBlb2YgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZEV4cGlyZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZEV4cGlyZSA+PSBJTkZJTklURV9DQUNIRSA/IHVuZGVmaW5lZCA6IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNhY2hlIGVudHJ5IGZvciB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6IENhY2hlZFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBCdWZmZXIuZnJvbShhd2FpdCBibG9iLmFycmF5QnVmZmVyKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUNvbnRyb2w6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZUVudHJ5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VuZCByZXNwb25zZSB3aXRob3V0IGNhY2hpbmcgaWYgbm90IElTUlxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgcmVzcG9uc2UsIGNvbnRleHQucmVuZGVyT3B0cy5wZW5kaW5nV2FpdFVudGlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBiYWNrZ3JvdW5kIHJldmFsaWRhdGUgd2UgbmVlZCB0byByZXBvcnRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgZXJyb3IgaGVyZSBhcyBpdCB3b24ndCBiZSBidWJibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0NhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IHByZXZpb3VzQ2FjaGVFbnRyeS5pc1N0YWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWxlbmNlTG9nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVyciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlcktpbmQ6ICdBcHAgUm91dGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZVBhdGg6IHNyY1BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVUeXBlOiAncm91dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVSZWFzb246IGdldFJldmFsaWRhdGVSZWFzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1N0YXRpY0dlbmVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNpbGVuY2VMb2csIHJvdXRlclNlcnZlckNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgY2FjaGVFbnRyeSA9IGF3YWl0IHJvdXRlTW9kdWxlLmhhbmRsZVJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICByZXEsXG4gICAgICAgICAgICAgICAgbmV4dENvbmZpZyxcbiAgICAgICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgICAgICByb3V0ZUtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgICAgICAgICAgaXNGYWxsYmFjazogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJlcmVuZGVyTWFuaWZlc3QsXG4gICAgICAgICAgICAgICAgaXNSb3V0ZVBQUkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlR2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgIHdhaXRVbnRpbDogY3R4LndhaXRVbnRpbCxcbiAgICAgICAgICAgICAgICBpc01pbmltYWxNb2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGNyZWF0ZSBhIGNhY2hlRW50cnkgZm9yIElTUlxuICAgICAgICAgICAgaWYgKCFpc0lzcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChjYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiAoX2NhY2hlRW50cnlfdmFsdWUgPSBjYWNoZUVudHJ5LnZhbHVlKSA9PSBudWxsID8gdm9pZCAwIDogX2NhY2hlRW50cnlfdmFsdWUua2luZCkgIT09IENhY2hlZFJvdXRlS2luZC5BUFBfUk9VVEUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2NhY2hlRW50cnlfdmFsdWUxO1xuICAgICAgICAgICAgICAgIHRocm93IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXcgRXJyb3IoYEludmFyaWFudDogYXBwLXJvdXRlIHJlY2VpdmVkIGludmFsaWQgY2FjaGUgZW50cnkgJHtjYWNoZUVudHJ5ID09IG51bGwgPyB2b2lkIDAgOiAoX2NhY2hlRW50cnlfdmFsdWUxID0gY2FjaGVFbnRyeS52YWx1ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9jYWNoZUVudHJ5X3ZhbHVlMS5raW5kfWApLCBcIl9fTkVYVF9FUlJPUl9DT0RFXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiRTcwMVwiLFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzTWluaW1hbE1vZGUpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCd4LW5leHRqcy1jYWNoZScsIGlzT25EZW1hbmRSZXZhbGlkYXRlID8gJ1JFVkFMSURBVEVEJyA6IGNhY2hlRW50cnkuaXNNaXNzID8gJ01JU1MnIDogY2FjaGVFbnRyeS5pc1N0YWxlID8gJ1NUQUxFJyA6ICdISVQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERyYWZ0IG1vZGUgc2hvdWxkIG5ldmVyIGJlIGNhY2hlZFxuICAgICAgICAgICAgaWYgKGlzRHJhZnRNb2RlKSB7XG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ2FjaGUtQ29udHJvbCcsICdwcml2YXRlLCBuby1jYWNoZSwgbm8tc3RvcmUsIG1heC1hZ2U9MCwgbXVzdC1yZXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gZnJvbU5vZGVPdXRnb2luZ0h0dHBIZWFkZXJzKGNhY2hlRW50cnkudmFsdWUuaGVhZGVycyk7XG4gICAgICAgICAgICBpZiAoIShpc01pbmltYWxNb2RlICYmIGlzSXNyKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuZGVsZXRlKE5FWFRfQ0FDSEVfVEFHU19IRUFERVIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgY2FjaGUgY29udHJvbCBpcyBhbHJlYWR5IHNldCBvbiB0aGUgcmVzcG9uc2Ugd2UgZG9uJ3RcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGl0IHRvIGFsbG93IHVzZXJzIHRvIGN1c3RvbWl6ZSBpdCB2aWEgbmV4dC5jb25maWdcbiAgICAgICAgICAgIGlmIChjYWNoZUVudHJ5LmNhY2hlQ29udHJvbCAmJiAhcmVzLmdldEhlYWRlcignQ2FjaGUtQ29udHJvbCcpICYmICFoZWFkZXJzLmdldCgnQ2FjaGUtQ29udHJvbCcpKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5zZXQoJ0NhY2hlLUNvbnRyb2wnLCBnZXRDYWNoZUNvbnRyb2xIZWFkZXIoY2FjaGVFbnRyeS5jYWNoZUNvbnRyb2wpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHNlbmRSZXNwb25zZShub2RlTmV4dFJlcSwgbm9kZU5leHRSZXMsIC8vIEB0cy1leHBlY3QtZXJyb3IgLSBBcmd1bWVudCBvZiB0eXBlICdCdWZmZXI8QXJyYXlCdWZmZXJMaWtlPicgaXMgbm90IGFzc2lnbmFibGUgdG8gcGFyYW1ldGVyIG9mIHR5cGUgJ0JvZHlJbml0IHwgbnVsbCB8IHVuZGVmaW5lZCcuXG4gICAgICAgICAgICBuZXcgUmVzcG9uc2UoY2FjaGVFbnRyeS52YWx1ZS5ib2R5LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGNhY2hlRW50cnkudmFsdWUuc3RhdHVzIHx8IDIwMFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFRPRE86IGFjdGl2ZVNwYW4gY29kZSBwYXRoIGlzIGZvciB3aGVuIHdyYXBwZWQgYnlcbiAgICAgICAgLy8gbmV4dC1zZXJ2ZXIgY2FuIGJlIHJlbW92ZWQgd2hlbiB0aGlzIGlzIG5vIGxvbmdlciB1c2VkXG4gICAgICAgIGlmIChhY3RpdmVTcGFuKSB7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVSZXNwb25zZShhY3RpdmVTcGFuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRyYWNlci53aXRoUHJvcGFnYXRlZENvbnRleHQocmVxLmhlYWRlcnMsICgpPT50cmFjZXIudHJhY2UoQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBzcGFuTmFtZTogYCR7bWV0aG9kfSAke3NyY1BhZ2V9YCxcbiAgICAgICAgICAgICAgICAgICAga2luZDogU3BhbktpbmQuU0VSVkVSLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cC5tZXRob2QnOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cC50YXJnZXQnOiByZXEudXJsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBoYW5kbGVSZXNwb25zZSkpO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIE5vRmFsbGJhY2tFcnJvcikpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpbGVuY2VMb2cgPSBmYWxzZTtcbiAgICAgICAgICAgIGF3YWl0IHJvdXRlTW9kdWxlLm9uUmVxdWVzdEVycm9yKHJlcSwgZXJyLCB7XG4gICAgICAgICAgICAgICAgcm91dGVyS2luZDogJ0FwcCBSb3V0ZXInLFxuICAgICAgICAgICAgICAgIHJvdXRlUGF0aDogbm9ybWFsaXplZFNyY1BhZ2UsXG4gICAgICAgICAgICAgICAgcm91dGVUeXBlOiAncm91dGUnLFxuICAgICAgICAgICAgICAgIHJldmFsaWRhdGVSZWFzb246IGdldFJldmFsaWRhdGVSZWFzb24oe1xuICAgICAgICAgICAgICAgICAgICBpc1N0YXRpY0dlbmVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIHNpbGVuY2VMb2csIHJvdXRlclNlcnZlckNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldGhyb3cgc28gdGhhdCB3ZSBjYW4gaGFuZGxlIHNlcnZpbmcgZXJyb3IgcGFnZVxuICAgICAgICAvLyBJZiB0aGlzIGlzIGR1cmluZyBzdGF0aWMgZ2VuZXJhdGlvbiwgdGhyb3cgdGhlIGVycm9yIGFnYWluLlxuICAgICAgICBpZiAoaXNJc3IpIHRocm93IGVycjtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzZW5kIGEgNTAwIHJlc3BvbnNlLlxuICAgICAgICBhd2FpdCBzZW5kUmVzcG9uc2Uobm9kZU5leHRSZXEsIG5vZGVOZXh0UmVzLCBuZXcgUmVzcG9uc2UobnVsbCwge1xuICAgICAgICAgICAgc3RhdHVzOiA1MDBcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fimage-to-video%2Froute&page=%2Fapi%2Fimage-to-video%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fimage-to-video%2Froute.ts&appDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine&isDev=true&tsconfigPath=&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/image-to-video/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/image-to-video/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   maxDuration: () => (/* binding */ maxDuration)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sharp */ \"sharp\");\n/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst maxDuration = 600;\nconst VEO_MODEL = \"veo-3.1-generate-preview\";\nfunction getAspectRatio(aspectRatio) {\n    return aspectRatio === \"9:16\" ? \"9:16\" : \"16:9\";\n}\nfunction getTargetDimensions(aspectRatio) {\n    if (aspectRatio === \"16:9\") return {\n        width: 1280,\n        height: 720\n    };\n    return {\n        width: 720,\n        height: 1280\n    };\n}\nfunction getDurationSeconds(durationSeconds) {\n    if (durationSeconds === 4 || durationSeconds === 6 || durationSeconds === 8) {\n        return durationSeconds;\n    }\n    return 8;\n}\nasync function pollVideoStatus(operation, ai, apiKey) {\n    const maxAttempts = 120;\n    let currentOperation = operation;\n    for(let i = 0; i < maxAttempts; i++){\n        await new Promise((resolve)=>setTimeout(resolve, 5000));\n        currentOperation = await ai.operations.getVideosOperation({\n            operation: currentOperation\n        });\n        if (currentOperation.done === true) {\n            if (currentOperation.error) {\n                const errMsg = currentOperation.error.message || JSON.stringify(currentOperation.error);\n                throw new Error(`Video generation failed: ${errMsg}`);\n            }\n            const videoUri = currentOperation.response?.generatedVideos?.[0]?.video?.uri;\n            if (!videoUri) {\n                throw new Error(`No video URI returned from Veo API. Raw: ${JSON.stringify(currentOperation)}`);\n            }\n            const contentRes = await fetch(videoUri, {\n                headers: {\n                    \"x-goog-api-key\": apiKey\n                },\n                redirect: \"follow\"\n            });\n            if (!contentRes.ok) {\n                throw new Error(`Failed to download video: ${contentRes.status}`);\n            }\n            const buffer = await contentRes.arrayBuffer();\n            return Buffer.from(buffer).toString(\"base64\");\n        }\n    }\n    throw new Error(\"Video generation timed out after 10 minutes\");\n}\nasync function prepareReferenceImage(imageUrl, targetWidth, targetHeight) {\n    try {\n        const imgRes = await fetch(imageUrl);\n        if (!imgRes.ok) return null;\n        const rawBuffer = Buffer.from(await imgRes.arrayBuffer());\n        const resizedBuffer = await sharp__WEBPACK_IMPORTED_MODULE_2___default()(rawBuffer).resize(targetWidth, targetHeight, {\n            fit: \"cover\",\n            position: \"centre\"\n        }).jpeg({\n            quality: 90\n        }).toBuffer();\n        return resizedBuffer.toString(\"base64\");\n    } catch (err) {\n        console.error(\"[image-to-video] Failed to prepare image:\", err);\n        return null;\n    }\n}\nasync function createVideoOperation(prompt, imageBase64, ratio, duration, apiKey) {\n    const ai = new _google_genai__WEBPACK_IMPORTED_MODULE_1__.GoogleGenAI({\n        apiKey\n    });\n    const maxAttempts = 3;\n    let lastError = \"Unknown Gemini error\";\n    for(let attempt = 1; attempt <= maxAttempts; attempt++){\n        try {\n            return await ai.models.generateVideos({\n                model: VEO_MODEL,\n                prompt,\n                image: {\n                    imageBytes: imageBase64,\n                    mimeType: \"image/jpeg\"\n                },\n                config: {\n                    aspectRatio: ratio,\n                    durationSeconds: duration\n                }\n            });\n        } catch (error) {\n            const message = error instanceof Error ? error.message : String(error);\n            lastError = message;\n            const is5xx = /(?:\\b5\\d\\d\\b|INTERNAL)/i.test(message);\n            if (!is5xx || attempt === maxAttempts) {\n                break;\n            }\n            await new Promise((resolve)=>setTimeout(resolve, 1500 * attempt));\n        }\n    }\n    throw new Error(lastError);\n}\nasync function POST(request) {\n    try {\n        const { prompt, imageUrl, durationSeconds, aspectRatio } = await request.json();\n        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_VEO_IMG2VID_API_KEY;\n        if (!apiKey) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"GEMINI_API_KEY not configured\"\n            }, {\n                status: 500\n            });\n        }\n        if (!prompt || !imageUrl) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"prompt and imageUrl are required\"\n            }, {\n                status: 400\n            });\n        }\n        const duration = getDurationSeconds(durationSeconds);\n        const ratio = getAspectRatio(aspectRatio);\n        const { width: targetWidth, height: targetHeight } = getTargetDimensions(ratio);\n        const imageBase64 = await prepareReferenceImage(imageUrl, targetWidth, targetHeight);\n        if (!imageBase64) {\n            throw new Error(\"Failed to fetch or prepare reference image\");\n        }\n        const ai = new _google_genai__WEBPACK_IMPORTED_MODULE_1__.GoogleGenAI({\n            apiKey\n        });\n        const operation = await createVideoOperation(prompt, imageBase64, ratio, duration, apiKey);\n        const videoBase64 = await pollVideoStatus(operation, ai, apiKey);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: {\n                videoBase64,\n                mimeType: \"video/mp4\"\n            }\n        });\n    } catch (error) {\n        const message = error instanceof Error ? error.message : \"Unknown error\";\n        console.error(\"[image-to-video] Error:\", message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9pbWFnZS10by12aWRlby9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0Q7QUFDWjtBQUNsQjtBQUVuQixNQUFNRyxjQUFjLElBQUk7QUFFL0IsTUFBTUMsWUFBWTtBQUVsQixTQUFTQyxlQUFlQyxXQUFvQjtJQUMxQyxPQUFPQSxnQkFBZ0IsU0FBUyxTQUFTO0FBQzNDO0FBRUEsU0FBU0Msb0JBQW9CRCxXQUFvQjtJQUMvQyxJQUFJQSxnQkFBZ0IsUUFBUSxPQUFPO1FBQUVFLE9BQU87UUFBTUMsUUFBUTtJQUFJO0lBQzlELE9BQU87UUFBRUQsT0FBTztRQUFLQyxRQUFRO0lBQUs7QUFDcEM7QUFFQSxTQUFTQyxtQkFBbUJDLGVBQXdCO0lBQ2xELElBQUlBLG9CQUFvQixLQUFLQSxvQkFBb0IsS0FBS0Esb0JBQW9CLEdBQUc7UUFDM0UsT0FBT0E7SUFDVDtJQUNBLE9BQU87QUFDVDtBQUVBLGVBQWVDLGdCQUFnQkMsU0FBa0IsRUFBRUMsRUFBZSxFQUFFQyxNQUFjO0lBQ2hGLE1BQU1DLGNBQWM7SUFDcEIsSUFBSUMsbUJBQW1CSjtJQU12QixJQUFLLElBQUlLLElBQUksR0FBR0EsSUFBSUYsYUFBYUUsSUFBSztRQUNwQyxNQUFNLElBQUlDLFFBQVEsQ0FBQ0MsVUFBWUMsV0FBV0QsU0FBUztRQUVuREgsbUJBQW1CLE1BQU1ILEdBQUdRLFVBQVUsQ0FBQ0Msa0JBQWtCLENBQUM7WUFDeERWLFdBQVdJO1FBQ2I7UUFFQSxJQUFJQSxpQkFBaUJPLElBQUksS0FBSyxNQUFNO1lBQ2xDLElBQUlQLGlCQUFpQlEsS0FBSyxFQUFFO2dCQUMxQixNQUFNQyxTQUFTVCxpQkFBaUJRLEtBQUssQ0FBQ0UsT0FBTyxJQUFJQyxLQUFLQyxTQUFTLENBQUNaLGlCQUFpQlEsS0FBSztnQkFDdEYsTUFBTSxJQUFJSyxNQUFNLENBQUMseUJBQXlCLEVBQUVKLFFBQVE7WUFDdEQ7WUFFQSxNQUFNSyxXQUFXZCxpQkFBaUJlLFFBQVEs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Q0FBQztnQkFBRXhELE9BQU87WUFBZ0MsR0FBRztnQkFBRWdCLFFBQVE7WUFBSTtRQUNyRjtRQUVBLElBQUksQ0FBQ3NCLFVBQVUsQ0FBQ2YsVUFBVTtZQUN4QixPQUFPaEQscURBQVlBLENBQUNpRixJQUFJLENBQUM7Z0JBQUV4RCxPQUFPO1lBQW1DLEdBQUc7Z0JBQUVnQixRQUFRO1lBQUk7UUFDeEY7UUFFQSxNQUFNeUIsV0FBV3hELG1CQUFtQkM7UUFDcEMsTUFBTXNELFFBQVE1RCxlQUFlQztRQUM3QixNQUFNLEVBQUVFLE9BQU95QyxXQUFXLEVBQUV4QyxRQUFReUMsWUFBWSxFQUFFLEdBQUczQyxvQkFBb0IwRDtRQUV6RSxNQUFNRCxjQUFjLE1BQU1qQixzQkFBc0JDLFVBQVVDLGFBQWFDO1FBQ3ZFLElBQUksQ0FBQ2MsYUFBYTtZQUNoQixNQUFNLElBQUlsQyxNQUFNO1FBQ2xCO1FBRUEsTUFBTWhCLEtBQUssSUFBSWIsc0RBQVdBLENBQUM7WUFBRWM7UUFBTztRQUNwQyxNQUFNRixZQUFZLE1BQU1pRCxxQkFBcUJDLFFBQVFDLGFBQWFDLE9BQU9DLFVBQVVuRDtRQUNuRixNQUFNeUUsY0FBYyxNQUFNNUUsZ0JBQWdCQyxXQUFXQyxJQUFJQztRQUV6RCxPQUFPZixxREFBWUEsQ0FBQ2lGLElBQUksQ0FBQztZQUFFUSxNQUFNO2dCQUFFRDtnQkFBYWQsVUFBVTtZQUFZO1FBQUU7SUFDMUUsRUFBRSxPQUFPakQsT0FBTztRQUNkLE1BQU1FLFVBQVVGLGlCQUFpQkssUUFBUUwsTUFBTUUsT0FBTyxHQUFHO1FBQ3pEa0MsUUFBUXBDLEtBQUssQ0FBQywyQkFBMkJFO1FBQ3pDLE9BQU8zQixxREFBWUEsQ0FBQ2lGLElBQUksQ0FBQztZQUFFeEQsT0FBT0U7UUFBUSxHQUFHO1lBQUVjLFFBQVE7UUFBSTtJQUM3RDtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbmloYWxnYXJpc2EvRG93bmxvYWRzL0FJIEVjb20gRW5naW5lL3NyYy9hcHAvYXBpL2ltYWdlLXRvLXZpZGVvL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IEdvb2dsZUdlbkFJIH0gZnJvbSBcIkBnb29nbGUvZ2VuYWlcIjtcbmltcG9ydCBzaGFycCBmcm9tIFwic2hhcnBcIjtcblxuZXhwb3J0IGNvbnN0IG1heER1cmF0aW9uID0gNjAwO1xuXG5jb25zdCBWRU9fTU9ERUwgPSBcInZlby0zLjEtZ2VuZXJhdGUtcHJldmlld1wiO1xuXG5mdW5jdGlvbiBnZXRBc3BlY3RSYXRpbyhhc3BlY3RSYXRpbz86IHN0cmluZyk6IFwiMTY6OVwiIHwgXCI5OjE2XCIge1xuICByZXR1cm4gYXNwZWN0UmF0aW8gPT09IFwiOToxNlwiID8gXCI5OjE2XCIgOiBcIjE2OjlcIjtcbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0RGltZW5zaW9ucyhhc3BlY3RSYXRpbz86IHN0cmluZyk6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfSB7XG4gIGlmIChhc3BlY3RSYXRpbyA9PT0gXCIxNjo5XCIpIHJldHVybiB7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDcyMCB9O1xuICByZXR1cm4geyB3aWR0aDogNzIwLCBoZWlnaHQ6IDEyODAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RHVyYXRpb25TZWNvbmRzKGR1cmF0aW9uU2Vjb25kcz86IG51bWJlcik6IDQgfCA2IHwgOCB7XG4gIGlmIChkdXJhdGlvblNlY29uZHMgPT09IDQgfHwgZHVyYXRpb25TZWNvbmRzID09PSA2IHx8IGR1cmF0aW9uU2Vjb25kcyA9PT0gOCkge1xuICAgIHJldHVybiBkdXJhdGlvblNlY29uZHM7XG4gIH1cbiAgcmV0dXJuIDg7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHBvbGxWaWRlb1N0YXR1cyhvcGVyYXRpb246IHVua25vd24sIGFpOiBHb29nbGVHZW5BSSwgYXBpS2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBtYXhBdHRlbXB0cyA9IDEyMDtcbiAgbGV0IGN1cnJlbnRPcGVyYXRpb24gPSBvcGVyYXRpb24gYXMge1xuICAgIGRvbmU/OiBib29sZWFuO1xuICAgIHJlc3BvbnNlPzogeyBnZW5lcmF0ZWRWaWRlb3M/OiBBcnJheTx7IHZpZGVvPzogeyB1cmk/OiBzdHJpbmcgfSB9PiB9O1xuICAgIGVycm9yPzogeyBtZXNzYWdlPzogc3RyaW5nIH07XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhBdHRlbXB0czsgaSsrKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwMCkpO1xuXG4gICAgY3VycmVudE9wZXJhdGlvbiA9IGF3YWl0IGFpLm9wZXJhdGlvbnMuZ2V0VmlkZW9zT3BlcmF0aW9uKHtcbiAgICAgIG9wZXJhdGlvbjogY3VycmVudE9wZXJhdGlvbixcbiAgICB9KSBhcyB0eXBlb2YgY3VycmVudE9wZXJhdGlvbjtcblxuICAgIGlmIChjdXJyZW50T3BlcmF0aW9uLmRvbmUgPT09IHRydWUpIHtcbiAgICAgIGlmIChjdXJyZW50T3BlcmF0aW9uLmVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVyck1zZyA9IGN1cnJlbnRPcGVyYXRpb24uZXJyb3IubWVzc2FnZSB8fCBKU09OLnN0cmluZ2lmeShjdXJyZW50T3BlcmF0aW9uLmVycm9yKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWaWRlbyBnZW5lcmF0aW9uIGZhaWxlZDogJHtlcnJNc2d9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZpZGVvVXJpID0gY3VycmVudE9wZXJhdGlvbi5yZXNwb25zZT8uZ2VuZXJhdGVkVmlkZW9zPy5bMF0/LnZpZGVvPy51cmk7XG4gICAgICBpZiAoIXZpZGVvVXJpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmlkZW8gVVJJIHJldHVybmVkIGZyb20gVmVvIEFQSS4gUmF3OiAke0pTT04uc3RyaW5naWZ5KGN1cnJlbnRPcGVyYXRpb24pfWApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZW50UmVzID0gYXdhaXQgZmV0Y2godmlkZW9VcmksIHtcbiAgICAgICAgaGVhZGVyczogeyBcIngtZ29vZy1hcGkta2V5XCI6IGFwaUtleSB9LFxuICAgICAgICByZWRpcmVjdDogXCJmb2xsb3dcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWNvbnRlbnRSZXMub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZG93bmxvYWQgdmlkZW86ICR7Y29udGVudFJlcy5zdGF0dXN9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGNvbnRlbnRSZXMuYXJyYXlCdWZmZXIoKTtcbiAgICAgIHJldHVybiBCdWZmZXIuZnJvbShidWZmZXIpLnRvU3RyaW5nKFwiYmFzZTY0XCIpO1xuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcIlZpZGVvIGdlbmVyYXRpb24gdGltZWQgb3V0IGFmdGVyIDEwIG1pbnV0ZXNcIik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVSZWZlcmVuY2VJbWFnZShpbWFnZVVybDogc3RyaW5nLCB0YXJnZXRXaWR0aDogbnVtYmVyLCB0YXJnZXRIZWlnaHQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGltZ1JlcyA9IGF3YWl0IGZldGNoKGltYWdlVXJsKTtcbiAgICBpZiAoIWltZ1Jlcy5vaykgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCByYXdCdWZmZXIgPSBCdWZmZXIuZnJvbShhd2FpdCBpbWdSZXMuYXJyYXlCdWZmZXIoKSk7XG5cbiAgICBjb25zdCByZXNpemVkQnVmZmVyID0gYXdhaXQgc2hhcnAocmF3QnVmZmVyKVxuICAgICAgLnJlc2l6ZSh0YXJnZXRXaWR0aCwgdGFyZ2V0SGVpZ2h0LCB7IGZpdDogXCJjb3ZlclwiLCBwb3NpdGlvbjogXCJjZW50cmVcIiB9KVxuICAgICAgLmpwZWcoeyBxdWFsaXR5OiA5MCB9KVxuICAgICAgLnRvQnVmZmVyKCk7XG5cbiAgICByZXR1cm4gcmVzaXplZEJ1ZmZlci50b1N0cmluZyhcImJhc2U2NFwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltpbWFnZS10by12aWRlb10gRmFpbGVkIHRvIHByZXBhcmUgaW1hZ2U6XCIsIGVycik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlVmlkZW9PcGVyYXRpb24oXG4gIHByb21wdDogc3RyaW5nLFxuICBpbWFnZUJhc2U2NDogc3RyaW5nLFxuICByYXRpbzogXCIxNjo5XCIgfCBcIjk6MTZcIixcbiAgZHVyYXRpb246IDQgfCA2IHwgOCxcbiAgYXBpS2V5OiBzdHJpbmcsXG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgY29uc3QgYWkgPSBuZXcgR29vZ2xlR2VuQUkoeyBhcGlLZXkgfSk7XG4gIGNvbnN0IG1heEF0dGVtcHRzID0gMztcbiAgbGV0IGxhc3RFcnJvciA9IFwiVW5rbm93biBHZW1pbmkgZXJyb3JcIjtcblxuICBmb3IgKGxldCBhdHRlbXB0ID0gMTsgYXR0ZW1wdCA8PSBtYXhBdHRlbXB0czsgYXR0ZW1wdCsrKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBhaS5tb2RlbHMuZ2VuZXJhdGVWaWRlb3Moe1xuICAgICAgICBtb2RlbDogVkVPX01PREVMLFxuICAgICAgICBwcm9tcHQsXG4gICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgaW1hZ2VCeXRlczogaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgbWltZVR5cGU6IFwiaW1hZ2UvanBlZ1wiLFxuICAgICAgICB9LFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBhc3BlY3RSYXRpbzogcmF0aW8sXG4gICAgICAgICAgZHVyYXRpb25TZWNvbmRzOiBkdXJhdGlvbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICAgICAgbGFzdEVycm9yID0gbWVzc2FnZTtcbiAgICAgIGNvbnN0IGlzNXh4ID0gLyg/OlxcYjVcXGRcXGRcXGJ8SU5URVJOQUwpL2kudGVzdChtZXNzYWdlKTtcbiAgICAgIGlmICghaXM1eHggfHwgYXR0ZW1wdCA9PT0gbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDE1MDAgKiBhdHRlbXB0KSk7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGxhc3RFcnJvcik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwcm9tcHQsIGltYWdlVXJsLCBkdXJhdGlvblNlY29uZHMsIGFzcGVjdFJhdGlvIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKSBhcyB7XG4gICAgICBwcm9tcHQ6IHN0cmluZztcbiAgICAgIGltYWdlVXJsOiBzdHJpbmc7XG4gICAgICBhc3BlY3RSYXRpbz86IHN0cmluZztcbiAgICAgIGR1cmF0aW9uU2Vjb25kcz86IG51bWJlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgYXBpS2V5ID1cbiAgICAgIHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZIHx8XG4gICAgICBwcm9jZXNzLmVudi5HT09HTEVfQVBJX0tFWSB8fFxuICAgICAgcHJvY2Vzcy5lbnYuR09PR0xFX0FJX0FQSV9LRVkgfHxcbiAgICAgIHByb2Nlc3MuZW52LkdPT0dMRV9WRU9fSU1HMlZJRF9BUElfS0VZO1xuICAgIGlmICghYXBpS2V5KSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJHRU1JTklfQVBJX0tFWSBub3QgY29uZmlndXJlZFwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFwcm9tcHQgfHwgIWltYWdlVXJsKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJwcm9tcHQgYW5kIGltYWdlVXJsIGFyZSByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZHVyYXRpb24gPSBnZXREdXJhdGlvblNlY29uZHMoZHVyYXRpb25TZWNvbmRzKTtcbiAgICBjb25zdCByYXRpbyA9IGdldEFzcGVjdFJhdGlvKGFzcGVjdFJhdGlvKTtcbiAgICBjb25zdCB7IHdpZHRoOiB0YXJnZXRXaWR0aCwgaGVpZ2h0OiB0YXJnZXRIZWlnaHQgfSA9IGdldFRhcmdldERpbWVuc2lvbnMocmF0aW8pO1xuXG4gICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBhd2FpdCBwcmVwYXJlUmVmZXJlbmNlSW1hZ2UoaW1hZ2VVcmwsIHRhcmdldFdpZHRoLCB0YXJnZXRIZWlnaHQpO1xuICAgIGlmICghaW1hZ2VCYXNlNjQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBvciBwcmVwYXJlIHJlZmVyZW5jZSBpbWFnZVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBhaSA9IG5ldyBHb29nbGVHZW5BSSh7IGFwaUtleSB9KTtcbiAgICBjb25zdCBvcGVyYXRpb24gPSBhd2FpdCBjcmVhdGVWaWRlb09wZXJhdGlvbihwcm9tcHQsIGltYWdlQmFzZTY0LCByYXRpbywgZHVyYXRpb24sIGFwaUtleSk7XG4gICAgY29uc3QgdmlkZW9CYXNlNjQgPSBhd2FpdCBwb2xsVmlkZW9TdGF0dXMob3BlcmF0aW9uLCBhaSwgYXBpS2V5KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGRhdGE6IHsgdmlkZW9CYXNlNjQsIG1pbWVUeXBlOiBcInZpZGVvL21wNFwiIH0gfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yXCI7XG4gICAgY29uc29sZS5lcnJvcihcIltpbWFnZS10by12aWRlb10gRXJyb3I6XCIsIG1lc3NhZ2UpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBtZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHb29nbGVHZW5BSSIsInNoYXJwIiwibWF4RHVyYXRpb24iLCJWRU9fTU9ERUwiLCJnZXRBc3BlY3RSYXRpbyIsImFzcGVjdFJhdGlvIiwiZ2V0VGFyZ2V0RGltZW5zaW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0RHVyYXRpb25TZWNvbmRzIiwiZHVyYXRpb25TZWNvbmRzIiwicG9sbFZpZGVvU3RhdHVzIiwib3BlcmF0aW9uIiwiYWkiLCJhcGlLZXkiLCJtYXhBdHRlbXB0cyIsImN1cnJlbnRPcGVyYXRpb24iLCJpIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0Iiwib3BlcmF0aW9ucyIsImdldFZpZGVvc09wZXJhdGlvbiIsImRvbmUiLCJlcnJvciIsImVyck1zZyIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiRXJyb3IiLCJ2aWRlb1VyaSIsInJlc3BvbnNlIiwiZ2VuZXJhdGVkVmlkZW9zIiwidmlkZW8iLCJ1cmkiLCJjb250ZW50UmVzIiwiZmV0Y2giLCJoZWFkZXJzIiwicmVkaXJlY3QiLCJvayIsInN0YXR1cyIsImJ1ZmZlciIsImFycmF5QnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwicHJlcGFyZVJlZmVyZW5jZUltYWdlIiwiaW1hZ2VVcmwiLCJ0YXJnZXRXaWR0aCIsInRhcmdldEhlaWdodCIsImltZ1JlcyIsInJhd0J1ZmZlciIsInJlc2l6ZWRCdWZmZXIiLCJyZXNpemUiLCJmaXQiLCJwb3NpdGlvbiIsImpwZWciLCJxdWFsaXR5IiwidG9CdWZmZXIiLCJlcnIiLCJjb25zb2xlIiwiY3JlYXRlVmlkZW9PcGVyYXRpb24iLCJwcm9tcHQiLCJpbWFnZUJhc2U2NCIsInJhdGlvIiwiZHVyYXRpb24iLCJsYXN0RXJyb3IiLCJhdHRlbXB0IiwibW9kZWxzIiwiZ2VuZXJhdGVWaWRlb3MiLCJtb2RlbCIsImltYWdlIiwiaW1hZ2VCeXRlcyIsIm1pbWVUeXBlIiwiY29uZmlnIiwiU3RyaW5nIiwiaXM1eHgiLCJ0ZXN0IiwiUE9TVCIsInJlcXVlc3QiLCJqc29uIiwicHJvY2VzcyIsImVudiIsIkdFTUlOSV9BUElfS0VZIiwiR09PR0xFX0FQSV9LRVkiLCJHT09HTEVfQUlfQVBJX0tFWSIsIkdPT0dMRV9WRU9fSU1HMlZJRF9BUElfS0VZIiwidmlkZW9CYXNlNjQiLCJkYXRhIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/image-to-video/route.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "next/dist/shared/lib/no-fallback-error.external":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/no-fallback-error.external" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ }),

/***/ "next/dist/shared/lib/router/utils/app-paths":
/*!**************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/app-paths" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/promises":
/*!***************************************!*\
  !*** external "node:stream/promises" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/promises");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "sharp":
/*!************************!*\
  !*** external "sharp" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("sharp");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fimage-to-video%2Froute&page=%2Fapi%2Fimage-to-video%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fimage-to-video%2Froute.ts&appDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fnihalgarisa%2FDownloads%2FAI%20Ecom%20Engine&isDev=true&tsconfigPath=&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();