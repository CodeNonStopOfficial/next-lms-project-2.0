import { requiredAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/db";
export async function adminCartEnrollemtDataStatus(){
     await requiredAdmin();
     const thirtyDaysAgo = new Date();
     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate()-30);
     const enrollments = await prisma.enrollment.findMany({
        where : {
             createdAt : {
                gte : thirtyDaysAgo
             }
        },
        select : {
            createdAt : true
        },
        orderBy : {
            createdAt : 'asc'
        }
     });
     const lastThirtyDay : {date : string; enrollment : number}[] = [];
     for(let i=29; i>=0; i--){
        const date = new Date();
        date.setDate(date.getDate()- i);
        lastThirtyDay.push({
            date : date.toISOString().split("T")[0],
            enrollment : 0
        })
     };
     enrollments.forEach((enrollement)=>{
        const enrollmentDate = enrollement.createdAt.toISOString().split("T")[0];
        const dayIndex = lastThirtyDay.findIndex((day)=>day.date === enrollmentDate);
        if(dayIndex !== -1){
             lastThirtyDay[dayIndex].enrollment++;
        }
     });

     return lastThirtyDay;
}