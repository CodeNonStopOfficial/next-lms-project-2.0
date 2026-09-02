"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import arject, {fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";

const aj = arject
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function upadateLesson(
  values: LessonSchemaType,
  lessonId: string,
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
