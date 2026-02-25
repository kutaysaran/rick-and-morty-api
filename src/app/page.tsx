import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-xl space-y-6 rounded-lg border bg-card p-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Next.js 15 Starter</h1>
          <p className="text-sm text-muted-foreground">
            App Router + TypeScript strict + Tailwind + shadcn/ui + React Query + Zustand + nuqs.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="sm:w-auto" type="button">
            shadcn/ui is wired
          </Button>
          <Button className="sm:w-auto" type="button" variant="outline">
            Ready for features
          </Button>
        </div>
      </div>
    </div>
  );
}
