import { Suspense } from "react";
import { CreateForm } from "./_components/CreateForm";

export default function CourseCreationPage() {
  return (
    <Suspense fallback={<p>Loading orders...</p>}>
      <CreateForm />
    </Suspense>
  );
}
