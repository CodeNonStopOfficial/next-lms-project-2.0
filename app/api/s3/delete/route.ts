import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";
import arject, { detectBot , fixedWindow } from "@/lib/arject";
import {requiredAdmin} from "@/app/data/admin/require-admin";

const aj = arject.withRule(
   detectBot({
     mode : "LIVE",
     allow : [],
   })
).withRule(
   fixedWindow({
     mode : "LIVE",
     window : "1m",
     max : 5
   })
)


export async function DELETE(request: Request) {
  const session = await requiredAdmin();
  try {

     const decision = await aj.protect(request,{fingerprint:session.user.id});

    if(decision.isDenied()){
      return NextResponse.json(
        {error : "File Deleted Not Denied"},
        {status : 429}
      )
    }

    const body = await request.json();
    const key = body.key;
    if (!key) {
      return NextResponse.json(
        { error: "Missing Invalide Object Key" },
        { status: 400 },
      );
    }
    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES!,
      Key: key,
    });

    await S3.send(command);
    return NextResponse.json(
      { message: "File Deleted Successfully" },
      { status: 200 },
    );
  } catch{
    return NextResponse.json(
      { message: "Internal Server Error To Delete File" },
      { status: 500 },
    );
  }
}
