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
import { BellIcon, LayoutDashboard, LogOutIcon, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { StripEmptyObjects } from "better-auth";


interface UserDataProps {
  user: StripEmptyObjects<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
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
          onError : (error)=>{
             toast.add({
                 type :"error",
                 title : error.error.message
             })
          }
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
                <AvatarImage src={user?.image ?? "https://codenonstop"} alt="shadcn" />
                <AvatarFallback>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuContent align="center" className="text-[18px] font-normal w-[150px]">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Setting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" disabled={isLogOutPending} onClick={handleLogOut}>
            <LogOutIcon />
             Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
