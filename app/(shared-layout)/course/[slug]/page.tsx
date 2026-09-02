import Image from "next/image";
import { getSingleCourse } from "@/app/data/course/get-course";
import { getImageUrl } from "@/lib/generate-url";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RenderDescription } from "@/components/rice-text-editor/RenderDescription";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  ChartBarStacked,
  ChartSpline,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  Play,
} from "lucide-react";
import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import Link from "next/link";
import { EnrollementButton } from "./_components/EnrollementButton";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;
export default async function PublicSingleCourse({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const course = await getSingleCourse(slug);
  const imageUrl = await getImageUrl(course.fileKey);
  const isEnrolled = await checkIfCourseBought(course.id);

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
        {/* Chapter Lesson Content  */}
        <div className="mt-8 space-y-6 border bg-gray-100 dark:bg-[#262626] rounded md:px-4 px-2 py-4">
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Course Content
            </h1>
            <div>
              {course.chapter.length} Chapters |{" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0,
              ) || 0}{" "}
              Lessons
            </div>
          </div>
          <div className="space-y-4">
            {course.chapter.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden transition-all duration-200  gap-0">
                  <CollapsibleTrigger>
                    <div className="max-w-full">
                      <CardContent className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <p className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h3 className="md:text-[16px] text-sm font-semibold text-left">
                                {chapter.title}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 justify-center">
                            <div className="hidden md:block">
                              <p className="text-sm text-muted-foreground text-left">
                                {chapter.lessons.length} lesson
                                {chapter.lessons.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                            <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border bg-muted/20">
                      <div className="p-4 pt-2 space-y-3">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 justify-center border px-4 py-2 rounded bg-white dark:bg-[#262626]"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border border-primary/20">
                              <Play className="size-4 text-muted-foreground group-hover:text-primary transition-colors " />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {lesson.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
      {/* Subscription Card  */}
      <div className="order-2 lg:col-span-1">
        <div className=" sticky top-20">
          <Card className="py-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl font-bold text-blue-700">
                  Price :{" "}
                </span>
                <span className="text-xl font-bold text-[#16A34A]">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(course.price)}
                </span>
              </div>
              <div className="mb-6 space-y-3 rounded-lg bg-muted p-4 mt-4">
                <h4 className="font-medium">What You Will Get</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex border items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <ClockIcon className="size-4 text-[#ee9417]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration</p>
                      <p className="text-sm text-muted-foreground">
                        {course.duration} hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex border items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <ChartSpline className="size-4 text-[#ee9417]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Defficulty Level</p>
                      <p className="text-sm text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex border items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <ChartBarStacked className="size-4 text-[#ee9417]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex border items-center size-8 justify-center rounded-full bg-primary/10 text-primary">
                      <BadgeCheck className="size-4 text-[#ee9417]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Chapter</p>
                      <p className="text-sm text-muted-foreground">
                        {course.chapter.length} Chapters |{" "}
                        {course.chapter.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0,
                        ) || 0}{" "}
                        Lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6 space-y-2">
                <h4>This Course Includes:</h4>
                <ul className="flex items-start flex-col gap-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Full lifetime Access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Access on Mobile and Destop</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className=" rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-3" />
                    </div>
                    <span>Certificate of Completion</span>
                  </li>
                </ul>
              </div>
              {isEnrolled ? (
                <Link href="/dashboard">Watch Course</Link>
              ) : (
                <EnrollementButton courseId={course.id} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
