"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

 
async function useSignOut(){
 const router = useRouter()
  const handleSignOut = async function SignOut(){
       await authClient.signOut({
          fetchOptions : {
             onSuccess : ()=>{
                 router.push("/")
                 toast.success("SignOut Successfully")
             },
             onError : ()=>{
                 toast.error("SignOut Internal Error")
             }
          }
       })
  }
}