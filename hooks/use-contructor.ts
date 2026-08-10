"use client";
import { env } from "@/lib/env";
import { useEffect, useState } from "react";

export function useConstructorFile(key: string) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!key) {
      setImageUrl("");
      return;
    }

    async function fetchImageUrl() {
      try {
        const response = await fetch(
          `/api/s3/image-get?fileKey=${encodeURIComponent(key)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image URL");
        }

        const data = await response.json();

        // Matches: return NextResponse.json({ imageUrl });
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Image URL error:", error);
        setImageUrl("");
      }
    }

    fetchImageUrl();
  }, [key]);

  return imageUrl;
}
