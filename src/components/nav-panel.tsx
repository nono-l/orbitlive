import { useState } from "react";
import { DEPARTURES, LAST_MILE, STATION_ARRIVE_LABEL, VENUE_ARRIVE_LABEL, WALK_MINUTES } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function NavPanel() {
  const [active, setActive] = useState(DEPARTURES[0].id);
  const current = DEPARTURES.find((d) => d.id === active) ?? DEPARTURES[0];

  return (
    <section id="navigate" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-4 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Navigate
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-[var(--tracking-tight)]">
        当日ナビ
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-[var(--leading-normal)] text-muted-foreground">
        日付は 2026年9月20日。会場着 {VENUE_ARRIVE_LABEL}（開場の5分後）。Google / Apple / Yahoo
        は住所まで。NAVITIME と乗換案内は最寄り金山 {STATION_ARRIVE_LABEL} 着（徒歩{WALK_MINUTES}分を引いた時刻）。
      </p>

      <div className="mt-6 rounded-[var(--radius-xl)] border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {DEPARTURES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              className={cn(
                "h-11 min-w-20 rounded-[var(--radius-sm)] px-4 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                d.id === active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              )}
            >
              {d.city}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {current.city}発 · {current.station}駅 · {current.hint}
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {current.links.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border px-4 text-sm text-foreground transition-colors duration-[var(--motion-quick)] hover:bg-surface-2"
              >
                <span>{link.label}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{link.arrive}</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Last mile
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          金山駅 {STATION_ARRIVE_LABEL} 着 → 徒歩約{WALK_MINUTES}分 → 会場 {VENUE_ARRIVE_LABEL}
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {LAST_MILE.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-between rounded-[var(--radius-md)] border border-border px-4 text-sm text-foreground transition-colors duration-[var(--motion-quick)] hover:bg-surface-2"
              >
                <span>{link.label}</span>
                <span className="text-xs text-muted-foreground">{link.arrive}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
