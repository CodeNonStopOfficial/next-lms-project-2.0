"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";

export async function upadateLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  await requiredAdmin();
  try {
    const result = lessonSchema.safeParse(values);
    if (!result.success) {
      return {
        status: "error",
        message: "Invalide Data To Update Lesson",
      };
    }
    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: result.data.name,
        thumbnailKey: result.data.thumbnailKey,
        videoKey: result.data.videoKey,
        description: result.data.description,
      },
    });
    return {
      status: "success",
      message: "Lesson Updated Successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Update Lesson Failed Internal Error",
    };
  }
}
