"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

export function EnrollementButton({ courseId }: { courseId: string }) {
  const [isPending, startTransition] = useTransition();
  function onSubmit() {
    startTransition(async () => {
      const { data, error } = await tryCatch(enrollInCourseAction(courseId));
      if (error) {
        toast.add({
          type: "error",
          title: "Unexpected Error Please Try Again",
        });
        return;
      }
      if (data.status === "success") {
        toast.add({
          type: "success",
          title: data?.message,
        });
      } else if (data.status === "error") {
        toast.add({
          type: "error",
          title: data?.message,
        });
      }
    });
  }
  return (
    <Button
      onClick={onSubmit}
      disabled={isPending}
      type="submit"
      className="w-full py-4.5 bg-[#FF7700] hover:bg-[#22C55E]"
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <span>Enroll Now!</span>
        </>
      )}
    </Button>
  );
}
