import "server-only";
import { requireUser } from "./required-user";
import prisma from "@/lib/db";

export async function getEnrolledCourse() {
  const user = await requireUser();
  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          smallDescription: true,
          status: true,
          fileKey: true,
          slug: true,
          duration: true,
          level: true,
          price: true,
          category: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress : {
                     where : {
                       userId : user.id,
                     },
                     select : {
                      id : true,
                      completed : true,
                      lessonId: true
                     }
                  }
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}
