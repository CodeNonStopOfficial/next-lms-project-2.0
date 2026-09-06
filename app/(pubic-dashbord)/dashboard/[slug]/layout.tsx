import { ReactNode } from "react";
import CourseSidebarDashboard from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar";

interface iAppProps {
     params : Promise<{slug:string}>
     children : ReactNode
}

export default async function PublicSlugRoute({children,params}:iAppProps){
    const {slug} = await params;
    const course = await getCourseSidebarData(slug);
     return (
         <div className="flex flex-1 border rounded">
              <div className="w-80 border-r border-border shrink-0">
                  <CourseSidebarDashboard course={course.course} />
              </div>
               <div className="flex-1 overflow-hidden">
                  {children}
               </div>
         </div>
     )
}