"use server";
import { requiredAdmin } from "@/app/data/admin/require-admin";
import arject, {fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { CourseStatus } from "@/lib/generated/prisma/client";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { request } from "@arcjet/next";

const aj = arject
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function CreateCourseAction(
  values: CourseSchemaType,
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
    //course validation form zod
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: "Course Schema Validation Error",
      };
    }
    await prisma.course.create({
      data: {
        ...validation.data,
        status: validation.data.status as CourseStatus,
        userId: session?.user.id as string,
      },
    });
    return {
      status: "success",
      message: "Course Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Internal Course Creation Error",
    };
  }
}
