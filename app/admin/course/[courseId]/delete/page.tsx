"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/try-catch";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DeleteCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPanding, startTransition] = useTransition();
  const router = useRouter();
  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));
      if (error) {
        toast.error(error.message);
        return;
      }
      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/course");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Are you sure you want to permanently delete this course?
          </CardTitle>

          <CardDescription>
            This action cannot be undone. The course and all associated data
            will be permanently deleted.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-end gap-3">
          <Link
            href="/admin/course"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button variant="destructive" onClick={onSubmit} disabled={isPanding}>
             {
                 isPanding ? (
                   <>
                    <Loader2 className="size-4 animate-spin"/>
                    <span>Loading...</span>
                   </>
                 ):(
                   <>
                    <span>Delete Course</span>
                   </>
                 )
             }
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
