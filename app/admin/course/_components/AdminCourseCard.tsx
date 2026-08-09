import { AdminCourseType } from "@/app/data/admin/admin-get-course";
import { Card, CardDescription, CardHeader, CardTitle,CardContent } from "@/components/ui/card";
import { getImageUrl } from "@/lib/generate-url";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

interface CourseCardProps {
  data: AdminCourseType;
}

export async function AdminCourseCard({ data }: CourseCardProps) {
  const imageUrl = await getImageUrl(data.fileKey);
  return (
    <Card className="group relative">
      <Image
        src={imageUrl}
        alt="thumbnail"
        width={600}
        height={400}
        className=" object-cover border dark:bg-primary/10 bg-primary/5 rounded-2xl"
      />
      <Badge variant="outline" className=" absolute top-2 left-1">{data.level}</Badge>
      <CardHeader className="px-2 w-full h-fit">
         <CardTitle  className="font-normal text-base line-clamp-2 text-[16px]">{data.title}</CardTitle>
         <CardDescription className="flex items-center justify-between">
             <div className="flex items-center gap-1">
              <Badge variant="outline">{data.category}</Badge>
              <Badge variant="outline">{data.status}</Badge>
             </div>
             <Badge variant="secondary">{data.duration}hr</Badge>
         </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
           <p className="text-base line-clamp-2">{data.smallDescription}</p>
      </CardContent>
      <CardDescription className="flex items-center justify-between gap-2 px-2">
         <Button variant="secondary">{data.level}</Button>
         <Button variant="secondary">₹ {data.price}</Button>
      </CardDescription> 
    </Card>
  );
}
