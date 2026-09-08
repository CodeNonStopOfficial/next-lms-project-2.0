import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {S3 } from "@/lib/S3Client"

export async function getImageUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
    Key: fileKey,
  });

  return await getSignedUrl(S3, command, {
    expiresIn: 3600,
  });
}