"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import type { ForeplayAd } from "@/types/foreplay";
import { X, Download, RefreshCw, Video, Sparkles } from "lucide-react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";

interface ImageToVideoModalProps {
  ad: ForeplayAd;
  onClose: () => void;
}

function buildPrompt(ad: ForeplayAd, brandProfile: { brandName: string; brandVoice: string; targetAudience: string; usps: string[]; brandColors: { primary: string; secondary: string; accent: string }; niche: string }): string {
  const brandName = brandProfile.brandName || "the brand";
  const parts: string[] = [
    `Animate this static advertisement image into a natural-looking video ad for "${brandName}".`,
    `Structure: 1) Start by bringing the image to life with subtle motion — zoom, pan, or parallax. 2) Transition into showcasing the product with the brand name "${brandName}" clearly visible on screen. 3) End with a smooth conclusion showing "${brandName}" prominently — do NOT cut off abruptly, the video must have a complete, natural ending.`,
  ];

  if (ad.description) parts.push(`Ad context: ${ad.description}.`);

  const niche = ad.niches?.length > 0 ? ad.niches.join(", ") : brandProfile.niche;
  if (niche) parts.push(`Product category: ${niche}.`);

  if (brandProfile.brandVoice) parts.push(`Brand tone: ${brandProfile.brandVoice}.`);
  if (brandProfile.targetAudience) parts.push(`Target audience: ${brandProfile.targetAudience}.`);
  if (brandProfile.usps.length > 0) parts.push(`Highlight these selling points: ${brandProfile.usps.slice(0, 2).join(", ")}.`);

  parts.push(
    `Brand colors: primary ${brandProfile.brandColors.primary}, accent ${brandProfile.brandColors.accent}.`,
    `The brand name "${brandName}" must appear on screen at least at the start and end.`,
    `Style: cinematic, polished, natural. Smooth camera movements, natural lighting, fluid transitions. Should look like a real professional ad, not AI-generated.`,
  );

  return parts.join(" ");
}

export function ImageToVideoModal({ ad, onClose }: ImageToVideoModalProps) {
  const { brandProfile, incrementUsage, addGeneratedVideo, addVideoGenerationDate } = useAppStore();
  const imageUrl = ad.image || ad.thumbnail;
  const [prompt, setPrompt] = useState(() => buildPrompt(ad, brandProfile));
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [durationSeconds, setDurationSeconds] = useState(8);
  const [generating, setGenerating] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoDataUrl, setVideoDataUrl] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

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
          adContext: ad.description || undefined,
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
    if (!imageUrl) return;
    setGenerating(true);
    setError(null);
    setVideoDataUrl(null);
    setElapsedSeconds(0);

    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);

    try {
      const res = await fetch("/api/image-to-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          imageUrl,
          brandName: brandProfile.brandName || "",
          brandLogoDataUrl: brandProfile.logoFiles[0]?.url || "",
          aspectRatio,
          durationSeconds,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setVideoDataUrl(`data:${data.data.mimeType};base64,${data.data.videoBase64}`);
      const now = new Date().toISOString();
      incrementUsage("videosGenerated");
      addVideoGenerationDate(now);
      addGeneratedVideo({
        id: `vid-${Date.now()}`,
        sourceAdId: ad.id,
        sourceThumbnailUrl: imageUrl ?? null,
        videoDataUrl: `data:${data.data.mimeType};base64,${data.data.videoBase64}`,
        type: "image-to-video",
        aspectRatio,
        durationSeconds,
        createdAt: now,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      clearInterval(timer);
      setGenerating(false);
    }
  };

  const download = () => {
    if (!videoDataUrl) return;
    const link = document.createElement("a");
    link.href = videoDataUrl;
    link.download = `image-to-video-${ad.id}.mp4`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Image to Video</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: source image + result */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Source Image</p>
              {imageUrl ? (
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border bg-muted">
                  <Image src={imageUrl} alt="Source ad" fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-[4/5] rounded-lg border border-border bg-muted text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            {videoDataUrl && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Generated Video</p>
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden border border-primary/40 bg-muted">
                  <video
                    src={videoDataUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <Button className="mt-2 w-full" onClick={download}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Video
                </Button>
              </div>
            )}
          </div>

          {/* Right: settings */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Aspect Ratio</label>
              <Select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                <option value="9:16">9:16 — Stories / Reels</option>
                <option value="16:9">16:9 — Landscape</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Duration</label>
              <Select value={String(durationSeconds)} onChange={(e) => setDurationSeconds(Number(e.target.value))}>
                <option value="4">4 seconds</option>
                <option value="6">6 seconds</option>
                <option value="8">8 seconds</option>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Prompt</label>
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
                Describe how you want the image animated. Use "Enhance with AI" to rewrite it with your brand context and correct spelling.
              </p>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={7}
                className="text-xs leading-relaxed"
              />
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-3 text-xs text-muted-foreground space-y-1">
                <p>Model: <span className="text-foreground">Seedance 1 Pro</span></p>
                <p className="text-yellow-500">Generation takes 2–5 minutes.</p>
              </CardContent>
            </Card>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">Error</p>
                <p className="text-xs text-destructive/80 mt-1 whitespace-pre-wrap break-all">{error}</p>
              </div>
            )}

            {generating ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <Spinner className="h-8 w-8" />
                <p className="text-sm text-muted-foreground">Generating video...</p>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")} elapsed
                </p>
              </div>
            ) : (
              <div className="flex gap-2">
                {videoDataUrl && (
                  <Button variant="outline" onClick={runGeneration}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                )}
                <Button onClick={runGeneration} disabled={!imageUrl || !prompt} className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  {videoDataUrl ? "Generate New" : "Generate Video"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
