"use server"

import { requireUser } from "@/app/data/user/required-user";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function MarkLessonCompleted(lessonId :string ,slug :string):Promise<ApiResponse>{
      const user = await requireUser();

      try {
         await prisma.lessonProgress.upsert({
             where : {
                 userId_lessonId : {
                     userId : user.id,
                     lessonId : lessonId
                 }
             },
             update : {
                 completed  : true
             },
             create : {
                 lessonId : lessonId,
                 userId : user.id,
                 completed : true,
             }
         });
         revalidatePath(`/dashboard/${slug}`);
         return {
             status : "success",
             message : "Progress Updated and Completed"
         }
      } catch {
         return {
             status : "error",
             message : "Failed to Mark Lesson"
         }
      }
}