"use server"

import prisma from "@/lib/db";
import { requiredAdmin } from "./require-admin";

export async function adminGetCourses(){
     await requiredAdmin();
     const data = await prisma.course.findMany({
        orderBy : {
             createdAt : "desc"
        },
        select : {
             id : true,
             title : true,
             slug : true,
             smallDescription : true,
             category : true,
             level:true,
             status:true,
             duration:true,
             price:true,
             fileKey:true
        }
     });
  return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0]