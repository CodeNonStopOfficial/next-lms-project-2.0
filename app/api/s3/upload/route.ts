import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { fileUploadeSchema } from "./schema";
import arject, { detectBot, fixedWindow } from "@/lib/arject";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const aj = arject.withRule(
   detectBot({
      mode :"LIVE",
      allow : [],
   })
).withRule(
   fixedWindow({
       mode : "LIVE",
       window :"1m",
       max : 5
   })
)

export async function POST(request : Request){
   const session = await auth.api.getSession({
       headers : await headers()
   })
   try{
      const decision = await aj.protect(request,{fingerprint:session?.user.id as string});
      if(decision.isDenied()){
          return NextResponse.json({error:"Upload Bot Not Well"},{status:429})
      }
      const body = await request.json();
      const validation = fileUploadeSchema.safeParse(body);
      if(!validation.success){
         return NextResponse.json({error:"Invalid Request Body"},{status:400})
      }
      const {fileName,contentType,size} = validation.data;
      const uniqueKey = `${uuidv4()}-${fileName}`
      const command = new PutObjectCommand({
          Bucket : env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
          ContentType :contentType,
          ContentLength :size,
          Key : uniqueKey,
      })

      const presignedUrl = await getSignedUrl(S3,command,{
         expiresIn : 360, //url expire in 6 minutes
      })
      const response = {
          presignedUrl,
          key :uniqueKey
      }

      return NextResponse.json(response)
   }catch{
       return NextResponse.json({
          error : "Failed To Generate presignedUrl"
       },{
         status : 500
       })
   }
}