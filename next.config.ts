import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
     remotePatterns :[
        {
            protocol : "https",
            hostname : "codenonstop-next-project-2026.t3.tigrisfiles.io",
        },
        {
            protocol : "https",
            hostname : "codenonstop-next-project-2026.t3.storage.dev",
        }
     ]
  }
};

export default nextConfig;

