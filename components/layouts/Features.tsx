"use client";

import {
  BookOpen,
  Video,
  Award,
  Users,
  Brain,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Courses",
    description:
      "Learn with structured lessons, quizzes, downloadable notes, and real-world projects.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Attend HD live sessions, ask questions instantly, and replay classes anytime.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Learning",
    description:
      "Receive personalized recommendations and AI-powered practice questions.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn verified certificates after successfully completing each course.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description:
      "Learn directly from experienced instructors and industry professionals.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor learning goals with detailed analytics and achievement tracking.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Why Choose Us
          </span>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Everything You Need to
            <span className="block bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Learn Smarter
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg lg:text-xl">
            Build your skills through live classes, AI-powered learning,
            hands-on projects, and expert mentorship—all in one platform.
          </p>
        </div>

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl dark:hover:shadow-primary/10 sm:p-8"
              >
                {/* Hover Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r ${feature.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16`}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                {/* Title */}
                <h3 className="relative mt-6 text-xl font-bold text-foreground sm:text-2xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative mt-4 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-10 text-center shadow-2xl sm:px-10 sm:py-14">
          <h3 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Start Learning Today
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-lg">
            Join thousands of students improving their careers through
            interactive courses, live classes, AI-powered learning, and expert
            mentorship.
          </p>

            <Link
              href="/course"
              className={buttonVariants({
                variant: "outline",
                className:
                  "mt-8 w-full rounded-xl bg-white px-8 py-4 font-semibol  transition-all duration-300 hover:scale-105 hover:shadow-lg sm:w-auto dark:text-white ",
              })}
            >
              Explore Courses
            </Link>
        </div>
      </div>
    </section>
  );
}
