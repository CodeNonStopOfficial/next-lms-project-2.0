import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Progress } from "../ui/progress";

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
        Upload File
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

export function RenderComplelted({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) {
  return (
    <div className="items-center justify-center mx-auto flex flex-col space-y-2  relative w-full h-full">
      {fileType === "video" ? (
        <div className="w-112.5 h-100 py-4">
         <video src={previewUrl} controls className="rounded-md items-center justify-center w-100" />
        </div>
      ) : (
        <Image
          src={previewUrl}
          alt="Uploading File"
          fill
          className="object-contain p-2 "
        />
      )}
      <Button
        onClick={handleRemoveFile}
        type="button"
        variant="outline"
        size="icon"
        disabled={isDeleting}
        className={cn("absolute top-4 right-4")}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderProgresingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="items-center justify-center mx-auto flex flex-col w-full space-y-1">
      <div className="flex flex-col items-center mx-auto justify-center border-[#107b08]">
        <h1 className="text-[16px] item-center text-center text-[#36ff03] font-semibold">
          {progress}%
        </h1>
        <Progress value={progress} className="w-45 md:w-75 border" />
      </div>
      <p className="text-[#06011e] dark:text-primary font-normal">
        {file?.name}
      </p>
      <Button type="button" className="px-8 py-4.5 mx-auto">
        {progress ? "Uploded" : "Uploding"}
      </Button>
    </div>
  );
}
