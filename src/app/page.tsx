"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdCard } from "@/components/dashboard/ad-card";
import { Filters, type FilterValues } from "@/components/dashboard/filters";
import { AnalysisModal } from "@/components/dashboard/analysis-modal";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import type { ForeplayAd } from "@/types/foreplay";
import type { AdAnalysis } from "@/types";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LayoutGrid, Grid2X2, Grid3X3 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { competitors, analyses } = useAppStore();
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    order: "longest_running",
    minDays: "7",
    platform: "",
    niches: [],
  });
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["all"]);
  const [analyzingAd, setAnalyzingAd] = useState<ForeplayAd | null>(null);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [columns, setColumns] = useState<2 | 4 | 8>(4);

  const brandIds =
    selectedCompetitors.includes("all")
      ? competitors.map((c) => c.foreplayBrandId)
      : selectedCompetitors;

  const { data, isLoading, error } = useQuery({
    queryKey: ["brand-ads", brandIds, filters, cursor],
    queryFn: async () => {
      if (brandIds.length === 0) return null;
      const params = new URLSearchParams();
      brandIds.forEach((id) => params.append("brand_ids", id));
      if (filters.minDays) params.set("running_duration_min_days", filters.minDays);
      if (filters.platform) params.append("publisher_platform", filters.platform);
      filters.niches.forEach((n) => params.append("niches", n));
      params.set("order", filters.order);
      params.set("display_format", "image");
      params.set("limit", "30");
      if (cursor) params.set("cursor", String(cursor));

      const res = await fetch(`/api/foreplay/brand-ads?${params}`);
      if (!res.ok) throw new Error("Failed to fetch ads");
      return res.json();
    },
    enabled: brandIds.length > 0,
  });

  const ads: ForeplayAd[] = data?.data ?? [];

  const handleAnalyze = useCallback((ad: ForeplayAd) => {
    setAnalyzingAd(ad);
  }, []);

  const handleDuplicate = useCallback(
    (ad: ForeplayAd, analysis?: AdAnalysis) => {
      const existingAnalysis = analysis || analyses[ad.id];
      sessionStorage.setItem(
        "generate_context",
        JSON.stringify({
          ad,
          analysis: existingAnalysis || null,
          skipAnalysis: !existingAnalysis,
        })
      );
      router.push("/generate");
    },
    [router, analyses]
  );

  const competitorOptions = competitors.map((c) => ({
    id: c.foreplayBrandId,
    name: c.name,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Competitor Ad Feed
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track winning ads from your competitors. Add competitors in the Knowledge Base to get started.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            competitorOptions={competitorOptions}
            selectedCompetitors={selectedCompetitors}
            onCompetitorsChange={setSelectedCompetitors}
          />
        </div>
        <div className="flex items-center gap-1 border border-border rounded-lg p-1 shrink-0">
          {([2, 4, 8] as const).map((n) => {
            const Icon = n === 2 ? Grid2X2 : n === 4 ? LayoutGrid : Grid3X3;
            return (
              <button
                key={n}
                onClick={() => setColumns(n)}
                title={`${n} per row`}
                className={`p-1.5 rounded transition-colors ${
                  columns === n
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </div>

      {competitors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <LayoutDashboard className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">No competitors tracked yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Go to the Knowledge Base to add your brand profile and start tracking competitors.
          </p>
          <Button className="mt-4" onClick={() => router.push("/knowledge-base")}>
            Set Up Knowledge Base
          </Button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-destructive">{(error as Error).message}</p>
        </div>
      ) : ads.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No ads found with current filters.
        </div>
      ) : (
        <>
          <div className={`grid gap-4 ${
            columns === 2 ? "grid-cols-1 sm:grid-cols-2" :
            columns === 8 ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8" :
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}>
            {ads.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                analysisScore={analyses[ad.id]?.overallScore}
                onAnalyze={handleAnalyze}
                onDuplicate={() => handleDuplicate(ad)}
                compact={columns === 8}
              />
            ))}
          </div>

          {data?.metadata?.cursor && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => setCursor(data.metadata.cursor)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}

      {analyzingAd && (
        <AnalysisModal
          ad={analyzingAd}
          onClose={() => setAnalyzingAd(null)}
          onDuplicate={(ad, analysis) => {
            setAnalyzingAd(null);
            handleDuplicate(ad, analysis);
          }}
        />
      )}
    </div>
  );
}
