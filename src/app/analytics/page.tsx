"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { useGenerateStore } from "@/lib/generate-store";
import type { GeneratedVideo } from "@/types";
import {
  BarChart3,
  Eye,
  Sparkles,
  DollarSign,
  Brain,
  Image as ImageIcon,
  TrendingUp,
  Video,
  X,
  Play,
} from "lucide-react";
import Image from "next/image";

function AdsCreatedChart({ generatedAds, accentColor = "#6366f1" }: { generatedAds: { createdAt: string }[]; accentColor?: string }) {
  const days = 14;
  const today = new Date();

  const data = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const count = generatedAds.filter((a) => a.createdAt?.slice(0, 10) === key).length;
    return { label, count };
  });

  const rawMax = Math.max(...data.map((d) => d.count), 0);
  // Pick a clean nice max: at least 4, rounded up to nearest even number
  const niceMax = rawMax <= 4 ? Math.max(rawMax, 4) : Math.ceil(rawMax / 2) * 2;
  const chartH = 160;
  const paddingLeft = 28;
  const paddingRight = 8;
  const paddingTop = 16;
  const paddingBottom = 32;
  // Only show as many grid lines as we have unique integer steps
  const gridSteps = Math.min(niceMax, 4);
  const mono = "'SF Mono', 'Fira Code', 'Fira Mono', monospace";

  return (
    <div className="w-full">
      <svg
        width="100%"
        viewBox={`0 0 600 ${chartH + paddingTop + paddingBottom}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: chartH + paddingTop + paddingBottom }}
      >
        {/* Grid lines */}
        {Array.from({ length: gridSteps + 1 }, (_, i) => {
          const y = paddingTop + (chartH / gridSteps) * i;
          const val = Math.round(niceMax - (niceMax / gridSteps) * i);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={600 - paddingRight}
                y2={y}
                stroke="currentColor"
                strokeOpacity={i === gridSteps ? 0.15 : 0.07}
                strokeWidth={1}
                strokeDasharray={i === gridSteps ? "none" : "none"}
              />
              <text
                x={paddingLeft - 6}
                y={y + 4}
                textAnchor="end"
                fontSize={9}
                fontFamily={mono}
                fill="currentColor"
                fillOpacity={0.35}
                letterSpacing={-0.5}
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const totalBarArea = 600 - paddingLeft - paddingRight;
          const slotW = totalBarArea / days;
          const barW = Math.max(slotW * 0.55, 8);
          const x = paddingLeft + i * slotW + (slotW - barW) / 2;
          const barH = Math.max((d.count / niceMax) * chartH, d.count > 0 ? 4 : 0);
          const y = paddingTop + chartH - barH;
          const showLabel = i === 0 || i === days - 1 || i % Math.floor(days / 4) === 0;

          return (
            <g key={i}>
              {/* Bar background (empty slot) */}
              <rect
                x={x}
                y={paddingTop}
                width={barW}
                height={chartH}
                rx={4}
                fill="currentColor"
                fillOpacity={0.05}
              />
              {/* Actual bar */}
              {d.count > 0 && (
                <>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={barH}
                    rx={4}
                    fill={accentColor}
                    fillOpacity={0.9}
                  />
                  {/* Highlight top */}
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={Math.min(4, barH)}
                    rx={4}
                    fill={accentColor}
                    fillOpacity={0.8}
                  />
                  {/* Count label */}
                  <text
                    x={x + barW / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize={10}
                    fontFamily={mono}
                    fill="currentColor"
                    fillOpacity={0.8}
                    fontWeight={600}
                    letterSpacing={-0.5}
                  >
                    {d.count}
                  </text>
                </>
              )}
              {/* Date label */}
              {showLabel && (
                <text
                  x={x + barW / 2}
                  y={paddingTop + chartH + paddingBottom - 6}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily={mono}
                  fill="currentColor"
                  fillOpacity={0.38}
                  letterSpacing={-0.3}
                >
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function AnalyticsPage() {
  const { usage, competitors, analyses, generationDates, analysisDates, generatedVideos, videoGenerationDates } = useAppStore();
  const variations = useGenerateStore((s) => s.variations);
  const [previewVideo, setPreviewVideo] = useState<GeneratedVideo | null>(null);

  const completedVariations = variations.filter(
    (v) => v.status === "completed" || v.status === "approved"
  );
  const approvedVariations = variations.filter((v) => v.status === "approved");
  const approvalRate =
    completedVariations.length > 0
      ? Math.round((approvedVariations.length / completedVariations.length) * 100)
      : 0;

  const stats = [
    {
      label: "Competitors Tracked",
      value: competitors.length,
      icon: Eye,
      color: "text-blue-400",
    },
    {
      label: "Ads Analyzed",
      value: usage.adsAnalyzed,
      icon: Brain,
      color: "text-purple-400",
    },
    {
      label: "Images Generated",
      value: usage.adsGenerated,
      icon: ImageIcon,
      color: "text-green-400",
    },
    {
      label: "Videos Generated",
      value: usage.videosGenerated ?? 0,
      icon: Video,
      color: "text-pink-400",
    },
    {
      label: "Generation Cost",
      value: `$${usage.generationCostUsd.toFixed(2)}`,
      icon: DollarSign,
      color: "text-yellow-400",
    },
  ];

  const analysisEntries = Object.entries(analyses);
  const topAnalyses = analysisEntries
    .sort(([, a], [, b]) => b.overallScore - a.overallScore)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your ad engine usage and performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ads Created Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Ads Created — Last 14 Days
            </h3>
          </CardHeader>
          <CardContent>
            {generationDates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ads generated yet.</p>
            ) : (
              <AdsCreatedChart generatedAds={generationDates.map((d) => ({ createdAt: d }))} />
            )}
          </CardContent>
        </Card>

        {/* Ads Analyzed Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-400" />
              Ads Analyzed — Last 14 Days
            </h3>
          </CardHeader>
          <CardContent>
            {analysisDates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No ads analyzed yet.</p>
            ) : (
              <AdsCreatedChart generatedAds={analysisDates.map((d) => ({ createdAt: d }))} accentColor="#a855f7" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Generation Performance
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold">{approvalRate}%</p>
                <p className="text-xs text-muted-foreground">Approval Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{usage.adsGenerated}</p>
                <p className="text-xs text-muted-foreground">Total Generated</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{approvedVariations.length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>

            {/* Cost per ad */}
            <div className="p-3 rounded-lg bg-muted text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg cost per generated ad</span>
                <span>
                  {usage.adsGenerated > 0
                    ? `$${(usage.generationCostUsd / usage.adsGenerated).toFixed(3)}`
                    : "$0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total generation spend</span>
                <span>${usage.generationCostUsd.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Analyzed Ads */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Top Analyzed Ads
            </h3>
          </CardHeader>
          <CardContent>
            {topAnalyses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No ads analyzed yet. Start analyzing from the Competitor Ad Feed.
              </p>
            ) : (
              <div className="space-y-3">
                {topAnalyses.map(([adId, analysis]) => (
                  <div key={adId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="text-lg font-bold text-primary w-8 text-center">
                      {analysis.overallScore}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {analysis.conversionElements.hook.text || "Ad"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {analysis.conversionElements.visualHierarchy.layoutType} •{" "}
                        {analysis.conversionElements.hook.type}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      Relevance: {analysis.relevanceToBrand.score}/10
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Generated Images */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              Recently Generated Images
            </h3>
          </CardHeader>
          <CardContent>
            {completedVariations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No images generated yet. Go to Generate Images to create your first ad.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {completedVariations.slice(0, 12).map((v) => (
                  <div key={v.id} className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border group">
                    {v.imageDataUrl && (
                      <Image src={v.imageDataUrl} alt="" fill className="object-cover" unoptimized />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            v.status === "approved"
                              ? "bg-green-500/20 text-green-400 text-[9px]"
                              : "bg-zinc-500/20 text-zinc-400 text-[9px]"
                          }
                        >
                          {v.status}
                        </Badge>
                        <span className="text-[9px] text-zinc-400">{v.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Video section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Videos Generated Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Video className="h-4 w-4 text-pink-400" />
              Videos Generated — Last 14 Days
            </h3>
          </CardHeader>
          <CardContent>
            {videoGenerationDates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No videos generated yet.</p>
            ) : (
              <AdsCreatedChart generatedAds={videoGenerationDates.map((d) => ({ createdAt: d }))} accentColor="#f472b6" />
            )}
          </CardContent>
        </Card>

        {/* Recently Generated Videos */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Video className="h-4 w-4 text-pink-400" />
              Recently Generated Videos
            </h3>
          </CardHeader>
          <CardContent>
            {generatedVideos.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No videos generated yet. Use Generate Videos or Image to Video.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {generatedVideos.slice(0, 8).map((v) => (
                  <div
                    key={v.id}
                    className="relative aspect-[9/16] rounded-lg overflow-hidden border border-border bg-muted cursor-pointer group"
                    onClick={() => setPreviewVideo(v)}
                  >
                    {v.sourceThumbnailUrl ? (
                      <Image src={v.sourceThumbnailUrl} alt="" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" unoptimized />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500/80 group-hover:bg-pink-500 group-hover:scale-110 transition-all">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 space-y-0.5">
                      <Badge className="bg-pink-500/20 text-pink-300 text-[9px]">
                        {v.type === "image-to-video" ? "Img→Vid" : "Generated"}
                      </Badge>
                      <p className="text-[9px] text-zinc-400">{v.aspectRatio} · {v.durationSeconds}s</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Video preview lightbox */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="relative max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white/70 hover:text-white"
              onClick={() => setPreviewVideo(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative rounded-xl overflow-hidden border border-border bg-black" style={{ maxHeight: "80vh", aspectRatio: previewVideo.aspectRatio.replace(":", "/") }}>
              {previewVideo.videoDataUrl ? (
                <video
                  src={previewVideo.videoDataUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                  style={{ maxHeight: "80vh" }}
                />
              ) : previewVideo.sourceThumbnailUrl ? (
                <div className="relative w-64 aspect-[9/16]">
                  <Image src={previewVideo.sourceThumbnailUrl} alt="" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p className="text-white text-sm text-center px-4">Video not available — generate a new one to replay it.</p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Badge className="bg-pink-500/20 text-pink-300 text-xs">
                {previewVideo.type === "image-to-video" ? "Img→Vid" : "Generated"}
              </Badge>
              <span>{previewVideo.aspectRatio} · {previewVideo.durationSeconds}s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
