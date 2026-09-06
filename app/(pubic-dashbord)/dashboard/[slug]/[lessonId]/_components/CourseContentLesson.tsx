import { CourseLessonItemType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rice-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface iAppProps {
  data: CourseLessonItemType;
  imageUrl : string;
  videoUrl :string;
}

export function CourseContentLesson({ data,imageUrl,videoUrl }: iAppProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Video */}
      <div className="w-full overflow-hidden rounded-xl border bg-black">
        <div className="aspect-video">
          <video
            controls
            poster={imageUrl}
            className="h-full w-full"
            src={videoUrl} 
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 border-b py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold capitalize">{data.title}</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete this lesson to continue.
          </p>
        </div>

        <Button>
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as Complete
        </Button>
      </div>

      {/* Description */}
      <div className="prose prose-sm dark:prose-invert max-w-none py-8">
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}