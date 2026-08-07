"use client"
import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Progress } from "../ui/progress";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center m-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop Your file hare or{" "}
        <span className="text-[#1eff00] font-bold cursor-pointer">
          Click to Upload
        </span>
      </p>
      <Button
        type="button"
        className="bg-[#1eff00] px-6 py-4.5 text-[16px] font-normal"
      >
        Select Image
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center m-auto justify-center size-12 rounded-full bg-destructive/30">
        <ImageIcon
          className={cn(
            "size-6 text-destructive"
          )}
        />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs font-semibold">Something Wrong</p>
      <Button type="button" variant="outline" className="text-[14px]  px-4 md:px-8 py-5 text-muted-foreground hover:text-[#1eff00] cursor-pointer ">Again Retry</Button>
    </div>
  );
}

export function RenderUploadedState({previewUrl,isDeleting,handleRemoveFile}:{previewUrl:string,isDeleting:boolean,handleRemoveFile:()=>void}){
   return (
     <div>
        <Image src={previewUrl} alt="Preview Image" fill className="object-contain p-2"/>
        <Button type="button" variant="outline" onClick={handleRemoveFile} disabled={isDeleting} size="icon" className={cn(" absolute top-4 right-4 ")}>
          {
            isDeleting ? (
              <Loader2 className="size-4 animate-spin"/>
            ):(
             <XIcon className="size-4"/>
            )
          }
        </Button>
     </div>
   )
}

export function RenderUploadingState({progress,file}:{progress:number,file:File}){
   return (
     <div className="text-center flex justify-center items-center flex-col">
        <p className="text-center text-bold text-[#2bff00]">{progress}%</p>
        <Progress value={progress} className="w-[60%]" />
        <p className="mt-2 text-sm font-medium text-foreground">File Uploading...</p>
        <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>

     </div>
   )
}
