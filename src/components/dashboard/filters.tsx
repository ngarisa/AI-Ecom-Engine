"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface FilterValues {
  search: string;
  order: string;
  minDays: string;
  platform: string;
  niches: string[];
}

interface FiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  competitorOptions?: { id: string; name: string }[];
  selectedCompetitors?: string[];
  onCompetitorsChange?: (ids: string[]) => void;
}

const ORDER_OPTIONS = [
  { value: "longest_running", label: "Longest Running" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const NICHE_OPTIONS = [
  "All Niches",
  "beauty",
  "fashion",
  "health",
  "food",
  "technology",
  "travel",
  "fitness",
  "home",
  "pets",
  "finance",
  "education",
];

export function Filters({
  filters,
  onFiltersChange,
  competitorOptions,
  selectedCompetitors = ["all"],
  onCompetitorsChange,
}: FiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [nicheOpen, setNicheOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const nicheRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false);
      }
      if (nicheRef.current && !nicheRef.current.contains(e.target as Node)) {
        setNicheOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNicheToggle = (niche: string) => {
    if (niche === "") {
      onFiltersChange({ ...filters, niches: [] });
      return;
    }
    const already = filters.niches.includes(niche);
    const next = already ? filters.niches.filter((n) => n !== niche) : [...filters.niches, niche];
    onFiltersChange({ ...filters, niches: next });
  };

  const nicheLabel = () => {
    if (filters.niches.length === 0) return "All Niches";
    if (filters.niches.length === 1)
      return filters.niches[0].charAt(0).toUpperCase() + filters.niches[0].slice(1);
    return `${filters.niches.length} selected`;
  };

  const handleCompetitorToggle = (id: string) => {
    if (id === "all") {
      onCompetitorsChange?.(["all"]);
      return;
    }
    const withoutAll = selectedCompetitors.filter((s) => s !== "all");
    const alreadySelected = withoutAll.includes(id);
    const next = alreadySelected
      ? withoutAll.filter((s) => s !== id)
      : [...withoutAll, id];
    onCompetitorsChange?.(next.length === 0 ? ["all"] : next);
  };

  const competitorLabel = () => {
    if (selectedCompetitors.includes("all") || selectedCompetitors.length === 0)
      return "All Competitors";
    if (selectedCompetitors.length === 1) {
      return competitorOptions?.find((c) => c.id === selectedCompetitors[0])?.name ?? "1 selected";
    }
    return `${selectedCompetitors.length} selected`;
  };

  const update = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ads..."
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            className="pl-9"
          />
        </div>

        {competitorOptions && competitorOptions.length > 0 && (
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center justify-between gap-2 w-48 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="truncate">{competitorLabel()}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>

            {dropdownOpen && (
              <div className="absolute z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                {/* All Competitors */}
                <button
                  type="button"
                  onClick={() => handleCompetitorToggle("all")}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                >
                  <Check
                    className={`h-4 w-4 shrink-0 text-black ${selectedCompetitors.includes("all") ? "opacity-100" : "opacity-0"}`}
                  />
                  All Competitors
                </button>

                <div className="border-t border-gray-200" />

                {competitorOptions.map((c) => {
                  const isSelected = selectedCompetitors.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCompetitorToggle(c.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 text-black ${isSelected ? "opacity-100" : "opacity-0"}`}
                      />
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div ref={orderRef} className="relative">
          <button
            type="button"
            onClick={() => setOrderOpen((o) => !o)}
            className="flex items-center justify-between gap-2 w-44 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <span className="truncate">
              {ORDER_OPTIONS.find((o) => o.value === filters.order)?.label ?? "Sort"}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>

          {orderOpen && (
            <div className="absolute z-50 mt-1 w-44 rounded-md border border-gray-200 bg-white shadow-lg">
              {ORDER_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { update("order", o.value); setOrderOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                >
                  <Check
                    className={`h-4 w-4 shrink-0 text-black ${filters.order === o.value ? "opacity-100" : "opacity-0"}`}
                  />
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-1.5" />
          Filters
        </Button>
      </div>

      {expanded && (
        <div className="flex items-center gap-3 pl-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Min days:</span>
            <Select
              value={filters.minDays}
              onChange={(e) => update("minDays", e.target.value)}
              className="w-28"
            >
              <option value="">Any</option>
              <option value="7">7+ days</option>
              <option value="14">14+ days</option>
              <option value="30">30+ days</option>
              <option value="60">60+ days</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Platform:</span>
            <Select
              value={filters.platform}
              onChange={(e) => update("platform", e.target.value)}
              className="w-32"
            >
              <option value="">All</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Niche:</span>
            <div ref={nicheRef} className="relative">
              <button
                type="button"
                onClick={() => setNicheOpen((o) => !o)}
                className="flex items-center justify-between gap-2 w-36 h-9 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <span className="truncate">{nicheLabel()}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>

              {nicheOpen && (
                <div className="absolute z-50 mt-1 w-36 rounded-md border border-gray-200 bg-white shadow-lg max-h-64 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => handleNicheToggle("")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                  >
                    <Check
                      className={`h-4 w-4 shrink-0 text-black ${filters.niches.length === 0 ? "opacity-100" : "opacity-0"}`}
                    />
                    All Niches
                  </button>
                  <div className="border-t border-gray-200" />
                  {NICHE_OPTIONS.slice(1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleNicheToggle(n)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-black hover:bg-gray-100 text-left"
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 text-black ${filters.niches.includes(n) ? "opacity-100" : "opacity-0"}`}
                      />
                      {n.charAt(0).toUpperCase() + n.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
