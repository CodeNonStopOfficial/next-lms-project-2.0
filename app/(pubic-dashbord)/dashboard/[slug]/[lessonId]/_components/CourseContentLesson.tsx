"use client";
import { CourseLessonItemType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rice-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { BookIcon, CheckCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { MarkLessonCompleted } from "../actions";
import { toast } from "@/components/ui/toast";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: CourseLessonItemType;
  imageUrl: string;
  videoUrl: string;
}

export function CourseContentLesson({ data, imageUrl, videoUrl }: iAppProps) {
  const [isPending, startTransiton] = useTransition();
  const { triggerConfetti } = useConfetti();
  function onSubmit() {
    startTransiton(async () => {
      const { data: result, error } = await tryCatch(
        MarkLessonCompleted(data.id, data.chapter.course.slug),
      );
      if (error) {
        toast.add({
          type: "error",
          title: error.message,
        });
        return;
      }
      if (result.status === "success") {
        toast.add({
          type: "success",
          title: result.message,
        });
        triggerConfetti();
      } else if (result.status === "error") {
        toast.add({
          type: "error",
          title: result.message,
        });
      }
    });
  }
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Video */}
      <div className="overflow-hidden rounded-xl border bg-black shadow-sm">
        <div className="aspect-video">
          {videoUrl ? (
            <video
              className="h-full w-full object-contain bg-black"
              controls
              poster={imageUrl}
              preload="metadata"
              playsInline
              src={videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-muted px-6 text-center">
              <BookIcon className="mb-4 h-12 w-12 text-muted-foreground sm:h-16 sm:w-16" />

              <h3 className="text-lg font-semibold">No Video Available</h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                This lesson doesn't have a video yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Header */}
      <div className="flex flex-col gap-5 border-b py-5 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold capitalize leading-tight">
            {data.title}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Complete this lesson to continue.
          </p>
        </div>

        <div>
          {data.lessonProgress.length > 0 ? (
            <Button
              className="w-full lg:w-auto px-4 py-4.5"
              disabled={isPending}
              variant="outline"
              onClick={onSubmit}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Completed
                </>
              )}
            </Button>
          ) : (
            <Button
              className="w-full lg:w-auto px-4 py-4.5"
              disabled={isPending}
              variant="outline"
              onClick={onSubmit}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Mark as Complete
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="py-6 sm:py-8">
        <div className="prose prose-sm max-w-none dark:prose-invert sm:prose-base">
          {data.description && (
            <RenderDescription json={JSON.parse(data.description)} />
          )}
        </div>
      </div>
    </div>
  );
}
