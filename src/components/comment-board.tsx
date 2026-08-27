import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { addComment, deleteComment, listComments, type CommentRow } from "@/lib/comments";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";

function formatWhen(iso: string) {
  const ms = Date.parse(iso.includes("T") ? iso.replace(" ", "T") : iso);
  if (Number.isNaN(ms)) return iso;
  return new Intl.DateTimeFormat("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ms);
}

export function CommentBoard() {
  const { user, isPending } = useCurrentUserState();
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const rows = await listComments();
    setComments(rows);
  }

  useEffect(() => {
    let cancelled = false;
    listComments()
      .then((rows) => {
        if (!cancelled) setComments(rows);
      })
      .catch(() => {
        if (!cancelled) setError("コメントを読めませんでした");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    const next = body.trim();
    if (!next) return;
    setBusy(true);
    setError(null);
    try {
      const created = await addComment({ data: { body: next } });
      setComments((prev) => [created, ...prev]);
      setBody("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message === "Unauthorized") {
        setError("サインインが必要です");
      } else {
        setError("投稿できませんでした");
      }
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: number) {
    setBusy(true);
    setError(null);
    try {
      await deleteComment({ data: { id } });
      setComments((prev) => prev.filter((row) => row.id !== id));
    } catch {
      setError("削除できませんでした");
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="notes" className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Notes
      </p>
      <h2 className="mt-2 font-display text-3xl tracking-[var(--tracking-tight)]">
        コメント
      </h2>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Google または X でサインインすると、その身分で残せる。未確定情報の断定はしない。
      </p>

      <div className="mt-6 rounded-[var(--radius-xl)] border border-border bg-card p-5 sm:p-7">
        {isPending ? (
          <div className="h-24 animate-pulse rounded-[var(--radius-md)] bg-surface-2" />
        ) : user ? (
          <form onSubmit={onSubmit} className="space-y-3">
            <label htmlFor="note" className="block text-xs font-medium text-muted-foreground">
              {user.displayName ?? "あなた"} として書く
            </label>
            <textarea
              id="note"
              value={body}
              maxLength={400}
              rows={4}
              onChange={(e) => setBody(e.target.value)}
              placeholder="開場までのメモ、移動、未確認の質問…"
              className="w-full resize-y rounded-[var(--radius-md)] border border-border bg-bg px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs tabular-nums text-muted-foreground">{body.length}/400</span>
              <Button type="submit" disabled={busy || body.trim().length === 0}>
                {busy ? "送信中" : "投稿する"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">コメントするには身分をリンクしてください。</p>
            <Button asChild>
              <Link to="/login">Google / X で続ける</Link>
            </Button>
          </div>
        )}
        {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
      </div>

      <ul className="mt-6 space-y-3">
        {loading ? (
          <li className="h-20 animate-pulse rounded-[var(--radius-lg)] bg-card" />
        ) : comments.length === 0 ? (
          <li className="rounded-[var(--radius-lg)] border border-border px-5 py-8 text-sm text-muted-foreground">
            まだコメントはない。最初の軌道メモを残せる。
          </li>
        ) : (
          comments.map((row) => {
            const mine = user?.id === row.userId;
            return (
              <li
                key={row.id}
                className="rounded-[var(--radius-lg)] border border-border bg-card px-5 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {row.authorImage ? (
                      <img
                        src={row.authorImage}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-xs">
                        {row.authorName.slice(0, 1)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{row.authorName}</p>
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {formatWhen(row.createdAt)}
                      </p>
                    </div>
                  </div>
                  {mine ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void onDelete(row.id)}
                      className="h-11 text-xs text-muted-foreground hover:text-foreground"
                    >
                      削除
                    </button>
                  ) : null}
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-[var(--leading-normal)] text-foreground">
                  {row.body}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
