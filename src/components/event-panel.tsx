import { EVENT, FACTS, STILL_MISSING } from "@/lib/event";
import { cn } from "@/lib/utils";

export function EventPanel() {
  return (
    <section
      id="facts"
      className="mx-auto grid w-full max-w-6xl scroll-mt-28 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <article className="rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:p-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Confirmed facts
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-[var(--tracking-tight)] text-foreground">
          {EVENT.title}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-[var(--leading-normal)] text-muted-foreground">
          X上の告知から、行動できる粒度まで降りてきた情報だけをここに置く。感情の投稿と数字の投稿は分けて読む。
        </p>
        <dl className="mt-6 divide-y divide-border">
          {FACTS.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-medium text-muted-foreground">{fact.label}</dt>
              <dd className="text-sm text-foreground">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
                <span
                  className={cn(
                    "ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide",
                    fact.status === "confirmed"
                      ? "bg-surface-2 text-muted-foreground"
                      : "border border-border text-muted-foreground",
                  )}
                >
                  {fact.status === "confirmed" ? "確定" : "未確定"}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </article>

      <aside className="flex flex-col gap-6">
        <article className="rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Still missing
          </p>
          <h3 className="mt-2 font-display text-2xl tracking-[var(--tracking-tight)]">
            まだ乗っていない核
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-[var(--leading-normal)] text-muted-foreground">
            {STILL_MISSING.map((item) => (
              <li key={item} className="border-l border-border pl-3">
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:p-7">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Venue
          </p>
          <h3 className="mt-2 font-display text-2xl tracking-[var(--tracking-tight)]">
            {EVENT.venue}
          </h3>
          <p className="mt-3 text-sm leading-[var(--leading-normal)] text-muted-foreground">
            {EVENT.address}
            <br />
            {EVENT.access}
            <br />
            {EVENT.notes}
          </p>
          <a
            href={EVENT.venueUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 items-center text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            会場サイト
          </a>
        </article>
      </aside>
    </section>
  );
}
