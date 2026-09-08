import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Logo */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
              LMS Portal
            </h2>

            <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
              Empowering learning through technology. Learn anytime, anywhere
              with our Learning Management System.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/course"
                  className="transition hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/career"
                  className="transition hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>📧 coder848301@gmail.com</p>
              <p>📞 +91 XXXXXXXXXX</p>
              <p>📍 Patna, Bihar, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 px-4 py-5 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} LMS Portal. All Rights Reserved.
      </div>
    </footer>
  );
}