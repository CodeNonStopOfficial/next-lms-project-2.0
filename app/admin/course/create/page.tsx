import { Suspense } from "react";
import { CreateForm } from "./_components/CreateForm";
import {DashboardSkeleton} from "@/components/common/DashboardSkeleton"

export default function CourseCreationPage() {
  return (
    <Suspense fallback={<DashboardSkeleton/>}>
      <CreateForm />
    </Suspense>
  );
}
