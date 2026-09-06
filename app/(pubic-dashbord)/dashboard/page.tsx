import { getEnrolledCourse } from "@/app/data/user/get-enrolled-course";
import { getAllCourses } from "@/app/data/course/get-all-courses";
import { EmptyState } from "@/components/general/EmaptyState";
import { PublicGetCourseCard } from "@/app/(shared-layout)/_components/PublicGetCourseCard";
import { getImageUrl } from "@/lib/generate-url";
import { CourseCardPublic } from "./[slug]/_components/CourseCardPublic";

export default async function PublicDashboardPage() {
  const [courseData, enrolledCourse] = await Promise.all([
    getAllCourses(),
    getEnrolledCourse(),
  ]);

  const courses = await Promise.all(
    courseData.map(async (item) => ({
      ...item,
      imageUrl: await getImageUrl(item.fileKey),
    })),
  );

  const enrolledCourses = enrolledCourse.map((item) => item.course);

  const availableCourses = courses.filter(
    (course) => !enrolledCourses.some((enrolled) => enrolled.id === course.id),
  );

  return (
    <div className="space-y-12 px-2 md:px-4 py-4 lg:px-6">
      <section className="rounded-3xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold md:text-5xl">Welcome Back 👋</h1>

        <p className="mt-3 max-w-2xl text-indigo-100">
          Continue learning from your enrolled courses or explore new courses to
          improve your skills.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            <p className="text-sm text-indigo-100">Enrolled Courses</p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-3xl font-bold">{availableCourses.length}</p>
            <p className="text-sm text-indigo-100">Available Courses</p>
          </div>
        </div>
      </section>

      {/* Enrolled Courses */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">My Courses</h2>

          <p className="text-muted-foreground">
            Continue learning from your purchased courses.
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Course Purchased"
            description="You haven't purchased any courses yet."
            showButton={true}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {enrolledCourses.map((course) => (
                <CourseCardPublic
                  key={course.id}
                  data={course}
                  imageUrl={
                    courses.find((c) => c.id === course.id)?.imageUrl ?? ""
                  }
                />
            ))}
          </div>
        )}
      </section>

      {/* Available Courses */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Explore More Courses</h2>

          <p className="text-muted-foreground">
            Discover new courses and continue growing your skills.
          </p>
        </div>

        {availableCourses.length === 0 ? (
          <EmptyState
            title="You're All Caught Up!"
            description="You've already enrolled in every available course."
            showButton={false}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableCourses.map((course) => (
              <PublicGetCourseCard
                key={course.id}
                data={course}
                imageUrl={course.imageUrl}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
