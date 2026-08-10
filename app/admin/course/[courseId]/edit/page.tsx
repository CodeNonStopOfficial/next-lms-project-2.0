import { adminGetCoursePer } from "@/app/data/admin/admin-getper-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseFrom } from "./_components/EditCourseForm";
import { CourseStucture } from "./_components/CourseStucture";

export default async function CourseEditPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const data = await adminGetCoursePer(courseId);
  return (
    <div className="px-4 py-5">
      <h1 className="text-[22px] font-bold mb-4">
        Edit Course : <span>{data.title}</span>
      </h1>
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit Basic Information About the Course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseFrom course={data} />
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit Course Structure Information About the Course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStucture/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
