import { Suspense } from "react";
import { VerifyForm } from "./_components/VerifyForm";

export default function VerifyEmailOtpPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyForm/>
      </Suspense>
    </>
  );
}
