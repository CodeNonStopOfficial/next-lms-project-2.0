import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET : z.string().min(1),
    BETTER_AUTH_URL : z.url(),
    GITHUB_CLIENT_ID  : z.string(),
    GITHUB_SECRET_KEY : z.string().min(1),
    RESEND_SECRET_KEY : z.string().min(1),
    GOOGLE_AUTH_CLIENT_ID : z.string(),
    GOOGLE_AUTH_SECRET_KEY : z.string().min(1),
    ARCJET_KEY : z.string().min(1),

  },
  experimental__runtimeEnv: {}
});