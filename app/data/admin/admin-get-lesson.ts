"use server"

import prisma from "@/lib/db";
import { requiredAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetLesson(id:string){
     await requiredAdmin();
     const data = await prisma.lesson.findUnique({
        where : {
            id : id
        },
        select : {
             title : true,
             videoKey :true,
             thumbnailKey : true,
             description : true,
             id : true,
             position : true
        }
     });
    if(!data){
         return notFound();
    };
    return data;
}

export type GetLessonDataType = Awaited<ReturnType<typeof adminGetLesson>>;