import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { ApiResponse } from "@/lib/type";
import { userAc } from "better-auth/plugins/admin/access";
import { headers } from "next/headers";

export async function checkIfCourseBought(courseId : string):Promise<boolean>{
     const session = await auth.api.getSession({
         headers : await headers(),
     });
     if(!session?.user){
       return false
     }
     const enrollement = await prisma.enrollment.findUnique({
        where : {
            userId_courseId : {
                 userId : session.user.id,
                 courseId : courseId
            }
        },
        select : {
             status : true,
        }
     })
     return enrollement?.status === "Active" ? true : false;
}