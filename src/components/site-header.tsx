import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-11 w-28 animate-pulse rounded-[var(--radius-sm)] bg-surface-2" />;
  }
  return (
    <>
      {user ? (
        <SignedIn>
          <div className="max-w-[14rem] truncate text-foreground [&_button]:text-muted-foreground">
            <UserButton />
          </div>
        </SignedIn>
      ) : (
        <SignedOut>
          <Link
            to="/login"
            className="inline-flex h-11 items-center rounded-[var(--radius-sm)] border border-border px-4 text-sm font-medium text-foreground transition-opacity duration-[var(--motion-quick)] hover:bg-surface-2"
          >
            サインイン
          </Link>
        </SignedOut>
      )}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky z-20 border-b border-border bg-bg/90 px-4 py-2 backdrop-blur-sm sm:px-6"
      style={{ top: "var(--chrome-top)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link to="/" className="font-display text-lg tracking-[var(--tracking-tight)] text-foreground">
          OrbitLive
        </Link>
        <nav className="flex items-center gap-2">
          <a
            href="#facts"
            className="hidden h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            事実
          </a>
          <a
            href="#navigate"
            className="hidden h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            ナビ
          </a>
          <a
            href="#notes"
            className="hidden h-11 items-center px-2 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            コメント
          </a>
          <AuthSlot />
        </nav>
      </div>
    </header>
  );
}
