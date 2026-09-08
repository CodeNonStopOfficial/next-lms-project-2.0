import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200">
      <div className="w-300 mx-auto flex justify-between py-10">
        {/* Logo */}
        <div className="w-1/3 pr-6">
          <h2 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
            LMS Portal
          </h2>
          <p className="leading-7 text-gray-600 dark:text-gray-400">
            Empowering learning through technology. Learn anytime, anywhere with
            our Learning Management System.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-1/3">
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/course"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/Career"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Career
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-1/3">
          <h3 className="mb-4 text-lg font-semibold">Contact</h3>

          <p className="text-gray-600 dark:text-gray-400">
            coder848301@gmail.com
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            +91 7033532694
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Patna, Bihar, India
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © 2026 LMS Portal. All Rights Reserved.
      </div>
    </footer>
  );
}