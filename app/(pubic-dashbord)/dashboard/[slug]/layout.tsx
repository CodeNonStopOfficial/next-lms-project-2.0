import { ReactNode } from "react";
import CourseSidebarDashboard from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function PublicSlugRoute({
  children,
  params,
}: iAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex h-full flex-col lg:flex-row rounded-lg border overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full border-b lg:w-80 lg:border-b-0 lg:border-r lg:shrink-0">
        <CourseSidebarDashboard course={course.course} />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}