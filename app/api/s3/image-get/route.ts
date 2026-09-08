import { NextResponse } from "next/server";
import { getImageUrl } from "@/lib/generate-url";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileKey = searchParams.get("fileKey");

  if (!fileKey) {
    return NextResponse.json(
      { error: "fileKey is required" },
      { status: 400 }
    );
  }

  const imageUrl = await getImageUrl(fileKey);

  return NextResponse.json({ imageUrl });
}