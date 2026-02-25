import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link className="text-sm font-semibold tracking-tight" href="/characters">
          Rick & Morty
        </Link>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/characters">Characters</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/episodes">Episodes</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
