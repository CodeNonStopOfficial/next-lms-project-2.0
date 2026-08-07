"use server"
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { CourseStatus } from "@/lib/generated/prisma/client";
import { ApiResponse } from "@/lib/type";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { headers } from "next/headers";

export async function CreateCourseAction(values:CourseSchemaType):Promise<ApiResponse>{
    try {
        //get user data
        const session = await auth.api.getSession({
            headers : await headers()
        })

        //course validation form zod
        const validation = courseSchema.safeParse(values);
        if(!validation.success){
            return {
                 status : "error",
                 message : "Course Schema Validation Error"
            }
        }
        const data = await prisma.course.create({
            data : {
                 ...validation.data,
                 status : validation.data.status as CourseStatus,
                 userId : session?.user.id as string,
            }
        });
        return {
             status : "success",
             message : "Course Created Successfully"
        }
    } catch  {
        return {
             status : "error",
             message : "Internal Course Creation Error"
        }
    }
}