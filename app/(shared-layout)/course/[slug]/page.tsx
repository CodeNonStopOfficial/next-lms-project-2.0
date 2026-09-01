import Image from "next/image";
import { getSingleCourse } from "@/app/data/course/get-course";
import { getImageUrl } from "@/lib/generate-url";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RenderDescription } from "@/components/rice-text-editor/RenderDescription";

type Params = Promise<{ slug: string }>;
export default async function PublicSingleCourse({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const course = await getSingleCourse(slug);
  const imageUrl = await getImageUrl(course.fileKey);
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5 mb-20">
      <div className="order-1 lg:col-span-2">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 rounded-2xl dark:bg-gray-900">
          <Image
            src={imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {course.smallDescription}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 py-4">
          <Button variant="outline">
            <span>{course.category}</span>
          </Button>
          <Button variant="outline">
            <span>{course.level}</span>
          </Button>
          <Button variant="outline">
            <span>{course.status}</span>
          </Button>
          <Button variant="outline">
            <span>{course.duration} Hourse</span>
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="space-y-6 border bg-gray-100 dark:bg-[#171717] rounded px-4 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Course Description
          </h1>
          <RenderDescription json={JSON.parse(course.description)} />
        </div>
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Course Content
            </h1>
            <div>
              {course.chapter.length} Chapters |
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0,
              ) || 0}
              Lesson
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
