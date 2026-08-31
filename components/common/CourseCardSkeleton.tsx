export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Course Thumbnail */}
      <div className="aspect-video w-full animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        {/* Category */}
        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

        {/* Course Title */}
        <div className="space-y-2">
          <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}