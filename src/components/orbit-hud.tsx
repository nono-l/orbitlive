import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { snapshotAt, type RotationSnapshot } from "@/lib/event";

function formatRot(n: number) {
  return n.toLocaleString("ja-JP", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function OrbitHud() {
  const [snap, setSnap] = useState<RotationSnapshot | null>(null);

  useEffect(() => {
    const tick = () => setSnap(snapshotAt(Date.now()));
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-4 sm:px-8">
      <div
        className="mx-auto w-full max-w-6xl"
        style={{ paddingBottom: "var(--chrome-bottom)" }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {snap?.elapsed ? "ライブ開場からの回転" : "開場まで、地球は"}
        </p>
        <p className="mt-2 font-display text-[clamp(2.4rem,9vw,5rem)] leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-foreground tabular-nums">
          {snap ? formatRot(snap.solar) : "—.—"}
          <span className="ml-2 align-middle text-[0.28em] font-sans font-medium tracking-normal text-muted-foreground">
            太陽日
          </span>
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted-foreground tabular-nums">
          <span>恒星日 {snap ? formatRot(snap.sidereal) : "—.—"}</span>
          <span>
            {snap?.elapsed ? "経過" : "残り"} {snap ? snap.days : "—"}日{" "}
            {snap ? `${pad(snap.hours)}:${pad(snap.minutes)}:${pad(snap.seconds)}` : "--:--:--"}
          </span>
          <span>基準 OPEN 13:00 JST</span>
        </div>
        <a
          href="#facts"
          className="pointer-events-auto mt-5 mb-3 inline-flex h-11 items-center gap-2 text-sm text-foreground"
        >
          <ChevronDown className="size-4" aria-hidden />
          下に事実・ナビ・コメント
        </a>
      </div>
    </div>
  );
}
