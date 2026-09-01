import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function getSingleCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      title: true,
      smallDescription: true,
      description : true,
      status: true,
      level: true,
      price: true,
      fileKey: true,
      duration: true,
      category: true,
      id: true,
      chapter : {
         select : {
            title : true,
            id : true,
            lessons : {
                 select : {
                     id : true,
                     title : true
                 },
                 orderBy : {
                     position : "asc"
                 },

            }
         },
         orderBy : {
            position : "asc"
         }
      }
    },
  });
  if(!course){
     return notFound();
  }
  return course;
}
