"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import arject, {fixedWindow } from "@/lib/arject";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arject
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
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
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    revalidatePath("/admin/course");
    return {
      status: "success",
      message: "Course Deleted Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Intenal Failed to Delete Course",
    };
  }
}
