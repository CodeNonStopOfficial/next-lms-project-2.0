"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const chartConfig = {
  enrollements: {
    label: "Enrollments",
    color: "(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartInterfaceProps {
    data : {
       date : string;
       enrollment : number
    }[];
}
export function ChartAreaInteractive({data} : ChartInterfaceProps) {

  const totalEnrollement = React.useMemo(()=>data.reduce((sum,num)=>sum+num.enrollment,0),[data])
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollement</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total in Last 30 Days is {totalEnrollement}
          </span>
          <span className="@[540px]/card:hidden">Last 30 Days</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <BarChart
            margin={{
              left: 12,
              right: 12,
            }}
            data={data}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"enrollment"} fill="orange" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
