import type { Metadata } from "next";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdFactory AI",
  description: "Discover, analyze, and replicate winning competitor ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 bg-background min-h-screen">
              <TopBar />
              <div className="p-6 max-w-[1600px] mx-auto">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
