"use client"
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "../web/Theme-Toggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex w-full items-center gap-1 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 h-4 data-vertical:self-auto"
          />
          <h1 className="text-base font-medium">Dashboard</h1>
        </div>
        <div className="flex items-center gap-1">
          <Link href="/" className={buttonVariants({
             variant : "outline",
             className : "px-6 flex gap-1"
          })}>
             Exit
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
