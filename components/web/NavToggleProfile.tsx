"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  BadgeDollarSign,
  BellIcon,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  SquareLibrary,
  User,
  Wallpaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import Link from "next/link";
import { StripEmptyObjects } from "better-auth/client";

interface UserDataProps {
  user: StripEmptyObjects<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    role?: string | null;
  }>;
}

export function NavToggleProfile({ user }: UserDataProps) {
  const router = useRouter();
  const [isLogOutPending, startLogOutTransition] = useTransition();
  function handleLogOut() {
    startLogOutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); // redirect to login page
            toast.add({
              type: "success",
              title: "LogOut Successfully",
            });
          },
          onError: (error) => {
            toast.add({
              type: "error",
              title: error.error.message,
            });
          },
        },
      });
    });
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={user?.image ?? "https://codenonstop"}
                  alt="shadcn"
                />
                <AvatarFallback>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuContent
          align="center"
          className="text-[18px] font-normal w-47.5"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/profile" className="flex gap-2">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-course" className="flex gap-2">
                <Wallpaper />
                My Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/course" className="flex gap-2">
                <SquareLibrary />
                Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex gap-2">
                <BadgeDollarSign />
                Batch
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/notification" className="flex gap-2">
                <BellIcon />
                Notifications
              </Link>
            </DropdownMenuItem>
            {user?.role === "admin" ? (
              <DropdownMenuItem>
                <Link href="/admin/dashboard" className="flex gap-2">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Link href="/dashboard" className="flex gap-2">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={isLogOutPending}
            onClick={handleLogOut}
          >
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
