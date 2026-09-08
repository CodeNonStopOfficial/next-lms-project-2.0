import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { tryCatch } from "@/hooks/try-catch";
import {createLesson } from "../actions";
import { toast } from "@/components/ui/toast";

export function NewLessonModel({ courseId, chapterId }: { courseId: string , chapterId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  function handleOpenChange(open: boolean) {
    if(!open){
       form.reset();
    }
    setIsOpen(open);
  }
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId : chapterId,
      
    },
  });
  function onSubmit(data: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(data));
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
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.add({
          type: "error",
          title: result.message,
        });
      }
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" className="size-sm gap-2">
            <Plus className="size-4" />
            New Lesson
          </Button>
        }
      />
      <DialogContent className="sm:max-w-106.25 space-y-4">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            We Create Chapter to Describe a One By One Lesson
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Lesson Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Enate a Lesson Name:"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={isPending} type="submit" className="py-4.5 w-full">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Create Lesson
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
