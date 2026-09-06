import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  FolderIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Enrollement",
      url: "/enrollement",
      icon: <ListIcon />,
    },
    {
      title: "Live Classes",
      url: "/live-classes",
      icon: <FolderIcon />,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "/get-help",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Notification",
      url: "/notification",
      icon: <SearchIcon />,
    },
  ],
};

export function PublicDashboardAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="px-4 py-2 bg-gray-100 dark:bg-blue-800 mx-auto items-center justify-center border">
            <h1 className="text-xl font-bold">
              <span className="dark:text-[#f4eeee]">CodeNonstop-LMS</span>
            </h1>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
