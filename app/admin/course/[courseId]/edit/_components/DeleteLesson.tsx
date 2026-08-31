"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../actions";
import { toast } from "@/components/ui/toast";

export function DeleteLesson({
  chapterId,
  courseId,
  lessonId,
}: {
  chapterId: string;
  courseId: string;
  lessonId: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson({ chapterId, courseId, lessonId }),
      );
      if (error) {
        toast.add({
          type: "error",
          title: error.message,
        });
        return;
      }
      if (result?.status === "success") {
        toast.add({
          type: "success",
          title: result.message,
        });
        setOpen(false);
      } else if (result.status === "error") {
        toast.add({
          type: "error",
          title: result.message,
        });
      }
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Trash2 className="size-4" />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            lesson.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={onSubmit}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
