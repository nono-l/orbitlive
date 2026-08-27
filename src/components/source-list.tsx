import { SOURCES } from "@/lib/event";

export function SourceList() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Sources
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-[var(--tracking-tight)]">
        根拠にした投稿
      </h2>
      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {SOURCES.map((post) => (
          <li key={post.id}>
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-[var(--radius-lg)] border border-border bg-card p-5 transition-colors duration-[var(--motion-quick)] hover:bg-surface-2"
            >
              <p className="text-xs tabular-nums text-muted-foreground">
                {post.date} · {post.author} · {post.id}
              </p>
              <p className="mt-2 text-sm leading-[var(--leading-normal)] text-foreground">
                {post.summary}
              </p>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
