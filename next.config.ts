import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
     remotePatterns :[
        {
            protocol : "https",
            hostname : "tigris-demo-bucket.tigrisfiles.io",
            port : ''
        },
        {
            protocol : "https",
            hostname : "tigris-demo-bucket.t3.tigrisfiles.io",
            port : ''
        }
     ]
  }
};

export default nextConfig;

