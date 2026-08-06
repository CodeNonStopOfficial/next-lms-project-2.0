import "server-only"
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_SECRET_KEY,
    },
    google: {
      clientId: env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_AUTH_SECRET_KEY,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
         await resend.emails.send({
          from: "CodeNonstop-LMS <onboarding@resend.dev>",
          to: [email],
          subject: "CodeNonstop-LMS - Verify Your Email",
          html : `<p>Your OTP is <strong>${otp}</strong> </p>`
        });
      },
    }),
  ],
});
