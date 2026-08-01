import { ThemeToggle } from "@/components/web/Theme-Toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers : await headers(),
  })
  const user = session?.user ?? undefined

  
  return (
    <div className="font-bold">
       <h1 className="text-4xl">Home Page {user?.name}</h1>
       <ThemeToggle/>
    </div>
  );
}
