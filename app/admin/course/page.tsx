import { adminGetCourses } from "@/app/data/admin/admin-get-course";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function CoursePage() {
  const data = await adminGetCourses();
  return (
    <section className="w-full px-4 md:px-5 py-4">
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
      <div>
        {
          data.map((course)=>(
             <AdminCourseCard key={course.id} data={course}/>
          ))
        }
      </div>
    </section>
  );
}
