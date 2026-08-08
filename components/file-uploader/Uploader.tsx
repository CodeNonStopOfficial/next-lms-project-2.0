"use client";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderComplelted,
  RenderEmptyState,
  RenderErrorState,
  RenderProgresingState,
} from "./RenderState";
import { toast } from "../ui/toast";
import { v4 as uuidv4 } from "uuid";
import fa from "zod/v4/locales/fa.cjs";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}
interface iAppProps{
   value ?:string,
   onChange : (value : string)=> void
}

export function Uploader({onChange,value} : iAppProps) {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    isDeleting: false,
    fileType: "image",
    progress: 0,
    key : value,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (!file) {
          toast.add({
            type: "error",
            title: "File Not Set-to-Upload",
          });
        }

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl],
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;
    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));
      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });
      if (!response.ok) {
        toast.add({
          type: "error",
          title: "Failed to Delete File From Storage",
        });
        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }));
        return;
      }
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
      onChange?.("");
      setFileState(() => ({
        error: false,
        file: null,
        id: null,
        uploading: false,
        isDeleting: false,
        fileType: "image",
        progress: 0,
        objectUrl: undefined,
      }));
  
      toast.add({
        type: "success",
        title: "File Deleted Successfully",
      });
    } catch {
      toast.add({
        type: "error",
        title: "File Remove Interal Error.!",
      });
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
      //get presinged url
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        toast.add({
          type: "error",
          title: "Failed to Get PreSigned URL",
        });
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      console.log({ presignedUrl, key });
      await new Promise<void>((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              uploading: false,
              key: key,
            }));
            onChange?.(key);
            toast.add({
              type: "success",
              title: "File Uploaded Successfully",
            });
            resolve();
          } else {
            reject(new Error("Uploaded failed"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Uploaded Failed"));
        };
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.add({
        type: "error",
        title: "Interal Server Error to Uploading File",
      });
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
    }
  }

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );
      if (tooManyFiles) {
        toast.add({
          type: "error",
          title: "Too Many Files Selected",
        });
      }
      const findFileSizeBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );
      if (findFileSizeBig) {
        toast.add({
          type: "error",
          title: "File Size Big or Larger",
        });
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderProgresingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.objectUrl) {
      return (
        <>
          <RenderComplelted previewUrl={fileState.objectUrl} handleRemoveFile={handleRemoveFile} isDeleting={fileState.isDeleting} />
        </>
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFiles,
    disabled : fileState.uploading || !!fileState.objectUrl
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        " relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-[#18ab10]",
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <Input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
