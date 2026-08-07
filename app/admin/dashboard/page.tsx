import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { DataTable } from "@/components/sidebar/data-table";
import { SectionCards } from "@/components/sidebar/section-cards";

import data from "./data.json";
import { Suspense } from "react";
import Loading from "./loading";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense fallback={<Loading />}>
            <SectionCards />
          </Suspense>
          <div className="px-4 lg:px-6">
            <Suspense fallback={<Loading />}>
              <ChartAreaInteractive />
            </Suspense>
          </div>
          <Suspense fallback={<Loading />}>
            <DataTable data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
