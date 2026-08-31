import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Thumbnail */}
      <Skeleton className="aspect-video w-full rounded-none bg-gray-200 dark:bg-gray-800" />

      <div className="space-y-4 p-4">
        {/* Category */}
        <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-800" />

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-5 w-2/3 bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
        {/* Progress */}
        <div className="space-y-2">
          <Skeleton className="h-2 w-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}