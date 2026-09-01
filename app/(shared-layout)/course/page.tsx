import { getAllCourses } from "@/app/data/course/get-all-courses";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getImageUrl } from "@/lib/generate-url";
import { PublicGetCourseCard } from "../_components/PublicGetCourseCard";
import { AdminCourseCardSkeleton } from "@/components/common/AdminCourseCardSkeleton";
import { Suspense } from "react";

// export const revalidate = 0;
export const dynamic = "force-dynamic";


export default async function PublicCoursePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-8 py-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full border bg-card px-4 py-2 text-xs sm:text-sm">
              🚀 Online Learning Course
            </div>

            <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight">
              Learn Skills.
              <span className="text-primary"> Build Your Career.</span>
            </h1>

            <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Discover thousands of public courses from experienced instructors.
              Learn anytime, anywhere, and grow your career.
            </p>

            {/* Search */}
            <div className="mt-4 max-w-3xl md:w-112.5">
              <div className="rounded-2xl border bg-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center relative">
                    <Search className="size-4 text-muted-foreground absolute left-4 space-x-4" />

                    <Input
                      placeholder="Search courses..."
                      className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-md py-5 px-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="container mx-auto max-w-7xl px-2 pb-16 sm:px-4 lg:px-8 md:pb-24">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="mt-2">
            <h2 className="text-2xl font-bold">Popular Courses</h2>

            <p className="text-muted-foreground">
              Most enrolled courses this week.
            </p>
          </div>

          <button className="hidden rounded-lg border px-5 py-2 transition hover:bg-muted md:block">
            Explore All
          </button>
        </div>
        <div>
          <Suspense fallback={<PublicCourseCardSkeletonLayout />}>
            <RenderPublicCourse />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

async function RenderPublicCourse() {
  const course = await getAllCourses();
  const courseData = await Promise.all(
    course.map(async (item) => ({
      ...item,
      imageUrl: await getImageUrl(item.fileKey),
    })),
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {courseData.map((data) => (
        <PublicGetCourseCard
          key={data.id}
          data={data}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
}

function PublicCourseCardSkeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
