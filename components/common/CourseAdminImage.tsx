"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export function CourseAdminImage({ data }: { data: any }) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    async function loadImage() {
      const response = await fetch(
        `/api/s3/image-get?fileKey=${encodeURIComponent(data.fileKey)}`
      );

      const result = await response.json();
      setImageUrl(result.imageUrl);
    }

    if (data.fileKey) {
      loadImage();
    }
  }, [data.fileKey]);

  return (
    <Card className="group relative">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="thumbnail"
          width={600}
          height={400}
        />
      )}
    </Card>
  );
}