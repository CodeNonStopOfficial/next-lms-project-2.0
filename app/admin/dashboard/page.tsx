import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { Suspense } from "react";
import Loading from "./loading";
import { ChartSkeleton } from "@/components/common/ChartSkeleton";
import { adminCartEnrollemtDataStatus } from "@/app/data/admin/admin-chart-data-status";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getNewCourseResently } from "@/app/data/admin/admin-get-new-course";
import { EmptyState } from "@/components/general/EmaptyState";
import { AdminCourseCard } from "@/app/admin/course/_components/AdminCourseCard";

export default async function AdminDashboardPage() {
  const enrollData = await adminCartEnrollemtDataStatus();
  return (
    <div className="flex flex-1 flex-col px-4 lg:px-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4">
          <Suspense fallback={<Loading />}>
            <SectionCards />
          </Suspense>
          <div>
            <Suspense fallback={<ChartSkeleton />}>
              <ChartAreaInteractive data={enrollData} />
            </Suspense>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Course</h2>
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "px-4 py-4",
              })}
              href="/admin/course"
            >
              Recent Course
            </Link>
          </div>
        </div>
        <div>
          <Suspense fallback={<ChartSkeleton />}>
            <RenderResentCourses />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function RenderResentCourses() {
  const data = await getNewCourseResently();
  if (data.length === 0) {
    return (
      <EmptyState
        title="Create New Course"
        description="You do not have any course . create some course"
        showButton={false}
      />
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
