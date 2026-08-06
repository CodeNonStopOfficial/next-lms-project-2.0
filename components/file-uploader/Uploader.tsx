"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { v4 as uuidv4 } from "uuid";
import { toast } from "../ui/toast";

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
   value ?: string;
   onChange?:(value:string)=>void
}

export function Uploader({onChange,value}:iAppProps) {
  //file state
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key : value
  });
  // file uplaod funcation 
  async function uploadFile(file: File) {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));
    try {
      // 1 Get presignedUrl
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          title: "Failed to Get PresignedUrl",
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

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
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
               type :"success",
               title:"File Uploaded Successfully"
            });
            resolve();
          } else {
            reject(new Error("Upload Failed..."));
          }
        };
        xhr.onerror = () => {
          reject(new Error("Upload Failed"));
        };
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch {
      toast.add({
        type:"error",
        title : "Something Went Error"
      });
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        uploading: false,
      }));
    }
  }
  //file dropdown funcation 
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
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
  //file remove function
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
          title: "Failed to Remove File From Storage",
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
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      }));
      toast.add({
        type: "success",
        title: "File Deleted,Please try agine",
      });
    } catch {
      toast.add({
        type: "error",
        title: "File Upload Internal Serve Error",
      });
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  function rejectedFile(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyfiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );
      const fileSizeBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );
      if (tooManyfiles) {
        toast.add({
          type: "error",
          title: "Too Many File, Please Select One File",
        });
      }
      if (fileSizeBig) {
        toast.add({
          type: "error",
          title: "File Size Big Please Try Again",
        });
      }
    }
  }

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
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
        <RenderUploadedState
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
          previewUrl={fileState.objectUrl}
        />
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
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //5MB
    onDropRejected: rejectedFile,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 w-ful h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-green-500",
      )}
    >
      <CardContent className="flex items-center justify-center h-full">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
