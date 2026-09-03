import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
export async function adminGetInfoDashboard() {
  const session = await requiredAdmin();

  const course = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      //total signup
      prisma.user.count(),
      //total customer real user
      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
        },
      }),
      prisma.course.count({
        where: {
          userId: session.user?.id,
        },
      }),
      prisma.lesson.count({
        where: {
          courseId: course.id,
        },
      }),
    ]);
  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
