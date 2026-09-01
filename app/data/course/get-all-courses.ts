import prisma from "@/lib/db";

export async function getAllCourses() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      smallDescription: true,
      status: true,
      level: true,
      price: true,
      fileKey: true,
      slug: true,
      duration: true,
      category: true,
      id: true,
    },
  });
  return data;
}

export type PublicGetAllCourseType = Awaited<
  ReturnType<typeof getAllCourses>
>[0];
