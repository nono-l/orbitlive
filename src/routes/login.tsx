import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

const LABELS: Record<string, string> = {
  Google: "Google で続ける",
  X: "X で続ける",
};

function Login() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-bg px-6 text-foreground"
      style={{ paddingTop: "var(--chrome-top)", paddingBottom: "var(--chrome-bottom)" }}
    >
      <div className="w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-card p-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          OrbitLive
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-[var(--tracking-tight)]">
          身分をリンクする
        </h1>
        <p className="mt-2 text-sm leading-[var(--leading-normal)] text-muted-foreground">
          コメントは Google または X のアカウントに紐づく。
        </p>
        <div className="mt-6 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                {LABELS[p.label] ?? `Continue with ${p.label}`}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Sign-in is disabled.</p>
          )}
        </div>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center text-sm text-muted-foreground hover:text-foreground"
        >
          地球に戻る
        </Link>
      </div>
    </main>
  );
}
