"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar";
import { useMemo } from "react";

interface IAppProps {
  course: CourseSidebarDataType["course"];
}

interface CourseProgressResult {
  totalLessons: number;
  completedLesson: number;
  progressPercentage: number;
}

export function useCourseProgress({
  course,
}: IAppProps): CourseProgressResult {
  return useMemo(() => {
    let totalLessons = 0;
    let completedLesson = 0;

    course.chapter.forEach((chapter) => {
      chapter.lessons.forEach((lesson) => {
        totalLessons++;

        const isCompleted = lesson.lessonProgress.some(
          (progress) =>
            progress.lessonId === lesson.id && progress.completed
        );

        if (isCompleted) {
          completedLesson++;
        }
      });
    });

    const progressPercentage =
      totalLessons > 0
        ? Math.round((completedLesson / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      completedLesson,
      progressPercentage,
    };
  }, [course]);
}