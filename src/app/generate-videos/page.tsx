"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useAppStore } from "@/lib/store";
import type { ForeplayAd } from "@/types/foreplay";
import {
  Video,
  ChevronRight,
  Download,
  ArrowLeft,
  RefreshCw,
  Zap,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

type Step = "select" | "configure" | "generate" | "review";

interface GeneratedVideoResult {
  videoDataUrl: string;
  mimeType: string;
}

function buildVideoPrompt(ad: ForeplayAd, brandProfile: { brandName: string; brandVoice: string; targetAudience: string; usps: string[]; brandColors: { primary: string; secondary: string; accent: string }; niche: string }, additionalInstructions: string): string {
  const brandName = brandProfile.brandName || "my brand";

  const parts: string[] = [
    `Create a short-form video advertisement for "${brandName}" inspired by a competitor ad.`,
    `Replicate the competitor ad's visual style, pacing, and energy but replace all competitor branding with "${brandName}" — spell the brand name exactly as written.`,
  ];

  if (ad.description) {
    parts.push(`Reference ad context: ${ad.description}.`);
  }

  const niche = ad.niches?.length > 0 ? ad.niches.join(", ") : brandProfile.niche;
  if (niche) parts.push(`Product category: ${niche}.`);

  if (brandProfile.brandVoice) {
    parts.push(`Brand tone: ${brandProfile.brandVoice}.`);
  }

  if (brandProfile.targetAudience) {
    parts.push(`Target audience: ${brandProfile.targetAudience}.`);
  }

  if (brandProfile.usps.length > 0) {
    parts.push(`Key selling points to convey: ${brandProfile.usps.slice(0, 3).join(", ")}.`);
  }

  parts.push(
    `Use the brand's color palette: primary ${brandProfile.brandColors.primary}, secondary ${brandProfile.brandColors.secondary}, accent ${brandProfile.brandColors.accent}.`,
    `Keep the same hook structure and pacing. Make it feel native to social media.`,
  );

  if (additionalInstructions) {
    parts.push(`Additional instructions: ${additionalInstructions}`);
  }

  return parts.join(" ");
}

export default function GenerateVideosPage() {
  const { brandProfile, incrementUsage, addGeneratedVideo, addVideoGenerationDate } = useAppStore();
  const [step, setStep] = useState<Step>("select");
  const [selectedAd, setSelectedAd] = useState<ForeplayAd | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [durationSeconds, setDurationSeconds] = useState("15");
  const [generating, setGenerating] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedVideoResult | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Read selected ad from sessionStorage (set by Discover Videos duplicate button)
  useEffect(() => {
    const ctx = sessionStorage.getItem("generate_context");
    if (ctx) {
      try {
        const { ad } = JSON.parse(ctx);
        if (ad) {
          setSelectedAd(ad);
          setPrompt(buildVideoPrompt(ad, brandProfile, ""));
          setStep("configure");
        }
      } catch {
        // ignore
      }
      sessionStorage.removeItem("generate_context");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Elapsed timer while generating
  useEffect(() => {
    if (!generating) { setElapsedSeconds(0); return; }
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [generating]);

  const enhancePrompt = async () => {
    if (!prompt) return;
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-video-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          brandProfile,
          adContext: selectedAd?.description || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enhancement failed");
      setPrompt(data.prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prompt enhancement failed");
    } finally {
      setEnhancing(false);
    }
  };

  const runGeneration = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError(null);
    setResult(null);
    setStep("generate");

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          thumbnailUrl: selectedAd?.thumbnail || selectedAd?.image || null,
          aspectRatio,
          durationSeconds,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setResult({
        videoDataUrl: `data:${data.data.mimeType};base64,${data.data.videoBase64}`,
        mimeType: data.data.mimeType,
      });
      const now = new Date().toISOString();
      incrementUsage("videosGenerated");
      addVideoGenerationDate(now);
      addGeneratedVideo({
        id: `vid-${Date.now()}`,
        sourceAdId: selectedAd?.id ?? null,
        sourceThumbnailUrl: selectedAd?.thumbnail || selectedAd?.image || null,
        videoDataUrl: `data:${data.data.mimeType};base64,${data.data.videoBase64}`,
        type: "generate-video",
        aspectRatio,
        durationSeconds: Number(durationSeconds),
        createdAt: now,
      });
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video generation failed");
      setStep("configure");
    } finally {
      setGenerating(false);
    }
  };

  const downloadVideo = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.videoDataUrl;
    link.download = "generated-video-ad.mp4";
    link.click();
  };

  const thumbnailUrl = selectedAd?.thumbnail || selectedAd?.image;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          Generate Video Ad
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Duplicate a winning video ad using HeyGen.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm">
        {(["select", "configure", "generate", "review"] as Step[]).map((s, i) => {
          const stepOrder: Step[] = ["select", "configure", "generate", "review"];
          const currentIdx = stepOrder.indexOf(step);
          return (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              <span className={
                step === s
                  ? "text-primary font-medium"
                  : currentIdx > i
                    ? "text-foreground"
                    : "text-muted-foreground"
              }>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step: Select */}
      {step === "select" && (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-muted-foreground">
              Select a competitor video ad from Discover Videos, then come back here to generate.
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/discover-videos"}>
              Go to Discover Videos
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step: Configure */}
      {step === "configure" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reference ad preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Reference Ad</h3>
            {selectedAd?.video ? (
              <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden border border-border bg-muted">
                <video
                  src={selectedAd.video}
                  controls
                  poster={thumbnailUrl ?? undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : thumbnailUrl ? (
              <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden border border-border">
                <Image src={thumbnailUrl} alt="Reference" fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="flex items-center justify-center aspect-[9/16] max-w-xs rounded-lg border border-border bg-muted text-sm text-muted-foreground">
                No preview
              </div>
            )}
            {selectedAd?.name && (
              <p className="text-sm font-medium">{selectedAd.name}</p>
            )}
          </div>

          {/* Settings */}
          <Card>
            <CardHeader><h3 className="text-sm font-semibold">Video Generation Settings</h3></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Aspect Ratio</label>
                <Select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                  <option value="9:16">9:16 — Stories / Reels</option>
                  <option value="16:9">16:9 — Landscape</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Duration</label>
                <Select value={durationSeconds} onChange={(e) => setDurationSeconds(e.target.value)}>
                  <option value="10">10 seconds</option>
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">60 seconds</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Video Prompt</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={enhancePrompt}
                    disabled={enhancing || !prompt}
                    className="h-7 text-xs gap-1.5"
                  >
                    {enhancing ? (
                      <><Spinner className="h-3 w-3" /> Enhancing...</>
                    ) : (
                      <><Sparkles className="h-3 w-3 text-pink-400" /> Enhance with AI</>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Auto-filled from your brand and the reference ad. Use "Enhance with AI" to rewrite it with full brand context and correct spelling.
                </p>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={8}
                  placeholder="Describe the video ad to generate..."
                  className="text-xs leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
                <p>Model: <span className="text-foreground">HeyGen</span></p>
                <p>Brand: <span className="text-foreground">{brandProfile.brandName || "Not set"}</span></p>
                <p className="text-yellow-500">Generation takes 2–3 minutes. Do not close the page.</p>
              </div>

              {!brandProfile.brandName && (
                <p className="text-xs text-yellow-500">
                  Set up your brand in Knowledge Base for better results.
                </p>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive font-medium">Error</p>
                  <p className="text-xs text-destructive/80 mt-1 whitespace-pre-wrap break-all">{error}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setStep("select")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={runGeneration} disabled={!prompt}>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Video
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step: Generating */}
      {step === "generate" && (
        <Card>
          <CardContent className="p-12 flex flex-col items-center gap-4 text-center">
            <Spinner className="h-10 w-10" />
            <h3 className="text-lg font-semibold">Generating your video...</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              HeyGen is creating your video ad. This typically takes 3–7 minutes.
            </p>
            <p className="text-xs text-muted-foreground tabular-nums">
              {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")} elapsed
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step: Review */}
      {step === "review" && result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Reference */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Reference Ad</h3>
              {selectedAd?.video ? (
                <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden border border-border bg-muted">
                  <video
                    src={selectedAd.video}
                    controls
                    poster={thumbnailUrl ?? undefined}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : thumbnailUrl ? (
                <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden border border-border">
                  <Image src={thumbnailUrl} alt="Reference" fill className="object-cover" unoptimized />
                </div>
              ) : null}
            </div>

            {/* Generated video */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Generated Video</h3>
              <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden border border-primary/30 bg-muted">
                <video
                  src={result.videoDataUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button onClick={downloadVideo}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => { setResult(null); setStep("configure"); }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
