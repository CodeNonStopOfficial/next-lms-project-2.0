import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { FeatureSection } from "@/components/web/FeatureSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative py-6 sm:py-16 md:py-10 px-4">
        <div className="flex flex-col items-center space-y-2 sm:space-y-2 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="text-xs sm:text-sm px-4 py-3">
            🚀 CodeNontop Technology Learning Platform
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            The Future Online Learning Platform All Over India
          </h1>

          <p className="max-w-full sm:max-w-2xl text-muted-foreground text-base sm:text-lg md:text-xl px-2 sm:px-0">
            Master new skills through interactive courses, expert guidance, and
            real-world projects. Join thousands of learners and build your
            career with our powerful learning platform.
          </p>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Link
              href="/course"
              className={buttonVariants({
                size: "lg",
                className: "w-full sm:w-auto px-8 text-[16px] font-normal",
              })}
            >
              Explore Course
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "w-full sm:w-auto px-8 text-[16px] font-normal",
              })}
            >
              Login
            </Link>
          </div>
        </div>
      </section>
      <section>
         <FeatureSection/>
      </section>
    </>
  );
}
