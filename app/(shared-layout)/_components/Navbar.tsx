"use client";
import { Button } from "@/components/ui/button";
import { NavToggleProfile } from "@/components/web/NavToggleProfile";
import { ThemeToggle } from "@/components/web/Theme-Toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className=" container flex justify-between min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-row space-x-8 items-center justify-center">
          <Button variant="outline" className="px-4 py-5">
            <Link href="/">
              <h1 className="text-[22px] font-bold text-base text-[#3a3b37]">
                <span className="text-[#ff0000]">Code</span>Nonstop
              </h1>
            </Link>
          </Button>

          <div className="hidden md:flex flex-row space-x-8 text-[16px] font-normal">
            <Link href="/getting" className="hover:text-amber-500">
              Getting
            </Link>
            <Link href="/course" className="hover:text-amber-500">
              Course
            </Link>
            <Link href="/batch" className="hover:text-amber-500">
              Batch
            </Link>
            <Link href="/dashboard" className="hover:text-amber-500">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 justify-center">
          <ThemeToggle />
          {isPending ? null : session ? (
            <NavToggleProfile user={session.user} />
          ) : (
            <div className="flex gap-2">
              <Button className="px-6 py-4.5 text-[16px]" variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="hidden md:block px-6 py-4.5 text-[16px]" variant="outline">
                <Link href="/get-started">Get-Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
