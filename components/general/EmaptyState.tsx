import Link from "next/link";
import { Ban, PlusCircle } from "lucide-react";

import {buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showButton?: boolean;
}

export function EmptyState({
  title = "No courses found",
  description = "There are no courses available at the moment. Create your first course to get started.",
  showButton = true,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-100 w-full items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 px-6 py-12">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Ban className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-3">
            {showButton && (
            <Link href="/admin/course/create" className={buttonVariants({
                 variant : "outline",
                 className : "flex items-center gap-2 px-4 py-4.5"
            })}>
              <PlusCircle className="h-4 w-4" />
               Create Course
            </Link>
        )}
        </div>
      </div>
    </div>
  );
}