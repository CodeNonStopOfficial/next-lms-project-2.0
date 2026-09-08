"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: "🎥",
    title: "Live Interactive Classes",
    description:
      "Attend live classes with expert educators, ask questions, participate in polls, and learn in real-time.",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Educators",
    description:
      "Learn from experienced teachers who simplify complex concepts with structured lessons.",
  },
  {
    icon: "📚",
    title: "Complete Course Library",
    description:
      "Access thousands of courses, recorded lectures, notes, and study materials anytime.",
  },
  {
    icon: "📝",
    title: "Mock Tests & Practice",
    description:
      "Prepare better with quizzes, test series, performance analysis, and exam simulations.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Track your learning progress, identify weak areas, and improve your preparation.",
  },
  {
    icon: "🤖",
    title: "AI Learning Assistant",
    description:
      "Get instant doubt solving, personalized recommendations, and smart learning support.",
  },
  {
    icon: "💬",
    title: "Doubt Resolution",
    description:
      "Ask questions anytime and get solutions from educators and learning communities.",
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    description:
      "Access classes on mobile, tablet, or desktop with a seamless learning experience.",
  },
];

export function FeatureSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="
              group
              h-full
              rounded-2xl
              border
              bg-background
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-primary/40
              hover:shadow-xl
              dark:hover:shadow-primary/10
            "
          >
            <CardHeader className="space-y-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <CardTitle className="text-xl font-bold leading-snug">
                {feature.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}