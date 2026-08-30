import { courseCategories } from "@/utils/course-category";
import z from "zod";

export const courseLevel = ["Beginner", "Intermidiate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"];

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(100, { message: "title must be at most 100 characters." }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),

  fileKey: z.string().min(1, { message: "File is required" }),

  price: z.number().min(1, { message: "Price must be positive number." }),
  duration: z.number() 
    .min(1, { message: "Duration Must be at least 1 hours" })
    .max(500, { message: "Duration must be at most 100 hours" }),

  level: z.enum(courseLevel, { message: "Level is required" }),
  category: z.enum(courseCategories, {
    message: "Category is required",
  }),
  smallDescription: z
    .string()
    .min(3, { message: "Small Description must be at least 3 characters." })
    .max(200, { message: "Small Description must be at most 100 characters." }),

  slug: z.string().min(3, { message: "Slug must be 3 characters long." }),

  status: z.enum(courseStatus, {
    message: "Status is required",
  }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;


export const chapterSchema = z.object({
   name : z.string().min(3,{message : "Name must be 3 characters long"}).max(50,{message:"Chapater name must be to many long"}),
   courseId :  z.string().uuid({message : "Invalide Course Id"}),
});

export type ChapterSchemaType = z.infer<typeof chapterSchema>;