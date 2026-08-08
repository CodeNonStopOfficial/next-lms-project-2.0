import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="items-center justify-center mx-auto flex flex-col w-full space-y-2">
      <div className="flex items-center mx-auto justify-center border-3 border-[#107b08] size-12 rounded-full bg-muted">
        <CloudUploadIcon
          className={cn(
            "size-6 border-[#0dff00]",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <p className="text-[#06011e] dark:text-primary font-semibold">
        Drop Your File Hare or{" "}
        <span className="text-[#0011ff] dark:text-[#bf0] font-bold cursor-pointer">
          Click to Upload
        </span>
      </p>
      <Button type="button" className="px-8 py-4.5 mx-auto">
        Upload Image
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-center space-y-1">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xl text-muted-foreground">Something went wrong</p>
      <Button type="button" className="px-8 py-5 mx-auto">
        Try Again
      </Button>
    </div>
  );
}

export function RenderComplelted({previewUrl}:{previewUrl:string}) {
  return (
    <div className="items-center justify-center mx-auto flex flex-col w-full space-y-2">
       <Image src={previewUrl} alt="Uploaded File" fill className="object-contain p-2"/>
       <Button type="button" variant="outline" size="icon" className={cn("absolute top-4 right-4")}>
           <XIcon className="size-4"/>
       </Button>
    </div>
  );
}
