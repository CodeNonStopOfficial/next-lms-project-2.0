"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
import { CourseStatus } from "@/lib/generated/prisma/client";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const session = await requiredAdmin();
  try {
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
        status :result.data.status as CourseStatus
      },
    });

    return {
         status : 'success',
         message : "Course Updated Successfully"
    }
  } catch (error) {
     return {
         status : "error",
         message : "Failed to Update course"
     }
  }
}
