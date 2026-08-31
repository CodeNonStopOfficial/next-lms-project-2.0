import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
     courseId : string,
     chapterId : string,
     lessonId : string
}>
export default async function LessonIdEditPage({params}:{params:Params}){
    const {courseId,chapterId,lessonId} = await params;
    const lesson = await adminGetLesson(lessonId);
     return (
         <main>
            <LessonForm chapterId={chapterId} data={lesson} courseId={courseId}/>
         </main>
     )
}