"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useConfetti } from "@/hooks/use-confetti";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { triggerConfetti } = useConfetti();
  useEffect(() => {
    triggerConfetti();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
      <Card className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Success Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Payment Successful!
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you! Your payment has been processed successfully. Your
              order is now confirmed and we're preparing it.
            </p>
          </div>

          {/* Payment Summary */}
          <div className="w-full rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-green-600">Paid</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">Online Payment</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted-foreground">Confirmation</span>
              <span className="font-medium">Sent to your email</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button className="flex-1">
              <Link href="/orders">View Orders</Link>
            </Button>

            <Button variant="outline" className="flex-1">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            A confirmation email has been sent. You can track your order from
            your account at any time.
          </p>
        </div>
      </Card>
    </div>
  );
}
