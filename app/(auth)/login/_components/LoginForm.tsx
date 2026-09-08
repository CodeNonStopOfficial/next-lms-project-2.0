"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.add({
              type: "success",
              title: "Account Access Successfully",
            });
          },
          onError: () => {
            toast.add({
              type: "error",
              title: "Internal Server Error..!",
            });
          },
        },
      });
    });
  }
  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.add({
              type: "success",
              title: "Account Access Successfully",
            });
          },
          onError: () => {
            toast.add({
              type: "error",
              title: "Internal Server Error...!",
            });
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.add({
              type: "success",
              title: "Email Send Successfully",
            });
            router.push(`/verify-request?email=${email}`)
          },
          onError: (error) => {
            toast.add({
              type: "error",
              title: error.error.message,
            });
          },
        },
      });
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription className="text-[16px] text-muted-foreground font-normal">
          Sign in to continue your learning journey and access your courses,
          assignments, and certificates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={signInWithGithub}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-5 text-base font-medium text-[17px]"
          >
            {githubPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <FaSquareGithub className="size-5" />
                Continue with GitHub
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-5 text-base font-medium text-[17px]"
          >
            {googlePending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <FcGoogle className="size-5" />
                Continue with Google
              </>
            )}
          </Button>
        </div>
        <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or Continue With Email
          </span>
        </div>
        <div className="gird gap-3 space-y-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="py-5"
              required
            />
          </div>
          <Button
            type="button"
            disabled={emailPending}
            onClick={signInWithEmail}
            className="w-full py-5 text-[18px] font-normal"
          >
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send size={5} />
                Login With Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm font-medium items-center justify-center text-center">
          <h1 className="text-muted-foreground">
            Login with Email and Social Provider and{" "}
            <em className="text-blue-700 hover:underline">
              <Link href="/policy" className="hover:text-red-600">
                Privacy Policy
              </Link>
            </em>{" "}
            To Create a Account and Access Account...!
          </h1>
        </div>
      </CardFooter>
    </Card>
  );
}
