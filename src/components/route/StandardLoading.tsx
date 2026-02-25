import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StandardLoading({
  title,
  subtitle,
  filters = false,
  variant,
  cards = 9,
}: {
  title: string;
  subtitle: string;
  filters?: boolean;
  variant: "image" | "text";
  cards?: number;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <div className="text-sm text-muted-foreground">
          <span className="sr-only">{title}</span>
          <span className="sr-only">{subtitle}</span>
        </div>
        <Skeleton className="h-4 w-72" />
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          {filters ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Skeleton className="h-9 w-full sm:w-[220px]" />
              <Skeleton className="h-9 w-full sm:w-[220px]" />
            </div>
          ) : (
            <Skeleton className="h-9 w-40" />
          )}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, idx) =>
          variant === "image" ? (
            <Card key={idx} className="overflow-hidden">
              <Skeleton className="aspect-square w-full rounded-none" />
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ) : (
            <Card key={idx}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
