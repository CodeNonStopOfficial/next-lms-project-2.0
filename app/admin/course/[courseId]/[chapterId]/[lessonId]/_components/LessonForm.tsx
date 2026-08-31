"use client";

import { GetLessonDataType } from "@/app/data/admin/admin-get-lesson";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
const RiceTextEditor = dynamic(
  () => import("@/components/rice-text-editor/Editor"),
  {
    ssr: false,
    loading: () => <p>Loading....</p>,
  },
);
import { Uploader } from "@/components/file-uploader/Uploader";
import { useTransition } from "react";
import { upadateLesson } from "../actions";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface iAppProps {
  data: GetLessonDataType;
  chapterId: string;
  courseId: string;
}
export function LessonForm({ chapterId, data, courseId }: iAppProps) {
  const router = useRouter();
  const [isPending,startTransition] = useTransition();
  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: data.title,
      courseId: courseId,
      chapterId: chapterId,
      description: data.description ?? undefined,
      thumbnailKey: data.thumbnailKey ?? undefined,
      videoKey: data.videoKey ?? undefined,
    },
  });
  function onSubmit(values: LessonSchemaType) {
    startTransition(async()=>{
        const {data:result,error} = await tryCatch(upadateLesson(values,data.id));
        if(error){
          toast.add({
             type : "error",
             title : error.message
          });
          return
        }
        if(result.status === "success"){
           toast.add({
             type : "success",
             title : result.message
           });
           router.push(`/admin/course/${courseId}/edit`);
        }else if(result.status === "error"){
             toast.add({
             type : "error",
             title : result.message
           })
        }
    })
  }
  return (
    <div className="max-w-full px-2 md:px-4 py-5 space-y-6">
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "flex justify-center gap-2",
        })}
        href={`/admin/course/${courseId}/edit`}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Lesson Configration Page</CardTitle>
          <CardDescription>
            This Page to Edit Lesson To Upload File and Edit Content To Manage
            to Course Management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Lesson Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter a Lesson Name:"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <RiceTextEditor field={field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="thumbnailKey"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Lesson Thumbnails
                  </FieldLabel>
                  <Uploader onChange={field.onChange} value={field.value} fileTypeAccepted="image" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="videoKey"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Lesson Video</FieldLabel>
                  <Uploader onChange={field.onChange} value={field.value} fileTypeAccepted="video" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {
                 isPending ? (
                    <>
                     <Loader2 className="size-4 animate-spin"/>
                     <span>Loading...</span>
                    </>
                 ) : (
                   <>
                    <Plus className="size-4"/>
                    <span>Update Lesson</span>
                   </>
                 )
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
