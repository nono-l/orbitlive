import { createFileRoute } from "@tanstack/react-router";
import { CommentBoard } from "@/components/comment-board";
import { EarthScene } from "@/components/earth-scene";
import { EventPanel } from "@/components/event-panel";
import { NavPanel } from "@/components/nav-panel";
import { OrbitHud } from "@/components/orbit-hud";
import { SiteHeader } from "@/components/site-header";
import { SourceList } from "@/components/source-list";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-screen bg-bg" style={{ paddingTop: "var(--chrome-top)" }}>
      <SiteHeader />
      <section className="relative h-[min(64svh,560px)] min-h-[360px] overflow-hidden">
        <EarthScene />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-bg to-transparent" />
        <OrbitHud />
      </section>
      <EventPanel />
      <NavPanel />
      <SourceList />
      <CommentBoard />
      <footer
        className="mx-auto max-w-6xl px-4 pt-4 text-xs text-muted-foreground sm:px-6"
        style={{ paddingBottom: "calc(var(--chrome-bottom) + 3rem)" }}
      >
        OrbitLive · 開場 2026-09-20 13:00 JST · 太陽日 86400 秒 / 恒星日 86164.0905 秒
      </footer>
    </main>
  );
}
