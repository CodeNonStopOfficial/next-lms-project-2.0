"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import arject, { detectBot, fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { CourseStatus } from "@/lib/generated/prisma/client";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";
import { chapterSchema, ChapterSchemaType } from "@/lib/zodSchema";

const aj = arject
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
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
         data : {
           title : result.data.name,
           courseId : result.data.courseId,
           position : (maxPos?.position ?? 0) + 1
         }
      });
    });
    revalidatePath(`/admin/course/${result.data.courseId}/edit`);
    return {
       status : "success",
       message : "Chapter Created Successfully"
    }
  } catch {
    return {
      status: "error",
      message: "Internal Server Error to Create Chapter",
    };
  }
}
