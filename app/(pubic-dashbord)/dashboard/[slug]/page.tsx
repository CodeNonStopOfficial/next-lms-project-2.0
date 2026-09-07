export default function CourseSlugPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      {/* Video */}
      <div className="overflow-hidden rounded-xl border bg-black shadow">
        <div className="aspect-video flex items-center justify-center bg-gray-900">
          <span className="text-lg font-medium text-white">
            🎥 Demo Video Player
          </span>
        </div>
      </div>

      {/* Lesson Info */}
      <div className="space-y-4">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Lesson 3 of 12
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            React Components & Props
          </h1>

          <p className="mt-2 text-gray-600">
            Learn how React components work, how to create reusable UI, and how
            to pass data between components using props.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>⏱️ 18 Minutes</span>
          <span>📺 HD Video</span>
          <span>📄 2 Resources</span>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">What You'll Learn</h2>

        <ul className="space-y-3 text-gray-700">
          <li>✅ Create reusable React components</li>
          <li>✅ Pass data using Props</li>
          <li>✅ Organize component structure</li>
          <li>✅ Build maintainable UI</li>
        </ul>
      </div>

      {/* Resources */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Resources</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-medium">React Components Notes.pdf</h3>
              <p className="text-sm text-gray-500">Download lesson notes.</p>
            </div>

            <button className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-medium">Starter Code.zip</h3>
              <p className="text-sm text-gray-500">
                Practice with this lesson.
              </p>
            </div>

            <button className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button className="rounded-lg border px-5 py-3 hover:bg-gray-100">
          ← Previous Lesson
        </button>

        <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
          ✓ Mark as Complete
        </button>

        <button className="rounded-lg border px-5 py-3 hover:bg-gray-100">
          Next Lesson →
        </button>
      </div>
    </div>
  );
}
