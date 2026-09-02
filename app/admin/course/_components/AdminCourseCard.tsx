import { AdminCourseType } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/generate-url";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Eye,
  MoreVertical,
  TimerIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
  data: AdminCourseType;
}

export async function AdminCourseCard({ data }: CourseCardProps) {
  const imageUrl = await getImageUrl(data.fileKey);
  return (
    <Card className="group relative flex flex-col h-full">
      <Image
        src={imageUrl}
        alt="thumbnail"
        width={600}
        height={400}
        className=" object-cover h-44 border dark:bg-primary/10 bg-primary/5 rounded-2xl"
      />
      <div className=" absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="secondary" size="icon">
                <MoreVertical className="size-4" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href={`/admin/course/${data.id}/edit`}
                className="flex items-center"
              >
                <Edit className="size-4 mr-2" />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/course/${data.slug.toLocaleLowerCase()}`}
                className="flex items-center"
              >
                <Eye className="size-4 mr-2" />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={buttonVariants({
                variant: "destructive",
                className: "w-full text-start",
              })}
            >
              <Link
                href={`/admin/course/${data.id}/delete`}
                className="flex text-start"
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Badge variant="secondary" className=" absolute top-2 left-1">
        {data.level}
      </Badge>
      <CardHeader className="px-2 w-full space-y-1">
        <CardTitle className="font-normal text-base line-clamp-2 text-[16px]">
          <Link
            href={`/admin/course/${data.id}/edit`}
            className="hover:text-primary/60 hover:underline"
          >
            {data.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <Badge variant="outline">{data.category}</Badge>
          <Badge variant="secondary">
            <TimerIcon className="size-4 rounded-md text-primary bg-primary/10" />
            <span>{data.duration}hr</span>
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <p className="text-base line-clamp-2 text-muted-foreground">
          {data.smallDescription}
        </p>
      </CardContent>
      <CardDescription className="flex items-center justify-between gap-2 px-2 h-fit">
        <Button variant="secondary">{data.status}</Button>
        <Button variant="secondary">₹ {data.price}</Button>
      </CardDescription>
    </Card>
  );
}


