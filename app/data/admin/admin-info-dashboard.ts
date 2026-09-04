import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
export async function adminGetInfoDashboard() {
  await requiredAdmin();

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
      prisma.course.count(),
      prisma.lesson.count(),
    ]);
  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
}
