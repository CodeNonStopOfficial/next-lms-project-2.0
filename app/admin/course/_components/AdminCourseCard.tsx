import { AdminCourseType } from "@/app/data/admin/admin-get-course";
import { Card } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-contructor";
import Image from "next/image";

interface CourseCardProps {
  data : AdminCourseType;
}

export function AdminCourseCard({data}:CourseCardProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative">
      <div></div>
      <Image src={thumbnailUrl} alt="thumbnail-url" width={600} height={400} />
    </Card>
  );
}
