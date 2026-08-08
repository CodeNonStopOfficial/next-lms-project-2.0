import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { fileUploadedSchema } from "@/lib/validation";



export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = fileUploadedSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 },
      );
    }

    const { fileName, contentType, size } = validation.data;

    const uniquekEY = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!,
      ContentType: contentType,
      ContentLength: size,
      Key: uniquekEY,
    });
    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniquekEY,
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        error: "Internal Sever Error to Generate PreSignedUrl..!",
      },
      { status: 500 },
    );
  }
}
