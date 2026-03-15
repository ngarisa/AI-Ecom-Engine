"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ForeplayAd } from "@/types/foreplay";
import { formatDate } from "@/lib/utils";
import { Sparkles, Search, ExternalLink, Clock, Play, Video } from "lucide-react";

interface AdCardProps {
  ad: ForeplayAd;
  analysisScore?: number;
  onAnalyze: (ad: ForeplayAd) => void;
  onDuplicate: (ad: ForeplayAd) => void;
  onImageToVideo?: (ad: ForeplayAd) => void;
  compact?: boolean;
}

export function AdCard({ ad, analysisScore, onAnalyze, onDuplicate, onImageToVideo, compact }: AdCardProps) {
  const days = ad.running_duration?.days ?? 0;
  const imageUrl = ad.image || ad.thumbnail;
  const isVideo = !!ad.video;
  const [playing, setPlaying] = useState(false);

  return (
    <Card className="overflow-hidden group hover:border-primary/30 transition-colors">
      {/* Media */}
      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
        {playing && ad.video ? (
          <video
            src={ad.video}
            autoPlay
            controls
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={() => setPlaying(false)}
          />
        ) : imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={ad.name || "Ad"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            {isVideo && (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Play video"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/90 shadow-lg">
                  <Play className="h-5 w-5 text-black fill-black ml-0.5" />
                </div>
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No image
          </div>
        )}

        {/* Image-only overlay — keeps existing hover behaviour for non-video ads */}
        {!isVideo && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Score badge */}
        {analysisScore !== undefined && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {analysisScore}/10
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {ad.avatar && (
              <Image
                src={ad.avatar}
                alt=""
                width={20}
                height={20}
                className="rounded-full shrink-0"
                unoptimized
              />
            )}
            <span className="text-sm font-medium truncate">
              {ad.name || "Unknown Brand"}
            </span>
          </div>
          {ad.link_url && (
            <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </a>
          )}
        </div>

        {ad.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {ad.description}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {days}d running
          </span>
          {ad.started_running && (
            <span>{formatDate(ad.started_running)}</span>
          )}
        </div>

        {ad.niches?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {ad.niches.slice(0, 2).map((niche) => (
              <Badge key={niche} variant="outline" className="text-[10px]">
                {niche}
              </Badge>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex gap-2">
            {compact ? (
              <>
                <button
                  onClick={() => onAnalyze(ad)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Search className="h-3 w-3" />
                  Analyze
                </button>
                <button
                  onClick={() => onDuplicate(ad)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Sparkles className="h-3 w-3" />
                  Duplicate
                </button>
              </>
            ) : (
              <>
                <Button size="sm" className="flex-1" onClick={() => onAnalyze(ad)}>
                  <Search className="h-3.5 w-3.5 mr-1.5" />
                  Analyze
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => onDuplicate(ad)}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Duplicate
                </Button>
              </>
            )}
          </div>
          {onImageToVideo && !isVideo && (
            <Button
              size="sm"
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => onImageToVideo(ad)}
            >
              <Video className="h-3.5 w-3.5 mr-1.5" />
              Image to Video
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
