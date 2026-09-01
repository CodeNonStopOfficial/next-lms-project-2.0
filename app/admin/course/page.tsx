import { adminGetCourses } from "@/app/data/admin/admin-get-course";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard} from "./_components/AdminCourseCard";
import { Suspense } from "react";
import { EmptyState } from "@/components/general/EmaptyState";
import { PlusCircle } from "lucide-react";
import { AdminCourseCardSkeleton } from "@/components/common/AdminCourseCardSkeleton";

export default async function CoursePage() {
  return (
    <section className="w-full px-4 md:px-5 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm md:text-2xl font-bold">Course Management</h1>
          <p className="hidden md:block text-primary font-normal">Manage your public and private course catalog from one place.</p>
        </div>
        <Link
          href="/admin/course/create"
          className={buttonVariants({
            variant: "outline",
            className: "px-4 py-4.5 flex gap-2",
          })}
        >
          <PlusCircle className="h-4 w-4" />
          Create Course
        </Link>
      </div>
      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <CourseDataContent />
      </Suspense>
    </section>
  );
}

async function CourseDataContent() {
  const data = await adminGetCourses();
  return (
    <div>
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4">
          {data.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </div>
  );
}


function AdminCourseCardSkeletonLayout(){
    return (
       <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4">
           {
            Array.from({length:8}).map((_,index)=>(
              <AdminCourseCardSkeleton key={index}/>
            ))
           }
       </div>
    )
}

