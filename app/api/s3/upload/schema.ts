import { z } from "zod";

export const fileUploadeSchema = z.object({
    fileName : z.string().min(1,{message : "File name is required"}),
    contentType: z.string().min(1,{message:"Content type is reqiured"}),
    size : z.number().min(1,{message:"Size is Required"}),
    isImage : z.boolean(),
})