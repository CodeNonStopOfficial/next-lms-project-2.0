import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar";
import { redirect } from "next/navigation";

interface iAppProps {
  params: Promise<{ slug: string }>
}

export default async function CourseSlugPage({params}:iAppProps) {
  const {slug} = await params;
  const {course} = await getCourseSidebarData(slug);
  const firstChapter = course.chapter[0];
  const firstLesson = firstChapter.lessons[0];
  if(firstLesson){
     redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      {/* Video */}
      <div className="overflow-hidden rounded-xl border bg-black shadow">
        <div className="aspect-video flex items-center justify-center bg-gray-900">
          <span className="text-lg font-medium text-white">
            🎥 Demo Video Player
          </span>
        </div>
      </div>
    </div>
  );
}
