import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="space-y-3">
        <Skeleton className="h-6 w-44" />

        <Skeleton className="h-4 w-64" />
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-70 w-full rounded-lg border bg-muted/20 p-4 sm:h-[340px] lg:h-[400px]">
          {/* Bars */}
          <div className="flex h-full items-end justify-between gap-2">
            <Skeleton className="h-24 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-36 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-28 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-44 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-32 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-56 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-40 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-60 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-48 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-64 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-44 w-4 rounded-md sm:w-5" />
            <Skeleton className="h-56 w-4 rounded-md sm:w-5" />
          </div>

          {/* X-axis labels */}
          <div className="mt-4 flex justify-between">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}