import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
export async function getNewCourseResently() {
  await requiredAdmin();
  const course = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    select: {
      id: true,
      title: true,
      slug: true,
      smallDescription: true,
      category: true,
      level: true,
      status: true,
      duration: true,
      price: true,
      fileKey: true,
    },
  });
  return course;
}
