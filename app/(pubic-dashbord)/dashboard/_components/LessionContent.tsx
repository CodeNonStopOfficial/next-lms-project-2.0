import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };
  slug: string;
  isActive?: boolean;
  completed : boolean;
}
export default function LessonContent({ lesson, slug, isActive , completed }: iAppProps) {
  return (
    <Link
      href={`/dashboard/${slug}/${lesson.id}`}
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full p-2.5 h-auto justify-start transition-all overflow-hidden line-clamp-2",
          completed &&
            "bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900",
          isActive && !completed && "bg-primary/10 dark:bg-primary/20 ",
        ),
      })}
    >
      <div className="flex items-center gap-2.5 w-full min-w-0">
        <div className="shrink-0">
          {completed ? (
            <div className="size-5 flex rounded-full bg-green-600 dark:bg-green-500 items-center justify-center">
              <Check className="size-3 text-white" />
            </div>
          ) : (
            <div
              className={cn(
                "size-5 rounded-full border bg-background flex justify-center items-center",
              )}
            >
              <Play
                className={cn(
                  "size-2.5 fill-current",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
          )}
        </div>
        <div>
          <p className={cn("text-[14px] font-medium truncate capitalize")}>
            {lesson.position}. {lesson.title}
          </p>
          {completed && (
             <p className="text-[10px] text-green-700 dark:text-green-300 font-medium">Completed</p>
          )}
           {isActive && !completed &&  (
             <p className="text-[10px] text-red-700 dark:text-red-300 font-medium">Currently Watching</p>
          )}
        </div>
      </div>
    </Link>
  );
}
