import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Cancelled
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Your payment was cancelled and no charges were made to your
              account. You can try again whenever you're ready.
            </p>
          </div>

          {/* Info Box */}
          <div className="w-full rounded-lg border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              If money has been deducted from your account, it is usually
              refunded automatically within <span className="font-medium">3–7 business days</span>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button className="flex-1">
              <Link href="/checkout">
                Try Again
              </Link>
            </Button>

            <Button variant="outline" className="flex-1">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            Need help? Contact our support team if the problem persists.
          </p>
        </div>
      </Card>
    </div>
  );
}