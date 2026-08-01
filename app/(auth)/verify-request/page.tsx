"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const [otp, setOtp] = useState("");
  const [otpPending, startOtpTrasition] = useTransition();
  const isOtpCompleted = otp.length === 6;

  function verificationOtp() {
    startOtpTrasition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.add({
              type: "success",
              title: "Email Verified",
            });
            router.push("/");
          },
          onError: () => {
            toast.add({
              type: "error",
              title: "Email Verification Error",
            });
          },
        },
      });
    });
  }
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please Check Your Email</CardTitle>
        <CardDescription>
          We have sent a verification email code to your email address Please
          check your email and enter otp to verification email...!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot className="px-5 py-5 text-2xl" index={0} />
              <InputOTPSlot className="px-5 py-5 text-2xl" index={1} />
              <InputOTPSlot className="px-5 py-5 text-2xl" index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className="px-5 py-5 text-2xl" index={3} />
              <InputOTPSlot className="px-5 py-5 text-2xl" index={4} />
              <InputOTPSlot className="px-5 py-5 text-2xl" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p>Enter the 6 Digit OTP Send to Your Email</p>
        </div>
        <Button
          type="button"
          disabled={otpPending || !isOtpCompleted}
          onClick={verificationOtp}
          className="w-full py-4.5 text-[16px]"
        >
          {otpPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>Verify Request</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
