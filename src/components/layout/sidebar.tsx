"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  BookOpen,
  BarChart3,
  ChevronDown,
  LayoutGrid,
  ArrowUp,
  AlertCircle,
  Plus,
  Factory,
  Sun,
  Moon,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const mainNav = [
  { href: "/", label: "Ad Feed", icon: LayoutGrid },
  { href: "/discover", label: "Discover", icon: Search },
  { href: "/generate", label: "Generate", icon: ArrowUp },
];

const workspaceNav = [
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const errorCount = useAppStore((s) => s.errorLogs.length);
  const brandName = useAppStore((s) => s.brandProfile.brandName);
  const competitors = useAppStore((s) => s.competitors);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col bg-[#0d0d12] text-white">

      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-indigo-600 shrink-0">
            <Factory className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight">AdFactory AI</span>
        </div>
        <span className="text-[10px] text-muted-foreground bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md">
          v1.0
        </span>
      </div>

      {/* Workspace selector */}
      <div className="px-4 pb-4">
        <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm hover:bg-white/8 transition-colors">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-medium">My Workspace</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-5">

        {/* MAIN */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Main
          </p>
          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* WORKSPACE */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Workspace
          </p>
          <div className="space-y-0.5">
            {workspaceNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}

            {/* Errors */}
            <Link
              href="/errors"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive("/errors")
                  ? "bg-indigo-600/20 text-indigo-400"
                  : errorCount > 0
                    ? "text-orange-400 hover:bg-orange-500/10"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              Errors
              {errorCount > 0 && (
                <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                  {errorCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Pinned Competitors */}
        {competitors.length > 0 && (
          <div className="rounded-xl bg-white/5 border border-white/8 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Pinned Competitors
            </p>
            <div className="space-y-1.5">
              {competitors.map((c) => {
                const p = c.priority ?? 2;
                const dotColor = p === 1 ? "bg-emerald-400" : p === 3 ? "bg-zinc-500" : "bg-yellow-400";
                const label = p === 1 ? "H" : p === 3 ? "L" : "M";
                const labelColor = p === 1 ? "text-emerald-400" : p === 3 ? "text-zinc-500" : "text-yellow-400";
                return (
                  <div key={c.id} className="flex items-center gap-2 text-sm text-white/60">
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotColor}`} />
                    <span className="truncate flex-1">{c.name}</span>
                    <span className={`text-[10px] font-semibold shrink-0 ${labelColor}`}>{label}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/knowledge-base?tab=competitors"
              className="flex items-center gap-1 mt-2.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add competitor
            </Link>
          </div>
        )}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-white/8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-600 text-white font-semibold text-sm shrink-0">
            {brandName ? brandName.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{brandName || "AdFactory AI"}</p>
            <p className="text-[11px] text-white/40">Pro plan</p>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors shrink-0 text-xs"
          >
            {theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            {theme === "dark" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </aside>
  );
}
