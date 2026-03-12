"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ForeplayAd } from "@/types/foreplay";
import { formatDate } from "@/lib/utils";
import { Sparkles, Search, ExternalLink, Clock } from "lucide-react";

interface AdCardProps {
  ad: ForeplayAd;
  analysisScore?: number;
  onAnalyze: (ad: ForeplayAd) => void;
  onDuplicate: (ad: ForeplayAd) => void;
  compact?: boolean;
}

export function AdCard({ ad, analysisScore, onAnalyze, onDuplicate, compact }: AdCardProps) {
  const days = ad.running_duration?.days ?? 0;
  const imageUrl = ad.image || ad.thumbnail;

  return (
    <Card className="overflow-hidden group hover:border-primary/30 transition-colors">
      {/* Image */}
      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={ad.name || "Ad"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No image
          </div>
        )}

        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          {compact ? (
            <>
              <button
                onClick={() => onAnalyze(ad)}
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Analyze"
              >
                <Search className="h-3 w-3" />
              </button>
              <button
                onClick={() => onDuplicate(ad)}
                className="p-1.5 rounded-lg bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors"
                title="Duplicate"
              >
                <Sparkles className="h-3 w-3" />
              </button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={() => onAnalyze(ad)}>
                <Search className="h-3.5 w-3.5 mr-1.5" />
                Analyze
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDuplicate(ad)} className="bg-black/50">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Duplicate
              </Button>
            </>
          )}
        </div>

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
      </div>
    </Card>
  );
}
