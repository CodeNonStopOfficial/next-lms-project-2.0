import { z } from "zod";

export const fileUploadedSchema = z.object({
  fileName: z.string().min(1, { message: "FileName is Required" }),
  contentType: z.string().min(1, { message: "Content Type is Required" }),
  size: z.number().min(1, { message: "File Size is Required" }),
  isImage: z.boolean(),
});