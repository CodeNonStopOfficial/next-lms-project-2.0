"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FeatureProps{
     icon : string,
     title : string,
     description : string
}
const features :FeatureProps[] = [
  {
    icon: "🎥",
    title: "Live Interactive Classes",
    description:
      "Attend live classes with expert educators, ask questions, participate in polls, and learn in real-time."
  },
  {
    icon: "👨‍🏫",
    title: "Expert Educators",
    description:
      "Learn from experienced teachers who simplify complex concepts with structured lessons."
  },
  {
    icon: "📚",
    title: "Complete Course Library",
    description:
      "Access thousands of courses, recorded lectures, notes, and study materials anytime."
  },
  {
    icon: "📝",
    title: "Mock Tests & Practice",
    description:
      "Prepare better with quizzes, test series, performance analysis, and exam simulations."
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Track your learning progress, identify weak areas, and improve your preparation."
  },
  {
    icon: "🤖",
    title: "AI Learning Assistant",
    description:
      "Get instant doubt solving, personalized recommendations, and smart learning support."
  },
  {
    icon: "💬",
    title: "Doubt Resolution",
    description:
      "Ask questions anytime and get solutions from educators and learning communities."
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    description:
      "Access classes on mobile, tablet, or desktop with seamless learning experience."
  },
];

export function FeatureSection(){
     return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              features.map((data,index)=>(
                 <Card key={index} className="bg-white dark:bg-[#0b0b0b] hover:shadow-lg tracking-tight">
                     <CardHeader>
                        <div className="text-2xl border-0">{data.icon}</div>
                        <CardTitle className="text-[20px] font-bold text-shadow-black">{data.title}</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-[16px] font-normal text-muted-foreground">{data.description}</p>
                     </CardContent>
                 </Card>
              ))
            }
        </div>
     )
}