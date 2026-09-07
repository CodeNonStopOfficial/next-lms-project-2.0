"use client";
import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar";
import { ChartSpline, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import LessionContent from "./LessionContent";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface iAppProps {
  course: CourseSidebarDataType["course"];
}
export default function CourseSidebarDashboard({ course }: iAppProps) {
  const pathname = usePathname();
  const currenLessonId = pathname.split("/").pop();
  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-[#0B0909] px-2 py-4">
      <div className="border-b border-border">
        <div className="flex items-center gap-1 mb-3 justify-center">
          <div className="flex bg-[#F67D31] text-white size-10 border rounded-lg bg-primar items-center text-center justify-center shrink-0">
            <ChartSpline className="size-5 text-primary " />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base leading-tight truncate">
              {course?.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-1">
              {course.category}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">4/10 Lesson</span>
        </div>
        <div className="w-full overflow-hidden">
          <Progress value={55} className="border rounded border-blue-700" />
          <p className="text-muted-foreground text-xs">50% Completed</p>
        </div>
      </div>
      <div className="py-4 pr-4 space-y-3">
        {course.chapter.map((chapter, index) => (
          <Collapsible
            key={chapter.id}
            defaultOpen={index === 0}
            className="hover:cursor-pointer"
          >
            <CollapsibleTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full p-3 h-auto flex items-center gap-2"
                >
                  <div>
                    <ChevronDown className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold text-sm truncate text-foreground">
                      {chapter.position} : {chapter.title}
                    </p>
                    <p className="text-[14px] text-muted-foreground font-medium">
                      {chapter.lessons.length ?? 0} lessons
                    </p>
                  </div>
                </Button>
              }
            />
            <CollapsibleContent className="mt-3 pl-2 border-l-2 space-y-3">
              {chapter.lessons.map((lesson) => (
                <LessionContent
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                  isActive={currenLessonId === lesson.id}
                  completed = {lesson.lessonProgress.find((progress)=>progress.lessonId === lesson.id)?.completed || false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
