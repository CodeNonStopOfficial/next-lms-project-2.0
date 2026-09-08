import { getLessonContentById } from "@/app/data/course/get-lesson-content";
import { CourseContentLesson } from "./_components/CourseContentLesson";
import { getImageUrl } from "@/lib/generate-url";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";

type Params = Promise<{ lessonId: string }>;

export default async function LessionContentPage({
  params,
}: {
  params: Params;
}) {
  const { lessonId } = await params;

  return (
     <Suspense fallback={<LessonSkeleton/>}>
       <LessonContentLoader lessonId={lessonId}/>
     </Suspense>
  );
}

async function LessonContentLoader({lessonId}:{lessonId:string}){
  const data = await getLessonContentById(lessonId);
  const imageUrl =  await getImageUrl(data.thumbnailKey ?? "");
  const videoUrl =  await getImageUrl(data.videoKey ?? "");
  return (
    <div className="max-w-full px-4 py-4">
      <CourseContentLesson data={data} imageUrl={imageUrl} videoUrl={videoUrl} />
    </div>
  )
}