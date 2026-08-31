"use server";

import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId : string) : Promise<ApiResponse> {
    await requiredAdmin();

    try {
        await prisma.course.delete({
             where : {
                 id : courseId
             }
        });
        revalidatePath("/admin/course");
        return {
             status : "success",
             message : "Course Deleted Successfully"
        }
    } catch {
        return {
             status : "error",
             message : "Intenal Failed to Delete Course"
        }
    }
}

