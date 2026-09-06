import "server-only";
import { requireUser } from "../user/required-user";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";


export async function getLessonContentById(lessonId: string) {
  const user = await requireUser();
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      chapter: {
        select: {
          courseId: true,
        },
      },
    },
  });

  if (!lesson) {
    return notFound();
  }
  const enrollement = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: lesson.chapter.courseId,
      },
    },
    select : {
         status : true,
    }
  });

  if(!enrollement ||  enrollement?.status !== "Active"){
     return notFound();
  }

  return lesson;
}
export type CourseLessonItemType = Awaited<ReturnType<typeof getLessonContentById>>
