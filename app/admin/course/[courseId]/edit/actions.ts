"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import arject, {fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { CourseStatus } from "@/lib/generated/prisma/client";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType, lessonSchema } from "@/lib/zodSchema";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";
import { chapterSchema, ChapterSchemaType } from "@/lib/zodSchema";

const aj = arject
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const session = await requiredAdmin();
  try {
    const req = await request();
    const desision = await aj.protect(req, {
      fingerprint: session.user.id,
    });
    if (desision.isDenied()) {
      if (desision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been blocked due to the Rate limiting",
        };
      } else {
        return {
          status: "error",
          message: "You are a bot,if you make mistake contact our support",
        };
      }
    }

    const result = courseSchema.safeParse(data);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalide Data",
      };
    }
    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        fileKey: result.data.fileKey,
        price: result.data.price,
        duration: result.data.duration,
        level: result.data.level,
        category: result.data.category,
        smallDescription: result.data.smallDescription,
        slug: result.data.slug,
        status: result.data.status as CourseStatus,
      },
    });

    return {
      status: "success",
      message: "Course Updated Successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to Update course",
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: {
    id: string;
    position: number;
  }[],
  courseId: string,
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    if (!lessons || lessons.length === 0) {
      return {
        status: "error",
        message: "No Lesson Provided for reordering",
      };
    }
    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId: chapterId,
        },
        data: {
          position: lesson.position,
        },
      }),
    );
    await prisma.$transaction(updates);
    revalidatePath(`/admin/course/${courseId}/edit`);
    return {
      status: "success",
      message: "Lesson Reordered Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to reorder lesson",
    };
  }
}

export async function reorderChapter(
  courseId: string,
  chapters: { id: string; position: number }[],
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    if (!chapters || chapters.length === 0) {
      return {
        status: "error",
        message: "No Chapater Provided For Reordering",
      };
    }
    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      }),
    );
    await prisma.$transaction(updates);
    revalidatePath(`/admin/course/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter Reordered Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Error Chapter Reorded",
    };
  }
}

export async function createChapter(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const result = chapterSchema.safeParse(values);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalide Data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.chapter.findFirst({
        where: {
          courseId: result.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.chapter.create({
        data: {
          title: result.data.name,
          courseId: result.data.courseId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/course/${result.data.courseId}/edit`);
    return {
      status: "success",
      message: "Chapter Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Server Error to Create Chapter",
    };
  }
}



export async function createLesson(
  values: ChapterSchemaType,
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const result = lessonSchema.safeParse(values);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalide Data",
      };
    }
    await prisma.$transaction(async (tx) => {
      const maxPos = await tx.lesson.findFirst({
        where: {
          chapterId: result.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });
      await tx.lesson.create({
        data: {
          title: result.data.name,
          description: result.data.description,
          videoKey: result.data.videoKey,
          thumbnailKey: result.data.thumbnailKey,
          chapterId: result.data.chapterId,
          position: (maxPos?.position ?? 0) + 1,
        },
      });
    });
    revalidatePath(`/admin/course/${result.data.courseId}/edit`);
    return {
      status: "success",
      message: "Lesson Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Server Error to Create Lesson",
    };
  }
}

export async function deleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const chpaterWithLesson = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        lessons: {
          orderBy: {
            position: "desc",
          },
          select: {
            id: true,
            position: true,
          },
        },
      },
    });
    if (!chpaterWithLesson) {
      return {
        status: "error",
        message: "Chapter Not Found",
      };
    }
    const lesson = chpaterWithLesson.lessons;
    const lessonToDelete = lesson.find((lesson)=>lesson.id === lessonId);
     if (!lessonToDelete) {
      return {
        status: "error",
        message: "Lesson not found in this chapter",
      };
    }
    const remainingLesson = lesson.filter((lesson)=>lesson.id !== lessonId);
    const updates = remainingLesson.map((lesson,index)=>{
       return prisma.lesson.update({
        where : {
          id: lesson.id
        },
        data : {position:index+1}
       })
    });
    await prisma.$transaction([...updates,prisma.lesson.delete({
      where : {
         id : lessonId,
         chapterId : chapterId
      }
    })])
    revalidatePath(`/admin/course/${courseId}/edit`);
    return {
      status: "success",
      message: "Lesson Deleted Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to Delete Lesson",
    };
  }
}

export async function deleteChapter({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const courseWithChapter = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        chapter : {
           orderBy : {
             position : "asc"
           },
           select : {
            id : true,
            position :true
           }
        }
      },
    });
    if (!courseWithChapter) {
      return {
        status: "error",
        message: "Course Not Found",
      };
    }
    const chapter = courseWithChapter.chapter;
    const chapterToDelete = chapter.find((chapter)=>chapter.id === chapterId);
     if (!chapterToDelete) {
      return {
        status: "error",
        message: "Chapter not found in this course",
      };
    }
    const remainingChapter = chapter.filter((chapter)=>chapter.id !== chapterId);
    const updates = remainingChapter.map((chapter,index)=>{
       return prisma.chapter.update({
        where : {
          id: chapter.id
        },
        data : {position:index+1}
       })
    });
    await prisma.$transaction([...updates,prisma.chapter.delete({
      where : {
         id : chapterId,
      }
    })])
    revalidatePath(`/admin/course/${courseId}/edit`);
    return {
      status: "success",
      message: "Chapter Deleted Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to Delete Lesson",
    };
  }
}