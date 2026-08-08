import { env } from "@/lib/env";

export function useConstructUrl(key:string){
    return `https://tigris-demo-bucket.t3.tigrisfiles.io/0304be37-af75-462b-8cd3-6b382b1bd2aa-arthur-rachbauer-vYyHLDPKWd4-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=tid_lvTajCQVbXPYcLBPOboEjlJdRwANJLTRaccvvNNpwWSrxMBWnv%2F20260808%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260808T224134Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ac28a20a4391263b418f0490fd68061b161ffccef8810059210118fd11f7a3c2`
}

