import "server-only"
import { requiredAdmin } from "./require-admin";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCoursePer(id:string){
     await requiredAdmin();

     const data = await prisma.course.findUnique({
         where : {
            id : id,
         },
         select:{
            id:true,
            title : true,
            smallDescription : true,
            description : true,
            fileKey : true,
            price : true,
            duration : true,
            level : true,
            slug :true,
            category : true
         }
     });
     if(!data){
         return notFound()
     }
     return data;
}