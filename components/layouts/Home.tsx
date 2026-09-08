import Link from "next/link";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Blur */}
      <div className="absolute left-1/2 top-0 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl sm:h-72 sm:w-72 dark:bg-primary/10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 max-w-full rounded-full border-primary/30 bg-primary/5 px-4 py-2 text-center text-xs font-medium text-primary backdrop-blur-sm sm:px-5 sm:text-sm dark:bg-primary/10"
        >
          🚀 CodeNontop Technology Learning Platform
        </Badge>

        {/* Heading */}
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          The Future{" "}
          <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Online Learning
          </span>{" "}
          Platform Across India
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl px-2 text-sm leading-7 text-muted-foreground sm:px-0 sm:text-lg md:text-xl">
          Master new skills through interactive courses, expert guidance, and
          real-world projects. Join thousands of learners and build your career
          with our powerful learning platform.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/course"
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 w-full rounded-xl px-8 text-base shadow-lg transition-all hover:shadow-xl sm:w-auto",
            })}
          >
            Explore Courses
          </Link>

          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "h-12 w-full rounded-xl border-border bg-background/70 px-8 text-base backdrop-blur transition-all hover:bg-muted sm:w-auto",
            })}
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}