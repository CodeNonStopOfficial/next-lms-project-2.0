import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {TimerIcon} from "lucide-react";
import { PublicGetAllCourseType } from "@/app/data/course/get-all-courses";

interface iAppProps {
  data: PublicGetAllCourseType;
  imageUrl: string;
}
export function PublicGetCourseCard({ data, imageUrl }: iAppProps) {
  return (
    <Card className="group relative flex flex-col h-full" key={data.id}>
      <Image
        src={imageUrl}
        alt="thumbnail"
        width={600}
        height={400}
        priority
        className=" object-cover h-44 border dark:bg-primary/10 bg-primary/5 rounded-2xl"
      />
      <Badge variant="secondary" className=" absolute top-2 left-1">
        {data.level}
      </Badge>
      <CardHeader className="px-2 w-full space-y-1">
        <CardTitle className="font-normal text-base line-clamp-2 text-[16px]">
          <Link
            href={`/course/${data.slug}`}
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
        <Link
          href={`/course/${data.slug}`}
          className={buttonVariants({
            variant: "secondary",
            className: "hover:underline",
          })}
        >
          Learn More
        </Link>
        <Button variant="secondary">₹ {data.price}</Button>
      </CardDescription>
    </Card>
  );
}
