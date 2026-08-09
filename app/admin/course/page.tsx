import { adminGetCourses } from "@/app/data/admin/admin-get-course";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/common/DashboardSkeleton";

export default async function CoursePage() {
  return (
    <section className="w-full px-4 md:px-5 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm md:text-2xl font-bold">
          Your All Public and Private Courses!
        </h1>
        <Link
          href="/admin/course/create"
          className={buttonVariants({
            variant: "outline",
            className: "px-6 py-4.5",
          })}
        >
          Create Course
        </Link>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <CourseDataContent />
      </Suspense>
    </section>
  );
}

async function CourseDataContent() {
  const data = await adminGetCourses();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
